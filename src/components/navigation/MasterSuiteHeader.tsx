import React from 'react';
import {
  Users,
  HeartPulse,
  Pill,
  ShoppingBag,
  ShieldCheck,
  Smartphone,
  Monitor,
  Camera,
  Layers,
} from 'lucide-react';
import { ActivePortion } from '../../types';

interface MasterSuiteHeaderProps {
  activePortion: ActivePortion;
  onSelectPortion: (portion: ActivePortion) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenDeliverablesGuide: () => void;
}

export const MasterSuiteHeader: React.FC<MasterSuiteHeaderProps> = ({
  activePortion,
  onSelectPortion,
  isMobileFrame,
  onToggleMobileFrame,
  onOpenDeliverablesGuide,
}) => {
  const portions = [
    {
      id: 'portion1_auracare' as ActivePortion,
      label: '1. AuraCare Staff',
      shortLabel: '1. AuraCare',
      tag: 'Staff Roster & Census',
      icon: Users,
      accent: 'text-emerald-400',
    },
    {
      id: 'portion2_aurahealth' as ActivePortion,
      label: '2. AuraHealth Booking',
      shortLabel: '2. AuraHealth',
      tag: 'Doctor Directory',
      icon: HeartPulse,
      accent: 'text-blue-400',
    },
    {
      id: 'portion3_auraflow' as ActivePortion,
      label: '3. AuraFlow Clinical OS',
      shortLabel: '3. AuraFlow',
      tag: '1-Tap Order Bundle',
      icon: Pill,
      accent: 'text-violet-400',
    },
    {
      id: 'portion4_medswiggy' as ActivePortion,
      label: '4. MedSwiggy Home',
      shortLabel: '4. MedSwiggy',
      tag: 'Swiggy Hospital Home',
      icon: ShoppingBag,
      accent: 'text-orange-400',
    },
    {
      id: 'portion5_portal' as ActivePortion,
      label: '5. Patient Portal & SOS',
      shortLabel: '5. CarePortal',
      tag: 'Health Pass & Records',
      icon: ShieldCheck,
      accent: 'text-teal-400',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-xl">
      {/* Top System Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-black text-xs tracking-wider uppercase text-slate-200">
            CarePulse Unified Hospital Ecosystem
          </span>
          <span className="hidden md:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-900 text-indigo-200 border border-indigo-700">
            Portions 1 – 5 Combined
          </span>
        </div>

        {/* Global Controls: Guide & Simulator View Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDeliverablesGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[11px] shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Questions 1–5 Rubrics</span>
            <span className="sm:hidden">Rubrics</span>
          </button>

          <button
            type="button"
            onClick={onToggleMobileFrame}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] border border-slate-700 transition-colors cursor-pointer"
            title="Toggle iPhone mobile simulator frame"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Desktop Layout</span>
                <span className="sm:hidden">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">iPhone Frame</span>
                <span className="sm:hidden">Mobile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Portions Switcher Row */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 px-3 sm:px-6 py-1.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2">
          {portions.map((p) => {
            const Icon = p.icon;
            const isActive = activePortion === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPortion(p.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md ring-2 ring-indigo-400 scale-102'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : p.accent}`} />
                <span className="hidden sm:inline">{p.label}</span>
                <span className="sm:hidden">{p.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
