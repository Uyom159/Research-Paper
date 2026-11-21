import React from 'react';
import { ModelComponentId } from '../types';
import type { ComponentVisualState } from './InteractivePC2DModel';

interface MobileSoftwareBlueprintProps {
  workstation: string;
  selectedComponent: ModelComponentId | null;
  componentStates: Record<ModelComponentId, ComponentVisualState>;
  onSelectComponent: (id: ModelComponentId) => void;
}

interface SoftwareCardMeta {
  id: ModelComponentId;
  category: string;
  title: string;
  description: string;
}

const SOFTWARE_MODULES: SoftwareCardMeta[] = [
  {
    id: 'event_monitor',
    category: 'SYSTEM LOGS',
    title: 'System Error Logs & Running Apps',
    description: 'Checks crash reports, shutdown logs & active apps',
  },
  {
    id: 'security_engine',
    category: 'PC SECURITY',
    title: 'Antivirus & Security Settings',
    description: 'Windows Defender, malware scan & proxy rules',
  },
  {
    id: 'os_driver',
    category: 'WINDOWS DRIVERS',
    title: 'Display Driver & Windows System',
    description: 'Video driver software & Blue Screen (BSOD) errors',
  },
  {
    id: 'network_stack',
    category: 'NETWORK SOFTWARE',
    title: 'Internet & DNS Settings',
    description: 'IP address, router link & website DNS lookup',
  },
  {
    id: 'storage_fs',
    category: 'WINDOWS FILES',
    title: 'Windows Drive Files (C: Drive)',
    description: 'Damaged drive files & CHKDSK repair scan',
  },
  {
    id: 'bios_bootloader',
    category: 'PC STARTUP',
    title: 'Startup & Boot Settings (BIOS)',
    description: 'Windows startup files & Secure Boot check',
  },
];

function getSoftwareCardStyle(state: ComponentVisualState, isSelected: boolean): {
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

export const MobileSoftwareBlueprint: React.FC<MobileSoftwareBlueprintProps> = React.memo(({
  workstation,
  selectedComponent,
  componentStates,
  onSelectComponent,
}) => {
  return (
    <div className="sim-software-mobile-card sim-blueprint-bg px-1.5 py-1.5 select-none">
      <div className="w-full rounded-lg bg-[#0E172A] border-[1.6px] border-slate-700 p-2 space-y-1.5">
        <div className="px-0.5 font-mono text-[9.5px] text-slate-400 leading-none truncate">
          SOFTWARE &amp; WINDOWS SETTINGS · {workstation}
        </div>

        {/* Single-Column Compact Stack of Software Modules */}
        <div className="flex flex-col">
          {SOFTWARE_MODULES.map((mod, idx) => {
            const isSelected = selectedComponent === mod.id;
            const st = getSoftwareCardStyle(componentStates[mod.id], isSelected);
            return (
              <React.Fragment key={mod.id}>
                {idx > 0 && (
                  <div className="flex justify-center" aria-hidden="true">
                    <div className="h-1.5 border-l-2 border-dashed border-slate-700" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onSelectComponent(mod.id)}
                  aria-label={`Inspect ${mod.title}`}
                  className="w-full text-left rounded-md px-2.5 py-1.5 flex flex-col gap-0.5 cursor-pointer transition-transform active:scale-[0.99]"
                  style={{
                    backgroundColor: st.bg,
                    border: `${isSelected ? '1.8px' : '1.3px'} solid ${st.border}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 leading-none">
                    <span className="font-mono text-[8.5px] font-semibold tracking-wide text-blue-400">
                      {mod.category}
                    </span>
                    {st.badgeText ? (
                      <span
                        className="font-mono text-[8.5px] font-bold shrink-0"
                        style={{ color: st.badgeColor }}
                      >
                        {st.badgeText}
                      </span>
                    ) : (
                      <span className="font-mono text-[8.5px] text-slate-400 shrink-0">
                        TAP TO CHECK
                      </span>
                    )}
                  </div>
                  <div className="text-[11.5px] font-bold text-slate-50 leading-tight truncate">
                    {mod.title}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight truncate">
                    {mod.description}
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
});
