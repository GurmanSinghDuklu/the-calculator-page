import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Target, Flame, Sparkles, ArrowRight } from "lucide-react";

const ACCENT = "#A78BFA"; // Thrive — violet
const ORANGE = "#F97316";

export default function FinancialFreedom() {
  return (
    <>
      <SEO
        title="Financial Freedom: Defining Your End Goal"
        description="Explore different financial freedom models from coast FIRE to fat FIRE. Define your personal freedom number and create a roadmap to financial independence."
        keywords="financial freedom, FIRE movement UK, financial independence, retire early, freedom number, passive income, coast FIRE, barista FIRE"
        canonicalUrl="/learn/financial-freedom"
      />

      <ArticleLayout
        title="Financial Freedom: Defining Your End Goal"
        description="Personalised freedom vs FIRE models"
        readTime="30 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
        nextArticle={{ title: "Protecting Your Wealth (Insurance & Wills)", path: "/learn/protect-wealth" }}
      >

        <h2>What Is Financial Freedom?</h2>
        <p>
          Financial freedom means your investments and passive income cover your living expenses.
          You work because you want to, not because you have to. But what that looks like is
          deeply personal.
        </p>

        <h2>The FIRE Movement</h2>

        {/* ── FIRE intro — left orange border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ORANGE }}>
          <div className="flex items-center gap-3 mb-3">
            <Flame className="h-4 w-4 shrink-0" style={{ color: ORANGE }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ORANGE }}>Financial Independence, Retire Early</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            FIRE is a movement focused on aggressive saving and investing to achieve financial
            independence years or decades before traditional retirement age. The core principle:
            save 50–70% of income, invest in index funds, reach your "number."
          </p>
        </div>

        <h3>Types of FIRE</h3>

        {/* ── FIRE types — left bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { type: "Lean FIRE",    spend: "£15–25k/year", desc: "Financial independence on a minimal budget. Requires extreme frugality and often geographic arbitrage." },
            { type: "Regular FIRE", spend: "£25–50k/year", desc: "Traditional financial independence with moderate spending. Comfortable but not lavish lifestyle." },
            { type: "Fat FIRE",     spend: "£75k+/year",   desc: "Financial independence with abundant spending. No lifestyle sacrifices — travel, nice things, experiences." },
            { type: "Coast FIRE",   spend: "Variable",      desc: "Invested enough that compound growth will fund retirement. Can stop saving aggressively, work lower-stress jobs." },
            { type: "Barista FIRE", spend: "Variable",      desc: "Partially funded by investments + part-time work. Often for social connection or supplemental income." },
          ].map(({ type, spend, desc }) => (
            <div key={type} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: ORANGE }} />
              <div className="flex-1 flex items-start gap-5 px-6 py-4">
                <div className="shrink-0 w-28">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/60">{type}</p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: ORANGE }}>{spend}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Calculating Your Freedom Number</h2>

        {/* ── 4% rule — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <Target className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The 4% Rule</p>
          </div>
          <p className="text-zinc-500 text-sm mb-5">
            The Trinity Study suggests you can withdraw 4% of your portfolio annually with high
            confidence it will last 30+ years. This gives us:
          </p>
          {/* Formula */}
          <div className="border-l-2 pl-5 py-1 mb-5" style={{ borderColor: ACCENT }}>
            <p className="font-display text-2xl tracking-wide text-white/80">Freedom Number = Annual Expenses × 25</p>
          </div>
          <div className="divide-y divide-white/5">
            {[
              ["£30,000/year spending", "£750,000 needed"],
              ["£40,000/year spending", "£1,000,000 needed"],
              ["£50,000/year spending", "£1,250,000 needed"],
            ].map(([exp, num]) => (
              <div key={exp} className="flex justify-between py-2.5">
                <span className="text-zinc-600 text-sm font-sans">{exp}</span>
                <span className="font-heading text-sm" style={{ color: ACCENT }}>{num}</span>
              </div>
            ))}
          </div>
        </div>

        <h3>Adjusting the 4% Rule</h3>
        <ul>
          <li><strong>Longer retirement (50+ years):</strong> Consider 3.5% or 3% to be safer</li>
          <li><strong>Flexible spending:</strong> 4.5% might work if you can cut back in bad years</li>
          <li><strong>Other income sources:</strong> State pension, rental income, part-time work reduce needed portfolio</li>
        </ul>

        <h2>Personalised Freedom</h2>

        {/* ── Beyond the numbers — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Beyond the Numbers</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">Financial freedom isn't just about a number. Ask yourself:</p>
          <ul className="space-y-2">
            {[
              "What would you do if you didn't need to work?",
              "Do you actually want to stop working, or just have options?",
              "What does your ideal day look like?",
              "What would you regret not doing?",
              "How much do you actually need to be happy?",
            ].map(q => (
              <li key={q} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {q}
              </li>
            ))}
          </ul>
        </div>

        <h3>Different Paths to Freedom</h3>

        {/* ── Four paths — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Four Paths to Financial Independence</p>
          <div className="divide-y divide-white/6">
            {[
              { path: "The Marathon Saver",    desc: "15% savings rate, normal career, retire at 60–65 with comfortable funds." },
              { path: "The Sprinter",          desc: "50%+ savings rate, aggressive FIRE pursuit, retire 40–50." },
              { path: "The Lifestyle Designer",desc: "Build passive income streams, semi-retire early, work on passion projects." },
              { path: "The Career Pivoter",    desc: "Coast FIRE, then switch to meaningful but lower-paid work." },
            ].map(({ path, desc }) => (
              <div key={path} className="py-4 flex items-start gap-4">
                <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ background: ACCENT }} />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{path}</p>
                  <p className="text-zinc-500 text-sm font-sans">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>UK-Specific Considerations</h2>

        <h3>State Pension</h3>
        <p>
          The full new State Pension is ~£11,500/year (2024). This reduces your needed portfolio
          significantly. With two people, that's £23,000/year guaranteed income after 67.
        </p>

        <h3>NHS Healthcare</h3>
        <p>Unlike the US, healthcare costs aren't a major retirement concern. This makes Lean FIRE more viable in the UK.</p>

        <h3>Pension Access Rules</h3>
        <p>
          You can't access private pensions until 55 (57 from 2028). Early retirees need ISA
          and general investment accounts to bridge the gap.
        </p>

        <h2>Building Your Roadmap</h2>
        <ol>
          <li><strong>Define your ideal life:</strong> Not just retirement, but what you want day-to-day</li>
          <li><strong>Calculate required annual spending:</strong> Be realistic about lifestyle</li>
          <li><strong>Determine your freedom number:</strong> Annual spending × 25</li>
          <li><strong>Assess current position:</strong> Net worth, savings rate, investment returns</li>
          <li><strong>Project timeline:</strong> When will you hit your number at current pace?</li>
          <li><strong>Adjust if needed:</strong> Increase income, reduce expenses, or accept longer timeline</li>
        </ol>

        <h2>Action Steps</h2>
        <ol>
          <li>Track your current annual spending accurately</li>
          <li>Calculate your freedom number (expenses × 25)</li>
          <li>Determine your savings rate</li>
          <li>Project when you'll reach your number</li>
          <li>Decide if you're happy with that timeline, or want to adjust</li>
          <li>Write down what you'd do with financial freedom</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Don't sacrifice your whole life for a future freedom number. The best path is one where you enjoy the journey AND the destination."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Consider Coast FIRE — ease off the accelerator while still reaching your goal
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
                Use our Retirement Calculator to model different scenarios and see how changes
                to savings rate, returns, and timeline affect your freedom date.
              </p>
              <Link to="/finance/retirement"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Retirement Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}