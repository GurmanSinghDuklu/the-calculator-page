import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Building, Layers, ArrowRight } from "lucide-react";

const ACCENT  = "#34D399"; // Invest — emerald
const SKY     = "#38BDF8";
const VIOLET  = "#A78BFA";

export default function InvestingBasics() {
  return (
    <>
      <SEO
        title="Basics of Investing: Stocks, Bonds & ETFs - A Beginner's Guide"
        description="Investing fundamentals: stocks, bonds and ETFs. What each offers, their risks and how to get started."
        keywords="investing basics UK, stocks for beginners, what are bonds, ETF explained, index funds UK, beginner investing, investment types"
        canonicalUrl="/learn/investing-basics"
      />

      <ArticleLayout
        publishDate="2025-03-26"
        title="Basics of Investing: Stocks, Bonds & ETFs"
        description="Core primer for new investors"
        readTime="30–45 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{ title: "How to Build a Balanced Portfolio", path: "/learn/build-portfolio" }}
      >

        <h2>The Building Blocks of Investing</h2>
        <p>
          Every investment portfolio is built from a few core asset types. Understanding these
          fundamentals makes everything else click. Let's break them down simply.
        </p>

        <h2>Stocks (Equities)</h2>

        {/* ── Stocks — left emerald border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>What Are Stocks?</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            When you buy a stock, you're buying a tiny piece of a company. If the company grows
            and profits increase, your share becomes more valuable. If the company struggles,
            your share loses value.
          </p>
        </div>

        <h3>Key Stock Concepts</h3>
        <ul>
          <li><strong>Share price:</strong> What one "share" of ownership costs</li>
          <li><strong>Market cap:</strong> Total value of all shares (company size)</li>
          <li><strong>Dividends:</strong> Cash payments companies may pay to shareholders</li>
          <li><strong>Capital gains:</strong> Profit when you sell shares for more than you paid</li>
        </ul>

        <h3>Stock Risk and Return</h3>
        <ul>
          <li><strong>Historical return:</strong> ~7–10% annually (long-term average)</li>
          <li><strong>Volatility:</strong> High — can drop 30–50% in bad years</li>
          <li><strong>Best for:</strong> Long-term growth (5+ year timeline)</li>
        </ul>

        <h2>Bonds (Fixed Income)</h2>

        {/* ── Bonds — left sky border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: SKY }}>
          <div className="flex items-center gap-3 mb-3">
            <Building className="h-4 w-4 shrink-0" style={{ color: SKY }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: SKY }}>What Are Bonds?</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            When you buy a bond, you're lending money to a government or company. They promise
            to pay you back with interest. It's essentially an IOU with a fixed repayment schedule.
          </p>
        </div>

        <h3>Key Bond Concepts</h3>
        <ul>
          <li><strong>Coupon:</strong> The interest rate the bond pays</li>
          <li><strong>Maturity:</strong> When the bond's principal is repaid</li>
          <li><strong>Face value:</strong> The amount repaid at maturity</li>
          <li><strong>Yield:</strong> Your effective return based on purchase price</li>
        </ul>

        <h3>Types of Bonds</h3>
        <ul>
          <li><strong>Government bonds (Gilts in UK):</strong> Very safe, lower returns</li>
          <li><strong>Corporate bonds:</strong> Higher risk/return than government</li>
          <li><strong>High-yield bonds:</strong> Higher risk companies, higher returns</li>
        </ul>

        <h3>Bond Risk and Return</h3>
        <ul>
          <li><strong>Historical return:</strong> ~3–5% annually</li>
          <li><strong>Volatility:</strong> Lower than stocks, but not zero</li>
          <li><strong>Best for:</strong> Stability, income, balancing stock volatility</li>
        </ul>

        <h2>ETFs (Exchange-Traded Funds)</h2>

        {/* ── ETFs — left violet border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: VIOLET }}>
          <div className="flex items-center gap-3 mb-3">
            <Layers className="h-4 w-4 shrink-0" style={{ color: VIOLET }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: VIOLET }}>What Are ETFs?</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            An ETF is a basket of investments that trades like a single stock. Instead of buying
            100 different stocks yourself, you buy one ETF that holds all 100. Instant diversification.
          </p>
        </div>

        <h3>Why ETFs Are Popular</h3>
        <ul>
          <li><strong>Diversification:</strong> Own hundreds of companies with one purchase</li>
          <li><strong>Low cost:</strong> Much cheaper than actively managed funds</li>
          <li><strong>Simplicity:</strong> One buy gives you broad market exposure</li>
          <li><strong>Transparency:</strong> You know exactly what's inside</li>
          <li><strong>Liquidity:</strong> Trade anytime the market is open</li>
        </ul>

        <h3>Popular ETF Types</h3>

        {/* ── ETF types — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Common ETF Categories</p>
          <div className="divide-y divide-white/6">
            {[
              { type: "Global Stock ETFs",  ticker: "VWRP", desc: "Track thousands of companies worldwide. Vanguard FTSE All-World." },
              { type: "S&P 500 ETFs",       ticker: "VUSA", desc: "Track 500 largest US companies. Vanguard S&P 500." },
              { type: "UK Equity ETFs",     ticker: "ISF",  desc: "Track UK companies. iShares Core FTSE 100." },
              { type: "Bond ETFs",          ticker: "VAGS", desc: "Hold hundreds of bonds. Vanguard Global Bond." },
            ].map(({ type, ticker, desc }) => (
              <div key={type} className="py-4 flex items-start gap-5">
                <div className="shrink-0 w-14 text-right">
                  <p className="font-mono text-xs" style={{ color: ACCENT }}>{ticker}</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{type}</p>
                  <p className="text-zinc-500 text-sm font-sans">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Index Funds vs Active Funds</h2>

        {/* ── Index vs active — two-col flush grid ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Index Funds (Passive)</p>
            <ul className="space-y-2">
              {[
                "Track a market index (S&P 500, FTSE 100, etc.)",
                "No fund manager trying to beat the market",
                "Very low fees (0.03%–0.25%)",
                "Consistently outperform most active funds over time",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest text-white/40 mb-4">Active Funds</p>
            <ul className="space-y-2">
              {[
                "Fund manager picks stocks trying to beat the market",
                "Higher fees (0.5%–2%+)",
                "Most fail to beat index funds over 10+ years",
                "Some outperform, but predicting which is nearly impossible",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span className="text-white/20 shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Evidence callout — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <p className="text-zinc-400 text-sm leading-relaxed">
            <strong className="text-white/70">The evidence is clear:</strong> For most investors, low-cost index funds/ETFs
            are the best choice. You're not trying to beat the market — you're owning the market.
          </p>
        </div>

        <h2>How These Work Together</h2>
        <p>A balanced portfolio typically combines stocks (for growth) and bonds (for stability). The ratio depends on your risk tolerance and timeline:</p>
        <ul>
          <li><strong>Aggressive (young, long timeline):</strong> 90% stocks, 10% bonds</li>
          <li><strong>Moderate:</strong> 70% stocks, 30% bonds</li>
          <li><strong>Conservative (near retirement):</strong> 50% stocks, 50% bonds</li>
        </ul>

        <h2>Key Terms to Know</h2>

        {/* ── Glossary — flush grid ── */}
        <div className="not-prose grid sm:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          {[
            { term: "Diversification",  def: "Not putting all eggs in one basket" },
            { term: "Expense Ratio",    def: "Annual fee as % of investment" },
            { term: "Accumulating",     def: "Dividends auto-reinvested in the fund" },
            { term: "Distributing",     def: "Dividends paid out as cash" },
            { term: "Ticker Symbol",    def: 'Short code for a stock/ETF (e.g., VWRP)' },
            { term: "Portfolio",        def: "Your entire collection of investments" },
          ].map(({ term, def }) => (
            <div key={term} className="bg-black px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{term}</p>
              <p className="text-zinc-600 text-xs font-sans">{def}</p>
            </div>
          ))}
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Understand the difference between stocks, bonds, and ETFs</li>
          <li>Research a few popular global ETFs (VWRP, VUSA, SWDA)</li>
          <li>Look up the expense ratios and compare</li>
          <li>Think about what ratio of stocks to bonds suits your risk tolerance</li>
          <li>Read the next article on building a balanced portfolio</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "A single global stock ETF plus a bond ETF can form a complete, diversified portfolio. Simple often beats complex."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            You don't need to understand every investment product
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
                Use our Compound Interest Calculator to model long-term investment growth with
                realistic market returns (7% stocks, 4% bonds) and see how your money could grow.
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