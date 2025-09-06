export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const BHUBANESWAR_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Pradeep Kumar Panda",
    specialty: "Cardiology",
    date: "2024-09-08",
    time: "10:00 AM",
    location: "AIIMS Bhubaneswar, OPD Block",
    notes: "Regular heart checkup, bring previous ECG reports",
    status: "upcoming"
  },
  {
    id: "2",
    doctor: "Dr. Sasmita Kumari Nayak",
    specialty: "General Medicine",
    date: "2024-09-06",
    time: "2:30 PM",
    location: "KIMS Hospital, Patia",
    notes: "Diabetes follow-up consultation",
    status: "completed"
  },
  {
    id: "3",
    doctor: "Dr. Bijay Kumar Mishra",
    specialty: "Orthopedics",
    date: "2024-09-10",
    time: "11:30 AM",
    location: "Apollo Hospitals, Unit 15",
    notes: "Knee pain evaluation and X-ray review",
    status: "upcoming"
  },
  {
    id: "4",
    doctor: "Dr. Rashmi Ranjan Sahoo",
    specialty: "Neurology",
    date: "2024-09-05",
    time: "9:15 AM",
    location: "IMS & SUM Hospital, Kalinga Nagar",
    notes: "Headache and sleep disorder consultation",
    status: "completed"
  },
  {
    id: "5",
    doctor: "Dr. Subhashree Parida",
    specialty: "Gynecology",
    date: "2024-09-12",
    time: "4:00 PM",
    location: "CARE Hospitals, Unit 15",
    notes: "Annual health screening",
    status: "upcoming"
  },
  {
    id: "6",
    doctor: "Dr. Manoj Kumar Jena",
    specialty: "Dermatology",
    date: "2024-09-03",
    time: "3:45 PM",
    location: "Manipal Hospitals, Railway Station Road",
    notes: "Skin allergy treatment follow-up",
    status: "cancelled"
  },
  {
    id: "7",
    doctor: "Dr. Anita Priyadarsini",
    specialty: "Pediatrics",
    date: "2024-09-15",
    time: "10:45 AM",
    location: "City Hospital, CDA Sector 9",
    notes: "Child vaccination and growth checkup",
    status: "upcoming"
  }
];