import React from 'react';
import { AlertTriangle, CheckCircle2, Radio } from 'lucide-react';
import type { DataStatus } from '../../types/flood';

interface Props {
  status?: DataStatus;
  isDemo?: boolean;
  compact?: boolean;
}

export const DataStatusBadge: React.FC<Props> = ({ status, isDemo = true, compact = false }) => {
  const isDemoActive = status ? status.isDemoMode : isDemo;

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          isDemoActive
            ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
            : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
        }`}
        title={
          isDemoActive
            ? 'Demo visualization — sample data. Not an actual NISAR observation.'
            : 'Data source: NASA-ISRO NISAR Satellite Mission'
        }
      >
        {isDemoActive ? (
          <>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>DEMO MODE</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NISAR LIVE</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`p-3 rounded-xl border backdrop-blur-md flex items-start gap-3 transition-all ${
        isDemoActive
          ? 'bg-amber-950/40 border-amber-500/30 text-amber-200 shadow-lg shadow-amber-950/20'
          : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200 shadow-lg shadow-cyan-950/20'
      }`}
    >
      <div className={`p-2 rounded-lg ${isDemoActive ? 'bg-amber-900/50' : 'bg-cyan-900/50'}`}>
        {isDemoActive ? (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        ) : (
          <Radio className="w-5 h-5 text-cyan-400 animate-pulse shrink-0" />
        )}
      </div>
      <div className="flex-1 text-xs leading-relaxed">
        <div className="font-semibold text-sm flex items-center justify-between mb-0.5">
          <span>{isDemoActive ? 'Demo Visualization — Sample Data' : 'Data Source: NASA-ISRO NISAR'}</span>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-700">
            {isDemoActive ? 'SYNTHETIC PROTOTYPE' : 'AUTHORIZED SATELLITE'}
          </span>
        </div>
        <p className="opacity-90">
          {isDemoActive
            ? 'Thresholds & spatial extent shown here are sample demonstration values used for testing and UI prototyping. Not an actual NISAR observation.'
            : 'Operational Synthetic Aperture Radar observation acquired via NASA Earthdata / ASF DAAC & ISRO NISAR mission endpoints.'}
        </p>
      </div>
    </div>
  );
};
