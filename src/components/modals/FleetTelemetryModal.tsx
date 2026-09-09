import React, { useState } from 'react';
import {
  X,
  Ship,
  Gauge,
  Fuel,
  Compass,
  Anchor,
  CheckCircle2,
  Navigation,
  Radio,
  Activity,
  Layers,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Vessel, SimulationParams } from '../../types';
import { INITIAL_VESSELS } from '../../data/mockData';

interface FleetTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: SimulationParams;
}

export const FleetTelemetryModal: React.FC<FleetTelemetryModalProps> = ({
  isOpen,
  onClose,
  params,
}) => {
  const [selectedVessel, setSelectedVessel] = useState<Vessel>(INITIAL_VESSELS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0C1A2F] border border-white/15 rounded-2xl shadow-navy-floating overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header — Navy & White Theme */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#081324] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
              <Ship className="w-5 h-5 text-[#0B1A30]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight font-sans">
                  Commercial Fleet Telemetry & Bunkering Allocation
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded shadow-sm">
                  AIS VHF CH 87B
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Live engine load, dual-fuel blending ratios, and voyage charter status for all 6 commercial vessels
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
          {/* Vessel Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {INITIAL_VESSELS.map((vessel, idx) => {
              const isSelected = vessel.id === selectedVessel.id;
              const speed = params.isOptimized ? vessel.optimizedSpeedKnots : vessel.baselineSpeedKnots;
              const capPercent = Math.round((vessel.currentDwt / vessel.dwtCapacity) * 100);

              let diesel = vessel.fuelBlend.diesel;
              let lng = vessel.fuelBlend.lng;
              let meth = vessel.fuelBlend.methanol;

              if (params.isOptimized) {
                diesel = params.carbonTax >= 100 ? 20 : 30;
                if (meth > 0) {
                  meth = 100 - diesel;
                  lng = 0;
                } else {
                  lng = 100 - diesel;
                }
              }

              const imoNumbers = ['IMO 9842145', 'IMO 9731204', 'IMO 9884521', 'IMO 9642398', 'IMO 9789123', 'IMO 9812456'];
              const callSigns = ['V3PQ7', '9V782', 'A8KG4', 'V7AA2', '9HA48', '3EKP8'];

              return (
                <button
                  key={vessel.id}
                  onClick={() => setSelectedVessel(vessel)}
                  className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'liquid-glass-white text-[#0B1A30] shadow-navy-card ring-2 ring-blue-400'
                      : 'bg-[#10223D] hover:bg-[#142A4C] border-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <h4 className={`text-xs font-extrabold ${isSelected ? 'text-[#0B1A30]' : 'text-white'}`}>
                        {vessel.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {imoNumbers[idx]} — Call Sign {callSigns[idx]}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/40">
                      {vessel.status}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-1 mt-2">
                    <div className="flex justify-between">
                      <span className={isSelected ? 'text-slate-600' : 'text-slate-400'}>Assigned Route:</span>
                      <span className={`font-semibold ${isSelected ? 'text-[#0B1A30]' : 'text-slate-200'}`}>
                        {vessel.assignedRoute || 'In Port'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className={isSelected ? 'text-slate-600' : 'text-slate-400'}>Operating SOG:</span>
                      <span className="font-mono font-bold text-emerald-600">{speed} knots</span>
                    </div>

                    <div className="flex justify-between">
                      <span className={isSelected ? 'text-slate-600' : 'text-slate-400'}>CII Grade:</span>
                      <span className="font-mono font-bold text-emerald-600">Grade {params.isOptimized ? vessel.ciiOptimized : vessel.ciiBaseline}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Vessel Deep Operational Telemetry Board */}
          <div className="p-6 rounded-2xl liquid-glass-navy border border-white/15 shadow-navy-floating space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    ACTIVE VESSEL PROFILE — {selectedVessel.id.toUpperCase()}
                  </span>
                  <span className="text-white">•</span>
                  <span className="text-xs font-mono text-slate-300">DNV GL CLASSIFIED</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {selectedVessel.name} — {selectedVessel.type}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  Position: {selectedVessel.currentLat.toFixed(2)}° N, {selectedVessel.currentLng.toFixed(2)}° E
                </span>
                <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/40">
                  Heading: {selectedVessel.headingDeg}° True
                </span>
              </div>
            </div>

            {/* Vessel Specifications & Engine Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#091527] border border-white/10">
                <span className="text-slate-400 block text-[11px]">Main Engine</span>
                <strong className="text-white font-mono block mt-1">MAN B&W 7G80ME-C9.5-GI</strong>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Dual-Fuel High Pressure</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091527] border border-white/10">
                <span className="text-slate-400 block text-[11px]">SFOC Efficiency</span>
                <strong className="text-emerald-400 font-mono block mt-1">162.4 g / kWh</strong>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Specific Fuel Consumption</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091527] border border-white/10">
                <span className="text-slate-400 block text-[11px]">Hull Fouling Margin</span>
                <strong className="text-cyan-300 font-mono block mt-1">+3.8% Resistance</strong>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Cleaned 45 days ago</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091527] border border-white/10">
                <span className="text-slate-400 block text-[11px]">Charter Party Form</span>
                <strong className="text-amber-300 font-mono block mt-1">BIMCO CII Clause 2022</strong>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Warranted Consumption</span>
              </div>
            </div>

            {/* Multi-Fuel Tank Bunkering Gauges */}
            <div className="p-4 rounded-xl bg-[#091527] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-cyan-400" />
                  <span>Dual-Fuel Injection Ratio — Active Voyage Bunkering</span>
                </span>
                <span className="font-mono text-cyan-300 font-bold">
                  {params.isOptimized ? 'Quantum Automated Injection' : 'Baseline Heavy Fuel Oil'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>MGO (Marine Gas Oil): {params.isOptimized ? (params.carbonTax >= 100 ? '20%' : '30%') : '100%'}</span>
                  <span>LNG (Liquefied Gas): {params.isOptimized ? (params.carbonTax >= 100 ? '80%' : '70%') : '0%'}</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${params.isOptimized ? (params.carbonTax >= 100 ? 20 : 30) : 100}%` }}
                  />
                  <div
                    className="h-full bg-cyan-400 transition-all duration-500"
                    style={{ width: `${params.isOptimized ? (params.carbonTax >= 100 ? 80 : 70) : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
