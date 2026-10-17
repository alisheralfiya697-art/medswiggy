import React, { useState } from 'react';
import {
  ArrowLeft,
  CalendarCheck,
  Clock,
  QrCode,
  MapPin,
  Trash2,
  TestTube2,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import { Appointment, DiagnosticBooking } from '../../types';

interface BookingsCartScreenProps {
  appointments: Appointment[];
  diagnosticBookings: DiagnosticBooking[];
  onBack: () => void;
  onCancelAppointment: (id: string) => void;
  onCancelDiagnostic: (id: string) => void;
  onExploreServices: () => void;
}

export const BookingsCartScreen: React.FC<BookingsCartScreenProps> = ({
  appointments,
  diagnosticBookings,
  onBack,
  onCancelAppointment,
  onCancelDiagnostic,
  onExploreServices,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'doctors' | 'diagnostics'>('all');

  const totalBookings = appointments.length + diagnosticBookings.length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight">
                My Healthcare Bookings
              </h1>
              <p className="text-xs text-slate-500">
                {totalBookings} Active Appointments & Lab Tests
              </p>
            </div>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              All ({totalBookings})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('doctors')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'doctors' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Doctors ({appointments.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === 'diagnostics' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Tests ({diagnosticBookings.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        {totalBookings === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 mx-auto flex items-center justify-center mb-3">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">No Active Bookings Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              Browse top doctors, book checkup packages or diagnostic scans with immediate queue tokens.
            </p>
            <button
              type="button"
              onClick={onExploreServices}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Explore Hospital Services
            </button>
          </div>
        ) : (
          <>
            {/* Doctor Appointments List */}
            {(activeTab === 'all' || activeTab === 'doctors') && appointments.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-orange-600" /> Doctor Appointments ({appointments.length})
                </h3>

                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-orange-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={apt.avatarUrl}
                          alt={apt.doctorName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md uppercase">
                            {apt.consultationType}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm mt-0.5">{apt.doctorName}</h4>
                          <p className="text-xs text-slate-500">{apt.departmentName}</p>
                        </div>
                      </div>

                      {/* Token badge */}
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Queue Token</span>
                        <span className="text-sm font-mono font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {apt.tokenNumber}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{apt.date} • {apt.slot}</span>
                      </div>

                      <div className="text-slate-500">
                        Patient: <strong className="text-slate-800">{apt.patientName}</strong>
                      </div>

                      <div className="text-slate-900 font-black">
                        ₹{apt.fee}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                      </span>

                      <button
                        type="button"
                        onClick={() => onCancelAppointment(apt.id)}
                        className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold text-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Diagnostic Bookings List */}
            {(activeTab === 'all' || activeTab === 'diagnostics') && diagnosticBookings.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <TestTube2 className="w-4 h-4 text-emerald-600" /> Diagnostic & Lab Tests ({diagnosticBookings.length})
                </h3>

                {diagnosticBookings.map((diag) => (
                  <div
                    key={diag.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
                          {diag.collectionType}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{diag.testName}</h4>
                        <p className="text-xs text-slate-500">Patient: {diag.patientName}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Lab Token</span>
                        <span className="text-sm font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {diag.tokenNumber}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{diag.scheduledDate} • {diag.scheduledTime}</span>
                      </div>

                      {diag.address && (
                        <div className="text-slate-500 flex items-center gap-1 max-w-xs truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          <span className="truncate">{diag.address}</span>
                        </div>
                      )}

                      <div className="text-slate-900 font-black">
                        ₹{diag.price}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Status: {diag.status}
                      </span>

                      <button
                        type="button"
                        onClick={() => onCancelDiagnostic(diag.id)}
                        className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold text-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
