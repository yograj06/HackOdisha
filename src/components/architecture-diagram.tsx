import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart,
  Pill, 
  Calendar, 
  ShoppingCart, 
  Clock, 
  MessageSquare, 
  Phone,
  ArrowRight,
  Zap
} from "lucide-react"

export function ArchitectureDiagram() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  const centerApp = {
    id: "center",
    title: "ElderCare+",
    subtitle: "Core Platform",
    icon: Heart,
    position: "center"
  }

  const modules = [
    {
      id: "medicine",
      title: "Medicine Reminders",
      icon: Pill,
      position: "top-left",
      description: "Smart medication tracking and alerts"
    },
    {
      id: "doctor",
      title: "Doctor Schedule",
      icon: Calendar,
      position: "top",
      description: "Appointment management and history"
    },
    {
      id: "ordering",
      title: "Medicine Orders",
      icon: ShoppingCart,
      position: "right",
      description: "Online pharmacy partnerships"
    },
    {
      id: "helpers",
      title: "Daily Reminders",
      icon: Clock,
      position: "bottom-right",
      description: "Wellness and activity alerts"
    },
    {
      id: "chatbot",
      title: "AI Assistant",
      icon: MessageSquare,
      position: "bottom",
      description: "24/7 intelligent support"
    },
    {
      id: "emergency",
      title: "Emergency SOS",
      icon: Phone,
      position: "bottom-left",
      description: "Critical alert system"
    }
  ]

  const getPositionClasses = (position: string) => {
    const positions = {
      "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      "top-left": "top-8 left-8",
      "top": "top-8 left-1/2 transform -translate-x-1/2",
      "top-right": "top-8 right-8",
      "right": "top-1/2 right-8 transform -translate-y-1/2",
      "bottom-right": "bottom-8 right-8",
      "bottom": "bottom-8 left-1/2 transform -translate-x-1/2",
      "bottom-left": "bottom-8 left-8"
    }
    return positions[position as keyof typeof positions] || ""
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">System Architecture</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            <span className="gradient-text">Integrated Care</span> Ecosystem
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore how all ElderCare+ modules work together seamlessly to provide 
            comprehensive healthcare management for senior citizens.
          </p>
        </div>

        {/* Interactive Diagram */}
        <div className="relative w-full h-[600px] mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/10">
            
            {/* Center App */}
            <div className={`absolute ${getPositionClasses("center")} z-20`}>
              <Card className="w-32 h-32 md:w-40 md:h-40 bg-primary hover:bg-primary-hover shadow-xl border-0 cursor-pointer hover-glow transition-smooth">
                <CardContent className="flex flex-col items-center justify-center h-full text-primary-foreground">
                  <Heart className="w-8 h-8 md:w-10 md:h-10 mb-2" />
                  <div className="text-center">
                    <div className="font-bold text-sm md:text-base">ElderCare+</div>
                    <div className="text-xs opacity-90">Core Platform</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Module Cards */}
            {modules.map((module, index) => {
              const IconComponent = module.icon
              const isActive = activeModule === module.id
              
              return (
                <div
                  key={module.id}
                  className={`absolute ${getPositionClasses(module.position)} animate-scale-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card 
                    className={`w-24 h-24 md:w-28 md:h-28 cursor-pointer transition-smooth hover-lift hover-glow
                      ${isActive ? 'bg-secondary shadow-xl scale-110' : 'card-bg shadow-lg'}
                      border border-primary/20`}
                    onMouseEnter={() => setActiveModule(module.id)}
                    onMouseLeave={() => setActiveModule(null)}
                  >
                    <CardContent className="flex flex-col items-center justify-center h-full p-2">
                      <IconComponent className={`w-6 h-6 md:w-7 md:h-7 mb-1 ${
                        isActive ? 'text-secondary-foreground' : 'text-primary'
                      }`} />
                      <div className="text-xs font-semibold text-center leading-tight">
                        {module.title}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Connection Lines */}
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-gradient-to-t from-primary/30 to-transparent transform -translate-x-1/2 origin-bottom rotate-45" />
                </div>
              )
            })}

            {/* Animated Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
              {modules.map((module, index) => (
                <line
                  key={module.id}
                  x1="50%"
                  y1="50%"
                  x2={module.position.includes('left') ? '15%' : module.position.includes('right') ? '85%' : '50%'}
                  y2={module.position.includes('top') ? '15%' : module.position.includes('bottom') ? '85%' : '50%'}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </svg>
          </div>

          {/* Active Module Description */}
          {activeModule && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <Card className="glass-effect border border-primary/20 animate-fade-in-up">
                <CardContent className="px-6 py-3">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">
                      {modules.find(m => m.id === activeModule)?.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {modules.find(m => m.id === activeModule)?.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

   
      </div>
    </section>
  )
}