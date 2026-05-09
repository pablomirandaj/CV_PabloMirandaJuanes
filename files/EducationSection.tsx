"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { fadeUp, staggerContainer, cn } from "@/lib/utils";

const education = [
  {
    id: "msc",
    degree: "MSc in Business Intelligence & Data Analysis",
    school: "Universidad de La Rioja · UNIR",
    period: "Jan 2025 — Present",
    current: true,
    highlights: [
      "Data visualization: Tableau, Power BI",
      "Predictive models: R Studio, Python",
      "BI applied to project management",
    ],
    icon: "🎓",
    gradient: "from-sky-500/10 to-violet-500/10",
    border: "border-sky-500/20",
  },
  {
    id: "bsc",
    degree: "BSc Industrial Organization Engineering",
    school: "Escuela Politécnica · Universidad de Oviedo",
    period: "2019 — 2024",
    current: false,
    highlights: [
      "GPA: 7.31 / 10",
      "Specialization in Project Management",
    ],
    icon: "⚙️",
    gradient: "from-violet-500/10 to-pink-500/10",
    border: "border-violet-500/20",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-28 relative bg-dark-800">
      <div className="absolute top-0 left-0 w-80 h-80 bg-sky-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-14">
            <span className="section-tag">03 / Education</span>
            <h2 className="section-title mt-2 text-white">Academic background</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Education cards */}
            <div className="space-y-6">
              <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-6">Degrees</p>
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className={cn(
                    "glass rounded-2xl p-6 border bg-gradient-to-br glass-hover",
                    edu.gradient,
                    edu.border
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl shrink-0">{edu.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-sky-400">{edu.period}</span>
                        {edu.current && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white text-base leading-snug mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sky-400/80 text-sm mb-3">{edu.school}</p>
                      <ul className="space-y-1.5">
                        {edu.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="text-violet-400 mt-0.5">◆</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-6">
                Certifications & Extra
              </p>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    variants={fadeUp}
                    custom={i * 0.15 + 0.2}
                    className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br",
                        cert.color,
                        "bg-opacity-20"
                      )}
                    >
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm group-hover:text-sky-200 transition-colors">
                        {cert.name}
                      </p>
                      <p className="text-slate-500 text-xs">{cert.issuer}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-600 shrink-0">{cert.year}</span>
                  </motion.div>
                ))}

                {/* Extra: Football */}
                <motion.div
                  variants={fadeUp}
                  custom={0.5}
                  className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group border-green-500/15"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-green-500/10 shrink-0">
                    ⚽
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">3rd Division Footballer</p>
                    <p className="text-slate-500 text-xs">Spanish Football Federation · 150+ matches</p>
                  </div>
                  <span className="font-mono text-xs text-green-400/70 shrink-0">2020→</span>
                </motion.div>

                {/* Skills pill cloud */}
                <motion.div
                  variants={fadeUp}
                  custom={0.6}
                  className="glass rounded-xl p-5 mt-4"
                >
                  <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-4">
                    Also interested in
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Football ⚽", "Padel 🎾", "Tennis", "Watchmaking ⌚", "Travel ✈️", "New Cultures"].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg text-xs glass text-slate-400 hover:text-white hover:border-white/15 transition-all duration-200 cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
