# For the Love of Travel — Homepage (Next.js + Tailwind)

This is a production-ready **Next.js (App Router) + Tailwind CSS** implementation of the homepage you provided. It mirrors the Figma layout: hero, featured stories, latest posts, popular videos, a feature banner, newsletter, and footer.

## 🚀 Quickstart

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Open in your browser
http://localhost:3000
```

> Requires Node 18+.

## 🧱 Stack
- Next.js 14 (App Router)
- Tailwind CSS
- framer-motion + lucide-react (icons)
- next/font for Google fonts

## 🗂 Structure
```
app/
  layout.jsx     # Global HTML shell + fonts
  page.jsx       # Homepage composed from components
  globals.css    # Tailwind directives + helpers
components/
  Navbar.jsx
  Hero.jsx
  SectionHeader.jsx
  PostCard.jsx
  VideoCard.jsx
  Newsletter.jsx
  Footer.jsx
lib/
  data.js        # Sample data for cards
public/
  images/        # (place local assets here if desired)
```

## 🧩 Notes
- Images use the Unsplash CDN. If you replace with local assets, drop them into `public/images` and update the data in `lib/data.js`.
- `next.config.js` allows `images.unsplash.com`. Add more domains if needed.
- This project is **homepage-only**. You can expand into dynamic routes for articles/videos later.

## 🔧 Production Tips
- Replace sample data with CMS content (Sanity, Strapi, etc.).
- Add SEO metadata per route (Open Graph/JSON-LD).
- Connect newsletter form action to your ESP (Mailchimp, ConvertKit, etc.).
- Wire in Prebid.js + GAM ad slots as components when you’re ready.
- Run Lighthouse and aim for 90+ across the board.
```

