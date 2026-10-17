import React from 'react';
import {
  ArrowLeft,
  Search,
  X,
  TrendingUp,
  Users,
  Building2,
  TestTube2,
  Building,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Department, Doctor, DiagnosticService, HospitalFacility } from '../../types';
import { POPULAR_SEARCH_TAGS } from '../../data/mockData';

interface SearchScreenProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClose: () => void;
  departments: Department[];
  doctors: Doctor[];
  diagnosticServices: DiagnosticService[];
  facilities: HospitalFacility[];
  onSelectDepartment: (d: Department) => void;
  onSelectDoctor: (doc: Doctor) => void;
  onSelectDiagnostic: (diag: DiagnosticService) => void;
  onSelectFacility: (fac: HospitalFacility) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  searchQuery,
  onSearchChange,
  onClose,
  departments,
  doctors,
  diagnosticServices,
  facilities,
  onSelectDepartment,
  onSelectDoctor,
  onSelectDiagnostic,
  onSelectFacility,
}) => {
  const query = searchQuery.trim().toLowerCase();

  const matchedDoctors = query
    ? doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.departmentName.toLowerCase().includes(query) ||
          d.designation.toLowerCase().includes(query)
      )
    : [];

  const matchedDepartments = query
    ? departments.filter(
        (dept) =>
          dept.name.toLowerCase().includes(query) ||
          dept.subtitle.toLowerCase().includes(query) ||
          dept.description.toLowerCase().includes(query)
      )
    : [];

  const matchedDiagnostics = query
    ? diagnosticServices.filter(
        (diag) =>
          diag.name.toLowerCase().includes(query) ||
          diag.category.toLowerCase().includes(query) ||
          diag.description.toLowerCase().includes(query)
      )
    : [];

  const matchedFacilities = query
    ? facilities.filter(
        (fac) =>
          fac.name.toLowerCase().includes(query) ||
          fac.tagline.toLowerCase().includes(query) ||
          fac.category.toLowerCase().includes(query)
      )
    : [];

  const totalMatches =
    matchedDoctors.length +
    matchedDepartments.length +
    matchedDiagnostics.length +
    matchedFacilities.length;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto pb-20">
      {/* Top Search Input Bar */}
      <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-orange-500" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search doctors, tests, departments, facilities..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500 outline-hidden font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Popular Trending Tags when no query */}
        {!query && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span>Popular Searches on CarePulse</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSearchChange(tag)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-orange-50/50 border border-orange-100 text-xs text-slate-600">
              <span className="font-bold text-orange-950 block mb-1">
                Tip: Instant Healthcare Search
              </span>
              Search by symptom (e.g. &apos;chest pain&apos;), doctor name, test name (e.g. &apos;HbA1c&apos;), or hospital facility.
            </div>
          </div>
        )}

        {/* When Query is Present */}
        {query && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400 font-semibold uppercase">
              {totalMatches} results found for &ldquo;{searchQuery}&rdquo;
            </p>

            {totalMatches === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm">No matches found for &ldquo;{searchQuery}&rdquo;.</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for &apos;Cardiology&apos;, &apos;Dr. Sarah&apos;, or &apos;Full Body&apos;.</p>
              </div>
            )}

            {/* Doctors Section */}
            {matchedDoctors.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" /> Doctors ({matchedDoctors.length})
                </h4>
                <div className="space-y-2">
                  {matchedDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        onClose();
                        onSelectDoctor(doc);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-orange-400 bg-white hover:bg-orange-50/30 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.name}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">{doc.name}</h5>
                          <p className="text-xs text-slate-500">{doc.departmentName} • {doc.designation}</p>
                          <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-semibold">
                            <span>★ {doc.rating}</span>
                            <span>•</span>
                            <span>Next: {doc.nextSlotTime}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnostic Tests Section */}
            {matchedDiagnostics.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TestTube2 className="w-3.5 h-3.5 text-emerald-600" /> Diagnostic Services ({matchedDiagnostics.length})
                </h4>
                <div className="space-y-2">
                  {matchedDiagnostics.map((diag) => (
                    <div
                      key={diag.id}
                      onClick={() => {
                        onClose();
                        onSelectDiagnostic(diag);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/30 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{diag.name}</h5>
                        <p className="text-xs text-slate-500">{diag.category} • {diag.parametersCount} Tests • Reports in {diag.reportTurnaroundHours}h</p>
                        <span className="text-xs font-black text-slate-900 mt-1 block">₹{diag.price} <span className="line-through text-slate-400 font-normal text-[11px]">₹{diag.originalPrice}</span></span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Departments Section */}
            {matchedDepartments.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" /> Departments ({matchedDepartments.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchedDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => {
                        onClose();
                        onSelectDepartment(dept);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-orange-400 bg-white hover:bg-orange-50/30 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{dept.name}</h5>
                        <p className="text-xs text-slate-500">{dept.subtitle}</p>
                        <span className="text-[10px] text-slate-400">{dept.doctorCount} Specialists</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities Section */}
            {matchedFacilities.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-600" /> Facilities ({matchedFacilities.length})
                </h4>
                <div className="space-y-2">
                  {matchedFacilities.map((fac) => (
                    <div
                      key={fac.id}
                      onClick={() => {
                        onClose();
                        onSelectFacility(fac);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{fac.name}</h5>
                        <p className="text-xs text-slate-500">{fac.tagline}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
