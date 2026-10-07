import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface TimelinePoint {
  date: string;
  areaKm2: number;
}

interface Props {
  timeline: TimelinePoint[];
  onSelectDate?: (date: string) => void;
}

export const TimelineChart: React.FC<Props> = ({ timeline, onSelectDate }) => {
  return (
    <div className="w-full h-48 bg-slate-950/80 rounded-xl p-2 border border-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={timeline}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          onClick={(e: any) => {
            if (e && e.activePayload && e.activePayload.length > 0) {
              const selectedPoint = e.activePayload[0].payload;
              if (onSelectDate && selectedPoint.date) {
                onSelectDate(selectedPoint.date);
              }
            }
          }}
        >
          <defs>
            <linearGradient id="floodAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#06b6d4',
              borderRadius: '0.5rem',
              color: '#f8fafc',
              fontSize: '12px'
            }}
            formatter={(value: any) => [`${value} km²`, 'Flooded Extent']}
          />
          <Area
            type="monotone"
            dataKey="areaKm2"
            stroke="#06b6d4"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#floodAreaGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
