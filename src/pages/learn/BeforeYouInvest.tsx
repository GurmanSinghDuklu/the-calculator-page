import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, CheckSquare, Shield, ArrowRight } from "lucide-react";

const ACCENT = "#34D399"; // Invest — emerald
const AMBER  = "#F59E0B";
const RED    = "#F87171";

export default function BeforeYouInvest() {
  return (
    <>
      <SEO
        title="What to Do Before You Invest - Pre-Investment Checklist"
        description="A comprehensive checklist of what you need in place before investing. Cover emergency funds, debt, risk tolerance, goals, and timelines before putting money in the market."
        keywords="before investing checklist, investment readiness, risk tolerance, investment goals, emergency fund before investing, investment timeline UK"
        canonicalUrl="/learn/before-you-invest"
      />

      <ArticleLayout
        title="What to Do Before You Invest"
        description="Risk tolerance, goals and timelines checklist"
        readTime="20–30 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{ title: "Basics of Investing: Stocks, Bonds & ETFs", path: "/learn/investing-basics" }}
      >

        <h2>The Pre-Investment Checklist</h2>
        <p>
          Investing is powerful, but only when your financial foundation is solid. Jumping into
          the markets without the basics in place is like building a house on sand. Let's make
          sure you're truly ready.
        </p>

        {/* ── Checklist — left border, no rounding ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-5">
            <CheckSquare className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Before You Invest: The Checklist</p>
          </div>
          <div className="space-y-3">
            {[
              "High-interest debt paid off (credit cards, overdrafts)",
              "Emergency fund of 3–6 months expenses",
              "Stable income that covers expenses with surplus",
              "Workplace pension enrolled (free employer money!)",
              "Clear investment timeline (5+ years for stocks)",
              "Understood your risk tolerance",
              "Defined clear investment goals",
              "Money you can afford to leave untouched",
            ].map(item => (
              <div key={item} className="flex items-start gap-3 text-sm font-sans">
                <span className="text-zinc-700 mt-0.5 shrink-0">□</span>
                <span className="text-zinc-400">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <h2>Why Each Step Matters</h2>

        <h3>1. Clear High-Interest Debt First</h3>
        <p>
          Paying off a 22% credit card gives you a guaranteed 22% return. No investment can
          reliably match that. Clear toxic debt before investing.
        </p>

        {/* ── Amber exception — left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-6" style={{ borderColor: `${AMBER}60` }}>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mb-1.5" style={{ color: AMBER }}>Exception</p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Low-interest debt (under 5%) like student loans or mortgages can run alongside investments,
            as investments may outperform over time.
          </p>
        </div>

        <h3>2. Build Your Emergency Fund</h3>
        <p>
          Without an emergency fund, you'll be forced to sell investments at the worst time — when
          markets are down and you need cash. Your emergency fund is insurance for your investments.
        </p>

        <h3>3. Maximize Free Money</h3>
        <p>
          Your workplace pension likely includes employer matching. If your employer matches 5%,
          that's an instant 100% return on your contributions. Always get the full match before
          investing elsewhere.
        </p>

        <h2>Understanding Your Risk Tolerance</h2>

        {/* ── Risk scenarios — flush grid ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Shield className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Risk Tolerance Assessment</p>
          </div>
          <p className="text-zinc-500 text-sm mb-5">Imagine you invest £10,000. How would you react if it dropped to:</p>
          <div className="divide-y divide-white/6">
            {[
              { val: "£9,000 — 10% drop",  desc: "Normal market fluctuation. Happens regularly.",        color: ACCENT },
              { val: "£7,500 — 25% drop",  desc: "Significant correction. Happens every few years.",     color: AMBER  },
              { val: "£5,000 — 50% drop",  desc: "Major crash. Happened in 2008 and briefly in 2020.",   color: RED    },
            ].map(({ val, desc, color }) => (
              <div key={val} className="flex items-start gap-4 py-3.5">
                <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: color }} />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest mb-0.5" style={{ color }}>{val}</p>
                  <p className="text-zinc-600 text-xs font-sans">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            If any of these would make you panic-sell, your portfolio needs more conservative assets.
          </p>
        </div>

        <h3>Risk Tolerance Factors</h3>
        <ul>
          <li><strong>Age:</strong> Younger = more time to recover from losses</li>
          <li><strong>Income stability:</strong> Secure job = can take more risk</li>
          <li><strong>Timeline:</strong> Longer = more risk acceptable</li>
          <li><strong>Personality:</strong> Can you sleep if your portfolio drops 30%?</li>
          <li><strong>Financial obligations:</strong> Mortgage, dependents = may need less risk</li>
        </ul>

        <h2>Defining Your Investment Goals</h2>

        {/* ── Goals list — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-1 border-b border-white/6">Common Investment Goals</p>
          <div className="divide-y divide-white/6">
            {[
              { goal: "Retirement (20–40 years away)",        desc: "Longest timeline, can handle high risk. Focus on growth." },
              { goal: "House Deposit (3–10 years away)",      desc: "Medium timeline. Balanced approach, reduce risk as you get closer." },
              { goal: "Financial Independence (10–25 years)", desc: "Long timeline. Growth-focused, diversified portfolio." },
              { goal: "Children's Education (5–18 years)",    desc: "Depends on children's ages. Reduce risk as date approaches." },
            ].map(({ goal, desc }) => (
              <div key={goal} className="py-4">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{goal}</p>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>The 5-Year Rule</h2>
        <p>
          Never invest money in stocks that you'll need within 5 years. Markets can and do drop
          50% and take years to recover. If you might need the money sooner, use:
        </p>
        <ul>
          <li><strong>0–1 years:</strong> High-yield savings account</li>
          <li><strong>1–3 years:</strong> Cash ISA, notice accounts</li>
          <li><strong>3–5 years:</strong> Maybe bonds, conservative mixed portfolio</li>
          <li><strong>5+ years:</strong> Stocks and diversified investing</li>
        </ul>

        <h2>How Much to Invest</h2>

        {/* ── Questions — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: `${ACCENT}50` }}>
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>The Investment Amount Question</p>
          <p className="text-zinc-500 text-sm mb-4">Only invest what you can genuinely afford to lock away AND afford to lose. Ask yourself:</p>
          <ul className="space-y-2">
            {[
              "If this money disappeared tomorrow, would I still be okay?",
              "Can I leave this untouched for 5+ years minimum?",
              "Is my emergency fund fully funded?",
              "Are my essential expenses covered from income?",
            ].map(q => (
              <li key={q} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {q}
              </li>
            ))}
          </ul>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Complete the pre-investment checklist above</li>
          <li>Check your workplace pension and ensure you get full employer match</li>
          <li>Honestly assess your risk tolerance using the scenarios above</li>
          <li>Write down your investment goal(s) with specific timelines</li>
          <li>Calculate how much surplus you have after expenses and emergency fund</li>
          <li>If any checklist items are incomplete, address those first</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Boring preparation enables exciting results."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            There's no rush to invest
          </p>
        </div>

        {/* ── CTA card — stark, no rounding ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] p-7 my-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}10` }}>
              <Calculator className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl uppercase tracking-widest text-white mb-2">Put It Into Practice</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                Use our Compound Interest Calculator to project how your investments could grow
                over your specific timeline, with different contribution amounts.
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