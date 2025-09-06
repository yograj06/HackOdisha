import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Pill, 
  Calendar, 
  Map, 
  ShoppingCart, 
  Clock,
  ArrowRight
} from "lucide-react"

interface GetStartedDialogProps {
  children: React.ReactNode
}

export function GetStartedDialog({ children }: GetStartedDialogProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const modules = [
    {
      id: "medicine-health",
      icon: Pill,
      title: "Medicine & Health Reminder",
      description: "Smart medication reminders and health tracking"
    },
    {
      id: "doctor-schedule",
      icon: Calendar,
      title: "Doctor Schedule Manager",
      description: "Manage appointments and medical history"
    },
    {
      id: "medical-map",
      icon: Map,
      title: "Nearby Medical Stores & Hospitals",
      description: "Find nearby pharmacies and healthcare facilities"
    },
    {
      id: "medicine-ordering",
      icon: ShoppingCart,
      title: "Medicine Ordering & Partnerships",
      description: "Order medicines with trusted pharmacy partners"
    },
    {
      id: "senior-reminders",
      icon: Clock,
      title: "Senior Citizen Helper Reminders",
      description: "Daily activity and wellness check-ins"
    }
  ]

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handleGetStarted = () => {
    if (selectedModules.length > 0) {
      // Smooth scroll to features section with highlighting
      const featuresSection = document.getElementById('features')
      if (featuresSection) {
        // Add URL parameters for highlighting
        const params = new URLSearchParams()
        params.set('highlight', selectedModules.join(','))
        window.history.pushState({}, '', `/#features?${params.toString()}`)
        
        // Smooth scroll to features
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        
        // Trigger highlighting after scroll
        setTimeout(() => {
          window.dispatchEvent(new Event('highlightModules'))
        }, 1000)
      }
      setOpen(false)
    } else {
      // Demo: Auto-select some modules for demonstration
      const demoModules = ['medicine-health', 'doctor-schedule', 'medical-map']
      setSelectedModules(demoModules)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your <span className="gradient-text">Care Modules</span>
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Select the features that matter most to you. You can always add more later.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-6">
          {modules.map((module) => {
            const IconComponent = module.icon
            const isSelected = selectedModules.includes(module.id)
            
            return (
              <div
                key={module.id}
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50 hover:bg-accent/30'
                }`}
                onClick={() => handleModuleToggle(module.id)}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleModuleToggle(module.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    } flex items-center justify-center transition-colors`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{module.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              // Demo: Navigate to features section
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              setOpen(false)
            }}
            className="flex-1"
          >
            Browse All Features
          </Button>
          <Button
            onClick={handleGetStarted}
            className="flex-1 group"
          >
            {selectedModules.length === 0 ? 'Try Demo Selection' : 'Get Started with Selected'}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {selectedModules.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Select modules above or click "Try Demo Selection" to see a sample selection
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}