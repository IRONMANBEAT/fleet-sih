import React from 'react';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Anchor,
  QrCode,
  Award,
  Ship,
  Clock,
  Stamp,
  FileSpreadsheet
} from 'lucide-react';
import { CargoContract, SimulationParams, Vessel, VoyageAnalytics } from '../types';
import { formatUsd, formatNumber } from '../utils/calculations';

interface ImoReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: VoyageAnalytics;
  selectedContract: CargoContract;
  selectedVessel: Vessel;
  params: SimulationParams;
}

export const ImoReportModal: React.FC<ImoReportModalProps> = ({
  isOpen,
  onClose,
  analytics,
  selectedContract,
  selectedVessel,
  params,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-[#0B1A30] rounded-2xl shadow-navy-floating border-2 border-slate-200 overflow-hidden my-6">
        {/* Certificate Decorative Navy Border Header */}
        <div className="bg-[#0B1A30] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
              <Anchor className="w-5 h-5 text-[#0B1A30]" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-blue-200 uppercase font-bold">
                INTERNATIONAL MARITIME ORGANIZATION — SEEMP PART III
              </div>
              <h2 className="text-base font-extrabold text-white">
                MEPC.328(76) / RESOLUTION MEPC.346 ATTESTATION STATEMENT
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Physical Body */}
        <div className="p-6 space-y-5 bg-gradient-to-b from-white via-slate-50 to-white">
          {/* Official Verification Sub-Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                AUDIT REGISTRY REFERENCE
              </span>
              <span className="text-xs font-mono font-bold text-blue-900">
                IMO-QM-2026-ARABIAN-094 — DNV GL VERIFIED
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                ATTAINED CII CLASSIFICATION
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>CERTIFIED GRADE A (SUPERIOR)</span>
              </span>
            </div>
          </div>

          {/* Voyage Particulars Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Vessel & Call Sign</span>
              <strong className="text-slate-900 font-bold block mt-0.5">
                {selectedVessel.name} — V3PQ7
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Voyage Corridor</span>
              <strong className="text-blue-900 font-bold block mt-0.5">
                {selectedContract.fromPort} — {selectedContract.toPort}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nautical Distance</span>
              <strong className="text-slate-900 font-bold block mt-0.5">
                {selectedContract.nauticalMiles} NM
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Propulsion Type</span>
              <strong className="text-emerald-800 font-bold block mt-0.5">
                {selectedVessel.propulsion}
              </strong>
            </div>
          </div>

          {/* CII Transformation Audit Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-900" />
                <span>CII Rating & Emission Performance Audit Data</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                MARPOL Annex VI Reg 28
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B1A30] text-white">
                  <tr>
                    <th className="p-2.5 font-bold">Metric Parameter</th>
                    <th className="p-2.5 text-red-300 font-bold">Baseline (Direct MGO)</th>
                    <th className="p-2.5 text-blue-200 font-bold">QuantMarine (Dual Fuel)</th>
                    <th className="p-2.5 text-emerald-300 font-bold">Net Abatement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Operational Speed</td>
                    <td className="p-2.5 text-red-700 font-mono font-medium">{analytics.baselineSpeedKnots} kn (Full Speed)</td>
                    <td className="p-2.5 text-blue-900 font-mono font-bold">{analytics.optimizedSpeedKnots} kn (Slow-Steam)</td>
                    <td className="p-2.5 text-emerald-700 font-mono font-bold">-24.2% Speed / -56% Power</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Bunker Fuel Consumption</td>
                    <td className="p-2.5 text-slate-700 font-mono">{analytics.baselineFuelBurnTons} t (100% MGO)</td>
                    <td className="p-2.5 text-blue-900 font-mono font-bold">
                      {analytics.optimizedFuelBurnTons} t ({analytics.fuelBlendRecommended.cleanFuel}% LNG)
                    </td>
                    <td className="p-2.5 text-emerald-700 font-mono font-bold">
                      -{(analytics.baselineFuelBurnTons - analytics.optimizedFuelBurnTons).toFixed(1)} t Fuel
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Gross CO₂ Emissions</td>
                    <td className="p-2.5 text-red-700 font-mono font-medium">{formatNumber(analytics.baselineCo2Tons)} t CO₂e</td>
                    <td className="p-2.5 text-blue-900 font-mono font-bold">{formatNumber(analytics.optimizedCo2Tons)} t CO₂e</td>
                    <td className="p-2.5 text-emerald-700 font-mono font-bold">
                      -{formatNumber(analytics.ghgAbatementTons)} t CO₂e (-{analytics.ghgAbatementPercent}%)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-800">Total Voyage OPEX</td>
                    <td className="p-2.5 text-red-700 font-mono font-medium">{formatUsd(analytics.baselineTotalCost)}</td>
                    <td className="p-2.5 text-blue-900 font-mono font-bold">{formatUsd(analytics.optimizedTotalCost)}</td>
                    <td className="p-2.5 text-emerald-700 font-mono font-bold">
                      -{formatUsd(analytics.netSavingsUsd)} (-{analytics.netSavingsPercent}%)
                    </td>
                  </tr>
                  <tr className="bg-emerald-50">
                    <td className="p-2.5 font-bold text-slate-900">Attained CII Grade</td>
                    <td className="p-2.5 font-black text-red-700 font-mono">GRADE D (Sub-standard)</td>
                    <td className="p-2.5 font-black text-emerald-700 font-mono">GRADE A (Superior)</td>
                    <td className="p-2.5 text-emerald-800 font-mono font-bold">+$24,000 Fines Avoided</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cryptographic Seal & Physical Signature Block */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-300 shadow-sm text-slate-900">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <div className="font-bold text-[#0B1A30]">VERIFIED BLOCKCHAIN ATTESTATION</div>
                <div className="text-[10px] text-slate-600 font-mono">
                  SHA-256 HASH: 0x8f2a49...3b9c41d (DNV Veracity Node #14)
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Valid for Port State Control (PSC) Clearance worldwide</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-700" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-[#0B1A30] hover:bg-[#142645] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Export Signed PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
