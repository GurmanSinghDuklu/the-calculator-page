import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Shield, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";

const ACCENT = "#F59E0B"; // Pay Off — amber

export default function CreditScores() {
  return (
    <>
      <SEO
        title="Credit Scores and Borrowing Wisely - Build or Repair Your Credit"
        description="UK credit scores: how they work and strategies to build or repair credit for mortgages and loans."
        keywords="credit score UK, improve credit score, credit rating, Experian, Equifax, credit repair, borrowing tips UK, credit file"
        canonicalUrl="/learn/credit-scores"
      />

      <ArticleLayout
        publishDate="2025-06-04"
        title="Credit Scores and Borrowing Wisely"
        description="Build or repair credit health"
        readTime="20 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{ title: "What to Do Before You Invest", path: "/learn/before-you-invest" }}
      >

        <h2>What Is a Credit Score?</h2>
        <p>
          Your credit score is a number that represents how risky you are to lend to. Higher scores
          mean you're seen as more reliable, which gets you better interest rates and more lending
          options. Lower scores mean higher rates or outright rejection.
        </p>

        {/* ── Three agencies — flush grid ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            UK Credit Reference Agencies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
            {[
              { name: "Experian",   range: "0 – 999",  via: "Free via MSE Credit Club" },
              { name: "Equifax",    range: "0 – 1000", via: "Free via ClearScore"      },
              { name: "TransUnion", range: "0 – 710",  via: "Free via Credit Karma"    },
            ].map(({ name, range, via }) => (
              <div key={name} className="bg-black px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/70 mb-1">{name}</p>
                <p className="font-display text-2xl" style={{ color: ACCENT }}>{range}</p>
                <p className="text-zinc-600 text-xs font-sans mt-2">{via}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Different lenders use different agencies. Check all three for a complete picture.
          </p>
        </div>

        <h2>What Affects Your Score?</h2>

        <h3>Payment History (Most Important)</h3>
        <ul>
          <li>Late payments stay on your file for 6 years</li>
          <li>Even one missed payment can drop your score significantly</li>
          <li>Defaults and CCJs have the biggest negative impact</li>
        </ul>

        <h3>Credit Utilization</h3>
        <ul>
          <li>How much of your available credit you're using</li>
          <li>Aim to use less than 30% of your credit limits</li>
          <li>Maxed-out cards hurt your score even if you pay on time</li>
        </ul>

        <h3>Credit History Length</h3>
        <ul>
          <li>Older accounts help your score</li>
          <li>Don't close old credit cards unnecessarily</li>
          <li>Time heals — negative marks fade after 6 years</li>
        </ul>

        <h3>Credit Mix</h3>
        <ul>
          <li>Having different types of credit (cards, loans) can help</li>
          <li>Don't open credit just for variety though</li>
        </ul>

        <h3>Hard Searches</h3>
        <ul>
          <li>Each credit application leaves a "hard search" mark</li>
          <li>Too many applications in a short time looks desperate</li>
          <li>Use eligibility checkers (soft searches) first</li>
        </ul>

        <h2>Building Credit from Scratch</h2>

        {/* ── Steps — left border + numbered ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Steps for Credit Newbies</p>
          </div>
          <div className="space-y-0 divide-y divide-white/6">
            {[
              ["Register on the electoral roll",  "At your current address — this alone can add points."],
              ["Get a credit builder card",       "Aqua, Vanquis, or Capital One are designed for this."],
              ["Use it for small purchases",      "£20–50/month is enough to build history."],
              ["Pay in full every month",         "Set up a Direct Debit so you never miss."],
              ["Wait 3–6 months",                 "Then check your score — improvement should show."],
              ["Don't apply for more credit",     "Until your score improves from the first card."],
            ].map(([label, desc], i) => (
              <div key={label} className="flex items-start gap-5 py-3.5">
                <span className="font-display text-3xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.25 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-0.5">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/60 mb-0.5">{label}</p>
                  <p className="text-zinc-500 text-sm font-sans">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Repairing Damaged Credit</h2>

        {/* ── Repair steps — amber left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-8 flex items-start gap-4" style={{ borderColor: `${ACCENT}80` }}>
          <AlertTriangle className="h-4 w-4 shrink-0 mt-1" style={{ color: ACCENT }} />
          <div className="flex-1">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: ACCENT }}>If You Have Bad Credit</p>
            <div className="space-y-2.5">
              {[
                ["Get your free credit reports",      "From all three agencies — look for errors."],
                ["Check for errors",                  "Dispute any mistakes you find."],
                ["Ensure you're on the electoral roll","If not, register immediately."],
                ["Pay all current bills on time",     "Without fail, going forward."],
                ["Reduce credit utilization",         "Get below 30% on all cards."],
                ["Don't apply for new credit",        "For 6–12 months minimum."],
                ["Consider a credit builder card",    "If you can get approved for one."],
                ["Wait",                              "Negative marks disappear after 6 years."],
              ].map(([label, desc], i) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="font-heading text-[10px] text-white/20 shrink-0 mt-0.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-zinc-500 text-sm font-sans">
                    <strong className="text-zinc-300">{label}</strong> — {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2>Borrowing Wisely</h2>

        <h3>Before You Borrow, Ask:</h3>
        <ul>
          <li>Do I actually need this, or do I want it?</li>
          <li>Can I wait and save instead?</li>
          <li>What's the true total cost including interest?</li>
          <li>Can I afford the monthly payments without stress?</li>
          <li>What happens if my income drops?</li>
        </ul>

        {/* ── Good vs bad reasons — two-col flush grid ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Good Reasons to Borrow</p>
            <ul className="space-y-2">
              {[
                "Mortgage for a home you can afford",
                "Consolidating high-rate debt to a lower rate",
                "Essential car for work (if transit isn't viable)",
                "Education that increases earning potential",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: ACCENT }} className="shrink-0 mt-px">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest text-red-400 mb-4">Bad Reasons to Borrow</p>
            <ul className="space-y-2">
              {[
                "Holidays or experiences",
                "Keeping up with others' lifestyles",
                "Consumer goods that depreciate",
                "To gamble or speculate",
                "Because you can",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span className="text-red-500 shrink-0 mt-px">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Smart Credit Card Strategies</h2>

        {/* ── Credit card dos/don'ts — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <Shield className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Using Credit Cards Wisely</p>
          </div>
          <div className="space-y-2.5">
            {[
              { good: true,  text: "Pay in full every month",        note: "Treat it like a debit card" },
              { good: true,  text: "Use for Section 75 protection",  note: "Covers purchases £100–£30,000" },
              { good: true,  text: "Collect rewards",                note: "Cashback or points — only if paying in full" },
              { good: true,  text: "Set up Direct Debit",            note: "For full balance to avoid accidents" },
              { good: false, text: "Never withdraw cash",            note: "Instant interest + fees apply" },
              { good: false, text: "Don't pay just minimums",        note: "Unless in genuine financial distress" },
            ].map(({ good, text, note }) => (
              <div key={text} className="flex items-start gap-3">
                <span className={`shrink-0 mt-0.5 text-xs font-heading ${good ? "" : "text-red-500"}`} style={good ? { color: ACCENT } : {}}>
                  {good ? "✓" : "✗"}
                </span>
                <p className="text-sm font-sans text-zinc-500">
                  <strong className="text-zinc-300">{text}</strong> — {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Sign up for free credit scores from all three agencies</li>
          <li>Check your reports for any errors</li>
          <li>Verify you're registered on the electoral roll</li>
          <li>Calculate your credit utilization across all cards</li>
          <li>Set up Direct Debits for at least minimum payments on all credit</li>
          <li>Before any new credit, use eligibility checkers first</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Your credit score matters most when you're about to borrow. Focus on good habits — the score will follow."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Don't obsess over the number
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
                Use our Loan Calculator to compare the true cost of different loan offers and see
                how interest rates affect your total repayment.
              </p>
              <Link to="/finance/loan"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Loan Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}