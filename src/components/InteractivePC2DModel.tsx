import React, { useEffect, useMemo, useState } from 'react';
import { Cpu, FileWarning, Layers, X } from 'lucide-react';
import { ComponentLayer, ModelComponentId, SimulationScenario2D } from '../types';
import { MobilePCTowerBlueprint } from './MobilePCTowerBlueprint';
import { MobileSoftwareBlueprint } from './MobileSoftwareBlueprint';

export type ComponentVisualState = 'uninspected' | 'diagnosed_nominal' | 'diagnosed_fault' | 'repaired';

const FAN_BLADE_ANGLES = [0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57];

const SvgFanRotor: React.FC<{
  cx: number;
  cy: number;
  bladeRadius: number;
  hubRadius: number;
  spinning: boolean;
  fast?: boolean;
}> = ({ cx, cy, bladeRadius, hubRadius, spinning, fast = false }) => {
  const scale = bladeRadius / 22;
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <g transform={`scale(${scale})`}>
        <g>
          {spinning && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur={fast ? '0.45s' : '2.2s'}
              repeatCount="indefinite"
            />
          )}
          {FAN_BLADE_ANGLES.map((deg, idx) => (
            <path
              key={deg}
              d="M -2.5 -5 C -7 -11, -7 -19, 1 -22 C 6.5 -22, 8.5 -16, 4.5 -10 C 3.2 -8, 2.5 -6, 2.2 -4.5 Z"
              fill={idx % 2 === 0 ? '#64748B' : '#52627A'}
              stroke="#94A3B8"
              strokeWidth="0.45"
              strokeOpacity="0.45"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </g>
      <circle cx="0" cy="0" r={hubRadius} fill="#1E293B" stroke="#94A3B8" strokeWidth="1.2" />
      <circle cx="0" cy="0" r={hubRadius * 0.42} fill="#475569" />
    </g>
  );
};

interface InteractivePC2DModelProps {
  activeLayer: ComponentLayer;
  onChangeLayer: (layer: ComponentLayer) => void;
  selectedComponent: ModelComponentId | null;
  onSelectComponent: (id: ModelComponentId) => void;
  componentStates: Record<ModelComponentId, ComponentVisualState>;
  scenario: SimulationScenario2D;
  fixedFaultIds: Set<ModelComponentId>;
}

const COMPONENT_HOVER_LABELS: Record<ModelComponentId, string> = {
  motherboard: 'Main Motherboard (PCB & 24-Pin)',
  psu: 'Power Supply (PSU)',
  cpu_processor: 'CPU Chip (LGA Socket)',
  cpu_cooler: 'CPU Cooler (Fan & Paste)',
  ram_slots: 'RAM Memory Sticks',
  nvme_m2: 'M.2 Fast SSD',
  gpu_pcie: 'Graphics Card (GPU + 8-Pin)',
  cmos_post: 'BIOS Battery & Error Code',
  front_panel: 'Power Button & Front Pins',
  case_fans: 'PC Case Cooling Fans',
  sata_storage: 'SATA SSD & Cable',
  nic_rj45: 'LAN Cable & Internet Port',
  monitor_display: 'Monitor & HDMI Display',
  event_monitor: 'System Error Logs & Running Apps',
  security_engine: 'Antivirus & Security Settings',
  os_driver: 'Display Driver & Windows System',
  network_stack: 'Internet & DNS Settings',
  storage_fs: 'Windows Drive Files (C: Drive)',
  bios_bootloader: 'Startup & Boot Settings (BIOS)',
};

const getStrokeAndFill = (
  state: ComponentVisualState,
  isSelected: boolean,
  isHovered: boolean,
  filterPrefix: 'pc-tower' | 'pc-mon' | 'pc-sw' = 'pc-tower'
): {
  stroke: string;
  fill: string;
  badgeText: string;
  badgeColor: string;
  strokeWidth: number;
  glowFilter: string | undefined;
} => {
  const strokeWidth = isSelected ? 2.7 : isHovered ? 2.4 : 1.6;

  if (state === 'repaired') {
    return {
      stroke: isSelected ? '#60A5FA' : isHovered ? '#34D399' : '#10B981',
      fill: isHovered ? '#10352D' : isSelected ? '#0F293A' : '#0B2520',
      badgeText: 'FIXED',
      badgeColor: '#34D399',
      strokeWidth,
      glowFilter: isHovered ? `url(#${filterPrefix}-fixed-glow)` : undefined,
    };
  }
  if (state === 'diagnosed_fault') {
    return {
      stroke: isSelected ? '#93C5FD' : isHovered ? '#FB7185' : '#EF4444',
      fill: isHovered ? '#3D1924' : isSelected ? '#2D1622' : '#291216',
      badgeText: 'FAULT',
      badgeColor: '#F87171',
      strokeWidth,
      glowFilter: isHovered ? `url(#${filterPrefix}-fault-glow)` : undefined,
    };
  }
  if (state === 'diagnosed_nominal') {
    return {
      stroke: isSelected ? '#60A5FA' : isHovered ? '#7DD3FC' : '#38BDF8',
      fill: isHovered ? '#163452' : isSelected ? '#12263F' : '#0F2233',
      badgeText: 'OK',
      badgeColor: '#38BDF8',
      strokeWidth,
      glowFilter: isHovered ? `url(#${filterPrefix}-hover-glow)` : undefined,
    };
  }
  return {
    stroke: isSelected ? '#60A5FA' : isHovered ? '#38BDF8' : '#475569',
    fill: isHovered ? '#1E3152' : isSelected ? '#172542' : '#151F32',
    badgeText: '',
    badgeColor: '#94A3B8',
    strokeWidth,
    glowFilter: isHovered ? `url(#${filterPrefix}-hover-glow)` : undefined,
  };
};

export const InteractivePC2DModel: React.FC<InteractivePC2DModelProps> = React.memo(({
  activeLayer,
  onChangeLayer,
  selectedComponent,
  onSelectComponent,
  componentStates,
  scenario,
  fixedFaultIds,
}) => {
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showSymptomsPopup, setShowSymptomsPopup] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState<ModelComponentId | null>(null);

  useEffect(() => {
    setHoveredComponent(null);
  }, [activeLayer]);

  useEffect(() => {
    setShowSymptomsPopup(false);
    setShowHelpPopup(false);
  }, [scenario.id]);

  useEffect(() => {
    if (!showHelpPopup && !showSymptomsPopup) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (showSymptomsPopup) {
        e.stopImmediatePropagation();
        setShowSymptomsPopup(false);
        return;
      }
      if (showHelpPopup) {
        e.stopImmediatePropagation();
        setShowHelpPopup(false);
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [showHelpPopup, showSymptomsPopup]);

  const bindInteractiveProps = (id: ModelComponentId, className: string) => ({
    onClick: () => onSelectComponent(id),
    onMouseEnter: () => setHoveredComponent(id),
    onMouseLeave: () => setHoveredComponent((prev) => (prev === id ? null : prev)),
    onFocus: () => setHoveredComponent(id),
    onBlur: () => setHoveredComponent((prev) => (prev === id ? null : prev)),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelectComponent(id);
      }
    },
    className,
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': `Inspect ${COMPONENT_HOVER_LABELS[id]}`,
  });

  const isFaultActive = (id: ModelComponentId) =>
    scenario.faults.some((f) => f.componentId === id) && !fixedFaultIds.has(id);

  // Subtle physical cues visible on the 2D hardware graphic
  const moboFault = isFaultActive('motherboard');
  const psuFault = isFaultActive('psu');
  const cpuFault = isFaultActive('cpu_processor');
  const gpuUnplugged = isFaultActive('gpu_pcie');
  const ramTilted =
    isFaultActive('ram_slots') &&
    scenario.faults.some((f) => f.componentId === 'ram_slots' && f.requiredFix === 'reseat_ram_latch');
  const cpuHot = isFaultActive('cpu_cooler');
  const nvmeLoose = isFaultActive('nvme_m2');
  const caseFansJammed = isFaultActive('case_fans');
  const frontPanelLoose = isFaultActive('front_panel');
  const sataKinked = isFaultActive('sata_storage');
  const nicBroken = isFaultActive('nic_rj45');
  const monitorFault = isFaultActive('monitor_display');
  const monitorPowerDead =
    monitorFault &&
    scenario.faults.some(
      (f) => f.componentId === 'monitor_display' && f.requiredFix === 'replace_monitor_power'
    );
  const monitorCableLoose = monitorFault && !monitorPowerDead;
  const osDisplayError = isFaultActive('os_driver') || isFaultActive('bios_bootloader');
  const pcNoVideo = gpuUnplugged || moboFault || cpuFault || frontPanelLoose || psuFault;

  const allFixed = scenario.faults.every((f) => fixedFaultIds.has(f.componentId));
  const livePostHex = allFixed
    ? '00'
    : cpuFault && scenario.postCode === 'C1'
      ? 'C1'
      : isFaultActive('ram_slots') && scenario.postCode === '55'
        ? '55'
        : isFaultActive('gpu_pcie') && scenario.postCode === 'd6'
          ? 'd6'
          : isFaultActive('nvme_m2') && scenario.postCode === 'A2'
            ? 'A2'
            : scenario.postCode;

  const faultCues = useMemo(
    () => ({
      moboFault,
      cpuFault,
      gpuUnplugged,
      ramTilted,
      cpuHot,
      nvmeLoose,
      caseFansJammed,
      frontPanelLoose,
      sataKinked,
      nicBroken,
    }),
    [
      moboFault,
      cpuFault,
      gpuUnplugged,
      ramTilted,
      cpuHot,
      nvmeLoose,
      caseFansJammed,
      frontPanelLoose,
      sataKinked,
      nicBroken,
    ]
  );

  return (
    <div className="sim-full-bleed flex-1 min-h-0 bg-slate-950 flex flex-col overflow-hidden">
      {/* Model Layer Toggle Header + Symptoms & '?' How to Troubleshoot Buttons */}
      <div className="shrink-0 px-2.5 sm:px-4 py-1.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 max-w-full">
          <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => onChangeLayer('hardware')}
              title="Hardware Parts"
              aria-label="Hardware Parts"
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeLayer === 'hardware'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="hidden sm:inline">Hardware Parts</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeLayer('software')}
              title="Software & Settings"
              aria-label="Software & Settings"
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeLayer === 'software'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="hidden sm:inline">Software &amp; Settings</span>
            </button>
          </div>

          {/* On-click Symptoms Popup Button */}
          <button
            type="button"
            onClick={() => setShowSymptomsPopup(true)}
            title="View Reported Symptoms"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <FileWarning className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Symptoms</span>
          </button>

          {/* On-click '?' How to Troubleshoot button */}
          <button
            type="button"
            onClick={() => setShowHelpPopup(true)}
            title="How to Troubleshoot"
            aria-label="How to Troubleshoot"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border border-slate-700 hover:border-blue-400 hover:bg-slate-800 text-blue-300 hover:text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            ?
          </button>
        </div>

        <div className="hidden md:block text-[11px] font-mono text-blue-300 transition-colors">
          {hoveredComponent ? (
            <span className="text-sky-300 font-semibold">
              {COMPONENT_HOVER_LABELS[hoveredComponent]} · Click to Check or Fix
            </span>
          ) : activeLayer === 'hardware' ? (
            'Hover & click any PC part, Motherboard, or Monitor to Check or Fix'
          ) : (
            'Hover & click any Software or Windows setting to Check or Fix'
          )}
        </div>
      </div>

      {/* Full-Viewport Popup Interactive 2D Canvas */}
      <div className="sim-popup-stage w-full flex-1 min-h-0 p-0 m-0 sim-blueprint-bg">
        {activeLayer === 'hardware' ? (
          <div className="sim-hardware-split">
            {/* Container 1: PC TOWER CASE (Desktop left side-by-side SVG / Mobile 100% width blueprint on top) */}
            <div className="sim-tower-panel">
              <svg
                viewBox="10 10 740 520"
                className="sim-tower-desktop-svg w-full h-auto block select-none"
                role="img"
                aria-label="Interactive Practice Computer Hardware Tower and Motherboard Model"
              >
                <defs>
                  <pattern id="pc-tower-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1E293B" strokeWidth="0.6" />
                  </pattern>
                  <filter id="pc-tower-hover-glow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#38BDF8" floodOpacity="0.48" />
                  </filter>
                  <filter id="pc-tower-fault-glow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#FB7185" floodOpacity="0.52" />
                  </filter>
                  <filter id="pc-tower-fixed-glow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#34D399" floodOpacity="0.48" />
                  </filter>
                </defs>

                {/* Engineering Blueprint Background */}
                <rect x="10" y="10" width="740" height="520" fill="#0B1324" />
                <rect x="10" y="10" width="740" height="520" fill="url(#pc-tower-grid)" />

                {/* Desktop-only HDMI signal bridge leaving PC Tower right side */}
                <path
                  d="M 740 318 L 750 318"
                  fill="none"
                  stroke={monitorCableLoose ? '#F59E0B' : monitorPowerDead ? '#64748B' : '#38BDF8'}
                  strokeWidth="4"
                  strokeDasharray={monitorCableLoose ? '4 3' : undefined}
                  className="sim-desktop-only"
                />

            {/* Outer ATX Chassis Frame */}
            <rect
              x="20"
              y="18"
              width="720"
              height="504"
              rx="10"
              fill="#0E172A"
              stroke="#334155"
              strokeWidth="2"
            />
            <text x="36" y="40" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono, monospace">
              PC TOWER CASE · {scenario.workstation}
            </text>
            <text
              x="724"
              y="40"
              textAnchor="end"
              fill={allFixed ? '#34D399' : '#FBBF24'}
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
            >
              STARTUP CODE: {livePostHex}
            </text>

            {/* ================= 0. MAIN MOTHERBOARD (CLICKABLE PCB + 24-PIN + CHIPSET) ================= */}
            {(() => {
              const isHovered = hoveredComponent === 'motherboard';
              const st = getStrokeAndFill(
                componentStates.motherboard,
                selectedComponent === 'motherboard',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('motherboard', 'pc-svg-frame')}
                  filter={st.glowFilter}
                >
                  {/* Motherboard PCB Base */}
                  <rect
                    x="40"
                    y="54"
                    width="494"
                    height="350"
                    rx="8"
                    className="pc-svg-rect"
                    fill={
                      componentStates.motherboard === 'diagnosed_fault'
                        ? isHovered ? '#311720' : '#231218'
                        : componentStates.motherboard === 'repaired'
                          ? isHovered ? '#0F2D27' : '#0B201C'
                          : isHovered
                            ? '#172C4D'
                            : selectedComponent === 'motherboard'
                              ? '#13233D'
                              : '#101B30'
                    }
                    stroke={st.stroke}
                    strokeWidth={selectedComponent === 'motherboard' ? 2.7 : isHovered ? 2.5 : 1.8}
                  />

                  {/* Decorative PCB Copper Traces */}
                  <g stroke="#1D3354" strokeWidth="1.2" fill="none" opacity="0.85">
                    <path d="M 154 135 L 168 135" />
                    <path d="M 306 140 L 320 140" />
                    <path d="M 466 140 L 478 140" />
                    <path d="M 235 200 L 235 210" />
                    <path d="M 390 248 L 390 258" />
                    <path d="M 188 404 L 188 420" />
                  </g>

                  {/* Top Motherboard Header Strip & Capacitors */}
                  <text x="54" y="72" fill="#93C5FD" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                    MAIN MOTHERBOARD (Click board, Chipset, or 24-Pin)
                  </text>
                  {/* VRM Capacitors Indicator */}
                  <g>
                    <circle cx="442" cy="67" r="4" fill={moboFault ? '#F59E0B' : '#64748B'} />
                    <circle cx="456" cy="67" r="4" fill={moboFault ? '#EF4444' : '#64748B'} />
                    <circle cx="470" cy="67" r="4" fill="#64748B" />
                  </g>
                  {st.badgeText && (
                    <text
                      x="522"
                      y="72"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}

                  {/* 24-Pin Main Motherboard Power Socket (Right edge of PCB) */}
                  <rect
                    x="478"
                    y="92"
                    width="44"
                    height="108"
                    rx="5"
                    fill="#0B1324"
                    stroke={moboFault ? '#F59E0B' : st.stroke}
                    strokeWidth="1.6"
                  />
                  <g fill="#334155">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <React.Fragment key={i}>
                        <rect x="486" y={102 + i * 11} width="8" height="6" rx="1" />
                        <rect x="500" y={102 + i * 11} width="8" height="6" rx="1" />
                      </React.Fragment>
                    ))}
                  </g>
                  <text
                    x="500"
                    y="192"
                    textAnchor="middle"
                    fill={moboFault ? '#FBBF24' : '#94A3B8'}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    24-PIN
                  </text>

                  {/* Motherboard Chipset Heatsink Block (Row 2 Right) */}
                  <rect
                    x="320"
                    y="210"
                    width="202"
                    height="38"
                    rx="6"
                    fill="#0D192E"
                    stroke={moboFault ? '#F59E0B' : '#334155'}
                    strokeWidth="1.4"
                  />
                  <text x="332" y="227" fill="#E2E8F0" fontSize="10.5" fontWeight="700">
                    Motherboard Chipset &amp; Power
                  </text>
                  <text
                    x="332"
                    y="240"
                    fill={moboFault ? '#FBBF24' : '#94A3B8'}
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {moboFault ? 'Board Power Warning' : 'Main Board Circuits'}
                  </text>

                  {/* Bottom Motherboard Footer Strip */}
                  <rect
                    x="52"
                    y="366"
                    width="470"
                    height="26"
                    rx="5"
                    fill="#0B1324"
                    stroke={selectedComponent === 'motherboard' ? '#60A5FA' : '#1E293B'}
                  />
                  <text x="64" y="383" fill="#CBD5E1" fontSize="9.5" fontWeight="700">
                    Main Motherboard PCB · VRM &amp; 24-Pin Bus
                  </text>
                  <text
                    x="512"
                    y="383"
                    textAnchor="end"
                    fill={moboFault ? '#FBBF24' : '#64748B'}
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {moboFault ? 'Check Board Power' : 'Click Here to Inspect'}
                  </text>
                </g>
              );
            })()}

            {/* 1. LAN Cable & Internet Port (Top Left) */}
            {(() => {
              const isHovered = hoveredComponent === 'nic_rj45';
              const st = getStrokeAndFill(
                componentStates.nic_rj45,
                selectedComponent === 'nic_rj45',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('nic_rj45', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="52"
                    y="82"
                    width="88"
                    height="118"
                    rx="6"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <rect x="62" y="104" width="34" height="26" rx="3" fill="#0B1324" stroke="#64748B" />
                  <rect x="68" y="110" width="22" height="14" rx="1" fill="#1E293B" />
                  <path
                    d="M 22 117 L 62 117"
                    stroke={nicBroken ? '#F59E0B' : '#38BDF8'}
                    strokeWidth="4"
                    strokeDasharray={nicBroken ? '5 3' : undefined}
                  />
                  <rect
                    x="104"
                    y="110"
                    width="12"
                    height="8"
                    rx="1"
                    fill={nicBroken ? '#F59E0B' : '#10B981'}
                  />
                  <text x="60" y="166" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                    LAN Cable
                  </text>
                  <text x="60" y="180" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    Internet Port
                  </text>
                  {st.badgeText && (
                    <text
                      x="134"
                      y="97"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 2A. CPU Processor (Separate Clickable LGA Chip & Socket) */}
            {(() => {
              const isHovered = hoveredComponent === 'cpu_processor';
              const st = getStrokeAndFill(
                componentStates.cpu_processor,
                selectedComponent === 'cpu_processor',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('cpu_processor', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="148"
                    y="82"
                    width="92"
                    height="118"
                    rx="7"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  {/* LGA Socket Frame */}
                  <rect
                    x="164"
                    y="98"
                    width="60"
                    height="56"
                    rx="4"
                    fill="#0B1324"
                    stroke={cpuFault ? '#EF4444' : '#64748B'}
                    strokeWidth="1.5"
                  />
                  {/* Metallic CPU IHS Heat Spreader */}
                  <rect
                    x="172"
                    y="106"
                    width="44"
                    height="40"
                    rx="3"
                    fill="#334155"
                    stroke={cpuFault ? '#F59E0B' : '#94A3B8'}
                    strokeWidth="1.3"
                  />
                  {/* Gold Pin-1 Alignment Triangle */}
                  <polygon points="175,143 182,143 175,136" fill="#FBBF24" />
                  {/* Socket Latch Arm */}
                  <line x1="228" y1="100" x2="228" y2="152" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                  <text
                    x="194"
                    y="129"
                    textAnchor="middle"
                    fill="#E2E8F0"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    CPU
                  </text>
                  {/* Fault status LED dot */}
                  <circle cx="231" cy="91" r="3" fill={cpuFault ? '#EF4444' : '#10B981'} />
                  <text x="156" y="175" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                    CPU Chip
                  </text>
                  <text x="156" y="189" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    LGA Socket
                  </text>
                  {st.badgeText && (
                    <text
                      x="234"
                      y="175"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 2B. CPU Cooling Fan & Thermal Paste */}
            {(() => {
              const isHovered = hoveredComponent === 'cpu_cooler';
              const st = getStrokeAndFill(
                componentStates.cpu_cooler,
                selectedComponent === 'cpu_cooler',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('cpu_cooler', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="248"
                    y="82"
                    width="94"
                    height="118"
                    rx="7"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <circle cx="258" cy="92" r="2.5" fill="#64748B" />
                  <circle cx="332" cy="92" r="2.5" fill={cpuHot ? '#EF4444' : '#64748B'} />
                  <circle cx="295" cy="127" r="27" fill="#0B1324" stroke={cpuHot ? '#EF4444' : '#475569'} strokeWidth="1.5" />
                  <SvgFanRotor cx={295} cy={127} bladeRadius={23} hubRadius={6.5} spinning={true} fast={cpuHot} />
                  <text x="256" y="175" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                    CPU Cooler
                  </text>
                  <text x="256" y="189" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    Fan &amp; Paste
                  </text>
                  {st.badgeText && (
                    <text
                      x="336"
                      y="175"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 3. RAM Memory Sticks */}
            {(() => {
              const isHovered = hoveredComponent === 'ram_slots';
              const st = getStrokeAndFill(
                componentStates.ram_slots,
                selectedComponent === 'ram_slots',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('ram_slots', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="350"
                    y="82"
                    width="120"
                    height="118"
                    rx="7"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <rect
                    x="364"
                    y={ramTilted ? '100' : '94'}
                    width="18"
                    height="64"
                    rx="2"
                    fill="#1E3A5F"
                    stroke={ramTilted ? '#F59E0B' : '#60A5FA'}
                    strokeWidth="1.4"
                    transform={ramTilted ? 'rotate(-5 373 126)' : undefined}
                  />
                  <rect
                    x="394"
                    y="94"
                    width="18"
                    height="64"
                    rx="2"
                    fill="#1E3A5F"
                    stroke="#60A5FA"
                    strokeWidth="1.4"
                  />
                  <rect x="368" y="88" width="10" height="4.5" rx="1" fill={ramTilted ? '#F59E0B' : '#94A3B8'} />
                  <rect x="398" y="88" width="10" height="4.5" rx="1" fill="#94A3B8" />
                  <text x="420" y="116" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    A2/B2
                  </text>
                  <text x="420" y="131" fill="#CBD5E1" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    16GB
                  </text>
                  <text x="360" y="175" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                    RAM Memory
                  </text>
                  <text x="360" y="189" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    Memory Sticks
                  </text>
                  {st.badgeText && (
                    <text
                      x="464"
                      y="175"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 4. M.2 Fast SSD (Horizontal Slot between CPU and GPU) */}
            {(() => {
              const isHovered = hoveredComponent === 'nvme_m2';
              const st = getStrokeAndFill(
                componentStates.nvme_m2,
                selectedComponent === 'nvme_m2',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('nvme_m2', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="52"
                    y="210"
                    width="254"
                    height="38"
                    rx="6"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  {/* M.2 Connector pins */}
                  <rect x="60" y="218" width="10" height="22" rx="2" fill="#334155" />
                  {/* M.2 Stick Graphic */}
                  <rect
                    x="72"
                    y={nvmeLoose ? '215' : '218'}
                    width="82"
                    height="22"
                    rx="2"
                    fill="#1E3A5F"
                    stroke={nvmeLoose ? '#F59E0B' : '#38BDF8'}
                    strokeWidth="1.2"
                    transform={nvmeLoose ? 'rotate(-3 113 226)' : undefined}
                  />
                  <circle cx="148" cy="229" r="3" fill={nvmeLoose ? '#F59E0B' : '#CBD5E1'} />
                  <text x="164" y="227" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                    M.2 Fast SSD
                  </text>
                  <text x="164" y="240" fill={nvmeLoose ? '#FBBF24' : '#94A3B8'} fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    {nvmeLoose ? 'Stick Loose' : 'NVMe Slot'}
                  </text>
                  {st.badgeText && (
                    <text
                      x="298"
                      y="233"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9.5"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 5. Graphics Card (GPU) & 8-Pin Power */}
            {(() => {
              const isHovered = hoveredComponent === 'gpu_pcie';
              const st = getStrokeAndFill(
                componentStates.gpu_pcie,
                selectedComponent === 'gpu_pcie',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('gpu_pcie', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="52"
                    y="258"
                    width="274"
                    height="96"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <rect x="64" y="266" width="136" height="6" rx="2" fill="#334155" />
                  <circle cx="104" cy="310" r="21" fill="#0B1324" stroke={gpuUnplugged ? '#F59E0B' : '#475569'} strokeWidth="1.4" />
                  <SvgFanRotor cx={104} cy={310} bladeRadius={17.5} hubRadius={5.2} spinning={!gpuUnplugged} />
                  <circle cx="164" cy="310" r="21" fill="#0B1324" stroke={gpuUnplugged ? '#F59E0B' : '#475569'} strokeWidth="1.4" />
                  <SvgFanRotor cx={164} cy={310} bladeRadius={17.5} hubRadius={5.2} spinning={!gpuUnplugged} />
                  <rect
                    x="276"
                    y="268"
                    width="38"
                    height="15"
                    rx="2"
                    fill="#0B1324"
                    stroke={gpuUnplugged ? '#F59E0B' : '#10B981'}
                    strokeWidth="1.5"
                  />
                  <text x="295" y="279" textAnchor="middle" fill="#CBD5E1" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                    8-PIN
                  </text>
                  {gpuUnplugged ? (
                    <path
                      d="M 295 289 C 304 299, 314 300, 318 312"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.8"
                      strokeDasharray="4 3"
                    />
                  ) : (
                    <path d="M 295 283 L 295 354" fill="none" stroke="#10B981" strokeWidth="2.8" />
                  )}
                  <text x="198" y="306" fill="#F8FAFC" fontSize="11" fontWeight="700">
                    Graphics Card
                  </text>
                  <text x="198" y="321" fill="#94A3B8" fontSize="9" fontFamily="JetBrains Mono, monospace">
                    GPU + 8-Pin
                  </text>
                  <text x="198" y="336" fill={gpuUnplugged ? '#FBBF24' : '#34D399'} fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    {gpuUnplugged ? 'Power Unplugged' : 'Power Plugged In'}
                  </text>
                  {st.badgeText && (
                    <text
                      x="316"
                      y="344"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9.5"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 6. BIOS Battery & Error Code Screen */}
            {(() => {
              const isHovered = hoveredComponent === 'cmos_post';
              const st = getStrokeAndFill(
                componentStates.cmos_post,
                selectedComponent === 'cmos_post',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('cmos_post', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="338"
                    y="258"
                    width="94"
                    height="96"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <circle cx="364" cy="290" r="14" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.8" />
                  <text x="364" y="293" textAnchor="middle" fill="#0F172A" fontSize="7.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                    3V
                  </text>
                  <rect x="388" y="274" width="34" height="30" rx="4" fill="#020617" stroke="#334155" />
                  <text
                    x="405"
                    y="295"
                    textAnchor="middle"
                    fill={livePostHex === '00' ? '#34D399' : '#F87171'}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {livePostHex}
                  </text>
                  <text x="348" y="328" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                    BIOS Battery
                  </text>
                  <text x="348" y="342" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    3V &amp; Code
                  </text>
                  {st.badgeText && (
                    <text
                      x="426"
                      y="344"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 7. Power Button & Front Cables (Front Panel Header) */}
            {(() => {
              const isHovered = hoveredComponent === 'front_panel';
              const st = getStrokeAndFill(
                componentStates.front_panel,
                selectedComponent === 'front_panel',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('front_panel', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="440"
                    y="258"
                    width="82"
                    height="96"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  {/* Front Panel Pin Header */}
                  <rect x="454" y="274" width="54" height="22" rx="3" fill="#0B1324" stroke="#475569" />
                  <circle cx="464" cy="285" r="2.5" fill={frontPanelLoose ? '#F59E0B' : '#34D399'} />
                  <circle cx="475" cy="285" r="2.5" fill="#60A5FA" />
                  <circle cx="486" cy="285" r="2.5" fill="#94A3B8" />
                  <circle cx="497" cy="285" r="2.5" fill="#94A3B8" />
                  {/* Loose wire visual */}
                  {frontPanelLoose ? (
                    <path
                      d="M 464 298 C 464 308, 478 308, 488 304"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.4"
                      strokeDasharray="3 2"
                    />
                  ) : (
                    <path d="M 464 296 L 464 312" fill="none" stroke="#34D399" strokeWidth="2.4" />
                  )}
                  <text x="449" y="328" fill="#F8FAFC" fontSize="10" fontWeight="700">
                    Power Btn
                  </text>
                  <text x="449" y="342" fill={frontPanelLoose ? '#FBBF24' : '#94A3B8'} fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    {frontPanelLoose ? 'Wire Loose' : 'Front Pins'}
                  </text>
                  {st.badgeText && (
                    <text
                      x="516"
                      y="270"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 8. PC Case Cooling Fans (Top Right Bay) */}
            {(() => {
              const isHovered = hoveredComponent === 'case_fans';
              const st = getStrokeAndFill(
                componentStates.case_fans,
                selectedComponent === 'case_fans',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('case_fans', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="552"
                    y="54"
                    width="174"
                    height="136"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  {/* Left Case Fan */}
                  <circle cx="602" cy="108" r="26" fill="#0B1324" stroke={caseFansJammed ? '#F59E0B' : '#475569'} strokeWidth="1.5" />
                  <SvgFanRotor cx={602} cy={108} bladeRadius={22} hubRadius={6} spinning={!caseFansJammed} />

                  {/* Right Case Fan */}
                  <circle cx="676" cy="108" r="26" fill="#0B1324" stroke={caseFansJammed ? '#F59E0B' : '#475569'} strokeWidth="1.5" />
                  <SvgFanRotor cx={676} cy={108} bladeRadius={22} hubRadius={6} spinning={!caseFansJammed} />

                  <text x="566" y="160" fill="#F8FAFC" fontSize="11" fontWeight="700">
                    PC Case Fans
                  </text>
                  <text
                    x="566"
                    y="176"
                    fill={caseFansJammed ? '#FBBF24' : '#94A3B8'}
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {caseFansJammed ? 'Fan Stopped (0 RPM)' : 'Airflow Normal'}
                  </text>
                  {st.badgeText && (
                    <text
                      x="714"
                      y="160"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9.5"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 9. Storage Drive (SSD) & Cable (Middle Right Drive Bay) */}
            {(() => {
              const isHovered = hoveredComponent === 'sata_storage';
              const st = getStrokeAndFill(
                componentStates.sata_storage,
                selectedComponent === 'sata_storage',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('sata_storage', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  {sataKinked ? (
                    <path
                      d="M 534 316 L 544 316 L 540 334 L 554 334"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.2"
                    />
                  ) : (
                    <path d="M 534 322 L 554 322" fill="none" stroke="#38BDF8" strokeWidth="3" />
                  )}
                  <rect
                    x="552"
                    y="204"
                    width="174"
                    height="200"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <rect x="572" y="222" width="134" height="96" rx="5" fill="#0B1324" stroke="#475569" strokeWidth="1.5" />
                  <rect x="586" y="238" width="104" height="12" rx="2" fill="#1E293B" />
                  <rect x="586" y="258" width="66" height="8" rx="2" fill="#2563EB" opacity="0.6" />
                  <text x="639" y="298" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    512GB SATA SSD
                  </text>
                  <text x="568" y="346" fill="#F8FAFC" fontSize="11.5" fontWeight="700">
                    SSD &amp; Cable
                  </text>
                  <text x="568" y="362" fill="#94A3B8" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    Storage Drive
                  </text>
                  <text
                    x="568"
                    y="382"
                    fill={sataKinked ? '#FBBF24' : '#94A3B8'}
                    fontSize="9"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {sataKinked ? 'Cable Bent' : 'Cable Normal'}
                  </text>
                  {st.badgeText && (
                    <text
                      x="714"
                      y="382"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="9.5"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* 10. Bottom Power Supply Unit (PSU) */}
            {(() => {
              const isHovered = hoveredComponent === 'psu';
              const st = getStrokeAndFill(
                componentStates.psu,
                selectedComponent === 'psu',
                isHovered
              );
              return (
                <g
                  {...bindInteractiveProps('psu', 'pc-svg-part')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="40"
                    y="420"
                    width="332"
                    height="84"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <g stroke="#334155" strokeWidth="2">
                    <line x1="56" y1="436" x2="56" y2="486" />
                    <line x1="66" y1="436" x2="66" y2="486" />
                    <line x1="76" y1="436" x2="76" y2="486" />
                    <line x1="86" y1="436" x2="86" y2="486" />
                    <line x1="96" y1="436" x2="96" y2="486" />
                  </g>
                  <text x="118" y="450" fill="#F8FAFC" fontSize="12" fontWeight="700">
                    Power Supply (PSU)
                  </text>
                  <text x="118" y="468" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                    Power Lines: +12V / +5V / +3.3V
                  </text>
                  <text x="118" y="485" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    Main Power Unit &amp; Cables
                  </text>
                  {st.badgeText && (
                    <text
                      x="360"
                      y="450"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Legend Box bottom right inside chassis */}
            <rect x="388" y="420" width="338" height="84" rx="8" fill="#0B1324" stroke="#1E293B" />
            <text x="404" y="442" fill="#94A3B8" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              QUICK TIP
            </text>
            <text x="404" y="462" fill="#CBD5E1" fontSize="10">
              1. Click any PC part, Motherboard, or Monitor to open popup.
            </text>
            <text x="404" y="478" fill="#CBD5E1" fontSize="10">
              2. Check with a matching tool first, then apply the fix.
            </text>
            <text x="404" y="494" fill="#60A5FA" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
              Click ? beside Software &amp; Settings for full steps.
            </text>

              </svg>

              {/* Mobile (<=768px): Readable Native Blueprint PC Tower & Motherboard */}
              <MobilePCTowerBlueprint
                workstation={scenario.workstation}
                livePostHex={livePostHex}
                allFixed={allFixed}
                selectedComponent={selectedComponent}
                componentStates={componentStates}
                onSelectComponent={onSelectComponent}
                faultCues={faultCues}
              />
            </div>

            {/* Container 2: EXTERNAL MONITOR & HDMI CABLE (Desktop right side-by-side / Mobile stacked underneath with horizontal side-by-side components) */}
            {(() => {
              const isHovered = hoveredComponent === 'monitor_display';
              const st = getStrokeAndFill(
                componentStates.monitor_display,
                selectedComponent === 'monitor_display',
                isHovered,
                'pc-mon'
              );
              const screenBg = monitorPowerDead
                ? '#020617'
                : monitorCableLoose || pcNoVideo
                  ? '#090F1E'
                  : osDisplayError
                    ? '#172554'
                    : '#0D2942';
              const ledColor = monitorPowerDead
                ? '#334155'
                : monitorCableLoose || pcNoVideo || osDisplayError
                  ? '#F59E0B'
                  : '#10B981';
              const monitorCardFill =
                componentStates.monitor_display === 'diagnosed_fault'
                  ? isHovered ? '#321620' : '#231218'
                  : componentStates.monitor_display === 'repaired'
                    ? isHovered ? '#0F2E28' : '#0B201C'
                    : isHovered
                      ? '#182E4F'
                      : selectedComponent === 'monitor_display'
                        ? '#13233D'
                        : '#0E172A';

              return (
                <div className="sim-monitor-panel">
                  {/* Desktop (>768px): Existing side-by-side vertical Monitor SVG */}
                  <svg
                    viewBox="750 10 200 520"
                    className="sim-monitor-desktop-svg w-full h-auto block select-none"
                    role="img"
                    aria-label="Interactive Practice Computer External Monitor and HDMI Display"
                  >
                    <defs>
                      <pattern id="pc-mon-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1E293B" strokeWidth="0.6" />
                      </pattern>
                      <filter id="pc-mon-hover-glow" x="-15%" y="-15%" width="130%" height="130%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#38BDF8" floodOpacity="0.48" />
                      </filter>
                      <filter id="pc-mon-fault-glow" x="-15%" y="-15%" width="130%" height="130%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#FB7185" floodOpacity="0.52" />
                      </filter>
                      <filter id="pc-mon-fixed-glow" x="-15%" y="-15%" width="130%" height="130%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#34D399" floodOpacity="0.48" />
                      </filter>
                    </defs>

                    <rect x="750" y="10" width="200" height="520" fill="#0B1324" />
                    <rect x="750" y="10" width="200" height="520" fill="url(#pc-mon-grid)" />

                    <g
                      {...bindInteractiveProps('monitor_display', 'pc-svg-frame')}
                      filter={st.glowFilter}
                    >
                      {/* HDMI Signal Cable linking PC Tower to Monitor */}
                      <path
                        d="M 750 318 L 760 318"
                        fill="none"
                        stroke={monitorCableLoose ? '#F59E0B' : monitorPowerDead ? '#64748B' : '#38BDF8'}
                        strokeWidth="4"
                        strokeDasharray={monitorCableLoose ? '4 3' : undefined}
                      />

                      {/* Monitor Bay Outer Card */}
                      <rect
                        x="760"
                        y="18"
                        width="180"
                        height="504"
                        rx="10"
                        className="pc-svg-rect"
                        fill={monitorCardFill}
                        stroke={st.stroke}
                        strokeWidth={selectedComponent === 'monitor_display' ? 2.7 : isHovered ? 2.5 : 2}
                      />

                      <text x="774" y="40" fill="#94A3B8" fontSize="10.5" fontFamily="JetBrains Mono, monospace">
                        MONITOR
                      </text>
                      {st.badgeText && (
                        <text
                          x="926"
                          y="40"
                          textAnchor="end"
                          fill={st.badgeColor}
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {st.badgeText}
                        </text>
                      )}

                      {/* Monitor Outer Bezel */}
                      <rect
                        x="774"
                        y="66"
                        width="152"
                        height="196"
                        rx="8"
                        fill="#091120"
                        stroke={monitorFault ? '#F59E0B' : '#475569'}
                        strokeWidth="1.8"
                      />

                      {/* Inner LCD Screen */}
                      <rect
                        x="783"
                        y="75"
                        width="134"
                        height="162"
                        rx="4"
                        fill={screenBg}
                        stroke="#1E293B"
                        strokeWidth="1.2"
                      />

                      {/* Dynamic Screen Output */}
                      {monitorPowerDead ? (
                        <g>
                          <text
                            x="850"
                            y="148"
                            textAnchor="middle"
                            fill="#64748B"
                            fontSize="12"
                            fontWeight="700"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            POWER OFF
                          </text>
                          <text
                            x="850"
                            y="166"
                            textAnchor="middle"
                            fill="#475569"
                            fontSize="9"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            No AC Power
                          </text>
                        </g>
                      ) : monitorCableLoose || pcNoVideo ? (
                        <g>
                          <rect
                            x="798"
                            y="128"
                            width="104"
                            height="48"
                            rx="4"
                            fill="#1E293B"
                            stroke="#F59E0B"
                            strokeWidth="1.2"
                          />
                          <text
                            x="850"
                            y="150"
                            textAnchor="middle"
                            fill="#FBBF24"
                            fontSize="11.5"
                            fontWeight="700"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            NO SIGNAL
                          </text>
                          <text
                            x="850"
                            y="166"
                            textAnchor="middle"
                            fill="#CBD5E1"
                            fontSize="8.5"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            Check HDMI / PC
                          </text>
                        </g>
                      ) : osDisplayError ? (
                        <g>
                          <text
                            x="850"
                            y="142"
                            textAnchor="middle"
                            fill="#93C5FD"
                            fontSize="11"
                            fontWeight="700"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            SYSTEM ERR
                          </text>
                          <text
                            x="850"
                            y="160"
                            textAnchor="middle"
                            fill="#CBD5E1"
                            fontSize="8.5"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            Check Software
                          </text>
                        </g>
                      ) : (
                        <g>
                          {/* Clean Healthy Desktop Preview */}
                          <rect x="794" y="88" width="112" height="16" rx="2" fill="#1D4ED8" opacity="0.55" />
                          <rect x="794" y="112" width="66" height="40" rx="3" fill="#1E3A5F" stroke="#38BDF8" strokeWidth="1" />
                          <rect x="866" y="112" width="40" height="40" rx="3" fill="#1E293B" />
                          <text
                            x="850"
                            y="184"
                            textAnchor="middle"
                            fill="#34D399"
                            fontSize="11"
                            fontWeight="700"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            DISPLAY OK
                          </text>
                          <text
                            x="850"
                            y="200"
                            textAnchor="middle"
                            fill="#94A3B8"
                            fontSize="8.5"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            1080p · 60Hz
                          </text>
                          <rect x="786" y="224" width="128" height="9" rx="1" fill="#0F172A" />
                        </g>
                      )}

                      {/* Monitor Power LED */}
                      <circle cx="910" cy="250" r="3.5" fill={ledColor} />
                      <text x="786" y="253" fill="#64748B" fontSize="8" fontFamily="JetBrains Mono, monospace">
                        24&quot; LED
                      </text>

                      {/* Monitor Neck & Base Stand */}
                      <rect x="838" y="262" width="24" height="32" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />
                      <rect x="802" y="294" width="96" height="11" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />

                      {/* HDMI Cable Status Box */}
                      <rect
                        x="774"
                        y="324"
                        width="152"
                        height="56"
                        rx="6"
                        fill="#0B1324"
                        stroke={monitorCableLoose ? '#F59E0B' : '#334155'}
                        strokeWidth="1.3"
                      />
                      <text x="786" y="344" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                        HDMI Cable
                      </text>
                      <text
                        x="786"
                        y="362"
                        fill={monitorCableLoose ? '#FBBF24' : '#38BDF8'}
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {monitorCableLoose ? 'Plug Loose / No Signal' : 'Connected to GPU'}
                      </text>

                      {/* Monitor AC Power Cord Status Box */}
                      <rect
                        x="774"
                        y="392"
                        width="152"
                        height="56"
                        rx="6"
                        fill="#0B1324"
                        stroke={monitorPowerDead ? '#F59E0B' : '#334155'}
                        strokeWidth="1.3"
                      />
                      <text x="786" y="412" fill="#F8FAFC" fontSize="10.5" fontWeight="700">
                        Monitor Power Cord
                      </text>
                      <text
                        x="786"
                        y="430"
                        fill={monitorPowerDead ? '#FBBF24' : '#34D399'}
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {monitorPowerDead ? 'Dead Power Cord' : 'AC Power Normal'}
                      </text>

                      {/* Bottom Component Label */}
                      <text x="776" y="482" fill="#F8FAFC" fontSize="11.5" fontWeight="700">
                        Monitor &amp; Display
                      </text>
                      <text x="776" y="499" fill="#94A3B8" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                        Click to Check / Fix
                      </text>
                    </g>
                  </svg>

                  {/* Mobile (<=768px): Compact Monitor container on top with horizontal side-by-side components */}
                  <div className="sim-monitor-mobile-card sim-blueprint-bg px-1.5 pt-1.5 pb-0.5">
                    <div
                      {...bindInteractiveProps(
                        'monitor_display',
                        'w-full rounded-lg p-1.5 transition-colors cursor-pointer select-none'
                      )}
                      style={{
                        backgroundColor: monitorCardFill,
                        border: `${selectedComponent === 'monitor_display' ? '2px' : '1.6px'} solid ${st.stroke}`,
                      }}
                    >
                      {/* Monitor Container Header */}
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="font-mono text-[9px] font-semibold tracking-wide text-slate-400">
                            MONITOR
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-[10.5px] font-bold text-slate-50 truncate">
                            Monitor &amp; Display
                          </span>
                        </div>
                        {st.badgeText ? (
                          <span
                            className="font-mono text-[9px] font-bold shrink-0"
                            style={{ color: st.badgeColor }}
                          >
                            {st.badgeText}
                          </span>
                        ) : (
                          <span className="font-mono text-[8.5px] text-slate-400 shrink-0">
                            Tap to Check
                          </span>
                        )}
                      </div>

                      {/* Horizontal Side-by-Side Monitor Components */}
                      <div className="sim-monitor-mobile-grid">
                        {/* Component 1: Monitor Display Bezel + Screen + Stand */}
                        <div className="flex-[1.15] min-w-0 flex flex-col items-center justify-center">
                          <div
                            className="w-full rounded p-0.5 bg-[#091120]"
                            style={{
                              border: `1.3px solid ${monitorFault ? '#F59E0B' : '#475569'}`,
                            }}
                          >
                            <div
                              className="w-full min-h-[38px] rounded-[3px] px-1 py-0.5 flex flex-col items-center justify-center text-center border border-slate-800"
                              style={{ backgroundColor: screenBg }}
                            >
                              {monitorPowerDead ? (
                                <>
                                  <span className="font-mono text-[9px] font-bold text-slate-500 leading-tight">
                                    POWER OFF
                                  </span>
                                  <span className="font-mono text-[7.5px] text-slate-600 leading-tight">
                                    No AC Power
                                  </span>
                                </>
                              ) : monitorCableLoose || pcNoVideo ? (
                                <div className="px-1 py-0.5 rounded bg-slate-800/90 border border-amber-500/80">
                                  <div className="font-mono text-[8.5px] font-bold text-amber-400 leading-tight">
                                    NO SIGNAL
                                  </div>
                                  <div className="font-mono text-[7px] text-slate-300 leading-tight">
                                    Check HDMI / PC
                                  </div>
                                </div>
                              ) : osDisplayError ? (
                                <>
                                  <span className="font-mono text-[8.5px] font-bold text-blue-300 leading-tight">
                                    SYSTEM ERR
                                  </span>
                                  <span className="font-mono text-[7px] text-slate-300 leading-tight">
                                    Check Software
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className="w-full space-y-0.5 mb-0.5 px-0.5">
                                    <div className="h-0.5 w-full rounded-sm bg-blue-700/60" />
                                    <div className="flex gap-0.5">
                                      <div className="h-2 flex-1 rounded-sm bg-[#1E3A5F] border border-sky-400/70" />
                                      <div className="h-2 w-3 rounded-sm bg-slate-800" />
                                    </div>
                                  </div>
                                  <span className="font-mono text-[8.5px] font-bold text-emerald-400 leading-none">
                                    DISPLAY OK
                                  </span>
                                </>
                              )}
                            </div>

                            <div className="flex items-center justify-between px-1 pt-0.5">
                              <span className="font-mono text-[7px] text-slate-500">24&quot; LED</span>
                              <span
                                className="w-1.5 h-1.5 rounded-full inline-block"
                                style={{ backgroundColor: ledColor }}
                              />
                            </div>
                          </div>
                          {/* Monitor Neck & Base Stand */}
                          <div className="w-3.5 h-1 bg-slate-800 border-x border-slate-600" />
                          <div className="w-11 h-0.5 rounded-sm bg-slate-800 border border-slate-600" />
                        </div>

                        {/* Component 2: HDMI Cable Status Box */}
                        <div
                          className="flex-1 min-w-0 rounded bg-[#0B1324] px-1.5 py-1 flex flex-col justify-between"
                          style={{
                            border: `1.2px solid ${monitorCableLoose ? '#F59E0B' : '#334155'}`,
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: monitorCableLoose ? '#F59E0B' : '#38BDF8',
                              }}
                            />
                            <span className="font-mono text-[7.5px] uppercase tracking-wider text-slate-400 truncate">
                              Video Link
                            </span>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-slate-50 leading-tight truncate">
                              HDMI Cable
                            </div>
                            <div
                              className="font-mono text-[8.5px] leading-tight truncate"
                              style={{
                                color: monitorCableLoose ? '#FBBF24' : '#38BDF8',
                              }}
                            >
                              {monitorCableLoose ? 'Plug Loose' : 'Connected'}
                            </div>
                          </div>
                          <div className="h-0.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: monitorCableLoose ? '35%' : '100%',
                                backgroundColor: monitorCableLoose ? '#F59E0B' : '#38BDF8',
                              }}
                            />
                          </div>
                        </div>

                        {/* Component 3: Monitor Power Cord Status Box */}
                        <div
                          className="flex-1 min-w-0 rounded bg-[#0B1324] px-1.5 py-1 flex flex-col justify-between"
                          style={{
                            border: `1.2px solid ${monitorPowerDead ? '#F59E0B' : '#334155'}`,
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: monitorPowerDead ? '#F59E0B' : '#34D399',
                              }}
                            />
                            <span className="font-mono text-[7.5px] uppercase tracking-wider text-slate-400 truncate">
                              AC Power
                            </span>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-slate-50 leading-tight truncate">
                              Power Cord
                            </div>
                            <div
                              className="font-mono text-[8.5px] leading-tight truncate"
                              style={{
                                color: monitorPowerDead ? '#FBBF24' : '#34D399',
                              }}
                            >
                              {monitorPowerDead ? 'Dead Cord' : 'AC Normal'}
                            </div>
                          </div>
                          <div className="h-0.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: monitorPowerDead ? '15%' : '100%',
                                backgroundColor: monitorPowerDead ? '#F59E0B' : '#34D399',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vertical HDMI signal bridge linking Monitor on top down to PC Tower Case */}
                    <div className="flex justify-center">
                      <div
                        className="h-1.5 w-1 rounded-full"
                        style={{
                          backgroundColor: monitorCableLoose
                            ? '#F59E0B'
                            : monitorPowerDead
                              ? '#64748B'
                              : '#38BDF8',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          /* ================= 2D SOFTWARE & OS ARCHITECTURE MODEL ================= */
          <>
            <svg
              viewBox="0 0 760 510"
              className="sim-software-desktop-svg w-full h-auto block select-none"
              role="img"
              aria-label="Interactive Practice Computer Software and Operating System Model"
            >
            <defs>
              <pattern id="sw-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1E293B" strokeWidth="0.6" />
              </pattern>
              <filter id="pc-sw-hover-glow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#38BDF8" floodOpacity="0.48" />
              </filter>
              <filter id="pc-sw-fault-glow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FB7185" floodOpacity="0.52" />
              </filter>
              <filter id="pc-sw-fixed-glow" x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#34D399" floodOpacity="0.48" />
              </filter>
            </defs>

            <rect x="0" y="0" width="760" height="510" fill="#0B1324" />
            <rect x="0" y="0" width="760" height="510" fill="url(#sw-grid)" />

            <rect
              x="22"
              y="20"
              width="716"
              height="470"
              rx="10"
              fill="#0E172A"
              stroke="#334155"
              strokeWidth="2"
            />
            <text x="38" y="44" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono, monospace">
              SOFTWARE &amp; WINDOWS SETTINGS · {scenario.workstation}
            </text>

            {/* Connecting Signal Flow Lines (illuminate on hover of adjacent module) */}
            <g strokeWidth="2" strokeDasharray="4 4">
              <line
                x1="205"
                y1="158"
                x2="205"
                y2="210"
                stroke={hoveredComponent === 'event_monitor' || hoveredComponent === 'os_driver' ? '#38BDF8' : '#334155'}
              />
              <line
                x1="555"
                y1="158"
                x2="555"
                y2="210"
                stroke={hoveredComponent === 'security_engine' || hoveredComponent === 'network_stack' ? '#38BDF8' : '#334155'}
              />
              <line
                x1="205"
                y1="306"
                x2="205"
                y2="362"
                stroke={hoveredComponent === 'os_driver' || hoveredComponent === 'storage_fs' ? '#38BDF8' : '#334155'}
              />
              <line
                x1="555"
                y1="306"
                x2="555"
                y2="362"
                stroke={hoveredComponent === 'network_stack' || hoveredComponent === 'bios_bootloader' ? '#38BDF8' : '#334155'}
              />
              <line
                x1="365"
                y1="112"
                x2="395"
                y2="112"
                stroke={hoveredComponent === 'event_monitor' || hoveredComponent === 'security_engine' ? '#38BDF8' : '#334155'}
              />
              <line
                x1="365"
                y1="258"
                x2="395"
                y2="258"
                stroke={hoveredComponent === 'os_driver' || hoveredComponent === 'network_stack' ? '#38BDF8' : '#334155'}
              />
            </g>

            {/* Row 1 Left: System Error Logs & Running Apps */}
            {(() => {
              const isHovered = hoveredComponent === 'event_monitor';
              const st = getStrokeAndFill(
                componentStates.event_monitor,
                selectedComponent === 'event_monitor',
                isHovered,
                'pc-sw'
              );
              return (
                <g
                  {...bindInteractiveProps('event_monitor', 'pc-svg-card')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="48"
                    y="66"
                    width="316"
                    height="92"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <text x="66" y="92" fill={isHovered ? '#7DD3FC' : '#60A5FA'} fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    SYSTEM LOGS
                  </text>
                  <text x="66" y="114" fill="#F8FAFC" fontSize="13.5" fontWeight="700">
                    System Error Logs &amp; Running Apps
                  </text>
                  <text x="66" y="135" fill={isHovered ? '#CBD5E1' : '#94A3B8'} fontSize="10.5">
                    Checks crash reports, shutdown logs &amp; active apps
                  </text>
                  {isHovered && !st.badgeText && (
                    <text x="350" y="92" textAnchor="end" fill="#7DD3FC" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSPECT →
                    </text>
                  )}
                  {st.badgeText && (
                    <text
                      x="350"
                      y="92"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Row 1 Right: Antivirus & Security Settings */}
            {(() => {
              const isHovered = hoveredComponent === 'security_engine';
              const st = getStrokeAndFill(
                componentStates.security_engine,
                selectedComponent === 'security_engine',
                isHovered,
                'pc-sw'
              );
              return (
                <g
                  {...bindInteractiveProps('security_engine', 'pc-svg-card')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="396"
                    y="66"
                    width="316"
                    height="92"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <text x="414" y="92" fill={isHovered ? '#7DD3FC' : '#60A5FA'} fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    PC SECURITY
                  </text>
                  <text x="414" y="114" fill="#F8FAFC" fontSize="13.5" fontWeight="700">
                    Antivirus &amp; Security Settings
                  </text>
                  <text x="414" y="135" fill={isHovered ? '#CBD5E1' : '#94A3B8'} fontSize="10.5">
                    Windows Defender, malware scan &amp; proxy rules
                  </text>
                  {isHovered && !st.badgeText && (
                    <text x="698" y="92" textAnchor="end" fill="#7DD3FC" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSPECT →
                    </text>
                  )}
                  {st.badgeText && (
                    <text
                      x="698"
                      y="92"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Row 2 Left: Display Driver & Windows System */}
            {(() => {
              const isHovered = hoveredComponent === 'os_driver';
              const st = getStrokeAndFill(
                componentStates.os_driver,
                selectedComponent === 'os_driver',
                isHovered,
                'pc-sw'
              );
              return (
                <g
                  {...bindInteractiveProps('os_driver', 'pc-svg-card')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="48"
                    y="212"
                    width="316"
                    height="94"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <text x="66" y="238" fill={isHovered ? '#7DD3FC' : '#60A5FA'} fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    WINDOWS DRIVERS
                  </text>
                  <text x="66" y="260" fill="#F8FAFC" fontSize="13.5" fontWeight="700">
                    Display Driver &amp; Windows System
                  </text>
                  <text x="66" y="281" fill={isHovered ? '#CBD5E1' : '#94A3B8'} fontSize="10.5">
                    Video driver software &amp; Blue Screen (BSOD) errors
                  </text>
                  {isHovered && !st.badgeText && (
                    <text x="350" y="238" textAnchor="end" fill="#7DD3FC" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSPECT →
                    </text>
                  )}
                  {st.badgeText && (
                    <text
                      x="350"
                      y="238"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Row 2 Right: Internet & DNS Settings */}
            {(() => {
              const isHovered = hoveredComponent === 'network_stack';
              const st = getStrokeAndFill(
                componentStates.network_stack,
                selectedComponent === 'network_stack',
                isHovered,
                'pc-sw'
              );
              return (
                <g
                  {...bindInteractiveProps('network_stack', 'pc-svg-card')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="396"
                    y="212"
                    width="316"
                    height="94"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <text x="414" y="238" fill={isHovered ? '#7DD3FC' : '#60A5FA'} fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    NETWORK SOFTWARE
                  </text>
                  <text x="414" y="260" fill="#F8FAFC" fontSize="13.5" fontWeight="700">
                    Internet &amp; DNS Settings
                  </text>
                  <text x="414" y="281" fill={isHovered ? '#CBD5E1' : '#94A3B8'} fontSize="10.5">
                    IP address, router link &amp; website DNS lookup
                  </text>
                  {isHovered && !st.badgeText && (
                    <text x="698" y="238" textAnchor="end" fill="#7DD3FC" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSPECT →
                    </text>
                  )}
                  {st.badgeText && (
                    <text
                      x="698"
                      y="238"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Row 3 Left: Windows Drive Files (C: Drive) */}
            {(() => {
              const isHovered = hoveredComponent === 'storage_fs';
              const st = getStrokeAndFill(
                componentStates.storage_fs,
                selectedComponent === 'storage_fs',
                isHovered,
                'pc-sw'
              );
              return (
                <g
                  {...bindInteractiveProps('storage_fs', 'pc-svg-card')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="48"
                    y="364"
                    width="316"
                    height="94"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <text x="66" y="390" fill={isHovered ? '#7DD3FC' : '#60A5FA'} fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    WINDOWS FILES
                  </text>
                  <text x="66" y="412" fill="#F8FAFC" fontSize="13.5" fontWeight="700">
                    Windows Drive Files (C: Drive)
                  </text>
                  <text x="66" y="433" fill={isHovered ? '#CBD5E1' : '#94A3B8'} fontSize="10.5">
                    Damaged drive files &amp; CHKDSK repair scan
                  </text>
                  {isHovered && !st.badgeText && (
                    <text x="350" y="390" textAnchor="end" fill="#7DD3FC" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSPECT →
                    </text>
                  )}
                  {st.badgeText && (
                    <text
                      x="350"
                      y="390"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}

            {/* Row 3 Right: Startup & Boot Settings (BIOS) */}
            {(() => {
              const isHovered = hoveredComponent === 'bios_bootloader';
              const st = getStrokeAndFill(
                componentStates.bios_bootloader,
                selectedComponent === 'bios_bootloader',
                isHovered,
                'pc-sw'
              );
              return (
                <g
                  {...bindInteractiveProps('bios_bootloader', 'pc-svg-card')}
                  filter={st.glowFilter}
                >
                  <rect
                    x="396"
                    y="364"
                    width="316"
                    height="94"
                    rx="8"
                    className="pc-svg-rect"
                    fill={st.fill}
                    stroke={st.stroke}
                    strokeWidth={st.strokeWidth}
                  />
                  <text x="414" y="390" fill={isHovered ? '#7DD3FC' : '#60A5FA'} fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                    PC STARTUP
                  </text>
                  <text x="414" y="412" fill="#F8FAFC" fontSize="13.5" fontWeight="700">
                    Startup &amp; Boot Settings (BIOS)
                  </text>
                  <text x="414" y="433" fill={isHovered ? '#CBD5E1' : '#94A3B8'} fontSize="10.5">
                    Windows startup files &amp; Secure Boot check
                  </text>
                  {isHovered && !st.badgeText && (
                    <text x="698" y="390" textAnchor="end" fill="#7DD3FC" fontSize="9.5" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSPECT →
                    </text>
                  )}
                  {st.badgeText && (
                    <text
                      x="698"
                      y="390"
                      textAnchor="end"
                      fill={st.badgeColor}
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {st.badgeText}
                    </text>
                  )}
                </g>
              );
            })()}
          </svg>

            {/* Mobile (<=768px): Tall 1-column Software & Windows Settings Blueprint */}
            <MobileSoftwareBlueprint
              workstation={scenario.workstation}
              selectedComponent={selectedComponent}
              componentStates={componentStates}
              onSelectComponent={onSelectComponent}
            />
          </>
        )}
      </div>

      {/* Compact On-Click Reported Symptoms Popup */}
      {showSymptomsPopup && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-[1px] flex items-center justify-center p-3 md:p-4"
          onClick={() => setShowSymptomsPopup(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="symptoms-popup-title"
        >
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-[350px] md:max-w-[460px] overflow-hidden flex flex-col max-h-[82vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3.5 py-2.5 md:px-4 md:py-3 bg-slate-900 text-white flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 shrink-0 mt-0.5">
                  <FileWarning className="w-4 h-4 text-amber-300" />
                </div>
                <div className="min-w-0">
                  <h3
                    id="symptoms-popup-title"
                    className="text-sm md:text-base font-bold text-white leading-tight"
                  >
                    Reported Symptoms
                  </h3>
                  <p className="text-[11px] font-mono text-slate-300 truncate mt-0.5">
                    {scenario.code} · {scenario.workstation}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSymptomsPopup(false)}
                className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer shrink-0"
                aria-label="Close symptoms popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 md:p-4 space-y-3 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-600">
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                  Client: {scenario.clientName}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
                  {scenario.difficulty}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                  Focus: {scenario.layerFocus}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-amber-900">
                  User Report
                </div>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                  {scenario.reportedSymptom}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Startup Beep Pattern
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-900">
                    {scenario.beepPattern.replace(/\s*\([^)]*\)/g, '')}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Initial Startup Code
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-900">
                    {scenario.postCode}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSymptomsPopup(false)}
                className="w-full py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
              >
                Back to Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact On-Click '?' How to Troubleshoot Popup */}
      {showHelpPopup && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/45 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setShowHelpPopup(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="how-to-troubleshoot-title"
        >
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between gap-2">
              <h3 id="how-to-troubleshoot-title" className="text-sm font-bold">
                How to Troubleshoot
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpPopup(false)}
                className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close help popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside leading-relaxed">
                <li>
                  Click any part on the practice PC, <strong>Main Motherboard</strong>,{' '}
                  <strong>Monitor</strong>, or switch to <strong>Software &amp; Settings</strong>.
                </li>
                <li>
                  In the popup, pick a matching tool under <strong>Check / Diagnose</strong> first.
                </li>
                <li>
                  If a problem is found, switch to <strong>Fix / Action</strong> and apply the repair.
                </li>
                <li>
                  Some cases have multiple faults across Hardware and Software. Click{' '}
                  <strong>Verify System</strong> once all faults are fixed to unlock your 5-Star JSO.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowHelpPopup(false)}
                className="w-full py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
