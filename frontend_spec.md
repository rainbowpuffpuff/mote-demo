# Mote — Frontend Demo Technical Specification

**Version:** 0.1 (Hackathon demo)
**Status:** Draft
**Companion to:** `notes_skills.md` (full SRS)
**Scope of this doc:** the frontend demo only. Backend, contracts, Swarm, and decision-market resolution are mocked or stubbed — the goal is a believable, on-rails walkthrough of the product idea.

---

## 1. Demo intent

This is a **storytelling artifact**, not a product. It must:

1. Make the three primitives (local LLM, encrypted storage, decision-market curation) feel real on screen in under three minutes.
2. Hold up under live demo lighting: no spinners that hang, no empty states, no console errors.
3. Be fully reproducible from seeded mock data — no live network dependencies on the critical path.

Anything not on the demo path is explicitly out of scope, including auth flows, error recovery beyond toast-level, settings, and account management.

---

## 2. Demo path (the only path that must work)

The demo is a guided four-act sequence. Each act is a distinct route. A persistent "Demo" pill in the top-right shows act number and a "next step" hint for the presenter.

| Act | Route | Persona | Outcome |
|-----|-------|---------|---------|
| 1 | `/vault` | Sasha (seller) | Paste fragment → local LLM analysis → list to marketplace |
| 2 | `/market` | Bo (buyer) | Browse DeFi alpha category → see featured slot → click into a listing |
| 3 | `/market/:id` → `/library/:id` | Bo (buyer) | Pay → key release animation → decrypted content reveal |
| 4 | `/curate/defi-alpha` | Cee (curator) | Open decision market → place trade → compressed TWAP resolves → featured slot updates |

A persona switcher in the top nav (`Sasha · Bo · Cee · Ari`) swaps wallet pseudonym, address, and balance. Each persona has a pre-seeded state. Switching personas does *not* require re-routing — current page stays.

---

## 3. Information architecture

```
/                    → redirects to /vault on first load
/vault               → Sasha's local fragments (drafts + listed)
/vault/new           → fragment composer + LLM analysis panel
/vault/:id           → fragment detail (draft or listed)
/market              → category grid + global featured strip
/market/:category    → listings in a category, with featured slot pinned
/market/listing/:id  → listing detail (description, price, buy)
/library             → Bo's purchased items
/library/:id         → decrypted content viewer
/curate              → all open decision markets
/curate/:category    → single decision market with order book + resolution timer
/agent               → JSON feed preview (read-only) for the Ari narrative beat
```

Navigation: persistent left sidebar with five entries — **Vault**, **Market**, **Library**, **Curate**, **Agent feed**. Active route highlighted.

---

## 4. Visual language

- **Tone.** Quiet, document-like, slightly typographic. This is a marketplace for ideas, not a casino.
- **Type.** Inter for UI, a serif (Source Serif or similar) for fragment content and descriptions — signals "this is the artifact, not the chrome."
- **Color.** Near-monochrome neutral base. One accent (warm amber) for the featured slot and decision-market action states. One muted green for "purchased / unlocked." One muted red reserved for delisting and resolution-loss states only.
- **Density.** Generous whitespace on listing pages — each listing should feel like an object, not a row.
- **Motion.** Restrained. The only celebratory animations are (a) the key-release reveal on purchase and (b) the featured-slot swap on market resolution. Everything else is fade/slide under 200ms.
- **Dark mode.** Out of scope for demo.

Component kit: shadcn/ui (Radix primitives) over Tailwind. Lucide for icons. Framer Motion for the two hero animations. No custom design system beyond tokens.

---

## 5. Screens — detailed

### 5.1 `/vault` — Sasha's vault

**Purpose:** show that knowledge exists locally before it's ever a listing.

**Layout.** Two-column. Left rail: status filter (All / Draft / Listed / Sold). Main: list of fragment cards.

**Fragment card.**
- Title (auto-generated from first line, editable inline).
- 2-line preview, italicized, prefixed with a small lock icon.
- Status pill: `Draft`, `Listed · $24`, `Sold · $24 · 2 buyers`.
- Created timestamp, relative.
- Hover reveals: Open, Delete (drafts only), Delist (listed only).

**Empty state.** Single CTA card: "Paste your first fragment." Demo always has 3 seeded fragments, so this should not appear on the live path.

**Top bar action.** `+ New fragment` → `/vault/new`.

### 5.2 `/vault/new` — composer + analysis

**Purpose:** the marquee seller moment. Make the local LLM feel tangible.

**Layout.** Split pane.

- **Left (fragment composer).**
  - Title input (optional).
  - Large textarea with monospace fallback for pasted content. Character counter, soft warning at 18 KB, hard stop at 20 KB.
  - Below: "**This stays on your device.**" with a small device icon. This copy is part of the pitch and must remain visible.
  - Button: `Analyze locally` (disabled until ≥ 200 chars).

- **Right (analysis panel).** Three states:
  1. **Idle.** Placeholder card: "Mote will read this on-device and suggest a category, descriptions, and a fair price. Nothing leaves this machine."
  2. **Analyzing.** Skeleton with a small "Running Gemma locally · 1.2s" ticker. Demo runs a scripted 2.4s timeline so the moment lands; do not show indeterminate spinners.
  3. **Result.**
     - **Category** chip (e.g. `DeFi alpha`) with a small "change" affordance.
     - **Descriptions** — three radio cards, each labeled by length (Short · Medium · Long) and tone (Plain · Punchy · Analytic). Selecting one previews it as it will appear on the listing card.
     - **Suggested price** — large number, e.g. `$24`. A slider lets the user adjust ±50%. A small caption explains the heuristic ("baseline for category · length · specificity · recency").
     - **Privacy note** restated: "Once you list, the encrypted blob goes to Swarm. The key is held in escrow and released to the buyer on payment."
     - Primary CTA: `List for $24`. Secondary: `Save draft`.

**Submit interaction.** Clicking `List for ...`:
1. Button morphs into a 3-step progress strip: `Encrypting · Uploading to Swarm · Publishing listing`. Each step ~600ms, scripted.
2. Toast confirms with a link to `/market/listing/:id`.
3. Route returns to `/vault`, new card has `Listed` pill with a brief amber pulse.

### 5.3 `/market` — category grid

**Purpose:** establish that this is a marketplace, and that featured slots are the scarce resource.

**Top strip.** Globally featured listing — the current winner of the most-watched decision market. Wide card with: category tag, description, price, seller pseudonym, "Featured by curators" microcopy.

**Category grid.** 6 categories as tiles: `DeFi alpha`, `Personal finance`, `Productivity`, `Health`, `Relationships`, `Career`. For the hackathon demo, only `DeFi alpha` and `Personal finance` are populated; the rest are visible but greyed with a "Opening soon" overlay. This is intentional — it shows the shape of the marketplace without overcommitting.

**Tile.** Category name, count of active listings, current featured listing's first line, and a small "Curation market open · resolves in 1:42" countdown when applicable.

### 5.4 `/market/:category` — category page

**Purpose:** show that the featured slot is privileged, and that the rest is browsable.

**Layout.**
- Featured slot pinned at the top, full-width card with amber accent border, "Featured this epoch" label, and a tiny link "Why this listing? → Curation market".
- Filters row: price range slider, recency dropdown (Any · 24h · 7d · 30d).
- Grid of listing cards (3 per row on desktop).

**Listing card.**
- Description (the LLM-chosen one).
- Price (large).
- Seller pseudonym + truncated address.
- Category tag.
- Posted relative time.
- No content preview. This absence is the product. A tiny info icon explains: "You'll see the contents after purchase. The description is generated by the seller's local model, not the seller."

### 5.5 `/market/listing/:id` — listing detail

**Layout.** Centered, narrow column (max 640px). Reads like a product page for a thought.

- Category tag.
- Description in serif, large.
- Seller pseudonym, address, member-since.
- Price, with a small "Estimated by seller's local model" tooltip.
- `Buy for $24` primary CTA.
- Below the fold: a small "How this works" expander with three lines on encryption, key release, and Swarm.

**Buy interaction.**
1. CTA opens a wallet-connect modal (mocked — shows a fake MetaMask UI with the active persona's address pre-filled, single `Sign` button).
2. On sign: full-screen overlay with a three-stage animation:
   - **Payment confirming** — pulsing dot, "Waiting for confirmation · block 12,481,402".
   - **Key released** — a stylized key glyph slides from a lock icon (seller side) to an unlocked icon (buyer side). This is the hero animation. ~1.2s.
   - **Decrypting locally** — quick shimmer over a redacted text block that resolves to readable serif.
3. Auto-route to `/library/:id`.

### 5.6 `/library` and `/library/:id`

**Purpose:** post-purchase ownership. Lightweight.

`/library` lists purchased fragments as cards similar to vault, with `Unlocked` pill and purchase price.

`/library/:id` is a clean reader: title, category tag, full content in serif, seller credit at the bottom. A small "Re-fetch from Swarm" link demonstrates that the content is on the network, not on our server.

### 5.7 `/curate/:category` — decision market

**Purpose:** the hardest concept to convey. The screen has to make "traders are choosing the featured slot, with skin in the game" obvious in ten seconds.

**Layout.** Three vertical regions.

- **Header.** Category name, current epoch number, resolution countdown (compressed to ~3 minutes for demo). A short caption: "Whichever listing the market expects to drive the most category volume wins the featured slot."

- **Candidates rail (5 cards + No-op).** Each card shows:
  - The candidate listing (mini version of the listing card).
  - Conditional price line: `If featured → $0.41 share` (Umia conditional token price).
  - 24h price spark line.
  - Buttons: `Buy YES` / `Buy NO` (mocked; opens a tiny trade ticket).
  - A thin volume bar.
  - The current leader has the amber border.

- **Activity feed.** Live-updating list of mock trades: "0xA1…3f bought 24 YES on Listing C @ $0.39". 1 row every ~3s, looped from a seeded script.

**Resolution moment.** When the countdown hits zero:
1. All YES/NO buttons disable with a "Resolving" overlay.
2. A short bar chart animates in showing TWAP for each candidate.
3. Winner banner slides in: "Listing C wins — featured for next epoch."
4. A toast offers `View on /market/defi-alpha →`. Clicking shows the featured slot has swapped.

**Trade ticket (modal).** Minimal. Side (YES/NO), shares, cost, slippage line, `Confirm`. On confirm, the activity feed shows the trade attributed to the active persona. No real chain calls.

### 5.8 `/agent` — JSON feed preview

**Purpose:** 15 seconds of narrative — "agents can browse this without ever seeing the content."

Single page: a syntax-highlighted JSON viewer showing the public listings feed. Above it: a small fake terminal with a curl command that reveals the same payload. A copy button. One sentence under: "Read-only for the demo. Programmatic purchase comes after."

---

## 6. Component inventory

Top-level components needed (all in `src/components/`):

- `AppShell` — sidebar + topbar + persona switcher + demo pill
- `PersonaSwitcher`
- `FragmentCard`, `FragmentComposer`, `AnalysisPanel`, `DescriptionOption`, `PriceSlider`
- `ListingCard`, `ListingDetail`, `BuyButton`, `WalletModal`, `PurchaseOverlay`
- `CategoryTile`, `FeaturedStrip`, `FilterBar`
- `LibraryCard`, `ContentReader`
- `CandidateCard`, `TradeTicket`, `ResolutionTimer`, `ActivityFeed`, `TwapBar`
- `JsonFeedViewer`
- Primitives: `Pill`, `Tag`, `Tooltip`, `Toast`, `Skeleton`, `CountdownPill`

---

## 7. Mock data layer

All state lives in a Zustand store, hydrated from static seed files in `src/seed/`. No backend, no contracts, no Swarm.

**Seed files.**
- `personas.ts` — 4 personas with pseudonym, address, balance, current state per page.
- `fragments.ts` — 5 seeded fragments (3 for Sasha, 2 for the marketplace from other authors).
- `listings.ts` — 14 listings across DeFi alpha (8) and Personal finance (6).
- `markets.ts` — 1 active decision market for `defi-alpha`, 5 candidates + no-op, with a scripted price-and-trade timeline keyed to seconds.
- `trades.ts` — pre-rolled list of activity-feed entries.

**Scripted clocks.**
- LLM analysis: 2.4s scripted timeline with phase labels.
- Purchase: 2.4s total (0.6 + 1.2 + 0.6).
- Decision-market resolution: 3-minute countdown, but presenter has a hidden hotkey (`Cmd+.`) to fast-forward to T-15s.

**Persistence.** State persists to `localStorage` so the demo survives a refresh. A `Reset demo` button in the topbar resets to the original seed in one click. This is the single most important presenter affordance — rehearse with it.

---

## 8. LLM integration (demo posture)

For the frontend demo, the local LLM is **scripted, not live**. The composer triggers a deterministic mock that returns category, three descriptions, and price after the scripted delay. Rationale:

- Live WebLLM inference is viable but adds setup risk on demo hardware.
- The pitch lands the same way whether inference is real or scripted, *as long as we never claim it's real when it isn't.* The UI copy says "Running Gemma locally" — this must be true on stage, or the copy must change.

Two switchable modes behind a build flag:
- `LLM_MODE=mock` (default, demo-safe).
- `LLM_MODE=webllm` (best-effort live inference; falls back to mock with a visible banner if model load > 8s).

Either way, the analysis output schema is identical:

```ts
type Analysis = {
  category: CategoryId;
  descriptions: Array<{ length: 'short' | 'medium' | 'long'; tone: string; text: string }>;
  price: { suggested: number; min: number; max: number; rationale: string[] };
};
```

---

## 9. Wallet, contracts, storage (demo posture)

All mocked. The `WalletModal` simulates MetaMask. "Transactions" resolve via `setTimeout`. Swarm uploads/fetches are no-ops that return a deterministic fake reference. Listing IDs are UUIDs assigned client-side.

This is a frontend demo — making any of these real before the UI is locked is wasted work. The architecture in `notes_skills.md §6` remains the production target; this section just declares the demo's honesty boundary.

---

## 10. Routing, state, and tech choices

| Concern | Choice | Note |
|---|---|---|
| Framework | Vite + React 18 + TypeScript | Fastest path to a polished SPA |
| Routing | React Router v6 | |
| State | Zustand + immer | One store, sliced per domain |
| Styling | Tailwind + shadcn/ui | |
| Animation | Framer Motion | Used sparingly, two hero moments only |
| Charts | Recharts | TWAP bar + sparklines only |
| Icons | Lucide | |
| JSON viewer | `react-json-view-lite` | Agent feed page |
| Build | Vite | `pnpm dev` for live, `pnpm build && pnpm preview` for stage |

No SSR. No auth. No analytics. No error tracking. Deploy target: Vercel preview or local `vite preview` on the demo machine.

---

## 11. Accessibility & responsiveness

- Keyboard-navigable: all CTAs reachable via Tab, modal traps focus, Esc closes.
- Color contrast meets WCAG AA on all primary text.
- Responsive down to 1280px (the demo machine's resolution). Mobile is out of scope; on `< 768px` show a static "Best viewed on desktop for the demo" interstitial rather than half-broken layouts.

---

## 12. Demo-day affordances (presenter tools)

These are not user-facing but are required for a clean stage run.

- `Reset demo` button (topbar).
- Hidden hotkeys:
  - `Cmd+.` — fast-forward decision-market resolution to T-15s.
  - `Cmd+/` — toggle the demo pill / hint overlay.
  - `Cmd+1..4` — jump persona.
- A `?seed=alt` URL parameter loads an alternative seed (different listings, different winner) in case Q&A needs a second run-through.
- Console is silenced (no warnings, no React-strict double-fires visible). This matters more than people think under projector conditions.

---

## 13. Build order (suggested)

A frontend-only build, sequenced for the shortest path to a demo-able artifact:

1. `AppShell`, routing, persona switcher, seed loader, `Reset demo`.
2. `/vault` and `/vault/new` with scripted analysis.
3. `/market`, `/market/:category`, `/market/listing/:id` with mocked buy flow.
4. `/library` and content reader.
5. `/curate/:category` — the most complex screen; build last so the surrounding context is locked.
6. `/agent` JSON feed.
7. Polish pass: animations, empty states, copy review, color/contrast audit.
8. Two full dry runs on the demo machine, including a deliberate `Reset demo` mid-run.

---

## 14. Definition of done (demo)

The frontend is ready when:

1. The four-act demo path runs end-to-end on the demo machine in under 3 minutes with no console errors.
2. `Reset demo` returns to a known good state in under 1 second.
3. Every "this stays local" / "encrypted on Swarm" / "curators have skin in the game" claim in the UI is either true or visibly labeled as scripted-for-demo.
4. The hero moments — local analysis result, key-release on purchase, decision-market resolution — each land in their own visual beat without competing animations.

Everything else is decoration.
