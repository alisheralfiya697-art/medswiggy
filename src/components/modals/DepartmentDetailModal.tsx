import React from 'react';
import {
  X,
  Star,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Department, Doctor } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface DepartmentDetailModalProps {
  department: Department;
  doctors: Doctor[];
  onClose: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  doctors,
  onClose,
  onSelectDoctor,
}) => {
  const departmentDoctors = doctors.filter(
    (d) => d.departmentId.toLowerCase() === department.id.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-4">
        {/* Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
          <RemoteImage
            src={department.bannerImage}
            alt={department.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            fallbackText={department.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-orange-300 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-500/40">
                Center of Clinical Excellence
              </span>
              <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                <span>{department.rating}</span>
                <Star className="w-3 h-3 fill-white" />
                <span className="text-[10px] text-emerald-100">({department.reviewCount})</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-3xl font-black">
              {department.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {department.subtitle}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center justify-center gap-1">
                <Users className="w-3 h-3" /> Specialists
              </span>
              <span className="font-extrabold text-slate-900 text-sm">{department.doctorCount} Doctors</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" /> Avg OPD Wait
              </span>
              <span className="font-extrabold text-emerald-700 text-sm">{department.avgWaitMinutes} mins</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Clinical Rating</span>
              <span className="font-extrabold text-slate-900 text-sm">{department.rating} / 5.0</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              About Department
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {department.description}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Department Head: <strong className="text-slate-800">{department.headDoctor}</strong>
            </p>
          </div>

          {/* Procedures & Treatments */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Key Procedures & Treatments
            </h4>
            <div className="flex flex-wrap gap-2">
              {department.procedures.map((proc, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/70 text-xs font-semibold text-orange-950 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  <span>{proc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department Specialists */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Specialists in {department.name} ({departmentDoctors.length})
              </h4>
            </div>

            {departmentDoctors.length > 0 ? (
              <div className="space-y-2.5">
                {departmentDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onClose();
                      onSelectDoctor(doc);
                    }}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-orange-400 bg-white hover:bg-orange-50/40 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        <RemoteImage
                          src={doc.avatarUrl}
                          alt={doc.name}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover"
                          fallbackText={doc.name}
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">
                          {doc.name}
                        </h5>
                        <p className="text-[11px] text-slate-500">{doc.designation}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-emerald-700 font-semibold">
                          <span>★ {doc.rating}</span>
                          <span>•</span>
                          <span>{doc.nextSlotTime}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-orange-500 group-hover:bg-orange-600 text-white font-bold text-xs shrink-0 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                16 Specialists available at Hospital OPD Desk.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
