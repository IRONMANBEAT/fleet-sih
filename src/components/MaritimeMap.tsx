import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CargoContract, PortNode, SimulationParams, Vessel } from '../types';
import { PORTS } from '../data/mockData';
import {
  Layers,
  Eye,
  EyeOff,
  Ship,
  Wind,
  Waves,
  Compass,
  Zap,
  Gauge,
  Info,
  Maximize2,
  X
} from 'lucide-react';

interface MaritimeMapProps {
  contracts: CargoContract[];
  selectedContractId: string;
  vessels: Vessel[];
  selectedVesselId: string;
  onSelectVessel: (id: string) => void;
  params: SimulationParams;
}

export const MaritimeMap: React.FC<MaritimeMapProps> = ({
  contracts,
  selectedContractId,
  vessels,
  selectedVesselId,
  onSelectVessel,
  params,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{
    portsLayer?: L.LayerGroup;
    routesLayer?: L.LayerGroup;
    weatherLayer?: L.LayerGroup;
    vesselsLayer?: L.LayerGroup;
  }>({});

  const [showWeatherOverlay, setShowWeatherOverlay] = useState(true);
  const [showBaselineRoute, setShowBaselineRoute] = useState(true);
  const [activePopupVessel, setActivePopupVessel] = useState<Vessel | null>(null);

  const selectedContract = contracts.find((c) => c.id === selectedContractId) || contracts[0];
  const selectedVessel = vessels.find((v) => v.id === selectedVesselId) || vessels[0];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [21.0, 64.0], // Arabian Sea center
        zoom: 5,
        minZoom: 4,
        maxZoom: 9,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Dark Matter tile layer with official CARTO API key format
      const cartoKey = (import.meta as any).env?.VITE_CARTO_API_KEY || 'cb1_33vn_1_356322b03d3aa873306f928d';
      const tileUrl = `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${cartoKey}`;

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Add zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Create layer groups
      layersRef.current.weatherLayer = L.layerGroup().addTo(map);
      layersRef.current.routesLayer = L.layerGroup().addTo(map);
      layersRef.current.portsLayer = L.layerGroup().addTo(map);
      layersRef.current.vesselsLayer = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Update Ports Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const portsLayer = layersRef.current.portsLayer;
    if (!map || !portsLayer) return;

    portsLayer.clearLayers();

    PORTS.forEach((port) => {
      const portIcon = L.divIcon({
        className: 'custom-port-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-6 h-6 rounded-full bg-cyan-400/20 animate-ping"></span>
            <span class="relative w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#080C14] shadow-[0_0_10px_#06B6D4]"></span>
            <div class="absolute left-4 -top-3 whitespace-nowrap bg-[#0D1525]/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-200 px-1.5 py-0.5 rounded shadow-md pointer-events-none">
              ${port.name}
            </div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([port.lat, port.lng], { icon: portIcon });
      marker.bindTooltip(
        `<div class="p-1 font-mono text-xs">
          <strong>${port.name}</strong> (${port.code})<br/>
          Berths: ${port.berths} | Bunkering: ${port.bunkeringFacilities.join(', ')}
        </div>`,
        { direction: 'top', className: 'custom-leaflet-tooltip' }
      );
      portsLayer.addLayer(marker);
    });
  }, []);

  // Update Routes Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routesLayer = layersRef.current.routesLayer;
    if (!map || !routesLayer) return;

    routesLayer.clearLayers();

    const from = selectedContract.fromCoords;
    const to = selectedContract.toCoords;

    // 1. Traditional Direct Route (Red Dotted Line)
    if (showBaselineRoute) {
      // Direct rhumb line
      const baselineLatLngs: [number, number][] = [
        from,
        // Direct route passes right through high wave center
        [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2],
        to,
      ];

      const baselineLine = L.polyline(baselineLatLngs, {
        color: '#EF4444',
        weight: 3,
        dashArray: '8, 8',
        opacity: 0.85,
      });

      baselineLine.bindTooltip(
        `<div class="font-mono text-xs text-rose-300">
          <strong>Traditional Voyage Line</strong><br/>
          • Speed: 19.0 knots (Full Throttle)<br/>
          • High Monsoon Wave Drag (+28%)<br/>
          • Fuel: 100% Dirty Marine Gas Oil
        </div>`,
        { sticky: true }
      );

      routesLayer.addLayer(baselineLine);
    }

    // 2. Quantum Optimized Route (Green Glowing Line)
    // Weather-routed path curved south to bypass high monsoon wave swells
    const midLat = (from[0] + to[0]) / 2 - 2.8; // curved southward away from rough monsoon core
    const midLng = (from[1] + to[1]) / 2;

    const optimizedLatLngs: [number, number][] = [
      from,
      [(from[0] * 2 + midLat) / 3, (from[1] * 2 + midLng) / 3],
      [midLat, midLng],
      [(to[0] * 2 + midLat) / 3, (to[1] * 2 + midLng) / 3],
      to,
    ];

    // Glowing outer halo
    const glowLine = L.polyline(optimizedLatLngs, {
      color: '#10B981',
      weight: 8,
      opacity: 0.35,
    });
    routesLayer.addLayer(glowLine);

    // Sharp inner laser path
    const optimizedLine = L.polyline(optimizedLatLngs, {
      color: '#34D399',
      weight: 3.5,
      opacity: 0.95,
    });

    optimizedLine.bindTooltip(
      `<div class="font-mono text-xs text-emerald-300">
        <strong>Quantum Optimized Trajectory (QPSO)</strong><br/>
        • Optimal Speed: 14.4 knots (Slow Steaming)<br/>
        • Weather Routed: Circumvents 4.5m wave swell<br/>
        • Dual Fuel: 75% LNG / 25% Diesel
      </div>`,
      { sticky: true }
    );

    routesLayer.addLayer(optimizedLine);
  }, [selectedContract, showBaselineRoute, params.isOptimized]);

  // Update Weather Overlay Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const weatherLayer = layersRef.current.weatherLayer;
    if (!map || !weatherLayer) return;

    weatherLayer.clearLayers();

    if (!showWeatherOverlay) return;

    // Generate weather swell hotspots across the central Arabian Sea
    const waveZones = [
      { center: [20.5, 63.5], radius: 240000, height: params.waveHeightMeters, name: 'Central Arabian Swell' },
      { center: [18.2, 66.8], radius: 200000, height: params.waveHeightMeters * 0.85, name: 'Monsoon Front' },
      { center: [23.1, 60.5], radius: 160000, height: params.waveHeightMeters * 0.65, name: 'Gulf of Oman Inflow' },
    ];

    waveZones.forEach((zone) => {
      const color =
        zone.height >= 3.8
          ? '#EF4444' // severe monsoon red
          : zone.height >= 2.2
          ? '#F59E0B' // amber
          : '#06B6D4'; // cyan calm

      const circle = L.circle(zone.center as [number, number], {
        radius: zone.radius,
        color: color,
        fillColor: color,
        fillOpacity: zone.height >= 3.8 ? 0.22 : 0.14,
        weight: 1.5,
        dashArray: '4, 6',
      });

      circle.bindTooltip(
        `<div class="font-mono text-xs">
          <strong>${zone.name}</strong><br/>
          Wave Swell: ${zone.height.toFixed(1)}m<br/>
          Wind: ${params.windSpeedKnots} kt SW Monsoon
        </div>`,
        { sticky: true }
      );

      weatherLayer.addLayer(circle);
    });
  }, [showWeatherOverlay, params.waveHeightMeters, params.windSpeedKnots]);

  // Update Vessels Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const vesselsLayer = layersRef.current.vesselsLayer;
    if (!map || !vesselsLayer) return;

    vesselsLayer.clearLayers();

    vessels.forEach((vessel) => {
      const isSelected = vessel.id === selectedVesselId;
      const speed = params.isOptimized ? vessel.optimizedSpeedKnots : vessel.baselineSpeedKnots;

      const shipIcon = L.divIcon({
        className: 'custom-ship-icon',
        html: `
          <div class="relative cursor-pointer group">
            <div class="absolute -inset-2 rounded-full ${
              isSelected ? 'bg-emerald-400/40 animate-ping' : 'bg-cyan-400/20'
            }"></div>
            <div class="w-7 h-7 rounded-full ${
              isSelected
                ? 'bg-emerald-500 border-2 border-white shadow-[0_0_15px_#10B981]'
                : 'bg-[#0D1525] border-2 border-cyan-400 shadow-[0_0_10px_#06B6D4]'
            } flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(${vessel.headingDeg}deg);">
                <polygon points="12 2 19 21 12 17 5 21 12 2"/>
              </svg>
            </div>
            <div class="absolute left-8 -top-1 whitespace-nowrap bg-[#080C14]/95 border ${
              isSelected ? 'border-emerald-400 text-emerald-300' : 'border-slate-700 text-slate-300'
            } text-[10px] font-mono px-1.5 py-0.5 rounded shadow-lg pointer-events-none">
              ${vessel.name.replace('MV ', '')} • ${speed} kn
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([vessel.currentLat, vessel.currentLng], { icon: shipIcon });
      marker.on('click', () => {
        onSelectVessel(vessel.id);
        setActivePopupVessel(vessel);
      });

      vesselsLayer.addLayer(marker);
    });
  }, [vessels, selectedVesselId, params.isOptimized]);

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#080C14] overflow-hidden">
      {/* Leaflet DOM container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Control HUD Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <div className="bg-[#080C14]/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 font-mono text-xs shadow-xl space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>ARABIAN SEA CORRIDOR</span>
            </span>
            <span className="text-[10px] text-cyan-400">GEO-LIVE</span>
          </div>

          <div className="flex flex-col gap-1.5 text-[11px]">
            {/* Weather Overlay Toggle */}
            <button
              onClick={() => setShowWeatherOverlay(!showWeatherOverlay)}
              className={`flex items-center justify-between gap-3 px-2 py-1 rounded transition-colors cursor-pointer ${
                showWeatherOverlay
                  ? 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Waves className="w-3 h-3 text-blue-400" />
                <span>Monsoon Wave Swell</span>
              </span>
              {showWeatherOverlay ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>

            {/* Baseline Route Toggle */}
            <button
              onClick={() => setShowBaselineRoute(!showBaselineRoute)}
              className={`flex items-center justify-between gap-3 px-2 py-1 rounded transition-colors cursor-pointer ${
                showBaselineRoute
                  ? 'bg-rose-950/50 text-rose-300 border border-rose-800/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-b-2 border-dashed border-rose-400"></span>
                <span>Baseline Route (19 kn)</span>
              </span>
              {showBaselineRoute ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>

            {/* Optimized Route */}
            <div className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-emerald-400 rounded-sm shadow-[0_0_8px_#10B981]"></span>
                <span>QPSO Weather Routed</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphism Telemetry Card (When vessel is clicked or selected) */}
      {selectedVessel && (
        <div className="absolute bottom-3 left-3 z-10 max-w-sm w-[90%] sm:w-80 bg-[#080C14]/92 backdrop-blur-xl border border-cyan-500/40 rounded-xl p-3.5 shadow-2xl space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                <Ship className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">{selectedVessel.name}</h4>
                <p className="text-[10px] text-cyan-400">{selectedVessel.propulsion}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
              {params.isOptimized ? 'CII Grade A' : 'CII Grade D'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-[#0D1525] border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Recommended Speed</span>
              <span className="text-sm font-bold text-emerald-400">
                {params.isOptimized ? selectedVessel.optimizedSpeedKnots : selectedVessel.baselineSpeedKnots} kn
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">
                {params.isOptimized ? 'Slow-steaming optimal' : 'Full throttle baseline'}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[#0D1525] border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Fuel Mix Recommended</span>
              <span className="text-sm font-bold text-cyan-300">
                {params.isOptimized ? `${selectedVessel.fuelBlend.lng}% LNG` : '100% Diesel'}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">
                {params.isOptimized ? `${selectedVessel.fuelBlend.diesel}% Diesel pilot` : 'Dirty MGO baseline'}
              </span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-[#0D1525] border border-slate-800 space-y-1 text-[10px]">
            <div className="flex justify-between text-slate-300">
              <span>Current Weather Drag:</span>
              <span className="text-amber-400 font-semibold">
                {params.isOptimized
                  ? `+${(params.waveHeightMeters * 2.2).toFixed(1)}% (Circumventing swell)`
                  : `+${(params.waveHeightMeters * 6.4).toFixed(1)}% (Severe drag)`}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Position:</span>
              <span className="text-slate-200">{selectedVessel.currentLat.toFixed(2)}°N, {selectedVessel.currentLng.toFixed(2)}°E</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Heading:</span>
              <span className="text-slate-200">{selectedVessel.headingDeg}° (West-Northwest)</span>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-10 bg-[#080C14]/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 font-mono text-[10px] shadow-lg space-y-1">
        <div className="text-slate-400 font-bold uppercase pb-1 border-b border-slate-800">LEGEND</div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-3 h-0.5 bg-rose-500 border-b border-dashed border-rose-400"></span>
          <span>Baseline (19 kn, Full Power)</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="w-3 h-1 bg-emerald-400 rounded-sm shadow-[0_0_6px_#10B981]"></span>
          <span>Quantum QPSO (Weather Routed)</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Major Ports (JNPT, Mundra, Dubai, Salalah)</span>
        </div>
      </div>
    </div>
  );
};
