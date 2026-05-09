// ============================================================
// Site Data — Replace with your real information
// ============================================================
import type { NavItem, Skill, Experience, Project, Certification, Stat } from "@/types";

export const siteConfig = {
  name: "Pablo Miranda Juanes",
  role: "PMO & Data Analyst",
  tagline: "Turning complex projects and raw data into measurable results.",
  email: "pablomirandajuanes@gmail.com",
  phone: "+34 688 916 364",
  location: "Madrid, España",
  github: "https://github.com/pablomirandaj",
  linkedin: "https://linkedin.com/in/pablomirandajuanes",
  cv: "/pablo-miranda-cv.pdf", // Place your PDF in /public
};

export const navItems: NavItem[] = [
  { label: "About",        href: "#about" },
  { label: "Experience",   href: "#experience" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Contact",      href: "#contact" },
];

export const stats: Stat[] = [
  { value: 25,  suffix: "+",  label: "Projects managed" },
  { value: 30,  suffix: "M€", label: "Portfolio value",  prefix: "+" },
  { value: 3,   suffix: "",   label: "Years experience" },
  { value: 150, suffix: "+",  label: "Football matches" },
];

export const skills: Skill[] = [
  // Data & BI
  { name: "Power BI",     level: 90, category: "data" },
  { name: "Python",       level: 85, category: "data" },
  { name: "R Studio",     level: 80, category: "data" },
  { name: "SQL",          level: 80, category: "data" },
  { name: "Tableau",      level: 75, category: "data" },
  // Project Management
  { name: "Primavera P6", level: 85, category: "pm" },
  { name: "MS Project",   level: 85, category: "pm" },
  { name: "Risk Mgmt",    level: 82, category: "pm" },
  { name: "Budgeting",    level: 88, category: "pm" },
  { name: "Stakeholder",  level: 84, category: "pm" },
  // Tools
  { name: "Excel",        level: 92, category: "tools" },
  { name: "PowerPoint",   level: 85, category: "tools" },
  { name: "Visual Studio",level: 70, category: "tools" },
  // Languages
  { name: "Spanish",      level: 100, category: "languages" },
  { name: "English",      level: 78,  category: "languages" },
  { name: "German",       level: 20,  category: "languages" },
];

export const experiences: Experience[] = [
  {
    id: "nfq",
    role: "Associate",
    company: "Nfq Advisory, Solutions, Outsourcing",
    location: "Madrid, Spain",
    period: "Sep 2025 — Present",
    current: true,
    value: "ESG",
    description: [
      "Supporting financial institutions in quantifying their carbon footprint and developing roadmaps toward climate neutrality.",
      "Built an application to align banking investment portfolios with global GHG emission reduction standards and Paris Agreement objectives.",
    ],
    tags: ["ESG", "Sustainability", "Climate Finance", "Paris Agreement", "BI"],
  },
  {
    id: "ree",
    role: "PMO — Project Management Officer",
    company: "Red Eléctrica Española (REE)",
    location: "Oviedo, Spain",
    period: "Jun 2024 — Jul 2025",
    current: false,
    value: "+30M€",
    description: [
      "Managed 25+ projects for overhead and underground electrical transmission lines across Spain, overseeing full project lifecycle.",
      "Cross-functional coordination with engineering, operations, finance, and external stakeholders to ensure budget control and on-time delivery.",
      "Led planning, scheduling, budgeting, risk assessment, and client communication for a total portfolio exceeding €30M.",
    ],
    tags: ["PMO", "Primavera P6", "Risk Management", "Infrastructure", "Energy"],
  },
  {
    id: "edp",
    role: "Intern — Photovoltaic Project Management",
    company: "EDP",
    location: "Oviedo, Spain",
    period: "Nov 2023 — May 2024",
    current: false,
    description: [
      "Assisted in the management and reporting of photovoltaic project portfolio.",
      "Asset tracking and performance monitoring across the renewable energy portfolio.",
    ],
    tags: ["Renewable Energy", "Reporting", "Asset Control", "Solar"],
  },
];

export const projects: Project[] = [
  {
    id: "carbon-tool",
    title: "Carbon Footprint Tool",
    description: "Application to quantify carbon footprint of banking portfolios and generate climate neutrality roadmaps.",
    longDescription: "End-to-end BI solution for financial institutions to measure, report, and reduce their GHG emissions in compliance with Paris Agreement targets.",
    tags: ["Python", "Power BI", "ESG", "DAX", "ETL"],
    gradient: "from-cyan-500 via-blue-500 to-violet-600",
    icon: "♻️",
    year: "2025",
    category: "BI · Sustainability",
    featured: true,
  },
  {
    id: "ree-pmo",
    title: "REE Infrastructure PMO",
    description: "Coordinated 25+ electrical transmission projects across Spain with full lifecycle management.",
    longDescription: "Built standardized PMO frameworks, risk registers, and reporting dashboards for Red Eléctrica Española's transmission expansion program.",
    tags: ["Primavera P6", "MS Project", "Excel", "Risk Mgmt"],
    gradient: "from-violet-500 via-purple-500 to-pink-600",
    icon: "⚡",
    year: "2024",
    category: "PMO · Energy",
    featured: true,
  },
  {
    id: "bi-dashboard",
    title: "Project BI Dashboard",
    description: "Interactive Power BI dashboard centralizing project KPIs for real-time budget, schedule and risk tracking.",
    longDescription: "Multi-layered Power BI solution with DAX measures, ETL pipelines, and automated alerting for project portfolio management.",
    tags: ["Power BI", "DAX", "SQL", "ETL", "KPIs"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    icon: "📊",
    year: "2025",
    category: "Data Analytics",
    featured: true,
  },
];

export const certifications: Certification[] = [
  {
    id: "cambridge",
    name: "Cambridge B2 First",
    issuer: "Cambridge Assessment English",
    year: "2022",
    icon: "🇬🇧",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "powerbi",
    name: "Power BI Advanced",
    issuer: "Microsoft",
    year: "2025",
    icon: "📊",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "driving",
    name: "Class B Driving License",
    issuer: "DGT España",
    year: "2019",
    icon: "🚗",
    color: "from-green-500 to-emerald-600",
  },
];

export const terminalLines = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "pablo_miranda_juanes" },
  { type: "prompt", text: "cat profile.json" },
  { type: "output", text: '{ "role": "PMO & Data Analyst", "location": "Madrid 🇪🇸" }' },
  { type: "prompt", text: "ls skills/" },
  { type: "output", text: "python/  power-bi/  sql/  primavera-p6/  r-studio/" },
  { type: "prompt", text: "git log --oneline -3" },
  { type: "output", text: "a1b2c3 feat: carbon footprint tool v2.0" },
  { type: "output", text: "d4e5f6 chore: 25+ REE projects delivered ✓" },
  { type: "output", text: "g7h8i9 init: MSc Business Intelligence" },
  { type: "prompt", text: "echo $STATUS" },
  { type: "output", text: "🟢 Available for opportunities" },
];
