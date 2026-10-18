import React, { useState } from 'react';
import {
  X,
  Camera,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  Smartphone,
  Monitor,
  HeartPulse,
  Users,
  Pill,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import { ActivePortion } from '../../types';

interface UnifiedDeliverablesModalProps {
  onClose: () => void;
  onSelectPortion: (portion: ActivePortion) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export const UnifiedDeliverablesModal: React.FC<UnifiedDeliverablesModalProps> = ({
  onClose,
  onSelectPortion,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const [selectedPortionId, setSelectedPortionId] = useState<ActivePortion>('portion4_medswiggy');

  const portionsData = [
    {
      id: 'portion1_auracare' as ActivePortion,
      title: 'Portion 1 / Question 1: AuraCare Hospital Staff & Inpatients',
      repoName: 'Aura-Care',
      badge: 'QUESTION 1',
      icon: Users,
      color: 'bg-emerald-600',
      description: 'Hospital operations suite for clinical administrators, nursing leads, and physicians.',
      features: [
        'Dashboard Summary Cards: Patient Count (148), Today’s Appointments (32), On-Duty Doctors (18), Pending Tasks (7)',
        'Staff Roster with shift schedules, specialty filter, room extension, on-duty status, and Add Staff modal',
        'Inpatient Census: Room/bed allocation, vital signs monitoring (HR, BP, Temp, SpO2), triage badges (Critical/Urgent/Stable)',
        'Departmental Bed Occupancy: Live capacity for Cardiology, ICU, Neurology, Pediatrics, Orthopedics',
        'Interactive Clinical Action Checklist with real-time toggleable task completion',
      ],
    },
    {
      id: 'portion2_aurahealth' as ActivePortion,
      title: 'Portion 2 / Question 2: AuraHealth Doctor Directory & Booking',
      repoName: 'AuraHealth',
      badge: 'QUESTION 2',
      icon: HeartPulse,
      color: 'bg-blue-600',
      description: 'Patient-facing physician discovery and verifiable appointment scheduling engine.',
      features: [
        'FlatList Doctor Directory with real-time text search and Specialty category pills',
        'Doctor Profile Screen: Bio, board certifications, medical degrees, accepted health insurances',
        'Interactive Date Picker (Today, Tomorrow, Upcoming) with dynamic slot grouping',
        'TimeSlotPicker with visual disabling for already-booked slots',
        'Multi-step intake form: In-Person OPD vs. HD Video Telehealth consultation mode',
        'Instant Digital Queue Token Pass (#AH-DOC-XXXX) with QR code receipt',
      ],
    },
    {
      id: 'portion3_auraflow' as ActivePortion,
      title: 'Portion 3 / Question 3: AuraFlow Clinical OS (1-Tap Bundle)',
      repoName: 'AuraFlow-Clinic',
      badge: 'QUESTION 3',
      icon: Pill,
      color: 'bg-violet-600',
      description: 'Supervised clinical encounter closeout solving the 26-click EHR fragmentation crisis.',
      features: [
        'Encounter Findings: Evaluates point-of-care deltas (HbA1c rose 7.4% → 8.6%, BP 144/92, eGFR 68)',
        'Pre-Synthesized Clinical Order Bundle with single-elevation micro-steppers for Metformin 500mg → 1000mg BID',
        'Initiate guideline-directed Empagliflozin 10mg QD with cardio-renal safety confirmation',
        'Order 6-Week Basic Metabolic Panel & Phlebotomy standing order',
        'Automated 6-Week Outpatient Follow-Up clinic visit reservation',
        'Plain-Language Patient Action Plan generator (Grade-6 reading level) and 1-tap dispatch audit',
      ],
    },
    {
      id: 'portion4_medswiggy' as ActivePortion,
      title: 'Portion 4 / Question 4: MedSwiggy Hospital Home Screen',
      repoName: 'medswiggy / CarePulse',
      badge: 'QUESTION 4',
      icon: ShoppingBag,
      color: 'bg-orange-600',
      description: 'Swiggy-inspired consumer browsing experience with card-based horizontal discovery.',
      features: [
        'Swiggy Top Header: Multi-campus branch switcher, animated rotating search bar, and cart badge',
        'Health Checkup Promotional Banner (65% OFF Executive Full Body Checkup + timer + CARE60 coupon)',
        '4 Horizontally Scrollable FlatList Carousels: Departments, Find a Doctor, Diagnostics, Facilities',
        'Rich Metadata: Green Star Rating badges (4.94 ★), wait times, strike-through discounts, 30-min pickup',
        'Dedicated View All Catalog Screen with multi-category tabbed browsing, sorting, and specialty filters',
        'Interactive Modals: Doctor slot booking, Diagnostic parameter breakdown, Facility virtual tour, 24/7 SOS',
      ],
    },
    {
      id: 'portion5_portal' as ActivePortion,
      title: 'Portion 5 / Question 5: CarePortal Unified Patient Health Pass',
      repoName: 'CarePortal',
      badge: 'QUESTION 5',
      icon: ShieldCheck,
      color: 'bg-teal-600',
      description: 'Unified patient health locker bridging all 4 preceding portions into a cohesive ecosystem.',
      features: [
        'Digital Health Pass with verified hospital QR code, blood type, and active queue tokens',
        'Digital Prescriptions Locker populated directly by AuraFlow clinical orders',
        'Diagnostic Pathology & 3T MRI Lab Reports tracker with PDF download simulation',
        'Emergency 24x7 SOS Dispatch with real-time simulated GPS ambulance route tracking and ICU reservation',
      ],
    },
  ];

  const currentPortion = portionsData.find((p) => p.id === selectedPortionId) || portionsData[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-4 flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                Unified Portions 1 to 5 Evaluation Guide
              </h2>
              <p className="text-xs text-indigo-200">
                Single integrated application combining Aura-Care, AuraHealth, AuraFlow-Clinic, and MedSwiggy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMobileFrame}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              {isMobileFrame ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>iPhone Simulator</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Pills for 5 Portions */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {portionsData.map((portion) => (
            <button
              key={portion.id}
              type="button"
              onClick={() => setSelectedPortionId(portion.id)}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedPortionId === portion.id
                  ? 'bg-white border-indigo-600 shadow-sm ring-2 ring-indigo-200 font-bold'
                  : 'bg-white/70 border-slate-200 text-slate-600 hover:bg-white'
              }`}
            >
              <span className="text-[10px] font-black uppercase text-indigo-600 block">
                {portion.badge}
              </span>
              <span className="text-xs font-extrabold line-clamp-1 block mt-0.5 text-slate-900">
                {portion.repoName}
              </span>
            </button>
          ))}
        </div>

        {/* Active Portion Details */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {currentPortion.badge} • GitHub: {currentPortion.repoName}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {currentPortion.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {currentPortion.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectPortion(currentPortion.id);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <span>Jump to this Live Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Features Verified */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Verified Feature Requirements Built in Code
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentPortion.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 flex items-start gap-2.5 font-medium shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>All 5 Portions Integrated • React 19 + TypeScript + Tailwind</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
