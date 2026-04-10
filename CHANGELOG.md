# Changelog

All notable changes to this portfolio website are recorded here.

---

## [Unreleased] — 2026-04-10

### Added
- **Circuit board hero background** (`CircuitBoard.tsx`): Animated HTML5 canvas that renders a dark-green PCB with a centred black CPU die. Copper traces grow from each CPU pin towards the screen edges on every page load. Paths are generated randomly using a grid-based random-walk algorithm that guarantees no two traces cross. Replaces the previous decorative grid overlay.
- **`CHANGELOG.md`**: This file — tracks what changed, when, and why.

### Changed
- **Contact form email** (`MeetingModal.tsx`): Destination address changed from `robin@soprasteria.se` to `a.robin.larsson@gmail.com` so enquiries reach the correct personal inbox.
- **Contact form subject line** (`MeetingModal.tsx`): Email subject now includes the prefix `Robins Consultancy Contact —` so incoming enquiries are immediately identifiable.
- **Hero layout** (`page.tsx`): Text block centred (was left-aligned) to align visually with the centred CPU in the new circuit board background. Pills and CTA buttons also centred.

---

## [0.6.0] — 2026-04-07 · commit `163d93f`

### Added
- **Career Timeline** (`Timeline.tsx`): Interactive swim-lane overlap layout showing Robin's full career in chronological order with period bars, role tags, and company logos.

### Fixed
- Region Stockholm logo path corrected.

---

## [0.5.0] — 2026-04-07 · commit `e497d92`

### Added
- **Real company logos** for ABB, Sopra Steria, 2M Engineering, and Region Stockholm added to `public/images/` and wired into `CompanyBanner` and `Timeline` components.

---

## [0.4.0] — 2026-04-07 · commit `c7c7bad` + `2be5e9b`

### Fixed
- Cloudflare GitHub Actions step renamed from the deprecated action name to `cloudflare/wrangler-action@v3`.
- Deploy re-triggered after updating the Cloudflare API token secret.

---

## [0.3.0] — 2026-04-07 · commit `11d459a`

### Fixed
- `package.json` dependency versions aligned with `package-lock.json` to prevent `npm ci` failures in CI.

---

## [0.2.0] — 2026-04-07 · commit `94fc7a5`

### Added
- **GitHub Actions deploy pipeline** (`.github/workflows/deploy.yml`): Builds the Next.js static export and deploys to Cloudflare Pages on every push to `main`.

---

## [0.1.0] — 2026-04-07 · commit `ab74db1`

### Added
- Initial portfolio website.
- Hero section with intro text, service pills, and CTA buttons.
- "What I bring" services section (6 cards).
- Company banner carousel.
- Projects section with category tabs (Professional / Academic / Hobby) and keyword search.
- Individual project pages (`/projects/[slug]`) with full descriptions, roles, keywords, and prev/next navigation.
- Contact / "Book a call" modal (`MeetingModal.tsx`) using `mailto:` to pre-fill the user's email client.
- `src/data/projects.ts` as the single source of truth for all project data.
- Cloudflare Pages static deployment via `wrangler` (`next.config.mjs` with `output: 'export'`).
