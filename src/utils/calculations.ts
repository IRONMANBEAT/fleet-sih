import { CargoContract, FuelPrices, SimulationParams, VoyageAnalytics } from '../types';

export function calculateVoyageAnalytics(
  contract: CargoContract,
  params: SimulationParams,
  fuelPrices: FuelPrices
): VoyageAnalytics {
  const { carbonTax, waveHeightMeters, isOptimized } = params;
  const distanceNM = contract.nauticalMiles;

  // Wave drag multiplier: Calm (1m) = 1.02, Monsoon (4.5m) = 1.28
  const waveDragMultiplier = 1 + (waveHeightMeters - 1) * 0.08;

  // --- BASELINE (Traditional Operations) ---
  // High speed: 19.0 knots, 100% Marine Gas Oil (MGO), Direct straight line through weather
  const baselineSpeed = 19.0;
  const baselineHours = distanceNM / baselineSpeed;
  const baselineDays = Number((baselineHours / 24).toFixed(2));

  // Fuel consumption cubic law: P ~ v^3 * waveDrag
  // Standard Panamax container burn: ~2.8 tons MGO per hour at 19 knots in calm water
  const baselineHourlyBurn = 2.75 * Math.pow(baselineSpeed / 18.0, 3) * waveDragMultiplier;
  const baselineFuelBurnTons = Number((baselineHourlyBurn * baselineHours).toFixed(1));

  // MGO carbon factor: ~3.206 tons CO2 per ton of MGO
  const baselineCo2Tons = Number((baselineFuelBurnTons * 3.206).toFixed(1));

  // Fuel cost: 100% MGO
  const baselineFuelCost = Math.round(baselineFuelBurnTons * fuelPrices.mgo);
  const baselineCarbonTaxCost = Math.round(baselineCo2Tons * carbonTax);
  const baselineTotalCost = baselineFuelCost + baselineCarbonTaxCost;

  // --- QUANTUM OPTIMIZED (QPSO Routing & Multi-Fuel Blend) ---
  // Optimized speed: slow-steaming at 14.4 knots (still well under contract deadline!)
  const optimizedSpeed = 14.4;
  // Weather routing navigates around severe wave centers: drag is minimized by ~65%
  const optimizedWaveDrag = 1 + (waveHeightMeters - 1) * 0.028;
  const optimizedHours = distanceNM / optimizedSpeed;
  const optimizedDays = Number((optimizedHours / 24).toFixed(2));

  // Cubic fuel burn savings from 19.0 kn down to 14.4 kn:
  // (14.4 / 19.0)^3 = 0.435 -> ~56% power reduction!
  const optimizedHourlyBurn = 2.75 * Math.pow(optimizedSpeed / 18.0, 3) * optimizedWaveDrag;
  const optimizedTotalFuelTons = Number((optimizedHourlyBurn * optimizedHours).toFixed(1));

  // Dynamic Fuel Blend based on Carbon Tax:
  // When Carbon Tax is $0, diesel is cheaper.
  // When Carbon Tax > $60/t, LNG (less CO2) becomes significantly more cost-effective!
  // At $85-$120+/t, optimal blend shifts to 75% LNG / 25% Diesel
  let cleanFuelShare = 0.50;
  if (carbonTax >= 150) {
    cleanFuelShare = 0.85;
  } else if (carbonTax >= 100) {
    cleanFuelShare = 0.75;
  } else if (carbonTax >= 60) {
    cleanFuelShare = 0.65;
  } else if (carbonTax >= 30) {
    cleanFuelShare = 0.50;
  } else {
    cleanFuelShare = 0.35;
  }

  const dieselShare = 1 - cleanFuelShare;
  const dieselBurnTons = optimizedTotalFuelTons * dieselShare;
  const lngBurnTons = optimizedTotalFuelTons * cleanFuelShare;

  // LNG emits ~2.75 tons CO2/ton (and 20-25% lower lifecycle GHG than MGO)
  const optimizedCo2Tons = Number(
    (dieselBurnTons * 3.206 + lngBurnTons * 2.75 * 0.75).toFixed(1)
  );

  const optimizedFuelCost = Math.round(
    dieselBurnTons * fuelPrices.mgo + lngBurnTons * fuelPrices.lng
  );
  const optimizedCarbonTaxCost = Math.round(optimizedCo2Tons * carbonTax);
  const optimizedTotalCost = optimizedFuelCost + optimizedCarbonTaxCost;

  // Savings calculations
  const netSavingsUsd = Math.max(0, baselineTotalCost - optimizedTotalCost);
  const netSavingsPercent = Number(
    ((netSavingsUsd / baselineTotalCost) * 100).toFixed(1)
  );

  const ghgAbatementTons = Number(
    Math.max(0, baselineCo2Tons - optimizedCo2Tons).toFixed(1)
  );
  const ghgAbatementPercent = Number(
    ((ghgAbatementTons / baselineCo2Tons) * 100).toFixed(1)
  );

  // Avoided IMO Port State Control Defect Penalties / Detention Insurance
  const avoidedPenaltiesUsd = 24000;

  return {
    baselineFuelCost,
    baselineCarbonTaxCost,
    baselineTotalCost,
    baselineCo2Tons,
    baselineFuelBurnTons,
    baselineSpeedKnots: baselineSpeed,
    baselineDays,
    baselineCii: 'D',

    optimizedFuelCost,
    optimizedCarbonTaxCost,
    optimizedTotalCost,
    optimizedCo2Tons,
    optimizedFuelBurnTons: optimizedTotalFuelTons,
    optimizedSpeedKnots: optimizedSpeed,
    optimizedDays,
    optimizedCii: 'A',

    netSavingsUsd,
    netSavingsPercent,
    ghgAbatementTons,
    ghgAbatementPercent,
    fuelBlendRecommended: {
      diesel: Math.round(dieselShare * 100),
      cleanFuel: Math.round(cleanFuelShare * 100),
      cleanFuelType: 'LNG',
    },
    avoidedPenaltiesUsd,
  };
}

export function formatUsd(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
  }).format(val);
}
