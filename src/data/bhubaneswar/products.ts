export interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  prescription: boolean;
}

export const BHUBANESWAR_PRODUCTS: Medicine[] = [
  // Pain Relief & Fever
  {
    id: "dolo-650",
    name: "Dolo 650 (Paracetamol)",
    price: 45.50,
    description: "Effective fever and pain relief tablet, 15 tablets pack",
    category: "Pain Relief",
    inStock: true,
    prescription: false
  },
  {
    id: "combiflam",
    name: "Combiflam Tablet",
    price: 52.80,
    description: "Combination of Ibuprofen and Paracetamol, 20 tablets",
    category: "Pain Relief", 
    inStock: true,
    prescription: false
  },
  {
    id: "aspirin-75",
    name: "Ecosprin 75mg",
    price: 18.90,
    description: "Low dose aspirin for heart protection, 14 tablets",
    category: "Cardiovascular",
    inStock: true,
    prescription: true
  },

  // Diabetes Management
  {
    id: "metformin-500",
    name: "Metformin 500mg",
    price: 85.60,
    description: "Diabetes management medication, 30 tablets strip",
    category: "Diabetes",
    inStock: true,
    prescription: true
  },
  {
    id: "glimepiride-1",
    name: "Amaryl 1mg (Glimepiride)",
    price: 124.70,
    description: "Blood sugar control medication, 30 tablets",
    category: "Diabetes",
    inStock: true,
    prescription: true
  },

  // Heart & BP Medications
  {
    id: "telmisartan-40",
    name: "Telmisartan 40mg",
    price: 156.30,
    description: "Blood pressure control medication, 15 tablets",
    category: "Cardiovascular",
    inStock: true,
    prescription: true
  },
  {
    id: "atorva-10",
    name: "Atorvastatin 10mg (Lipitor)",
    price: 198.50,
    description: "Cholesterol lowering medication, 14 tablets",
    category: "Cardiovascular", 
    inStock: true,
    prescription: true
  },
  {
    id: "amlodipine-5",
    name: "Amlodipine 5mg",
    price: 67.20,
    description: "Calcium channel blocker for hypertension, 10 tablets",
    category: "Cardiovascular",
    inStock: true,
    prescription: true
  },

  // Gastric & Digestive
  {
    id: "pantocid-d",
    name: "Pantocid D Capsule", 
    price: 89.40,
    description: "Acidity and gastric relief capsule, 15 capsules",
    category: "Gastric",
    inStock: true,
    prescription: false
  },
  {
    id: "rantac-150",
    name: "Rantac 150mg",
    price: 42.30,
    description: "Acidity relief tablet, 10 tablets strip",
    category: "Gastric",
    inStock: true,
    prescription: false
  },
  {
    id: "digene-gel",
    name: "Digene Gel Antacid",
    price: 78.90,
    description: "Fast relief from acidity and gas, 170ml bottle",
    category: "Gastric",
    inStock: true,
    prescription: false
  },

  // Vitamins & Supplements
  {
    id: "shelcal-500",
    name: "Shelcal 500 (Calcium + D3)",
    price: 135.80,
    description: "Calcium and Vitamin D3 supplement, 15 tablets",
    category: "Vitamins",
    inStock: true,
    prescription: false
  },
  {
    id: "becadexamin",
    name: "Becadexamin Capsule",
    price: 164.70,
    description: "Multi-vitamin and mineral supplement, 20 capsules",
    category: "Vitamins",
    inStock: true,
    prescription: false
  },
  {
    id: "iron-folic",
    name: "Iron + Folic Acid Tablet",
    price: 48.60,
    description: "Anemia prevention supplement, 30 tablets",
    category: "Vitamins",
    inStock: true,
    prescription: false
  },

  // Cough & Cold
  {
    id: "alex-syrup",
    name: "Alex Cough Syrup",
    price: 67.50,
    description: "Relief from dry and wet cough, 100ml bottle",
    category: "Cough & Cold",
    inStock: true,
    prescription: false
  },
  {
    id: "sinarest-tablet",
    name: "Sinarest Tablet",
    price: 29.80,
    description: "Cold, cough and headache relief, 10 tablets",
    category: "Cough & Cold",
    inStock: true,
    prescription: false
  },

  // Antibiotics (Prescription)
  {
    id: "azithral-500",
    name: "Azithral 500mg",
    price: 187.20,
    description: "Antibiotic for bacterial infections, 5 tablets",
    category: "Antibiotics",
    inStock: false,
    prescription: true
  },
  {
    id: "augmentin-625",
    name: "Augmentin 625mg",
    price: 245.60,
    description: "Broad spectrum antibiotic, 10 tablets",
    category: "Antibiotics", 
    inStock: true,
    prescription: true
  },

  // Skin Care
  {
    id: "betnovate-n",
    name: "Betnovate-N Cream",
    price: 95.40,
    description: "Skin infection and allergy treatment, 20g tube",
    category: "Skin Care",
    inStock: true,
    prescription: true
  }
];