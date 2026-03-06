import { BlogLayout } from "@/components/BlogLayout";
import { Link } from "react-router-dom";
import { Calculator, Home, Clock, PiggyBank, CheckCircle, AlertCircle, TrendingDown, ArrowRight } from "lucide-react";

const ACCENT = "#F59E0B"; // amber — mortgage/property feel

const MortgageCheatCode = () => {
  return (
    <BlogLayout
      title="The Mortgage Cheat Code"
      subtitle="How Weekly Payments Can Save You Years and Thousands in Interest"
      readTime="10 min"
      publishDate="December 2024"
      category="The Cheat Code"
      heroImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
      relatedArticles={[
        {
          title: "The Cheat Code #1: How to Turn £0 into £1,000,000",
          description: "Discover the proven strategy to build wealth from nothing using compound interest and DCA investing.",
          url: "/blog/cheat-code-01",
        }
      ]}
    >
      <p className="text-xl text-zinc-400 leading-relaxed">
        If you've ever wondered whether there's a smarter way to pay off your mortgage faster without increasing your monthly budget, there is — and hardly anyone talks about it.
      </p>

      <p className="text-xl font-semibold" style={{ color: ACCENT }}>
        It's the weekly payment cheat code.
      </p>

      <p>
        Most people stick to the traditional monthly mortgage payment. But by switching to weekly (or bi-weekly) payments, you can <strong>shave years off your mortgage</strong> and <strong>save thousands in interest</strong>, all because of how mortgage interest is calculated behind the scenes.
      </p>

      <p>Let's break down exactly why this works.</p>

      {/* ── Calculator CTA ── */}
      <div className="not-prose border border-white/10 bg-white/[0.015] px-6 py-6 my-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}12` }}>
            <Calculator className="h-7 w-7" style={{ color: ACCENT }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display text-xl uppercase tracking-widest text-white mb-1">Try Our Weekly Mortgage Calculator</p>
            <p className="text-zinc-500 text-sm font-sans">See exactly how much you could save with weekly payments</p>
          </div>
          <Link
            to="/finance/weekly-mortgage"
            className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all shrink-0"
            style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
            onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
          >
            Calculate Now <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <h2>🔍 First, How Mortgage Interest Actually Works</h2>
      <p>Mortgage interest in the UK is calculated in one of two ways:</p>

      {/* ── Two interest types ── */}
      <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-6">
        {[
          { label: "1. Daily Interest", badge: "Most common now", desc: "Interest accrues daily based on the amount you still owe." },
          { label: "2. Annual Interest", badge: "Older mortgages",  desc: "Interest is recalculated once per year." },
        ].map(({ label, badge, desc }) => (
          <div key={label} className="bg-black px-5 py-5">
            <div className="flex items-center gap-3 mb-2">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/55">{label}</p>
              <p className="text-[9px] font-heading uppercase tracking-widest text-white/20">{badge}</p>
            </div>
            <p className="text-zinc-500 text-sm font-sans leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <p>For this blog, we focus on <strong>daily interest mortgages</strong> — they are now the standard, and weekly payments take advantage of how interest builds day by day.</p>

      {/* ── Key callout ── */}
      <div className="not-prose border-l-2 pl-6 py-1 my-6" style={{ borderColor: ACCENT }}>
        <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: ACCENT }}>The Key Insight</p>
        <p className="text-zinc-400 text-sm font-sans leading-relaxed mb-3">Interest is charged on the outstanding balance. The sooner you reduce the balance, the less interest you pay — permanently.</p>
        <p className="text-white text-sm font-sans font-medium">Even small reductions in your balance earlier in the term have a compounding effect on lowering interest over the whole mortgage.</p>
      </div>

      <h2>💡 The Trick: Why Weekly Payments Save You Money</h2>
      <p>Most homeowners make <strong>12 payments per year</strong>. But weekly payments turn this into <strong>52 payments per year</strong>.</p>
      <p>Here's where the magic happens:</p>

      {/* ── 12 vs 52 ── */}
      <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-6 my-6">
        <p className="text-zinc-400 text-sm font-sans leading-relaxed mb-6">
          Weekly payments don't just match your monthly total — they sneak in an extra payment each year without you feeling it.
        </p>
        <div className="grid md:grid-cols-2 gap-px bg-white/8 border border-white/8">
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[9px] uppercase tracking-widest text-white/25 mb-2">Monthly payment structure</p>
            <p className="font-display text-5xl text-white/30 leading-none">12</p>
            <p className="text-zinc-600 text-xs font-sans mt-1">payments/year</p>
          </div>
          <div className="bg-black px-5 py-5">
            <p className="font-heading text-[9px] uppercase tracking-widest text-white/25 mb-2">Weekly payment structure</p>
            <p className="font-display text-5xl leading-none" style={{ color: ACCENT }}>52</p>
            <p className="text-zinc-600 text-xs font-sans mt-1">payments/year</p>
            <p className="text-zinc-700 text-xs font-sans mt-1">= 13 monthly payments (because 52 ÷ 4 = 13)</p>
          </div>
        </div>
      </div>

      <p>This means:</p>
      <ul>
        <li><strong>You pay the equivalent of one extra month every year</strong></li>
        <li>You reduce your mortgage balance earlier each year</li>
        <li>You reduce the amount of interest charged going forward</li>
      </ul>
      <p className="text-lg font-semibold" style={{ color: ACCENT }}>That additional early reduction in the balance is what saves you years.</p>

      <h2>📉 Example: Standard 25-Year Mortgage</h2>
      <p>Let's look at an example:</p>

      {/* ── Mortgage example box ── */}
      <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-6 my-6">
        <div className="grid grid-cols-3 gap-px bg-white/8 border border-white/8 mb-6">
          {[
            { val: "£250,000", label: "Mortgage" },
            { val: "3.5%",     label: "Interest Rate" },
            { val: "25",       label: "Years" },
          ].map(({ val, label }) => (
            <div key={label} className="bg-black px-4 py-4 text-center">
              <p className="font-display text-3xl text-white leading-none mb-1">{val}</p>
              <p className="text-zinc-600 text-xs font-heading uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
        <div className="divide-y divide-white/6">
          {[
            { label: "Monthly repayment",        val: "≈ £1,251/month",               highlight: false },
            { label: "Weekly payment equivalent", val: "£1,251 ÷ 4 = £312.75/week",  highlight: true  },
          ].map(({ label, val, highlight }) => (
            <div key={label} className="flex justify-between items-center py-4">
              <span className="text-zinc-500 text-sm font-sans">{label}</span>
              <span className="font-display text-xl" style={highlight ? { color: ACCENT } : { color: "white" }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <p>But because there are 52 weeks, not 48 weeks (12 × 4), you end up paying:</p>

      {/* ── Weekly vs monthly totals ── */}
      <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-6">
        <div className="bg-black px-5 py-5">
          <p className="text-zinc-500 text-xs font-heading uppercase tracking-widest mb-2">Weekly payments per year</p>
          <p className="font-display text-2xl" style={{ color: ACCENT }}>£312.75 × 52 = £16,261</p>
        </div>
        <div className="bg-black px-5 py-5">
          <p className="text-zinc-500 text-xs font-heading uppercase tracking-widest mb-2">Monthly payments per year</p>
          <p className="font-display text-2xl text-white">£1,251 × 12 = £15,012</p>
        </div>
      </div>

      <p className="text-lg font-semibold">That's an extra <span style={{ color: ACCENT }}>£1,249</span> shaved off the balance in Year 1 alone — and it compounds.</p>

      <h2>⏳ How Much Time Can You Save?</h2>
      <p>Switching from monthly to weekly payments on a 25-year mortgage could reduce the term by:</p>

      {/* ── Big stat ── */}
      <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-10 my-6 text-center">
        <p className="font-display text-7xl leading-none mb-3" style={{ color: ACCENT }}>3–5 years</p>
        <p className="text-zinc-500 text-sm font-sans">(depending on interest rate and lender structure)</p>
      </div>

      <p>This means:</p>

      {/* ── 5 benefits grid ── */}
      <div className="not-prose grid grid-cols-2 md:grid-cols-5 gap-px bg-white/8 border border-white/8 my-6">
        {[
          { icon: CheckCircle, text: "Less interest charged" },
          { icon: Clock,       text: "Mortgage paid off earlier" },
          { icon: TrendingDown,text: "Faster equity growth" },
          { icon: PiggyBank,   text: "Earlier financial freedom" },
          { icon: Home,        text: "Smoother cash flow" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="bg-black px-3 py-4 text-center hover:bg-white/[0.02] transition-colors">
            <Icon className="h-4 w-4 mx-auto mb-2 text-white/20" />
            <p className="text-[10px] font-heading uppercase tracking-wide text-zinc-500">{text}</p>
          </div>
        ))}
      </div>

      <p>For many families, the true benefit isn't just in the numbers — it's in matching payments with their pay cycle and creating smoother cash flow.</p>

      <h2>💰 How Much Interest Can You Save?</h2>
      <p>Using our example:</p>

      {/* ── Interest comparison ── */}
      <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-6">
        <div className="bg-black px-6 py-6">
          <p className="text-zinc-500 text-xs font-heading uppercase tracking-widest mb-3">Total interest — monthly payments</p>
          <p className="font-display text-4xl text-white/40">≈ £125,000</p>
        </div>
        <div className="bg-black px-6 py-6">
          <p className="text-zinc-500 text-xs font-heading uppercase tracking-widest mb-3">Total interest — weekly payments</p>
          <p className="font-display text-4xl" style={{ color: ACCENT }}>≈ £108,000</p>
        </div>
      </div>

      {/* ── Savings callout ── */}
      <div className="not-prose border-l-2 pl-6 py-1 my-6" style={{ borderColor: ACCENT }}>
        <p className="text-white text-lg font-sans font-bold mb-2">
          💥 You save roughly <span style={{ color: ACCENT }}>£17,000</span> in interest
        </p>
        <p className="text-white text-lg font-sans font-bold mb-3">
          💥 You finish your mortgage <span style={{ color: ACCENT }}>4 years early</span>
        </p>
        <p className="text-zinc-500 text-sm font-sans">And remember — you didn't "increase" your monthly payment. You just spread it differently and took advantage of the calendar.</p>
      </div>

      <h2 className="flex items-center gap-2">
        <AlertCircle className="h-6 w-6 inline-block text-white/40" /> Important Note: Check Your Lender's Overpayment Rules
      </h2>
      <p>Most lenders allow:</p>
      <ul>
        <li><strong>10% overpayment per year</strong> (without penalty)</li>
        <li>Weekly or bi-weekly payments</li>
        <li>Standing orders for custom payment schedules</li>
      </ul>
      <p className="font-semibold" style={{ color: ACCENT }}>But always check the mortgage terms first.</p>

      <h2>🧠 Why This Works: The Behind-the-Scenes Secret</h2>
      <p>This trick works because of three principles:</p>

      {/* ── Three principles ── */}
      <div className="not-prose border border-white/8 divide-y divide-white/6 my-6">
        {[
          { num: "01", title: "Interest is charged daily",                desc: "Reduce the balance sooner → interest charged on a smaller number → save money." },
          { num: "02", title: "You quietly pay 13 months a year",         desc: "But spread weekly so it feels manageable." },
          { num: "03", title: "Overpayments early on have the biggest impact", desc: "Because the balance is highest at the beginning." },
        ].map(({ num, title, desc }) => (
          <div key={num} className="flex items-start gap-5 bg-black px-6 py-5 hover:bg-white/[0.015] transition-colors">
            <span className="font-display text-3xl leading-none shrink-0 text-white/10">{num}</span>
            <div className="pt-0.5">
              <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{title}</p>
              <p className="text-zinc-500 text-sm font-sans">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p>This is the same maths that makes pensions, ISAs and compound interest grow — but in reverse.</p>

      <h2>🌟 The Cheat Code Summary</h2>
      <p>If you want to unlock one of the simplest mortgage hacks available, do this:</p>

      {/* ── 4 steps ── */}
      <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-6">
        <div className="divide-y divide-white/6">
          {[
            "Take your monthly payment",
            "Divide it by 4",
            "Pay that amount every week",
            "Watch years fall off your mortgage",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-5 py-3.5">
              <CheckCircle className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              <span className="font-heading text-[9px] uppercase tracking-widest text-white/25 shrink-0 w-12">Step {i + 1}</span>
              <span className="text-white text-sm font-sans">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <p>This works even better if you:</p>
      <ul>
        <li>Round the weekly amount up by £10–£20</li>
        <li>Add occasional lump sums</li>
        <li>Match payments to your salary cycle</li>
      </ul>

      <p className="text-xl font-semibold" style={{ color: ACCENT }}>Small moves, big results.</p>

      {/* ── Final CTA ── */}
      <div className="not-prose border border-white/10 bg-white/[0.015] p-8 my-8 text-center">
        <p className="font-display text-3xl uppercase tracking-widest text-white mb-2">Try Our Weekly Mortgage Calculator</p>
        <p className="text-zinc-500 text-sm font-sans mb-6 max-w-lg mx-auto leading-relaxed">
          Enter your mortgage balance, choose monthly vs weekly payments, see how many years you save, and download a personalised schedule.
        </p>
        <Link
          to="/finance/weekly-mortgage"
          className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-6 border transition-all"
          style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
          onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
        >
          <Calculator className="h-4 w-4" />
          Calculate Your Savings
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </BlogLayout>
  );
};

export default MortgageCheatCode;