"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";

// ── Form ──────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    // Opens mail client — replace with Formspree / Web3Forms for real backend
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(form.subject || "Portfolio contact")}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);

    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputClass =
    "w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-2">Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} required />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 block mb-2">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} required />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 block mb-2">Subject</label>
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={inputClass} />
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 block mb-2">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." rows={5} className={inputClass + " resize-none"} required />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all duration-200 shadow-neon-blue"
      >
        {status === "idle" && <><Send size={14} /> Send message</>}
        {status === "sending" && <span className="animate-pulse">Sending...</span>}
        {status === "sent" && <><span>✓</span> Message sent!</>}
      </button>

      <p className="text-center text-xs text-slate-600">
        Or use{" "}
        <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
          Formspree
        </a>{" "}
        for a fully serverless form backend.
      </p>
    </form>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function ContactSection() {
  return (
    <section id="contact" className="py-28 relative bg-dark-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="section-tag">06 / Contact</span>
            <h2 className="section-title mt-2 text-white">Let&apos;s work together</h2>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              Have an interesting project or opportunity? I&apos;d love to connect and explore how I can add value.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: info */}
            <div>
              <motion.p variants={fadeUp} custom={0.1} className="text-slate-400 leading-relaxed mb-8">
                Whether it&apos;s a PMO engagement, a data analytics challenge, or a sustainability initiative —
                I&apos;m available to discuss how we can collaborate.
              </motion.p>

              {/* Contact details */}
              <motion.div variants={fadeUp} custom={0.2} className="space-y-3 mb-8">
                {[
                  { icon: <Mail size={16} />, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { icon: <Phone size={16} />, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
                  { icon: <MapPin size={16} />, label: "Location", value: siteConfig.location },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="glass rounded-xl p-4 flex items-center gap-4 hover:border-white/15 transition-all group">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-slate-300 group-hover:text-sky-300 transition-colors font-medium">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-300 font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp} custom={0.3} className="flex gap-3">
                {[
                  { icon: <Linkedin size={18} />, href: siteConfig.linkedin, label: "LinkedIn" },
                  { icon: <Github size={18} />, href: siteConfig.github, label: "GitHub" },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-slate-400 hover:text-white hover:border-white/15 text-sm font-medium transition-all duration-200 group"
                  >
                    {icon}
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div variants={fadeUp} custom={0.2}>
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
