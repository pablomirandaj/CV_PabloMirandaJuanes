# 🚀 Pablo Miranda Juanes — Ultra-Premium Portfolio

A cinematic, production-grade personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

| Feature | Details |
|---------|---------|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS with custom cyberpunk theme |
| Animation | Framer Motion (scroll reveals, 3D tilt, spring physics) |
| Particles | Custom canvas particle system with mouse interaction |
| Cursor | Smooth spring-physics custom cursor |
| Typing | react-type-animation |
| SEO | Full meta tags, OG, Twitter Card |
| Performance | Dynamic imports, lazy loading, optimized images |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Global styles, Tailwind base
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with active section tracking
│   │   └── Footer.tsx      # Footer with social links
│   ├── sections/
│   │   ├── HeroSection.tsx       # Animated hero + stats + typing
│   │   ├── AboutSection.tsx      # About + terminal + strength cards
│   │   ├── ExperienceSection.tsx # Timeline
│   │   ├── SkillsSection.tsx     # Animated progress bars + tabs
│   │   ├── ProjectsSection.tsx   # 3D tilt project cards
│   │   ├── EducationSection.tsx  # Education + certifications
│   │   └── ContactSection.tsx    # Contact form + social
│   └── ui/
│       ├── CustomCursor.tsx      # Spring-physics cursor
│       ├── ParticlesBackground.tsx # Canvas particles
│       └── ScrollProgressBar.tsx # Progress bar at top
├── hooks/
│   └── index.ts            # useMousePosition, useCounter, etc.
├── lib/
│   ├── data.ts             # ← ALL YOUR CONTENT IS HERE
│   └── utils.ts            # cn(), animation variants, helpers
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## 🛠️ Installation

### 1. Prerequisites
- Node.js 18.17+ 
- npm / yarn / pnpm

### 2. Clone & install
```bash
# Clone the repo
git clone https://github.com/pablomirandaj/CV_PabloMirandaJuanes.git
cd portfolio-nextjs

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🎨 Customization

### All your content lives in one file:
```
src/lib/data.ts
```

Change `siteConfig`, `skills`, `experiences`, `projects`, `certifications` — the whole site updates automatically.

### Add your photo
Place your photo in `/public/photo.jpg` and update `HeroSection.tsx`:
```tsx
// Replace the photo-placeholder div with:
<Image src="/photo.jpg" alt="Pablo Miranda Juanes" fill className="object-cover" />
```

### Add your CV PDF
Place it in `/public/pablo-miranda-cv.pdf` — the Download button will work automatically.

### Change colors
Edit `tailwind.config.ts` → `theme.extend.colors.neon` for instant palette changes.

---

## 🌍 Deployment

### Vercel (recommended — free)
```bash
npm install -g vercel
vercel
```
Or connect GitHub → Vercel dashboard → Import repo → Deploy.

### Netlify
```bash
npm run build
# Upload the .next/ folder or connect GitHub repo
```

### GitHub Pages (static export)
Add to `next.config.js`:
```js
output: 'export',
basePath: '/CV_PabloMirandaJuanes',
```
Then:
```bash
npm run build
# Push the out/ folder to gh-pages branch
```

---

## ⚡ Performance Optimizations

- **Dynamic imports** for cursor, particles, progress bar (no SSR, no bundle bloat)
- **`viewport={{ once: true }}`** on all Framer Motion elements
- **`passive: true`** on all scroll/mouse event listeners
- **`requestAnimationFrame`** for all canvas animations
- **CSS transforms only** — no layout-triggering properties animated
- **`image/avif` + `image/webp`** formats via Next.js Image

---

## 🔧 Form Backend Options

The contact form opens the mail client by default. For a real backend:

| Service | Free tier | Setup |
|---------|-----------|-------|
| [Formspree](https://formspree.io) | 50 submissions/month | Replace fetch URL |
| [Web3Forms](https://web3forms.com) | Unlimited | API key |
| [EmailJS](https://emailjs.com) | 200/month | JS SDK |

---

## 📦 Key Dependencies

```json
{
  "next": "14.2.3",
  "framer-motion": "^11.2.10",
  "react-type-animation": "^3.2.0",
  "tailwind-merge": "^2.3.0",
  "lucide-react": "^0.390.0",
  "clsx": "^2.1.1"
}
```

---

## 📄 License

MIT — free to use and adapt for your own portfolio.
