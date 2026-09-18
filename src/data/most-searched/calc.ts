// All monetary inputs/outputs are plain numbers (major currency units).

export interface TakeHomeResult {
  gross: number;
  net: number;
  incomeTax: number;
  ni?: number;    // UK National Insurance
  fica?: number;  // US FICA
  federalTax?: number;
}

/** UK take-home for 2026/27: Personal Allowance £12,570 (tapered above £100k),
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

  // National Insurance (employee, 2026/27)
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

export interface StampDutyBandResult {
  from: number;
  to: number | null;
  rate: number;
  tax: number;
}

export interface StampDutyResult {
  totalTax: number;
  effectiveRate: number;
  bands: StampDutyBandResult[];
}

/**
 * UK Stamp Duty Land Tax (England/NI), residential property, 2026/27 rates.
 * Bands mirror src/pages/finance/StampDutyCalculator.tsx exactly — keep in
 * sync if that page's rates ever change.
 */
const SDLT_BANDS: Record<"home-mover" | "first-time", { from: number; to: number | null; rate: number }[]> = {
  "home-mover": [
    { from: 0, to: 125000, rate: 0 },
    { from: 125000, to: 250000, rate: 2 },
    { from: 250000, to: 925000, rate: 5 },
    { from: 925000, to: 1500000, rate: 10 },
    { from: 1500000, to: null, rate: 12 },
  ],
  "first-time": [
    { from: 0, to: 300000, rate: 0 },
    { from: 300000, to: 500000, rate: 5 },
  ],
};
const FIRST_TIME_RELIEF_CEILING = 500000; // above this, first-time buyers pay standard rates

export function stampDuty(price: number, buyerType: "home-mover" | "first-time" = "home-mover"): StampDutyResult {
  if (price <= 0) return { totalTax: 0, effectiveRate: 0, bands: [] };
  const bands =
    buyerType === "first-time" && price <= FIRST_TIME_RELIEF_CEILING
      ? SDLT_BANDS["first-time"]
      : SDLT_BANDS["home-mover"];

  let remaining = price;
  let totalTax = 0;
  const bandResults: StampDutyBandResult[] = [];
  for (const band of bands) {
    const bandEnd = band.to ?? Infinity;
    const taxableInBand = Math.min(Math.max(0, price - band.from), bandEnd - band.from);
    const tax = taxableInBand * (band.rate / 100);
    bandResults.push({ from: band.from, to: band.to, rate: band.rate, tax });
    totalTax += tax;
    remaining -= taxableInBand;
    if (remaining <= 0) break;
  }
  return { totalTax, effectiveRate: (totalTax / price) * 100, bands: bandResults };
}
