# 🎓 Home Tutors — Next.js + Tailwind CSS Landing Page

A pixel-perfect clone of the Educrat education platform, built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 📁 Folder Structure

```
educrat/
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css            # Global styles + Tailwind directives
│   │   ├── layout.tsx             # Root layout (fonts, metadata)
│   │   └── page.tsx               # Home page (assembles all sections)
│   └── components/
│       ├── Navbar.tsx             # Sticky navbar with mobile menu
│       ├── HeroSection.tsx        # Dark hero with floating cards
│       ├── StatsSection.tsx       # Animated counter stats
│       ├── JourneySection.tsx     # 4-feature journey grid
│       ├── GlobalSection.tsx      # 2-col image + checklist section
│       ├── AppSection.tsx         # App download CTA section
│       └── Footer.tsx             # 4-col footer with links
├── tailwind.config.js             # Custom colors, animations, keyframes
├── postcss.config.js
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Node.js

Download and install from [nodejs.org](https://nodejs.org) (v18+ recommended).

### 2. Create the project

```bash
npx create-next-app@14 educrat --typescript --tailwind --app --src-dir --no-eslint
cd educrat
```

### 3. Install extra dependencies

```bash
npm install framer-motion lucide-react
```

### 4. Replace files

Copy all files from this package into your project, matching the folder structure above.

- Replace `tailwind.config.js` with the provided one
- Replace `src/app/globals.css` with the provided one
- Replace `src/app/layout.tsx` and `src/app/page.tsx`
- Add all files from `src/components/`

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design System

### Colors
| Token           | Hex       | Usage                        |
|----------------|-----------|------------------------------|
| `primary`       | `#4F46E5` | Buttons, links, icons        |
| `primary-dark`  | `#1e1b4b` | Navbar, app download buttons |
| `accent`        | `#00E5A0` | "Educators" text, CTA border |
| `navy-dark`     | `#0d0b2e` | Hero background              |
| `navy-mid`      | `#1a1750` | Hero gradient mid            |
| `coral`         | `#f87171` | Stats icon, course count     |
| `gold`          | `#fbbf24` | Star ratings, sparkles       |

### Gradients
- **Hero**: `linear-gradient(135deg, #0d0b2e → #1a1750 → #0d0b2e)`
- **Journey**: `linear-gradient(135deg, #fdf4ff → #fce7f3 → #ede9fe → #dbeafe → #d1fae5)`
- **App section**: `linear-gradient(135deg, #f0f4ff → #e8f0fe → #f5f3ff)`
- **Footer**: `linear-gradient(135deg, #f0f0ff → #e8e8f8)`

### Typography
- Font: **Inter** (Google Fonts, weights 300–900)

---

## ✨ Features

- ✅ **100% responsive** — mobile, tablet, desktop
- ✅ **Animated hero** with floating cards using CSS keyframes
- ✅ **Scroll-triggered animations** using IntersectionObserver
- ✅ **Counter animation** for stats (counts up on scroll into view)
- ✅ **Mobile hamburger menu** with slide-down
- ✅ **Hover effects** on all interactive elements
- ✅ **Pixel-matched colors** from the original design

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## 📦 Tech Stack

| Technology      | Version | Purpose                     |
|----------------|---------|-----------------------------|
| Next.js        | 14.2.3  | React framework, SSR/SSG    |
| React          | 18      | UI library                  |
| TypeScript     | 5       | Type safety                 |
| Tailwind CSS   | 3.4     | Utility-first styling       |
| Lucide React   | 0.383   | Icons                       |
| framer-motion  | 11      | (Optional) advanced anim.   |

---

## 🖼️ Sections

| Section         | Component           | Description                            |
|----------------|---------------------|----------------------------------------|
| Navigation      | `Navbar.tsx`        | Logo, nav links, search, cart, auth    |
| Hero            | `HeroSection.tsx`   | Dark bg, headline, floating image cards|
| Stats           | `StatsSection.tsx`  | 4 animated counters                    |
| Journey         | `JourneySection.tsx`| Colorful gradient bg, 4 feature items  |
| Global          | `GlobalSection.tsx` | Image collage + checklist + CTA        |
| App Download    | `AppSection.tsx`    | Device mockups + store buttons         |
| Footer          | `Footer.tsx`        | 4 columns: brand, links, courses, contact |
