import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Eye, ArrowLeftRight, Layers } from 'lucide-react';
import { FloodEvent } from '../../types/flood';

interface Props {
  event: FloodEvent;
  mode: 'split' | 'before' | 'after' | 'overlay';
  onModeChange: (mode: 'split' | 'before' | 'after' | 'overlay') => void;
}

export const BeforeAfterSlider: React.FC<Props> = ({ event, mode, onModeChange }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="space-y-3">
      {/* Comparison Mode Toggle Toolbar */}
      <div className="flex items-center justify-between bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs shadow-md">
        <span className="font-semibold text-slate-300 px-2 flex items-center gap-1.5 hidden sm:flex">
          <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
          <span>Observation Mode:</span>
        </span>
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => onModeChange('before')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'before'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Before Flood ({event.beforeDate})
          </button>
          <button
            onClick={() => onModeChange('after')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'after'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Flood Pass ({event.observationDate})
          </button>
          <button
            onClick={() => onModeChange('split')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'split'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => onModeChange('overlay')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              mode === 'overlay'
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SAR Overlay</span>
          </button>
        </div>
      </div>

      {/* Visual Slider Bar when Split Mode is Active */}
      {mode === 'split' && (
        <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>BEFORE: Baseline SAR ({event.beforeDate})</span>
            </span>
            <span className="text-cyan-400 flex items-center gap-1.5">
              <span>AFTER: Inundation SAR ({event.observationDate})</span>
              <Eye className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Interactive Drag Track */}
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }
            }}
            className="relative h-7 bg-slate-900 rounded-lg cursor-ew-resize border border-slate-700/80 overflow-hidden select-none"
          >
            {/* Left side highlight */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-emerald-950/60 border-r border-cyan-400/80 transition-none"
              style={{ width: `${sliderPosition}%` }}
            />
            {/* Right side highlight */}
            <div
              className="absolute right-0 top-0 bottom-0 bg-cyan-950/60 transition-none"
              style={{ width: `${100 - sliderPosition}%` }}
            />
            {/* Vertical Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-lg shadow-cyan-400/80 transform -translate-x-1/2 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-white shadow-md flex items-center justify-center text-slate-950 text-[10px] font-extrabold">
                ↔
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Drag handle to sweep baseline vs flood observation</span>
            <span className="text-cyan-300 font-mono">{sliderPosition.toFixed(0)}% Split</span>
          </div>
        </div>
      )}
    </div>
  );
};
