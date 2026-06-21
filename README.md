# Pump Selection Guide — API 610

<p align="center">
  <img src="https://img.shields.io/badge/Standard-API%20610%2012th%20Ed%20(2021)-1e3a8a?style=for-the-badge" alt="API 610">
  <img src="https://img.shields.io/badge/Version-2.0-059669?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-6d28d9?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Deployment-GitHub%20Pages-f59e0b?style=for-the-badge" alt="GitHub Pages">
</p>

<p align="center">
  <b>A browser-based, single-file preliminary pump type selection tool for petroleum, petrochemical, and natural gas industries.</b><br>
  Designed for use by EPC contractors and owner-operators during pre-FEED and FEED phases, before vendor selection.
</p>

---

## 🚀 Live Demo

**[▶ Open the Tool](https://ahmadr59-ops.github.io/PUMP-Selection-Guide/)**

No installation required. Works entirely in the browser — no server, no backend, no data leaves your machine.

---

## 🎯 Purpose & Scope

This tool performs **preliminary hydraulic pump type selection** per API 610 (12th Edition, January 2021).

**In Scope:**
- Pump type classification: OH1, OH2, BB1, BB2, BB3, BB4, BB5, VS6
- Hydraulic parameter calculation: Ns, Nss, Tip Speed, Impeller Diameter
- NPSH analysis and margin checking
- Viscosity correction (simplified HI 9.6.7)
- Preliminary efficiency and power estimation
- A4 Landscape PDF export for engineering documentation
- Batch processing via Excel import/export
- Project save/load (`.pump_project` files)
- Reference library of real industrial service cases

**Out of Scope:**
- Nozzle load compliance
- Mechanical seal selection
- Parallel/series pump configurations
- Rotordynamic analysis
- Vendor-level engineering (this tool is for **pre-vendor selection only**)

---

## ⚙️ Engineering Basis

All calculations are traceable to **API 610 Twelfth Edition (January 2021)**.

### Key Formulas

| Parameter | Formula | Reference |
|-----------|---------|-----------|
| Total Head | `H = (Pd − Ps) × 10.197 / SG` | Fluid mechanics |
| Specific Speed (Ns) | `Ns = N × √Q / H_stage^0.75` (SI: Q in m³/s, H in m) | API 610 Annex A, Eq. A.1 |
| Suction Specific Speed (Nss) | `Nss = N × √Q_eye / NPSHr^0.75` | API 610 Annex A, Eq. A.2 |
| Tip Speed | `u = √(2 × g × H_stage × ψ)` — ψ = f(Ns) | Pump engineering |
| Hydraulic Power | `P_hyd = Q × H × SG / 367` (kW, m³/hr, m) | Fluid mechanics |

### Double-Suction Correction
For double-suction impellers, `Q_eye = Q / 2` is applied to **both** Ns and Nss per API 610 Annex A.

---

## 🔧 Engineering Fixes in v2

The following corrections were applied over the initial version, with full API 610 traceability:

| Fix | Description | API 610 Basis |
|-----|-------------|---------------|
| **FIX-1** | Nss now uses **NPSHr** (NPSH3 from vendor), not NPSHa | Annex A, Eq. A.2 |
| **FIX-2** | NPSH Margin check added: `NPSHa − NPSHr` with visual status bar | Cl. 6.1.10, Note 3 |
| **FIX-3** | Head coefficient ψ computed as a function of Ns (not hardcoded 0.55) | Pump engineering |
| **FIX-4** | Double-suction: `Q_eye = Q/2` applied to both Ns and Nss | Annex A |
| **FIX-5** | Viscosity correction uses a single unified water-equivalent baseline | HI 9.6.7 |
| **FIX-6** | Efficiency interpolation boundary-clamped (no extrapolation beyond chart range) | — |
| **FIX-7** | BB1 restored as O&G candidate (no API 610 Table 3 basis for exclusion) | Table 3 |
| **FIX-8** | High-temperature radially-split casing warning for T ≥ 200°C on axially-split types | Cl. 6.3.11 |
| **FIX-9** | Solids content now influences selection warnings and pump type guidance | — |

---

## 📋 Features

### Data Entry
- 28 process input fields with auto-calculation of head and differential pressure
- Fluid database with 35+ common petroleum/process fluids (auto-fills density, viscosity, corrosivity)
- Fluid name autocomplete search

### Selection Engine
- Evaluates all 8 API 610 pump types simultaneously
- Stage analysis loop (1–16 stages depending on type)
- Single-suction (SS), Double-suction (DS), and DS-first-stage configurations
- Configurable engineering thresholds (Nss limit, Ns minimum, tip speed, NPSH margin)

### Results
- Primary pump type recommendation with status (PASS / WARN / FAIL)
- Full validation log accordion for all pump types
- NPSH margin visual indicator bar
- Engineering warning banners (Nss proxy, high temperature, viscosity, solids)
- VS6 technical considerations checklist
- Similar cases from reference library (±25% Q and H matching)

### Export & Documentation
- **📄 PDF Export** — A4 Landscape, professional single-page engineering report
- **📥 Excel Import** — Batch import pump datasheets
- **📤 Excel Export** — Full history export
- **💾 Project Save/Load** — `.pump_project` JSON files

### History & Reference Library
- Category-based history management
- Batch calculation for multiple items
- Reference library with 14 default industrial cases + user additions
- Add history items directly to reference library

---

## 🖥️ How to Use

### Option 1 — GitHub Pages (recommended)
Simply open: **https://ahmadr59-ops.github.io/PUMP-Selection-Guide/**

### Option 2 — Local
1. Download `index.html`
2. Open it in any modern browser (Chrome, Edge, Firefox)
3. No internet connection required after first load (CDN assets cached)

### Basic Workflow
1. **Data Entry tab** → Enter fluid properties and process conditions
2. Click **⚙ Suggest Pump Type (API 610)**
3. **Result tab** → Review primary recommendation and warnings
4. **All Options tab** → Compare all viable configurations
5. **H-Q Chart tab** → View performance curve
6. Click **📄 Export PDF** → Download A4 landscape engineering report

---

## 📐 Pump Type Coverage

| Type | Description | Max P (bar) | Max T (°C) | Flow Range (m³/hr) |
|------|-------------|-------------|------------|---------------------|
| OH1 | Overhung, foot-mounted | 20 | 150 | 0–200 |
| OH2 | Overhung, centerline-mounted | 50 | 350 | 0–450 |
| BB1 | Between-bearings, axially split, 1–2 stage | 75 | 200 | 0–1135 |
| BB2 | Between-bearings, radially split, 1–2 stage | 100 | 400 | 0–1135 |
| BB3 | Between-bearings, axially split, multistage | 100 | 200 | 45–3400 |
| BB4 | Between-bearings, ring-section, multistage | 150 | 400 | 45–3400 |
| BB5 | Between-bearings, barrel (double-casing) | 250 | 450 | 45–10000 |
| VS6 | Vertically suspended, double-casing can | 50 | 150 | 0–10000 |

---

## ⚠️ Disclaimer

This tool is intended for **preliminary estimation only** during the pre-vendor engineering phase. Results do not constitute vendor engineering or replace:

- Vendor hydraulic guarantees
- Full compliance verification per API 610
- Rotordynamic analysis (Annex I)
- Mechanical seal system design (API 682)
- Detailed nozzle load analysis (Table 5 / Annex F)

All selections must be confirmed by a qualified rotating equipment engineer and subsequently by the equipment vendor.

---

## 📖 Reference

**API Standard 610, Twelfth Edition, January 2021**  
*Centrifugal Pumps for Petroleum, Petrochemical, and Natural Gas Industries*  
American Petroleum Institute, Washington, DC

Key clauses referenced: Annex A (Ns, Nss), Cl. 6.1.9–6.1.11 (NPSH), Cl. 6.3.11 (casing split), Table 3 (type limitations), Table 10 (bearing selection), Table 18 (lateral analysis)

---

## 🛠️ Technology Stack

| Library | Version | Purpose |
|---------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | CDN | Styling |
| [Chart.js](https://www.chartjs.org/) | 4.x | H-Q and selection charts |
| [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/) | 2.2.1 | POR annotations on charts |
| [SheetJS (xlsx)](https://sheetjs.com/) | 0.18.5 | Excel import/export |
| [jsPDF](https://github.com/parallax/jsPDF) | 2.5.1 | PDF generation |
| [html2canvas](https://html2canvas.hertzen.com/) | 1.4.1 | PDF rendering |
| [Google Fonts](https://fonts.google.com/) | — | Poppins, Roboto, Lora |

All loaded via CDN. No build step. No Node.js. No frameworks.

---

## 👤 Author

**Ahmad Rezazadeh**  
Senior Rotating Equipment Engineer  
Specialisation: API 610 Centrifugal Pumps, EPC Engineering, Vendor Evaluation

---

## 📄 License

MIT License — free to use, modify, and distribute with attribution.

---

<p align="center">
  <sub>Built with API 610 12th Edition (January 2021) as the sole normative source.</sub>
</p>
