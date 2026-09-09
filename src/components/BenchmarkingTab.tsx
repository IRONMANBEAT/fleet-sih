import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Legend
} from 'recharts';
import { CONVERGENCE_DATA, FEATURE_IMPORTANCE } from '../data/mockData';
import {
  Cpu,
  Zap,
  Activity,
  Info,
  Award,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Binary,
  Layers
} from 'lucide-react';
import { formatUsd } from '../utils/calculations';

export const BenchmarkingTab: React.FC = () => {
  return (
    <div className="w-full space-y-6 text-[#0B1A30]">
      {/* Header Banner — Navy & White Theme with Em Dash */}
      <div className="p-4 rounded-xl liquid-glass-white border border-white/40 shadow-navy-card flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#0B1A30] text-white flex items-center justify-center font-bold shadow-md">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-[#0B1A30] tracking-tight">
                Quantum Swarm Optimization (QPSO) — Algorithmic Proof
              </h3>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                Peer-Reviewed Formulation
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Mathematical proof of quantum tunneling convergence past classical genetic algorithm cost stagnation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Framework:</span>
          <span className="text-blue-950 font-bold bg-blue-100 border border-blue-200 px-2.5 py-1 rounded">
            QPSO + XGBoost Surrogate Modeling
          </span>
        </div>
      </div>

      {/* Grid of Two Core Charts in Liquid Glass White */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Chart 1: Convergence Curve */}
        <div className="p-5 rounded-2xl liquid-glass-white border border-white/40 shadow-navy-card space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1A30] flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-900" />
                <span>Voyage Cost Convergence Curve — 100 Iterations</span>
              </h4>
              <p className="text-[11px] text-slate-600">
                Classical Genetic Algorithm (GA) vs. Quantum Particle Swarm Optimization (QPSO)
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              -$76,530 Tunneling Gain
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CONVERGENCE_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="iteration"
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  label={{ value: 'Search Iterations (t)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  domain={[280000, 480000]}
                />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Voyage Cost']}
                  contentStyle={{
                    backgroundColor: '#0B1A30',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="Classical_GA"
                  name="Classical Genetic Algorithm (Trapped)"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="QPSO_Quantum"
                  name="QuantMarine QPSO (Quantum Tunneling)"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
            <p>
              <strong>Convergence Analysis —</strong> The Classical Genetic Algorithm stagnates at iteration 28 ($384,100) due to localized cost traps in wave resistance space. QuantMarine&apos;s Delta-potential quantum well formulation enables swarm particles to tunnel through energy barriers, reaching global optimality at $307,570.
            </p>
          </div>
        </div>

        {/* Chart 2: XGBoost Feature Importance */}
        <div className="p-5 rounded-2xl liquid-glass-white border border-white/40 shadow-navy-card space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1A30] flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>XGBoost ML Surrogate Feature Importance</span>
              </h4>
              <p className="text-[11px] text-slate-600">
                Sensitivity weights governing vessel fuel burn & emissions (R² = 0.984)
              </p>
            </div>
            <span className="text-[11px] font-mono text-blue-900 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              SHAP Weights
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={FEATURE_IMPORTANCE}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#64748b"
                  fontSize={11}
                  unit="%"
                  domain={[0, 50]}
                />
                <YAxis
                  dataKey="feature"
                  type="category"
                  stroke="#334155"
                  fontSize={11}
                  width={150}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="p-3 bg-[#0B1A30] border border-white/20 rounded-lg shadow-xl text-xs font-mono space-y-1 text-white">
                          <p className="font-bold">{item.feature}</p>
                          <p className="text-cyan-300">Importance: {item.weight}%</p>
                          <p className="text-slate-300 text-[10px]">Physics law: {item.formula}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
                  {FEATURE_IMPORTANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0B1A30' : index === 1 ? '#0284c7' : '#059669'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              <strong>Cubic Hydrodynamics Law —</strong> Vessel speed dominates propulsion energy at 42.4% due to the v³ cubic law, followed by swell resistance (26.8%). This validates why cutting speed from 19.0 knots to 14.4 knots while bypassing monsoon swells cuts power by over 50%.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Mathematical Formulations Strip in Liquid Glass White */}
      <div className="p-5 rounded-2xl liquid-glass-white border border-white/40 shadow-navy-card space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1A30] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-900" />
          <span>Technical Hydrodynamics Architecture — Mathematical Formulations</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold">1. Quantum Swarm Update</span>
            <div className="text-blue-900 font-bold text-xs">
              X(t+1) = P ± α · |mbest - X(t)| · ln(1/u)
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Particles follow wave packets in a Delta-potential well — guaranteeing non-zero tunneling probability past local cost traps.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold">2. Added Wave Resistance (R_aw)</span>
            <div className="text-emerald-800 font-bold text-xs">
              R_aw = 2 · ρ_w · g · ∫∫ E(ω, θ) · K(ω, θ) dω dθ
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Integrates JONSWAP wave spectra across Arabian Sea monsoon vectors to avoid excessive swell resistance.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold">3. Multi-Fuel Cost Minimizer</span>
            <div className="text-[#0B1A30] font-bold text-xs">
              min J = ∫ (C_fuel(t) + Tax_CO2 · E_co2(t)) dt + Penalty_ETA
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Joint optimization of multi-fuel blends (LNG + MGO) and speed trajectory while guaranteeing charter arrival deadlines.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Row Incumbents Comparison Table (OptiMarine-Q vs. NAPA / StormGeo) */}
      <div className="p-5 rounded-2xl liquid-glass-white border border-white/40 shadow-navy-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded">
                Section 11.5 • Competitive Edge
              </span>
              <span className="text-xs font-mono text-slate-500">WHY US VS. INCUMBENTS</span>
            </div>
            <h4 className="text-base font-extrabold text-[#0B1A30] mt-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Competitive Differentiation: OptiMarine-Q vs. Legacy Incumbents</span>
            </h4>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
            NAPA / StormGeo Defense Matrix
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B1A30] text-white">
              <tr>
                <th className="p-3 font-bold w-1/4">Feature Dimension</th>
                <th className="p-3 font-bold text-red-300 w-3/8">Legacy Systems (e.g., NAPA, StormGeo)</th>
                <th className="p-3 font-bold text-emerald-300 w-3/8">OptiMarine-Q Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {/* Row 1: Core Math */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-900 shrink-0" />
                    <span>Core Math</span>
                  </div>
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-mono text-[11px] mb-1 font-semibold">
                    Local Minima Trapped
                  </span>
                  <p>Classical rule-based heuristics & gradient descent (frequently trapped in local cost minima under complex monsoon sea states).</p>
                </td>
                <td className="p-3 text-[#0B1A30] bg-emerald-50/30 leading-relaxed font-medium">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] mb-1 font-bold">
                    Quantum-Inspired Metaheuristic
                  </span>
                  <p>Quantum-Inspired Metaheuristic (QPSO) enabling simultaneous multi-vessel, non-linear multi-fuel optimization across continuous wave fields.</p>
                </td>
              </tr>

              {/* Row 2: Fuel Scope */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Fuel Scope</span>
                  </div>
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[11px] mb-1 font-semibold">
                    Single-Fuel Legacy
                  </span>
                  <p>Primarily single-fuel conventional bunker oil (HFO / MGO) with rigid single-tank assumptions.</p>
                </td>
                <td className="p-3 text-[#0B1A30] bg-emerald-50/30 leading-relaxed font-medium">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] mb-1 font-bold">
                    Multi-Fuel Co-Optimization
                  </span>
                  <p>Native support for dual-fuel dynamic blending ratios (Diesel, LNG, Green Methanol, Ammonia) based on spot prices & emissions.</p>
                </td>
              </tr>

              {/* Row 3: Regulatory Engine */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Regulatory Engine</span>
                  </div>
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] mb-1 font-semibold">
                    Passive Tracking
                  </span>
                  <p>Passive carbon tracking / historic reporting after voyages conclude without corrective live control.</p>
                </td>
                <td className="p-3 text-[#0B1A30] bg-emerald-50/30 leading-relaxed font-medium">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] mb-1 font-bold">
                    Proactive Real-Time Guardrails
                  </span>
                  <p>Active proactive optimization linked to dynamic carbon pricing (EU ETS) and real-time IMO MEPC.328(76) CII Grade A rating targets.</p>
                </td>
              </tr>

              {/* Row 4: Ease of Adoption */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-bold text-slate-900 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>Ease of Adoption</span>
                  </div>
                </td>
                <td className="p-3 text-slate-700 leading-relaxed">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-mono text-[11px] mb-1 font-semibold">
                    High Hardware CAPEX
                  </span>
                  <p>High setup cost, drydock installation delays, and proprietary black-box onboard sensor hardware.</p>
                </td>
                <td className="p-3 text-[#0B1A30] bg-emerald-50/30 leading-relaxed font-medium">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] mb-1 font-bold">
                    Zero Hardware Friction
                  </span>
                  <p>Cloud-native, lightweight SaaS API requiring zero onboard sensor modifications or retrofits to deploy across existing fleets.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
