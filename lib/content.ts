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
  headline: "Securing endpoints, operations, and exposure across complex environments.",
  bio:
    "I work across enterprise endpoint and server Security Engineering, focusing on endpoint management, security compliance, and vulnerability remediation. My experience includes administering HCL BigFix, developing custom Fixlets and Analyses, implementing security solutions, and supporting Security Engineering through monitoring, troubleshooting, and automation.",
};


export const about = {
  paragraphs: [
    "My work focuses on enterprise endpoint and server security, combining endpoint management, security engineering, and vulnerability remediation. I specialize in HCL BigFix administration, developing custom Fixlets and Analyses, implementing security solutions, and maintaining visibility and compliance across diverse environments.",
    "At PT Q2 Technologies (CTI Group), assigned to CIMB Niaga, I manage day-to-day BigFix operations, troubleshoot endpoint management infrastructure, coordinate security deployments, and support remediation initiatives across Windows, Linux, Unix, and macOS environments. My earlier experience as an L1 SOC Analyst also provided a foundation in SIEM monitoring, alert triage, log analysis, and security incident investigation.",
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
      "Develop custom Fixlets and Analyses using BigFix Relevance to support security software deployments, endpoint visibility, and compliance monitoring.",
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
];
