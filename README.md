# CarePulse - Swiggy-Style Hospital Home Screen

> **Question 4 Deliverable**: A visually engaging hospital app homepage inspired by Swiggy's card-based browsing experience, built with React 19, TypeScript, Tailwind CSS, and Lucide Icons.

---

## 🌟 Executive Summary & Scenario

The **CarePulse Hospital App** adapts Swiggy's consumer-grade browsing UX into an intuitive, patient-first healthcare discovery platform:
* **Swiggy-Style Top Navigation**: Dynamic location selector with multiple hospital branches (Indiranagar, Whitefield, Koramangala, etc.), priority 24x7 emergency SOS trauma hotline, and live cart/token badge counter.
* **Animated Search Experience**: Smart search bar with rotating contextual placeholders, live multi-entity suggestions (Doctors, Departments, Tests, Facilities), and popular trending health tags.
* **Flash Health Checkup Promotional Banners**: Hero carousel featuring the **Executive Full Body Health Checkup (65% OFF)** with live countdown urgency timer, copyable promo coupon code (`CARE60`), and instant booking CTA.
* **FlatList-Style Horizontal Scrolling**: Horizontally scrollable carousels with smooth momentum scroll, left/right desktop navigation arrows, touch-swipe snapping, and real-time scroll progress indicators for:
  1. **Hospital Departments**
  2. **Find a Doctor**
  3. **Diagnostic Services**
  4. **Hospital Facilities**
* **Rich Metadata & Visual Hierarchy**: Star ratings with green badges (e.g. `4.94 ★`), average wait times (`Avg 12m wait`), instant availability flags (`⚡ Today, 2:45 PM`), strike-through pricing with discounts (`₹799` was `₹1,500`), and home sample collection tags.
* **Dedicated "View All" Screens**: Multi-category tabbed catalog with real-time sorting (by rating, consultation fee, experience), specialty pills, and availability filters.
* **Interactive Card Detail Modals**:
  * **Doctor Booking**: In-hospital visit vs. HD Video Tele-consult, date & time slot selector, patient details, and digital queue token generation.
  * **Diagnostic Booking**: Inclusions list (85+ parameters), preparation instructions, and 30-min home sample collection scheduler.
  * **Facility Explorer**: Technology showcase, bed capacity, and direct emergency desk dialer.
* **Remote Images with Robust Error Handling**: Skeleton shimmer loaders during network fetch and graceful fallback placeholders with retry actions.
* **Deliverables Showcase & Device Toggle**: In-app **Deliverables Showcase** modal and **Mobile Viewport / Desktop View** toggle for instant grading.

---

## 📸 Deliverables & Screenshot Guide

The application contains four primary deliverable views accessible directly via the in-app **"Deliverables Showcase"** button at the top:

### 1. Hospital Homepage (`/`)
* **Location Bar**: Shows `"Apollo-Care Hub, Indiranagar"` with a campus selector modal.
* **Emergency SOS**: Quick-access red priority button linking to 24/7 trauma triage.
* **Rotating Search Bar**: Alternates between doctor names, health packages, and scans.
* **Promotional Banner**: High-impact gradient card for Executive Health Checkup with countdown timer and promo code `CARE60`.
* **Quick Filter Chips**: `⚡ Available Today`, `⭐ 4.9+ Rated`, `🧪 Home Collection`, `🚨 24x7 Open`, `🏷️ Deals > 50% Off`.

```
+------------------------------------------------------------------------+
| 📍 Apollo-Care Hub, Indiranagar [v]              [ 🚨 24x7 SOS ] [ 📅 My Bookings (2) ] |
+------------------------------------------------------------------------+
| [ 🔍 Search 'Dr. Sarah (Cardiologist)'...                    [ ⚙️ Filters ] ] |
| [ ⚡ Available Today ] [ ⭐ 4.9+ Rated ] [ 🧪 Home Collection ] [ 🚨 24/7 Open ]   |
+------------------------------------------------------------------------+
| [🎉 SUPER SAVER HEALTH PASS]                   [Ends in 05h:42m:18s]  |
| Executive Full Body Health Checkup (85+ Tests)                         |
| ₹1,699  ~~₹4,999~~ [65% OFF]      [CODE: CARE60]   [ Book Package -> ] |
+------------------------------------------------------------------------+
```

---

### 2. Horizontally Scrolled Sections (FlatList-Style)
All four sections support horizontal swipe and desktop arrow navigation:

1. **Hospital Departments**:
   * *Cardiology* (Avg 12m wait • 16 Doctors • 4.9 ★)
   * *Neurology & Spine* (Avg 15m wait • 12 Doctors • 4.85 ★)
   * *Orthopedics* (Avg 10m wait • 14 Doctors • 4.92 ★)
   * *Pediatrics & NICU* (Avg 8m wait • 11 Doctors • 4.95 ★)
   * *Oncology*, *Gastroenterology*, *Dermatology*, *ENT*

2. **Find a Doctor**:
   * *Dr. Sarah Mukherjee* (Senior Interventional Cardiologist • 18+ yrs • 4.94 ★ • ⚡ Today 2:45 PM • ₹799 ~~₹1500~~)
   * *Dr. Arjun Varma* (Lead Robotic Joint Replacement • 15+ yrs • 4.91 ★ • ⚡ Today 3:15 PM • ₹699 ~~₹1200~~)
   * *Dr. Priya Ramaswamy* (Chief Pediatrician & Neonatologist • 14+ yrs • 4.98 ★ • ₹599)
   * *Dr. Rohan Kashyap* (Comprehensive Stroke Specialist • 16+ yrs • Tomorrow 10:30 AM)
   * *Dr. Ananya Sharma* & *Dr. Alok Nath Sengupta*

3. **Diagnostic Services**:
   * *CarePulse Master Health Checkup* (88 Tests • Reports in 6h • 🧪 Home Pickup in 30m • ₹1,499)
   * *Advanced 3-Tesla Brain MRI* (High-res DICOM CD • 4h turnaround • ₹3,499)
   * *Complete Cardiac Risk Profile & ECG* (16 Tests • hs-CRP & Lipids • ₹999)
   * *Vitamin D3 & B12 Combo* (₹599)
   * *Diabetes Early Detection & HbA1c Panel* (₹449)

4. **Hospital Facilities**:
   * *24x7 Level-1 Emergency & Trauma Care* (Zero Wait • 24 Trauma Beds • Call Desk)
   * *Da Vinci XI Robotic Surgery Suite* (4-Arm Minimally Invasive Suite)
   * *Presidential & Executive Patient Suites* (5-Star Luxury Inpatient)
   * *Ultra-Modern Hybrid Cath Lab* (Philips Azurion 7 Biplane)
   * *24x7 Smart In-House Pharmacy* (15-min delivery)

---

### 3. Card Details & Slot Booking Screens
Clicking any card opens a comprehensive detail view:
* **Doctor Profile Modal**:
  * Bio, hospital distance, languages spoken, total patients treated.
  * Selection between **In-Hospital Visit** vs. **HD Video Consult**.
  * Dynamic date picker (Today, Tomorrow, Friday) and morning/afternoon slot grid.
  * Patient name & phone input.
  * Instant generation of digital **Queue Token Pass** (`CP-DOC-XXXX`) with QR Code!
* **Diagnostic Test Modal**:
  * Complete list of included parameters.
  * Toggle between **Home Sample Collection** (with address field) and **Hospital Lab Visit**.
  * Fasting requirements indicator.
* **Department Modal**:
  * List of specialized medical procedures and direct 1-tap booking for specialists.
* **Facility Modal**:
  * Technical specifications, bed capacity, and direct hotline dialer.

---

### 4. Dedicated "View All" Screen
Accessible by tapping any section's **"View All"** button:
* Category switcher pills for **Departments**, **Doctors**, **Diagnostics**, and **Facilities**.
* Real-time sorting:
  * Recommended
  * Top Rated (★)
  * Price: Low to High
  * Experience (Doctors)
* Subcategory filters (e.g. filter tests by Cardiac, MRI, Diabetes; filter doctors by Cardiology, Ortho).
* "⚡ Today Only" toggle for instant consultation slots.

---

## 🛠️ Technical Implementation

### FlatList-Style Horizontal Scrolling Architecture
The `HorizontalScrollSection` component mimics React Native's `FlatList horizontal`:
* Accepts generic data `T[]` with `keyExtractor` and `renderItem`.
* Employs CSS snap points (`snap-x snap-mandatory`) with `no-scrollbar` styling.
* Computes scroll boundaries (`canScrollLeft`, `canScrollRight`) and updates the progress indicator bar dynamically.
* Desktop navigation arrows allow keyboard and mouse accessibility.

### Remote Images with Loading and Error Fallbacks
The `RemoteImage` component enforces:
1. **Loading State**: An animated gradient shimmer skeleton pulse (`@keyframes shimmer`) while the remote asset loads.
2. **Success State**: Smooth opacity fade-in transition (`opacity-0` to `opacity-100`).
3. **Error State**: Graceful fallback illustration with custom text and an interactive **Retry** button.

---

## 📱 Bottom Navigation Bar
1. **Home**: Primary Swiggy-style hospital homepage.
2. **Doctors**: Direct link to the full doctors catalog with filters.
3. **Lab Tests**: Direct link to diagnostic packages.
4. **Bookings**: Patient dashboard showing confirmed appointments, queue tokens, and scheduled home lab pickups.
5. **Facilities**: Campus infrastructure and 24x7 emergency directory.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:3000` to interact with the application.
