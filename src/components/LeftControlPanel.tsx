import React from 'react';
import {
  Package,
  Clock,
  Navigation,
  Wind,
  Waves,
  Zap,
  SlidersHorizontal,
  Flame,
  ShieldAlert,
  Compass,
  Cpu,
  CheckCircle2,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { CargoContract, SimulationParams, WeatherCondition } from '../types';

interface LeftControlPanelProps {
  contracts: CargoContract[];
  selectedContractId: string;
  onSelectContract: (id: string) => void;
  params: SimulationParams;
  onUpdateParams: (newParams: Partial<SimulationParams>) => void;
  onRunOptimization: () => void;
}

export const LeftControlPanel: React.FC<LeftControlPanelProps> = ({
  contracts,
  selectedContractId,
  onSelectContract,
  params,
  onUpdateParams,
  onRunOptimization,
}) => {
  const selectedContract = contracts.find((c) => c.id === selectedContractId) || contracts[0];

  const handleWeatherToggle = (cond: WeatherCondition) => {
    if (cond === 'calm') {
      onUpdateParams({
        weatherCondition: 'calm',
        waveHeightMeters: 1.0,
        windSpeedKnots: 8,
      });
    } else if (cond === 'moderate') {
      onUpdateParams({
        weatherCondition: 'moderate',
        waveHeightMeters: 2.5,
        windSpeedKnots: 20,
      });
    } else {
      onUpdateParams({
        weatherCondition: 'monsoon',
        waveHeightMeters: 4.5,
        windSpeedKnots: 35,
      });
    }
  };

  return (
    <aside className="w-full lg:w-80 xl:w-[22rem] shrink-0 bg-[#080C14] border-r border-slate-800/90 flex flex-col h-full overflow-y-auto custom-scrollbar p-3.5 space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-cyan-400"></div>
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
            Control Center // Voyage
          </h2>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/60 border border-cyan-800/50 px-1.5 py-0.5 rounded">
          Q-SWARM v3.2
        </span>
      </div>

      {/* 1. Cargo Contracts Drawer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Cargo Orders</span>
          </label>
          <span className="text-[10px] font-mono text-slate-400">3 Available</span>
        </div>

        <div className="space-y-2">
          {contracts.map((c) => {
            const isSelected = c.id === selectedContractId;
            return (
              <button
                key={c.id}
                onClick={() => onSelectContract(c.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#0D1525] border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50'
                    : 'bg-[#0A0F1A] border-slate-800/80 hover:border-slate-700 hover:bg-[#0D1525]/60 text-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white truncate">
                      <span className="text-cyan-300">{c.fromPort}</span>
                      <span className="text-slate-500 font-mono">➔</span>
                      <span className="text-emerald-300">{c.toPort}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>{(c.weightTons / 1000).toFixed(0)}k t {c.cargoType.split(' ')[0]}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-300">{c.nauticalMiles} NM</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-mono font-medium text-amber-300 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{c.deadlineDays}d max</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      ${(c.charterRevenueUsd / 1000).toFixed(0)}k Rev
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Global Simulation Sliders */}
      <div className="p-3 rounded-xl bg-[#0D1525]/90 border border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800/60">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Environmental & Policy Drivers</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400/80">Real-time Model</span>
        </div>

        {/* Carbon Tax Severity Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-amber-400" />
              <span>Carbon Tax Severity:</span>
            </span>
            <span className="font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-800/60 px-1.5 py-0.5 rounded text-[11px]">
              ${params.carbonTax}/ton CO₂
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="200"
            step="5"
            value={params.carbonTax}
            onChange={(e) => onUpdateParams({ carbonTax: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>$0 (No Levy)</span>
            <span className={params.carbonTax >= 85 ? 'text-amber-400 font-semibold' : ''}>$85 (IMO Target)</span>
            <span>$200 (EU ETS Peak)</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug pt-0.5">
            {params.carbonTax >= 100 ? (
              <span className="text-cyan-300">
                High tax regime triggers algorithm to enforce <strong className="text-white">75%+ clean fuel mix</strong> (LNG/Methanol).
              </span>
            ) : params.carbonTax >= 50 ? (
              <span>Moderate tax balances clean fuel premium against baseline MGO emission penalties.</span>
            ) : (
              <span className="text-slate-400">Zero/low tax: traditional vessels default to dirty MGO without incentive.</span>
            )}
          </p>
        </div>

        {/* Weather Drag Factor / Monsoon Toggle */}
        <div className="space-y-2 pt-1 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1">
              <Waves className="w-3.5 h-3.5 text-blue-400" />
              <span>Arabian Sea Weather:</span>
            </span>
            <span className="font-mono font-bold text-blue-300 text-[11px]">
              {params.waveHeightMeters.toFixed(1)}m swell • {params.windSpeedKnots}kt
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleWeatherToggle('calm')}
              className={`py-1.5 px-2 rounded-md text-[11px] font-medium border text-center transition-all cursor-pointer ${
                params.weatherCondition === 'calm'
                  ? 'bg-blue-950/60 border-blue-500 text-blue-200 shadow-sm font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Calm (1m)
            </button>
            <button
              onClick={() => handleWeatherToggle('moderate')}
              className={`py-1.5 px-2 rounded-md text-[11px] font-medium border text-center transition-all cursor-pointer ${
                params.weatherCondition === 'moderate'
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200 shadow-sm font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Moderate (2.5m)
            </button>
            <button
              onClick={() => handleWeatherToggle('monsoon')}
              className={`py-1.5 px-2 rounded-md text-[11px] font-medium border text-center transition-all cursor-pointer ${
                params.weatherCondition === 'monsoon'
                  ? 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-sm font-semibold animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Monsoon (4.5m)
            </button>
          </div>

          {/* Dynamic wave height slider for precision */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Significant Wave Height (Hs)</span>
              <span className="text-cyan-400 font-semibold">{params.waveHeightMeters.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="5.0"
              step="0.1"
              value={params.waveHeightMeters}
              onChange={(e) => {
                const val = Number(e.target.value);
                const cond: WeatherCondition = val < 1.8 ? 'calm' : val < 3.2 ? 'moderate' : 'monsoon';
                onUpdateParams({
                  waveHeightMeters: val,
                  windSpeedKnots: Math.round(val * 8),
                  weatherCondition: cond,
                });
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />
          </div>
        </div>

        {/* State comparison quick toggle */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-300 font-medium">Active Voyage Strategy:</span>
          <div className="inline-flex rounded-lg border border-slate-700 bg-slate-900/90 p-0.5">
            <button
              onClick={() => onUpdateParams({ isOptimized: false })}
              className={`px-2 py-1 text-[10px] font-mono rounded cursor-pointer transition-all ${
                !params.isOptimized
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Baseline
            </button>
            <button
              onClick={() => onUpdateParams({ isOptimized: true })}
              className={`px-2 py-1 text-[10px] font-mono rounded cursor-pointer transition-all ${
                params.isOptimized
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Quantum QPSO
            </button>
          </div>
        </div>
      </div>

      {/* 3. The Master CTA Button */}
      <div className="pt-1">
        <button
          onClick={onRunOptimization}
          disabled={params.isOptimizing}
          className={`w-full relative group py-3.5 px-4 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden border ${
            params.isOptimizing
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
              : params.isOptimized
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-400 border-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.35)]'
          }`}
        >
          {/* Glowing pulse background */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          {params.isOptimizing && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full animate-[shimmer_1.2s_infinite]" />
          )}

          <div className="relative flex items-center justify-center gap-2">
            {params.isOptimizing ? (
              <>
                <Cpu className="w-4 h-4 text-cyan-300 animate-spin" />
                <span>QPSO TUNNELING SIMULATION...</span>
              </>
            ) : params.isOptimized ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>[ RE-RUN QUANTUM OPTIMIZATION ]</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-200 animate-bounce" />
                <span>[ RUN QUANTUM OPTIMIZATION ]</span>
              </>
            )}
          </div>
        </button>

        <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
          <span>Target: Arabian Sea Corridor</span>
          <span className="text-cyan-400/80 font-medium">QPSO-100 Iterations</span>
        </div>
      </div>
    </aside>
  );
};
