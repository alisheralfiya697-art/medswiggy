import React from 'react';
import { Star, Clock, Home, TestTube2, Plus } from 'lucide-react';
import { DiagnosticService } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface DiagnosticCardProps {
  service: DiagnosticService;
  onClick: (service: DiagnosticService) => void;
  onAddToCart?: (service: DiagnosticService, e: React.MouseEvent) => void;
}

export const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ service, onClick, onAddToCart }) => {
  return (
    <div
      onClick={() => onClick(service)}
      className="group w-72 sm:w-80 bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between active:scale-98"
    >
      <div>
        {/* Banner with Remote Image & Badges */}
        <div className="relative h-32 w-full overflow-hidden bg-slate-100">
          <RemoteImage
            src={service.imageUrl}
            alt={service.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            fallbackText={service.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Service Badge (e.g., Bestseller / Fast Pickup) */}
          {service.badge && (
            <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs tracking-wider">
              {service.badge}
            </div>
          )}

          {/* Rating */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-xs">
            <span>{service.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white" />
          </div>

          {/* Turnaround Time Pill */}
          <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Reports in {service.reportTurnaroundHours}h</span>
          </div>

          {/* Parameters Count */}
          <div className="absolute bottom-2 right-2.5 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] text-emerald-300 font-bold">
            {service.parametersCount} Tests
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 pb-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mb-1">
            {service.category}
          </div>

          <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
            {service.name}
          </h4>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {service.description}
          </p>

          {/* Features metadata */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
            {service.homeCollectionAvailable ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-200/60">
                <Home className="w-3 h-3" /> Home Pickup (30m)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium border border-purple-200/60">
                <TestTube2 className="w-3 h-3" /> Hospital Lab Visit
              </span>
            )}

            {service.fastingRequiredHours && (
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-medium border border-amber-200/60">
                {service.fastingRequiredHours}h Fasting
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Add Button Footer */}
      <div className="p-3.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-slate-900 text-base">
              ₹{service.price}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{service.originalPrice}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600">
            {service.discountPercentage}% OFF
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            if (onAddToCart) {
              onAddToCart(service, e);
            } else {
              onClick(service);
            }
          }}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Book Test</span>
        </button>
      </div>
    </div>
  );
};
