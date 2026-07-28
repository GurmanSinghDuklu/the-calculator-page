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
