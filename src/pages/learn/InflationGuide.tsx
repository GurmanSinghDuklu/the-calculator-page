import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, TrendingDown, AlertTriangle, Shield, ArrowRight } from "lucide-react";

const ACCENT = "#38BDF8"; // Accumulate — sky blue
const RED    = "#F87171";
const GREEN  = "#34D399";
const AMBER  = "#F59E0B";

export default function InflationGuide() {
  return (
    <>
      <SEO
        title="Inflation: The Silent Thief - Protecting Your Money's Buying Power"
        description="Understand how inflation erodes your savings and learn strategies to protect your money's purchasing power. Real returns, inflation hedges, and practical UK-focused advice."
        keywords="inflation UK, real returns, purchasing power, inflation protection, CPI, savings vs inflation, beating inflation"
        canonicalUrl="/learn/inflation-guide"
      />

      <ArticleLayout
        publishDate="2025-06-11"
        title="Inflation: The Silent Thief"
        description="Understand real returns and protecting buying power"
        readTime="15 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{ title: "Your First £1,000: Turning Saving Into a Habit", path: "/learn/first-1000" }}
      >

        <h2>What Is Inflation Really?</h2>
        <p>
          Inflation is the rate at which money loses purchasing power. When inflation is 5%,
          £100 today will only buy £95 worth of goods next year. It's not that prices go up —
          it's that your money becomes worth less.
        </p>

        {/* ── Hidden tax — red left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-8 flex items-start gap-4" style={{ borderColor: RED }}>
          <AlertTriangle className="h-4 w-4 shrink-0 mt-1" style={{ color: RED }} />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: RED }}>The Hidden Tax</p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              At 5% inflation, money loses half its purchasing power in just 14 years. That £10,000
              emergency fund becomes worth only £5,000 in real terms — even while the number in your
              account stays the same.
            </p>
          </div>
        </div>

        <h2>Understanding Real vs Nominal Returns</h2>
        <p>
          The interest rate your bank shows is the <strong>nominal return</strong>. What actually
          matters is the <strong>real return</strong> — your interest minus inflation.
        </p>

        {/* ── Formula — left border mono ── */}
        <div className="not-prose border-l-2 border-white/15 bg-white/[0.02] px-5 py-4 my-5 font-mono text-sm text-zinc-400">
          Real Return = Nominal Return − Inflation Rate
        </div>

        {/* ── Example scenarios — flush grid ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          <p className="px-5 py-3 text-[9px] font-heading uppercase tracking-[0.25em] text-white/20">Example Scenarios</p>
          {[
            { scenario: "Savings 5%, Inflation 3%", result: "+2% real return",           color: GREEN, symbol: "✓" },
            { scenario: "Savings 4%, Inflation 4%", result: "0% real return",            color: AMBER, symbol: "~" },
            { scenario: "Savings 2%, Inflation 5%", result: "−3% real return",           color: RED,   symbol: "✗" },
          ].map(({ scenario, result, color, symbol }) => (
            <div key={scenario} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <span className="text-zinc-500 text-sm font-sans">{scenario}</span>
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm" style={{ color }}>{result}</span>
                <span className="font-heading text-xs" style={{ color }}>{symbol}</span>
              </div>
            </div>
          ))}
        </div>

        <h2>How Inflation Is Measured</h2>
        <p>In the UK, two main measures are used:</p>
        <ul>
          <li><strong>CPI (Consumer Price Index):</strong> The official measure, used for the Bank of England's 2% target. Excludes housing costs.</li>
          <li><strong>RPI (Retail Price Index):</strong> Older measure, usually higher than CPI. Includes mortgage interest payments.</li>
          <li><strong>CPIH:</strong> CPI plus owner-occupiers' housing costs. Increasingly used.</li>
        </ul>

        <h2>Why Keeping Cash Has a Cost</h2>

        {/* ── Erosion effect — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <TrendingDown className="h-4 w-4 shrink-0" style={{ color: RED }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">The Erosion Effect</p>
          </div>
          <p className="text-zinc-600 text-xs font-sans mb-5">£10,000 in a 0% account with 5% annual inflation:</p>
          <div className="space-y-0 divide-y divide-white/5">
            {[
              { period: "After 1 year",  value: "£9,524",  pct: 95 },
              { period: "After 5 years", value: "£7,835",  pct: 78 },
              { period: "After 10 years",value: "£6,139",  pct: 61 },
              { period: "After 20 years",value: "£3,769",  pct: 38 },
            ].map(({ period, value, pct }) => (
              <div key={period} className="py-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-zinc-500 text-sm font-sans">{period}</span>
                  <span className="font-heading text-sm" style={{ color: RED }}>{value} real value</span>
                </div>
                <div className="h-px bg-white/5">
                  <div className="h-px transition-all" style={{ width: `${pct}%`, background: RED, opacity: 0.5 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p>
          This doesn't mean you shouldn't hold cash. Emergency funds need to be accessible.
          But it does mean long-term wealth building requires strategies that outpace inflation.
        </p>

        <h2>Strategies to Combat Inflation</h2>

        <h3>1. Maximise Savings Interest</h3>
        <p>The difference between 0.1% and 5% is enormous. Always shop for the best rates and consider notice accounts for better returns on money you don't need immediately.</p>

        <h3>2. Consider Index-Linked Savings</h3>
        <p>Some NS&I products and bonds offer returns linked to inflation, guaranteeing your purchasing power is maintained.</p>

        <h3>3. Invest for the Long Term</h3>
        <p>Historically, diversified stock market investments have returned 7–10% annually over long periods, well above inflation. The tradeoff is short-term volatility.</p>

        <h3>4. Own Assets That Appreciate</h3>
        <ul>
          <li><strong>Property:</strong> Tends to keep pace with or exceed inflation over time</li>
          <li><strong>Stocks:</strong> Companies can raise prices with inflation</li>
          <li><strong>Commodities:</strong> Physical goods often rise with inflation</li>
        </ul>

        <h3>5. Invest in Yourself</h3>
        <p>Skills and education can lead to higher earnings — the ultimate inflation hedge, your income rises with or faster than costs.</p>

        <h2>When Inflation Actually Helps</h2>
        <p>Inflation isn't all bad if you're a borrower with fixed-rate debt:</p>
        <ul>
          <li>Your mortgage payment stays the same while your salary (hopefully) rises</li>
          <li>The real value of your debt decreases over time</li>
          <li>Property values tend to rise, building equity faster</li>
        </ul>

        {/* ── The right balance — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Right Balance</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Keep enough cash for emergencies (3–6 months expenses), even knowing inflation erodes it.
            The peace of mind and flexibility is worth the cost. For anything beyond that, consider
            investments that can beat inflation over time.
          </p>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Check your current savings rate against current CPI inflation</li>
          <li>Calculate your real return (interest rate minus inflation)</li>
          <li>Move any 0% funds to the best available easy-access rate</li>
          <li>Consider your timeline — long-term money may warrant investment</li>
          <li>Review annually as both rates and inflation change</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Don't panic about inflation eating your emergency fund. Its purpose is security, not growth."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Accept the cost. Beat inflation with your long-term investments.
          </p>
        </div>

        {/* ── CTA card — stark ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] p-7 my-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}10` }}>
              <Calculator className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl uppercase tracking-widest text-white mb-2">Put It Into Practice</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                Use our Compound Interest Calculator to see how different rates affect your savings
                growth over time, including inflation-adjusted projections.
              </p>
              <Link to="/finance/compound-interest"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Compound Interest Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}