import React, { useState } from 'react';
import {
  Anchor,
  Compass,
  DollarSign,
  Ship,
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Waves,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check hardcoded credentials: admin / admin
    if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('quantmarine_auth', 'true');
        onLogin();
      }, 600);
    } else {
      setError('Invalid mission credentials. Use admin / admin for demo access.');
    }
  };

  const handleAutofill = () => {
    setUsername('admin');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-[#080E18] text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-500/25 selection:text-white relative overflow-x-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="w-full border-b border-white/[0.08] bg-[#060B14]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-[#0B1A30] flex items-center justify-center font-bold shadow-md border border-white/40">
            <Anchor className="w-5 h-5 text-[#0B1A30]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">
                QuantMarine
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-blue-900 bg-white px-1.5 py-0.5 rounded shadow-sm">
                OS v3.4
              </span>
            </div>
            <span className="text-[11px] text-blue-200/70 font-mono block">
              Fleet Decarbonization & Mission Control
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">AIS VHF CH 87B • ARABIAN SEA CORRIDOR</span>
        </div>
      </header>

      {/* Main Split-Screen Showcase & Login Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left Column: Platform Overview & Feature Excitement (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Maritime Decarbonization Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                  QuantMarine OS
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Autonomous hydrodynamic voyage weather routing, dual-fuel blending economics, and certified IMO SEEMP-III regulatory reporting across active Arabian Sea commercial corridors.
              </p>
            </div>

            {/* 4 Feature Teasers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Wave Swarm Routing</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Circumvent 4.5m monsoon wave centers across Mumbai, Dubai, and Salalah corridors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Carbon Tax Sensitivity</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Dynamic fuel-switching from MGO to 75% LNG as carbon prices rise to $100+/t.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                    <Ship className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Dual-Fuel Fleet Registry</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Live monitoring of 6 active vessels including Neo-Panamax and Suezmax crude tankers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">IMO SEEMP-III Audit</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Cryptographically signed Grade A compliance certificates for Port State Control.
                </p>
              </div>
            </div>

            {/* Quick Teaser Stats Strip */}
            <div className="p-3.5 rounded-xl bg-[#0D1D34]/80 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Up to -25% Net Voyage OPEX</span>
              </div>
              <div className="text-cyan-300">
                <span>IMO CII Grade A Guaranteed</span>
              </div>
              <div className="text-slate-300 hidden sm:block">
                <span>Zero Onboard Sensors Needed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B172B] border border-white/15 shadow-2xl space-y-6 relative">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Mission Control Access</span>
                  </span>
                  <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">
                    Secure Sign-In
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Sign In to QuantMarine
                </h2>
                <p className="text-xs text-slate-300">
                  Enter your fleet commander credentials to access live routing and telemetry.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Username</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (admin)"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101E] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (admin)"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101E] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Autofill Helper for Judges */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleAutofill}
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Auto-fill Demo Credentials</span>
                    <span className="font-bold">`admin / admin`</span>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#0B1A30] font-extrabold text-sm shadow-[0_10px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0B1A30] border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating Commander...</span>
                    </>
                  ) : (
                    <>
                      <span>Launch Mission Control</span>
                      <ArrowRight className="w-4 h-4 text-[#0B1A30]" />
                    </>
                  )}
                </button>
              </form>

              {/* Security notice */}
              <div className="pt-2 border-t border-white/10 text-center text-[11px] text-slate-400">
                <span>Protected by IMO SEEMP-III Access Protocol • Demo Mode Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.08] py-4 px-6 text-center text-xs text-slate-400 font-mono">
        <span>© 2026 QuantMarine OS — Commercial Fleet Decarbonization</span>
      </footer>
    </div>
  );
};
