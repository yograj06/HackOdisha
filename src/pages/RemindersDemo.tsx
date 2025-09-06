import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, Clock, Check, ArrowLeft, Bell } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { BHUBANESWAR_REMINDERS } from "@/data/bhubaneswar/reminders"

export default function RemindersDemo() {
  const { toast } = useToast()
  const [reminders, setReminders] = useState(BHUBANESWAR_REMINDERS)

  const markAsTaken = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, taken: !reminder.taken }
          : reminder
      )
    )
    
    const reminder = reminders.find(r => r.id === id)
    if (reminder && !reminder.taken) {
      toast({
        title: "✅ Medication Taken",
        description: `${reminder.medication} marked as taken`,
      })
    }
  }

  const pendingCount = reminders.filter(r => !r.taken).length
  const urgentCount = reminders.filter(r => !r.taken && r.urgent).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
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
                  <Pill className="w-6 h-6 mr-2 text-primary" />
                  Medicine Reminders Demo
                </h1>
                <p className="text-muted-foreground">Interactive medication tracking system</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Bell className="w-3 h-3 mr-1" />
                {pendingCount} Pending
              </Badge>
              {urgentCount > 0 && (
                <Badge variant="destructive" className="text-sm">
                  {urgentCount} Urgent
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Today's Medication Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      reminder.taken 
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                        : reminder.urgent
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                        : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        reminder.taken 
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                          : reminder.urgent
                          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      }`}>
                        {reminder.taken ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <Pill className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${reminder.taken ? 'line-through text-muted-foreground' : ''}`}>
                          {reminder.medication}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {reminder.dosage} • {reminder.time}
                        </p>
                        {reminder.urgent && !reminder.taken && (
                          <Badge variant="destructive" className="text-xs mt-1">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => markAsTaken(reminder.id)}
                      variant={reminder.taken ? "outline" : "default"}
                      size="sm"
                    >
                      {reminder.taken ? "Undo" : "Mark Taken"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demo Info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">🎯 Demo Features</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This demo shows medication reminders with interactive tracking. 
                  Click "Mark Taken" to track your medications and see real-time updates.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Real-time Updates</Badge>
                  <Badge variant="secondary">Urgent Notifications</Badge>
                  <Badge variant="secondary">Progress Tracking</Badge>
                  <Badge variant="secondary">Toast Notifications</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}