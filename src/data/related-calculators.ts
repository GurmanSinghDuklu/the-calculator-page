import type { PreviewShape } from "@/components/CalculatorPreviewIcon";

export interface RelatedItem {
  title: string;
  hook: string;
  path: string;
  accent: string;
  shape: PreviewShape;
}

/** Curated "related calculator" sets, keyed by calculator page. Shown between
 * Results and the Why/How section — the highest-intent moment on the page. */
export const RELATED_CALCULATORS: Record<string, RelatedItem[]> = {
  "compound-interest": [
    { title: "Savings Calculator", hook: "See it with regular deposits added in", path: "/finance/savings", accent: "#3B82F6", shape: "growth-curve" },
    { title: "ISA Calculator", hook: "Same growth, tax-free in a UK ISA wrapper", path: "/finance/isa-calculator", accent: "#22C55E", shape: "growth-curve" },
    { title: "Retirement Calculator", hook: "Project this growth all the way to retirement", path: "/finance/retirement", accent: "#3B82F6", shape: "pension-stack" },
  ],
  mortgage: [
    { title: "Stamp Duty Calculator", hook: "Work out the tax due on this purchase", path: "/finance/stamp-duty", accent: "#F97316", shape: "scale-tip" },
    { title: "Mortgage Overpayment", hook: "See how much overpaying saves in interest", path: "/finance/mortgage-overpayment", accent: "#F97316", shape: "schedule" },
    { title: "What Salary Do I Need?", hook: "Check if your income supports this mortgage", path: "/mortgages/salary-for-mortgage", accent: "#3B82F6", shape: "bars" },
  ],
  retirement: [
    { title: "Compound Interest", hook: "See the maths behind your pot's growth", path: "/finance/compound-interest", accent: "#3B82F6", shape: "growth-curve" },
    { title: "ISA Calculator", hook: "Compare pension growth to a Stocks & Shares ISA", path: "/finance/isa-calculator", accent: "#22C55E", shape: "growth-curve" },
    { title: "How Much to Save", hook: "Work backwards from your retirement target", path: "/finance/how-much-to-save", accent: "#3B82F6", shape: "bars" },
  ],
  salary: [
    { title: "Budget Calculator", hook: "Plan where this take-home pay should go", path: "/finance/budget", accent: "#3B82F6", shape: "donut" },
    { title: "Mortgage Calculator", hook: "See what this salary affords on a mortgage", path: "/finance/mortgage", accent: "#F97316", shape: "schedule" },
    { title: "ISA Calculator", hook: "Put some of this take-home pay to work", path: "/finance/isa-calculator", accent: "#22C55E", shape: "growth-curve" },
  ],
  "bmi-calculator": [
    { title: "Calorie Calculator", hook: "Find your daily calorie needs next", path: "/misc/calorie-calculator", accent: "#22C55E", shape: "gauge" },
    { title: "Age Calculator", hook: "Quick everyday calculator, same category", path: "/misc/age", accent: "#22C55E", shape: "bars" },
  ],
  "calorie-calculator": [
    { title: "BMI Calculator", hook: "Check your BMI alongside your calorie needs", path: "/misc/bmi-calculator", accent: "#22C55E", shape: "gauge" },
    { title: "Percentage Calculator", hook: "Quick maths tool, same category", path: "/misc/percentage", accent: "#22C55E", shape: "bars" },
  ],
  "stamp-duty": [
    { title: "Mortgage Calculator", hook: "Work out monthly repayments on this purchase", path: "/finance/mortgage", accent: "#F97316", shape: "schedule" },
    { title: "What Salary Do I Need?", hook: "Check your income supports this purchase", path: "/mortgages/salary-for-mortgage", accent: "#3B82F6", shape: "bars" },
    { title: "Mortgage Overpayment", hook: "See how overpaying could save you", path: "/finance/mortgage-overpayment", accent: "#F97316", shape: "schedule" },
  ],
  "isa-calculator": [
    { title: "Compound Interest", hook: "See the raw maths behind ISA growth", path: "/finance/compound-interest", accent: "#3B82F6", shape: "growth-curve" },
    { title: "Retirement Calculator", hook: "Project ISA growth toward retirement", path: "/finance/retirement", accent: "#3B82F6", shape: "pension-stack" },
    { title: "Savings Calculator", hook: "Compare against a standard savings account", path: "/finance/savings", accent: "#3B82F6", shape: "growth-curve" },
  ],
  loan: [
    { title: "Car Loan Calculator", hook: "Loan calculator tuned for vehicle finance", path: "/finance/car-loan", accent: "#3B82F6", shape: "schedule" },
    { title: "Credit Card Payoff", hook: "Got card debt too? Plan the payoff", path: "/finance/credit-card-payoff", accent: "#3B82F6", shape: "bars" },
    { title: "Budget Calculator", hook: "See how this repayment fits your budget", path: "/finance/budget", accent: "#3B82F6", shape: "donut" },
  ],
  savings: [
    { title: "Compound Interest", hook: "See the growth maths in full detail", path: "/finance/compound-interest", accent: "#3B82F6", shape: "growth-curve" },
    { title: "How Long to Save", hook: "Work out when you'll hit your goal", path: "/finance/how-long-to-save", accent: "#3B82F6", shape: "bars" },
    { title: "ISA Calculator", hook: "Same growth, tax-free in an ISA", path: "/finance/isa-calculator", accent: "#22C55E", shape: "growth-curve" },
  ],
};

export function getRelatedCalculators(key: string): RelatedItem[] {
  return RELATED_CALCULATORS[key] ?? [];
}
