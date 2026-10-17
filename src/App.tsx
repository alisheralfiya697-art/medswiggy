import React, { useState, useMemo } from 'react';
import {
  HeartPulse,
  Users,
  TestTube2,
  Building2,
  Camera,
  Smartphone,
  Monitor,
  CalendarCheck,
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
} from './types';

import {
  DEPARTMENTS,
  DOCTORS,
  DIAGNOSTIC_SERVICES,
  HOSPITAL_FACILITIES,
  PROMO_BANNERS,
  HOSPITAL_BRANCHES,
} from './data/mockData';

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
import { ScreenshotGalleryModal } from './components/showcase/ScreenshotGalleryModal';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [viewAllCategory, setViewAllCategory] = useState<ViewAllCategory | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Location & Quick Filters
  const [selectedBranch, setSelectedBranch] = useState(HOSPITAL_BRANCHES[0].name);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Active Modals
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticService | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<HospitalFacility | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  // Frame toggle: Mobile frame mockup vs Full responsive view
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Success Confirmation Modal State
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

  // Seeded Appointments & Diagnostic Bookings
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-101',
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Mukherjee',
      departmentName: 'Cardiology',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80',
      date: 'Today, Oct 15',
      slot: '02:45 PM',
      patientName: 'Alex Johnson',
      consultationType: 'In-Hospital',
      fee: 799,
      tokenNumber: 'CP-DOC-4821',
      status: 'Confirmed',
      createdAt: '2026-10-15T09:30:00Z',
    },
  ]);

  const [diagnosticBookings, setDiagnosticBookings] = useState<DiagnosticBooking[]>([
    {
      id: 'diag-201',
      testId: 'diag-1',
      testName: 'CarePulse Master Health Checkup (88 Tests)',
      collectionType: 'Home Sample Collection',
      scheduledDate: 'Tomorrow, Oct 16',
      scheduledTime: '08:00 AM - 09:00 AM',
      patientName: 'Alex Johnson',
      address: 'Flat 402, Green Glen Layout, Indiranagar',
      price: 1499,
      status: 'Scheduled',
      tokenNumber: 'CP-LAB-9104',
      createdAt: '2026-10-15T10:15:00Z',
    },
  ]);

  // Handle Quick Filter Toggle
  const handleToggleFilter = (filterId: string) => {
    setActiveFilter((prev) => (prev === filterId ? null : filterId));
  };

  // Filtered Data based on Quick Filter
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

  // Appointment Booking Confirmation Handler
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

  // Diagnostic Test Booking Confirmation Handler
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

  // Cancel handlers
  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCancelDiagnostic = (id: string) => {
    setDiagnosticBookings((prev) => prev.filter((d) => d.id !== id));
  };

  // Handle Promo Banner Book CTA
  const handleBookPromo = (banner: PromoBanner) => {
    const matchingDiag = DIAGNOSTIC_SERVICES[0];
    setSelectedDiagnostic(matchingDiag);
  };

  // Handle Bottom Nav Tab Change
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
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

  // Content rendering helper
  const renderMainContent = () => {
    // 1. If currently viewing "My Bookings"
    if (activeTab === 'bookings') {
      return (
        <BookingsCartScreen
          appointments={appointments}
          diagnosticBookings={diagnosticBookings}
          onBack={() => setActiveTab('home')}
          onCancelAppointment={handleCancelAppointment}
          onCancelDiagnostic={handleCancelDiagnostic}
          onExploreServices={() => {
            setActiveTab('home');
            setViewAllCategory(null);
          }}
        />
      );
    }

    // 2. If currently viewing a "View All" screen
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
            setActiveTab('home');
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

    // 3. Homepage Swiggy Experience
    return (
      <main className="pb-24">
        {/* Swiggy Header */}
        <SwiggyHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSearch={() => setIsSearchOpen(true)}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
          onOpenBookings={() => setActiveTab('bookings')}
          appointmentCount={appointments.length}
          diagnosticCount={diagnosticBookings.length}
          activeFilter={activeFilter}
          onToggleFilter={handleToggleFilter}
          onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        />

        {/* Promotional Health Checkup Banner Carousel */}
        <PromoBannerCarousel
          banners={PROMO_BANNERS}
          onBookPromo={handleBookPromo}
        />

        {/* Active Filter Notice if applied */}
        {activeFilter && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-950 font-medium">
              <span>
                Filtered by: <strong>{activeFilter}</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter(null)}
                className="font-bold underline text-orange-700 hover:text-orange-900 cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}

        {/* SECTION 1: DEPARTMENTS (Horizontally Scrollable) */}
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

        {/* SECTION 2: FIND A DOCTOR (Horizontally Scrollable) */}
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

        {/* SECTION 3: DIAGNOSTIC SERVICES (Horizontally Scrollable) */}
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

        {/* SECTION 4: HOSPITAL FACILITIES (Horizontally Scrollable) */}
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

        {/* Trust Badges Footer Bar (Swiggy Assured style) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center text-xs">
            <div className="p-2">
              <span className="font-extrabold text-slate-900 block text-sm">NABH & JCI</span>
              <span className="text-slate-500">Gold Quality Standard</span>
            </div>
            <div className="p-2 border-l border-slate-100">
              <span className="font-extrabold text-orange-600 block text-sm">30-Min</span>
              <span className="text-slate-500">Home Sample Collection</span>
            </div>
            <div className="p-2 border-l border-slate-100">
              <span className="font-extrabold text-emerald-600 block text-sm">Zero Wait</span>
              <span className="text-slate-500">Emergency & OPD Triage</span>
            </div>
            <div className="p-2 border-l border-slate-100">
              <span className="font-extrabold text-slate-900 block text-sm">4.92 ★</span>
              <span className="text-slate-500">18,500+ Patient Reviews</span>
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className={`min-h-screen bg-slate-100 ${isMobileFrame ? 'py-4 sm:py-8 flex justify-center' : ''}`}>
      {/* Container wrapper for optional mobile frame preview */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden border-8 border-slate-900 min-h-[850px] relative'
            : 'bg-white min-h-screen'
        }`}
      >
        {/* Floating Top Control Toolbar for Showcase & Mobile/Desktop View Switch */}
        <aside aria-label="Reviewer controls" className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-[11px] tracking-wide text-slate-200">
              CarePulse • Swiggy Hospital UX
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Deliverables & Screenshots Showcase Button */}
            <button
              type="button"
              onClick={() => setIsShowcaseOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-[11px] shadow-xs transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Deliverables Showcase</span>
            </button>

            {/* Mobile / Desktop Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
              title="Toggle view mode"
            >
              {isMobileFrame ? (
                <>
                  <Monitor className="w-3 h-3 text-orange-400" />
                  <span>Desktop</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3 h-3 text-orange-400" />
                  <span>Mobile View</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        {renderMainContent()}

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onChangeTab={handleTabChange}
          bookingBadgeCount={appointments.length + diagnosticBookings.length}
        />
      </div>

      {/* MODAL 1: Doctor Detail & Booking */}
      {selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onConfirmBooking={handleConfirmDoctorBooking}
        />
      )}

      {/* MODAL 2: Diagnostic Service Detail & Booking */}
      {selectedDiagnostic && (
        <DiagnosticDetailModal
          service={selectedDiagnostic}
          onClose={() => setSelectedDiagnostic(null)}
          onConfirmBooking={handleConfirmDiagnosticBooking}
        />
      )}

      {/* MODAL 3: Department Detail & Specialists */}
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

      {/* MODAL 4: Hospital Facility Detail */}
      {selectedFacility && (
        <FacilityDetailModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
        />
      )}

      {/* MODAL 5: Booking Success Confirmation Pass */}
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
            setActiveTab('bookings');
          }}
        />
      )}

      {/* MODAL 6: 24/7 Emergency SOS Line */}
      {isEmergencyOpen && (
        <EmergencyModal
          onClose={() => setIsEmergencyOpen(false)}
          branchName={selectedBranch}
        />
      )}

      {/* MODAL 7: Search Screen */}
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

      {/* MODAL 8: Deliverables & Screenshots Showcase */}
      {isShowcaseOpen && (
        <ScreenshotGalleryModal
          onClose={() => setIsShowcaseOpen(false)}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
          onNavigateToView={(view) => {
            if (view === 'home') {
              setActiveTab('home');
              setViewAllCategory(null);
            } else if (view === 'doctors') {
              setViewAllCategory('doctors');
            } else if (view === 'diagnostics') {
              setViewAllCategory('diagnostics');
            } else if (view === 'facilities') {
              setViewAllCategory('facilities');
            } else if (view === 'viewAll') {
              setViewAllCategory('departments');
            }
          }}
        />
      )}
    </div>
  );
}
