// ============================================================
// Global Types — portfolio-pmj
// ============================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "data" | "pm" | "tools" | "languages";
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string[];
  tags: string[];
  value?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  gradient: string;
  icon: string;
  year: string;
  category: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: string;
  color: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
