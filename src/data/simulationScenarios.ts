import {
  DiagnosticToolId,
  ModelComponentId,
  ModelComponentMeta,
  RepairActionId,
  RepairActionMeta,
  ScenarioFault,
  SimulationScenario2D,
  StarRatingBreakdown,
  ToolMeta,
} from '../types';

export const DIAGNOSTIC_TOOLS: Record<DiagnosticToolId, ToolMeta> = {
  multimeter: {
    id: 'multimeter',
    name: 'Voltage Tester (Multimeter)',
    shortName: 'Voltage Tester',
    purpose: 'Checks power levels on the Power Supply, Graphics Card power plug, and BIOS battery.',
    targetLayer: 'hardware',
  },
  post_analyzer: {
    id: 'post_analyzer',
    name: 'Beep & Error Code Reader',
    shortName: 'Error Code Reader',
    purpose: 'Reads startup beeps and error numbers when the PC will not turn on or boot.',
    targetLayer: 'both',
  },
  thermal_probe: {
    id: 'thermal_probe',
    name: 'Temperature Scanner',
    shortName: 'Temp Scanner',
    purpose: 'Checks how hot the CPU is getting to spot overheating or dry thermal paste.',
    targetLayer: 'hardware',
  },
  memtest86: {
    id: 'memtest86',
    name: 'RAM Memory Checker',
    shortName: 'RAM Checker',
    purpose: 'Checks if RAM sticks are clicked in properly or have broken memory chips.',
    targetLayer: 'hardware',
  },
  cable_tester: {
    id: 'cable_tester',
    name: 'Cable Tester (LAN & HDMI)',
    shortName: 'Cable Tester',
    purpose: 'Tests Ethernet LAN cables and HDMI display cables for loose or broken wires.',
    targetLayer: 'hardware',
  },
  smart_chkdsk: {
    id: 'smart_chkdsk',
    name: 'Drive & File Health Checker',
    shortName: 'Drive Checker',
    purpose: 'Checks the SSD data cable for errors and scans Windows C: drive files for damage.',
    targetLayer: 'both',
  },
  event_windbg: {
    id: 'event_windbg',
    name: 'Crash & Error Log Viewer',
    shortName: 'Crash Log Viewer',
    purpose: 'Reads Windows Blue Screen (BSOD) crash reports and driver error logs.',
    targetLayer: 'software',
  },
  network_cli: {
    id: 'network_cli',
    name: 'Internet & IP Checker',
    shortName: 'Internet Checker',
    purpose: 'Checks the PC IP address, router connection, and DNS website settings.',
    targetLayer: 'software',
  },
  security_scanner: {
    id: 'security_scanner',
    name: 'Virus & Malware Scanner',
    shortName: 'Virus Scanner',
    purpose: 'Scans for hidden viruses, fake background apps, and turned-off antivirus.',
    targetLayer: 'software',
  },
};

export const MODEL_COMPONENTS: Record<ModelComponentId, ModelComponentMeta> = {
  motherboard: {
    id: 'motherboard',
    label: 'Main Motherboard',
    shortLabel: 'Motherboard',
    layer: 'hardware',
    subsystem: 'Main Circuit Board',
    description: 'The main board that connects and sends power to the CPU, RAM, Graphics Card, and drives.',
    validDiagnosticTools: ['multimeter', 'post_analyzer'],
    validRepairActions: ['reseat_24pin_mobo', 'replace_motherboard'],
    nominalReading: '24-Pin main power is seated tightly, board power circuits read normal, and capacitors are healthy.',
  },
  psu: {
    id: 'psu',
    label: 'Power Supply (PSU)',
    shortLabel: 'Power Supply',
    layer: 'hardware',
    subsystem: 'Power Part',
    description: 'Gives steady electrical power (+12V, +5V, +3.3V) to every part inside the PC.',
    validDiagnosticTools: ['multimeter'],
    validRepairActions: ['replace_psu_550w'],
    nominalReading: 'All power voltages are normal (+12.04V, +5.01V, +3.31V). Power Supply is working OK.',
  },
  cpu_processor: {
    id: 'cpu_processor',
    label: 'CPU Processor (Socket & Chip)',
    shortLabel: 'CPU Processor',
    layer: 'hardware',
    subsystem: 'Central Processor',
    description: 'The main processor chip locked inside the motherboard CPU socket. Runs all startup and system instructions.',
    validDiagnosticTools: ['post_analyzer', 'multimeter'],
    validRepairActions: ['reseat_cpu_socket', 'replace_cpu_chip'],
    nominalReading: 'CPU processor is seated cleanly in the socket, core voltage reads 1.18V, and Startup Code is 00.',
  },
  cpu_cooler: {
    id: 'cpu_cooler',
    label: 'CPU Cooling Fan & Thermal Paste',
    shortLabel: 'CPU Cooler',
    layer: 'hardware',
    subsystem: 'Processor Cooling',
    description: 'The heatsink, thermal paste, and cooling fan mounted over the CPU to pull heat away.',
    validDiagnosticTools: ['thermal_probe'],
    validRepairActions: ['reapply_thermal_paste'],
    nominalReading: 'CPU cooler temperature is safe (41°C idle / 63°C busy) and fan is spinning smoothly.',
  },
  ram_slots: {
    id: 'ram_slots',
    label: 'Memory (RAM Sticks)',
    shortLabel: 'RAM Memory',
    layer: 'hardware',
    subsystem: 'System Memory',
    description: 'The memory sticks clipped into the motherboard slots (A2 and B2).',
    validDiagnosticTools: ['memtest86', 'post_analyzer'],
    validRepairActions: ['reseat_ram_latch', 'swap_ram_b2'],
    nominalReading: '16 GB RAM detected cleanly. Both sticks are locked in with 0 memory errors.',
  },
  gpu_pcie: {
    id: 'gpu_pcie',
    label: 'Graphics Card (GPU)',
    shortLabel: 'Graphics Card',
    layer: 'hardware',
    subsystem: 'Video & Display',
    description: 'Sends the picture to the monitor and uses an 8-pin power cable.',
    validDiagnosticTools: ['multimeter', 'post_analyzer'],
    validRepairActions: ['reconnect_pcie_power'],
    nominalReading: 'Graphics Card 8-pin power reads 12.06V normal and monitor display signal is active.',
  },
  cmos_post: {
    id: 'cmos_post',
    label: 'BIOS Battery & Error Code Screen',
    shortLabel: 'BIOS Battery',
    layer: 'hardware',
    subsystem: 'Clock Battery & Startup Codes',
    description: 'Small 3V coin battery that saves the clock/BIOS settings, plus the startup error code LED.',
    validDiagnosticTools: ['multimeter', 'post_analyzer'],
    validRepairActions: ['replace_cr2032'],
    nominalReading: 'BIOS Battery is healthy (3.18V) and Startup Code shows 00 (No errors).',
  },
  sata_storage: {
    id: 'sata_storage',
    label: 'Storage Drive (SSD) & Cable',
    shortLabel: 'SSD & Cable',
    layer: 'hardware',
    subsystem: 'Storage Hardware',
    description: 'Main SSD that stores Windows and files, connected to the motherboard by a SATA cable.',
    validDiagnosticTools: ['smart_chkdsk'],
    validRepairActions: ['replace_sata_cable'],
    nominalReading: 'SSD health is 100% Good with 0 cable transfer errors. Data cable is intact.',
  },
  nic_rj45: {
    id: 'nic_rj45',
    label: 'Internet Port & LAN Cable',
    shortLabel: 'LAN Cable',
    layer: 'hardware',
    subsystem: 'Wired Network Hardware',
    description: 'The Ethernet port on the back of the PC and the plug-in LAN cable.',
    validDiagnosticTools: ['cable_tester'],
    validRepairActions: ['recrimp_rj45'],
    nominalReading: 'All 8 LAN cable wires pass (T568B straight-through) with a solid green link light.',
  },
  nvme_m2: {
    id: 'nvme_m2',
    label: 'M.2 Fast SSD',
    shortLabel: 'M.2 SSD',
    layer: 'hardware',
    subsystem: 'Fast Board Storage',
    description: 'Slim high-speed storage stick plugged straight into the motherboard slot.',
    validDiagnosticTools: ['smart_chkdsk', 'post_analyzer'],
    validRepairActions: ['reseat_nvme_m2'],
    nominalReading: 'M.2 Fast SSD is detected in BIOS, locked securely, and shows 100% healthy status.',
  },
  case_fans: {
    id: 'case_fans',
    label: 'PC Case Cooling Fans',
    shortLabel: 'Case Fans',
    layer: 'hardware',
    subsystem: 'Case Airflow',
    description: 'Case fans that pull cool air in and push hot air out of the computer tower.',
    validDiagnosticTools: ['thermal_probe', 'multimeter'],
    validRepairActions: ['replace_case_fan'],
    nominalReading: 'Case fans spinning smoothly at 1,200 RPM with steady airflow (34°C inside case).',
  },
  front_panel: {
    id: 'front_panel',
    label: 'Power Button & Front Cables',
    shortLabel: 'Power Button',
    layer: 'hardware',
    subsystem: 'Front Switch Wires',
    description: 'Small wires linking the PC power button, reset button, and front panel lights to the motherboard.',
    validDiagnosticTools: ['multimeter'],
    validRepairActions: ['reconnect_front_panel'],
    nominalReading: 'Power Switch (PWR_SW) wire is plugged onto the right pins and triggers startup cleanly.',
  },
  monitor_display: {
    id: 'monitor_display',
    label: 'Monitor & Display Cable (HDMI)',
    shortLabel: 'Monitor',
    layer: 'hardware',
    subsystem: 'External Screen & Cable',
    description: 'The external computer monitor, its power cord, and the HDMI cable plugged into the Graphics Card.',
    validDiagnosticTools: ['cable_tester', 'multimeter'],
    validRepairActions: ['reconnect_display_cable', 'replace_monitor_power'],
    nominalReading: 'Monitor power is steady (green LED) and the HDMI cable sends a clear 1080p picture.',
  },
  bios_bootloader: {
    id: 'bios_bootloader',
    label: 'Startup & Boot Settings (BIOS)',
    shortLabel: 'Startup / BIOS',
    layer: 'software',
    subsystem: 'Pre-Windows Startup',
    description: 'The startup software that wakes up the hardware and launches Windows.',
    validDiagnosticTools: ['post_analyzer', 'security_scanner'],
    validRepairActions: ['rebuild_bootloader', 'reformat_os'],
    nominalReading: 'Secure Boot is ON and Windows startup files load cleanly in 9 seconds.',
  },
  os_driver: {
    id: 'os_driver',
    label: 'Display Driver & Windows System',
    shortLabel: 'Display Driver',
    layer: 'software',
    subsystem: 'Windows Drivers',
    description: 'Software that helps Windows run the Graphics Card without freezing or crashing.',
    validDiagnosticTools: ['event_windbg'],
    validRepairActions: ['ddu_clean_driver', 'reformat_os'],
    nominalReading: 'Display driver is healthy and signed. Zero Blue Screen crash reports found.',
  },
  event_monitor: {
    id: 'event_monitor',
    label: 'System Error Logs & Running Apps',
    shortLabel: 'Error Logs',
    layer: 'software',
    subsystem: 'System Logs',
    description: 'Windows logbook that records sudden shutdowns, crashes, and background apps.',
    validDiagnosticTools: ['event_windbg', 'security_scanner'],
    validRepairActions: ['quarantine_malware', 'reformat_os'],
    nominalReading: 'Error logs are clean, CPU usage is low (3%), and no suspicious apps are running.',
  },
  network_stack: {
    id: 'network_stack',
    label: 'Internet & DNS Settings',
    shortLabel: 'Internet Settings',
    layer: 'software',
    subsystem: 'Network Software',
    description: 'Controls the PC IP address and DNS settings used to open websites.',
    validDiagnosticTools: ['network_cli'],
    validRepairActions: ['restore_dns_dhcp'],
    nominalReading: 'IP address (192.168.10.142) and Automatic DNS are working normally (11ms ping).',
  },
  storage_fs: {
    id: 'storage_fs',
    label: 'Windows Drive Files (C: Drive)',
    shortLabel: 'C: Drive Files',
    layer: 'software',
    subsystem: 'Windows File System',
    description: 'Manages folders, Windows system files, and file errors on Drive C:.',
    validDiagnosticTools: ['smart_chkdsk'],
    validRepairActions: ['repair_fs_chkdsk', 'reformat_os'],
    nominalReading: 'Drive C: file scan is clean with zero damaged or corrupted system files.',
  },
  security_engine: {
    id: 'security_engine',
    label: 'Antivirus & Security Settings',
    shortLabel: 'Antivirus & Security',
    layer: 'software',
    subsystem: 'PC Security',
    description: 'Windows Defender antivirus protection, blocked websites file, and proxy settings.',
    validDiagnosticTools: ['security_scanner', 'network_cli'],
    validRepairActions: ['quarantine_malware', 'restore_dns_dhcp', 'reformat_os'],
    nominalReading: 'Windows Defender is ON, hosts file is normal, and no fake proxy is set.',
  },
};

export const REPAIR_ACTIONS: Record<RepairActionId, RepairActionMeta> = {
  reseat_24pin_mobo: {
    id: 'reseat_24pin_mobo',
    name: 'Firmly Plug In 24-Pin Motherboard Power',
    toolUsed: 'Anti-Static Strap',
    description: 'Push the wide 24-pin main power plug firmly into the motherboard until the side clip locks.',
    componentId: 'motherboard',
  },
  replace_motherboard: {
    id: 'replace_motherboard',
    name: 'Replace Damaged Main Motherboard',
    toolUsed: 'Screwdriver & Working ATX Motherboard',
    description: 'Swap out the motherboard with damaged power circuits/blown capacitors for a working board.',
    componentId: 'motherboard',
  },
  reseat_nvme_m2: {
    id: 'reseat_nvme_m2',
    name: 'Re-Plug & Tighten M.2 Fast SSD',
    toolUsed: 'Small Phillips Screwdriver',
    description: 'Slide the loose M.2 SSD firmly into its motherboard slot and tighten the holding screw.',
    componentId: 'nvme_m2',
  },
  replace_case_fan: {
    id: 'replace_case_fan',
    name: 'Clean Dust & Replace Stuck Case Fan',
    toolUsed: 'Air Blower & New 120mm Case Fan',
    description: 'Clear dust clogs and replace the jammed case fan to restore airflow inside the PC.',
    componentId: 'case_fans',
  },
  reconnect_front_panel: {
    id: 'reconnect_front_panel',
    name: 'Plug In Loose Power Button Wire',
    toolUsed: 'Motherboard Pin Guide',
    description: 'Connect the loose Power Switch (PWR_SW) cable onto the correct front-panel motherboard pins.',
    componentId: 'front_panel',
  },
  reconnect_display_cable: {
    id: 'reconnect_display_cable',
    name: 'Tighten & Re-Plug Monitor HDMI Cable',
    toolUsed: 'Verified HDMI Display Cable',
    description: 'Plug the loose HDMI cable firmly into both the Monitor input and the Graphics Card port.',
    componentId: 'monitor_display',
  },
  replace_monitor_power: {
    id: 'replace_monitor_power',
    name: 'Replace Broken Monitor Power Cord',
    toolUsed: 'Working Monitor AC Power Cord',
    description: 'Swap out the damaged monitor power cord so the screen turns on reliably.',
    componentId: 'monitor_display',
  },
  reconnect_pcie_power: {
    id: 'reconnect_pcie_power',
    name: 'Plug In Graphics Card Power Cable',
    toolUsed: 'Anti-Static Strap',
    description: 'Push the loose 8-pin power cable firmly into the Graphics Card until it clicks.',
    componentId: 'gpu_pcie',
  },
  replace_psu_550w: {
    id: 'replace_psu_550w',
    name: 'Replace Faulty Power Supply',
    toolUsed: 'Screwdriver & New 550W Power Supply',
    description: 'Swap out the weak power supply with a working 550W unit so power stays steady.',
    componentId: 'psu',
  },
  reseat_ram_latch: {
    id: 'reseat_ram_latch',
    name: 'Re-Plug & Lock Loose RAM Stick',
    toolUsed: 'Anti-Static Strap',
    description: 'Line up the notch on the loose RAM stick and press firmly until both clips snap shut.',
    componentId: 'ram_slots',
  },
  swap_ram_b2: {
    id: 'swap_ram_b2',
    name: 'Replace Broken RAM Stick (Slot B2)',
    toolUsed: 'Anti-Static Strap & Working Spare RAM',
    description: 'Take out the damaged RAM stick failing memory tests and install a working spare.',
    componentId: 'ram_slots',
  },
  reapply_thermal_paste: {
    id: 'reapply_thermal_paste',
    name: 'Put New Thermal Paste & Lock CPU Fan',
    toolUsed: 'Cleaning Alcohol & Fresh Thermal Paste',
    description: 'Wipe off dried paste, apply fresh thermal paste, and lock all CPU fan pins tightly.',
    componentId: 'cpu_cooler',
  },
  replace_cr2032: {
    id: 'replace_cr2032',
    name: 'Replace Dead BIOS Coin Battery',
    toolUsed: 'Plastic Pry Tool & New 3V Battery',
    description: 'Swap the drained round battery with a new 3V battery and set the date and time.',
    componentId: 'cmos_post',
  },
  replace_sata_cable: {
    id: 'replace_sata_cable',
    name: 'Replace Bent SSD Data Cable',
    toolUsed: 'New Locking SATA Cable',
    description: 'Replace the bent/crushed SSD cable causing slow boot and drive read errors.',
    componentId: 'sata_storage',
  },
  recrimp_rj45: {
    id: 'recrimp_rj45',
    name: 'Re-Crimp Broken LAN Cable Plug',
    toolUsed: 'Crimping Tool & New RJ-45 Plug',
    description: 'Cut off the damaged plug, arrange the 8 wires in T568B order, and crimp a new plug.',
    componentId: 'nic_rj45',
  },
  ddu_clean_driver: {
    id: 'ddu_clean_driver',
    name: 'Reinstall Clean Display Driver',
    toolUsed: 'Driver Cleaner & Official Video Driver',
    description: 'Remove the broken display driver in Safe Mode and install a clean working driver.',
    componentId: 'os_driver',
  },
  restore_dns_dhcp: {
    id: 'restore_dns_dhcp',
    name: 'Reset Internet & DNS to Automatic',
    toolUsed: 'Windows Network Settings',
    description: 'Clear the wrong manual DNS address (127.0.0.1) and set DNS back to Automatic.',
    componentId: 'network_stack',
  },
  repair_fs_chkdsk: {
    id: 'repair_fs_chkdsk',
    name: 'Repair Windows Drive Files (CHKDSK)',
    toolUsed: 'Windows Recovery Command',
    description: 'Scan and fix damaged Windows system files and errors on Drive C:.',
    componentId: 'storage_fs',
  },
  quarantine_malware: {
    id: 'quarantine_malware',
    name: 'Remove Virus & Turn On Antivirus',
    toolUsed: 'Offline Virus Cleaner',
    description: 'Delete the harmful background program and turn Windows Defender protection back on.',
    componentId: 'security_engine',
  },
  reseat_cpu_socket: {
    id: 'reseat_cpu_socket',
    name: 'Re-Seat CPU & Align Socket Pins',
    toolUsed: 'Anti-Static Strap & Magnifier',
    description: 'Lift the CPU retention arm, check socket contacts, align the gold corner triangle, and re-lock the CPU.',
    componentId: 'cpu_processor',
  },
  replace_cpu_chip: {
    id: 'replace_cpu_chip',
    name: 'Replace Faulty CPU Processor',
    toolUsed: 'Anti-Static Strap & Verified Spare CPU',
    description: 'Remove the burned/shorted processor from the motherboard socket and install a working CPU chip.',
    componentId: 'cpu_processor',
  },
  rebuild_bootloader: {
    id: 'rebuild_bootloader',
    name: 'Repair Windows Startup Files',
    toolUsed: 'Windows Recovery & BIOS Setup',
    description: 'Fix the damaged Windows startup loader and turn Secure Boot back on.',
    componentId: 'bios_bootloader',
  },
  reformat_os: {
    id: 'reformat_os',
    name: 'Reformat Drive & Reinstall Windows',
    toolUsed: 'Windows Bootable USB Installer',
    description: 'Wipes the entire Drive C: and clean-installs Windows. DANGER: Destroys all user files — if used unnecessarily or without full diagnosis, loses ALL accuracy and adds heavy turnarounds!',
    componentId: 'storage_fs',
  },
};

export const SIMULATION_SCENARIOS_2D: SimulationScenario2D[] = [
  {
    id: 'sim-01',
    code: 'SIM-01',
    title: 'Drafting Lab CAD Station — No Display & POST Beep',
    workstation: 'PC-CAD-04',
    clientName: 'Mr. Arnaldo Cruz (Drafting Instructor)',
    difficulty: 'Foundational',
    layerFocus: 'Hardware',
    targetTimeSeconds: 120,
    reportedSymptom:
      'Computer powers on with chassis fans spinning, but the monitor stays black ("No Signal") and the motherboard speaker emits 1 Long Beep followed by 2 Short Beeps.',
    postCode: 'd6',
    beepPattern: '1 Long, 2 Short (Video Subsystem)',
    faults: [
      {
        componentId: 'gpu_pcie',
        requiredTool: 'multimeter',
        requiredFix: 'reconnect_pcie_power',
        faultTitle: 'PCIe 8-Pin Auxiliary Power Uncoupled',
        diagnosticReading:
          'FAULT DETECTED — PCIe 8-Pin Aux Header reads 0.00V DC (Open Circuit). Main +12V ATX rail is nominal (12.04V).',
        fixedReading: 'PCIe 8-Pin Aux Header: 12.06V DC · Video handshake restored.',
        rootCauseSummary:
          'Auxiliary 8-pin PCIe +12V power cable to the graphics card was unseated, preventing GPU initialization (POST Hex d6).',
      },
    ],
  },
  {
    id: 'sim-02',
    code: 'SIM-02',
    title: 'Multimedia Editing Rig — Power Blackout Under Load',
    workstation: 'PC-MM-08',
    clientName: 'Ms. Katrina Dela Cruz (Multimedia Instructor)',
    difficulty: 'Foundational',
    layerFocus: 'Hardware',
    targetTimeSeconds: 135,
    reportedSymptom:
      'Workstation boots cleanly and idles normally, but abruptly shuts off with zero warning within 30 seconds of starting 3D rendering. Event Viewer logs Kernel-Power Event ID 41.',
    postCode: '00',
    beepPattern: '1 Short Beep (Idle OK, Fails Under Load)',
    faults: [
      {
        componentId: 'psu',
        requiredTool: 'multimeter',
        requiredFix: 'replace_psu_550w',
        faultTitle: 'ATX +12V DC Rail Voltage Droop Under Load',
        diagnosticReading:
          'FAULT DETECTED — +12V Rail droops to 11.12V under load (violates ±5% ATX min 11.40V) with 185 mV high ripple.',
        fixedReading: '+12V Rail under load: 12.05V · Ripple: 22 mV (ATX ±5% compliant).',
        rootCauseSummary:
          'Degraded filter capacitors inside the generic PSU caused +12V voltage collapse (11.12V) under heavy current draw, tripping UVP.',
      },
    ],
  },
  {
    id: 'sim-03',
    code: 'SIM-03',
    title: 'Robotics Lab Workstation — POST Code 55 Halt',
    workstation: 'PC-ROB-02',
    clientName: 'Mr. Gabriel Mendoza (Robotics Adviser)',
    difficulty: 'Foundational',
    layerFocus: 'Hardware',
    targetTimeSeconds: 120,
    reportedSymptom:
      'Pressing the power button lights up the motherboard, but the PC refuses to display BIOS, halts on POST Debug Code 55, and sounds 3 Long Beeps.',
    postCode: '55',
    beepPattern: '3 Long Beeps (Memory Initialization Error)',
    faults: [
      {
        componentId: 'ram_slots',
        requiredTool: 'memtest86',
        requiredFix: 'reseat_ram_latch',
        faultTitle: 'DDR4 DIMM Notch Misalignment / Open Pin Contact',
        diagnosticReading:
          'FAULT DETECTED — Slot A2 DIMM module tilted 2mm out of key notch; DRAM VDD measures 0.02V open circuit.',
        fixedReading: 'Slot A2 & B2 firmly latched · 16GB Dual-Channel detected · 0 MemTest86 errors.',
        rootCauseSummary:
          'DDR4 module in Slot A2 was partially unseated past its retention latch, preventing memory bus initialization (POST Hex 55).',
      },
    ],
  },
  {
    id: 'sim-04',
    code: 'SIM-04',
    title: 'CSS Laboratory Bench — APIPA 169.254.x.x No Internet',
    workstation: 'PC-LAB-12',
    clientName: 'Mr. Rolando Medina (CSS Lab Assistant)',
    difficulty: 'Intermediate',
    layerFocus: 'Network',
    targetTimeSeconds: 150,
    reportedSymptom:
      'Neighboring lab computers have normal intranet access, but this workstation shows a disconnected icon, holds IPv4 169.254.120.45, and cannot ping the default gateway.',
    postCode: '00',
    beepPattern: '1 Short Beep (POST OK)',
    faults: [
      {
        componentId: 'nic_rj45',
        requiredTool: 'cable_tester',
        requiredFix: 'recrimp_rj45',
        faultTitle: 'Fractured RJ-45 Pin 3 (RX+) Conductor',
        diagnosticReading:
          'FAULT DETECTED — Wire-Map Sequencer shows Pin 3 (Green-White RX+) OPEN CIRCUIT. Blocks DHCP Offer packets.',
        fixedReading: 'Wire-Map Pins 1–8: Straight-Through Pass (T568B) · DHCP lease 192.168.10.142 active.',
        rootCauseSummary:
          'Open-circuit conductor on Pin 3 of the RJ-45 patch plug prevented DHCP negotiation, forcing APIPA 169.254.x.x fallback.',
      },
    ],
  },
  {
    id: 'sim-05',
    code: 'SIM-05',
    title: 'Digital Media Station — BSOD VIDEO_TDR_FAILURE (0x116)',
    workstation: 'PC-MMA-04',
    clientName: 'Mr. Patrick Gomez (Multimedia Teacher)',
    difficulty: 'Intermediate',
    layerFocus: 'Software',
    targetTimeSeconds: 150,
    reportedSymptom:
      'Screen flashes black during HD video lessons, audio stutters, and Windows crashes to a Blue Screen reading VIDEO_TDR_FAILURE with module nvlddmkm.sys.',
    postCode: '00',
    beepPattern: '1 Short Beep (Hardware POST OK)',
    faults: [
      {
        componentId: 'os_driver',
        requiredTool: 'event_windbg',
        requiredFix: 'ddu_clean_driver',
        faultTitle: 'Corrupted Kernel Display Driver (BugCheck 0x116)',
        diagnosticReading:
          'FAULT DETECTED — WinDbg !analyze -v flags BugCheck 0x116 (VIDEO_TDR_FAILURE) in nvlddmkm.sys; Event ID 4101 logged.',
        fixedReading: 'WHQL display driver cleanly installed via DDU · 0 TDR timeouts under 4K playback.',
        rootCauseSummary:
          'Corrupted kernel-mode display driver binaries triggered Windows Timeout Detection and Recovery crashes (0x116).',
      },
    ],
  },
  {
    id: 'sim-06',
    code: 'SIM-06',
    title: 'Archive Workstation — Thermal Throttling & Disk Retry Lag',
    workstation: 'PC-ARCH-06',
    clientName: 'Mr. Gregory Salcedo (Library Coordinator)',
    difficulty: 'Advanced',
    layerFocus: 'Compound',
    targetTimeSeconds: 210,
    reportedSymptom:
      'System takes over 10 minutes to boot with Event ID 7 disk retries, CPU fans roar continuously, and the tower shuts down from heat after a few minutes.',
    postCode: '00',
    beepPattern: '1 Short Beep (Compound Hardware/Storage Fault)',
    faults: [
      {
        componentId: 'cpu_cooler',
        requiredTool: 'thermal_probe',
        requiredFix: 'reapply_thermal_paste',
        faultTitle: 'CPU Thermal Runaway (97.4°C) / Dry Paste',
        diagnosticReading:
          'FAULT DETECTED — IR Thermal Probe reads 97.4°C on CPU Package; heatsink push-pin unlatched with desiccated paste.',
        fixedReading: 'CPU Package Temp stabilized at 42°C Idle / 64°C Load with fresh compound.',
        rootCauseSummary:
          'Dried thermal interface compound and loose cooler latch caused CPU overheating (97.4°C).',
      },
      {
        componentId: 'sata_storage',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'replace_sata_cable',
        faultTitle: 'Kinked SATA Cable / UltraDMA CRC Errors',
        diagnosticReading:
          'FAULT DETECTED — SMART Attribute 199 (UltraDMA CRC Error Count) = 1,420 retries due to crushed 90° cable kink.',
        fixedReading: 'New locking SATA 6Gbps cable installed · UltraDMA CRC error count stabilized.',
        rootCauseSummary:
          'Severely creased SATA 6Gbps cable induced signal impedance loss and 1,420 UltraDMA transmission retries.',
      },
    ],
  },
  {
    id: 'sim-07',
    code: 'SIM-07',
    title: 'Testing Center Terminal — CMOS Reset, Bad RAM & DNS Loopback',
    workstation: 'PC-TEST-09',
    clientName: 'Ms. Michelle Dizon (Guidance & Testing)',
    difficulty: 'Advanced',
    layerFocus: 'Compound',
    targetTimeSeconds: 240,
    reportedSymptom:
      'Clock resets to 2021 on every boot, spreadsheet exports trigger KMODE_EXCEPTION BSODs, and browsers cannot open any website URLs despite showing connected.',
    postCode: '00',
    beepPattern: 'CMOS Checksum Warning + Runtime Faults',
    faults: [
      {
        componentId: 'cmos_post',
        requiredTool: 'multimeter',
        requiredFix: 'replace_cr2032',
        faultTitle: 'Depleted CR2032 Lithium Battery (1.15V)',
        diagnosticReading:
          'FAULT DETECTED — Multimeter measures CR2032 CMOS battery at 1.15V DC (nominal cutoff 2.80V).',
        fixedReading: 'Fresh CR2032 battery installed: 3.22V DC · RTC clock persists across shutdown.',
        rootCauseSummary: 'Depleted CR2032 cell (1.15V) erased BIOS and RTC clock settings on power off.',
      },
      {
        componentId: 'ram_slots',
        requiredTool: 'memtest86',
        requiredFix: 'swap_ram_b2',
        faultTitle: 'Defective DRAM Silicon Cells (Slot B2)',
        diagnosticReading:
          'FAULT DETECTED — MemTest86 logs 1,842 bit-flip errors in DIMM Slot B2 triggering BugCheck 0x1E.',
        fixedReading: 'Verified 8GB DDR4 replacement stick in Slot B2 passed MemTest86 with 0 errors.',
        rootCauseSummary: 'Failing memory cells in Slot B2 caused KMODE_EXCEPTION_NOT_HANDLED crashes.',
      },
      {
        componentId: 'network_stack',
        requiredTool: 'network_cli',
        requiredFix: 'restore_dns_dhcp',
        faultTitle: 'Static Loopback DNS Misconfiguration (127.0.0.1)',
        diagnosticReading:
          'FAULT DETECTED — ipconfig /all shows DNS statically set to 127.0.0.1; ping 8.8.8.8 passes (12ms) but domain names fail.',
        fixedReading: 'IPv4 DNS restored to DHCP Automatic · Domain resolution verified in 11ms.',
        rootCauseSummary: 'Static loopback DNS (127.0.0.1) blocked Layer 7 FQDN resolution despite healthy Layer 1–3.',
      },
    ],
  },
  {
    id: 'sim-08',
    code: 'SIM-08',
    title: 'Computer Lab Main Unit — Dead Motherboard Power & Hot Case',
    workstation: 'PC-LAB-01',
    clientName: 'Mr. Noel Villanueva (Lab Coordinator)',
    difficulty: 'Intermediate',
    layerFocus: 'Hardware',
    targetTimeSeconds: 180,
    reportedSymptom:
      'Power Supply tests good, but the motherboard lights flicker and shut off immediately, and the inside of the PC tower gets very hot with silent case fans.',
    postCode: '00',
    beepPattern: 'No Beep (Board Power Drop)',
    faults: [
      {
        componentId: 'motherboard',
        requiredTool: 'multimeter',
        requiredFix: 'replace_motherboard',
        faultTitle: 'Damaged Main Motherboard Power Circuit (Shorted VRM)',
        diagnosticReading:
          'FAULT DETECTED — Main Motherboard VRM power stage reads shorted (0.2Ω) with two bulging capacitors near the CPU socket.',
        fixedReading: 'Replacement Main Motherboard installed · All power lines and startup checks pass.',
        rootCauseSummary:
          'Bulging capacitors and a shorted voltage regulator on the Main Motherboard prevented stable startup.',
      },
      {
        componentId: 'case_fans',
        requiredTool: 'thermal_probe',
        requiredFix: 'replace_case_fan',
        faultTitle: 'Jammed PC Case Cooling Fan (Airflow Blocked)',
        diagnosticReading:
          'FAULT DETECTED — Inside case temperature hits 62°C; Case Cooling Fan reads 0 RPM (motor seized with dust).',
        fixedReading: 'New 120mm case fan installed · Airflow restored and case temperature dropped to 34°C.',
        rootCauseSummary:
          'Dust-seized case fan trapped hot air inside the chassis and accelerated motherboard capacitor wear.',
      },
    ],
  },
  {
    id: 'sim-09',
    code: 'SIM-09',
    title: 'Student Assembly Rig — Power Button Dead & Missing Boot Drive',
    workstation: 'PC-ASSY-07',
    clientName: 'Ms. Elena Bautista (CSS Instructor)',
    difficulty: 'Foundational',
    layerFocus: 'Hardware',
    targetTimeSeconds: 165,
    reportedSymptom:
      'After a student hardware assembly drill, pressing the PC power button does nothing, and once powered manually BIOS says "No Bootable M.2 Drive Found".',
    postCode: 'A2',
    beepPattern: 'No Startup / Boot Drive Missing',
    faults: [
      {
        componentId: 'front_panel',
        requiredTool: 'multimeter',
        requiredFix: 'reconnect_front_panel',
        faultTitle: 'Power Button Wire Disconnected from Motherboard',
        diagnosticReading:
          'FAULT DETECTED — Front Panel PWR_SW cable is unplugged from the motherboard pin header (Open circuit on button press).',
        fixedReading: 'Power Switch wire plugged into PWR_SW pins · PC powers on immediately when pressed.',
        rootCauseSummary:
          'Front panel power button cable was left unplugged during student reassembly.',
      },
      {
        componentId: 'nvme_m2',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'reseat_nvme_m2',
        faultTitle: 'Loose M.2 Fast SSD Not Seated in Slot',
        diagnosticReading:
          'FAULT DETECTED — M.2 Fast SSD is angled up with missing retention screw; drive not detected by motherboard.',
        fixedReading: 'M.2 Fast SSD firmly seated and screwed down · Windows boots cleanly.',
        rootCauseSummary:
          'Unsecured M.2 SSD popped loose from its motherboard connector, causing a missing boot drive error.',
      },
    ],
  },
  {
    id: 'sim-10',
    code: 'SIM-10',
    title: 'Classroom Demo PC — Monitor Shows "No Signal"',
    workstation: 'PC-DEMO-03',
    clientName: 'Ms. Clarissa Reyes (ICT Teacher)',
    difficulty: 'Foundational',
    layerFocus: 'Hardware',
    targetTimeSeconds: 110,
    reportedSymptom:
      'The PC tower powers on normally with 1 short OK beep and green keyboard lights, but the Monitor displays "No Signal" and goes into amber standby.',
    postCode: '00',
    beepPattern: '1 Short Beep (PC Healthy, Screen No Signal)',
    faults: [
      {
        componentId: 'monitor_display',
        requiredTool: 'cable_tester',
        requiredFix: 'reconnect_display_cable',
        faultTitle: 'Loose HDMI Display Cable on Monitor Input',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows open HDMI video signal lines; the plug behind the Monitor is half pulled out.',
        fixedReading: 'HDMI display cable firmly locked into Monitor and GPU · Crisp 1080p picture restored.',
        rootCauseSummary:
          'External HDMI video cable was pulled loose behind the monitor, causing a "No Signal" screen despite a healthy PC.',
      },
    ],
  },
  {
    id: 'sim-11',
    code: 'SIM-11',
    title: 'Registrar Desk PC — Blinking Cursor Before Windows',
    workstation: 'PC-REG-05',
    clientName: 'Mr. Alvin Soriano (Registrar Staff)',
    difficulty: 'Intermediate',
    layerFocus: 'Software',
    targetTimeSeconds: 140,
    reportedSymptom:
      'Hardware turns on cleanly and passes startup beep, but the screen gets stuck on a black page with a blinking white cursor and never loads Windows.',
    postCode: '00',
    beepPattern: '1 Short Beep (Hardware OK, Bootloader Stuck)',
    faults: [
      {
        componentId: 'bios_bootloader',
        requiredTool: 'post_analyzer',
        requiredFix: 'rebuild_bootloader',
        faultTitle: 'Damaged Windows Startup / Bootloader Files',
        diagnosticReading:
          'FAULT DETECTED — Startup reader shows missing Windows boot sector code and Secure Boot turned off.',
        fixedReading: 'Windows startup files rebuilt and Secure Boot turned ON · PC loads desktop in 9 seconds.',
        rootCauseSummary:
          'Corrupted Master Boot Record (MBR/GPT) prevented BIOS from handing off startup to Windows.',
      },
    ],
  },
  {
    id: 'sim-12',
    code: 'SIM-12',
    title: 'Student Research PC — Lagging & Antivirus Turned Off',
    workstation: 'PC-LIB-11',
    clientName: 'Ms. Rowena Velasco (Librarian)',
    difficulty: 'Intermediate',
    layerFocus: 'Software',
    targetTimeSeconds: 145,
    reportedSymptom:
      'Computer runs painfully slow even with zero apps open, CPU usage stays stuck near 100%, and Windows Defender antivirus refuses to turn back on.',
    postCode: '00',
    beepPattern: '1 Short Beep (Software Performance Issue)',
    faults: [
      {
        componentId: 'security_engine',
        requiredTool: 'security_scanner',
        requiredFix: 'quarantine_malware',
        faultTitle: 'Hidden Virus Process & Disabled Antivirus',
        diagnosticReading:
          'FAULT DETECTED — Virus Scanner caught fake background app svch0st.exe using 98% CPU and blocking Windows Defender.',
        fixedReading: 'Harmful program removed and Windows Defender protection turned back ON · CPU idle at 3%.',
        rootCauseSummary:
          'Hidden cryptojacking malware consumed CPU resources and disabled Windows Defender protection.',
      },
    ],
  },
  {
    id: 'sim-13',
    code: 'SIM-13',
    title: 'Faculty Grading PC — Bent SSD Cable & Broken Windows Files',
    workstation: 'PC-FAC-02',
    clientName: 'Mr. Dennis Tolentino (Faculty Member)',
    difficulty: 'Advanced',
    layerFocus: 'Compound',
    targetTimeSeconds: 215,
    reportedSymptom:
      'Windows keeps looping into "Automatic Repair" after a sudden brownout, files freeze while saving, and storage checks show both cable retries and damaged C: drive errors.',
    postCode: '00',
    beepPattern: '1 Short Beep (Hardware + Software Storage Fault)',
    faults: [
      {
        componentId: 'sata_storage',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'replace_sata_cable',
        faultTitle: 'Bent SSD Data Cable Causing Transfer Errors',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker reports 1,180 SATA cable transfer errors caused by a crushed data cable.',
        fixedReading: 'New locking SATA cable installed · Storage transfer errors stopped immediately.',
        rootCauseSummary:
          'Damaged SATA cable interrupted data transfers between the SSD and Main Motherboard.',
      },
      {
        componentId: 'storage_fs',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'repair_fs_chkdsk',
        faultTitle: 'Corrupted Windows C: Drive File Index',
        diagnosticReading:
          'FAULT DETECTED — Drive C: file scan shows damaged file records and a dirty-bit repair flag.',
        fixedReading: 'CHKDSK C: /f fixed all damaged Windows drive files and cleared the repair loop.',
        rootCauseSummary:
          'Sudden power outage during disk retries corrupted NTFS system file records on Drive C:.',
      },
    ],
  },
  {
    id: 'sim-14',
    code: 'SIM-14',
    title: 'Animation Lab PC — Dead Monitor Power & Crashing Video Driver',
    workstation: 'PC-ANI-05',
    clientName: 'Ms. Camille Navarro (Animation Adviser)',
    difficulty: 'Advanced',
    layerFocus: 'Compound',
    targetTimeSeconds: 220,
    reportedSymptom:
      'The external Monitor has no power light at all, and when tested on a spare screen Windows crashes to a Blue Screen (VIDEO_TDR_FAILURE) whenever videos open.',
    postCode: '00',
    beepPattern: '1 Short Beep (External Hardware + Driver Crash)',
    faults: [
      {
        componentId: 'monitor_display',
        requiredTool: 'multimeter',
        requiredFix: 'replace_monitor_power',
        faultTitle: 'Broken Monitor AC Power Cord (0V Input)',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads 0V at the Monitor power cord end; internal wire break inside plug.',
        fixedReading: 'New Monitor power cord installed · Monitor powers on with solid green light.',
        rootCauseSummary:
          'Broken AC power cord cut electricity to the external monitor.',
      },
      {
        componentId: 'os_driver',
        requiredTool: 'event_windbg',
        requiredFix: 'ddu_clean_driver',
        faultTitle: 'Corrupted Display Driver Causing Blue Screen',
        diagnosticReading:
          'FAULT DETECTED — Crash Log Viewer flags nvlddmkm.sys Blue Screen crash (VIDEO_TDR_FAILURE 0x116).',
        fixedReading: 'Old video driver cleaned and fresh official driver installed · Video playback runs smoothly.',
        rootCauseSummary:
          'Corrupted Windows display driver caused repeated Blue Screen crashes under video load.',
      },
    ],
  },
  {
    id: 'sim-15',
    code: 'SIM-15',
    title: 'Server Training Bench — Loose Board Power, Bad LAN & Wrong DNS',
    workstation: 'PC-NET-09',
    clientName: 'Mr. Joel Pangilinan (Network Instructor)',
    difficulty: 'Advanced',
    layerFocus: 'Compound',
    targetTimeSeconds: 260,
    reportedSymptom:
      'PC occasionally shuts off when bumped, Ethernet light stays orange with no IP from router, and even with a working link websites refuse to load.',
    postCode: '00',
    beepPattern: 'Intermittent Power + Full Network Failure',
    faults: [
      {
        componentId: 'motherboard',
        requiredTool: 'multimeter',
        requiredFix: 'reseat_24pin_mobo',
        faultTitle: 'Loose 24-Pin Main Motherboard Power Plug',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester detects power drops at the Main Motherboard 24-Pin socket; plug clip is unlatched.',
        fixedReading: '24-Pin power plug firmly locked into Main Motherboard · Power stays completely stable.',
        rootCauseSummary:
          'Half-unplugged 24-pin ATX connector caused intermittent motherboard power drops.',
      },
      {
        componentId: 'nic_rj45',
        requiredTool: 'cable_tester',
        requiredFix: 'recrimp_rj45',
        faultTitle: 'Broken Pin 3 Wire on LAN Patch Cable',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows Wire 3 (Green-White) is broken inside the RJ-45 connector.',
        fixedReading: 'LAN plug re-crimped to T568B standard · All 8 wires pass with solid green link.',
        rootCauseSummary:
          'Broken wire in the RJ-45 plug prevented the PC from talking to the lab router.',
      },
      {
        componentId: 'network_stack',
        requiredTool: 'network_cli',
        requiredFix: 'restore_dns_dhcp',
        faultTitle: 'Wrong Manual DNS Setting (127.0.0.1)',
        diagnosticReading:
          'FAULT DETECTED — Internet Checker shows manual DNS set to 127.0.0.1, blocking all website names.',
        fixedReading: 'Internet & DNS reset to Automatic · Websites open cleanly in 11ms.',
        rootCauseSummary:
          'Wrong static loopback DNS blocked browser website lookups even after the cable was repaired.',
      },
    ],
  },
  {
    id: 'sim-16',
    code: 'SIM-16',
    title: 'CAD Lab Breakdown — Power Drop, Hot CPU, No Signal & Driver Crash',
    workstation: 'PC-CAD-04',
    clientName: 'Engineering CAD Drafting Laboratory',
    difficulty: 'Expert',
    layerFocus: 'Compound',
    targetTimeSeconds: 320,
    reportedSymptom:
      'CAD PC shuts off under heavy 3D work, CPU fan screams from heat, the external monitor often drops to No Signal, and Windows crashes with a graphics driver Blue Screen.',
    postCode: '00',
    beepPattern: '1 Short Beep (Power, Thermal, Display & Driver Faults)',
    faults: [
      {
        componentId: 'psu',
        requiredTool: 'multimeter',
        requiredFix: 'replace_psu_550w',
        faultTitle: 'Power Supply +12V Rail Drop Under Heavy Load',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads +12V power dropping to 10.62V during heavy CAD work (Normal: 11.4V–12.6V).',
        fixedReading: 'New 550W Power Supply installed · Steady +12.04V power under load.',
        rootCauseSummary:
          'Aging power supply could not hold steady +12V power, causing abrupt shutdowns under load.',
      },
      {
        componentId: 'cpu_cooler',
        requiredTool: 'thermal_probe',
        requiredFix: 'reapply_thermal_paste',
        faultTitle: 'Dried-Out CPU Thermal Paste (99°C Overheating)',
        diagnosticReading:
          'FAULT DETECTED — Temperature Scanner reads 99°C on the CPU with crusty, dried thermal paste.',
        fixedReading: 'Fresh thermal paste applied & CPU fan locked · CPU temperature dropped to 42°C.',
        rootCauseSummary:
          'Dried thermal paste stopped heat from reaching the cooler, forcing thermal throttling and shutdowns.',
      },
      {
        componentId: 'monitor_display',
        requiredTool: 'cable_tester',
        requiredFix: 'reconnect_display_cable',
        faultTitle: 'Loose HDMI Display Cable on External Monitor',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows intermittent HDMI video signal because the plug is half-out.',
        fixedReading: 'Monitor HDMI cable seated firmly at both ends · Crisp 1080p picture restored.',
        rootCauseSummary:
          'A partially unplugged HDMI cable caused the external monitor to lose display signal.',
      },
      {
        componentId: 'os_driver',
        requiredTool: 'event_windbg',
        requiredFix: 'ddu_clean_driver',
        faultTitle: 'Corrupted Display Driver (VIDEO_TDR_FAILURE BSOD)',
        diagnosticReading:
          'FAULT DETECTED — Crash Log Viewer flags nvlddmkm.sys timeout causing Blue Screen crashes.',
        fixedReading: 'Clean graphics driver reinstalled · Display runs smoothly with zero crashes.',
        rootCauseSummary:
          'A corrupted graphics driver crashed Windows whenever 3D hardware acceleration started.',
      },
    ],
  },
  {
    id: 'sim-17',
    code: 'SIM-17',
    title: 'Exam Server Failure — Dead Button, Loose Board, Bad RAM & Broken Boot',
    workstation: 'PC-EXM-01',
    clientName: 'Campus Assessment & Testing Center',
    difficulty: 'Expert',
    layerFocus: 'Compound',
    targetTimeSeconds: 330,
    reportedSymptom:
      'After being moved between rooms, the exam PC ignores the front power button, shows flickering motherboard lights, emits 3 long memory beeps when powered, and stalls on a black boot screen.',
    postCode: '55',
    beepPattern: '3 Long Beeps (Power, Board, RAM & Startup Faults)',
    faults: [
      {
        componentId: 'front_panel',
        requiredTool: 'multimeter',
        requiredFix: 'reconnect_front_panel',
        faultTitle: 'Unplugged Front Power Button Wire (PWR_SW)',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester confirms no trigger signal because the PWR_SW wire pulled off the header.',
        fixedReading: 'PWR_SW front panel wire reconnected · Front power button turns on PC cleanly.',
        rootCauseSummary:
          'The front panel power switch wire disconnected during transport, leaving the button dead.',
      },
      {
        componentId: 'motherboard',
        requiredTool: 'multimeter',
        requiredFix: 'reseat_24pin_mobo',
        faultTitle: 'Loose 24-Pin Main Motherboard Power Plug',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester shows unstable motherboard power because the 24-pin plug is unlatched.',
        fixedReading: '24-Pin main power plug pushed in until clicked · Board standby power steady.',
        rootCauseSummary:
          'An unlatched 24-pin ATX plug starved the motherboard of steady main power.',
      },
      {
        componentId: 'ram_slots',
        requiredTool: 'memtest86',
        requiredFix: 'swap_ram_b2',
        faultTitle: 'Faulty DDR4 Memory Stick in Slot B2',
        diagnosticReading:
          'FAULT DETECTED — RAM Checker reports 1,420 memory address failures on the DDR4 stick in Slot B2 (POST Code 55).',
        fixedReading: 'Bad Slot B2 stick replaced with working spare · 16 GB RAM passes with 0 errors.',
        rootCauseSummary:
          'A damaged DDR4 memory module in Slot B2 prevented clean memory initialization.',
      },
      {
        componentId: 'bios_bootloader',
        requiredTool: 'post_analyzer',
        requiredFix: 'rebuild_bootloader',
        faultTitle: 'Corrupted Windows Startup / UEFI Bootloader',
        diagnosticReading:
          'FAULT DETECTED — Error Code Reader shows BIOS passing hardware checks but halting on missing UEFI boot files.',
        fixedReading: 'Windows UEFI startup files rebuilt · Exam PC boots straight into Windows.',
        rootCauseSummary:
          'Damaged UEFI boot records prevented Windows from loading even after hardware passed POST.',
      },
    ],
  },
  {
    id: 'sim-18',
    code: 'SIM-18',
    title: 'Media Editing Rig — No GPU Power, Dead Screen, Loose M.2 & Damaged C:',
    workstation: 'PC-MED-08',
    clientName: 'Multimedia & Video Production Lab',
    difficulty: 'Expert',
    layerFocus: 'Compound',
    targetTimeSeconds: 330,
    reportedSymptom:
      'Video editing workstation turns on inside the tower with video error beeps, the monitor stays completely dark with no power light, BIOS sometimes misses the M.2 SSD, and Windows fails file checks.',
    postCode: 'd6',
    beepPattern: '1 Long, 2 Short (GPU, Monitor, M.2 & C: Drive Faults)',
    faults: [
      {
        componentId: 'gpu_pcie',
        requiredTool: 'multimeter',
        requiredFix: 'reconnect_pcie_power',
        faultTitle: 'Unplugged 8-Pin Graphics Card Power Cable',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads 0.00V on the Graphics Card 8-pin power plug (POST Code d6).',
        fixedReading: '8-Pin GPU power cable snapped in tightly · Graphics Card reads 12.06V normal.',
        rootCauseSummary:
          'The 8-pin PCIe power cable was unplugged, preventing the Graphics Card from initializing.',
      },
      {
        componentId: 'monitor_display',
        requiredTool: 'multimeter',
        requiredFix: 'replace_monitor_power',
        faultTitle: 'Damaged External Monitor AC Power Cord',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads 0V AC reaching the external monitor power socket.',
        fixedReading: 'Monitor AC power cord replaced · Green power LED and 1080p display active.',
        rootCauseSummary:
          'A broken AC power cord left the external monitor completely unpowered.',
      },
      {
        componentId: 'nvme_m2',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'reseat_nvme_m2',
        faultTitle: 'Loose M.2 Fast SSD Rising Out of Slot',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker reports missing/intermittent M.2 SSD connection because the screw came loose.',
        fixedReading: 'M.2 Fast SSD pushed firmly in and screw tightened · Drive detected at full speed.',
        rootCauseSummary:
          'A loose M.2 standoff screw allowed the NVMe drive to lose electrical contact with the motherboard.',
      },
      {
        componentId: 'storage_fs',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'repair_fs_chkdsk',
        faultTitle: 'Corrupted Windows Drive C: File System',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker finds damaged NTFS file records and broken Windows system files on Drive C:.',
        fixedReading: 'Drive C: file scan & repair completed · 0 corrupted files remain.',
        rootCauseSummary:
          'Abrupt power interruptions while the M.2 drive was loose corrupted the Windows C: file system.',
      },
    ],
  },
  {
    id: 'sim-19',
    code: 'SIM-19',
    title: 'Network Ops PC — Jammed Fans, Dead BIOS Battery, Cut LAN & Malware',
    workstation: 'PC-NOC-03',
    clientName: 'ICT Network Operations Room',
    difficulty: 'Expert',
    layerFocus: 'Compound',
    targetTimeSeconds: 340,
    reportedSymptom:
      'The tower interior feels hot with quiet case fans, the PC date resets to 2019 on every startup, wired Ethernet refuses to link up, and Windows Defender stays turned off while CPU usage spikes.',
    postCode: '00',
    beepPattern: '1 Short Beep (Airflow, CMOS, LAN & Security Faults)',
    faults: [
      {
        componentId: 'case_fans',
        requiredTool: 'thermal_probe',
        requiredFix: 'replace_case_fan',
        faultTitle: 'Seized PC Case Cooling Fans (0 RPM)',
        diagnosticReading:
          'FAULT DETECTED — Temperature Scanner detects trapped 58°C case heat with both case fans jammed at 0 RPM.',
        fixedReading: 'Dust cleared & new 120mm case fan installed · Airflow restored at 1,200 RPM.',
        rootCauseSummary:
          'Dust-clogged, seized case fans stopped airflow and trapped heat inside the chassis.',
      },
      {
        componentId: 'cmos_post',
        requiredTool: 'multimeter',
        requiredFix: 'replace_cr2032',
        faultTitle: 'Depleted 3V CR2032 BIOS Coin Battery',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads 1.72V on the CR2032 BIOS battery (Normal: 3.0V+).',
        fixedReading: 'Fresh 3.18V CR2032 battery installed · BIOS clock and settings now save properly.',
        rootCauseSummary:
          'A dead CR2032 coin cell erased BIOS settings and reset the system clock after power-off.',
      },
      {
        componentId: 'nic_rj45',
        requiredTool: 'cable_tester',
        requiredFix: 'recrimp_rj45',
        faultTitle: 'Broken Wire Inside RJ-45 LAN Connector',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows Open Circuit on Pin 3 (Green-White) inside the Ethernet plug.',
        fixedReading: 'LAN connector re-crimped to T568B · All 8 wires pass with steady Gigabit link.',
        rootCauseSummary:
          'A broken wire inside the RJ-45 plug prevented a physical wired network link.',
      },
      {
        componentId: 'security_engine',
        requiredTool: 'security_scanner',
        requiredFix: 'quarantine_malware',
        faultTitle: 'Disabled Antivirus & Hidden Crypto-Miner Malware',
        diagnosticReading:
          'FAULT DETECTED — Virus Scanner finds Windows Defender disabled by trojan miner svchost_helper.exe.',
        fixedReading: 'Malware quarantined and Windows Defender Real-Time Protection re-enabled.',
        rootCauseSummary:
          'A malicious background miner disabled antivirus protection and consumed system resources.',
      },
    ],
  },
  {
    id: 'sim-20',
    code: 'SIM-20',
    title: 'Mastery Bench — Blown Motherboard, Bent SSD Cable, Bad DNS & Spyware',
    workstation: 'PC-PRO-20',
    clientName: 'Senior CSS Practical Exam Bench',
    difficulty: 'Expert',
    layerFocus: 'Compound',
    targetTimeSeconds: 360,
    reportedSymptom:
      'Final exam PC fails to stabilize due to bulging motherboard power components, SSD transfers stall intermittently, websites will not open even with active LAN, and Error Logs show a suspicious app spiking CPU.',
    postCode: '00',
    beepPattern: '1 Short Beep (Board, Storage, DNS & Spyware Faults)',
    faults: [
      {
        componentId: 'motherboard',
        requiredTool: 'multimeter',
        requiredFix: 'replace_motherboard',
        faultTitle: 'Damaged Motherboard Power VRM & Bulging Capacitors',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester detects shorted power VRM circuits and bulging capacitors on the main board.',
        fixedReading: 'Damaged motherboard replaced with verified ATX board · All board rails normal.',
        rootCauseSummary:
          'Failed motherboard VRM capacitors caused severe electrical instability across subsystems.',
      },
      {
        componentId: 'sata_storage',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'replace_sata_cable',
        faultTitle: 'Sharply Bent SATA Data Cable Causing Read Retries',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker reports 2,340 SATA cable CRC errors from a crimped data cable.',
        fixedReading: 'New locking SATA data cable installed · 0 transfer errors and fast SSD reads.',
        rootCauseSummary:
          'A bent SATA data cable corrupted signals between the SSD and the motherboard.',
      },
      {
        componentId: 'network_stack',
        requiredTool: 'network_cli',
        requiredFix: 'restore_dns_dhcp',
        faultTitle: 'Hijacked Manual DNS Setting (127.0.0.1)',
        diagnosticReading:
          'FAULT DETECTED — Internet Checker shows manual loopback DNS (127.0.0.1) blocking all website names.',
        fixedReading: 'DNS and IP settings reset to Automatic (DHCP) · Websites load cleanly in 10ms.',
        rootCauseSummary:
          'A misconfigured static DNS address prevented browsers from resolving website domains.',
      },
      {
        componentId: 'event_monitor',
        requiredTool: 'security_scanner',
        requiredFix: 'quarantine_malware',
        faultTitle: 'Suspicious Background Spyware Flagged in System Logs',
        diagnosticReading:
          'FAULT DETECTED — Virus Scanner isolates rogue background process sys_capture32.exe spiking CPU in Error Logs.',
        fixedReading: 'Suspicious process removed · CPU idle load dropped to 3% and logs are clean.',
        rootCauseSummary:
          'A hidden spyware executable continuously consumed CPU cycles and generated repeated system errors.',
      },
    ],
  },
  {
    id: 'sim-21',
    code: 'SIM-21',
    title: 'Data Center Node — Power Drop, Hot CPU, Loose RAM, No Signal & Broken Boot',
    workstation: 'PC-SRV-21',
    clientName: 'Campus Data Center Operations',
    difficulty: 'Master',
    layerFocus: 'Compound',
    targetTimeSeconds: 390,
    reportedSymptom:
      'Server bench shuts off under load, CPU overheats past 95°C, emits 3 long memory beeps with an unlatched RAM stick, the external monitor shows No Signal, and Windows stalls before booting.',
    postCode: '55',
    beepPattern: '3 Long Beeps (Power, Thermal, RAM, Display & Boot Faults)',
    faults: [
      {
        componentId: 'psu',
        requiredTool: 'multimeter',
        requiredFix: 'replace_psu_550w',
        faultTitle: 'Weak Power Supply Dropping +12V Rail Under Load',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads +12V rail sagging to 10.55V under workload (Normal: 11.4V–12.6V).',
        fixedReading: 'New 550W Power Supply installed · Steady +12.04V power under load.',
        rootCauseSummary:
          'Weak power supply could not maintain +12V output under server load, causing random shutdowns.',
      },
      {
        componentId: 'cpu_cooler',
        requiredTool: 'thermal_probe',
        requiredFix: 'reapply_thermal_paste',
        faultTitle: 'Dried CPU Thermal Paste Causing 98°C Overheating',
        diagnosticReading:
          'FAULT DETECTED — Temperature Scanner reads 98°C on the processor with hardened, cracked paste.',
        fixedReading: 'Fresh thermal paste applied & cooler locked · CPU stabilized at 41°C.',
        rootCauseSummary:
          'Dried thermal compound blocked heat transfer into the heatsink, overheating the processor.',
      },
      {
        componentId: 'ram_slots',
        requiredTool: 'memtest86',
        requiredFix: 'reseat_ram_latch',
        faultTitle: 'Unlatched DDR4 Memory Stick in Slot A2',
        diagnosticReading:
          'FAULT DETECTED — RAM Checker detects missing memory channel because Slot A2 latch is open (POST Code 55).',
        fixedReading: 'RAM stick pressed firmly until both clips locked · Full 16 GB passes cleanly.',
        rootCauseSummary:
          'An unseated RAM stick broke contact with the motherboard slot and triggered memory POST errors.',
      },
      {
        componentId: 'monitor_display',
        requiredTool: 'cable_tester',
        requiredFix: 'reconnect_display_cable',
        faultTitle: 'Loose HDMI Display Cable on External Monitor',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows dropped HDMI video pins from a partially pulled display plug.',
        fixedReading: 'HDMI cable re-plugged firmly at monitor and GPU · 1080p signal restored.',
        rootCauseSummary:
          'A half-seated HDMI display plug prevented video signal from reaching the external monitor.',
      },
      {
        componentId: 'bios_bootloader',
        requiredTool: 'post_analyzer',
        requiredFix: 'rebuild_bootloader',
        faultTitle: 'Corrupted Windows UEFI Startup Bootloader',
        diagnosticReading:
          'FAULT DETECTED — Error Code Reader shows POST passing hardware checks but halting on damaged UEFI boot files.',
        fixedReading: 'Windows UEFI startup files rebuilt · System boots cleanly into Windows.',
        rootCauseSummary:
          'Corrupted UEFI startup records prevented Windows from launching after hardware initialization.',
      },
    ],
  },
  {
    id: 'sim-22',
    code: 'SIM-22',
    title: 'Robotics Bench — Dead Button, Loose Board, GPU Power, Cut LAN & Bad DNS',
    workstation: 'PC-LAB-22',
    clientName: 'Robotics & Automation Engineering Lab',
    difficulty: 'Master',
    layerFocus: 'Compound',
    targetTimeSeconds: 400,
    reportedSymptom:
      'PC ignores the front power button, motherboard standby lights flicker, video error beeps sound with no GPU output, Ethernet stays unplugged, and websites refuse to resolve even after link-up.',
    postCode: 'd6',
    beepPattern: '1 Long, 2 Short (Switch, Board, GPU, LAN & DNS Faults)',
    faults: [
      {
        componentId: 'front_panel',
        requiredTool: 'multimeter',
        requiredFix: 'reconnect_front_panel',
        faultTitle: 'Disconnected Front Panel Power Button Wire (PWR_SW)',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester confirms open switch circuit because PWR_SW slipped off the motherboard pins.',
        fixedReading: 'PWR_SW front wire reconnected · Front power switch starts the PC reliably.',
        rootCauseSummary:
          'A disconnected front-panel power switch wire stopped the power button from turning on the tower.',
      },
      {
        componentId: 'motherboard',
        requiredTool: 'multimeter',
        requiredFix: 'reseat_24pin_mobo',
        faultTitle: 'Unlatched 24-Pin Main Motherboard Power Plug',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads fluctuating board voltages from a crooked 24-pin ATX plug.',
        fixedReading: '24-Pin power connector pushed in until latched · Main board rails steady.',
        rootCauseSummary:
          'A loose 24-pin main power plug interrupted electrical power delivery to the motherboard.',
      },
      {
        componentId: 'gpu_pcie',
        requiredTool: 'multimeter',
        requiredFix: 'reconnect_pcie_power',
        faultTitle: 'Unplugged 8-Pin Graphics Card Power Cable',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads 0.00V at the Graphics Card 8-pin power connector (POST Code d6).',
        fixedReading: '8-Pin GPU power cable clicked in firmly · Graphics Card reads 12.06V normal.',
        rootCauseSummary:
          'The unplugged 8-pin PCIe power cable prevented the Graphics Card from initializing display output.',
      },
      {
        componentId: 'nic_rj45',
        requiredTool: 'cable_tester',
        requiredFix: 'recrimp_rj45',
        faultTitle: 'Open Pin 3 Wire Inside RJ-45 Ethernet Plug',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows Wire 3 (Green-White) broken inside the LAN connector.',
        fixedReading: 'RJ-45 plug re-crimped to T568B · All 8 wires pass with solid green link.',
        rootCauseSummary:
          'A broken Pin 3 conductor in the RJ-45 connector blocked wired Ethernet communication.',
      },
      {
        componentId: 'network_stack',
        requiredTool: 'network_cli',
        requiredFix: 'restore_dns_dhcp',
        faultTitle: 'Hijacked Static DNS Setting (127.0.0.1)',
        diagnosticReading:
          'FAULT DETECTED — Internet Checker finds static loopback DNS (127.0.0.1) blocking all domain lookups.',
        fixedReading: 'IP & DNS restored to Automatic (DHCP) · Websites load in 11ms.',
        rootCauseSummary:
          'A wrong manual DNS entry prevented browsers from resolving website domain names.',
      },
    ],
  },
  {
    id: 'sim-23',
    code: 'SIM-23',
    title: '3D Render Rig — Jammed Fans, Loose M.2, Dead Monitor Cord, BSOD & Bad C:',
    workstation: 'PC-REN-23',
    clientName: '3D Animation & Rendering Studio',
    difficulty: 'Master',
    layerFocus: 'Compound',
    targetTimeSeconds: 410,
    reportedSymptom:
      'Tower builds up heavy heat with silent case fans, the external monitor has zero power light, BIOS intermittently loses the M.2 SSD, Windows triggers graphics driver Blue Screens, and Drive C: fails file checks.',
    postCode: '00',
    beepPattern: '1 Short Beep (Airflow, M.2, Monitor, Driver & C: Faults)',
    faults: [
      {
        componentId: 'case_fans',
        requiredTool: 'thermal_probe',
        requiredFix: 'replace_case_fan',
        faultTitle: 'Jammed PC Case Cooling Fans (0 RPM)',
        diagnosticReading:
          'FAULT DETECTED — Temperature Scanner detects 59°C trapped case air with case fans stuck at 0 RPM.',
        fixedReading: 'Dust cleaned & new 120mm case fan installed · Airflow restored at 1,200 RPM.',
        rootCauseSummary:
          'Dust-seized case fans stopped tower exhaust airflow and trapped hot air around components.',
      },
      {
        componentId: 'nvme_m2',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'reseat_nvme_m2',
        faultTitle: 'Loose M.2 Fast SSD Lifting Out of Motherboard Slot',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker reports intermittent M.2 SSD disconnect due to a loose holding screw.',
        fixedReading: 'M.2 SSD seated firmly and screw tightened · Fast storage detected reliably.',
        rootCauseSummary:
          'A loose M.2 standoff screw allowed the NVMe drive pins to lose contact during vibration.',
      },
      {
        componentId: 'monitor_display',
        requiredTool: 'multimeter',
        requiredFix: 'replace_monitor_power',
        faultTitle: 'Broken External Monitor AC Power Cord',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads 0V AC at the monitor power inlet because the cord is severed internally.',
        fixedReading: 'Monitor AC power cord replaced · Green power LED and 1080p screen active.',
        rootCauseSummary:
          'A damaged AC power cable prevented electrical power from reaching the external monitor.',
      },
      {
        componentId: 'os_driver',
        requiredTool: 'event_windbg',
        requiredFix: 'ddu_clean_driver',
        faultTitle: 'Corrupted Display Driver Causing VIDEO_TDR_FAILURE BSOD',
        diagnosticReading:
          'FAULT DETECTED — Crash Log Viewer flags repeated nvlddmkm.sys hangs causing Blue Screens.',
        fixedReading: 'Clean graphics driver installed · Rendering runs cleanly with zero crashes.',
        rootCauseSummary:
          'A corrupted GPU driver crashed Windows whenever 3D rendering workloads started.',
      },
      {
        componentId: 'storage_fs',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'repair_fs_chkdsk',
        faultTitle: 'Corrupted Windows Drive C: NTFS File System',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker finds broken NTFS file tables and damaged Windows system files on Drive C:.',
        fixedReading: 'Drive C: file system repaired cleanly · Zero corrupted Windows files remain.',
        rootCauseSummary:
          'Sudden crashes while the M.2 drive was loose corrupted Windows system files on Drive C:.',
      },
    ],
  },
  {
    id: 'sim-24',
    code: 'SIM-24',
    title: 'Cyber Defense PC — Dead CMOS, Bad RAM, Bent SATA, Malware & Spyware Logs',
    workstation: 'PC-SEC-24',
    clientName: 'Information Security Training Lab',
    difficulty: 'Master',
    layerFocus: 'Compound',
    targetTimeSeconds: 420,
    reportedSymptom:
      'BIOS clock resets every boot, 3 long memory beeps signal a failing RAM module, SSD reads stutter with cable errors, Windows Defender stays disabled, and Error Logs show a hidden spyware process maxing CPU.',
    postCode: '55',
    beepPattern: '3 Long Beeps (CMOS, RAM, SATA, Antivirus & Logs Faults)',
    faults: [
      {
        componentId: 'cmos_post',
        requiredTool: 'multimeter',
        requiredFix: 'replace_cr2032',
        faultTitle: 'Dead 3V CR2032 BIOS Coin Battery',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester measures 1.68V on the CR2032 coin battery (Normal: 3.0V+).',
        fixedReading: 'Fresh 3.18V CR2032 battery installed · BIOS clock and settings persist normally.',
        rootCauseSummary:
          'A depleted CR2032 coin battery cleared BIOS configuration and reset the date after shutdown.',
      },
      {
        componentId: 'ram_slots',
        requiredTool: 'memtest86',
        requiredFix: 'swap_ram_b2',
        faultTitle: 'Defective DDR4 Memory Stick in Slot B2',
        diagnosticReading:
          'FAULT DETECTED — RAM Checker logs 1,890 memory errors on the DDR4 module in Slot B2 (POST Code 55).',
        fixedReading: 'Broken Slot B2 stick swapped for working spare · 16 GB RAM passes with 0 errors.',
        rootCauseSummary:
          'Faulty memory chips on the Slot B2 RAM stick caused memory initialization failures and crashes.',
      },
      {
        componentId: 'sata_storage',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'replace_sata_cable',
        faultTitle: 'Crimped SATA Data Cable Causing Storage Read Errors',
        diagnosticReading:
          'FAULT DETECTED — Drive Checker reports 2,610 SATA interface CRC errors from a sharply bent cable.',
        fixedReading: 'New locking SATA cable installed · 0 transfer errors and crisp disk speed.',
        rootCauseSummary:
          'A sharply bent SATA data cable corrupted data transfers between the SSD and motherboard.',
      },
      {
        componentId: 'security_engine',
        requiredTool: 'security_scanner',
        requiredFix: 'quarantine_malware',
        faultTitle: 'Disabled Windows Defender & Background Crypto-Miner',
        diagnosticReading:
          'FAULT DETECTED — Virus Scanner uncovers trojan miner disabling Windows Defender Real-Time Protection.',
        fixedReading: 'Malware quarantined and Windows Defender Real-Time Protection restored.',
        rootCauseSummary:
          'A persistent crypto-miner turned off antivirus protection to hide its background execution.',
      },
      {
        componentId: 'event_monitor',
        requiredTool: 'security_scanner',
        requiredFix: 'quarantine_malware',
        faultTitle: 'Rogue Background Spyware Active in System Error Logs',
        diagnosticReading:
          'FAULT DETECTED — Virus Scanner detects rogue executable sys_capture32.exe spiking CPU in Error Logs.',
        fixedReading: 'Spyware process quarantined · Idle CPU returned to 3% and error logs are clean.',
        rootCauseSummary:
          'A hidden spyware app continuously overloaded the CPU and flooded System Error Logs.',
      },
    ],
  },
  {
    id: 'sim-25',
    code: 'SIM-25',
    title: 'CSS Capstone Exam — Blown Board, Weak PSU, Hot CPU, Cut LAN & Broken Boot',
    workstation: 'PC-CAP-25',
    clientName: 'Master CSS Certification Bench',
    difficulty: 'Master',
    layerFocus: 'Compound',
    targetTimeSeconds: 440,
    reportedSymptom:
      'Final certification tower suffers from damaged motherboard power circuits, weak PSU voltage under load, severe CPU overheating, broken RJ-45 Ethernet wiring, and corrupted Windows UEFI startup files.',
    postCode: '00',
    beepPattern: '1 Short Beep (Board, PSU, CPU, LAN & Boot Faults)',
    faults: [
      {
        componentId: 'motherboard',
        requiredTool: 'multimeter',
        requiredFix: 'replace_motherboard',
        faultTitle: 'Damaged Main Motherboard Power VRM & Bulging Capacitors',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester detects shorted power VRM phases and bulging capacitors on the board.',
        fixedReading: 'Main motherboard replaced with verified ATX board · All board rails normal.',
        rootCauseSummary:
          'Damaged motherboard power VRM capacitors destabilized power across the entire system.',
      },
      {
        componentId: 'psu',
        requiredTool: 'multimeter',
        requiredFix: 'replace_psu_550w',
        faultTitle: 'Degraded Power Supply Failing +12V Rail Tolerance',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads +12V rail dropping to 10.48V during power-on stress test.',
        fixedReading: 'New 550W Power Supply installed · Steady +12.04V, +5.01V, +3.31V rails.',
        rootCauseSummary:
          'A degraded PSU output out-of-spec voltage under load and triggered instability.',
      },
      {
        componentId: 'cpu_cooler',
        requiredTool: 'thermal_probe',
        requiredFix: 'reapply_thermal_paste',
        faultTitle: 'Hardened Thermal Paste Causing 100°C Thermal Shutdowns',
        diagnosticReading:
          'FAULT DETECTED — Temperature Scanner hits 100°C immediately due to dried-out CPU thermal paste.',
        fixedReading: 'Fresh thermal paste applied & CPU cooler locked · Temperature holds at 42°C.',
        rootCauseSummary:
          'Dried thermal paste prevented cooling contact between the CPU lid and heatsink.',
      },
      {
        componentId: 'nic_rj45',
        requiredTool: 'cable_tester',
        requiredFix: 'recrimp_rj45',
        faultTitle: 'Broken Pin 3 Wire on Ethernet LAN Connector',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows Open Circuit on Pin 3 (Green-White) inside the RJ-45 plug.',
        fixedReading: 'RJ-45 plug re-crimped to T568B · All 8 wires pass with steady Gigabit link.',
        rootCauseSummary:
          'An open wire inside the RJ-45 plug prevented physical wired network connectivity.',
      },
      {
        componentId: 'bios_bootloader',
        requiredTool: 'post_analyzer',
        requiredFix: 'rebuild_bootloader',
        faultTitle: 'Corrupted Windows Startup / UEFI Boot Partition',
        diagnosticReading:
          'FAULT DETECTED — Error Code Reader confirms hardware passes POST but Windows UEFI startup files are missing.',
        fixedReading: 'Windows UEFI startup files rebuilt · Capstone workstation boots in 9 seconds.',
        rootCauseSummary:
          'Damaged UEFI boot files prevented Windows from starting after all hardware was repaired.',
      },
    ],
  },
  {
    id: 'sim-26',
    code: 'SIM-26',
    title: 'Dead Processor Bench — Shorted CPU Chip & Unstable Power',
    workstation: 'PC-CPU-26',
    clientName: 'Computer Hardware Assembly Lab',
    difficulty: 'Intermediate',
    layerFocus: 'Hardware',
    targetTimeSeconds: 210,
    reportedSymptom:
      'PC tower powers up briefly with Startup Code C1 and no monitor signal. The motherboard board lights turn on, but the processor fails to initialize and the power rail dips under test.',
    postCode: 'C1',
    beepPattern: 'Continuous Short Beeps (CPU Processor & Power Fault)',
    faults: [
      {
        componentId: 'cpu_processor',
        requiredTool: 'post_analyzer',
        requiredFix: 'replace_cpu_chip',
        faultTitle: 'Burned / Shorted CPU Processor Chip (POST Code C1)',
        diagnosticReading:
          'FAULT DETECTED — Error Code Reader locks on Code C1 (CPU Initialization Failure). Processor internal core is shorted and unresponsive.',
        fixedReading: 'Faulty CPU replaced with verified processor · Core voltage 1.18V and POST Code 00.',
        rootCauseSummary:
          'A shorted internal CPU core prevented the processor from passing POST Code C1.',
      },
      {
        componentId: 'psu',
        requiredTool: 'multimeter',
        requiredFix: 'replace_psu_550w',
        faultTitle: 'Power Supply Surge Damaging +12V CPU Rail',
        diagnosticReading:
          'FAULT DETECTED — Voltage Tester reads unstable +12V rail spiking/drooping to 10.38V on the CPU power line.',
        fixedReading: 'New 550W Power Supply installed · Clean +12.04V rail feeding the processor.',
        rootCauseSummary:
          'An unstable power supply rail destabilized power delivery to the CPU socket.',
      },
    ],
  },
  {
    id: 'sim-27',
    code: 'SIM-27',
    title: 'Critical Ransomware & Hardware Meltdown — Unrecoverable OS Kernel',
    workstation: 'PC-CRIT-27',
    clientName: 'Campus Finance & Records Office (Emergency)',
    difficulty: 'Master',
    layerFocus: 'Compound',
    targetTimeSeconds: 450,
    reportedSymptom:
      'Emergency finance PC stopped booting with CPU socket error Code C1, memory errors on Slot B2, a dead monitor cable, and a ransomware attack that encrypted core Windows system files beyond normal recovery.',
    postCode: 'C1',
    beepPattern: 'CPU & Memory Beeps (Hardware + Irrecoverable OS Encryption)',
    faults: [
      {
        componentId: 'cpu_processor',
        requiredTool: 'post_analyzer',
        requiredFix: 'reseat_cpu_socket',
        faultTitle: 'Unseated CPU Processor with Misaligned Socket Contact',
        diagnosticReading:
          'FAULT DETECTED — Error Code Reader flags POST Code C1 (Unseated CPU Socket Contact). Alignment latch was knocked loose.',
        fixedReading: 'CPU re-seated cleanly with gold corner aligned · Processor initializes with Code 00.',
        rootCauseSummary:
          'A knocked-loose CPU retention latch broke electrical contact on socket pins.',
      },
      {
        componentId: 'ram_slots',
        requiredTool: 'memtest86',
        requiredFix: 'swap_ram_b2',
        faultTitle: 'Faulty DDR4 Memory Stick in Slot B2',
        diagnosticReading:
          'FAULT DETECTED — RAM Checker logs 2,140 memory errors on Slot B2 DDR4 stick.',
        fixedReading: 'Defective Slot B2 RAM replaced with verified spare · 16 GB passes 0 errors.',
        rootCauseSummary:
          'A defective DDR4 module in Slot B2 caused memory corruption during boot.',
      },
      {
        componentId: 'monitor_display',
        requiredTool: 'cable_tester',
        requiredFix: 'reconnect_display_cable',
        faultTitle: 'Loose HDMI Display Cable on External Monitor',
        diagnosticReading:
          'FAULT DETECTED — Cable Tester shows open HDMI pins from a half-unplugged monitor cord.',
        fixedReading: 'HDMI display cable seated tightly at both ends · Crisp 1080p signal active.',
        rootCauseSummary:
          'A loose HDMI cable prevented the external screen from displaying recovery diagnostics.',
      },
      {
        componentId: 'security_engine',
        requiredTool: 'security_scanner',
        requiredFix: 'quarantine_malware',
        faultTitle: 'Active Ransomware Engine (cryptlock_v4.exe) Disabling Defender',
        diagnosticReading:
          'FAULT DETECTED — Virus Scanner confirms destructive ransomware cryptlock_v4.exe has encrypted core Windows system hives and disabled Defender.',
        fixedReading: 'Ransomware payload quarantined and security engine isolated for clean OS rebuild.',
        rootCauseSummary:
          'Active ransomware disabled Defender and irreversibly encrypted Windows system binaries.',
      },
      {
        componentId: 'storage_fs',
        requiredTool: 'smart_chkdsk',
        requiredFix: 'reformat_os',
        requiresMultiDiagnosis: ['storage_fs', 'security_engine'],
        faultTitle: 'Irrecoverably Encrypted Windows OS Partition (Requires Reformat)',
        diagnosticReading:
          'CRITICAL FAULT — Drive Checker confirms Windows OS kernel, registry hives, and NTFS boot sectors are permanently encrypted beyond CHKDSK repair. Confirm ransomware in Antivirus & Security, then authorize Reformat Drive & Reinstall Windows.',
        fixedReading:
          'Authorized Drive Reformat & Clean Windows Reinstall completed · OS partition rebuilt cleanly.',
        rootCauseSummary:
          'Ransomware permanently destroyed the Windows OS kernel and registry beyond file repair, requiring an authorized full drive reformat and clean OS installation.',
      },
    ],
  },
];

const CUSTOM_FAULT_POOL: ScenarioFault[] = [
  SIMULATION_SCENARIOS_2D[0].faults[0],
  SIMULATION_SCENARIOS_2D[1].faults[0],
  SIMULATION_SCENARIOS_2D[2].faults[0],
  SIMULATION_SCENARIOS_2D[3].faults[0],
  SIMULATION_SCENARIOS_2D[4].faults[0],
  SIMULATION_SCENARIOS_2D[5].faults[0],
  SIMULATION_SCENARIOS_2D[5].faults[1],
  SIMULATION_SCENARIOS_2D[6].faults[0],
  SIMULATION_SCENARIOS_2D[6].faults[2],
  SIMULATION_SCENARIOS_2D[7].faults[0],
  SIMULATION_SCENARIOS_2D[7].faults[1],
  SIMULATION_SCENARIOS_2D[8].faults[0],
  SIMULATION_SCENARIOS_2D[8].faults[1],
  SIMULATION_SCENARIOS_2D[9].faults[0],
  SIMULATION_SCENARIOS_2D[10].faults[0],
  SIMULATION_SCENARIOS_2D[11].faults[0],
  SIMULATION_SCENARIOS_2D[12].faults[1],
  SIMULATION_SCENARIOS_2D[13].faults[0],
  SIMULATION_SCENARIOS_2D[14].faults[0],
  SIMULATION_SCENARIOS_2D[19].faults[3],
  SIMULATION_SCENARIOS_2D[25].faults[0],
  SIMULATION_SCENARIOS_2D[26].faults[0],
];

export function generateCustomScenario(
  faultCount: 1 | 2 | 3 | 4 | 5,
  layerPref: 'mixed' | 'hardware' | 'software'
): SimulationScenario2D {
  const filteredPool = CUSTOM_FAULT_POOL.filter((f) => {
    const compLayer = MODEL_COMPONENTS[f.componentId].layer;
    if (layerPref === 'hardware') return compLayer === 'hardware';
    if (layerPref === 'software') return compLayer === 'software';
    return true;
  });

  // Unbiased Fisher-Yates shuffle and pick unique componentIds
  const shuffled = [...filteredPool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picked: ScenarioFault[] = [];
  const usedComponents = new Set<ModelComponentId>();

  for (const fault of shuffled) {
    if (!usedComponents.has(fault.componentId)) {
      usedComponents.add(fault.componentId);
      picked.push(fault);
      if (picked.length === faultCount) break;
    }
  }

  const hasCpuFault = picked.some((f) => f.componentId === 'cpu_processor');
  const hasGpuFault = picked.some((f) => f.componentId === 'gpu_pcie');
  const hasRamFault = picked.some((f) => f.componentId === 'ram_slots');
  const postCode = hasCpuFault ? 'C1' : hasRamFault ? '55' : hasGpuFault ? 'd6' : '00';
  const beepPattern = hasCpuFault
    ? 'Continuous Short Beeps (CPU Processor Error)'
    : hasRamFault
      ? '3 Long Beeps (Memory Error)'
      : hasGpuFault
        ? '1 Long, 2 Short (Video Error)'
        : '1 Short Beep (OS / Subsystem Fault)';

  const symptomHints = picked.map((f) => {
    switch (f.componentId) {
      case 'motherboard':
        return 'motherboard lights flickering and failing to power up';
      case 'cpu_processor':
        return 'CPU initialization failure locking on Startup Code C1 with no display';
      case 'gpu_pcie':
        return 'no monitor display signal on startup';
      case 'psu':
        return 'sudden power blackout under workload';
      case 'ram_slots':
        return 'memory initialization failure / stability errors';
      case 'nvme_m2':
        return 'BIOS reporting missing M.2 boot drive';
      case 'case_fans':
        return 'high heat inside the PC tower with silent case fans';
      case 'front_panel':
        return 'PC power button not responding when pressed';
      case 'monitor_display':
        return 'external monitor showing No Signal or staying black';
      case 'nic_rj45':
        return 'missing LAN connectivity with APIPA IP';
      case 'os_driver':
        return 'display flashing with VIDEO_TDR_FAILURE BSOD';
      case 'cpu_cooler':
        return 'loud fans and overheating shutdowns';
      case 'sata_storage':
        return 'sluggish boot with storage I/O retries';
      case 'cmos_post':
        return 'BIOS clock resetting on cold boot';
      case 'network_stack':
        return 'websites failing to resolve despite active link';
      case 'security_engine':
        return 'high background CPU load and disabled antivirus';
      case 'storage_fs':
        return 'automatic repair loop and NTFS volume errors';
      case 'bios_bootloader':
        return 'long blinking-cursor hang before Windows loads';
      default:
        return 'intermittent workstation instability';
    }
  });

  const randomBenchNum = Math.floor(20 + Math.random() * 79);

  return {
    id: `sim-custom-${Date.now()}`,
    code: `SIM-C${randomBenchNum}`,
    title: `Custom Practice Bench #${randomBenchNum} (${faultCount}-Fault ${
      layerPref === 'mixed' ? 'Mixed' : layerPref === 'hardware' ? 'Hardware' : 'Software'
    })`,
    workstation: `PC-CUSTOM-${randomBenchNum}`,
    clientName: 'CSS Practice Lab Bench',
    difficulty:
      faultCount === 1
        ? 'Foundational'
        : faultCount === 2
          ? 'Intermediate'
          : faultCount === 3
            ? 'Advanced'
            : faultCount === 4
              ? 'Expert'
              : 'Master',
    layerFocus: faultCount > 1 ? 'Compound' : layerPref === 'software' ? 'Software' : 'Hardware',
    targetTimeSeconds:
      faultCount === 1
        ? 130
        : faultCount === 2
          ? 200
          : faultCount === 3
            ? 260
            : faultCount === 4
              ? 330
              : 410,
    reportedSymptom: `Reported issues: ${symptomHints.join('; ')}.`,
    postCode,
    beepPattern,
    faults: picked,
    isCustom: true,
  };
}

export function getDifficultyTurnaroundAllowance(
  difficulty: SimulationScenario2D['difficulty'] = 'Foundational'
): number {
  switch (difficulty) {
    case 'Foundational':
      return 0;
    case 'Intermediate':
      return 1;
    case 'Advanced':
      return 2;
    case 'Expert':
      return 3;
    case 'Master':
      return 4;
  }
}

function getDifficultyTimeMultipliers(
  difficulty: SimulationScenario2D['difficulty'] = 'Foundational'
): { fourStar: number; threeStar: number; twoStar: number } {
  switch (difficulty) {
    // Easier levels have stricter overtime brackets (higher time penalty)
    case 'Foundational':
      return { fourStar: 1.12, threeStar: 1.25, twoStar: 1.45 };
    case 'Intermediate':
      return { fourStar: 1.22, threeStar: 1.45, twoStar: 1.75 };
    case 'Advanced':
      return { fourStar: 1.35, threeStar: 1.75, twoStar: 2.25 };
    case 'Expert':
      return { fourStar: 1.5, threeStar: 2.0, twoStar: 2.65 };
    case 'Master':
      return { fourStar: 1.65, threeStar: 2.25, twoStar: 3.0 };
  }
}

export function calculateStarRating(params: {
  elapsedSeconds: number;
  targetTimeSeconds: number;
  turnarounds: number;
  totalActions: number;
  validStructuredActions: number;
  difficulty?: SimulationScenario2D['difficulty'];
  dataLossPenalty?: boolean;
}): StarRatingBreakdown {
  const {
    elapsedSeconds,
    targetTimeSeconds,
    turnarounds,
    totalActions,
    validStructuredActions,
    difficulty = 'Foundational',
    dataLossPenalty = false,
  } = params;

  // 1. Mean Time Stars (1 to 5) - Higher penalty on easier levels, more forgiving on harder levels
  const timeMult = getDifficultyTimeMultipliers(difficulty);
  let meanTimeStars = 5;
  if (elapsedSeconds <= targetTimeSeconds) {
    meanTimeStars = 5;
  } else if (elapsedSeconds <= targetTimeSeconds * timeMult.fourStar) {
    meanTimeStars = 4;
  } else if (elapsedSeconds <= targetTimeSeconds * timeMult.threeStar) {
    meanTimeStars = 3;
  } else if (elapsedSeconds <= targetTimeSeconds * timeMult.twoStar) {
    meanTimeStars = 2;
  } else {
    meanTimeStars = 1;
  }

  // 2. Turnarounds Stars (1 to 5) - +50% base tolerance + 1 extra base turnaround per difficulty level
  const levelTurnaroundBonus = getDifficultyTurnaroundAllowance(difficulty);
  const effectiveTurnarounds = Math.max(0, turnarounds - levelTurnaroundBonus);

  let turnaroundStars = 5;
  if (effectiveTurnarounds === 0) turnaroundStars = 5;
  else if (effectiveTurnarounds <= 2) turnaroundStars = 4.5;
  else if (effectiveTurnarounds <= 3) turnaroundStars = 4;
  else if (effectiveTurnarounds <= 6) turnaroundStars = 3;
  else if (effectiveTurnarounds <= 9) turnaroundStars = 2;
  else turnaroundStars = 1;

  // 3. Accuracy % & Accuracy Stars (0 to 5) - Unnecessary reformat wipes user data and loses ALL accuracy
  const accuracyPercent = dataLossPenalty
    ? 0
    : totalActions === 0
      ? 100
      : Math.max(20, Math.min(100, Math.round((validStructuredActions / totalActions) * 100)));

  let accuracyStars = 5;
  if (dataLossPenalty) accuracyStars = 0;
  else if (accuracyPercent >= 95) accuracyStars = 5;
  else if (accuracyPercent >= 85) accuracyStars = 4.5;
  else if (accuracyPercent >= 75) accuracyStars = 4;
  else if (accuracyPercent >= 60) accuracyStars = 3;
  else if (accuracyPercent >= 45) accuracyStars = 2;
  else accuracyStars = 1;

  // Weighted composite: Accuracy 40%, Turnarounds 35%, Mean Time 25%
  const rawComposite = accuracyStars * 0.4 + turnaroundStars * 0.35 + meanTimeStars * 0.25;
  const overallStars = Math.max(1, Math.min(5, Math.round(rawComposite * 2) / 2));

  let verdictLabel = 'Developing Technician';
  if (dataLossPenalty) verdictLabel = 'User Data Lost — Diagnose Before Reformatting';
  else if (overallStars >= 4.5) verdictLabel = 'Exemplary SYSMOD Mastery';
  else if (overallStars >= 4.0) verdictLabel = 'Proficient Structured Diagnostics';
  else if (overallStars >= 3.0) verdictLabel = 'Competent — Reduce Turnarounds';
  else if (overallStars >= 2.0) verdictLabel = 'Needs Guided Fault Isolation';

  return {
    overallStars,
    meanTimeSeconds: elapsedSeconds,
    meanTimeStars,
    turnarounds,
    turnaroundStars,
    accuracyPercent,
    accuracyStars,
    verdictLabel,
    dataLossPenalty,
  };
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}
