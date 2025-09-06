export interface HelperReminder {
  id: string;
  task: string;
  time: string;
  assignee: string;
  category: "checkin" | "meal" | "vitals" | "exercise" | "meds";
  urgent: boolean;
  done: boolean;
  notes?: string;
}

export const BHUBANESWAR_HELPER_REMINDERS: HelperReminder[] = [
  {
    id: "checkin-morning",
    task: "Morning Check-in",
    time: "8:30 AM",
    assignee: "Ramesh Kumar",
    category: "checkin",
    urgent: false,
    done: false,
    notes: "Daily wellness check and greeting"
  },
  {
    id: "breakfast-meds",
    task: "Breakfast & Morning Medications",
    time: "9:00 AM",
    assignee: "Ramesh Kumar",
    category: "meal",
    urgent: true,
    done: false,
    notes: "BP medication with breakfast"
  },
  {
    id: "bp-reading",
    task: "Blood Pressure Reading",
    time: "10:30 AM",
    assignee: "Ramesh Kumar",
    category: "vitals",
    urgent: false,
    done: false,
    notes: "Record in logbook"
  },
  {
    id: "lunch-reminder",
    task: "Lunch Preparation",
    time: "12:30 PM",
    assignee: "Ramesh Kumar",
    category: "meal",
    urgent: false,
    done: true,
    notes: "Light vegetarian meal"
  },
  {
    id: "afternoon-meds",
    task: "Afternoon Medications",
    time: "2:00 PM",
    assignee: "Ramesh Kumar",
    category: "meds",
    urgent: true,
    done: false,
    notes: "Diabetes medication after lunch"
  },
  {
    id: "evening-walk",
    task: "15-minute Evening Walk",
    time: "5:00 PM",
    assignee: "Ramesh Kumar",
    category: "exercise",
    urgent: false,
    done: false,
    notes: "Light exercise in the garden"
  },
  {
    id: "dinner-time",
    task: "Dinner & Evening Medications",
    time: "7:00 PM",
    assignee: "Ramesh Kumar",
    category: "meal",
    urgent: false,
    done: false,
    notes: "Early dinner with evening meds"
  },
  {
    id: "evening-checkin",
    task: "Evening Check-in",
    time: "7:30 PM",
    assignee: "Ramesh Kumar",
    category: "checkin",
    urgent: false,
    done: false,
    notes: "End of day wellness check"
  }
];

export const CATEGORY_LABELS = {
  checkin: "Check-in",
  meal: "Meals",
  vitals: "Vitals",
  exercise: "Exercise",
  meds: "Medications"
};

export const CATEGORY_COLORS = {
  checkin: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
  meal: "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300",
  vitals: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300",
  exercise: "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300",
  meds: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
};