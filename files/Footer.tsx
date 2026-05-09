"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, navItems } from "@/lib/data";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-dark-950 border-t border-white/5 py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
                P
              </div>
              <span className="font-semibold text-white">Pablo Miranda Juanes</span>
            </div>
            <p className="text-xs text-slate-600">PMO · Data Analyst · Madrid 🇪🇸</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + back to top */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={15} />, href: siteConfig.github, label: "GitHub" },
              { icon: <Linkedin size={15} />, href: siteConfig.linkedin, label: "LinkedIn" },
              { icon: <Mail size={15} />, href: `mailto:${siteConfig.email}`, label: "Email" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-slate-200 hover:border-white/15 transition-all"
              >
                {icon}
              </a>
            ))}
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-sky-400 hover:border-sky-500/30 transition-all ml-2"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} Pablo Miranda Juanes · Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
