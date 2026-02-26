import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Shield, Banknote, Gift, ArrowRight } from "lucide-react";

const ACCENT = "#34D399"; // Invest — emerald
const VIOLET = "#A78BFA";
const SKY    = "#38BDF8";

export default function TaxEfficientAccounts() {
  return (
    <>
      <SEO
        title="Tax-Efficient Accounts: ISAs, SIPPs & More - UK Guide"
        description="Comprehensive guide to UK tax wrappers including ISAs, SIPPs, and LISAs. Learn how to minimize tax on your investments and maximize your returns legally."
        keywords="ISA explained, SIPP pension, LISA UK, tax efficient investing, tax wrappers UK, Stocks and Shares ISA, pension tax relief"
        canonicalUrl="/learn/tax-efficient-accounts"
      />

      <ArticleLayout
        title="Tax-Efficient Accounts (ISAs, SIPPs)"
        description="UK-specific tax wrappers explained"
        readTime="25 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{ title: "How to Rebalance and Review Your Portfolio", path: "/learn/portfolio-rebalancing" }}
      >

        <h2>Why Tax Efficiency Matters</h2>
        <p>
          Tax can take a significant chunk of your investment returns. The UK government offers
          several "tax wrappers" that let you invest without paying tax on gains or income.
          Using these properly can save you tens of thousands over your lifetime.
        </p>

        <h2>ISAs (Individual Savings Accounts)</h2>

        {/* ── ISA advantage — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The ISA Advantage</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">
            Everything inside an ISA grows completely tax-free. No capital gains tax, no dividend
            tax, no income tax. Ever.
          </p>
          <ul className="space-y-2">
            {[
              "Annual allowance: £20,000 per tax year",
              "Use it or lose it — unused allowance doesn't roll over",
              "Can withdraw anytime (except LISA before 60)",
              "Multiple ISA types can be used in same year",
            ].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <h3>Types of ISAs</h3>

        {/* ── ISA types — left bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { type: "Cash ISA",              badge: "Short-Term",  desc: "Tax-free interest on cash savings. Best for emergency funds or short-term goals if you're near your Personal Savings Allowance.",        color: SKY    },
            { type: "Stocks & Shares ISA",   badge: "Long-Term",   desc: "Tax-free growth on investments. Best for long-term wealth building. Most valuable for higher earners and larger portfolios.",            color: ACCENT },
            { type: "Lifetime ISA (LISA)",   badge: "25% Bonus",   desc: "25% government bonus on contributions (up to £1,000/year free). For first home purchase or retirement after 60. Penalties if withdrawn early.", color: VIOLET },
            { type: "Innovative Finance ISA",badge: "Higher Risk",  desc: "Tax-free interest on peer-to-peer lending. Higher risk, specialist product.",                                                           color: "#F59E0B" },
          ].map(({ type, badge, desc, color }) => (
            <div key={type} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: color }} />
              <div className="flex-1 flex items-start gap-5 px-6 py-4">
                <div className="shrink-0 w-36">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55">{type}</p>
                  <p className="text-[9px] font-heading uppercase tracking-widest mt-0.5" style={{ color }}>{badge}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Pensions (SIPPs)</h2>

        {/* ── Pension advantage — left emerald border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <Banknote className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Pension Advantage</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">
            Pensions offer tax relief on the way in AND tax-free growth. They're the most
            powerful tax wrapper available, but with restrictions on access.
          </p>
          <ul className="space-y-2">
            {[
              "Tax relief at your marginal rate (20–45%)",
              "£100 in costs you £80 (basic rate) or £60 (higher rate)",
              "Tax-free growth inside the pension",
              "25% tax-free lump sum at retirement",
              "Access from age 55 (rising to 57 in 2028)",
            ].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <h3>Workplace Pension vs SIPP</h3>

        {/* ── Workplace vs SIPP — flush two-col ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Workplace Pension</p>
            <ul className="space-y-2">
              {[
                ["Employer contributions", "Free money — never leave it on the table"],
                ["Automatic tax relief",   "Handled by your employer"],
                ["Limited investment choices", ""],
                ["May have higher fees",   ""],
              ].map(([label, note]) => (
                <li key={label as string} className="flex items-start gap-2 text-xs font-sans text-zinc-500">
                  <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span>
                  <span>{label}{note ? <span className="text-zinc-700"> — {note}</span> : ""}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest mb-4" style={{ color: SKY }}>SIPP (Personal Pension)</p>
            <ul className="space-y-2">
              {[
                ["You choose the provider",    "Full flexibility"],
                ["Full investment flexibility", ""],
                ["Often lower fees",            ""],
                ["No employer match",           "Unless employer agrees to pay in"],
              ].map(([label, note]) => (
                <li key={label as string} className="flex items-start gap-2 text-xs font-sans text-zinc-500">
                  <span style={{ color: SKY }} className="shrink-0 mt-px">→</span>
                  <span>{label}{note ? <span className="text-zinc-700"> — {note}</span> : ""}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Best strategy callout ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-6" style={{ borderColor: ACCENT }}>
          <p className="text-zinc-500 text-sm font-sans">
            <strong className="text-zinc-300">Best strategy:</strong> Max out workplace pension employer match, then use a SIPP for additional contributions if you want better investment options.
          </p>
        </div>

        <h2>LISA: The Hybrid Option</h2>

        {/* ── LISA details — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Gift className="h-4 w-4 shrink-0" style={{ color: VIOLET }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: VIOLET }}>Lifetime ISA Details</p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              { label: "Who Can Open",            value: "Ages 18–39 (can contribute until 50)" },
              { label: "Contribution Limit",       value: "£4,000/year (counts toward £20k ISA allowance)" },
              { label: "Government Bonus",         value: "25% on contributions = up to £1,000 free per year" },
              { label: "Qualifying Purposes",      value: "First home (up to £450k) or retirement after 60" },
              { label: "Early Withdrawal Penalty", value: "25% on total — you lose the bonus plus 6.25% of your own money" },
            ].map(({ label, value }) => (
              <div key={label} className="py-3.5 flex items-start gap-5">
                <p className="font-heading text-[9px] uppercase tracking-widest text-white/25 shrink-0 w-36">{label}</p>
                <p className="text-zinc-500 text-sm font-sans">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Priority Order for Contributions</h2>

        {/* ── Priority — numbered sequence ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { label: "Workplace pension to full employer match", note: "Free money. Never leave employer matching on the table." },
            { label: "LISA if buying first home",                note: "25% bonus is unbeatable for a house deposit." },
            { label: "Stocks & Shares ISA",                     note: "Flexible, tax-free, no access restrictions." },
            { label: "Additional pension contributions",         note: "Especially valuable for higher rate taxpayers." },
            { label: "General Investment Account",               note: "Only after ISA allowance is used." },
          ].map(({ label, note }, i) => (
            <div key={label} className="flex items-start gap-5 px-6 py-4 bg-black hover:bg-white/[0.015] transition-colors">
              <span className="font-display text-3xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-0.5">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-0.5">{label}</p>
                <p className="text-zinc-600 text-xs font-sans">{note}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Tax Relief for Higher Earners</h2>
        <p>If you're a higher (40%) or additional (45%) rate taxpayer, pension contributions are incredibly powerful:</p>
        <ul>
          <li>£100 in pension costs you only £60 (40% tax relief)</li>
          <li>Salary sacrifice adds NI savings (~12% more)</li>
          <li>You can reclaim additional relief through tax return</li>
          <li>Consider whether to use ISA or pension based on future tax rates</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Check if you're getting full employer pension match</li>
          <li>Open a Stocks & Shares ISA if you don't have one</li>
          <li>If under 40 and buying first home, consider a LISA</li>
          <li>Calculate how much of your £20k ISA allowance you're using</li>
          <li>For higher earners: Review if additional pension contributions make sense</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "The tax year runs April to April. Set up regular monthly ISA contributions — don't leave them to a March panic."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Months of missed growth are gone forever
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
                Use our Retirement Calculator to see how different pension contribution levels
                and tax relief rates affect your retirement fund.
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