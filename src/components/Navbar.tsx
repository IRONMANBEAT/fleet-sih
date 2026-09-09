import React from 'react';
import {
  Anchor,
  Compass,
  DollarSign,
  Ship,
  FileText,
  Cpu,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  onOpenRouteModal: () => void;
  onOpenCarbonModal: () => void;
  onOpenFleetModal: () => void;
  onOpenReportModal: () => void;
  onOpenAlgorithmModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRouteModal,
  onOpenCarbonModal,
  onOpenFleetModal,
  onOpenReportModal,
  onOpenAlgorithmModal,
}) => {
  return (
    <header className="w-full sticky top-0 z-40 bg-[#0B1A30]/95 backdrop-blur-xl border-b border-white/15 shadow-navy-card">
      {/* Main navigation header — guaranteed to fit within all viewports */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Compact Operational Descriptor */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-lg shadow-black/30 border border-white/50">
            <Anchor className="w-5 h-5 text-[#0B1A30]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-sans">
                QuantMarine
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-950 bg-white px-1.5 py-0.5 rounded shadow-sm">
                OS v3.4
              </span>
            </div>
            <p className="text-[11px] text-blue-200 font-medium hidden 2xl:block">
              Fleet Decarbonization — Voyage Hydrodynamics & CII Compliance
            </p>
          </div>
        </div>

        {/* Enhanced Visual Navigation Option Pills (Hidden on small laptops to prevent overflow, cleanly visible on desktop) */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2">
          {/* Option 1: Route Simulator */}
          <button
            onClick={onOpenRouteModal}
            className="group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-cyan-400/50 transition-all duration-150 shadow-sm cursor-pointer"
            title="Open Interactive Nautical Chart Simulator"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-all">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-100 group-hover:text-white whitespace-nowrap tracking-tight">
              Route Simulator
            </span>
          </button>

          {/* Option 2: Carbon & CII ROI */}
          <button
            onClick={onOpenCarbonModal}
            className="group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-emerald-400/50 transition-all duration-150 shadow-sm cursor-pointer"
            title="Open Carbon Tax Sensitivity & ROI Calculator"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-all">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-100 group-hover:text-white whitespace-nowrap tracking-tight">
              Carbon & CII ROI
            </span>
          </button>

          {/* Option 3: Active Fleet (6) */}
          <button
            onClick={onOpenFleetModal}
            className="group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-blue-400/50 transition-all duration-150 shadow-sm cursor-pointer"
            title="Inspect 6 Commercial Dual-Fuel Vessels"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.25)] group-hover:scale-105 transition-all">
              <Ship className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-xs font-bold text-slate-100 group-hover:text-white tracking-tight">
                Active Fleet
              </span>
              <span className="text-[10px] font-mono font-bold bg-blue-500/30 text-blue-200 px-1 py-0.2 rounded border border-blue-400/30">
                6
              </span>
            </div>
          </button>

          {/* Option 4: IMO Audit Log */}
          <button
            onClick={onOpenReportModal}
            className="group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-amber-400/50 transition-all duration-150 shadow-sm cursor-pointer"
            title="View Official IMO SEEMP-III Compliance Certificate"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-all">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-100 group-hover:text-white whitespace-nowrap tracking-tight">
              IMO Audit Log
            </span>
          </button>

          {/* Option 5: QPSO Engine */}
          <button
            onClick={onOpenAlgorithmModal}
            className="group flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-purple-400/50 transition-all duration-150 shadow-sm cursor-pointer"
            title="Inspect Quantum Swarm Convergence & Hydrodynamics"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-all">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-100 group-hover:text-white whitespace-nowrap tracking-tight">
              QPSO Engine
            </span>
          </button>
        </nav>

        {/* Primary Action Buttons (Always securely anchored within the screen) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCarbonModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-100 hover:text-white bg-[#14284A] hover:bg-[#1A3460] border border-white/20 hover:border-emerald-400/50 shadow-md transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap">CII Calculator</span>
          </button>

          <button
            onClick={onOpenRouteModal}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-[#0B1A30] bg-white hover:bg-slate-100 transition-all shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_10px_25px_rgba(255,255,255,0.35)] cursor-pointer hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4 text-[#0B1A30] shrink-0" />
            <span className="whitespace-nowrap">Voyage Sandbox</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#0B1A30] shrink-0" />
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Navigation Strip (< xl) */}
      <div className="xl:hidden w-full overflow-x-auto custom-scrollbar px-4 py-2 border-t border-white/10 bg-[#071324] flex items-center gap-2">
        <button
          onClick={onOpenRouteModal}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-300" />
          <span>Route Simulator</span>
        </button>

        <button
          onClick={onOpenCarbonModal}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
          <span>Carbon & CII</span>
        </button>

        <button
          onClick={onOpenFleetModal}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
        >
          <Ship className="w-3.5 h-3.5 text-blue-300" />
          <span>Active Fleet (6)</span>
        </button>

        <button
          onClick={onOpenReportModal}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
        >
          <FileText className="w-3.5 h-3.5 text-amber-300" />
          <span>IMO Audit</span>
        </button>

        <button
          onClick={onOpenAlgorithmModal}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
        >
          <Cpu className="w-3.5 h-3.5 text-purple-300" />
          <span>QPSO Engine</span>
        </button>
      </div>
    </header>
  );
};
