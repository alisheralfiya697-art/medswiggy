import React, { useState, useEffect } from 'react';
import {
  MapPin,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';
import { HOSPITAL_BRANCHES } from '../../data/mockData';

interface SwiggyHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenSearch: () => void;
  selectedBranch: string;
  onSelectBranch: (branchName: string) => void;
  onOpenBookings: () => void;
  appointmentCount: number;
  diagnosticCount: number;
  activeFilter: string | null;
  onToggleFilter: (filterId: string) => void;
  onOpenEmergencyModal: () => void;
}

const SEARCH_PLACEHOLDERS = [
  "Search 'Dr. Sarah (Cardiologist)'...",
  "Search 'Full Body Health Checkup'...",
  "Search 'MRI 3-Tesla Brain Scan'...",
  "Search 'Pediatrics & NICU'...",
  "Search 'Robotic Joint Surgery'...",
  "Search 'Vitamin D3 & B12 Test'...",
];

export const SwiggyHeader: React.FC<SwiggyHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenSearch,
  selectedBranch,
  onSelectBranch,
  onOpenBookings,
  appointmentCount,
  diagnosticCount,
  activeFilter,
  onToggleFilter,
  onOpenEmergencyModal,
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showBranchModal, setShowBranchModal] = useState(false);

  // Rotating placeholder like Swiggy
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const totalCartCount = appointmentCount + diagnosticCount;

  const quickFilters = [
    { id: 'availableToday', label: '⚡ Available Today' },
    { id: 'topRated', label: '⭐ 4.9+ Rated' },
    { id: 'homePickup', label: '🧪 Home Collection' },
    { id: 'emergency247', label: '🚨 24x7 Open' },
    { id: 'discounted', label: '🏷️ Deals > 50% Off' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Bar: Location + Emergency Helpline + Booking Counter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between gap-2">
        {/* Swiggy-style Location Dropdown */}
        <div className="flex items-center min-w-0">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mr-2 shadow-xs">
            <MapPin className="w-4 h-4" />
          </div>
          <div
            onClick={() => setShowBranchModal(true)}
            className="cursor-pointer group select-none text-left"
          >
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm md:text-base text-slate-900 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                CarePulse Hospital
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-orange-600 transition-transform group-hover:translate-y-0.5" />
              </span>
            </div>
            <p className="text-[11px] md:text-xs text-slate-500 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
              {selectedBranch}
            </p>
          </div>
        </div>

        {/* Action buttons: Emergency SOS + My Bookings */}
        <div className="flex items-center gap-2">
          {/* Emergency SOS Call (Swiggy instant help style) */}
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-xs transition-colors shadow-xs active:scale-95 cursor-pointer"
            title="24/7 Emergency Trauma & Ambulance"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span className="hidden sm:inline">24x7 SOS</span>
            <span className="sm:hidden">SOS</span>
          </button>

          {/* Bookings / Appointments Indicator */}
          <button
            type="button"
            onClick={onOpenBookings}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
            aria-label="View bookings and appointments"
          >
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">My Bookings</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Swiggy-Style Prominent Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4 text-orange-500" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onOpenSearch}
            placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
            className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm text-slate-800 placeholder-slate-400 transition-all shadow-inner font-medium outline-hidden"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-1.5 rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
              title="Search and filter options"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Filter Chips (Swiggy Filter Bar) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 pb-0.5">
          {quickFilters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onToggleFilter(filter.id)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-xs scale-102 ring-2 ring-orange-200'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Branch Selection Dropdown Modal */}
      {showBranchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-5 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Select Hospital Campus</h3>
                <p className="text-xs text-slate-500">Pick your nearest CarePulse facility</p>
              </div>
              <button
                type="button"
                onClick={() => setShowBranchModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-80 overflow-y-auto">
              {HOSPITAL_BRANCHES.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectBranch(b.name);
                    setShowBranchModal(false);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedBranch === b.name
                      ? 'border-orange-500 bg-orange-50/70 text-orange-950 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-orange-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">{b.name}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {b.distance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{b.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
