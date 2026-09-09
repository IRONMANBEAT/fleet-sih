import React from 'react';
import {
  TrendingDown,
  Leaf,
  ShieldCheck,
  FileText,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Award,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { VoyageAnalytics, SimulationParams } from '../types';
import { formatUsd, formatNumber } from '../utils/calculations';

interface RightAnalyticsPanelProps {
  analytics: VoyageAnalytics;
  params: SimulationParams;
  onOpenReportModal: () => void;
}

export const RightAnalyticsPanel: React.FC<RightAnalyticsPanelProps> = ({
  analytics,
  params,
  onOpenReportModal,
}) => {
  // Recharts data for Comparative Breakdown
  const chartData = [
    {
      category: 'Fuel Cost',
      Baseline: analytics.baselineFuelCost,
      'Quantum Optimized': analytics.optimizedFuelCost,
    },
    {
      category: 'Carbon Tax',
      Baseline: analytics.baselineCarbonTaxCost,
      'Quantum Optimized': analytics.optimizedCarbonTaxCost,
    },
    {
      category: 'Total OPEX',
      Baseline: analytics.baselineTotalCost,
      'Quantum Optimized': analytics.optimizedTotalCost,
    },
  ];

  return (
    <aside className="w-full lg:w-80 xl:w-[26rem] shrink-0 bg-[#080C14] border-l border-slate-800/90 flex flex-col h-full overflow-y-auto custom-scrollbar p-3.5 space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-emerald-400"></div>
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
            ROI & Decarbonization Audit
          </h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded">
          IMO MEPC-76
        </span>
      </div>

      {/* Top Metric Badges (The "Punchline") */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Net OPEX Savings Card */}
        <div className="p-3 rounded-xl bg-gradient-to-b from-[#0D1E18] to-[#0A1612] border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-15 text-emerald-400">
            <DollarSign className="w-12 h-12 -mt-2 -mr-2" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>Net OPEX Savings</span>
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
              -{analytics.netSavingsPercent}%
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-mono text-white tracking-tight">
              -{formatUsd(analytics.netSavingsUsd)}
            </div>
            <div className="text-[10px] font-mono text-emerald-400/90 mt-0.5">
              Per single Arabian Sea transit
            </div>
          </div>
        </div>

        {/* GHG Abatement Card */}
        <div className="p-3 rounded-xl bg-gradient-to-b from-[#0B1A24] to-[#08131C] border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-15 text-cyan-400">
            <Leaf className="w-12 h-12 -mt-2 -mr-2" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-cyan-400" />
              <span>GHG Abatement</span>
            </span>
            <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">
              -{analytics.ghgAbatementPercent}%
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold font-mono text-white tracking-tight">
              -{formatNumber(analytics.ghgAbatementTons)} <span className="text-sm font-normal text-slate-400">t CO₂e</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400/90 mt-0.5">
              Down from {formatNumber(analytics.baselineCo2Tons)}t to {formatNumber(analytics.optimizedCo2Tons)}t
            </div>
          </div>
        </div>
      </div>

      {/* CII Rating Transformation Badge */}
      <div className="p-3.5 rounded-xl bg-[#0D1525] border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>IMO CII Rating Transformation</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">VERIFIED</span>
        </div>

        <div className="p-3 rounded-lg bg-[#080C14] border border-slate-800 flex items-center justify-around">
          {/* Baseline Grade D */}
          <div className="text-center">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">Baseline Ops</span>
            <div className="w-12 h-12 rounded-lg bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center text-rose-300 text-xl font-black font-mono shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              {analytics.baselineCii}
            </div>
            <span className="text-[9px] font-mono text-rose-400 block mt-1">Non-Compliant</span>
          </div>

          <div className="flex flex-col items-center justify-center text-slate-500">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">QPSO OPT</span>
            <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>

          {/* Optimized Grade A */}
          <div className="text-center">
            <span className="text-[10px] font-mono text-emerald-400 block mb-1">Quantum Fleet</span>
            <div className="w-12 h-12 rounded-lg bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 text-xl font-black font-mono shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              {analytics.optimizedCii}
            </div>
            <span className="text-[9px] font-mono text-emerald-400 block mt-1">Top Tier</span>
          </div>
        </div>

        <div className="p-2 rounded-md bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Avoided $24,000</strong> in IMO Port State Control Defect Penalties and detention insurance risk.
          </span>
        </div>
      </div>

      {/* Comparative Breakdown (Recharts Bar Chart) */}
      <div className="p-3.5 rounded-xl bg-[#0D1525] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cost Comparison Breakdown (USD)</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Baseline vs. QPSO</span>
        </div>

        <div className="h-56 w-full font-mono text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94A3B8"
                fontSize={10}
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2.5 bg-[#080C14] border border-slate-700 rounded-lg shadow-xl text-xs font-mono space-y-1">
                        <p className="text-white font-bold">{label}</p>
                        {payload.map((entry, idx) => (
                          <div key={idx} className="flex justify-between gap-4 text-[11px]">
                            <span style={{ color: entry.color }}>{entry.name}:</span>
                            <span className="font-bold text-white">{formatUsd(Number(entry.value))}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ fontSize: '10px', paddingBottom: '8px' }}
              />
              <Bar dataKey="Baseline" name="Baseline (Dirty MGO)" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Quantum Optimized" name="Quantum (75% LNG)" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown details */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded bg-[#080C14] border border-slate-800 text-slate-300">
            <span className="text-slate-400 block text-[10px]">Speed & ETA</span>
            <span className="font-bold text-emerald-400">{analytics.optimizedSpeedKnots} kn</span>
            <span className="text-slate-400 text-[10px] block">ETA: {analytics.optimizedDays} days</span>
          </div>
          <div className="p-2 rounded bg-[#080C14] border border-slate-800 text-slate-300">
            <span className="text-slate-400 block text-[10px]">Fuel Blend</span>
            <span className="font-bold text-cyan-300">
              {analytics.fuelBlendRecommended.cleanFuel}% {analytics.fuelBlendRecommended.cleanFuelType}
            </span>
            <span className="text-slate-400 text-[10px] block">{analytics.fuelBlendRecommended.diesel}% Marine Diesel</span>
          </div>
        </div>
      </div>

      {/* Executive Export Button */}
      <div className="pt-1">
        <button
          onClick={onOpenReportModal}
          className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold text-cyan-200 bg-[#0D1525] hover:bg-[#131F35] border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
          <span>[ DOWNLOAD IMO COMPLIANCE REPORT (PDF) ]</span>
        </button>
        <span className="block text-center text-[10px] font-mono text-slate-500 mt-1.5">
          Audited under SEEMP-III Guidelines (IMO Res. MEPC.346)
        </span>
      </div>
    </aside>
  );
};
