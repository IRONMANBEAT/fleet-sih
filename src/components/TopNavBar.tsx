import React, { useState } from 'react';
import { Anchor, Activity, DollarSign, Flame, Sparkles, Sliders, ChevronDown, Check, RefreshCw } from 'lucide-react';
import { FuelPrices } from '../types';

interface TopNavBarProps {
  fuelPrices: FuelPrices;
  onUpdateFuelPrice: (key: keyof FuelPrices, value: number) => void;
  onLaunchJudgeDemo: () => void;
  onResetDemo: () => void;
  isOptimized: boolean;
  isOptimizing: boolean;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  fuelPrices,
  onUpdateFuelPrice,
  onLaunchJudgeDemo,
  onResetDemo,
  isOptimized,
  isOptimizing,
}) => {
  const [editingCarbonTax, setEditingCarbonTax] = useState(false);
  const [tempTax, setTempTax] = useState(fuelPrices.carbonTax.toString());

  const handleTaxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(tempTax);
    if (!isNaN(val) && val >= 0 && val <= 300) {
      onUpdateFuelPrice('carbonTax', val);
    }
    setEditingCarbonTax(false);
  };

  return (
    <header className="w-full bg-[#080C14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none sticky top-0 z-50">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <Anchor className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div className="absolute -inset-0.5 rounded-lg bg-cyan-500/10 blur-sm -z-10" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-base text-white font-mono">QUANTMARINE</span>
            <span className="text-cyan-500 font-mono text-xs">//</span>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1">
              Green Fleet Mission Control
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
            <span>IMO MEPC.328(76) / SEEMP-III COMPLIANT</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400/80">LAT 18.95°N / LNG DUAL-FUEL CORE</span>
          </div>
        </div>
      </div>

      {/* Global Macro Tickers */}
      <div className="hidden xl:flex items-center gap-2 bg-[#0D1525] border border-slate-800 rounded-lg px-3 py-1.5 font-mono text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 pr-2.5 border-r border-slate-800">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-slate-400">MGO:</span>
          <span className="font-semibold text-slate-200">${fuelPrices.mgo}/t</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 px-2.5 border-r border-slate-800">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="text-slate-400">LNG:</span>
          <span className="font-semibold text-cyan-300">${fuelPrices.lng}/t</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 px-2.5 border-r border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-slate-400">Methanol:</span>
          <span className="font-semibold text-emerald-300">${fuelPrices.methanol}/t</span>
        </div>

        {/* Interactive IMO Global Carbon Tax */}
        <div className="relative flex items-center gap-1.5 pl-2">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">IMO Carbon Tax:</span>
          {editingCarbonTax ? (
            <form onSubmit={handleTaxSubmit} className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="300"
                value={tempTax}
                onChange={(e) => setTempTax(e.target.value)}
                autoFocus
                onBlur={handleTaxSubmit}
                className="w-16 bg-[#131F35] border border-cyan-500 text-cyan-300 px-1 py-0.5 rounded text-xs font-mono outline-none"
              />
              <button type="submit" className="text-emerald-400 hover:text-emerald-300">
                <Check className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => {
                setTempTax(fuelPrices.carbonTax.toString());
                setEditingCarbonTax(true);
              }}
              title="Click to edit IMO Global Carbon Tax"
              className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 bg-amber-950/40 border border-amber-800/60 px-1.5 py-0.5 rounded transition-colors group cursor-pointer"
            >
              <span>${fuelPrices.carbonTax}/t CO₂</span>
              <span className="text-[10px] text-amber-500/70 group-hover:text-amber-300">✎</span>
            </button>
          )}
        </div>
      </div>

      {/* System Status & Demo Mode Actions */}
      <div className="flex items-center gap-2.5">
        {/* System Status Pill Badge */}
        <div className="flex items-center gap-2 bg-[#0D1525] border border-slate-800/90 rounded-full px-3 py-1 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOptimizing ? 'bg-cyan-400' : 'bg-emerald-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOptimizing ? 'bg-cyan-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="font-mono text-xs text-slate-300 font-medium">
            {isOptimizing ? (
              <span className="text-cyan-400 animate-pulse">QPSO Engine: Quantum Tunneling...</span>
            ) : isOptimized ? (
              <span className="text-emerald-400">QPSO Engine: Fleet Optimized (6 Vessels)</span>
            ) : (
              <span className="text-slate-300">QPSO Engine: Ready (6 Vessels Active)</span>
            )}
          </span>
        </div>

        {/* 90s Judge Demo Walkthrough Trigger */}
        <button
          onClick={onLaunchJudgeDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/80 to-blue-950/80 hover:from-cyan-900/90 hover:to-blue-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all cursor-pointer hover:border-cyan-400 active:scale-95"
          title="Start 90-Second Judge Interactive Demo Loop"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>90s Demo Script</span>
        </button>

        {/* Quick Reset */}
        <button
          onClick={onResetDemo}
          className="p-1.5 rounded-lg bg-[#0D1525] hover:bg-[#131F35] border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          title="Reset Simulation to Baseline"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
