import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import budgetSplit from "@/assets/blog-budget-split.jpg";

const ACCENT = "#22C55E"; // Budget — green
const AMBER  = "#F59E0B";
const RED    = "#F87171";

export default function FiftyThirtyTwentyBudget() {
  return (
    <>
      <SEO
        title="50/30/20 Budget Rule Made Personal - Flexible Budgeting Guide"
        description="Learn how to adapt the popular 50/30/20 budget rule to your real income and lifestyle. Practical budgeting framework for UK residents."
        keywords="50/30/20 budget, budget rule, personal budgeting, flexible budget, needs wants savings, budgeting framework UK"
        canonicalUrl="/learn/50-30-20-budget"
      />

      <ArticleLayout
        title="The 50/30/20 Budget Made Personal"
        description="Adapt the classic rule to your real life and income"
        readTime="20 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{ title: "Automate Your Finances Like a Pro", path: "/learn/automate-finances" }}
      >

        <h2>What Is the 50/30/20 Rule?</h2>
        <p>
          The 50/30/20 budget rule, popularised by Senator Elizabeth Warren, suggests splitting your
          after-tax income into three categories:
        </p>

        <img
          src={budgetSplit}
          alt="Colourful pie chart showing 50/30/20 budget split with calculator and coins"
          className="w-full my-10 opacity-60 grayscale-[20%]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />

        {/* ── Three buckets — left colour bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { pct: "50%", label: "Needs",   desc: "Essential expenses you can't avoid",           color: RED   },
            { pct: "30%", label: "Wants",   desc: "Lifestyle and discretionary spending",          color: AMBER },
            { pct: "20%", label: "Savings", desc: "Future you, debt payoff, investments",          color: ACCENT},
          ].map(({ pct, label, desc, color }) => (
            <div key={pct} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: color }} />
              <div className="flex-1 flex items-center gap-6 px-6 py-5">
                <p className="font-display text-5xl leading-none shrink-0 tabular-nums" style={{ color }}>{pct}</p>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/60 mb-1">{label}</p>
                  <p className="text-zinc-500 text-sm font-sans">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Why It Works (In Theory)</h2>
        <p>
          The rule provides structure without micromanagement. It acknowledges that life should be enjoyed (30% wants)
          while ensuring financial security (20% savings) without overspending on essentials (50% needs).
        </p>

        <h2>Why It Doesn't Always Work (In Reality)</h2>
        <p>
          If you live in London, earn below median income, or have dependents, 50% for needs might be laughable.
          Housing alone could consume 40–50% of your income. Here's how to adapt:
        </p>

        {/* ── Variants — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            Adjusted Formulas for Real Life
          </p>
          <div className="divide-y divide-white/6">
            {[
              { formula: "60 / 20 / 20", label: "High Cost of Living",  items: ["60% Needs (rent + bills eat more)", "20% Wants (tighten lifestyle temporarily)", "20% Savings (prioritise future you)"] },
              { formula: "50 / 20 / 30", label: "Debt Payoff Mode",     items: ["50% Needs", "20% Wants (maintain sanity)", "30% Savings + Aggressive Debt Payoff"] },
              { formula: "70 / 20 / 10", label: "Low-Income Survival",  items: ["70% Needs (essentials dominate)", "20% Wants (don't eliminate joy completely)", "10% Savings (something is better than nothing)"] },
            ].map(({ formula, label, items }) => (
              <div key={formula} className="py-4 flex items-start gap-5">
                <div className="shrink-0 text-right w-20">
                  <p className="font-display text-xl leading-none" style={{ color: ACCENT }}>{formula}</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-2">{label}</p>
                  <ul className="space-y-1">
                    {items.map(i => (
                      <li key={i} className="text-zinc-500 text-xs font-sans">{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Needs vs Wants: The Grey Zone</h2>
        <p>The hardest part? Deciding what's actually a "need." Here's a reality-check framework:</p>

        {/* ── Needs vs wants — flush two-col ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: ACCENT }}>✓ Clear Needs</p>
            <ul className="space-y-2">
              {[
                "Rent/mortgage (can't negotiate short-term)",
                "Utilities (heat, water, basic electric)",
                "Groceries (not takeaways)",
                "Transport to work",
                "Minimum debt payments",
                "Essential insurance (health, car if required)",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest text-red-400 mb-4">✗ Wants Disguised as Needs</p>
            <ul className="space-y-2">
              {[
                "£150/month phone contract (need a phone, not an iPhone)",
                "Premium gym (need exercise, not a spa)",
                "Dining out 'for convenience' (it's a want)",
                "New clothes 'I need something to wear' (most of us have enough)",
                "Subscription boxes (definitely wants)",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span className="text-red-500 shrink-0 mt-px">✗</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Building Your Personal Budget Formula</h2>
        <ol>
          <li><strong>Calculate after-tax income</strong> — Use your actual take-home pay</li>
          <li><strong>List true needs from your 30-day tracking</strong> — Be honest</li>
          <li><strong>Calculate needs percentage</strong> — Total needs ÷ income</li>
          <li><strong>Adjust the rule</strong> — If needs are 65%, your formula is 65/20/15</li>
          <li><strong>Set category limits</strong> — This becomes your spending ceiling</li>
        </ol>

        <h2>Example: Real UK Budget</h2>

        {/* ── Sarah's budget — editorial table ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            Sarah, 28, Manchester — £2,200/month take-home
          </p>

          {/* Needs */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-heading text-[10px] uppercase tracking-widest" style={{ color: RED }}>Needs — 58% — £1,280</p>
            </div>
            <div className="divide-y divide-white/5 pl-3">
              {[["Rent + bills","£850"],["Groceries","£200"],["Transport","£120"],["Phone","£25"],["Debt minimums","£85"]].map(([k,v]) => (
                <div key={k} className="flex justify-between py-2">
                  <span className="text-zinc-600 text-xs font-sans">{k}</span>
                  <span className="text-zinc-500 text-xs font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wants */}
          <div className="mb-4 pt-4 border-t border-white/8">
            <div className="flex justify-between items-center mb-3">
              <p className="font-heading text-[10px] uppercase tracking-widest" style={{ color: AMBER }}>Wants — 22% — £480</p>
            </div>
            <div className="divide-y divide-white/5 pl-3">
              {[["Eating out","£150"],["Subscriptions","£45"],["Hobbies","£100"],["Clothes/personal","£85"],["Fun fund","£100"]].map(([k,v]) => (
                <div key={k} className="flex justify-between py-2">
                  <span className="text-zinc-600 text-xs font-sans">{k}</span>
                  <span className="text-zinc-500 text-xs font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings */}
          <div className="pt-4 border-t border-white/8">
            <div className="flex justify-between items-center mb-3">
              <p className="font-heading text-[10px] uppercase tracking-widest" style={{ color: ACCENT }}>Savings — 20% — £440</p>
            </div>
            <div className="divide-y divide-white/5 pl-3">
              {[["Emergency fund","£250"],["Extra debt payoff","£190"]].map(([k,v]) => (
                <div key={k} className="flex justify-between py-2">
                  <span className="text-zinc-600 text-xs font-sans">{k}</span>
                  <span className="text-zinc-500 text-xs font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Sarah's formula: <strong className="text-zinc-500">58/22/20</strong> — not the textbook version, but it works for her life.
          </p>
        </div>

        <h2>Making It Stick</h2>
        <ul>
          <li><strong>Review monthly</strong> — Adjust as income or needs change</li>
          <li><strong>Use sub-categories</strong> — Break "wants" into smaller buckets</li>
          <li><strong>Build in flexibility</strong> — One bad month doesn't break the system</li>
          <li><strong>Celebrate wins</strong> — Hit your savings target? Acknowledge it</li>
        </ul>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "The right budget is the one you'll actually follow."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Adapt it. Own it. Stick to it.
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
                Ready to create your personalised budget formula? Use our Budget Calculator to input your income
                and expenses, and see how your numbers compare to the 50/30/20 rule.
              </p>
              <Link to="/finance/budget"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Budget Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}