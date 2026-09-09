import React from 'react';
import { Ship, Navigation, Fuel, Gauge, Anchor, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Vessel, SimulationParams } from '../types';

interface BottomFleetDockProps {
  vessels: Vessel[];
  selectedVesselId: string;
  onSelectVessel: (id: string) => void;
  params: SimulationParams;
}

export const BottomFleetDock: React.FC<BottomFleetDockProps> = ({
  vessels,
  selectedVesselId,
  onSelectVessel,
  params,
}) => {
  return (
    <footer className="w-full bg-[#080C14] border-t border-slate-800/90 py-2 px-4 select-none shrink-0 z-20">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
            Fleet Allocation Telemetry Dock // 6 Active Vessels
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-amber-500"></span> Diesel / MGO
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-cyan-400"></span> LNG Fuel
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-emerald-400"></span> Green Methanol
          </span>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="flex gap-3 overflow-x-auto pb-1.5 custom-scrollbar">
        {vessels.map((vessel) => {
          const isSelected = vessel.id === selectedVesselId;
          const currentSpeed = params.isOptimized ? vessel.optimizedSpeedKnots : vessel.baselineSpeedKnots;
          const capacityPercent = Math.round((vessel.currentDwt / vessel.dwtCapacity) * 100);

          // Blend proportions based on simulation carbon tax
          let dieselPct = vessel.fuelBlend.diesel;
          let lngPct = vessel.fuelBlend.lng;
          let methPct = vessel.fuelBlend.methanol;

          if (params.isOptimized) {
            if (methPct > 0) {
              dieselPct = params.carbonTax >= 100 ? 15 : 25;
              methPct = 100 - dieselPct;
            } else {
              dieselPct = params.carbonTax >= 120 ? 20 : params.carbonTax >= 80 ? 25 : 35;
              lngPct = 100 - dieselPct;
            }
          } else {
            dieselPct = 100;
            lngPct = 0;
            methPct = 0;
          }

          return (
            <div
              key={vessel.id}
              onClick={() => onSelectVessel(vessel.id)}
              className={`shrink-0 w-72 p-2.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#0D1525] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/60'
                  : 'bg-[#0A0F1A] border-slate-800/80 hover:border-slate-700 hover:bg-[#0D1525]/60'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500" />
              )}

              {/* Vessel Name & Status */}
              <div className="flex items-start justify-between gap-1 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    <Ship className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-white truncate font-mono">
                      {vessel.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {vessel.type.split(' ')[0]} {vessel.type.split(' ')[1]}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                      vessel.status === 'En Route'
                        ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                        : vessel.status === 'Assigned'
                        ? 'bg-cyan-950/70 border-cyan-700 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {vessel.status}
                  </span>
                </div>
              </div>

              {/* Route & Telemetry stats */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mb-2">
                <div className="bg-[#080C14] p-1.5 rounded border border-slate-800/80">
                  <span className="text-slate-400 block">Route</span>
                  <span className="text-slate-200 truncate block font-medium">
                    {vessel.assignedRoute || 'In Port / Idle'}
                  </span>
                </div>

                <div className="bg-[#080C14] p-1.5 rounded border border-slate-800/80">
                  <span className="text-slate-400 block">Opt. Speed</span>
                  <span className={`font-bold ${params.isOptimized ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {currentSpeed} kn {params.isOptimized ? '(Slow-Steam)' : '(Max)'}
                  </span>
                </div>
              </div>

              {/* DWT Capacity Meter */}
              <div className="mb-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>DWT Cargo Load:</span>
                  <span className="text-slate-200">
                    {(vessel.currentDwt / 1000).toFixed(0)}k / {(vessel.dwtCapacity / 1000).toFixed(0)}k t ({capacityPercent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
              </div>

              {/* Fuel Blend Progress Gauge */}
              <div>
                <div className="flex justify-between text-[9px] font-mono text-slate-400 mb-1">
                  <span>Fuel Blend Mix:</span>
                  <span className="text-slate-200">
                    {methPct > 0 ? `${methPct}% Methanol` : `${lngPct}% LNG`} | {dieselPct}% Diesel
                  </span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800 border border-slate-700">
                  {dieselPct > 0 && (
                    <div
                      className="h-full bg-amber-500 transition-all"
                      style={{ width: `${dieselPct}%` }}
                      title={`Diesel: ${dieselPct}%`}
                    />
                  )}
                  {lngPct > 0 && (
                    <div
                      className="h-full bg-cyan-400 transition-all"
                      style={{ width: `${lngPct}%` }}
                      title={`LNG: ${lngPct}%`}
                    />
                  )}
                  {methPct > 0 && (
                    <div
                      className="h-full bg-emerald-400 transition-all"
                      style={{ width: `${methPct}%` }}
                      title={`Green Methanol: ${methPct}%`}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
};
