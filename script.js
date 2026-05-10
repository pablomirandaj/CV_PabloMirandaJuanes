'use strict';
/* ============================================================
   Pablo Miranda Juanes — Portfolio · script.js
   ============================================================ */

/* ── Cursor ── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (dot && ring && window.innerWidth > 768) {
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.1;
    ry += (e.clientY - ry) * 0.1;
  }, { passive: true });
  (function loop() {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, input, textarea, .pj, .str, .lang, .ctl')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* ── Progress bar ── */
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  if (bar) bar.style.transform = `scaleX(${pct})`;
}, { passive: true });

/* ── Navbar ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ── */
const burger   = document.getElementById('burger');
const overlay  = document.getElementById('mobileOverlay');
const mobClose = document.getElementById('mobClose');
const openMenu  = () => { overlay?.classList.add('open'); overlay?.setAttribute('aria-hidden','false'); burger?.setAttribute('aria-expanded','true'); };
const closeMenu = () => { overlay?.classList.remove('open'); overlay?.setAttribute('aria-hidden','true'); burger?.setAttribute('aria-expanded','false'); };
burger?.addEventListener('click', openMenu);
mobClose?.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObs.unobserve(entry.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ── Skill bars ── */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skb').forEach((skb, i) => {
        const w = skb.getAttribute('data-w');
        const fill = skb.querySelector('.skb-fill');
        if (fill) setTimeout(() => { fill.style.width = w + '%'; }, i * 80);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.sk-group').forEach(g => skillObs.observe(g));

/* ── Counters ── */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const dur = 1600;
  const start = performance.now();
  const run = now => {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
    if (t < 1) requestAnimationFrame(run);
    else el.textContent = target;
  };
  requestAnimationFrame(run);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.querySelectorAll('[data-count]').forEach(animateCount); countObs.unobserve(entry.target); }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.hcard').forEach(el => countObs.observe(el));

/* ── Terminal ── */
const termLines = [
  { t: 'prompt', v: 'whoami' },
  { t: 'output', v: 'pablo_miranda_juanes' },
  { t: 'prompt', v: 'cat current_role.json' },
  { t: 'output', v: '{ "company": "Minsait", "role": "Business & Strategy Consultant" }' },
  { t: 'prompt', v: 'ls skills/' },
  { t: 'output', v: 'power-bi/  power-automate/  python/  sql/  primavera-p6/' },
  { t: 'prompt', v: 'git log --oneline -4' },
  { t: 'output', v: 'a9b2c3 feat: REE budget monitoring dashboard (Power BI)' },
  { t: 'output', v: 'b4d5e6 feat: carbon footprint tool — Paris Agreement aligned' },
  { t: 'output', v: 'c7f8g9 chore: 25 REE transmission projects delivered ✓' },
  { t: 'output', v: 'd1h2i3 init: MSc Business Intelligence & Data Analysis' },
  { t: 'prompt', v: 'echo $STATUS' },
  { t: 'output', v: '🟢 Available for opportunities' },
];

const termBody = document.getElementById('terminalBody');
if (termBody) {
  let idx = 0;
  function nextLine() {
    if (idx >= termLines.length) return;
    const line = termLines[idx++];
    const row = document.createElement('div');
    if (line.t === 'prompt') {
      row.innerHTML = `<span class="t-prompt">❯ </span><span class="t-cmd">${line.v}</span>`;
    } else {
      row.innerHTML = `<span class="t-out">${line.v}</span>`;
    }
    termBody.appendChild(row);
    termBody.scrollTop = 9999;
    // Show cursor on last line
    if (idx === termLines.length) {
      const cur = document.createElement('div');
      cur.innerHTML = `<span class="t-prompt">❯ </span><span class="t-cursor"></span>`;
      termBody.appendChild(cur);
    }
    setTimeout(nextLine, line.t === 'prompt' ? 550 : 180);
  }
  const termObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { nextLine(); termObs.disconnect(); }
  }, { threshold: 0.3 });
  const about = document.getElementById('about');
  if (about) termObs.observe(about);
}

/* ── Contact form ── */
const form      = document.getElementById('contactForm');
const btnText   = document.getElementById('btnText');
const submitBtn = document.getElementById('submitBtn');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.querySelector('#fn')?.value.trim();
  const email   = form.querySelector('#fe')?.value.trim();
  const subject = form.querySelector('#fs')?.value.trim();
  const message = form.querySelector('#fm')?.value.trim();
  if (!name || !email || !message) { showToast('Please fill in all required fields.', 'warn'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email.', 'warn'); return; }
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:pablomirandajuanes@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio contact')}&body=${body}`;
  if (btnText) btnText.textContent = '✓ Message ready';
  if (submitBtn) { submitBtn.style.background = '#2a7a6a'; submitBtn.disabled = true; }
  showToast('Your mail client has been opened.', 'ok');
  setTimeout(() => {
    if (btnText) btnText.textContent = 'Send message';
    if (submitBtn) { submitBtn.style.background = ''; submitBtn.disabled = false; }
    form.reset();
  }, 4000);
});

/* ── Toast ── */
function showToast(msg, type = 'ok') {
  document.querySelectorAll('.pmj-toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'pmj-toast';
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '2rem', right: '2rem',
    background: type === 'ok' ? '#1a2e28' : '#2e1a1a',
    border: `1px solid ${type === 'ok' ? 'rgba(77,184,168,0.3)' : 'rgba(200,80,80,0.3)'}`,
    color: type === 'ok' ? '#4db8a8' : '#e07070',
    fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.05em',
    padding: '0.8rem 1.2rem', borderRadius: '4px', zIndex: '9999',
    transform: 'translateY(20px)', opacity: '0',
    transition: 'transform 0.35s ease, opacity 0.35s ease',
    maxWidth: '320px', lineHeight: '1.4',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; }));
  setTimeout(() => { t.style.transform = 'translateY(20px)'; t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 4000);
}

/* ── Back to top ── */
const topBtn = document.getElementById('backToTop');
if (topBtn) {
  topBtn.style.opacity = '0';
  topBtn.style.transition = 'opacity 0.3s';
  window.addEventListener('scroll', () => { topBtn.style.opacity = window.scrollY > 400 ? '1' : '0'; }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Hero parallax ── */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
}, { passive: true });
