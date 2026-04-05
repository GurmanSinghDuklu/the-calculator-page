import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Snowflake, Mountain, Scale, ArrowRight } from "lucide-react";

const ACCENT = "#F59E0B"; // Pay Off — amber
const SKY    = "#38BDF8";
const VIOLET = "#A78BFA";
const GREEN  = "#34D399";
const RED    = "#F87171";

export default function SnowballAvalanche() {
  return (
    <>
      <SEO
        title="Snowball vs Avalanche: Debt Payoff Strategies Compared"
        description="Compare debt snowball vs avalanche methods with worked examples. Find the strategy that fits your situation."
        keywords="debt snowball, debt avalanche, debt payoff strategy, debt repayment methods, paying off debt UK, debt free strategies"
        canonicalUrl="/learn/snowball-avalanche"
      />

      <ArticleLayout
        publishDate="2025-02-26"
        title="Snowball vs Avalanche"
        description="Two payoff strategies with worked examples"
        readTime="20–40 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{ title: "How Interest Eats Your Wealth", path: "/learn/interest-impact" }}
      >

        <h2>Two Proven Strategies</h2>
        <p>
          Both the Snowball and Avalanche methods work. The best choice depends on your
          personality — whether you need quick wins for motivation or prefer mathematical optimisation.
        </p>

        {/* ── Two strategies — flush side-by-side ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-10">
          {/* Avalanche */}
          <div className="bg-black px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <Mountain className="h-4 w-4 shrink-0" style={{ color: SKY }} />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: SKY }}>Avalanche — Highest Interest First</p>
            </div>
            <p className="text-zinc-500 text-sm mb-4">Pay minimums on all debts, then throw every extra pound at the highest interest rate debt. Once paid, move to the next highest.</p>
            <div className="space-y-1.5">
              {[
                { t: "Saves the most money in interest",     good: true  },
                { t: "Mathematically optimal",               good: true  },
                { t: "Fastest total payoff time",            good: true  },
                { t: "May take longer to see first win",     good: false },
              ].map(({ t, good }) => (
                <p key={t} className="flex items-start gap-2 text-xs font-sans text-zinc-500">
                  <span className="shrink-0 mt-px" style={{ color: good ? GREEN : RED }}>{good ? "✓" : "✗"}</span> {t}
                </p>
              ))}
            </div>
          </div>
          {/* Snowball */}
          <div className="bg-black px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <Snowflake className="h-4 w-4 shrink-0" style={{ color: VIOLET }} />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: VIOLET }}>Snowball — Smallest Balance First</p>
            </div>
            <p className="text-zinc-500 text-sm mb-4">Pay minimums on all debts, then throw every extra pound at the smallest balance debt. Once paid, move to the next smallest.</p>
            <div className="space-y-1.5">
              {[
                { t: "Quick psychological wins",             good: true  },
                { t: "Builds momentum and motivation",       good: true  },
                { t: "Reduces number of debts faster",       good: true  },
                { t: "Costs more in total interest",         good: false },
              ].map(({ t, good }) => (
                <p key={t} className="flex items-start gap-2 text-xs font-sans text-zinc-500">
                  <span className="shrink-0 mt-px" style={{ color: good ? GREEN : RED }}>{good ? "✓" : "✗"}</span> {t}
                </p>
              ))}
            </div>
          </div>
        </div>

        <h2>Worked Example</h2>
        <p>Both strategies, same debt profile, £400/month to pay:</p>

        {/* ── Starting debts — editorial table ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Starting Debts</p>
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/8">
                {["Debt", "Balance", "APR", "Minimum"].map((h, i) => (
                  <th key={h} className={`pb-3 text-[9px] font-heading uppercase tracking-widest text-white/20 ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { debt: "Store Card",  balance: "£500",   apr: "29.9%", min: "£15",  aprColor: "#F97316" },
                { debt: "Credit Card", balance: "£3,000", apr: "22.9%", min: "£75",  aprColor: ACCENT    },
                { debt: "Overdraft",   balance: "£1,500", apr: "39.9%", min: "£50",  aprColor: RED       },
                { debt: "Car Loan",    balance: "£5,000", apr: "7.9%",  min: "£120", aprColor: GREEN     },
              ].map(({ debt, balance, apr, min, aprColor }) => (
                <tr key={debt}>
                  <td className="py-3 text-zinc-400">{debt}</td>
                  <td className="py-3 text-right font-mono text-zinc-400">{balance}</td>
                  <td className="py-3 text-right font-heading text-sm" style={{ color: aprColor }}>{apr}</td>
                  <td className="py-3 text-right font-mono text-zinc-600">{min}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Total debt: <strong className="text-zinc-500">£10,000</strong> &nbsp;|&nbsp;
            Total minimums: <strong className="text-zinc-500">£260/month</strong> &nbsp;|&nbsp;
            Extra to allocate: <strong className="text-zinc-500">£140/month</strong>
          </p>
        </div>

        {/* ── Order comparison — two-col flush ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          {/* Avalanche order */}
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: SKY }}>Avalanche Order (by APR)</p>
            <div className="divide-y divide-white/5">
              {[
                { n: "01", label: "Overdraft",   detail: "39.9%" },
                { n: "02", label: "Store Card",  detail: "29.9%" },
                { n: "03", label: "Credit Card", detail: "22.9%" },
                { n: "04", label: "Car Loan",    detail: "7.9%"  },
              ].map(({ n, label, detail }) => (
                <div key={n} className="flex items-center gap-3 py-2.5">
                  <span className="font-display text-xl leading-none shrink-0 tabular-nums" style={{ color: SKY, opacity: 0.3 }}>{n}</span>
                  <span className="text-zinc-500 text-xs font-sans flex-1">{label}</span>
                  <span className="font-heading text-xs" style={{ color: SKY }}>{detail}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/6">
              <p className="font-heading text-[10px] uppercase tracking-widest" style={{ color: SKY }}>31 months · £1,850 interest</p>
            </div>
          </div>
          {/* Snowball order */}
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: VIOLET }}>Snowball Order (by Balance)</p>
            <div className="divide-y divide-white/5">
              {[
                { n: "01", label: "Store Card",  detail: "£500"   },
                { n: "02", label: "Overdraft",   detail: "£1,500" },
                { n: "03", label: "Credit Card", detail: "£3,000" },
                { n: "04", label: "Car Loan",    detail: "£5,000" },
              ].map(({ n, label, detail }) => (
                <div key={n} className="flex items-center gap-3 py-2.5">
                  <span className="font-display text-xl leading-none shrink-0 tabular-nums" style={{ color: VIOLET, opacity: 0.3 }}>{n}</span>
                  <span className="text-zinc-500 text-xs font-sans flex-1">{label}</span>
                  <span className="font-heading text-xs" style={{ color: VIOLET }}>{detail}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/6">
              <p className="font-heading text-[10px] uppercase tracking-widest" style={{ color: VIOLET }}>33 months · £2,100 interest</p>
            </div>
          </div>
        </div>

        {/* ── Head-to-head comparison ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Scale className="h-4 w-4 shrink-0 text-white/30" />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">Side by Side</p>
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-white/6">
            <div className="pr-5">
              <p className="text-[9px] font-heading uppercase tracking-widest text-white/20 mb-3">Metric</p>
              {["Time to debt-free", "Total interest", "First win"].map(m => (
                <p key={m} className="text-zinc-600 text-xs font-sans py-2 border-t border-white/5">{m}</p>
              ))}
            </div>
            <div className="px-5">
              <p className="font-heading text-[9px] uppercase tracking-widest mb-3" style={{ color: SKY }}>Avalanche</p>
              {["31 months", "£1,850", "11 months"].map(v => (
                <p key={v} className="font-heading text-sm py-2 border-t border-white/5" style={{ color: SKY }}>{v}</p>
              ))}
            </div>
            <div className="pl-5">
              <p className="font-heading text-[9px] uppercase tracking-widest mb-3" style={{ color: VIOLET }}>Snowball</p>
              {["33 months", "£2,100", "4 months"].map(v => (
                <p key={v} className="font-heading text-sm py-2 border-t border-white/5" style={{ color: VIOLET }}>{v}</p>
              ))}
            </div>
          </div>
          <p className="text-zinc-600 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Avalanche saves £250 and 2 months — but Snowball gives you a win 7 months sooner.
          </p>
        </div>

        <h2>Which Should You Choose?</h2>

        {/* ── Choose — two-col flush ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: SKY }}>Choose Avalanche If:</p>
            <ul className="space-y-2">
              {["You're motivated by math and logic", "You can stay committed without quick wins", "Interest rate differences are significant", "You want to pay the least amount possible"].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: SKY }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: VIOLET }}>Choose Snowball If:</p>
            <ul className="space-y-2">
              {["You need motivation and quick wins", "You've tried and failed with debt payoff before", "You have many small debts cluttering your finances", "The emotional burden of multiple debts is heavy"].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: VIOLET }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3>Hybrid Approach</h3>
        <p>Some people combine both: knock out one or two tiny debts for momentum, then switch to avalanche for the rest. Quick wins AND interest savings.</p>

        <h2>The Rollover Effect</h2>
        <p>When you pay off a debt, you don't reduce your monthly payment — you roll it onto the next debt.</p>
        <ul>
          <li>Pay off Store Card (minimum was £15) → Add £15 to next debt payment</li>
          <li>Pay off Overdraft (minimum was £50) → Add £65 to next debt payment</li>
          <li>Each payoff accelerates the next one</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>List all your debts with balances and APRs</li>
          <li>Decide: Are you motivated by math (Avalanche) or momentum (Snowball)?</li>
          <li>Order your debts according to your chosen method</li>
          <li>Calculate your total minimum payments</li>
          <li>Determine how much extra you can pay each month</li>
          <li>Set up payments and start attacking debt #1</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "The best method is the one you'll actually stick to. A perfect plan you abandon is worse than a slightly less optimal plan you complete."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Choose based on self-knowledge, not ego
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
                Use our Multi-Card Payoff Calculator to run both strategies with your actual debts
                and see exactly which approach works best for your situation.
              </p>
              <Link to="/finance/multi-card-payoff"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Multi-Card Payoff Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}