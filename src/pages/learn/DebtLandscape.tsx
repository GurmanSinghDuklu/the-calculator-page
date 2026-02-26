import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, ClipboardList, AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";

const ACCENT = "#F59E0B"; // Pay Off — amber
const RED    = "#F87171";

export default function DebtLandscape() {
  return (
    <>
      <SEO
        title="Understanding Your Debt Landscape - List, Categorize and Prioritize"
        description="Take control of your debt by creating a complete inventory. Learn how to categorize good vs bad debt, prioritize repayment, and create your debt freedom roadmap."
        keywords="debt inventory, debt prioritization, good debt vs bad debt, debt management UK, debt freedom, debt list, paying off debt"
        canonicalUrl="/learn/debt-landscape"
      />

      <ArticleLayout
        title="Understanding Your Debt Landscape"
        description="List, categorise and prioritise debts"
        readTime="30 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{ title: "Snowball vs Avalanche", path: "/learn/snowball-avalanche" }}
      >

        <h2>Why You Need a Complete Picture</h2>
        <p>
          You can't navigate out of debt without a map. Most people have a vague sense of what
          they owe, but rarely know the exact totals, interest rates, and minimum payments. This
          knowledge gap keeps them stuck.
        </p>

        {/* ── Debt inventory callout — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Debt Inventory</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Today, you'll create a complete inventory of every debt you have. This might feel
            uncomfortable, but knowledge is power. You can't solve a problem you haven't fully
            acknowledged.
          </p>
        </div>

        <h2>Gathering Your Information</h2>
        <p>For each debt, you need to know:</p>
        <ul>
          <li><strong>Creditor name</strong> — Who do you owe?</li>
          <li><strong>Current balance</strong> — How much do you owe?</li>
          <li><strong>Interest rate (APR)</strong> — What does it cost you?</li>
          <li><strong>Minimum payment</strong> — What must you pay monthly?</li>
          <li><strong>Payment due date</strong> — When is it due?</li>
          <li><strong>Type of debt</strong> — Credit card, loan, overdraft, etc.</li>
        </ul>

        <h2>Common Debt Types</h2>

        {/* ── Debt inventory table — editorial ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">
            Debt Inventory Template
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-white/8">
                  {["Creditor", "Balance", "APR", "Min Payment", "Due Date"].map((h, i) => (
                    <th key={h} className={`pb-3 text-[9px] font-heading uppercase tracking-widest text-white/20 ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { creditor: "Credit Card A", balance: "£3,500", apr: "22.9%", min: "£85",       due: "15th"    },
                  { creditor: "Overdraft",      balance: "£1,200", apr: "39.9%", min: "Int. only", due: "Ongoing" },
                  { creditor: "Car Loan",       balance: "£8,000", apr: "7.9%",  min: "£220",      due: "1st"     },
                ].map(({ creditor, balance, apr, min, due }) => (
                  <tr key={creditor}>
                    <td className="py-3.5 text-zinc-400">{creditor}</td>
                    <td className="py-3.5 text-right font-heading text-sm" style={{ color: ACCENT }}>{balance}</td>
                    <td className="py-3.5 text-right text-zinc-500 text-xs">{apr}</td>
                    <td className="py-3.5 text-right text-zinc-500">{min}</td>
                    <td className="py-3.5 text-right text-zinc-600 text-xs">{due}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/10">
                  <td className="py-3.5 font-heading text-[10px] uppercase tracking-widest text-white/40">Total</td>
                  <td className="py-3.5 text-right font-heading text-sm text-white/70">£12,700</td>
                  <td className="py-3.5 text-right text-zinc-700">—</td>
                  <td className="py-3.5 text-right font-heading text-sm text-white/70">£305+</td>
                  <td className="py-3.5 text-right text-zinc-700">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>Good Debt vs Toxic Debt</h2>
        <p>Not all debt is created equal:</p>

        <h3>"Good" Debt (Strategic)</h3>
        <ul>
          <li><strong>Mortgage:</strong> Builds equity, typically low rates, asset appreciation</li>
          <li><strong>Student loans:</strong> Investment in earning potential (Plan 1/2 terms matter)</li>
          <li><strong>Business loans:</strong> When used for income-generating purposes</li>
        </ul>

        <h3>"Neutral" Debt (Situational)</h3>
        <ul>
          <li><strong>0% credit cards:</strong> Only if paid before promo ends</li>
          <li><strong>Car finance:</strong> Depends on rate and necessity</li>
          <li><strong>0% Buy Now Pay Later:</strong> Only if planned and tracked</li>
        </ul>

        <h3>"Toxic" Debt (Prioritize Elimination)</h3>

        {/* ── Toxic debt — red left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-6 flex items-start gap-4" style={{ borderColor: RED }}>
          <AlertTriangle className="h-4 w-4 shrink-0 mt-1" style={{ color: RED }} />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: RED }}>High-Priority Debt</p>
            <div className="space-y-2">
              {[
                ["Overdrafts",                    "Often 35–40% APR, disguised as convenience"],
                ["Store cards",                   "Typically 25–30% APR"],
                ["Payday loans",                  "Can exceed 1,000% APR"],
                ["Catalogue credit",              "High rates, minimum payments trap"],
                ["Credit cards (carrying balance)","18–30% typical"],
              ].map(([type, note]) => (
                <p key={type} className="text-sm font-sans text-zinc-500">
                  <strong className="text-zinc-300">{type}:</strong> {note}
                </p>
              ))}
            </div>
          </div>
        </div>

        <h2>The True Cost of Minimum Payments</h2>
        <p>Minimum payments are designed to keep you in debt. Credit card companies love them.</p>

        {/* ── Min payment comparison — flush two-col ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <TrendingDown className="h-4 w-4 shrink-0" style={{ color: RED }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">
              Example: £3,000 Credit Card at 22% APR
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/8">
            <div className="bg-black px-5 py-4">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/30 mb-3">Minimum Payments Only</p>
              <div className="space-y-2">
                {[["Time to pay off", "27 years"], ["Total interest", "£4,400"], ["Total repaid", "£7,400"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-zinc-600 text-xs font-sans">{k}</span>
                    <span className="font-heading text-xs" style={{ color: RED }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black px-5 py-4">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/30 mb-3">Fixed £100/month</p>
              <div className="space-y-2">
                {[["Time to pay off", "3 years"], ["Total interest", "£600"], ["Total repaid", "£3,600"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-zinc-600 text-xs font-sans">{k}</span>
                    <span className="font-heading text-xs" style={{ color: ACCENT }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="font-heading text-xs uppercase tracking-widest mt-4 pt-4 border-t border-white/6" style={{ color: ACCENT }}>
            Difference: £3,800 saved — 24 years faster
          </p>
        </div>

        <h2>Prioritization Frameworks</h2>
        <p>Once you have your inventory, decide how to attack:</p>

        <h3>By Interest Rate (Avalanche)</h3>
        <p>Pay off highest APR first. Mathematically optimal, saves most money.</p>

        <h3>By Balance (Snowball)</h3>
        <p>Pay off smallest balance first. Psychologically powerful, builds momentum.</p>

        <h3>By Emotional Weight</h3>
        <p>
          Some debts feel worse than others (money owed to family, payday loans with shame
          attached). Consider tackling these first for mental freedom.
        </p>

        <h2>Quick Wins Before Deep Strategy</h2>
        <ol>
          <li><strong>Balance transfer:</strong> Move high-rate credit cards to 0% offers</li>
          <li><strong>Consolidation:</strong> Combine multiple debts into one lower-rate loan</li>
          <li><strong>Overdraft switch:</strong> Move to a bank offering arranged overdraft at lower rates</li>
          <li><strong>Negotiate:</strong> Call creditors — they sometimes reduce rates or offer hardship plans</li>
        </ol>

        <h2>Action Steps</h2>
        <ol>
          <li>Create a spreadsheet or use paper with all your debts</li>
          <li>Log into every account and get exact balances and APRs</li>
          <li>Calculate your total debt and total minimum payments</li>
          <li>Identify your highest-rate debt</li>
          <li>Check if you qualify for any 0% balance transfers</li>
          <li>Read the next article on Snowball vs Avalanche strategies</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Update your debt inventory monthly. Watching balances decrease is incredibly motivating."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Stay connected to your progress
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
                Use our Credit Card Payoff Calculator to see exactly how long it will take to
                become debt-free and how much you'll pay in interest.
              </p>
              <Link to="/finance/credit-card-payoff"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Credit Card Payoff Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}