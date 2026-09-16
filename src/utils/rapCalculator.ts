import { RAP_CONFIG } from "@/data/rap-config";

/**
 * RAP (Repayment Assistance Plan) calculation engine.
 *
 * Deliberately separate from the page component so the maths can be reasoned
 * about and tested on its own. All policy figures come from src/data/rap-config.ts.
 *
 * Key differences from the plans RAP replaced — these drive the whole model:
 *  • Payment is a % of TOTAL AGI, not discretionary income. The federal poverty
 *    guideline plays no part, so household size only matters via the flat
 *    $50/dependent deduction.
 *  • There is no payment cap. A high earner pays a straight 10% of AGI, where
 *    IBR would have capped them at the 10-year Standard amount.
 *  • Unpaid interest is waived each month, so the balance cannot grow while the
 *    borrower pays on time — no negative amortisation.
 *  • A principal match tops up payments that barely touch principal.
 */

export interface RapInput {
  /** Adjusted Gross Income, annual, in dollars. */
  agi: number;
  /** Current loan balance in dollars. */
  balance: number;
  /** Annual interest rate as a percentage, e.g. 6.52. */
  interestRate: number;
  /** Number of dependents — each reduces the monthly payment by a flat amount. */
  dependents: number;
  /** Assumed annual income growth as a percentage, e.g. 3 for 3%. */
  annualIncomeGrowth: number;
}

export interface RapMonthRow {
  month: number;
  payment: number;
  interestCharged: number;
  interestWaived: number;
  principalPaid: number;
  principalMatch: number;
  balance: number;
}

export interface RapResult {
  /** Monthly payment in month 1. */
  initialMonthlyPayment: number;
  /** The bracket rate applied at the starting AGI, as a percentage. */
  bracketRatePercent: number;
  /** True when the borrower is on the $10 floor rather than a percentage. */
  onMinimumPayment: boolean;
  /** Month the balance hits zero, or null if forgiven instead. */
  payoffMonth: number | null;
  /** True when the loan runs the full term and the remainder is forgiven. */
  isForgiven: boolean;
  /** Balance written off at forgiveness. Zero if repaid in full. */
  forgivenAmount: number;
  /** Total actually paid across the life of the loan. */
  totalPaid: number;
  /** Total interest genuinely charged and paid. */
  totalInterestPaid: number;
  /** Interest cancelled by the RAP waiver — money the borrower never owes. */
  totalInterestWaived: number;
  /** Total principal contributed by the ED principal match. */
  totalPrincipalMatch: number;
  schedule: RapMonthRow[];
}

/** Returns the RAP bracket covering a given AGI. */
export function getBracket(agi: number) {
  const safeAgi = Math.max(0, agi);
  for (const b of RAP_CONFIG.brackets) {
    const underMax = b.maxAgi === null || safeAgi <= b.maxAgi;
    if (safeAgi >= b.minAgi && underMax) return b;
  }
  return RAP_CONFIG.brackets[RAP_CONFIG.brackets.length - 1];
}

/**
 * Monthly RAP payment for a given AGI and dependent count.
 * Applies the bracket rate to total AGI, deducts the per-dependent allowance,
 * then enforces the hard floor.
 */
export function monthlyPaymentFor(agi: number, dependents: number): number {
  const bracket = getBracket(agi);
  const base =
    bracket.flatMonthly !== null
      ? bracket.flatMonthly
      : (Math.max(0, agi) * bracket.rate) / 12;

  const afterDependents =
    base - Math.max(0, dependents) * RAP_CONFIG.dependentDeductionMonthly;

  return Math.max(RAP_CONFIG.minimumMonthlyPayment, afterDependents);
}

/**
 * Runs the full RAP repayment schedule to payoff or forgiveness.
 *
 * Income grows annually, so the payment is recalculated every 12 months.
 * Interest is charged monthly but any amount the payment doesn't cover is
 * waived rather than capitalised.
 */
export function calculateRap(input: RapInput): RapResult {
  const { agi, balance, interestRate, dependents, annualIncomeGrowth } = input;

  const monthlyRate = interestRate / 100 / 12;
  const growth = annualIncomeGrowth / 100;

  const schedule: RapMonthRow[] = [];
  let currentBalance = balance;
  let currentAgi = agi;

  let totalPaid = 0;
  let totalInterestPaid = 0;
  let totalInterestWaived = 0;
  let totalPrincipalMatch = 0;
  let payoffMonth: number | null = null;

  const initialPayment = monthlyPaymentFor(agi, dependents);
  const initialBracket = getBracket(agi);

  for (let month = 1; month <= RAP_CONFIG.forgivenessMonths; month++) {
    if (currentBalance <= 0) break;

    // Recalculate income and payment at each anniversary.
    if (month > 1 && (month - 1) % 12 === 0) {
      currentAgi = currentAgi * (1 + growth);
    }
    const scheduledPayment = monthlyPaymentFor(currentAgi, dependents);

    const interestCharged = currentBalance * monthlyRate;

    // The payment covers interest first. Anything left reduces principal.
    const interestPaid = Math.min(scheduledPayment, interestCharged);
    // RAP waives interest the payment couldn't cover — it is never capitalised.
    const interestWaived = RAP_CONFIG.interestWaiver
      ? Math.max(0, interestCharged - interestPaid)
      : 0;

    let principalFromPayment = Math.max(0, scheduledPayment - interestCharged);

    // ED matches the shortfall so every payment reduces principal by at least
    // the match amount — capped so it never overshoots the remaining balance.
    const matchShortfall = Math.max(
      0,
      RAP_CONFIG.principalMatchMonthly - principalFromPayment,
    );
    let principalMatch = Math.min(
      matchShortfall,
      Math.max(0, currentBalance - principalFromPayment),
    );

    // Final month — don't overpay past the remaining balance.
    if (principalFromPayment + principalMatch >= currentBalance) {
      principalFromPayment = Math.min(principalFromPayment, currentBalance);
      principalMatch = Math.max(0, currentBalance - principalFromPayment);
    }

    const actualPayment = interestPaid + principalFromPayment;

    currentBalance = Math.max(
      0,
      currentBalance - principalFromPayment - principalMatch,
    );

    totalPaid += actualPayment;
    totalInterestPaid += interestPaid;
    totalInterestWaived += interestWaived;
    totalPrincipalMatch += principalMatch;

    schedule.push({
      month,
      payment: round2(actualPayment),
      interestCharged: round2(interestCharged),
      interestWaived: round2(interestWaived),
      principalPaid: round2(principalFromPayment),
      principalMatch: round2(principalMatch),
      balance: round2(currentBalance),
    });

    if (currentBalance <= 0 && payoffMonth === null) {
      payoffMonth = month;
      break;
    }
  }

  const isForgiven = currentBalance > 0;

  return {
    initialMonthlyPayment: round2(initialPayment),
    bracketRatePercent: initialBracket.flatMonthly !== null
      ? 0
      : round2(initialBracket.rate * 100),
    onMinimumPayment: initialPayment <= RAP_CONFIG.minimumMonthlyPayment,
    payoffMonth,
    isForgiven,
    forgivenAmount: round2(isForgiven ? currentBalance : 0),
    totalPaid: round2(totalPaid),
    totalInterestPaid: round2(totalInterestPaid),
    totalInterestWaived: round2(totalInterestWaived),
    totalPrincipalMatch: round2(totalPrincipalMatch),
    schedule,
  };
}

/**
 * Estimated federal tax on a forgiven balance.
 *
 * The ARPA exclusion expired 31 Dec 2025, so IDR/RAP forgiveness is taxable as
 * cancellation-of-debt income again. This is a rough estimate: the forgiven
 * amount is added to income in the forgiveness year, which can push the
 * borrower into higher brackets. Marginal rate is supplied by the caller.
 */
export function estimateForgivenessTax(
  forgivenAmount: number,
  marginalRatePercent: number,
): number {
  return round2(Math.max(0, forgivenAmount) * (marginalRatePercent / 100));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
