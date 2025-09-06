import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Clock, User, AlertCircle, Bell, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  BHUBANESWAR_HELPER_REMINDERS, 
  CATEGORY_LABELS, 
  CATEGORY_COLORS,
  HelperReminder 
} from "@/data/bhubaneswar/helper-reminders";

export default function HelperRemindersDemo() {
  const [reminders, setReminders] = useState<HelperReminder[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load from localStorage or use default data
    const saved = localStorage.getItem('helper:reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    } else {
      setReminders(BHUBANESWAR_HELPER_REMINDERS);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever reminders change
    localStorage.setItem('helper:reminders', JSON.stringify(reminders));
  }, [reminders]);

  const toggleDone = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, done: !reminder.done }
          : reminder
      )
    );
  };

  const snoozeReminder = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      const currentTime = new Date();
      const [hours, minutes] = reminder.time.split(':');
      const timeString = reminder.time.includes('AM') || reminder.time.includes('PM') 
        ? reminder.time 
        : `${hours}:${minutes}`;
      
      // Simple demo snooze - just add 10 minutes to display
      const newTime = `${timeString} (+10m)`;
      
      setReminders(prev =>
        prev.map(r => 
          r.id === id 
            ? { ...r, time: newTime }
            : r
        )
      );

      toast({
        title: "Reminder Snoozed",
        description: `"${reminder.task}" delayed by 10 minutes`,
      });
    }
  };

  const nudgeHelper = (assignee: string) => {
    toast({
      title: "Helper Notified",
      description: `Reminder sent to ${assignee} (demo)`,
    });
  };

  const groupedReminders = reminders.reduce((acc, reminder) => {
    if (!acc[reminder.category]) {
      acc[reminder.category] = [];
    }
    acc[reminder.category].push(reminder);
    return acc;
  }, {} as Record<string, HelperReminder[]>);

  const pendingCount = reminders.filter(r => !r.done).length;
  const urgentCount = reminders.filter(r => r.urgent && !r.done).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Senior Helper Reminders</h1>
            <p className="text-muted-foreground">Bhubaneswar Demo</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{pendingCount}</div>
              <p className="text-sm text-muted-foreground">tasks remaining today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Urgent Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{urgentCount}</div>
              <p className="text-sm text-muted-foreground">require immediate attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Reminders by Category */}
        <div className="space-y-6">
          {Object.entries(groupedReminders).map(([category, categoryReminders]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className={CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]}>
                    {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]}
                  </Badge>
                  <span className="ml-3">{categoryReminders.length} items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryReminders.map((reminder, index) => (
                  <div key={reminder.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`font-semibold ${reminder.done ? 'line-through text-muted-foreground' : ''}`}>
                            {reminder.task}
                          </h3>
                          {reminder.urgent && !reminder.done && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {reminder.time}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {reminder.assignee}
                          </div>
                        </div>

                        {reminder.notes && (
                          <p className="text-sm text-muted-foreground">
                            {reminder.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Done</span>
                          <Switch 
                            checked={reminder.done}
                            onCheckedChange={() => toggleDone(reminder.id)}
                          />
                        </div>
                        
                        {!reminder.done && (
                          <div className="flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => snoozeReminder(reminder.id)}
                            >
                              <Timer className="w-3 h-3 mr-1" />
                              Snooze 10m
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => nudgeHelper(reminder.assignee)}
                            >
                              <Bell className="w-3 h-3 mr-1" />
                              Nudge Helper
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}