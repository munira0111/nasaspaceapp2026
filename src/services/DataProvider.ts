import { FloodEvent, Region, DataStatus, ChangeDetectionResult } from '../types/flood';

export interface DataProvider {
  getFloodEvents(): Promise<FloodEvent[]>;
  getEventById(id: string): Promise<FloodEvent | null>;
  getRegions(): Promise<Region[]>;
  getTimeline(eventId: string): Promise<{ date: string; areaKm2: number; rainfallMm?: number; riverLevelM?: number }[]>;
  runChangeDetection(eventId: string): Promise<ChangeDetectionResult>;
  getDataStatus(): DataStatus;
}
