# SVΛYP Website

A stunning, Apple-inspired landing page for the SVΛYP mobile application. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Apple-style animations** - Smooth scroll effects, parallax, and micro-interactions
- **Interactive Swipe Demo** - Card swiping experience
- **Visual Search Demo** - AI-powered image search showcase
- **Multi-language Support** - Russian (default), English, and Uzbek
- **Fully Responsive** - Mobile-first design
- **Performance Optimized** - Fast loading with Next.js 14 App Router

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Icons**: Lottie (optional)

## 📁 Project Structure

```
svayp_website/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx
│   │   └── page.tsx        # Main landing page
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Hero/               # Hero section with animations
│   ├── Navigation/         # Sticky navigation
│   ├── ProblemStatement/   # Problem/solution section
│   ├── Features/           # 4 key features grid
│   ├── SwipeDemo/          # Interactive swipe cards
│   ├── VisualSearchDemo/   # AI search demo
│   ├── HowItWorks/         # 5-step journey
│   ├── Waitlist/           # Email collection
│   └── Footer/             # Footer with links
├── lib/
│   ├── i18n.ts            # i18n configuration
│   └── utils/
├── messages/              # Translation files
│   ├── ru.json           # Russian (default)
│   ├── en.json           # English
│   └── uz.json           # Uzbek
├── public/
│   ├── images/           # Product photos, screenshots
│   ├── videos/           # Demo videos
│   └── lottie/           # Lottie animations
└── next.config.ts
```

## 🚦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

Default language is Russian. Access other languages:
- Russian: http://localhost:3000/ru
- English: http://localhost:3000/en
- Uzbek: http://localhost:3000/uz

### Build

```bash
npm run build
npm start
```

## 📸 Adding Assets

### Images
Place your product photos and screenshots in `public/images/`:
- App screenshots (mockups)
- Product photos
- Logo files (SVG preferred)

### Videos
Place demo videos in `public/videos/`:
- App demo video
- Feature showcase videos

### Lottie Animations
Place Lottie JSON files in `public/lottie/`:
- Icon animations
- Loading animations

## 🌐 Internationalization

Edit translation files in `messages/`:
- `ru.json` - Russian
- `en.json` - English
- `uz.json` - Uzbek

## 🎨 Customization

### Colors
Update colors in `tailwind.config.ts` or directly in components using Tailwind's utility classes.

### Animations
Modify Framer Motion animations in individual components:
- `components/Hero/Hero.tsx`
- `components/SwipeDemo/SwipeDemo.tsx`
- etc.

### Content
All content is managed through translation files in `messages/`.

## 📊 Sections

1. **Hero** - Full-screen introduction with animated product cards
2. **Problem Statement** - Highlight user pain points
3. **Features** - 4 key features with icons
4. **Swipe Demo** - Interactive card swiping
5. **Visual Search Demo** - AI-powered search showcase
6. **How It Works** - 5-step user journey
7. **Stats** - Key metrics (search time, accuracy, etc.)
8. **Waitlist** - Email collection form
9. **Footer** - Links and social media

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Azure

Follow Azure Static Web Apps deployment guide for Next.js.

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## 📝 TODO

- [ ] Add actual product images
- [ ] Add demo video
- [ ] Add logo SVG
- [ ] Implement waitlist backend API
- [ ] Add SEO metadata
- [ ] Add analytics (Google Analytics, etc.)
- [ ] Add cookie consent
- [ ] Implement language switcher in navigation
- [ ] Add social media meta tags (Open Graph, Twitter)

## 🎯 Design Inspiration

- **Apple** - Animations, hero videos, scroll effects
- **Sephora** - E-commerce layout, product grids
- **DressCode.ai** - AI feature explanation
- **TTLK** - Minimalist design, clean typography

## 📄 License

© 2026 SVΛYP. All rights reserved.
