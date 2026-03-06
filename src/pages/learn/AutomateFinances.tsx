import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import automateBanking from "@/assets/blog-automate-banking.jpg";

// ─── New article design language ─────────────────────────────────────────────
// Pure black bg, stark white/zinc type, Bebas Neue display for pull-quotes,
// razor-thin borders, oversized numbering, no soft rounded corners — raw editorial.
const ACCENT = "#22C55E";

export default function AutomateFinances() {
  return (
    <>
      <SEO
        title="Automate Your Finances Like a Pro - Set and Forget Money Management"
        description="Learn how to automate savings, bills, and investments with UK-specific tools and strategies. Financial automation for beginners."
        keywords="automate finances UK, standing orders, direct debits, automatic savings, financial automation, set and forget banking"
        canonicalUrl="/learn/automate-finances"
      />

      <ArticleLayout
        publishDate="2025-01-29"
        title="Automate Your Finances Like a Pro"
        description="Build a money system that works while you sleep"
        readTime="20 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{ title: "Budgeting for Unexpected Costs", path: "/learn/budget-irregular-costs" }}
      >

        <h2>Why Automation Beats Willpower</h2>
        <p>
          Financial discipline is exhausting. Every manual payment is a decision point — and humans are terrible
          at making consistent decisions under pressure. Automation removes friction, eliminates procrastination,
          and makes saving effortless.
        </p>

        {/* ── Left-border info callout ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: ACCENT }}>The Automation Advantage</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Research shows automated savers accumulate 2–3× more wealth than manual savers earning the same income.
            Because automation happens before you see the money. Out of sight, into savings.
          </p>
        </div>

        <h2>The Core Systems to Automate</h2>

        <img
          src={automateBanking}
          alt="Person setting up online banking automation on laptop in modern home office"
          className="w-full my-10 opacity-60 grayscale-[30%]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />

        <h3>1. The Payday Protocol</h3>
        <p>The moment your salary hits your account, money should flow automatically to designated buckets:</p>

        {/* ── Numbered sequence — editorial style ── */}
        <div className="not-prose border border-white/8 bg-white/[0.02] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            Payday Sequence — set for the day after payday
          </p>
          <div className="space-y-0 divide-y divide-white/6">
            {[
              { label: "Savings Transfer",           desc: "Standing order to separate savings account (20% of income or your target %)" },
              { label: "Investment Contribution",     desc: "Auto-deposit to ISA or pension (if applicable)" },
              { label: "Bill Payment Account Top-Up", desc: "Transfer to separate account that handles all direct debits" },
              { label: "Whatever Remains",            desc: "Guilt-free spending account — you can't overspend because everything else is sorted" },
            ].map(({ label, desc }, i) => (
              <div key={i} className="flex items-start gap-5 py-4">
                <span className="font-display text-5xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.25 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/60 mb-1">{label}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3>2. Bill Segregation Strategy</h3>
        <p>
          Open a separate "Bills Only" account. All direct debits come from this account. On payday,
          auto-transfer the total needed for bills.
        </p>
        <ul>
          <li>Never accidentally spend rent money</li>
          <li>Clear visibility of discretionary funds</li>
          <li>Easy monthly review (one account statement = all fixed costs)</li>
        </ul>

        <h3>3. Savings Buckets</h3>
        <p>UK banks like Monzo, Starling, and Chase offer built-in "pots" or "spaces" for goals:</p>
        <ul>
          <li><strong>Emergency Fund</strong> — Auto-save until 3–6 months expenses</li>
          <li><strong>Annual Expenses</strong> — MOT, insurance renewals, Christmas — divide by 12 and auto-save monthly</li>
          <li><strong>Short-Term Goals</strong> — Holiday, new phone, house deposit</li>
        </ul>

        <h2>UK-Specific Automation Tools</h2>

        {/* ── Grid cards — flush borders, no rounding ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          {[
            { title: "Standing Orders",             sub: "Savings, rent, regular transfers", items: ["You control start/stop", "Fixed amounts", "Won't take money if insufficient funds"] },
            { title: "Direct Debits",               sub: "Bills, subscriptions, loans",      items: ["Company controls amount", "Protected by Direct Debit Guarantee", "Can vary (e.g. energy bills)"] },
            { title: "Round-Up Apps",               sub: "Moneybox, Plum, Chip",             items: ["Rounds purchases to nearest £1", "Saves the difference automatically", "Painless micro-savings"] },
            { title: "Employer Pension Auto-Enrol", sub: "Workplace pensions",               items: ["Deducted pre-tax", "Employer match = free money", "Increase contribution % annually"] },
          ].map(({ title, sub, items }) => (
            <div key={title} className="bg-black px-5 py-5 hover:bg-white/[0.02] transition-colors">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/80 mb-0.5">{title}</p>
              <p className="text-zinc-600 text-[11px] font-sans mb-4">{sub}</p>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                    <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2>Setting Up Your Automation System</h2>

        <h3>Step 1: Map Your Cash Flow</h3>
        <p>Before automating, know these numbers:</p>
        <ul>
          <li>Monthly take-home pay</li>
          <li>Total essential expenses (from your tracking)</li>
          <li>Savings target (% or fixed amount)</li>
          <li>Bill payment dates</li>
        </ul>

        <h3>Step 2: Choose Your Account Structure</h3>
        <ol>
          <li><strong>Main Current Account</strong> — Salary lands here</li>
          <li><strong>Bills Account</strong> — All direct debits</li>
          <li><strong>Savings Account</strong> — Emergency fund + goals</li>
        </ol>

        <h3>Step 3: Schedule Standing Orders</h3>
        <p>Set these up in your banking app (day after payday is optimal):</p>
        <div className="not-prose border-l-2 border-white/15 bg-white/[0.02] px-5 py-4 my-6 font-mono text-xs text-zinc-500 space-y-1.5" style={{ borderColor: `${ACCENT}50` }}>
          <div>Payday + 1 day → Emergency Fund (£250)</div>
          <div>Payday + 1 day → Bills Account (£1,200)</div>
          <div>Payday + 1 day → Holiday Pot (£100)</div>
        </div>

        <h3>Step 4: Redirect Direct Debits</h3>
        <p>Contact each utility/subscription provider and update payment account to your Bills Account.</p>

        <h3>Step 5: Test and Adjust</h3>
        <p>Run the system for 2 months. Track:</p>
        <ul>
          <li>Do standing orders execute successfully?</li>
          <li>Is bills account balance sufficient?</li>
          <li>Are you comfortable with leftover spending money?</li>
        </ul>

        <h2>Advanced Automation Hacks</h2>

        <h3>The 1% Annual Increase</h3>
        <p>Set a calendar reminder to increase your savings standing order by 1% each year. Barely noticeable, massively compounding.</p>

        <h3>The Bonus Redirect</h3>
        <p>When you get a raise or bonus, immediately increase your automated savings by 50% of the increase. Lifestyle creep prevention built-in.</p>

        <h3>The Bill Consolidation Day</h3>
        <p>Where possible, move all bills to the same payment date (a few days after payday). Easier tracking, one monthly review.</p>

        <h2>What Not to Automate</h2>
        <ul>
          <li><strong>Debt overpayments</strong> — Automate minimums, but manually attack high-interest debt when you have extra</li>
          <li><strong>Groceries</strong> — Weekly spending varies; stay conscious</li>
          <li><strong>Discretionary fun</strong> — Keep this visible to maintain awareness</li>
        </ul>

        <h2>Common Automation Mistakes</h2>
        <ul>
          <li><strong>Automating before tracking</strong> — Know your numbers first</li>
          <li><strong>Setting amounts too aggressively</strong> — Start conservative, increase gradually</li>
          <li><strong>Forgetting to review quarterly</strong> — Life changes, automation should too</li>
          <li><strong>Ignoring failed payments</strong> — Set alerts for declined direct debits</li>
        </ul>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "If you went on holiday for a month without checking your bank, would your bills get paid and your savings grow?"
          </p>
          <p className="text-zinc-700 text-[10px] font-heading uppercase tracking-[0.2em] mt-5" style={{ color: `${ACCENT}80` }}>
            The ultimate automation test
          </p>
        </div>

        <h2>Your 30-Day Automation Challenge</h2>
        <ol>
          <li><strong>Week 1:</strong> Open a bills account and savings account</li>
          <li><strong>Week 2:</strong> Set up standing orders for savings and bills funding</li>
          <li><strong>Week 3:</strong> Redirect all direct debits to bills account</li>
          <li><strong>Week 4:</strong> Monitor the first full cycle and adjust</li>
        </ol>
        <p>By the end of next month, you'll have a financial system that runs itself. Willpower not required.</p>

        {/* ── CTA card — stark, no rounding ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] p-7 my-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}10` }}>
              <Calculator className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl uppercase tracking-widest text-white mb-2">Put It Into Practice</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                Calculate exactly how much you should automate for savings each month. Our Savings Calculator
                helps you plan your standing orders and reach your goals faster.
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