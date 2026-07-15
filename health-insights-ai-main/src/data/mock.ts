export type RiskLevel = "low" | "moderate" | "high";
export type ParameterStatus = "normal" | "low" | "high" | "borderline";

export interface HealthParameter {
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: ParameterStatus;
  explanation: string;
  suggestion: string;
}

export interface MedicalReport {
  id: string;
  name: string;
  type: string;
  date: string;
  healthScore: number;
  risk: RiskLevel;
  status: "analyzed" | "processing" | "failed";
  patient: {
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
  };
  parameters: HealthParameter[];
}

export const currentUser = {
  name: "Aarav Sharma",
  age: 32,
  gender: "Male",
  bloodGroup: "O+",
  email: "aarav.sharma@medisense.ai",
  phone: "+91 98765 43210",
  photoInitials: "AS",
};

export const dashboardStats = {
  healthScore: 82,
  reportsUploaded: 14,
  latestAnalysis: "Complete Blood Count · 2 days ago",
  risk: "low" as RiskLevel,
  suggestions: 6,
  nextReminder: "Vitamin D — Nov 22, 2026",
};

export const bloodSugarTrend = [
  { month: "May", fasting: 96, postMeal: 132 },
  { month: "Jun", fasting: 101, postMeal: 145 },
  { month: "Jul", fasting: 99, postMeal: 138 },
  { month: "Aug", fasting: 94, postMeal: 128 },
  { month: "Sep", fasting: 92, postMeal: 121 },
  { month: "Oct", fasting: 90, postMeal: 118 },
];

export const hemoglobinTrend = [
  { month: "May", value: 13.1 },
  { month: "Jun", value: 13.4 },
  { month: "Jul", value: 13.8 },
  { month: "Aug", value: 14.0 },
  { month: "Sep", value: 14.2 },
  { month: "Oct", value: 14.5 },
];

export const cholesterolTrend = [
  { month: "May", ldl: 132, hdl: 42, total: 210 },
  { month: "Jun", ldl: 128, hdl: 44, total: 205 },
  { month: "Jul", ldl: 121, hdl: 46, total: 198 },
  { month: "Aug", ldl: 118, hdl: 48, total: 192 },
  { month: "Sep", ldl: 112, hdl: 49, total: 186 },
  { month: "Oct", ldl: 108, hdl: 51, total: 180 },
];

export const plateletTrend = [
  { month: "May", value: 210 },
  { month: "Jun", value: 232 },
  { month: "Jul", value: 245 },
  { month: "Aug", value: 260 },
  { month: "Sep", value: 255 },
  { month: "Oct", value: 268 },
];

export const sampleReport: MedicalReport = {
  id: "rep_20261012_cbc",
  name: "Complete Blood Count — Oct 2026",
  type: "CBC",
  date: "2026-10-12",
  healthScore: 82,
  risk: "low",
  status: "analyzed",
  patient: {
    name: currentUser.name,
    age: currentUser.age,
    gender: currentUser.gender,
    bloodGroup: currentUser.bloodGroup,
  },
  parameters: [
    {
      name: "Hemoglobin",
      value: "14.5",
      unit: "g/dL",
      normalRange: "13.5 – 17.5",
      status: "normal",
      explanation:
        "Hemoglobin carries oxygen through your blood. Your level is comfortably in the healthy range.",
      suggestion: "Keep iron-rich foods like spinach, lentils and lean meats in your weekly meals.",
    },
    {
      name: "Fasting Glucose",
      value: "108",
      unit: "mg/dL",
      normalRange: "70 – 99",
      status: "borderline",
      explanation:
        "Slightly above the ideal fasting range. This can be early sign of insulin resistance.",
      suggestion:
        "Reduce refined sugar, add 30 minutes of brisk walking daily and recheck in 3 months.",
    },
    {
      name: "LDL Cholesterol",
      value: "108",
      unit: "mg/dL",
      normalRange: "< 100",
      status: "high",
      explanation:
        "LDL is the ‘bad’ cholesterol. Slightly elevated levels can build up in your arteries over time.",
      suggestion: "Cut fried foods, add omega-3 (fish, walnuts) and stay active 4–5 days a week.",
    },
    {
      name: "HDL Cholesterol",
      value: "51",
      unit: "mg/dL",
      normalRange: "> 40",
      status: "normal",
      explanation: "HDL is the ‘good’ cholesterol that helps remove excess fat from your blood.",
      suggestion: "Maintain regular cardio exercise to keep HDL healthy.",
    },
    {
      name: "Platelet Count",
      value: "268",
      unit: "x10³/µL",
      normalRange: "150 – 400",
      status: "normal",
      explanation: "Platelets help your blood clot. Your count is within a healthy range.",
      suggestion: "Stay hydrated and continue a balanced diet.",
    },
    {
      name: "TSH",
      value: "2.1",
      unit: "µIU/mL",
      normalRange: "0.4 – 4.0",
      status: "normal",
      explanation: "Thyroid function looks healthy. TSH regulates your metabolism.",
      suggestion: "Recheck annually or if you notice fatigue or weight changes.",
    },
  ],
};

export const reportHistory: MedicalReport[] = [
  sampleReport,
  {
    ...sampleReport,
    id: "rep_20260920_lipid",
    name: "Lipid Profile — Sep 2026",
    type: "Lipid Profile",
    date: "2026-09-20",
    healthScore: 76,
    risk: "moderate",
  },
  {
    ...sampleReport,
    id: "rep_20260812_thyroid",
    name: "Thyroid Panel — Aug 2026",
    type: "Thyroid",
    date: "2026-08-12",
    healthScore: 88,
    risk: "low",
  },
  {
    ...sampleReport,
    id: "rep_20260710_liver",
    name: "Liver Function — Jul 2026",
    type: "LFT",
    date: "2026-07-10",
    healthScore: 71,
    risk: "moderate",
  },
  {
    ...sampleReport,
    id: "rep_20260604_kidney",
    name: "Kidney Function — Jun 2026",
    type: "KFT",
    date: "2026-06-04",
    healthScore: 84,
    risk: "low",
  },
  {
    ...sampleReport,
    id: "rep_20260510_diabetes",
    name: "Diabetes Panel — May 2026",
    type: "Diabetes",
    date: "2026-05-10",
    healthScore: 68,
    risk: "high",
    status: "analyzed",
  },
];

export const notifications = [
  {
    id: "n1",
    type: "report" as const,
    title: "New report analyzed",
    message: "Your Complete Blood Count report is ready to view.",
    time: "2 hours ago",
  },
  {
    id: "n2",
    type: "reminder" as const,
    title: "Medicine reminder",
    message: "Vitamin D — 1 capsule after breakfast.",
    time: "Today · 9:00 AM",
  },
  {
    id: "n3",
    type: "tip" as const,
    title: "Health tip",
    message: "Aim for 7,500 steps today — your LDL is trending down!",
    time: "Yesterday",
  },
  {
    id: "n4",
    type: "appointment" as const,
    title: "Upcoming appointment",
    message: "Dr. Meera Iyer — General Physician · Nov 20, 4:30 PM.",
    time: "In 3 days",
  },
];

export const chatSuggestions = [
  "What does my LDL level mean?",
  "How can I improve my fasting sugar?",
  "Explain my last thyroid report simply.",
  "What foods help lower cholesterol?",
];

export const timelineEvents = reportHistory.map((r) => ({
  id: r.id,
  date: r.date,
  title: r.name,
  type: r.type,
  score: r.healthScore,
  risk: r.risk,
}));
