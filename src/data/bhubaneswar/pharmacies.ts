export interface Pharmacy {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone?: string;
  hours: string;
  services: string[];
  medicinesAvailable: string[];
}

export const BHUBANESWAR_PHARMACIES: Pharmacy[] = [
  {
    id: "apollo-pharmacy-1",
    name: "Apollo Pharmacy",
    type: "Chain Pharmacy",
    address: "Jaydev Vihar, Unit 8",
    city: "Bhubaneswar",
    lat: 20.3074,
    lng: 85.8245,
    phone: "+91 9876543210",
    hours: "7:00 AM - 11:00 PM",
    services: ["Home Delivery", "Online Orders", "Prescription Refills", "Health Checkups"],
    medicinesAvailable: ["paracetamol", "amoxicillin", "metformin", "atorvastatin", "omeprazole"]
  },
  {
    id: "medplus-1",
    name: "MedPlus Pharmacy",
    type: "Chain Pharmacy",
    address: "Saheed Nagar, Unit 2",
    city: "Bhubaneswar",
    lat: 20.2899,
    lng: 85.8340,
    phone: "+91 9876543211",
    hours: "8:00 AM - 10:00 PM",
    services: ["Home Delivery", "Online Orders", "Generic Medicines", "Health Products"],
    medicinesAvailable: ["paracetamol", "aspirin", "insulin", "lisinopril", "metformin"]
  },
  {
    id: "apollo-pharmacy-2",
    name: "Apollo Pharmacy",
    type: "Chain Pharmacy",
    address: "Patia, Near KIIT University",
    city: "Bhubaneswar",
    lat: 20.3551,
    lng: 85.8180,
    phone: "+91 9876543212",
    hours: "24 Hours",
    services: ["24/7 Service", "Emergency Medicines", "Home Delivery", "Online Orders"],
    medicinesAvailable: ["paracetamol", "amoxicillin", "atorvastatin", "amlodipine", "omeprazole"]
  },
  {
    id: "local-medical-1",
    name: "Bhubaneswar Medical Store",
    type: "Local Pharmacy",
    address: "Old Town, Near Lingaraj Temple",
    city: "Bhubaneswar",
    lat: 20.2370,
    lng: 85.8378,
    phone: "+91 9876543213",
    hours: "6:00 AM - 10:00 PM",
    services: ["Traditional Medicines", "Prescription Medicines", "Ayurvedic Products"],
    medicinesAvailable: ["paracetamol", "aspirin", "metformin", "lisinopril"]
  },
  {
    id: "medplus-2",
    name: "MedPlus Pharmacy",
    type: "Chain Pharmacy",
    address: "Khandagiri, Unit 11",
    city: "Bhubaneswar",
    lat: 20.2736,
    lng: 85.7983,
    phone: "+91 9876543214",
    hours: "8:00 AM - 10:00 PM",
    services: ["Home Delivery", "Generic Medicines", "Health Checkups", "Online Orders"],
    medicinesAvailable: ["insulin", "metformin", "atorvastatin", "amlodipine", "omeprazole"]
  },
  {
    id: "wellness-pharmacy",
    name: "Wellness Pharmacy",
    type: "Local Pharmacy",
    address: "Mancheswar, Industrial Estate",
    city: "Bhubaneswar",
    lat: 20.2995,
    lng: 85.7804,
    phone: "+91 9876543215",
    hours: "7:00 AM - 9:00 PM",
    services: ["Industrial Area Service", "Worker Health", "Prescription Medicines"],
    medicinesAvailable: ["paracetamol", "aspirin", "amoxicillin", "lisinopril"]
  },
  {
    id: "city-medical",
    name: "City Medical Hall",
    type: "Local Pharmacy",
    address: "Master Canteen Square, Unit 6",
    city: "Bhubaneswar",
    lat: 20.2720,
    lng: 85.8340,
    phone: "+91 9876543216",
    hours: "8:00 AM - 9:00 PM",
    services: ["Central Location", "Quick Service", "Prescription Medicines", "Health Products"],
    medicinesAvailable: ["paracetamol", "metformin", "atorvastatin", "omeprazole", "aspirin"]
  },
  {
    id: "apollo-pharmacy-3",
    name: "Apollo Pharmacy",
    type: "Chain Pharmacy",
    address: "Chandrasekharpur, Unit 9",
    city: "Bhubaneswar",
    lat: 20.3210,
    lng: 85.8456,
    phone: "+91 9876543217",
    hours: "7:00 AM - 11:00 PM",
    services: ["Home Delivery", "Online Orders", "Health Checkups", "Prescription Refills"],
    medicinesAvailable: ["insulin", "metformin", "atorvastatin", "amlodipine", "lisinopril"]
  }
];