# Pump Selection Guide — API 610

<p align="center">
  <img src="https://img.shields.io/badge/Standard-API%20610%2012th%20Ed%20(2021)-1e3a8a?style=for-the-badge" alt="API 610">
  <img src="https://img.shields.io/badge/Version-3.0-059669?style=for-the-badge" alt="Version">
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
- NPSH analysis, margin checking, and estimated NPSHr (Stepanoff correlation)
- Viscosity correction (HI 9.6.7 B-factor method)
- Preliminary efficiency and power estimation
- Motor rated power (IEC standard sizes, API 610 Table 4 service factors)
- Estimated nozzle velocity check (API 610 Table 4)
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
| Tip Speed | `u = √(2 × g × H_stage × ψ)` — ψ interpolated from Ns | Pump engineering |
| Hydraulic Power | `P_hyd = Q × H × SG / 367` (kW, m³/hr, m) | Fluid mechanics |
| NPSHr (estimated) | `σ = 6.0×10⁻⁶ × Ns^(4/3)` → `NPSHr = σ × H_stage` | Stepanoff correlation |
| Nozzle Velocity | `V = Q / (π/4 × D²)` — D from empirical Q-based estimate | API 610 Table 4 |

### Double-Suction Correction
For double-suction impellers, `Q_eye = Q / 2` is applied to **both** Ns and Nss per API 610 Annex A.

---

## 🔧 Changes in v3

### Engineering Improvements

| Item | Description | Basis |
|------|-------------|-------|
| **v3-1** | Viscosity correction: full HI 9.6.7 **B-factor method** using kinematic viscosity (cSt) | HI 9.6.7 (2010) |
| **v3-2** | Viscosity correction threshold lowered from >10 cP to **≥4 cP** | Industry practice |
| **v3-3** | Head coefficient ψ: **smooth interpolation** from Ns curve (replaces step-function) | Gülich / HI |
| **v3-4** | **Motor rated power**: IEC standard sizes + API 610 Table 4 service factors (1.10–1.25×) | API 610 Table 4 |
| **v3-5** | NPSH margin thresholds: API 610-based (absolute + percentage of NPSHr) | API 610 Cl. 6.1.10 |
| **v3-6** | Pump type data corrected: BB5 maxP=350 bar, VS6 maxT=200°C, BB3/BB5 headMin revised | API 610 Table 3 |
| **v3-7** | `maxViscosityCp` and `preferredFlowRange` / `preferredHeadRange` added to all pump types | Ranking Engine |
| **v3-8** | **Estimated NPSHr** (Stepanoff correlation, ±30–40%) — no vendor data required | Stepanoff |
| **v3-9** | **Nozzle velocity check** (API 610 Table 4) — size estimated from Q, no vendor data required | API 610 Table 4 |

### Architecture Improvements (from ChatGPT Rule/Ranking Engine)

| Item | Description |
|------|-------------|
| **v3-10** | **Rule Engine**: modular hard-constraint filter (Pressure, Temperature, Viscosity, Flow, O&G exclusion) |
| **v3-11** | **Ranking Engine**: weighted hydraulic suitability score — Flow 30% \| Head 35% \| NPSH 20% \| Viscosity 15% |
| **v3-12** | Final selection combines Ns/Nss/Tip Speed pass + Ranking score (replaces fixed priority order) |
| **v3-13** | Score breakdown (F/H/N/V) displayed in result banner and All Options comparison table |

### UI Improvements

| Item | Description |
|------|-------------|
| **v3-14** | Header: gradient background, version badge |
| **v3-15** | Result banner: Rank Score /100 + score breakdown inline |
| **v3-16** | Warning banners for NPSHr estimate and nozzle velocity with color-coded status |
| **v3-17** | Result cards with hover effect and section icons |

---

## 📋 Features

### Data Entry
- 28 process input fields with auto-calculation of head and differential pressure
- Fluid database with 35+ common petroleum/process fluids (auto-fills density, viscosity, corrosivity)
- Fluid name autocomplete search

### Selection Engine
- **Rule Engine**: modular hard-constraint filter for all 8 API 610 pump types
- **Ranking Engine**: weighted score (Flow + Head + NPSH + Viscosity) from preferred operating ranges
- Stage analysis loop (1–16 stages depending on type)
- Single-suction (SS), Double-suction (DS), and DS-first-stage configurations
- Configurable engineering thresholds (Nss limit, Ns minimum, tip speed, NPSH margin)

### Results
- Primary pump type recommendation with status (PASS / WARN / FAIL)
- **Rank Score /100** with breakdown (Flow / Head / NPSH / Viscosity)
- **Estimated NPSHr** (Stepanoff) with NPSH margin estimate — no vendor data needed
- **Nozzle velocity check** (API 610 Table 4) with estimated pipe sizes
- **Motor rated power** (IEC standard size, API 610 Table 4 service factor)
- Full validation log accordion for all pump types
- NPSH margin visual indicator bar
- Engineering warning banners
- VS6 technical considerations checklist
- Similar cases from reference library (±25% Q and H matching)

### Export & Documentation
- **📄 PDF Export** — A4 Landscape, professional single-page engineering report (includes motor power + nozzle check)
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
3. **Result tab** → Review primary recommendation, rank score, NPSHr estimate, nozzle velocities
4. **All Options tab** → Compare all viable configurations with ranking scores
5. **H-Q Chart tab** → View performance curve
6. Click **📄 Export PDF** → Download A4 landscape engineering report

---

## 📐 Pump Type Coverage

| Type | Description | Max P (bar) | Max T (°C) | Max Viscosity (cP) | Flow Range (m³/hr) |
|------|-------------|-------------|------------|--------------------|--------------------|
| OH1 | Overhung, foot-mounted | 20 | 150 | 200 | 0–200 |
| OH2 | Overhung, centerline-mounted | 50 | 350 | 300 | 0–450 |
| BB1 | Between-bearings, axially split, 1–2 stage | 75 | 200 | 500 | 0–1135 |
| BB2 | Between-bearings, radially split, 1–2 stage | 100 | 400 | 500 | 0–1135 |
| BB3 | Between-bearings, axially split, multistage | 100 | 200 | 300 | 45–3400 |
| BB4 | Between-bearings, ring-section, multistage | 150 | 400 | 300 | 45–3400 |
| BB5 | Between-bearings, barrel (double-casing) | **350** | 450 | 400 | 20–10000 |
| VS6 | Vertically suspended, double-casing can | 65 | **200** | 200 | 0–10000 |

> Values in **bold** corrected in v3 from v2.

---

## ⚠️ Disclaimer

This tool is intended for **preliminary estimation only** during the pre-vendor engineering phase. Results do not constitute vendor engineering or replace:

- Vendor hydraulic guarantees and NPSH3 curves
- Full compliance verification per API 610
- Rotordynamic analysis (Annex I)
- Mechanical seal system design (API 682)
- Detailed nozzle load analysis (Table 5 / Annex F)

NPSHr estimates (Stepanoff ±30–40%) and nozzle size estimates (±1 pipe size) must be confirmed with vendor datasheets.

All selections must be confirmed by a qualified rotating equipment engineer and subsequently by the equipment vendor.

---

## 📖 Reference

**API Standard 610, Twelfth Edition, January 2021**  
*Centrifugal Pumps for Petroleum, Petrochemical, and Natural Gas Industries*  
American Petroleum Institute, Washington, DC

**Hydraulic Institute Standard 9.6.7 (2010)**  
*Effects of Liquid Viscosity on Rotodynamic (Centrifugal and Vertical) Pump Performance*

**Stepanoff, A.J. (1957)**  
*Centrifugal and Axial Flow Pumps* — Thoma cavitation coefficient (σ) correlation

Key API 610 clauses referenced: Annex A (Ns, Nss), Cl. 6.1.9–6.1.11 (NPSH), Cl. 6.3.11 (casing split), Table 3 (type limitations), Table 4 (motor sizing / nozzle velocity), Table 10 (bearing selection)

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
  <sub>Built with API 610 12th Edition (January 2021) as the primary normative source.</sub>
</p>
