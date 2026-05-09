"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";
import { fadeUp, staggerContainer, cn } from "@/lib/utils";
import type { Skill } from "@/types";

type Category = "all" | Skill["category"];

const categories: { id: Category; label: string; icon: string }[] = [
  { id: "all",       label: "All",         icon: "✦" },
  { id: "data",      label: "Data & BI",   icon: "📊" },
  { id: "pm",        label: "PM Tools",    icon: "🗂️" },
  { id: "tools",     label: "Productivity",icon: "⚙️" },
  { id: "languages", label: "Languages",   icon: "🌍" },
];

const categoryColors: Record<Skill["category"], string> = {
  data:      "from-sky-500 to-blue-600",
  pm:        "from-violet-500 to-purple-600",
  tools:     "from-emerald-500 to-teal-600",
  languages: "from-orange-500 to-amber-600",
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className="glass rounded-xl p-4 group hover:border-white/15 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs text-sky-400">{skill.level}%</span>
      </div>

      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", categoryColors[skill.category])}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: index * 0.06 + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-28 relative bg-dark-800">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-12">
            <span className="section-tag">04 / Skills</span>
            <h2 className="section-title mt-2 text-white">Technical expertise</h2>
            <p className="text-slate-500 mt-3 max-w-lg">
              A broad toolkit built across years of hands-on project delivery and continuous learning.
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div variants={fadeUp} custom={0.1} className="flex flex-wrap gap-2 mb-10">
            {categories.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  active === id
                    ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-neon-blue"
                    : "glass text-slate-400 hover:text-white hover:border-white/15"
                )}
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </button>
            ))}
          </motion.div>

          {/* Skill bars grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Soft skills */}
          <motion.div variants={fadeUp} custom={0.4} className="mt-12">
            <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-4">Soft skills</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Leadership", "Communication", "Problem Solving", "Analytical Thinking",
                "Cross-functional Coordination", "Adaptability", "Results-Oriented", "Team Player",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg glass text-xs text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
