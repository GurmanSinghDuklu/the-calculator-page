import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Landmark, Percent, Shield, ArrowRight } from "lucide-react";

const ACCENT = "#38BDF8"; // Accumulate — sky blue

export default function ChooseSavingsAccount() {
  return (
    <>
      <SEO
        title="How to Choose the Right Savings Account (UK) - ISA vs Regular Savings"
        description="Compare UK savings accounts including Cash ISAs, easy access, notice accounts, and fixed-rate bonds. Find the best place to park your cash with our comprehensive guide."
        keywords="UK savings account, Cash ISA, best savings rates, easy access savings, fixed rate bonds, FSCS protection, savings comparison UK"
        canonicalUrl="/learn/choose-savings-account"
      />

      <ArticleLayout
        title="How to Choose the Right Savings Account (UK)"
        description="ISA vs regular saving — where to park cash"
        readTime="20 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{ title: "Inflation: The Silent Thief", path: "/learn/inflation-guide" }}
      >

        <h2>Why Account Choice Matters</h2>
        <p>
          Not all savings accounts are equal. The right choice can mean hundreds of pounds more in
          interest each year, tax-free growth, and the flexibility you need. The wrong choice means
          your money sits earning nothing while inflation erodes its value.
        </p>

        <h2>Types of UK Savings Accounts</h2>

        <h3>1. Easy Access Accounts</h3>
        <p>Withdraw anytime with no penalties. Best for emergency funds and money you might need quickly.</p>
        <ul>
          <li><strong>Pros:</strong> Flexibility, instant access, simple</li>
          <li><strong>Cons:</strong> Usually lower interest rates</li>
          <li><strong>Best for:</strong> Emergency fund, short-term savings</li>
        </ul>

        <h3>2. Notice Accounts</h3>
        <p>Require 30–90+ days notice before withdrawal. Trade some flexibility for better rates.</p>
        <ul>
          <li><strong>Pros:</strong> Higher rates than easy access</li>
          <li><strong>Cons:</strong> Must plan withdrawals in advance</li>
          <li><strong>Best for:</strong> Known future expenses, sinking funds</li>
        </ul>

        <h3>3. Fixed Rate Bonds</h3>
        <p>Lock money away for 1–5 years at a guaranteed rate. Best rates but no access.</p>
        <ul>
          <li><strong>Pros:</strong> Best rates, guaranteed return</li>
          <li><strong>Cons:</strong> Can't access money until maturity</li>
          <li><strong>Best for:</strong> House deposit savings, known future expenses</li>
        </ul>

        <h3>4. Regular Saver Accounts</h3>
        <p>High rates (4–8%) but limited to fixed monthly deposits (usually £100–500/month).</p>
        <ul>
          <li><strong>Pros:</strong> Excellent rates, builds saving habit</li>
          <li><strong>Cons:</strong> Limited deposit amounts, often tied to current accounts</li>
          <li><strong>Best for:</strong> Building savings habit, maximising returns on small amounts</li>
        </ul>

        <h2>Understanding Cash ISAs</h2>

        {/* ── ISA types — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Tax-Free Savings</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">
            Individual Savings Accounts (ISAs) let you save up to £20,000 per tax year with no tax
            on the interest. The allowance resets each April.
          </p>
          <ul className="space-y-2.5">
            {[
              ["Cash ISA",               "Tax-free interest on cash savings"],
              ["Stocks & Shares ISA",    "Tax-free investment growth"],
              ["Lifetime ISA",           "25% government bonus (restrictions apply)"],
              ["Innovative Finance ISA", "Peer-to-peer lending"],
            ].map(([type, desc]) => (
              <li key={type} className="flex items-start gap-2 text-sm font-sans">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span>
                <span className="text-zinc-500"><strong className="text-zinc-300">{type}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3>Do You Need an ISA?</h3>
        <p>
          Thanks to the Personal Savings Allowance, basic rate taxpayers can earn £1,000 in interest
          tax-free, and higher rate taxpayers £500. If your savings generate less than this, a
          non-ISA account with higher rates might be better.
        </p>

        {/* ── Quick calculation — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-3">
            <Percent className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Quick Calculation</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            At 5% interest, you'd need £20,000 saved to hit the £1,000 PSA threshold. Below that,
            focus on getting the best rate regardless of ISA status. Above that, ISAs become more valuable.
          </p>
        </div>

        <h2>FSCS Protection</h2>
        <p>
          The Financial Services Compensation Scheme protects up to £85,000 per person, per banking
          group. If a bank fails, your money is guaranteed.
        </p>
        <ul>
          <li>Check your bank is FSCS protected</li>
          <li>Spread larger amounts across multiple banking groups</li>
          <li>Some banking brands share the same licence (e.g. Halifax/Lloyds/BoS)</li>
        </ul>

        <h2>Finding the Best Rates</h2>

        {/* ── Where to compare — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <Landmark className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Where to Compare</p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              ["MoneySavingExpert",         "Best comprehensive comparisons"],
              ["MoneySupermarket",          "Good for quick comparisons"],
              ["Bank of England base rate", "Benchmark for savings rates"],
            ].map(([name, desc]) => (
              <div key={name} className="flex items-start gap-3 py-3">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px text-xs">→</span>
                <p className="text-zinc-500 text-sm font-sans">
                  <strong className="text-zinc-300">{name}:</strong> {desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Check rates monthly — they change frequently, especially when base rates move.
          </p>
        </div>

        <h2>A Practical Savings Strategy</h2>
        <p>Consider a "ladder" approach using multiple accounts:</p>
        <ol>
          <li><strong>Instant Access (1–2 months expenses):</strong> Easy access for true emergencies</li>
          <li><strong>Notice Account (rest of emergency fund):</strong> Better rate, 30-day buffer</li>
          <li><strong>Regular Saver:</strong> Max out monthly allowance for best rates</li>
          <li><strong>Fixed Rate:</strong> For money you won't need for 1+ years</li>
          <li><strong>Cash ISA:</strong> Use allowance if you're near/over PSA threshold</li>
        </ol>

        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li><strong>Leaving money in 0.1% accounts</strong> — The biggest sin in savings</li>
          <li><strong>Chasing rates without reading terms</strong> — Watch for bonus rate periods</li>
          <li><strong>Forgetting about expiring bonuses</strong> — Diary when introductory rates end</li>
          <li><strong>Splitting across too many accounts</strong> — Keep it manageable</li>
          <li><strong>Not using ISA allowance when beneficial</strong> — Use it or lose it</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Check your current savings account rate (many people don't know)</li>
          <li>Calculate how much interest you're earning annually</li>
          <li>Compare best buys for your savings type</li>
          <li>Open a better account if you find 0.5%+ improvement</li>
          <li>Set a calendar reminder to review rates quarterly</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Moving from 0.1% to 4% matters far more than agonising over 4.5% vs 4.6%."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Take action quickly. Optimise later.
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
                Use our Savings Calculator to see how different interest rates compound over time
                and the real difference rate shopping makes.
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