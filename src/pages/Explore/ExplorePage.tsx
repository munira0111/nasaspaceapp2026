import React, { useState } from 'react';
import { LeftSidebar } from '../../components/Sidebar/LeftSidebar';
import { RightInfoPanel } from '../../components/Sidebar/RightInfoPanel';
import { InteractiveMap } from '../../components/Map/InteractiveMap';
import { BeforeAfterSlider } from '../../components/Map/BeforeAfterSlider';
import { FloodEvent, Region } from '../../types/flood';
import { SearchResult } from '../../services/geocoding';

interface Props {
  regions: Region[];
  events: FloodEvent[];
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
  selectedEventId: string;
  onSelectEvent: (id: string) => void;
}

export const ExplorePage: React.FC<Props> = ({
  regions,
  events,
  selectedRegionId,
  onSelectRegion,
  selectedEventId,
  onSelectEvent,
}) => {
  const [observationMode, setObservationMode] = useState<'split' | 'before' | 'after' | 'overlay'>('split');
  const [layers, setLayers] = useState({
    floodExtent: true,
    waterArea: true,
    roads: true,
    rivers: true,
    settlements: false,
  });

  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleToggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectSearchResult = (res: SearchResult) => {
    if (res.eventId) {
      onSelectEvent(res.eventId);
    }
    if (res.regionId) {
      onSelectRegion(res.regionId);
    }
  };

  return (
    <div className="py-4 px-3 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-4">
      {/* Top Banner Disclaimer */}
      <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-cyan-300">NISAR FloodWatch Interactive Studio</span>
          <span className="hidden md:inline text-slate-400">• Bangladesh & Global Hotspot Demo Scenarios</span>
        </div>
        <div className="text-[11px] font-mono text-amber-300 font-semibold">
          {activeEvent.dataSourceLabel}
        </div>
      </div>

      {/* Main Studio Grid: Left Sidebar + Map & Controls + Right Info Panel */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Left Sidebar */}
        <LeftSidebar
          regions={regions}
          events={events}
          selectedRegionId={selectedRegionId}
          onSelectRegion={onSelectRegion}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
          layers={layers}
          onToggleLayer={handleToggleLayer}
          onSelectSearchResult={handleSelectSearchResult}
        />

        {/* Center: Map & Before/After Comparison Tool */}
        <div className="flex-1 w-full space-y-3">
          {/* Comparison Toolbar & Slider */}
          <BeforeAfterSlider
            event={activeEvent}
            mode={observationMode}
            onModeChange={setObservationMode}
          />

          {/* Leaflet Map Canvas */}
          <InteractiveMap
            event={activeEvent}
            observationMode={observationMode}
            layers={layers}
          />
        </div>

        {/* Right Info & Statistics Panel */}
        <RightInfoPanel event={activeEvent} />
      </div>
    </div>
  );
};
