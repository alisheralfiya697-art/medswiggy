import React, { useState, useMemo } from 'react';
import {
  HeartPulse,
  Users,
  TestTube2,
  Building2,
  CalendarCheck,
  ShoppingBag,
  Pill,
  ShieldCheck,
  Smartphone,
  Monitor,
  Camera,
} from 'lucide-react';

import {
  Department,
  Doctor,
  DiagnosticService,
  HospitalFacility,
  PromoBanner,
  Appointment,
  DiagnosticBooking,
  ActiveTab,
  ViewAllCategory,
  ActivePortion,
  BookingReceipt,
  ClinicalBundleItem,
} from './types';

import {
  DEPARTMENTS,
  DOCTORS,
  DIAGNOSTIC_SERVICES,
  HOSPITAL_FACILITIES,
  PROMO_BANNERS,
  HOSPITAL_BRANCHES,
} from './data/mockData';

// Master Header & Unified Deliverables
import { MasterSuiteHeader } from './components/navigation/MasterSuiteHeader';
import { UnifiedDeliverablesModal } from './components/deliverables/UnifiedDeliverablesModal';

// Portion 1: AuraCare
import { AuraCareStaffScreen } from './components/portion1_auracare/AuraCareStaffScreen';

// Portion 2: AuraHealth
import { AuraHealthDirectoryScreen } from './components/portion2_aurahealth/AuraHealthDirectoryScreen';

// Portion 3: AuraFlow Clinical OS
import { AuraFlowClinicalScreen } from './components/portion3_auraflow/AuraFlowClinicalScreen';

// Portion 4: MedSwiggy
import { SwiggyHeader } from './components/header/SwiggyHeader';
import { PromoBannerCarousel } from './components/banner/PromoBannerCarousel';
import { HorizontalScrollSection } from './components/common/HorizontalScrollSection';
import { DepartmentCard } from './components/cards/DepartmentCard';
import { DoctorCard } from './components/cards/DoctorCard';
import { DiagnosticCard } from './components/cards/DiagnosticCard';
import { FacilityCard } from './components/cards/FacilityCard';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { DoctorDetailModal } from './components/modals/DoctorDetailModal';
import { DiagnosticDetailModal } from './components/modals/DiagnosticDetailModal';
import { DepartmentDetailModal } from './components/modals/DepartmentDetailModal';
import { FacilityDetailModal } from './components/modals/FacilityDetailModal';
import { BookingSuccessModal } from './components/modals/BookingSuccessModal';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { ViewAllScreen } from './components/views/ViewAllScreen';
import { SearchScreen } from './components/views/SearchScreen';
import { BookingsCartScreen } from './components/views/BookingsCartScreen';

// Portion 5: Patient Portal
import { PatientPortalScreen } from './components/portion5_portal/PatientPortalScreen';

export default function App() {
  // Master Active Portion State (Portions 1 to 5)
  const [activePortion, setActivePortion] = useState<ActivePortion>('portion4_medswiggy');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isDeliverablesGuideOpen, setIsDeliverablesGuideOpen] = useState(false);

  // Portion 4 States (MedSwiggy)
  const [swiggyActiveTab, setSwiggyActiveTab] = useState<ActiveTab>('home');
  const [viewAllCategory, setViewAllCategory] = useState<ViewAllCategory | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(HOSPITAL_BRANCHES[0].name);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Modals
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticService | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<HospitalFacility | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Success Confirmation State
  const [successBooking, setSuccessBooking] = useState<{
    type: 'doctor' | 'diagnostic';
    title: string;
    subtitle: string;
    tokenNumber: string;
    date: string;
    slot: string;
    patientName: string;
    amount: number;
  } | null>(null);

  // Shared Bookings State
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-101',
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Mukherjee',
      departmentName: 'Cardiology',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80',
      date: 'Today, Oct 17',
      slot: '02:45 PM',
      patientName: 'Alex Johnson',
      consultationType: 'In-Hospital',
      fee: 799,
      tokenNumber: 'CP-DOC-4821',
      status: 'Confirmed',
      createdAt: '2026-10-17T09:30:00Z',
    },
  ]);

  const [diagnosticBookings, setDiagnosticBookings] = useState<DiagnosticBooking[]>([
    {
      id: 'diag-201',
      testId: 'diag-1',
      testName: 'CarePulse Master Health Checkup (88 Tests)',
      collectionType: 'Home Sample Collection',
      scheduledDate: 'Tomorrow, Oct 18',
      scheduledTime: '08:00 AM - 09:00 AM',
      patientName: 'Alex Johnson',
      address: 'Flat 402, Green Glen Layout, Indiranagar',
      price: 1499,
      status: 'Scheduled',
      tokenNumber: 'CP-LAB-9104',
      createdAt: '2026-10-17T10:15:00Z',
    },
  ]);

  // Handle Quick Filter Toggle in Portion 4
  const handleToggleFilter = (filterId: string) => {
    setActiveFilter((prev) => (prev === filterId ? null : filterId));
  };

  const filteredDoctors = useMemo(() => {
    if (!activeFilter) return DOCTORS;
    if (activeFilter === 'availableToday') return DOCTORS.filter((d) => d.availableToday);
    if (activeFilter === 'topRated') return DOCTORS.filter((d) => d.rating >= 4.93);
    if (activeFilter === 'discounted') return DOCTORS.filter((d) => d.discountPercentage >= 45);
    return DOCTORS;
  }, [activeFilter]);

  const filteredDiagnostics = useMemo(() => {
    if (!activeFilter) return DIAGNOSTIC_SERVICES;
    if (activeFilter === 'homePickup') return DIAGNOSTIC_SERVICES.filter((d) => d.homeCollectionAvailable);
    if (activeFilter === 'topRated') return DIAGNOSTIC_SERVICES.filter((d) => d.rating >= 4.92);
    if (activeFilter === 'discounted') return DIAGNOSTIC_SERVICES.filter((d) => d.discountPercentage >= 55);
    return DIAGNOSTIC_SERVICES;
  }, [activeFilter]);

  const filteredFacilities = useMemo(() => {
    if (!activeFilter) return HOSPITAL_FACILITIES;
    if (activeFilter === 'emergency247') return HOSPITAL_FACILITIES.filter((f) => f.is24x7);
    if (activeFilter === 'topRated') return HOSPITAL_FACILITIES.filter((f) => f.rating >= 4.94);
    return HOSPITAL_FACILITIES;
  }, [activeFilter]);

  // Portion 2 Booking Confirmation callback
  const handleAuraHealthBookingConfirmed = (receipt: BookingReceipt) => {
    const newApt: Appointment = {
      id: receipt.bookingId,
      doctorId: receipt.doctorId,
      doctorName: receipt.doctorName,
      departmentName: receipt.specialty,
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80',
      date: receipt.date,
      slot: receipt.time,
      patientName: receipt.patientName,
      consultationType: receipt.consultationType === 'In-Person Visit' ? 'In-Hospital' : 'Video Call',
      fee: receipt.fee,
      tokenNumber: receipt.tokenNumber,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApt, ...prev]);
  };

  // Portion 4 Doctor Booking callback
  const handleConfirmDoctorBooking = (bookingData: {
    doctorId: string;
    doctorName: string;
    departmentName: string;
    avatarUrl: string;
    date: string;
    slot: string;
    patientName: string;
    consultationType: 'In-Hospital' | 'Video Call';
    fee: number;
  }) => {
    const randomToken = `CP-DOC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      ...bookingData,
      tokenNumber: randomToken,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setSelectedDoctor(null);

    setSuccessBooking({
      type: 'doctor',
      title: bookingData.doctorName,
      subtitle: `${bookingData.departmentName} (${bookingData.consultationType})`,
      tokenNumber: randomToken,
      date: bookingData.date,
      slot: bookingData.slot,
      patientName: bookingData.patientName,
      amount: bookingData.fee,
    });
  };

  // Portion 4 Diagnostic Booking callback
  const handleConfirmDiagnosticBooking = (bookingData: {
    testId: string;
    testName: string;
    collectionType: 'Home Sample Collection' | 'Hospital Lab Visit';
    scheduledDate: string;
    scheduledTime: string;
    patientName: string;
    address?: string;
    price: number;
  }) => {
    const randomToken = `CP-LAB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: DiagnosticBooking = {
      id: `diag-b-${Date.now()}`,
      ...bookingData,
      tokenNumber: randomToken,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
    };

    setDiagnosticBookings((prev) => [newBooking, ...prev]);
    setSelectedDiagnostic(null);

    setSuccessBooking({
      type: 'diagnostic',
      title: bookingData.testName,
      subtitle: bookingData.collectionType,
      tokenNumber: randomToken,
      date: bookingData.scheduledDate,
      slot: bookingData.scheduledTime,
      patientName: bookingData.patientName,
      amount: bookingData.price,
    });
  };

  // Portion 4 Tab Change
  const handleSwiggyTabChange = (tab: ActiveTab) => {
    setSwiggyActiveTab(tab);
    if (tab === 'home') {
      setViewAllCategory(null);
    } else if (tab === 'doctors') {
      setViewAllCategory('doctors');
    } else if (tab === 'diagnostics') {
      setViewAllCategory('diagnostics');
    } else if (tab === 'facilities') {
      setViewAllCategory('facilities');
    }
  };

  // Render Portion 4 Content
  const renderPortion4Content = () => {
    if (swiggyActiveTab === 'bookings') {
      return (
        <BookingsCartScreen
          appointments={appointments}
          diagnosticBookings={diagnosticBookings}
          onBack={() => setSwiggyActiveTab('home')}
          onCancelAppointment={(id) => setAppointments((prev) => prev.filter((a) => a.id !== id))}
          onCancelDiagnostic={(id) => setDiagnosticBookings((prev) => prev.filter((d) => d.id !== id))}
          onExploreServices={() => {
            setSwiggyActiveTab('home');
            setViewAllCategory(null);
          }}
        />
      );
    }

    if (viewAllCategory) {
      return (
        <ViewAllScreen
          initialCategory={viewAllCategory}
          departments={DEPARTMENTS}
          doctors={DOCTORS}
          diagnosticServices={DIAGNOSTIC_SERVICES}
          facilities={HOSPITAL_FACILITIES}
          onBack={() => {
            setViewAllCategory(null);
            setSwiggyActiveTab('home');
          }}
          onSelectDepartment={(dept) => setSelectedDepartment(dept)}
          onSelectDoctor={(doc) => setSelectedDoctor(doc)}
          onSelectDiagnostic={(diag) => setSelectedDiagnostic(diag)}
          onSelectFacility={(fac) => setSelectedFacility(fac)}
          onBookDoctor={(doc) => setSelectedDoctor(doc)}
          onBookDiagnostic={(diag) => setSelectedDiagnostic(diag)}
        />
      );
    }

    return (
      <main className="pb-24">
        {/* Swiggy Header */}
        <SwiggyHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSearch={() => setIsSearchOpen(true)}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
          onOpenBookings={() => setSwiggyActiveTab('bookings')}
          appointmentCount={appointments.length}
          diagnosticCount={diagnosticBookings.length}
          activeFilter={activeFilter}
          onToggleFilter={handleToggleFilter}
          onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        />

        {/* Promotional Health Checkup Banner Carousel */}
        <PromoBannerCarousel
          banners={PROMO_BANNERS}
          onBookPromo={() => setSelectedDiagnostic(DIAGNOSTIC_SERVICES[0])}
        />

        {/* SECTION 1: DEPARTMENTS */}
        <HorizontalScrollSection<Department>
          id="departments-section"
          title="Hospital Departments"
          subtitle="World-class multispeciality centers of excellence"
          badge="8 DEPARTMENTS"
          icon={<HeartPulse className="w-5 h-5" />}
          data={DEPARTMENTS}
          keyExtractor={(dept) => dept.id}
          onViewAll={() => setViewAllCategory('departments')}
          viewAllLabel="View All Departments"
          renderItem={(dept) => (
            <DepartmentCard
              department={dept}
              onClick={(d) => setSelectedDepartment(d)}
            />
          )}
        />

        {/* SECTION 2: FIND A DOCTOR */}
        <HorizontalScrollSection<Doctor>
          id="doctors-section"
          title="Find a Doctor"
          subtitle="Top specialists available today • Verified 4.9+ ratings"
          badge="INSTANT SLOTS"
          icon={<Users className="w-5 h-5" />}
          data={filteredDoctors}
          keyExtractor={(doc) => doc.id}
          onViewAll={() => setViewAllCategory('doctors')}
          viewAllLabel="View All Doctors"
          renderItem={(doc) => (
            <DoctorCard
              doctor={doc}
              onClick={(d) => setSelectedDoctor(d)}
              onBookSlot={(d) => setSelectedDoctor(d)}
            />
          )}
        />

        {/* SECTION 3: DIAGNOSTIC SERVICES */}
        <HorizontalScrollSection<DiagnosticService>
          id="diagnostics-section"
          title="Diagnostic & Health Checkups"
          subtitle="Sample pickup in 30 mins • NABL certified reports in 6 hours"
          badge="SWIGGY SPEED"
          icon={<TestTube2 className="w-5 h-5" />}
          data={filteredDiagnostics}
          keyExtractor={(service) => service.id}
          onViewAll={() => setViewAllCategory('diagnostics')}
          viewAllLabel="View All Tests"
          renderItem={(service) => (
            <DiagnosticCard
              service={service}
              onClick={(s) => setSelectedDiagnostic(s)}
              onAddToCart={(s) => setSelectedDiagnostic(s)}
            />
          )}
        />

        {/* SECTION 4: HOSPITAL FACILITIES */}
        <HorizontalScrollSection<HospitalFacility>
          id="facilities-section"
          title="Hospital Facilities & Infrastructure"
          subtitle="NABH accredited suites, robotic surgery & 24/7 emergency unit"
          badge="WORLD-CLASS"
          icon={<Building2 className="w-5 h-5" />}
          data={filteredFacilities}
          keyExtractor={(fac) => fac.id}
          onViewAll={() => setViewAllCategory('facilities')}
          viewAllLabel="View All Facilities"
          renderItem={(fac) => (
            <FacilityCard
              facility={fac}
              onClick={(f) => setSelectedFacility(f)}
              onCallDesk={() => setIsEmergencyOpen(true)}
            />
          )}
        />

        {/* Bottom Navigation for Portion 4 */}
        <BottomNavBar
          activeTab={swiggyActiveTab}
          onChangeTab={handleSwiggyTabChange}
          bookingBadgeCount={appointments.length + diagnosticBookings.length}
        />
      </main>
    );
  };

  return (
    <div className={`min-h-screen bg-slate-100 ${isMobileFrame ? 'py-4 sm:py-8 flex justify-center' : ''}`}>
      {/* Mobile Simulator Frame or Full Screen Layout */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[430px] bg-white shadow-2xl rounded-[48px] overflow-hidden border-[10px] border-slate-900 min-h-[920px] relative'
            : 'bg-white min-h-screen'
        }`}
      >
        {/* iPhone Dynamic Island Simulator when in mobile frame mode */}
        {isMobileFrame && (
          <div className="bg-slate-950 pt-3 pb-2 px-6 flex items-center justify-between text-white text-[11px] font-bold select-none">
            <span>09:41</span>
            <div className="w-24 h-5 rounded-full bg-black mx-auto border border-white/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
              <div className="w-2 h-2 rounded-full bg-indigo-500/80" />
            </div>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-4 h-2.5 border border-white rounded-xs p-0.5">
                <div className="h-full bg-white rounded-2xs w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Master Suite Navigation Bar */}
        <MasterSuiteHeader
          activePortion={activePortion}
          onSelectPortion={setActivePortion}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
          onOpenDeliverablesGuide={() => setIsDeliverablesGuideOpen(true)}
        />

        {/* PORTION SWITCHER OUTLET */}
        {activePortion === 'portion1_auracare' && <AuraCareStaffScreen />}
        {activePortion === 'portion2_aurahealth' && (
          <AuraHealthDirectoryScreen onBookingConfirmed={handleAuraHealthBookingConfirmed} />
        )}
        {activePortion === 'portion3_auraflow' && <AuraFlowClinicalScreen />}
        {activePortion === 'portion4_medswiggy' && renderPortion4Content()}
        {activePortion === 'portion5_portal' && <PatientPortalScreen />}

        {/* iPhone Home Indicator bar when in mobile frame */}
        {isMobileFrame && (
          <div className="absolute bottom-1 inset-x-0 h-4 flex items-center justify-center pointer-events-none z-50">
            <div className="w-32 h-1 rounded-full bg-slate-800" />
          </div>
        )}
      </div>

      {/* PORTION 4 MODALS */}
      {selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onConfirmBooking={handleConfirmDoctorBooking}
        />
      )}

      {selectedDiagnostic && (
        <DiagnosticDetailModal
          service={selectedDiagnostic}
          onClose={() => setSelectedDiagnostic(null)}
          onConfirmBooking={handleConfirmDiagnosticBooking}
        />
      )}

      {selectedDepartment && (
        <DepartmentDetailModal
          department={selectedDepartment}
          doctors={DOCTORS}
          onClose={() => setSelectedDepartment(null)}
          onSelectDoctor={(doc) => {
            setSelectedDepartment(null);
            setSelectedDoctor(doc);
          }}
        />
      )}

      {selectedFacility && (
        <FacilityDetailModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
        />
      )}

      {successBooking && (
        <BookingSuccessModal
          type={successBooking.type}
          title={successBooking.title}
          subtitle={successBooking.subtitle}
          tokenNumber={successBooking.tokenNumber}
          date={successBooking.date}
          slot={successBooking.slot}
          patientName={successBooking.patientName}
          amount={successBooking.amount}
          onClose={() => setSuccessBooking(null)}
          onViewAllBookings={() => {
            setSuccessBooking(null);
            setSwiggyActiveTab('bookings');
          }}
        />
      )}

      {isEmergencyOpen && (
        <EmergencyModal
          onClose={() => setIsEmergencyOpen(false)}
          branchName={selectedBranch}
        />
      )}

      {isSearchOpen && (
        <SearchScreen
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClose={() => setIsSearchOpen(false)}
          departments={DEPARTMENTS}
          doctors={DOCTORS}
          diagnosticServices={DIAGNOSTIC_SERVICES}
          facilities={HOSPITAL_FACILITIES}
          onSelectDepartment={(dept) => {
            setIsSearchOpen(false);
            setSelectedDepartment(dept);
          }}
          onSelectDoctor={(doc) => {
            setIsSearchOpen(false);
            setSelectedDoctor(doc);
          }}
          onSelectDiagnostic={(diag) => {
            setIsSearchOpen(false);
            setSelectedDiagnostic(diag);
          }}
          onSelectFacility={(fac) => {
            setIsSearchOpen(false);
            setSelectedFacility(fac);
          }}
        />
      )}

      {/* GLOBAL DELIVERABLES & QUESTIONS 1-5 GUIDE */}
      {isDeliverablesGuideOpen && (
        <UnifiedDeliverablesModal
          onClose={() => setIsDeliverablesGuideOpen(false)}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
          onSelectPortion={(p) => setActivePortion(p)}
        />
      )}
    </div>
  );
}
