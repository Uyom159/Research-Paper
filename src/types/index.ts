export type PageRoute =
  | 'main'
  | 'subpage1'
  | 'subpage2'
  | 'subpage3'
  | 'simulations'
  | 'quizzes';

export interface Researcher {
  name: string;
  role: string;
  focus: string;
}

export interface AcademicReference {
  id: string;
  citation: string;
  category: 'SYSMOD' | 'Unstructured Evidence' | 'Advanced Troubleshooting' | 'Curriculum';
  rrlGroup: 'Local Literature' | 'Local Studies' | 'Foreign Literature' | 'Foreign Studies';
}

export interface EvidenceRecord {
  id: string;
  authors: string;
  year: string;
  rrlGroup: 'Local Literature' | 'Local Studies' | 'Foreign Literature' | 'Foreign Studies';
  context: string;
  finding: string;
  metrics?: string;
}

export interface DiagnosticStep {
  number: number;
  title: string;
  sysmodMapping: string;
  summary: string;
  actions: string[];
  verification: string;
}

export type ComponentLayer = 'hardware' | 'software';

export type ModelComponentId =
  | 'motherboard'
  | 'psu'
  | 'cpu_processor'
  | 'cpu_cooler'
  | 'ram_slots'
  | 'gpu_pcie'
  | 'nvme_m2'
  | 'cmos_post'
  | 'front_panel'
  | 'case_fans'
  | 'sata_storage'
  | 'nic_rj45'
  | 'monitor_display'
  | 'bios_bootloader'
  | 'os_driver'
  | 'event_monitor'
  | 'network_stack'
  | 'storage_fs'
  | 'security_engine';

export type DiagnosticToolId =
  | 'multimeter'
  | 'post_analyzer'
  | 'thermal_probe'
  | 'memtest86'
  | 'cable_tester'
  | 'smart_chkdsk'
  | 'event_windbg'
  | 'network_cli'
  | 'security_scanner';

export type RepairActionId =
  | 'reseat_24pin_mobo'
  | 'replace_motherboard'
  | 'reseat_cpu_socket'
  | 'replace_cpu_chip'
  | 'reconnect_pcie_power'
  | 'replace_psu_550w'
  | 'reseat_ram_latch'
  | 'swap_ram_b2'
  | 'reapply_thermal_paste'
  | 'reseat_nvme_m2'
  | 'replace_case_fan'
  | 'reconnect_front_panel'
  | 'replace_cr2032'
  | 'replace_sata_cable'
  | 'recrimp_rj45'
  | 'reconnect_display_cable'
  | 'replace_monitor_power'
  | 'ddu_clean_driver'
  | 'restore_dns_dhcp'
  | 'repair_fs_chkdsk'
  | 'quarantine_malware'
  | 'rebuild_bootloader'
  | 'reformat_os';

export interface ModelComponentMeta {
  id: ModelComponentId;
  label: string;
  shortLabel: string;
  layer: ComponentLayer;
  subsystem: string;
  description: string;
  validDiagnosticTools: DiagnosticToolId[];
  validRepairActions: RepairActionId[];
  nominalReading: string;
}

export interface ToolMeta {
  id: DiagnosticToolId;
  name: string;
  shortName: string;
  purpose: string;
  targetLayer: ComponentLayer | 'both';
}

export interface RepairActionMeta {
  id: RepairActionId;
  name: string;
  toolUsed: string;
  description: string;
  componentId: ModelComponentId;
}

export interface ScenarioFault {
  componentId: ModelComponentId;
  requiredTool: DiagnosticToolId;
  requiredFix: RepairActionId;
  faultTitle: string;
  diagnosticReading: string;
  fixedReading: string;
  rootCauseSummary: string;
  requiresMultiDiagnosis?: ModelComponentId[];
}

export interface SimulationScenario2D {
  id: string;
  code: string;
  title: string;
  workstation: string;
  clientName: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';
  layerFocus: 'Hardware' | 'Software' | 'Network' | 'Compound';
  targetTimeSeconds: number;
  reportedSymptom: string;
  postCode: string;
  beepPattern: string;
  faults: ScenarioFault[];
  isCustom?: boolean;
}

export interface StarRatingBreakdown {
  overallStars: number; // 1.0 to 5.0 in 0.5 increments
  meanTimeSeconds: number;
  meanTimeStars: number;
  turnarounds: number;
  turnaroundStars: number;
  accuracyPercent: number;
  accuracyStars: number;
  verdictLabel: string;
  dataLossPenalty?: boolean;
}

export interface SubmittedJSO {
  id: string;
  jsoNumber: string;
  submittedAt: string;
  technicianName: string;
  section: string;
  scenarioCode: string;
  scenarioTitle: string;
  workstation: string;
  clientName: string;
  reportedProblem: string;
  rootCause: string;
  actionTaken: string;
  status: 'Functional';
  userSignature?: string;
  rating: StarRatingBreakdown;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sysmodPrinciple: string;
}

export interface QuizModule {
  id: string;
  code: string;
  dayNumber?: number;
  level?: number;
  weekRef?: string;
  title: string;
  topic: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  description: string;
  questions: QuizQuestionItem[];
  isCustom?: boolean;
}

export interface SubmittedQuizScore {
  id: string;
  submittedAt: string;
  studentName: string;
  section: string;
  quizId: string;
  quizCode: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSeconds: number;
}
