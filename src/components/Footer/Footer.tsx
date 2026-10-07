import React from 'react';
import { ShieldAlert, ExternalLink, Satellite, GitBranch, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Row: Mission & Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-semibold shrink-0">
            <ShieldAlert className="w-5 h-5" />
            <span>SCIENTIFIC & RESEARCH DISCLAIMER:</span>
          </div>
          <p className="text-slate-300 leading-relaxed flex-1">
            NISAR FloodWatch is an educational and scientific research prototype built for the NASA Space Apps Challenge.
            Flood extent boundaries, severity classifications, and affected area statistics are generated using radar backscatter change detection algorithms.
            This platform is NOT an official disaster response tool or emergency warning system.
          </p>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Satellite className="w-4 h-4 text-cyan-400" />
              <span>NISAR FloodWatch</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Global surface change & flood inundation intelligence using NASA-ISRO Synthetic Aperture Radar (NISAR) concepts.
            </p>
            <div className="text-[11px] text-slate-500">
              NASA Space Apps Challenge Prototype
            </div>
          </div>

          {/* Col 2: Authoritative Mission Links */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Authoritative Data Portals</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://nisar.jpl.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NASA NISAR Mission Portal</span>
                </a>
              </li>
              <li>
                <a
                  href="https://asf.alaska.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ASF DAAC (Alaska Satellite Facility)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://veda.space.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ISRO VEDA Portal</span>
                </a>
              </li>
              <li>
                <a
                  href="https://cmr.earthdata.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NASA Earthdata Search (CMR)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Concepts */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Radar Concepts</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>L-band Microwave (24 cm wavelength)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dual Polarization (VV / VH Backscatter)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Specular Reflection & Decibel Ratioing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Cloud & Daylight Independent Observation</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Open Source & Code */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">Open Science & Architecture</h4>
            <p className="text-slate-400 leading-relaxed">
              Designed with a modular <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">DataProvider</code> interface ready for direct NISAR L-1 & L-2 Earthdata ingestion.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>Open Science Prototype</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} NISAR FloodWatch. Built for NASA Space Apps Challenge. Powered by Synthetic Aperture Radar Remote Sensing Concepts.
        </div>
      </div>
    </footer>
  );
};
