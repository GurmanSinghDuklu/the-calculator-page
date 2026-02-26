import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, TrendingDown, Clock, AlertTriangle, ArrowRight } from "lucide-react";

const ACCENT = "#F59E0B"; // Pay Off — amber
const RED    = "#F87171";
const GREEN  = "#34D399";

export default function InterestImpact() {
  return (
    <>
      <SEO
        title="How Interest Eats Your Wealth - The Reverse Compounding Effect"
        description="Visualize how compound interest works against you when you're in debt. Understand the true cost of borrowing and why paying off debt is like guaranteed returns."
        keywords="compound interest debt, interest on loans, debt interest calculator, true cost of borrowing, reverse compounding, debt visualisation UK"
        canonicalUrl="/learn/interest-impact"
      />

      <ArticleLayout
        title="How Interest Eats Your Wealth"
        description="Reverse compounding visual guide"
        readTime="15 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{ title: "Credit Scores and Borrowing Wisely", path: "/learn/credit-scores" }}
      >

        <h2>Compound Interest in Reverse</h2>
        <p>
          You've heard that compound interest is the "eighth wonder of the world." What's less
          celebrated is its dark twin: compound interest working against you. When you're in debt,
          every day you don't pay it off, interest compounds on interest.
        </p>

        {/* ── Wealth destroyer — red left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-8 flex items-start gap-4" style={{ borderColor: RED }}>
          <TrendingDown className="h-4 w-4 shrink-0 mt-1" style={{ color: RED }} />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: RED }}>The Wealth Destroyer</p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A credit card at 22% APR doubles what you owe in just 3.3 years if you make no
              payments. A payday loan at 1,000% APR? Your debt multiplies 11× in one year.
            </p>
          </div>
        </div>

        <h2>Visualizing the Drain</h2>
        <p>
          Imagine filling a bathtub (your wealth) while the drain is open (interest on debt).
          The higher your interest rate, the wider the drain. You can pour in money all month,
          but if the drain is big enough, the water level never rises.
        </p>

        <h3>The Daily Bleed</h3>
        <p>Interest accrues daily, even when you're sleeping:</p>

        {/* ── Daily interest — flush divide list ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] my-8">
          <p className="px-5 py-3 text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 border-b border-white/6">
            Daily Interest on £5,000 Debt
          </p>
          <div className="divide-y divide-white/6">
            {[
              { rate: "7% APR",    label: "Good personal loan",    daily: "£0.96/day",  color: GREEN  },
              { rate: "19.9% APR", label: "Decent credit card",    daily: "£2.72/day",  color: ACCENT },
              { rate: "29.9% APR", label: "Store card",            daily: "£4.09/day",  color: "#F97316" },
              { rate: "39.9% APR", label: "Overdraft",             daily: "£5.46/day",  color: RED    },
            ].map(({ rate, label, daily, color }) => (
              <div key={rate} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div>
                  <span className="font-heading text-sm" style={{ color }}>{rate}</span>
                  <span className="text-zinc-600 text-xs font-sans ml-2">({label})</span>
                </div>
                <span className="font-display text-xl" style={{ color }}>{daily}</span>
              </div>
            ))}
          </div>
          <p className="px-5 py-3 text-[10px] text-zinc-700 font-sans border-t border-white/6">
            That overdraft costs £38/week, £164/month, or £1,970/year in interest alone.
          </p>
        </div>

        <h2>The Minimum Payment Trap</h2>

        {/* ── Min vs fixed — two-col flush grid ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Clock className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">£3,000 Credit Card at 22% APR</p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/8">
            {/* Minimum */}
            <div className="bg-black px-5 py-4">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/30 mb-4">Minimum Payments (2%)</p>
              <div className="space-y-3">
                {[["27 years", "to pay off"], ["£4,400", "interest paid"], ["£7,400", "total repaid"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="font-display text-2xl leading-none" style={{ color: RED }}>{val}</p>
                    <p className="text-zinc-700 text-[10px] font-heading uppercase tracking-widest mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Fixed */}
            <div className="bg-black px-5 py-4">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/30 mb-4">Fixed £150/month</p>
              <div className="space-y-3">
                {[["2 years", "to pay off"], ["£650", "interest paid"], ["£3,650", "total repaid"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="font-display text-2xl leading-none" style={{ color: GREEN }}>{val}</p>
                    <p className="text-zinc-700 text-[10px] font-heading uppercase tracking-widest mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="font-heading text-xs uppercase tracking-widest mt-4 pt-4 border-t border-white/6" style={{ color: ACCENT }}>
            Same debt, same rate — £3,750 difference based on payment strategy
          </p>
        </div>

        <h2>The Investment Comparison</h2>
        <p>Paying off debt is a guaranteed investment return. Consider this:</p>
        <ul>
          <li>Stock market average return: ~7–10% (not guaranteed, can lose)</li>
          <li>Savings account: ~4–5% (guaranteed)</li>
          <li>Paying off 22% credit card debt: 22% guaranteed return</li>
        </ul>
        <p>
          Every £100 you put toward a 22% debt saves you £22/year in interest — guaranteed.
          No investment can match that risk-free return.
        </p>

        <h2>Interest Rate Impact Over Time</h2>

        {/* ── APR comparison table — editorial ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            £10,000 Debt Over 10 Years (Minimum Payments)
          </p>
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/8">
                {["APR", "Interest Paid", "Total Repaid"].map((h, i) => (
                  <th key={h} className={`pb-3 text-[9px] font-heading uppercase tracking-widest text-white/20 ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { apr: "7%",  interest: "£4,200",  total: "£14,200", color: GREEN   },
                { apr: "15%", interest: "£10,500", total: "£20,500", color: ACCENT  },
                { apr: "22%", interest: "£18,800", total: "£28,800", color: "#F97316"},
                { apr: "30%", interest: "£28,000", total: "£38,000", color: RED     },
              ].map(({ apr, interest, total, color }) => (
                <tr key={apr}>
                  <td className="py-3.5 font-heading text-sm" style={{ color }}>{apr}</td>
                  <td className="py-3.5 text-right text-zinc-400">{interest}</td>
                  <td className="py-3.5 text-right font-heading text-sm" style={{ color }}>{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Breaking Free: Strategies</h2>

        <h3>1. Attack the Rate</h3>
        <ul>
          <li>Balance transfer to 0% card</li>
          <li>Consolidate to lower-rate personal loan</li>
          <li>Negotiate with current lender</li>
        </ul>

        <h3>2. Attack the Balance</h3>
        <ul>
          <li>Pay more than minimum — any extra helps</li>
          <li>Use windfalls for debt (tax refunds, bonuses)</li>
          <li>Redirect savings temporarily to debt (if rate is higher)</li>
        </ul>

        <h3>3. Attack the Timeline</h3>
        <ul>
          <li>Set a debt-free date and work backwards</li>
          <li>Use bi-weekly payments (26 half-payments = 13 full payments)</li>
          <li>Round up payments for psychological wins</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Calculate the daily interest cost of each debt</li>
          <li>Look at your total debt and imagine the daily "drain"</li>
          <li>Compare your highest debt rate to investment returns</li>
          <li>Commit to paying more than the minimum on your highest-rate debt</li>
          <li>Explore 0% balance transfers or consolidation options</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Think of debt interest as a subscription you're paying for nothing. Every pound of interest is a pound that could have been yours."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Unlike Netflix — you get zero value from interest payments
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
                Use our Compound Interest Calculator to visualize how interest accumulates on debt,
                and see the dramatic difference higher payments make.
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