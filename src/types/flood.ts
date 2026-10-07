export type FloodSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export type DataSourceType = 'DEMO' | 'NISAR_REAL' | 'SUPPLEMENTARY_SAT';

export interface FloodEvent {
  id: string;
  name: string;
  location: string;
  country: string;
  regionId: string;
  latitude: number;
  longitude: number;
  zoomLevel: number;
  beforeDate: string;
  observationDate: string;
  afterDate: string;
  affectedAreaKm2: number;
  totalRegionAreaKm2: number;
  affectedPercentage: number;
  severity: FloodSeverity;
  confidence: string;
  dataSource: DataSourceType;
  dataSourceLabel: string;
  isDemo: boolean;
  description: string;
  sarFrequency: string; // e.g., "L-band (1.25 GHz / 24 cm wavelength)"
  polarization: string; // e.g., "VV + VH dual-pol"
  orbitDirection: 'Ascending' | 'Descending';
  spatialResolution: string; // e.g., "6m x 6m"
  backscatterDropDb: number; // average drop in dB (e.g., -8.4 dB)
  timeline: {
    date: string;
    areaKm2: number;
    rainfallMm?: number;
    riverLevelM?: number;
  }[];
  affectedFeatures: {
    settlementsEstimate: number;
    agriculturalLandHa: number;
    roadsAffectedKm: number;
    criticalFacilities: string[];
  };
  geojson: GeoJSON.FeatureCollection;
}

export interface Region {
  id: string;
  name: string;
  country: string;
  continent: string;
  center: [number, number];
  zoom: number;
  eventIds: string[];
}

export interface DataStatus {
  isDemoMode: boolean;
  activeProvider: string;
  nisarApiConnected: boolean;
  lastUpdated: string;
  systemMessage: string;
}

export interface ChangeDetectionResult {
  beforeTimestamp: string;
  afterTimestamp: string;
  thresholdDb: number;
  detectedWaterAreaKm2: number;
  preExistingWaterKm2: number;
  newInundatedAreaKm2: number;
  severity: FloodSeverity;
  confidenceScore: number;
  binaryMaskUrl?: string;
  heatmapGrid?: number[][];
}
