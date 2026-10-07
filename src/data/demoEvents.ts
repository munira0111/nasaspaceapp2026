import { FloodEvent } from '../types/flood';

export const DEMO_FLOOD_EVENTS: FloodEvent[] = [
  {
    id: 'bd-sylhet-2026',
    name: 'Sylhet Flash Flood & Haor Inundation',
    location: 'Sylhet & Sunamganj Basin',
    country: 'Bangladesh',
    regionId: 'south-asia-bd-sylhet',
    latitude: 24.8949,
    longitude: 91.8687,
    zoomLevel: 10,
    beforeDate: '2026-05-12',
    observationDate: '2026-06-18',
    afterDate: '2026-06-25',
    affectedAreaKm2: 342.5,
    totalRegionAreaKm2: 2500,
    affectedPercentage: 13.7,
    severity: 'MODERATE',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'Catastrophic monsoonal flash flooding flooded low-lying Haor wetland basins across Sylhet and Sunamganj. Torrential upstream mountain runoff from Meghalaya triggered swift water accumulation in the Surma-Kushiyara river network.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol backscatter',
    orbitDirection: 'Ascending',
    spatialResolution: '6m x 6m (NISAR Stripmap mode)',
    backscatterDropDb: -9.2,
    timeline: [
      { date: 'Jan 2026', areaKm2: 22 },
      { date: 'Feb 2026', areaKm2: 25 },
      { date: 'Mar 2026', areaKm2: 41 },
      { date: 'Apr 2026', areaKm2: 88 },
      { date: 'May 2026', areaKm2: 185 },
      { date: 'Jun 2026', areaKm2: 342.5 },
      { date: 'Jul 2026', areaKm2: 210 },
      { date: 'Aug 2026', areaKm2: 95 }
    ],
    affectedFeatures: {
      settlementsEstimate: 42000,
      agriculturalLandHa: 18500,
      roadsAffectedKm: 145,
      criticalFacilities: ['Sylhet MAG Osmani Medical College Access', 'Sunamganj Sadar Power Substation', 'Sylhet Railway Junction Corridor']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Primary Inundation Zone (Haor Basin)',
            severity: 'HIGH',
            backscatterChangeDb: -11.4,
            waterDepthEstimateM: 2.8
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [91.75, 24.95],
              [91.95, 24.98],
              [92.05, 24.88],
              [91.98, 24.75],
              [91.80, 24.72],
              [91.68, 24.82],
              [91.75, 24.95]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: {
            name: 'Secondary River Corridor Inundation',
            severity: 'MODERATE',
            backscatterChangeDb: -7.6,
            waterDepthEstimateM: 1.4
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [91.50, 25.02],
              [91.72, 25.05],
              [91.78, 24.94],
              [91.55, 24.90],
              [91.50, 25.02]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: {
            name: 'Lowland Agricultural Spillover',
            severity: 'LOW',
            backscatterChangeDb: -4.8,
            waterDepthEstimateM: 0.6
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [91.85, 24.70],
              [92.12, 24.78],
              [92.10, 24.65],
              [91.88, 24.62],
              [91.85, 24.70]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'bd-kurigram-2026',
    name: 'Kurigram Jamuna River Overflow',
    location: 'Kurigram District & Chars',
    country: 'Bangladesh',
    regionId: 'south-asia-bd-kurigram',
    latitude: 25.8072,
    longitude: 89.6295,
    zoomLevel: 10,
    beforeDate: '2026-06-01',
    observationDate: '2026-07-04',
    afterDate: '2026-07-15',
    affectedAreaKm2: 485.0,
    totalRegionAreaKm2: 2240,
    affectedPercentage: 21.65,
    severity: 'HIGH',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'High discharge along the Brahmaputra-Jamuna river system caused severe embankment breaches in Kurigram, inundating river islands (chars) and agricultural floodplain communities.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Descending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -10.5,
    timeline: [
      { date: 'Jan 2026', areaKm2: 45 },
      { date: 'Feb 2026', areaKm2: 48 },
      { date: 'Mar 2026', areaKm2: 52 },
      { date: 'Apr 2026', areaKm2: 90 },
      { date: 'May 2026', areaKm2: 210 },
      { date: 'Jun 2026', areaKm2: 380 },
      { date: 'Jul 2026', areaKm2: 485 },
      { date: 'Aug 2026', areaKm2: 310 }
    ],
    affectedFeatures: {
      settlementsEstimate: 68000,
      agriculturalLandHa: 31000,
      roadsAffectedKm: 210,
      criticalFacilities: ['Kurigram Sadar Embankment Sluice Gate', 'Chilmari River Port Terminal', 'Nageswari Relief Hub']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Jamuna Channel Floodplain Inundation',
            severity: 'SEVERE',
            backscatterChangeDb: -12.1,
            waterDepthEstimateM: 3.2
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [89.50, 25.90],
              [89.75, 25.85],
              [89.80, 25.65],
              [89.60, 25.60],
              [89.45, 25.75],
              [89.50, 25.90]
            ]]
          }
        },
        {
          type: 'Feature',
          properties: {
            name: 'Chilmari Char Inundation',
            severity: 'HIGH',
            backscatterChangeDb: -9.4,
            waterDepthEstimateM: 2.1
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [89.65, 25.60],
              [89.85, 25.55],
              [89.82, 25.42],
              [89.62, 25.48],
              [89.65, 25.60]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'bd-dhaka-2026',
    name: 'Dhaka Peri-Urban Inundation Risk Zone',
    location: 'Eastern Dhaka Wetlands (Balu River Basin)',
    country: 'Bangladesh',
    regionId: 'south-asia-bd-dhaka',
    latitude: 23.8103,
    longitude: 90.4125,
    zoomLevel: 11,
    beforeDate: '2026-05-15',
    observationDate: '2026-06-28',
    afterDate: '2026-07-10',
    affectedAreaKm2: 112.4,
    totalRegionAreaKm2: 1460,
    affectedPercentage: 7.7,
    severity: 'MODERATE',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'Heavy urban monsoon precipitation coupled with high river levels along Balu and Shitalakhya rivers overwhelmed drainage canals in Demra, Khilgaon, and Purbachal lowlands.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Ascending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -7.1,
    timeline: [
      { date: 'Jan 2026', areaKm2: 15 },
      { date: 'Feb 2026', areaKm2: 16 },
      { date: 'Mar 2026', areaKm2: 20 },
      { date: 'Apr 2026', areaKm2: 35 },
      { date: 'May 2026', areaKm2: 65 },
      { date: 'Jun 2026', areaKm2: 112.4 },
      { date: 'Jul 2026', areaKm2: 84 },
      { date: 'Aug 2026', areaKm2: 40 }
    ],
    affectedFeatures: {
      settlementsEstimate: 95000,
      agriculturalLandHa: 4200,
      roadsAffectedKm: 88,
      criticalFacilities: ['Purbachal Expressway Underpass', 'Demra Water Treatment Intake', 'Balu River Flood Retention Basin']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Eastern Dhaka Retention Zone Inundation',
            severity: 'MODERATE',
            backscatterChangeDb: -8.0,
            waterDepthEstimateM: 1.2
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [90.43, 23.86],
              [90.52, 23.88],
              [90.54, 23.76],
              [90.45, 23.74],
              [90.43, 23.86]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'in-assam-2026',
    name: 'Assam Valley Brahmaputra Surge',
    location: 'Guwahati & Kaziranga Floodplain',
    country: 'India',
    regionId: 'south-asia-in-assam',
    latitude: 26.1445,
    longitude: 91.7362,
    zoomLevel: 10,
    beforeDate: '2026-05-10',
    observationDate: '2026-06-20',
    afterDate: '2026-07-02',
    affectedAreaKm2: 780.0,
    totalRegionAreaKm2: 3200,
    affectedPercentage: 24.37,
    severity: 'HIGH',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'Widespread monsoonal deluge swelled the Brahmaputra River and its tributaries, inundating 70% of Kaziranga National Park and displacing riparian rural communities in Assam.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Ascending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -11.2,
    timeline: [
      { date: 'Jan 2026', areaKm2: 80 },
      { date: 'Feb 2026', areaKm2: 85 },
      { date: 'Mar 2026', areaKm2: 110 },
      { date: 'Apr 2026', areaKm2: 240 },
      { date: 'May 2026', areaKm2: 450 },
      { date: 'Jun 2026', areaKm2: 780 },
      { date: 'Jul 2026', areaKm2: 620 },
      { date: 'Aug 2026', areaKm2: 340 }
    ],
    affectedFeatures: {
      settlementsEstimate: 110000,
      agriculturalLandHa: 48000,
      roadsAffectedKm: 310,
      criticalFacilities: ['Kaziranga Wildlife Refuge Corridor', 'Guwahati Water Supply Intake', 'Morigaon Highway Bridge']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Kaziranga Riparian Overflow Zone',
            severity: 'SEVERE',
            backscatterChangeDb: -13.0,
            waterDepthEstimateM: 3.5
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [91.55, 26.25],
              [92.00, 26.30],
              [92.15, 26.10],
              [91.70, 26.02],
              [91.55, 26.25]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'np-terai-2026',
    name: 'Koshi River Basin Inundation',
    location: 'Saptari & Sunsari Terai Belt',
    country: 'Nepal',
    regionId: 'south-asia-np-terai',
    latitude: 26.6528,
    longitude: 87.1627,
    zoomLevel: 10,
    beforeDate: '2026-06-10',
    observationDate: '2026-07-12',
    afterDate: '2026-07-22',
    affectedAreaKm2: 215.8,
    totalRegionAreaKm2: 1800,
    affectedPercentage: 11.98,
    severity: 'MODERATE',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'Heavy precipitation in the Himalayan foothills led to extreme Koshi Barrage discharge, spilling over lowland embankments into agricultural farmlands in southern Nepal.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Descending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -8.7,
    timeline: [
      { date: 'Jan 2026', areaKm2: 20 },
      { date: 'Feb 2026', areaKm2: 22 },
      { date: 'Mar 2026', areaKm2: 28 },
      { date: 'Apr 2026', areaKm2: 50 },
      { date: 'May 2026', areaKm2: 95 },
      { date: 'Jun 2026', areaKm2: 160 },
      { date: 'Jul 2026', areaKm2: 215.8 },
      { date: 'Aug 2026', areaKm2: 130 }
    ],
    affectedFeatures: {
      settlementsEstimate: 31000,
      agriculturalLandHa: 14200,
      roadsAffectedKm: 92,
      criticalFacilities: ['Koshi Barrage Control Sluice', 'Inaruwa Highway Junction', 'Biratnagar Airport Overflow Zone']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Koshi Embankment Spillover',
            severity: 'HIGH',
            backscatterChangeDb: -10.1,
            waterDepthEstimateM: 2.2
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [87.05, 26.75],
              [87.25, 26.72],
              [87.28, 26.55],
              [87.10, 26.52],
              [87.05, 26.75]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'es-valencia-2026',
    name: 'Valencia Turia Flash Flood (DANA Event)',
    location: 'L\'Horta Sud & Turia River Plain, Valencia',
    country: 'Spain',
    regionId: 'europe-es-valencia',
    latitude: 39.4699,
    longitude: -0.3763,
    zoomLevel: 11,
    beforeDate: '2026-09-20',
    observationDate: '2026-10-02',
    afterDate: '2026-10-12',
    affectedAreaKm2: 185.4,
    totalRegionAreaKm2: 580,
    affectedPercentage: 31.96,
    severity: 'SEVERE',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'An isolated high-altitude atmospheric depression (DANA) unleashed historic cloudburst rains over the Valencia province, causing sudden lethal flash flooding through Panya and suburban channels.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Ascending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -12.8,
    timeline: [
      { date: 'Jun 2026', areaKm2: 8 },
      { date: 'Jul 2026', areaKm2: 6 },
      { date: 'Aug 2026', areaKm2: 5 },
      { date: 'Sep 2026', areaKm2: 12 },
      { date: 'Oct 2026', areaKm2: 185.4 },
      { date: 'Nov 2026', areaKm2: 32 }
    ],
    affectedFeatures: {
      settlementsEstimate: 145000,
      agriculturalLandHa: 8900,
      roadsAffectedKm: 280,
      criticalFacilities: ['V-30 Highway Bypass Tunnel', 'Picaña Logistics Center', 'Silla Rail Corridor']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Turia Overflow & Suburban Channel Inundation',
            severity: 'SEVERE',
            backscatterChangeDb: -14.2,
            waterDepthEstimateM: 2.6
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-0.45, 39.52],
              [-0.32, 39.50],
              [-0.30, 39.38],
              [-0.42, 39.40],
              [-0.45, 39.52]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'vn-mekong-2026',
    name: 'Mekong Delta High Tide & Monsoon Inundation',
    location: 'Can Tho & An Giang Basin',
    country: 'Vietnam',
    regionId: 'se-asia-vn-mekong',
    latitude: 10.0452,
    longitude: 105.7469,
    zoomLevel: 9,
    beforeDate: '2026-08-15',
    observationDate: '2026-09-24',
    afterDate: '2026-10-05',
    affectedAreaKm2: 920.0,
    totalRegionAreaKm2: 3800,
    affectedPercentage: 24.21,
    severity: 'HIGH',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'Combined monsoonal river discharge from upstream Mekong and seasonal extreme coastal high tides submerged low-elevation rice paddies and aquaculture zones.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Ascending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -10.8,
    timeline: [
      { date: 'May 2026', areaKm2: 140 },
      { date: 'Jun 2026', areaKm2: 210 },
      { date: 'Jul 2026', areaKm2: 430 },
      { date: 'Aug 2026', areaKm2: 680 },
      { date: 'Sep 2026', areaKm2: 920 },
      { date: 'Oct 2026', areaKm2: 740 }
    ],
    affectedFeatures: {
      settlementsEstimate: 82000,
      agriculturalLandHa: 64000,
      roadsAffectedKm: 340,
      criticalFacilities: ['Can Tho River Dike System', 'Long Xuyen Grain Elevator Complex', 'Hau River Highway Terminal']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Mekong Transboundary Floodplain',
            severity: 'HIGH',
            backscatterChangeDb: -11.0,
            waterDepthEstimateM: 1.8
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [105.50, 10.20],
              [105.90, 10.15],
              [105.85, 9.90],
              [105.45, 9.95],
              [105.50, 10.20]
            ]]
          }
        }
      ]
    }
  },
  {
    id: 'us-mississippi-2026',
    name: 'Lower Mississippi River Flood Plain Overflow',
    location: 'Vicksburg & Warren County',
    country: 'United States',
    regionId: 'na-us-mississippi',
    latitude: 32.3547,
    longitude: -90.8784,
    zoomLevel: 9,
    beforeDate: '2026-03-10',
    observationDate: '2026-04-18',
    afterDate: '2026-04-28',
    affectedAreaKm2: 560.0,
    totalRegionAreaKm2: 3100,
    affectedPercentage: 18.06,
    severity: 'HIGH',
    confidence: 'Prototype estimate (Synthetic SAR simulation)',
    dataSource: 'DEMO',
    dataSourceLabel: 'Demo visualization — sample data. Not an actual NISAR observation.',
    isDemo: true,
    description: 'Spring snowmelt runoff combined with multi-state heavy rainfall led to high water stages along the Mississippi River, swamping un-leveed backwater basins in Mississippi and Louisiana.',
    sarFrequency: 'L-band (1.25 GHz / 24 cm wavelength)',
    polarization: 'VV + VH dual-pol',
    orbitDirection: 'Descending',
    spatialResolution: '6m x 6m',
    backscatterDropDb: -9.8,
    timeline: [
      { date: 'Jan 2026', areaKm2: 90 },
      { date: 'Feb 2026', areaKm2: 120 },
      { date: 'Mar 2026', areaKm2: 240 },
      { date: 'Apr 2026', areaKm2: 560 },
      { date: 'May 2026', areaKm2: 380 },
      { date: 'Jun 2026', areaKm2: 180 }
    ],
    affectedFeatures: {
      settlementsEstimate: 18000,
      agriculturalLandHa: 38000,
      roadsAffectedKm: 160,
      criticalFacilities: ['Vicksburg Levee Drainage Canal', 'US-61 Highway Floodway', 'Yazoo River Control Structure']
    },
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Yazoo Backwater Basin Inundation',
            severity: 'HIGH',
            backscatterChangeDb: -10.4,
            waterDepthEstimateM: 2.0
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-91.05, 32.55],
              [-90.75, 32.52],
              [-90.70, 32.20],
              [-91.00, 32.18],
              [-91.05, 32.55]
            ]]
          }
        }
      ]
    }
  }
];
