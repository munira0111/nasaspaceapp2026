import React from 'react';
import { BarChart3, Activity, PieChart, Layers, MapPin, Globe } from 'lucide-react';
import { FloodEvent, Region } from '../../types/flood';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { DataStatusBadge } from '../../components/DataBadge/DataStatusBadge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface Props {
  events: FloodEvent[];
  regions: Region[];
  onSelectEvent: (id: string) => void;
  onNavigateMap: () => void;
}

export const DashboardPage: React.FC<Props> = ({ events, regions, onSelectEvent, onNavigateMap }) => {
  const totalAffectedKm2 = events.reduce((sum, e) => sum + e.affectedAreaKm2, 0);
  const totalMonitoredRegions = regions.length;
  const maxEvent = [...events].sort((a, b) => b.affectedAreaKm2 - a.affectedAreaKm2)[0];

  // Data for Event Bar Chart
  const barChartData = events.map(e => ({
    name: e.name.split(' ')[0] + ' (' + e.country + ')',
    affectedArea: e.affectedAreaKm2,
    id: e.id
  }));

  // Data for Severity Breakdown Pie Chart
  const severityCounts = {
    LOW: events.filter(e => e.severity === 'LOW').length,
    MODERATE: events.filter(e => e.severity === 'MODERATE').length,
    HIGH: events.filter(e => e.severity === 'HIGH').length,
    SEVERE: events.filter(e => e.severity === 'SEVERE').length
  };

  const pieChartData = [
    { name: 'Low Severity', value: severityCounts.LOW, color: '#10b981' },
    { name: 'Moderate Severity', value: severityCounts.MODERATE, color: '#eab308' },
    { name: 'High Severity', value: severityCounts.HIGH, color: '#f97316' },
    { name: 'Severe Flood', value: severityCounts.SEVERE, color: '#ef4444' }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-cyan-400" />
            <span>NISAR Flood Intelligence Dashboard</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Aggregate remote sensing statistics, spatial inundation coverage, and regional comparison metrics.
          </p>
        </div>

        <DataStatusBadge isDemo={true} compact />
      </div>

      {/* Global Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Events Monitored"
          value={events.length}
          subtitle="Active SAR Pass Scenarios"
          icon={Activity}
          color="cyan"
          trend="8 Global Events"
        />
        <StatsCard
          title="Cumulative Affected Area"
          value={`${totalAffectedKm2.toLocaleString()} km²`}
          subtitle="Combined Detected Extent"
          icon={Layers}
          color="blue"
          trend="Synthetic SAR Simulation"
        />
        <StatsCard
          title="Monitored Regions"
          value={totalMonitoredRegions}
          subtitle="Watersheds & Deltas"
          icon={Globe}
          color="purple"
          trend="Asia, Europe & N. America"
        />
        <StatsCard
          title="Largest Flood Event"
          value={`${maxEvent?.affectedAreaKm2} km²`}
          subtitle={maxEvent?.name}
          icon={MapPin}
          color="amber"
          trend={`${maxEvent?.country} (${maxEvent?.affectedPercentage}%)`}
        />
        <StatsCard
          title="Latest SAR Pass"
          value={maxEvent?.observationDate || '2026-10-02'}
          subtitle="Ascending Orbit Pass"
          icon={BarChart3}
          color="emerald"
          trend="Dual-pol L-Band"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Affected Area by Event */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Inundation Area Comparison by Event (km²)</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Decibel Change Thresholding</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#06b6d4', borderRadius: '0.5rem', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} km²`, 'Affected Inundation Area']}
                />
                <Bar dataKey="affectedArea" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Severity Distribution Pie Chart */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-400" />
              <span>Severity Rating Breakdown</span>
            </h3>
          </div>

          <div className="w-full h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#a855f7', borderRadius: '0.5rem', fontSize: '12px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            {pieChartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-[11px]">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Monitored Events Matrix Table */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-white text-base">Detailed Monitored Event Directory</h3>
          <span className="text-xs text-slate-400">Click any row to open interactive map</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
              <tr>
                <th className="p-3">Scenario Name</th>
                <th className="p-3">Country & Location</th>
                <th className="p-3">Observation Date</th>
                <th className="p-3">Affected Area (km²)</th>
                <th className="p-3">Coverage %</th>
                <th className="p-3">Severity Rating</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {events.map((evt) => (
                <tr
                  key={evt.id}
                  onClick={() => {
                    onSelectEvent(evt.id);
                    onNavigateMap();
                  }}
                  className="hover:bg-slate-800/80 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-bold text-slate-100">{evt.name}</td>
                  <td className="p-3 text-cyan-400 font-semibold">{evt.location}, {evt.country}</td>
                  <td className="p-3 font-mono text-slate-400">{evt.observationDate}</td>
                  <td className="p-3 font-mono font-bold text-cyan-300">{evt.affectedAreaKm2} km²</td>
                  <td className="p-3 font-mono text-slate-200">{evt.affectedPercentage}%</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      evt.severity === 'SEVERE' ? 'bg-red-950 text-red-300 border border-red-800' :
                      evt.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      evt.severity === 'MODERATE' ? 'bg-yellow-950 text-yellow-300 border border-yellow-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {evt.severity}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 font-semibold text-[10px] hover:bg-cyan-900">
                      View Map →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
