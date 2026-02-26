import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, BarChart3, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

const ACCENT = "#22C55E"; // Budget — green

export default function MonthlyDashboard() {
  return (
    <>
      <SEO
        title="Your Monthly Financial Dashboard - Review and Adjust Your Finances"
        description="Learn how to conduct monthly financial reviews with key KPIs and adjustments. Track your progress and stay on top of your money with a personal finance dashboard."
        keywords="monthly financial review, money dashboard, financial KPIs, budget review, money tracking, personal finance metrics UK"
        canonicalUrl="/learn/monthly-dashboard"
      />

      <ArticleLayout
        title="Your Monthly Financial Dashboard"
        description="Monthly KPI review and adjustments"
        readTime="20 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{ title: "Building an Emergency Fund That Works", path: "/learn/emergency-fund" }}
      >

        <h2>Why Monthly Reviews Matter</h2>
        <p>
          A budget without regular reviews is like a car without a steering wheel. Monthly check-ins
          help you catch problems early, celebrate wins, and make adjustments before small issues
          become major financial problems.
        </p>

        {/* ── Money date — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Monthly Money Date</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Block 30–45 minutes at the start of each month for your "Money Date."
            Make it pleasant — grab a coffee, put on music, and treat it as self-care, not a chore.
          </p>
        </div>

        <h2>Your Key Financial Metrics</h2>
        <p>Track these KPIs monthly to understand your financial health:</p>

        {/* ── 5 KPIs — numbered sequence ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { n: "01", label: "Net Worth",              note: "Assets minus liabilities. This single number tells you if you're moving forward or backward. Track the trend, not the number itself." },
            { n: "02", label: "Savings Rate",            note: "What percentage of your income went to savings this month? 10% = good start, 20% = solid progress, 50%+ = FIRE territory." },
            { n: "03", label: "Spending by Category",   note: "Compare actual spending to your budget in each category. Highlight variances over 10%." },
            { n: "04", label: "Debt Paydown Progress",  note: "Track total debt balance and monthly reduction. Watching debt shrink is incredibly motivating." },
            { n: "05", label: "Emergency Fund Coverage",note: "How many months of expenses does your fund cover? Target: 3–6 months." },
          ].map(({ n, label, note }) => (
            <div key={n} className="flex items-start gap-5 px-6 py-4 bg-black hover:bg-white/[0.015] transition-colors">
              <span className="font-display text-3xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.2 }}>{n}</span>
              <div className="pt-0.5">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{label}</p>
                <p className="text-zinc-500 text-sm font-sans">{note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Savings rate formula ── */}
        <div className="not-prose border-l-2 border-white/15 bg-white/[0.02] px-5 py-4 my-5 font-mono text-sm text-zinc-400">
          Savings Rate = (Amount Saved ÷ Net Income) × 100
        </div>

        <h2>The Monthly Review Checklist</h2>

        {/* ── 30-min checklist — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <CheckCircle className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Your 30-Minute Review Routine</p>
          </div>
          <div className="divide-y divide-white/5">
            {[
              "Update net worth tracker (all account balances)",
              "Review bank statements and categorise spending",
              "Compare actual vs. budgeted spending per category",
              "Calculate this month's savings rate",
              "Check debt balances and payoff progress",
              "Review upcoming irregular expenses for next month",
              "Adjust budget categories if needed",
              "Set one financial goal for next month",
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

        <h2>Analysing Your Spending</h2>
        <p>Look for these patterns:</p>
        <ul>
          <li><strong>Lifestyle creep</strong> — Are "wants" growing faster than income?</li>
          <li><strong>Subscription bloat</strong> — Any unused subscriptions to cancel?</li>
          <li><strong>Emotional spending</strong> — Spikes after stressful periods?</li>
          <li><strong>Category drift</strong> — Consistently overspending in certain areas?</li>
        </ul>

        <h2>Making Adjustments</h2>
        <p>Budgets aren't set in stone. Use your monthly review to make smart adjustments:</p>

        {/* ── Adjust up / down / reallocate — flush 3-col ── */}
        <div className="not-prose grid md:grid-cols-3 gap-px bg-white/8 border border-white/8 my-8">
          {[
            { label: "Adjust Up",    color: "#F87171", items: ["Consistently overspending despite genuine effort", "Life changes (new baby, longer commute)", "Inflation increases on essentials"] },
            { label: "Adjust Down",  color: ACCENT,    items: ["Consistently underspending in a category", "Lifestyle changes (WFH, cutting subscriptions)", "Found cheaper alternatives"] },
            { label: "Reallocate To",color: "#38BDF8", items: ["Savings and investments", "Debt acceleration", "Sinking funds for future goals"] },
          ].map(({ label, color, items }) => (
            <div key={label} className="bg-black px-5 py-5">
              <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color }}>{label}</p>
              <ul className="space-y-2">
                {items.map(i => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                    <span style={{ color }} className="shrink-0 mt-px">→</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2>Tracking Your Progress</h2>

        {/* ── Visual tracking — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Visual Progress Tracking</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">Create simple charts or graphs to visualise your progress over time:</p>
          <ul className="space-y-2">
            {[
              "Net worth line chart (monthly)",
              "Savings rate bar chart",
              "Debt payoff countdown",
              "Emergency fund progress bar",
            ].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <h2>Celebrating Wins</h2>
        <p>Don't just focus on problems. Celebrate when you:</p>
        <ul>
          <li>Hit a savings milestone</li>
          <li>Stay under budget in a challenging category</li>
          <li>Pay off a debt</li>
          <li>Increase your net worth month-over-month</li>
          <li>Reach a new savings rate personal best</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Schedule your first "Money Date" in your calendar (recurring monthly)</li>
          <li>Create a simple spreadsheet or use an app to track your KPIs</li>
          <li>Gather all account login details so reviews are quick</li>
          <li>Set up automatic exports from your bank if available</li>
          <li>Complete your first review and establish baseline numbers</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "It's better to do a basic 15-minute review consistently than to plan an elaborate session you'll avoid."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Start small. Add complexity later.
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
                Use our Savings Calculator to project your progress based on your current savings rate
                and see how small changes compound over time.
              </p>
              <Link to="/finance/savings"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Savings Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}