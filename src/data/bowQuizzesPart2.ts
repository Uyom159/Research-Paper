import { QuizModule } from '../types';

export const BOW_QUIZZES_DAYS_16_TO_30: QuizModule[] = [
  // ================= DAY 16 · LEVEL 16 =================
  {
    id: 'day-16',
    code: 'DAY 16 · LV.16',
    dayNumber: 16,
    level: 16,
    weekRef: 'Weeks 6–8',
    title: 'Active Directory Domain Services (ADDS) & OUs',
    topic: 'Enterprise Server Roles',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 16: Installing ADDS, promoting a Domain Controller, and organizing Organizational Units (OUs), users, and security groups.',
    questions: [
      {
        id: 'd16-q1',
        question: 'What core function does Active Directory Domain Services (ADDS) perform in an enterprise Windows Server network?',
        options: [
          'It physically cools the server rack',
          'It stores directory objects (users, computers, groups) centrally and authenticates domain logins and Group Policies',
          'It crimps Ethernet cables automatically',
          'It only compresses PDF documents',
        ],
        correctIndex: 1,
        explanation:
          'ADDS acts as the central identity and policy database, allowing students or employees to log in securely on any domain-joined computer.',
        sysmodPrinciple: 'Weeks 6–8 · Domain Architect (ADDS)',
      },
      {
        id: 'd16-q2',
        question: 'Why do server administrators create Organizational Units (OUs) such as `Faculty`, `Grade11-CSS`, and `Registrar` inside Active Directory?',
        options: [
          'To group objects logically so specific Group Policy Objects (GPOs) and administrative delegation can be applied cleanly',
          'Because Windows only allows 3 users without OUs',
          'To replace the need for IP addresses',
          'To speed up monitor refresh rates',
        ],
        correctIndex: 0,
        explanation:
          'OUs mirror an organization structure and act as containers to target Group Policies (desktop restrictions, mapped drives, security rules) accurately.',
        sysmodPrinciple: 'Weeks 6–8 · Structured OU Hierarchy',
      },
      {
        id: 'd16-q3',
        question: 'When assigning folder permissions to 40 Grade 11 CSS students in ADDS, what is the recommended best practice?',
        options: [
          'Assign permissions individually to all 40 accounts one by one',
          'Place all 40 student user accounts into a Security Group (e.g., `G11-CSS-Students`) and grant permissions to the group',
          'Give every student Domain Admin privileges',
          'Share a single password among all 40 students',
        ],
        correctIndex: 1,
        explanation:
          'Group-based access control simplifies onboarding, enforces least privilege, and prevents administrative errors as class rosters change.',
        sysmodPrinciple: 'Weeks 6–8 · Role-Based Group Management',
      },
      {
        id: 'd16-q4',
        question: 'After installing the ADDS binaries in Server Manager, what required step actually creates the domain (e.g., `ncst.local`)?',
        options: [
          'Promoting the server to a Domain Controller via the post-deployment configuration wizard',
          'Uninstalling the network adapter driver',
          'Formatting Drive C:',
          'Turning off DNS',
        ],
        correctIndex: 0,
        explanation:
          'Adding the ADDS role only installs the files; promoting the server to a Domain Controller creates the forest/domain and SYSVOL/NTDS database.',
        sysmodPrinciple: 'Weeks 6–8 · Domain Controller Promotion',
      },
      {
        id: 'd16-q5',
        question: 'A workstation fails to join the domain `lab.local` with the error "An Active Directory Domain Controller for the domain could not be contacted." What setting on the client PC should you verify FIRST?',
        options: [
          'The client Preferred DNS Server must point to the Domain Controller IP address',
          'The client wallpaper must match the server',
          'The client mouse must be wireless',
          'The client must disable TCP/IPv4',
        ],
        correctIndex: 0,
        explanation:
          'Domain joins rely on DNS SRV records hosted by the AD-integrated DNS server; pointing a client to an external public DNS prevents finding the DC.',
        sysmodPrinciple: 'Weeks 6–8 · ADDS-to-DNS Dependency',
      },
    ],
  },

  // ================= DAY 17 · LEVEL 17 =================
  {
    id: 'day-17',
    code: 'DAY 17 · LV.17',
    dayNumber: 17,
    level: 17,
    weekRef: 'Weeks 6–8',
    title: 'Domain Name System (DNS) Zones & Name Resolution',
    topic: 'Enterprise Server Roles',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 17: Configuring DNS Forward Lookup Zones, Reverse Lookup Zones, A/PTR records, and validating resolution.',
    questions: [
      {
        id: 'd17-q1',
        question: 'What is the difference between a DNS Forward Lookup Zone and a Reverse Lookup Zone?',
        options: [
          'Forward Lookup resolves hostnames to IP addresses (A/AAAA records); Reverse Lookup resolves IP addresses back to hostnames (PTR records)',
          'Forward Lookup only works on Wi-Fi; Reverse Lookup only works on Ethernet',
          'Reverse Lookup assigns automatic IP leases',
          'Forward Lookup blocks all external websites',
        ],
        correctIndex: 0,
        explanation:
          'Forward zones map human-readable domain names to IPs via A/AAAA records, while Reverse zones map IPs back to names via PTR records.',
        sysmodPrinciple: 'Weeks 6–8 · DNS Builder Quest',
      },
      {
        id: 'd17-q2',
        question: 'Which DNS resource record type maps a hostname like `intranet.ncst.local` to an IPv4 address like `192.168.10.5`?',
        options: ['A (Host) Record', 'PTR Record', 'MX Record', 'TXT Record'],
        correctIndex: 0,
        explanation:
          'An "A" (Address) record maps a domain/hostname to a 32-bit IPv4 address (while an AAAA record maps to IPv6).',
        sysmodPrinciple: 'Weeks 6–8 · DNS Resource Records',
      },
      {
        id: 'd17-q3',
        question: 'Which command-line tool is specifically designed to query a DNS server and verify both forward (name-to-IP) and reverse (IP-to-name) resolution?',
        options: ['nslookup', 'chkdsk', 'diskpart', 'notepad'],
        correctIndex: 0,
        explanation:
          '`nslookup` queries the configured DNS server directly, returning resolved IP addresses, authoritative server names, or NXDOMAIN errors.',
        sysmodPrinciple: 'Weeks 6–8 · Name Resolution Detective',
      },
      {
        id: 'd17-q4',
        question: 'What is the purpose of configuring a DNS Forwarder (such as `8.8.8.8` or ISP DNS) on an internal Windows Server DNS?',
        options: [
          'To allow internal domain clients to resolve external public internet websites while still resolving local domain names internally',
          'To delete all local Active Directory records',
          'To double local cable bandwidth',
          'To disable DHCP leases',
        ],
        correctIndex: 0,
        explanation:
          'The internal DNS answers local domain queries directly and forwards unknown public domain queries to upstream external DNS resolvers.',
        sysmodPrinciple: 'Weeks 6–8 · Internal & External DNS Forwarding',
      },
      {
        id: 'd17-q5',
        question: 'When creating a Reverse Lookup Zone for the subnet `192.168.20.0/24`, how does Windows DNS name the zone automatically?',
        options: [
          '20.168.192.in-addr.arpa',
          '192.168.20.forward.local',
          '0.20.168.192.dhcp',
          'reverse.lan.com',
        ],
        correctIndex: 0,
        explanation:
          'IPv4 reverse lookup zones reverse the network octets under the `.in-addr.arpa` domain hierarchy.',
        sysmodPrinciple: 'Weeks 6–8 · Reverse Zone Architecture',
      },
    ],
  },

  // ================= DAY 18 · LEVEL 18 =================
  {
    id: 'day-18',
    code: 'DAY 18 · LV.18',
    dayNumber: 18,
    level: 18,
    weekRef: 'Weeks 6–8',
    title: 'DHCP Services: Scopes, Exclusions & Leases',
    topic: 'Enterprise Server Roles',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 18: Automating IP configuration with DHCP scopes, subnet masks, static exclusions, reservations, and lease durations.',
    questions: [
      {
        id: 'd18-q1',
        question: 'What are the four handshake packets exchanged when a client computer obtains a new IP address from a DHCP server?',
        options: [
          'Discover → Offer → Request → Acknowledge (DORA)',
          'Ping → Trace → Flush → Renew',
          'Login → Boot → Mount → Save',
          'Create → Format → Partition → Exit',
        ],
        correctIndex: 0,
        explanation:
          'DHCP follows the DORA sequence: Client broadcasts Discover, Server replies with Offer, Client sends Request, and Server finalizes with Acknowledge.',
        sysmodPrinciple: 'Weeks 6–8 · DHCP Operational Handshake',
      },
      {
        id: 'd18-q2',
        question: 'You configure a DHCP scope from `192.168.10.1` to `192.168.10.200`. Why should you add an Exclusion Range for `192.168.10.1` to `192.168.10.20`?',
        options: [
          'To prevent DHCP from handing out IP addresses already statically assigned to the router, servers, switches, and network printers',
          'To block all students from connecting to the LAN',
          'To slow down IP assignment speed',
          'Because IP addresses below .20 do not work on Ethernet',
        ],
        correctIndex: 0,
        explanation:
          'Exclusions protect statically addressed infrastructure devices from duplicate IP address conflicts on the network.',
        sysmodPrinciple: 'Weeks 6–8 · Scope Exclusions & Conflict Prevention',
      },
      {
        id: 'd18-q3',
        question: 'What is a DHCP Reservation, and when is it useful?',
        options: [
          'Binding a specific IP address permanently to a device MAC address so a printer or faculty PC always receives the same IP via DHCP',
          'Deleting a DHCP scope every evening',
          'Assigning the same IP address to two computers simultaneously',
          'Disabling the router firewall',
        ],
        correctIndex: 0,
        explanation:
          'DHCP Reservations guarantee a predictable IP for a specific MAC address while still managing gateway and DNS options centrally.',
        sysmodPrinciple: 'Weeks 6–8 · MAC-Bound Reservations',
      },
      {
        id: 'd18-q4',
        question: 'Besides an IP address and Subnet Mask, which two essential Scope Options must a DHCP server distribute so clients can access the Internet and Domain?',
        options: [
          'Router (Default Gateway) and DNS Server IP addresses',
          'Monitor resolution and speaker volume',
          'CPU fan speed and BIOS password',
          'Printer ink level and paper size',
        ],
        correctIndex: 0,
        explanation:
          'Option 003 (Router/Default Gateway) enables off-subnet routing and Option 006 (DNS Servers) enables domain and website name resolution.',
        sysmodPrinciple: 'Weeks 6–8 · DHCP Scope Options',
      },
      {
        id: 'd18-q5',
        question: 'In an Active Directory domain, why might a newly created and activated DHCP scope still refuse to issue IP leases to clients?',
        options: [
          'The DHCP server has not yet been Authorized in Active Directory',
          'The client monitors are turned off',
          'The scope has too many free IP addresses',
          'NTFS permissions block Ethernet frames',
        ],
        correctIndex: 0,
        explanation:
          'Active Directory requires domain-joined Windows DHCP servers to be explicitly Authorized to prevent rogue DHCP servers from disrupting the network.',
        sysmodPrinciple: 'Weeks 6–8 · AD-Integrated DHCP Authorization',
      },
    ],
  },

  // ================= DAY 19 · LEVEL 19 =================
  {
    id: 'day-19',
    code: 'DAY 19 · LV.19',
    dayNumber: 19,
    level: 19,
    weekRef: 'Weeks 6–8',
    title: 'File & Storage Services, FSRM & Mapped Drives',
    topic: 'Enterprise Server Roles',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 19: Deploying centralized file servers, File Server Resource Manager (FSRM) quotas/screening, folder redirection, and mapped network drives.',
    questions: [
      {
        id: 'd19-q1',
        question: 'What administrative control does File Server Resource Manager (FSRM) provide on a Windows File Server?',
        options: [
          'Setting storage Quotas, File Screening (blocking unauthorized file types like .mp3/.exe), and storage usage reports',
          'Cooling the hard drives with liquid nitrogen',
          'Installing graphics card drivers on client laptops',
          'Configuring Wi-Fi passwords on home routers',
        ],
        correctIndex: 0,
        explanation:
          'FSRM enforces disk space quotas and file-type screening policies so users cannot fill up the school file server with unauthorized media.',
        sysmodPrinciple: 'Weeks 6–8 · Centralized Storage Governance (FSRM)',
      },
      {
        id: 'd19-q2',
        question: 'What is the purpose of configuring Folder Redirection (e.g., redirecting `Documents`) to a centralized file server share?',
        options: [
          'Student/employee documents are stored automatically on the server so files follow them across any lab PC and are backed up centrally',
          'It deletes user documents upon every logoff',
          'It forces all files onto a USB flash drive',
          'It disables network printing',
        ],
        correctIndex: 0,
        explanation:
          'Folder Redirection keeps user data off fragile local PCs, ensuring seamless mobility and centralized server backups.',
        sysmodPrinciple: 'Weeks 6–8 · Folder Redirection Architecture',
      },
      {
        id: 'd19-q3',
        question: 'When a shared folder has BOTH Share Permissions (`Full Control`) and NTFS Permissions (`Read & Execute`) for a student group, what effective access does a student have over the network?',
        options: [
          'Full Control',
          'Read & Execute (the most restrictive combination of Share and NTFS permissions applies)',
          'Domain Administrator access',
          'Permission to delete the entire C: drive',
        ],
        correctIndex: 1,
        explanation:
          'When accessing a folder over the network, Windows evaluates Share and NTFS permissions together and enforces the most restrictive effective permission.',
        sysmodPrinciple: 'Weeks 6–8 · Effective Share + NTFS Security',
      },
      {
        id: 'd19-q4',
        question: 'How does Mapping a Network Drive (e.g., mapping `\\SERVER01\SharedDocs` to drive letter `Z:`) help everyday users?',
        options: [
          'It assigns a familiar drive letter inside File Explorer so users can open and save shared files without typing UNC paths every time',
          'It physically installs a second SSD inside their laptop',
          'It removes the need for a network cable',
          'It encrypts the monitor cable',
        ],
        correctIndex: 0,
        explanation:
          'Mapped drives expose network UNC paths as standard drive letters (such as S: or Z:), simplifying client workflow and legacy application saving.',
        sysmodPrinciple: 'Weeks 6–8 · Network Drive Mapping',
      },
      {
        id: 'd19-q5',
        question: 'What is the difference between a Hard Quota and a Soft Quota in FSRM?',
        options: [
          'A Hard Quota strictly blocks saving new files once the limit is reached; a Soft Quota allows saving while triggering monitoring alerts/notifications',
          'A Hard Quota applies only to HDDs and a Soft Quota only to SSDs',
          'A Soft Quota deletes the operating system',
          'There is no difference between them',
        ],
        correctIndex: 0,
        explanation:
          'Hard quotas strictly cap disk consumption, whereas soft quotas help administrators monitor usage growth and send threshold warnings.',
        sysmodPrinciple: 'Weeks 6–8 · Storage Policy Enforcement',
      },
    ],
  },

  // ================= DAY 20 · LEVEL 20 =================
  {
    id: 'day-20',
    code: 'DAY 20 · LV.20',
    dayNumber: 20,
    level: 20,
    weekRef: 'Weeks 6–8',
    title: 'Web Server Hosting with IIS (Internet Information Services)',
    topic: 'Enterprise Server Roles',
    difficulty: 'Intermediate',
    estimatedMinutes: 4,
    description:
      'Level 20: Installing IIS, understanding core architecture (Sites, Application Pools, Bindings, Default Documents), and hosting websites.',
    questions: [
      {
        id: 'd20-q1',
        question: 'What is the default physical root directory created by Windows Server when installing Internet Information Services (IIS)?',
        options: [
          'C:\\inetpub\\wwwroot',
          'C:\\Windows\\System32\\drivers',
          'C:\\Program Files\\Printer',
          'D:\\Backup\\BIOS',
        ],
        correctIndex: 0,
        explanation:
          'By default, IIS serves the Default Web Site content from `C:\\inetpub\\wwwroot`.',
        sysmodPrinciple: 'Weeks 6–8 · IIS Core Architecture',
      },
      {
        id: 'd20-q2',
        question: 'Which standard TCP ports are used by IIS bindings for unencrypted HTTP and encrypted HTTPS web traffic respectively?',
        options: [
          'Port 80 (HTTP) and Port 443 (HTTPS)',
          'Port 21 and Port 23',
          'Port 53 and Port 67',
          'Port 3389 and Port 445',
        ],
        correctIndex: 0,
        explanation:
          'Web browsers connect to HTTP on TCP Port 80 and TLS-secured HTTPS on TCP Port 443 by default.',
        sysmodPrinciple: 'Weeks 6–8 · Web Service Port Bindings',
      },
      {
        id: 'd20-q3',
        question: 'In IIS Manager, why are Application Pools used to run separate websites in isolated worker processes?',
        options: [
          'So a crash or memory leak in one web application does not bring down other websites hosted on the same server',
          'To cool down the server chassis with water',
          'To automatically assign DHCP IP addresses',
          'To disable HTML rendering',
        ],
        correctIndex: 0,
        explanation:
          'Application Pools isolate worker processes (`w3wp.exe`), improving fault containment, security identity separation, and reliability.',
        sysmodPrinciple: 'Weeks 6–8 · IIS Process Isolation',
      },
      {
        id: 'd20-q4',
        question: 'You placed `home.html` inside an IIS site folder, but visiting `http://portal.ncst.local/` shows a "403.14 Forbidden — Directory Listing Denied" error instead of loading the page. What IIS setting must be updated?',
        options: [
          'Add `home.html` to the site Default Document list (or rename it to `index.html`)',
          'Replace the server power supply',
          'Delete the DNS Reverse Lookup Zone',
          'Unplug the server Ethernet cable',
        ],
        correctIndex: 0,
        explanation:
          'IIS looks for filenames configured in Default Document (e.g., `index.html`, `Default.htm`) when a client requests the root URL without a filename.',
        sysmodPrinciple: 'Weeks 6–8 · IIS Default Document Resolution',
      },
      {
        id: 'd20-q5',
        question: 'How can a single IIS server with one IP address host two different intranet websites (`grades.ncst.local` and `library.ncst.local`) simultaneously on Port 80?',
        options: [
          'By configuring distinct Host Name bindings in IIS and matching DNS A/CNAME records for each site',
          'By plugging two monitors into the server',
          'It is impossible; one IP can only ever host one site',
          'By disabling the TCP/IP protocol',
        ],
        correctIndex: 0,
        explanation:
          'HTTP Host Header bindings allow IIS to route incoming Port 80 requests to the exact site matching the requested domain name.',
        sysmodPrinciple: 'Weeks 6–8 · Multi-Site IIS Host Bindings',
      },
    ],
  },

  // ================= DAY 21 · LEVEL 21 =================
  {
    id: 'day-21',
    code: 'DAY 21 · LV.21',
    dayNumber: 21,
    level: 21,
    weekRef: 'Weeks 9–11',
    title: 'Print & Document Services Deployment',
    topic: 'Print & Remote Services',
    difficulty: 'Advanced',
    estimatedMinutes: 4,
    description:
      'Level 21: Installing Print & Document Services, deploying shared network printers, managing print queues/spoolers, and troubleshooting print jobs.',
    questions: [
      {
        id: 'd21-q1',
        question: 'What is the main benefit of deploying printers through Windows Server Print and Document Services instead of installing them manually on 40 workstations?',
        options: [
          'Centralized print queue management, driver distribution, Active Directory publishing, and unified access control',
          'Printers no longer require ink or paper',
          'Printers automatically become Wi-Fi routers',
          'It removes the need for printer drivers',
        ],
        correctIndex: 0,
        explanation:
          'Print Management centralizes driver updates, user permissions, and print queue monitoring across the entire network.',
        sysmodPrinciple: 'Weeks 9–11 · Centralized Print Services',
      },
      {
        id: 'd21-q2',
        question: 'When deploying a standalone network printer on a LAN, why should you assign it a Static IP (or DHCP Reservation) for its Standard TCP/IP Port?',
        options: [
          'If the printer IP changes, client computers and the print server lose connection to the printer port',
          'Network printers reject IPv4 addresses',
          'Static IPs make printers print in color only',
          'Dynamic IPs erase printer firmware',
        ],
        correctIndex: 0,
        explanation:
          'Standard TCP/IP print ports target a fixed IP address; keeping the printer IP static ensures uninterrupted printing.',
        sysmodPrinciple: 'Weeks 9–11 · Network Printer Port Stability',
      },
      {
        id: 'd21-q3',
        question: 'A print queue freezes with a corrupted job stuck at "Deleting" and blocks 12 other users from printing. What is the clean administrative fix?',
        options: [
          'Stop the Print Spooler service, clear the stuck files in `C:\\Windows\\System32\\spool\\PRINTERS`, and restart Print Spooler',
          'Reinstall Windows Server from scratch',
          'Replace the network switch',
          'Change the domain name',
        ],
        correctIndex: 0,
        explanation:
          'Stopping the Spooler releases file locks on stuck `.SPL`/`.SHD` queue files so clearing the spool directory restores normal printing immediately.',
        sysmodPrinciple: 'Weeks 9–11 · Print Spooler Recovery',
      },
      {
        id: 'd21-q4',
        question: 'How can an administrator ensure Faculty print jobs always print ahead of Student print jobs on a single shared laboratory laser printer?',
        options: [
          'Create two logical printers pointing to the same physical port—assign higher Priority (e.g., 99) to the Faculty queue and Priority 1 to the Student queue',
          'Unplug student Ethernet cables whenever a teacher prints',
          'Install two different operating systems on the printer',
          'Disable the Print Spooler service',
        ],
        correctIndex: 0,
        explanation:
          'Windows Print Services supports logical printer priorities (1–99), automatically dispatching higher-priority queues ahead of lower-priority ones.',
        sysmodPrinciple: 'Weeks 9–11 · Print Priority & Queue Management',
      },
      {
        id: 'd21-q5',
        question: 'What does "Printer Pooling" accomplish in a high-volume school printing room?',
        options: [
          'Links two or more identical physical printers to one logical printer name so heavy print jobs automatically route to whichever printer is free',
          'Submerges printers in water for cooling',
          'Blocks all printing after 5 PM',
          'Converts black-and-white printers into 3D scanners',
        ],
        correctIndex: 0,
        explanation:
          'Printer pooling load-balances print traffic across multiple identical physical printers located together under a single shared queue.',
        sysmodPrinciple: 'Weeks 9–11 · High-Volume Document Delivery',
      },
    ],
  },

  // ================= DAY 22 · LEVEL 22 =================
  {
    id: 'day-22',
    code: 'DAY 22 · LV.22',
    dayNumber: 22,
    level: 22,
    weekRef: 'Weeks 9–11',
    title: 'Remote Desktop Services (RDS), Web Access & RD Gateway',
    topic: 'Print & Remote Services',
    difficulty: 'Advanced',
    estimatedMinutes: 4,
    description:
      'Level 22: Configuring RDS Session Host, RD Web Access, and RD Gateway, and securing remote desktop connections.',
    questions: [
      {
        id: 'd22-q1',
        question: 'Which Remote Desktop Services (RDS) role hosts the actual Windows desktop sessions and RemoteApp programs that remote clients connect to?',
        options: [
          'Remote Desktop Session Host (RD Session Host)',
          'DHCP Relay Agent',
          'Print Spooler',
          'DNS Forwarder',
        ],
        correctIndex: 0,
        explanation:
          'RD Session Host provides the multi-session compute environment executing remote desktops and centralized applications for users.',
        sysmodPrinciple: 'Weeks 9–11 · Remote Access Lab (RDS)',
      },
      {
        id: 'd22-q2',
        question: 'What is the primary security advantage of using an RD Gateway instead of exposing TCP Port 3389 directly to the public Internet?',
        options: [
          'RD Gateway encapsulates RDP traffic inside encrypted HTTPS (Port 443) and enforces authorization policies before reaching internal hosts',
          'RD Gateway removes all passwords from Windows',
          'Port 3389 does not work on TCP/IP',
          'RD Gateway turns off server firewalls completely',
        ],
        correctIndex: 0,
        explanation:
          'Direct Internet exposure of Port 3389 invites brute-force attacks; RD Gateway tunnels sessions securely over TLS/HTTPS on Port 443.',
        sysmodPrinciple: 'Weeks 9–11 · Gateway to the Cloud (RD Gateway)',
      },
      {
        id: 'd22-q3',
        question: 'How does Remote Desktop Web Access (RD Web Access) simplify connecting for remote staff or students?',
        options: [
          'It provides a secure web portal where authorized users log in via a browser to launch assigned RemoteApps and remote desktops',
          'It physically mails a laptop to each user',
          'It replaces the need for Active Directory accounts',
          'It only works without an internet connection',
        ],
        correctIndex: 0,
        explanation:
          'RD Web Access integrates with IIS to publish remote desktops and apps cleanly through a browser portal.',
        sysmodPrinciple: 'Weeks 9–11 · RDS Deployment Types',
      },
      {
        id: 'd22-q4',
        question: 'A standard non-admin user tries to log in via Remote Desktop to a workstation, even though RDP is enabled, and gets "The connection was denied because the user account is not authorized for remote login." What is missing?',
        options: [
          'The user account must be added to the `Remote Desktop Users` group',
          'The monitor needs a brighter backlight',
          'The server needs a second hard drive',
          'The Ethernet cable must be crossover',
        ],
        correctIndex: 0,
        explanation:
          'By default only Administrators can connect via RDP; standard users require membership in the Remote Desktop Users group.',
        sysmodPrinciple: 'Weeks 9–11 · Least-Privilege Remote Authorization',
      },
      {
        id: 'd22-q5',
        question: 'Why should Network Level Authentication (NLA) remain enabled on Remote Desktop hosts?',
        options: [
          'NLA authenticates the user BEFORE establishing a full remote desktop session, conserving server resources and reducing pre-auth attack exposure',
          'NLA disables encryption for faster typing',
          'NLA allows anonymous guest logins',
          'NLA automatically deletes Event Viewer logs',
        ],
        correctIndex: 0,
        explanation:
          'NLA verifies credentials up front, protecting the RD Session Host against denial-of-service session exhaustion and pre-authentication exploits.',
        sysmodPrinciple: 'Weeks 9–11 · Hardened Remote Desktop Security',
      },
    ],
  },

  // ================= DAY 23 · LEVEL 23 =================
  {
    id: 'day-23',
    code: 'DAY 23 · LV.23',
    dayNumber: 23,
    level: 23,
    weekRef: 'Weeks 9–11',
    title: 'Desktop & Laptop Hardware Troubleshooting',
    topic: 'System Troubleshooting',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 23: Diagnosing complex power, display, overheating, compatibility, and storage faults on desktops and laptops.',
    questions: [
      {
        id: 'd23-q1',
        question: 'A classroom desktop powers on, fans spin, Startup Code reads `00`, and the monitor power LED is solid amber showing "NO SIGNAL". Which structured check isolates the fault fastest?',
        options: [
          'Inspect and test the HDMI/DisplayPort cable seating, verify the monitor input source, and confirm the cable is plugged into the GPU port',
          'Immediately format the SSD and reinstall Windows',
          'Replace the CPU thermal paste first',
          'Re-crimp the Ethernet LAN cable',
        ],
        correctIndex: 0,
        explanation:
          'POST code `00` shows the PC booted normally; "NO SIGNAL" with an amber monitor LED points directly to the display cable, input source, or GPU output.',
        sysmodPrinciple: 'Weeks 9–11 · PC & Laptop Doctor (Display Faults)',
      },
      {
        id: 'd23-q2',
        question: 'A computer shuts off abruptly every time a student exports a 1080p video, and a multimeter measures +12V dropping to 11.12V under load while CPU temperature stays at 62°C. What is the confirmed root cause?',
        options: [
          'CPU thermal overheating',
          'Failing Power Supply Unit (PSU) with +12V rail voltage droop below the 11.40V ATX ±5% minimum',
          'Corrupted DNS server cache',
          'A dead CR2032 CMOS battery',
        ],
        correctIndex: 1,
        explanation:
          'Safe 62°C temperatures rule out overheating, while 11.12V violates the 11.40V–12.60V ATX tolerance, proving PSU rail collapse under load.',
        sysmodPrinciple: 'Weeks 9–11 · Quantitative Power Isolation',
      },
      {
        id: 'd23-q3',
        question: 'A laptop LCD screen is completely black, yet plugging an external HDMI monitor into the laptop shows a crisp, normal Windows desktop. What does this diagnostic test prove?',
        options: [
          'The laptop GPU and OS are working; the fault lies in the laptop internal LCD panel, display ribbon cable, or backlight',
          'The laptop hard drive is completely dead',
          'Windows Defender blocked the screen',
          'The laptop RAM is incompatible',
        ],
        correctIndex: 0,
        explanation:
          'Clean external output eliminates the motherboard GPU and OS driver, isolating the defect to the internal LCD assembly or eDP/LVDS ribbon cable.',
        sysmodPrinciple: 'Weeks 9–11 · Laptop Display Differential Diagnosis',
      },
      {
        id: 'd23-q4',
        question: 'A PC reports "Reboot and Select Proper Boot Device", and the BIOS does not detect the SATA SSD at all. What hardware check should precede buying a new drive?',
        options: [
          'Inspect and swap the SATA data cable and verify SATA power connectivity from the PSU',
          'Replace the case cooling fans',
          'Reset the router Wi-Fi password',
          'Upgrade the monitor to 4K',
        ],
        correctIndex: 0,
        explanation:
          'Kinked or loose SATA data/power cables commonly prevent BIOS drive detection and should always be verified before condemning the SSD.',
        sysmodPrinciple: 'Weeks 9–11 · Storage Interface Verification',
      },
      {
        id: 'd23-q5',
        question: 'Every morning when powered on, a desktop resets its date to January 1, 2019 and loses its custom boot order. A multimeter reads 1.85V across the motherboard coin cell. What is the exact fix?',
        options: [
          'Replace the depleted CR2032 3V CMOS battery and reconfigure BIOS date/boot order',
          'Replace the 550W Power Supply',
          'Run Disk Defragmenter',
          'Install a new graphics driver',
        ],
        correctIndex: 0,
        explanation:
          'A healthy CR2032 lithium cell reads ~3.0–3.2V; below ~2.7V it can no longer retain RTC clock and CMOS configuration memory when AC power is off.',
        sysmodPrinciple: 'Weeks 9–11 · CMOS Voltage Diagnosis',
      },
    ],
  },

  // ================= DAY 24 · LEVEL 24 =================
  {
    id: 'day-24',
    code: 'DAY 24 · LV.24',
    dayNumber: 24,
    level: 24,
    weekRef: 'Weeks 9–11',
    title: 'Laptop Upgrades, Driver Crashes & Malware Remediation',
    topic: 'System Troubleshooting',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 24: Safe laptop hardware upgrades (RAM, SSD, battery, keyboard), BSOD driver repair, and malware/virus eradication.',
    questions: [
      {
        id: 'd24-q1',
        question: 'Before replacing a laptop RAM module (SO-DIMM), keyboard, or internal SSD, what critical laptop-specific OHS step must you take after unplugging the AC adapter?',
        options: [
          'Disconnect the internal lithium-ion battery connector from the motherboard and hold the power button 10 seconds to drain residual charge',
          'Leave the laptop in Sleep Mode so it wakes faster',
          'Keep the battery connected so the LEDs stay lit',
          'Place the laptop on a metallic baking tray',
        ],
        correctIndex: 0,
        explanation:
          'Even when shut down, a connected internal battery keeps motherboard power rails live; disconnecting it prevents catastrophic short circuits.',
        sysmodPrinciple: 'Weeks 9–11 · Upgrade & Fix Lab (Laptop OHS)',
      },
      {
        id: 'd24-q2',
        question: 'A workstation frequently crashes with BSOD `VIDEO_TDR_FAILURE (nvlddmkm.sys)` immediately after a rushed driver update, while hardware temperatures and voltages test normal. What is the best remediation?',
        options: [
          'Boot into Safe Mode, perform a clean display driver removal (DDU), and install the verified stable WHQL driver',
          'Replace the motherboard immediately',
          'Delete the C:\\Windows folder manually',
          'Unplug the LAN cable permanently',
        ],
        correctIndex: 0,
        explanation:
          'A clean Safe Mode uninstall eliminates corrupted display driver remnants before installing a stable vendor-signed release.',
        sysmodPrinciple: 'Weeks 9–11 · OS & Driver Crash Remediation',
      },
      {
        id: 'd24-q3',
        question: 'A student PC shows 96% idle CPU usage from an unfamiliar process (`svchost_miner.exe`), antivirus is turned off, and browser tabs redirect to ad sites. What is the structured cleanup sequence?',
        options: [
          'Disconnect from the network, scan and quarantine the malware with updated security tools, restore Defender/proxy/hosts settings, and verify clean startup',
          'Buy a larger monitor to see the ads better',
          'Add more thermal paste to the CPU',
          'Disable the keyboard driver',
        ],
        correctIndex: 0,
        explanation:
          'Isolating the host prevents lateral spread, followed by full antimalware quarantine and restoring altered security/browser/hosts settings.',
        sysmodPrinciple: 'Weeks 9–11 · Malware Eradication Protocol',
      },
      {
        id: 'd24-q4',
        question: 'You are upgrading a slow laptop from a mechanical 5400-RPM HDD to an NVMe/SATA SSD and adding a second 8GB RAM stick. What must you verify before purchasing the new RAM stick?',
        options: [
          'Matching form factor (SO-DIMM), memory generation (DDR4 vs. DDR5), supported speed/voltage, and maximum motherboard RAM capacity',
          'Only that the sticker color matches the laptop lid',
          'That it is a full-length desktop DIMM stick',
          'That it has an RJ-45 port attached',
        ],
        correctIndex: 0,
        explanation:
          'Laptops use compact SO-DIMM modules; mismatched DDR generation or exceeding chipset limits prevents the laptop from booting.',
        sysmodPrinciple: 'Weeks 9–11 · Hardware Upgrade Compatibility',
      },
      {
        id: 'd24-q5',
        question: 'After replacing a swollen lithium-ion laptop battery, how should the old swollen battery be handled?',
        options: [
          'Puncture it with a screwdriver to release the air',
          'Throw it in regular classroom paper trash',
          'Place it carefully in a fire-safe container without bending/puncturing and turn it over to certified e-waste battery disposal',
          'Reinstall it into another spare laptop',
        ],
        correctIndex: 2,
        explanation:
          'Swollen lithium-ion cells pose a severe thermal runaway and fire hazard; never puncture or crush them—follow hazardous e-waste OHS rules.',
        sysmodPrinciple: 'Weeks 9–11 · Hazardous Battery OHS Disposal',
      },
    ],
  },

  // ================= DAY 25 · LEVEL 25 =================
  {
    id: 'day-25',
    code: 'DAY 25 · LV.25',
    dayNumber: 25,
    level: 25,
    weekRef: 'Weeks 9–11',
    title: 'Network Troubleshooting with CLI Tools',
    topic: 'Network Troubleshooting',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 25: Mastering `ipconfig`, `ping`, `tracert`, `netstat`, and `nslookup` to pinpoint and repair complex network failures.',
    questions: [
      {
        id: 'd25-q1',
        question: 'Which command displays every hop (router) a packet crosses between your workstation and a remote server, pinpointing exactly where a connection drops?',
        options: ['tracert (traceroute)', 'chkdsk', 'sfc /scannow', 'format'],
        correctIndex: 0,
        explanation:
          '`tracert` sends incremental TTL probes to reveal each router hop and latency along the path, exposing whether failure occurs inside the LAN or at the ISP.',
        sysmodPrinciple: 'Weeks 9–11 · Network Detective (Path Tracing)',
      },
      {
        id: 'd25-q2',
        question: 'Which command-line tool lists active TCP/UDP network connections, listening ports, and the owning process IDs (`-ano`) to spot unauthorized connections or port conflicts?',
        options: ['netstat -ano', 'diskpart', 'hostname', 'cls'],
        correctIndex: 0,
        explanation:
          '`netstat -ano` reveals active sockets, listening ports (e.g., Port 80, 443, 3389), and PIDs for diagnosing service conflicts or malware callbacks.',
        sysmodPrinciple: 'Weeks 9–11 · Active Port & Socket Inspection',
      },
      {
        id: 'd25-q3',
        question: 'A PC has a valid LAN IP (`192.168.10.55`), can ping the gateway (`192.168.10.1`) and `8.8.8.8`, yet browsers cannot open any website. Running `ipconfig /all` shows DNS Server = `10.99.99.99`. What two commands/steps fix this cleanly?',
        options: [
          'Set IPv4 DNS back to Automatic (or valid campus DNS) and run `ipconfig /flushdns`',
          'Replace the CPU cooling fan and run `chkdsk`',
          'Format Drive C: and reinstall Windows',
          'Disconnect the monitor HDMI cable',
        ],
        correctIndex: 0,
        explanation:
          'Pinging `8.8.8.8` proves routing works; restoring valid DNS and flushing the stale DNS resolver cache restores web browsing immediately.',
        sysmodPrinciple: 'Weeks 9–11 · Connectivity Rescue Lab (DNS Fix)',
      },
      {
        id: 'd25-q4',
        question: 'What is the purpose of running `ipconfig /release` followed by `ipconfig /renew` on a Windows client?',
        options: [
          'Drops the current DHCP IP lease and requests a fresh IP, gateway, and DNS configuration from the DHCP server',
          'Deletes all saved Wi-Fi passwords permanently',
          'Resets the BIOS CMOS clock',
          'Tests the physical copper pins inside the RJ-45 plug',
        ],
        correctIndex: 0,
        explanation:
          'Releasing and renewing forces a new DHCP negotiation, resolving stale leases or newly updated DHCP scope options.',
        sysmodPrinciple: 'Weeks 9–11 · DHCP Lease Remediation',
      },
      {
        id: 'd25-q5',
        question: 'A user reports "No Internet" on Wi-Fi, while a wired PC on the same router works fine. `ipconfig` shows the Wi-Fi adapter says "Media disconnected." What should you check first?',
        options: [
          'Verify the laptop hardware Wi-Fi switch/Airplane Mode, WLAN AutoConfig service, and Access Point SSID broadcast',
          'Replace the school main fiber router',
          'Reinstall Microsoft Word',
          'Replace the SATA SSD cable',
        ],
        correctIndex: 0,
        explanation:
          'Working wired PCs prove the router and ISP are up; "Media disconnected" on Wi-Fi isolates the fault to the client wireless radio, Airplane Mode, or AP.',
        sysmodPrinciple: 'Weeks 9–11 · Wireless vs. Wired Isolation',
      },
    ],
  },

  // ================= DAY 26 · LEVEL 26 =================
  {
    id: 'day-26',
    code: 'DAY 26 · LV.26',
    dayNumber: 26,
    level: 26,
    weekRef: 'Weeks 9–11',
    title: 'Server Crisis Troubleshooting & Security Stabilization',
    topic: 'Server Troubleshooting',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 26: Resolving server outages, DNS/ADDS failures, high-traffic bottlenecks, NOS errors, and security vulnerabilities.',
    questions: [
      {
        id: 'd26-q1',
        question: 'All 40 lab workstations suddenly fail to log into the domain and cannot resolve internal server names, even though ping by IP to the server succeeds. Which server service should you inspect first?',
        options: [
          'DNS Server and Active Directory Domain Services (NTDS / Netlogon) status in Server Manager and Event Viewer',
          'The audio driver on the server',
          'Client monitor brightness settings',
          'The USB mouse port on PC-01',
        ],
        correctIndex: 0,
        explanation:
          'IP reachability confirms the network link is alive, so mass domain login + name resolution failure points straight to stopped DNS or ADDS services.',
        sysmodPrinciple: 'Weeks 9–11 · Server Crisis Simulation',
      },
      {
        id: 'd26-q2',
        question: 'During peak enrollment, the school IIS web portal slows to a crawl. Server Task Manager / Performance Monitor shows RAM at 99% and Disk Queue Length spiking. What bottleneck is occurring?',
        options: [
          'Memory exhaustion causing heavy disk paging (swapping) under high concurrent traffic',
          'A loose HDMI cable on the server monitor',
          'A dead CMOS coin battery',
          'Wrong keyboard language layout',
        ],
        correctIndex: 0,
        explanation:
          'When physical RAM saturates, Windows swaps memory pages to disk, spiking disk I/O and degrading response times; optimizing pools or expanding RAM fixes it.',
        sysmodPrinciple: 'Weeks 9–11 · Server Performance Bottleneck Analysis',
      },
      {
        id: 'd26-q3',
        question: 'In Event Viewer on Windows Server, you spot thousands of failed Audit Logon events (Event ID 4625) targeting the `Administrator` account every minute from an external IP. What attack is occurring and what is the urgent fix?',
        options: [
          'A brute-force credential attack; block the offending source/disable direct public RDP exposure, enforce Account Lockout Policy, and use RD Gateway/VPN',
          'Normal scheduled Windows updates',
          'A harmless printer toner warning',
          'A normal DHCP lease renewal',
        ],
        correctIndex: 0,
        explanation:
          'Rapid Event ID 4625 failures indicate brute-force login attempts requiring immediate perimeter lockdown, strong passwords, and lockout policies.',
        sysmodPrinciple: 'Weeks 9–11 · Secure & Stabilize Lab',
      },
      {
        id: 'd26-q4',
        question: 'Half of the lab PCs stop receiving IP addresses mid-morning while existing PCs continue working. On the DHCP Server, the Scope icon shows a red alert indicating 100% Address Pool usage. What caused this?',
        options: [
          'DHCP Scope exhaustion—too many active/stale leases filled the IP pool; shorten lease duration, expand the scope range, or reconcile/clear stale leases',
          'The IIS web service was paused',
          'The server monitor went to sleep',
          'The printer ran out of paper',
        ],
        correctIndex: 0,
        explanation:
          'When all IPs in a DHCP scope are leased out (especially with long leases and BYOD/guest devices), new clients cannot obtain addresses until pool space is freed.',
        sysmodPrinciple: 'Weeks 9–11 · DHCP Pool Exhaustion Recovery',
      },
      {
        id: 'd26-q5',
        question: 'After resolving a critical server outage, why must the administrator review Event Viewer logs and test client-side workflows (domain login, DNS, shares, web access) before closing the incident?',
        options: [
          'To confirm root-cause eradication, verify zero cascading errors remain, and validate end-to-end service restoration from the user perspective',
          'Because servers automatically delete all files if logs are not opened',
          'To increase the number of turnarounds',
          'Only to change the server desktop background',
        ],
        correctIndex: 0,
        explanation:
          'Service restoration is only verified when both server health logs and real client tests pass cleanly.',
        sysmodPrinciple: 'Weeks 9–11 · End-to-End Server Verification',
      },
    ],
  },

  // ================= DAY 27 · LEVEL 27 =================
  {
    id: 'day-27',
    code: 'DAY 27 · LV.27',
    dayNumber: 27,
    level: 27,
    weekRef: 'Weeks 9–11',
    title: 'Preventive System Maintenance, Backups & Data Integrity',
    topic: 'Preventive Maintenance',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 27: Preventive hardware cleaning, OS updates, startup optimization, backups, Disk Cleanup, Defragmentation/TRIM, and Check Disk.',
    questions: [
      {
        id: 'd27-q1',
        question: 'What is the fundamental difference between Preventive Maintenance and Corrective Maintenance?',
        options: [
          'Preventive maintenance performs scheduled cleaning, updates, and backups BEFORE failures happen; corrective maintenance repairs faults AFTER a breakdown occurs',
          'Preventive maintenance only happens after a motherboard burns out',
          'Corrective maintenance does not require tools',
          'Both terms mean throwing away old computers',
        ],
        correctIndex: 0,
        explanation:
          'Proactive preventive maintenance extends hardware lifespan and minimizes unexpected classroom or business downtime.',
        sysmodPrinciple: 'Weeks 9–11 · Total System Tune-Up Challenge',
      },
      {
        id: 'd27-q2',
        question: 'Why should you optimize a Solid-State Drive (SSD) using TRIM rather than traditional mechanical HDD full Defragmentation?',
        options: [
          'SSDs have no spinning platters, and traditional defragmentation causes unnecessary write wear that shortens flash memory lifespan',
          'SSDs cannot store Windows system files',
          'TRIM physically cleans dust off the motherboard',
          'Defragmentation makes SSDs turn into RAM',
        ],
        correctIndex: 0,
        explanation:
          'Windows Optimize Drives automatically runs TRIM on SSDs to clear stale blocks without inflicting heavy unnecessary write cycles.',
        sysmodPrinciple: 'Weeks 9–11 · SSD vs. HDD Maintenance Discipline',
      },
      {
        id: 'd27-q3',
        question: 'Which command checks a Windows drive for file system corruption and bad sectors and repairs logical errors (`chkdsk C: /f`)?',
        options: ['Check Disk (`chkdsk`)', 'ipconfig /all', 'nslookup', 'ping -t'],
        correctIndex: 0,
        explanation:
          '`chkdsk` verifies NTFS metadata integrity and fixes cross-linked or corrupted file system structures.',
        sysmodPrinciple: 'Weeks 9–11 · Data & Security Rescue Lab',
      },
      {
        id: 'd27-q4',
        question: 'What is the industry-standard 3-2-1 Backup Rule for safeguarding critical organizational or student lab data?',
        options: [
          'Keep 3 copies of data, on 2 different storage media types, with at least 1 copy stored off-site or in secure cloud storage',
          'Back up only 3 files once every 2 years on 1 USB drive',
          'Delete 3 folders and keep 1 password',
          'Install 3 antivirus apps on 1 hard drive',
        ],
        correctIndex: 0,
        explanation:
          'The 3-2-1 strategy protects data integrity against single-drive failures, ransomware, and physical site disasters like fire or flood.',
        sysmodPrinciple: 'Weeks 9–11 · Data Integrity & Backup Resilience',
      },
      {
        id: 'd27-q5',
        question: 'A computer takes 3 minutes to become usable after Windows login even though its SSD is healthy. Which maintenance task in Task Manager directly improves boot responsiveness?',
        options: [
          'Disabling unnecessary high-impact Startup applications and uninstalling unused bloatware',
          'Increasing screen brightness',
          'Unplugging the case cooling fans',
          'Deleting the display driver',
        ],
        correctIndex: 0,
        explanation:
          'Managing startup programs prevents dozens of background updaters and unused apps from saturating CPU and disk I/O at login.',
        sysmodPrinciple: 'Weeks 9–11 · Startup & Resource Optimization',
      },
    ],
  },

  // ================= DAY 28 · LEVEL 28 =================
  {
    id: 'day-28',
    code: 'DAY 28 · LV.28',
    dayNumber: 28,
    level: 28,
    weekRef: 'Weeks 9–11',
    title: 'Network & Server Preventive Maintenance & Optimization',
    topic: 'Preventive Maintenance',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 28: Maintaining switches, routers, firmware, server backups, security patching, and proactive performance monitoring.',
    questions: [
      {
        id: 'd28-q1',
        question: 'Why is updating router and managed switch firmware on a scheduled maintenance window essential for network security and stability?',
        options: [
          'Firmware updates patch newly discovered security vulnerabilities and resolve stability bugs in network hardware',
          'Firmware updates physically add more RJ-45 ports to the switch',
          'Firmware updates remove the need for electricity',
          'Firmware updates turn UTP cables into wireless antennas',
        ],
        correctIndex: 0,
        explanation:
          'Outdated router/switch firmware is a prime target for exploits; planned updates with prior config backups keep networks secure and stable.',
        sysmodPrinciple: 'Weeks 9–11 · Network Care & Security Lab',
      },
      {
        id: 'd28-q2',
        question: 'Before applying a major Windows Server security patch or firmware update to a production server, what critical precaution must an administrator complete?',
        options: [
          'Verify a fresh, restorable system/data backup (or VM snapshot) and schedule the update during an off-peak maintenance window',
          'Unplug the UPS battery backup',
          'Delete all Active Directory user accounts',
          'Turn off the server cooling fans',
        ],
        correctIndex: 0,
        explanation:
          'Verified backups provide a fast rollback safety net if a patch introduces driver or application incompatibility.',
        sysmodPrinciple: 'Weeks 9–11 · Safe Server Change Management',
      },
      {
        id: 'd28-q3',
        question: 'What role does an Uninterruptible Power Supply (UPS) play in server and network rack maintenance?',
        options: [
          'Provides clean battery backup during power brownouts/outages so servers can stay online or perform a graceful shutdown without corrupting databases',
          'Boosts Wi-Fi download speeds by 500%',
          'Replaces the need for network switches',
          'Automatically repairs broken monitor screens',
        ],
        correctIndex: 0,
        explanation:
          'Sudden power loss corrupts Active Directory databases and RAID/file systems; a healthy UPS protects server uptime and data integrity.',
        sysmodPrinciple: 'Weeks 9–11 · Power Resilience & Hardware Care',
      },
      {
        id: 'd28-q4',
        question: 'In "Server Performance Watch", why do administrators track CPU, Memory, Disk, and Network baselines over several weeks instead of looking at a single 5-second snapshot?',
        options: [
          'Trend data distinguishes normal daily peak usage from gradual memory leaks, growing disk bottlenecks, or abnormal traffic spikes',
          'Because Windows Server hides CPU graphs for the first 5 seconds',
          'Only to fill extra pages in a binder',
          'To slow down the server intentionally',
        ],
        correctIndex: 0,
        explanation:
          'Longitudinal baselines reveal creeping resource exhaustion before it turns into an unscheduled server crash.',
        sysmodPrinciple: 'Weeks 9–11 · Proactive Trend Monitoring',
      },
      {
        id: 'd28-q5',
        question: 'During a Network Health Check, you discover a backup file has been running nightly for 6 months, but nobody has ever tested restoring from it. Why is this a major operational risk?',
        options: [
          'An untested backup may be silently corrupted or incomplete; periodic test restores are required to prove recoverability',
          'Backups automatically fix hardware cables',
          'Testing a restore permanently erases the original server',
          'Backups do not need verification once scheduled',
        ],
        correctIndex: 0,
        explanation:
          'In IT operations, an unverified backup is not a guaranteed backup; scheduled restore drills confirm actual disaster recovery readiness.',
        sysmodPrinciple: 'Weeks 9–11 · Secure & Backup Verification',
      },
    ],
  },

  // ================= DAY 29 · LEVEL 29 =================
  {
    id: 'day-29',
    code: 'DAY 29 · LV.29',
    dayNumber: 29,
    level: 29,
    weekRef: 'Weeks 9–11',
    title: 'Job Service Orders (JSO) & Technical Reporting',
    topic: 'Documentation & Reporting',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 29: Completing accurate Job Service Order forms, distinguishing Reported Problem vs. Initial Inspection vs. Action Taken, and compiling service reports.',
    questions: [
      {
        id: 'd29-q1',
        question: 'On a standard Job Service Order (JSO), what is the difference between "Reported Problem" and "Initial Inspection"?',
        options: [
          '"Reported Problem" records the symptom described by the client/user; "Initial Inspection" records the objective technical fault discovered by the technician using diagnostic tools',
          'Both rows should be left completely blank',
          '"Initial Inspection" is written by the client before bringing the PC',
          '"Reported Problem" lists the repair bill total',
        ],
        correctIndex: 0,
        explanation:
          'Separating client symptoms from objective diagnostic findings ensures traceability and proves the root cause was verified before repair.',
        sysmodPrinciple: 'Weeks 9–11 · Service Order Detective (JSO Accuracy)',
      },
      {
        id: 'd29-q2',
        question: 'Why does an official Job Service Order include both a "Technician" signature/name line and a "User Signature" line?',
        options: [
          'It establishes mutual accountability: the technician certifies the repair was tested, and the client confirms receiving the computer in verified functional condition',
          'To practice handwriting styles',
          'So the computer boots faster',
          'To replace the computer serial number',
        ],
        correctIndex: 0,
        explanation:
          'Dual sign-off protects both the service technician and client by documenting formal acceptance and post-repair system status.',
        sysmodPrinciple: 'Weeks 9–11 · Accountability & Sign-Off Protocol',
      },
      {
        id: 'd29-q3',
        question: 'Which entry is the MOST professional and verifiable way to write "Action Taken" on a JSO?',
        options: [
          '"Fixed it somehow"',
          '"Replaced faulty Cat6 RJ-45 plug (T568B), verified 8-pin continuity, restored automatic DNS, and confirmed 11ms ping & web access"',
          '"Touched some cables and restarted"',
          '"Computer works now maybe"',
        ],
        correctIndex: 1,
        explanation:
          'Specific, measurable documentation of parts replaced, settings changed, and verification readings creates a reliable maintenance history.',
        sysmodPrinciple: 'Weeks 9–11 · Precision Technical Reporting',
      },
      {
        id: 'd29-q4',
        question: 'When compiling a monthly "Job Report Challenge" summarizing 25 completed JSOs from a school computer laboratory, what insight helps prevent recurring breakdowns?',
        options: [
          'Grouping repeat failure patterns (e.g., 10 PCs overheating from dust) to recommend targeted preventive maintenance schedules',
          'Deleting all failed tickets to make the report shorter',
          'Sorting forms solely by the client first name',
          'Omitting all hardware replacement records',
        ],
        correctIndex: 0,
        explanation:
          'Aggregating JSO records uncovers systemic lab issues—such as dust buildup, aging PSUs, or poor ventilation—so administrators can fix root causes proactively.',
        sysmodPrinciple: 'Weeks 9–11 · Consolidated Maintenance Analytics',
      },
      {
        id: 'd29-q5',
        question: 'Under what condition should the JSO "Status" row be marked `Functional`?',
        options: [
          'Only after all identified hardware and software faults are repaired AND post-repair functional verification tests pass completely',
          'Immediately as soon as the client drops off the broken PC',
          'Before turning the computer on to check display output',
          'Whenever the technician runs out of time',
        ],
        correctIndex: 0,
        explanation:
          'Marking a unit Functional without verification risks immediate repeat failure (turnarounds) and erodes client trust.',
        sysmodPrinciple: 'Weeks 9–11 · Verified Handover Standard',
      },
    ],
  },

  // ================= DAY 30 · LEVEL 30 =================
  {
    id: 'day-30',
    code: 'DAY 30 · LV.30',
    dayNumber: 30,
    level: 30,
    weekRef: 'Weeks 9–11',
    title: 'CSS Business Plan, Market Analysis, SWOT & Capstone Mastery',
    topic: 'IT Entrepreneurship & Capstone',
    difficulty: 'Advanced',
    estimatedMinutes: 5,
    description:
      'Level 30 (Mastery): Market analysis, SWOT & feasibility planning for a CSS IT business, and integrated systems/network/server decision-making.',
    questions: [
      {
        id: 'd30-q1',
        question: 'In a SWOT Analysis for a proposed local Computer Systems Servicing shop, which pair correctly distinguishes an INTERNAL Strength from an EXTERNAL Opportunity?',
        options: [
          'Strength: Certified NC II CSS technicians with structured SYSMOD diagnostics; Opportunity: Growing demand from nearby schools and remote-work households needing PC maintenance',
          'Strength: Rising electricity bills; Opportunity: Broken workshop tools',
          'Strength: New rival repair shop next door; Opportunity: Lack of startup capital',
          'Strength: Unplanned power outages; Opportunity: Outdated diagnostic gear',
        ],
        correctIndex: 0,
        explanation:
          'Strengths and Weaknesses are internal capabilities of your business, while Opportunities and Threats arise from the external market environment.',
        sysmodPrinciple: 'Weeks 9–11 · SWOT & Feasibility Lab',
      },
      {
        id: 'd30-q2',
        question: 'What three core dimensions must a Feasibility Study evaluate before launching a Computer Systems Servicing business?',
        options: [
          'Technical feasibility (skills/tools), Financial feasibility (startup cost, pricing, break-even), and Operational/Market feasibility (workflow, target clients, demand)',
          'Only logo font, shop wall paint, and music playlist',
          'Only buying the most expensive gaming monitors',
          'Guessing revenue without analyzing competitors or expenses',
        ],
        correctIndex: 0,
        explanation:
          'Evaluating technical, financial, and operational/market feasibility ensures the IT service venture is viable and sustainable.',
        sysmodPrinciple: 'Weeks 9–11 · Strategic Feasibility Planning',
      },
      {
        id: 'd30-q3',
        question: 'During a "Market Explorer Challenge", why should a TechPreneur analyze local competitors before finalizing service packages?',
        options: [
          'To identify unmet client needs, benchmark fair pricing, and differentiate through faster turnaround, transparent JSOs, or preventive maintenance contracts',
          'To copy competitors blindly without calculating costs',
          'To avoid offering warranties or receipts',
          'To eliminate all diagnostic testing',
        ],
        correctIndex: 0,
        explanation:
          'Competitor analysis reveals service gaps—like structured diagnostic reports and preventive plans—that give a CSS startup a competitive edge.',
        sysmodPrinciple: 'Weeks 9–11 · Market Analysis & Differentiation',
      },
      {
        id: 'd30-q4',
        question: 'In the Capstone Corporate IT Simulation, a client PC cannot access the intranet site `http://portal.techcare.local`. Ping to the server IP works, IIS is running, but `nslookup portal.techcare.local` times out. What is the precise multi-layer fix?',
        options: [
          'Verify the DNS Server service is running on the DC, confirm the `portal` A-record exists in the `techcare.local` Forward Lookup Zone, and ensure the client DHCP Option 006 points to the internal DNS IP',
          'Re-crimp the server power cord',
          'Reinstall Windows on all client workstations',
          'Replace the monitor HDMI cable on every PC',
        ],
        correctIndex: 0,
        explanation:
          'Working IP ping + live IIS isolates the failure squarely to DNS service availability, missing A-records, or wrong client DNS settings from DHCP.',
        sysmodPrinciple: 'Capstone Mastery · Integrated Infrastructure Diagnostics',
      },
      {
        id: 'd30-q5',
        question: 'How does combining systematic troubleshooting (SYSMOD), verified Job Service Orders, and scheduled preventive maintenance strengthen a real-world IT service company ("TechCare Solutions")?',
        options: [
          'It minimizes costly repeat repairs (turnarounds), builds measurable client trust via documented JSOs, and creates recurring maintenance revenue',
          'It makes repairs take ten times longer on purpose',
          'It replaces the need for skilled CSS technicians',
          'It eliminates all hardware wear permanently',
        ],
        correctIndex: 0,
        explanation:
          'Technical excellence paired with clear documentation and preventive care directly translates CSS competence into sustainable business success.',
        sysmodPrinciple: 'Capstone Mastery · Fix, Maintain & Monetize',
      },
    ],
  },
];
