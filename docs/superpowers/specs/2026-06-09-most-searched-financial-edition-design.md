# The Internet's Most Searched — Financial Edition: Design Spec

**Date:** 2026-06-09
**Status:** Approved design, ready for implementation plan

## Goal

Build a data-driven system of "answer pages" that rank #1 for specific-number financial search queries and get cited by AI answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini, Claude). Brand them as "The Internet's Most Searched — Financial Edition". Rebrand the existing blog hub around this concept without losing any existing URLs, and feature it prominently on the homepage.

## Strategic Rationale

Specific-number queries ("how much is a £200k mortgage per month", "$60,000 after tax") have high intent and low competition. AI engines lift the most direct, well-structured answer verbatim. By answering the exact question in the first 40 words, wrapping it in `speakable` + `QAPage` + FAQ schema, and backing it with author E-E-A-T, these pages win both classic SERP position and AI citation. Both UK and US markets are targeted from day one because a US pivot is imminent.

## Key Decisions (locked)

- **Blog relationship:** Rebrand `/blog` hub to "Most Searched" branding; keep ALL existing `/blog/*` URLs alive (alias). Zero SEO loss.
- **URL structure:** `/most-searched/<market>/<slug>` where market ∈ {uk, us}. Example: `/most-searched/uk/40000-after-tax`.
- **Batch:** ~30 pages — 15 UK + 15 US equivalents.
- **Query type:** Specific-number queries (fast wins).
- **Calculator pre-fill:** Yes, via URL params.
- **Authorship:** M Singh CeMAP DipFA byline on all pages.
- **Visual:** Hybrid — loud "thumbnail energy" homepage feature; sleek/editorial answer pages.
- **Architecture:** Data-driven. One template component + one data file per page + auto-generated routes/sitemap.

## The 30 Target Queries

### UK (15)

**Mortgage**
1. `uk/200k-mortgage-monthly-payment` — How much is a £200,000 mortgage per month?
2. `uk/300k-mortgage-monthly-payment` — How much is a £300,000 mortgage per month?
3. `uk/salary-for-400k-house` — What salary do I need for a £400,000 house?
4. `uk/deposit-for-250k-house` — How much deposit for a £250,000 house?

**Salary / take-home**
5. `uk/30000-after-tax` — £30,000 after tax UK
6. `uk/40000-after-tax` — £40,000 after tax UK
7. `uk/50000-after-tax` — £50,000 after tax UK
8. `uk/60000-after-tax` — £60,000 after tax UK
9. `uk/100000-after-tax` — £100,000 after tax UK

**Savings / investing**
10. `uk/500-a-month-20-years` — How much is £500 a month invested for 20 years?
11. `uk/10000-invested-10-years` — How much would £10,000 grow in 10 years?
12. `uk/save-100k-by-40` — How much to save to have £100k by 40?

**Debt**
13. `uk/payoff-5000-credit-card` — How long to pay off £5,000 credit card?
14. `uk/10000-credit-card-interest` — Interest on £10,000 credit card at 24% APR?

**Pension**
15. `uk/pension-to-retire-at-60` — How much pension do I need to retire at 60?

### US (15) — equivalents with US tax/mortgage/retirement systems

**Mortgage**
1. `us/200k-mortgage-monthly-payment` — How much is a $200,000 mortgage per month?
2. `us/300k-mortgage-monthly-payment` — How much is a $300,000 mortgage per month?
3. `us/salary-for-400k-house` — What salary do I need for a $400,000 house?
4. `us/down-payment-for-250k-house` — How much down payment for a $250,000 house?

**Salary / take-home (federal + FICA + representative state)**
5. `us/30000-after-tax` — $30,000 after tax
6. `us/40000-after-tax` — $40,000 after tax
7. `us/50000-after-tax` — $50,000 after tax
8. `us/60000-after-tax` — $60,000 after tax
9. `us/100000-after-tax` — $100,000 after tax

**Savings / investing**
10. `us/500-a-month-20-years` — How much is $500 a month invested for 20 years?
11. `us/10000-invested-10-years` — How much would $10,000 grow in 10 years?
12. `us/save-100k-by-40` — How much to save to have $100k by 40?

**Debt**
13. `us/payoff-5000-credit-card` — How long to pay off $5,000 credit card?
14. `us/10000-credit-card-interest` — Interest on $10,000 credit card at 24% APR?

**Retirement**
15. `us/401k-to-retire-at-60` — How much 401(k) do I need to retire at 60?

## Architecture

### Data-driven, not 30 hand-written page files

**Components / files:**

1. **`src/data/most-searched/types.ts`** — TypeScript interfaces for an answer page's data.
2. **`src/data/most-searched/<market>/<slug>.ts`** — one data file per page (~40 lines): question, market, category, pre-computed answer string + number, assumptions, comparison-table rows, FAQ list, calculator link + pre-fill query params, related slugs.
3. **`src/data/most-searched/index.ts`** — registry that imports all data files into a typed array; exports helpers `getAllAnswerPages()`, `getByMarket(market)`, `getBySlug(market, slug)`, `getByCategory()`.
4. **`src/components/most-searched/AnswerPage.tsx`** — the single market-aware template that renders any answer page from its data object. Handles all schema wiring (article + FAQ + speakable + QAPage).
5. **`src/components/most-searched/AnswerComparisonTable.tsx`** — reusable table.
6. **`src/components/most-searched/AnswerChart.tsx`** — sleek editorial mini data-viz (Recharts, dark theme).
7. **`src/components/most-searched/MostSearchedCard.tsx`** — the question+number card used on hub and homepage.
8. **`src/pages/most-searched/MostSearchedHub.tsx`** — rebranded hub at `/most-searched` with UK/US toggle + category filter; features answer pages, lists existing blog posts below as "Guides & Deep Dives".
9. **Route generation:** `src/routes/index.tsx` maps over the registry to produce `/most-searched/:market/:slug` routes (a single route component that looks up the data by params), plus the hub route. Existing `/blog/*` routes remain untouched.

### Market-aware calculation helpers

**`src/data/most-searched/calc.ts`** — pure functions used to compute (and verify) the displayed numbers:
- `ukTakeHome(gross)` — PAYE + NI for 2025/26 (Personal Allowance £12,570, basic 20% to £50,270, higher 40% to £125,140, additional 45%; NI 8% / 2%).
- `usTakeHome(gross, state)` — federal brackets 2025 + FICA (6.2% SS to wage cap, 1.45% Medicare) + a representative state (default: no-state-tax baseline shown, with note).
- `mortgagePayment(principal, annualRatePct, years)` — standard amortisation `M = P·r·(1+r)^n / ((1+r)^n − 1)`.
- `futureValueMonthly(pmt, annualRatePct, years)` — FV of a monthly contribution annuity.
- `creditCardPayoffMonths(balance, aprPct, monthlyPayment)` and `creditCardAnnualInterest(balance, aprPct)`.

Numbers in data files are pre-computed for display but MUST match these helpers (verified in tests). Assumptions are shown on-page for transparency/E-E-A-T.

### Calculator pre-fill via URL params

Each answer page's CTA links to its calculator with query params (e.g. `/finance/mortgage?amount=200000&rate=5&term=25`). The target calculators read params on mount and pre-populate inputs. Calculators to wire: mortgage, salary (UK), us-salary, savings, compound-interest, credit-card-payoff, retirement. Wiring reads existing input state setters from a `useSearchParams` effect; if a param is absent, behaviour is unchanged.

## Page Anatomy (render order in AnswerPage.tsx)

1. Breadcrumb: Most Searched › Category › Question
2. H1 = the question, phrased as typed
3. **Answer callout** in first 40 words (highlighted), wrapped with speakable selector
4. "How this is calculated" — formula + assumptions (term, rate, tax year, state)
5. Comparison table (number across rate/term/state variations)
6. Editorial mini chart (breakdown)
7. "Open in calculator" CTA (pre-fill params)
8. 3–5 FAQs (faqSchema)
9. Author byline (M Singh CeMAP DipFA) + last-updated
10. Related most-searched links (internal linking)

**Schema per page:** articleSchema + faqSchema + speakableSelectors + a QAPage/structured answer object passed to `structuredData`.

## Homepage Feature

New band under hero/search, before Browse Categories, in `src/pages/Index.tsx`:
- Eyebrow: **THE INTERNET'S MOST SEARCHED** · Financial Edition
- Subhead: "The money questions everyone Googles — answered with the actual numbers."
- UK 🇬🇧 / US 🇺🇸 toggle that swaps the featured cards' market.
- 4–6 high-contrast cards, each = question + surprising number, bold type, hover lift ("thumbnail energy").
- CTA → `/most-searched`.

## Rebranded Hub + Navigation

- `/most-searched` (new, sleek/editorial): brand hero, UK/US toggle, category filters (Mortgage · Salary · Savings · Debt · Pension/Retirement), answer-page grid up top, existing blog posts below as "Guides & Deep Dives".
- Navbar/NavigationMenu: "Blog" label → "Most Searched", pointing to `/most-searched`. Keep `/blog` route as alias (BlogIndex stays reachable; or hub absorbs it). All `/blog/*` article URLs unchanged.

## AI-Targeting Layer

- Consistent "most searched / here's the answer" framing site-wide.
- `speakable` answer callouts on every page.
- Full schema stack (above).
- Author E-E-A-T byline.
- Update `public/llms.txt` to describe the Most Searched section and list key answer-page URLs.
- Add all 30 answer-page URLs + hub to `public/sitemap.xml` (answer pages priority 0.8, hub 0.9).

## Testing

- Unit tests for `calc.ts` helpers (known-value assertions, e.g. £60,000 → £44,035 take-home 2025/26; £200k/25yr/5% → £1,169/mo).
- Test that every data file's displayed `answerNumber` matches the corresponding `calc.ts` output (guards against stale content).
- Test the registry: every slug unique per market, every page has required fields, every related-slug resolves.
- Build smoke: `npx tsc --noEmit` clean + `npm run build` renders all `/most-searched/*` pages.

## Out of Scope (this build)

- Broad-concept queries (separate future batch).
- Additional markets beyond UK/US.
- Auto-generation of social/OG thumbnail images (manual or later).
- Pages beyond the 30 listed (registry makes adding more trivial later).

## Success Criteria

- 30 answer pages live, each with the answer in the first 40 words + full schema.
- Homepage feature band with working UK/US toggle.
- `/most-searched` hub live; all existing `/blog/*` URLs still resolve.
- Calculator pre-fill works for linked calculators.
- `tsc` clean, build renders all pages, sitemap + llms.txt updated.
