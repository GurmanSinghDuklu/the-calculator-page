# Amortisation Schedule Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable `AmortisationSchedule` component with yearly/monthly toggle and jump-to-period input to five calculators: MortgageCalculator, MortgageOverpayment, LoanCalculator, IsaCalculator, and CreditCardPayoff.

**Architecture:** One shared `AmortisationSchedule` component accepts a typed `rows` array, currency symbol, accent colour, column config, and optional second-balance column for the overpayment side-by-side view. Each calculator builds its own schedule array and passes it in. MortgageCalculator gets the jump-to bar added to its existing table rather than a full replacement.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, lucide-react

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/AmortisationSchedule.tsx` | **Create** | Shared schedule table with toggle + jump-to |
| `src/pages/finance/MortgageCalculator.tsx` | **Modify** | Add jump-to bar above existing table |
| `src/pages/finance/MortgageOverpayment.tsx` | **Modify** | Build dual-balance schedule, pass to component |
| `src/pages/finance/LoanCalculator.tsx` | **Modify** | Build amort schedule, pass to component |
| `src/pages/finance/IsaCalculator.tsx` | **Modify** | Build yearly growth schedule, pass to component |
| `src/pages/finance/CreditCardPayoff.tsx` | **Modify** | Build monthly paydown schedule, pass to component |

---

## Task 1: Create the `AmortisationSchedule` component

**Files:**
- Create: `src/components/AmortisationSchedule.tsx`

This component is the single source of truth for all schedule tables. It handles:
- Yearly / monthly toggle (same button style as existing mortgage calculator)
- Jump-to input (year number OR month number, depending on `granularity` prop)
- Highlighted row when jump-to matches
- Optional second balance column (for overpayment side-by-side)
- Mobile: hide Payment/Principal/Interest columns, show Period + Balance only

### Props interface

```typescript
export interface ScheduleRow {
  period: string;        // "Year 1", "Month 6", etc.
  periodIndex: number;   // raw number for jump-to matching (1-based year or month)
  payment?: number;
  principal?: number;
  interest?: number;
  balance: number;
  balance2?: number;     // optional: "without overpayment" balance for comparison
}

export interface AmortisationScheduleProps {
  rows: ScheduleRow[];           // yearly rows
  monthlyRows?: ScheduleRow[];   // if provided, monthly toggle is enabled
  currencySymbol: string;
  accentColour: string;
  balanceLabel?: string;         // default "Remaining Balance"
  balance2Label?: string;        // if provided, shows second balance column (e.g. "Standard")
  granularity?: "year" | "month"; // default "year" — controls jump-to label
}
```

- [ ] **Step 1: Create the file with props and state**

```typescript
// src/components/AmortisationSchedule.tsx
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

export interface ScheduleRow {
  period: string;
  periodIndex: number;
  payment?: number;
  principal?: number;
  interest?: number;
  balance: number;
  balance2?: number;
}

export interface AmortisationScheduleProps {
  rows: ScheduleRow[];
  monthlyRows?: ScheduleRow[];
  currencySymbol: string;
  accentColour: string;
  balanceLabel?: string;
  balance2Label?: string;
  granularity?: "year" | "month";
}

export function AmortisationSchedule({
  rows,
  monthlyRows,
  currencySymbol: sym,
  accentColour: accent,
  balanceLabel = "Remaining Balance",
  balance2Label,
  granularity = "year",
}: AmortisationScheduleProps) {
  const [view, setView] = useState<"yearly" | "monthly">("yearly");
  const [jumpInput, setJumpInput] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const highlightRef = useRef<HTMLTableRowElement | null>(null);

  const activeRows = view === "monthly" && monthlyRows ? monthlyRows : rows;
  const hasMonthly = !!monthlyRows && monthlyRows.length > 0;
  const hasPaymentCols = activeRows.some(r => r.payment !== undefined);
  const hasDualBalance = !!balance2Label;

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedIndex]);

  const fmt = (n?: number) =>
    n !== undefined
      ? sym + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "—";

  const handleJump = () => {
    const n = parseInt(jumpInput);
    if (isNaN(n) || n < 1) return;
    const idx = activeRows.findIndex(r => r.periodIndex === n);
    if (idx !== -1) setHighlightedIndex(idx);
  };

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-[#252323]/80 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
          <h3 className="font-display text-xl uppercase text-white tracking-wide">
            Amortisation Schedule
          </h3>
        </div>

        {/* Yearly / Monthly toggle */}
        {hasMonthly && (
          <div className="flex rounded-lg border border-white/10 overflow-hidden self-start sm:self-auto">
            {(["yearly", "monthly"] as const).map(v => (
              <button
                key={v}
                onClick={() => { setView(v); setHighlightedIndex(null); setJumpInput(""); }}
                className={`px-4 py-2 text-[9px] font-heading uppercase tracking-widest transition-colors ${
                  view === v ? "bg-white/10 text-white" : "text-white/30 hover:text-white"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Jump-to bar */}
      <div className="px-6 py-4 border-b border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <span className="text-[10px] font-heading uppercase tracking-widest text-white/40 shrink-0">
          Jump to {view === "yearly" ? "Year" : "Month"}
        </span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={jumpInput}
            onChange={e => setJumpInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleJump()}
            placeholder={view === "yearly" ? "e.g. 5" : "e.g. 24"}
            className="w-24 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-heading focus:outline-none transition-all"
            style={{ borderColor: jumpInput ? `${accent}60` : undefined }}
          />
          <button
            onClick={handleJump}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-[10px] uppercase tracking-widest text-black transition-all hover:-translate-y-0.5"
            style={{ background: accent }}
          >
            <Search className="h-3 w-3" />
            Find
          </button>
          {highlightedIndex !== null && (
            <button
              onClick={() => { setHighlightedIndex(null); setJumpInput(""); }}
              className="text-[10px] font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        {highlightedIndex !== null && activeRows[highlightedIndex] && (
          <span className="text-[10px] font-heading uppercase tracking-widest" style={{ color: accent }}>
            Balance: {fmt(activeRows[highlightedIndex].balance)}
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30">Period</th>
              {hasPaymentCols && (
                <>
                  <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden md:table-cell">Payment</th>
                  <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden md:table-cell">Principal</th>
                  <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden md:table-cell">Interest</th>
                </>
              )}
              <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30">{balanceLabel}</th>
              {hasDualBalance && (
                <th className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30 hidden sm:table-cell">{balance2Label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {activeRows.map((row, i) => {
              const isHighlighted = i === highlightedIndex;
              return (
                <tr
                  key={i}
                  ref={isHighlighted ? highlightRef : null}
                  className={`border-b border-white/[0.04] transition-colors ${
                    isHighlighted ? "border-l-2" : "hover:bg-white/[0.02]"
                  }`}
                  style={isHighlighted ? {
                    backgroundColor: `${accent}12`,
                    borderLeftColor: accent,
                  } : undefined}
                >
                  <td className="px-5 py-3 font-heading text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                    {row.period}
                  </td>
                  {hasPaymentCols && (
                    <>
                      <td className="px-5 py-3 text-white/70 font-heading text-xs hidden md:table-cell">{fmt(row.payment)}</td>
                      <td className="px-5 py-3 text-white/70 font-heading text-xs hidden md:table-cell">{fmt(row.principal)}</td>
                      <td className="px-5 py-3 text-white/50 font-heading text-xs hidden md:table-cell">{fmt(row.interest)}</td>
                    </>
                  )}
                  <td className="px-5 py-3 font-heading text-xs font-medium text-white">{fmt(row.balance)}</td>
                  {hasDualBalance && (
                    <td className="px-5 py-3 font-heading text-xs text-white/50 hidden sm:table-cell">{fmt(row.balance2)}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the file compiles (no imports needed yet, just type-check)**

```bash
cd /Users/mandeepduklu/Downloads/thecalculatorpage-main && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors relating to `AmortisationSchedule.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/components/AmortisationSchedule.tsx
git commit -m "feat: add AmortisationSchedule shared component with toggle and jump-to"
```

---

## Task 2: Wire into LoanCalculator

**Files:**
- Modify: `src/pages/finance/LoanCalculator.tsx`

The loan calculator currently stores only summary figures in `result`. We need to also store a `schedule` array, built inside `calculateLoan`.

- [ ] **Step 1: Import the component and update the result type**

At the top of `LoanCalculator.tsx`, add the import:

```typescript
import { AmortisationSchedule, ScheduleRow } from "@/components/AmortisationSchedule";
```

Change the result `useState` type to include the schedule:

```typescript
const [result, setResult] = useState<{
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  lumpInterestSaved?: number;
  lumpTimeSaved?: number;
  schedule: ScheduleRow[];
} | null>(null);
```

- [ ] **Step 2: Build the schedule inside `calculateLoan`**

Inside the `calculateLoan` function, after computing `monthlyPayment` and before `setResult`, add:

```typescript
// Build month-by-month amortisation schedule
const schedule: ScheduleRow[] = [];
let bal = P;
for (let m = 1; m <= Math.ceil(n); m++) {
  const interestCharge = r === 0 ? 0 : bal * r;
  const principalCharge = Math.min(monthlyPayment - interestCharge, bal);
  bal = Math.max(bal - principalCharge, 0);
  schedule.push({
    period: `Month ${m}`,
    periodIndex: m,
    payment: Math.round(monthlyPayment * 100) / 100,
    principal: Math.round(principalCharge * 100) / 100,
    interest: Math.round(interestCharge * 100) / 100,
    balance: Math.round(bal * 100) / 100,
  });
}

// Aggregate by year for yearly view
const yearlySchedule: ScheduleRow[] = [];
for (let y = 1; y <= Math.ceil(n / 12); y++) {
  const monthsInYear = schedule.slice((y - 1) * 12, y * 12);
  if (monthsInYear.length === 0) break;
  yearlySchedule.push({
    period: `Year ${y}`,
    periodIndex: y,
    payment: Math.round(monthsInYear.reduce((s, r) => s + (r.payment ?? 0), 0) * 100) / 100,
    principal: Math.round(monthsInYear.reduce((s, r) => s + (r.principal ?? 0), 0) * 100) / 100,
    interest: Math.round(monthsInYear.reduce((s, r) => s + (r.interest ?? 0), 0) * 100) / 100,
    balance: monthsInYear[monthsInYear.length - 1].balance,
  });
}
```

Then update `setResult` to include both schedules. Since `result` only needs one array and we pass both to the component, store them separately:

```typescript
setResult({
  monthlyPayment: Math.round(monthlyPayment * 100) / 100,
  totalInterest: Math.round(totalInterest * 100) / 100,
  totalPayment: Math.round(totalPayment * 100) / 100,
  lumpInterestSaved,
  lumpTimeSaved,
  schedule: yearlySchedule,   // yearly is the default shown
});
// Store monthly separately for the toggle
setMonthlySchedule(schedule);
```

Add a new state variable near the other `useState` calls:

```typescript
const [monthlySchedule, setMonthlySchedule] = useState<ScheduleRow[]>([]);
```

- [ ] **Step 3: Render the component below the existing results**

Find the closing section of the results display (just before `<CalculatorStaticContent`) and add:

```typescript
{result && result.schedule.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 pb-10">
    <AmortisationSchedule
      rows={result.schedule}
      monthlyRows={monthlySchedule}
      currencySymbol={sym}
      accentColour="#60A5FA"
      balanceLabel="Remaining Balance"
    />
  </div>
)}
```

Note: the accent colour `#60A5FA` matches the blue used in LoanCalculator. Check `const ACCENT` at the top of the file and use that variable instead if it's defined there.

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/finance/LoanCalculator.tsx
git commit -m "feat: add amortisation schedule to LoanCalculator"
```

---

## Task 3: Wire into CreditCardPayoff

**Files:**
- Modify: `src/pages/finance/CreditCardPayoff.tsx`

Credit card uses daily compounding. The schedule is purely monthly paydown — no Principal/Interest split needed, just balance per month.

- [ ] **Step 1: Import and add monthly schedule state**

```typescript
import { AmortisationSchedule, ScheduleRow } from "@/components/AmortisationSchedule";
```

Add state:

```typescript
const [ccSchedule, setCcSchedule] = useState<ScheduleRow[]>([]);
```

- [ ] **Step 2: Build schedule inside `calculatePayoff`**

After computing `N` and before `setResult`, add:

```typescript
// Build month-by-month paydown schedule
const ccMonthly: ScheduleRow[] = [];
let bal = P;
const totalMonths = Math.ceil(N);
for (let m = 1; m <= totalMonths; m++) {
  const interestCharge = bal * i;
  const payment = m < totalMonths ? A : bal + bal * i; // final payment clears balance
  const principalCharge = Math.min(payment - interestCharge, bal);
  bal = Math.max(bal - principalCharge, 0);
  ccMonthly.push({
    period: `Month ${m}`,
    periodIndex: m,
    payment: Math.round(payment * 100) / 100,
    principal: Math.round(principalCharge * 100) / 100,
    interest: Math.round(interestCharge * 100) / 100,
    balance: Math.round(bal * 100) / 100,
  });
}
setCcSchedule(ccMonthly);
```

- [ ] **Step 3: Render the component**

Find the closing section just before `<CalculatorStaticContent` and add:

```typescript
{result && ccSchedule.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 pb-10">
    <AmortisationSchedule
      rows={ccSchedule}
      currencySymbol={sym}
      accentColour="#F87171"
      balanceLabel="Remaining Balance"
      granularity="month"
    />
  </div>
)}
```

Note: CreditCardPayoff only has monthly rows (no yearly toggle) — omit `monthlyRows` prop so the toggle doesn't appear.

- [ ] **Step 4: Type-check and commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add src/pages/finance/CreditCardPayoff.tsx
git commit -m "feat: add amortisation schedule to CreditCardPayoff"
```

---

## Task 4: Wire into IsaCalculator

**Files:**
- Modify: `src/pages/finance/IsaCalculator.tsx`

ISA schedule shows: Year, Contributions (cumulative), Growth (cumulative), Balance. No payment/principal/interest split — use the `balance` column for portfolio value and hide payment cols.

- [ ] **Step 1: Import, add schedule state and update result type**

```typescript
import { AmortisationSchedule, ScheduleRow } from "@/components/AmortisationSchedule";
```

Add state:

```typescript
const [isaSchedule, setIsaSchedule] = useState<ScheduleRow[]>([]);
const [isaMonthlySchedule, setIsaMonthlySchedule] = useState<ScheduleRow[]>([]);
```

- [ ] **Step 2: Capture per-month balance inside `calculateIsa` loop**

Inside the existing `for (let m = 1; m <= months; m++)` loop, after updating `balance`, push to a local array. Add the local array declaration before the loop:

```typescript
const monthlyRows: ScheduleRow[] = [];
```

At the end of each loop iteration (after LISA tracker reset), push:

```typescript
monthlyRows.push({
  period: `Month ${m}`,
  periodIndex: m,
  balance: Math.round(balance * 100) / 100,
});
```

After the loop (before computing `lumpBoost`), build the yearly aggregation:

```typescript
const yearlyRows: ScheduleRow[] = [];
for (let y = 1; y <= Math.ceil(months / 12); y++) {
  const endMonth = Math.min(y * 12, months);
  const row = monthlyRows[endMonth - 1];
  if (row) {
    yearlyRows.push({
      period: `Year ${y}`,
      periodIndex: y,
      balance: row.balance,
    });
  }
}
```

After `setResult(...)`, add:

```typescript
setIsaSchedule(yearlyRows);
setIsaMonthlySchedule(monthlyRows);
```

- [ ] **Step 3: Render the component**

Find the section just before `<CalculatorStaticContent` (or before the FAQ section) and add:

```typescript
{result && isaSchedule.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 pb-10">
    <AmortisationSchedule
      rows={isaSchedule}
      monthlyRows={isaMonthlySchedule}
      currencySymbol="£"
      accentColour="#86EFAC"
      balanceLabel="Portfolio Value"
    />
  </div>
)}
```

Note: ISA calculator does not use `CurrencySelector` — it's always GBP (£). No payment columns will show since `payment`, `principal`, `interest` are undefined on ISA rows.

- [ ] **Step 4: Type-check and commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add src/pages/finance/IsaCalculator.tsx
git commit -m "feat: add growth schedule to IsaCalculator"
```

---

## Task 5: Wire into MortgageOverpayment

**Files:**
- Modify: `src/pages/finance/MortgageOverpayment.tsx`

This is the dual-balance case. Show two balance columns: "With Overpayment" (accent green) and "Standard" (dimmed). Build the standard schedule and the overpayment schedule in parallel.

The component needs monthly rows because users want to see the exact month when balances diverge.

- [ ] **Step 1: Import and add schedule states**

```typescript
import { AmortisationSchedule, ScheduleRow } from "@/components/AmortisationSchedule";
```

Add state:

```typescript
const [overpaySchedule, setOverpaySchedule] = useState<ScheduleRow[]>([]);
const [overpayMonthlySchedule, setOverpayMonthlySchedule] = useState<ScheduleRow[]>([]);
```

- [ ] **Step 2: Build dual schedule in `calculateRegularOverpayment`**

After `setRegularResult(...)`, add:

```typescript
// Build dual-balance schedule (standard vs with overpayment)
const N2 = (parseInt(termYears) || 0) * 12 + (parseInt(termMonths) || 0);
const P2 = parseFloat(principal);
const i2 = parseFloat(interestRate) / 100 / 12;
const PMT_std = (P2 * i2) / (1 - Math.pow(1 + i2, -N2));
const PMT_over = PMT_std + parseFloat(monthlyOverpayment);

const monthlyDual: ScheduleRow[] = [];
let balStd = P2, balOver = P2;
const maxMonths = N2;
for (let m = 1; m <= maxMonths; m++) {
  if (balStd > 0) {
    balStd = Math.max(balStd * (1 + i2) - PMT_std, 0);
  }
  if (balOver > 0) {
    balOver = Math.max(balOver * (1 + i2) - PMT_over, 0);
  }
  monthlyDual.push({
    period: `Month ${m}`,
    periodIndex: m,
    balance: Math.round(balOver * 100) / 100,
    balance2: Math.round(balStd * 100) / 100,
  });
  if (balStd <= 0 && balOver <= 0) break;
}

// Aggregate yearly
const yearlyDual: ScheduleRow[] = [];
for (let y = 1; y <= Math.ceil(monthlyDual.length / 12); y++) {
  const endIdx = Math.min(y * 12, monthlyDual.length) - 1;
  const row = monthlyDual[endIdx];
  if (row) {
    yearlyDual.push({
      period: `Year ${y}`,
      periodIndex: y,
      balance: row.balance,
      balance2: row.balance2,
    });
  }
}

setOverpaySchedule(yearlyDual);
setOverpayMonthlySchedule(monthlyDual);
```

- [ ] **Step 3: Build dual schedule in `calculateLumpSumOverpayment`**

After `setLumpResult(...)`, add:

```typescript
// Build dual-balance schedule (standard vs with lump sum)
const NL = (parseInt(termYears) || 0) * 12 + (parseInt(termMonths) || 0);
const PL = parseFloat(principal);
const iL = parseFloat(interestRate) / 100 / 12;
const kL = (parseInt(lumpSumYear) || 0) * 12 + (parseInt(lumpSumMonth) || 0);
const LL = parseFloat(lumpSum);
const PMT_L = (PL * iL) / (1 - Math.pow(1 + iL, -NL));

const monthlyLump: ScheduleRow[] = [];
let balS = PL, balL = PL;
for (let m = 1; m <= NL; m++) {
  if (balS > 0) balS = Math.max(balS * (1 + iL) - PMT_L, 0);
  if (balL > 0) {
    if (m === kL) balL = Math.max(balL - LL, 0);
    balL = Math.max(balL * (1 + iL) - PMT_L, 0);
  }
  monthlyLump.push({
    period: `Month ${m}`,
    periodIndex: m,
    balance: Math.round(balL * 100) / 100,
    balance2: Math.round(balS * 100) / 100,
  });
  if (balS <= 0 && balL <= 0) break;
}

const yearlyLump: ScheduleRow[] = [];
for (let y = 1; y <= Math.ceil(monthlyLump.length / 12); y++) {
  const endIdx = Math.min(y * 12, monthlyLump.length) - 1;
  const row = monthlyLump[endIdx];
  if (row) {
    yearlyLump.push({
      period: `Year ${y}`,
      periodIndex: y,
      balance: row.balance,
      balance2: row.balance2,
    });
  }
}

setOverpaySchedule(yearlyLump);
setOverpayMonthlySchedule(monthlyLump);
```

- [ ] **Step 4: Render the component**

Find the closing section just before `<CalculatorStaticContent` and add:

```typescript
{overpaySchedule.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 pb-10">
    <AmortisationSchedule
      rows={overpaySchedule}
      monthlyRows={overpayMonthlySchedule}
      currencySymbol={sym}
      accentColour="#86EFAC"
      balanceLabel="Balance (With Overpayment)"
      balance2Label="Balance (Standard)"
    />
  </div>
)}
```

- [ ] **Step 5: Type-check and commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add src/pages/finance/MortgageOverpayment.tsx
git commit -m "feat: add dual-balance amortisation schedule to MortgageOverpayment"
```

---

## Task 6: Add jump-to bar to existing MortgageCalculator table

**Files:**
- Modify: `src/pages/finance/MortgageCalculator.tsx`

The mortgage calculator already has a full schedule table. We do NOT replace it — we add the jump-to bar above it and highlight logic to the existing rows.

- [ ] **Step 1: Add jump-to state variables**

Near the existing `const [breakdownView, setBreakdownView]` line, add:

```typescript
const [jumpInput, setJumpInput]           = useState("");
const [highlightedPeriod, setHighlightedPeriod] = useState<string | null>(null);
```

- [ ] **Step 2: Add the jump-to bar JSX above the existing table**

Find the comment `{/* Table */}` and insert before it:

```typescript
{/* Jump-to bar */}
<div className="px-6 py-4 border-b border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
  <span className="text-[10px] font-heading uppercase tracking-widest text-white/40 shrink-0">
    Jump to {breakdownView === "yearly" ? "Year" : "Month"}
  </span>
  <div className="flex items-center gap-2">
    <input
      type="number"
      min="1"
      value={jumpInput}
      onChange={e => setJumpInput(e.target.value)}
      onKeyDown={e => e.key === "Enter" && (() => {
        const target = breakdownView === "yearly" ? `Year ${jumpInput}` : `Month ${jumpInput}`;
        setHighlightedPeriod(target);
      })()}
      placeholder={breakdownView === "yearly" ? "e.g. 5" : "e.g. 24"}
      className="w-24 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-heading focus:outline-none transition-all"
    />
    <button
      onClick={() => {
        const target = breakdownView === "yearly" ? `Year ${jumpInput}` : `Month ${jumpInput}`;
        setHighlightedPeriod(target);
      }}
      className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-[10px] uppercase tracking-widest text-black transition-all hover:-translate-y-0.5"
      style={{ background: ACCENT }}
    >
      Find
    </button>
    {highlightedPeriod && (
      <button
        onClick={() => { setHighlightedPeriod(null); setJumpInput(""); }}
        className="text-[10px] font-heading uppercase tracking-widest text-white/30 hover:text-white transition-colors"
      >
        Clear
      </button>
    )}
  </div>
</div>
```

Also add `import { Search } from "lucide-react"` to the existing lucide import if not already there.

- [ ] **Step 3: Add highlight to table rows**

In the existing `rows.map(...)` where each `<tr>` is rendered, change:

```typescript
<tr
  key={i}
  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
>
```

to:

```typescript
<tr
  key={i}
  ref={row.period === highlightedPeriod ? (el => el?.scrollIntoView({ behavior: "smooth", block: "center" })) : null}
  className={`border-b border-white/[0.04] transition-colors ${
    row.period === highlightedPeriod ? "border-l-2" : "hover:bg-white/[0.02]"
  }`}
  style={row.period === highlightedPeriod ? {
    backgroundColor: `${color}12`,
    borderLeftColor: color,
  } : undefined}
>
```

- [ ] **Step 4: Clear highlight when view changes**

Add `setHighlightedPeriod(null)` inside the existing view toggle button's `onClick`:

```typescript
onClick={() => { setBreakdownView(v); setHighlightedPeriod(null); setJumpInput(""); }}
```

- [ ] **Step 5: Type-check and commit**

```bash
npx tsc --noEmit 2>&1 | head -20
git add src/pages/finance/MortgageCalculator.tsx
git commit -m "feat: add jump-to highlight to MortgageCalculator schedule"
```

---

## Task 7: Final push

- [ ] **Step 1: Run full type-check**

```bash
npx tsc --noEmit 2>&1
```

Expected: no errors

- [ ] **Step 2: Push to origin**

```bash
git push origin main
```

Expected: all 6 commits pushed, Vercel deploy triggered
