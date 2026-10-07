import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'cyan' | 'blue' | 'purple' | 'amber' | 'emerald';
}

export const StatsCard: React.FC<Props> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'cyan'
}) => {
  const colorStyles = {
    cyan: 'from-cyan-500/10 to-slate-900 border-cyan-500/30 text-cyan-400',
    blue: 'from-blue-500/10 to-slate-900 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/10 to-slate-900 border-purple-500/30 text-purple-400',
    amber: 'from-amber-500/10 to-slate-900 border-amber-500/30 text-amber-400',
    emerald: 'from-emerald-500/10 to-slate-900 border-emerald-500/30 text-emerald-400'
  };

  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorStyles[color]} border backdrop-blur-md space-y-2 shadow-lg transition-all hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">{title}</span>
        <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-black text-slate-100 font-mono tracking-tight">{value}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>}
      </div>
      {trend && (
        <div className="text-[11px] font-semibold text-cyan-300 pt-1 border-t border-slate-800/80 flex items-center gap-1">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
