"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { fadeUp, staggerContainer, cn } from "@/lib/utils";
import type { Project } from "@/types";

// ── 3D tilt card ──────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.15}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass rounded-2xl overflow-hidden border border-white/6 hover:border-white/15 transition-[border-color,box-shadow] duration-300 hover:shadow-card-hover group cursor-pointer h-full"
      >
        {/* Preview gradient */}
        <div
          className={cn(
            "relative h-44 bg-gradient-to-br flex items-center justify-center overflow-hidden",
            project.gradient
          )}
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-black/20 blur-2xl" />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <motion.div
            className="text-5xl relative z-10"
            animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {project.icon}
          </motion.div>

          {/* Corner badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm text-white font-mono text-xs border border-white/10">
            {project.year}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="font-mono text-xs text-slate-500 block mb-1">{project.category}</span>
              <h3 className="text-base font-semibold text-white group-hover:text-sky-200 transition-colors">
                {project.title}
              </h3>
            </div>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              className="text-sky-400 shrink-0 mt-1"
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/6 text-slate-400 font-mono text-xs hover:text-sky-400 hover:border-sky-500/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                Live demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={12} />
                Source
              </a>
            )}
            <span className="ml-auto text-xs text-slate-600 font-mono">→ Details</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 relative bg-dark-900">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-14">
            <span className="section-tag">05 / Projects</span>
            <h2 className="section-title mt-2 text-white">Featured work</h2>
            <p className="text-slate-500 mt-3 max-w-lg">
              A selection of projects spanning BI development, PMO delivery, and data-driven sustainability.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div variants={fadeUp} custom={0.5} className="mt-12 text-center">
            <a
              href={`https://github.com/pablomirandaj`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-400 transition-colors group"
            >
              View all on GitHub
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
