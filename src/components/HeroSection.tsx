import React from 'react';
import {
  Compass,
  DollarSign,
  Award,
  ArrowRight,
  ShieldCheck,
  Waves,
  Wind,
  Ship,
  FileCheck,
  Activity,
  Layers,
  Sparkles,
  Gauge,
  CheckCircle2,
  Anchor,
  Radio
} from 'lucide-react';

interface HeroSectionProps {
  onOpenRouteModal: () => void;
  onOpenCarbonModal: () => void;
  onOpenReportModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRouteModal,
  onOpenCarbonModal,
  onOpenReportModal,
}) => {
  return (
    <section className="relative w-full pt-10 pb-16 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#0B1A30] via-[#0D213E] to-[#0B1A30] border-b border-white/10">
      {/* Realistic maritime background grid & subtle water reflections */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Operational Notice Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-mono shadow-md">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-300">LIVE VOYAGE OPTIMIZATION</span>
            <span className="text-white/40">—</span>
            <span className="text-slate-200">INBOM (Mumbai) ➔ AEJEA (Dubai)</span>
          </div>
        </div>

        {/* Realistic Maritime Headline with Navy & White theme */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Operational Maritime Decarbonization <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-cyan-300">
              Driven by Wave Physics & Swarm AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
            Real-time hydrodynamic weather routing and multi-fuel blending across the Arabian Sea and Persian Gulf. QuantMarine slow-steams container vessels and bulk carriers around heavy monsoon swells — cutting total voyage OPEX by up to 25% and locking in IMO CII Grade A compliance.
          </p>
        </div>

        {/* Action Button Strip with Lucide Icons and Solid Drop Shadows */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <button
            onClick={onOpenRouteModal}
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-[#0B1A30] bg-white hover:bg-slate-100 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.3)] flex items-center gap-2.5 cursor-pointer hover:translate-y-[-1px]"
          >
            <Compass className="w-4 h-4 text-[#0B1A30]" />
            <span>Open Voyage Route Simulator</span>
            <ArrowRight className="w-4 h-4 text-[#0B1A30]" />
          </button>

          <button
            onClick={onOpenCarbonModal}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#152B4D] hover:bg-[#1B3660] border border-white/20 transition-all shadow-lg shadow-black/25 flex items-center gap-2 cursor-pointer hover:border-white/40"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Calculate Carbon & CII ROI</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-amber-300" />
            <span>View SEEMP-III Audit Log</span>
          </button>
        </div>

        {/* 4 Realistic High-Impact Telemetry Panels (Liquid Glass White + Solid Drop Shadows) */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Net Voyage Savings */}
          <div className="liquid-glass-white p-5 rounded-2xl text-[#0B1A30] shadow-navy-card">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-900">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Voyage Savings</span>
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                -21.4%
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0B1A30] tracking-tight">
              -$84,230
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-medium leading-normal">
              Net transit OPEX savings — Mumbai to Dubai corridor
            </p>
          </div>

          {/* Card 2: GHG Abatement */}
          <div className="liquid-glass-white p-5 rounded-2xl text-[#0B1A30] shadow-navy-card">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-900">
                <Waves className="w-3.5 h-3.5 text-blue-600" />
                <span>CO₂e Abatement</span>
              </span>
              <span className="font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                -34.8%
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0B1A30] tracking-tight">
              -142.6 <span className="text-lg font-normal text-slate-500">t</span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-medium leading-normal">
              Avoided bunker emissions via 75% LNG + slow-steaming
            </p>
          </div>

          {/* Card 3: IMO CII Rating */}
          <div className="liquid-glass-white p-5 rounded-2xl text-[#0B1A30] shadow-navy-card">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-900">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>IMO CII Attained</span>
              </span>
              <span className="font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                Grade A
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-700 tracking-tight flex items-baseline gap-2">
              <span>Grade A</span>
              <span className="text-xs font-mono text-slate-500 line-through">Grade D</span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-medium leading-normal">
              Attained: 4.86 gCO₂/dwt·nm — Full IMO MEPC compliance
            </p>
          </div>

          {/* Card 4: Avoided Fines & Penalties */}
          <div className="liquid-glass-white p-5 rounded-2xl text-[#0B1A30] shadow-navy-card">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-900">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Avoided Fines</span>
              </span>
              <span className="font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                PSC Clear
              </span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0B1A30] tracking-tight">
              +$24,000
            </div>
            <p className="text-xs text-slate-600 mt-1.5 font-medium leading-normal">
              Avoided Port State Control detention & carbon penalties
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
