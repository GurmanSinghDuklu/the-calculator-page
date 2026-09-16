/**
 * US Repayment Assistance Plan (RAP) — policy configuration.
 *
 * RAP launched 1 July 2026 under P.L. 119-21 (FY2025 reconciliation) and is the
 * ONLY income-driven repayment plan open to borrowers whose first loan is
 * disbursed on/after that date. It replaced SAVE, which was struck down by the
 * 8th Circuit (reported March 2026).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS SEPARATELY:
 * Every figure here is volatile. RAP is new, Dept. of Education implementation
 * is still settling, and the PSLF employer rule has live litigation. Keep all
 * policy numbers in this one dated object so the calculator can be refreshed by
 * editing a single file — never inline these values into components.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * VERIFICATION STATUS — read before updating:
 * Figures compiled from Dept. of Education press material, CRS IF13075,
 * Edfinancial (a studentaid.gov servicer subdomain) and reputable secondary
 * sources. studentaid.gov itself blocks automated fetching, so the primary
 * source has NOT been machine-verified.
 *
 * Specifically unconfirmed (verify manually against studentaid.gov before
 * relying on these for anything consequential):
 *   1. Exact bracket boundaries — sources agree on the "1% per $10k" pattern
 *      but differ on whether edges are inclusive or exclusive.
 *   2. Whether the bracket rate applies to the borrower's WHOLE AGI (modelled
 *      here) or marginally per band. Whole-AGI matches how ED describes it.
 */

export const RAP_CONFIG = {
  /** Date the figures in this file were compiled. Rendered on the page. */
  confirmedAsOf: "2026-09-16",
  /** Award year these figures apply to. */
  awardYear: "2026-27",
  effectiveFrom: "2026-07-01",

  /**
   * Payment brackets. Rate is applied to total AGI (see caveat #2 above).
   * `maxAgi: null` = top bracket, no upper bound.
   */
  brackets: [
    { minAgi: 0,       maxAgi: 10_000,  rate: 0,    flatMonthly: 10 },
    { minAgi: 10_000,  maxAgi: 20_000,  rate: 0.01, flatMonthly: null },
    { minAgi: 20_000,  maxAgi: 30_000,  rate: 0.02, flatMonthly: null },
    { minAgi: 30_000,  maxAgi: 40_000,  rate: 0.03, flatMonthly: null },
    { minAgi: 40_000,  maxAgi: 50_000,  rate: 0.04, flatMonthly: null },
    { minAgi: 50_000,  maxAgi: 60_000,  rate: 0.05, flatMonthly: null },
    { minAgi: 60_000,  maxAgi: 70_000,  rate: 0.06, flatMonthly: null },
    { minAgi: 70_000,  maxAgi: 80_000,  rate: 0.07, flatMonthly: null },
    { minAgi: 80_000,  maxAgi: 90_000,  rate: 0.08, flatMonthly: null },
    { minAgi: 90_000,  maxAgi: 100_000, rate: 0.09, flatMonthly: null },
    { minAgi: 100_000, maxAgi: null,    rate: 0.10, flatMonthly: null },
  ] as const,

  /** Monthly payment reduction per dependent. */
  dependentDeductionMonthly: 50,
  /** Hard floor — RAP has no $0 payment, unlike the plans it replaced. */
  minimumMonthlyPayment: 10,
  /** Months of qualifying payments before the balance is forgiven. */
  forgivenessMonths: 360,
  /**
   * RAP cancels unpaid monthly interest, so a balance never grows while the
   * borrower is paying on time. This is a genuine improvement over IBR/ICR.
   */
  interestWaiver: true,
  /**
   * If a payment reduces principal by less than this, ED matches the shortfall
   * up to this amount so every payment makes some dent in the principal.
   */
  principalMatchMonthly: 50,
  /** RAP has NO payment cap — unlike IBR, which caps at the 10-yr Standard. */
  hasPaymentCap: false,

  /** Loan types excluded from RAP entirely. */
  excludedLoanTypes: [
    "Parent PLUS loans",
    "Consolidation loans that include a Parent PLUS loan",
  ],

  /** 2026-27 fixed rates, for loans disbursed 1 Jul 2026 – 30 Jun 2027. */
  interestRates2026_27: {
    undergraduateDirect: 6.52,
    graduateDirectUnsubsidized: 8.07,
    plus: 9.07,
  },
} as const;

/**
 * Tax treatment of forgiven balances.
 *
 * The ARPA §108(f)(5) exclusion EXPIRED 31 Dec 2025 and was not extended, so
 * income-driven forgiveness is federally taxable again. This is the detail most
 * competing calculators still omit — a borrower forgiven at year 30 can face a
 * substantial one-off tax bill in the forgiveness year.
 */
export const FORGIVENESS_TAX = {
  /** IDR/RAP forgiveness on/after this date is taxable as COD income. */
  taxableFrom: "2026-01-01",
  idrForgivenessTaxable: true,
  /** These remain permanently tax-free. */
  taxFreeForgivenessTypes: [
    "Public Service Loan Forgiveness (PSLF)",
    "Teacher Loan Forgiveness",
    "Death or total and permanent disability discharge",
  ],
  /** State treatment varies — the page must not imply federal rules are universal. */
  stateTreatmentVaries: true,
} as const;

export type RapBracket = (typeof RAP_CONFIG.brackets)[number];
