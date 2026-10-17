import React from 'react';
import {
  X,
  Star,
  PhoneCall,
  ShieldAlert,
  CheckCircle,
  Building2,
  Bed,
} from 'lucide-react';
import { HospitalFacility } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface FacilityDetailModalProps {
  facility: HospitalFacility;
  onClose: () => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-4">
        {/* Banner */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <RemoteImage
            src={facility.imageUrl}
            alt={facility.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            fallbackText={facility.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-500/40">
                {facility.badge}
              </span>
              <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                <span>{facility.rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </div>
              {facility.is24x7 && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  24x7 OPERATIONAL
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-2xl font-black">
              {facility.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {facility.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Key Quick Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{facility.category}</span>
            </div>
            {facility.bedCapacity && (
              <div className="border-x border-slate-200 sm:border-x-0">
                <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                  <Bed className="w-3 h-3" /> Capacity
                </span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{facility.bedCapacity}</span>
              </div>
            )}
            <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-1.5 sm:pt-0">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">In-Charge</span>
              <span className="font-extrabold text-slate-900 text-xs truncate block">{facility.headIncharge}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" /> Infrastructure Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {facility.description}
            </p>
          </div>

          {/* Key Features & Technology */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Advanced Technologies & Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facility.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Assistance CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs sm:text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                <span>Direct Hotline & Admission Desk</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Immediate bed booking & ambulance dispatch
              </p>
            </div>

            <a
              href={`tel:${facility.emergencyPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call: {facility.emergencyPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
