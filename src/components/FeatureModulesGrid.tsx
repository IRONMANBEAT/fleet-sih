import React from 'react';
import {
  Compass,
  DollarSign,
  Ship,
  FileText,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  Waves,
  FileCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
  Fuel,
  TrendingDown
} from 'lucide-react';

interface FeatureModulesGridProps {
  onOpenRouteModal: () => void;
  onOpenCarbonModal: () => void;
  onOpenFleetModal: () => void;
  onOpenReportModal: () => void;
  onOpenAlgorithmModal: () => void;
}

export const FeatureModulesGrid: React.FC<FeatureModulesGridProps> = ({
  onOpenRouteModal,
  onOpenCarbonModal,
  onOpenFleetModal,
  onOpenReportModal,
  onOpenAlgorithmModal,
}) => {
  const modules = [
    {
      id: 'route',
      moduleNo: 'MODULE 01',
      title: 'Voyage Route Simulator',
      subtitle: 'Hydrodynamic Monsoon Routing — Arabian Sea Corridor',
      icon: Compass,
      badge: 'Interactive Map & Weather Vectors',
      description:
        'Weather-routed slow-steaming navigation that circumvents heavy 4.5m monsoon swells in the central Arabian Sea — connecting Mumbai (JNPT), Mundra, Jebel Ali Dubai, and Salalah.',
      highlights: [
        'Interactive Leaflet nautical chart — live wave vectors',
        'Direct baseline vs. weather-routed trajectory comparison',
        'Cubic propeller power reduction (v³ law) calculations',
      ],
      actionLabel: 'Launch Route Simulator Dialog',
      onClick: onOpenRouteModal,
    },
    {
      id: 'carbon',
      moduleNo: 'MODULE 02',
      title: 'Carbon Tax & CII ROI Calculator',
      subtitle: 'IMO MEPC.328(76) & EU ETS Exposure Analysis',
      icon: DollarSign,
      badge: 'Sensitivity Sliders ($0 — $200/t)',
      description:
        'Simulate how rising carbon tax rates trigger automated fuel-switching algorithms from standard MGO to 75% LNG — jumping your commercial vessel from Grade D to Grade A.',
      highlights: [
        'Real-time carbon tax sensitivity slider ($0 — $200/t CO₂)',
        'Detailed cost breakdown: Bunker fuel vs. regulatory tax levy',
        'Direct avoidance of $24,000/yr Port State Control penalties',
      ],
      actionLabel: 'Open Carbon ROI Calculator',
      onClick: onOpenCarbonModal,
    },
    {
      id: 'fleet',
      moduleNo: 'MODULE 03',
      title: 'Active Fleet Telemetry Hub',
      subtitle: 'Real-Time Telemetry — 6 Dual-Fuel Vessels',
      icon: Ship,
      badge: 'AIS VHF Ch 87B Stream',
      description:
        'Real-time vessel tracking, cargo deadweight utilization, and dual-fuel bunkering status across 6 active commercial vessels including MV Green Neo-Panamax and MV Sagar Shakti.',
      highlights: [
        'Dual-fuel blend gauges (MGO vs. LNG vs. Green Methanol)',
        'Deadweight cargo capacity meters & speed over ground (SOG)',
        'Voyage charter party arrival deadlines & laycan windows',
      ],
      actionLabel: 'Inspect Active Fleet Dialog',
      onClick: onOpenFleetModal,
    },
    {
      id: 'report',
      moduleNo: 'MODULE 04',
      title: 'IMO SEEMP-III Audit Certificate',
      subtitle: 'Official Verification — Attained CII Rating Statement',
      icon: FileText,
      badge: 'BIMCO & IMO MEPC Verified',
      description:
        'Official SEEMP Part III / MEPC.328(76) compliance certificate with verifiable voyage cryptographic hash, emission particulars, and certified Grade A rating statement.',
      highlights: [
        'Certified Attained CII verification (4.86 gCO₂/dwt·nm)',
        'Itemized greenhouse gas (GHG) abatement audit record',
        'Exportable PDF & standard printer layout for port clearance',
      ],
      actionLabel: 'View Compliance Certificate',
      onClick: onOpenReportModal,
    },
    {
      id: 'algorithm',
      moduleNo: 'MODULE 05',
      title: 'Quantum Physics Engine',
      subtitle: 'Convergence Verification — QPSO vs. Classical GA',
      icon: Cpu,
      badge: '100-Iteration Quantum Tunneling',
      description:
        'Mathematical verification of quantum tunneling convergence across 100 search iterations — proving how QuantMarine bypasses classical genetic algorithm cost stagnation.',
      highlights: [
        '100-iteration quantum tunneling convergence trajectory',
        'XGBoost surrogate hydrodynamic model feature importance',
        'Hydrodynamic v³ cubic resistance law validation',
      ],
      actionLabel: 'Inspect Physics Proof Dialog',
      onClick: onOpenAlgorithmModal,
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-[#0B1A30] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-blue-200 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-cyan-300" />
              <span>MODULAR MARITIME OPERATIONS — MISSION SYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Operational Fleet Decarbonization Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Launch dedicated mission dialogs to execute hydrodynamics simulations, verify IMO audit statements, inspect live vessel telemetry, and evaluate multi-fuel bunkering ROI.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-[#102442] px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>5 Interactive Functional Modules Active</span>
          </div>
        </div>

        {/* 5 Modular Feature Cards with Navy Blue & White theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="rounded-2xl liquid-glass-navy p-6 flex flex-col justify-between group border border-white/15 hover:border-white/40 transition-all duration-300 shadow-navy-card relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
                      <Icon className="w-5 h-5 text-[#0B1A30]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-md">
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-cyan-300 font-bold tracking-wider uppercase">
                      {mod.moduleNo} — {mod.subtitle}
                    </div>
                    <h3 className="text-lg font-extrabold text-white mt-1 group-hover:text-blue-200 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed font-normal">
                      {mod.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List with Em Dash format */}
                  <ul className="space-y-1.5 pt-3 border-t border-white/10 text-xs text-slate-300">
                    {mod.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dialog Trigger Button with Solid Drop Shadow */}
                <div className="pt-6">
                  <button
                    onClick={mod.onClick}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#0B1A30] bg-white hover:bg-slate-100 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                  >
                    <span>{mod.actionLabel}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#0B1A30]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
