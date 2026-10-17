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

export interface Doctor {
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
