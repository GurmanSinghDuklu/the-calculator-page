import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, Home, PiggyBank, CreditCard, Landmark } from "lucide-react";

const ACCENT = "#22C55E";

function StatCard({ icon: Icon, label, value, source }: { icon: any; label: string; value: string; source: string }) {
  return (
    <div className="border border-white/8 bg-white/[0.02] rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 text-white/30" />
        <p className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/40">{label}</p>
      </div>
      <p className="font-display text-3xl tracking-tight text-white mb-1">{value}</p>
      <p className="text-[10px] text-white/25 font-sans">{source}</p>
    </div>
  );
}

export default function UkFinanceStats() {
  return (
    <>
      <SEO
        title="UK Personal Finance Statistics 2026"
        description="50+ UK personal finance statistics for 2026. Savings rates, mortgage data, debt levels, pension figures and household income — sourced and updated."
        keywords="UK finance statistics 2026, UK savings statistics, UK mortgage statistics, average UK salary, UK household debt, UK pension statistics, personal finance data UK"
        canonicalUrl="/learn/uk-finance-statistics"
        type="article"
        articleSchema={{
          headline: "UK Personal Finance Statistics 2026 — 50+ Key Facts",
          author: "Mandeep Singh Duklu",
          datePublished: "2026-04-05",
          dateModified: "2026-04-05",
        }}
      />

      <ArticleLayout
        publishDate="2026-04-05"
        title="UK Personal Finance Statistics 2026"
        description="50+ sourced statistics on savings, mortgages, pensions, debt, and household income across the UK"
        readTime="12 min"
        category="Research"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      >
        <p className="text-lg text-zinc-300 mb-8">
          This page compiles the most important personal finance statistics for the UK in 2026,
          sourced from the Bank of England, ONS, FCA, and other official bodies. We update this
          page regularly. If you cite these statistics, please link back to this page.
        </p>

        {/* ── Headline Stats Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <StatCard icon={PiggyBank} label="Average UK Savings" value="£17,365" source="ONS Wealth & Assets Survey 2024/25" />
          <StatCard icon={Home} label="Average UK House Price" value="£285,000" source="ONS UK House Price Index, Jan 2026" />
          <StatCard icon={Landmark} label="Average UK Salary" value="£35,400" source="ONS ASHE 2025 (median full-time)" />
        </div>

        {/* ── Savings & Interest ── */}
        <h2>Savings & Interest Rates</h2>
        <ul>
          <li><strong>Average UK household savings:</strong> £17,365 (median), though the mean is significantly higher at £52,000 due to wealthy outliers. <em>Source: ONS Wealth & Assets Survey 2024/25.</em></li>
          <li><strong>25% of UK adults have less than £100 in savings.</strong> A further 17% have no savings at all. <em>Source: FCA Financial Lives Survey 2024.</em></li>
          <li><strong>Best easy access savings rate:</strong> 4.5-5.0% AER (as of early 2026). <em>Source: Bank of England, Moneyfacts.</em></li>
          <li><strong>Best fixed-rate bond (1 year):</strong> 5.0-5.5% AER. <em>Source: Moneyfacts March 2026.</em></li>
          <li><strong>Cash ISA allowance:</strong> £20,000 per tax year. Over 13 million UK adults hold a Cash ISA. <em>Source: HMRC ISA Statistics.</em></li>
          <li><strong>Bank of England base rate:</strong> 4.5% (as of March 2026). Down from 5.25% peak in August 2023. <em>Source: Bank of England.</em></li>
          <li><strong>Inflation rate (CPI):</strong> 2.8% (February 2026). The Bank of England targets 2%. <em>Source: ONS Consumer Price Inflation.</em></li>
          <li><strong>Real savings return:</strong> With inflation at 2.8% and savings rates at 4.5%, the real return is approximately 1.7% — positive for the first time since 2022. <em>Calculation based on BoE and ONS data.</em></li>
        </ul>

        <div className="my-8 border-l-2 border-emerald-500/30 pl-4 py-2">
          <p className="text-sm text-zinc-400">
            <strong className="text-white/60">Try it yourself:</strong> Use our{" "}
            <Link to="/finance/savings" className="text-emerald-400 underline">Savings Calculator</Link>{" "}
            to see how your savings will grow at current rates, or the{" "}
            <Link to="/finance/compound-interest" className="text-emerald-400 underline">Compound Interest Calculator</Link>{" "}
            to compare daily vs monthly compounding.
          </p>
        </div>

        {/* ── Mortgages & Housing ── */}
        <h2>Mortgages & Housing</h2>
        <ul>
          <li><strong>Average UK house price:</strong> £285,000 (January 2026). London average: £525,000. <em>Source: ONS UK House Price Index.</em></li>
          <li><strong>Average first-time buyer deposit:</strong> £53,000 (approximately 19% of purchase price). <em>Source: UK Finance Mortgage Trends.</em></li>
          <li><strong>Average mortgage rate (2-year fixed):</strong> 5.0-5.5%. 5-year fixed: 4.5-5.0%. <em>Source: Moneyfacts, March 2026.</em></li>
          <li><strong>Outstanding UK mortgage debt:</strong> £1.66 trillion across approximately 11 million mortgages. <em>Source: Bank of England Money & Credit.</em></li>
          <li><strong>Average mortgage term:</strong> 25 years, though 30 and 35-year terms are increasingly common. <em>Source: UK Finance.</em></li>
          <li><strong>Stamp Duty threshold:</strong> £250,000 (standard), £425,000 (first-time buyers). <em>Source: HMRC.</em></li>
          <li><strong>Home ownership rate:</strong> 63.3% of UK households own their home (either outright or with a mortgage). <em>Source: English Housing Survey 2024/25.</em></li>
          <li><strong>Mortgage approvals per month:</strong> ~60,000, recovering from a low of 43,000 in late 2023. <em>Source: Bank of England.</em></li>
        </ul>

        <div className="my-8 border-l-2 border-emerald-500/30 pl-4 py-2">
          <p className="text-sm text-zinc-400">
            <strong className="text-white/60">Calculate your payments:</strong> Use our{" "}
            <Link to="/finance/mortgage" className="text-emerald-400 underline">Mortgage Calculator</Link>{" "}
            to estimate monthly payments, or the{" "}
            <Link to="/finance/stamp-duty" className="text-emerald-400 underline">Stamp Duty Calculator</Link>{" "}
            to see your tax liability.
          </p>
        </div>

        {/* ── Income & Tax ── */}
        <h2>Income & Tax</h2>
        <ul>
          <li><strong>Median UK salary (full-time):</strong> £35,400 per year (£2,950/month gross). <em>Source: ONS ASHE 2025.</em></li>
          <li><strong>Mean UK salary (full-time):</strong> £42,200 per year. The gap between median and mean reflects high earners pulling the average up. <em>Source: ONS ASHE 2025.</em></li>
          <li><strong>Personal allowance:</strong> £12,570 (frozen since 2021 and expected to remain frozen until 2028). <em>Source: HMRC.</em></li>
          <li><strong>Number of higher-rate taxpayers:</strong> 6.3 million (up from 4.2 million in 2021, due to frozen thresholds). <em>Source: HMRC.</em></li>
          <li><strong>National Insurance rate:</strong> 8% on earnings between £12,570-£50,270, then 2% above. <em>Source: HMRC 2025/26.</em></li>
          <li><strong>Take-home pay on £35,400 salary:</strong> Approximately £28,200 (£2,350/month) after income tax and NI. <em>Calculated using standard assumptions.</em></li>
          <li><strong>Gender pay gap:</strong> 7.7% for full-time employees (median). <em>Source: ONS ASHE 2025.</em></li>
        </ul>

        <div className="my-8 border-l-2 border-emerald-500/30 pl-4 py-2">
          <p className="text-sm text-zinc-400">
            <strong className="text-white/60">Check your take-home:</strong> Use our{" "}
            <Link to="/finance/salary" className="text-emerald-400 underline">Salary Calculator</Link>{" "}
            to see your exact take-home pay after tax, NI, and pension contributions.
          </p>
        </div>

        {/* ── Debt ── */}
        <h2>Household Debt</h2>
        <ul>
          <li><strong>Average UK household debt (excluding mortgages):</strong> £4,120. This includes credit cards, personal loans, and overdrafts. <em>Source: The Money Charity Money Statistics, 2026.</em></li>
          <li><strong>Total UK consumer credit:</strong> £230 billion outstanding. <em>Source: Bank of England Consumer Credit.</em></li>
          <li><strong>Average credit card balance:</strong> £1,280 per card-holding adult. <em>Source: UK Finance.</em></li>
          <li><strong>Average credit card APR:</strong> 23.1% — the highest on record. <em>Source: Bank of England, Moneyfacts.</em></li>
          <li><strong>People in problem debt:</strong> 8.3 million UK adults are over-indebted (struggling with bills or credit commitments). <em>Source: FCA Financial Lives Survey 2024.</em></li>
          <li><strong>Student loan debt:</strong> Average graduate owes £44,940. Total student loan book: £236 billion. <em>Source: Student Loans Company.</em></li>
          <li><strong>Insolvencies:</strong> 120,000+ individual insolvencies per year in England and Wales. <em>Source: Insolvency Service.</em></li>
        </ul>

        <div className="my-8 border-l-2 border-emerald-500/30 pl-4 py-2">
          <p className="text-sm text-zinc-400">
            <strong className="text-white/60">Pay off debt faster:</strong> Use our{" "}
            <Link to="/finance/credit-card-payoff" className="text-emerald-400 underline">Credit Card Payoff Calculator</Link>{" "}
            or{" "}
            <Link to="/finance/loan" className="text-emerald-400 underline">Loan Calculator</Link>{" "}
            to plan your repayment strategy.
          </p>
        </div>

        {/* ── Pensions & Retirement ── */}
        <h2>Pensions & Retirement</h2>
        <ul>
          <li><strong>Full new State Pension:</strong> £11,502 per year (£221.20/week) in 2024/25. <em>Source: DWP.</em></li>
          <li><strong>State Pension age:</strong> 66 (rising to 67 between 2026-2028). <em>Source: GOV.UK.</em></li>
          <li><strong>Auto-enrolment minimum contribution:</strong> 8% of qualifying earnings (3% employer, 5% employee). <em>Source: The Pensions Regulator.</em></li>
          <li><strong>Average pension pot at retirement:</strong> £107,000 (median). Financial advisers suggest £370,000-£500,000 is needed for a comfortable retirement. <em>Source: FCA Retirement Income Market Data.</em></li>
          <li><strong>Pension savings gap:</strong> 12 million UK workers are not saving enough for an adequate retirement income. <em>Source: PLSA Retirement Living Standards.</em></li>
          <li><strong>Annual allowance:</strong> £60,000 or 100% of earnings (whichever is lower). Lifetime allowance was abolished in April 2024. <em>Source: HMRC.</em></li>
          <li><strong>PLSA Retirement Living Standards:</strong> Minimum: £14,400/yr. Moderate: £31,300/yr. Comfortable: £43,100/yr (for a single person). <em>Source: PLSA 2025.</em></li>
        </ul>

        <div className="my-8 border-l-2 border-emerald-500/30 pl-4 py-2">
          <p className="text-sm text-zinc-400">
            <strong className="text-white/60">Plan your retirement:</strong> Use our{" "}
            <Link to="/finance/retirement" className="text-emerald-400 underline">Retirement Calculator</Link>{" "}
            to estimate your pension pot and annual income.
          </p>
        </div>

        {/* ── Key Takeaways ── */}
        <h2>Key Takeaways</h2>
        <ol>
          <li><strong>The savings crisis is real:</strong> 25% of adults have less than £100 saved. Building an emergency fund should be priority number one.</li>
          <li><strong>Frozen tax thresholds are a hidden tax rise:</strong> 2 million more people now pay the higher rate compared to 2021, simply because thresholds have not moved with inflation.</li>
          <li><strong>Mortgage costs have doubled since 2021:</strong> The average 2-year fixed rate has gone from 2.5% to over 5%, adding hundreds to monthly payments.</li>
          <li><strong>Credit card debt is expensive:</strong> At 23.1% APR, a £3,000 balance paying only minimums would take 27 years to clear and cost £5,600 in interest.</li>
          <li><strong>Most people are under-saving for retirement:</strong> The median pension pot of £107,000 falls far short of the £370,000+ needed for a comfortable retirement.</li>
        </ol>

        <h2>Methodology & Sources</h2>
        <p>
          All statistics are sourced from official UK government bodies, the Bank of England, the Office for
          National Statistics (ONS), the Financial Conduct Authority (FCA), and established industry sources.
          Where exact 2026 figures are not yet published, we use the most recent available data and note the
          source year. This page is reviewed and updated quarterly by Mandeep Singh Duklu, CeMAP qualified
          mortgage adviser with 25+ years in UK financial services.
        </p>
        <p>
          <strong>Last updated:</strong> April 2026. <strong>Next review:</strong> July 2026.
        </p>
        <p>
          If you use these statistics in your own content, we appreciate a link back to this page
          as a source citation.
        </p>

      </ArticleLayout>
    </>
  );
}
