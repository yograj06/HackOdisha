export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  city?: string;
  notes?: string;
  priority?: number;
}

export const BHUBANESWAR_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "ramesh-kumar",
    name: "Ramesh Kumar",
    relation: "Primary Caregiver",
    phone: "+91 98765 43210",
    city: "Bhubaneswar",
    priority: 1,
    notes: "Available 24/7, lives nearby"
  },
  {
    id: "dr-mishra",
    name: "Dr. S. Mishra",
    relation: "Family Doctor",
    phone: "+91 98765 01234",
    city: "Bhubaneswar",
    priority: 2,
    notes: "Apollo Hospital, Bhubaneswar - Cardiology"
  },
  {
    id: "neighbor-dash",
    name: "Mr. Dash",
    relation: "Neighbor",
    phone: "+91 98765 12345",
    city: "Bhubaneswar",
    priority: 3,
    notes: "Lives in same building, apartment 3B"
  }
];

export const EMERGENCY_HELPLINES = [
  { name: "Unified Emergency", number: "112", description: "All emergencies" },
  { name: "Ambulance", number: "108", description: "Medical emergency" },
  { name: "Medical Emergency", number: "102", description: "Medical assistance" },
  { name: "Police", number: "100", description: "Police assistance" },
  { name: "Senior Helpline", number: "1800-180-1253", description: "Senior citizen helpline" }
];