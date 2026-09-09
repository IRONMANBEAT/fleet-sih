import React from 'react';
import {
  Anchor,
  ShieldCheck,
  FileText,
  Compass,
  DollarSign,
  Ship,
  Cpu,
  Radio,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenRouteModal: () => void;
  onOpenCarbonModal: () => void;
  onOpenFleetModal: () => void;
  onOpenReportModal: () => void;
  onOpenAlgorithmModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRouteModal,
  onOpenCarbonModal,
  onOpenFleetModal,
  onOpenReportModal,
  onOpenAlgorithmModal,
}) => {
  return (
    <footer className="w-full bg-[#07111F] border-t border-white/10 pt-12 pb-8 px-4 sm:px-8 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
                <Anchor className="w-5 h-5 text-[#0B1A30]" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight font-sans">
                QuantMarine OS
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sustainable voyage hydrodynamics, weather routing, and multi-fuel bunkering optimization designed for global commercial fleets navigating stricter IMO MEPC.328(76) carbon regulations.
            </p>
          </div>

          {/* Interactive Tools Dialog Launchers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Mission Dialogs
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenRouteModal}
                  className="hover:text-white text-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Voyage Route Simulator — Arabian Sea</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCarbonModal}
                  className="hover:text-white text-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Carbon Tax & CII Calculator ($0 — $200/t)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFleetModal}
                  className="hover:text-white text-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Ship className="w-3.5 h-3.5 text-blue-400" />
                  <span>Fleet Telemetry Inspector — 6 Vessels</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory & Science */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Regulatory & Verification
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenReportModal}
                  className="hover:text-white text-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>IMO SEEMP-III Audit Certificate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAlgorithmModal}
                  className="hover:text-white text-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>QPSO Swarm Physics Verification</span>
                </button>
              </li>
              <li>
                <span className="text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>IMO Resolution MEPC.346 Compliant</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Regional Shipping Corridor */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Regional Corridors
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Operating key commercial shipping lanes: Mumbai (JNPT) — Jebel Ali (Dubai) [1,070 NM], Mundra — Salalah [1,180 NM], and Salalah — Jebel Ali [820 NM]. Weather buoy telemetry linked via AIS VHF Ch 87B.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
          <p>© 2026 QuantMarine OS — All commercial rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>BIMCO CII Clause 2022</span>
            <span>—</span>
            <span>MARPOL Annex VI</span>
            <span>—</span>
            <span>IMO DCS & EU ETS Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
