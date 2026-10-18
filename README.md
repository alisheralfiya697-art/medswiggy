# CarePulse Unified Hospital Suite (Questions 1 to 5)

> **Single Unified React Native Application** integrating all requirements across Questions 1 through 5, consolidating:
> - `https://github.com/alisheralfiya697-art/Aura-Care.git` (Question 1)
> - `https://github.com/alisheralfiya697-art/AuraHealth.git` (Question 2)
> - `https://github.com/alisheralfiya697-art/AuraFlow-Clinic.git` (Question 3)
> - `https://github.com/alisheralfiya697-art/medswiggy.git` (Question 4)
> - Plus **Portion 5: Unified Patient Portal, Digital Health Pass & 24/7 GPS SOS Emergency Dispatch**

---

## 🌟 Executive Architecture Overview

This project unites all individual features into a **single, reactive, fully interactive application** featuring:
1. **Global Suite Navigator**: Switch seamlessly between all 5 portions using the persistent top navigation bar.
2. **iPhone 16 Pro Simulator & Desktop Mode**: Test inside an authentic mobile device shell with iOS status bar, dynamic island, rounded chassis, and home indicator bar, or switch to the fluid responsive layout.
3. **Cross-Portion Data Interactivity**:
   - Appointments booked in **Portion 2 (AuraHealth)** or **Portion 4 (MedSwiggy)** immediately sync into **Portion 1 (AuraCare Clinical Schedule)** and **Portion 5 (Patient Health Pass)**.
   - Clinical orders & medication titrations approved in **Portion 3 (AuraFlow)** immediately populate the **Portion 5 Digital Prescription Locker**.
   - Inpatients tracked in **Portion 1** connect directly to the clinical encounter engine in **Portion 3**.

---

## 📱 Portions 1 to 5 Breakdown

### 🏥 Portion 1: AuraCare • Hospital Staff & Inpatient Management (Question 1)
*Repository: `https://github.com/alisheralfiya697-art/Aura-Care.git`*
- **Clinical Dashboard Cards**:
  - **Patient Count**: 148 active inpatients (+14 admitted today, 9 discharged).
  - **Today's Appointments**: 32 total consultations (10 completed, 18 scheduled).
  - **On-Duty Roster**: 18 available physicians, 5 in OR surgical suites, 9 in consultation.
  - **High Priority Tasks**: 7 pending clinical actions (3 marked urgent).
- **Staff Roster & Scheduling**:
  - Filter by department (`Cardiology`, `Orthopedics`, `Neurology`, `Pediatrics`, `Emergency`).
  - Search staff by name or specialty.
  - Status indicators (`Available`, `In Surgery`, `In Consultation`, `Off Duty`).
  - Interactive **Add Staff Member** modal with instant roster update.
- **Inpatient Census & Bed Allocation**:
  - Room and bed tracking (`Room 304-A, Bed 01`).
  - Acuity Triage Badges: `Critical` (pulsing red), `Urgent`, `Stable`, `Observation`.
  - Point-of-care vitals monitoring: Heart Rate, Blood Pressure, Temperature, SpO2.
  - Interactive **Patient Detail Modal** with diagnosis, allergies, and blood type.
- **Departmental Bed Occupancy**: Live gauge tracking capacity across Cardiology (93%), ICU (90%), Neurology (87%), and NICU (73%).
- **Clinical Tasks Checklist**: Interactive check-off system for medical rounds, MRI reviews, and pharmacy restocking.

---

### 👨‍⚕️ Portion 2: AuraHealth • Doctor Directory & Appointment Booking (Question 2)
*Repository: `https://github.com/alisheralfiya697-art/AuraHealth.git`*
- **FlatList Doctor Directory**:
  - Real-time search across doctor name, subspecialty, and clinical conditions.
  - Specialty category pills (`All`, `Cardiology`, `Orthopedics`, `Pediatrics`, `Neurology`, `Dermatology`).
- **Comprehensive Doctor Profiles**:
  - Bio, academic degrees (AIIMS, CMC Vellore, Mount Sinai), board certifications, accepted insurances, and languages spoken.
  - Star ratings (`4.96 ★`) with review counts.
- **Interactive Date & TimeSlotPicker**:
  - Date selector (`Today, Oct 17`, `Tomorrow`, `Monday`).
  - Time slots grouped by Morning, Afternoon, Evening.
  - **Visual Disabled State**: Booked slots are crossed out and disabled (`cursor-not-allowed`).
- **Multi-Step Booking Flow**:
  - Toggle between **In-Person OPD Visit** and **HD Video Telehealth**.
  - Patient intake form (Full Name, Phone).
  - Instant generation of digital **Queue Token Pass** (`#AH-DOC-XXXX`) with QR Code receipt and return navigation.

---

### ⚡ Portion 3: AuraFlow Clinical OS • 1-Tap Encounter Bundle (Question 3)
*Repository: `https://github.com/alisheralfiya697-art/AuraFlow-Clinic.git`*
- **The Challenge Solved**: Eliminates the 26-click fragmented EHR workflow (Epic/Cerner tab fatigue).
- **Step 1: Point-of-Care Encounter Findings**:
  - Evaluates today's findings against baseline (Marcus Vance, 54M, Type 2 DM).
  - Delta comparison: HbA1c rose `7.4% → 8.6%`, BP `144/92`, eGFR `68 mL/min`.
- **Step 2: Context-Aware 1-Tap Order Bundle**:
  - **Medication Titration**: Metformin HCl micro-steppers (`500 mg BID` → `1000 mg BID (Target)`).
  - **New Guideline Therapy**: Initiate Empagliflozin (Jardiance) `10 mg QD` with cardio-renal safety check.
  - **Surveillance Requisitions**: 6-Week Basic Metabolic Panel + Urine Albumin/Creatinine Ratio phlebotomy standing order.
  - **Follow-Up Scheduling**: 6-Week Outpatient Clinic Visit with Dr. Sarah Chen.
  - **Patient Action Plan**: Grade-6 reading level plain-language care summary.
- **Step 3: Verification & Dispatch Audit**:
  - Instant 1-tap transmission of e-Prescriptions to central pharmacy and patient portal push.

---

### 🛍️ Portion 4: MedSwiggy • Swiggy-Style Hospital Home Screen (Question 4)
*Repository: `https://github.com/alisheralfiya697-art/medswiggy.git`*
- **Swiggy Header & Campus Switcher**:
  - Location selector (`Apollo-Care Hub, Indiranagar`, `Whitefield`, `Koramangala`, `Delhi`, `Mumbai`).
  - Priority 24x7 Emergency SOS trauma helpline with zero-wait status.
  - Rotating animated search bar with trending tags.
  - Quick filter chips: `⚡ Available Today`, `⭐ 4.9+ Rated`, `🧪 Home Collection`, `🚨 24x7 Open`, `🏷️ Deals > 50% Off`.
- **Hero Promotional Banner Carousel**:
  - **Executive Full Body Health Checkup (65% OFF)** with live countdown urgency timer, copyable coupon `CARE60`, and instant booking CTA.
- **4 Horizontally Scrollable FlatList Carousels**:
  1. **Departments**: Cardiology, Neurology, Orthopedics, Pediatrics, Oncology, Gastroenterology, Dermatology, ENT (with average wait times).
  2. **Find a Doctor**: Rich doctor cards with portraits, verified badges, rating pills, next slot time, and discount fees.
  3. **Diagnostic Services**: 88-parameter checkups, 3T Silent Brain MRI, Cardiac Risk Profile, with 30-min home sample collection.
  4. **Hospital Facilities**: 24/7 Level-1 Trauma Care, Da Vinci XI Robotic Suite, Deluxe Suites, Hybrid Cath Lab.
- **Dedicated "View All" Screens**: Multi-category tabbed catalog with sorting (by rating, fee, experience) and filters.

---

### 📱 Portion 5: CarePortal • Unified Patient Health Pass & Emergency Hub (Question 5)
- **Digital Health Pass**: Verified hospital QR code identity card with blood group, primary physician, and live queue token (`#CP-DOC-4821`).
- **Prescription Locker**: Displays all active digital prescriptions (including Metformin and Empagliflozin approved via AuraFlow).
- **Diagnostic Lab Reports**: Access NABL certified digital reports (Master Health Checkup, 3T MRI Brain, ECG) with PDF download simulation.
- **GPS Emergency Ambulance Dispatch**: Simulated real-time GPS tracking route showing ETA (6 mins), paramedic contact, and pre-allocated ICU bed.

---

## 🚀 Running the Unified Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:3000` in your browser. Use the top switcher to browse across Portions 1 to 5, toggle the iPhone 16 Pro simulator frame, and view the questions rubric guide!
