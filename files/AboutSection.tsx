"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig, terminalLines } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";

// ── Terminal ──────────────────────────────────────────────────
function Terminal() {
  const [lines, setLines] = useState<typeof terminalLines>([]);
  const [idx, setIdx] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (idx >= terminalLines.length) return;
    const delay = terminalLines[idx].type === "prompt" ? 600 : 200;
    const t = setTimeout(() => {
      setLines((prev) => [...prev, terminalLines[idx]]);
      setIdx((i) => i + 1);
      termRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
    }, delay);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <div className="glass rounded-xl overflow-hidden border border-white/8 shadow-glass-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-xs text-slate-500">
          pablo@portfolio ~ zsh
        </span>
      </div>
      {/* Body */}
      <div
        ref={termRef}
        className="p-5 font-mono text-xs space-y-1.5 max-h-64 overflow-y-auto no-scrollbar"
      >
        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            {line.type === "prompt" ? (
              <>
                <span className="text-green-400 shrink-0">❯</span>
                <span className="text-sky-300">{line.text}</span>
              </>
            ) : (
              <>
                <span className="text-transparent shrink-0">❯</span>
                <span className="text-slate-400">{line.text}</span>
              </>
            )}
          </div>
        ))}
        {idx < terminalLines.length && (
          <div className="flex items-center gap-2">
            <span className="text-green-400">❯</span>
            <span className="w-2 h-4 bg-green-400 animate-[cursorBlink_1s_step-end_infinite] inline-block" />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Strength card ─────────────────────────────────────────────
function StrengthCard({
  icon, title, desc, delay,
}: { icon: string; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="glass glass-hover spotlight rounded-xl p-5 cursor-pointer"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
    </motion.div>
  );
}

const strengths = [
  { icon: "🎯", title: "Results-Oriented", desc: "Delivering high-value projects on time and within budget consistently." },
  { icon: "📊", title: "Data-Driven", desc: "Transforming complex datasets into actionable business insights." },
  { icon: "♻️", title: "Sustainability", desc: "ESG & climate finance expertise aligned with Paris Agreement targets." },
  { icon: "🤝", title: "Cross-Functional", desc: "Leading multidisciplinary teams across engineering, finance & ops." },
];

// ── Main ──────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section id="about" className="py-28 relative bg-dark-900">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-14 max-w-2xl">
            <span className="section-tag">01 / About</span>
            <h2 className="section-title mt-2 text-white">
              Who I am
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: text + terminal */}
            <div className="space-y-6">
              <motion.div variants={fadeUp} custom={0.1} className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I&apos;m an{" "}
                  <span className="text-white font-medium">Industrial Organization Engineer</span>{" "}
                  with solid experience in managing large-scale infrastructure projects and developing
                  Business Intelligence solutions applied to sustainability.
                </p>
                <p>
                  Currently working as Associate at{" "}
                  <span className="text-sky-400 font-medium">Nfq Advisory</span>, helping financial
                  institutions quantify their carbon footprint and align investment portfolios with
                  Paris Agreement objectives.
                </p>
                <p>
                  Previously led as PMO the management of{" "}
                  <span className="text-white font-medium">25+ projects for Red Eléctrica Española</span>,
                  with a total value exceeding €30M. Parallel to my career, I hold an{" "}
                  <span className="text-violet-400 font-medium">MSc in Business Intelligence & Data Analysis</span>.
                </p>
              </motion.div>

              {/* Contact pills */}
              <motion.div variants={fadeUp} custom={0.2} className="flex flex-wrap gap-3">
                {[
                  { icon: "📍", text: siteConfig.location },
                  { icon: "✉️", text: siteConfig.email },
                  { icon: "📱", text: siteConfig.phone },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-slate-400 border-white/6"
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </span>
                ))}
              </motion.div>

              {/* Terminal */}
              <motion.div variants={fadeUp} custom={0.3}>
                <Terminal />
              </motion.div>
            </div>

            {/* Right: strength cards */}
            <div className="grid grid-cols-2 gap-4">
              {strengths.map((s, i) => (
                <StrengthCard key={s.title} {...s} delay={0.1 + i * 0.1} />
              ))}

              {/* Football highlight card */}
              <motion.div
                variants={fadeUp}
                custom={0.5}
                className="col-span-2 glass rounded-xl p-5 border-l-2 border-green-500/50 bg-green-500/3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white text-sm">⚽ 3rd Division Footballer</p>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Competing in Spanish 3rd Division since 2020 — 150+ matches played, 15 goals.
                      Reflects teamwork, high-performance mindset and dedication.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-green-400">150+</div>
                    <div className="text-xs text-slate-600">matches</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
