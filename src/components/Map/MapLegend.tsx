import React from 'react';
import { Info } from 'lucide-react';

export const MapLegend: React.FC = () => {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs shadow-xl space-y-2.5 max-w-xs">
      <div className="flex items-center justify-between font-semibold text-slate-200 border-b border-slate-800 pb-1.5">
        <span>SAR Flood Classification Legend</span>
        <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
          PROTOTYPE
        </span>
      </div>

      {/* Severity Color Ramps */}
      <div className="space-y-1.5">
        <div className="text-[11px] text-slate-400 font-medium">Inundation Severity:</div>
        <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold text-center">
          <div className="bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 py-1 rounded">
            Low (0-5%)
          </div>
          <div className="bg-yellow-950/80 border border-yellow-500/60 text-yellow-300 py-1 rounded">
            Mod (5-15%)
          </div>
          <div className="bg-amber-950/80 border border-amber-500/60 text-amber-300 py-1 rounded">
            High (15-30%)
          </div>
          <div className="bg-red-950/80 border border-red-500/60 text-red-300 py-1 rounded">
            Severe (&gt;30%)
          </div>
        </div>
      </div>

      {/* Layer Types */}
      <div className="space-y-1 text-[11px]">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="w-3.5 h-3.5 rounded bg-cyan-500/80 border border-cyan-300 shadow-sm" />
          <span>New Detected Surface Water Extent</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <div className="w-3.5 h-3.5 rounded bg-blue-900/90 border border-blue-400/50" />
          <span>Baseline Permanent Water Body</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <div className="w-3.5 h-3.5 rounded border-2 border-dashed border-amber-400 bg-amber-400/20" />
          <span>Vulnerable Transport / Sluice Infrastructure</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-[10px] text-amber-300/90 bg-amber-950/40 p-1.5 rounded border border-amber-500/20 flex items-start gap-1.5 leading-tight">
        <Info className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
        <span>Thresholds shown here are demonstration values. Not for emergency reliance.</span>
      </div>
    </div>
  );
};
