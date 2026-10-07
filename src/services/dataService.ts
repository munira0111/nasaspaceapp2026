import { DataProvider } from './DataProvider';
import { demoDataProvider } from './DemoDataProvider';
import { nisarDataProvider } from './NISARDataProvider';

let currentMode: 'DEMO' | 'NISAR' = 'DEMO';

export function getActiveDataProvider(): DataProvider {
  return currentMode === 'NISAR' ? nisarDataProvider : demoDataProvider;
}

export function setDataProviderMode(mode: 'DEMO' | 'NISAR') {
  currentMode = mode;
}

export function getDataProviderMode(): 'DEMO' | 'NISAR' {
  return currentMode;
}
