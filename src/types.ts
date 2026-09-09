export interface CargoContract {
  id: string;
  fromPort: string;
  toPort: string;
  fromCoords: [number, number]; // [lat, lng]
  toCoords: [number, number];
  cargoType: string;
  weightTons: number;
  deadlineDays: number;
  nauticalMiles: number;
  charterRevenueUsd: number;
}

export interface FuelPrices {
  mgo: number; // $/ton (Marine Gas Oil)
  lng: number; // $/ton (Liquefied Natural Gas)
  methanol: number; // $/ton (Green Methanol)
  carbonTax: number; // $/ton CO2
}

export type WeatherCondition = 'calm' | 'moderate' | 'monsoon';

export interface SimulationParams {
  selectedContractId: string;
  carbonTax: number; // $/ton CO2 (0 - 200)
  weatherCondition: WeatherCondition;
  waveHeightMeters: number; // 1.0 - 5.0m
  windSpeedKnots: number; // 5 - 45kt
  isOptimized: boolean; // false = Baseline, true = Quantum Optimized
  isOptimizing: boolean; // loading state animation
}

export type CIIGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Vessel {
  id: string;
  name: string;
  type: string;
  propulsion: 'Dual Fuel LNG' | 'Green Methanol Hybrid' | 'Bio-MDO Hybrid';
  dwtCapacity: number;
  currentDwt: number;
  status: 'En Route' | 'Assigned' | 'In Port / Idle' | 'Loading';
  assignedRoute?: string;
  currentLat: number;
  currentLng: number;
  headingDeg: number;
  baselineSpeedKnots: number;
  optimizedSpeedKnots: number;
  currentSpeedKnots: number;
  fuelBlend: {
    diesel: number; // percentage (0 - 100)
    lng: number; // percentage
    methanol: number; // percentage
  };
  ciiBaseline: CIIGrade;
  ciiOptimized: CIIGrade;
}

export interface VoyageAnalytics {
  baselineFuelCost: number;
  baselineCarbonTaxCost: number;
  baselineTotalCost: number;
  baselineCo2Tons: number;
  baselineFuelBurnTons: number;
  baselineSpeedKnots: number;
  baselineDays: number;
  baselineCii: CIIGrade;

  optimizedFuelCost: number;
  optimizedCarbonTaxCost: number;
  optimizedTotalCost: number;
  optimizedCo2Tons: number;
  optimizedFuelBurnTons: number;
  optimizedSpeedKnots: number;
  optimizedDays: number;
  optimizedCii: CIIGrade;

  netSavingsUsd: number;
  netSavingsPercent: number;
  ghgAbatementTons: number;
  ghgAbatementPercent: number;
  fuelBlendRecommended: {
    diesel: number;
    cleanFuel: number; // LNG or Methanol
    cleanFuelType: 'LNG' | 'Green Methanol';
  };
  avoidedPenaltiesUsd: number;
}

export interface PortNode {
  id: string;
  name: string;
  code: string;
  country: string;
  lat: number;
  lng: number;
  berths: number;
  bunkeringFacilities: string[];
}
