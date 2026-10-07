import React, { useState } from 'react';
import { Radar, Compass, BarChart3, HelpCircle, Globe, Menu, X, ShieldAlert, Radio } from 'lucide-react';
import { DataStatusBadge } from '../DataBadge/DataStatusBadge';

interface Props {
  activeTab: 'home' | 'map' | 'dashboard' | 'how-it-works' | 'global';
  setActiveTab: (tab: 'home' | 'map' | 'dashboard' | 'how-it-works' | 'global') => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

interface NavItem {
  id: 'home' | 'map' | 'dashboard' | 'how-it-works' | 'global';
  label: string;
  icon: any;
  highlight?: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Radar },
    { id: 'map', label: 'Explore Flood Map', icon: Compass, highlight: true },
    { id: 'dashboard', label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'how-it-works', label: 'How NISAR Works', icon: HelpCircle },
    { id: 'global', label: 'Global Hotspots', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & NASA Space Apps Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-lg shadow-cyan-500/25 border border-cyan-400/30">
              <Radar className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  NISAR FloodWatch
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 hidden sm:inline-block">
                  NASA SPACE APPS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Radar Surface Change Monitoring Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : item.highlight
                      ? 'bg-blue-600/30 text-blue-200 border border-blue-500/30 hover:bg-blue-600/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Data Provider Mode Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onToggleDemoMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isDemoMode
                  ? 'bg-amber-950/50 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
                  : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60'
              }`}
              title="Click to toggle between Demo Sample Data and Real NISAR Data Provider"
            >
              {isDemoMode ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>DEMO DATA ACTIVE</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>NISAR API ACTIVE</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <DataStatusBadge compact isDemo={isDemoMode} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onToggleDemoMode();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200"
            >
              <span>Data Provider Mode:</span>
              <span className={isDemoMode ? 'text-amber-400' : 'text-cyan-400'}>
                {isDemoMode ? 'DEMO MODE' : 'NISAR LIVE'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
