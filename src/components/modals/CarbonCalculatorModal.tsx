import React from 'react';
import {
  X,
  DollarSign,
  Leaf,
  Award,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Download,
  Sliders,
  CheckCircle2,
  FileCheck,
  Scale,
  BarChart3,
  Waves
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { CargoContract, FuelPrices, SimulationParams, VoyageAnalytics } from '../../types';
import { formatUsd, formatNumber } from '../../utils/calculations';

interface CarbonCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: VoyageAnalytics;
  params: SimulationParams;
  onUpdateParams: (newParams: Partial<SimulationParams>) => void;
  onOpenReport: () => void;
}

export const CarbonCalculatorModal: React.FC<CarbonCalculatorModalProps> = ({
  isOpen,
  onClose,
  analytics,
  params,
  onUpdateParams,
  onOpenReport,
}) => {
  if (!isOpen) return null;

  const chartData = [
    {
      category: 'Bunker Fuel',
      Baseline: analytics.baselineFuelCost,
      'QuantMarine Optimized': analytics.optimizedFuelCost,
    },
    {
      category: 'Carbon Tax Levy',
      Baseline: analytics.baselineCarbonTaxCost,
      'QuantMarine Optimized': analytics.optimizedCarbonTaxCost,
    },
    {
      category: 'Total Voyage OPEX',
      Baseline: analytics.baselineTotalCost,
      'QuantMarine Optimized': analytics.optimizedTotalCost,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0C1A2F] border border-white/15 rounded-2xl shadow-navy-floating overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header — Navy & White Theme */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#081324] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
              <DollarSign className="w-5 h-5 text-[#0B1A30]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight font-sans">
                  Carbon Tax Exposure & IMO CII ROI Calculator
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded shadow-sm">
                  MEPC.328(76)
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Sensitivity modeling for bunker fuel expenditure, carbon levies, and CII grade progression
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Interactive Simulation Sliders Box */}
          <div className="p-5 rounded-xl liquid-glass-navy border border-white/15 shadow-navy-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Adjust Carbon Tax Rate — Global Sensitivity ($0 — $200 / ton CO₂)</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#0B1A30] bg-white px-3 py-1 rounded-md shadow-sm">
                ${params.carbonTax} / ton CO₂
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={params.carbonTax}
              onChange={(e) => onUpdateParams({ carbonTax: Number(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-300">
              <span>$0 (No Carbon Price)</span>
              <span>$85 (Target IMO 2026 Level)</span>
              <span>$200 (Aggressive EU ETS Trajectory)</span>
            </div>
          </div>

          {/* 4 Outcome Cards in Liquid Glass White */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl liquid-glass-white text-[#0B1A30] shadow-navy-card">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Net Voyage Savings</span>
                <span className="text-emerald-700 font-mono">-{analytics.netSavingsPercent}%</span>
              </div>
              <div className="text-2xl font-black font-mono text-[#0B1A30]">
                -{formatUsd(analytics.netSavingsUsd)}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">
                Combined bunker + tax savings per voyage transit
              </p>
            </div>

            <div className="p-4 rounded-xl liquid-glass-white text-[#0B1A30] shadow-navy-card">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                <span>GHG Abatement</span>
                <span className="text-blue-700 font-mono">-{analytics.ghgAbatementPercent}%</span>
              </div>
              <div className="text-2xl font-black font-mono text-blue-900">
                -{formatNumber(analytics.ghgAbatementTons)} <span className="text-sm font-bold text-slate-500">t</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">
                Direct emissions reduction via 75% LNG blending
              </p>
            </div>

            <div className="p-4 rounded-xl liquid-glass-white text-[#0B1A30] shadow-navy-card">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Attained IMO CII</span>
                <span className="text-emerald-700 font-mono font-bold">Grade A</span>
              </div>
              <div className="flex items-baseline gap-2 text-2xl font-black font-mono text-emerald-700">
                <span>Grade {analytics.optimizedCii}</span>
                <span className="text-xs text-slate-400 font-normal line-through">
                  Grade {analytics.baselineCii}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold">
                Compliant with IMO Resolution MEPC.346
              </p>
            </div>

            <div className="p-4 rounded-xl liquid-glass-white text-[#0B1A30] shadow-navy-card">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Avoided Fines</span>
                <span className="text-teal-700 font-mono">PSC Clear</span>
              </div>
              <div className="text-2xl font-black font-mono text-[#0B1A30]">
                +$24,000
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">
                Avoided Port State Control inspection detention
              </p>
            </div>
          </div>

          {/* Comparative Cost Bar Chart */}
          <div className="p-5 rounded-xl liquid-glass-navy border border-white/10 shadow-navy-card space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-300" />
                <span>Voyage Cost Breakdown — Baseline vs. QuantMarine ($ USD)</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-300">
                Fuel Burn: {analytics.optimizedFuelBurnTons} t vs. {analytics.baselineFuelBurnTons} t
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#233a5d" vertical={false} />
                  <XAxis
                    dataKey="category"
                    stroke="#94a3b8"
                    tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: '#cbd5e1', fontSize: 11 }}
                    tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Cost']}
                    contentStyle={{
                      backgroundColor: '#071222',
                      borderColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Baseline" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="QuantMarine Optimized" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified under BIMCO Carbon Intensity Indicator Operations Clause 2022</span>
            </div>

            <button
              onClick={onOpenReport}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1A30] font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-[#0B1A30]" />
              <span>Generate Official IMO Audit Certificate</span>
              <ArrowRight className="w-4 h-4 text-[#0B1A30]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
