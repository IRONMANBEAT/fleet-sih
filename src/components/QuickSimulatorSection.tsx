import React from 'react';
import {
  Compass,
  Waves,
  DollarSign,
  ArrowRight,
  Zap,
  TrendingDown,
  Leaf,
  Award,
  Maximize2,
  CheckCircle2,
  Sliders,
  Ship,
  Clock,
  Flame,
  ShieldCheck,
  Scale,
  Activity,
  Gauge
} from 'lucide-react';
import { CargoContract, SimulationParams, VoyageAnalytics, WeatherCondition } from '../types';
import { formatUsd, formatNumber } from '../utils/calculations';

interface QuickSimulatorSectionProps {
  contracts: CargoContract[];
  selectedContractId: string;
  onSelectContract: (id: string) => void;
  params: SimulationParams;
  onUpdateParams: (newParams: Partial<SimulationParams>) => void;
  analytics: VoyageAnalytics;
  onOpenRouteModal: () => void;
  onOpenCarbonModal: () => void;
}

export const QuickSimulatorSection: React.FC<QuickSimulatorSectionProps> = ({
  contracts,
  selectedContractId,
  onSelectContract,
  params,
  onUpdateParams,
  analytics,
  onOpenRouteModal,
  onOpenCarbonModal,
}) => {
  const currentContract = contracts.find((c) => c.id === selectedContractId) || contracts[0];

  return (
    <section id="voyage-sandbox" className="w-full py-16 px-4 sm:px-8 bg-[#091527] border-b border-white/10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header with Maritime Operational Context */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-blue-200 text-xs font-mono">
              <Sliders className="w-3.5 h-3.5 text-cyan-300" />
              <span>LIVE VOYAGE CALCULATOR — SIMULATION SANDBOX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dynamic Voyage Hydrodynamics & Fuel Blending
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Test voyage emission abatement across active commercial lanes. Tune carbon tax penalties and wave resistance to observe instant OPEX cuts and attained CII rating shifts.
            </p>
          </div>

          <button
            onClick={onOpenRouteModal}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#0B1A30] bg-white hover:bg-slate-100 border border-white shadow-navy-card flex items-center gap-2 transition-all cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 text-[#0B1A30]" />
            <span>Expand Full Simulator Dialog</span>
          </button>
        </div>

        {/* Realistic Master Control Sandbox Container */}
        <div className="w-full rounded-2xl liquid-glass-navy p-5 sm:p-7 space-y-6 shadow-navy-floating overflow-hidden">
          {/* 1. Active Shipping Corridor Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Ship className="w-3.5 h-3.5 text-blue-300" />
                <span>Active Commercial Corridor — Charter Manifest</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">Select lane to recalibrate</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {contracts.map((c) => {
                const isSelected = c.id === selectedContractId;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectContract(c.id)}
                    className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'liquid-glass-white text-[#0B1A30] shadow-navy-card ring-2 ring-blue-500/50'
                        : 'bg-[#11233D]/90 hover:bg-[#152B4B] border-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className={isSelected ? 'text-[#0B1A30]' : 'text-white'}>
                        {c.fromPort} — {c.toPort}
                      </span>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-blue-100 text-blue-900 font-bold' : 'bg-black/30 text-cyan-300'}`}>
                        {c.nauticalMiles} NM
                      </span>
                    </div>
                    <div className={`text-xs mt-2 space-y-0.5 ${isSelected ? 'text-slate-700' : 'text-slate-300'}`}>
                      <div className="flex justify-between">
                        <span>Payload — {(c.weightTons / 1000).toFixed(0)}k DWT ({c.cargoType.split(' ')[0]})</span>
                        <span className="font-semibold text-amber-500 font-mono">Max {c.deadlineDays}d</span>
                      </div>
                      <div className="flex justify-between text-[11px] opacity-80 pt-0.5">
                        <span>Charter Rate — {formatUsd(c.charterRevenueUsd)}</span>
                        <span>BIMCO CII Clause</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Operational Control Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-[#0B1A30]/80 border border-white/10 shadow-inner">
            {/* Carbon Tax Rate Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>IMO Carbon Tax Rate — Sensitivity Levy</span>
                </span>
                <span className="font-mono font-bold text-white bg-emerald-800/80 border border-emerald-500/40 px-2.5 py-0.5 rounded shadow-sm text-xs">
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
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>$0 (Baseline Free)</span>
                <span>$85 (Target 2026 Level)</span>
                <span>$200 (Strict EU ETS)</span>
              </div>
            </div>

            {/* Sea State & Wave Swell Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-cyan-300" />
                  <span>Hydrodynamic Swell Resistance — Arabian Sea</span>
                </span>
                <span className="font-mono font-bold text-cyan-300 text-xs bg-cyan-950/80 border border-cyan-800 px-2.5 py-0.5 rounded">
                  Hs = {params.waveHeightMeters.toFixed(1)}m — {params.windSpeedKnots} kn Wind
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['calm', 'moderate', 'monsoon'] as const).map((cond) => {
                  const isActive = params.weatherCondition === cond;
                  const label =
                    cond === 'calm'
                      ? 'Calm — 1.0m'
                      : cond === 'moderate'
                      ? 'Moderate — 2.5m'
                      : 'Monsoon — 4.5m';
                  return (
                    <button
                      key={cond}
                      onClick={() => {
                        const wave = cond === 'calm' ? 1.0 : cond === 'moderate' ? 2.5 : 4.5;
                        onUpdateParams({
                          weatherCondition: cond,
                          waveHeightMeters: wave,
                          windSpeedKnots: Math.round(wave * 8),
                        });
                      }}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-white text-[#0B1A30] border-white shadow-md'
                          : 'bg-[#142645] border-white/10 text-slate-300 hover:text-white hover:bg-[#1A3158]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Comparative Outcome Board */}
          <div className="p-6 rounded-xl liquid-glass-white text-[#0B1A30] shadow-navy-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs uppercase font-mono font-bold text-blue-900 tracking-wider">
                  Live Voyage Abatement Comparison
                </span>
                <h3 className="text-base font-extrabold text-[#0B1A30]">
                  Corridor {currentContract.fromPort} — {currentContract.toPort} ({currentContract.nauticalMiles} NM)
                </h3>
              </div>

              {/* Mode Toggle with Em Dash */}
              <div className="inline-flex rounded-xl border border-slate-300 bg-slate-100 p-1 shadow-inner">
                <button
                  onClick={() => onUpdateParams({ isOptimized: false })}
                  className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                    !params.isOptimized
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Baseline — 19.0 Knots
                </button>
                <button
                  onClick={() => onUpdateParams({ isOptimized: true })}
                  className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                    params.isOptimized
                      ? 'bg-[#0B1A30] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  QuantMarine — 14.4 Knots
                </button>
              </div>
            </div>

            {/* 4 Crisp Output Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Metric 1: Net Voyage Savings */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>Net OPEX Savings</span>
                  <span className="text-emerald-700 font-mono">-{analytics.netSavingsPercent}%</span>
                </div>
                <div className="text-2xl font-black font-mono text-[#0B1A30]">
                  -{formatUsd(analytics.netSavingsUsd)}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 font-medium">
                  Direct bunker savings — ${analytics.optimizedFuelCost.toLocaleString()} total
                </p>
              </div>

              {/* Metric 2: Carbon Emissions */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>GHG Abatement</span>
                  <span className="text-blue-700 font-mono">-{analytics.ghgAbatementPercent}%</span>
                </div>
                <div className="text-2xl font-black font-mono text-blue-900">
                  -{formatNumber(analytics.ghgAbatementTons)} <span className="text-sm font-bold text-slate-500">t CO₂e</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 font-medium">
                  Fuel burn cut to {analytics.optimizedFuelBurnTons} t — {analytics.optimizedDays} days voyage
                </p>
              </div>

              {/* Metric 3: CII Grade Rating */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>Attained IMO CII</span>
                  <span className="text-emerald-700 font-mono font-bold">Grade A</span>
                </div>
                <div className="flex items-baseline gap-2 text-2xl font-black font-mono text-emerald-700">
                  <span>Grade {analytics.optimizedCii}</span>
                  <span className="text-xs text-slate-500 font-normal line-through">
                    Grade {analytics.baselineCii}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1 font-semibold">
                  +$24,000 port penalties avoided — SEEMP-III pass
                </p>
              </div>

              {/* Metric 4: Fuel Blend Ratio */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>Optimal Fuel Blend</span>
                  <span className="text-blue-800 font-mono">LNG + MGO</span>
                </div>
                <div className="text-base font-black font-mono text-[#0B1A30] mt-1">
                  {analytics.fuelBlendRecommended.cleanFuel}% LNG / {analytics.fuelBlendRecommended.diesel}% MGO
                </div>
                <p className="text-[11px] text-slate-600 mt-1 font-medium">
                  Dual-fuel injection curve — IMO 2030 compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
