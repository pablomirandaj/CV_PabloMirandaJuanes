'use strict';
/* ============================================================
   Pablo Miranda Juanes — Portfolio · script.js  v2.0
   ============================================================ */

/* ── Utilities ── */
const $ = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);
const qsa = sel => document.querySelectorAll(sel);

/* ════════════════════════════════════════════════════════════
   CURSOR — GPU-accelerated, zero-lag translate3d
   Uses rAF scheduling instead of style.left/top
   ════════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = $('cursor-dot');
  const ring = $('cursor-ring');
  if (!dot || !ring || window.innerWidth <= 768) return;

  let mx = 0, my = 0;        // raw mouse
  let rx = 0, ry = 0;        // ring (lerped)
  let rafId = null;
  let ticking = false;

  // Dot follows instantly in mousemove (no rAF delay)
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Dot: instant via transform3d
    dot.style.transform = `translate3d(${mx - 2.5}px, ${my - 2.5}px, 0)`;
    if (!ticking) {
      ticking = true;
      rafId = requestAnimationFrame(animateRing);
    }
  }, { passive: true });

  function animateRing() {
    ticking = false;
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate3d(${rx - 13}px, ${ry - 13}px, 0)`;
    // Keep animating if ring hasn't settled
    if (Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) {
      ticking = true;
      rafId = requestAnimationFrame(animateRing);
    }
  }

  // Hover states
  const interactEls = 'a, button, input, textarea, .pj, .str, .lang, .ctl, .hcard';
  qsa(interactEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'), { passive: true });
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'), { passive: true });
  });

  // Hide on touch
  document.addEventListener('touchstart', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  }, { once: true, passive: true });
})();

/* ════════════════════════════════════════════════════════════
   PROGRESS BAR — transform-based, no layout
   ════════════════════════════════════════════════════════════ */
(function initProgressBar() {
  const bar = $('progress-bar');
  if (!bar) return;
  let rafScheduled = false;
  window.addEventListener('scroll', () => {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
      rafScheduled = false;
    });
  }, { passive: true });
})();

/* ════════════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════════════ */
(function initNav() {
  const nav = $('nav');
  const header = document.getElementById('nav');
  if (!header) return;
  let rafScheduled = false;
  window.addEventListener('scroll', () => {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 40);
      rafScheduled = false;
    });
  }, { passive: true });
})();

/* ════════════════════════════════════════════════════════════
   MOBILE MENU
   ════════════════════════════════════════════════════════════ */
(function initMobileMenu() {
  const burger  = $('burger');
  const overlay = $('mobileOverlay');
  const close   = $('mobClose');
  if (!burger || !overlay) return;

  const openMenu = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  qsa('.mob-link').forEach(l => l.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });
})();

/* ════════════════════════════════════════════════════════════
   SMOOTH SCROLL
   ════════════════════════════════════════════════════════════ */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER REVEAL
   ════════════════════════════════════════════════════════════ */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  qsa('[data-reveal]').forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════════════════════════
   SKILL BARS
   ════════════════════════════════════════════════════════════ */
(function initSkillBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skb').forEach((skb, i) => {
          const w = skb.getAttribute('data-w');
          const fill = skb.querySelector('.skb-fill');
          if (fill) {
            setTimeout(() => { fill.style.width = w + '%'; }, i * 75);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  qsa('.sk-group').forEach(g => observer.observe(g));
})();

/* ════════════════════════════════════════════════════════════
   COUNTERS — easeOutCubic
   ════════════════════════════════════════════════════════════ */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const dur = 1500;
  const startTime = performance.now();
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const t = Math.min((now - startTime) / dur, 1);
    el.textContent = Math.round(easeOutCubic(t) * target);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  qsa('.hcard').forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════════════════════════
   CONTACT FORM
   ════════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form      = $('contactForm');
  const btnText   = $('btnText');
  const submitBtn = $('submitBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('#fn')?.value.trim();
    const email   = form.querySelector('#fe')?.value.trim();
    const subject = form.querySelector('#fs')?.value.trim();
    const message = form.querySelector('#fm')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'warn');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'warn');
      return;
    }

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:pablomirandajuanes@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio contact')}&body=${body}`;

    if (btnText) btnText.textContent = '✓ Mail client opened';
    if (submitBtn) {
      submitBtn.style.background = '#2a6e60';
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-disabled', 'true');
    }
    showToast('Your mail client has been opened.', 'ok');

    setTimeout(() => {
      if (btnText) btnText.textContent = 'Send message';
      if (submitBtn) {
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-disabled');
      }
      form.reset();
    }, 4500);
  });
})();

/* ════════════════════════════════════════════════════════════
   TOAST
   ════════════════════════════════════════════════════════════ */
function showToast(msg, type = 'ok') {
  qsa('.pmj-toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'pmj-toast';
  t.setAttribute('role', 'alert');
  t.setAttribute('aria-live', 'polite');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '1.75rem', right: '1.75rem',
    background: type === 'ok' ? '#0d1a16' : '#1a0d0d',
    border: `1px solid ${type === 'ok' ? 'rgba(92,196,180,0.25)' : 'rgba(200,80,80,0.25)'}`,
    color: type === 'ok' ? '#5cc4b4' : '#d07070',
    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.71rem',
    letterSpacing: '0.05em', padding: '0.75rem 1.1rem', borderRadius: '6px',
    zIndex: '9999', transform: 'translate3d(0, 16px, 0)', opacity: '0',
    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
    maxWidth: '300px', lineHeight: '1.5',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    willChange: 'transform, opacity',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    t.style.transform = 'translate3d(0, 0, 0)';
    t.style.opacity = '1';
  }));
  setTimeout(() => {
    t.style.transform = 'translate3d(0, 16px, 0)';
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 350);
  }, 4000);
}

/* ════════════════════════════════════════════════════════════
   BACK TO TOP
   ════════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const topBtn = $('backToTop');
  if (!topBtn) return;
  topBtn.style.opacity = '0';
  topBtn.style.transition = 'opacity 0.3s ease';
  topBtn.style.pointerEvents = 'none';

  let rafScheduled = false;
  window.addEventListener('scroll', () => {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
      const show = window.scrollY > 400;
      topBtn.style.opacity = show ? '1' : '0';
      topBtn.style.pointerEvents = show ? 'auto' : 'none';
      rafScheduled = false;
    });
  }, { passive: true });

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ════════════════════════════════════════════════════════════
   HERO PARALLAX — only on desktop, cheap transform only
   ════════════════════════════════════════════════════════════ */
(function initParallax() {
  if (window.innerWidth <= 768) return;
  const heroBg = qs('.hero-bg');
  if (!heroBg) return;

  let rafScheduled = false;
  window.addEventListener('scroll', () => {
    if (rafScheduled || window.scrollY >= window.innerHeight) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
      heroBg.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
      rafScheduled = false;
    });
  }, { passive: true });
})();

/* ════════════════════════════════════════════════════════════
   ACTIVE NAV LINK — highlight current section
   ════════════════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();
