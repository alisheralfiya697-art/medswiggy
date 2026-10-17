import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Video,
  Building,
  CheckCircle2,
  Award,
  Globe,
} from 'lucide-react';
import { Doctor } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface DoctorDetailModalProps {
  doctor: Doctor;
  onClose: () => void;
  onConfirmBooking: (bookingData: {
    doctorId: string;
    doctorName: string;
    departmentName: string;
    avatarUrl: string;
    date: string;
    slot: string;
    patientName: string;
    consultationType: 'In-Hospital' | 'Video Call';
    fee: number;
  }) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    doctor.availableSlots[0]?.date || 'Today, Oct 15'
  );
  const [selectedSlot, setSelectedSlot] = useState<string>(
    doctor.availableSlots[0]?.slots[0] || '02:45 PM'
  );
  const [consultationType, setConsultationType] = useState<'In-Hospital' | 'Video Call'>('In-Hospital');
  const [patientName, setPatientName] = useState<string>('Alex Johnson');
  const [patientPhone, setPatientPhone] = useState<string>('+91 98765 43210');

  const currentSlotGroup =
    doctor.availableSlots.find((s) => s.date === selectedDate) || doctor.availableSlots[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    onConfirmBooking({
      doctorId: doctor.id,
      doctorName: doctor.name,
      departmentName: doctor.departmentName,
      avatarUrl: doctor.avatarUrl,
      date: selectedDate,
      slot: selectedSlot,
      patientName,
      consultationType,
      fee: doctor.consultationFee,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-4">
        {/* Header with Doctor Brief */}
        <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <RemoteImage
                src={doctor.avatarUrl}
                alt={doctor.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover object-top"
                fallbackText={doctor.name}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  {doctor.departmentName}
                </span>
                <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                  <span>{doctor.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                  <span className="text-emerald-100 text-[10px]">({doctor.reviewsCount})</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-1.5">
                {doctor.name}
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {doctor.designation}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {doctor.qualifications}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Quick Doctor Badges */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Experience</span>
              <span className="font-extrabold text-slate-900 text-sm">{doctor.experienceYears}+ Years</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
              <span className="font-extrabold text-slate-900 text-sm">{doctor.distanceKm} km away</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Patients Treated</span>
              <span className="font-extrabold text-emerald-600 text-sm">12,000+</span>
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-500" /> Professional Background
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {doctor.about}
            </p>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Languages spoken: <strong className="text-slate-700">{doctor.languages.join(', ')}</strong></span>
            </div>
          </div>

          {/* Consultation Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Consultation Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConsultationType('In-Hospital')}
                className={`p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                  consultationType === 'In-Hospital'
                    ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-bold shadow-xs ring-2 ring-orange-200'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className={`p-2 rounded-xl ${consultationType === 'In-Hospital' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <span className="block font-bold">In-Hospital Visit</span>
                  <span className="text-slate-500 font-normal">Direct OPD Consultation</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setConsultationType('Video Call')}
                className={`p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                  consultationType === 'Video Call'
                    ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-bold shadow-xs ring-2 ring-orange-200'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className={`p-2 rounded-xl ${consultationType === 'Video Call' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Video className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <span className="block font-bold">HD Video Consult</span>
                  <span className="text-slate-500 font-normal">Connect via phone/app</span>
                </div>
              </button>
            </div>
          </div>

          {/* Date Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-500" /> Select Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {doctor.availableSlots.map((item) => (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(item.date);
                    if (item.slots.length > 0) setSelectedSlot(item.slots[0]);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    selectedDate === item.date
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.date}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Grid */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> Available Time Slots
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {currentSlotGroup?.slots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-xs scale-102 ring-2 ring-orange-200'
                        : 'bg-slate-50 border border-slate-200 hover:border-orange-300 text-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Patient Details Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Patient Full Name
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-hidden font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="+91 Mobile number"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-hidden font-medium"
              />
            </div>
          </div>

          {/* Bottom Pricing & Submit Button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Consultation Fee</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  ₹{doctor.consultationFee}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{doctor.originalFee}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {doctor.discountPercentage}% OFF
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Book Slot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
