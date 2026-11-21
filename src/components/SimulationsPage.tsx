import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Cable,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  FileCheck2,
  FileWarning,
  Globe,
  HardDrive,
  Info,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Star,
  Thermometer,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import {
  ComponentLayer,
  DiagnosticToolId,
  ModelComponentId,
  RepairActionId,
  SimulationScenario2D,
  StarRatingBreakdown,
  SubmittedJSO,
} from '../types';
import {
  DIAGNOSTIC_TOOLS,
  MODEL_COMPONENTS,
  REPAIR_ACTIONS,
  SIMULATION_SCENARIOS_2D,
  calculateStarRating,
  formatDuration,
  generateCustomScenario,
  getDifficultyTurnaroundAllowance,
} from '../data/simulationScenarios';
import { ComponentVisualState, InteractivePC2DModel } from './InteractivePC2DModel';

interface SimulationsPageProps {
  userName: string;
  userSection: string;
  onUpdateUserProfile: (name: string, section: string) => void;
  submittedJSOs: SubmittedJSO[];
  onSubmitJSO: (jso: SubmittedJSO) => void;
}

interface LogEntry {
  id: string;
  time: string;
  kind: 'info' | 'fault' | 'success' | 'turnaround';
  text: string;
}

const MechanicalGearsSVG: React.FC<{ variant: 'diagnose' | 'fix' | 'reformat' }> = ({
  variant,
}) => {
  const primaryColor =
    variant === 'reformat' ? '#BE123C' : variant === 'fix' ? '#047857' : '#1D4ED8';
  const secondaryColor =
    variant === 'reformat' ? '#F43F5E' : variant === 'fix' ? '#14B8A6' : '#0EA5E9';

  return (
    <svg
      viewBox="0 0 64 64"
      className="w-12 h-12 shrink-0 select-none"
      aria-hidden="true"
    >
      {/* Large 8-tooth gear spinning clockwise */}
      <g transform="translate(23, 23)">
        <g fill={primaryColor}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="2.2s"
            repeatCount="indefinite"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="-2.9"
              y="-17.5"
              width="5.8"
              height="6"
              rx="1.2"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="13.5" />
          <circle cx="0" cy="0" r="8.2" fill="#FFFFFF" />
          <rect x="-1.6" y="-9.2" width="3.2" height="18.4" />
          <rect x="-9.2" y="-1.6" width="18.4" height="3.2" />
          <circle cx="0" cy="0" r="4.2" />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
        </g>
      </g>

      {/* Small 6-tooth interlocking gear spinning counter-clockwise (4:3 tooth speed ratio) */}
      <g transform="translate(44.5, 42.5)">
        <g fill={secondaryColor}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="390"
            to="30"
            dur="1.65s"
            repeatCount="indefinite"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect
              key={deg}
              x="-2.5"
              y="-13.6"
              width="5"
              height="5.2"
              rx="1.1"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="10.2" />
          <circle cx="0" cy="0" r="5.6" fill="#FFFFFF" />
          <rect x="-1.3" y="-6.4" width="2.6" height="12.8" />
          <rect x="-6.4" y="-1.3" width="12.8" height="2.6" />
          <circle cx="0" cy="0" r="3" />
          <circle cx="0" cy="0" r="1.3" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  );
};

const MiniSpinningGear: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
    <g transform="translate(12, 12)">
      <g fill="currentColor">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="1.4s"
          repeatCount="indefinite"
        />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="-1.6"
            y="-9.5"
            width="3.2"
            height="3.4"
            rx="0.7"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="7" />
        <circle cx="0" cy="0" r="3" fill="#047857" />
      </g>
    </g>
  </svg>
);

const ALL_COMPONENT_IDS: ModelComponentId[] = [
  'motherboard',
  'psu',
  'cpu_processor',
  'cpu_cooler',
  'ram_slots',
  'nvme_m2',
  'gpu_pcie',
  'cmos_post',
  'front_panel',
  'case_fans',
  'sata_storage',
  'nic_rj45',
  'monitor_display',
  'bios_bootloader',
  'os_driver',
  'event_monitor',
  'network_stack',
  'storage_fs',
  'security_engine',
];

const createInitialComponentStates = (): Record<ModelComponentId, ComponentVisualState> => {
  const map = {} as Record<ModelComponentId, ComponentVisualState>;
  ALL_COMPONENT_IDS.forEach((id) => {
    map[id] = 'uninspected';
  });
  return map;
};

const renderToolIcon = (toolId: DiagnosticToolId) => {
  const cls = 'w-4 h-4';
  switch (toolId) {
    case 'multimeter':
      return <Zap className={cls} />;
    case 'post_analyzer':
      return <Activity className={cls} />;
    case 'thermal_probe':
      return <Thermometer className={cls} />;
    case 'memtest86':
      return <Cpu className={cls} />;
    case 'cable_tester':
      return <Cable className={cls} />;
    case 'smart_chkdsk':
      return <HardDrive className={cls} />;
    case 'event_windbg':
      return <FileWarning className={cls} />;
    case 'network_cli':
      return <Globe className={cls} />;
    case 'security_scanner':
      return <ShieldAlert className={cls} />;
  }
};

export const StarRatingDisplay: React.FC<{ stars: number; size?: 'sm' | 'md' }> = ({
  stars,
  size = 'md',
}) => {
  const dim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${stars.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = stars >= i;
        const half = !filled && stars >= i - 0.5;
        return (
          <Star
            key={i}
            className={`${dim} ${
              filled
                ? 'text-amber-500 fill-amber-500'
                : half
                  ? 'text-amber-500 fill-amber-300'
                  : 'text-slate-300'
            }`}
          />
        );
      })}
      <span className="ml-1.5 font-mono text-xs font-bold text-slate-800 tabular-nums">
        {stars.toFixed(1)} / 5.0
      </span>
    </span>
  );
};

export const SimulationsPage: React.FC<SimulationsPageProps> = ({
  userName,
  userSection,
  onUpdateUserProfile,
  submittedJSOs,
  onSubmitJSO,
}) => {
  const [viewMode, setViewMode] = useState<'hub' | 'bench' | 'jso_archive'>('hub');
  const [activeScenario, setActiveScenario] = useState<SimulationScenario2D | null>(null);

  // Custom "+" Scenario Builder state
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [customFaultCount, setCustomFaultCount] = useState<1 | 2 | 3 | 4 | 5>(2);
  const [customLayerPref, setCustomLayerPref] = useState<'mixed' | 'hardware' | 'software'>('mixed');

  // Active 2D Workbench state
  const [activeLayer, setActiveLayer] = useState<ComponentLayer>('hardware');
  const [selectedComponent, setSelectedComponent] = useState<ModelComponentId | null>(null);
  const [actionTab, setActionTab] = useState<'diagnose' | 'fix'>('diagnose');
  const [popupFeedback, setPopupFeedback] = useState<{
    kind: LogEntry['kind'];
    text: string;
  } | null>(null);
  const [hoveredOption, setHoveredOption] = useState<{
    kind: 'diagnose' | 'fix';
    title: string;
    subtitle?: string;
    description: string;
  } | null>(null);
  const [processingAction, setProcessingAction] = useState<{
    type: 'diagnose' | 'fix';
    label: string;
  } | null>(null);
  const actionTimerRef = useRef<number | null>(null);

  const [componentStates, setComponentStates] = useState<
    Record<ModelComponentId, ComponentVisualState>
  >(createInitialComponentStates);
  const [fixedFaultIds, setFixedFaultIds] = useState<Set<ModelComponentId>>(new Set());
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Telemetry metrics for 5-Star Rating
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [turnarounds, setTurnarounds] = useState(0);
  const [totalActions, setTotalActions] = useState(0);
  const [validStructuredActions, setValidStructuredActions] = useState(0);
  const [dataLossPenalty, setDataLossPenalty] = useState(false);

  // Verification & JSO state
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSystemVerified, setIsSystemVerified] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showJSOModal, setShowJSOModal] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [computedRating, setComputedRating] = useState<StarRatingBreakdown | null>(null);
  const verifyTimerRef = useRef<number | null>(null);
  const elapsedSecondsRef = useRef(0);
  const componentStatesRef = useRef(componentStates);
  const processingActionRef = useRef(processingAction);

  // JSO Editable form fields
  const [jsoTechName, setJsoTechName] = useState(userName);
  const [jsoSection, setJsoSection] = useState(userSection);
  const [jsoRootCause, setJsoRootCause] = useState('');
  const [jsoActionTaken, setJsoActionTaken] = useState('');
  const [jsoUserSignature, setJsoUserSignature] = useState('');
  const [jsoOrderNumber, setJsoOrderNumber] = useState('JSO-2026-001');
  const [jsoDate, setJsoDate] = useState('');
  const [jsoSubmittedSuccess, setJsoSubmittedSuccess] = useState(false);
  const [activeArchiveJSO, setActiveArchiveJSO] = useState<SubmittedJSO | null>(null);
  const [printingJsoId, setPrintingJsoId] = useState<string | null>(null);
  const printTimerRef = useRef<number | null>(null);

  const clearPendingActionTimers = () => {
    if (actionTimerRef.current !== null) {
      window.clearTimeout(actionTimerRef.current);
      actionTimerRef.current = null;
    }
    if (verifyTimerRef.current !== null) {
      window.clearTimeout(verifyTimerRef.current);
      verifyTimerRef.current = null;
    }
    processingActionRef.current = null;
    setProcessingAction(null);
    setIsVerifying(false);
  };

  useEffect(() => {
    elapsedSecondsRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  useEffect(() => {
    componentStatesRef.current = componentStates;
  }, [componentStates]);

  useEffect(() => {
    processingActionRef.current = processingAction;
  }, [processingAction]);

  useEffect(() => {
    const handleAfterPrint = () => setPrintingJsoId(null);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
      if (printTimerRef.current !== null) {
        window.clearTimeout(printTimerRef.current);
        printTimerRef.current = null;
      }
      clearPendingActionTimers();
    };
  }, []);

  useEffect(() => {
    setJsoTechName(userName);
    setJsoSection(userSection);
  }, [userName, userSection]);

  useEffect(() => {
    if (!isTimerRunning || viewMode !== 'bench') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isTimerRunning, viewMode]);

  useEffect(() => {
    if (viewMode !== 'bench' || !activeScenario) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [viewMode, activeScenario]);

  useEffect(() => {
    if (!selectedComponent && !showRatingModal && !showJSOModal && !showActivityLog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (showJSOModal) {
        setShowJSOModal(false);
        return;
      }
      if (showRatingModal) {
        setShowRatingModal(false);
        return;
      }
      if (selectedComponent && !processingAction) {
        setSelectedComponent(null);
        setPopupFeedback(null);
        setHoveredOption(null);
        return;
      }
      if (showActivityLog) {
        setShowActivityLog(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, processingAction, showRatingModal, showJSOModal, showActivityLog]);

  const appendLog = (kind: LogEntry['kind'], text: string) => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        time: formatDuration(elapsedSecondsRef.current),
        kind,
        text,
      },
      ...prev,
    ]);
  };

  const launchScenario = (scenario: SimulationScenario2D) => {
    clearPendingActionTimers();
    setActiveScenario(scenario);
    setComponentStates(createInitialComponentStates());
    setFixedFaultIds(new Set());
    setElapsedSeconds(0);
    setTurnarounds(0);
    setTotalActions(0);
    setValidStructuredActions(0);
    setDataLossPenalty(false);
    setIsSystemVerified(false);
    setVerificationFeedback(null);
    setShowRatingModal(false);
    setShowJSOModal(false);
    setShowActivityLog(false);
    setComputedRating(null);
    setJsoUserSignature('');
    setJsoSubmittedSuccess(false);
    setShowCustomBuilder(false);

    // Default initial layer without auto-opening a popup
    const defaultLayer: ComponentLayer =
      scenario.layerFocus === 'Software' ? 'software' : 'hardware';
    setActiveLayer(defaultLayer);
    setSelectedComponent(null);
    setPopupFeedback(null);
    setHoveredOption(null);
    setActionTab('diagnose');

    setLogs([
      {
        id: 'log-start',
        time: '00m 00s',
        kind: 'info',
        text: `Opened ${scenario.code} (${scenario.workstation}). Tap any PC part to Check or Fix.`,
      },
    ]);

    setIsTimerRunning(true);
    setViewMode('bench');
  };

  const leaveActiveBench = (targetView: 'hub' | 'jso_archive') => {
    clearPendingActionTimers();
    setIsTimerRunning(false);
    setSelectedComponent(null);
    setPopupFeedback(null);
    setHoveredOption(null);
    setShowRatingModal(false);
    setShowJSOModal(false);
    setShowActivityLog(false);
    if (targetView === 'jso_archive') {
      setActiveArchiveJSO(null);
    }
    setViewMode(targetView);
  };

  const handleChangeLayer = useCallback((layer: ComponentLayer) => {
    setActiveLayer(layer);
    setSelectedComponent(null);
    setPopupFeedback(null);
    setHoveredOption(null);
  }, []);

  const handleOpenComponentPopup = useCallback((id: ModelComponentId) => {
    if (processingActionRef.current) return;
    setSelectedComponent(id);
    setActiveLayer(MODEL_COMPONENTS[id].layer);
    setActionTab(componentStatesRef.current[id] === 'diagnosed_fault' ? 'fix' : 'diagnose');
    setPopupFeedback(null);
    setHoveredOption(null);
  }, []);

  const handleCloseComponentPopup = () => {
    if (processingAction) return;
    setSelectedComponent(null);
    setPopupFeedback(null);
    setHoveredOption(null);
  };

  const runTimedAction = (
    type: 'diagnose' | 'fix',
    label: string,
    durationMs: number,
    onComplete: () => void
  ) => {
    clearPendingActionTimers();
    setPopupFeedback(null);
    const nextAction = { type, label };
    processingActionRef.current = nextAction;
    setProcessingAction(nextAction);

    actionTimerRef.current = window.setTimeout(() => {
      clearPendingActionTimers();
      onComplete();
    }, durationMs);
  };

  const handleCancelProcessingAction = () => {
    if (!processingAction) return;
    const cancelledLabel = processingAction.label.replace(/\.\.\.$/, '');
    clearPendingActionTimers();
    setTurnarounds((prev) => prev + 1);
    setTotalActions((prev) => prev + 1);
    const msg = `Cancelled (+1 Turnaround): "${cancelledLabel}" was stopped before completion. Start the process over to continue.`;
    setPopupFeedback({ kind: 'turnaround', text: msg });
    appendLog('turnaround', msg);
  };

  const handleCreateCustom = () => {
    const custom = generateCustomScenario(customFaultCount, customLayerPref);
    launchScenario(custom);
  };

  const handleDiagnoseWithTool = (toolId: DiagnosticToolId) => {
    if (!activeScenario || !selectedComponent || isSystemVerified || processingAction) return;
    const targetId = selectedComponent;
    const comp = MODEL_COMPONENTS[targetId];
    const tool = DIAGNOSTIC_TOOLS[toolId];

    runTimedAction(
      'diagnose',
      `Checking ${comp.shortLabel} with ${tool.shortName}...`,
      3000,
      () => {
        const faultOnComponent = activeScenario.faults.find((f) => f.componentId === targetId);
        const alreadyFixed = fixedFaultIds.has(targetId);

        setTotalActions((prev) => prev + 1);

        const isAppropriateTool = comp.validDiagnosticTools.includes(toolId);

        if (!isAppropriateTool) {
          setTurnarounds((prev) => prev + 1);
          const msg = `Wrong Tool (+1 Turnaround): ${tool.shortName} cannot check ${comp.shortLabel}. Pick a tool that matches this part.`;
          setPopupFeedback({ kind: 'turnaround', text: msg });
          appendLog('turnaround', msg);
          return;
        }

        setValidStructuredActions((prev) => prev + 1);

        if (faultOnComponent && !alreadyFixed) {
          setComponentStates((prev) => ({ ...prev, [targetId]: 'diagnosed_fault' }));
          const msg = `${tool.shortName} on ${comp.shortLabel}: ${faultOnComponent.diagnosticReading}`;
          setPopupFeedback({ kind: 'fault', text: msg });
          appendLog('fault', msg);
        } else if (faultOnComponent && alreadyFixed) {
          setComponentStates((prev) => ({ ...prev, [targetId]: 'repaired' }));
          const msg = `${tool.shortName} checked ${comp.shortLabel}: ${faultOnComponent.fixedReading}`;
          setPopupFeedback({ kind: 'success', text: msg });
          appendLog('success', msg);
        } else {
          setComponentStates((prev) => ({ ...prev, [targetId]: 'diagnosed_nominal' }));
          const msg = `${tool.shortName} on ${comp.shortLabel}: ${comp.nominalReading}`;
          setPopupFeedback({ kind: 'info', text: msg });
          appendLog('info', msg);
        }
      }
    );
  };

  const handleApplyFix = (actionId: RepairActionId) => {
    if (!activeScenario || !selectedComponent || isSystemVerified || processingAction) return;
    const targetId = selectedComponent;
    const comp = MODEL_COMPONENTS[targetId];
    const repair = REPAIR_ACTIONS[actionId];
    const wasDiagnosed = componentStates[targetId] === 'diagnosed_fault';
    const hasBeenDiagnosed = componentStates[targetId] !== 'uninspected';
    const baseFixDurationMs = actionId === 'reformat_os' ? 6000 : 4600;
    const fixDurationMs = hasBeenDiagnosed ? baseFixDurationMs : baseFixDurationMs * 5;

    runTimedAction(
      'fix',
      hasBeenDiagnosed
        ? `Applying fix: ${repair.name}...`
        : `Undiagnosed fix (5x slower): ${repair.name}...`,
      fixDurationMs,
      () => {
        const faultOnComponent = activeScenario.faults.find((f) => f.componentId === targetId);
        const alreadyFixed = fixedFaultIds.has(targetId);

        setTotalActions((prev) => prev + 1);

        // Special high-risk handling for Reformat Drive & Reinstall Windows
        if (actionId === 'reformat_os') {
          const genuinelyNeedsReformat =
            Boolean(faultOnComponent) &&
            !alreadyFixed &&
            faultOnComponent?.requiredFix === 'reformat_os';

          if (!genuinelyNeedsReformat) {
            setTurnarounds((prev) => prev + 4);
            setDataLossPenalty(true);
            const msg =
              'CRITICAL PENALTY (+4 Turnarounds · Accuracy Lost to 0%): Reformatting wiped all user data and DID NOT solve this issue! Always diagnose and apply targeted repairs instead of blindly reformatting.';
            setPopupFeedback({ kind: 'turnaround', text: msg });
            appendLog('turnaround', msg);
            return;
          }

          // Even when the scenario truly needs Reformat, learner MUST complete strict full diagnosis first
          const requiredDiagIds = faultOnComponent?.requiresMultiDiagnosis ?? [targetId];
          const latestStates = componentStatesRef.current;
          const missingDiagNames = requiredDiagIds
            .filter(
              (id) =>
                latestStates[id] !== 'diagnosed_fault' && latestStates[id] !== 'repaired'
            )
            .map((id) => MODEL_COMPONENTS[id].shortLabel);

          if (missingDiagNames.length > 0) {
            setTurnarounds((prev) => prev + 4);
            setDataLossPenalty(true);
            const msg = `REFORMAT BLOCKED (+4 Turnarounds · Accuracy Lost to 0%): You tried to Reformat without completing full diagnosis first! Diagnose ${missingDiagNames.join(' and ')} to confirm the OS is truly unrecoverable before reformatting.`;
            setPopupFeedback({ kind: 'turnaround', text: msg });
            appendLog('turnaround', msg);
            return;
          }

          setValidStructuredActions((prev) => prev + 1);
          const msg = `Authorized Reformat Complete (${comp.shortLabel}): ${faultOnComponent!.fixedReading}`;
          setPopupFeedback({ kind: 'success', text: msg });
          appendLog('success', msg);

          setFixedFaultIds((prev) => {
            const next = new Set(prev);
            next.add(targetId);
            return next;
          });
          setComponentStates((prev) => ({ ...prev, [targetId]: 'repaired' }));
          setVerificationFeedback(null);
          return;
        }

        if (!faultOnComponent || alreadyFixed) {
          setTurnarounds((prev) => prev + 1);
          const msg = `Turnaround (+1): "${repair.name}" is not needed because ${comp.shortLabel} has no active problem.`;
          setPopupFeedback({ kind: 'turnaround', text: msg });
          appendLog('turnaround', msg);
          return;
        }

        if (faultOnComponent.requiredFix !== actionId) {
          setTurnarounds((prev) => prev + 1);
          const msg = `Turnaround (+1): "${repair.name}" did not fix "${faultOnComponent.faultTitle}". Check the test result and try the right fix.`;
          setPopupFeedback({ kind: 'turnaround', text: msg });
          appendLog('turnaround', msg);
          return;
        }

        if (!wasDiagnosed) {
          setTurnarounds((prev) => prev + 1);
          const msg = `Fixed with Turnaround (+1): You fixed ${comp.shortLabel} without checking it with a tool first! Always check before fixing.`;
          setPopupFeedback({ kind: 'turnaround', text: msg });
          appendLog('turnaround', msg);
        } else {
          setValidStructuredActions((prev) => prev + 1);
          const msg = `Fixed ${comp.shortLabel} (${repair.name}). ${faultOnComponent.fixedReading}`;
          setPopupFeedback({ kind: 'success', text: msg });
          appendLog('success', msg);
        }

        setFixedFaultIds((prev) => {
          const next = new Set(prev);
          next.add(targetId);
          return next;
        });
        setComponentStates((prev) => ({ ...prev, [targetId]: 'repaired' }));
        setVerificationFeedback(null);
      }
    );
  };

  const handleVerifySystem = () => {
    if (!activeScenario || processingAction || isVerifying) return;
    setIsVerifying(true);
    setVerificationFeedback('Testing PC startup, checking hardware voltages, temperatures, and Windows settings...');

    verifyTimerRef.current = window.setTimeout(() => {
      setIsVerifying(false);
      verifyTimerRef.current = null;

      const remainingFaults = activeScenario.faults.filter((f) => !fixedFaultIds.has(f.componentId));

      if (remainingFaults.length > 0) {
        setTurnarounds((prev) => prev + 1);
        setTotalActions((prev) => prev + 1);
        const msg =
          'Verification Failed: There is still a problem in the PC. Keep checking Hardware Parts and Software & Settings to find and fix it.';
        setVerificationFeedback(msg);
        appendLog('turnaround', `Turnaround (+1): ${msg}`);
        return;
      }

      // Full System Verified! Stop timer and compute 5-Star Rating first
      setIsTimerRunning(false);
      setIsSystemVerified(true);
      setVerificationFeedback(
        'System test passed. Review your score rating, then generate your JSO.'
      );
      appendLog('success', 'System test passed. Performance rated and JSO unlocked.');

      const rating = calculateStarRating({
        elapsedSeconds: elapsedSecondsRef.current,
        targetTimeSeconds: activeScenario.targetTimeSeconds,
        turnarounds,
        totalActions,
        validStructuredActions,
        difficulty: activeScenario.difficulty,
        dataLossPenalty,
      });
      setComputedRating(rating);

      // Prepare Job Order metadata & pre-fill JSO narrative cleanly
      const nextNum = `JSO-2026-${String(submittedJSOs.length + 1).padStart(3, '0')}`;
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      setJsoOrderNumber(nextNum);
      setJsoDate(formattedDate);
      setJsoRootCause(activeScenario.faults.map((f) => f.rootCauseSummary).join(' '));
      setJsoActionTaken(
        activeScenario.faults
          .map((f) => `${REPAIR_ACTIONS[f.requiredFix].name} (${MODEL_COMPONENTS[f.componentId].shortLabel})`)
          .join('; ')
      );
      // Show Score Rating modal FIRST before generating JSO
      setShowRatingModal(true);
    }, 1300);
  };

  const handleSubmitJSOForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeScenario || !computedRating || jsoSubmittedSuccess) return;

    const cleanTech = jsoTechName.trim() || 'Guest Technician';
    const cleanSection = jsoSection.trim() || 'Grade 11 CSS';

    if (jsoTechName.trim()) {
      onUpdateUserProfile(jsoTechName.trim(), jsoSection.trim());
    }

    const newJSO: SubmittedJSO = {
      id: `jso-${Date.now()}`,
      jsoNumber: jsoOrderNumber,
      submittedAt:
        jsoDate ||
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      technicianName: cleanTech,
      section: cleanSection,
      scenarioCode: activeScenario.code,
      scenarioTitle: `${activeScenario.code} · ${activeScenario.workstation}`,
      workstation: activeScenario.workstation,
      clientName: activeScenario.clientName,
      reportedProblem: activeScenario.reportedSymptom,
      rootCause: jsoRootCause.trim(),
      actionTaken: jsoActionTaken.trim(),
      status: 'Functional',
      userSignature: jsoUserSignature.trim() || undefined,
      rating: computedRating,
    };

    onSubmitJSO(newJSO);
    setJsoSubmittedSuccess(true);
  };

  const liveAccuracy = dataLossPenalty
    ? 0
    : totalActions === 0
      ? 100
      : Math.max(0, Math.min(100, Math.round((validStructuredActions / totalActions) * 100)));

  const latestJSOByScenarioCode = useMemo(() => {
    const map = new Map<string, SubmittedJSO>();
    for (const jso of submittedJSOs) {
      if (!map.has(jso.scenarioCode)) {
        map.set(jso.scenarioCode, jso);
      }
    }
    return map;
  }, [submittedJSOs]);

  const selectedMeta = selectedComponent ? MODEL_COMPONENTS[selectedComponent] : null;
  const availableDiagnosticsForSelected = useMemo(
    () =>
      selectedMeta
        ? Object.values(DIAGNOSTIC_TOOLS).filter(
            (tool) => tool.targetLayer === selectedMeta.layer || tool.targetLayer === 'both'
          )
        : [],
    [selectedMeta]
  );
  const availableRepairsForSelected = useMemo(
    () =>
      selectedMeta ? selectedMeta.validRepairActions.map((id) => REPAIR_ACTIONS[id]) : [],
    [selectedMeta]
  );

  const handlePrintSingleArchiveJSO = (jsoId: string) => {
    if (printTimerRef.current !== null) {
      window.clearTimeout(printTimerRef.current);
    }
    setPrintingJsoId(jsoId);
    printTimerRef.current = window.setTimeout(() => {
      printTimerRef.current = null;
      window.print();
    }, 50);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-white border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-700 mb-1">
              Hardware &amp; Software Practice
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Troubleshooting Simulations
            </h1>
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <button
              type="button"
              onClick={() => leaveActiveBench('hub')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'hub' || viewMode === 'bench'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simulations ({SIMULATION_SCENARIOS_2D.length})
            </button>
            <button
              type="button"
              onClick={() => leaveActiveBench('jso_archive')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'jso_archive'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Submitted JSOs ({submittedJSOs.length})
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'hub' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6 no-print">
          <p className="text-sm text-slate-600">
            Select a workstation below to diagnose, repair, and file a Job Service Order.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SIMULATION_SCENARIOS_2D.map((scenario) => {
              const latestJSO = latestJSOByScenarioCode.get(scenario.code);
              return (
                <div
                  key={scenario.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-6 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-mono text-base sm:text-lg font-bold text-slate-900">
                        <span className="text-blue-700">{scenario.code}</span>
                        <span className="text-slate-300 mx-1.5">·</span>
                        <span>{scenario.workstation}</span>
                      </h2>
                      <span
                        className={`text-xs ${
                          scenario.difficulty === 'Master'
                            ? 'font-semibold text-purple-700'
                            : scenario.difficulty === 'Expert'
                              ? 'font-semibold text-rose-700'
                              : 'text-slate-500'
                        }`}
                      >
                        {scenario.difficulty === 'Master'
                          ? 'Master · Extreme Compound'
                          : scenario.difficulty === 'Expert'
                            ? 'Expert · Hard Compound'
                            : `${scenario.difficulty} · ${scenario.layerFocus}`}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{scenario.reportedSymptom}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      {latestJSO ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span>Last Rating:</span>
                          <StarRatingDisplay stars={latestJSO.rating.overallStars} size="sm" />
                        </span>
                      ) : (
                        <span className="font-mono">
                          Target MTTR: {formatDuration(scenario.targetTimeSeconds)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => launchScenario(scenario)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Start Practice</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* "+" Card from Webmap: Create Custom / Random Fault Simulation */}
            <div className="bg-slate-100/80 rounded-xl border-2 border-dashed border-slate-300 p-6 flex flex-col justify-between space-y-4">
              {!showCustomBuilder ? (
                <button
                  type="button"
                  onClick={() => setShowCustomBuilder(true)}
                  className="w-full h-full min-h-[172px] flex flex-col items-center justify-center text-center space-y-2 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-300 group-hover:border-blue-600 group-hover:text-blue-700 text-slate-600 flex items-center justify-center transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-blue-700">
                    Generate Custom Simulation
                  </div>
                  <p className="text-xs text-slate-600 max-w-xs">
                    Inject 1 to 5 randomized hardware or software faults into a fresh practice workstation.
                  </p>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Custom Fault Generator</h3>
                    <button
                      type="button"
                      onClick={() => setShowCustomBuilder(false)}
                      className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Fault Count
                      </label>
                      <select
                        value={customFaultCount}
                        onChange={(e) =>
                          setCustomFaultCount(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value={1}>1 Fault (Foundational)</option>
                        <option value={2}>2 Faults (Compound)</option>
                        <option value={3}>3 Faults (Advanced)</option>
                        <option value={4}>4 Faults (Expert Compound)</option>
                        <option value={5}>5 Faults (Master Compound)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subsystem Layer
                      </label>
                      <select
                        value={customLayerPref}
                        onChange={(e) =>
                          setCustomLayerPref(e.target.value as 'mixed' | 'hardware' | 'software')
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="mixed">Mixed (Hardware + Software)</option>
                        <option value="hardware">Hardware Only</option>
                        <option value="software">Software &amp; Network Only</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateCustom}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Launch Custom Practice</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= FULL-SCREEN 2D SIMULATION WORKBENCH POPUP ================= */}
      {viewMode === 'bench' && activeScenario && (
        <div
          className="fixed inset-0 z-50 h-[100dvh] bg-slate-950 flex flex-col overflow-hidden no-print"
          role="dialog"
          aria-modal="true"
          aria-label={`Troubleshooting simulation ${activeScenario.code}`}
        >
          {/* Compact Top Popup Header: Exit, Scenario, Live Telemetry & Symptom */}
          <div className="shrink-0 bg-slate-900 text-white border-b border-slate-800">
            <div className="px-2.5 sm:px-4 py-1.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  type="button"
                  onClick={() => leaveActiveBench('hub')}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer transition-colors shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Exit</span>
                </button>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-100 truncate">
                  {activeScenario.code} · {activeScenario.workstation}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3.5 text-[11px] sm:text-xs font-mono tabular-nums shrink-0">
                <div className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <strong className="text-white">{formatDuration(elapsedSeconds)}</strong>
                </div>
                <div className="text-slate-300">
                  <span className="hidden sm:inline">Turnarounds: </span>
                  <span className="sm:hidden">T:</span>
                  <strong className={turnarounds === 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {turnarounds}
                  </strong>
                </div>
                <div className="text-slate-300">
                  <span className="hidden sm:inline">Accuracy: </span>
                  <span className="sm:hidden">Acc:</span>
                  <strong className={liveAccuracy >= 80 ? 'text-emerald-400' : 'text-amber-400'}>
                    {liveAccuracy}%
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => launchScenario(activeScenario)}
                  title="Reset simulation"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white cursor-pointer font-sans font-semibold text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  type="button"
                  onClick={() => leaveActiveBench('hub')}
                  aria-label="Close simulation"
                  title="Close simulation"
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Full-Viewport Interactive Simulation Canvas */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <InteractivePC2DModel
              activeLayer={activeLayer}
              onChangeLayer={handleChangeLayer}
              selectedComponent={selectedComponent}
              onSelectComponent={handleOpenComponentPopup}
              componentStates={componentStates}
              scenario={activeScenario}
              fixedFaultIds={fixedFaultIds}
            />
          </div>

          {/* Slim Bottom Bar: Expandable Activity Log + Verify System / JSO Controls */}
          <div className="shrink-0 bg-slate-900 border-t border-slate-800 relative">
            {/* Expandable Activity Log Drawer */}
            {showActivityLog && (
              <div className="absolute bottom-full left-0 right-0 z-20 bg-slate-900/98 backdrop-blur border-t border-slate-700 shadow-2xl px-3 sm:px-4 py-2.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    Activity Log ({logs.length} {logs.length === 1 ? 'entry' : 'entries'})
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowActivityLog(false)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                    aria-label="Close activity log"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {logs.map((entry) => (
                    <div
                      key={entry.id}
                      className={`px-2.5 py-1.5 rounded-md border text-[11px] leading-snug ${
                        entry.kind === 'fault'
                          ? 'bg-red-950/70 border-red-800/80 text-red-200'
                          : entry.kind === 'success'
                            ? 'bg-emerald-950/70 border-emerald-800/80 text-emerald-200'
                            : entry.kind === 'turnaround'
                              ? 'bg-amber-950/70 border-amber-800/80 text-amber-200'
                              : 'bg-slate-800/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-[10px] font-semibold mr-1.5 opacity-75">
                        [{entry.time}]
                      </span>
                      <span>{entry.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2">
              {/* Left: Activity Log Toggle + Live Status / Latest Entry */}
              <button
                type="button"
                onClick={() => setShowActivityLog((prev) => !prev)}
                className="flex items-center gap-2 min-w-0 text-left px-2 py-1 rounded-md bg-slate-950/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer max-w-[58%] sm:max-w-[65%]"
              >
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-blue-300 shrink-0">
                  <span>Log ({logs.length})</span>
                  {showActivityLog ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronUp className="w-3 h-3" />
                  )}
                </span>
                <span
                  className={`text-[11px] truncate ${
                    verificationFeedback
                      ? isSystemVerified
                        ? 'text-emerald-300 font-medium'
                        : 'text-amber-300 font-medium'
                      : 'text-slate-300'
                  }`}
                >
                  {verificationFeedback || logs[0]?.text || 'Tap any part to inspect.'}
                </span>
              </button>

              {/* Right: Verify System / Score Rating / Generate JSO */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {!isSystemVerified ? (
                  <button
                    type="button"
                    disabled={isVerifying || Boolean(processingAction)}
                    onClick={handleVerifySystem}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                  >
                    {isVerifying ? (
                      <MiniSpinningGear />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                    <span>{isVerifying ? 'Testing...' : 'Verify System'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRatingModal(true)}
                      className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="hidden sm:inline">Score Rating</span>
                      <span className="sm:hidden">Rating</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJSOModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{jsoSubmittedSuccess ? 'View JSO' : 'Generate JSO'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= COMPACT ON-CLICK COMPONENT POPUP (DIAGNOSE & FIX ACTIONS) ================= */}
          {selectedMeta && (
            <div
              className="fixed inset-0 z-[60] bg-slate-950/45 backdrop-blur-[1px] flex items-center justify-center p-2.5 md:p-4"
              onClick={handleCloseComponentPopup}
              role="dialog"
              aria-modal="true"
              aria-labelledby="component-popup-title"
            >
              <div
                className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-[336px] md:max-w-[464px] overflow-hidden flex flex-col max-h-[76vh] md:max-h-[82vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Compact Popup Header */}
                <div className="px-3 py-2 md:px-4 md:py-3 bg-slate-900 text-white flex items-start justify-between gap-2 md:gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] md:text-[11px]">
                      <span className="font-semibold text-blue-300">
                        {selectedMeta.layer === 'hardware' ? 'Hardware' : 'Software'}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span
                        className={`font-mono font-semibold ${
                          componentStates[selectedMeta.id] === 'repaired'
                            ? 'text-emerald-400'
                            : componentStates[selectedMeta.id] === 'diagnosed_fault'
                              ? 'text-red-400'
                              : componentStates[selectedMeta.id] === 'diagnosed_nominal'
                                ? 'text-sky-300'
                                : 'text-slate-300'
                        }`}
                      >
                        {componentStates[selectedMeta.id] === 'uninspected' && 'Not Checked'}
                        {componentStates[selectedMeta.id] === 'diagnosed_nominal' && 'Working OK'}
                        {componentStates[selectedMeta.id] === 'diagnosed_fault' && 'Problem Found'}
                        {componentStates[selectedMeta.id] === 'repaired' && 'Fixed'}
                      </span>
                    </div>
                    <h2 id="component-popup-title" className="text-sm md:text-base font-bold text-white leading-snug">
                      {selectedMeta.label}
                    </h2>
                    <p className="text-[10.5px] md:text-[11px] text-slate-300 leading-snug line-clamp-2 md:line-clamp-none">
                      {selectedMeta.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={Boolean(processingAction)}
                    onClick={handleCloseComponentPopup}
                    className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer transition-colors shrink-0"
                    aria-label="Close popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Compact Popup Body */}
                <div className="p-2.5 space-y-2 md:p-3.5 md:space-y-3 overflow-y-auto">
                  {/* Indeterminate Interlocking Rotating Gears Loader + Cancel Button */}
                  {processingAction && (() => {
                    const isReformatRun = processingAction.label.toLowerCase().includes('reformat');
                    const gearVariant: 'diagnose' | 'fix' | 'reformat' = isReformatRun
                      ? 'reformat'
                      : processingAction.type === 'fix'
                        ? 'fix'
                        : 'diagnose';
                    const cardTone =
                      gearVariant === 'reformat'
                        ? 'bg-rose-50 border-rose-200'
                        : gearVariant === 'fix'
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-blue-50 border-blue-200';
                    const boxBorderTone =
                      gearVariant === 'reformat'
                        ? 'border-rose-200'
                        : gearVariant === 'fix'
                          ? 'border-emerald-200'
                          : 'border-blue-200';
                    const titleTone =
                      gearVariant === 'reformat'
                        ? 'text-rose-950'
                        : gearVariant === 'fix'
                          ? 'text-emerald-950'
                          : 'text-blue-950';
                    const subTone =
                      gearVariant === 'reformat'
                        ? 'text-rose-700'
                        : gearVariant === 'fix'
                          ? 'text-emerald-700'
                          : 'text-blue-700';

                    return (
                      <div className={`p-2.5 md:p-3.5 rounded-lg border space-y-2 md:space-y-3 ${cardTone}`}>
                        <div className="flex items-center gap-2.5 md:gap-3.5">
                          <div
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white border ${boxBorderTone} shadow-xs shrink-0 flex items-center justify-center`}
                          >
                            <div className="scale-90 md:scale-100 flex items-center justify-center">
                              <MechanicalGearsSVG variant={gearVariant} />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className={`text-[11px] md:text-xs font-semibold leading-snug ${titleTone}`}>
                              {processingAction.label}
                            </div>
                            <div className={`text-[10px] md:text-[11px] mt-0.5 ${subTone}`}>
                              {processingAction.type === 'diagnose'
                                ? 'Running diagnostic tool. Please wait...'
                                : 'Applying repair action. Please wait...'}
                            </div>
                          </div>
                        </div>
                        <div className={`pt-1.5 md:pt-2 border-t ${boxBorderTone} flex items-center justify-between gap-2`}>
                          <span className="text-[9.5px] md:text-[10px] text-slate-600">
                            Cancelling adds +1 turnaround and resets this step.
                          </span>
                          <button
                            type="button"
                            onClick={handleCancelProcessingAction}
                            className="inline-flex items-center gap-1 px-2 py-1 md:px-2.5 text-[10.5px] md:text-[11px] font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md cursor-pointer transition-colors shrink-0"
                          >
                            <X className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Live Feedback Banner inside Popup */}
                  {!processingAction && popupFeedback && (
                    <div
                      className={`p-2 md:p-2.5 rounded-lg border text-[11px] md:text-xs leading-relaxed space-y-1.5 md:space-y-2 ${
                        popupFeedback.kind === 'fault'
                          ? 'bg-red-50 border-red-200 text-red-900'
                          : popupFeedback.kind === 'success'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : popupFeedback.kind === 'turnaround'
                              ? 'bg-amber-50 border-amber-200 text-amber-900'
                              : 'bg-sky-50 border-sky-200 text-sky-900'
                      }`}
                    >
                      <div>{popupFeedback.text}</div>
                      {popupFeedback.kind === 'fault' && actionTab === 'diagnose' && (
                        <button
                          type="button"
                          onClick={() => setActionTab('fix')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-red-700 hover:bg-red-800 rounded-md cursor-pointer"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>Go to Fix / Action</span>
                        </button>
                      )}
                      {popupFeedback.kind === 'success' && (
                        <button
                          type="button"
                          onClick={handleCloseComponentPopup}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Back to Practice</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Compact Mode Switcher */}
                  <div className="grid grid-cols-2 gap-1 p-0.5 md:p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      disabled={Boolean(processingAction)}
                      onClick={() => {
                        setActionTab('diagnose');
                        setHoveredOption(null);
                      }}
                      className={`inline-flex items-center justify-center gap-1 md:gap-1.5 py-1 px-1.5 md:py-1.5 md:px-2 text-[11px] md:text-xs font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-50 ${
                        actionTab === 'diagnose'
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Search className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>Check / Diagnose</span>
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(processingAction)}
                      onClick={() => {
                        setActionTab('fix');
                        setHoveredOption(null);
                      }}
                      className={`inline-flex items-center justify-center gap-1 md:gap-1.5 py-1 px-1.5 md:py-1.5 md:px-2 text-[11px] md:text-xs font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-50 ${
                        actionTab === 'fix'
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Wrench className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span>Fix / Action</span>
                    </button>
                  </div>

                  {/* Tab 1: Check / Diagnose Tools (Compact 3-col on Mobile, Square Tile Grid on PC) */}
                  {actionTab === 'diagnose' ? (
                    <div className="space-y-1.5 md:space-y-2.5">
                      <div className="flex items-center justify-between text-[10.5px] md:text-[11px]">
                        <span className="font-semibold text-slate-600">
                          Pick a {selectedMeta.layer === 'hardware' ? 'hardware' : 'software'} tool to check{' '}
                          {selectedMeta.shortLabel}:
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 md:gap-2.5">
                        {availableDiagnosticsForSelected.map((tool) => (
                          <button
                            key={tool.id}
                            type="button"
                            disabled={isSystemVerified || Boolean(processingAction)}
                            onClick={() => {
                              setHoveredOption(null);
                              handleDiagnoseWithTool(tool.id);
                            }}
                            onMouseEnter={() =>
                              setHoveredOption({
                                kind: 'diagnose',
                                title: tool.name,
                                description: tool.purpose,
                              })
                            }
                            onMouseLeave={() => setHoveredOption(null)}
                            onFocus={() =>
                              setHoveredOption({
                                kind: 'diagnose',
                                title: tool.name,
                                description: tool.purpose,
                              })
                            }
                            onBlur={() => setHoveredOption(null)}
                            className="md:aspect-square flex flex-col items-center justify-center text-center px-1.5 py-2 md:p-2.5 rounded-lg md:rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/70 hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-150 cursor-pointer group"
                          >
                            <div className="w-7 h-7 md:w-9 md:h-9 rounded-md md:rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center mb-1 md:mb-2 transition-colors shrink-0">
                              {renderToolIcon(tool.id)}
                            </div>
                            <div className="text-[10px] md:text-[11px] font-bold text-slate-900 leading-tight">
                              {tool.shortName}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Tab 2: Fix / Repair Actions (Compact Grid on Mobile, Square Tile Grid on PC) */
                    <div className="space-y-1.5 md:space-y-2.5">
                      <div className="text-[10.5px] md:text-[11px] font-semibold text-slate-600">
                        Pick a fix for {selectedMeta.shortLabel}:
                      </div>
                      {componentStates[selectedMeta.id] === 'uninspected' && (
                        <div className="p-1.5 md:p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] md:text-[11px] text-amber-900 flex items-start gap-1.5 md:gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>
                            Tip: Check this part with a tool first. Skipping diagnosis adds a turnaround penalty and makes fixes take 5x longer.
                          </span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-1.5 md:gap-2.5">
                        {availableRepairsForSelected.map((action) => {
                          const isDestructive = action.id === 'reformat_os';
                          return (
                            <button
                              key={action.id}
                              type="button"
                              disabled={isSystemVerified || Boolean(processingAction)}
                              onClick={() => {
                                setHoveredOption(null);
                                handleApplyFix(action.id);
                              }}
                              onMouseEnter={() =>
                                setHoveredOption({
                                  kind: 'fix',
                                  title: action.name,
                                  subtitle: `Tool: ${action.toolUsed}`,
                                  description: action.description,
                                })
                              }
                              onMouseLeave={() => setHoveredOption(null)}
                              onFocus={() =>
                                setHoveredOption({
                                  kind: 'fix',
                                  title: action.name,
                                  subtitle: `Tool: ${action.toolUsed}`,
                                  description: action.description,
                                })
                              }
                              onBlur={() => setHoveredOption(null)}
                              className={`md:aspect-square flex flex-col items-center justify-center text-center px-2 py-2 md:p-3 rounded-lg md:rounded-xl border bg-white hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-150 cursor-pointer group ${
                                isDestructive
                                  ? 'border-rose-200 hover:border-rose-600 hover:bg-rose-50/70'
                                  : 'border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/60'
                              }`}
                            >
                              <div
                                className={`w-7 h-7 md:w-9 md:h-9 rounded-md md:rounded-lg flex items-center justify-center mb-1 md:mb-2 transition-colors shrink-0 ${
                                  isDestructive
                                    ? 'bg-rose-50 text-rose-700 group-hover:bg-rose-600 group-hover:text-white'
                                    : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                                }`}
                              >
                                {isDestructive ? (
                                  <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                ) : (
                                  <Wrench className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                )}
                              </div>
                              <div className="text-[10.5px] md:text-[11px] font-bold text-slate-900 leading-tight">
                                {action.name}
                              </div>
                              <div
                                className={`text-[9.5px] md:text-[10px] font-semibold mt-0.5 md:mt-1 leading-tight line-clamp-1 ${
                                  isDestructive ? 'text-rose-700' : 'text-blue-700'
                                }`}
                              >
                                {isDestructive ? 'High Risk · Wipes Data' : action.toolUsed}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Instant Hover Explanation Box (PC only — hidden on touch mobile to keep popup compact) */}
                  <div
                    className={`hidden md:flex rounded-lg border px-3 py-2.5 min-h-[68px] items-start gap-2.5 transition-colors ${
                      hoveredOption
                        ? hoveredOption.kind === 'fix'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-blue-50 border-blue-200 text-blue-950'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <Info
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        hoveredOption
                          ? hoveredOption.kind === 'fix'
                            ? 'text-emerald-700'
                            : 'text-blue-700'
                          : 'text-slate-400'
                      }`}
                    />
                    {hoveredOption ? (
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="text-xs font-bold leading-snug">
                            {hoveredOption.title}
                          </span>
                          {hoveredOption.subtitle && (
                            <span className="text-[10px] font-semibold text-blue-700">
                              · {hoveredOption.subtitle}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] leading-snug opacity-90">
                          {hoveredOption.description}
                        </p>
                      </div>
                    ) : (
                      <div className="text-[11px] leading-snug self-center">
                        Hover over any option above to read what it checks or fixes before choosing.
                      </div>
                    )}
                  </div>
                </div>

                {/* Compact Popup Footer */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">
                    {processingAction ? 'Processing action...' : 'Click outside or press Esc to close'}
                  </span>
                  <button
                    type="button"
                    disabled={Boolean(processingAction)}
                    onClick={handleCloseComponentPopup}
                    className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 rounded-md cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= STEP 5: PERFORMANCE SCORE RATING MODAL (SHOWN FIRST AFTER VERIFY) ================= */}
      {showRatingModal && activeScenario && computedRating && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-[1px] flex items-center justify-center p-4 no-print"
          onClick={() => setShowRatingModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="score-rating-title"
        >
          <div
            className="bg-white rounded-xl border border-slate-200 max-w-md w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold text-emerald-400">
                  Step 5 Passed · System Verified
                </div>
                <h2 id="score-rating-title" className="text-base font-bold">
                  Troubleshooting Score Rating
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close rating popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Overall 5-Star Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="text-xs font-semibold text-slate-500">
                  Overall Technician Rating
                </div>
                <div className="flex justify-center">
                  <StarRatingDisplay stars={computedRating.overallStars} size="md" />
                </div>
                <div className="text-xs font-bold text-blue-700">
                  {computedRating.verdictLabel}
                </div>
              </div>

              {/* 3-Factor Breakdown */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">Mean Time</div>
                  <div className="font-mono font-bold text-slate-900 text-xs mt-0.5 tabular-nums">
                    {formatDuration(computedRating.meanTimeSeconds)}
                  </div>
                  <div className="text-[11px] font-semibold text-amber-600 mt-1">
                    {computedRating.meanTimeStars.toFixed(1)} ★
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">Turnarounds</div>
                  <div className="font-mono font-bold text-slate-900 text-xs mt-0.5 tabular-nums">
                    {computedRating.turnarounds}
                  </div>
                  {getDifficultyTurnaroundAllowance(activeScenario.difficulty) > 0 && (
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      +{getDifficultyTurnaroundAllowance(activeScenario.difficulty)}{' '}
                      {activeScenario.difficulty} allowance
                    </div>
                  )}
                  <div className="text-[11px] font-semibold text-amber-600 mt-1">
                    {computedRating.turnaroundStars.toFixed(1)} ★
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <div className="text-[11px] text-slate-500">Accuracy</div>
                  <div
                    className={`font-mono font-bold text-xs mt-0.5 tabular-nums ${
                      computedRating.dataLossPenalty ? 'text-rose-700' : 'text-slate-900'
                    }`}
                  >
                    {computedRating.accuracyPercent}%
                  </div>
                  {computedRating.dataLossPenalty && (
                    <div className="text-[10px] font-semibold text-rose-700 mt-0.5">
                      User Data Lost
                    </div>
                  )}
                  <div className="text-[11px] font-semibold text-amber-600 mt-1">
                    {computedRating.accuracyStars.toFixed(1)} ★
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowRatingModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRatingModal(false);
                    setShowJSOModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>{jsoSubmittedSuccess ? 'View Submitted JSO' : 'Generate JSO'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 6: GENERATED JOB SERVICE ORDER (JSO) TABLE MODAL ================= */}
      {showJSOModal && activeScenario && computedRating && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-[1px] flex items-center justify-center p-4 overflow-y-auto print:static print:bg-white print:p-0 print:block"
          onClick={() => setShowJSOModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="jso-modal-title"
        >
          <div
            className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full my-6 overflow-hidden shadow-2xl print:shadow-none print:my-0 print:max-w-none print:border-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-4 no-print">
              <div>
                <div className="text-[11px] text-blue-300 font-semibold">
                  Step 6 · Job Service Order (JSO)
                </div>
                <h2 id="jso-modal-title" className="text-base font-bold">
                  Generated Job Service Order
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowJSOModal(false)}
                className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Close JSO popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitJSOForm} className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0">
              {/* Clean Two-Column JSO Document Table matching Reference Layout */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-50/70">
                      <th className="py-3 px-4 font-bold text-slate-900 w-[36%] sm:w-[40%]">
                        Information
                      </th>
                      <th className="py-3 px-4 font-bold text-slate-900">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium">Job Order No.</td>
                      <td className="py-3 px-4 font-mono text-slate-900">{jsoOrderNumber}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium">Date</td>
                      <td className="py-3 px-4 text-slate-900">{jsoDate}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium">Client/User</td>
                      <td className="py-3 px-4 text-slate-900">{activeScenario.clientName}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium">Computer No.</td>
                      <td className="py-3 px-4 text-slate-900">{activeScenario.workstation}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium align-top">Reported Problem</td>
                      <td className="py-3 px-4 text-slate-900 leading-relaxed">
                        {activeScenario.reportedSymptom}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium align-top">Initial Inspection</td>
                      <td className="py-2.5 px-4">
                        {jsoSubmittedSuccess ? (
                          <span className="text-slate-900 leading-relaxed">{jsoRootCause}</span>
                        ) : (
                          <textarea
                            rows={2}
                            value={jsoRootCause}
                            onChange={(e) => setJsoRootCause(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-sm bg-slate-50/70 border border-slate-200 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium align-top">Action Taken</td>
                      <td className="py-2.5 px-4">
                        {jsoSubmittedSuccess ? (
                          <span className="text-slate-900 leading-relaxed">{jsoActionTaken}</span>
                        ) : (
                          <textarea
                            rows={2}
                            value={jsoActionTaken}
                            onChange={(e) => setJsoActionTaken(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-sm bg-slate-50/70 border border-slate-200 rounded-md text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-700 font-medium">Status</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">Functional</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700 font-medium align-middle">Technician</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          {jsoSubmittedSuccess ? (
                            <span className="font-semibold text-slate-900 border-b border-slate-500 pb-0.5 min-w-[160px] inline-block">
                              {jsoTechName.trim() || 'Guest Technician'}
                            </span>
                          ) : (
                            <input
                              type="text"
                              value={jsoTechName}
                              onChange={(e) => setJsoTechName(e.target.value)}
                              placeholder="Enter technician name"
                              required
                              className="w-48 sm:w-56 px-1 py-0.5 text-sm font-semibold text-slate-900 bg-transparent border-b border-slate-600 focus:border-blue-700 focus:outline-none placeholder:font-normal placeholder:text-slate-400"
                            />
                          )}

                          {/* Show 5-Star Rating right beside Technician's Name once entered */}
                          {jsoTechName.trim().length > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200">
                              <StarRatingDisplay stars={computedRating.overallStars} size="sm" />
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400 no-print">
                              Type name to attach rating
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-slate-700 font-medium align-middle">User Signature</td>
                      <td className="py-3 px-4">
                        {jsoSubmittedSuccess ? (
                          <span className="text-slate-900 border-b border-slate-500 pb-0.5 min-w-[180px] inline-block">
                            {jsoUserSignature.trim() || '\u00A0'}
                          </span>
                        ) : (
                          <input
                            type="text"
                            value={jsoUserSignature}
                            onChange={(e) => setJsoUserSignature(e.target.value)}
                            placeholder="_____________________"
                            className="w-48 sm:w-56 px-1 py-0.5 text-sm text-slate-900 bg-transparent border-b border-slate-600 focus:border-blue-700 focus:outline-none placeholder:text-slate-300"
                          />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {jsoSubmittedSuccess ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
                  <div className="flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>JSO saved with {computedRating.overallStars.toFixed(1)}★ beside Technician name.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print JSO</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => leaveActiveBench('jso_archive')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                    >
                      View Archive
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 no-print">
                  <button
                    type="button"
                    onClick={() => {
                      setShowJSOModal(false);
                      setShowRatingModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Score Rating</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowJSOModal(false)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit JSO</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ================= SUBMITTED JSO ARCHIVE VIEW ================= */}
      {viewMode === 'jso_archive' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 no-print">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Submitted Job Service Orders (JSO)</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Each Job Service Order displays the Technician’s 5-star rating directly beside their name.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('hub')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
            >
              Run Another Simulation
            </button>
          </div>

          {submittedJSOs.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-3">
              <FileCheck2 className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-base font-bold text-slate-900">No Job Service Orders Submitted Yet</div>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Complete a practice troubleshooting simulation, verify the system to view your score rating, then generate and submit your JSO.
              </p>
              <button
                type="button"
                onClick={() => setViewMode('hub')}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
              >
                Open Simulations
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {submittedJSOs.map((jso) => (
                <article
                  key={jso.id}
                  className={`bg-white rounded-xl border border-slate-200 overflow-hidden break-inside-avoid ${
                    printingJsoId && printingJsoId !== jso.id ? 'no-print' : ''
                  }`}
                >
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-300 bg-slate-50/80">
                        <th className="py-3 px-5 font-bold text-slate-900 w-[36%] sm:w-[40%]">
                          Information
                        </th>
                        <th className="py-3 px-5 font-bold text-slate-900">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Job Order No.</td>
                        <td className="py-2.5 px-5 font-mono text-slate-900">{jso.jsoNumber}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Date</td>
                        <td className="py-2.5 px-5 text-slate-900">{jso.submittedAt}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Client/User</td>
                        <td className="py-2.5 px-5 text-slate-900">{jso.clientName}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Computer No.</td>
                        <td className="py-2.5 px-5 text-slate-900">{jso.workstation}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Reported Problem</td>
                        <td className="py-2.5 px-5 text-slate-900">{jso.reportedProblem}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Initial Inspection</td>
                        <td className="py-2.5 px-5 text-slate-900">{jso.rootCause}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Action Taken</td>
                        <td className="py-2.5 px-5 text-slate-900">{jso.actionTaken}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-5 text-slate-600 font-medium">Status</td>
                        <td className="py-2.5 px-5 font-semibold text-emerald-700">{jso.status}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-5 text-slate-600 font-medium">Technician</td>
                        <td className="py-3 px-5">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-semibold text-slate-900 border-b border-slate-500 pb-0.5 min-w-[140px] inline-block">
                              {jso.technicianName}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                              <StarRatingDisplay stars={jso.rating.overallStars} size="sm" />
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-5 text-slate-600 font-medium">User Signature</td>
                        <td className="py-3 px-5">
                          {jso.userSignature ? (
                            <span className="text-slate-900 border-b border-slate-500 pb-0.5 min-w-[160px] inline-block">
                              {jso.userSignature}
                            </span>
                          ) : (
                            <span className="text-slate-400">_____________________</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {activeArchiveJSO?.id === jso.id && (
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center gap-5 text-xs font-mono text-slate-700 tabular-nums">
                      <span>
                        Mean Time: <strong className="text-slate-900">{formatDuration(jso.rating.meanTimeSeconds)}</strong> ({jso.rating.meanTimeStars}★)
                      </span>
                      <span>
                        Turnarounds: <strong className="text-slate-900">{jso.rating.turnarounds}</strong> ({jso.rating.turnaroundStars}★)
                      </span>
                      <span>
                        Accuracy: <strong className="text-slate-900">{jso.rating.accuracyPercent}%</strong> ({jso.rating.accuracyStars}★)
                      </span>
                      <span className="font-sans font-semibold text-blue-700">
                        {jso.rating.verdictLabel}
                      </span>
                    </div>
                  )}

                  <div className="px-5 py-2.5 bg-slate-50/60 border-t border-slate-200 flex items-center justify-end gap-3 no-print">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveArchiveJSO(activeArchiveJSO?.id === jso.id ? null : jso)
                      }
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      {activeArchiveJSO?.id === jso.id ? 'Hide Score Breakdown' : 'Show Score Breakdown'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePrintSingleArchiveJSO(jso.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
