import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleMap from "@/components/GoogleMap";
import { BHUBANESWAR_HOSPITALS } from "@/data/bhubaneswar/hospitals";
import { BHUBANESWAR_PHARMACIES } from "@/data/bhubaneswar/pharmacies";
import { distanceInKm, getCurrentLocation, BHUBANESWAR_CENTER } from "@/lib/geo";

export default function MedicalMapDemo() {
  const [showHospitals, setShowHospitals] = useState(true);
  const [showPharmacies, setShowPharmacies] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Get user location on component mount
  useState(() => {
    getCurrentLocation().then(location => {
      if (location) {
        setUserLocation(location);
      }
    });
  });

  const currentLocation = userLocation || BHUBANESWAR_CENTER;

  // Calculate distances and sort by proximity
  const hospitalsWithDistance = BHUBANESWAR_HOSPITALS.map(hospital => ({
    ...hospital,
    distance: distanceInKm(currentLocation.lat, currentLocation.lng, hospital.lat, hospital.lng)
  })).sort((a, b) => a.distance - b.distance);

  const pharmaciesWithDistance = BHUBANESWAR_PHARMACIES.map(pharmacy => ({
    ...pharmacy,
    distance: distanceInKm(currentLocation.lat, currentLocation.lng, pharmacy.lat, pharmacy.lng)
  })).sort((a, b) => a.distance - b.distance);

  const filteredHospitals = showHospitals ? hospitalsWithDistance : [];
  const filteredPharmacies = showPharmacies ? pharmaciesWithDistance : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
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
                  <MapPin className="w-6 h-6 mr-2 text-primary" />
                  Medical Facilities Map - Bhubaneswar
                </h1>
                <p className="text-muted-foreground">Find nearby hospitals and pharmacies</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={showHospitals ? "default" : "outline"}
                size="sm"
                onClick={() => setShowHospitals(!showHospitals)}
              >
                🏥 Hospitals ({BHUBANESWAR_HOSPITALS.length})
              </Button>
              <Button
                variant={showPharmacies ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPharmacies(!showPharmacies)}
              >
                💊 Pharmacies ({BHUBANESWAR_PHARMACIES.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Map (Open map in full screen)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  🔴 Red markers: Hospitals • 🟢 Green markers: Pharmacies • 🔵 Blue marker: Your location
                </p>
              </CardHeader>
              <CardContent>
                <GoogleMap
                  hospitals={filteredHospitals}
                  pharmacies={filteredPharmacies}
                  center={currentLocation}
                  zoom={12}
                  onLocationSelect={setSelectedLocation}
                  className="w-full h-96"
                />
              </CardContent>
            </Card>
          </div>

          {/* Facilities List */}
          <div className="space-y-6">
            {/* Nearest Hospitals */}
            {showHospitals && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    🏥 Nearest Hospitals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hospitalsWithDistance.slice(0, 3).map((hospital) => (
                    <div key={hospital.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm">{hospital.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {hospital.distance.toFixed(1)} km
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {hospital.type}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {hospital.address}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {hospital.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {hospital.phone && (
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            <Phone className="w-3 h-3 mr-1" />
                            <a href={`tel:${hospital.phone}`}>Call</a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Navigation className="w-3 h-3 mr-1" />
                          <a
                            href={`https://maps.google.com/?q=${hospital.lat},${hospital.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Directions
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Nearest Pharmacies */}
            {showPharmacies && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    💊 Nearest Pharmacies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pharmaciesWithDistance.slice(0, 3).map((pharmacy) => (
                    <div key={pharmacy.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-sm">{pharmacy.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {pharmacy.distance.toFixed(1)} km
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {pharmacy.type}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {pharmacy.address}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {pharmacy.hours}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {pharmacy.services.slice(0, 2).map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {pharmacy.phone && (
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            <Phone className="w-3 h-3 mr-1" />
                            <a href={`tel:${pharmacy.phone}`}>Call</a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Navigation className="w-3 h-3 mr-1" />
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
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Demo Info */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">🎯 Map Features</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interactive Google Maps integration with real-time location services.
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <Badge variant="secondary" className="text-xs">Location Detection</Badge>
                    <Badge variant="secondary" className="text-xs">Distance Calculation</Badge>
                    <Badge variant="secondary" className="text-xs">Click-to-Call</Badge>
                    <Badge variant="secondary" className="text-xs">Google Directions</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}