import { AcademicReference, DiagnosticStep, EvidenceRecord, Researcher } from '../types';

export const RESEARCH_INFO = {
  title:
    'Applying SYSMOD Principles to Advanced Troubleshooting Deficits Among Senior High School Computer Systems Servicing Students: Basis for a Standardized Diagnostic Framework',
  shortTitle: 'SYSMOD-Based Diagnostic Framework for SHS CSS',
  institution: 'National College of Science and Technology (NCST)',
  department: 'Institute of Industrial Research and Training — Senior High School',
  location: 'Dasmariñas City, Cavite',
  course: 'Practical Research 2 / Inquiries, Investigation and Immersion',
  date: 'March 2026',
  track: 'TVL Track — ICT Strand (Computer Systems Servicing NC II)',
  adviser: 'Jay Mhar C. Teodoro',
  vicePrincipal: 'Mr. Ryan C. Mostajo, LPT, MAELM',
  targetCohort: 'Grade 11 TVL-ICT Computer Systems Servicing (CSS) Students (SY 2025–2026)',
};

export const RESEARCHERS: Researcher[] = [
  {
    name: 'Baterna, Jonas B.',
    role: 'Researcher & Hardware Architecture',
    focus: 'Hardware fault isolation standards and diagnostic workflow validation',
  },
  {
    name: 'Caday, Tristan L.',
    role: 'Researcher & SYSMOD Modeling',
    focus: 'SysML subsystem decomposition and MBSE theoretical alignment',
  },
  {
    name: 'Dadivas, Roan T.',
    role: 'Researcher & Electrical Diagnostics',
    focus: 'POST code analysis, ATX power tolerances, and instrument checklists',
  },
  {
    name: 'Escuadro, Kedd Evander D.',
    role: 'Researcher & Systems Simulation',
    focus: '2D interactive diagnostic sandbox, JSO design, and web platform',
  },
  {
    name: 'Suhillo, Kim Zephy D.',
    role: 'Researcher & Network Systems',
    focus: 'Physical layer continuity, DHCP/APIPA, and TCP/IP fault paths',
  },
  {
    name: 'Tobias, Venice Athena M.',
    role: 'Researcher & Documentation & QA',
    focus: 'RRL synthesis, mixed-methods instruments, and rubric alignment',
  },
];

export const RESEARCH_ABSTRACT = `Under the Department of Education (DepEd) K to 12 Technical-Vocational-Livelihood (TVL) track and TESDA Computer Systems Servicing (CSS) NC II regulations (TESDA & DepEd, 2024), senior high school learners are mandated to master computer assembly, network configuration, server setup, and infrastructure repair. However, regional studies (Padilla, 2026; Bascuguin & Generoso, 2026) and national evaluations (EDCOM II, 2024) confirm a persistent gap between routine linear assembly proficiency and advanced diagnostic troubleshooting during non-routine system failures such as POST beep errors, PSU voltage instability, OS stop codes, and network packet loss.

This deficit is compounded by the "Clean Lab Paradox," where secondary computer laboratories keep equipment strictly operational to protect scarce institutional hardware, shielding students from dynamic breakdowns and driving novice learners toward cognitive overload (Sweller, 2011), unstructured trial-and-error, random component swapping, and premature hard drive reformatting (Yang et al., 2024; Dounas-Frazer & Lewandowski, 2017). Anchored exclusively on Tim Weilkiens' (2016, 2020) SYSMOD – The Systems Modeling Toolbox: Pragmatic MBSE with SysML (3rd ed.), and aligned with Outcomes-Based Education (CHED CMO No. 46, 2012; Spady, 1994; Biggs & Tang, 2013) and DepEd Classroom Assessment Guidelines (DepEd Order No. 8, 2015), this study investigates the baseline unstructured troubleshooting habits of Grade 11 CSS students at the National College of Science and Technology (NCST) Institute of Industrial Research and Training Senior High School in Dasmariñas City, Cavite.

Utilizing a Convergent Mixed Methods Research Design with purposive sampling (50–75 respondents for a validated 4-point Likert quantitative competency survey; 10–12 sub-sample participants for qualitative Diagnostic Task Observation Protocols and Focus Group Discussions), the study merges weighted mean and standard deviation statistics with 6-phase thematic analysis (Swain & Chen, 2024). By pairing SYSMOD subsystem modeling—System Context & Boundary Modeling, Structural Decomposition, State Machine & Behavior Modeling, and Requirement & Interface Traceability—with safe virtualized and 2D simulation sandboxes (Kaysi, 2025; Sababha et al., 2021; Bielik et al., 2022), the study establishes a Standardized Diagnostic Framework designed to reduce Mean Time to Repair (MTTR), prevent hardware wear, and cultivate hypothesis-driven fault isolation.`;

export const STATEMENT_OF_THE_PROBLEM = [
  'What is the baseline level of unstructured troubleshooting practices and self-perceived technical competency among Grade 11 Computer Systems Servicing students across advanced hardware diagnostics, operating system recovery, and network fault isolation?',
  'How do Grade 11 Computer Systems Servicing students execute diagnostic workflows during non-routine technical failures, and what qualitative procedural gaps, cognitive fatigue, and logical errors hinder their systematic fault isolation?',
  'What suggestions and feedback on the Standardized SYSMOD-based Diagnostic Framework can be used to improve structured model-based troubleshooting?',
];

export const RESEARCH_OBJECTIVES = [
  'Determine the baseline level of unstructured troubleshooting practices and self-perceived technical competency among Grade 11 Computer Systems Servicing students across advanced hardware diagnostics, operating system recovery, and network fault isolation.',
  'Analyze the diagnostic procedures, decision-making patterns, cognitive fatigue factors, and qualitative procedural errors encountered by Grade 11 CSS students during non-routine system failures.',
  'Improve and validate a Standardized SYSMOD-based Diagnostic Framework tailored for Grade 11 CSS laboratory instruction to transition learners from trial-and-error habits to structured fault isolation.',
];

export const IPO_FRAMEWORK = {
  input: {
    label: 'Input',
    heading: 'Baseline Conditions & Policy Standards',
    items: [
      'Grade 11 TVL-ICT CSS student baseline competency profile at NCST IIRT-SHS (SY 2025–2026)',
      'Observed unstructured troubleshooting habits: random swapping, guesswork, premature OS reformatting',
      'The Clean Lab Paradox & laboratory equipment constraints (EDCOM II, 2024; Bascuguin & Generoso, 2026)',
      'TESDA CSS NC II Regulations (2024), DepEd Order No. 8 (2015), and CHED CMO No. 46 Outcomes-Based QA (2012)',
    ],
  },
  process: {
    label: 'Process',
    heading: 'Convergent Mixed Methods & SYSMOD',
    items: [
      'Quantitative 4-point Likert survey (N = 50–75 purposively sampled Grade 11 CSS learners; target Cronbach α ≥ 0.70)',
      'Qualitative Diagnostic Task Observation Protocols & Focus Group Discussions (N = 10–12 sub-sample)',
      'Adaptation of Weilkiens’ SYSMOD (MBSE with SysML) & Cognitive Load scaffolding across hardware, OS, driver, and network subsystems',
      'Side-by-side joint display integration combining weighted mean/SD statistics with 6-phase thematic analysis (Swain & Chen, 2024)',
    ],
  },
  output: {
    label: 'Output',
    heading: 'Standardized Diagnostic Framework',
    items: [
      'Standardized SYSMOD-Based 6-Step Diagnostic Framework tailored for SHS CSS laboratory instruction',
      'Safe interactive 2D Hardware & Software & virtualized breakdown sandboxes (zero physical hardware risk)',
      'Standardized Job Service Order (JSO) evaluated by Mean Time (MTTR), Turnarounds, and Accuracy',
      'Formative TESDA CSS NC II diagnostic quiz bank with immediate SYSMOD rationale feedback',
    ],
  },
};

export const PEDAGOGICAL_FOUNDATIONS = [
  {
    title: 'SYSMOD MBSE with SysML (Weilkiens, 2016, 2020)',
    category: 'Primary Theoretical Framework',
    summary:
      'Frames a computer system as interconnected hardware, OS, driver, and network subsystems governed by explicit boundaries, state transitions, and measurable interface tolerances.',
  },
  {
    title: 'Outcomes-Based Education & Constructive Alignment (CHED CMO 46, 2012; Spady, 1994; Biggs & Tang, 2013)',
    category: 'Pedagogical Alignment',
    summary:
      'Shifts vocational assessment from passive inputs and paper tests to demonstrable, authentic diagnostic performance aligned directly with industry expectations.',
  },
  {
    title: 'Cognitive Load Theory & Implementation Science (Sweller, 2011; Damschroder et al., 2022)',
    category: 'Cognitive Scaffolding',
    summary:
      'Explains why unguided fault-finding overloads novice working memory and positions SYSMOD as a contextually adaptable scaffold that breaks complex failures into structured steps.',
  },
  {
    title: 'DepEd Classroom Assessment & Visual Media Models (DepEd Order No. 8, 2015; Dela Cerna, 2000; Gonzales, 2002)',
    category: 'Instructional Design',
    summary:
      'Grounds rubric-based formative performance tracking and computer-aided visual diagramming to improve technical retention and psychomotor fault-isolation mastery.',
  },
];

export const UNSTRUCTURED_EFFECTS = [
  {
    title: 'Cognitive Overload & Working Memory Saturation',
    description:
      'As established by Cognitive Load Theory (Sweller, 2011) and Yang et al. (2024), unguided problem-solving during multi-layered failures overwhelms novice working memory, inducing panic and persistent diagnostic errors.',
  },
  {
    title: 'Random Component Swapping ("Shotgun Repair")',
    description:
      'Without explicit subsystem boundaries (Rashid, 2020), learners blindly swap RAM, GPUs, PSUs, or cables simultaneously—obscuring the actual root cause and increasing hardware wear in resource-constrained school labs.',
  },
  {
    title: 'Premature Hard Drive Reformatting',
    description:
      'When confronted with OS stop codes, driver conflicts, or boot errors, novices bypass root-cause analysis and default to wiping and reinstalling the operating system—destroying diagnostic logs and failing to resolve underlying hardware defects.',
  },
  {
    title: 'Inflated Mean Time to Repair (MTTR) & Clean Lab Fragility',
    description:
      'Because laboratories keep computers strictly functional for daily classes (EDCOM II, 2024; Bascuguin & Generoso, 2026), students form fragile linear habits that result in repeated false turnarounds and long repair durations under authentic faults.',
  },
];

export const EMPIRICAL_EVIDENCE: EvidenceRecord[] = [
  {
    id: 'edcom2-2024',
    authors: 'Second Congressional Commission on Education (EDCOM II)',
    year: '2024',
    rrlGroup: 'Local Literature',
    context: 'Miseducation: The Current State of Philippine Education (Year One Report)',
    finding:
      'Documented widespread shortages of functional laboratory equipment, outdated training facilities, and practical skills gaps across secondary TVL tracks—explaining why schools cannot risk physical hardware on live breakdown drills.',
    metrics: 'National policy evidence validating equipment constraints & the Clean Lab Paradox',
  },
  {
    id: 'padilla-2026',
    authors: 'Padilla, J. P.',
    year: '2026',
    rrlGroup: 'Local Studies',
    context: 'International Journal of Multidisciplinary Research and Publications (Laguna, Region IV-A)',
    finding:
      'Evaluated secondary TVL-ICT students across core CSS competencies, finding high scores in routine hardware assembly and basic cable crimping contrasted with substantial difficulty in independent fault diagnosis and non-routine repairs.',
    metrics: 'Direct Region IV-A evidence of the routine-assembly vs. advanced-diagnosis gap',
  },
  {
    id: 'bascuguin-2026',
    authors: 'Bascuguin, C. B., & Generoso, E. T.',
    year: '2026',
    rrlGroup: 'Local Studies',
    context: 'Frontiers in Education, 11, Article 1813666 (Batangas Mixed-Methods Report)',
    finding:
      'Found that although teachers adopt adaptive strategies, hands-on CSS learning is heavily restricted by static laboratory setups and a lack of authentic breakdown scenarios because school PCs must remain operational for daily classes.',
    metrics: 'Substantiates the Clean Lab Paradox inside Region IV-A public CSS classrooms',
  },
  {
    id: 'yang-2024',
    authors: 'Yang, Y., Zhang, X., & Wang, L.',
    year: '2024',
    rrlGroup: 'Foreign Literature',
    context: 'ACM Computing Surveys, 56(4), 1–38 (Systematic Literature Review)',
    finding:
      'Synthesized international debugging interventions and confirmed that unstructured trial-and-error causes cognitive overload and persistent diagnostic errors among novices, whereas explicit hypothesis-testing frameworks significantly elevate speed and accuracy.',
    metrics: 'Systematic international review proving novice trial-and-error failure patterns',
  },
  {
    id: 'sweller-2011',
    authors: 'Sweller, J.',
    year: '2011',
    rrlGroup: 'Foreign Literature',
    context: 'Cognitive Load Theory (The Psychology of Learning and Motivation, Vol. 55)',
    finding:
      'Demonstrated that unguided problem-solving rapidly overloads novice working memory—explaining why Grade 11 learners default to panic, random part swapping, or immediate reformatting during complex multi-variable breakdowns.',
    metrics: 'Cognitive mechanism behind diagnostic fatigue and shotgun troubleshooting',
  },
  {
    id: 'rashid-2020',
    authors: 'Rashid, A.',
    year: '2020',
    rrlGroup: 'Foreign Literature',
    context: 'Computer Applications in Engineering Education, 28(2), 233–247',
    finding:
      'Argued that conventional trial-and-error troubleshooting in technical laboratories is inefficient and induces cognitive frustration, advocating for MBSE functional block modeling to drive structured problem-solving.',
    metrics: 'Engineering education rationale for replacing ad-hoc repair with MBSE',
  },
  {
    id: 'dounas-2017',
    authors: 'Dounas-Frazer, D. R., & Lewandowski, H. J.',
    year: '2017',
    rrlGroup: 'Foreign Studies',
    context: 'Physical Review Physics Education Research, 13(1), Article 010102',
    finding:
      'Qualitative investigation of lab instructors showed that while troubleshooting is recognized as essential, instruction is rarely formalized—leaving students to rely on unguided trial-and-error and informal guessing.',
    metrics: 'Confirms absence of formalized troubleshooting pedagogy in technical labs',
  },
];

export const SYSMOD_CORE_PRINCIPLES = [
  {
    index: '01',
    title: 'System Context & Boundary Modeling',
    sysmlView: 'Context Diagram (Black-Box)',
    description:
      'Defines the exact boundary between the computer system and external dependencies (AC mains outlet, monitor cable, patch panel, router/ISP) before opening the chassis.',
    labApplication:
      'Prevents tearing down internal motherboard components when the fault lies at an external power strip, input toggle, or switch port.',
  },
  {
    index: '02',
    title: 'Structural Decomposition',
    sysmlView: 'Block Definition & Internal Block Diagrams (BDD / IBD)',
    description:
      'Breaks a monolithic PC into discrete, testable functional blocks: Power Delivery, Processing/Thermal, Memory, Storage, Graphics Bus, OS/Drivers, and Network Stack.',
    labApplication:
      'Enables single-variable fault isolation—testing one subsystem block with the proper instrument instead of shotgun part swapping (Rashid, 2020).',
  },
  {
    index: '03',
    title: 'State Machine & Behavior Modeling',
    sysmlView: 'State Machine Diagram (STM)',
    description:
      'Maps the deterministic startup and runtime sequence: Standby (S5) → Power Good (PWR_OK) → POST → UEFI/Bootloader → OS Kernel → Active Runtime.',
    labApplication:
      'Pinpoints exactly which state transition stalled (e.g., Hex 55 halts at Memory Init; Event ID 41 occurs during Runtime load).',
  },
  {
    index: '04',
    title: 'Requirement & Interface Traceability',
    sysmlView: 'Requirement & Parametric Tolerances',
    description:
      'Verifies quantitative engineering specifications across every interface (±5% ATX voltage rails, safe thermal ceiling, 8-pin T568B continuity, 0 MemTest errors) and logs all findings.',
    labApplication:
      'Replaces vague assumptions ("fans are spinning so power is fine") with verifiable measurements documented on the Job Service Order.',
  },
];

export const SIX_STEP_METHOD: DiagnosticStep[] = [
  {
    number: 1,
    title: 'Identify the Problem',
    sysmodMapping: 'System Context & Black-Box Observation',
    summary:
      'Gather reproducible symptoms, user context, POST hex/beep codes, and operating system logs before touching internal components.',
    actions: [
      'Interview the user/client to record exact failure symptoms and recent changes.',
      'Observe LEDs, fan cadence, POST 7-segment codes, and AMI/Award beep sequences.',
      'Inspect Windows Event Viewer (e.g., Event ID 41, 7, 4101) and network indicators.',
    ],
    verification: 'Clear, documented symptom profile without altering the initial system state.',
  },
  {
    number: 2,
    title: 'Establish Theory of Probable Cause',
    sysmodMapping: 'Structural Decomposition & Subsystem Allocation',
    summary:
      'Decompose the fault into specific hardware, software, or network subsystems and rank testable causal hypotheses.',
    actions: [
      'Check external context boundaries first (cables, wall outlets, switch links).',
      'Allocate the symptom to a single subsystem block (Power, Memory, GPU, OS Driver, Network).',
      'Prioritize non-invasive checks before invasive component removal.',
    ],
    verification: 'Ranked, falsifiable hypothesis targeting one subsystem at a time.',
  },
  {
    number: 3,
    title: 'Test Theory to Determine Cause',
    sysmodMapping: 'White-Box Interface & Parametric Verification',
    summary:
      'Select the appropriate diagnostic tool for the targeted component to empirically confirm or eliminate the hypothesis.',
    actions: [
      'Measure DC voltage rails (+12V, +5V, +3.3V, CR2032) with a Digital Multimeter.',
      'Run targeted software/hardware diagnostics: MemTest86, Thermal IR Probe, Cable Wire-Map, WinDbg, SMART, or ipconfig/ping.',
      'If disproven, form a new hypothesis without performing blind repairs.',
    ],
    verification: 'Quantitative reading definitively proving the root cause.',
  },
  {
    number: 4,
    title: 'Establish Plan of Action & Implement Solution',
    sysmodMapping: 'Controlled State Transition & Remediation',
    summary:
      'Apply the exact corrective action safely using ESD precautions, targeting only the confirmed faulty component.',
    actions: [
      'Disconnect AC mains and apply ESD grounding prior to physical intervention.',
      'Execute the targeted repair (reconnect cable, reseat/replace module, re-paste CPU, re-crimp T568B, clean DDU driver install, restore DNS).',
      'Avoid modifying healthy subsystems to eliminate turnaround penalties.',
    ],
    verification: 'Targeted component restored cleanly with zero collateral errors.',
  },
  {
    number: 5,
    title: 'Verify Full System Functionality',
    sysmodMapping: 'Holistic State Machine & Stress Verification',
    summary:
      'Confirm the complete boot sequence and operational stability under realistic workload conditions.',
    actions: [
      'Verify single POST beep (Hex 00), clean OS boot, and accurate RTC clock.',
      'Validate thermal equilibrium, stable +12V rail under load, clean memory/storage I/O, and active DHCP/DNS resolution.',
      'Ensure no secondary or compound faults remain unresolved.',
    ],
    verification: 'All subsystems pass full verification within nominal tolerances.',
  },
  {
    number: 6,
    title: 'Document Findings, Actions, and Outcomes',
    sysmodMapping: 'Requirement Traceability & Knowledge Archive',
    summary:
      'Complete and submit the standardized Job Service Order (JSO) recording root cause, actions taken, and technician performance.',
    actions: [
      'Log initial reported problem, diagnostic telemetry, root cause, and exact corrective repair.',
      'Review Mean Time to Repair (MTTR), Turnarounds, and Diagnostic Accuracy.',
      'Archive the signed JSO for laboratory accountability and future reference.',
    ],
    verification: 'Submitted Job Service Order with verified 5-star diagnostic performance rating.',
  },
];

export const ADVANCED_TROUBLESHOOTING_EFFECTS = [
  {
    dimension: 'Initial Fault Response',
    unstructured: 'Immediate panic, random disassembly, or wiping the OS drive without inspecting logs.',
    advancedSysmod: 'Structured context check: captures POST codes, Event Viewer logs, and baseline measurements first.',
  },
  {
    dimension: 'Isolation Accuracy & Retention',
    unstructured: 'Shotgun swapping of multiple components simultaneously—creating high turnarounds and weak retention.',
    advancedSysmod: 'Higher troubleshooting accuracy, faster root-cause identification, and superior procedural retention (Sababha et al., 2021).',
  },
  {
    dimension: 'Mean Time to Repair (MTTR)',
    unstructured: 'Prolonged downtime due to repetitive trial-and-error loops and false leads.',
    advancedSysmod: 'Significantly improved fault-isolation speed via hypothesis-driven models and modular exercises (Yang et al., 2024; Puspanda & Budiyanto, 2021).',
  },
  {
    dimension: 'Equipment & Lab Safety',
    unstructured: 'Bent pins, ESD exposure, and hardware wear on scarce school computers.',
    advancedSysmod: 'Zero-risk practice on realistic breakdowns via virtualized & 2D sandboxes (Kaysi, 2025; Paytaren, 2020; EDCOM II, 2024).',
  },
  {
    dimension: 'Cognitive Load & Readiness',
    unstructured: 'Working memory overload and freezing when familiar GUI prompts disappear (Sweller, 2011).',
    advancedSysmod: 'Scaffolded visual modeling appropriate for Senior High School learners, building resilient TESDA CSS NC II mastery (Bielik et al., 2022).',
  },
];

export const ADVANCED_IMPACT_EVIDENCE: EvidenceRecord[] = [
  {
    id: 'sababha-2021',
    authors: 'Sababha, B. H., AlQaralleh, E., & Alqudah, Y.',
    year: '2021',
    rrlGroup: 'Foreign Studies',
    context: 'IEEE Transactions on Education, 64(4), 412–420',
    finding:
      'Quantitative evaluation of model-based laboratory instruction showed students trained with system modeling frameworks achieved higher troubleshooting accuracy, identified root causes faster, and demonstrated superior retention compared to trial-and-error cohorts.',
    metrics: 'Higher accuracy · faster root-cause ID · superior procedural retention',
  },
  {
    id: 'bielik-2022',
    authors: 'Bielik, T., Damelin, D., & Krajcik, J. S.',
    year: '2022',
    rrlGroup: 'Foreign Studies',
    context: 'Journal of Science Education and Technology, 31(2), 173–189',
    finding:
      'Proved that secondary school learners possess the cognitive maturity to master system modeling practices when supported by scaffolded visual tools, accurately tracing cause-and-effect relationships and predicting system behavior.',
    metrics: 'Validates developmental fit of SYSMOD diagramming for Senior High School students',
  },
  {
    id: 'kaysi-2025',
    authors: 'Kaysi, F.',
    year: '2025',
    rrlGroup: 'Foreign Studies',
    context: 'International Journal of Education and Research, 13(4), 210–225',
    finding:
      'Demonstrated that virtual simulation software significantly increased technical-vocational student confidence, eliminated fear of damaging physical equipment, and enabled repeated practice on non-routine breakdowns.',
    metrics: 'Supports pairing SYSMOD with 2D sandboxes, VirtualBox & Packet Tracer',
  },
  {
    id: 'puspanda-2021',
    authors: 'Puspanda, N., & Budiyanto, C.',
    year: '2021',
    rrlGroup: 'Foreign Studies',
    context: 'Open Engineering, 11(1), 76–84',
    finding:
      'Experimental results using modular Raspberry Pi and network OS troubleshooting exercises demonstrated significantly faster fault-isolation speed and stronger practical psychomotor performance than lecture-only classes.',
    metrics: 'Faster fault-isolation speed · improved practical psychomotor performance',
  },
  {
    id: 'virtudazo-2022',
    authors: 'Virtudazo, J. (2022); Paytaren, A. (2020); Caratiquit & Caratiquit (2022)',
    year: '2020–2022',
    rrlGroup: 'Local Studies',
    context: 'Philippine TVL-CSS Digital Learning Aids & Virtual Training Studies',
    finding:
      'Local empirical interventions (CSS Droid virtual apps and structured visual walkthroughs) improved student knowledge, engagement, and diagnostic scores with less instructor intervention—establishing a strong local foundation that SYSMOD extends into advanced software, event log, and network diagnostics.',
    metrics: 'Proven local effectiveness of visual & virtual CSS learning tools',
  },
];

export const ALL_REFERENCES: AcademicReference[] = [
  // Local Literature
  {
    id: 'ref-tesda-deped-2024',
    category: 'Curriculum',
    rrlGroup: 'Local Literature',
    citation:
      'Technical Education and Skills Development Authority & Department of Education. (2024). Training Regulations and Curriculum Guide for Computer Systems Servicing NC II. TESDA / DepEd, Philippines.',
  },
  {
    id: 'ref-ched-2012',
    category: 'Curriculum',
    rrlGroup: 'Local Literature',
    citation:
      'Commission on Higher Education. (2012). Policy-standard to enhance quality assurance (QA) in Philippine higher education through an outcomes-based and typology-based QA (CHED Memorandum Order No. 46, Series of 2012). CHED, Philippines.',
  },
  {
    id: 'ref-edcom2-2024',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Literature',
    citation:
      'Second Congressional Commission on Education. (2024). Miseducation: The current state of Philippine education (Year One Report). EDCOM II, Republic of the Philippines.',
  },
  {
    id: 'ref-deped-2015',
    category: 'Curriculum',
    rrlGroup: 'Local Literature',
    citation:
      'Department of Education. (2015). Policy guidelines on classroom assessment for the K to 12 Basic Education Program (DepEd Order No. 8, Series of 2015). DepEd, Philippines.',
  },
  {
    id: 'ref-delacerna-2000',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Local Literature',
    citation:
      'Dela Cerna, V. D. (2000). The effects of using electronic media in teaching basic technical concepts: A basis for upgrading the quality of instruction (Unpublished master’s thesis). University of Cebu, Philippines.',
  },
  {
    id: 'ref-gonzales-2002',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Local Literature',
    citation:
      'Gonzales, G. G. (2002). The computer-aided teaching model in technical laboratory courses: Structural effects and proposal (Unpublished master’s thesis). Cebu State College of Science and Technology, Philippines.',
  },

  // Local Studies
  {
    id: 'ref-padilla-2026',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Studies',
    citation:
      'Padilla, J. P. (2026). Teaching computer systems servicing competencies on students’ skills development and practical learning application. International Journal of Multidisciplinary Research and Publications, 8(12), 716–723.',
  },
  {
    id: 'ref-bascuguin-2026',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Studies',
    citation:
      'Bascuguin, C. B., & Generoso, E. T. (2026). Pedagogical flexibility and adaptive teaching strategies for practical skills mastery in computer systems servicing: A mixed-methods brief report from Batangas, Philippines. Frontiers in Education, 11, Article 1813666. https://doi.org/10.3389/feduc.2026.1813666',
  },
  {
    id: 'ref-virtudazo-2022',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Local Studies',
    citation:
      'Virtudazo, J. (2022). Development and acceptability of CSS droid mobile learning material in computer hardware servicing. International Journal of Research Publications, 96(1), 145–157.',
  },
  {
    id: 'ref-caratiquit-2022',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Local Studies',
    citation:
      'Caratiquit, K. D., & Caratiquit, L. J. C. (2022). Supplementary YouTube videos as instructional materials to enhance computer troubleshooting and repair techniques. International Journal of Social Learning, 2(2), 150–162.',
  },
  {
    id: 'ref-paytaren-2020',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Local Studies',
    citation:
      'Paytaren, A. (2020). CSS droid: An Android-based computer system servicing training app with virtual computer hardware assembly. Institutional Research Journal of Industrial Engineering and Science and Technology, 2(1), 45–55.',
  },
  {
    id: 'ref-arrabaca-2025',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Studies',
    citation:
      'Arrabaca, L. S. III, & Habil, M. A. (2025). Technical employment preparedness of Grade 12 ICT students specializing in Computer Systems Servicing. Asian Journal of Education and Social Studies, 51(12), 476–487.',
  },
  {
    id: 'ref-boyon-2019',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Studies',
    citation:
      'Boyon, J. L., Ramos, E. T., & Santos, D. M. (2019). Perceived computer literacy skills of Grade 12-Computer Systems Servicing students in selected secondary schools in Davao City. International Journal of Scientific and Research Publications, 9(6), 112–120.',
  },
  {
    id: 'ref-lozaga-2024',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Studies',
    citation:
      'Lozaga, G. T., & Mananquil, V. G. (2024). Teachers’ difficulties and schools’ readiness in computer systems servicing in relation to learners’ academic performance. International Multidisciplinary Journal of Research for Innovation, Sustainability and Excellence (IMJRISE), 1(8), 143–154.',
  },
  {
    id: 'ref-pelayo-2025',
    category: 'Unstructured Evidence',
    rrlGroup: 'Local Studies',
    citation:
      'Pelayo, V. J. V., Dela Cruz, R. A., & Hernandez, J. P. (2025). Investigating the relationship between training programs and technological resources to the efficiency of computer system servicing students. International Journal of Research and Innovation in Social Science, 9(1), 840–852.',
  },

  // Foreign Literature
  {
    id: 'ref-weilkiens-2016',
    category: 'SYSMOD',
    rrlGroup: 'Foreign Literature',
    citation:
      'Weilkiens, T. (2016, 2020). SYSMOD – The Systems Modeling Toolbox: Pragmatic MBSE with SysML (3rd ed.). MBSE4U Publishing.',
  },
  {
    id: 'ref-rashid-2020',
    category: 'SYSMOD',
    rrlGroup: 'Foreign Literature',
    citation:
      'Rashid, A. (2020). Incorporating model-based systems engineering into computer engineering laboratory instruction. Computer Applications in Engineering Education, 28(2), 233–247.',
  },
  {
    id: 'ref-yang-2024',
    category: 'Unstructured Evidence',
    rrlGroup: 'Foreign Literature',
    citation:
      'Yang, Y., Zhang, X., & Wang, L. (2024). Interventions for technical debugging and fault isolation instruction: A systematic literature review. ACM Computing Surveys, 56(4), 1–38.',
  },
  {
    id: 'ref-spady-1994',
    category: 'SYSMOD',
    rrlGroup: 'Foreign Literature',
    citation:
      'Spady, W. G. (1994). Outcomes-based education: Critical issues and answers. American Association of School Administrators.',
  },
  {
    id: 'ref-biggs-2013',
    category: 'SYSMOD',
    rrlGroup: 'Foreign Literature',
    citation:
      'Biggs, J., & Tang, C. (2013). Teaching for quality learning at university: What the student does (4th ed.). McGraw-Hill Education / Open University Press.',
  },
  {
    id: 'ref-sweller-2011',
    category: 'Unstructured Evidence',
    rrlGroup: 'Foreign Literature',
    citation:
      'Sweller, J. (2011). Cognitive load theory. In J. P. Mestre & B. H. Ross (Eds.), The psychology of learning and motivation: Cognition in education (Vol. 55, pp. 37–76). Academic Press / Elsevier.',
  },
  {
    id: 'ref-damschroder-2022',
    category: 'SYSMOD',
    rrlGroup: 'Foreign Literature',
    citation:
      'Damschroder, L. J., Reardon, C. M., Widerquist, M. A. O., & Lowery, J. C. (2022). The updated Consolidated Framework for Implementation Research based on user feedback. Implementation Science, 17(1), Article 75.',
  },

  // Foreign Studies
  {
    id: 'ref-puspanda-2021',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Foreign Studies',
    citation:
      'Puspanda, N., & Budiyanto, C. (2021). Psychomotor and troubleshooting skill development in network operating system courses using Raspberry Pi. Open Engineering, 11(1), 76–84.',
  },
  {
    id: 'ref-sababha-2021',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Foreign Studies',
    citation:
      'Sababha, B. H., AlQaralleh, E., & Alqudah, Y. (2021). Development and assessment of a model-based embedded systems laboratory course. IEEE Transactions on Education, 64(4), 412–420.',
  },
  {
    id: 'ref-bielik-2022',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Foreign Studies',
    citation:
      'Bielik, T., Damelin, D., & Krajcik, J. S. (2022). Supporting secondary school students’ system modeling practices through scaffolded technology-enhanced curriculum design. Journal of Science Education and Technology, 31(2), 173–189.',
  },
  {
    id: 'ref-dounas-2017',
    category: 'Unstructured Evidence',
    rrlGroup: 'Foreign Studies',
    citation:
      'Dounas-Frazer, D. R., & Lewandowski, H. J. (2017). Electronics lab instructors’ approaches to troubleshooting instruction. Physical Review Physics Education Research, 13(1), Article 010102.',
  },
  {
    id: 'ref-kaysi-2025',
    category: 'Advanced Troubleshooting',
    rrlGroup: 'Foreign Studies',
    citation:
      'Kaysi, F. (2025). Investigating the impact of simulation software on students’ engagement and problem-solving in technical vocational education. International Journal of Education and Research, 13(4), 210–225.',
  },
  {
    id: 'ref-swain-2024',
    category: 'SYSMOD',
    rrlGroup: 'Foreign Literature',
    citation:
      'Swain, J., & Chen. (2024). Six-phase qualitative thematic analysis methodology for educational research.',
  },
];
