# Netrunner Companion (PWA)

Minimal starter Vue 3 + Vite + TS + Pinia + Tailwind + basic PWA cache.

## Quick start
```bash
npm i
npm run dev
```

Build & preview:
```bash
npm run build
npm run preview
```

## Notes
- Service worker is a tiny "cache-first" example in `public/sw.js`.
- State persists in `localStorage`.
- Winner detection (to 7 points) and Runner hand max from brain damage are implemented in getters.
- Extend components to add Undo, hints, and rule popovers.
