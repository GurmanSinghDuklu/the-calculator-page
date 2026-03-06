import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Leaf, Heart, Globe, ArrowRight } from "lucide-react";

const ACCENT = "#A78BFA"; // Thrive — violet

export default function EthicalInvesting() {
  return (
    <>
      <SEO
        title="Giving Back and Ethical Investing - Purpose-Driven Wealth"
        description="Explore ethical investing, ESG funds, and giving strategies. Learn how to align your investments with your values without sacrificing returns."
        keywords="ethical investing UK, ESG funds, sustainable investing, impact investing, socially responsible investing, charity giving, philanthropy"
        canonicalUrl="/learn/ethical-investing"
      />

      <ArticleLayout
        publishDate="2025-04-23"
        title="Giving Back and Ethical Investing"
        description="Purpose-driven wealth allocation"
        readTime="20 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
        nextArticle={{ title: "How to Teach Money Skills to Others", path: "/learn/teach-money-skills" }}
      >

        <h2>Wealth With Purpose</h2>
        <p>
          Building wealth isn't just about the numbers — it's about what that wealth enables.
          Whether through ethical investing, charitable giving, or both, you can align your
          financial life with your values.
        </p>

        <h2>Understanding Ethical Investing</h2>

        <h3>What Is ESG?</h3>

        {/* ── ESG breakdown — flush box with left bar ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] my-8">
          <div className="flex gap-0">
            <div className="w-1 shrink-0" style={{ background: ACCENT }} />
            <div className="flex-1 px-6 py-5">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
                <Leaf className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Environmental, Social, Governance</p>
              </div>
              <div className="divide-y divide-white/6">
                {[
                  { label: "Environmental", desc: "Climate impact, carbon emissions, renewable energy, waste management" },
                  { label: "Social",        desc: "Labour practices, diversity, community impact, human rights" },
                  { label: "Governance",    desc: "Executive pay, board diversity, corruption, shareholder rights" },
                ].map(({ label, desc }) => (
                  <div key={label} className="py-4 flex items-start gap-4">
                    <p className="font-heading text-[10px] uppercase tracking-widest text-white/50 w-28 shrink-0 pt-0.5">{label}</p>
                    <p className="text-zinc-500 text-sm font-sans">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h3>Approaches to Ethical Investing</h3>
        <ul>
          <li><strong>Negative screening:</strong> Exclude harmful industries (tobacco, weapons, fossil fuels, gambling)</li>
          <li><strong>Positive screening:</strong> Actively invest in beneficial companies (renewable energy, healthcare, education)</li>
          <li><strong>ESG integration:</strong> Consider ESG factors alongside financial factors in all investment decisions</li>
          <li><strong>Impact investing:</strong> Invest specifically to create measurable positive impact (often private markets)</li>
        </ul>

        <h2>Do Ethical Investments Underperform?</h2>
        <p>The short answer: not necessarily. Research shows mixed results, but many ESG funds have performed in line with or better than traditional funds.</p>

        {/* ── Key considerations — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Key Considerations</p>
          <div className="space-y-2.5">
            {[
              { good: true,  text: "ESG factors can indicate quality management and lower risk" },
              { good: true,  text: "Avoiding stranded assets (fossil fuel companies) may protect returns" },
              { good: true,  text: "Growing demand for ESG investments drives performance" },
              { good: null,  text: "Fewer companies = less diversification" },
              { good: null,  text: "ESG funds often have higher fees than broad index funds" },
              { good: null,  text: '"Greenwashing" — not all ESG funds are equally ethical' },
            ].map(({ good, text }) => (
              <div key={text} className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 text-xs font-heading" style={{ color: good ? ACCENT : "#F59E0B" }}>
                  {good ? "✓" : "⚠"}
                </span>
                <p className="text-zinc-500 text-sm font-sans">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Ethical Investment Options in the UK</h2>

        <h3>ESG Index Funds & ETFs</h3>
        <ul>
          <li><strong>Vanguard ESG Global All Cap:</strong> Low-cost, broad ESG screening</li>
          <li><strong>iShares MSCI World ESG Screened:</strong> Global developed markets</li>
          <li><strong>Legal & General Future World ESG:</strong> Developed markets focus</li>
        </ul>

        <h3>Active ESG Funds</h3>
        <ul>
          <li><strong>Impax Environmental Markets:</strong> Environmental solutions focus</li>
          <li><strong>Liontrust Sustainable Future:</strong> Range of sustainability funds</li>
          <li><strong>Baillie Gifford Positive Change:</strong> Impact-focused growth</li>
        </ul>

        <h2>Charitable Giving Strategies</h2>

        {/* ── Tax-efficient giving — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-5">
            <Heart className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Tax-Efficient Giving</p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              { method: "Gift Aid",             desc: "Charities claim 25% extra on your donation. £100 gift = £125 for charity." },
              { method: "Higher Rate Relief",   desc: "Higher rate taxpayers can claim additional 20% back through their tax return." },
              { method: "Payroll Giving",        desc: "Donate before tax. £100 from gross salary = only ~£60 cost to you." },
              { method: "Donating Shares",       desc: "No capital gains tax on shares donated to charity + income tax relief." },
            ].map(({ method, desc }) => (
              <div key={method} className="py-3.5">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{method}</p>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h3>How Much to Give?</h3>
        <p>There's no right answer, but common frameworks include:</p>
        <ul>
          <li><strong>1% for the Planet:</strong> 1% of income to environmental causes</li>
          <li><strong>Giving What We Can:</strong> 10% pledge for effective charities</li>
          <li><strong>Tithing:</strong> Traditional 10% of income</li>
          <li><strong>Percentage of wealth:</strong> Annual giving from investment returns</li>
        </ul>

        <h2>Effective Altruism</h2>

        {/* ── EA principles — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/6">
            <Globe className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Maximising Impact</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">Effective altruism asks: "How can I do the most good with my resources?" Key principles:</p>
          <div className="space-y-2 mb-4">
            {[
              "Focus on evidence-based interventions",
              "Prioritise neglected causes",
              "Consider cost-effectiveness (lives saved per £)",
              "Think globally — your pound goes further in developing countries",
            ].map(p => (
              <div key={p} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {p}
              </div>
            ))}
          </div>
          <p className="text-zinc-700 text-xs font-sans pt-4 border-t border-white/6">Resources: GiveWell, Giving What We Can, 80,000 Hours</p>
        </div>

        <h2>Creating Your Giving Plan</h2>
        <ol>
          <li><strong>Identify your values:</strong> What causes matter most to you?</li>
          <li><strong>Set a giving budget:</strong> What percentage of income or wealth?</li>
          <li><strong>Research charities:</strong> Use evaluators like Charity Navigator, GiveWell</li>
          <li><strong>Consider recurring gifts:</strong> Monthly donations are often more valuable to charities</li>
          <li><strong>Track your giving:</strong> See your cumulative impact over time</li>
        </ol>

        <h2>Balancing Ethics and Returns</h2>
        <p>You don't have to sacrifice returns entirely for ethics:</p>
        <ul>
          <li><strong>Core + Satellite:</strong> Most money in standard index funds, some in higher-cost ESG or impact investments</li>
          <li><strong>Low-cost ESG:</strong> Use ESG index funds to minimise fee drag</li>
          <li><strong>Focus giving, not investing:</strong> Invest purely for returns, then give a percentage to causes you care about</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Review your current investments — do they align with your values?</li>
          <li>Research ESG fund options available in your ISA/pension</li>
          <li>Decide on a giving target (even 1% is meaningful)</li>
          <li>Set up regular donations to causes you care about</li>
          <li>Ensure you're claiming Gift Aid and tax relief</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "A simple ESG fund beats analysis paralysis. A regular £20/month donation beats a promised future windfall."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Start somewhere. Refine later.
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
                Use our Compound Interest Calculator to see how even a small percentage of your
                investment returns could grow a charitable giving fund over time.
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