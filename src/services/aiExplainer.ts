import { FloodEvent } from '../types/flood';
import { calculateSeverity } from './changeDetection';

export interface ExplanationResult {
  summary: string;
  radarExplanation: string;
  impactExplanation: string;
  limitations: string;
}

export function generateEventExplanation(event: FloodEvent): ExplanationResult {
  const { severity, percentage } = calculateSeverity(event.affectedAreaKm2, event.totalRegionAreaKm2);

  const summary = `The synthetic radar analysis for ${event.location} (${event.country}) recorded during ${event.observationDate} indicates a detected surface water extent of ${event.affectedAreaKm2} km², covering approximately ${percentage}% of the analyzed region area. This extent corresponds to a ${severity} flood classification under the prototype thresholds.`;

  const radarExplanation = `Synthetic Aperture Radar (SAR) signals operating at ${event.sarFrequency} detected a significant microwave backscatter drop averaging ${event.backscatterDropDb} dB relative to the baseline observation on ${event.beforeDate}. Smooth open water acts as a specular reflector, bouncing radar pulses away from the satellite sensor and producing dark return signatures distinct from rough ground terrain.`;

  const impactExplanation = `The inundation boundary overlaps an estimated ${event.affectedFeatures.settlementsEstimate.toLocaleString()} residential settlements and ${event.affectedFeatures.agriculturalLandHa.toLocaleString()} hectares of lowland agricultural terrain. Approximately ${event.affectedFeatures.roadsAffectedKm} km of regional transport corridors lie within the detected inundation zone. Key infrastructure in proximity includes ${event.affectedFeatures.criticalFacilities.join(', ')}.`;

  const limitations = `Confidence note: This explanation is derived from automated change detection thresholds (${event.confidence}). Radar backscatter can be influenced by heavy vegetation canopy, surface wind roughening, and soil moisture variations. This prototype analysis is for educational and research purposes and is NOT an official disaster warning.`;

  return {
    summary,
    radarExplanation,
    impactExplanation,
    limitations
  };
}
