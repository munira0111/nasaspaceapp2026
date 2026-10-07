import React, { useState } from 'react';
import { Search, MapPin, Calendar, Layers, Sliders, CheckSquare, Square, Filter } from 'lucide-react';
import { FloodEvent, Region } from '../../types/flood';
import { searchLocation, SearchResult } from '../../services/geocoding';

interface Props {
  regions: Region[];
  events: FloodEvent[];
  selectedRegionId: string;
  onSelectRegion: (id: string) => void;
  selectedEventId: string;
  onSelectEvent: (id: string) => void;
  layers: {
    floodExtent: boolean;
    waterArea: boolean;
    roads: boolean;
    rivers: boolean;
    settlements: boolean;
  };
  onToggleLayer: (layerKey: keyof Props['layers']) => void;
  onSelectSearchResult?: (res: SearchResult) => void;
}

export const LeftSidebar: React.FC<Props> = ({
  regions,
  events,
  selectedRegionId,
  onSelectRegion,
  selectedEventId,
  onSelectEvent,
  layers,
  onToggleLayer,
  onSelectSearchResult
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [countryFilter, setCountryFilter] = useState<string>('ALL');

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      setIsSearching(true);
      const results = await searchLocation(val);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const countries = Array.from(new Set(regions.map(r => r.country)));
  const filteredRegions = countryFilter === 'ALL' ? regions : regions.filter(r => r.country === countryFilter);

  const handleCountryChange = (country: string) => {
    setCountryFilter(country);
    const availableRegions = country === 'ALL' ? regions : regions.filter(region => region.country === country);
    const nextRegion = availableRegions.find(region => region.id === selectedRegionId) ?? availableRegions[0];
    if (!nextRegion) return;

    if (nextRegion.id !== selectedRegionId) onSelectRegion(nextRegion.id);
    const nextEvent = events.find(event => event.regionId === nextRegion.id);
    if (nextEvent && nextEvent.id !== selectedEventId) onSelectEvent(nextEvent.id);
  };

  return (
    <div className="w-full lg:w-80 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-4 space-y-5 text-xs shadow-xl shrink-0">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Spatial & Event Controls</span>
        </div>
        <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          PROTOTYPE
        </span>
      </div>

      {/* Location Search Input */}
      <div className="space-y-1.5 relative">
        <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Search Location or Region:</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="e.g. Bangladesh, Sylhet, Sunamganj..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
          />
          {isSearching && (
            <div className="absolute right-3 top-2.5 w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto divide-y divide-slate-800">
            {searchResults.map((res, i) => (
              <button
                key={i}
                onClick={() => {
                  if (res.eventId) onSelectEvent(res.eventId);
                  if (res.regionId) onSelectRegion(res.regionId);
                  if (onSelectSearchResult) onSelectSearchResult(res);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between transition-colors text-xs"
              >
                <span className="font-semibold text-cyan-300">{res.name}</span>
                <span className="text-[10px] text-slate-400">{res.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Country Filter */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>Filter by Country:</span>
        </label>
        <select
          value={countryFilter}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Monitored Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Region Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Target Region / Watershed:</span>
        </label>
        <select
          value={selectedRegionId}
          onChange={(e) => {
            onSelectRegion(e.target.value);
            const firstEvt = events.find(ev => ev.regionId === e.target.value);
            if (firstEvt) onSelectEvent(firstEvt.id);
          }}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
        >
          {filteredRegions.map((reg) => (
            <option key={reg.id} value={reg.id}>
              {reg.name} ({reg.country})
            </option>
          ))}
        </select>
      </div>

      {/* Flood Event Dropdown */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Flood Observation Event:</span>
        </label>
        <select
          value={selectedEventId}
          onChange={(e) => onSelectEvent(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500 font-semibold text-cyan-300"
        >
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.name} ({ev.observationDate})
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Summary */}
      {selectedEvent && (
        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1 text-[11px]">
          <div className="text-slate-400 font-semibold">Pass Timestamps:</div>
          <div className="flex justify-between text-slate-300">
            <span>Pre-flood Reference:</span>
            <span className="font-mono text-emerald-400">{selectedEvent.beforeDate}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Co-flood Pass:</span>
            <span className="font-mono text-cyan-400 font-bold">{selectedEvent.observationDate}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Post-flood Recovery:</span>
            <span className="font-mono text-slate-400">{selectedEvent.afterDate}</span>
          </div>
        </div>
      )}

      {/* Map GIS Layer Controls */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Toggle GIS Overlay Layers:</span>
        </label>

        <div className="space-y-1.5">
          {[
            { key: 'floodExtent', label: 'Flood Inundation Boundary' },
            { key: 'waterArea', label: 'Permanent Baseline Water Bodies' },
            { key: 'roads', label: 'Critical Road & Transport Networks' },
            { key: 'rivers', label: 'Main River Drainage Corridors' },
            { key: 'settlements', label: 'Settlement & Population Centers' }
          ].map((item) => {
            const isChecked = layers[item.key as keyof Props['layers']];
            return (
              <button
                key={item.key}
                onClick={() => onToggleLayer(item.key as keyof Props['layers'])}
                className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                  isChecked
                    ? 'bg-slate-800/80 border-cyan-500/50 text-cyan-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                <span className="font-medium text-[11px]">{item.label}</span>
                {isChecked ? (
                  <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CheckCircleIcon = ({ className }: { className: string }) => (
  <CheckSquare className={className} />
);
