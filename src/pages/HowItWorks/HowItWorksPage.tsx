import React from 'react';
import {
  HelpCircle,
  Radio,
  Layers,
  CloudOff,
  Sun,
  ShieldCheck,
  ExternalLink,
  Cpu,
  Database
} from 'lucide-react';
import { DataStatusBadge } from '../../components/DataBadge/DataStatusBadge';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>RADAR REMOTE SENSING EXPLAINER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          How NISAR Radar Monitors Earth's Floods
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Discover how microwave Synthetic Aperture Radar (SAR) sees through storm clouds and darkness to map surface water changes with high spatial precision.
        </p>
      </div>

      {/* What is NISAR? */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">What is NISAR?</h2>
            <p className="text-slate-400 text-xs">NASA-ISRO Synthetic Aperture Radar Mission</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          NISAR is a joint Earth-observing satellite mission between NASA (National Aeronautics and Space Administration) and ISRO (Indian Space Research Organisation). It is the first satellite radar mission to use two different radar frequencies (Dual L-band and C-band) to measure changes in Earth’s surface hazard zones with millimeter-to-centimeter precision.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300">NASA L-Band Radar (1.25 GHz / 24 cm)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Longer wavelength radar capable of penetrating dense forest canopy, agricultural foliage, and soil surface layers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-blue-300">ISRO S-Band / C-Band Radar</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Higher sensitivity radar for coastal water boundary tracking, sea ice drift, and vegetation biomass density.
            </p>
          </div>
        </div>
      </section>

      {/* The 6-Step Radar Flood Detection Pipeline */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white">The NISAR Flood Detection Pipeline</h2>
          <p className="text-slate-400 text-xs">From satellite pulse transmission to interactive map polygon</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              title: 'Microwave Pulse Transmission',
              desc: 'NISAR emits microwave radar beams down towards Earth’s surface at oblique incidence angles.',
              icon: Radio
            },
            {
              step: '02',
              title: 'Backscatter Return Scattering',
              desc: 'Rough terrain scatters signals back to satellite; smooth water reflects beams away (specular reflection).',
              icon: Layers
            },
            {
              step: '03',
              title: 'Pre-Event Baseline Acquisition',
              desc: 'Satellite archives pre-flood reference SAR passes taken under normal dry ground conditions.',
              icon: Database
            },
            {
              step: '04',
              title: 'Co-Event SAR Pass Difference',
              desc: 'Decibel ratioing (log difference) compares flood pass backscatter against pre-flood baseline.',
              icon: Cpu
            },
            {
              step: '05',
              title: 'Speckle Filtering & Thresholding',
              desc: 'Lee/Frost filtering removes radar noise, applying threshold values to produce binary flood water masks.',
              icon: ShieldCheck
            },
            {
              step: '06',
              title: 'Polygon Vectorization & GIS Overlay',
              desc: 'Raster masks convert into GeoJSON polygons for web rendering with affected area statistics.',
              icon: HelpCircle
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 relative shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    STEP {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="font-extrabold text-slate-100 text-sm">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* NISAR Data Explorer Section */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">NISAR Data Explorer & API Integration</h2>
            <p className="text-slate-400 text-xs">Authoritative data sources & modular data provider status</p>
          </div>
          <DataStatusBadge isDemo={true} compact />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-200 text-sm">Authoritative Portals</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://nisar.jpl.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 font-semibold transition-all"
                >
                  <span>NASA NISAR Mission Portal</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://asf.alaska.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 font-semibold transition-all"
                >
                  <span>Alaska Satellite Facility (ASF DAAC)</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://veda.space.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 font-semibold transition-all"
                >
                  <span>ISRO VEDA Space Portal</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="font-bold text-slate-200 text-sm">Modular DataProvider Architecture</h3>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              NISAR FloodWatch implements an abstracted <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">DataProvider</code> TypeScript interface. When live NISAR granules are queried via NASA Earthdata CMR, switching the active provider replaces sample data without altering UI components.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400">
              interface DataProvider &#123;<br />
              &nbsp;&nbsp;getFloodEvents(): Promise&lt;FloodEvent[]&gt;;<br />
              &nbsp;&nbsp;runChangeDetection(id): Promise&lt;ChangeDetectionResult&gt;;<br />
              &#125;
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
