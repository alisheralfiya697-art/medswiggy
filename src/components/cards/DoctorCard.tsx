import React from 'react';
import { Star, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { Doctor } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface DoctorCardProps {
  doctor: Doctor;
  onClick: (doctor: Doctor) => void;
  onBookSlot?: (doctor: Doctor, e: React.MouseEvent) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick, onBookSlot }) => {
  return (
    <div
      onClick={() => onClick(doctor)}
      className="group w-72 sm:w-80 bg-white rounded-2xl border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between active:scale-98"
    >
      <div>
        {/* Top Header Row with Doctor Image, Verified Badge, and Rating */}
        <div className="p-3.5 pb-2 flex gap-3">
          <div className="relative shrink-0 w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden bg-slate-100 shadow-xs border border-slate-200">
            <RemoteImage
              src={doctor.avatarUrl}
              alt={doctor.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              fallbackText={doctor.name}
            />
            {doctor.availableToday && (
              <div className="absolute bottom-0 inset-x-0 bg-emerald-600/90 backdrop-blur-xs text-[9px] font-bold text-white text-center py-0.5 tracking-tight">
                TODAY
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Department Pill & Rating */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 truncate">
                {doctor.departmentName}
              </span>
              <div className="flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold shadow-2xs shrink-0">
                <span>{doctor.rating}</span>
                <Star className="w-2.5 h-2.5 fill-white" />
              </div>
            </div>

            <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors line-clamp-1 flex items-center gap-1">
              {doctor.name}
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            </h4>

            <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
              {doctor.designation}
            </p>

            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {doctor.qualifications}
            </p>

            {/* Experience & Language */}
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-700">{doctor.experienceYears}+ yrs exp</span>
              <span>•</span>
              <span className="truncate text-slate-500">{doctor.languages.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Next Available Slot & Hospital Branch */}
        <div className="px-3.5 py-1.5 bg-slate-50 border-y border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-700 truncate">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{doctor.nextSlotTime}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 shrink-0">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{doctor.distanceKm} km</span>
          </div>
        </div>
      </div>

      {/* Pricing and Action Button Row (Swiggy Dish/Store card footer) */}
      <div className="p-3.5 pt-2.5 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-slate-900 text-base">
              ₹{doctor.consultationFee}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{doctor.originalFee}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600">
            {doctor.discountPercentage}% OFF
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            if (onBookSlot) {
              onBookSlot(doctor, e);
            } else {
              onClick(doctor);
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Slot</span>
        </button>
      </div>
    </div>
  );
};
