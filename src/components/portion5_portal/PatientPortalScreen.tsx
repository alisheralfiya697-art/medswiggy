import React, { useState } from 'react';
import {
  QrCode,
  Pill,
  FileText,
  Calendar,
  PhoneCall,
  MapPin,
  Ambulance,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Download,
  Share2,
} from 'lucide-react';
import { PatientPrescription, PatientLabReport } from '../../types';
import { INITIAL_PRESCRIPTIONS, INITIAL_LAB_REPORTS } from '../../data/mockPortion5Data';

export const PatientPortalScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pass' | 'prescriptions' | 'labs' | 'ambulance'>('pass');
  const [prescriptions] = useState<PatientPrescription[]>(INITIAL_PRESCRIPTIONS);
  const [labReports] = useState<PatientLabReport[]>(INITIAL_LAB_REPORTS);

  // Ambulance Tracking State
  const [ambulanceStep, setAmbulanceStep] = useState<number>(2); // 1: Dispatched, 2: En Route, 3: Arrived
  const [etaMinutes, setEtaMinutes] = useState<number>(6);

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Sub-Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-400 text-emerald-950 uppercase">
                  Portion 5
                </span>
                <span className="text-xs text-emerald-200">Unified Patient Health Portal</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                CarePulse • Patient Health Pass & Emergency Hub
              </h1>
              <p className="text-xs text-emerald-200 mt-0.5">
                Centralized medical history, digital prescriptions from AuraFlow, lab reports, and GPS SOS dispatch
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                Patient: Alex Johnson (MRN-784291)
              </span>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
            {[
              { id: 'pass', label: 'Digital Health Pass', icon: QrCode },
              { id: 'prescriptions', label: 'Active Prescriptions', icon: Pill, badge: prescriptions.length },
              { id: 'labs', label: 'Diagnostic Lab Reports', icon: FileText, badge: labReports.length },
              { id: 'ambulance', label: 'Emergency GPS SOS', icon: Ambulance },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-emerald-950 shadow-md scale-102'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-emerald-100 text-emerald-900' : 'bg-white/20 text-white'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        {/* 1. DIGITAL HEALTH PASS & QR PASS */}
        {activeTab === 'pass' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
                    CAREPULSE HEALTH PASS
                  </span>
                  <h3 className="text-xl font-black mt-2">Alex Johnson</h3>
                  <p className="text-xs text-emerald-200 font-mono">MRN: 784291 • Blood: O+</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-white shadow-md">
                  <QrCode className="w-12 h-12 text-slate-900" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/30 backdrop-blur-md space-y-1.5 text-xs text-emerald-100 border border-white/10">
                <div className="flex justify-between">
                  <span>Campus Primary:</span>
                  <strong className="text-white">Apollo-Care Hub, Indiranagar</strong>
                </div>
                <div className="flex justify-between">
                  <span>Primary Physician:</span>
                  <strong className="text-white">Dr. Sarah Mukherjee, MD</strong>
                </div>
                <div className="flex justify-between">
                  <span>Current Queue Token:</span>
                  <strong className="text-amber-300 font-mono text-sm">#CP-DOC-4821</strong>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-emerald-300">
                <span className="flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verified Hospital Identity
                </span>
                <span>Valid: 2026 - 2027</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert('Health Pass PDF downloaded.')}
                className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center gap-2 text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Save to Apple / Google Wallet</span>
              </button>
              <button
                type="button"
                onClick={() => alert('Pass share link generated.')}
                className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center gap-2 text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Share with Family</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. PRESCRIPTIONS LOCKER (FROM AURAFLOW) */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Digital Medication Locker</h3>
                <p className="text-xs text-slate-500">Live e-Prescriptions verified by hospital pharmacy</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {prescriptions.length} Active Prescriptions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {rx.status}
                      </span>
                      <h4 className="font-black text-slate-900 text-base mt-1">{rx.medicationName}</h4>
                      <p className="text-xs font-bold text-slate-700">{rx.dosage} • {rx.frequency}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <Pill className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed font-medium">
                    {rx.instructions}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate max-w-[180px]">{rx.prescribedBy}</span>
                    <span className="font-bold text-emerald-700">{rx.refillsRemaining} Refills Left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. LAB REPORTS */}
        {activeTab === 'labs' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Diagnostic Pathology & Imaging Reports</h3>
                <p className="text-xs text-slate-500">NABL & CAP certified digital lab results</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {labReports.length} Reports Ready
              </span>
            </div>

            <div className="space-y-3">
              {labReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                        {rep.testCategory}
                      </span>
                      <h4 className="font-black text-slate-900 text-sm sm:text-base mt-0.5">{rep.testName}</h4>
                      <p className="text-xs text-slate-600 mt-1">{rep.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 font-mono">{rep.date}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Opening PDF Report for ${rep.testName}`)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. EMERGENCY GPS SOS SIMULATOR */}
        {activeTab === 'ambulance' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md animate-pulse">
                    <Ambulance className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">GPS Ambulance Dispatch Tracking</h3>
                    <p className="text-xs text-slate-500">CarePulse Critical Care Mobile Unit #AMB-108</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">ETA</span>
                  <span className="text-xl font-mono font-black text-rose-600">{etaMinutes} Mins</span>
                </div>
              </div>

              {/* Simulated Map Container */}
              <div className="relative h-48 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center text-white">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Ambulance Route Indicator */}
                <div className="relative z-10 text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-600/90 text-white text-xs font-bold shadow-lg animate-bounce">
                    <Ambulance className="w-4 h-4" />
                    <span>Ambulance En Route • 1.4 km from your location</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Paramedic Team: Leader Nurse Rajesh & Emergency Pilot
                  </p>
                </div>
              </div>

              {/* Triage Status */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-rose-600" />
                  <span>Direct Paramedic Hotline: <strong>+91-80-4920-9999</strong></span>
                </div>
                <span className="font-bold text-emerald-700">ICU Bed 04 Reserved</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
