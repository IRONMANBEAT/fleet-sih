import React from 'react';
import {
  Ship,
  Compass,
  Fuel,
  CheckCircle2,
  ArrowUpRight,
  Gauge,
  Anchor,
  Activity,
  Layers,
  Radio,
  Clock
} from 'lucide-react';
import { Vessel, SimulationParams } from '../types';

interface FleetSectionProps {
  vessels: Vessel[];
  params: SimulationParams;
  onOpenFleetModal: () => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  vessels,
  params,
  onOpenFleetModal,
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-[#091527] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-blue-200 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>COMMERCIAL FLEET OVERVIEW — AIS CH 87B</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              6 Active Dual-Fuel Vessels Monitored
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Each vessel runs custom multi-fuel injection algorithms to maximize LNG / Methanol utilization while strictly adhering to commercial charter party arrival deadlines.
            </p>
          </div>

          <button
            onClick={onOpenFleetModal}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#0B1A30] bg-white hover:bg-slate-100 border border-white shadow-navy-card flex items-center gap-2 transition-all cursor-pointer"
          >
            <Ship className="w-4 h-4 text-[#0B1A30]" />
            <span>Open Fleet Management Dialog</span>
          </button>
        </div>

        {/* 6 Vessel Cards Grid in Navy & White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vessels.map((vessel, idx) => {
            const capPercent = Math.round((vessel.currentDwt / vessel.dwtCapacity) * 100);
            const speed = params.isOptimized ? vessel.optimizedSpeedKnots : vessel.baselineSpeedKnots;

            let diesel = vessel.fuelBlend.diesel;
            let cleanFuel = vessel.fuelBlend.methanol > 0 ? vessel.fuelBlend.methanol : vessel.fuelBlend.lng;
            const cleanType = vessel.fuelBlend.methanol > 0 ? 'Methanol' : 'LNG';

            if (params.isOptimized) {
              diesel = params.carbonTax >= 100 ? 20 : 30;
              cleanFuel = 100 - diesel;
            } else {
              diesel = 100;
              cleanFuel = 0;
            }

            const imoNumbers = ['IMO 9842145', 'IMO 9731204', 'IMO 9884521', 'IMO 9642398', 'IMO 9789123', 'IMO 9812456'];
            const callSigns = ['V3PQ7', '9V782', 'A8KG4', 'V7AA2', '9HA48', '3EKP8'];
            const imoNum = imoNumbers[idx % imoNumbers.length];
            const callSign = callSigns[idx % callSigns.length];

            return (
              <div
                key={vessel.id}
                onClick={onOpenFleetModal}
                className="p-5 rounded-2xl liquid-glass-navy border border-white/15 hover:border-white/40 transition-all cursor-pointer group space-y-4 shadow-navy-card hover:shadow-navy-floating"
              >
                {/* Header & Status */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {vessel.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        {imoNum}
                      </span>
                    </div>
                    <span className="text-xs text-blue-200 font-medium">
                      {vessel.type} — Call Sign {callSign}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-500/40">
                    {vessel.status}
                  </span>
                </div>

                {/* Telemetry data table */}
                <div className="space-y-2 text-xs bg-[#0B1A30]/80 p-3.5 rounded-xl border border-white/10">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Assigned Corridor:</span>
                    <span className="font-semibold text-white">
                      {vessel.assignedRoute ? `${vessel.assignedRoute} — 1,070 NM` : 'In Port / Bunkering'}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Operating SOG:</span>
                    <span className="font-mono text-emerald-400 font-bold">{speed} knots</span>
                  </div>

                  {/* DWT Bar */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                      <span>DWT Cargo Payload:</span>
                      <span className="font-mono text-white">
                        {(vessel.currentDwt / 1000).toFixed(0)}k / {(vessel.dwtCapacity / 1000).toFixed(0)}k DWT ({capPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${capPercent}%` }} />
                    </div>
                  </div>

                  {/* Fuel Blend Bar */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                      <span>Fuel Blend Ratio:</span>
                      <span className="text-cyan-300 font-mono font-semibold">
                        {cleanFuel}% {cleanType} / {diesel}% MGO
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-amber-500" style={{ width: `${diesel}%` }} />
                      <div className="h-full bg-cyan-400" style={{ width: `${cleanFuel}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-blue-200 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Vessel Telemetry Dialog</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
