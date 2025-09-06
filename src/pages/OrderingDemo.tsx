import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, ArrowLeft, Plus, Minus, Search, Package, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { BHUBANESWAR_PRODUCTS, Medicine } from "@/data/bhubaneswar/products"
import { BHUBANESWAR_PHARMACIES } from "@/data/bhubaneswar/pharmacies"
import GoogleMap from "@/components/GoogleMap"
import { distanceInKm, getCurrentLocation, BHUBANESWAR_CENTER } from "@/lib/geo"

interface CartItem extends Medicine {
  quantity: number
}

export default function OrderingDemo() {
  const { toast } = useToast()
  
  const [medicines] = useState(BHUBANESWAR_PRODUCTS)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showMap, setShowMap] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user location on component mount
  useState(() => {
    getCurrentLocation().then(location => {
      if (location) {
        setUserLocation(location);
      }
    });
  });

  const categories = ["All", ...Array.from(new Set(medicines.map(m => m.category)))]
  
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id)
      if (existing) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...medicine, quantity: 1 }]
    })
    
    toast({
      title: "✅ Added to Cart",
      description: `${medicine.name} added to your cart`,
    })
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change)
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean) as CartItem[]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR' 
    }).format(price);
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "⚠️ Empty Cart",
        description: "Please add items to your cart before checkout",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "🎉 Order Placed Successfully!",
      description: `Order total: ${formatPrice(cartTotal)} - Delivery in 2-3 business days`,
    })
    setCart([])
  }

  // Get pharmacies that have items in cart
  const getRelevantPharmacies = () => {
    const cartMedicineIds = cart.map(item => item.id);
    return BHUBANESWAR_PHARMACIES.filter(pharmacy => 
      cartMedicineIds.some(medicineId => 
        pharmacy.medicinesAvailable.includes(medicineId)
      )
    );
  }

  const currentLocation = userLocation || BHUBANESWAR_CENTER;
  const relevantPharmacies = getRelevantPharmacies();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-primary" />
                  Medicine Ordering
                </h1>
                <p className="text-muted-foreground">Order medicines from trusted pharmacy partners</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Package className="w-3 h-3 mr-1" />
                {cartItemCount} Items
              </Badge>
              <Badge variant="outline" className="text-sm font-semibold">
                {formatPrice(cartTotal)}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className="ml-2"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {showMap ? 'Hide' : 'Show'} Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Map Section */}
        {showMap && cart.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Nearby Pharmacies with Your Medicines
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Pharmacies that stock the medicines in your cart
              </p>
            </CardHeader>
            <CardContent>
              <GoogleMap
                pharmacies={relevantPharmacies}
                center={currentLocation}
                zoom={13}
                className="w-full h-80 mb-4"
              />
              {relevantPharmacies.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relevantPharmacies.slice(0, 4).map((pharmacy) => {
                    const distance = distanceInKm(currentLocation.lat, currentLocation.lng, pharmacy.lat, pharmacy.lng);
                    return (
                      <div key={pharmacy.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{pharmacy.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {distance.toFixed(1)} km
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{pharmacy.address}</p>
                        <p className="text-xs text-muted-foreground">🕒 {pharmacy.hours}</p>
                        <div className="flex space-x-2 mt-2">
                          {pharmacy.phone && (
                            <Button size="sm" variant="outline" className="text-xs h-6">
                              <a href={`tel:${pharmacy.phone}`}>Call</a>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            <a
                              href={`https://maps.google.com/?q=${pharmacy.lat},${pharmacy.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Directions
                            </a>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Catalog */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search medicines..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{medicine.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{medicine.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-primary">{formatPrice(medicine.price)}</p>
                        {medicine.prescription && (
                          <Badge variant="outline" className="text-xs">Rx Required</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{medicine.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant={medicine.inStock ? "default" : "secondary"}>
                        {medicine.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                      <Button
                        onClick={() => addToCart(medicine)}
                        disabled={!medicine.inStock}
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Your Cart ({cartItemCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{formatPrice(item.price)} each</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 h-6 px-2 text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg text-primary">{formatPrice(cartTotal)}</span>
                      </div>
                      <Button onClick={handleCheckout} className="w-full">
                        Checkout
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Partner pharmacies: MedPlus, Apollo Pharmacy, Local Co-ops — Demo
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}