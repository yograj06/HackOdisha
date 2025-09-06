import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, ArrowLeft, Plus, User, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { BHUBANESWAR_APPOINTMENTS, Appointment } from "@/data/bhubaneswar/appointments"

export default function ScheduleDemo() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState(BHUBANESWAR_APPOINTMENTS)

  const [showForm, setShowForm] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
    notes: ""
  })

  const handleAddAppointment = () => {
    if (!newAppointment.doctor || !newAppointment.date || !newAppointment.time) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in doctor, date, and time fields",
        variant: "destructive"
      })
      return
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: "upcoming"
    }

    setAppointments(prev => [appointment, ...prev])
    setNewAppointment({
      doctor: "",
      specialty: "",
      date: "",
      time: "",
      location: "",
      notes: ""
    })
    setShowForm(false)

    toast({
      title: "✅ Appointment Scheduled",
      description: `Appointment with ${newAppointment.doctor} has been added`,
    })
  }

  const upcomingCount = appointments.filter(a => a.status === "upcoming").length

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
                  <Calendar className="w-6 h-6 mr-2 text-primary" />
                  Doctor Schedule
                </h1>
                <p className="text-muted-foreground">Manage your medical appointments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {upcomingCount} Upcoming
              </Badge>
              <Button onClick={() => setShowForm(!showForm)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Add Appointment Form */}
          {showForm && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Schedule New Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doctor">Doctor Name *</Label>
                    <Input
                      id="doctor"
                      value={newAppointment.doctor}
                      onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                      placeholder="e.g., Dr. Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={newAppointment.specialty}
                      onChange={(e) => setNewAppointment({...newAppointment, specialty: e.target.value})}
                      placeholder="e.g., Cardiologist"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAppointment.location}
                      onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                      placeholder="e.g., Main Hospital, Room 205"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      placeholder="Any special instructions or reminders..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddAppointment}>
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appointments List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Your Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      appointment.status === "completed"
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                        : appointment.status === "cancelled"
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                        : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.doctor}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </div>
                          {appointment.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {appointment.location}
                            </div>
                          )}
                        </div>
                        
                        {appointment.notes && (
                          <p className="mt-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                      
                      <Badge 
                        variant={
                          appointment.status === "completed" ? "default" :
                          appointment.status === "cancelled" ? "destructive" : "secondary"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}