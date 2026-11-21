import React from 'react';
import { ModelComponentId } from '../types';
import type { ComponentVisualState } from './InteractivePC2DModel';

interface MobilePCTowerBlueprintProps {
  workstation: string;
  livePostHex: string;
  allFixed: boolean;
  selectedComponent: ModelComponentId | null;
  componentStates: Record<ModelComponentId, ComponentVisualState>;
  onSelectComponent: (id: ModelComponentId) => void;
  faultCues: {
    moboFault: boolean;
    cpuFault: boolean;
    gpuUnplugged: boolean;
    ramTilted: boolean;
    cpuHot: boolean;
    nvmeLoose: boolean;
    caseFansJammed: boolean;
    frontPanelLoose: boolean;
    sataKinked: boolean;
    nicBroken: boolean;
  };
}

function getMobileCardStyle(state: ComponentVisualState, isSelected: boolean): {
  bg: string;
  border: string;
  badgeText: string;
  badgeColor: string;
} {
  if (state === 'repaired') {
    return {
      bg: isSelected ? '#0F293A' : '#0B2520',
      border: isSelected ? '#60A5FA' : '#10B981',
      badgeText: 'FIXED',
      badgeColor: '#34D399',
    };
  }
  if (state === 'diagnosed_fault') {
    return {
      bg: isSelected ? '#2D1622' : '#291216',
      border: isSelected ? '#93C5FD' : '#EF4444',
      badgeText: 'FAULT',
      badgeColor: '#F87171',
    };
  }
  if (state === 'diagnosed_nominal') {
    return {
      bg: isSelected ? '#12263F' : '#0F2233',
      border: isSelected ? '#60A5FA' : '#38BDF8',
      badgeText: 'OK',
      badgeColor: '#38BDF8',
    };
  }
  return {
    bg: isSelected ? '#172542' : '#151F32',
    border: isSelected ? '#60A5FA' : '#475569',
    badgeText: '',
    badgeColor: '#94A3B8',
  };
}

const FAN_BLADE_ANGLES = [0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57];

const MiniFanGlyph: React.FC<{
  spinning?: boolean;
  fast?: boolean;
  rimColor?: string;
  size?: number;
}> = ({ spinning = true, fast = false, rimColor = '#475569', size = 28 }) => (
  <svg
    viewBox="0 0 40 40"
    width={size}
    height={size}
    className="shrink-0"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="18" fill="#0B1324" stroke={rimColor} strokeWidth="1.8" />
    <g transform="translate(20, 20)">
      <g transform="scale(0.69)">
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
              strokeWidth="0.5"
              strokeOpacity="0.45"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </g>
      <circle cx="0" cy="0" r="4.8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="2" fill="#475569" />
    </g>
  </svg>
);

export const MobilePCTowerBlueprint: React.FC<MobilePCTowerBlueprintProps> = React.memo(({
  workstation,
  livePostHex,
  allFixed,
  selectedComponent,
  componentStates,
  onSelectComponent,
  faultCues,
}) => {
  const {
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
  } = faultCues;

  const selectChild = (e: React.MouseEvent, id: ModelComponentId) => {
    e.stopPropagation();
    onSelectComponent(id);
  };

  const moboState = componentStates.motherboard;
  const moboSelected = selectedComponent === 'motherboard';
  const moboStyle = getMobileCardStyle(moboState, moboSelected);
  const moboBg =
    moboState === 'diagnosed_fault'
      ? '#231218'
      : moboState === 'repaired'
        ? '#0B201C'
        : moboSelected
          ? '#13233D'
          : '#101B30';

  const cpuStyle = getMobileCardStyle(componentStates.cpu_processor, selectedComponent === 'cpu_processor');
  const coolerStyle = getMobileCardStyle(componentStates.cpu_cooler, selectedComponent === 'cpu_cooler');
  const ramStyle = getMobileCardStyle(componentStates.ram_slots, selectedComponent === 'ram_slots');
  const nicStyle = getMobileCardStyle(componentStates.nic_rj45, selectedComponent === 'nic_rj45');
  const nvmeStyle = getMobileCardStyle(componentStates.nvme_m2, selectedComponent === 'nvme_m2');
  const gpuStyle = getMobileCardStyle(componentStates.gpu_pcie, selectedComponent === 'gpu_pcie');
  const cmosStyle = getMobileCardStyle(componentStates.cmos_post, selectedComponent === 'cmos_post');
  const fpStyle = getMobileCardStyle(componentStates.front_panel, selectedComponent === 'front_panel');
  const fansStyle = getMobileCardStyle(componentStates.case_fans, selectedComponent === 'case_fans');
  const sataStyle = getMobileCardStyle(componentStates.sata_storage, selectedComponent === 'sata_storage');
  const psuStyle = getMobileCardStyle(componentStates.psu, selectedComponent === 'psu');

  return (
    <div className="sim-tower-mobile-card sim-blueprint-bg px-1.5 pt-0.5 pb-1.5 select-none">
      {/* Outer PC Tower Case Frame */}
      <div className="w-full rounded-lg bg-[#0E172A] border-[1.6px] border-slate-700 p-1.5 space-y-1">
        {/* Tower Header */}
        <div className="flex items-center justify-between gap-2 px-0.5 font-mono text-[9.5px] leading-none">
          <span className="text-slate-400 truncate">
            PC TOWER CASE · {workstation}
          </span>
          <span
            className="font-bold shrink-0"
            style={{ color: allFixed ? '#34D399' : '#FBBF24' }}
          >
            CODE: {livePostHex}
          </span>
        </div>

        {/* ================= MAIN MOTHERBOARD PCB (SCREEN-FITTED 100% MOBILE WIDTH) ================= */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Inspect Main Motherboard (PCB & 24-Pin)"
          onClick={() => onSelectComponent('motherboard')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectComponent('motherboard');
            }
          }}
          className="w-full rounded-md p-1.5 space-y-1 cursor-pointer transition-colors"
          style={{
            backgroundColor: moboBg,
            border: `${moboSelected ? '2px' : '1.5px'} solid ${moboStyle.border}`,
          }}
        >
          {/* Motherboard Top Header + VRM Capacitors */}
          <div className="flex items-center justify-between gap-2 leading-none">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-mono text-[9.5px] font-bold text-blue-300 tracking-wide truncate">
                MAIN MOTHERBOARD
              </span>
              <div className="flex items-center gap-0.5 shrink-0" aria-hidden="true">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: moboFault ? '#F59E0B' : '#64748B' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: moboFault ? '#EF4444' : '#64748B' }}
                />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              </div>
            </div>
            {moboStyle.badgeText ? (
              <span
                className="font-mono text-[9px] font-bold shrink-0"
                style={{ color: moboStyle.badgeColor }}
              >
                {moboStyle.badgeText}
              </span>
            ) : (
              <span className="font-mono text-[9px] text-slate-400 shrink-0">PCB</span>
            )}
          </div>

          {/* Row 1: CPU Chip + CPU Cooler */}
          <div className="grid grid-cols-2 gap-1">
            {/* CPU Chip */}
            <button
              type="button"
              onClick={(e) => selectChild(e, 'cpu_processor')}
              aria-label="Inspect CPU Chip (LGA Socket)"
              className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: cpuStyle.bg,
                border: `${selectedComponent === 'cpu_processor' ? '1.8px' : '1.2px'} solid ${cpuStyle.border}`,
              }}
            >
              <div
                className="w-6 h-6 rounded bg-[#0B1324] flex items-center justify-center shrink-0 relative"
                style={{ border: `1.2px solid ${cpuFault ? '#EF4444' : '#64748B'}` }}
              >
                <div
                  className="w-4 h-4 rounded-[2px] bg-slate-700 flex items-center justify-center relative"
                  style={{ border: `1px solid ${cpuFault ? '#F59E0B' : '#94A3B8'}` }}
                >
                  <span className="font-mono text-[6px] font-bold text-slate-100">CPU</span>
                  <span className="absolute bottom-0 left-0 w-1 h-1 bg-amber-400 [clip-path:polygon(0_100%,100%_100%,0_0)]" />
                </div>
                <span
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-[#0B1324]"
                  style={{ backgroundColor: cpuFault ? '#EF4444' : '#10B981' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                    CPU Chip
                  </span>
                  {cpuStyle.badgeText && (
                    <span
                      className="font-mono text-[8px] font-bold shrink-0"
                      style={{ color: cpuStyle.badgeColor }}
                    >
                      {cpuStyle.badgeText}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[8.5px] text-slate-400 leading-tight truncate">
                  LGA Socket
                </div>
              </div>
            </button>

            {/* CPU Cooler */}
            <button
              type="button"
              onClick={(e) => selectChild(e, 'cpu_cooler')}
              aria-label="Inspect CPU Cooler (Fan & Paste)"
              className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: coolerStyle.bg,
                border: `${selectedComponent === 'cpu_cooler' ? '1.8px' : '1.2px'} solid ${coolerStyle.border}`,
              }}
            >
              <MiniFanGlyph
                spinning
                fast={cpuHot}
                rimColor={cpuHot ? '#EF4444' : '#475569'}
                size={24}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                    CPU Cooler
                  </span>
                  {coolerStyle.badgeText && (
                    <span
                      className="font-mono text-[8px] font-bold shrink-0"
                      style={{ color: coolerStyle.badgeColor }}
                    >
                      {coolerStyle.badgeText}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[8.5px] text-slate-400 leading-tight truncate">
                  Fan &amp; Paste
                </div>
              </div>
            </button>
          </div>

          {/* Row 2: RAM Memory Sticks + LAN Cable */}
          <div className="grid grid-cols-2 gap-1">
            {/* RAM Memory */}
            <button
              type="button"
              onClick={(e) => selectChild(e, 'ram_slots')}
              aria-label="Inspect RAM Memory Sticks"
              className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: ramStyle.bg,
                border: `${selectedComponent === 'ram_slots' ? '1.8px' : '1.2px'} solid ${ramStyle.border}`,
              }}
            >
              <div className="flex items-end gap-0.5 h-5 shrink-0">
                <div
                  className="w-2 h-5 rounded-[2px] bg-[#1E3A5F]"
                  style={{
                    border: `1.2px solid ${ramTilted ? '#F59E0B' : '#60A5FA'}`,
                    transform: ramTilted ? 'rotate(-8deg) translateY(1px)' : undefined,
                  }}
                />
                <div className="w-2 h-5 rounded-[2px] bg-[#1E3A5F] border border-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                    RAM Memory
                  </span>
                  {ramStyle.badgeText && (
                    <span
                      className="font-mono text-[8px] font-bold shrink-0"
                      style={{ color: ramStyle.badgeColor }}
                    >
                      {ramStyle.badgeText}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[8.5px] text-slate-400 leading-tight truncate">
                  A2/B2 · 16GB
                </div>
              </div>
            </button>

            {/* LAN Cable */}
            <button
              type="button"
              onClick={(e) => selectChild(e, 'nic_rj45')}
              aria-label="Inspect LAN Cable & Internet Port"
              className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: nicStyle.bg,
                border: `${selectedComponent === 'nic_rj45' ? '1.8px' : '1.2px'} solid ${nicStyle.border}`,
              }}
            >
              <div className="flex items-center gap-0.5 shrink-0">
                <div
                  className="w-2.5 h-0.5 rounded-full"
                  style={{ backgroundColor: nicBroken ? '#F59E0B' : '#38BDF8' }}
                />
                <div className="w-4 h-4 rounded bg-[#0B1324] border border-slate-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-[1px] bg-slate-800" />
                </div>
                <span
                  className="w-1 h-1 rounded-[1px]"
                  style={{ backgroundColor: nicBroken ? '#F59E0B' : '#10B981' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                    LAN Cable
                  </span>
                  {nicStyle.badgeText && (
                    <span
                      className="font-mono text-[8px] font-bold shrink-0"
                      style={{ color: nicStyle.badgeColor }}
                    >
                      {nicStyle.badgeText}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[8.5px] text-slate-400 leading-tight truncate">
                  Internet Port
                </div>
              </div>
            </button>
          </div>

          {/* Row 3: M.2 Fast SSD */}
          <button
            type="button"
            onClick={(e) => selectChild(e, 'nvme_m2')}
            aria-label="Inspect M.2 Fast SSD"
            className="w-full text-left rounded px-1.5 py-1 flex items-center justify-between gap-2 cursor-pointer transition-transform active:scale-[0.99]"
            style={{
              backgroundColor: nvmeStyle.bg,
              border: `${selectedComponent === 'nvme_m2' ? '1.8px' : '1.2px'} solid ${nvmeStyle.border}`,
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="flex items-center shrink-0">
                <div className="w-1 h-3 rounded-l bg-slate-700" />
                <div
                  className="w-9 h-3 rounded-r bg-[#1E3A5F] flex items-center justify-end pr-0.5"
                  style={{
                    border: `1px solid ${nvmeLoose ? '#F59E0B' : '#38BDF8'}`,
                    transform: nvmeLoose ? 'rotate(-3deg)' : undefined,
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: nvmeLoose ? '#F59E0B' : '#CBD5E1' }}
                  />
                </div>
              </div>
              <div className="flex items-baseline gap-1 min-w-0">
                <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                  M.2 Fast SSD
                </span>
                <span
                  className="font-mono text-[8.5px] shrink-0"
                  style={{ color: nvmeLoose ? '#FBBF24' : '#94A3B8' }}
                >
                  · {nvmeLoose ? 'Stick Loose' : 'NVMe Slot'}
                </span>
              </div>
            </div>
            {nvmeStyle.badgeText && (
              <span
                className="font-mono text-[8.5px] font-bold shrink-0"
                style={{ color: nvmeStyle.badgeColor }}
              >
                {nvmeStyle.badgeText}
              </span>
            )}
          </button>

          {/* Row 4: Graphics Card (GPU + 8-Pin) */}
          <button
            type="button"
            onClick={(e) => selectChild(e, 'gpu_pcie')}
            aria-label="Inspect Graphics Card (GPU + 8-Pin)"
            className="w-full text-left rounded px-1.5 py-1 flex items-center justify-between gap-2 cursor-pointer transition-transform active:scale-[0.99]"
            style={{
              backgroundColor: gpuStyle.bg,
              border: `${selectedComponent === 'gpu_pcie' ? '1.8px' : '1.2px'} solid ${gpuStyle.border}`,
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-[#0B1324] border border-slate-700 shrink-0">
                <MiniFanGlyph
                  spinning={!gpuUnplugged}
                  rimColor={gpuUnplugged ? '#F59E0B' : '#475569'}
                  size={20}
                />
                <MiniFanGlyph
                  spinning={!gpuUnplugged}
                  rimColor={gpuUnplugged ? '#F59E0B' : '#475569'}
                  size={20}
                />
              </div>
              <div className="min-w-0">
                <div className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                  Graphics Card (GPU)
                </div>
                <div
                  className="font-mono text-[8.5px] leading-tight font-semibold truncate"
                  style={{ color: gpuUnplugged ? '#FBBF24' : '#34D399' }}
                >
                  {gpuUnplugged ? '8-Pin Unplugged' : '8-Pin Plugged In'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {gpuStyle.badgeText && (
                <span
                  className="font-mono text-[8.5px] font-bold"
                  style={{ color: gpuStyle.badgeColor }}
                >
                  {gpuStyle.badgeText}
                </span>
              )}
              <span
                className="px-1 py-0.5 rounded bg-[#0B1324] font-mono text-[8px] font-bold text-slate-200"
                style={{ border: `1.2px solid ${gpuUnplugged ? '#F59E0B' : '#10B981'}` }}
              >
                8-PIN
              </span>
            </div>
          </button>

          {/* Row 5: BIOS Battery & POST Code + Power Button & Front Pins */}
          <div className="grid grid-cols-2 gap-1">
            {/* BIOS Battery & POST Code */}
            <button
              type="button"
              onClick={(e) => selectChild(e, 'cmos_post')}
              aria-label="Inspect BIOS Battery & Error Code"
              className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: cmosStyle.bg,
                border: `${selectedComponent === 'cmos_post' ? '1.8px' : '1.2px'} solid ${cmosStyle.border}`,
              }}
            >
              <div className="flex items-center gap-0.5 shrink-0">
                <div className="w-4 h-4 rounded-full bg-slate-300 border border-slate-500 flex items-center justify-center font-mono text-[6.5px] font-bold text-slate-900">
                  3V
                </div>
                <div
                  className="px-1 py-0.5 rounded bg-slate-950 border border-slate-700 font-mono text-[9px] font-bold leading-none"
                  style={{ color: livePostHex === '00' ? '#34D399' : '#F87171' }}
                >
                  {livePostHex}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                    BIOS Battery
                  </span>
                  {cmosStyle.badgeText && (
                    <span
                      className="font-mono text-[8px] font-bold shrink-0"
                      style={{ color: cmosStyle.badgeColor }}
                    >
                      {cmosStyle.badgeText}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[8.5px] text-slate-400 leading-tight truncate">
                  3V &amp; Code
                </div>
              </div>
            </button>

            {/* Power Button & Front Pins */}
            <button
              type="button"
              onClick={(e) => selectChild(e, 'front_panel')}
              aria-label="Inspect Power Button & Front Pins"
              className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: fpStyle.bg,
                border: `${selectedComponent === 'front_panel' ? '1.8px' : '1.2px'} solid ${fpStyle.border}`,
              }}
            >
              <div className="px-1 py-1 rounded bg-[#0B1324] border border-slate-600 flex items-center gap-0.5 shrink-0">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: frontPanelLoose ? '#F59E0B' : '#34D399' }}
                />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                    Power Btn
                  </span>
                  {fpStyle.badgeText && (
                    <span
                      className="font-mono text-[8px] font-bold shrink-0"
                      style={{ color: fpStyle.badgeColor }}
                    >
                      {fpStyle.badgeText}
                    </span>
                  )}
                </div>
                <div
                  className="font-mono text-[8.5px] leading-tight truncate"
                  style={{ color: frontPanelLoose ? '#FBBF24' : '#94A3B8' }}
                >
                  {frontPanelLoose ? 'Wire Loose' : 'Front Pins'}
                </div>
              </div>
            </button>
          </div>

          {/* Row 6: Dedicated Tappable Motherboard Chipset & 24-Pin Footer Bar */}
          <div
            className="w-full rounded bg-[#0B1324] px-1.5 py-1 flex items-center justify-between gap-2"
            style={{
              border: `1px solid ${moboFault ? '#F59E0B' : moboSelected ? '#60A5FA' : '#1E293B'}`,
            }}
          >
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="text-[10px] font-bold text-slate-200 leading-tight truncate">
                Motherboard &amp; 24-Pin
              </span>
              <span
                className="font-mono text-[8.5px] leading-tight truncate"
                style={{ color: moboFault ? '#FBBF24' : '#94A3B8' }}
              >
                · {moboFault ? 'Power Warning' : 'Tap to Inspect'}
              </span>
            </div>
            <span
              className="px-1 py-0.5 rounded bg-slate-900 font-mono text-[8px] font-bold shrink-0"
              style={{
                border: `1px solid ${moboFault ? '#F59E0B' : '#334155'}`,
                color: moboFault ? '#FBBF24' : '#94A3B8',
              }}
            >
              24-PIN
            </span>
          </div>
        </div>

        {/* ================= CASE COOLING & SATA STORAGE BAY ================= */}
        <div className="grid grid-cols-2 gap-1">
          {/* PC Case Fans */}
          <button
            type="button"
            onClick={() => onSelectComponent('case_fans')}
            aria-label="Inspect PC Case Cooling Fans"
            className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: fansStyle.bg,
              border: `${selectedComponent === 'case_fans' ? '1.8px' : '1.2px'} solid ${fansStyle.border}`,
            }}
          >
            <div className="flex items-center gap-0.5 shrink-0">
              <MiniFanGlyph
                spinning={!caseFansJammed}
                rimColor={caseFansJammed ? '#F59E0B' : '#475569'}
                size={18}
              />
              <MiniFanGlyph
                spinning={!caseFansJammed}
                rimColor={caseFansJammed ? '#F59E0B' : '#475569'}
                size={18}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                  Case Fans
                </span>
                {fansStyle.badgeText && (
                  <span
                    className="font-mono text-[8px] font-bold shrink-0"
                    style={{ color: fansStyle.badgeColor }}
                  >
                    {fansStyle.badgeText}
                  </span>
                )}
              </div>
              <div
                className="font-mono text-[8.5px] leading-tight truncate"
                style={{ color: caseFansJammed ? '#FBBF24' : '#94A3B8' }}
              >
                {caseFansJammed ? 'Stopped (0 RPM)' : 'Airflow OK'}
              </div>
            </div>
          </button>

          {/* SATA SSD & Cable */}
          <button
            type="button"
            onClick={() => onSelectComponent('sata_storage')}
            aria-label="Inspect SATA SSD & Cable"
            className="text-left rounded px-1.5 py-1 flex items-center gap-1.5 cursor-pointer transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: sataStyle.bg,
              border: `${selectedComponent === 'sata_storage' ? '1.8px' : '1.2px'} solid ${sataStyle.border}`,
            }}
          >
            <div className="flex items-center gap-0.5 shrink-0">
              <span
                className="w-1.5 h-0.5 rounded-full shrink-0"
                style={{ backgroundColor: sataKinked ? '#F59E0B' : '#38BDF8' }}
              />
              <div className="px-1 py-0.5 rounded bg-[#0B1324] border border-slate-600 font-mono text-[7.5px] text-slate-300">
                SSD
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10.5px] font-bold text-slate-50 leading-tight truncate">
                  SSD &amp; Cable
                </span>
                {sataStyle.badgeText && (
                  <span
                    className="font-mono text-[8px] font-bold shrink-0"
                    style={{ color: sataStyle.badgeColor }}
                  >
                    {sataStyle.badgeText}
                  </span>
                )}
              </div>
              <div
                className="font-mono text-[8.5px] leading-tight truncate"
                style={{ color: sataKinked ? '#FBBF24' : '#94A3B8' }}
              >
                {sataKinked ? 'Cable Bent' : '512GB · OK'}
              </div>
            </div>
          </button>
        </div>

        {/* ================= POWER SUPPLY UNIT (PSU) ================= */}
        <button
          type="button"
          onClick={() => onSelectComponent('psu')}
          aria-label="Inspect Power Supply (PSU)"
          className="w-full text-left rounded px-1.5 py-1 flex items-center justify-between gap-2 cursor-pointer transition-transform active:scale-[0.99]"
          style={{
            backgroundColor: psuStyle.bg,
            border: `${selectedComponent === 'psu' ? '1.8px' : '1.2px'} solid ${psuStyle.border}`,
          }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-[#0B1324] border border-slate-700 shrink-0">
              <span className="w-0.5 h-3 bg-slate-600 rounded-full" />
              <span className="w-0.5 h-3 bg-slate-600 rounded-full" />
              <span className="w-0.5 h-3 bg-slate-600 rounded-full" />
              <span className="w-0.5 h-3 bg-slate-600 rounded-full" />
            </div>
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="text-[10.5px] font-bold text-slate-50 leading-tight shrink-0">
                Power Supply (PSU)
              </span>
              <span className="font-mono text-[8.5px] text-slate-400 leading-tight truncate">
                +12V / +5V / +3.3V
              </span>
            </div>
          </div>
          {psuStyle.badgeText && (
            <span
              className="font-mono text-[8.5px] font-bold shrink-0"
              style={{ color: psuStyle.badgeColor }}
            >
              {psuStyle.badgeText}
            </span>
          )}
        </button>
      </div>
    </div>
  );
});
