// ==========================================
// PORTION 1: AuraCare (Hospital Staff & Inpatients)
// ==========================================
export type AppointmentStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
export type DoctorAvailability = 'Available' | 'In Surgery' | 'In Consultation' | 'Off Duty';
export type TriageLevel = 'Critical' | 'Urgent' | 'Stable' | 'Observation';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mrn: string;
  room: string;
  bed: string;
  admissionDate: string;
  department: string;
  attendingDoctor: string;
  condition: string;
  triage: TriageLevel;
  bloodType: string;
  allergies: string[];
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
  };
}

export interface HospitalStaffDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  department: string;
  availability: DoctorAvailability;
  room: string;
  phoneExtension: string;
  patientsToday: number;
  shift: string;
  avatarColor: string;
}

export interface HospitalAppointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  room: string;
  notes?: string;
}

export interface HospitalTask {
  id: string;
  title: string;
  department: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  dueTime: string;
  completed: boolean;
}

export interface DashboardMetrics {
  patientCount: {
    total: number;
    admittedToday: number;
    dischargedToday: number;
  };
  todayAppointments: {
    total: number;
    scheduled: number;
    inProgress: number;
    completed: number;
  };
  availableDoctors: {
    available: number;
    inSurgery: number;
    inConsultation: number;
    totalOnDuty: number;
  };
  pendingTasks: {
    pending: number;
    highPriority: number;
    total: number;
  };
}

// ==========================================
// PORTION 2: AuraHealth (Doctor Directory & Booking)
// ==========================================
export type DoctorSpecialty =
  | 'All'
  | 'Cardiology'
  | 'Dermatology'
  | 'Pediatrics'
  | 'Neurology'
  | 'Orthopedics'
  | 'General Practice'
  | 'Oncology'
  | 'Gastroenterology';

export interface BookingTimeSlot {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  isAvailable: boolean;
}

export interface DirectoryDoctor {
  id: string;
  name: string;
  title: string;
  specialty: DoctorSpecialty;
  subspecialty: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  availabilityStatus: 'Available Today' | 'Available Tomorrow' | 'Next Available This Week' | 'Fully Booked';
  clinic: {
    name: string;
    address: string;
    neighborhood: string;
    distance: string;
  };
  consultationFee: number;
  originalFee: number;
  discountPercentage: number;
  telehealthAvailable: boolean;
  about: string;
  education: string[];
  certifications: string[];
  languages: string[];
  insurances: string[];
  slots: BookingTimeSlot[];
}

export interface BookingReceipt {
  bookingId: string;
  tokenNumber: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  consultationType: 'In-Person Visit' | 'Video Telehealth';
  fee: number;
  clinicAddress: string;
  timestamp: string;
}

// ==========================================
// PORTION 3: AuraFlow Clinical OS (1-Tap Bundle)
// ==========================================
export interface ClinicalVitalSign {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'elevated' | 'critical' | 'low';
  previousValue?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface ClinicalMedication {
  id: string;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  startedDate: string;
  indication: string;
  status: 'active' | 'titrated' | 'discontinued';
}

export interface ClinicalBundleItem {
  id: string;
  type: 'rx_titration' | 'rx_new' | 'lab_order' | 'followup_booking' | 'patient_education';
  title: string;
  subtitle: string;
  detail: string;
  selected: boolean;
  dosageOptions?: string[];
  selectedDosage?: string;
  frequencyOptions?: string[];
  selectedFrequency?: string;
  scheduleDate?: string;
  tags: string[];
}

export interface ClinicalPatientEncounter {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mrn: string;
  avatarUrl: string;
  primaryCondition: string;
  encounterReason: string;
  encounterTime: string;
  egfr: number;
  weightKg: number;
  allergies: string[];
  vitals: ClinicalVitalSign[];
  activeMedications: ClinicalMedication[];
  recentLabs: {
    id: string;
    name: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'abnormal' | 'critical';
    date: string;
  }[];
  clinicalDeltaSummary: string;
  recommendedBundle: ClinicalBundleItem[];
}

// ==========================================
// PORTION 4: MedSwiggy (Hospital Browsing & Promo)
// ==========================================
export interface Department {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  bannerImage: string;
  doctorCount: number;
  avgWaitMinutes: number;
  rating: number;
  reviewCount: number;
  description: string;
  procedures: string[];
  headDoctor: string;
  bgColor: string;
}

export interface SwiggyDoctor {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  designation: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  originalFee: number;
  discountPercentage: number;
  nextSlotTime: string;
  availableToday: boolean;
  avatarUrl: string;
  hospitalBranch: string;
  distanceKm: number;
  languages: string[];
  about: string;
  availableSlots: {
    date: string;
    slots: string[];
  }[];
}

// Alias for Portion 4 components
export type Doctor = SwiggyDoctor;

export interface DiagnosticService {
  id: string;
  name: string;
  category: 'Full Body' | 'Cardiac' | 'Scans & MRI' | 'Diabetes' | 'Women Health' | 'General';
  parametersCount: number;
  reportTurnaroundHours: number;
  homeCollectionAvailable: boolean;
  fastingRequiredHours?: number;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  includedTests: string[];
  sampleType: string;
  badge?: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  category: string;
  tagline: string;
  imageUrl: string;
  is24x7: boolean;
  rating: number;
  badge: string;
  description: string;
  keyFeatures: string[];
  headIncharge: string;
  bedCapacity?: string;
  emergencyPhone: string;
}

export interface PromoBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  couponCode: string;
  discountHighlight: string;
  validUntil: string;
  originalPrice: number;
  dealPrice: number;
  imageUrl: string;
  accentColor: string;
  includedHighlights: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  avatarUrl: string;
  date: string;
  slot: string;
  patientName: string;
  consultationType: 'In-Hospital' | 'Video Call';
  fee: number;
  tokenNumber: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface DiagnosticBooking {
  id: string;
  testId: string;
  testName: string;
  collectionType: 'Home Sample Collection' | 'Hospital Lab Visit';
  scheduledDate: string;
  scheduledTime: string;
  patientName: string;
  address?: string;
  price: number;
  status: 'Scheduled' | 'Sample Collected' | 'Report Ready';
  tokenNumber: string;
  createdAt: string;
}

export type ActiveTab = 'home' | 'doctors' | 'diagnostics' | 'bookings' | 'facilities';

export type ViewAllCategory = 'departments' | 'doctors' | 'diagnostics' | 'facilities';

// ==========================================
// PORTION 5 & MASTER SUITE NAVIGATION
// ==========================================
export type ActivePortion =
  | 'portion1_auracare'
  | 'portion2_aurahealth'
  | 'portion3_auraflow'
  | 'portion4_medswiggy'
  | 'portion5_portal';

export interface PatientPrescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  date: string;
  instructions: string;
  refillsRemaining: number;
  status: 'Active' | 'Completed';
}

export interface PatientLabReport {
  id: string;
  testName: string;
  testCategory: string;
  date: string;
  status: 'Completed' | 'Pending Review';
  summary: string;
  pdfUrl?: string;
  criticalFlag: boolean;
}
