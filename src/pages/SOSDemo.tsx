import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, AlertTriangle, Phone, Copy, MessageSquare, MapPin, Clock, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BHUBANESWAR_EMERGENCY_CONTACTS, EMERGENCY_HELPLINES, EmergencyContact } from "@/data/bhubaneswar/emergency-contacts";
import { BHUBANESWAR_HOSPITALS } from "@/data/bhubaneswar/hospitals";
import { distanceInKm, googleMapsLink, getCurrentLocation, BHUBANESWAR_CENTER } from "@/lib/geo";

export default function SOSDemo() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestHospitals, setNearestHospitals] = useState<any[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [showActions, setShowActions] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load contacts from localStorage or use defaults
    const savedContacts = localStorage.getItem('sos:contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(BHUBANESWAR_EMERGENCY_CONTACTS);
    }

    // Get user location
    getCurrentLocation().then(location => {
      if (location) {
        setUserLocation(location);
      } else {
        setUserLocation(BHUBANESWAR_CENTER);
        toast({
          title: "Location Access Denied",
          description: "Using Bhubaneswar city center as fallback location.",
        });
      }
    });
  }, []);

  useEffect(() => {
    // Calculate nearest hospitals when location is available
    if (userLocation) {
      const hospitalsWithDistance = BHUBANESWAR_HOSPITALS.map(hospital => ({
        ...hospital,
        distance: distanceInKm(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng)
      })).sort((a, b) => a.distance - b.distance).slice(0, 3);

      setNearestHospitals(hospitalsWithDistance);

      // Update emergency message with location
      const locationLink = googleMapsLink(userLocation.lat, userLocation.lng);
      setEmergencyMessage(`EMERGENCY: Need help now. Last known location: ${locationLink}`);
    }
  }, [userLocation]);

  useEffect(() => {
    // Select all contacts by default
    setSelectedContacts(contacts.map(c => c.id));
  }, [contacts]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdownActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdownActive && countdown === 0) {
      handleSOSSent();
    }
    return () => clearTimeout(timer);
  }, [countdown, countdownActive]);

  const startSOS = () => {
    setCountdownActive(true);
    setCountdown(5);
  };

  const cancelSOS = () => {
    setCountdownActive(false);
    setCountdown(5);
  };

  const handleSOSSent = () => {
    setCountdownActive(false);
    setShowActions(true);
    toast({
      title: "SOS Alert Sent",
      description: "Emergency alert has been triggered (demo mode)",
      variant: "destructive"
    });
  };

  const copyEmergencyMessage = async () => {
    try {
      await navigator.clipboard.writeText(emergencyMessage);
      toast({
        title: "Message Copied",
        description: "Emergency message copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy message to clipboard",
        variant: "destructive"
      });
    }
  };

  const sendSMS = (contact: EmergencyContact) => {
    const smsLink = `sms:${contact.phone}?body=${encodeURIComponent(emergencyMessage)}`;
    window.open(smsLink, '_blank');
    toast({
      title: "SMS Opened",
      description: `SMS app opened for ${contact.name} (demo)`,
    });
  };

  const callNumber = (number: string, name: string) => {
    window.open(`tel:${number}`, '_blank');
    toast({
      title: "Call Initiated",
      description: `Calling ${name} at ${number} (demo)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Emergency SOS</h1>
            </div>
          </div>
          <Link to="/demo/sos/contacts">
            <Button variant="outline">
              Manage Contacts
            </Button>
          </Link>
        </div>

        {/* SOS Button */}
        <div className="text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                variant="destructive" 
                className="w-32 h-32 rounded-full text-2xl font-bold shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-8 h-8 mb-2" />
                  SOS
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency SOS Alert
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {countdownActive ? (
                    <div className="text-center py-4">
                      <div className="text-4xl font-bold text-red-600 mb-2">{countdown}</div>
                      <p>Emergency alert will be sent automatically</p>
                      <p className="text-sm text-muted-foreground mt-2">Click Cancel to stop</p>
                    </div>
                  ) : (
                    "This will send an emergency alert to your contacts and provide quick access to emergency services. Are you sure you want to proceed?"
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelSOS}>Cancel</AlertDialogCancel>
                {!countdownActive && (
                  <AlertDialogAction onClick={startSOS} className="bg-red-600 hover:bg-red-700">
                    Send SOS Alert
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {showActions && (
          <div className="space-y-6">
            {/* Emergency Helplines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Helplines
                </CardTitle>
                <CardDescription>Tap to call emergency services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {EMERGENCY_HELPLINES.map((helpline) => (
                    <Button
                      key={helpline.number}
                      variant="outline"
                      className="justify-start h-auto p-4"
                      onClick={() => callNumber(helpline.number, helpline.name)}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{helpline.name}</div>
                        <div className="text-lg font-bold text-primary">{helpline.number}</div>
                        <div className="text-xs text-muted-foreground">{helpline.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nearest Hospitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Nearest Hospitals
                </CardTitle>
                <CardDescription>Based on your current location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearestHospitals.map((hospital) => (
                    <div key={hospital.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{hospital.name}</h3>
                        <p className="text-sm text-muted-foreground">{hospital.address}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <Badge variant="secondary">
                            <Navigation className="w-3 h-3 mr-1" />
                            {hospital.distance.toFixed(1)} km
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {hospital.specialties.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {hospital.phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => callNumber(hospital.phone, hospital.name)}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(googleMapsLink(hospital.lat, hospital.lng), '_blank')}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Maps
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Notify Emergency Contacts
                </CardTitle>
                <CardDescription>Select contacts to notify</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={(checked) => {
                            setSelectedContacts(prev =>
                              checked
                                ? [...prev, contact.id]
                                : prev.filter(id => id !== contact.id)
                            );
                          }}
                        />
                        <div>
                          <p className="font-semibold">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.relation} • {contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => callNumber(contact.phone, contact.name)}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendSMS(contact)}
                        >
                          <MessageSquare className="w-3 h-3 mr-1" />
                          SMS
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium mb-2">Emergency Message:</label>
                  <Textarea
                    value={emergencyMessage}
                    onChange={(e) => setEmergencyMessage(e.target.value)}
                    rows={3}
                    className="mb-3"
                  />
                  <Button onClick={copyEmergencyMessage} className="w-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Emergency Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}