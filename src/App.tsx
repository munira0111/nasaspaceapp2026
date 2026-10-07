import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Header/Navbar';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/Home/HomePage';
import { ExplorePage } from './pages/Explore/ExplorePage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { HowItWorksPage } from './pages/HowItWorks/HowItWorksPage';
import { GlobalExplorerPage } from './pages/GlobalExplorer/GlobalExplorerPage';

import { getActiveDataProvider, setDataProviderMode, getDataProviderMode } from './services/dataService';
import { FloodEvent, Region } from './types/flood';

const SceneBackdrop = React.lazy(() =>
  import('./components/SceneBackdrop/SceneBackdrop').then((module) => ({ default: module.SceneBackdrop })),
);

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'dashboard' | 'how-it-works' | 'global'>('home');
  const [focusKey, setFocusKey] = useState(0);
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
    <div className="app-shell min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <React.Suspense fallback={null}>
        <SceneBackdrop activeTab={activeTab} focusKey={focusKey} />
      </React.Suspense>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDemoMode={isDemoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* Main View Area */}
      <main className="relative z-10 flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-cyan-300 font-mono text-xs animate-pulse">
              Initializing NISAR SAR Data Provider & Surface Masks...
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === 'home' && (
              <HomePage
                onNavigate={(page) => setActiveTab(page)}
                onSelectEvent={handleSelectEventAndNavigateMap}
                onFocus={() => setFocusKey((key) => key + 1)}
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
          </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Global Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
