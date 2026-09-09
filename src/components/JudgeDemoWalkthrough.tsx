import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldAlert, Zap, X } from 'lucide-react';

interface JudgeDemoWalkthroughProps {
  currentStep: number; // 1, 2, 3
  onSelectStep: (step: number) => void;
  onClose: () => void;
}

export const JudgeDemoWalkthrough: React.FC<JudgeDemoWalkthroughProps> = ({
  currentStep,
  onSelectStep,
  onClose,
}) => {
  const steps = [
    {
      num: 1,
      title: 'Step 1: The Baseline Trap',
      subtitle: 'Full Throttle 19 kn • 100% Dirty Diesel • Grade D',
      instruction:
        'Default operations sail at full speed through monsoon weather on dirty MGO. Notice the red cost bars and failing IMO CII Grade D.',
      actionLabel: 'Set Step 1',
    },
    {
      num: 2,
      title: 'Step 2: The Shock Factor',
      subtitle: 'Carbon Tax $120/t • Severe Monsoon Swell (3.8m)',
      instruction:
        'Weather drag escalates and carbon penalties surge. Traditional operations cost explodes past $240k with heavy environmental damage.',
      actionLabel: 'Apply Constraints',
    },
    {
      num: 3,
      title: 'Step 3: The Quantum Magic',
      subtitle: 'QPSO Convergence • 14.4 kn • 75% LNG • Grade A',
      instruction:
        'Run Quantum Optimization! The trajectory navigates around wave swells, speed slow-steams to 14.4 kn, fuel flips to 75% LNG, and CII jumps to Grade A (-25% OPEX).',
      actionLabel: 'Execute Quantum',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-cyan-950/90 via-[#0D192E]/95 to-cyan-950/90 border-b border-cyan-500/40 p-3 select-none transition-all shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white">90-SECOND JUDGE INTERACTIVE DEMO SCRIPT</span>
              <span className="text-[10px] bg-cyan-900/60 text-cyan-300 border border-cyan-700/60 px-1.5 py-0.2 rounded">
                LIVE GUIDE
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {steps[currentStep - 1].instruction}
            </p>
          </div>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {steps.map((s) => {
            const isActive = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => onSelectStep(s.num)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500 text-[#080C14] border-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-[#080C14] border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  isActive ? 'bg-[#080C14] text-cyan-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.num}
                </span>
                <span>{s.num === 1 ? '1. Baseline' : s.num === 2 ? '2. Shock Factor' : '3. Quantum Magic'}</span>
              </button>
            );
          })}

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors ml-1 cursor-pointer"
            title="Close Walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
