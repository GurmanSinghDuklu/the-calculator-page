import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import trackingExpenses from "@/assets/blog-tracking-expenses.jpg";
import spendingCategories from "@/assets/blog-spending-categories.jpg";

const ACCENT = "#22C55E"; // Budget — green
const RED    = "#F87171";

export default function WhereMoneyGoes() {
  return (
    <>
      <SEO
        title="Where Your Money Really Goes - Track Your Spending"
        description="Learn how to track your spending for 30 days and categorize expenses to understand where your money really goes. Essential first step in financial literacy."
        keywords="track spending, categorize expenses, money tracking, spending awareness, budget tracking, financial habits"
        canonicalUrl="/learn/where-money-goes"
      />

      <ArticleLayout
        publishDate="2025-01-08"
        title="Where Your Money Really Goes"
        description="The foundation of financial control starts with awareness"
        readTime="15–30 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{ title: "50/30/20 Budget Made Personal", path: "/learn/50-30-20-budget" }}
      >

        <h2>Why Tracking Matters</h2>
        <p>
          Most people underestimate their spending by 20–40%. The "latte factor" isn't just about coffee — it's
          about unconscious micro-spending that adds up to major budget leaks. Before you can optimise your
          finances, you need to see the truth.
        </p>

        <img
          src={trackingExpenses}
          alt="Person tracking expenses in a budget planner with calculator and receipts"
          className="w-full my-10 opacity-60 grayscale-[20%]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />

        <h2>The 30-Day Tracking Challenge</h2>
        <p>
          For the next 30 days, record every single expense. Yes, everything — from rent to that £1.50 coffee.
          This isn't about judgement; it's about data.
        </p>

        {/* ── Four tracking methods — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">How to Track</p>
          <div className="divide-y divide-white/6">
            {[
              { method: "Bank Statements",  desc: "Review and categorise all transactions from your bank app. Zero effort — the data is already there." },
              { method: "Receipt Collection",desc: "Keep every receipt and tally weekly. Tactile and visual." },
              { method: "Spending Apps",    desc: "Emma, Moneybox, or even a simple spreadsheet. Automatic categorisation saves time." },
              { method: "Cash Envelope",    desc: "Old-school but effective for visual learners and cash spenders." },
            ].map(({ method, desc }) => (
              <div key={method} className="py-4 flex items-start gap-5">
                <div className="shrink-0 w-36">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55">{method}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Core Spending Categories</h2>
        <p>Organise your spending into these buckets:</p>

        <img
          src={spendingCategories}
          alt="Smartphone showing financial tracking app with spending categories"
          className="w-full my-10 opacity-60 grayscale-[20%]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />

        {/* ── 9 categories — flush grid ── */}
        <div className="not-prose grid sm:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          {[
            { emoji: "🏠", label: "Housing",       note: "Rent/mortgage, council tax, insurance" },
            { emoji: "🍽️", label: "Food & Groceries",note: "Supermarket shops, household items" },
            { emoji: "🚗", label: "Transport",      note: "Car payments, fuel, insurance, public transport" },
            { emoji: "💡", label: "Utilities",      note: "Gas, electric, water, internet, phone" },
            { emoji: "👕", label: "Personal",       note: "Clothing, toiletries, haircuts" },
            { emoji: "🎉", label: "Entertainment",  note: "Dining out, subscriptions, hobbies" },
            { emoji: "🏥", label: "Health",         note: "Gym, prescriptions, healthcare" },
            { emoji: "💳", label: "Debt Payments",  note: "Credit cards, loans, overdrafts" },
            { emoji: "💰", label: "Savings",        note: "Emergency fund, goals, investments" },
          ].map(({ emoji, label, note }) => (
            <div key={label} className="bg-black px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{emoji}</span>
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55">{label}</p>
              </div>
              <p className="text-zinc-600 text-xs font-sans">{note}</p>
            </div>
          ))}
        </div>

        <h2>Common Tracking Pitfalls</h2>

        {/* ── Pitfalls — left red border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: RED }}>
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: RED }}>Watch Out For</p>
          <div className="space-y-3">
            {[
              ["Forgetting cash transactions",  "Cash disappears fastest — it leaves no digital trace."],
              ["Ignoring annual expenses",       "Insurance, MOT, gifts — divide the annual cost by 12 for your monthly figure."],
              ["Shared expenses",                "Track what YOU pay, not what others contribute."],
              ["Giving up after week 1",         "Consistency beats perfection. Incomplete data is still data."],
            ].map(([label, note]) => (
              <div key={label as string} className="flex items-start gap-3">
                <span style={{ color: RED }} className="shrink-0 mt-px text-xs">✗</span>
                <p className="text-zinc-500 text-sm font-sans">
                  <strong className="text-zinc-300">{label}</strong> — {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2>What You'll Discover</h2>
        <p>After 30 days, you'll likely find:</p>

        {/* ── Discoveries — left green border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <ul className="space-y-2">
            {[
              "1–3 categories consuming more than you thought",
              "Subscriptions you forgot you had",
              "Patterns tied to emotions (stress spending, boredom eating)",
              "Opportunities to reallocate hundreds per month",
            ].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Choose your tracking method today</li>
          <li>Set a daily reminder to log expenses</li>
          <li>Review weekly — don't wait until the end</li>
          <li>After 30 days, calculate your average monthly spending per category</li>
          <li>Identify your top 3 "budget leak" areas</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Don't try to change your spending during the tracking phase. Just observe. Let the data speak first."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Behaviour change comes after awareness, not during
          </p>
        </div>

        <h2>What's Next?</h2>
        <p>
          Once you have 30 days of real data, you're ready to build a budget that actually fits your life —
          not some generic 50/30/20 split. That's what we cover in the next article.
        </p>

        {/* ── CTA card — stark ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] p-7 my-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}10` }}>
              <Calculator className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl uppercase tracking-widest text-white mb-2">Put It Into Practice</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                Now that you understand where your money goes, use our Budget Calculator to organise your
                spending into categories and create a personalised budget plan.
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