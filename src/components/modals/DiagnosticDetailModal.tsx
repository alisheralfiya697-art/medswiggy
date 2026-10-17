import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle,
  Home,
  TestTube2,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { DiagnosticService } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface DiagnosticDetailModalProps {
  service: DiagnosticService;
  onClose: () => void;
  onConfirmBooking: (bookingData: {
    testId: string;
    testName: string;
    collectionType: 'Home Sample Collection' | 'Hospital Lab Visit';
    scheduledDate: string;
    scheduledTime: string;
    patientName: string;
    address?: string;
    price: number;
  }) => void;
}

export const DiagnosticDetailModal: React.FC<DiagnosticDetailModalProps> = ({
  service,
  onClose,
  onConfirmBooking,
}) => {
  const [collectionType, setCollectionType] = useState<'Home Sample Collection' | 'Hospital Lab Visit'>(
    service.homeCollectionAvailable ? 'Home Sample Collection' : 'Hospital Lab Visit'
  );
  const [selectedDate, setSelectedDate] = useState('Today, Oct 15');
  const [selectedTime, setSelectedTime] = useState('08:00 AM - 09:00 AM');
  const [patientName, setPatientName] = useState('Alex Johnson');
  const [address, setAddress] = useState('Flat 402, Green Glen Layout, Bellandur, Bengaluru');

  const timeSlots = [
    '07:00 AM - 08:00 AM',
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '03:00 PM - 04:00 PM',
    '05:00 PM - 06:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    onConfirmBooking({
      testId: service.id,
      testName: service.name,
      collectionType,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      patientName,
      address: collectionType === 'Home Sample Collection' ? address : undefined,
      price: service.price,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-4">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <RemoteImage
                src={service.imageUrl}
                alt={service.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
                fallbackText={service.name}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {service.category}
                </span>
                <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                  <span>{service.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                  <span className="text-emerald-100 text-[10px]">({service.reviewsCount})</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-2xl font-black">
                {service.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                {service.parametersCount} Tests Included • Smart Digital Report in {service.reportTurnaroundHours} Hours
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Key Facts */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Turnaround</span>
              <span className="font-extrabold text-slate-900 text-sm">{service.reportTurnaroundHours} Hours</span>
            </div>
            <div className="border-x border-emerald-200/60">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Sample Type</span>
              <span className="font-extrabold text-slate-900 text-xs truncate block">{service.sampleType}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Accreditation</span>
              <span className="font-extrabold text-emerald-700 text-xs">NABL / CAP Certified</span>
            </div>
          </div>

          {/* Included Tests List */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Included Test Parameters ({service.includedTests.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.includedTests.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Mode Selection */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Sample Collection Option
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={!service.homeCollectionAvailable}
                onClick={() => setCollectionType('Home Sample Collection')}
                className={`p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                  collectionType === 'Home Sample Collection'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                } ${!service.homeCollectionAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <Home className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <span className="block font-bold">Home Pickup</span>
                  <span className="text-slate-500 font-normal">Phlebotomist at doorstep</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCollectionType('Hospital Lab Visit')}
                className={`p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                  collectionType === 'Hospital Lab Visit'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                  <TestTube2 className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <span className="block font-bold">Hospital Lab</span>
                  <span className="text-slate-500 font-normal">Walk-in priority desk</span>
                </div>
              </button>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> Select Date & Preferred Slot
            </label>
            <div className="flex gap-2 mb-2">
              {['Today, Oct 15', 'Tomorrow, Oct 16', 'Friday, Oct 17'].map((d) => (
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    selectedTime === slot
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Address if home pickup */}
          {collectionType === 'Home Sample Collection' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Sample Collection Address
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete flat / house address with landmark"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
              />
            </div>
          )}

          {/* Pricing & CTA */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Package Cost</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  ₹{service.price}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{service.originalPrice}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {service.discountPercentage}% OFF
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-emerald-600/25 transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Diagnostic Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
