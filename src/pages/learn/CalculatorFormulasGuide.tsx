import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ACCENT = "#3B82F6"; // Finance — blue

const CARD_COLORS: Record<string, string> = {
  compound:   "#3B82F6",
  loan:       "#A78BFA",
  mortgage:   "#34D399",
  apy:        "#F97316",
  retirement: "#818CF8",
  credit:     "#F87171",
};

// ── Shared editorial components ───────────────────────────────────────────────

function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose border-l-2 border-white/15 bg-white/[0.02] px-5 py-4 my-5 font-mono text-sm text-zinc-400 overflow-x-auto">
      {children}
    </div>
  );
}

function ExampleCard({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="not-prose flex gap-0 my-6 border border-white/8 bg-black">
      <div className="w-1 shrink-0" style={{ background: color }} />
      <div className="flex-1 px-6 py-5">
        {children}
      </div>
    </div>
  );
}

function ExLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return <p className="not-prose font-heading text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color }}>{children}</p>;
}

function ExMono({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/6 px-4 py-3 font-mono text-xs text-zinc-500 my-3 overflow-x-auto space-y-1">
      {children}
    </div>
  );
}

export default function CalculatorFormulasGuide() {
  return (
    <ArticleLayout
        publishDate="2025-07-01"
      title="Calculator Formulas Guide: Financial Maths Explained"
      description="Essential financial formulas: compound interest, mortgage amortization, annuity and present value explained."
      readTime="12 min read"
      category="Financial Education"
      categoryColor="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    >
      <p className="lead text-xl text-muted-foreground mb-8">
        Understanding the mathematical formulas behind financial calculators empowers you to make better money decisions.
        This guide breaks down the most important calculator formulas you'll encounter in personal finance.
      </p>

      {/* ── Quick nav — flush box ── */}
      <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
        <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 mb-4">Quick Navigation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          {[
            ["#compound-interest", "Compound Interest"],
            ["#loan-payment",      "Loan Payments"],
            ["#mortgage",          "Mortgage Calculations"],
            ["#apy",               "APY Formula"],
            ["#retirement",        "Retirement Savings"],
            ["#credit-card",       "Credit Card Payoff"],
          ].map(([href, label]) => (
            <a key={href} href={href}
              className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ color: ACCENT }}>
              <span>→</span> {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── 1. Compound Interest ── */}
      <h2 id="compound-interest">1. Compound Interest Formula</h2>
      <p>Compound interest is arguably the most important financial formula you'll ever learn. Your money grows exponentially by earning interest on your interest.</p>
      <FormulaBox>FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]</FormulaBox>

      <h3>Breaking Down the Variables:</h3>
      <ul>
        <li><strong>FV (Future Value):</strong> The amount your investment will be worth in the future</li>
        <li><strong>P (Principal):</strong> Your initial investment amount</li>
        <li><strong>r (Rate):</strong> Annual interest rate as a decimal (5% = 0.05)</li>
        <li><strong>n (Compounding Frequency):</strong> How many times per year interest compounds</li>
        <li><strong>t (Time):</strong> Number of years the money is invested</li>
        <li><strong>PMT (Payment):</strong> Regular contributions you make each period</li>
      </ul>

      <ExampleCard color={CARD_COLORS.compound}>
        <ExLabel color={CARD_COLORS.compound}>Real-World Example</ExLabel>
        <p className="text-zinc-500 text-sm mb-3">Invest <strong className="text-zinc-300">$10,000</strong> at 7% with $500/month for 20 years:</p>
        <ExMono>FV = 10,000(1 + 0.07/12)^(240) + 500 × [((1 + 0.07/12)^(240) - 1) / (0.07/12)]</ExMono>
        <p className="font-heading text-sm uppercase tracking-widest mt-3" style={{ color: CARD_COLORS.compound }}>Result: $303,691</p>
        <p className="text-zinc-600 text-xs font-sans mt-1">Contributed $130,000 total — earned $173,691 in interest.</p>
      </ExampleCard>

      {/* ── 2. Loan Payment ── */}
      <h2 id="loan-payment">2. Loan Payment Formula</h2>
      <p>This amortization formula calculates your exact monthly payment for any fixed-rate loan, ensuring it's fully paid off at term end.</p>
      <FormulaBox>M = P × [r(1 + r)^n] / [(1 + r)^n - 1]</FormulaBox>

      <h3>Understanding the Variables:</h3>
      <ul>
        <li><strong>M (Monthly Payment):</strong> The amount you'll pay each month</li>
        <li><strong>P (Principal):</strong> The total loan amount you're borrowing</li>
        <li><strong>r (Monthly Rate):</strong> Annual interest rate ÷ 12</li>
        <li><strong>n (Number of Payments):</strong> Total months (5-year loan = 60 months)</li>
      </ul>

      <ExampleCard color={CARD_COLORS.loan}>
        <ExLabel color={CARD_COLORS.loan}>Practical Example</ExLabel>
        <p className="text-zinc-500 text-sm mb-3">Car loan: <strong className="text-zinc-300">$25,000</strong> at 6% APR for 5 years:</p>
        <ExMono>M = 25,000 × [0.005(1.005)^60] / [(1.005)^60 - 1]</ExMono>
        <p className="font-heading text-sm uppercase tracking-widest mt-3" style={{ color: CARD_COLORS.loan }}>Monthly Payment: $483.32</p>
        <p className="text-zinc-600 text-xs font-sans mt-1">Total paid over 5 years: $28,999 | Total interest: $3,999</p>
      </ExampleCard>

      {/* ── 3. Mortgage ── */}
      <h2 id="mortgage">3. Mortgage Payment Formula</h2>
      <p>Mortgages include principal, interest, property taxes, and insurance (PITI). Understanding this helps you determine what home you can truly afford.</p>
      <FormulaBox>M = L × [r(1 + r)^n] / [(1 + r)^n - 1] + T/12 + I/12</FormulaBox>

      <h3>Variable Breakdown:</h3>
      <ul>
        <li><strong>M:</strong> Total monthly payment</li>
        <li><strong>L (Loan Amount):</strong> Home price minus down payment</li>
        <li><strong>r:</strong> Monthly interest rate (annual rate ÷ 12)</li>
        <li><strong>n:</strong> Loan term in months (30 years = 360)</li>
        <li><strong>T:</strong> Annual property tax</li>
        <li><strong>I:</strong> Annual homeowners insurance</li>
      </ul>

      <ExampleCard color={CARD_COLORS.mortgage}>
        <ExLabel color={CARD_COLORS.mortgage}>Complete Example</ExLabel>
        <p className="text-zinc-500 text-sm mb-3">Buying a <strong className="text-zinc-300">$400,000</strong> home, 20% down, 7% APR, 30 years:</p>
        <ExMono>
          <div>P&I: 320,000 × [0.00583(1.00583)^360] / [(1.00583)^360 - 1] = $2,129</div>
          <div>Tax: $6,000 ÷ 12 = $500</div>
          <div>Insurance: $1,800 ÷ 12 = $150</div>
        </ExMono>
        <p className="font-heading text-sm uppercase tracking-widest mt-3" style={{ color: CARD_COLORS.mortgage }}>Total Monthly Payment: $2,779</p>
      </ExampleCard>

      {/* ── 4. APY ── */}
      <h2 id="apy">4. APY Formula</h2>
      <p>APY (Annual Percentage Yield) shows your real rate of return after accounting for compounding frequency — crucial when comparing savings accounts.</p>
      <FormulaBox>APY = (1 + r/n)^n - 1</FormulaBox>

      <h3>What It Means:</h3>
      <ul>
        <li><strong>APY:</strong> The effective annual rate you actually earn</li>
        <li><strong>r:</strong> The nominal (stated) annual interest rate</li>
        <li><strong>n:</strong> Number of times interest compounds per year</li>
      </ul>

      <ExampleCard color={CARD_COLORS.apy}>
        <ExLabel color={CARD_COLORS.apy}>Why This Matters</ExLabel>
        <p className="text-zinc-500 text-sm mb-4">Two accounts both advertise <strong className="text-zinc-300">5% interest</strong>:</p>
        <div className="space-y-3">
          {[
            { label: "Account A — Compounds Annually (n=1)", formula: "APY = (1 + 0.05/1)^1 − 1 = 5.00%" },
            { label: "Account B — Compounds Daily (n=365)",  formula: "APY = (1 + 0.05/365)^365 − 1 = 5.13%" },
          ].map(({ label, formula }) => (
            <div key={label}>
              <p className="font-heading text-[9px] uppercase tracking-widest text-zinc-600 mb-1">{label}</p>
              <div className="bg-white/[0.03] border border-white/6 px-4 py-2 font-mono text-xs text-zinc-500">{formula}</div>
            </div>
          ))}
        </div>
        <p className="text-zinc-600 text-xs font-sans mt-4">On a $10,000 deposit, Account B earns an extra <strong className="text-zinc-400">$13/year</strong> from more frequent compounding.</p>
      </ExampleCard>

      {/* ── 5. Retirement ── */}
      <h2 id="retirement">5. Retirement Savings Formula</h2>
      <p>This formula combines your current savings and regular contributions to calculate your total retirement pot.</p>
      <FormulaBox>FV = P(1 + r)^t + C × [((1 + r)^t - 1) / r]</FormulaBox>

      <h3>Components:</h3>
      <ul>
        <li><strong>FV:</strong> Future retirement savings</li>
        <li><strong>P:</strong> Current retirement savings</li>
        <li><strong>r:</strong> Expected annual return (7–8% is historical average)</li>
        <li><strong>t:</strong> Years until retirement</li>
        <li><strong>C:</strong> Annual contribution amount</li>
      </ul>

      <ExampleCard color={CARD_COLORS.retirement}>
        <ExLabel color={CARD_COLORS.retirement}>Retirement at 65 (currently 35)</ExLabel>
        <p className="text-zinc-500 text-sm mb-3">$50,000 balance, $10,000/year contributions, 7% return, 30 years:</p>
        <ExMono>FV = 50,000(1.07)^30 + 10,000 × [((1.07)^30 - 1) / 0.07]</ExMono>
        <p className="font-heading text-sm uppercase tracking-widest mt-3" style={{ color: CARD_COLORS.retirement }}>Retirement Balance: $1,325,433</p>
      </ExampleCard>

      {/* ── 6. Credit Card ── */}
      <h2 id="credit-card">6. Credit Card Payoff Formula</h2>
      <p>Calculates how long it takes to pay off credit card debt — revealing the true cost of carrying a balance.</p>
      <FormulaBox>n = -log(1 - (B × r)/M) / log(1 + r)</FormulaBox>

      <h3>Variables Explained:</h3>
      <ul>
        <li><strong>n:</strong> Number of months to pay off the debt</li>
        <li><strong>B:</strong> Current credit card balance</li>
        <li><strong>r:</strong> Monthly interest rate (APR ÷ 12)</li>
        <li><strong>M:</strong> Monthly payment amount</li>
      </ul>

      <ExampleCard color={CARD_COLORS.credit}>
        <ExLabel color={CARD_COLORS.credit}>Credit Card Scenario</ExLabel>
        <p className="text-zinc-500 text-sm mb-3">$5,000 balance, 18% APR, $200/month payment:</p>
        <ExMono>n = -log(1 - (5,000 × 0.015)/200) / log(1.015) = 31 months</ExMono>
        <p className="font-heading text-sm uppercase tracking-widest mt-3" style={{ color: CARD_COLORS.credit }}>Payoff: 31 months — Interest paid: $1,200</p>
        <p className="text-zinc-600 text-xs font-sans mt-1">Increasing to $300/month cuts to 19 months and saves $425.</p>
      </ExampleCard>

      {/* ── Key Takeaways ── */}
      <h2>Key Takeaways</h2>

      {/* ── Pull-quote ── */}
      <div className="not-prose border-y border-white/10 py-8 my-10">
        <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
          "Small changes in interest rates — or payment amounts — compound into enormous differences over decades."
        </p>
        <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
          The math always wins
        </p>
      </div>

      <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: `${ACCENT}60` }}>
        <div className="space-y-3">
          {[
            "Compound interest is your best friend for wealth building",
            "Understanding loan formulas helps you negotiate better terms",
            "APY reveals the true earning potential of savings accounts",
            "Small changes in interest rates dramatically impact long-term costs",
            "Higher payments on debt save significant interest over time",
          ].map(item => (
            <p key={item} className="flex items-start gap-3 text-sm font-sans text-zinc-500">
              <span style={{ color: ACCENT }} className="shrink-0">✓</span> {item}
            </p>
          ))}
        </div>
      </div>

      {/* ── Calculator link grid — sharp, no rounding ── */}
      <h2>Practice Using These Formulas</h2>
      <p>Put them to work with our interactive calculators:</p>

      <div className="not-prose grid sm:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
        {[
          { label: "Compound Interest Calculator", sub: "Calculate investment growth",  to: "/finance/compound-interest" },
          { label: "Loan Calculator",              sub: "Calculate monthly payments",   to: "/finance/loan-calculator" },
          { label: "Mortgage Calculator",          sub: "Plan your home purchase",      to: "/finance/mortgage-calculator" },
          { label: "Retirement Calculator",        sub: "Project retirement savings",   to: "/finance/retirement-calculator" },
        ].map(({ label, sub, to }) => (
          <Link key={to} to={to}
            className="group flex items-start justify-between gap-4 bg-black px-5 py-4 hover:bg-white/[0.02] transition-colors">
            <div>
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/60 mb-1">{label}</p>
              <p className="text-zinc-600 text-xs font-sans">{sub}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="not-prose border border-white/8 bg-white/[0.015] px-5 py-4 my-6">
        <p className="text-zinc-600 text-xs font-sans leading-relaxed">
          <strong className="text-zinc-500">Note:</strong> These formulas provide estimates based on mathematical models.
          Actual outcomes may vary due to market conditions, fees, and tax implications.
          Always consult a qualified financial adviser for personalised advice.
        </p>
      </div>

      {/* Footer link */}
      <div className="not-prose mt-12 pt-8 border-t border-white/10">
        <Link to="/formulas"
          className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
          style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
          onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
          View Complete Formula Reference <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </ArticleLayout>
  );
}