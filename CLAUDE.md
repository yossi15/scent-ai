# Scent AI — CLAUDE.md

## Project Overview
Luxury fragrance curation platform built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion.
- **Owner:** Yossi Zrihen (yossizrihen12@gmail.com)
- **Repo:** github.com/yossi15/scent-ai
- **Deployed:** Vercel (scent-curator-ai)
- **Base44 companion:** ScentGuide app (69d2a2607824a51238bfe68c)

## Tech Stack
- Next.js 16.2.2 (App Router) + TypeScript
- Tailwind CSS v4 with CSS custom properties
- Framer Motion for animations
- Recharts for radar/spider charts
- Lucide React for icons
- localStorage for persistence (collection, diary)

## Design Tokens
- Background: #faf8f5 (warm cream)
- Gold accent: #96793a
- Ink/text: #1a1714
- Light warm palette — NEVER dark themes
- RTL Hebrew interface (`dir="rtl"` on html)
- Prices in ILS (₪)

## Key Rules
1. **No permission asking** — user wants autonomous action, just do the work
2. **Every button must be functional** — no decorative/placeholder buttons
3. **No Unsplash for branded products** — use gradients per scent family or abstract visuals
4. **Professional/luxury appearance** — not playful or childish
5. **Hebrew UI** — all user-facing text in Hebrew, RTL layout
6. **Accessibility first** — all users should be able to use the app
7. **No emojis in the app** — use Lucide icons instead

## File Structure
```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx           # Main page with all sections
│   └── globals.css        # Tailwind + custom properties
├── components/
│   ├── Hero.tsx           # Landing hero with gradient bg
│   ├── Navbar.tsx         # Fixed nav with section links
│   ├── Collection.tsx     # Fragrance browser + personal collection
│   ├── FragranceCard.tsx  # Card with gradient, buy link
│   ├── FragranceModal.tsx # Detailed view with pyramid
│   ├── SignatureMatch.tsx # AI matching algorithm
│   ├── Diary.tsx          # Scent journal with CRUD
│   ├── Subscription.tsx   # Pricing tiers (179/549/1459 ILS)
│   ├── Footer.tsx         # Links to sections
│   ├── SocialProof.tsx    # Stats and trust signals
│   ├── HowItWorks.tsx     # Process explanation
│   ├── Testimonials.tsx   # User reviews
│   └── FAQ.tsx            # Frequently asked questions
└── data/
    └── fragrances.ts      # 70 fragrances, 26+ houses
```

## Session Protocol
### On Start
1. Read memory files for context
2. Check git status for uncommitted changes
3. Review project_state.md for current priorities
4. Start working on highest priority task

### On End
1. Update project_state.md with what was done
2. Save any new lessons learned
3. Commit and push if changes were made

## Fragrance Data
- 70 fragrances from 26+ houses
- Each has: name, house, family, description, notes (top/heart/base), occasions, seasons, priceRange, intensity, longevity, spidar (radar values)
- Gradient colors mapped per family in FragranceCard.tsx (17 families)
- Buy links: Google Shopping (`tbm=shop&q=...`)

## Current Priorities
1. Build taste quiz feature (שאלון טעמים) — key feature from Base44
2. Deploy updated version to Vercel
3. Consider real backend (Supabase/Firebase) for user data
