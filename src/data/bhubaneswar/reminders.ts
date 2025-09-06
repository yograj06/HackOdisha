export interface Reminder {
  id: string;
  medication: string;
  dosage: string;
  time: string;
  taken: boolean;
  urgent: boolean;
}

export const BHUBANESWAR_REMINDERS: Reminder[] = [
  {
    id: "1",
    medication: "Telmisartan 40mg",
    dosage: "1 tablet",
    time: "8:00 AM",
    taken: false,
    urgent: true
  },
  {
    id: "2",
    medication: "Dolo 650 (Paracetamol)",
    dosage: "1 tablet",
    time: "9:00 AM",
    taken: true,
    urgent: false
  },
  {
    id: "3",
    medication: "Metformin 500mg",
    dosage: "1 tablet",
    time: "1:00 PM",
    taken: false,
    urgent: false
  },
  {
    id: "4",
    medication: "Atorvastatin 10mg",
    dosage: "1 tablet",
    time: "6:00 PM",
    taken: false,
    urgent: false
  },
  {
    id: "5",
    medication: "Pantocid D",
    dosage: "1 capsule",
    time: "7:00 PM",
    taken: false,
    urgent: true
  },
  {
    id: "6",
    medication: "Calcium + Vitamin D3",
    dosage: "1 tablet",
    time: "9:00 PM",
    taken: false,
    urgent: false
  },
  {
    id: "7",
    medication: "Amlodipine 5mg",
    dosage: "1 tablet",
    time: "10:00 PM",
    taken: true,
    urgent: false
  }
];