import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Maximize2, Minimize2, Layers, RefreshCw } from 'lucide-react';
import { FloodEvent } from '../../types/flood';
import { MapLegend } from './MapLegend';

interface Props {
  event: FloodEvent;
  observationMode: 'split' | 'before' | 'after' | 'overlay';
  layers: {
    floodExtent: boolean;
    waterArea: boolean;
    roads: boolean;
    rivers: boolean;
    settlements: boolean;
  };
}

export const InteractiveMap: React.FC<Props> = ({ event, observationMode, layers }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [basemap, setBasemap] = useState<'dark' | 'satellite' | 'street'>('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Basemap URLs
  const BASEMAPS = {
    dark: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  const ATTRIBUTIONS = {
    dark: 'Tiles &copy; Esri &mdash; Sources: HERE, Garmin, &copy; OpenStreetMap contributors, and the GIS user community',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
    street: '&copy; OpenStreetMap contributors'
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [event.latitude, event.longitude],
        zoom: event.zoomLevel,
        zoomControl: false,
        attributionControl: true
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);

      tileLayerRef.current = L.tileLayer(BASEMAPS[basemap], {
        attribution: ATTRIBUTIONS[basemap],
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when event changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([event.latitude, event.longitude], event.zoomLevel, {
        duration: 1.2
      });

      // Update marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/30 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50">
            <div class="w-3 h-3 rounded-full bg-cyan-300 animate-ping"></div>
            <div class="absolute w-2 h-2 rounded-full bg-cyan-400"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      markerRef.current = L.marker([event.latitude, event.longitude], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div class="p-2 space-y-1 text-slate-100 text-xs">
            <div class="font-bold text-cyan-400 text-sm">${event.name}</div>
            <div><strong>Location:</strong> ${event.location}, ${event.country}</div>
            <div><strong>Observation:</strong> ${event.observationDate}</div>
            <div><strong>Affected Extent:</strong> ${event.affectedAreaKm2} km² (${event.affectedPercentage}%)</div>
            <div class="text-[10px] text-amber-300 font-semibold pt-1 border-t border-slate-700">${event.dataSourceLabel}</div>
          </div>
        `);
    }
  }, [event]);

  // Update Basemap Tile
  useEffect(() => {
    if (mapInstanceRef.current && tileLayerRef.current) {
      tileLayerRef.current.setUrl(BASEMAPS[basemap]);
    }
  }, [basemap]);

  // Update GeoJSON Flood Layers & Styles
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (geojsonLayerRef.current) {
      geojsonLayerRef.current.remove();
      geojsonLayerRef.current = null;
    }

    if (!layers.floodExtent || observationMode === 'before') return;

    const getPolygonStyle = (feature: any) => {
      const sev = feature?.properties?.severity || event.severity;
      let fillColor = '#06b6d4'; // Cyan
      let strokeColor = '#38bdf8';
      let opacity = 0.6;

      if (sev === 'SEVERE') {
        fillColor = '#dc2626'; // Red
        strokeColor = '#f87171';
        opacity = 0.7;
      } else if (sev === 'HIGH') {
        fillColor = '#ea580c'; // Orange
        strokeColor = '#fb923c';
        opacity = 0.65;
      } else if (sev === 'MODERATE') {
        fillColor = '#eab308'; // Yellow
        strokeColor = '#fde047';
        opacity = 0.6;
      }

      if (observationMode === 'overlay') {
        fillColor = '#9333ea'; // Purple highlight overlay mode
        strokeColor = '#c084fc';
      }

      return {
        fillColor,
        weight: 2,
        opacity: 0.9,
        color: strokeColor,
        fillOpacity: opacity
      };
    };

    geojsonLayerRef.current = L.geoJSON(event.geojson as any, {
      style: getPolygonStyle,
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        layer.bindPopup(`
          <div class="p-2 space-y-1.5 text-xs text-slate-100">
            <div class="font-bold text-cyan-400 text-sm">${props.name || 'Inundated Polygon Zone'}</div>
            <div><strong>Severity Level:</strong> <span class="font-bold text-amber-300">${props.severity || event.severity}</span></div>
            <div><strong>Decibel Change (dB):</strong> <span class="font-mono text-cyan-300">${props.backscatterChangeDb || event.backscatterDropDb} dB</span></div>
            <div><strong>Estimated Depth:</strong> ${props.waterDepthEstimateM ? `${props.waterDepthEstimateM} meters` : 'Variable floodplain'}</div>
            <div class="text-[10px] text-slate-400 border-t border-slate-700 pt-1">
              Radar reflection signature: Specular low backscatter
            </div>
          </div>
        `);
      }
    }).addTo(mapInstanceRef.current);

  }, [event, observationMode, layers]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all ${
      isFullscreen ? 'fixed inset-0 z-[100] rounded-none border-none' : 'h-[540px] lg:h-[620px]'
    }`}>
      {/* Leaflet Map DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Map Toolbar: Basemap Selector & Controls */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-1 flex items-center gap-1 shadow-lg text-xs">
          <Layers className="w-3.5 h-3.5 text-cyan-400 ml-1.5" />
          <button
            onClick={() => setBasemap('dark')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              basemap === 'dark' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Dark Map
          </button>
          <button
            onClick={() => setBasemap('satellite')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              basemap === 'satellite' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setBasemap('street')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              basemap === 'street' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Streets
          </button>
        </div>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.flyTo([event.latitude, event.longitude], event.zoomLevel);
            }
          }}
          className="p-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 shadow-lg"
          title="Reset View"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 shadow-lg"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] hidden sm:block">
        <MapLegend />
      </div>

      {/* Mode Watermark Indicator */}
      <div className="absolute top-4 left-14 z-[400] bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800 text-[11px] font-semibold text-cyan-300 shadow-lg flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>View: {observationMode.toUpperCase()} | {event.location}</span>
      </div>
    </div>
  );
};
