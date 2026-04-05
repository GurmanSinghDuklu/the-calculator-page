import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, AlertTriangle, Calendar, PiggyBank, ArrowRight } from "lucide-react";

const ACCENT = "#22C55E";
const RED    = "#F87171";

export default function BudgetIrregularCosts() {
  return (
    <>
      <SEO
        title="Budgeting for Unexpected Costs - Plan for Irregular Expenses"
        description="Plan for irregular expenses: annual bills, seasonal costs and emergencies without breaking your budget."
        keywords="irregular expenses, unexpected costs, budget planning, annual expenses, sinking funds, emergency budget, financial planning UK"
        canonicalUrl="/learn/budget-irregular-costs"
      />

      <ArticleLayout
        publishDate="2025-02-12"
        title="Budgeting for Unexpected Costs"
        description="Plan for irregular and unexpected expenses"
        readTime="15 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{ title: "Your Monthly Financial Dashboard", path: "/learn/monthly-dashboard" }}
      >

        <h2>Why Irregular Costs Derail Budgets</h2>
        <p>
          Most budget failures aren't caused by daily overspending — they're caused by annual insurance
          bills, car repairs, or a broken boiler. These "surprise" expenses are actually predictable
          if you plan for them.
        </p>

        {/* ── Red warning — left border ── */}
        <div className="not-prose border-l-2 pl-5 py-1 my-8 flex items-start gap-4" style={{ borderColor: RED }}>
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: RED }} />
          <div>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: RED }}>The Budget Buster Effect</p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A £600 car insurance bill paid annually = £50/month. If you don't account for it monthly,
              that single bill can wipe out your savings and derail your budget for months.
            </p>
          </div>
        </div>

        <h2>Types of Irregular Expenses</h2>

        <h3>1. Predictable Annual Costs</h3>
        <ul>
          <li><strong>Insurance</strong> — Car, home, life, travel</li>
          <li><strong>Subscriptions</strong> — Annual memberships, software licences</li>
          <li><strong>Vehicle</strong> — MOT, road tax, servicing</li>
          <li><strong>Home</strong> — Boiler service, chimney sweep, gutter cleaning</li>
          <li><strong>Personal</strong> — Birthdays, Christmas, anniversaries</li>
        </ul>

        <h3>2. Semi-Predictable Costs</h3>
        <ul>
          <li><strong>Medical</strong> — Dental checkups, optician, prescriptions</li>
          <li><strong>Home repairs</strong> — Appliance replacement, decorating</li>
          <li><strong>Vehicle repairs</strong> — Tyres, brakes, unexpected fixes</li>
          <li><strong>Clothing</strong> — Seasonal wardrobe updates, school uniforms</li>
        </ul>

        <h3>3. True Emergencies</h3>
        <ul>
          <li>Job loss or reduced income</li>
          <li>Medical emergencies</li>
          <li>Major home repairs (roof, boiler failure)</li>
          <li>Family emergencies requiring travel</li>
        </ul>

        <h2>The Sinking Fund Strategy</h2>
        <p>
          A sinking fund is money you set aside each month for a known future expense. Instead of being
          surprised by a £1,200 car insurance bill, you save £100/month and it's ready when needed.
        </p>

        {/* ── Sinking fund table — flush border, two-col ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Calendar className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Sample Sinking Funds</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans">
            <div>
              <p className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/20 mb-4">Annual Costs</p>
              <ul className="space-y-2.5">
                {[
                  "Car insurance: £600 ÷ 12 = £50/month",
                  "Home insurance: £300 ÷ 12 = £25/month",
                  "Christmas gifts: £600 ÷ 12 = £50/month",
                  "MOT + service: £400 ÷ 12 = £33/month",
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-zinc-500">
                    <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:border-l md:border-white/6 md:pl-6">
              <p className="text-[9px] font-heading uppercase tracking-[0.2em] text-white/20 mb-4">Maintenance Funds</p>
              <ul className="space-y-2.5">
                {[
                  "Car repairs: £600/year = £50/month",
                  "Home maintenance: £1,200/year = £100/month",
                  "Medical/dental: £300/year = £25/month",
                  "Clothing: £600/year = £50/month",
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-zinc-500">
                    <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h2>How to Set Up Your System</h2>
        <ol>
          <li><strong>Audit last year</strong> — Review bank statements for all irregular expenses from the past 12 months</li>
          <li><strong>Categorise and total</strong> — Group similar expenses and calculate annual totals</li>
          <li><strong>Divide by 12</strong> — Convert each category to a monthly savings amount</li>
          <li><strong>Create dedicated savings</strong> — Use separate savings accounts or pots for each fund</li>
          <li><strong>Automate transfers</strong> — Set up standing orders on payday</li>
        </ol>

        <h2>Organising Your Funds</h2>

        {/* ── Account options — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <PiggyBank className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Account Structure Options</p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              { opt: "Option 1 — Separate Accounts",           desc: "Create individual savings accounts for each category. Most online banks offer free savings pots. Best for visual people who like seeing progress." },
              { opt: "Option 2 — Single Account + Spreadsheet", desc: "Keep all sinking funds in one account but track allocations in a spreadsheet. Simpler to manage, but requires discipline." },
              { opt: "Option 3 — Combined Annual Buffer",       desc: "Calculate your total irregular expenses and save 1/12th monthly. Less precise but still effective." },
            ].map(({ opt, desc }) => (
              <div key={opt} className="py-4">
                <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{opt}</p>
                <p className="text-zinc-500 text-sm font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>The 1% Home Maintenance Rule</h2>
        <p>
          Budget 1% of your home's value annually for maintenance. For a £250,000 home, that's
          £2,500/year or roughly £210/month — covering everything from boiler repairs to appliance replacements.
        </p>

        <h2>Car Expense Planning</h2>
        <p>Beyond insurance and road tax, budget for:</p>
        <ul>
          <li><strong>Depreciation fund</strong> — Save for your next car while driving your current one</li>
          <li><strong>MOT failures</strong> — Allow £200–500 for unexpected repairs</li>
          <li><strong>Tyres</strong> — Expect to replace tyres every 2–3 years</li>
          <li><strong>Major servicing</strong> — Timing belt, brakes, etc.</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Pull up your bank statements from the last 12 months</li>
          <li>List every irregular expense (anything not monthly)</li>
          <li>Calculate the total and divide by 12</li>
          <li>Add 10–20% buffer for expenses you missed</li>
          <li>Set up automatic transfers to a dedicated savings account</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "Surprise bills aren't surprises. They're just expenses you forgot to plan for."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            The sinking fund mindset
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
                Use our Budget Calculator to allocate your sinking fund contributions alongside your
                regular monthly expenses.
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