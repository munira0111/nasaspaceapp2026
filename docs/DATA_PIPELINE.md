# NISAR FloodWatch Scientific Data Processing Pipeline

## 1. Overview

**NISAR FloodWatch** relies on Synthetic Aperture Radar (SAR) backscatter analysis to detect surface water extent variations before, during, and after flood events. This document details the mathematical and remote sensing pipeline implemented in the application.

---

## 2. End-to-End Pipeline Workflow

```
Satellite (NISAR L-band / C-band)
   │
   ▼
[1] Ground Range Detected (GRD) Acquisition
   │
   ▼
[2] Radiometric Calibration & Speckle Filtering (Lee / Frost Filter)
   │
   ▼
[3] Baseline (Pre-Event) vs Co-Event Alignment
   │
   ▼
[4] Decibel Ratioing / Backscatter Difference ($\Delta \sigma^0$)
   │
   ▼
[5] Binarization Thresholding & Flood Mask Extraction
   │
   ▼
[6] GeoJSON Vectorization & Spatial Area Metric Calculation
   │
   ▼
Interactive Web Map & AI Inundation Explainer
```

---

## 3. Scientific Concepts

### 3.1 Specular Reflection vs Rough Terrain Scattering
- **Dry Ground / Vegetation**: Scatters incoming microwave pulses in multiple directions (high backscatter return, e.g., $-2\text{ dB}$ to $-6\text{ dB}$).
- **Smooth Surface Water**: Acts as a specular mirror, bouncing radar pulses away from the satellite antenna array (low backscatter return, e.g., $-14\text{ dB}$ to $-22\text{ dB}$).

### 3.2 Backscatter Decibel Ratioing
The backscatter change ($\Delta \sigma^0$) in decibels is calculated as:

$$\Delta \sigma^0_{\text{dB}} = 10 \cdot \log_{10} \left( \frac{\sigma^0_{\text{co-event}}}{\sigma^0_{\text{baseline}}} \right)$$

When $\Delta \sigma^0 < \tau_{\text{threshold}}$ (typically $-8.5\text{ dB}$), pixels are classified as newly inundated surface water.

---

## 4. Operational vs Demo Data Provider Architecture

The frontend relies on the `DataProvider` abstraction:

```typescript
export interface DataProvider {
  getFloodEvents(): Promise<FloodEvent[]>;
  getEventById(id: string): Promise<FloodEvent | null>;
  getRegions(): Promise<Region[]>;
  getTimeline(eventId: string): Promise<TimelinePoint[]>;
  runChangeDetection(eventId: string): Promise<ChangeDetectionResult>;
  getDataStatus(): DataStatus;
}
```

- **`DemoDataProvider`**: Serves synthetic GeoJSON inundation masks calibrated to real river channel geometries in Bangladesh (Sylhet, Sunamganj, Kurigram, Dhaka), India (Assam), Nepal, Vietnam (Mekong), Spain (Valencia), and USA (Mississippi).
- **`NISARDataProvider`**: Queries NASA Earthdata CMR & ASF DAAC endpoints for live NISAR granules when configured with API keys.

---

## 5. Authoritative Data Source Endpoints

- **NASA NISAR Mission Portal**: https://nisar.jpl.nasa.gov/
- **Alaska Satellite Facility (ASF DAAC)**: https://asf.alaska.edu/
- **ISRO VEDA Space Data Portal**: https://veda.space.gov.in/
- **NASA Common Metadata Repository (CMR)**: https://cmr.earthdata.nasa.gov/
