"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, TrendingUp } from "lucide-react";
import { experiences } from "@/lib/data";
import { fadeUp, staggerContainer, cn } from "@/lib/utils";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 relative bg-dark-900">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-80 h-80 bg-sky-600/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-14">
            <span className="section-tag">02 / Experience</span>
            <h2 className="section-title mt-2 text-white">Professional journey</h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-violet-500/30 to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-6 top-5 -translate-x-1/2">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 relative z-10",
                        exp.current
                          ? "border-sky-400 bg-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.8)]"
                          : "border-slate-600 bg-dark-900"
                      )}
                    >
                      {exp.current && (
                        <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-40" />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass glass-hover spotlight rounded-2xl p-6 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-sky-400 flex items-center gap-1">
                            <Calendar size={10} />
                            {exp.period}
                          </span>
                          {exp.current && (
                            <span className="px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-sky-200 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-1">
                          <span className="font-medium text-slate-300">{exp.company}</span>
                          <span className="text-slate-600">·</span>
                          <MapPin size={11} className="text-slate-500" />
                          <span>{exp.location}</span>
                        </p>
                      </div>

                      {exp.value && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-semibold">
                          <TrendingUp size={13} />
                          {exp.value}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-5">
                      {exp.description.map((line, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400">
                          <span className="text-sky-400 mt-0.5 shrink-0">→</span>
                          <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-sky-500/8 border border-sky-500/15 text-sky-400 font-mono text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
