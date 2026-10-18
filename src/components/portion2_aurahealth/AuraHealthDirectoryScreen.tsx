import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Video,
  Building,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Award,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { DirectoryDoctor, DoctorSpecialty, BookingReceipt } from '../../types';
import { DIRECTORY_DOCTORS } from '../../data/mockPortion2Data';
import { RemoteImage } from '../common/RemoteImage';

interface AuraHealthDirectoryScreenProps {
  onBookingConfirmed?: (receipt: BookingReceipt) => void;
}

export const AuraHealthDirectoryScreen: React.FC<AuraHealthDirectoryScreenProps> = ({
  onBookingConfirmed,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<DoctorSpecialty>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<DirectoryDoctor | null>(null);

  // Booking Flow States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today, Oct 17');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('s1');
  const [consultationType, setConsultationType] = useState<'In-Person Visit' | 'Video Telehealth'>('In-Person Visit');
  const [patientName, setPatientName] = useState('Alex Johnson');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');
  const [confirmedReceipt, setConfirmedReceipt] = useState<BookingReceipt | null>(null);

  const specialties: DoctorSpecialty[] = [
    'All',
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'Neurology',
    'Dermatology',
  ];

  // Filtered Doctors
  const filteredDoctors = useMemo(() => {
    return DIRECTORY_DOCTORS.filter((doc) => {
      const matchSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
      const matchQuery =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.subspecialty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSpecialty && matchQuery;
    });
  }, [selectedSpecialty, searchQuery]);

  const handleStartBooking = (doctor: DirectoryDoctor) => {
    setSelectedDoctor(doctor);
    const firstAvailable = doctor.slots.find((s) => s.isAvailable);
    if (firstAvailable) {
      setSelectedSlotId(firstAvailable.id);
    }
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !patientName.trim()) return;

    const chosenSlot = selectedDoctor.slots.find((s) => s.id === selectedSlotId);
    const randomToken = `AH-DOC-${Math.floor(1000 + Math.random() * 9000)}`;

    const receipt: BookingReceipt = {
      bookingId: `BK-${Date.now()}`,
      tokenNumber: randomToken,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: chosenSlot?.time || '10:00 AM',
      patientName,
      patientPhone,
      patientEmail: 'alex.johnson@example.com',
      consultationType,
      fee: selectedDoctor.consultationFee,
      clinicAddress: selectedDoctor.clinic.address,
      timestamp: new Date().toLocaleString(),
    };

    setConfirmedReceipt(receipt);
    setIsBookingOpen(false);

    if (onBookingConfirmed) {
      onBookingConfirmed(receipt);
    }
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Sub-Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-400 text-blue-950 uppercase">
              Portion 2
            </span>
            <span className="text-xs text-blue-200">Doctor Directory & Verified Booking</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            AuraHealth • Specialist Directory
          </h1>
          <p className="text-xs text-blue-200 mt-0.5">
            Discover verified physicians, check next available slots, and book instant outpatient appointments
          </p>

          {/* Search Bar */}
          <div className="mt-4 relative max-w-2xl">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by physician name, specialty, or condition..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-800 bg-white/10 backdrop-blur-md text-white placeholder-blue-300 text-xs sm:text-sm focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:outline-hidden font-medium transition-all shadow-inner"
            />
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3 pb-1">
            {specialties.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-white text-blue-950 shadow-md scale-102 ring-2 ring-blue-300'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Directory Grid / List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {filteredDoctors.length} Specialists Available for {selectedSpecialty}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Avatar, Specialty & Rating */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-2xs">
                    <RemoteImage
                      src={doc.imageUrl}
                      alt={doc.name}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover object-top"
                      fallbackText={doc.name}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 uppercase">
                        {doc.specialty}
                      </span>
                      <div className="flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
                        <span>{doc.rating}</span>
                        <Star className="w-2.5 h-2.5 fill-white" />
                        <span className="text-emerald-100 text-[10px]">({doc.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1">
                      {doc.name}
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    </h3>

                    <p className="text-xs text-slate-500 font-medium line-clamp-1">{doc.subspecialty}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{doc.experienceYears}+ Years Clinical Experience</p>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.clinic.name} ({doc.clinic.distance})</span>
                    </div>
                  </div>
                </div>

                {/* About Excerpt */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {doc.about}
                </p>

                {/* Slots Preview */}
                <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{doc.availabilityStatus}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {doc.telehealthAvailable && <span className="text-blue-600 font-semibold mr-2">● Video Consult</span>}
                    <span>{doc.slots.filter((s) => s.isAvailable).length} slots open</span>
                  </div>
                </div>
              </div>

              {/* Price & Booking Footer */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-900">₹{doc.consultationFee}</span>
                    <span className="text-xs text-slate-400 line-through">₹{doc.originalFee}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {doc.discountPercentage}% OFF
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Consultation Fee</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctor(doc)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartBooking(doc)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  >
                    <span>Book Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: Full Doctor Profile */}
      {selectedDoctor && !isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctor.imageUrl}
                  alt={selectedDoctor.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-black text-slate-900 text-lg">{selectedDoctor.name}</h3>
                  <p className="text-xs text-blue-700 font-semibold">{selectedDoctor.title} • {selectedDoctor.specialty}</p>
                  <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold mt-0.5">
                    ★ {selectedDoctor.rating} ({selectedDoctor.reviewCount} verified reviews)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-900 block mb-1">About Doctor</span>
                <p className="leading-relaxed">{selectedDoctor.about}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Education & Medical Training</span>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedDoctor.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Board Certifications</span>
                <ul className="list-disc pl-4 space-y-1">
                  {selectedDoctor.certifications.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Accepted Health Insurances</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedDoctor.insurances.map((ins, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {ins}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close Profile
              </button>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Interactive Slot Booking Sheet */}
      {isBookingOpen && selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleConfirmBooking}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">Book Appointment</h3>
                <p className="text-xs text-slate-500">with {selectedDoctor.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Consultation Mode */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConsultationType('In-Person Visit')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold cursor-pointer transition-all ${
                    consultationType === 'In-Person Visit'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-300'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>In-Person OPD</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('Video Telehealth')}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold cursor-pointer transition-all ${
                    consultationType === 'Video Telehealth'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-300'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>HD Video Consult</span>
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Select Date
              </label>
              <div className="flex gap-2">
                {['Today, Oct 17', 'Tomorrow, Oct 18', 'Monday, Oct 20'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      selectedDate === d ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Picker with Unavailable Disabling */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Select Time Slot (Disabled = Booked)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {selectedDoctor.slots.map((slot) => {
                  const isSelected = selectedSlotId === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                        !slot.isAvailable
                          ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-200'
                          : 'bg-white border border-slate-200 hover:border-blue-400 text-slate-800 cursor-pointer'
                      }`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Patient Intake Form */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-blue-500 outline-hidden font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-blue-500 outline-hidden font-medium"
                />
              </div>
            </div>

            {/* Pricing & Submit */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Fee</span>
                <span className="text-xl font-black text-slate-900">₹{selectedDoctor.consultationFee}</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer active:scale-95"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: Booking Receipt Pass */}
      {confirmedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-black text-slate-900 text-lg">Appointment Confirmed!</h3>
              <p className="text-xs text-slate-500">AuraHealth Digital Queue Pass</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Token Number</span>
                  <span className="text-lg font-mono font-black text-blue-600">{confirmedReceipt.tokenNumber}</span>
                </div>
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-bold text-slate-900">{confirmedReceipt.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Specialty:</span>
                <span className="font-semibold text-slate-700">{confirmedReceipt.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-emerald-700">{confirmedReceipt.date} • {confirmedReceipt.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-800">{confirmedReceipt.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fee Paid:</span>
                <span className="font-black text-slate-900">₹{confirmedReceipt.fee}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setConfirmedReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
            >
              Done & Return to Directory
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
