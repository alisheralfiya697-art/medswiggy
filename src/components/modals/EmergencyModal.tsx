import React from 'react';
import {
  X,
  PhoneCall,
  ShieldAlert,
  Ambulance,
  MapPin,
  Clock,
  HeartPulse,
} from 'lucide-react';

interface EmergencyModalProps {
  onClose: () => void;
  branchName: string;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onClose, branchName }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-200 overflow-hidden my-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header */}
        <div className="relative bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white p-5 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-white text-rose-600 mx-auto flex items-center justify-center mb-2 shadow-lg animate-pulse">
            <HeartPulse className="w-8 h-8" />
          </div>

          <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
            Priority Trauma Line
          </span>
          <h3 className="text-xl font-black mt-1">24x7 Emergency SOS</h3>
          <p className="text-xs text-rose-100 mt-0.5">
            Average ambulance dispatch response time: &lt; 8 mins
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block">
              Toll-Free Emergency Helpline
            </span>
            <a
              href="tel:18004209999"
              className="text-2xl sm:text-3xl font-black font-mono text-rose-600 hover:text-rose-700 mt-1 block tracking-wider"
            >
              1800-420-9999
            </a>
            <span className="text-[11px] text-rose-600 font-semibold block mt-1">
              Tap above to call emergency dispatch
            </span>
          </div>

          {/* Quick ambulance request */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Ambulance className="w-4 h-4 text-rose-600" /> Active Campus Status
            </h4>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Campus:
                </span>
                <span className="font-bold text-slate-800">{branchName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Red-Zone Triage:
                </span>
                <span className="font-bold text-emerald-600">Zero Wait Time</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-400" /> ICU Beds:
                </span>
                <span className="font-bold text-emerald-600">6 Beds Available</span>
              </div>
            </div>
          </div>

          {/* Action Call Buttons */}
          <div className="space-y-2 pt-2">
            <a
              href="tel:18004209999"
              className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Call Ambulance (1800-420-9999)</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
