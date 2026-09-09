import React, { useState } from 'react';
import {
  X,
  Compass,
  Wind,
  Waves,
  Navigation,
  ShieldCheck,
  Zap,
  Info,
  Maximize2,
  Clock,
  Ship,
  Anchor,
  MapPin,
  CheckCircle2,
  Activity,
  Gauge
} from 'lucide-react';
import { MaritimeMap } from '../MaritimeMap';
import { CONTRACTS, INITIAL_VESSELS } from '../../data/mockData';
import { CargoContract, SimulationParams, Vessel } from '../../types';

interface RouteOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: SimulationParams;
  onUpdateParams: (newParams: Partial<SimulationParams>) => void;
  onRunOptimization: () => void;
}

export const RouteOptimizerModal: React.FC<RouteOptimizerModalProps> = ({
  isOpen,
  onClose,
  params,
  onUpdateParams,
  onRunOptimization,
}) => {
  const [selectedContractId, setSelectedContractId] = useState<string>(CONTRACTS[0].id);
  const [selectedVesselId, setSelectedVesselId] = useState<string>(INITIAL_VESSELS[0].id);

  if (!isOpen) return null;

  const currentContract = CONTRACTS.find((c) => c.id === selectedContractId) || CONTRACTS[0];
  const currentVessel = INITIAL_VESSELS.find((v) => v.id === selectedVesselId) || INITIAL_VESSELS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0C1A2F] border border-white/15 rounded-2xl shadow-navy-floating overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header — Navy Blue & White theme */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#081324] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
              <Compass className="w-5 h-5 text-[#0B1A30]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight font-sans">
                  Interactive Maritime Route Optimizer
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded shadow-sm">
                  ARABIAN SEA — CH 87B
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Hydrodynamic weather routing & slow-steaming trajectory — Arabian Sea & Gulf of Oman
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Corridor Selection & Quick Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CONTRACTS.map((contract) => {
              const isSelected = contract.id === selectedContractId;
              return (
                <button
                  key={contract.id}
                  onClick={() => setSelectedContractId(contract.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'liquid-glass-white text-[#0B1A30] shadow-navy-card ring-2 ring-blue-400'
                      : 'bg-[#11233D] hover:bg-[#162D4E] border-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={isSelected ? 'text-[#0B1A30]' : 'text-white'}>
                      {contract.fromPort} — {contract.toPort}
                    </span>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-blue-100 text-blue-900 font-bold' : 'bg-black/40 text-cyan-300'}`}>
                      {contract.nauticalMiles} NM
                    </span>
                  </div>
                  <div className={`text-xs mt-1.5 space-y-0.5 ${isSelected ? 'text-slate-700' : 'text-slate-300'}`}>
                    <div className="flex items-center justify-between">
                      <span>Payload — {(contract.weightTons / 1000).toFixed(0)}k DWT ({contract.cargoType.split(' ')[0]})</span>
                      <span className="font-semibold text-amber-500 font-mono">Max {contract.deadlineDays}d</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Environmental Controls Strip */}
          <div className="p-4 rounded-xl liquid-glass-navy border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs shadow-navy-card">
            {/* Wave Swell */}
            <div className="flex items-center gap-3">
              <span className="text-slate-200 font-bold flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-cyan-300" />
                <span>Monsoon Wave Swell:</span>
              </span>
              <div className="flex gap-1.5">
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-white text-[#0B1A30] border-white shadow-sm'
                          : 'bg-[#152845] border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Toggles */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onUpdateParams({ isOptimized: !params.isOptimized })}
                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  params.isOptimized
                    ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-sm'
                    : 'bg-rose-950/80 border-rose-500/60 text-rose-300'
                }`}
              >
                {params.isOptimized ? '✓ Quantum Route Active (14.4 kn)' : '⚠ Direct Baseline Active (19 kn)'}
              </button>

              <button
                onClick={onRunOptimization}
                disabled={params.isOptimizing}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-[#0B1A30] font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#0B1A30]" />
                <span>{params.isOptimizing ? 'Recalculating...' : 'Recalculate Path'}</span>
              </button>
            </div>
          </div>

          {/* Maritime Map Container */}
          <div className="h-96 w-full rounded-xl overflow-hidden border border-white/10 shadow-navy-card relative">
            <MaritimeMap
              contracts={CONTRACTS}
              selectedContractId={selectedContractId}
              vessels={INITIAL_VESSELS}
              selectedVesselId={selectedVesselId}
              onSelectVessel={setSelectedVesselId}
              params={params}
            />
          </div>

          {/* Operational Hydrodynamics Guidance */}
          <div className="p-3.5 rounded-xl liquid-glass-navy border border-white/10 flex items-start gap-3 text-xs text-slate-200">
            <Info className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Hydrodynamic Analysis —</strong> The weather-routed green trajectory circumvents high significant wave heights (Hs {params.waveHeightMeters.toFixed(1)}m) in the central Arabian Sea. By gently arcing southward and slow-steaming from 19.0 knots to 14.4 knots, propeller load is cut by 56% (governed by the cubic power law P ∝ v³) — saving bunker fuel while arriving comfortably within the {currentContract.deadlineDays}-day laycan window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
