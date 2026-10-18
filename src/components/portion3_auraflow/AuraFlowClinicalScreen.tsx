import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Pill,
  TestTube,
  Calendar,
  BookOpen,
  Send,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { ClinicalPatientEncounter, ClinicalBundleItem } from '../../types';
import { MOCK_CLINICAL_PATIENTS, CLINICAL_DOCTOR_PROFILE } from '../../data/mockPortion3Data';

interface AuraFlowClinicalScreenProps {
  onBundleApproved?: (bundleItems: ClinicalBundleItem[]) => void;
}

export const AuraFlowClinicalScreen: React.FC<AuraFlowClinicalScreenProps> = ({
  onBundleApproved,
}) => {
  const [patient, setPatient] = useState<ClinicalPatientEncounter>(MOCK_CLINICAL_PATIENTS[0]);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [bundleItems, setBundleItems] = useState<ClinicalBundleItem[]>(patient.recommendedBundle);
  const [showRationale, setShowRationale] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle bundle item selection
  const toggleItem = (id: string) => {
    setBundleItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // Adjust dosage stepper
  const updateDosage = (id: string, newDosage: string) => {
    setBundleItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selectedDosage: newDosage } : item))
    );
  };

  const handleApproveBundle = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveStep(3);
      if (onBundleApproved) {
        onBundleApproved(bundleItems.filter((i) => i.selected));
      }
    }, 800);
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Sub-Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-violet-400 text-violet-950 uppercase">
                  Portion 3
                </span>
                <span className="text-xs text-violet-200">Clinical Workflow & Supervised Synthesis</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                AuraFlow Clinical OS • 1-Tap Encounter Bundle
              </h1>
              <p className="text-xs text-violet-200 mt-0.5">
                Replaces 26 fragmented clicks with context-aware post-encounter synthesis, dosing titrations, and labs
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowRationale(!showRationale)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-300" />
              <span>{showRationale ? 'Hide Rationale' : 'Design Rationale & EHR Study'}</span>
            </button>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 mt-4 pt-3 border-t border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-2 px-3 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                activeStep === 1 ? 'bg-white text-violet-950 shadow-sm' : 'text-violet-200 hover:text-white'
              }`}
            >
              <span>1. Encounter Findings</span>
            </button>
            <span className="text-white/30">→</span>
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`flex items-center gap-2 px-3 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                activeStep === 2 ? 'bg-white text-violet-950 shadow-sm' : 'text-violet-200 hover:text-white'
              }`}
            >
              <span>2. 1-Tap Synthesized Bundle</span>
              <span className="text-[10px] bg-violet-200 text-violet-900 px-1.5 py-0.2 rounded-full">
                {bundleItems.filter((i) => i.selected).length} items
              </span>
            </button>
            <span className="text-white/30">→</span>
            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className={`flex items-center gap-2 px-3 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                activeStep === 3 ? 'bg-white text-violet-950 shadow-sm' : 'text-violet-200 hover:text-white'
              }`}
            >
              <span>3. Order Dispatch & Discharge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Design Rationale Accordion */}
      {showRationale && (
        <div className="bg-violet-950 text-violet-100 p-5 border-b border-violet-800">
          <div className="max-w-7xl mx-auto space-y-3 text-xs leading-relaxed">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Clinical Workflow Challenge & Architectural Solution
            </h3>
            <p>
              Physicians spend up to 50% of their day clicking through EHR silos (Epic/Cerner require 22–26 distinct clicks across 5 tabs for an encounter closeout). AuraFlow evaluates today&apos;s findings against baseline (HbA1c rose 7.4% → 8.6%, BP 144/92, eGFR 68) to automatically pre-synthesize the complete evidence-based bundle:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-violet-900/60 border border-violet-700">
                1. Titrate Metformin 500mg → 1000mg BID
              </div>
              <div className="p-2.5 rounded-xl bg-violet-900/60 border border-violet-700">
                2. Initiate Empagliflozin 10mg QD (Renal Safe)
              </div>
              <div className="p-2.5 rounded-xl bg-violet-900/60 border border-violet-700">
                3. Order 6-Wk BMP & Follow-Up Visit
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Stepper Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        {/* STEP 1: PATIENT CLINICAL FINDINGS */}
        {activeStep === 1 && (
          <div className="space-y-5">
            {/* Patient Header Card */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900">{patient.name}</h2>
                    <span className="text-xs text-slate-400">({patient.age}y, {patient.gender})</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                      {patient.mrn}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold">{patient.primaryCondition}</p>
                  <p className="text-[11px] text-slate-400">{patient.encounterReason} • {patient.encounterTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Synthesize 1-Tap Bundle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vitals & Recent Labs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Point-of-Care Vitals & Delta */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-rose-600" /> Point-of-Care Vitals & Deltas
                  </h3>
                  <span className="text-[11px] text-slate-500">Today vs Prior Baseline</span>
                </div>

                <div className="space-y-2">
                  {patient.vitals.map((v) => (
                    <div
                      key={v.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-700">{v.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 text-[11px]">Prev: {v.previousValue}</span>
                        <span className={`font-mono font-black text-sm px-2 py-0.5 rounded-md ${
                          v.status === 'elevated' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {v.value} {v.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Meds & Labs */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-violet-600" /> Current Medication Regimen
                  </h3>
                  <span className="text-[11px] text-slate-500">{patient.activeMedications.length} Active Rx</span>
                </div>

                <div className="space-y-2">
                  {patient.activeMedications.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <h4 className="font-extrabold text-slate-900">{m.name} {m.dosage}</h4>
                        <p className="text-[11px] text-slate-500">{m.frequency} • {m.indication}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                  ))}
                </div>

                {/* Clinical Delta Alert Callout */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-black flex items-center gap-1 text-amber-800">
                    <AlertTriangle className="w-3.5 h-3.5" /> Clinical Trajectory Alert
                  </span>
                  <p>{patient.clinicalDeltaSummary}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: 1-TAP CONTEXTUAL BUNDLE SYNTHESIS */}
        {activeStep === 2 && (
          <div className="space-y-5">
            {/* Bundle Actions Top Toolbar */}
            <div className="p-4 rounded-3xl bg-violet-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-300 block">
                  Automated Evidence Synthesis
                </span>
                <h3 className="text-base font-black">
                  Recommended Clinical Bundle for {patient.name}
                </h3>
                <p className="text-xs text-violet-200">
                  Select, adjust dosages via micro-steppers, and approve in 1 single tap.
                </p>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleApproveBundle}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-black text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Orders...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Approve & Dispatch Bundle (1-Tap)</span>
                  </>
                )}
              </button>
            </div>

            {/* Bundle Items Cards */}
            <div className="space-y-3">
              {bundleItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all ${
                    item.selected
                      ? 'bg-white border-violet-400 shadow-sm ring-1 ring-violet-200'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        onClick={() => toggleItem(item.id)}
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border cursor-pointer ${
                          item.selected ? 'bg-violet-700 border-violet-700 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {item.selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-violet-100 text-violet-800">
                            {item.type.replace('_', ' ')}
                          </span>
                          <h4 className="font-black text-slate-900 text-sm sm:text-base">{item.title}</h4>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{item.subtitle}</p>
                        <p className="text-xs text-slate-500">{item.detail}</p>

                        {/* Dosage Micro-Stepper if titration/new rx */}
                        {item.dosageOptions && (
                          <div className="pt-2 flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-500 mr-1">Select Dosing:</span>
                            {item.dosageOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateDosage(item.id, opt)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                                  item.selectedDosage === opt
                                    ? 'bg-violet-700 text-white font-bold'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Guideline Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: DISPATCH & VERIFICATION */}
        {activeStep === 3 && (
          <div className="space-y-5 max-w-3xl mx-auto">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Transmission Verified
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Clinical Bundle Dispatched in 1 Tap
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  All e-Prescriptions, phlebotomy standing orders, outpatient follow-up slots, and plain-language patient summaries have been automatically executed.
                </p>
              </div>

              {/* Audit Checklist */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>e-Prescriptions sent to Central Hospital Pharmacy (Metformin 1000mg BID + Empagliflozin 10mg QD)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phlebotomy Requisition standing order queued in Laboratory for 6-week surveillance BMP & UACR</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>6-Week Outpatient Follow-Up appointment confirmed in AuraCare schedule & sync to patient portal</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Plain-Language Patient Action Plan pushed to Portion 5 Patient Portal & printed</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  Review Patient Record
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="flex-1 py-3 rounded-2xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs shadow-md"
                >
                  View Dispatched Bundle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
