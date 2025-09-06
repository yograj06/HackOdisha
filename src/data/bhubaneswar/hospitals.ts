export interface Hospital {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone?: string;
  specialties: string[];
}

export const BHUBANESWAR_HOSPITALS: Hospital[] = [
  {
    id: "aiims-bbsr",
    name: "AIIMS Bhubaneswar",
    type: "Government Medical College & Hospital",
    address: "Sijua, Patrapada",
    city: "Bhubaneswar",
    lat: 20.270,
    lng: 85.812,
    phone: "0674-2476281 (Demo)",
    specialties: ["Cardiology", "Neurology", "Oncology", "Emergency", "General Medicine"]
  },
  {
    id: "kims-bbsr",
    name: "Kalinga Institute of Medical Sciences (KIMS)",
    type: "Private Hospital",
    address: "KIIT Campus, Patia",
    city: "Bhubaneswar",
    lat: 20.355,
    lng: 85.818,
    phone: "0674-2725555 (Demo)",
    specialties: ["Cardiac Surgery", "Orthopedics", "Pediatrics", "Gynecology"]
  },
  {
    id: "sum-bbsr",
    name: "IMS & SUM Hospital",
    type: "Private Medical College & Hospital",
    address: "K8, Kalinga Nagar",
    city: "Bhubaneswar",
    lat: 20.295,
    lng: 85.785,
    phone: "0674-2386281 (Demo)",
    specialties: ["General Surgery", "Internal Medicine", "Emergency", "Dermatology"]
  },
  {
    id: "apollo-bbsr",
    name: "Apollo Hospitals Bhubaneswar",
    type: "Private Hospital",
    address: "Sainik School Road, Unit 15",
    city: "Bhubaneswar",
    lat: 20.296,
    lng: 85.819,
    phone: "0674-6677000 (Demo)",
    specialties: ["Multi-specialty", "Critical Care", "Oncology", "Cardiac Care"]
  },
  {
    id: "care-bbsr",
    name: "CARE Hospitals Bhubaneswar",
    type: "Private Hospital",
    address: "Unit 15, Near DAV Public School",
    city: "Bhubaneswar",
    lat: 20.299,
    lng: 85.823,
    phone: "0674-6677888 (Demo)",
    specialties: ["Emergency", "ICU", "General Medicine", "Surgery"]
  },
  {
    id: "manipal-bbsr",
    name: "Manipal Hospitals Bhubaneswar",
    type: "Private Hospital",
    address: "Plot No 1, Beside Bhubaneswar Railway Station",
    city: "Bhubaneswar",
    lat: 20.259,
    lng: 85.834,
    phone: "0674-6677999 (Demo)",
    specialties: ["Cardiology", "Orthopedics", "Nephrology", "Emergency"]
  },
  {
    id: "city-hospital",
    name: "City Hospital & Research Centre",
    type: "Private Hospital",
    address: "Sector 9, CDA, Cuttack Road",
    city: "Bhubaneswar",
    lat: 20.285,
    lng: 85.847,
    phone: "0674-2301020 (Demo)",
    specialties: ["General Medicine", "Surgery", "Pediatrics", "Gynecology"]
  },
  {
    id: "hi-tech-bbsr",
    name: "Hi-Tech Medical College & Hospital",
    type: "Private Medical College",
    address: "Pandara, Rourkela Road",
    city: "Bhubaneswar",
    lat: 20.341,
    lng: 85.772,
    phone: "0674-2350410 (Demo)",
    specialties: ["Medical Education", "General Hospital", "Emergency"]
  },
  {
    id: "capital-hospital",
    name: "Capital Hospital",
    type: "Government Hospital",
    address: "Unit 6, Near Master Canteen Square",
    city: "Bhubaneswar",
    lat: 20.272,
    lng: 85.834,
    phone: "0674-2391234 (Demo)",
    specialties: ["General Medicine", "Emergency", "Outpatient Services"]
  },
  {
    id: "sparsh-hospital",
    name: "Sparsh Hospital & Critical Care",
    type: "Private Hospital",
    address: "Plot 335, Jayadev Vihar",
    city: "Bhubaneswar",
    lat: 20.309,
    lng: 85.825,
    phone: "0674-6556677 (Demo)",
    specialties: ["Critical Care", "Emergency", "General Medicine", "Surgery"]
  }
];