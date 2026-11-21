import { QuizModule } from '../types';

export const BOW_QUIZZES_DAYS_1_TO_15: QuizModule[] = [
  // ================= DAY 1 · LEVEL 1 =================
  {
    id: 'day-01',
    code: 'DAY 1 · LV.1',
    dayNumber: 1,
    level: 1,
    weekRef: 'Week 1',
    title: 'CSS Fundamentals, 5S & OHS Basics',
    topic: 'CSS Fundamentals & OHS',
    difficulty: 'Foundational',
    estimatedMinutes: 3,
    description:
      'Level 1: Fundamental concepts of Computer Systems Servicing (CSS), workplace 5S housekeeping, and basic Occupational Health & Safety (OHS).',
    questions: [
      {
        id: 'd01-q1',
        question: 'What is the primary goal of Occupational Health and Safety (OHS) in a Computer Systems Servicing workshop?',
        options: [
          'To make repairs faster by skipping safety checks',
          'To protect technicians, users, and computer equipment from electrical, static, and physical hazards',
          'To increase the selling price of computer parts',
          'To eliminate the need for hand tools during assembly',
        ],
        correctIndex: 1,
        explanation:
          'OHS standards safeguard both the technician and sensitive electronic hardware against shock, ESD damage, and physical injury.',
        sysmodPrinciple: 'Week 1 · Fundamental Concepts & OHS Compliance',
      },
      {
        id: 'd01-q2',
        question: 'Which personal safety practice MUST be performed before opening a desktop computer case?',
        options: [
          'Keep the power cord plugged in to check fan speed',
          'Spray liquid cleaner directly on the motherboard',
          'Turn off the PC, unplug the AC power cable, and wear an anti-static wrist strap',
          'Remove the monitor stand first',
        ],
        correctIndex: 2,
        explanation:
          'Disconnecting AC power and grounding yourself with an ESD wrist strap prevents both electric shock and electrostatic discharge damage.',
        sysmodPrinciple: 'Week 1 · ESD & Electrical Safety Protocol',
      },
      {
        id: 'd01-q3',
        question: 'In 5S workplace organization for a computer repair bench, what does "Sort" (Seiri) require?',
        options: [
          'Buying brand-new tools every week',
          'Separating necessary tools and parts from unneeded clutter on the workbench',
          'Leaving loose screws inside the chassis',
          'Turning off all lab lights',
        ],
        correctIndex: 1,
        explanation:
          'Sort removes unneeded items from the workspace so technicians can quickly locate tools and avoid losing screws or causing short circuits.',
        sysmodPrinciple: 'Week 1 · 5S Workshop Organization',
      },
      {
        id: 'd01-q4',
        question: 'What does ESD stand for in computer hardware servicing?',
        options: [
          'Electronic System Driver',
          'Electrostatic Discharge',
          'External Storage Device',
          'Ethernet Signal Distribution',
        ],
        correctIndex: 1,
        explanation:
          'Electrostatic Discharge (ESD) is the sudden flow of static electricity that can silently destroy delicate microchips on RAM, CPUs, and motherboards.',
        sysmodPrinciple: 'Week 1 · Electrostatic Discharge Awareness',
      },
      {
        id: 'd01-q5',
        question: 'Which core area is covered under the Grade 11/12 TechPro ICT Computer Systems Servicing curriculum?',
        options: [
          'Only graphic design and animation',
          'Setting up computer systems, networks, servers, and performing troubleshooting and maintenance',
          'Only smartphone screen glass manufacturing',
          'Exclusively accounting software data entry',
        ],
        correctIndex: 1,
        explanation:
          'The DepEd TechPro ICT-CSS Budget of Work covers computer systems setup, networking, server setup, and troubleshooting, repair, and maintenance.',
        sysmodPrinciple: 'Week 1 · CSS Performance & Content Standards',
      },
    ],
  },

  // ================= DAY 2 · LEVEL 2 =================
  {
    id: 'day-02',
    code: 'DAY 2 · LV.2',
    dayNumber: 2,
    level: 2,
    weekRef: 'Week 1',
    title: 'CSS Hand Tools, Equipment & Service Costing',
    topic: 'CSS Fundamentals & OHS',
    difficulty: 'Foundational',
    estimatedMinutes: 3,
    description:
      'Level 2: Proper tool selection, ESD protection gear, industry trends, and basic service pricing for a mini repair shop.',
    questions: [
      {
        id: 'd02-q1',
        question: 'Which hand tool is specifically used to turn cross-head screws inside a desktop computer chassis?',
        options: [
          'Flat-head screwdriver',
          'Phillips-head screwdriver',
          'Wire stripper',
          'Punch-down tool',
        ],
        correctIndex: 1,
        explanation:
          'Desktop cases, motherboards, PSUs, and drive bays predominantly use cross-recess screws fitted for a Phillips-head screwdriver.',
        sysmodPrinciple: 'Week 1 · Proper Tools Usage',
      },
      {
        id: 'd02-q2',
        question: 'Which diagnostic instrument measures DC voltage, current, and electrical continuity on a power supply?',
        options: [
          'Crimping tool',
          'Digital Multimeter',
          'Cable tie gun',
          'Thermal paste spreader',
        ],
        correctIndex: 1,
        explanation:
          'A Digital Multimeter accurately measures DC rail voltages (+12V, +5V, +3.3V), CMOS battery voltage, and wire continuity.',
        sysmodPrinciple: 'Week 1 · Diagnostic Equipment Selection',
      },
      {
        id: 'd02-q3',
        question: 'Where should you place removed RAM sticks or a motherboard while servicing a PC?',
        options: [
          'On a wool carpet or cloth towel',
          'Directly on top of a running power supply',
          'On an anti-static mat or inside an anti-static ESD bag',
          'Stacked loosely on metal pliers',
        ],
        correctIndex: 2,
        explanation:
          'Anti-static mats and ESD shielding bags safely dissipate static charges instead of building them up like carpets or fabrics.',
        sysmodPrinciple: 'Week 1 · ESD Handling Standards',
      },
      {
        id: 'd02-q4',
        question: 'When planning a mini computer servicing shop ("Tech Garage"), what two main components determine a fair service price?',
        options: [
          'Only the color of the client PC',
          'Replacement parts/consumables cost plus technician labor and overhead',
          'Random guessing without a menu',
          'Only the weight of the monitor',
        ],
        correctIndex: 1,
        explanation:
          'Professional business costing computes parts/materials cost, labor time, and shop overhead to produce a transparent service menu.',
        sysmodPrinciple: 'Week 1 · CSS Business Costing & TechPreneurship',
      },
      {
        id: 'd02-q5',
        question: 'Why should compressed air cans be held upright when blowing dust out of a computer case?',
        options: [
          'Tilting the can sprays freezing liquid propellant that can cause moisture damage on circuit boards',
          'Holding it upside down makes the air warmer',
          'Compressed air only works on monitors',
          'Upright cans automatically tighten loose screws',
        ],
        correctIndex: 0,
        explanation:
          'Tilting compressed air discharges cold liquid propellant that leaves condensation on components; holding it upright delivers dry air safely.',
        sysmodPrinciple: 'Week 1 · Safe Cleaning Tools Usage',
      },
    ],
  },

  // ================= DAY 3 · LEVEL 3 =================
  {
    id: 'day-03',
    code: 'DAY 3 · LV.3',
    dayNumber: 3,
    level: 3,
    weekRef: 'Week 1',
    title: 'Elements of Computer Systems',
    topic: 'Computer System Elements',
    difficulty: 'Foundational',
    estimatedMinutes: 3,
    description:
      'Level 3: Differentiating Hardware, System Software, Application Software, Peopleware, Dataware, and Procedures.',
    questions: [
      {
        id: 'd03-q1',
        question: 'Which element of a computer system refers to the human users, technicians, and IT administrators who operate and maintain the machine?',
        options: ['Hardware', 'Dataware', 'Peopleware', 'Firmware'],
        correctIndex: 2,
        explanation:
          'Peopleware includes all human participants—end users, CSS technicians, programmers, and system administrators—who interact with the computer.',
        sysmodPrinciple: 'Week 1 · Elements of Computer Systems',
      },
      {
        id: 'd03-q2',
        question: 'Which of the following is an example of System Software rather than Application Software?',
        options: [
          'Microsoft Word',
          'Windows 11 Operating System',
          'Adobe Photoshop',
          'Google Chrome',
        ],
        correctIndex: 1,
        explanation:
          'Operating systems and device drivers are System Software because they manage hardware resources and provide the platform for applications.',
        sysmodPrinciple: 'Week 1 · System vs. Application Software',
      },
      {
        id: 'd03-q3',
        question: 'What role does Random Access Memory (RAM) play inside the computer hardware architecture?',
        options: [
          'Permanently archives files even when power is turned off',
          'Provides fast temporary working memory for the OS and active programs currently running',
          'Converts AC wall power into DC voltage',
          'Sends Ethernet packets to the internet router',
        ],
        correctIndex: 1,
        explanation:
          'RAM is volatile high-speed memory that holds active instructions and data for the CPU while the computer is powered on.',
        sysmodPrinciple: 'Week 1 · Core Hardware Functions',
      },
      {
        id: 'd03-q4',
        question: 'In a computer system ecosystem, what represents "Dataware"?',
        options: [
          'The physical metal tower case',
          'Raw facts, records, documents, and databases processed and stored by the system',
          'The cooling fans mounted on the CPU',
          'The screwdriver set in the lab',
        ],
        correctIndex: 1,
        explanation:
          'Dataware consists of the digital files, student records, and databases that the hardware and software process into useful information.',
        sysmodPrinciple: 'Week 1 · Dataware & Information Flow',
      },
      {
        id: 'd03-q5',
        question: 'Why are written "Procedures" considered a vital element of a computer system?',
        options: [
          'They physically power the motherboard',
          'They define consistent step-by-step rules for safe operation, backups, and troubleshooting',
          'They replace the need for an operating system',
          'They increase CPU clock speed automatically',
        ],
        correctIndex: 1,
        explanation:
          'Standard operating procedures guide peopleware to operate, back up, and service computer systems safely and consistently.',
        sysmodPrinciple: 'Week 1 · Procedures & Operational Discipline',
      },
    ],
  },

  // ================= DAY 4 · LEVEL 4 =================
  {
    id: 'day-04',
    code: 'DAY 4 · LV.4',
    dayNumber: 4,
    level: 4,
    weekRef: 'Week 1',
    title: 'Hardware Disassembly & Reassembly Sequence',
    topic: 'Hardware Assembly',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 4: Step-by-step safe disassembly, component handling, and proper reassembly order following OHS standards.',
    questions: [
      {
        id: 'd04-q1',
        question: 'After opening the side panel of a desktop PC, what should you disconnect BEFORE unscrewing the motherboard?',
        options: [
          'Only the monitor brightness button',
          'All internal power cables (24-pin, 4/8-pin CPU), SATA cables, front panel wires, and expansion cards',
          'The plastic front logo badge',
          'Nothing—pull the motherboard out with cables attached',
        ],
        correctIndex: 1,
        explanation:
          'Disconnecting power leads, data cables, front panel headers, and expansion cards prevents torn sockets and bent pins during removal.',
        sysmodPrinciple: 'Week 1 · Safe Disassembly Sequence',
      },
      {
        id: 'd04-q2',
        question: 'How should you hold a RAM stick or graphics card while installing or removing it?',
        options: [
          'Firmly by the gold contact pins so it does not slip',
          'By its outer non-conductive edges without touching the gold pins or circuits',
          'With uninsulated steel pliers on the memory chips',
          'While rubbing your feet on carpet',
        ],
        correctIndex: 1,
        explanation:
          'Skin oils corrode gold edge connectors and static electricity can damage exposed IC chips; always hold boards by their edges.',
        sysmodPrinciple: 'Week 1 · Component Handling Best Practices',
      },
      {
        id: 'd04-q3',
        question: 'What is the purpose of brass standoffs mounted between the PC case tray and the motherboard?',
        options: [
          'To speed up Wi-Fi signals',
          'To elevate the motherboard so solder joints on the back do not short-circuit against the metal case',
          'To store extra thermal paste',
          'To hold the external monitor upright',
        ],
        correctIndex: 1,
        explanation:
          'Standoffs align with motherboard mounting holes and keep the rear conductive traces safely insulated from the grounded steel chassis.',
        sysmodPrinciple: 'Week 1 · Mechanical & Electrical Isolation',
      },
      {
        id: 'd04-q4',
        question: 'When installing a CPU into a motherboard socket, what prevents it from being inserted backwards?',
        options: [
          'The golden alignment triangle (Pin-1 indicator) and physical keying notches on the socket',
          'Forcing the cooler down until the pins bend flat',
          'Using superglue on the socket edges',
          'The color of the power supply fan',
        ],
        correctIndex: 0,
        explanation:
          'Aligning the CPU corner triangle and notches lets the processor drop into the socket with zero insertion force (ZIF).',
        sysmodPrinciple: 'Week 1 · Keyed Hardware Alignment',
      },
      {
        id: 'd04-q5',
        question: 'Why do technicians apply a thin, pea-sized layer of thermal paste between the CPU and heatsink?',
        options: [
          'To permanently glue the processor to the fan',
          'To fill microscopic air gaps and transfer heat efficiently from the CPU to the cooler',
          'To insulate the CPU from electrical ground',
          'To lubricate the fan bearings',
        ],
        correctIndex: 1,
        explanation:
          'Air is a poor conductor of heat; thermal compound eliminates microscopic air pockets between the CPU heat spreader and heatsink base.',
        sysmodPrinciple: 'Week 1 · Thermal Interface Management',
      },
    ],
  },

  // ================= DAY 5 · LEVEL 5 =================
  {
    id: 'day-05',
    code: 'DAY 5 · LV.5',
    dayNumber: 5,
    level: 5,
    weekRef: 'Week 1',
    title: 'Assembly Verification & Misplaced Parts Check',
    topic: 'Hardware Assembly',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 5: Spotting deliberately disconnected or misplaced parts during PC reassembly and pre-power checks.',
    questions: [
      {
        id: 'd05-q1',
        question: 'You reassembled a desktop PC, flipped the PSU switch on, and pressed the front power button—nothing happens at all. Which tiny motherboard header is most commonly misplaced?',
        options: [
          'SATA3 data port',
          'Front Panel Power Switch (PWR_SW) 2-pin header',
          'HD Audio rear jack',
          'HDMI monitor port',
        ],
        correctIndex: 1,
        explanation:
          'If the 2-pin PWR_SW cable is shifted by one pin or unplugged on the F_PANEL header, pressing the case power button cannot close the startup circuit.',
        sysmodPrinciple: 'Week 1 · Troubleshoot & Rebuild Verification',
      },
      {
        id: 'd05-q2',
        question: 'During a rebuild race, the PC powers on and fans spin, but the screen stays blank and the motherboard gives 3 long beeps. What assembly mistake likely occurred?',
        options: [
          'The keyboard USB cable is plugged into a rear port',
          'A RAM stick is not fully clicked into its DIMM slot retention latches',
          'The case side panel thumbscrews are loose',
          'The mouse pad is missing',
        ],
        correctIndex: 1,
        explanation:
          'Unseated RAM triggers memory detection errors (often 3 long beeps or POST code 55) because the CPU cannot initialize system memory.',
        sysmodPrinciple: 'Week 1 · POST Feedback During Rebuild',
      },
      {
        id: 'd05-q3',
        question: 'A student connects the 24-pin ATX motherboard power cable but forgets the 4/8-pin EPS CPU power cable near the top-left of the board. What happens?',
        options: [
          'Windows boots twice as fast',
          'The fans may spin briefly, but the CPU receives no power and the PC fails to POST',
          'Only the Ethernet port stops working',
          'The monitor switches to grayscale',
        ],
        correctIndex: 1,
        explanation:
          'The dedicated 4/8-pin +12V EPS cable powers the CPU VRM; without it, the processor cannot start and POST never completes.',
        sysmodPrinciple: 'Week 1 · Power Rail Completeness Check',
      },
      {
        id: 'd05-q4',
        question: 'A newly installed discrete Graphics Card has an empty 8-pin power connector on its top edge. What is the correct action before powering on?',
        options: [
          'Leave it unplugged to save electricity',
          'Connect a dedicated PCIe 6+2-pin power cable from the Power Supply',
          'Plug a SATA data cable into it',
          'Force the CPU 8-pin EPS cable into the GPU slot',
        ],
        correctIndex: 1,
        explanation:
          'Mid-to-high power GPUs require supplemental 12V power via a PCIe 6+2-pin cable (never an EPS CPU cable, which has different pin polarity).',
        sysmodPrinciple: 'Week 1 · Keyed Power Connector Safety',
      },
      {
        id: 'd05-q5',
        question: 'Where should the monitor HDMI cable be plugged on a desktop PC that has an installed dedicated Graphics Card (GPU)?',
        options: [
          'Into the Graphics Card video port, not the disabled motherboard onboard video port',
          'Into the RJ-45 Ethernet jack',
          'Into a front USB 2.0 port',
          'Into the power supply exhaust vent',
        ],
        correctIndex: 0,
        explanation:
          'When a dedicated GPU is installed, most motherboards route primary display output through the GPU ports rather than integrated motherboard ports.',
        sysmodPrinciple: 'Week 1 · Video Signal Path Verification',
      },
    ],
  },

  // ================= DAY 6 · LEVEL 6 =================
  {
    id: 'day-06',
    code: 'DAY 6 · LV.6',
    dayNumber: 6,
    level: 6,
    weekRef: 'Week 2',
    title: 'ISO Images & Portable Bootable USB Devices',
    topic: 'Bootable Media & OS Setup',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 6: Creating ISO image files and preparing portable bootable USB drives using Command Prompt (DOS/Diskpart) or third-party utilities.',
    questions: [
      {
        id: 'd06-q1',
        question: 'What is an ISO file in the context of operating system installation?',
        options: [
          'A compressed screenshot of the desktop',
          'A single exact sector-by-sector archive image of an optical disc or OS installation media',
          'A hardware screwdriver size standard',
          'A network cable color code',
        ],
        correctIndex: 1,
        explanation:
          'An .iso image preserves the entire file structure and boot sector of an OS installer disc so it can be flashed onto a bootable USB drive.',
        sysmodPrinciple: 'Week 2 · ISO Master & Media Preparation',
      },
      {
        id: 'd06-q2',
        question: 'What happens to existing personal files on a USB flash drive when you format it to create a bootable OS installer?',
        options: [
          'They are automatically moved to Google Drive',
          'All existing data on the USB drive is completely erased, so backups must be made first',
          'They become twice as large',
          'Nothing changes on the USB drive',
        ],
        correctIndex: 1,
        explanation:
          'Cleaning and formatting a USB drive with Diskpart or Rufus wipes its partition table and files, requiring prior data backup.',
        sysmodPrinciple: 'Week 2 · Pre-Format Data Safety',
      },
      {
        id: 'd06-q3',
        question: 'In Windows Command Prompt (DOS) Diskpart, which command erases all partition info from the selected USB disk before creating a fresh bootable partition?',
        options: ['delete files', 'clean', 'ping', 'ipconfig'],
        correctIndex: 1,
        explanation:
          'After running `select disk X` on the verified USB drive, the `clean` command removes existing partitions so you can create a clean primary partition.',
        sysmodPrinciple: 'Week 2 · DOS / Diskpart Bootable Workflow',
      },
      {
        id: 'd06-q4',
        question: 'When creating a bootable Windows USB in a third-party tool like Rufus for a modern UEFI computer, which partition scheme should you choose?',
        options: ['GPT (GUID Partition Table)', 'FAT12 floppy format', 'CD-Audio track', 'EXT2 legacy'],
        correctIndex: 0,
        explanation:
          'Modern UEFI firmware with Secure Boot uses GPT (GUID Partition Table) rather than legacy MBR.',
        sysmodPrinciple: 'Week 2 · UEFI & GPT Alignment',
      },
      {
        id: 'd06-q5',
        question: 'Why must a technician verify the exact disk number in `list disk` before executing `clean` in Diskpart?',
        options: [
          'Selecting the wrong disk number could accidentally wipe the computer main internal hard drive or SSD',
          'Diskpart refuses to run on USB drives larger than 4GB',
          'It changes the monitor refresh rate',
          'It disables the keyboard permanently',
        ],
        correctIndex: 0,
        explanation:
          'Diskpart executes destructively without a Recycle Bin; double-checking disk size guarantees you wipe only the intended USB flash drive.',
        sysmodPrinciple: 'Week 2 · Destructive Command Verification',
      },
    ],
  },

  // ================= DAY 7 · LEVEL 7 =================
  {
    id: 'day-07',
    code: 'DAY 7 · LV.7',
    dayNumber: 7,
    level: 7,
    weekRef: 'Week 2',
    title: 'BIOS/UEFI Setup, Partitioning & OS Installation',
    topic: 'Bootable Media & OS Setup',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 7: Configuring BIOS/UEFI boot order, managing disk partitions, and executing a clean Operating System installation.',
    questions: [
      {
        id: 'd07-q1',
        question: 'To start an Operating System installation from a bootable USB flash drive, what must you adjust in BIOS/UEFI or the Boot Menu?',
        options: [
          'Increase the monitor contrast to 100%',
          'Set the Bootable USB Drive as the first boot priority device',
          'Disable the CPU cooling fan',
          'Unplug the SSD before turning on the PC',
        ],
        correctIndex: 1,
        explanation:
          'Placing the USB drive first in the boot order (or selecting it via the one-time Boot Menu) directs firmware to load the OS setup environment.',
        sysmodPrinciple: 'Week 2 · BIOS/UEFI Boot Order Configuration',
      },
      {
        id: 'd07-q2',
        question: 'Why do CSS technicians often create two partitions (Drive C: for OS/Apps and Drive D: for User Data) on a single hard drive or SSD?',
        options: [
          'To make the computer physically heavier',
          'So user files on Drive D: stay separated and safer if Windows on Drive C: needs reinstallation',
          'Because Windows cannot use more than 20GB of disk space',
          'To double the RAM capacity',
        ],
        correctIndex: 1,
        explanation:
          'Logical partitioning isolates the Operating System volume from user documents, simplifying future OS recovery and backups.',
        sysmodPrinciple: 'Week 2 · Disk Partition Management',
      },
      {
        id: 'd07-q3',
        question: 'Which default file system is used by modern Windows installations on internal NTFS system partitions?',
        options: ['NTFS', 'FAT16', 'ISO9660', 'HFS'],
        correctIndex: 0,
        explanation:
          'NTFS (New Technology File System) supports large files (>4GB), file-level security permissions, journaling, and disk quotas.',
        sysmodPrinciple: 'Week 2 · File System Architecture',
      },
      {
        id: 'd07-q4',
        question: 'What is the main advantage of UEFI firmware over legacy BIOS?',
        options: [
          'UEFI supports drives larger than 2TB (via GPT), faster boot times, Secure Boot, and a graphical mouse interface',
          'UEFI removes the need for a motherboard',
          'UEFI works only with floppy disks',
          'UEFI disables all USB ports permanently',
        ],
        correctIndex: 0,
        explanation:
          'UEFI overcomes legacy BIOS 2TB/MBR limits and introduces cryptographic Secure Boot to block boot-level malware.',
        sysmodPrinciple: 'Week 2 · Modern Firmware Standards',
      },
      {
        id: 'd07-q5',
        question: 'During Windows Setup, when the PC automatically restarts after copying installation files, why should you remove the USB drive or let it boot from the SSD?',
        options: [
          'Otherwise the PC will boot back into the USB installer and restart setup from the beginning',
          'Because USB drives melt after 5 minutes',
          'Because the mouse stops working permanently',
          'To erase the newly copied Windows files',
        ],
        correctIndex: 0,
        explanation:
          'If USB remains first in boot priority, rebooting restarts the setup wizard instead of continuing Phase 2 from the internal SSD.',
        sysmodPrinciple: 'Week 2 · OS Setup Phase Transition',
      },
    ],
  },

  // ================= DAY 8 · LEVEL 8 =================
  {
    id: 'day-08',
    code: 'DAY 8 · LV.8',
    dayNumber: 8,
    level: 8,
    weekRef: 'Week 2',
    title: 'Device Drivers & Application Software Deployment',
    topic: 'Bootable Media & OS Setup',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 8: Installing motherboard chipset and device drivers cleanly, verifying Device Manager, and deploying core applications.',
    questions: [
      {
        id: 'd08-q1',
        question: 'What is the primary role of a Device Driver after installing a fresh Operating System?',
        options: [
          'It physically cools the graphics card',
          'It translates commands between the Operating System and a specific hardware component',
          'It creates spreadsheets and slide presentations',
          'It increases internet bandwidth speed beyond ISP limits',
        ],
        correctIndex: 1,
        explanation:
          'Device drivers act as software translators allowing the OS to unlock full features of the GPU, audio chip, chipset, and network adapter.',
        sysmodPrinciple: 'Week 2 · Hardware-to-OS Driver Interface',
      },
      {
        id: 'd08-q2',
        question: 'Which Windows utility should you open to check for missing drivers marked with a yellow exclamation warning triangle?',
        options: ['Notepad', 'Device Manager', 'Paint', 'Calculator'],
        correctIndex: 1,
        explanation:
          'Device Manager lists every detected hardware device and flags missing, disabled, or conflicting drivers with status warning icons.',
        sysmodPrinciple: 'Week 2 · Post-Install Driver Verification',
      },
      {
        id: 'd08-q3',
        question: 'Which driver should ideally be installed FIRST on a newly formatted desktop PC?',
        options: [
          'Motherboard Chipset driver',
          'RGB keyboard lighting app',
          'PDF reader plugin',
          'Screen saver pack',
        ],
        correctIndex: 0,
        explanation:
          'Installing the motherboard Chipset driver first ensures PCIe lanes, USB controllers, and storage buses are properly identified before installing GPU or audio drivers.',
        sysmodPrinciple: 'Week 2 · Ordered Driver Deployment',
      },
      {
        id: 'd08-q4',
        question: 'Why should technicians download hardware drivers from the official motherboard or component manufacturer website?',
        options: [
          'Third-party unknown driver sites frequently bundle adware, malware, or mismatched unsigned drivers',
          'Official sites only offer drivers in text files',
          'Random file-sharing sites always have newer BIOS chips',
          'Official drivers do not require storage space',
        ],
        correctIndex: 0,
        explanation:
          'Vendor-signed drivers ensure hardware stability, security compliance, and freedom from bundled PUPs or malware.',
        sysmodPrinciple: 'Week 2 · Secure Software Sourcing',
      },
      {
        id: 'd08-q5',
        question: 'After deploying essential application software (Office suite, browser, antivirus), what is the final step in the Software Deployment Sprint?',
        options: [
          'Immediately delete the applications',
          'Launch and verify each application functions properly and document the installed versions',
          'Unplug the SSD while Windows is running',
          'Disable Windows Security permanently',
        ],
        correctIndex: 1,
        explanation:
          'Functional verification confirms zero missing runtime dependencies, and documentation creates a baseline record for future servicing.',
        sysmodPrinciple: 'Week 2 · Verification & Deployment Documentation',
      },
    ],
  },

  // ================= DAY 9 · LEVEL 9 =================
  {
    id: 'day-09',
    code: 'DAY 9 · LV.9',
    dayNumber: 9,
    level: 9,
    weekRef: 'Weeks 3–4',
    title: 'Computer Stress Testing & Technical Documentation',
    topic: 'Testing & Documentation',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 9: Conducting burn-in/stress tests to validate thermal and electrical stability and writing structured computer test reports.',
    questions: [
      {
        id: 'd09-q1',
        question: 'What is the main purpose of running a Stress Test (or Burn-In Test) on a newly assembled or repaired computer?',
        options: [
          'To test how loud the speakers can play music',
          'To push the CPU, RAM, and GPU under sustained load to uncover overheating, instability, or hidden hardware faults',
          'To erase all installed drivers',
          'To reduce the size of the hard drive',
        ],
        correctIndex: 1,
        explanation:
          'A PC may boot fine at idle yet crash or overheat under heavy load; stress testing reveals weak cooling, unstable RAM, or drooping PSUs.',
        sysmodPrinciple: 'Weeks 3–4 · Stress Test Showdown',
      },
      {
        id: 'd09-q2',
        question: 'During a 15-minute CPU stress test, the processor hits 99°C and clock speeds drop sharply. What is occurring?',
        options: [
          'Normal energy-saving sleep mode',
          'Thermal throttling caused by inadequate cooling, dry thermal paste, or a loose heatsink',
          'A DNS network configuration error',
          'Normal SSD defragmentation',
        ],
        correctIndex: 1,
        explanation:
          'Modern CPUs reduce frequency (thermal throttle) near TjMax (~95–100°C) to avoid permanent silicon damage, signaling a cooling problem.',
        sysmodPrinciple: 'Weeks 3–4 · Thermal Stability Analysis',
      },
      {
        id: 'd09-q3',
        question: 'Which four key elements belong in a professional Computer Testing & Servicing Report ("Tech Doc Challenge")?',
        options: [
          'Favorite games, wall color, lunch menu, and weather',
          'Observed performance metrics, errors detected, corrective solutions applied, and maintenance recommendations',
          'Only the technician nickname and no test data',
          'A blank sheet of paper',
        ],
        correctIndex: 1,
        explanation:
          'Complete technical documentation records baseline metrics, exact faults found, fixes performed, and preventive recommendations for the client.',
        sysmodPrinciple: 'Weeks 3–4 · Structured Servicing Documentation',
      },
      {
        id: 'd09-q4',
        question: 'What should a technician do if a computer exhibits sudden power-offs or BSODs halfway through a burn-in test?',
        options: [
          'Ignore it and mark the unit as Functional',
          'Stop the test, log the symptom/error code, inspect thermals/voltages/RAM, fix the root cause, and re-test',
          'Unplug the cooling fan to make it quieter',
          'Change the desktop wallpaper',
        ],
        correctIndex: 1,
        explanation:
          'Failing a stress test means the repair is incomplete; technicians must diagnose the trigger, remediate it, and pass a clean re-test.',
        sysmodPrinciple: 'Weeks 3–4 · Closed-Loop Quality Assurance',
      },
      {
        id: 'd09-q5',
        question: 'Why is recording baseline idle vs. load temperatures valuable in a computer test report?',
        options: [
          'It proves objectively that cooling performance meets safe operating limits before returning the PC to the client',
          'It increases the monitor screen size',
          'It replaces the need for antivirus software',
          'It makes Ethernet cables longer',
        ],
        correctIndex: 0,
        explanation:
          'Quantitative temperature and stability baselines provide verifiable proof of system health and help detect future dust buildup.',
        sysmodPrinciple: 'Weeks 3–4 · Empirical Baseline Documentation',
      },
    ],
  },

  // ================= DAY 10 · LEVEL 10 =================
  {
    id: 'day-10',
    code: 'DAY 10 · LV.10',
    dayNumber: 10,
    level: 10,
    weekRef: 'Weeks 3–4',
    title: 'Computer Network Concepts, Topologies & IP Addressing',
    topic: 'Networking Concepts',
    difficulty: 'Foundational',
    estimatedMinutes: 4,
    description:
      'Level 10: Network types (LAN, WAN, MAN), physical topologies, network devices, and IPv4 vs. IPv6 addressing fundamentals.',
    questions: [
      {
        id: 'd10-q1',
        question: 'Which network type connects computers and printers within a single school computer laboratory or office building?',
        options: [
          'WAN (Wide Area Network)',
          'LAN (Local Area Network)',
          'PAN (Personal Area Network only for Bluetooth earbuds)',
          'Satellite Global Grid',
        ],
        correctIndex: 1,
        explanation:
          'A Local Area Network (LAN) interconnects workstations, switches, and printers within a limited geographic area like a room or building.',
        sysmodPrinciple: 'Weeks 3–4 · Network Classification',
      },
      {
        id: 'd10-q2',
        question: 'In which network topology does every workstation connect via its own dedicated cable to a central network switch?',
        options: ['Bus Topology', 'Ring Topology', 'Star Topology', 'Daisy-Chain Serial'],
        correctIndex: 2,
        explanation:
          'Star topology connects each device directly to a central switch, making cable faults easy to isolate without taking down the entire LAN.',
        sysmodPrinciple: 'Weeks 3–4 · Network Topology Design',
      },
      {
        id: 'd10-q3',
        question: 'What is the primary difference between a Network Switch and a Router?',
        options: [
          'A switch connects devices within the same LAN using MAC addresses; a router forwards traffic between different networks using IP addresses',
          'A switch only works wirelessly; a router has no ports',
          'A router is used only for printing documents',
          'They perform the exact same task with zero differences',
        ],
        correctIndex: 0,
        explanation:
          'Switches operate at Layer 2 inside a local subnet, while routers operate at Layer 3 to route packets between LANs and the Internet (WAN).',
        sysmodPrinciple: 'Weeks 3–4 · Network Device Roles',
      },
      {
        id: 'd10-q4',
        question: 'Which of the following is a valid private IPv4 address commonly assigned to a classroom LAN workstation?',
        options: ['192.168.10.25', '256.300.1.5', '192.168.10', '88:99:AA:BB:CC:DD'],
        correctIndex: 0,
        explanation:
          'IPv4 addresses consist of four octets ranging from 0 to 255; 192.168.x.x is a standard RFC 1918 private LAN address block.',
        sysmodPrinciple: 'Weeks 3–4 · IPv4 Addressing Standards',
      },
      {
        id: 'd10-q5',
        question: 'Why was IPv6 (128-bit hexadecimal addressing) developed to succeed IPv4 (32-bit addressing)?',
        options: [
          'IPv4 addresses are exhausted globally, while IPv6 provides a vastly larger address space and improved routing efficiency',
          'IPv4 cannot transmit web pages anymore',
          'IPv6 eliminates the need for Ethernet cables',
          'IPv6 uses only 8 bits per address',
        ],
        correctIndex: 0,
        explanation:
          'IPv4 supports ~4.3 billion addresses, whereas 128-bit IPv6 supplies trillions of addresses per person for modern internet growth.',
        sysmodPrinciple: 'Weeks 3–4 · IPv4 vs. IPv6 Architecture',
      },
    ],
  },

  // ================= DAY 11 · LEVEL 11 =================
  {
    id: 'day-11',
    code: 'DAY 11 · LV.11',
    dayNumber: 11,
    level: 11,
    weekRef: 'Weeks 3–4',
    title: 'Peer-to-Peer vs. Client-Server Network Models',
    topic: 'Networking Concepts',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 11: Comparing Peer-to-Peer workgroups and centralized Client-Server architectures for security, scalability, and cost.',
    questions: [
      {
        id: 'd11-q1',
        question: 'In a Peer-to-Peer (P2P) network model, how are resources like shared folders and printers managed?',
        options: [
          'By a dedicated enterprise Domain Controller',
          'Each computer acts as both client and server, managing its own local shares and user accounts',
          'Exclusively through cloud satellites',
          'By the Ethernet switch hardware alone',
        ],
        correctIndex: 1,
        explanation:
          'Peer-to-Peer networks have no central server; each equal workstation shares resources directly, making setup inexpensive for small groups (<10 PCs).',
        sysmodPrinciple: 'Weeks 3–4 · Peer-to-Peer Architecture',
      },
      {
        id: 'd11-q2',
        question: 'Why does a 45-computer school ICT laboratory prefer a Client-Server model over a Peer-to-Peer model?',
        options: [
          'Client-Server provides centralized user authentication, unified security policies, and easier backups',
          'Peer-to-Peer requires more expensive Windows Server licenses',
          'Client-Server does not require IP addresses',
          'Client-Server works without switches or cables',
        ],
        correctIndex: 0,
        explanation:
          'Managing 45 individual PCs in P2P is chaotic; Client-Server centralizes logins, permissions, shared storage, and policies on a dedicated server.',
        sysmodPrinciple: 'Weeks 3–4 · Client-Server Scalability',
      },
      {
        id: 'd11-q3',
        question: 'What is a notable limitation of a Client-Server network compared to a simple Peer-to-Peer setup?',
        options: [
          'Higher initial server hardware/licensing cost and risk of a single point of failure if the server goes down without redundancy',
          'Users cannot share printers on a Client-Server network',
          'It cannot use RJ-45 Ethernet cables',
          'It allows a maximum of only 2 computers',
        ],
        correctIndex: 0,
        explanation:
          'Client-Server networks require dedicated server hardware, NOS licensing, skilled administration, and backup/redundancy planning.',
        sysmodPrinciple: 'Weeks 3–4 · Architectural Trade-Off Analysis',
      },
      {
        id: 'd11-q4',
        question: 'Two Peer-to-Peer PCs are connected directly via a switch. PC-A has IP 192.168.1.10/24 and PC-B has IP 192.168.2.11/24. Why can they NOT ping each other?',
        options: [
          'Their keyboards are different brands',
          'With subnet mask 255.255.255.0 (/24), they sit on different network IDs (192.168.1.0 vs. 192.168.2.0) and need a router or matching subnet',
          'Switches block all IP addresses ending in .11',
          'Peer-to-Peer only works with IPv6',
        ],
        correctIndex: 1,
        explanation:
          'Hosts on the same flat switch without a router must share the same network portion of their IP address under their subnet mask.',
        sysmodPrinciple: 'Weeks 3–4 · Subnet & Same-Network Logic',
      },
      {
        id: 'd11-q5',
        question: 'Which small-scale scenario is BEST suited for a Peer-to-Peer network?',
        options: [
          'A national bank with 500 branches',
          'A 4-PC home printing shop sharing one USB printer and a small local folder on a tight budget',
          'A university campus hosting 3,000 student accounts',
          'A hospital requiring strict central access auditing',
        ],
        correctIndex: 1,
        explanation:
          'Small offices of 2–10 machines with minimal budget benefit from the low cost and quick setup of a Peer-to-Peer workgroup.',
        sysmodPrinciple: 'Weeks 3–4 · Network Model Selection',
      },
    ],
  },

  // ================= DAY 12 · LEVEL 12 =================
  {
    id: 'day-12',
    code: 'DAY 12 · LV.12',
    dayNumber: 12,
    level: 12,
    weekRef: 'Weeks 3–4',
    title: 'Ethernet Cable Termination, Testing & Rack Management',
    topic: 'Network Setup & Cabling',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 12: T568A/T568B RJ-45 termination, straight-through vs. crossover wiring, LAN cable testing, and rack cable management.',
    questions: [
      {
        id: 'd12-q1',
        question: 'What is the correct Pin 1 to Pin 8 color sequence for the widely used T568B Ethernet wiring standard?',
        options: [
          'White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown',
          'White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown',
          'Brown, White-Brown, Green, White-Green, Blue, White-Blue, Orange, White-Orange',
          'Blue, Orange, Green, Brown, White, Black, Red, Yellow',
        ],
        correctIndex: 0,
        explanation:
          'T568B places the Orange pair on pins 1–2, Green split across 3 & 6, Blue on 4–5, and Brown on 7–8.',
        sysmodPrinciple: 'Weeks 3–4 · TIA/EIA-568B Cabling Standard',
      },
      {
        id: 'd12-q2',
        question: 'When terminating a Straight-Through Ethernet patch cable to connect a PC to a Switch, how should both ends be wired?',
        options: [
          'Both ends wired identically (e.g., T568B on both ends)',
          'One end T568A and the other end T568B',
          'Only 2 wires inserted into the RJ-45 plug',
          'Wire colors arranged randomly',
        ],
        correctIndex: 0,
        explanation:
          'Matching T568B on both ends produces a Straight-Through cable, the standard patch cord for PC-to-Switch and Switch-to-Router links.',
        sysmodPrinciple: 'Weeks 3–4 · Straight-Through Termination',
      },
      {
        id: 'd12-q3',
        question: 'You test a newly crimped Ethernet cable with a LAN cable tester. LEDs 1–8 light sequentially except LED 3 stays completely dark on the remote end. What fault is indicated?',
        options: [
          'A healthy Gigabit cable',
          'An open circuit (broken or poorly seated wire) on Pin 3',
          'A wrong DNS server address',
          'An overheating CPU',
        ],
        correctIndex: 1,
        explanation:
          'A missing LED on Pin 3 proves Pin 3 has no electrical continuity—usually because the wire did not reach the end of the RJ-45 plug before crimping.',
        sysmodPrinciple: 'Weeks 3–4 · Physical Layer Continuity Verification',
      },
      {
        id: 'd12-q4',
        question: 'Why must the outer UTP cable jacket sit INSIDE the RJ-45 connector strain-relief clamp before crimping?',
        options: [
          'To make the cable look shorter',
          'To provide mechanical strain relief and preserve wire pair twists against crosstalk and accidental pulling',
          'Because copper wires only conduct when squeezed by plastic',
          'To boost Wi-Fi signal range',
        ],
        correctIndex: 1,
        explanation:
          'Untwisting pairs excessively causes Near-End Crosstalk (NEXT), and leaving the jacket outside the clamp lets wires pull loose from the pins.',
        sysmodPrinciple: 'Weeks 3–4 · Workmanship & Signal Integrity',
      },
      {
        id: 'd12-q5',
        question: 'Why is structured cable management (velcro straps, patch panels, port labels) mandatory inside a network rack or cabinet?',
        options: [
          'It improves airflow, prevents accidental unplugging, and allows technicians to trace and replace faulty links rapidly',
          'It doubles the voltage flowing through UTP cables',
          'It eliminates the need for IP addresses',
          'It turns Cat5e cable into fiber optic cable',
        ],
        correctIndex: 0,
        explanation:
          'Clean rack labeling and cable management drastically reduce troubleshooting turnaround time and physical cable strain.',
        sysmodPrinciple: 'Weeks 3–4 · Rack Cable Management Standards',
      },
    ],
  },

  // ================= DAY 13 · LEVEL 13 =================
  {
    id: 'day-13',
    code: 'DAY 13 · LV.13',
    dayNumber: 13,
    level: 13,
    weekRef: 'Weeks 3–4',
    title: 'Network Mapping, Switches & Router/AP Configuration',
    topic: 'Network Setup & Cabling',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 13: Selecting managed vs. unmanaged switches, choosing UTP cable categories, and configuring routers and wireless access points.',
    questions: [
      {
        id: 'd13-q1',
        question: 'What is the key advantage of a Managed Switch over an Unmanaged Switch in a school or corporate network?',
        options: [
          'Managed switches allow configuring VLANs, QoS, port security, and traffic monitoring',
          'Unmanaged switches cost ten times more',
          'Managed switches do not require electrical power',
          'Unmanaged switches support fiber only',
        ],
        correctIndex: 0,
        explanation:
          'Unmanaged switches are plug-and-play, whereas Managed switches let administrators segment traffic (VLANs) and inspect per-port errors.',
        sysmodPrinciple: 'Weeks 3–4 · Managed vs. Unmanaged Switching',
      },
      {
        id: 'd13-q2',
        question: 'Which UTP cable category is rated for up to 10 Gbps over shorter distances (up to 55m) and 1 Gbps up to 100m with reduced crosstalk?',
        options: ['Cat3', 'Cat6', 'Coaxial RG-6', 'Telephone RJ-11'],
        correctIndex: 1,
        explanation:
          'Cat6 includes a tighter twist and often a central spline separator, reliably delivering 1 Gbps up to 100 meters and 10 Gbps up to ~55 meters.',
        sysmodPrinciple: 'Weeks 3–4 · Cabling Media Selection',
      },
      {
        id: 'd13-q3',
        question: 'When setting up a Wireless Access Point (AP) for a campus classroom, which security protocol should you configure?',
        options: [
          'Open Network (No Password)',
          'WEP (Legacy 64-bit)',
          'WPA2-PSK (AES) or WPA3-Personal',
          'Disable SSID without encryption',
        ],
        correctIndex: 2,
        explanation:
          'WPA2-AES and WPA3 provide strong encryption; WEP and open networks are easily compromised by unauthorized users.',
        sysmodPrinciple: 'Weeks 3–4 · Wireless Access Point Security',
      },
      {
        id: 'd13-q4',
        question: 'On a standard SOHO router, which port connects to the ISP modem (external Internet), and which ports connect to the local classroom switch/PCs?',
        options: [
          'WAN port connects to the ISP modem; LAN ports connect to the local switch and PCs',
          'LAN port connects to the ISP modem; Console port connects to printers',
          'USB port connects to the ISP modem',
          'Any port can be left disconnected',
        ],
        correctIndex: 0,
        explanation:
          'The WAN interface obtains the upstream ISP link and performs NAT/routing for internal devices plugged into the LAN ports.',
        sysmodPrinciple: 'Weeks 3–4 · Router Interface Mapping',
      },
      {
        id: 'd13-q5',
        question: 'What is the maximum recommended horizontal cable run length for standard twisted-pair Ethernet (Cat5e/Cat6) before signal attenuation degrades performance?',
        options: ['10 meters', '100 meters (328 feet)', '500 meters', '2 kilometers'],
        correctIndex: 1,
        explanation:
          'TIA/EIA Ethernet standards specify 100 meters maximum total channel length (90m permanent link + 10m patch cords) for copper UTP.',
        sysmodPrinciple: 'Weeks 3–4 · Physical Network Design Limits',
      },
    ],
  },

  // ================= DAY 14 · LEVEL 14 =================
  {
    id: 'day-14',
    code: 'DAY 14 · LV.14',
    dayNumber: 14,
    level: 14,
    weekRef: 'Weeks 3–4',
    title: 'Network Connectivity Testing & Audit Reports',
    topic: 'Network Testing & Audits',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 14: Validating network performance using ping and loopback tests, interpreting IP results, and preparing a Network Audit Report.',
    questions: [
      {
        id: 'd14-q1',
        question: 'What does successfully pinging the loopback address `127.0.0.1` confirm on a workstation?',
        options: [
          'That the ISP router is online',
          'That the local computer TCP/IP stack and network adapter driver software are functioning properly',
          'That the Ethernet cable is Cat6A',
          'That Google DNS is reachable',
        ],
        correctIndex: 1,
        explanation:
          'Loopback testing verifies the local OS networking stack internally without sending packets onto the physical cable.',
        sysmodPrinciple: 'Weeks 3–4 · Ping It to Prove It! (Loopback Check)',
      },
      {
        id: 'd14-q2',
        question: 'A workstation receives an IP address of `169.254.44.18` (APIPA). What does this immediately indicate?',
        options: [
          'It received a high-speed fiber IP from the ISP',
          'The computer failed to reach a DHCP server and self-assigned a link-local fallback IP',
          'The CPU is overheating',
          'The monitor refresh rate is too low',
        ],
        correctIndex: 1,
        explanation:
          'Addresses in 169.254.0.0/16 (APIPA) occur when a DHCP client cannot contact a DHCP server—often due to a bad cable, wrong VLAN, or stopped DHCP service.',
        sysmodPrinciple: 'Weeks 3–4 · IP Configuration Diagnostics',
      },
      {
        id: 'd14-q3',
        question: 'If `ping 192.168.1.1` (default gateway) succeeds with `<1ms` latency, but `ping www.deped.gov.ph` fails with "Ping request could not find host", what is the most likely issue?',
        options: [
          'The RJ-45 cable is unplugged',
          'A DNS name resolution failure (wrong or unreachable DNS server setting)',
          'The RAM stick is unseated',
          'The power supply failed',
        ],
        correctIndex: 1,
        explanation:
          'Local LAN connectivity works, so the inability to translate a domain name into an IP points directly to DNS configuration or upstream DNS reachability.',
        sysmodPrinciple: 'Weeks 3–4 · Layer-by-Layer Connectivity Isolation',
      },
      {
        id: 'd14-q4',
        question: 'When `ping` outputs `Request timed out` with 50% packet loss intermittently across a wired desktop, what physical check should you include in your audit?',
        options: [
          'Inspect for a damaged/kinked Ethernet cable, loose RJ-45 clip, or electromagnetic interference near power cables',
          'Reinstall Microsoft Excel',
          'Replace the mouse battery',
          'Lower screen brightness',
        ],
        correctIndex: 0,
        explanation:
          'Intermittent packet loss on wired Ethernet typically stems from poor cable crimps, kinked UTP conductors, faulty switch ports, or EMI.',
        sysmodPrinciple: 'Weeks 3–4 · Packet Loss Root-Cause Analysis',
      },
      {
        id: 'd14-q5',
        question: 'What distinguishes a high-quality Network Audit Report from informal notes?',
        options: [
          'It lists structured test outputs (IP/ping/cable results), exact faults identified, corrective fixes applied, and preventive recommendations',
          'It contains only a single word: "Fixed"',
          'It omits all IP addresses and port numbers',
          'It is written before any testing is conducted',
        ],
        correctIndex: 0,
        explanation:
          'Professional network documentation gives future technicians an auditable baseline of topology, test metrics, and remediation history.',
        sysmodPrinciple: 'Weeks 3–4 · Network Audit Report Standards',
      },
    ],
  },

  // ================= DAY 15 · LEVEL 15 =================
  {
    id: 'day-15',
    code: 'DAY 15 · LV.15',
    dayNumber: 15,
    level: 15,
    weekRef: 'Week 5',
    title: 'Server Management Concepts & NOS Installation',
    topic: 'Server Setup & Management',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 15: Network Operating System (NOS) concepts, static IP setup, Server Manager dashboard, and foundational server roles.',
    questions: [
      {
        id: 'd15-q1',
        question: 'What is the primary role of a Network Operating System (NOS) such as Windows Server?',
        options: [
          'To play single-player 3D games',
          'To manage centralized network services, user authentication, shared storage, security policies, and client requests',
          'To replace all physical network switches',
          'To print documents without a printer',
        ],
        correctIndex: 1,
        explanation:
          'A NOS is engineered for multi-user reliability, hosting directory services, DNS, DHCP, file shares, and web/print roles.',
        sysmodPrinciple: 'Week 5 · Server Management Concepts',
      },
      {
        id: 'd15-q2',
        question: 'Why MUST a newly installed server be configured with a Static IP address instead of a dynamic DHCP lease?',
        options: [
          'So client workstations, DNS records, and domain services can always locate the server at one unchanging IP address',
          'Because Windows Server cannot connect to Ethernet switches',
          'To hide the server from the local network',
          'Because static IPs require zero power',
        ],
        correctIndex: 0,
        explanation:
          'If a server IP changed on lease renewal, clients would lose access to ADDS authentication, DNS, mapped drives, and intranet websites.',
        sysmodPrinciple: 'Week 5 · Post-Install Server Addressing',
      },
      {
        id: 'd15-q3',
        question: 'In Windows Server, which built-in console is used to add Roles and Features, rename the server, and monitor service health?',
        options: ['Windows Media Player', 'Server Manager', 'Sticky Notes', 'Snipping Tool'],
        correctIndex: 1,
        explanation:
          'Server Manager is the central administrative hub for configuring Local Server properties and deploying roles like ADDS, DNS, DHCP, and IIS.',
        sysmodPrinciple: 'Week 5 · Server Manager Administration',
      },
      {
        id: 'd15-q4',
        question: 'Why is renaming a newly installed server from its random default name (e.g., `WIN-8K92A1`) to a clear name (e.g., `NCST-DC01`) important BEFORE installing ADDS?',
        options: [
          'Renaming a server after promoting it to a Domain Controller is complex and risks breaking directory references',
          'Random hostnames disable the keyboard',
          'Servers with default names cannot install monitors',
          'Short names double the RAM size',
        ],
        correctIndex: 0,
        explanation:
          'Setting a structured hostname and static IP first establishes clean DNS and Active Directory records from the start.',
        sysmodPrinciple: 'Week 5 · Pre-Role Configuration Best Practices',
      },
      {
        id: 'd15-q5',
        question: 'In Server Manager, what is the difference between a Server "Role" and a "Feature"?',
        options: [
          'A Role defines a primary network service the server provides to clients (e.g., DNS, DHCP, ADDS); a Feature provides supporting tools or utilities (e.g., Windows Server Backup, Telnet Client)',
          'Roles are hardware parts and Features are cables',
          'Features are only for gaming graphics',
          'There is no distinction in Windows Server',
        ],
        correctIndex: 0,
        explanation:
          'Roles deliver core client-facing enterprise services, while Features enhance or assist the operating system and administrators.',
        sysmodPrinciple: 'Week 5 · Server Roles & Features Architecture',
      },
    ],
  },
];
