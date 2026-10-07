# NISAR FloodWatch 🛰🌊
> **"See how Earth's surface changes before, during, and after floods."**

NISAR FloodWatch is an interactive Earth observation and surface change monitoring platform built for the **NASA Space Apps Challenge**. The platform utilizes Synthetic Aperture Radar (SAR) remote sensing concepts—specifically derived from the joint NASA-ISRO Synthetic Aperture Radar (NISAR) satellite mission—to detect, visualize, compare, and explain flood-related surface water changes regardless of cloud cover or daylight conditions.

---

## 🚀 Key Features

- 🗺 **Interactive Map Studio**: Full-screen GIS mapping supporting Leaflet, GeoJSON flood inundation boundaries, dark NASA basemaps, Esri satellite imagery, layer controls, and custom markers.
- ↔ **Before / After Split Comparison Slider**: Horizontal curtain slider allowing users to compare pre-flood reference SAR passes against peak flood SAR observations.
- 📊 **Time-Series Extent Analytics**: Interactive Recharts time-series line charts tracking flooded area variations over time in square kilometers ($\text{km}^2$).
- 🔴 **Flood Severity Classifier**: Rule-based severity rating (Low, Moderate, High, Severe) with explicit disclaimers for prototype safety.
- 🤖 **"Explain This Event" AI Assistant**: Automated scientific explainer translating microwave decibel backscatter drops into plain human language.
- 📖 **Story Mode Playback**: Step-by-step animated scenario timeline tracking flood evolution from baseline dry conditions to peak inundation and recovery.
- 🛡 **Data Source Transparency**: Built-in `DataStatusBadge` clearly distinguishing between sample/demo visualizations and live NISAR satellite observations.
- 🔌 **Modular `DataProvider` Architecture**: Abstracted data layer enabling seamless replacement of demo data with operational NASA Earthdata / ASF DAAC NISAR endpoints.

---

## 🛠 Tech Stack

- **Frontend Core**: React 19 + TypeScript + Vite
- **Styling & UI**: Tailwind CSS v4 + Lucide Icons + Glassmorphism NASA Design System
- **Mapping & GIS**: Leaflet + MapLibre/Esri Satellite & CartoDB Tile Services
- **Data Visualization**: Recharts
- **Data Processing Specs**: GeoJSON + Synthetic Radar Decibel Backscatter Change Algorithms

---

## 📦 How to Run Locally

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Application**:
   Open `http://localhost:5173` in your browser.

---

## 🔬 Scientific & Research Disclaimer

NISAR FloodWatch is an educational and scientific research prototype developed for the NASA Space Apps Challenge. Flood extent boundaries, severity classifications, and affected area calculations displayed in demo scenarios are for UI demonstration and research prototyping. They should **NOT** be used as official disaster warnings or emergency management directives.

---

## 📜 Data Pipeline Documentation

For detailed information on radar backscatter physics, specular reflection, decibel ratioing, and real NISAR API integration endpoints, see [`docs/DATA_PIPELINE.md`](docs/DATA_PIPELINE.md).
