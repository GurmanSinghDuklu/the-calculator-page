import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, PieChart, Shield, Zap, ArrowRight } from "lucide-react";

const ACCENT = "#34D399"; // Invest — emerald

const PROFILES = [
  { icon: Shield,   label: "Conservative Portfolio", desc: "For those near retirement or with low risk tolerance. Prioritises stability over growth.",             color: "#A78BFA", allocations: [["Global Bonds","50%"],["Global Stocks","35%"],["UK Gilts","15%"]],                                    stats: "Expected return: ~4–5% | Volatility: Low–Medium" },
  { icon: PieChart, label: "Balanced Portfolio",      desc: "Classic 60/40 approach. Good for mid-timeline investors wanting growth with some stability.",         color: "#38BDF8", allocations: [["Global Stocks (All-World)","60%"],["Global Bonds","30%"],["UK Gilts","10%"]],              stats: "Expected return: ~5–7% | Volatility: Medium"     },
  { icon: Zap,      label: "Growth Portfolio",        desc: "For younger investors with 20+ year timelines. Maximises growth potential.",                          color: ACCENT,    allocations: [["Global Stocks (All-World)","80%"],["Global Bonds","15%"],["UK Stocks (FTSE)","5%"]], stats: "Expected return: ~6–8% | Volatility: Medium–High" },
  { icon: Zap,      label: "Aggressive Portfolio",    desc: "For long timelines and high risk tolerance. 100% equities for maximum growth.",                       color: "#F97316", allocations: [["Global Stocks (All-World)","100%"]],                                                    stats: "Expected return: ~7–10% | Volatility: High"      },
];

const ETF_ROWS = [
  { name: "Vanguard FTSE All-World",        ticker: "VWRP", alloc: "60%", fee: "0.22%" },
  { name: "Vanguard Global Aggregate Bond", ticker: "VAGS", alloc: "30%", fee: "0.10%" },
  { name: "iShares UK Gilts",               ticker: "IGLT", alloc: "10%", fee: "0.07%" },
];

export default function BuildPortfolio() {
  return (
    <>
      <SEO
        title="How to Build a Balanced Portfolio - Sample Portfolios by Risk Profile"
        description="Learn how to construct a diversified investment portfolio tailored to your risk tolerance. Includes sample portfolios from conservative to aggressive with specific ETF examples."
        keywords="build investment portfolio, portfolio allocation, asset allocation UK, diversified portfolio, risk-based investing, sample portfolios, investment strategy"
        canonicalUrl="/learn/build-portfolio"
      />

      <ArticleLayout
        title="How to Build a Balanced Portfolio"
        description="Sample portfolios by risk profile"
        readTime="30 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{ title: "Long-Term Investing vs Trading", path: "/learn/investing-vs-trading" }}
      >

        <h2>What Makes a Good Portfolio?</h2>
        <p>
          A well-built portfolio balances growth potential with risk management. It should be
          diversified (not all eggs in one basket), aligned with your timeline, and simple enough
          that you'll actually stick with it.
        </p>

        <h2>The Core Principles</h2>

        <h3>1. Diversification</h3>
        <p>Spread investments across asset classes (stocks, bonds), geographies (UK, US, global), and sectors. When one area struggles, others may thrive.</p>

        <h3>2. Risk-Appropriate Allocation</h3>
        <p>Your mix of stocks vs bonds should match your risk tolerance and timeline. More stocks = more growth potential but more volatility.</p>

        <h3>3. Low Costs</h3>
        <p>Fees compound negatively just like interest. A 1% annual fee can cost you 25% of your final portfolio over 30 years. Use low-cost index funds.</p>

        <h3>4. Simplicity</h3>
        <p>Complex portfolios are hard to maintain and rebalance. The best portfolio is one you understand and will stick with through market ups and downs.</p>

        <h2>Sample Portfolios by Risk Profile</h2>

        {/* ── Risk profiles — stacked, left accent bar ── */}
        <div className="not-prose my-8 divide-y divide-white/6 border border-white/8">
          {PROFILES.map(({ icon: Icon, label, desc, color, allocations, stats }) => (
            <div key={label} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              {/* colour bar */}
              <div className="w-1 shrink-0" style={{ background: color }} />
              <div className="flex-1 px-6 py-5">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                  <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color }}>{label}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans mb-4">{desc}</p>
                {/* allocation rows */}
                <div className="space-y-1.5 mb-3">
                  {allocations.map(([name, pct]) => (
                    <div key={name} className="flex justify-between items-center">
                      <span className="text-zinc-600 text-xs font-sans">{name}</span>
                      <span className="font-heading text-xs tabular-nums" style={{ color }}>{pct}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] font-heading uppercase tracking-[0.15em] text-white/15">{stats}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>The One-Fund Solution</h2>
        <p>If you want maximum simplicity, many providers offer "all-in-one" funds:</p>
        <ul>
          <li><strong>Vanguard LifeStrategy 60%</strong> — 60% stocks, 40% bonds</li>
          <li><strong>Vanguard LifeStrategy 80%</strong> — 80% stocks, 20% bonds</li>
          <li><strong>Vanguard Target Retirement funds</strong> — Auto-adjust as you age</li>
        </ul>

        <h2>Example ETF Implementation</h2>

        {/* ── ETF table — editorial, no rounding ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            Building a 60/40 Portfolio with ETFs
          </p>
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/8">
                {["ETF", "Ticker", "Allocation", "Fee"].map(h => (
                  <th key={h} className={`pb-3 text-[9px] font-heading uppercase tracking-widest text-white/20 ${h === "Allocation" || h === "Fee" ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ETF_ROWS.map(({ name, ticker, alloc, fee }) => (
                <tr key={ticker}>
                  <td className="py-3.5 text-zinc-400 text-sm">{name}</td>
                  <td className="py-3.5 font-mono text-xs text-zinc-600">{ticker}</td>
                  <td className="py-3.5 text-right font-heading text-sm" style={{ color: ACCENT }}>{alloc}</td>
                  <td className="py-3.5 text-right text-zinc-600 text-xs">{fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/15 mt-4 pt-4 border-t border-white/6">
            Total weighted expense ratio: ~0.16% per year
          </p>
        </div>

        <h2>Where to Invest</h2>
        <p>Use tax-efficient accounts in this priority order:</p>
        <ol>
          <li><strong>Workplace pension</strong> — Get full employer match first</li>
          <li><strong>Stocks & Shares ISA</strong> — Tax-free gains, £20k/year limit</li>
          <li><strong>SIPP</strong> — Additional pension, tax relief on contributions</li>
          <li><strong>General Investment Account</strong> — After ISA is maxed</li>
        </ol>

        <h2>Implementation Steps</h2>
        <ol>
          <li>Choose a low-cost platform (Vanguard, iWeb, InvestEngine)</li>
          <li>Select your risk profile based on timeline and tolerance</li>
          <li>Pick ETFs or a LifeStrategy fund that matches</li>
          <li>Set up regular monthly investments (pound-cost averaging)</li>
          <li>Rebalance annually to maintain target allocation</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Don't tinker. The best portfolio is one you leave alone."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Check once a year. Rebalance if needed. Otherwise: nothing.
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
                Use our Compound Interest Calculator to project how different portfolio allocations
                could grow over your investment timeline.
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