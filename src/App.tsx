import React, { useState, useMemo } from 'react';
import { LoginPage } from './components/LoginPage';
import { VerticalSidebar } from './components/VerticalSidebar';
import { HeroSection } from './components/HeroSection';
import { FeatureModulesGrid } from './components/FeatureModulesGrid';
import { QuickSimulatorSection } from './components/QuickSimulatorSection';
import { FleetSection } from './components/FleetSection';
import { Footer } from './components/Footer';

// Interactive Dialog Boxes / Modals
import { RouteOptimizerModal } from './components/modals/RouteOptimizerModal';
import { CarbonCalculatorModal } from './components/modals/CarbonCalculatorModal';
import { FleetTelemetryModal } from './components/modals/FleetTelemetryModal';
import { AlgorithmVerificationModal } from './components/modals/AlgorithmVerificationModal';
import { ImoReportModal } from './components/ImoReportModal';

import { CONTRACTS, INITIAL_FUEL_PRICES, INITIAL_VESSELS } from './data/mockData';
import { FuelPrices, SimulationParams, Vessel } from './types';
import { calculateVoyageAnalytics } from './utils/calculations';

export default function App() {
  // Authentication state (hardcoded demo access: admin / admin)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('quantmarine_auth') === 'true';
  });

  // State
  const [fuelPrices, setFuelPrices] = useState<FuelPrices>(INITIAL_FUEL_PRICES);
  const [vessels, setVessels] = useState<Vessel[]>(INITIAL_VESSELS);
  const [selectedContractId, setSelectedContractId] = useState<string>(CONTRACTS[0].id);
  const [selectedVesselId, setSelectedVesselId] = useState<string>(INITIAL_VESSELS[0].id);

  // Modal Dialog States
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isCarbonModalOpen, setIsCarbonModalOpen] = useState(false);
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAlgorithmModalOpen, setIsAlgorithmModalOpen] = useState(false);

  // Simulation parameters
  const [params, setParams] = useState<SimulationParams>({
    selectedContractId: CONTRACTS[0].id,
    carbonTax: 85,
    weatherCondition: 'moderate',
    waveHeightMeters: 2.8,
    windSpeedKnots: 22,
    isOptimized: true,
    isOptimizing: false,
  });

  const selectedContract = useMemo(() => {
    return CONTRACTS.find((c) => c.id === selectedContractId) || CONTRACTS[0];
  }, [selectedContractId]);

  const selectedVessel = useMemo(() => {
    return vessels.find((v) => v.id === selectedVesselId) || vessels[0];
  }, [vessels, selectedVesselId]);

  // Analytics calculation
  const analytics = useMemo(() => {
    return calculateVoyageAnalytics(selectedContract, params, fuelPrices);
  }, [selectedContract, params, fuelPrices]);

  const handleUpdateParams = (newParams: Partial<SimulationParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
    if (newParams.carbonTax !== undefined) {
      setFuelPrices((prev) => ({ ...prev, carbonTax: newParams.carbonTax! }));
    }
  };

  const handleRunOptimization = () => {
    setParams((prev) => ({ ...prev, isOptimizing: true }));
    setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        isOptimizing: false,
        isOptimized: true,
      }));
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('quantmarine_auth');
    setIsAuthenticated(false);
  };

  // If not authenticated, display the showcasing login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0B1A30] text-slate-100 font-sans flex flex-col lg:flex-row selection:bg-blue-500/25 selection:text-white">
      {/* 1. LEFT VERTICAL SIDEBAR */}
      <VerticalSidebar
        onOpenRouteModal={() => setIsRouteModalOpen(true)}
        onOpenCarbonModal={() => setIsCarbonModalOpen(true)}
        onOpenFleetModal={() => setIsFleetModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAlgorithmModal={() => setIsAlgorithmModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. RIGHT MAIN CONTENT FLOW */}
      <main className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
        {/* HERO SECTION */}
        <HeroSection
          onOpenRouteModal={() => setIsRouteModalOpen(true)}
          onOpenCarbonModal={() => setIsCarbonModalOpen(true)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* CORE FUNCTION MODULES GRID */}
        <FeatureModulesGrid
          onOpenRouteModal={() => setIsRouteModalOpen(true)}
          onOpenCarbonModal={() => setIsCarbonModalOpen(true)}
          onOpenFleetModal={() => setIsFleetModalOpen(true)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenAlgorithmModal={() => setIsAlgorithmModalOpen(true)}
        />

        {/* LIVE INTERACTIVE SANDBOX SECTION */}
        <QuickSimulatorSection
          contracts={CONTRACTS}
          selectedContractId={selectedContractId}
          onSelectContract={(id) => {
            setSelectedContractId(id);
            handleUpdateParams({ selectedContractId: id });
          }}
          params={params}
          onUpdateParams={handleUpdateParams}
          analytics={analytics}
          onOpenRouteModal={() => setIsRouteModalOpen(true)}
          onOpenCarbonModal={() => setIsCarbonModalOpen(true)}
        />

        {/* GREEN FLEET SHOWCASE */}
        <FleetSection
          vessels={vessels}
          params={params}
          onOpenFleetModal={() => setIsFleetModalOpen(true)}
        />

        {/* FOOTER */}
        <Footer
          onOpenRouteModal={() => setIsRouteModalOpen(true)}
          onOpenCarbonModal={() => setIsCarbonModalOpen(true)}
          onOpenFleetModal={() => setIsFleetModalOpen(true)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenAlgorithmModal={() => setIsAlgorithmModalOpen(true)}
        />
      </main>

      {/* ========================================================================= */}
      {/* INTERACTIVE FUNCTION DIALOG BOXES (MODALS)                                */}
      {/* ========================================================================= */}

      {/* Dialog 1: Interactive Maritime Route Simulator */}
      <RouteOptimizerModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        params={params}
        onUpdateParams={handleUpdateParams}
        onRunOptimization={handleRunOptimization}
      />

      {/* Dialog 2: Carbon Tax & CII Impact Calculator */}
      <CarbonCalculatorModal
        isOpen={isCarbonModalOpen}
        onClose={() => setIsCarbonModalOpen(false)}
        analytics={analytics}
        params={params}
        onUpdateParams={handleUpdateParams}
        onOpenReport={() => setIsReportModalOpen(true)}
      />

      {/* Dialog 3: Fleet Telemetry & Vessel Allocation */}
      <FleetTelemetryModal
        isOpen={isFleetModalOpen}
        onClose={() => setIsFleetModalOpen(false)}
        params={params}
      />

      {/* Dialog 4: Quantum Swarm Algorithm Verification */}
      <AlgorithmVerificationModal
        isOpen={isAlgorithmModalOpen}
        onClose={() => setIsAlgorithmModalOpen(false)}
      />

      {/* Dialog 5: Official IMO SEEMP-III Compliance Certificate */}
      <ImoReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        analytics={analytics}
        selectedContract={selectedContract}
        selectedVessel={selectedVessel}
        params={params}
      />
    </div>
  );
}
