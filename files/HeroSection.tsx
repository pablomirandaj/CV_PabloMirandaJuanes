"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Mail, Download, Terminal } from "lucide-react";
import { siteConfig, stats } from "@/lib/data";
import { useCounter, useIntersectionOnce } from "@/hooks";
import { fadeUp, staggerContainer } from "@/lib/utils";

// ── Stat Counter ──────────────────────────────────────────────
function StatCounter({ value, suffix, label, prefix }: (typeof stats)[number]) {
  const { ref, visible } = useIntersectionOnce(0.3);
  const count = useCounter(value, 1800, visible);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-neon-blue tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-950"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-600/8 blur-[120px] animate-float" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/4 blur-[100px]" />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.8), transparent)",
            animation: "scanLine 6s linear infinite",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 section-container text-center"
        style={{ y, opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-mono text-slate-400 tracking-wide">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          custom={0.1}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-white">Pablo </span>
          <span className="gradient-animated">Miranda</span>
          <br />
          <span className="text-white">Juanes</span>
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          variants={fadeUp}
          custom={0.2}
          className="text-xl md:text-2xl font-mono text-sky-400 mb-6 h-8"
        >
          <TypeAnimation
            sequence={[
              "PMO & Project Manager",
              2000,
              "Business Intelligence Analyst",
              2000,
              "Data-Driven Decision Maker",
              2000,
              "Sustainability Consultant",
              2000,
              "Industrial Engineer",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          custom={0.3}
          className="max-w-xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed mb-10 text-balance"
        >
          {siteConfig.tagline} Based in{" "}
          <span className="text-slate-300">Madrid, Spain 🇪🇸</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href={siteConfig.cv}
            download
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-neon-blue"
          >
            <Download size={16} />
            Download Resume
          </a>
          <button
            onClick={() => handleScroll("#contact")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-slate-300 font-semibold text-sm hover:text-white hover:border-sky-500/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            Get in touch
          </button>
          <button
            onClick={() => handleScroll("#about")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 font-semibold text-sm hover:text-sky-400 transition-colors"
          >
            <Terminal size={16} />
            View terminal
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          custom={0.5}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {[
            { icon: <Github size={18} />, href: siteConfig.github, label: "GitHub" },
            { icon: <Linkedin size={18} />, href: siteConfig.linkedin, label: "LinkedIn" },
            { icon: <Mail size={18} />, href: `mailto:${siteConfig.email}`, label: "Email" },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          custom={0.6}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-16"
        >
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          custom={0.7}
          className="flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
