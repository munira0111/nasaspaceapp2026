import { DataProvider } from './DataProvider';
import { FloodEvent, Region, DataStatus, ChangeDetectionResult } from '../types/flood';
import { DEMO_FLOOD_EVENTS } from '../data/demoEvents';
import { DEMO_REGIONS } from '../data/demoRegions';

export class DemoDataProvider implements DataProvider {
  private events: FloodEvent[] = DEMO_FLOOD_EVENTS;
  private regions: Region[] = DEMO_REGIONS;

  async getFloodEvents(): Promise<FloodEvent[]> {
    // Simulate slight network delay for realism
    await new Promise(res => setTimeout(res, 150));
    return this.events;
  }

  async getEventById(id: string): Promise<FloodEvent | null> {
    await new Promise(res => setTimeout(res, 100));
    return this.events.find(e => e.id === id) || null;
  }

  async getRegions(): Promise<Region[]> {
    await new Promise(res => setTimeout(res, 100));
    return this.regions;
  }

  async getTimeline(eventId: string): Promise<{ date: string; areaKm2: number; rainfallMm?: number; riverLevelM?: number }[]> {
    const event = await this.getEventById(eventId);
    return event ? event.timeline : [];
  }

  async runChangeDetection(eventId: string): Promise<ChangeDetectionResult> {
    const event = await this.getEventById(eventId);
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found.`);
    }

    // Simulated synthetic change detection execution
    const totalArea = event.affectedAreaKm2;
    const preExistingWater = Number((totalArea * 0.18).toFixed(1));
    const newInundatedArea = Number((totalArea * 0.82).toFixed(1));

    return {
      beforeTimestamp: event.beforeDate,
      afterTimestamp: event.observationDate,
      thresholdDb: -8.5,
      detectedWaterAreaKm2: totalArea,
      preExistingWaterKm2: preExistingWater,
      newInundatedAreaKm2: newInundatedArea,
      severity: event.severity,
      confidenceScore: 0.92
    };
  }

  getDataStatus(): DataStatus {
    return {
      isDemoMode: true,
      activeProvider: 'DemoDataProvider (Synthetic SAR Simulation)',
      nisarApiConnected: false,
      lastUpdated: new Date().toISOString(),
      systemMessage: 'Demo visualization — sample data. Not an actual NISAR observation.'
    };
  }
}

export const demoDataProvider = new DemoDataProvider();
