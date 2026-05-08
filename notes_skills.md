# Mote — Software Requirements Specification

**Version:** 0.1 (Hackathon)
**Status:** Draft
**Last updated:** May 2026

> Working name: *Mote* — small motes of knowledge drifting between minds. Rename freely.

---

## 1. Vision & Problem

### 1.1 Problem statement

Knowledge transfers between humans at every granularity, from textbooks to passing remarks. But markets only exist for the largest units: courses, books, consultations, paid newsletters. The *smallest economically valuable unit* — a single insight, a regulation strategy that worked, an on-chain alpha tip, a productivity micro-move — has no real marketplace. Three reasons it has resisted being one:

1. **Asymmetric information.** A buyer can't evaluate a paragraph without reading it; once they've read it, they no longer need to buy it. This is the lemons problem applied to knowledge.
2. **Discovery and trust.** Without scaffolding, buyers can't separate signal from spam, so they don't show up.
3. **Listing friction.** Encrypting, describing, pricing, and selling a paragraph is more work than the paragraph is worth.

### 1.2 Thesis

Three primitives, combined, make the smallest unit of knowledge sellable for the first time:

1. **A local LLM as trusted middleman.** It reads the content, generates honest descriptions and price estimates, and never transmits the content off-device. Buyers learn what an asset is *about* without seeing it; sellers don't have to write marketing copy.
2. **Encrypted decentralized storage (Swarm).** Content is encrypted locally and replicated. Buyers receive decryption access on payment — not cleartext from the seller.
3. **Decision-market curation (Umia).** Instead of opaque ranking, traders take economic positions on which listings deserve the featured slot. Curation has skin in the game and resolves toward listings that actually drive category volume.

Mote is the marketplace these primitives unlock: humans sell sub-course knowledge to other humans, while AI agents can browse, summarize, and recommend listings to their humans without ever seeing the protected content.

### 1.3 Why now

Local LLMs have crossed the quality threshold for trustworthy text summarization on consumer hardware. Decision-market infrastructure is shipping in production via Umia. Encrypted decentralized storage is mature via Swarm. The substrate for this product exists for the first time, and the surrounding shift toward agent-mediated discovery means the listings are useful even before human buyers show up at scale.

---

## 2. Scope

### 2.1 In scope (hackathon demo)

- Local-first vault for text knowledge fragments
- Local LLM analysis: category tag, three candidate descriptions, fair-price estimate
- Listing creation with Swarm-backed encrypted storage
- Marketplace browsing with category navigation and a featured slot
- Wallet-based purchase flow with on-payment key release
- One live decision market for category curation, with sponsor-bootstrapped liquidity
- Vertical seed: on-chain alpha / personal finance (the audience already pays for this kind of content, which makes price discovery legible on stage)

### 2.2 Out of scope (post-hackathon)

- Non-text data types (CSV, biometric exports, audio, video)
- Reputation and refund system
- Mobile clients
- Marketplace token launch and final token economics
- Multi-vertical category expansion (health, relationships, professional skills) — gestured at in narrative, not built
- Agent-side autonomous purchase APIs

### 2.3 Mocked for demo

- TWAP resolution window compressed from days to ~3 minutes
- Decision-market liquidity provided by team/sponsor wallets
- Seed listings authored by team to populate the demo categories

---

## 3. Personas

**Sasha (Seller).** Has tacit knowledge — a yield-farming setup, a relationship habit, a productivity trick. Won't write a course. Will paste a paragraph if listing takes 60 seconds.

**Bo (Buyer).** Wants targeted insight or alpha. Reads ranked listings with LLM-generated descriptions; pays a few dollars to a few tens of dollars for high-signal items.

**Cee (Curator/Trader).** Trades in category decision markets. Profits if their featured pick drives volume.

**Ari (Agent).** An AI assistant browsing on behalf of its human. Reads JSON listing feeds, surfaces candidates, confirms purchase intent with the human, retrieves and summarizes after purchase.

---

## 4. Functional Requirements

### F1 — Vault

- F1.1 User can paste or upload a text fragment (≤ 20 KB for hackathon).
- F1.2 Fragment is stored locally, encrypted with a user-held key.
- F1.3 Vault lists fragments with status: draft / listed / sold.
- F1.4 User can delete drafts; listed items can be delisted but persist on Swarm until expiry.

### F2 — LLM analysis

- F2.1 On user request, a local LLM reads the fragment.
- F2.2 LLM outputs: a category tag from a fixed taxonomy, three candidate descriptions varying in length and style, and a fair-price estimate.
- F2.3 Pricing heuristic considers: category baselines, fragment length, specificity signals, recency / time-sensitivity. Flagged as heuristic and tunable.
- F2.4 User picks one of the three descriptions and may accept or override the suggested price.
- F2.5 The fragment never leaves the device prior to encryption. The LLM runs entirely locally.

### F3 — Listing creation

- F3.1 On listing, fragment is encrypted with a per-listing symmetric key.
- F3.2 Encrypted blob uploaded to Swarm; reference returned.
- F3.3 Listing metadata (description, category, price, Swarm reference, seller wallet) is published to the marketplace contract.
- F3.4 Per-listing key is committed to an escrow construct that releases on payment.

### F4 — Marketplace browsing

- F4.1 Category navigation with a "Featured" slot per category, populated by decision-market resolution.
- F4.2 Listing cards show LLM description, price, seller pseudonym, and category.
- F4.3 Filters: price range, recency.
- F4.4 No content preview beyond the LLM description — this is the product's core trust mechanism, not an oversight.

### F5 — Purchase

- F5.1 Buyer connects wallet and signs purchase transaction.
- F5.2 On payment confirmation, per-listing key releases to buyer.
- F5.3 Buyer client fetches encrypted blob from Swarm, decrypts locally, displays.
- F5.4 Seller receives payment minus marketplace fee. Fee accrues to treasury.

### F6 — Decision market for curation

- F6.1 Per category, per epoch (demo: ~3 minutes; production target: weekly), a decision market opens.
- F6.2 Market options: feature listing A, B, C, D, or E, plus a no-op.
- F6.3 Resolution metric: category sales volume in the period following resolution.
- F6.4 Highest TWAP wins at deadline, conditional on a threshold spread against no-op.
- F6.5 Winner takes the featured slot for the next epoch.
- F6.6 Built directly on Umia's decision-market primitives — *do not* reimplement conditional-token logic from scratch.

### F7 — Agent-readable feed

- F7.1 JSON endpoint exposing listings (category, description, price, seller pseudonym, purchase address) for agent consumption.
- F7.2 Read-only for hackathon. Programmatic purchase is post-MVP.

---

## 5. Non-functional Requirements

- **Privacy.** Cleartext never leaves the seller device prior to encryption. LLM is local.
- **Custody.** Sellers retain encryption keys until purchase. Marketplace contract mediates release.
- **Latency.** Vault → LLM → listed in under 30 seconds end-to-end on demo hardware.
- **Auditability.** Listings, purchases, and decision-market resolutions are onchain.
- **Failure modes.** If LLM analysis fails, listing flow halts gracefully — no stub descriptions ever published.

---

## 6. Architecture (demo)

**Client (browser, wallet-connected)**
- React + TypeScript + Tailwind
- viem / wagmi for wallet and contract interaction
- WebLLM or Gemma-based local runtime for in-browser inference
- Swarm gateway client for upload / fetch
- IndexedDB / OPFS for vault drafts and per-listing key cache

**Onchain**
- Marketplace contract (custom, minimal): listings, purchase, key-release escrow, fee accrual
- Umia decision-market contracts (sponsor infra) for category curation
- Treasury primitive for fee accrual

**Storage**
- Swarm for encrypted blob storage, accessed via Bee node or hosted gateway

---

## 7. Tech stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend | React, TypeScript, Tailwind | |
| Wallet | viem + wagmi, MetaMask / WalletConnect | |
| LLM | WebLLM with Gemma 2 or Llama 3 small | API fallback acceptable for demo if local quality blocks; disclose openly |
| Storage | Swarm (Bee node or hosted gateway) | |
| Contracts | Solidity on Umia-compatible testnet | Confirm chain choice with Umia onboarding |
| Decision markets | Umia primitives | Reuse, do not reimplement |

---

## 8. Demo script (3 minutes)

**0:00 — Hook (15s).** "Markets exist for books and courses. They don't exist for the most valuable unit of knowledge — the single insight. Here's why, and how we fix it."

**0:15 — Problem (20s).** One slide: lemons problem applied to knowledge. Buyer can't evaluate a paragraph without reading it; once read, no need to buy. Markets collapse.

**0:35 — Seller flow (45s).** Live: seller pastes a yield-farming insight. Local LLM reads it on-device. Returns "DeFi alpha" category, three descriptions, $24 price. Seller picks description #2, accepts price, hits list. Encrypted blob hits Swarm.

**1:20 — Buyer flow (40s).** Switch to buyer view. The new listing appears in the DeFi category. Featured slot is occupied by another listing. Buyer pays for one item, decryption happens client-side, content displayed.

**2:00 — Decision market (45s).** Show the open curation market for DeFi: five competing listings, conditional prices, trader positions. Compressed TWAP resolves on stage. Winner takes the featured slot for the next epoch. Explain: traders who picked correctly profited because their pick drove category volume.

**2:45 — Close (15s).** Three sentences: local LLM enables the trust, Swarm enables the storage, Umia enables the curation. Skill-fragment markets are possible for the first time.

---

## 9. Risks & mitigations

- **Local LLM quality on demo hardware.** Pre-test model on the demo machine. Prepare a clearly-labeled API fallback with the local-first story stated explicitly. Do not silently swap.
- **Decision-market liquidity.** Pre-fund trader wallets. Walk through one realistic resolution path. Do not pretend organic activity.
- **Swarm gateway latency / outage.** Pre-upload demo blobs. Prime the local cache. Have a screen-recorded backup if the live demo path breaks.
- **Wallet UX friction.** Pre-funded wallets on a fast testnet. Rehearse the signature flow until it's tight.
- **Smart-contract bugs under demo conditions.** Keep the marketplace contract minimal: listings, purchase, key release. No upgradability, no exotic features.

---

## 10. Post-hackathon roadmap

- Reputation and rating layer (sellers, buyers, with weighted refund mechanics)
- Multi-modal data (CSV first, then biometric / fNIRS exports, audio)
- Vertical expansion: health, relationships, professional micro-skills
- Marketplace token launch with Umia decision-market governance over treasury, fees, and category weights
- Agent-side SDK for autonomous browsing and purchase
- Subscription bundles per category as an alternative to one-off purchases

---

## 11. Open questions for sponsors

- **Umia:** SDK or scaffolding for conditional-token markets — what's reusable, what do we deploy ourselves? Testnet contract addresses and example resolution flows?
- **Swarm:** Recommended gateway for hackathon use, postage stamp acquisition path, reasonable blob size limits for the demo?
- **Both:** Existing demo-ready integration kits we should know about?

---

## 12. Definition of done (demo)

A working build is one where, on stage:

1. A fresh paragraph can be vaulted, analyzed by the local LLM, and listed in under 30 seconds.
2. A buyer wallet can purchase and decrypt the content in a single signed transaction.
3. A decision market for one category opens, accepts trades, resolves, and the featured slot updates accordingly.
4. The narrative — local trust, encrypted storage, market-curated discovery — lands in three sentences.

Everything else is decoration.
