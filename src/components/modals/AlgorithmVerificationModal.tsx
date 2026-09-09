import React from 'react';
import { X, Cpu, Zap, Activity, Info, Award, ShieldCheck } from 'lucide-react';
import { BenchmarkingTab } from '../BenchmarkingTab';

interface AlgorithmVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmVerificationModal: React.FC<AlgorithmVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0C1A2F] border border-white/15 rounded-2xl shadow-navy-floating overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header — Navy & White Theme */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#081324] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md">
              <Cpu className="w-5 h-5 text-[#0B1A30]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight font-sans">
                  Quantum Swarm & Hydrodynamic Physics Verification
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded shadow-sm">
                  100-ITERATION PROOF
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Mathematical proof of quantum tunneling convergence past classical genetic algorithm local cost minima
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <BenchmarkingTab />
        </div>
      </div>
    </div>
  );
};
