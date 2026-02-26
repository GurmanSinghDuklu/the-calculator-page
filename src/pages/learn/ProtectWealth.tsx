import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Shield, FileText, Users, ArrowRight } from "lucide-react";

const ACCENT = "#A78BFA"; // Thrive — violet
const GREEN  = "#34D399";
const RED    = "#F87171";

export default function ProtectWealth() {
  return (
    <>
      <SEO
        title="Protecting Your Wealth: Insurance & Wills - UK Guide"
        description="Essential guide to protecting your wealth and family through insurance, wills, and estate planning. Learn what coverage you need and how to prepare for the unexpected."
        keywords="life insurance UK, income protection, will writing, estate planning, wealth protection, critical illness cover, family protection UK"
        canonicalUrl="/learn/protect-wealth"
      />

      <ArticleLayout
        title="Protecting Your Wealth (Insurance & Wills)"
        description="Risk management and family protection"
        readTime="20–30 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
        nextArticle={{ title: "Giving Back and Ethical Investing", path: "/learn/ethical-investing" }}
      >

        <h2>Why Protection Matters</h2>
        <p>
          Building wealth is only half the battle. Protecting it from unexpected events — illness,
          death, accidents — ensures your hard work benefits you and your loved ones. This isn't
          pessimistic; it's responsible.
        </p>

        <h2>Essential Insurance Types</h2>

        <h3>Life Insurance</h3>

        {/* ── Who needs it — flush two-col ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-8">
          <div className="bg-black px-5 py-5">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Usually Need It</p>
            </div>
            <ul className="space-y-2">
              {[
                "Anyone with dependents (children, non-working spouse)",
                "Anyone with a mortgage or shared debt",
                "Business owners with partners",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: GREEN }} className="shrink-0 mt-px">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[10px] uppercase tracking-widest text-white/30 mb-4">Usually Don't</p>
            <ul className="space-y-2">
              {["Single people with no dependents (usually unnecessary)"].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: RED }} className="shrink-0 mt-px">✗</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Life insurance types — left bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          <p className="px-5 py-3 text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 border-b border-white/6">Types of Life Insurance</p>
          {[
            { type: "Term Life",        badge: "Cheapest",   desc: "Covers a fixed period (e.g., 25 years). Pays out only if you die during the term." },
            { type: "Decreasing Term",  badge: "Mortgage",   desc: "Payout decreases over time. Matches a repayment mortgage. Very affordable." },
            { type: "Level Term",       badge: "Family",     desc: "Fixed payout throughout the term. Good for family income replacement." },
            { type: "Whole of Life",    badge: "Guaranteed", desc: "Covers you until death, guaranteed payout. Much more expensive, often unnecessary." },
          ].map(({ type, badge, desc }) => (
            <div key={type} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: ACCENT }} />
              <div className="flex-1 flex items-start gap-5 px-6 py-4">
                <div className="shrink-0 w-32">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55">{type}</p>
                  <p className="text-[9px] font-heading uppercase tracking-widest mt-0.5" style={{ color: ACCENT }}>{badge}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3>Income Protection</h3>
        <p>Often more valuable than life insurance. Pays a percentage of your salary if you can't work due to illness or injury.</p>
        <ul>
          <li>Typically pays 50–70% of income</li>
          <li>Continues until you recover, retire, or die</li>
          <li>Choose a waiting period (4 weeks to 1 year) — longer = cheaper</li>
          <li>Check what sick pay your employer offers first</li>
        </ul>

        <h3>Critical Illness Cover</h3>
        <p>Pays a lump sum if diagnosed with a specified serious illness (cancer, heart attack, stroke, etc.).</p>
        <ul>
          <li>One-time payout, not ongoing like income protection</li>
          <li>Can be added to life insurance or bought separately</li>
          <li>Check the policy's list of covered conditions carefully</li>
        </ul>

        <h2>How Much Cover Do You Need?</h2>

        {/* ── Cover calculation — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Life Insurance Calculation</p>
          <div className="divide-y divide-white/5">
            {[
              ["Mortgage balance",           "Ensure your home is paid off"],
              ["Annual expenses × 10",       "Cover family for ~10 years"],
              ["Outstanding debts",          "Credit cards, loans"],
              ["Funeral costs",              "~£4,000–6,000"],
              ["Children's education",       "If planning private/university"],
            ].map(([item, note]) => (
              <div key={item as string} className="flex justify-between items-center py-3 gap-6">
                <span className="font-heading text-[10px] uppercase tracking-widest text-white/50 shrink-0">{item}</span>
                <span className="text-zinc-600 text-xs font-sans text-right">{note}</span>
              </div>
            ))}
          </div>
          <p className="font-heading text-xs uppercase tracking-widest mt-4 pt-4 border-t border-white/6" style={{ color: ACCENT }}>
            Common range: 10–15× annual salary for main breadwinner
          </p>
        </div>

        <h2>Writing a Will</h2>

        {/* ── Why everyone needs a will — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Why Everyone Needs a Will</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">Without a will, intestacy rules decide who gets your assets — often not what you'd choose. A will lets you:</p>
          <ul className="space-y-2">
            {[
              "Name who inherits what",
              "Appoint guardians for children",
              "Minimise inheritance tax",
              "Appoint trusted executors",
              "Leave gifts to charities",
            ].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
              </li>
            ))}
          </ul>
        </div>

        {/* ── How to get a will — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">How to Get a Will</p>
          <div className="divide-y divide-white/6">
            {[
              { method: "DIY Will Kits",       cost: "£10–30",    note: "Fine for simple situations with no complex assets." },
              { method: "Online Services",      cost: "£90–150",   note: "Guided process, legally valid. Good for most people." },
              { method: "Solicitor",            cost: "£150–500+", note: "Best for complex estates, blended families." },
              { method: "Will Aid (November)",  cost: "Free",      note: "Free will from participating solicitors in exchange for charity donation." },
            ].map(({ method, cost, note }) => (
              <div key={method} className="py-4 flex items-start gap-5">
                <div className="shrink-0 w-28">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/50">{method}</p>
                  <p className="font-heading text-sm mt-0.5" style={{ color: ACCENT }}>{cost}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Powers of Attorney</h2>

        {/* ── LPA — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Users className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Lasting Powers of Attorney (LPA)</p>
          </div>
          <p className="text-zinc-600 text-xs font-sans mb-5">If you become mentally incapacitated (dementia, stroke, accident), who makes decisions for you?</p>
          <div className="divide-y divide-white/6">
            {[
              { type: "Property & Financial Affairs LPA", desc: "Someone manages your money, pays bills, sells property if needed." },
              { type: "Health & Welfare LPA",             desc: "Someone makes medical and care decisions on your behalf." },
            ].map(({ type, desc }) => (
              <div key={type} className="py-4">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{type}</p>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-700 text-xs font-sans mt-4 pt-4 border-t border-white/6">
            Without LPAs, your family may need costly court proceedings to manage your affairs.
          </p>
        </div>

        <h2>Estate Planning Basics</h2>

        <h3>Inheritance Tax (IHT)</h3>
        <p>Estates above £325,000 (nil rate band) face 40% tax. Key exemptions:</p>
        <ul>
          <li><strong>Spouse exemption:</strong> Transfers between spouses are tax-free</li>
          <li><strong>Residence nil rate band:</strong> Extra £175,000 if passing home to children</li>
          <li><strong>7-year rule:</strong> Gifts made 7+ years before death are exempt</li>
          <li><strong>Charity exemption:</strong> Leave 10%+ to charity, rate drops to 36%</li>
        </ul>

        <h3>Simple IHT Planning</h3>
        <ul>
          <li>Use your annual £3,000 gift exemption</li>
          <li>Make regular gifts from surplus income</li>
          <li>Consider passing on wealth earlier if comfortable</li>
          <li>Life insurance in trust doesn't count toward estate</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Audit your current insurance (life, income protection, critical illness)</li>
          <li>Calculate how much life cover you need if you have dependents</li>
          <li>Get quotes from comparison sites or a broker</li>
          <li>Write a will if you don't have one</li>
          <li>Consider setting up Lasting Powers of Attorney</li>
          <li>Review beneficiaries on pensions and life insurance</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Put life insurance 'in trust.' It avoids inheritance tax, pays out faster, and is usually free to do when you buy the policy."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            One of the highest-value, zero-cost moves in personal finance
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
                Use our Mortgage Calculator to see your outstanding balance — a key input for
                determining how much life insurance coverage you need.
              </p>
              <Link to="/finance/mortgage"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Mortgage Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}