import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import emergencyJar from "@/assets/blog-emergency-jar.jpg";
import savingsGrowth from "@/assets/blog-savings-growth.jpg";

const ACCENT = "#38BDF8"; // Accumulate — sky blue
const RED    = "#F87171";
const GREEN  = "#34D399";

export default function EmergencyFund() {
  return (
    <>
      <SEO
        title="Building an Emergency Fund That Works - Financial Safety Net Guide"
        description="Learn how to build a 3-6 month emergency fund that protects you from financial disasters. Practical UK guide to creating your safety cushion."
        keywords="emergency fund, financial safety net, savings buffer, 3 month expenses, 6 month savings, UK emergency savings"
        canonicalUrl="/learn/emergency-fund"
      />

      <ArticleLayout
        title="Building an Emergency Fund That Works"
        description="Your financial safety net: why you need it and how to build it"
        readTime="30–60 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{ title: "How to Choose the Right Savings Account (UK)", path: "/learn/choose-savings-account" }}
      >

        <h2>What Is an Emergency Fund?</h2>
        <p>
          An emergency fund is a cash cushion designed to catch you when life pushes you off the edge. It's not
          an investment. It's not for holidays. It's financial insurance against the unexpected — and the
          unexpected always shows up.
        </p>

        <img
          src={emergencyJar}
          alt="Glass jar filled with coins and bills labeled Emergency Fund on wooden table"
          className="w-full my-10 opacity-60 grayscale-[20%]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />

        <h2>Why You Need One (Even If You Think You Don't)</h2>
        <p>"I'll just use my credit card" is the most expensive lie we tell ourselves. Here's what happens without an emergency fund:</p>

        {/* ── Debt spiral — red left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-8" style={{ borderColor: RED }}>
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: RED }}>The Debt Spiral</p>
          <div className="space-y-2">
            {[
              "Car breaks down (£600 repair)",
              "Credit card pays for it at 22.9% APR",
              "Can only afford minimum payments",
              "Costs you £1,100+ over 3 years",
              "Next emergency hits before you've recovered",
              "Debt compounds, stress escalates",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="font-display text-2xl leading-none shrink-0 tabular-nums" style={{ color: RED, opacity: 0.25 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-zinc-500 text-sm font-sans pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <p>An emergency fund breaks that cycle. It turns crises into inconveniences.</p>

        <h2>How Much Do You Really Need?</h2>
        <p>The standard advice is 3–6 months of essential expenses. But let's get specific:</p>

        {/* ── Three tiers — left colour bar ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { months: "3",  label: "Minimum Viable Buffer", color: "#F59E0B", who: ["Stable job", "Dual income household", "Low fixed costs", "Good support network"] },
            { months: "6",  label: "Solid Safety Net",      color: ACCENT,    who: ["Single income", "Freelance/contract work", "High fixed costs", "Dependents"] },
            { months: "12", label: "Maximum Security",      color: GREEN,     who: ["Self-employed", "Volatile income", "Health concerns", "Major life changes ahead"] },
          ].map(({ months, label, color, who }) => (
            <div key={months} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: color }} />
              <div className="flex-1 flex items-start gap-6 px-6 py-5">
                <div className="shrink-0">
                  <p className="font-display text-5xl leading-none" style={{ color }}>{months}</p>
                  <p className="text-zinc-700 text-[9px] font-heading uppercase tracking-widest mt-1">months</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/60 mb-3">{label}</p>
                  <ul className="space-y-1">
                    {who.map(w => (
                      <li key={w} className="flex items-start gap-2 text-xs text-zinc-600 font-sans">
                        <span style={{ color }} className="shrink-0 mt-px">→</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Step 1: Calculate Your Target</h2>
        <p>Don't use your total income. Calculate your <strong>essential monthly expenses</strong>:</p>

        {/* ── Expense calculator — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Monthly Essentials Worksheet</p>
          <div className="divide-y divide-white/5">
            {[
              "Housing (rent/mortgage)",
              "Utilities (gas, electric, water, internet)",
              "Groceries (essential food only)",
              "Transport (minimum to function)",
              "Insurance (health, car if required)",
              "Minimum debt payments",
              "Essential subscriptions (phone, etc.)",
            ].map(item => (
              <div key={item} className="flex justify-between items-center py-3">
                <span className="text-zinc-500 text-sm font-sans">{item}</span>
                <span className="font-mono text-xs text-white/15 tracking-widest">______</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-3 border-t border-white/15 mt-1">
              <span className="font-heading text-[10px] uppercase tracking-widest text-white/50">Monthly Essential Total</span>
              <span className="font-mono text-xs text-white/30 tracking-widest">______</span>
            </div>
          </div>
          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Multiply by 3, 6, or 12 depending on your risk profile. That's your emergency fund target.
          </p>
        </div>

        <h2>Step 2: Where to Keep It</h2>
        <p>Your emergency fund needs to be accessible but not <em>too</em> accessible (no debit card attached). In the UK, consider:</p>
        <ul>
          <li><strong>Easy-access savings accounts</strong> — Instant withdrawal, 3–5% interest (2024 rates)</li>
          <li><strong>Cash ISAs</strong> — Tax-free gains if you're hitting the savings limit</li>
          <li><strong>Premium Bonds</strong> — No interest but potential prizes, backed by government</li>
          <li><strong>NOT in stocks</strong> — Volatility defeats the purpose</li>
          <li><strong>NOT in your current account</strong> — Too tempting to spend</li>
        </ul>

        <h2>Step 3: Build It (Without Feeling the Pain)</h2>
        <p>If your target is £9,000 (6 months × £1,500 essentials), that sounds impossible. Break it down:</p>

        <img
          src={savingsGrowth}
          alt="Person holding smartphone showing savings account with growing balance chart"
          className="w-full my-10 opacity-60 grayscale-[20%]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />

        {/* ── £1,000 milestone — left green border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: GREEN }}>
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: GREEN }}>The £1,000 First Milestone</p>
          <p className="text-zinc-500 text-sm mb-4">Before tackling the full fund, aim for £1,000. This covers 80% of common emergencies:</p>
          <ul className="space-y-1.5 mb-4">
            {["Broken boiler", "Car repair", "Vet bill", "Replacement appliance"].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-500 font-sans">
                <span style={{ color: GREEN }} className="shrink-0">→</span> {i}
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 text-sm font-sans">
            At £50/week = 5 months. At £100/week = 2.5 months. Achievable? Yes. Life-changing? Absolutely.
          </p>
        </div>

        <h3>Automation Strategies:</h3>
        <ol>
          <li><strong>Set and forget</strong> — Auto-transfer on payday before you "see" the money</li>
          <li><strong>Round-up apps</strong> — Moneybox, Plum, etc. save spare change automatically</li>
          <li><strong>Windfall rule</strong> — 50% of bonuses, tax refunds, gifts go straight to the fund</li>
          <li><strong>Side hustle earmark</strong> — All extra income = emergency fund until target hit</li>
        </ol>

        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li><strong>Using it for "emergencies" like sales</strong> — If it was planned, it's not an emergency</li>
          <li><strong>Not replenishing after use</strong> — Rebuild immediately</li>
          <li><strong>Chasing high interest at cost of access</strong> — Liquidity &gt; an extra 0.5%</li>
          <li><strong>Stopping once you hit the target</strong> — Keep the habit, redirect to other goals</li>
        </ul>

        <h2>What Counts as an Emergency?</h2>

        {/* ── Real vs not real — flush two-col ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: GREEN }}>✓ Real Emergencies</p>
            <ul className="space-y-2">
              {["Job loss", "Medical crisis", "Essential car/home repair", "Emergency travel (family crisis)", "Broken appliance you need daily"].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: GREEN }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest text-red-400 mb-4">✗ Not Emergencies</p>
            <ul className="space-y-2">
              {["Holiday deals", "Black Friday sales", '"I deserve a treat"', "Predictable annual costs (MOT, gifts)", "New phone because current is slow"].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span className="text-red-500 shrink-0 mt-px">✗</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Once You're Fully Funded</h2>
        <p>Hitting your emergency fund target is a massive achievement. Now what?</p>
        <ol>
          <li><strong>Celebrate</strong> — Seriously, acknowledge this win</li>
          <li><strong>Redirect contributions</strong> — Same auto-save, different account (debt payoff or investing)</li>
          <li><strong>Review annually</strong> — Life changes, expenses rise — adjust your target</li>
          <li><strong>Keep it sacred</strong> — This is your safety net, not a piggy bank</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "You know your emergency fund is working when your first thought during a crisis isn't 'How will I afford this?' but 'Which account do I transfer from?'"
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            That's financial security
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
                Work out exactly how long it will take to build your emergency fund based on your monthly savings.
                Use our calculator to create a realistic timeline and stay motivated.
              </p>
              <Link to="/finance/how-long-to-save"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Savings Timeline Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}