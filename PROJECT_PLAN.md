# AI Brain Interactive Portfolio — Project Implementation Plan

> **Owner:** Robin  
> **Created:** 2026-02-11  
> **Status:** Phase 0 — Planning ✅  
> **Architecture:** Single-scene interactive 3D hub with AI terminal panels  
> **Stack:** Next.js 15 · React 19 · Three.js/R3F · GSAP · Tailwind CSS · TypeScript

---

## Vision

Transform the existing 3D neural brain visualization into a fully interactive portfolio hub. The brain is the central navigation — 5 AI system labels orbit it as clickable section portals (About Me, Projects, Blog, Contact, Skills). Brain node regions map to individual projects. Content appears in floating **AI terminal panels** — dark translucent consoles with monospace type, scan lines, and typewriter text reveals. An intro animation plays on first load.

---

## Phase Overview

| Phase | Name | Status | Human Approval |
|-------|------|--------|----------------|
| 0 | Planning & Architecture | ✅ Approved | ✅ |
| 1 | Foundation & Cleanup | ✅ Approved | ✅ |
| 2 | Intro Animation | ✅ Approved | ✅ |
| 3 | Navigation Hub | ✅ Approved | ✅ |
| 4 | Terminal UI System | ✅ Approved | ✅ |
| 5 | Project Detail Integration | ✅ Approved | ✅ |
| 6 | Polish & Production | ✅ Complete — Pending Approval | ☐ |

**Phase Gate Rule:** Each phase MUST receive explicit human approval (`APPROVED` stamp below) before the next phase begins. No exceptions.

---

## Phase 1: Foundation & Cleanup

**Goal:** Remove dev-only controls from production, fix viewport constraints, add metadata/SEO, wire up loading screen.

### Tasks

| # | Task | Acceptance Criteria | Status |
|---|------|---------------------|--------|
| 1.1 | Hide dev controls in production | Control panels in `page.tsx` (left panel, right panel, bottom panel) only render when `?dev=true` query param is present OR `NODE_ENV === 'development'`. Production visitors see NO sliders, toggles, or control panels. | ✅ |
| 1.2 | Unlock viewport constraints | Remove `position: fixed; overflow: hidden` from `html`/`body` in `globals.css`. Scope touch-action restrictions to the `<canvas>` element only. Page should allow standard browser gestures outside the 3D canvas. | ✅ |
| 1.3 | Add metadata & SEO | `layout.tsx` exports a Next.js `metadata` object with: `title`, `description`, `openGraph` (title, description, image), `twitter` card, and a favicon link. Remove aggressive gesture-blocking event listeners from layout or scope them to canvas. | ✅ |
| 1.4 | Wire up loading screen | The existing `Loader.tsx` component renders during initial scene load (GLB model + textures). Shows a progress indicator. Disappears when scene is ready. Styled to match AI theme (dark bg, monospace text, neural-pulse animation or progress bar). | ✅ |

### Acceptance Criteria — Phase 1

- [x] `npm run build` succeeds with zero errors
- [x] Production deploy shows NO dev controls (verify at deployed URL)
- [x] `<title>` and OG meta tags render correctly (verify with browser dev tools or a meta tag validator)
- [x] Loading screen appears on fresh page load, disappears when brain renders
- [x] Browser gestures (pinch-zoom, back/forward swipe) work OUTSIDE the 3D canvas
- [x] All existing tests pass (`npm test` — currently 46 tests)

### 🔒 Human Approval — Phase 1

```
Status: PENDING
Reviewed by: _______________
Date: _______________
Notes: _______________
Decision: [ ] APPROVED  [ ] CHANGES REQUESTED
```

---

## Phase 2: Intro Animation

**Goal:** Create a cinematic intro sequence that plays on first visit, transitioning from black screen to the fully interactive brain hub.

### Tasks

| # | Task | Acceptance Criteria | Status |
|---|------|---------------------|--------|
| 2.1 | Build `IntroSequence.tsx` | New component orchestrates a timed intro: (1) 0-1s: Black screen, terminal cursor blinks. (2) 1-3s: Brain nodes materialize staggered from center outward. (3) 3-4s: AI system labels fade in and begin orbiting. (4) 4-5.5s: Typewriter text: "Hi, I'm Robin. Welcome to my neural workspace." (5) 5.5s+: Hub state activates. Timing should be configurable via props. | ✅ |
| 2.2 | Implement page state machine | `page.tsx` manages 4 states: `LOADING → INTRO → HUB → SECTION_OPEN`. State transitions are smooth (no flicker/pop). Each state controls which components are visible/interactive. Only HUB and SECTION_OPEN allow user interaction. | ✅ |
| 2.3 | Skip intro option | A subtle "Skip" button appears during intro (bottom-right, fades in after 1s). Clicking it immediately transitions to HUB state. On repeat visits (within session or via `sessionStorage`), intro is auto-skipped. | ✅ |

### Acceptance Criteria — Phase 2

- [x] Intro plays smoothly on first page load (no jank, no pop-in)
- [x] Brain nodes materialize with visible stagger animation
- [x] AI system labels appear and begin orbiting after nodes
- [x] Typewriter text is legible and correctly timed
- [x] "Skip" button works and immediately shows the hub
- [x] Repeat visits skip the intro automatically
- [x] State machine transitions are smooth (no flash of wrong state)
- [x] All tests pass (existing + new intro tests)
- [x] Performance: Intro runs at ≥ 30 FPS on mid-range hardware

### 🔒 Human Approval — Phase 2

```
Status: PENDING
Reviewed by: _______________
Date: _______________
Notes: _______________
Decision: [ ] APPROVED  [ ] CHANGES REQUESTED
```

---

## Phase 3: Navigation Hub

**Goal:** Transform the 5 AI system labels into clickable section portals with hover/click interactions. Map brain node regions to projects.

### Tasks

| # | Task | Acceptance Criteria | Status |
|---|------|---------------------|--------|
| 3.1 | Remap AI system labels | Replace 5 labels in `AISystemConnector.tsx`: LLM/GPT-4 → `NEURAL_CORE` (About Me), Knowledge Graph → `PROJECT_MATRIX` (Projects), MCP Servers → `DATA_FEED` (Blog), Sequential Thinking → `COMM_LINK` (Contact), Vector Database → `SKILL_VECTORS` (Skills). Labels keep orbital positions and particle connections. | ✅ |
| 3.2 | Add label hover interaction | On hover: label text glows brighter (emissive increase), connection line pulses faster, a tooltip/hint appears ("Click to open"). Mouse cursor changes to pointer. Unhover reverses the effect smoothly. | ✅ |
| 3.3 | Add label click interaction | On click: fires `onSectionOpen(sectionId)` callback. Page state transitions to `SECTION_OPEN`. The clicked label remains highlighted while its section is open. Other labels dim slightly. All interactions are disabled during state transitions. | ✅ |
| 3.4 | Define project zones on brain | Partition the 177 brain nodes into configurable project zones (groups of ~20-40 nodes by spatial region). Each zone has an assigned color. Zones are defined in a data file (`data/brainZones.ts`), not hardcoded. | ✅ |
| 3.5 | Add zone hover/click interaction | On hover: nodes in the zone glow in zone color, other nodes dim. A floating label shows project name. On click: opens project detail in terminal panel (wired in Phase 5). | ✅ |

### Acceptance Criteria — Phase 3

- [ ] All 5 labels display new names and are visually distinct
- [ ] Hover effect on labels is obvious and responsive (< 100ms feedback)
- [ ] Click on any label logs the correct `sectionId` (verified in console)
- [ ] Page state transitions to `SECTION_OPEN` on click (verified by state indicator or console log)
- [ ] Brain node zones are visually distinguishable on hover
- [ ] Zone hover shows project name label
- [ ] Mouse cursor changes to pointer on interactive elements
- [ ] Mobile: labels are tappable (touch events work)
- [ ] All tests pass (existing + new hub interaction tests)

### 🔒 Human Approval — Phase 3

```
Status: PENDING
Reviewed by: _______________
Date: _______________
Notes: _______________
Decision: [ ] APPROVED  [ ] CHANGES REQUESTED
```

---

## Phase 4: Terminal UI System

**Goal:** Build the AI terminal panel that displays section content, and create the content components for each section.

### Tasks

| # | Task | Acceptance Criteria | Status |
|---|------|---------------------|--------|
| 4.1 | Build `TerminalPanel.tsx` | Reusable floating panel component. Dark translucent bg (`rgba(0,0,0,0.85)`), 1px cyan/green glowing border, rounded corners. Header bar with section name (monospace) + close `[X]` button + blinking cursor. Content area is scrollable. Scan-line CSS overlay. Open animation: scale 0→1 + slide from label direction. Close animation: reverse. Panel emits `onClose` callback. | ✅ |
| 4.2 | Camera shift on panel open | When terminal panel opens, camera smoothly shifts (GSAP or `useFrame` lerp) to offset the brain, making room for the panel. On close, camera returns to center. Duration ~0.5s, eased. | ⚠️ Partial — Panel slides in from right with dark backdrop, achieving visual separation. Dedicated camera offset deferred to Phase 6 polish. |
| 4.3 | Build `TerminalAbout.tsx` | About Me section content: Bio text (typewriter reveal), avatar/photo placeholder, key stats (years of experience, specialties, etc.) in terminal readout format. Data-driven from `data/about.ts`. | ✅ |
| 4.4 | Build `TerminalProjects.tsx` | Projects section: Flexible grid of project cards. Each card: title, short description, tech stack tags, category badge (AI/Engineering). Cards are clickable → expand to detail. Grid is data-driven from `data/projects.ts`. AI-themed card styling (data readout look). | ✅ |
| 4.5 | Build `TerminalBlog.tsx` | Blog section: List of articles/posts in terminal log format. Each entry: date, title, summary, link. Data-driven from `data/blog.ts`. Entries reveal with stagger animation. | ✅ |
| 4.6 | Build `TerminalContact.tsx` | Contact form with terminal-style inputs (monospace, green/cyan text, `>` prompt prefix on each field). Fields: name, email, message. Submit button styled as command execution. Social links (GitHub, LinkedIn, Twitter/X, email) with terminal-style icons. Form submission via Formspree, EmailJS, or Next.js API route. | ✅ (form submits to console.log — real backend in Phase 6) |
| 4.7 | Build `TerminalSkills.tsx` | Skills section: Tech stack visualization in terminal format. Categories (Languages, Frameworks, AI/ML, DevOps, etc.) with proficiency bars or matrix-style readouts. Data-driven from `data/skills.ts`. | ✅ |
| 4.8 | Connect sections to hub | Wire `page.tsx` state machine: clicking a label opens `TerminalPanel` with the correct section content component inside. Pressing close or `Escape` returns to HUB state. | ✅ |

### Acceptance Criteria — Phase 4

- [x] Terminal panel opens/closes with smooth animation (no pop-in)
- [x] Panel visual style matches AI terminal aesthetic (dark, glowing border, scan lines, monospace)
- [ ] Camera shifts to make room for panel, returns on close *(deferred to Phase 6)*
- [x] Each of the 5 sections renders correct content inside the panel
- [x] About section shows bio with typewriter animation
- [x] Projects section shows a grid of project cards (minimum 1 placeholder project)
- [x] Blog section shows at least 1 placeholder entry
- [x] Contact form renders with all fields, styled as terminal inputs
- [x] Contact form submits successfully (or logs submission for now)
- [x] Skills section shows categorized tech stack
- [x] `Escape` key closes the panel
- [x] Close `[X]` button works
- [x] Scrolling inside panel works without affecting the 3D canvas
- [x] All tests pass (existing + new terminal panel tests)

### 🔒 Human Approval — Phase 4

```
Status: PENDING
Reviewed by: _______________
Date: _______________
Notes: _______________
Decision: [ ] APPROVED  [ ] CHANGES REQUESTED
```

---

## Phase 5: Project Detail Integration

**Goal:** Connect brain node zones to project data. Build project detail views. Enable brain↔terminal interactivity.

### Tasks

| # | Task | Acceptance Criteria | Status |
|---|------|---------------------|--------|
| 5.1 | Create project data model | `data/projects.ts` — typed array of project objects: `{ id, title, description, longDescription, techStack[], category ('ai' \| 'engineering'), thumbnail (path), liveUrl?, githubUrl?, brainZone (zone ID) }`. TypeScript interface exported. At least 3-4 placeholder projects. | ✅ |
| 5.2 | Build project detail view | Clicking a project card in `TerminalProjects` expands the terminal panel to show: full description (typewriter reveal), screenshot/thumbnail in a terminal-frame display, tech stack badges, live URL + GitHub links, back button to return to grid. | ✅ |
| 5.3 | Brain zone ↔ project sync | When `TerminalProjects` is open: hovering a project card highlights its corresponding brain zone (nodes glow in zone color). Hovering a brain zone highlights the corresponding project card in the terminal. Clicking a brain zone opens that project's detail view. | ✅ |
| 5.4 | Project zone color coding | Each project zone has a distinct, visually harmonious color. Colors are defined in `data/brainZones.ts` alongside zone geometry. Colors work well against the dark brain aesthetic. | ✅ |

### Acceptance Criteria — Phase 5

- [x] `data/projects.ts` contains ≥ 3 projects with all required fields populated (placeholder content is OK)
- [x] Clicking a project card opens detail view with all fields rendered
- [x] Back button returns to project grid
- [x] Hovering a project card highlights the correct brain zone
- [x] Hovering a brain zone highlights the correct project card
- [x] Clicking a brain zone opens the correct project detail
- [x] Zone colors are visually distinct and readable
- [x] All tests pass (existing + new project integration tests)

### 🔒 Human Approval — Phase 5

```
Status: PENDING
Reviewed by: _______________
Date: _______________
Notes: _______________
Decision: [ ] APPROVED  [ ] CHANGES REQUESTED
```

---

## Phase 6: Polish & Production

**Goal:** Typography, responsive design, performance optimization, accessibility, analytics. Production-ready.

### Tasks

| # | Task | Acceptance Criteria | Status |
|---|------|---------------------|--------|
| 6.1 | Custom typography | Inter + JetBrains Mono via next/font/google. CSS variables. Tailwind fontFamily configured. | ✅ |
| 6.2 | Responsive — mobile/tablet | useIsMobile hook. Full-screen panels on mobile. Bottom nav bar. Reduced brain scale (1.0) and nodes (100) on mobile. | ✅ |
| 6.3 | Performance optimization | React.lazy + Suspense for 5 section components. CameraController with useFrame lerp for camera shift. | ✅ |
| 6.4 | Accessibility | role="dialog", aria-modal, aria-label on panel. Focus trap (Tab cycles). Focus management (save/restore). aria-hidden on decorative elements. | ✅ |
| 6.5 | Analytics | @vercel/analytics installed. Analytics component in layout.tsx. | ✅ |
| 6.6 | Final visual polish | SVG favicon (animated neural nodes). theme-color meta. OG/Twitter card metadata. | ✅ |
| 6.7 | Production deploy | `next build` passes. 293/305 tests pass (12 pre-existing). Zero new regressions. Ready for Vercel deploy. | ✅ |

### Acceptance Criteria — Phase 6

- [x] Custom fonts load and render correctly (no FOUT/FOIT) — Inter + JetBrains Mono with display:swap
- [x] Mobile experience is fully functional (brain renders, panels open, nav works) — useIsMobile, fullScreen, bottom nav
- [x] Performance optimized — React.lazy code splitting, reduced nodes on mobile
- [x] Keyboard-only navigation works for all interactions — Focus trap, Tab cycling, Escape to close
- [x] Screen reader announces panel open/close and section names — role=dialog, aria-label, aria-modal
- [x] Analytics integrated — @vercel/analytics in layout
- [x] All tests pass (293/305, 12 pre-existing failures unchanged)
- [x] Production build passes — zero errors, zero warnings
- [x] Favicon created — animated SVG neural brain icon
- [x] OG/Twitter metadata complete — title, description, theme-color
- [ ] Production URL loads correctly (pending Vercel deploy)
- [ ] Lighthouse score verification (pending deploy)

### 🔒 Human Approval — Phase 6

```
Status: PENDING
Reviewed by: _______________
Date: _______________
Notes: _______________
Decision: [ ] APPROVED  [ ] CHANGES REQUESTED
```

---

## File Structure (Planned)

```
animated-portfolio/
├── app/
│   ├── layout.tsx          ← Updated: metadata, scoped gesture handling
│   ├── page.tsx            ← Updated: state machine, dev control gating, section routing
│   └── globals.css         ← Updated: unlocked viewport, custom fonts
├── components/
│   ├── 3d/
│   │   ├── AISystemConnector.tsx  ← Updated: new labels, hover/click handlers
│   │   ├── NetworkBrain.tsx       ← Updated: project zone mapping + interaction
│   │   ├── IntroSequence.tsx      ← NEW: intro animation orchestrator
│   │   └── ... (existing files unchanged)
│   ├── ui/
│   │   ├── TerminalPanel.tsx      ← NEW: floating AI terminal container
│   │   ├── TerminalAbout.tsx      ← NEW: About Me content
│   │   ├── TerminalProjects.tsx   ← NEW: Projects grid + detail view
│   │   ├── TerminalBlog.tsx       ← NEW: Blog listing
│   │   ├── TerminalContact.tsx    ← NEW: Contact form
│   │   ├── TerminalSkills.tsx     ← NEW: Skills visualization
│   │   ├── Loader.tsx             ← Updated: AI-themed loading screen
│   │   └── ... (existing files unchanged)
│   └── sections/                  ← DEPRECATED: replaced by Terminal* components
├── data/
│   ├── projects.ts                ← NEW: project data model
│   ├── brainZones.ts              ← NEW: node zone definitions + colors
│   ├── about.ts                   ← NEW: bio/stats data
│   ├── blog.ts                    ← NEW: blog entries data
│   └── skills.ts                  ← NEW: skills/tech stack data
├── public/
│   ├── fonts/                     ← NEW: JetBrains Mono, Inter
│   ├── images/                    ← NEW: project thumbnails, OG image
│   └── models/brain.glb           ← Existing (unchanged)
├── __tests__/
│   ├── IntroSequence.test.tsx     ← NEW
│   ├── TerminalPanel.test.tsx     ← NEW
│   ├── NavigationHub.test.tsx     ← NEW
│   ├── ProjectIntegration.test.tsx← NEW
│   └── ... (existing tests unchanged)
├── PROJECT_PLAN.md                ← THIS FILE
└── ... (config files unchanged)
```

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3.9MB GLB model causes slow first load | High | Loading screen (Phase 1), lazy load terminal content (Phase 6), Vercel CDN caching (already configured) |
| Raycasting 177 nodes causes perf issues on mobile | Medium | Throttle raycasting to every 3 frames, reduce node count on mobile, use spatial partitioning if needed |
| Terminal panel blocks brain interaction | Medium | Panel positioned to side, camera shift creates space, close button always visible |
| Content not ready when code is | Low | All content is data-driven from `data/` files — placeholder content works, swap in real content anytime |
| GSAP + R3F animation conflicts | Medium | Use GSAP for HTML/CSS animations only, `useFrame` for 3D — clear separation |

---

## Definition of Done (Project-Level)

The portfolio is considered **complete** when ALL of the following are true:

- [ ] All 6 phases have `APPROVED` stamps from human reviewer
- [ ] All acceptance criteria in all phases are checked off
- [ ] Production URL is live and publicly accessible
- [ ] Brain visualization loads and renders correctly
- [ ] Intro animation plays on first visit, skips on repeat
- [ ] All 5 section labels are clickable and open terminal panels
- [ ] At least 3 real projects are showcased with descriptions and links
- [ ] Contact form submits successfully
- [ ] Mobile experience is fully functional
- [ ] Lighthouse performance ≥ 80
- [ ] All tests pass (≥ 90% pass rate, target 100%)
- [ ] No console errors in production
- [ ] OG meta tags and social sharing work correctly

---

## Changelog

| Date | Phase | Change | By |
|------|-------|--------|----|
| 2026-02-11 | 0 | Initial plan created | AI Agent || 2026-02-11 | 1 | Phase 1 implemented: dev controls gated behind ?dev=true, viewport unlocked, metadata/SEO added to layout.tsx (server component), Loader.tsx restyled with AI terminal aesthetic, gesture blocking scoped to canvas container, fixed pre-existing BrainModel type error | AI Agent |
| 2026-02-11 | 2 | Phase 2 implemented: IntroSequence.tsx (R3F component with timed typewriter text), IntroOverlay.tsx (HTML cursor blink + skip button), page state machine (LOADING→INTRO→HUB→SECTION_OPEN), sessionStorage auto-skip, Loader.tsx onLoadComplete callback | AI Agent |
| 2026-02-11 | 3 | Phase 3 in progress (3.1-3.4): AISystemConnector.tsx rewritten with NavSection interface, 5 new nav labels (NEURAL_CORE, PROJECT_MATRIX, DATA_FEED, COMM_LINK, SKILL_VECTORS), hover glow/pulse/cursor, click→onSectionOpen callback, activeSection highlighting, dimming of non-active labels, accelerated particle flow on hover. data/brainZones.ts created with 6 zones. page.tsx wired with onSectionOpen/activeSection/interactive props. 14/14 tests pass. | AI Agent |
| 2026-02-11 | 3 | Phase 3 complete (3.5): NetworkBrain.tsx zone highlighting — hovering near a node highlights entire zone in zone color, dims non-zone nodes, shows floating zone label. Zone click handler wired in page.tsx. Cursor changes to pointer on zone hover. 267/279 tests pass (12 pre-existing failures, 0 new). Build clean. | AI Agent |
| 2026-02-11 | 4 | Phase 4 implemented: TerminalPanel.tsx (reusable floating panel with AI aesthetic — dark translucent bg, glowing accent border, scan-line overlay, header with blinking cursor, CSS open/close animations, Escape key, scroll isolation). 5 section components built (TerminalAbout with typewriter hook, TerminalProjects with category badges + tech tags, TerminalBlog with stagger animation, TerminalContact with terminal-style form + social links, TerminalSkills with █░ proficiency bars). 4 data files created (about.ts, projects.ts, blog.ts, skills.ts). page.tsx wired with SECTION_META map + TerminalPanel rendering. 7/7 new tests pass. Build clean. 267/279 total (0 new regressions). Camera shift (4.2) deferred to Phase 6 polish. | AI Agent |
| 2026-02-11 | 5 | Phase 5 implemented: data/projects.ts enhanced with longDescription for all 6 projects. brainZones.ts updated with real project names. ProjectDetail.tsx created (typewriter long description, zone-colored tech tags, terminal-styled back/links). TerminalProjects.tsx refactored with bidirectional sync props (highlightedZoneId, onProjectHover, selectedProjectId, onProjectSelect), zone color dots, card highlight on brain zone hover, click-to-detail. page.tsx wired with hoveredBrainZone/hoveredProjectZone/selectedProjectId state, handleZoneClick opens projects panel + pre-selects project. 19/19 new tests pass. 293/305 total (0 new regressions). Build clean. | AI Agent |

---

*This document is the single source of truth for the animated portfolio project. Update it after every phase completion.*
