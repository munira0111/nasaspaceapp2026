import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Header/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/Home/HomePage';
import { ExplorePage } from './pages/Explore/ExplorePage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { HowItWorksPage } from './pages/HowItWorks/HowItWorksPage';
import { GlobalExplorerPage } from './pages/GlobalExplorer/GlobalExplorerPage';

import { getActiveDataProvider, setDataProviderMode, getDataProviderMode } from './services/dataService';
import { FloodEvent, Region } from './types/flood';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'dashboard' | 'how-it-works' | 'global'>('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(getDataProviderMode() === 'DEMO');

  const [events, setEvents] = useState<FloodEvent[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('south-asia-bd-sylhet');
  const [selectedEventId, setSelectedEventId] = useState<string>('bd-sylhet-2026');
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    const provider = getActiveDataProvider();
    const evts = await provider.getFloodEvents();
    const regs = await provider.getRegions();
    setEvents(evts);
    setRegions(regs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [isDemoMode]);

  const handleToggleDemoMode = () => {
    const nextMode = isDemoMode ? 'NISAR' : 'DEMO';
    setDataProviderMode(nextMode);
    setIsDemoMode(!isDemoMode);
  };

  const handleSelectEventAndNavigateMap = (eventId: string) => {
    setSelectedEventId(eventId);
    const ev = events.find(e => e.id === eventId);
    if (ev) {
      setSelectedRegionId(ev.regionId);
    }
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-cyan-300 font-mono text-xs animate-pulse">
              Initializing NISAR SAR Data Provider & Surface Masks...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage
                onNavigate={(page) => setActiveTab(page)}
                onSelectEvent={handleSelectEventAndNavigateMap}
              />
            )}

            {activeTab === 'map' && (
              <ExplorePage
                regions={regions}
                events={events}
                selectedRegionId={selectedRegionId}
                onSelectRegion={setSelectedRegionId}
                selectedEventId={selectedEventId}
                onSelectEvent={setSelectedEventId}
              />
            )}

            {activeTab === 'dashboard' && (
              <DashboardPage
                events={events}
                regions={regions}
                onSelectEvent={handleSelectEventAndNavigateMap}
                onNavigateMap={() => setActiveTab('map')}
              />
            )}

            {activeTab === 'how-it-works' && <HowItWorksPage />}

            {activeTab === 'global' && (
              <GlobalExplorerPage
                events={events}
                onSelectEvent={handleSelectEventAndNavigateMap}
                onNavigateMap={() => setActiveTab('map')}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
