import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, RefreshCw, Calendar, Target, ArrowRight } from "lucide-react";

const ACCENT = "#34D399"; // Invest — emerald

export default function PortfolioRebalancing() {
  return (
    <>
      <SEO
        title="How to Rebalance and Review Your Portfolio - Best Practices"
        description="Learn when and how to rebalance your investment portfolio. Practical guidance on maintaining your target allocation, reviewing performance, and staying disciplined."
        keywords="portfolio rebalancing, investment review, asset allocation maintenance, rebalancing strategy, portfolio management UK, investment discipline"
        canonicalUrl="/learn/portfolio-rebalancing"
      />

      <ArticleLayout
        title="How to Rebalance and Review Your Portfolio"
        description="Discipline and management best practices"
        readTime="20 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{ title: "Financial Freedom: Defining Your End Goal", path: "/learn/financial-freedom" }}
      >

        <h2>What Is Rebalancing?</h2>
        <p>
          Rebalancing means adjusting your portfolio back to its target allocation. Over time,
          some investments grow faster than others, throwing your carefully planned mix out of
          balance. Rebalancing restores your intended risk level.
        </p>

        {/* ── Drift example — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <RefreshCw className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Example: Drift in Action</p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              { label: "Target Allocation",      value: "80% stocks / 20% bonds",            note: "Your intended risk level when you set up the portfolio." },
              { label: "After Strong Stock Year", value: "85% stocks / 15% bonds",            note: "Stocks grew 20%, bonds grew 5%. You're now taking more risk than intended." },
              { label: "Rebalancing Action",      value: "Sell stocks → buy bonds",           note: "Return to 80/20. Or direct new contributions to bonds until balance is restored." },
            ].map(({ label, value, note }) => (
              <div key={label} className="py-4 flex items-start gap-5">
                <div className="shrink-0 w-36">
                  <p className="font-heading text-[9px] uppercase tracking-widest text-white/20">{label}</p>
                  <p className="font-heading text-sm mt-1" style={{ color: ACCENT }}>{value}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Why Rebalance?</h2>

        {/* ── Three reasons — numbered sequence ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { label: "Maintain Your Risk Level",         note: "If you decided 80/20 was right for you, drifting to 90/10 means more risk than intended. You'll be more exposed when the next crash comes." },
            { label: "Systematic Buy Low, Sell High",    note: "Rebalancing forces you to sell what's grown (expensive) and buy what's lagged (cheap). The opposite of emotional investing." },
            { label: "Prevents Concentration Risk",      note: "Without rebalancing, your portfolio could become dominated by whatever performed best, leaving you vulnerable if that sector reverses." },
          ].map(({ label, note }, i) => (
            <div key={label} className="flex items-start gap-5 px-6 py-4 bg-black hover:bg-white/[0.015] transition-colors">
              <span className="font-display text-3xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-0.5">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{label}</p>
                <p className="text-zinc-500 text-sm font-sans">{note}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>When to Rebalance</h2>

        {/* ── Three approaches — left bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          <div className="flex items-center gap-3 px-6 py-3 border-b border-white/6">
            <Calendar className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Rebalancing Approaches</p>
          </div>
          {[
            { approach: "Calendar-Based",    badge: "Simplest",   desc: "Rebalance on a fixed schedule — annually or semi-annually. Set a reminder and do it regardless of market conditions." },
            { approach: "Threshold-Based",   badge: "Precise",    desc: "Rebalance when any asset class drifts more than 5% from target (e.g., 80% becomes 85% or 75%)." },
            { approach: "Cash Flow-Based",   badge: "Tax-Smart",  desc: "Direct new contributions to underweight assets rather than selling. Avoids transaction costs and potential taxes." },
          ].map(({ approach, badge, desc }) => (
            <div key={approach} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: ACCENT }} />
              <div className="flex-1 flex items-start gap-5 px-6 py-4">
                <div className="shrink-0 w-32">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55">{approach}</p>
                  <p className="text-[9px] font-heading uppercase tracking-widest mt-0.5" style={{ color: ACCENT }}>{badge}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p>For most people, annual rebalancing is sufficient. More frequent rebalancing doesn't significantly improve returns and increases costs.</p>

        <h2>How to Rebalance</h2>

        <h3>Method 1: Sell and Buy</h3>
        <ol>
          <li>Calculate current allocation percentages</li>
          <li>Compare to target allocation</li>
          <li>Sell overweight assets</li>
          <li>Buy underweight assets</li>
        </ol>
        <p><strong>Best for:</strong> Tax-sheltered accounts (ISA, pension) where no tax applies.</p>

        <h3>Method 2: Cash Flow Rebalancing</h3>
        <ol>
          <li>Calculate current allocation</li>
          <li>Identify underweight assets</li>
          <li>Direct new contributions 100% to underweight assets</li>
          <li>Continue until balance is restored</li>
        </ol>
        <p><strong>Best for:</strong> Taxable accounts, those adding regular contributions, minimising transaction costs.</p>

        <h2>The Annual Portfolio Review</h2>

        {/* ── Annual checklist — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Target className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Your Annual Checklist</p>
          </div>
          <div className="divide-y divide-white/5">
            {[
              "Review current allocation vs target",
              "Check fund expense ratios — any cheaper alternatives?",
              "Verify you're using full ISA allowance",
              "Check pension contributions and employer match",
              "Has your risk tolerance changed? (new job, family, age)",
              "Are your goals still the same?",
              "Rebalance if allocation has drifted 5%+",
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-4 py-3">
                <div className="shrink-0 w-5 h-5 border border-white/15 flex items-center justify-center">
                  <span className="text-[9px] font-heading text-white/20">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>What NOT to Do</h2>

        {/* ── Don'ts — flush box with red left bars ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { dont: "React to Headlines",      note: "If stocks crashed, bonds are now overweight — you should buy more stocks, not sell. Rebalance to your plan, not the news." },
            { dont: "Rebalance Too Often",      note: "Monthly rebalancing incurs more costs and doesn't improve long-term returns. Stick to your schedule, ignore the noise." },
            { dont: "Time the Rebalance",       note: '"I\'ll wait for stocks to recover before rebalancing." This defeats the purpose. Rebalance on schedule regardless of market conditions.' },
          ].map(({ dont, note }) => (
            <div key={dont} className="flex gap-0 bg-black">
              <div className="w-1 shrink-0 bg-red-500/50" />
              <div className="flex-1 px-6 py-4">
                <p className="font-heading text-[10px] uppercase tracking-widest text-red-400/70 mb-1">Don't: {dont}</p>
                <p className="text-zinc-500 text-sm font-sans">{note}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Adjusting Allocation Over Time</h2>
        <p>As you age or your circumstances change, your target allocation might need to shift:</p>
        <ul>
          <li><strong>Approaching retirement:</strong> Gradually reduce stock allocation (e.g., 90→70→60% over 10–15 years)</li>
          <li><strong>Major life change:</strong> Review if your risk tolerance has changed</li>
          <li><strong>Major goal achieved:</strong> If you hit your retirement number, you might reduce risk</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Document your target asset allocation</li>
          <li>Calculate your current allocation percentages</li>
          <li>Set a calendar reminder for annual review (same date each year)</li>
          <li>Decide: sell/buy rebalancing or cash flow rebalancing?</li>
          <li>If allocation has drifted 5%+, rebalance now</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Some platforms rebalance automatically. If you procrastinate, consider using one — or an all-in-one fund that does it internally."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Automate discipline wherever possible
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
                Use our Compound Interest Calculator to model how your portfolio might grow with
                consistent rebalancing over time.
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