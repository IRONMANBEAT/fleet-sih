import React, { useState } from 'react';
import {
  Anchor,
  Compass,
  DollarSign,
  Ship,
  FileText,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface VerticalSidebarProps {
  onOpenRouteModal: () => void;
  onOpenCarbonModal: () => void;
  onOpenFleetModal: () => void;
  onOpenReportModal: () => void;
  onOpenAlgorithmModal: () => void;
  onLogout?: () => void;
}

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({
  onOpenRouteModal,
  onOpenCarbonModal,
  onOpenFleetModal,
  onOpenReportModal,
  onOpenAlgorithmModal,
  onLogout,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header Bar (< lg) */}
      <div className="lg:hidden w-full bg-[#081222] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
            <Anchor className="w-4.5 h-4.5 text-[#0B1A30]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-white">QuantMarine</span>
              <span className="text-[9px] font-mono font-bold bg-white/15 px-1 py-0.2 rounded text-white">OS</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono block">Mission Control</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRouteModal}
            className="px-3 py-1.5 rounded-lg bg-white text-[#0B1A30] font-bold text-xs flex items-center gap-1 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Sandbox</span>
          </button>

          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-slate-200 hover:text-white"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-[#081222] p-5 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
                    <Anchor className="w-5 h-5 text-[#0B1A30]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-base text-white">QuantMarine</span>
                      <span className="text-[10px] font-mono font-bold bg-white/15 px-1.5 py-0.5 rounded text-white">OS</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block">Mission Control Center</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Optimization */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block px-2 mb-2">
                  OPTIMIZATION
                </span>
                <button
                  onClick={() => { onOpenRouteModal(); setMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Route Simulator</span>
                </button>
                <button
                  onClick={() => { onOpenCarbonModal(); setMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Carbon & CII ROI</span>
                </button>
                <button
                  onClick={() => { onOpenFleetModal(); setMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer"
                >
                  <Ship className="w-4 h-4 text-blue-400" />
                  <span>Active Fleet (6)</span>
                </button>
              </div>

              {/* Compliance */}
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block px-2 mb-2">
                  COMPLIANCE
                </span>
                <button
                  onClick={() => { onOpenReportModal(); setMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>IMO Audit Log</span>
                </button>
                <button
                  onClick={() => { onOpenAlgorithmModal(); setMobileDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>QPSO Engine</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-6 border-t border-white/10">
              <button
                onClick={() => { onOpenCarbonModal(); setMobileDrawerOpen(false); }}
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#0F223D] hover:bg-[#152E52] border border-white/10 text-xs font-bold text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CII Calculator</span>
              </button>

              <button
                onClick={() => { onOpenRouteModal(); setMobileDrawerOpen(false); }}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1A30] text-xs font-extrabold flex items-center justify-between shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#0B1A30]" />
                  <span>Voyage Sandbox</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0B1A30]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Vertical Sidebar (lg:flex) — Exact 1-to-1 match of user screenshot */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-[#081222] border-r border-white/10 flex-col justify-between p-5 shrink-0 h-screen sticky top-0 overflow-y-auto custom-scrollbar select-none z-30">
        <div className="space-y-6">
          {/* Header Brand Section */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md shrink-0">
                <Anchor className="w-5 h-5 text-[#0B1A30]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-white font-sans">
                    QuantMarine
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white/15 border border-white/20 px-1.5 py-0.2 rounded text-white">
                    OS
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block">
                  Mission Control Center
                </span>
              </div>
            </div>

            <p className="text-[11px] text-blue-200/80 leading-relaxed mt-4 pt-3 border-t border-white/10">
              Fleet Decarbonization — Voyage Hydrodynamics & CII Compliance
            </p>
          </div>

          {/* Section 1: OPTIMIZATION */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block px-2.5 mb-2">
              OPTIMIZATION
            </span>

            <button
              onClick={onOpenRouteModal}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer group"
            >
              <Compass className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Route Simulator</span>
            </button>

            <button
              onClick={onOpenCarbonModal}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer group"
            >
              <DollarSign className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Carbon & CII ROI</span>
            </button>

            <button
              onClick={onOpenFleetModal}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer group"
            >
              <Ship className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Active Fleet (6)</span>
            </button>
          </div>

          {/* Section 2: COMPLIANCE */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block px-2.5 mb-2">
              COMPLIANCE
            </span>

            <button
              onClick={onOpenReportModal}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>IMO Audit Log</span>
            </button>

            <button
              onClick={onOpenAlgorithmModal}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all text-left cursor-pointer group"
            >
              <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>QPSO Engine</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions Strip */}
        <div className="space-y-3 pt-5 border-t border-white/10">
          <button
            onClick={onOpenCarbonModal}
            className="w-full py-2.5 px-3.5 rounded-xl bg-[#0F223D] hover:bg-[#152E52] border border-white/10 text-xs font-bold text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CII Calculator</span>
          </button>

          <button
            onClick={onOpenRouteModal}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1A30] text-xs font-extrabold flex items-center justify-between shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0B1A30]" />
              <span>Voyage Sandbox</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#0B1A30]" />
          </button>

          {/* Active User Session & Sign Out */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="text-left">
                <span className="font-bold text-xs text-white block leading-none">admin</span>
                <span className="text-[10px] text-emerald-400 font-mono">Fleet Commander</span>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="text-[11px] font-mono text-slate-400 hover:text-red-300 hover:bg-red-950/40 px-2 py-1 rounded transition-colors cursor-pointer"
                title="Sign out of mission control"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
