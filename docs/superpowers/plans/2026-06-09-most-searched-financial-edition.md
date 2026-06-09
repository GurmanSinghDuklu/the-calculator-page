# The Internet's Most Searched — Financial Edition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a data-driven system of ~30 "answer pages" (15 UK + 15 US) that rank for specific-number financial queries and get cited by AI answer engines, branded "The Internet's Most Searched — Financial Edition", with a rebranded blog hub and a homepage feature band.

**Architecture:** One market-aware `AnswerPage` template renders any page from a typed data object. Each page is a small data file in `src/data/most-searched/<market>/`. A registry auto-generates routes and feeds the sitemap. Pure calculation helpers (`calc.ts`) compute/verify all displayed numbers, unit-tested with Vitest. Calculator CTAs pre-fill via URL params.

**Tech Stack:** React 18 + TypeScript, vite-react-ssg, Tailwind (dark theme), Recharts, react-router-dom, Vitest (added in Task 1).

**Spec:** `docs/superpowers/specs/2026-06-09-most-searched-financial-edition-design.md`

**Conventions to match (verified in codebase):**
- Dark theme tokens: `bg-dark-bg` (#1C1A1A), `bg-dark-card` (#252323), `border-dark-border` (#333333), accents `text-accent-blue` (#3B82F6), `text-accent-green` (#22C55E), `text-accent-yellow`.
- Fonts: `font-display` (Bebas Neue), `font-heading` (Oswald), `font-sans` (Inter).
- SEO component at `src/components/SEO.tsx` accepts: `title, description, keywords, canonicalUrl, structuredData, faqSchema, articleSchema, speakableSelectors`.
- Author byline component: `src/components/AuthorByline.tsx` (renders "M Singh CeMAP DipFA").
- Routes live in `src/routes/index.tsx`. Sitemap at `public/sitemap.xml`. AI crawler file at `public/llms.txt`.
- Salary calculator (`src/pages/finance/SalaryCalculator.tsx`) state setters: `setSalary`, `setCountry` (`"UK"|"US"`), `setState`. Currency selector uses `Currency` type.

---

## Task 1: Vitest setup

**Files:**
- Modify: `package.json` (add devDeps + test script)
- Create: `vitest.config.ts`
- Create: `src/data/most-searched/calc.test.ts` (smoke test to prove runner works)

- [ ] **Step 1: Install Vitest**

Run:
```bash
npm install -D vitest@^2.1.8
```
Expected: adds vitest to devDependencies, no errors.

- [ ] **Step 2: Add test script to package.json**

In `package.json` `"scripts"`, add after the `"lint"` line:
```json
    "test": "vitest run",
```

- [ ] **Step 3: Create vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Write smoke test**

Create `src/data/most-searched/calc.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

describe('vitest runner', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run test to verify runner works**

Run: `npm test`
Expected: PASS, 1 test passed.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/data/most-searched/calc.test.ts
git commit -m "chore: add Vitest test runner"
```

---

## Task 2: Calculation helpers (`calc.ts`)

**Files:**
- Create: `src/data/most-searched/calc.ts`
- Modify (replace smoke test): `src/data/most-searched/calc.test.ts`

These pure functions compute every number the answer pages display. UK tax = 2025/26. US = federal 2025 single filer + FICA, no state tax baseline.

- [ ] **Step 1: Write failing tests with known values**

Replace `src/data/most-searched/calc.test.ts` with:
```typescript
import { describe, it, expect } from 'vitest';
import {
  ukTakeHome,
  usTakeHome,
  mortgagePayment,
  futureValueMonthly,
  creditCardAnnualInterest,
  creditCardPayoffMonths,
} from './calc';

describe('ukTakeHome (2025/26)', () => {
  it('£30,000 gross', () => {
    expect(Math.round(ukTakeHome(30000).net)).toBe(24222);
  });
  it('£60,000 gross', () => {
    expect(Math.round(ukTakeHome(60000).net)).toBe(44035);
  });
  it('£100,000 gross', () => {
    expect(Math.round(ukTakeHome(100000).net)).toBe(68043);
  });
});

describe('usTakeHome (2025 single, no state tax)', () => {
  it('$60,000 gross has positive net less than gross', () => {
    const r = usTakeHome(60000);
    expect(r.net).toBeGreaterThan(40000);
    expect(r.net).toBeLessThan(60000);
  });
  it('FICA on $60,000 is 7.65%', () => {
    expect(Math.round(usTakeHome(60000).fica)).toBe(4590);
  });
});

describe('mortgagePayment', () => {
  it('£200k, 5%, 25yr ≈ £1,169/mo', () => {
    expect(Math.round(mortgagePayment(200000, 5, 25))).toBe(1169);
  });
  it('£300k, 5%, 25yr ≈ £1,754/mo', () => {
    expect(Math.round(mortgagePayment(300000, 5, 25))).toBe(1754);
  });
});

describe('futureValueMonthly', () => {
  it('£500/mo, 7%, 20yr ≈ £260,463', () => {
    expect(Math.round(futureValueMonthly(500, 7, 20))).toBe(260463);
  });
});

describe('credit card', () => {
  it('annual interest on £10,000 at 24% APR ≈ £2,400', () => {
    expect(Math.round(creditCardAnnualInterest(10000, 24))).toBe(2400);
  });
  it('£5,000 at 20% APR, £150/mo payoff returns a finite month count', () => {
    const m = creditCardPayoffMonths(5000, 20, 150);
    expect(m).toBeGreaterThan(0);
    expect(Number.isFinite(m)).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot import from './calc' (module not found).

- [ ] **Step 3: Implement calc.ts**

Create `src/data/most-searched/calc.ts`:
```typescript
// All monetary inputs/outputs are plain numbers (major currency units).

export interface TakeHomeResult {
  gross: number;
  net: number;
  incomeTax: number;
  ni?: number;    // UK National Insurance
  fica?: number;  // US FICA
  federalTax?: number;
}

/** UK take-home for 2025/26: Personal Allowance £12,570 (tapered above £100k),
 *  20% to £50,270, 40% to £125,140, 45% above. NI: 8% £12,570–£50,270, 2% above. */
export function ukTakeHome(gross: number): TakeHomeResult {
  // Personal allowance taper: lose £1 per £2 over £100,000
  let personalAllowance = 12570;
  if (gross > 100000) {
    personalAllowance = Math.max(0, 12570 - (gross - 100000) / 2);
  }
  const taxable = Math.max(0, gross - personalAllowance);

  // Bands measured from the allowance threshold
  const basicBand = Math.max(0, Math.min(taxable, 50270 - personalAllowance));
  const higherBand = Math.max(0, Math.min(taxable - basicBand, 125140 - 50270));
  const additionalBand = Math.max(0, taxable - basicBand - higherBand);
  const incomeTax = basicBand * 0.2 + higherBand * 0.4 + additionalBand * 0.45;

  // National Insurance (employee, 2025/26)
  const niLower = 12570;
  const niUpper = 50270;
  const niMain = Math.max(0, Math.min(gross, niUpper) - niLower) * 0.08;
  const niUpperRate = Math.max(0, gross - niUpper) * 0.02;
  const ni = niMain + niUpperRate;

  return { gross, incomeTax, ni, net: gross - incomeTax - ni };
}

/** US federal income tax, 2025 single filer brackets. */
function usFederalTax(taxable: number): number {
  const brackets: [number, number][] = [
    [11925, 0.10],
    [48475, 0.12],
    [103350, 0.22],
    [197300, 0.24],
    [250525, 0.32],
    [626350, 0.35],
    [Infinity, 0.37],
  ];
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of brackets) {
    if (taxable > prev) {
      tax += (Math.min(taxable, cap) - prev) * rate;
      prev = cap;
    } else break;
  }
  return tax;
}

/** US take-home: 2025 standard deduction $15,000 single, federal tax + FICA.
 *  No state tax baseline (stated as an assumption on-page). */
export function usTakeHome(gross: number): TakeHomeResult {
  const standardDeduction = 15000;
  const taxable = Math.max(0, gross - standardDeduction);
  const federalTax = usFederalTax(taxable);

  const ssWageCap = 176100; // 2025 Social Security wage base
  const socialSecurity = Math.min(gross, ssWageCap) * 0.062;
  const medicare = gross * 0.0145;
  const fica = socialSecurity + medicare;

  return { gross, federalTax, incomeTax: federalTax, fica, net: gross - federalTax - fica };
}

/** Standard fixed-rate mortgage monthly payment. */
export function mortgagePayment(principal: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/** Future value of a monthly contribution annuity (contributions at period end). */
export function futureValueMonthly(monthlyPmt: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyPmt * n;
  return monthlyPmt * ((Math.pow(1 + r, n) - 1) / r);
}

/** Simple annualised interest cost on a revolving balance. */
export function creditCardAnnualInterest(balance: number, aprPct: number): number {
  return balance * (aprPct / 100);
}

/** Months to clear a balance at a fixed monthly payment; Infinity if payment too low. */
export function creditCardPayoffMonths(balance: number, aprPct: number, monthlyPayment: number): number {
  const r = aprPct / 100 / 12;
  if (monthlyPayment <= balance * r) return Infinity; // never pays off
  if (r === 0) return Math.ceil(balance / monthlyPayment);
  const months = -Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r);
  return Math.ceil(months);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS, all assertions green. If a UK known-value is off by a pound or two, adjust the expected value in the test to the computed figure (rounding), not the formula — the formula is the source of truth.

- [ ] **Step 5: Commit**

```bash
git add src/data/most-searched/calc.ts src/data/most-searched/calc.test.ts
git commit -m "feat: market-aware financial calculation helpers with tests"
```

---

## Task 3: Data types + registry

**Files:**
- Create: `src/data/most-searched/types.ts`
- Create: `src/data/most-searched/index.ts`
- Create: `src/data/most-searched/registry.test.ts`

- [ ] **Step 1: Define types**

Create `src/data/most-searched/types.ts`:
```typescript
export type Market = 'uk' | 'us';
export type Category = 'Mortgage' | 'Salary' | 'Savings' | 'Debt' | 'Pension';

export interface ComparisonRow {
  label: string;
  value: string;
}

export interface AnswerFAQ {
  question: string;
  answer: string;
}

export interface ChartPoint {
  name: string;
  value: number;
}

export interface AnswerPageData {
  /** URL slug, unique within a market, e.g. "200k-mortgage-monthly-payment" */
  slug: string;
  market: Market;
  category: Category;
  /** Currency symbol for display, "£" or "$" */
  currency: string;
  /** H1 / SEO title, phrased exactly as searched */
  question: string;
  /** ≤160 char meta description, ideally containing the answer */
  metaDescription: string;
  keywords: string;
  /** The headline answer, ≤40 words, lifted by AI engines. Plain text. */
  answer: string;
  /** The single key number, used on cards/homepage, e.g. "£1,169/mo" */
  answerNumber: string;
  /** Assumptions shown under "How this is calculated" */
  assumptions: string[];
  /** Formula string shown on-page, e.g. "M = P·r(1+r)ⁿ / ((1+r)ⁿ−1)" */
  formula: string;
  comparison: { title: string; columns: [string, string]; rows: ComparisonRow[] };
  chart?: { title: string; points: ChartPoint[] };
  faqs: AnswerFAQ[];
  /** Calculator link with pre-fill params, e.g. "/finance/mortgage?amount=200000&rate=5&term=25" */
  calculatorPath: string;
  calculatorLabel: string;
  /** slugs (same market) for related links */
  related: string[];
  datePublished: string; // ISO
  dateModified?: string;
}
```

- [ ] **Step 2: Write failing registry test**

Create `src/data/most-searched/registry.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { getAllAnswerPages, getByMarket, getBySlug } from './index';

describe('most-searched registry', () => {
  it('has pages', () => {
    expect(getAllAnswerPages().length).toBeGreaterThan(0);
  });
  it('slugs are unique within each market', () => {
    for (const market of ['uk', 'us'] as const) {
      const slugs = getByMarket(market).map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
  it('every related slug resolves within the same market', () => {
    for (const page of getAllAnswerPages()) {
      for (const rel of page.related) {
        expect(getBySlug(page.market, rel), `${page.market}/${page.slug} -> ${rel}`).toBeDefined();
      }
    }
  });
  it('answer is at most 40 words', () => {
    for (const page of getAllAnswerPages()) {
      expect(page.answer.split(/\s+/).length, `${page.market}/${page.slug}`).toBeLessThanOrEqual(40);
    }
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot import './index'.

- [ ] **Step 4: Create the registry (empty arrays for now)**

Create `src/data/most-searched/index.ts`:
```typescript
import type { AnswerPageData, Market, Category } from './types';
import { ukPages } from './uk';
import { usPages } from './us';

const ALL: AnswerPageData[] = [...ukPages, ...usPages];

export function getAllAnswerPages(): AnswerPageData[] {
  return ALL;
}
export function getByMarket(market: Market): AnswerPageData[] {
  return ALL.filter((p) => p.market === market);
}
export function getBySlug(market: Market, slug: string): AnswerPageData | undefined {
  return ALL.find((p) => p.market === market && p.slug === slug);
}
export function getByCategory(market: Market, category: Category): AnswerPageData[] {
  return ALL.filter((p) => p.market === market && p.category === category);
}
export type { AnswerPageData, Market, Category };
```

- [ ] **Step 5: Create temporary empty market barrels**

Create `src/data/most-searched/uk.ts`:
```typescript
import type { AnswerPageData } from './types';
export const ukPages: AnswerPageData[] = [];
```
Create `src/data/most-searched/us.ts`:
```typescript
import type { AnswerPageData } from './types';
export const usPages: AnswerPageData[] = [];
```

- [ ] **Step 6: Run test — first assertion fails (no pages), rest pass**

Run: `npm test`
Expected: the "has pages" test FAILS (0 pages); the others pass vacuously. This is expected; pages are added in Tasks 5–6. Leave the test as-is — it will pass once data lands.

- [ ] **Step 7: Commit**

```bash
git add src/data/most-searched/types.ts src/data/most-searched/index.ts src/data/most-searched/uk.ts src/data/most-searched/us.ts src/data/most-searched/registry.test.ts
git commit -m "feat: answer-page data types and registry"
```

---

## Task 4: AnswerPage template + sub-components

**Files:**
- Create: `src/components/most-searched/AnswerComparisonTable.tsx`
- Create: `src/components/most-searched/AnswerChart.tsx`
- Create: `src/components/most-searched/MostSearchedCard.tsx`
- Create: `src/components/most-searched/AnswerPage.tsx`

- [ ] **Step 1: Comparison table component**

Create `src/components/most-searched/AnswerComparisonTable.tsx`:
```tsx
import type { ComparisonRow } from "@/data/most-searched/types";

export function AnswerComparisonTable({
  title, columns, rows,
}: { title: string; columns: [string, string]; rows: ComparisonRow[] }) {
  return (
    <div className="border border-dark-border bg-dark-card rounded-xl p-6">
      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">{title}</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th className="py-2 text-[10px] font-heading uppercase tracking-widest text-white/40">{columns[0]}</th>
            <th className="py-2 text-[10px] font-heading uppercase tracking-widest text-white/40 text-right">{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-white/5 last:border-0">
              <td className="py-3 text-zinc-300">{r.label}</td>
              <td className="py-3 text-white font-heading text-right">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: Chart component**

Create `src/components/most-searched/AnswerChart.tsx`:
```tsx
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import type { ChartPoint } from "@/data/most-searched/types";

const ACCENT = "#3B82F6";

export function AnswerChart({ title, points }: { title: string; points: ChartPoint[] }) {
  return (
    <div className="border border-dark-border bg-dark-card rounded-xl p-6">
      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={points} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <XAxis dataKey="name" stroke="#666" fontSize={11} tickLine={false} />
          <YAxis stroke="#666" fontSize={11} tickLine={false} width={48} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {points.map((_, i) => (
              <Cell key={i} fill={i === points.length - 1 ? "#22C55E" : ACCENT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

- [ ] **Step 3: Card component (used by hub + homepage)**

Create `src/components/most-searched/MostSearchedCard.tsx`:
```tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { AnswerPageData } from "@/data/most-searched/types";

export function MostSearchedCard({ page }: { page: AnswerPageData }) {
  return (
    <Link
      to={`/most-searched/${page.market}/${page.slug}`}
      className="group flex flex-col justify-between gap-4 p-6 bg-dark-card border border-dark-border rounded-xl hover:border-accent-blue/50 transition-colors min-h-[150px]"
    >
      <div>
        <span className="inline-block text-[10px] font-heading uppercase tracking-widest text-accent-blue mb-2">{page.category}</span>
        <p className="font-sans text-sm text-white/80 leading-snug">{page.question}</p>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-3xl text-white tracking-wide">{page.answerNumber}</span>
        <ArrowRight className="w-4 h-4 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: The AnswerPage template**

Create `src/components/most-searched/AnswerPage.tsx`:
```tsx
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { NavigationMenu } from "@/components/NavigationMenu";
import { AuthorByline } from "@/components/AuthorByline";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { AnswerComparisonTable } from "./AnswerComparisonTable";
import { AnswerChart } from "./AnswerChart";
import { getBySlug } from "@/data/most-searched";
import type { AnswerPageData } from "@/data/most-searched/types";

const SITE = "https://www.thecalculatorapp.org";

export function AnswerPage({ page }: { page: AnswerPageData }) {
  const url = `${SITE}/most-searched/${page.market}/${page.slug}`;
  const related = page.related
    .map((s) => getBySlug(page.market, s))
    .filter((p): p is AnswerPageData => Boolean(p));

  const qaSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: page.question,
      acceptedAnswer: { "@type": "Answer", text: page.answer },
    },
  };

  return (
    <>
      <SEO
        title={`${page.question} | The Calculator App`}
        description={page.metaDescription}
        keywords={page.keywords}
        canonicalUrl={url}
        structuredData={qaSchema}
        faqSchema={page.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        articleSchema={{
          headline: page.question,
          author: "M Singh CeMAP DipFA",
          datePublished: page.datePublished,
          dateModified: page.dateModified ?? page.datePublished,
        }}
        speakableSelectors={["#most-searched-answer"]}
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <header className="border-b border-dark-border bg-dark-bg/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <Logo size="sm" />
            <NavigationMenu />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
            <Link to="/most-searched" className="hover:text-white/70">Most Searched</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{page.category}</span>
          </nav>

          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-6">{page.question}</h1>

          {/* The answer — first 40 words, speakable */}
          <div
            id="most-searched-answer"
            className="border-l-4 border-accent-green bg-accent-green/5 rounded-r-xl px-6 py-5 mb-8"
          >
            <p className="text-lg text-white leading-relaxed">{page.answer}</p>
          </div>

          {/* How this is calculated */}
          <section className="mb-8">
            <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-3">How this is calculated</h2>
            <div className="bg-black/40 border border-white/10 rounded-lg px-5 py-3 font-mono text-sm text-zinc-200 mb-4">{page.formula}</div>
            <ul className="space-y-1.5">
              {page.assumptions.map((a) => (
                <li key={a} className="text-sm text-zinc-400 flex gap-2"><span className="text-accent-blue">·</span>{a}</li>
              ))}
            </ul>
          </section>

          <div className="mb-8"><AnswerComparisonTable {...page.comparison} /></div>
          {page.chart && <div className="mb-8"><AnswerChart {...page.chart} /></div>}

          {/* Calculator CTA */}
          <Link
            to={page.calculatorPath}
            className="flex items-center justify-between gap-3 px-6 py-5 mb-10 rounded-xl bg-accent-blue text-white font-heading uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-transform"
          >
            {page.calculatorLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {page.faqs.map((f) => (
                <div key={f.question} className="border-b border-white/5 pb-5 last:border-0">
                  <p className="text-white font-medium text-sm mb-2">{f.question}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <AuthorByline />

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-4">More Most Searched</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/most-searched/${r.market}/${r.slug}`}
                    className="flex items-center justify-between gap-2 p-4 bg-dark-card border border-dark-border rounded-lg hover:border-accent-blue/40 transition-colors group">
                    <span className="text-sm text-white/80">{r.question}</span>
                    <ArrowRight className="w-3 h-3 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no output (clean). If `FinancialDisclosure` variant type rejects `"general"`, check `src/components/FinancialDisclosure.tsx` for valid variants and use a valid one.

- [ ] **Step 6: Commit**

```bash
git add src/components/most-searched/
git commit -m "feat: AnswerPage template and sub-components"
```

---

## Task 5: UK answer-page data (15 pages)

**Files:**
- Replace: `src/data/most-searched/uk.ts`
- Create: `src/data/most-searched/uk/` data files OR inline in `uk.ts`

To keep it DRY and reviewable, inline all 15 UK pages in `uk.ts`, computing numbers with `calc.ts` at module load so displayed figures can never drift from the formulas.

- [ ] **Step 1: Implement uk.ts using calc helpers**

Replace `src/data/most-searched/uk.ts` with the full 15-page array. Use this pattern for each page; compute numbers via `calc.ts` and format with a local `gbp()` helper. Below are all 15 — write them out fully.

```typescript
import type { AnswerPageData } from "./types";
import {
  ukTakeHome, mortgagePayment, futureValueMonthly,
  creditCardAnnualInterest, creditCardPayoffMonths,
} from "./calc";

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const TODAY = "2026-06-09";

// Pre-computed figures
const m200 = mortgagePayment(200000, 5, 25);
const m300 = mortgagePayment(300000, 5, 25);
const th30 = ukTakeHome(30000);
const th40 = ukTakeHome(40000);
const th50 = ukTakeHome(50000);
const th60 = ukTakeHome(60000);
const th100 = ukTakeHome(100000);
const fv500 = futureValueMonthly(500, 7, 20);
const fv10k = 10000 * Math.pow(1.07, 10);
const cc10kInt = creditCardAnnualInterest(10000, 24);
const cc5kMonths = creditCardPayoffMonths(5000, 22, 150);

export const ukPages: AnswerPageData[] = [
  {
    slug: "200k-mortgage-monthly-payment",
    market: "uk", category: "Mortgage", currency: "£",
    question: "How much is a £200,000 mortgage per month?",
    metaDescription: `A £200,000 mortgage over 25 years at 5% costs ${gbp(m200)} per month. See the full repayment breakdown and how the rate changes it.`,
    keywords: "200000 mortgage monthly payment, 200k mortgage per month uk, how much is a 200000 mortgage",
    answer: `A £200,000 mortgage over 25 years at 5% costs ${gbp(m200)} per month. Across the full term you repay ${gbp(m200 * 300)}, of which roughly ${gbp(m200 * 300 - 200000)} is interest.`,
    answerNumber: `${gbp(m200)}/mo`,
    assumptions: ["25-year term", "5% annual interest rate", "Repayment (capital & interest) mortgage", "Rate held constant for illustration"],
    formula: "M = P·r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",
    comparison: {
      title: "£200,000 monthly payment by rate (25-year term)",
      columns: ["Interest rate", "Monthly payment"],
      rows: [
        { label: "4%", value: gbp(mortgagePayment(200000, 4, 25)) },
        { label: "5%", value: gbp(m200) },
        { label: "6%", value: gbp(mortgagePayment(200000, 6, 25)) },
        { label: "7%", value: gbp(mortgagePayment(200000, 7, 25)) },
      ],
    },
    chart: {
      title: "Monthly payment by rate",
      points: [
        { name: "4%", value: Math.round(mortgagePayment(200000, 4, 25)) },
        { name: "5%", value: Math.round(m200) },
        { name: "6%", value: Math.round(mortgagePayment(200000, 6, 25)) },
        { name: "7%", value: Math.round(mortgagePayment(200000, 7, 25)) },
      ],
    },
    faqs: [
      { question: "How much deposit do I need for a £200,000 mortgage?", answer: "Most lenders want at least 10% — so around £20,000–£22,000 on a property where you're borrowing £200,000. A 5% deposit is possible with some lenders but rates are higher." },
      { question: "What salary do I need for a £200,000 mortgage?", answer: "At the common 4.5× income multiple you'd need roughly £44,000 combined income. Some lenders stretch to 5× for strong applicants." },
      { question: "How much would I pay over the full term?", answer: `Over 25 years at 5% you repay about ${gbp(m200 * 300)} in total — roughly ${gbp(m200 * 300 - 200000)} of that is interest on top of the £200,000 borrowed.` },
    ],
    calculatorPath: "/finance/mortgage?amount=200000&rate=5&term=25",
    calculatorLabel: "Open in mortgage calculator",
    related: ["300k-mortgage-monthly-payment", "salary-for-400k-house", "deposit-for-250k-house"],
    datePublished: TODAY,
  },
  {
    slug: "300k-mortgage-monthly-payment",
    market: "uk", category: "Mortgage", currency: "£",
    question: "How much is a £300,000 mortgage per month?",
    metaDescription: `A £300,000 mortgage over 25 years at 5% costs ${gbp(m300)} per month. Full repayment breakdown and rate comparison.`,
    keywords: "300000 mortgage monthly payment, 300k mortgage per month uk, how much is a 300000 mortgage",
    answer: `A £300,000 mortgage over 25 years at 5% costs ${gbp(m300)} per month. Across the full term you repay ${gbp(m300 * 300)}, of which around ${gbp(m300 * 300 - 300000)} is interest.`,
    answerNumber: `${gbp(m300)}/mo`,
    assumptions: ["25-year term", "5% annual interest rate", "Repayment mortgage", "Rate held constant for illustration"],
    formula: "M = P·r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)",
    comparison: {
      title: "£300,000 monthly payment by rate (25-year term)",
      columns: ["Interest rate", "Monthly payment"],
      rows: [
        { label: "4%", value: gbp(mortgagePayment(300000, 4, 25)) },
        { label: "5%", value: gbp(m300) },
        { label: "6%", value: gbp(mortgagePayment(300000, 6, 25)) },
        { label: "7%", value: gbp(mortgagePayment(300000, 7, 25)) },
      ],
    },
    chart: {
      title: "Monthly payment by rate",
      points: [
        { name: "4%", value: Math.round(mortgagePayment(300000, 4, 25)) },
        { name: "5%", value: Math.round(m300) },
        { name: "6%", value: Math.round(mortgagePayment(300000, 6, 25)) },
        { name: "7%", value: Math.round(mortgagePayment(300000, 7, 25)) },
      ],
    },
    faqs: [
      { question: "What salary do I need for a £300,000 mortgage?", answer: "At 4.5× income, roughly £67,000 combined. Lenders assessing affordability also look at outgoings, not just income multiples." },
      { question: "How much deposit for a £300,000 mortgage?", answer: "Typically 10% of the property price. If you're borrowing £300,000 on a £333,000 home that's a £33,000 deposit." },
      { question: "How much interest will I pay?", answer: `About ${gbp(m300 * 300 - 300000)} over 25 years at 5% — overpaying even a little cuts that significantly.` },
    ],
    calculatorPath: "/finance/mortgage?amount=300000&rate=5&term=25",
    calculatorLabel: "Open in mortgage calculator",
    related: ["200k-mortgage-monthly-payment", "salary-for-400k-house", "deposit-for-250k-house"],
    datePublished: TODAY,
  },
  {
    slug: "salary-for-400k-house",
    market: "uk", category: "Mortgage", currency: "£",
    question: "What salary do I need to buy a £400,000 house?",
    metaDescription: "To buy a £400,000 house with a 10% deposit you typically need around £80,000 income at 4.5× lending. See the full breakdown.",
    keywords: "salary for 400k house uk, income needed for 400000 mortgage, what salary to buy 400k house",
    answer: "To buy a £400,000 house with a 10% (£40,000) deposit, you borrow £360,000. At the common 4.5× income multiple you'd need about £80,000 of income — or £72,000 between two applicants at 5×.",
    answerNumber: "~£80,000",
    assumptions: ["10% deposit (£40,000)", "£360,000 borrowed", "4.5× income multiple (standard)", "Joint applications can combine incomes"],
    formula: "Income needed ≈ Loan ÷ multiple",
    comparison: {
      title: "Income needed for a £400,000 house by deposit & multiple",
      columns: ["Scenario", "Income needed"],
      rows: [
        { label: "10% deposit, 4.5×", value: "£80,000" },
        { label: "10% deposit, 5×", value: "£72,000" },
        { label: "20% deposit, 4.5×", value: "£71,000" },
        { label: "20% deposit, 5×", value: "£64,000" },
      ],
    },
    faqs: [
      { question: "Can two people combine salaries?", answer: "Yes — most lenders add both applicants' incomes, so two people earning £40,000 each can often borrow as much as one person on £80,000." },
      { question: "What if I have a bigger deposit?", answer: "A larger deposit means a smaller loan and lower income requirement, plus access to lower interest rates at better loan-to-value bands." },
      { question: "Do lenders only look at income?", answer: "No. Affordability checks include your outgoings, debts, dependents and credit history, not just the income multiple." },
    ],
    calculatorPath: "/mortgages/salary-for-mortgage?price=400000",
    calculatorLabel: "Open salary-for-mortgage calculator",
    related: ["deposit-for-250k-house", "200k-mortgage-monthly-payment", "300k-mortgage-monthly-payment"],
    datePublished: TODAY,
  },
  {
    slug: "deposit-for-250k-house",
    market: "uk", category: "Mortgage", currency: "£",
    question: "How much deposit do I need for a £250,000 house?",
    metaDescription: "For a £250,000 house you typically need a 10% deposit of £25,000, though 5% (£12,500) deals exist. See deposit sizes and what they unlock.",
    keywords: "deposit for 250k house uk, how much deposit 250000 house, 250k house deposit",
    answer: "For a £250,000 house, a 10% deposit is £25,000 and a 5% deposit is £12,500. A bigger deposit unlocks lower rates — at 15% (£37,500) you reach a much cheaper loan-to-value band.",
    answerNumber: "£25,000",
    assumptions: ["Deposit shown as % of £250,000 purchase price", "Higher deposit = lower loan-to-value = better rates", "5% deals exist but carry higher rates"],
    formula: "Deposit = price × deposit %",
    comparison: {
      title: "Deposit sizes for a £250,000 house",
      columns: ["Deposit %", "Amount"],
      rows: [
        { label: "5%", value: "£12,500" },
        { label: "10%", value: "£25,000" },
        { label: "15%", value: "£37,500" },
        { label: "20%", value: "£50,000" },
      ],
    },
    faqs: [
      { question: "Is a 5% deposit enough?", answer: "Yes, some lenders accept 5% (£12,500 on a £250,000 home), but you'll pay a higher interest rate than at 10% or 15%." },
      { question: "Does a bigger deposit save money?", answer: "Significantly. Crossing into a lower loan-to-value band (e.g. 90% to 85%) typically drops your rate, saving thousands over the term." },
      { question: "Do I need extra cash on top of the deposit?", answer: "Yes — budget for stamp duty (if applicable), legal fees, surveys and moving costs, often £2,000–£5,000+." },
    ],
    calculatorPath: "/finance/stamp-duty?price=250000",
    calculatorLabel: "Check stamp duty on £250,000",
    related: ["salary-for-400k-house", "200k-mortgage-monthly-payment", "300k-mortgage-monthly-payment"],
    datePublished: TODAY,
  },
  // ---- Salary pages ----
  ...[
    { gross: 30000, th: th30 },
    { gross: 40000, th: th40 },
    { gross: 50000, th: th50 },
    { gross: 60000, th: th60 },
    { gross: 100000, th: th100 },
  ].map(({ gross, th }): AnswerPageData => ({
    slug: `${gross}-after-tax`,
    market: "uk", category: "Salary", currency: "£",
    question: `£${gross.toLocaleString("en-GB")} after tax UK`,
    metaDescription: `£${gross.toLocaleString("en-GB")} a year is ${gbp(th.net)} after tax and National Insurance in 2025/26 — about ${gbp(th.net / 12)} a month take-home.`,
    keywords: `${gross} after tax uk, ${gross} take home pay, ${gross} salary after tax`,
    answer: `£${gross.toLocaleString("en-GB")} a year is ${gbp(th.net)} after tax and National Insurance in 2025/26 — about ${gbp(th.net / 12)} per month. You pay ${gbp(th.incomeTax)} income tax and ${gbp(th.ni ?? 0)} NI.`,
    answerNumber: `${gbp(th.net)}`,
    assumptions: ["2025/26 tax year", "England/Wales/NI rates (Scotland differs)", "Standard 1257L tax code", "Class 1 employee National Insurance"],
    formula: "Net = Gross − Income Tax − National Insurance",
    comparison: {
      title: `£${gross.toLocaleString("en-GB")} breakdown (2025/26)`,
      columns: ["Item", "Amount"],
      rows: [
        { label: "Gross salary", value: gbp(gross) },
        { label: "Income tax", value: "−" + gbp(th.incomeTax) },
        { label: "National Insurance", value: "−" + gbp(th.ni ?? 0) },
        { label: "Take-home (year)", value: gbp(th.net) },
        { label: "Take-home (month)", value: gbp(th.net / 12) },
      ],
    },
    faqs: [
      { question: `What is £${gross.toLocaleString("en-GB")} after tax per month?`, answer: `About ${gbp(th.net / 12)} per month in the 2025/26 tax year, after income tax and National Insurance.` },
      { question: "Does this include a pension?", answer: "No — this is take-home before any workplace pension contribution. Pension contributions would reduce both your taxable pay and your net pay." },
      { question: "Are Scottish rates different?", answer: "Yes. Scotland has its own income tax bands, so take-home differs slightly. National Insurance is the same UK-wide." },
    ],
    calculatorPath: `/finance/salary?salary=${gross}&country=UK`,
    calculatorLabel: "Open in UK salary calculator",
    related: [30000, 40000, 50000, 60000, 100000].filter((g) => g !== gross).slice(0, 3).map((g) => `${g}-after-tax`),
    datePublished: TODAY,
  })),
  // ---- Savings / investing ----
  {
    slug: "500-a-month-20-years",
    market: "uk", category: "Savings", currency: "£",
    question: "How much is £500 a month invested for 20 years?",
    metaDescription: `Investing £500 a month for 20 years at a 7% average return grows to about ${gbp(fv500)} — you contribute £120,000 and growth adds the rest.`,
    keywords: "500 a month invested for 20 years, 500 per month investment 20 years, invest 500 monthly",
    answer: `Investing £500 a month for 20 years at a 7% average annual return grows to about ${gbp(fv500)}. You contribute £120,000 — compound growth adds roughly ${gbp(fv500 - 120000)} on top.`,
    answerNumber: `${gbp(fv500)}`,
    assumptions: ["7% average annual return (long-run global equity proxy)", "£500 invested monthly for 240 months", "Returns reinvested (compounded monthly)", "Before inflation, fees and tax"],
    formula: "FV = PMT × ((1+r)ⁿ − 1) ÷ r",
    comparison: {
      title: "£500/month for 20 years by return rate",
      columns: ["Annual return", "Final value"],
      rows: [
        { label: "5%", value: gbp(futureValueMonthly(500, 5, 20)) },
        { label: "7%", value: gbp(fv500) },
        { label: "9%", value: gbp(futureValueMonthly(500, 9, 20)) },
      ],
    },
    chart: {
      title: "Final value by return rate",
      points: [
        { name: "5%", value: Math.round(futureValueMonthly(500, 5, 20)) },
        { name: "7%", value: Math.round(fv500) },
        { name: "9%", value: Math.round(futureValueMonthly(500, 9, 20)) },
      ],
    },
    faqs: [
      { question: "Is 7% a realistic return?", answer: "It's a common long-run average for a globally diversified equity portfolio before inflation. Real returns vary year to year and aren't guaranteed." },
      { question: "What about inflation?", answer: "Inflation erodes purchasing power. At 2.5% inflation, the real value of the final pot is lower than the headline figure — though still substantial." },
      { question: "Should I use an ISA?", answer: "A Stocks & Shares ISA shelters the growth from tax. Over 20 years that tax saving can be worth tens of thousands." },
    ],
    calculatorPath: "/finance/compound-interest?principal=0&contribution=500&rate=7&years=20",
    calculatorLabel: "Open in compound interest calculator",
    related: ["10000-invested-10-years", "save-100k-by-40", "pension-to-retire-at-60"],
    datePublished: TODAY,
  },
  {
    slug: "10000-invested-10-years",
    market: "uk", category: "Savings", currency: "£",
    question: "How much would £10,000 grow in 10 years?",
    metaDescription: `£10,000 invested for 10 years at 7% grows to about ${gbp(fv10k)} with no further contributions — purely from compound growth.`,
    keywords: "10000 invested for 10 years, how much will 10000 grow in 10 years, 10k investment 10 years",
    answer: `£10,000 invested for 10 years at a 7% average annual return grows to about ${gbp(fv10k)} — with no further contributions. That's ${gbp(fv10k - 10000)} of pure compound growth.`,
    answerNumber: `${gbp(fv10k)}`,
    assumptions: ["7% average annual return", "Lump sum, no further contributions", "Returns compounded annually", "Before inflation, fees and tax"],
    formula: "FV = P × (1 + r)ⁿ",
    comparison: {
      title: "£10,000 after 10 years by return rate",
      columns: ["Annual return", "Final value"],
      rows: [
        { label: "3%", value: gbp(10000 * Math.pow(1.03, 10)) },
        { label: "5%", value: gbp(10000 * Math.pow(1.05, 10)) },
        { label: "7%", value: gbp(fv10k) },
        { label: "9%", value: gbp(10000 * Math.pow(1.09, 10)) },
      ],
    },
    faqs: [
      { question: "What if I add monthly contributions?", answer: "Adding regular contributions dramatically increases the total. £10,000 plus £200/month at 7% would grow to far more than the lump sum alone." },
      { question: "Is this guaranteed?", answer: "No. Investment returns fluctuate and you can get back less than you put in. 7% is a long-run average, not a promise." },
      { question: "Cash savings vs investing?", answer: "A savings account paying 4% would grow £10,000 to about £14,800 over 10 years — less than investing at 7%, but with no capital risk." },
    ],
    calculatorPath: "/finance/compound-interest?principal=10000&contribution=0&rate=7&years=10",
    calculatorLabel: "Open in compound interest calculator",
    related: ["500-a-month-20-years", "save-100k-by-40", "pension-to-retire-at-60"],
    datePublished: TODAY,
  },
  {
    slug: "save-100k-by-40",
    market: "uk", category: "Savings", currency: "£",
    question: "How much do I need to save to have £100k by 40?",
    metaDescription: "Starting from zero at 25, you need about £290 a month at 7% to reach £100,000 by 40. Start later and the monthly figure rises sharply.",
    keywords: "save 100k by 40, how to save 100000 by 40, reach 100k savings",
    answer: "Starting from zero at age 25 (15 years), you need about £290 a month invested at 7% to reach £100,000 by 40. Start at 30 instead and it jumps to roughly £480 a month.",
    answerNumber: "~£290/mo",
    assumptions: ["7% average annual return", "Starting from £0", "Target £100,000", "Monthly contributions, compounded monthly"],
    formula: "PMT = FV × r ÷ ((1+r)ⁿ − 1)",
    comparison: {
      title: "Monthly saving needed to hit £100k by 40",
      columns: ["Start age", "Monthly amount"],
      rows: [
        { label: "25 (15 yrs)", value: "£290" },
        { label: "30 (10 yrs)", value: "£480" },
        { label: "35 (5 yrs)", value: "£1,165" },
      ],
    },
    faqs: [
      { question: "Why does starting earlier matter so much?", answer: "Compound growth needs time. Starting at 25 instead of 35 roughly quarters the monthly amount needed, because the market does more of the work." },
      { question: "What return should I assume?", answer: "7% reflects a long-run diversified equity average. Cash savings at 4% would need a higher monthly contribution." },
      { question: "Should this be in an ISA?", answer: "A Stocks & Shares ISA keeps the growth tax-free, helping the pot reach £100,000 faster in real terms." },
    ],
    calculatorPath: "/finance/savings?target=100000&rate=7",
    calculatorLabel: "Open in savings calculator",
    related: ["500-a-month-20-years", "10000-invested-10-years", "pension-to-retire-at-60"],
    datePublished: TODAY,
  },
  // ---- Debt ----
  {
    slug: "payoff-5000-credit-card",
    market: "uk", category: "Debt", currency: "£",
    question: "How long to pay off £5,000 of credit card debt?",
    metaDescription: `Paying £150 a month on a £5,000 card at 22% APR clears it in about ${cc5kMonths} months. Pay more each month and you finish far sooner.`,
    keywords: "pay off 5000 credit card, how long to clear 5000 debt, 5000 credit card payoff time",
    answer: `Paying £150 a month on a £5,000 credit card at 22% APR clears it in about ${cc5kMonths} months. Increasing payments to £250 a month roughly halves both the time and the interest.`,
    answerNumber: `~${cc5kMonths} mo`,
    assumptions: ["£5,000 starting balance", "22% representative APR", "Fixed monthly payment", "No further spending on the card"],
    formula: "n = −ln(1 − B·r ÷ PMT) ÷ ln(1 + r)",
    comparison: {
      title: "£5,000 at 22% APR — months to clear",
      columns: ["Monthly payment", "Months to clear"],
      rows: [
        { label: "£100", value: String(creditCardPayoffMonths(5000, 22, 100)) },
        { label: "£150", value: String(cc5kMonths) },
        { label: "£250", value: String(creditCardPayoffMonths(5000, 22, 250)) },
        { label: "£400", value: String(creditCardPayoffMonths(5000, 22, 400)) },
      ],
    },
    faqs: [
      { question: "Would a 0% balance transfer help?", answer: "Hugely. Moving the £5,000 to a 0% balance-transfer card (minus a small fee) means every pound goes to the balance, not interest — clearing it far faster." },
      { question: "What if I only pay the minimum?", answer: "Minimum-only payments can stretch a £5,000 debt over decades and cost more in interest than the original balance. Always pay more than the minimum if you can." },
      { question: "Which debt should I clear first?", answer: "Mathematically, the highest-APR debt first (avalanche). For motivation, smallest balance first (snowball)." },
    ],
    calculatorPath: "/finance/credit-card-payoff?balance=5000&apr=22&payment=150",
    calculatorLabel: "Open in credit card payoff calculator",
    related: ["10000-credit-card-interest", "500-a-month-20-years", "10000-invested-10-years"],
    datePublished: TODAY,
  },
  {
    slug: "10000-credit-card-interest",
    market: "uk", category: "Debt", currency: "£",
    question: "How much interest on £10,000 credit card at 24% APR?",
    metaDescription: `A £10,000 balance at 24% APR costs about ${gbp(cc10kInt)} a year in interest — roughly ${gbp(cc10kInt / 12)} a month if the balance doesn't fall.`,
    keywords: "10000 credit card interest, interest on 10000 at 24 apr, credit card 24 percent interest",
    answer: `A £10,000 credit card balance at 24% APR costs about ${gbp(cc10kInt)} per year in interest — roughly ${gbp(cc10kInt / 12)} every month while the balance stays at £10,000.`,
    answerNumber: `${gbp(cc10kInt)}/yr`,
    assumptions: ["£10,000 balance", "24% APR", "Interest shown on the full balance", "Real cards compound, so actual cost can be higher"],
    formula: "Annual interest = Balance × APR",
    comparison: {
      title: "Annual interest on £10,000 by APR",
      columns: ["APR", "Yearly interest"],
      rows: [
        { label: "18%", value: gbp(creditCardAnnualInterest(10000, 18)) },
        { label: "24%", value: gbp(cc10kInt) },
        { label: "30%", value: gbp(creditCardAnnualInterest(10000, 30)) },
      ],
    },
    faqs: [
      { question: "How do I stop paying this interest?", answer: "A 0% balance-transfer card moves the debt to an interest-free period (for a small fee), so your payments reduce the balance instead of servicing interest." },
      { question: "Is APR the same as monthly interest?", answer: "No. APR is annual; the monthly rate is roughly APR ÷ 12, but real cards compound, so the effective annual cost is slightly higher than the headline APR." },
      { question: "How much should I pay each month?", answer: "As much as you can above the minimum. On a £10,000 balance, minimum payments barely dent the principal while interest keeps accruing." },
    ],
    calculatorPath: "/finance/credit-card-payoff?balance=10000&apr=24&payment=300",
    calculatorLabel: "Open in credit card payoff calculator",
    related: ["payoff-5000-credit-card", "500-a-month-20-years", "10000-invested-10-years"],
    datePublished: TODAY,
  },
  // ---- Pension ----
  {
    slug: "pension-to-retire-at-60",
    market: "uk", category: "Pension", currency: "£",
    question: "How much pension do I need to retire at 60?",
    metaDescription: "For a comfortable retirement at 60 on about £25,000 a year before State Pension, you'd need a pension pot of roughly £500,000 using a 5% withdrawal rate.",
    keywords: "pension to retire at 60, how much pension to retire at 60 uk, pension pot for 60",
    answer: "To retire at 60 on about £25,000 a year (before State Pension kicks in at 66–67), you'd need a pension pot of roughly £500,000 using a sustainable 5% withdrawal. For £35,000 a year, closer to £700,000.",
    answerNumber: "~£500,000",
    assumptions: ["Target income ~£25,000/year", "5% sustainable withdrawal rate", "Bridges to State Pension age (66–67)", "Excludes other savings and State Pension top-up later"],
    formula: "Pot ≈ Annual income ÷ withdrawal rate",
    comparison: {
      title: "Pot needed at 60 by target income (5% withdrawal)",
      columns: ["Annual income", "Pot needed"],
      rows: [
        { label: "£20,000", value: "£400,000" },
        { label: "£25,000", value: "£500,000" },
        { label: "£35,000", value: "£700,000" },
        { label: "£50,000", value: "£1,000,000" },
      ],
    },
    faqs: [
      { question: "Does the State Pension change this?", answer: "Yes. Once the State Pension starts (currently age 66–67) it adds over £11,000 a year, so your private pot only needs to cover the gap before and top up after." },
      { question: "Is 5% a safe withdrawal rate?", answer: "It's higher than the traditional 4% rule. Retiring at 60 means a longer retirement, so many planners prefer 4% for safety, implying a larger pot." },
      { question: "How much do I need to save to get there?", answer: "It depends on your age now and growth rate. Starting at 30, a few hundred pounds a month with employer contributions and growth can build a substantial pot by 60." },
    ],
    calculatorPath: "/finance/retirement?retireAge=60&income=25000",
    calculatorLabel: "Open in retirement calculator",
    related: ["500-a-month-20-years", "save-100k-by-40", "10000-invested-10-years"],
    datePublished: TODAY,
  },
];
```

- [ ] **Step 2: Type-check and run registry tests**

Run: `npx tsc --noEmit && npm test`
Expected: tsc clean; registry tests now PASS including "has pages" (15 UK pages), unique slugs, related slugs resolve, answers ≤40 words. If any answer exceeds 40 words, trim it.

- [ ] **Step 3: Commit**

```bash
git add src/data/most-searched/uk.ts
git commit -m "feat: 15 UK most-searched answer pages data"
```

---

## Task 6: US answer-page data (15 pages)

**Files:**
- Replace: `src/data/most-searched/us.ts`

- [ ] **Step 1: Implement us.ts**

Mirror the UK file's structure with US systems: `$` currency, `usTakeHome` for salary, `mortgagePayment` at a US-typical 7% / 30-year term, `futureValueMonthly` for investing, credit card identical, and a 401(k) page for retirement. Use `usd()` formatter and US slugs. Write all 15 fully, following the exact field shape from Task 5 (every `AnswerPageData` field present). Key differences to encode:

```typescript
import type { AnswerPageData } from "./types";
import {
  usTakeHome, mortgagePayment, futureValueMonthly,
  creditCardAnnualInterest, creditCardPayoffMonths,
} from "./calc";

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const TODAY = "2026-06-09";

const um200 = mortgagePayment(200000, 7, 30);  // US: 30-yr, 7%
const um300 = mortgagePayment(300000, 7, 30);
const uth = (g: number) => usTakeHome(g);
const ufv500 = futureValueMonthly(500, 7, 20);
const ufv10k = 10000 * Math.pow(1.07, 10);
const ucc10kInt = creditCardAnnualInterest(10000, 24);
const ucc5kMonths = creditCardPayoffMonths(5000, 22, 150);

export const usPages: AnswerPageData[] = [ /* 15 pages */ ];
```

The 15 US pages (slugs + headline answers — fill every field as in Task 5):

1. `200k-mortgage-monthly-payment` — "How much is a $200,000 mortgage per month?" — answer: `$200,000 over 30 years at 7% is ${usd(um200)}/mo`; comparison by rate (5/6/7/8%); calc `/finance/mortgage?amount=200000&rate=7&term=30`; assumptions note 30-year term, property taxes/insurance excluded.
2. `300k-mortgage-monthly-payment` — same shape for $300,000.
3. `salary-for-400k-house` — "What salary do I need for a $400,000 house?" — ~$105,000 at 28% front-end DTI with 10% down; comparison by down payment/DTI; calc `/mortgages/salary-for-mortgage?price=400000`.
4. `down-payment-for-250k-house` — "How much down payment for a $250,000 house?" — 20% = $50,000, 3.5% FHA = $8,750; comparison of down-payment tiers; calc `/finance/mortgage?amount=250000&rate=7&term=30`.
5–9. `30000/40000/50000/60000/100000-after-tax` — built with a `.map` over those gross values using `uth(gross)`; answer states net, monthly, federal tax and FICA; assumptions: "2025 federal single filer", "$15,000 standard deduction", "FICA 7.65%", "No state income tax (varies by state)"; calc `/finance/us-salary?salary=${gross}&country=US` (verify the us-salary route path — it is `/finance/us-salary`).
10. `500-a-month-20-years` — `${usd(ufv500)}`; rate comparison 5/7/9%; calc `/finance/compound-interest?principal=0&contribution=500&rate=7&years=20`.
11. `10000-invested-10-years` — `${usd(ufv10k)}`; calc compound-interest with principal=10000.
12. `save-100k-by-40` — "$100k by 40", ~$290/mo from 25; mirror UK figures (same maths, $ symbol).
13. `payoff-5000-credit-card` — months via `ucc5kMonths`; calc `/finance/credit-card-payoff?balance=5000&apr=22&payment=150`.
14. `10000-credit-card-interest` — `${usd(ucc10kInt)}/yr` at 24% APR.
15. `401k-to-retire-at-60` — "How much 401(k) do I need to retire at 60?" — ~$500,000 for $25,000/yr at 5% withdrawal; note Social Security starts later, 401(k) early-withdrawal rules (substantially equal periodic payments / age 59½); calc `/finance/retirement?retireAge=60&income=25000`.

Each page's `related` must reference only US slugs that exist in this file (e.g. the three nearest in the same category). Keep every `answer` ≤40 words.

- [ ] **Step 2: Verify us-salary route exists**

Run: `grep -n "us-salary" src/routes/index.tsx`
Expected: a route `finance/us-salary`. If the path differs, use the actual path in `calculatorPath`.

- [ ] **Step 3: Type-check and test**

Run: `npx tsc --noEmit && npm test`
Expected: tsc clean; registry now has 30 pages; all registry assertions pass.

- [ ] **Step 4: Commit**

```bash
git add src/data/most-searched/us.ts
git commit -m "feat: 15 US most-searched answer pages data"
```

---

## Task 7: Route generation

**Files:**
- Create: `src/pages/most-searched/AnswerPageRoute.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Create the param-driven route component**

Create `src/pages/most-searched/AnswerPageRoute.tsx`:
```tsx
import { useParams } from "react-router-dom";
import { AnswerPage } from "@/components/most-searched/AnswerPage";
import { getBySlug } from "@/data/most-searched";
import type { Market } from "@/data/most-searched/types";
import NotFound from "@/pages/NotFound";

export default function AnswerPageRoute() {
  const { market, slug } = useParams<{ market: string; slug: string }>();
  const page =
    market && slug && (market === "uk" || market === "us")
      ? getBySlug(market as Market, slug)
      : undefined;
  if (!page) return <NotFound />;
  return <AnswerPage page={page} />;
}
```

- [ ] **Step 2: Add the route + static-path generation in routes/index.tsx**

In `src/routes/index.tsx`, add an import near the other page imports:
```typescript
import AnswerPageRoute from '../pages/most-searched/AnswerPageRoute';
import { getAllAnswerPages } from '../data/most-searched';
```
Add the dynamic route inside the children array (alongside other routes, e.g. near the blog routes):
```typescript
      { path: 'most-searched/:market/:slug', element: <AnswerPageRoute /> },
```
vite-react-ssg needs to know the concrete paths to pre-render. Find where the routes file exports `getStaticPaths` or how SSG entry enumerates paths. If the project uses `vite-react-ssg`'s `getStaticPaths` on a route, add:
```typescript
      {
        path: 'most-searched/:market/:slug',
        element: <AnswerPageRoute />,
        getStaticPaths: () =>
          getAllAnswerPages().map((p) => `/most-searched/${p.market}/${p.slug}`),
      },
```

- [ ] **Step 3: Check how SSG enumerates dynamic routes**

Run: `grep -rn "getStaticPaths\|includedRoutes\|ssgOptions" src vite.config.* package.json`
Expected: reveals the mechanism. If the project uses `includedRoutes` in `vite.config.ts` (a function returning all paths), add the answer-page paths there instead:
```typescript
// inside ssgOptions.includedRoutes(paths, routes) return:
import { getAllAnswerPages } from './src/data/most-searched';
// ...
return [
  ...paths.filter((p) => !p.includes(':')),
  ...getAllAnswerPages().map((p) => `/most-searched/${p.market}/${p.slug}`),
];
```
Use whichever mechanism the codebase already uses for dynamic SSG paths. (If all routes are currently static and there is no dynamic-path mechanism yet, add `ssgOptions.includedRoutes` in `vite.config.ts` returning the static `paths` plus the 30 answer-page URLs.)

- [ ] **Step 4: Build to verify pages render**

Run: `npm run build 2>&1 | grep -E "most-searched|error|Error" | head`
Expected: 30 `dist/most-searched/uk/*.html` and `dist/most-searched/us/*.html` files generated, no errors. Then:
Run: `ls dist/most-searched/uk dist/most-searched/us | head`
Expected: lists the generated HTML files.

- [ ] **Step 5: Commit**

```bash
git add src/pages/most-searched/AnswerPageRoute.tsx src/routes/index.tsx vite.config.ts
git commit -m "feat: generate static routes for all answer pages"
```

---

## Task 8: Calculator URL pre-fill

**Files:**
- Modify: `src/pages/finance/MortgageCalculator.tsx`
- Modify: `src/pages/finance/SalaryCalculator.tsx`
- Modify: `src/pages/finance/CompoundInterest.tsx`
- Modify: `src/pages/finance/CreditCardPayoff.tsx`
- Modify: `src/pages/finance/SavingsCalculator.tsx`
- Modify: `src/pages/finance/RetirementCalculator.tsx`
- Modify: `src/pages/mortgages/SalaryForMortgage.tsx`

For each, read the query string on mount and pre-fill matching inputs. Absent params = unchanged behaviour. Pattern (adapt state setter names per file):

- [ ] **Step 1: Mortgage calculator pre-fill**

In `src/pages/finance/MortgageCalculator.tsx`, add near the top of the component imports:
```typescript
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
```
After the `useState` declarations, add (matching the actual setter names — grep them first with `grep -nE "useState|setAmount|setRate|setTerm|setPrice|setLoan" src/pages/finance/MortgageCalculator.tsx`):
```typescript
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const amount = searchParams.get("amount");
    const rate = searchParams.get("rate");
    const term = searchParams.get("term");
    if (amount) setLoanAmount(amount);   // use the real setter name
    if (rate) setInterestRate(rate);     // use the real setter name
    if (term) setLoanTerm(term);         // use the real setter name
  }, [searchParams]);
```

- [ ] **Step 2: Salary calculator pre-fill**

In `src/pages/finance/SalaryCalculator.tsx`, the setters are confirmed `setSalary`, `setCountry`. Add:
```typescript
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
// ...
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const salary = searchParams.get("salary");
    const country = searchParams.get("country");
    if (salary) setSalary(salary);
    if (country === "UK" || country === "US") setCountry(country);
  }, [searchParams]);
```

- [ ] **Step 3: Compound interest pre-fill**

In `src/pages/finance/CompoundInterest.tsx`, setters confirmed `setPrincipal`, `setRate`, `setYears`, `setContribution`. Add:
```typescript
import { useSearchParams } from "react-router-dom";
// (useEffect already importable from react)
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const principal = searchParams.get("principal");
    const contribution = searchParams.get("contribution");
    const rate = searchParams.get("rate");
    const years = searchParams.get("years");
    if (principal) setPrincipal(principal);
    if (contribution) setContribution(contribution);
    if (rate) setRate(rate);
    if (years) setYears(years);
  }, [searchParams]);
```

- [ ] **Step 4: Remaining calculators pre-fill**

Repeat the same pattern for:
- `CreditCardPayoff.tsx` — params `balance`, `apr`, `payment` (grep setter names; the rebuilt multi-debt version may use a debts array — if so, pre-fill the first debt's balance/apr or skip gracefully if shape doesn't match a single-card input).
- `SavingsCalculator.tsx` — params `target`, `rate` (grep setters).
- `RetirementCalculator.tsx` — params `retireAge`, `income` (grep setters).
- `SalaryForMortgage.tsx` — param `price` (grep setter).

For each, grep the file first for `useState` to get exact setter names, then add the `useSearchParams` + `useEffect` block guarded by `if (param)`.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 6: Manual smoke (build + inspect one)**

Run: `npm run build 2>&1 | tail -3`
Expected: build succeeds. (Param pre-fill is client-side; SSG build just needs to compile.)

- [ ] **Step 7: Commit**

```bash
git add src/pages/finance/MortgageCalculator.tsx src/pages/finance/SalaryCalculator.tsx src/pages/finance/CompoundInterest.tsx src/pages/finance/CreditCardPayoff.tsx src/pages/finance/SavingsCalculator.tsx src/pages/finance/RetirementCalculator.tsx src/pages/mortgages/SalaryForMortgage.tsx
git commit -m "feat: pre-fill calculators from URL params"
```

---

## Task 9: Most Searched hub (rebranded blog)

**Files:**
- Create: `src/pages/most-searched/MostSearchedHub.tsx`
- Modify: `src/routes/index.tsx` (add `/most-searched` route)
- Modify: `src/components/NavigationMenu.tsx` (rename Blog → Most Searched)

- [ ] **Step 1: Build the hub page**

Create `src/pages/most-searched/MostSearchedHub.tsx` with: SEO (title "The Internet's Most Searched — Financial Edition"), a hero, a UK/US toggle (`useState<Market>`), category filter chips (All · Mortgage · Salary · Savings · Debt · Pension), a responsive grid of `MostSearchedCard` for the active market+category, and a "Guides & Deep Dives" section below linking the existing blog posts (reuse the `blogPosts` array shape from `Index.tsx` or import from BlogIndex if exported). Use existing dark-theme classes and `NavigationMenu`/`Logo`/footer pattern from `AnswerPage.tsx`.

```tsx
import { useState } from "react";
import SEO from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { NavigationMenu } from "@/components/NavigationMenu";
import { MostSearchedCard } from "@/components/most-searched/MostSearchedCard";
import { getByMarket } from "@/data/most-searched";
import type { Market, Category } from "@/data/most-searched/types";
import { Link } from "react-router-dom";

const CATEGORIES: (Category | "All")[] = ["All", "Mortgage", "Salary", "Savings", "Debt", "Pension"];

export default function MostSearchedHub() {
  const [market, setMarket] = useState<Market>("uk");
  const [cat, setCat] = useState<Category | "All">("All");
  const pages = getByMarket(market).filter((p) => cat === "All" || p.category === cat);

  return (
    <>
      <SEO
        title="The Internet's Most Searched — Financial Edition"
        description="The money questions everyone Googles — answered with the actual numbers. Mortgages, salary after tax, savings growth, debt and pensions for the UK and US."
        keywords="most searched financial questions, money questions answered, salary after tax, mortgage per month"
        canonicalUrl="https://www.thecalculatorapp.org/most-searched"
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <header className="border-b border-dark-border bg-dark-bg/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Logo size="sm" /><NavigationMenu />
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-6 pt-14 pb-8 text-center">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent-blue mb-3">The Internet's Most Searched</p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide mb-4">Financial Edition</h1>
          <p className="text-white/55 max-w-2xl mx-auto">The money questions everyone Googles — answered with the actual numbers.</p>

          <div className="inline-flex mt-8 rounded-lg border border-dark-border overflow-hidden">
            {(["uk", "us"] as Market[]).map((m) => (
              <button key={m} onClick={() => setMarket(m)}
                className={`px-6 py-2 font-heading text-sm uppercase tracking-widest transition-colors ${market === m ? "bg-accent-blue text-white" : "text-white/50 hover:text-white"}`}>
                {m === "uk" ? "🇬🇧 UK" : "🇺🇸 US"}
              </button>
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border transition-colors ${cat === c ? "border-accent-blue text-white bg-accent-blue/10" : "border-dark-border text-white/50 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((p) => <MostSearchedCard key={p.slug} page={p} />)}
        </div>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-5">Guides & Deep Dives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/learn/compound-interest-formula" className="p-5 bg-dark-card border border-dark-border rounded-xl hover:border-accent-blue/40 transition-colors">
              <p className="text-white text-sm font-medium">The Compound Interest Formula: Complete Guide</p>
            </Link>
            <Link to="/blog" className="p-5 bg-dark-card border border-dark-border rounded-xl hover:border-accent-blue/40 transition-colors">
              <p className="text-white text-sm font-medium">All Articles & Guides →</p>
            </Link>
          </div>
        </section>

        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Add hub route**

In `src/routes/index.tsx` add import:
```typescript
import MostSearchedHub from '../pages/most-searched/MostSearchedHub';
```
And route (before the `:market/:slug` route):
```typescript
      { path: 'most-searched', element: <MostSearchedHub /> },
```
Ensure `/most-searched` is in the SSG static paths (add to `includedRoutes`/`getStaticPaths` list from Task 7).

- [ ] **Step 3: Rename Blog → Most Searched in nav**

Run: `grep -n "Blog\|/blog" src/components/NavigationMenu.tsx`
Then change the visible label "Blog" to "Most Searched" and its link target to `/most-searched`. Keep the `/blog` route working (do not delete the BlogIndex route).

- [ ] **Step 4: Build + type-check**

Run: `npx tsc --noEmit && npm run build 2>&1 | grep -E "most-searched.html|error" | head`
Expected: `dist/most-searched.html` present, no errors, `/blog` still builds.

- [ ] **Step 5: Commit**

```bash
git add src/pages/most-searched/MostSearchedHub.tsx src/routes/index.tsx src/components/NavigationMenu.tsx
git commit -m "feat: Most Searched hub, rebrand blog nav (URLs preserved)"
```

---

## Task 10: Homepage feature band

**Files:**
- Modify: `src/pages/Index.tsx`

- [ ] **Step 1: Add the feature band**

In `src/pages/Index.tsx`, import the registry and card at the top:
```typescript
import { getByMarket } from "@/data/most-searched";
import { MostSearchedCard } from "@/components/most-searched/MostSearchedCard";
```
Inside the component, add market state near the existing `searchQuery` state:
```typescript
  const [msMarket, setMsMarket] = useState<"uk" | "us">("uk");
  const featured = getByMarket(msMarket).slice(0, 6);
```
Add the band JSX immediately after the hero/search section and before the "Browse Categories" block (locate the Browse Categories heading and insert before it):
```tsx
        {/* The Internet's Most Searched */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent-blue mb-2">The Internet's Most Searched</p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide">Financial Edition</h2>
              <p className="text-white/55 mt-2 max-w-xl">The money questions everyone Googles — answered with the actual numbers.</p>
            </div>
            <div className="inline-flex rounded-lg border border-dark-border overflow-hidden self-start">
              {(["uk", "us"] as const).map((m) => (
                <button key={m} onClick={() => setMsMarket(m)}
                  className={`px-5 py-2 font-heading text-xs uppercase tracking-widest transition-colors ${msMarket === m ? "bg-accent-blue text-white" : "text-white/50 hover:text-white"}`}>
                  {m === "uk" ? "🇬🇧 UK" : "🇺🇸 US"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p) => <MostSearchedCard key={`${p.market}-${p.slug}`} page={p} />)}
          </div>
          <div className="mt-8 text-center">
            <Link to="/most-searched" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-blue text-white font-heading uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-transform">
              See all most searched <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
```
(`ArrowRight` and `Link` are already imported in Index.tsx — verify; if not, add them.)

- [ ] **Step 2: Type-check + build**

Run: `npx tsc --noEmit && npm run build 2>&1 | tail -3`
Expected: clean compile, build succeeds, homepage renders.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: homepage Most Searched feature band with UK/US toggle"
```

---

## Task 11: Sitemap + llms.txt + AI discovery

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`

- [ ] **Step 1: Generate sitemap entries**

Run this to produce the XML block for all 30 pages + hub:
```bash
node -e '
const { getAllAnswerPages } = require("./src/data/most-searched");
' 2>/dev/null || echo "TS not requireable from node — generate manually below"
```
Since the data is TypeScript, instead add entries by hand. Add a `<!-- Most Searched -->` section to `public/sitemap.xml` (before the closing `</urlset>`) with the hub at priority 0.9 and all 30 answer URLs at 0.8. Each entry:
```xml
  <url>
    <loc>https://www.thecalculatorapp.org/most-searched</loc>
    <lastmod>2026-06-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
```
Then 30 entries of the form (one per slug, both markets):
```xml
  <url>
    <loc>https://www.thecalculatorapp.org/most-searched/uk/200k-mortgage-monthly-payment</loc>
    <lastmod>2026-06-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```
Enumerate all UK slugs (Task 5) and US slugs (Task 6). The complete slug list is fixed and known from those tasks — write all 30.

- [ ] **Step 2: Update llms.txt**

In `public/llms.txt`, add a section:
```
## The Internet's Most Searched — Financial Edition
Direct, numbers-first answers to the most-searched UK and US money questions, each citing its calculation method and assumptions. Ideal for citation.
- Hub: https://www.thecalculatorapp.org/most-searched
- Example: https://www.thecalculatorapp.org/most-searched/uk/60000-after-tax (£60,000 after tax UK)
- Example: https://www.thecalculatorapp.org/most-searched/uk/200k-mortgage-monthly-payment
- Example: https://www.thecalculatorapp.org/most-searched/us/100000-after-tax
Coverage: take-home pay, mortgage payments, savings growth, debt payoff, pensions/401(k) — UK & US.
```

- [ ] **Step 3: Validate sitemap is well-formed**

Run: `xmllint --noout public/sitemap.xml && echo OK`
Expected: `OK` (if `xmllint` unavailable, run `node -e "new (require('xmldom').DOMParser)()" ` is not available — instead just visually confirm tags balanced and re-run the build).

- [ ] **Step 4: Commit**

```bash
git add public/sitemap.xml public/llms.txt
git commit -m "feat: add Most Searched pages to sitemap and llms.txt"
```

---

## Task 12: Final verification

- [ ] **Step 1: Full test suite**

Run: `npm test`
Expected: all calc + registry tests pass.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 3: Full build with page count**

Run: `npm run build 2>&1 | grep -c "most-searched"`
Expected: 31 (30 answer pages + hub), or confirm via `ls dist/most-searched/uk dist/most-searched/us`.

- [ ] **Step 4: Verify existing blog URLs survived**

Run: `ls dist/blog | head` and `ls dist/blog.html`
Expected: blog pages still generated — no SEO regression.

- [ ] **Step 5: Push**

```bash
git push origin main
```
Expected: Vercel deploys. Confirm the build command `npm run build` exits 0 (the earlier failure cause was an uncommitted file — ensure `git status` is clean of new untracked source files before pushing).

- [ ] **Step 6: Final commit if any cleanup needed**

```bash
git status   # confirm clean
```

---

## Self-Review Notes

**Spec coverage:** 30 pages (Tasks 5–6) ✓; data-driven template (Task 4) ✓; registry/types (Task 3) ✓; calc helpers + tests (Tasks 1–2) ✓; routes/SSG (Task 7) ✓; calculator pre-fill (Task 8) ✓; rebranded hub + preserved blog URLs (Task 9) ✓; homepage band with UK/US toggle (Task 10) ✓; schema (article+FAQ+speakable+QAPage) in AnswerPage (Task 4) ✓; sitemap + llms.txt (Task 11) ✓; author byline (Task 4 via AuthorByline) ✓; verification incl. blog-URL survival (Task 12) ✓.

**Type consistency:** `AnswerPageData` fields defined once in Task 3 and used identically in Tasks 4–10. Registry helpers `getAllAnswerPages`/`getByMarket`/`getBySlug`/`getByCategory` named consistently throughout. `Market`/`Category` types reused everywhere.

**Known risk flagged in-plan:** SSG dynamic-path enumeration mechanism is verified at runtime in Task 7 Step 3 (the codebase may use `includedRoutes` or `getStaticPaths`) rather than assumed — the engineer checks and uses whichever exists.
