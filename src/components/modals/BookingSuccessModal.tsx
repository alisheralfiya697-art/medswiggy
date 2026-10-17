import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  QrCode,
  Share2,
  X,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface BookingSuccessModalProps {
  type: 'doctor' | 'diagnostic';
  title: string;
  subtitle: string;
  tokenNumber: string;
  date: string;
  slot: string;
  patientName: string;
  amount: number;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  type,
  title,
  subtitle,
  tokenNumber,
  date,
  slot,
  patientName,
  amount,
  onClose,
  onViewAllBookings,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden my-4">
        {/* Success Header with Swiggy confetti feeling */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center mb-3 shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-200 bg-white/10 px-3 py-0.5 rounded-full">
            {type === 'doctor' ? 'Appointment Confirmed' : 'Diagnostic Slot Booked'}
          </span>

          <h3 className="text-xl font-black mt-2 text-white">
            Booking Confirmed!
          </h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            SMS & WhatsApp confirmation sent with digital token
          </p>
        </div>

        {/* Digital Ticket / Pass Card */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Token Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Digital Queue Token
                </span>
                <span className="text-xl font-mono font-black text-orange-600">
                  {tokenNumber}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
            </div>

            <div className="pt-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">{type === 'doctor' ? 'Doctor:' : 'Package:'}</span>
                <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department / Type:</span>
                <span className="font-semibold text-slate-700">{subtitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {date} • <Clock className="w-3 h-3" /> {slot}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200/80">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-black text-slate-900 text-sm">₹{amount} (Paid Online)</span>
              </div>
            </div>
          </div>

          {/* Location note */}
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-orange-50/60 p-2.5 rounded-xl border border-orange-100">
            <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span>
              Please present this digital token at the reception desk 10 mins prior to your scheduled time.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewAllBookings();
              }}
              className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>View in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Back to Hospital Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
