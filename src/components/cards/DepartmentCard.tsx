import React from 'react';
import {
  HeartPulse,
  Brain,
  Activity,
  Baby,
  ShieldAlert,
  Flame,
  Sparkles,
  Ear,
  Star,
  Clock,
  Users,
} from 'lucide-react';
import { Department } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface DepartmentCardProps {
  department: Department;
  onClick: (department: Department) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-5 h-5 text-rose-600" />,
  Brain: <Brain className="w-5 h-5 text-purple-600" />,
  Activity: <Activity className="w-5 h-5 text-blue-600" />,
  Baby: <Baby className="w-5 h-5 text-amber-600" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-teal-600" />,
  Flame: <Flame className="w-5 h-5 text-emerald-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-pink-600" />,
  Ear: <Ear className="w-5 h-5 text-indigo-600" />,
};

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onClick }) => {
  return (
    <div
      onClick={() => onClick(department)}
      className="group w-48 sm:w-56 bg-white rounded-2xl border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex flex-col active:scale-98"
    >
      {/* Image Banner with Icon Overlay */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
        <RemoteImage
          src={department.bannerImage}
          alt={department.name}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          fallbackText={department.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Department Icon Pill */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-xl shadow-xs border border-white/50">
          {ICON_MAP[department.iconName] || <Activity className="w-5 h-5 text-slate-700" />}
        </div>

        {/* Avg Wait Time Badge */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>Avg {department.avgWaitMinutes}m wait</span>
        </div>

        {/* Rating Star Badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
          <span>{department.rating}</span>
          <Star className="w-2.5 h-2.5 fill-white" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1">
        <div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors line-clamp-1">
            {department.name}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {department.subtitle}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            {department.doctorCount} Doctors
          </span>
          <span className="text-orange-600 font-semibold group-hover:underline">
            Explore →
          </span>
        </div>
      </div>
    </div>
  );
};
