import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Pill, 
  Calendar, 
  ShoppingCart, 
  Clock, 
  MessageSquare, 
  Phone,
  HeartHandshake,
  ExternalLink
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function FeaturesSection() {
  const [highlightedModules, setHighlightedModules] = useState<string[]>([])

  useEffect(() => {
    // Check URL parameters on mount
    const urlParams = new URLSearchParams(window.location.search)
    const highlight = urlParams.get('highlight')
    if (highlight) {
      setHighlightedModules(highlight.split(','))
      // Clear URL parameters after highlighting
      setTimeout(() => {
        const newUrl = window.location.pathname + window.location.hash.split('?')[0]
        window.history.replaceState({}, '', newUrl)
        setHighlightedModules([])
      }, 4000)
    }

    // Listen for highlight events from dialog
    const handleHighlight = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const highlight = urlParams.get('highlight')
      if (highlight) {
        setHighlightedModules(highlight.split(','))
        setTimeout(() => {
          setHighlightedModules([])
        }, 4000)
      }
    }

    window.addEventListener('highlightModules', handleHighlight)
    return () => window.removeEventListener('highlightModules', handleHighlight)
  }, [])
  const features = [
    {
      id: "medicine-health",
      icon: Pill,
      title: "Medicine & Health Reminder",
      description: "Never miss a dose with smart medication reminders and health tracking",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/30"
    },
    {
      id: "doctor-schedule",
      icon: Calendar,
      title: "Doctor Schedule Manager",
      description: "Manage appointments, track medical history, and get visit reminders",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      id: "medicine-ordering",
      icon: ShoppingCart,
      title: "Medicine Ordering & Partnerships",
      description: "Order medicines online with trusted pharmacy partnerships",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      id: "senior-reminders",
      icon: Clock,
      title: "Senior Citizen Helper Reminders",
      description: "Daily activity reminders, meal times, and wellness check-ins",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30"
    },
    {
      id: "ai-chatbot",
      icon: MessageSquare,
      title: "AI Chatbot Support",
      description: "24/7 intelligent health assistant for questions and guidance",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/30"
    },
    {
      icon: Phone,
      title: "Emergency SOS & Contacts",
      description: "Instant emergency alerts with location sharing to trusted contacts",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30"
    }
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <HeartHandshake className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Comprehensive Care Features</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need for
            <span className="gradient-text"> Senior Wellness</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform provides a complete suite of tools designed specifically for senior citizens, 
            ensuring health, safety, and peace of mind for both users and their families.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const isHighlighted = feature.id && highlightedModules.includes(feature.id)
            return (
              <Card 
                key={index}
                className={`group card-bg border-0 shadow-lg hover-lift hover-glow transition-smooth cursor-pointer animate-scale-in ${
                  isHighlighted ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-glow' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  {/* Add demo buttons for key features */}
                  {feature.id === "medicine-health" && (
                    <Link to="/demo/reminders">
                      <Button variant="outline" size="sm" className="w-full group">
                        Try Now
                        <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  )}
                  {feature.id === "doctor-schedule" && (
                    <Link to="/demo/schedule">
                      <Button variant="outline" size="sm" className="w-full group">
                        Try Now
                        <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  )}
                  {feature.id === "medicine-ordering" && (
                    <div className="flex space-x-2 mt-0">
                      <Link to="/demo/order">
                        <Button variant="outline" size="sm" className="flex-1 group">
                          Try Now
                          <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                      <Link to="/demo/medical-map">
                        <Button variant="outline" size="sm" className="flex-1 group">
                          View Map
                          <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  )}
                  {feature.id === "senior-reminders" && (
                    <Link to="/demo/helper-reminders">
                      <Button variant="outline" size="sm" className="w-full group">
                        Try Now
                        <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  )}
                  {feature.id === "ai-chatbot" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group"
                      onClick={() => {
                        // Try to trigger the local chatbot to open
                        const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                        if (chatButton) {
                          chatButton.click();
                        } else {
                          // Fallback: scroll to bottom right where chatbot is located
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                          setTimeout(() => {
                            const floatingButton = document.querySelector('button[class*="fixed bottom-4 right-4"]') as HTMLElement;
                            if (floatingButton) {
                              floatingButton.click();
                            }
                          }, 500);
                        }
                      }}
                    >
                      Try Now
                      <MessageSquare className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
                    </Button>
                  )}
                  {!feature.id && feature.title === "Emergency SOS & Contacts" && (
                    <Link to="/demo/sos">
                      <Button variant="outline" size="sm" className="w-full group">
                        Try Now
                        <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}