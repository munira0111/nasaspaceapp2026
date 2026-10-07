import React, { useState } from 'react';
import { Globe, MapPin, ArrowRight, Layers, Filter } from 'lucide-react';
import { FloodEvent } from '../../types/flood';
import { DataStatusBadge } from '../../components/DataBadge/DataStatusBadge';

interface Props {
  events: FloodEvent[];
  onSelectEvent: (eventId: string) => void;
  onNavigateMap: () => void;
}

export const GlobalExplorerPage: React.FC<Props> = ({ events, onSelectEvent, onNavigateMap }) => {
  const [selectedContinent, setSelectedContinent] = useState<string>('ALL');

  const continents = ['ALL', 'Asia', 'Europe', 'North America', 'South America', 'Africa'];

  const filteredEvents = selectedContinent === 'ALL'
    ? events
    : events.filter(e => {
        if (selectedContinent === 'Asia') return ['Bangladesh', 'India', 'Nepal', 'Vietnam'].includes(e.country);
        if (selectedContinent === 'Europe') return e.country === 'Spain';
        if (selectedContinent === 'North America') return e.country === 'United States';
        return true;
      });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Globe className="w-7 h-7 text-cyan-400" />
            <span>Global Flood Inundation Hotspots</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Explore active and historical satellite radar flood observations around the globe.
          </p>
        </div>

        <DataStatusBadge isDemo={true} compact />
      </div>

      {/* Continent Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0 pr-2">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span>Filter Continent:</span>
        </span>
        {continents.map((cont) => (
          <button
            key={cont}
            onClick={() => setSelectedContinent(cont)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedContinent === cont
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cont === 'ALL' ? 'All Global Regions' : cont}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={() => {
              onSelectEvent(evt.id);
              onNavigateMap();
            }}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer space-y-4 shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-cyan-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{evt.country}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                {evt.observationDate}
              </span>
            </div>

            <div>
              <h3 className="font-black text-slate-100 text-lg group-hover:text-cyan-300 transition-colors">
                {evt.name}
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                {evt.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800/80 font-mono">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Affected Area:</div>
                <div className="text-sm font-bold text-cyan-300">{evt.affectedAreaKm2} km²</div>
              </div>

              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Severity Rating:</div>
                <div className="text-xs font-bold text-amber-300">{evt.severity}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500 font-mono">L-band Dual-Pol SAR</span>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
