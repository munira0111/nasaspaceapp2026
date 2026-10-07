import React, { useState } from 'react';
import {
  AlertOctagon,
  Sparkles,
  Play,
  Pause,
  Download,
  Share2,
  Calendar,
  Activity,
  BarChart2,
  FileText,
  Info
} from 'lucide-react';
import { FloodEvent } from '../../types/flood';
import { calculateSeverity } from '../../services/changeDetection';
import { generateEventExplanation, ExplanationResult } from '../../services/aiExplainer';
import { TimelineChart } from '../Timeline/TimelineChart';
import { DataStatusBadge } from '../DataBadge/DataStatusBadge';

interface Props {
  event: FloodEvent;
  onDateSelect?: (date: string) => void;
}

export const RightInfoPanel: React.FC<Props> = ({ event, onDateSelect }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'ai' | 'vulnerability'>('overview');
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [aiExplanation, setAiExplanation] = useState<ExplanationResult | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { severity, label, badgeBg, percentage } = calculateSeverity(
    event.affectedAreaKm2,
    event.totalRegionAreaKm2
  );

  const handleGenerateAi = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const result = generateEventExplanation(event);
      setAiExplanation(result);
      setIsGeneratingAi(false);
    }, 400);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadReport = () => {
    const reportData = {
      title: `NISAR FloodWatch Report - ${event.name}`,
      event: event.name,
      location: `${event.location}, ${event.country}`,
      observationDate: event.observationDate,
      affectedAreaKm2: event.affectedAreaKm2,
      affectedPercentage: `${percentage}%`,
      severity,
      dataSource: event.dataSourceLabel,
      scientificDetails: {
        frequency: event.sarFrequency,
        polarization: event.polarization,
        backscatterChangeDb: `${event.backscatterDropDb} dB`
      },
      vulnerabilities: event.affectedFeatures
    };

    const jsonBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NISAR_FloodReport_${event.id}.json`;
    a.click();
  };

  const storySteps = [
    { title: '1. Baseline SAR', date: event.beforeDate, text: 'Dry baseline conditions. Normal ground backscatter.' },
    { title: '2. Upstream Deluge', date: 'Monsoon Peak', text: 'Heavy rainfall swollen river banks upstream.' },
    { title: '3. Inundation Peak', date: event.observationDate, text: `Peak flood coverage of ${event.affectedAreaKm2} km² detected.` },
    { title: '4. Recession & Recovery', date: event.afterDate, text: 'Gradual water drainage back to baseline riverbeds.' }
  ];

  const handlePlayStory = () => {
    setIsPlayingStory(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= storySteps.length) {
        clearInterval(interval);
        setIsPlayingStory(false);
        setStoryStep(0);
      } else {
        setStoryStep(step);
      }
    }, 2500);
  };

  return (
    <div className="w-full lg:w-96 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-4 space-y-4 text-xs shadow-xl shrink-0">
      {/* Event Title Header */}
      <div className="space-y-1 border-b border-slate-800 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">
            {event.country} • {event.location}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Share Event URL"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDownloadReport}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Download Event JSON Report"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <h2 className="font-extrabold text-base text-slate-100 leading-tight">
          {event.name}
        </h2>
        {copiedLink && (
          <span className="text-[10px] text-cyan-400 font-semibold animate-pulse">Link copied to clipboard!</span>
        )}
      </div>

      {/* Data Provider Label Badge */}
      <DataStatusBadge isDemo={event.isDemo} />

      {/* Navigation Tabs for Right Panel */}
      <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
            activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
            activeTab === 'timeline' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('vulnerability')}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
            activeTab === 'vulnerability' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Impact
        </button>
        <button
          onClick={() => {
            setActiveTab('ai');
            if (!aiExplanation) handleGenerateAi();
          }}
          className={`flex-1 py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
            activeTab === 'ai' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-purple-200'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Explain</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Severity Indicator Pill */}
          <div className={`p-3 rounded-xl border flex items-center justify-between ${badgeBg}`}>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                FLOOD SEVERITY RATING
              </div>
              <div className="font-extrabold text-sm">{label}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-base font-extrabold">{percentage}%</div>
              <div className="text-[10px] opacity-80">of Region Area</div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Affected Area:</div>
              <div className="text-lg font-black text-cyan-400 font-mono">
                {event.affectedAreaKm2} <span className="text-xs font-sans text-slate-400">km²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Detected Inundation</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Total Region Area:</div>
              <div className="text-lg font-black text-slate-200 font-mono">
                {event.totalRegionAreaKm2} <span className="text-xs font-sans text-slate-400">km²</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Analyzed Watershed</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">SAR Backscatter Drop:</div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {event.backscatterDropDb} <span className="text-xs font-sans text-slate-400">dB</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Specular Reflection</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Confidence Score:</div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                {event.confidence}
              </div>
            </div>
          </div>

          {/* "What Changed?" Automated Radar Interpretation */}
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>What Changed? (Radar Analysis)</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Synthetic Aperture Radar observations registered an abrupt reduction in radar backscatter between{' '}
              <span className="text-emerald-400 font-semibold">{event.beforeDate}</span> and{' '}
              <span className="text-cyan-400 font-semibold">{event.observationDate}</span>. Smooth surface water acts as a specular mirror, reflecting microwave pulses away from the satellite receiver and creating distinct dark return masks.
            </p>
          </div>

          {/* Story Mode Playback Feature */}
          <div className="p-3 bg-gradient-to-br from-slate-950 to-blue-950/40 rounded-xl border border-blue-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Tell Me The Story of This Flood</span>
              </span>
              <button
                onClick={handlePlayStory}
                disabled={isPlayingStory}
                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 text-[11px] transition-colors"
              >
                {isPlayingStory ? <Pause className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                <span>{isPlayingStory ? 'Playing...' : 'Play Story'}</span>
              </button>
            </div>

            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px]">
              <div className="font-bold text-cyan-300">{storySteps[storyStep].title}</div>
              <div className="text-slate-400 text-[10px] mb-1">{storySteps[storyStep].date}</div>
              <p className="text-slate-200">{storySteps[storyStep].text}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIME SERIES TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Flooded Area Time-Series (km²)</span>
            </span>
          </div>
          <TimelineChart timeline={event.timeline} onSelectDate={onDateSelect} />
          <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-normal">
            💡 <strong>Interactive Chart:</strong> Hover over date points to see peak inundation levels. Click any point to align observation parameters.
          </div>
        </div>
      )}

      {/* TAB 3: AI EXPLANATION */}
      {activeTab === 'ai' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Explain in Simple Language</span>
            </span>
            <button
              onClick={handleGenerateAi}
              disabled={isGeneratingAi}
              className="px-2 py-1 rounded bg-purple-950 border border-purple-700 text-purple-200 text-[10px] font-semibold hover:bg-purple-900"
            >
              {isGeneratingAi ? 'Analyzing...' : 'Regenerate'}
            </button>
          </div>

          {isGeneratingAi ? (
            <div className="p-6 text-center text-purple-300 space-y-2 bg-purple-950/20 rounded-xl border border-purple-900/40">
              <Sparkles className="w-6 h-6 animate-spin mx-auto text-purple-400" />
              <p>Analyzing radar parameters & spatial extent...</p>
            </div>
          ) : aiExplanation ? (
            <div className="space-y-3 text-[11px]">
              <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40 space-y-1">
                <div className="font-bold text-purple-300 text-xs">Event Summary</div>
                <p className="text-purple-100 leading-relaxed">{aiExplanation.summary}</p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300 text-xs">Radar Physics Explanation</div>
                <p className="text-slate-300 leading-relaxed">{aiExplanation.radarExplanation}</p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-300 text-xs">Impact & Vulnerability Context</div>
                <p className="text-slate-300 leading-relaxed">{aiExplanation.impactExplanation}</p>
              </div>

              <div className="p-2.5 bg-amber-950/30 rounded-xl border border-amber-800/40 text-[10px] text-amber-200 leading-tight flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{aiExplanation.limitations}</span>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* TAB 4: VULNERABILITY & IMPACT */}
      {activeTab === 'vulnerability' && (
        <div className="space-y-3 text-[11px]">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Potentially Affected Features & Infrastructure</span>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Estimated Settlement Population:</span>
              <span className="font-bold text-amber-300 font-mono text-xs">
                ~{event.affectedFeatures.settlementsEstimate.toLocaleString()} residents
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">Agricultural Land Submerged:</span>
              <span className="font-bold text-emerald-300 font-mono text-xs">
                {event.affectedFeatures.agriculturalLandHa.toLocaleString()} hectares
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Road Networks Affected:</span>
              <span className="font-bold text-cyan-300 font-mono text-xs">
                {event.affectedFeatures.roadsAffectedKm} km
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-semibold text-slate-300">Critical Infrastructure Markers:</div>
            <ul className="space-y-1">
              {event.affectedFeatures.criticalFacilities.map((fac, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
