/* ==========================================
   Pablo Miranda Juanes — Portfolio CV
   script.js
   ========================================== */

'use strict';

/* ------------------------------------------
   1. LOADER DE ENTRADA
------------------------------------------ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Espera a que la barra de carga termine (1.2s) + pequeño delay
  setTimeout(() => {
    loader.classList.add('hidden');
    // Activa la animación del hero tras el loader
    triggerHeroReveal();
  }, 1600);
});

function triggerHeroReveal() {
  const heroItems = document.querySelectorAll('#hero [data-reveal]');
  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, i * 150);
  });
}

/* ------------------------------------------
   2. CURSOR PERSONALIZADO
------------------------------------------ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // El cursor principal sigue inmediatamente
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

// El follower sigue con lag (smooth)
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Efecto hover en elementos clicables
const hoverTargets = document.querySelectorAll('a, button, .project-card, .strength-card, .edu-card, .lang-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.8)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(14,165,233,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '32px';
    follower.style.height = '32px';
    follower.style.borderColor = 'rgba(14,165,233,0.5)';
  });
});

/* ------------------------------------------
   3. NAVBAR: scroll + hamburger
------------------------------------------ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Clase "scrolled" al bajar de 50px
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  // Anima las barras del hamburger
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Cierra el menú al pulsar un enlace móvil
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ------------------------------------------
   4. SCROLL REVEAL — IntersectionObserver
------------------------------------------ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');

      // Si la sección de habilidades entra en viewport, anima las barras
      if (entry.target.closest('#habilidades')) {
        animateSkillBars();
      }

      // Si el elemento tiene data-count, anima el contador
      const countEls = entry.target.querySelectorAll('[data-count]');
      countEls.forEach(el => animateCounter(el));

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

// Observa todos los elementos [data-reveal] excepto los del hero (se manejan en triggerHeroReveal)
document.querySelectorAll('[data-reveal]').forEach(el => {
  if (!el.closest('#hero')) {
    revealObserver.observe(el);
  }
});

/* ------------------------------------------
   5. BARRAS DE HABILIDADES ANIMADAS
------------------------------------------ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach((bar, i) => {
    const targetWidth = bar.getAttribute('data-width') + '%';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, i * 100);
  });
}

/* ------------------------------------------
   6. CONTADORES ANIMADOS
------------------------------------------ */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// Observer separado para los stats (pueden estar fuera del [data-reveal])
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => animateCounter(el));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) statsObserver.observe(statsRow);

/* ------------------------------------------
   7. ACTIVE NAV LINK on scroll
------------------------------------------ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

/* ------------------------------------------
   8. SMOOTH SCROLL para todos los anclas
------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80; // altura del navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ------------------------------------------
   9. BOTÓN VOLVER ARRIBA
------------------------------------------ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
  backToTop.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
}, { passive: true });

backToTop.style.opacity = '0';
backToTop.style.transition = 'opacity 0.3s, transform 0.2s, border-color 0.2s, color 0.2s';

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ------------------------------------------
   10. FORMULARIO DE CONTACTO
------------------------------------------ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const btn     = document.getElementById('submitBtn');

  // Validación básica
  if (!name || !email || !subject || !message) {
    showToast('⚠️ Por favor, rellena todos los campos.', 'warning');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('⚠️ El email no parece válido.', 'warning');
    return;
  }

  // Abre cliente de correo (fallback funcional sin backend)
  const mailtoBody = encodeURIComponent(
    `Nombre: ${name}\nEmail: ${email}\n\n${message}`
  );
  const mailtoUrl = `mailto:pablomirandajuanes@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  // Feedback visual
  btn.innerHTML = '<span class="btn-text">✓ ¡Enviado!</span>';
  btn.style.background = 'linear-gradient(135deg, #10b981, #047857)';
  btn.disabled = true;

  window.location.href = mailtoUrl;

  showToast('✅ ¡Mensaje preparado! Se ha abierto tu cliente de correo.', 'success');

  // Resetea el botón tras 4s
  setTimeout(() => {
    btn.innerHTML = '<span class="btn-text">Enviar mensaje</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 4000);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------
   11. TOAST DE NOTIFICACIÓN
------------------------------------------ */
function showToast(message, type = 'info') {
  // Elimina toasts anteriores
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  const colors = {
    success: 'linear-gradient(135deg, #10b981, #047857)',
    warning: 'linear-gradient(135deg, #f59e0b, #b45309)',
    info:    'linear-gradient(135deg, #0ea5e9, #0284c7)',
  };

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: colors[type] || colors.info,
    color: 'white',
    padding: '0.85rem 1.4rem',
    borderRadius: '12px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
    transform: 'translateY(100px)',
    opacity: '0',
    transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease',
    maxWidth: '340px',
    lineHeight: '1.5',
  });

  document.body.appendChild(toast);

  // Anima entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
  });

  // Anima salida tras 4s
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ------------------------------------------
   12. EFECTO PARALLAX SUAVE EN EL HERO
------------------------------------------ */
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  // Parallax solo si el hero es visible
  if (scrolled < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
  }
}, { passive: true });

/* ------------------------------------------
   13. EFECTO DE PARTÍCULAS EN EL HERO (canvas)
------------------------------------------ */
(function initParticles() {
  const heroSection = document.getElementById('hero');
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.4;';
  heroSection.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = heroSection.offsetWidth;
  let H = canvas.height = heroSection.offsetHeight;

  const PARTICLE_COUNT = 60;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.6 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14,165,233,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    // Líneas entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(14,165,233,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  // Redimensiona canvas con la ventana
  window.addEventListener('resize', () => {
    W = canvas.width = heroSection.offsetWidth;
    H = canvas.height = heroSection.offsetHeight;
  }, { passive: true });
})();

/* ------------------------------------------
   14. STAGGER en las tarjetas de proyectos
------------------------------------------ */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.strength-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

/* ------------------------------------------
   INIT
------------------------------------------ */
console.log('%c PMJ Portfolio ', 'background:#0ea5e9;color:#fff;font-size:14px;font-weight:bold;border-radius:4px;padding:4px 8px;');
console.log('%c Hecho con JavaScript vanilla 🚀 ', 'color:#8b5cf6;font-size:12px;');
