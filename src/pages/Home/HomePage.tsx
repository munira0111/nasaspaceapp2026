import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Radar,
  ArrowRight,
  Eye,
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  CloudOff,
  Sun,
  Radio,
  MapPin
} from 'lucide-react';
import { DataStatusBadge } from '../../components/DataBadge/DataStatusBadge';

interface Props {
  onNavigate: (page: 'map' | 'how-it-works' | 'dashboard' | 'global') => void;
  onSelectEvent: (eventId: string) => void;
  onFocus: () => void;
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

export const HomePage: React.FC<Props> = ({ onNavigate, onSelectEvent, onFocus }) => {
  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-slate-950/55 backdrop-blur-[2px] border border-slate-700/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        {/* Radar Background Glow Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse-glow" />
        
        {/* Animated Satellite Radar Orbit Graphic */}
        <div className="absolute top-6 right-8 opacity-25 hidden md:block">
          <div className="relative w-48 h-48 border border-cyan-500/30 rounded-full flex items-center justify-center animate-radar">
            <div className="w-32 h-32 border border-blue-500/30 rounded-full" />
            <div className="absolute top-0 right-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400" />
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-3xl space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
        >
          <motion.div variants={revealVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NASA Space Apps Challenge Prototype</span>
          </motion.div>

          <motion.h1 variants={revealVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            See how Earth's surface changes{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              before, during, and after floods.
            </span>
          </motion.h1>

          <motion.p variants={revealVariants} className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
            Powered by NASA-ISRO Synthetic Aperture Radar (NISAR) concepts. Penetrate dense cloud cover and storm darkness to observe inundation extent, track surface water shifts, and measure flood impact in near-real-time.
          </motion.p>

          <motion.div variants={revealVariants} className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                onFocus();
                onNavigate('map');
              }}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-[1.02]"
            >
              <Radar className="w-5 h-5 text-slate-950" />
              <span>Explore Interactive Flood Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-800 hover:border-slate-600 transition-all"
            >
              <span>How NISAR Radar Works</span>
            </button>
          </motion.div>

          {/* Mandatory Data Rule Notice */}
          <motion.div variants={revealVariants} className="pt-4">
            <DataStatusBadge isDemo={true} />
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Core Earth Observation Capabilities
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Transform complex microwave radar backscatter signals into human-understandable flood intelligence.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {[
            {
              title: '🌊 Flood Detection',
              desc: 'Pinpoint precise flood extent and newly submerged land boundaries using backscatter difference thresholding.',
              icon: Eye,
              color: 'cyan'
            },
            {
              title: '🛰 Radar Observation',
              desc: 'Understand dual-pol VV+VH microwave signals operating at L-band (24 cm) and C-band frequencies.',
              icon: Radar,
              color: 'blue'
            },
            {
              title: '🗺 Interactive Mapping',
              desc: 'Explore high-resolution spatial polygons, infrastructure overlays, and severity color maps globally.',
              icon: Globe,
              color: 'purple'
            },
            {
              title: '📊 Change Over Time',
              desc: 'Compare pre-event reference SAR with co-event passes via split curtains and time-series line charts.',
              icon: Activity,
              color: 'emerald'
            },
            {
              title: '⚠️ Disaster Awareness',
              desc: 'Assess affected populations, submerged road networks, and key agricultural lands during flood events.',
              icon: ShieldCheck,
              color: 'amber'
            }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                variants={revealVariants}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 space-y-3 shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-sm">{feat.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* "Why Radar?" Section */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>THE NISAR ADVANTAGE</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Why Radar Remote Sensing for Floods?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Optical satellites (like Landsat or Sentinel-2) fail during major flood disasters because monsoonal cloud cover, heavy storm clouds, and nighttime conditions block visible light cameras. Synthetic Aperture Radar (SAR) solves this completely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center">
              <CloudOff className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-base">Penetrates Heavy Clouds</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Microwave radar signals pass straight through storm clouds, rain cells, and smoke, delivering uninterrupted earth imagery regardless of weather.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-base">Day & Night Active Illumination</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              SAR satellites emit their own microwave energy pulses down to Earth, enabling 24/7 continuous imaging during both daytime and midnight satellite passes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-100 text-base">Specular Reflection Physics</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Smooth surface water reflects radar beams away like a mirror, producing dark return signals (backscatter drops) that easily distinguish flood water from land.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Monitored Demo Scenarios */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Monitored Flood Scenario Spotlights</h2>
            <p className="text-slate-400 text-xs">Select any demo scenario below to launch full interactive analysis.</p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5"
          >
            <span>View All Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'bd-sylhet-2026',
              name: 'Sylhet & Sunamganj Flash Flood',
              country: 'Bangladesh 🇧🇩',
              area: '342 km²',
              date: 'June 2026',
              desc: 'Catastrophic monsoonal surge in Surma-Kushiyara Haor wetland basin.',
              severity: 'MODERATE'
            },
            {
              id: 'bd-kurigram-2026',
              name: 'Kurigram Jamuna Overflow',
              country: 'Bangladesh 🇧🇩',
              area: '485 km²',
              date: 'July 2026',
              desc: 'High discharge along the Brahmaputra-Jamuna river system breaching char levees.',
              severity: 'HIGH'
            },
            {
              id: 'es-valencia-2026',
              name: 'Valencia Flash Flood (DANA)',
              country: 'Spain 🇪🇸',
              area: '185 km²',
              date: 'October 2026',
              desc: 'Extreme isolated high-altitude atmospheric depression cloudburst in Turia plain.',
              severity: 'SEVERE'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onFocus();
                onSelectEvent(item.id);
                onNavigate('map');
              }}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer space-y-3 shadow-lg transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.country}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                  {item.date}
                </span>
              </div>
              <h3 className="font-black text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                {item.name}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Affected Area:</span>
                <span className="text-cyan-300 font-extrabold">{item.area}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
