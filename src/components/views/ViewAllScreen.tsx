import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Users,
  TestTube2,
  Building2,
  CalendarCheck,
} from 'lucide-react';
import { Department, Doctor, DiagnosticService, HospitalFacility, ViewAllCategory } from '../../types';
import { DepartmentCard } from '../cards/DepartmentCard';
import { DoctorCard } from '../cards/DoctorCard';
import { DiagnosticCard } from '../cards/DiagnosticCard';
import { FacilityCard } from '../cards/FacilityCard';

interface ViewAllScreenProps {
  initialCategory: ViewAllCategory;
  departments: Department[];
  doctors: Doctor[];
  diagnosticServices: DiagnosticService[];
  facilities: HospitalFacility[];
  onBack: () => void;
  onSelectDepartment: (dept: Department) => void;
  onSelectDoctor: (doc: Doctor) => void;
  onSelectDiagnostic: (diag: DiagnosticService) => void;
  onSelectFacility: (fac: HospitalFacility) => void;
  onBookDoctor: (doc: Doctor) => void;
  onBookDiagnostic: (diag: DiagnosticService) => void;
}

export const ViewAllScreen: React.FC<ViewAllScreenProps> = ({
  initialCategory,
  departments,
  doctors,
  diagnosticServices,
  facilities,
  onBack,
  onSelectDepartment,
  onSelectDoctor,
  onSelectDiagnostic,
  onSelectFacility,
  onBookDoctor,
  onBookDiagnostic,
}) => {
  const [activeCategory, setActiveCategory] = useState<ViewAllCategory>(initialCategory);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'priceAsc' | 'experience'>('relevance');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [selectedDiagCategory, setSelectedDiagCategory] = useState<string>('all');

  // Filtered and sorted Doctors
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        const matchesSearch =
          doc.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          doc.departmentName.toLowerCase().includes(searchFilter.toLowerCase()) ||
          doc.designation.toLowerCase().includes(searchFilter.toLowerCase());
        const matchesDept = selectedDeptFilter === 'all' || doc.departmentId === selectedDeptFilter;
        const matchesAvailability = !availableTodayOnly || doc.availableToday;
        return matchesSearch && matchesDept && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceAsc') return a.consultationFee - b.consultationFee;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        return 0;
      });
  }, [doctors, searchFilter, selectedDeptFilter, availableTodayOnly, sortBy]);

  // Filtered and sorted Departments
  const filteredDepartments = useMemo(() => {
    return departments
      .filter((dept) => {
        return (
          dept.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          dept.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
          dept.description.toLowerCase().includes(searchFilter.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [departments, searchFilter, sortBy]);

  // Filtered and sorted Diagnostics
  const filteredDiagnostics = useMemo(() => {
    return diagnosticServices
      .filter((diag) => {
        const matchesSearch =
          diag.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          diag.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
          diag.description.toLowerCase().includes(searchFilter.toLowerCase());
        const matchesCat = selectedDiagCategory === 'all' || diag.category === selectedDiagCategory;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceAsc') return a.price - b.price;
        return 0;
      });
  }, [diagnosticServices, searchFilter, selectedDiagCategory, sortBy]);

  // Filtered Facilities
  const filteredFacilities = useMemo(() => {
    return facilities.filter((fac) => {
      return (
        fac.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        fac.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
        fac.category.toLowerCase().includes(searchFilter.toLowerCase())
      );
    });
  }, [facilities, searchFilter]);

  const categoriesConfig = [
    { id: 'departments', label: 'Departments', count: departments.length, icon: <Building2 className="w-4 h-4" /> },
    { id: 'doctors', label: 'Find a Doctor', count: doctors.length, icon: <Users className="w-4 h-4" /> },
    { id: 'diagnostics', label: 'Diagnostic Tests', count: diagnosticServices.length, icon: <TestTube2 className="w-4 h-4" /> },
    { id: 'facilities', label: 'Hospital Facilities', count: facilities.length, icon: <CalendarCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">
                Explore CarePulse Catalog
              </h1>
              <p className="text-xs text-slate-500">
                Browse all hospital departments, doctors, diagnostic packages & facilities
              </p>
            </div>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3 pb-1">
            {categoriesConfig.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id as ViewAllCategory);
                  setSearchFilter('');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? 'bg-orange-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Sort Bar */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={`Search ${activeCategory}...`}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-orange-500 outline-hidden font-medium"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-slate-800 font-bold outline-hidden cursor-pointer"
                >
                  <option value="relevance">Recommended</option>
                  <option value="rating">Top Rated (★)</option>
                  <option value="priceAsc">Price: Low to High</option>
                  {activeCategory === 'doctors' && <option value="experience">Experience</option>}
                </select>
              </div>

              {/* Doctors specific toggle */}
              {activeCategory === 'doctors' && (
                <button
                  type="button"
                  onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
                    availableTodayOnly
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  ⚡ Today Only
                </button>
              )}
            </div>
          </div>

          {/* Subcategory Pills for Diagnostics */}
          {activeCategory === 'diagnostics' && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
              {['all', 'Full Body', 'Cardiac', 'Scans & MRI', 'Diabetes', 'General', 'Women Health'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedDiagCategory(c)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer ${
                    selectedDiagCategory === c
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c === 'all' ? 'All Packages' : c}
                </button>
              ))}
            </div>
          )}

          {/* Subcategory Pills for Doctors */}
          {activeCategory === 'doctors' && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
              <button
                type="button"
                onClick={() => setSelectedDeptFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer ${
                  selectedDeptFilter === 'all'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Specialities
              </button>
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDeptFilter(dept.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 cursor-pointer ${
                    selectedDeptFilter === dept.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        {/* Active Section Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Showing results for <span className="text-slate-900 font-bold">{categoriesConfig.find((c) => c.id === activeCategory)?.label}</span>
          </p>
        </div>

        {/* 1. DEPARTMENTS GRID */}
        {activeCategory === 'departments' && (
          <div>
            {filteredDepartments.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-slate-500 text-sm">No departments match your filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {filteredDepartments.map((dept) => (
                  <div key={dept.id} className="w-full">
                    <DepartmentCard department={dept} onClick={onSelectDepartment} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. DOCTORS GRID */}
        {activeCategory === 'doctors' && (
          <div>
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-slate-500 text-sm">No doctors match your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDoctors.map((doc) => (
                  <div key={doc.id} className="w-full">
                    <DoctorCard
                      doctor={doc}
                      onClick={onSelectDoctor}
                      onBookSlot={() => onBookDoctor(doc)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. DIAGNOSTICS GRID */}
        {activeCategory === 'diagnostics' && (
          <div>
            {filteredDiagnostics.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-slate-500 text-sm">No diagnostic tests match your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDiagnostics.map((diag) => (
                  <div key={diag.id} className="w-full">
                    <DiagnosticCard
                      service={diag}
                      onClick={onSelectDiagnostic}
                      onAddToCart={() => onBookDiagnostic(diag)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. FACILITIES GRID */}
        {activeCategory === 'facilities' && (
          <div>
            {filteredFacilities.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-slate-500 text-sm">No facilities match your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFacilities.map((fac) => (
                  <div key={fac.id} className="w-full">
                    <FacilityCard facility={fac} onClick={onSelectFacility} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
