// Single source of truth for all portfolio copy.
// Items marked PLACEHOLDER must be replaced before launch.

export const site = {
  name: "Asyam Daffa' Tsaqif",
  title: "Security Engineer",
  url: "https://example.com", // PLACEHOLDER: your production domain
  description:
    "Security Engineer specializing in Endpoint Security & Management, Security Engineering, and vulnerability management.",
  email: "asyamdaff@gmail.com", // PLACEHOLDER
  linkedin: "https://www.linkedin.com/in/asyamdaffatsaqif", // PLACEHOLDER
  github: "https://github.com/asyamdaff", // PLACEHOLDER
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Security Engineer",
  headline: "Securing endpoints, strengthening operations, and reducing exposure across complex environments.",
  bio:
    "I work across enterprise endpoint and server Security Engineering, focusing on endpoint management, security compliance, and vulnerability remediation. My experience includes administering HCL BigFix, developing custom Fixlets and Analyses, implementing security solutions, and supporting Security Engineering through monitoring, troubleshooting, and automation.",
};




export const about = {
  paragraphs: [
    "I’m a Security Engineer with 2+ years of experience in cybersecurity, specializing in enterprise endpoint and server security. My work focuses on endpoint management, security compliance, and vulnerability remediation, with hands-on experience in HCL BigFix administration, custom Fixlet and Analysis development, infrastructure troubleshooting, security deployments, and operational reporting. At PT Q2 Technologies (CTI Group), assigned to CIMB Niaga, I work closely with security and application teams to maintain endpoint visibility, support security initiatives, and deliver regular operational reports across Windows, Linux, Unix, and macOS environments.",
    "My experience also extends to Security Operations, where I previously worked as an L1 SOC Analyst, supporting security monitoring and incident investigation across multiple client environments, including Sinarmas Group entities (Mining, Sekuritas, and Danamas) and PT Sarana Multi Infrastruktur (Persero). This role involved using ELK Stack and IBM QRadar for SIEM monitoring, alert triage, log analysis, incident investigation, and daily, weekly, and monthly reporting.",
  ],
  focus: [
    "Endpoint Security & Management",
    "Security Engineering",
    "Vulnerability Management",
  ],
};




export const skillGroups = [
  {
    title: "Endpoint Management & Security Platforms",
    items: [
      "HCL BigFix",
      "BigFix Compliance",
      "SentinelOne",
      "Trend Micro Deep Security",
      "Zscaler",
    ],
  },
  {
    title: "Data Protection & Security",
    items: [
      "Forcepoint DLP",
      "Seclore",
      "Ground Labs",
    ],
  },
  {
    title: "Security Monitoring & SIEM",
    items: [
      "ELK Stack",
      "IBM QRadar",
      "Log Analysis",
      "Alert Triage",
    ],
  },
  {
    title: "Vulnerability & Compliance",
    items: [
      "Nessus",
      "Security Compliance",
      "LAPS",
      "BitLocker",
    ],
  },
  {
    title: "Network & Access Security",
    items: [
      "Forescout",
      "Check Point VPN",
      "Firewall",
    ],
  },
  {
    title: "Remote Administration",
    items: [
      "PuTTY",
      "BigFix Remote Control",
      "IntelliAdmin",
      "Remote Desktop Protocol (RDP)",
      "TeamViewer",
    ],
  },
  {
    title: "Operating Systems",
    items: [
      "Windows",
      "Linux",
      "macOS",
      "Unix",
    ],
  },
  {
    title: "Scripting & Automation",
    items: [
      "PowerShell",
      "Bash",
      "BigFix Relevance",
      "BigFix Action Script",
    ],
  },
];

export const experience = [
  {
    role: "BigFix Security Engineer",
    org: "PT Q2 Technologies (CTI Group) · Assigned to CIMB Niaga",
    period: "Sep 2024 — Present",
    current: true,
    summary:
      "Manage enterprise endpoint and server Security Engineering through HCL BigFix, supporting endpoint management, security compliance, software deployment, and infrastructure maintenance.",
    points: [
      "Perform housekeeping across enterprise endpoints and servers to maintain system performance and operational stability.",
      "Troubleshoot and upgrade HCL BigFix agents across endpoint and server environments to improve security compatibility and maintain reliable operations.",
      "Develop and maintain custom BigFix Fixlets and Analyses using Relevance and Action Script to support security application deployment, endpoint visibility, and compliance monitoring.",
      "Create custom Analyses to identify macOS local administrator accounts and endpoint hard disk types for asset visibility and inventory management.",
      "Develop and test Fixlets for deploying and updating security applications, including Forcepoint DLP, Zscaler, BMC, SentinelOne, and TMDS across endpoints and servers.",
      "Collaborate with internal and security application teams to validate Fixlets and coordinate security tool deployments before production rollout.",
      "Compare BigFix inventory data with other systems to identify asset discrepancies and improve inventory accuracy.",
      "Prepare endpoint and server security posture reports covering LAPS, BitLocker, and BigFix compliance status.",
      "Escalate unresolved technical issues to HCL BigFix Support and coordinate further troubleshooting.",
    ],
  },
  {
    role: "SOC Analyst (L1)",
    org: "PT Q2 Technologies (CTI Group) · Assigned to Sinarmas",
    period: "Jun 2024 — Aug 2024",
    current: false,
    summary:
      "Supported first-line Security Engineering Center activities through 24/7 security event monitoring, alert triage, log analysis, incident investigation, and escalation.",
    points: [
      "Monitored network security events from customer environments and responded according to established security policies and SOC procedures.",
      "Reviewed and analyzed security alerts using SIEM platforms, including ELK Stack and IBM QRadar.",
      "Performed initial investigation of suspicious activities and escalated security events requiring further analysis.",
      "Analyzed system and security log files, including forensic analysis of system resource access.",
      "Assisted customers with security-related issues and troubleshooting of software security incidents.",
      "Prepared daily reports and analysis of detected security alerts and SIEM offenses.",
    ],
  },
  {
    role: "Freelance Web Developer",
    org: "Freelance / Contract / Self-Employed",
    period: "Mar 2023 — Apr 2024",
    current: false,
    summary:
      "Designed, developed, and maintained websites based on client requirements, with a focus on functionality, usability, and reliability.",
    points: [
      "Designed and developed websites tailored to client requirements and business objectives.",
      "Worked with clients to understand project needs, define requirements, and deliver suitable web solutions.",
      "Tested and debugged website functionality to identify and resolve technical issues.",
      "Maintained existing websites to keep them updated, functional, and secure.",
    ],
  },
  {
    role: "IT Support Specialist",
    org: "Freelance / Contract / Self-Employed",
    period: "May 2019 — Sep 2021",
    current: false,
    summary:
      "Provided remote IT support by handling client requests and troubleshooting software-related issues.",
    points: [
      "Received and handled technical support requests from clients remotely.",
      "Troubleshot software-related problems and assisted clients in resolving technical issues.",
    ],
  },
];

export const projects = [
  {
    title: "Enterprise Endpoint Security & Management",
    tags: ["HCL BigFix", "SentinelOne", "Zscaler"],
    body: "Endpoint Security & Management program covering protection, device posture, and access controls across an enterprise fleet.",
  },
  {
    title: "Custom BigFix Fixlets",
    tags: ["BigFix", "PowerShell", "Bash"],
    body: "Purpose-built Fixlets for patching, configuration enforcement, and remediation of recurring endpoint findings.",
  },
  {
    title: "Security Compliance Reporting",
    tags: ["BigFix Compliance", "Relevance", "Reporting"],
    body: "Compliance reporting that maps endpoint state to internal security baselines, giving stakeholders a clear picture of posture.",
  },
  {
    title: "Endpoint Deployment",
    tags: ["Windows", "macOS", "Linux"],
    body: "Deployment and onboarding of security agents across Windows, macOS, and Linux endpoints.",
  },
  {
    title: "Security Monitoring",
    tags: ["ELK Stack", "IBM QRadar", "SIEM"],
    body: "Log collection, correlation, and dashboards supporting detection and investigation of endpoint and network activity.",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  expires?: string; // Only add when provided, e.g. "Sep 2027"
  image: string; // Path under /public
};


export const certifications: Certification[] = [
  {
  name: "Certified Blue Team Fundamentals (BTF)",
  issuer: "Cyberwarfare Labs",
  issued: "Nov 2026",
  image: "/certificates/CBTF.png",
},
  {
    name: "HCL BigFix Foundation",
    issuer: "HCL Software",
    issued: "Sep 2024",
    image: "/certificates/bigfix-foundation.png",
  },
  {
    name: "HCL BigFix Inventory",
    issuer: "HCL Software",
    issued: "Oct 2024",
    image: "/certificates/bigfix-inventory.png",
  },
  {
    name: "HCL BigFix Compliance",
    issuer: "HCL Software",
    issued: "Sep 2024",
    image: "/certificates/bigfix-compliance.png",
  },
  {
    name: "HCL BigFix Relevance",
    issuer: "HCL Software",
    issued: "Jul 2024",
    image: "/certificates/bigfix-relevance.png",
  },
  {
    name: "Vulnerability Management Foundations",
    issuer: "Qualys",
    issued: "Nov 2026",
    image: "/certificates/QualysVMF.png",
  },
  {
    name: "Vulnerability Management Detection and Response",
    issuer: "Qualys",
    issued: "Nov 2026",
    image: "/certificates/QualysVMDR.png",
  },
  {
    name: "Certified Cyber Security Analyst (C3SA)",
    issuer: "CyberWarFare Labs",
    issued: "May 2025",
    image: "/certificates/C3SA.png",
  },
  {
    name: "Ethical Hacking Essentials (EHE)",
    issuer: "CodeRed",
    issued: "Jun 2024",
    image: "/certificates/EHE.png",
  },
  {
    name: "Cybersecurity Awareness Professional Certification (CAPC™)",
    issuer: "CertiProf",
    issued: "Sep 2024",
    expires: "Sep 2027",
    image: "/certificates/CAPC.png",
  },
  {
    name: "NSE 2 Network Security Associate",
    issuer: "Fortinet",
    issued: "Sep 2023",
    expires: "Sep 2025",
    image: "/certificates/NSE2.png",
  },
  {
    name: "L1 SOC Analyst",
    issuer: "Jadi Hacker",
    issued: "Oct 2023",
    expires: "Oct 2024",
    image: "/certificates/L1SOC.png",
  },
];
