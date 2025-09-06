import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Edit, Trash2, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BHUBANESWAR_EMERGENCY_CONTACTS, EmergencyContact } from "@/data/bhubaneswar/emergency-contacts";

export default function SOSContactsDemo() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    phone: "",
    city: "",
    notes: "",
    priority: 1
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load contacts from localStorage or use defaults
    const savedContacts = localStorage.getItem('sos:contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(BHUBANESWAR_EMERGENCY_CONTACTS);
      localStorage.setItem('sos:contacts', JSON.stringify(BHUBANESWAR_EMERGENCY_CONTACTS));
    }
  }, []);

  const saveContacts = (newContacts: EmergencyContact[]) => {
    setContacts(newContacts);
    localStorage.setItem('sos:contacts', JSON.stringify(newContacts));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      relation: "",
      phone: "",
      city: "",
      notes: "",
      priority: 1
    });
    setEditingContact(null);
  };

  const openEditDialog = (contact?: EmergencyContact) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        name: contact.name,
        relation: contact.relation,
        phone: contact.phone,
        city: contact.city || "",
        notes: contact.notes || "",
        priority: contact.priority || 1
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.relation || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Name, relation, and phone are required fields.",
        variant: "destructive"
      });
      return;
    }

    const contactData: EmergencyContact = {
      id: editingContact?.id || `contact-${Date.now()}`,
      name: formData.name,
      relation: formData.relation,
      phone: formData.phone,
      city: formData.city || undefined,
      notes: formData.notes || undefined,
      priority: formData.priority
    };

    let newContacts;
    if (editingContact) {
      newContacts = contacts.map(c => c.id === editingContact.id ? contactData : c);
      toast({
        title: "Contact Updated",
        description: `${contactData.name} has been updated successfully.`,
      });
    } else {
      newContacts = [...contacts, contactData];
      toast({
        title: "Contact Added",
        description: `${contactData.name} has been added to your emergency contacts.`,
      });
    }

    saveContacts(newContacts);
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (contact: EmergencyContact) => {
    const newContacts = contacts.filter(c => c.id !== contact.id);
    saveContacts(newContacts);
    toast({
      title: "Contact Deleted",
      description: `${contact.name} has been removed from your emergency contacts.`,
    });
  };

  const sortedContacts = [...contacts].sort((a, b) => (a.priority || 999) - (b.priority || 999));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/demo/sos">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to SOS
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Emergency Contacts</h1>
              <p className="text-muted-foreground">Manage your emergency contact list</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openEditDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingContact ? "Edit Contact" : "Add New Contact"}
                </DialogTitle>
                <DialogDescription>
                  {editingContact ? "Update the contact information below." : "Add a new emergency contact to your list."}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="relation">Relation *</Label>
                  <Input
                    id="relation"
                    value={formData.relation}
                    onChange={(e) => setFormData(prev => ({ ...prev, relation: e.target.value }))}
                    placeholder="e.g., Family Doctor, Neighbor, Son"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Bhubaneswar"
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="1"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
                    placeholder="1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional information..."
                    rows={2}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingContact ? "Update" : "Add"} Contact
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Contacts List */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contacts ({contacts.length})</CardTitle>
            <CardDescription>
              These contacts will be notified during an emergency. Contacts are sorted by priority.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedContacts.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No emergency contacts added yet.</p>
                <Button className="mt-4" onClick={() => openEditDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedContacts.map((contact) => (
                  <div key={contact.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{contact.name}</h3>
                        {contact.priority && contact.priority <= 3 && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Priority {contact.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {contact.relation}
                      </p>
                      <p className="text-sm font-mono">{contact.phone}</p>
                      {contact.city && (
                        <p className="text-xs text-muted-foreground">{contact.city}</p>
                      )}
                      {contact.notes && (
                        <p className="text-xs text-muted-foreground mt-2">{contact.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`tel:${contact.phone}`, '_blank')}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(contact)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {contact.name} from your emergency contacts? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(contact)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}