import React, { useState, useMemo } from 'react';
import {
  Users,
  Calendar,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Phone,
  Bed,
  Building2,
  Clock,
  ShieldAlert,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  DashboardMetrics,
  Patient,
  HospitalStaffDoctor,
  HospitalAppointment,
  HospitalTask,
  DoctorAvailability,
} from '../../types';
import {
  INITIAL_METRICS,
  INITIAL_PATIENTS,
  INITIAL_STAFF_DOCTORS,
  INITIAL_HOSPITAL_TASKS,
  INITIAL_HOSPITAL_APPOINTMENTS,
} from '../../data/mockPortion1Data';

export const AuraCareStaffScreen: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'staff' | 'patients' | 'appointments'>('dashboard');
  const [metrics, setMetrics] = useState<DashboardMetrics>(INITIAL_METRICS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [staffDoctors, setStaffDoctors] = useState<HospitalStaffDoctor[]>(INITIAL_STAFF_DOCTORS);
  const [tasks, setTasks] = useState<HospitalTask[]>(INITIAL_HOSPITAL_TASKS);
  const [appointments, setAppointments] = useState<HospitalAppointment[]>(INITIAL_HOSPITAL_APPOINTMENTS);

  // Filters & Search
  const [staffSearch, setStaffSearch] = useState('');
  const [staffDeptFilter, setStaffDeptFilter] = useState('All');
  const [patientSearch, setPatientSearch] = useState('');
  const [patientTriageFilter, setPatientTriageFilter] = useState('All');

  // Modals
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffSpecialty, setNewStaffSpecialty] = useState('General Medicine');
  const [newStaffDept, setNewStaffDept] = useState('Internal Medicine');

  // Toggle Task Completion
  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Add Staff Member
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;

    const newStaff: HospitalStaffDoctor = {
      id: `DOC-0${staffDoctors.length + 1}`,
      name: newStaffName,
      title: 'MD',
      specialty: newStaffSpecialty,
      department: newStaffDept,
      availability: 'Available',
      room: `Clinic ${Math.floor(200 + Math.random() * 300)}`,
      phoneExtension: `Ext. ${Math.floor(4100 + Math.random() * 100)}`,
      patientsToday: 0,
      shift: '08:00 AM - 04:00 PM',
      avatarColor: 'bg-emerald-600',
    };

    setStaffDoctors([newStaff, ...staffDoctors]);
    setNewStaffName('');
    setIsAddStaffOpen(false);
  };

  // Filtered Staff
  const filteredStaff = useMemo(() => {
    return staffDoctors.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(staffSearch.toLowerCase()) || doc.specialty.toLowerCase().includes(staffSearch.toLowerCase());
      const matchDept = staffDeptFilter === 'All' || doc.department === staffDeptFilter;
      return matchSearch && matchDept;
    });
  }, [staffDoctors, staffSearch, staffDeptFilter]);

  // Filtered Patients
  const filteredPatients = useMemo(() => {
    return patients.filter((pt) => {
      const matchSearch = pt.name.toLowerCase().includes(patientSearch.toLowerCase()) || pt.mrn.toLowerCase().includes(patientSearch.toLowerCase()) || pt.department.toLowerCase().includes(patientSearch.toLowerCase());
      const matchTriage = patientTriageFilter === 'All' || pt.triage === patientTriageFilter;
      return matchSearch && matchTriage;
    });
  }, [patients, patientSearch, patientTriageFilter]);

  const availabilityBadge = (status: DoctorAvailability) => {
    switch (status) {
      case 'Available':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">● Available</span>;
      case 'In Surgery':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">● In Surgery</span>;
      case 'In Consultation':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">● In Consultation</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">● Off Duty</span>;
    }
  };

  const triageBadge = (triage: string) => {
    switch (triage) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white animate-pulse">CRITICAL</span>;
      case 'Urgent':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">URGENT</span>;
      case 'Stable':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">STABLE</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500 text-white">OBSERVATION</span>;
    }
  };

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      {/* Sub-Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-400 text-emerald-950 uppercase">
                Portion 1
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                AuraCare • Hospital Staff & Inpatients
              </h1>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Clinical operations, on-duty physician rosters, inpatient census, and departmental throughput
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddStaffOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* Sub-Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: 'Clinical Dashboard', icon: Activity },
            { id: 'staff', label: 'Staff Roster', icon: UserCheck, badge: staffDoctors.length },
            { id: 'patients', label: 'Inpatient Census', icon: Bed, badge: patients.length },
            { id: 'appointments', label: 'Appointments Roster', icon: Calendar, badge: appointments.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-900 shadow-md scale-102'
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        {/* 1. CLINICAL DASHBOARD VIEW */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-5">
            {/* 4 Primary Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div
                onClick={() => setActiveSubTab('patients')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Patient Count</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  {metrics.patientCount.total}
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  +{metrics.patientCount.admittedToday} admitted today • {metrics.patientCount.dischargedToday} discharged
                </p>
              </div>

              <div
                onClick={() => setActiveSubTab('appointments')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Today&apos;s Schedule</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  {metrics.todayAppointments.total}
                </div>
                <p className="text-[11px] text-slate-600 font-semibold mt-1">
                  {metrics.todayAppointments.completed} completed • {metrics.todayAppointments.scheduled} remaining
                </p>
              </div>

              <div
                onClick={() => setActiveSubTab('staff')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">On-Duty Doctors</span>
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  {metrics.availableDoctors.available}
                </div>
                <p className="text-[11px] text-rose-600 font-semibold mt-1">
                  {metrics.availableDoctors.inSurgery} in surgery • {metrics.availableDoctors.inConsultation} in clinic
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">High Priority Tasks</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">
                  {metrics.pendingTasks.highPriority}
                </div>
                <p className="text-[11px] text-amber-700 font-semibold mt-1">
                  {metrics.pendingTasks.pending} pending checklist actions
                </p>
              </div>
            </div>

            {/* Department Occupancy & Clinical Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Department Occupancy Rates */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Departmental Bed Occupancy
                    </h3>
                    <p className="text-xs text-slate-500">Live inpatient capacity across wards</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    88% Campus Occupancy
                  </span>
                </div>

                <div className="space-y-3.5">
                  {[
                    { name: 'Cardiology Ward (Tower A)', beds: '42 / 45 Beds', pct: 93, color: 'bg-rose-500' },
                    { name: 'Intensive Care Unit (ICU)', beds: '18 / 20 Beds', pct: 90, color: 'bg-red-600' },
                    { name: 'Neurology & Stroke Pavilion', beds: '28 / 32 Beds', pct: 87, color: 'bg-purple-600' },
                    { name: 'Pediatrics & NICU', beds: '22 / 30 Beds', pct: 73, color: 'bg-amber-500' },
                    { name: 'Orthopedics & Joint Suite', beds: '24 / 28 Beds', pct: 85, color: 'bg-blue-600' },
                  ].map((dept, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">{dept.name}</span>
                        <span className="text-slate-500">{dept.beds} ({dept.pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Clinical Tasks Checklist */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Clinical Action Checklist
                      </h3>
                      <p className="text-xs text-slate-500">Tap checkbox to mark rounds & orders complete</p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">
                      {tasks.filter((t) => t.completed).length} / {tasks.length} Completed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                          task.completed
                            ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
                            : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800 shadow-2xs'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <p className={`font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                            <span className="text-slate-600 font-semibold">{task.department}</span>
                            <span>•</span>
                            <span>{task.assignedTo}</span>
                            <span>•</span>
                            <span className="font-mono text-emerald-700">{task.dueTime}</span>
                          </div>
                        </div>
                        {task.priority === 'High' && !task.completed && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                            URGENT
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. STAFF ROSTER VIEW */}
        {activeSubTab === 'staff' && (
          <div className="space-y-4">
            {/* Search and Dept Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  placeholder="Search staff by name or specialty..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {['All', 'Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Emergency'].map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setStaffDeptFilter(dept)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer ${
                      staffDeptFilter === dept ? 'bg-emerald-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStaff.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl ${doc.avatarColor} text-white flex items-center justify-center font-black text-sm shadow-xs`}>
                        {doc.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{doc.name}</h4>
                        <p className="text-xs text-slate-500">{doc.specialty}</p>
                        <span className="text-[10px] text-slate-400">{doc.title}</span>
                      </div>
                    </div>
                    {availabilityBadge(doc.availability)}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1.5 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="font-semibold text-slate-800">{doc.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Station / Room:</span>
                      <span className="font-semibold text-slate-800">{doc.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duty Shift:</span>
                      <span className="font-mono text-emerald-800 font-semibold">{doc.shift}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-500 font-medium">
                      Patients Today: <strong className="text-slate-900">{doc.patientsToday}</strong>
                    </span>
                    <span className="text-emerald-700 font-mono font-bold">{doc.phoneExtension}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. INPATIENT CENSUS VIEW */}
        {activeSubTab === 'patients' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  placeholder="Search patients by name, MRN, or ward..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {['All', 'Critical', 'Urgent', 'Stable'].map((tr) => (
                  <button
                    key={tr}
                    type="button"
                    onClick={() => setPatientTriageFilter(tr)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 cursor-pointer ${
                      patientTriageFilter === tr ? 'bg-emerald-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPatients.map((pt) => (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPatient(pt)}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{pt.name}</h4>
                        <span className="text-xs text-slate-400">({pt.age}y, {pt.gender})</span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">{pt.mrn} • Room {pt.room} ({pt.bed})</p>
                    </div>
                    {triageBadge(pt.triage)}
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                    {pt.condition}
                  </p>

                  {/* Vitals Summary Pill Grid */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-100">
                      <span className="text-slate-400 block">HR</span>
                      <span className="font-extrabold text-rose-700">{pt.vitals.heartRate} bpm</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-100">
                      <span className="text-slate-400 block">BP</span>
                      <span className="font-extrabold text-blue-700">{pt.vitals.bloodPressure}</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100">
                      <span className="text-slate-400 block">Temp</span>
                      <span className="font-extrabold text-amber-700">{pt.vitals.temperature}°F</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-slate-400 block">SpO2</span>
                      <span className="font-extrabold text-emerald-700">{pt.vitals.oxygenSat}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-slate-500 border-t border-slate-100">
                    <span>Attending: <strong className="text-slate-800">{pt.attendingDoctor}</strong></span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                      Details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. APPOINTMENTS SCHEDULE VIEW */}
        {activeSubTab === 'appointments' && (
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Today&apos;s Outpatient & Inpatient Schedule</h3>
                <p className="text-xs text-slate-500">Live integration with AuraHealth & MedSwiggy bookings</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {appointments.length} Consultations Scheduled
              </span>
            </div>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{apt.patientName}</span>
                        <span className="text-xs text-slate-400">({apt.patientAge}y)</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          apt.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{apt.reason}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                        <span className="font-semibold">{apt.doctorName}</span>
                        <span>•</span>
                        <span>{apt.department}</span>
                        <span>•</span>
                        <span className="font-mono text-emerald-700">{apt.room}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-xs font-black text-slate-900 block">{apt.time}</span>
                    <span className="text-[11px] text-slate-400">{apt.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-lg">{selectedPatient.name}</h3>
                <p className="text-xs text-slate-500">{selectedPatient.mrn} • Bed {selectedPatient.bed}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Diagnosis & Care Plan</span>
                <p className="font-semibold text-slate-800">{selectedPatient.condition}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Blood Type: <strong className="text-slate-900">{selectedPatient.bloodType}</strong></div>
                <div>Allergies: <strong className="text-rose-600">{selectedPatient.allergies.join(', ') || 'NKDA'}</strong></div>
                <div>Admission: <strong className="text-slate-900">{selectedPatient.admissionDate}</strong></div>
                <div>Department: <strong className="text-slate-900">{selectedPatient.department}</strong></div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPatient(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
            >
              Close Census Record
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Add Staff Member */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddStaff} className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">Onboard New Staff Member</h3>
              <button
                type="button"
                onClick={() => setIsAddStaffOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Doctor / Staff Name</label>
              <input
                type="text"
                required
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                placeholder="e.g. Dr. Kavita Nair"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Specialty / Qualification</label>
              <input
                type="text"
                required
                value={newStaffSpecialty}
                onChange={(e) => setNewStaffSpecialty(e.target.value)}
                placeholder="e.g. Pediatric Pulmonology"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Hospital Ward / Department</label>
              <select
                value={newStaffDept}
                onChange={(e) => setNewStaffDept(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 outline-hidden font-medium"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency & Trauma</option>
                <option value="Internal Medicine">Internal Medicine</option>
              </select>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsAddStaffOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800"
              >
                Add Staff
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
