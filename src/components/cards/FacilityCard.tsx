import React from 'react';
import { Star, ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';
import { HospitalFacility } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface FacilityCardProps {
  facility: HospitalFacility;
  onClick: (facility: HospitalFacility) => void;
  onCallDesk?: (facility: HospitalFacility, e: React.MouseEvent) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onClick, onCallDesk }) => {
  return (
    <div
      onClick={() => onClick(facility)}
      className="group w-72 sm:w-80 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between active:scale-98"
    >
      <div>
        {/* Banner with Remote Image */}
        <div className="relative h-36 w-full overflow-hidden bg-slate-100">
          <RemoteImage
            src={facility.imageUrl}
            alt={facility.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            fallbackText={facility.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Badge */}
          <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs tracking-wider">
            {facility.badge}
          </div>

          {/* Rating */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-xs">
            <span>{facility.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white" />
          </div>

          {/* 24x7 Indicator */}
          {facility.is24x7 && (
            <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-rose-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs animate-pulse">
              <ShieldAlert className="w-3 h-3" />
              <span>24/7 ACTIVE</span>
            </div>
          )}

          {/* Bed capacity */}
          {facility.bedCapacity && (
            <div className="absolute bottom-2 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
              {facility.bedCapacity}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-3.5 pb-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mb-1">
            {facility.category}
          </div>

          <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-1">
            {facility.name}
          </h4>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {facility.tagline}
          </p>

          <p className="text-[11px] text-slate-400 mt-2 truncate">
            In-charge: <span className="font-semibold text-slate-600">{facility.headIncharge}</span>
          </p>
        </div>
      </div>

      {/* Footer with Helpline & Tour button */}
      <div className="p-3.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            if (onCallDesk) {
              onCallDesk(facility, e);
            } else {
              e.stopPropagation();
              window.open(`tel:${facility.emergencyPhone}`);
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call Desk</span>
        </button>

        <button
          type="button"
          onClick={() => onClick(facility)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Sparkles className="w-3 h-3" />
          <span>Explore</span>
        </button>
      </div>
    </div>
  );
};
