import { PatientPrescription, PatientLabReport } from '../types';

export const INITIAL_PRESCRIPTIONS: PatientPrescription[] = [
  {
    id: 'rx-001',
    medicationName: 'Metformin HCl (Titrated)',
    dosage: '1000 mg Oral',
    frequency: 'Twice daily with meals',
    prescribedBy: 'Dr. Sarah Chen, MD (via AuraFlow Clinical OS)',
    date: 'Oct 17, 2026',
    instructions: 'Take with morning and evening meals. Drink plenty of water.',
    refillsRemaining: 3,
    status: 'Active',
  },
  {
    id: 'rx-002',
    medicationName: 'Empagliflozin (Jardiance)',
    dosage: '10 mg Oral',
    frequency: 'Once daily morning',
    prescribedBy: 'Dr. Sarah Chen, MD',
    date: 'Oct 17, 2026',
    instructions: 'Stay hydrated throughout the day to support kidney clearance.',
    refillsRemaining: 2,
    status: 'Active',
  },
  {
    id: 'rx-003',
    medicationName: 'Atorvastatin Calcium',
    dosage: '20 mg Oral',
    frequency: 'Once daily at bedtime',
    prescribedBy: 'Dr. Sarah Mukherjee, MD',
    date: 'Sep 10, 2026',
    instructions: 'Maintain low cholesterol diet. Report unexpected muscle pain.',
    refillsRemaining: 5,
    status: 'Active',
  },
];

export const INITIAL_LAB_REPORTS: PatientLabReport[] = [
  {
    id: 'rep-01',
    testName: 'CarePulse Master Health Checkup (88 Parameters)',
    testCategory: 'Comprehensive Preventive Screen',
    date: 'Oct 16, 2026',
    status: 'Completed',
    summary: 'Normal liver and renal markers. Mild elevated HbA1c (8.6%) and LDL cholesterol (138 mg/dL).',
    criticalFlag: false,
  },
  {
    id: 'rep-02',
    testName: 'Advanced 3-Tesla Brain & Spine MRI Scan',
    testCategory: 'Neuro-Imaging',
    date: 'Oct 14, 2026',
    status: 'Completed',
    summary: 'No acute intracranial hemorrhage or territorial infarction. Normal ventricular caliber.',
    criticalFlag: false,
  },
  {
    id: 'rep-03',
    testName: 'Resting 12-Lead Electrocardiogram (ECG)',
    testCategory: 'Cardiology',
    date: 'Oct 12, 2026',
    status: 'Completed',
    summary: 'Normal sinus rhythm @ 74 bpm. No pathological Q waves or ST-T changes.',
    criticalFlag: false,
  },
];
