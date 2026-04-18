import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { AdvancedCompoundCalculator } from "@/components/AdvancedCompoundCalculator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

const ACCENT = "#3B82F6";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("100");
  const [extraDeposit, setExtraDeposit] = useState("0");
  const [extraMonth, setExtraMonth] = useState("1");
  const [extraYear, setExtraYear] = useState("1");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showAdvanced, setShowAdvanced] = useState(true); // advanced by default
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    const PMT = parseFloat(contribution);
    const extra = parseFloat(extraDeposit) || 0;
    const exMonth = parseInt(extraMonth);
    const exYear = parseInt(extraYear);

    try {
      if (isNaN(P) || isNaN(r) || isNaN(t)) {
        toast.error("Please enter valid numbers for principal, rate, and years.");
        return;
      }
      const totalMonths = t * 12;
      const monthlyRate = (r / 100) / 12;
      const targetDepositMonth = (exYear - 1) * 12 + exMonth;
      let currentBalance = P;
      let totalInvested = P;
      for (let month = 1; month <= totalMonths; month++) {
        currentBalance += currentBalance * monthlyRate;
        currentBalance += PMT;
        totalInvested += PMT;
        if (month === targetDepositMonth) {
          currentBalance += extra;
          totalInvested += extra;
        }
      }
      const totalInterest = currentBalance - totalInvested;
      setResult({
        futureValue: Math.round(currentBalance * 100) / 100,
        totalContributions: Math.round(totalInvested * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    } catch {
      toast.error("An error occurred during calculation.");
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Calculate investment growth with regular and one-time deposits."
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thecalculatorapp.org/" },
      { "@type": "ListItem", "position": 2, "name": "Finance", "item": "https://www.thecalculatorapp.org/finance" },
      { "@type": "ListItem", "position": 3, "name": "Compound Interest" }
    ]
  };

  const faqSchema = [
    { question: "What is compound interest?", answer: "It's interest that builds on itself. You earn interest on your original deposit, then next time round you earn interest on that interest too. So the longer you leave money alone, the faster it actually grows — not in a straight line but in a curve that steepens over time. A simple example: £10,000 at 5% for 20 years grows to around £26,500 with compounding. Leave it for 30 years and it becomes over £43,000. Same rate, just more time." },
    { question: "What's the difference between daily and monthly compounding?", answer: "Both work the same way, just at different speeds. Daily compounding recalculates interest every single day (365 times a year), while monthly does it 12 times. In practice the difference is smaller than people expect — on £10,000 at 5% over 10 years, daily compounding gives you roughly £16,487 versus £16,470 monthly. It matters more at higher balances and longer time horizons, but honestly the rate you get and how much you save regularly matter far more than the compounding frequency." },
    { question: "Which compounding frequency gives the best return?", answer: "More frequent is better — daily beats monthly beats quarterly beats annually. But here's the honest truth: the gap between them is usually tiny compared to the gap between saving consistently and not saving at all. If your bank offers 4.5% compounding monthly versus 4.4% compounding daily elsewhere, the 4.5% account still wins. Focus on the rate and your regular contributions first." },
    { question: "How do I calculate compound interest manually?", answer: "The formula is A = P(1 + r/n)^(nt). P is your starting amount, r is the annual interest rate as a decimal (5% = 0.05), n is how many times it compounds per year, and t is years. So £5,000 at 4% compounding monthly for 10 years: A = 5000 × (1 + 0.04/12)^(12×10) = £7,444. That's £2,444 in interest on £5,000 — just by leaving it there. The calculator above does all of this for you." }
  ];

  const sym = currencies[currency].symbol;

  // ── Advanced view (default) ──
  if (showAdvanced) {
    return (
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <SEO
          title="Compound Interest Calculator UK 2025 — A = P(1+r/n)^nt"
          description="Free compound interest calculator with daily, monthly and yearly compounding. See how your savings grow over time with compound interest."
          structuredData={[structuredData, breadcrumbStructuredData]}
          faqSchema={faqSchema}
        />
        <div className="max-w-5xl mx-auto px-6 py-20">
          <button
            onClick={() => setShowAdvanced(false)}
            className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-12"
          >
            ← Switch to Simple Mode
          </button>
          <AdvancedCompoundCalculator />
        </div>

        {/* ── Static content + disclaimer ── */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "What is Compound Interest?",
              description: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods."
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description: "Enter your initial investment, interest rate, and time period to see how your money grows."
            }}
            faqs={faqSchema}
          />

          {/* ── Compounding Frequency Guide ── */}
          <section className="mt-20 pt-20 border-t border-white/10">
            <h2 className="text-3xl font-display font-bold mb-12 text-white">Compounding Frequency Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Daily Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Daily compounding applies interest 365 times per year. This is the most common frequency for savings accounts and money market accounts. It generates the highest returns compared to monthly or annual compounding.
                </p>
                <p className="text-sm text-gray-500">Best for: High-yield savings accounts, money market accounts</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Monthly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Monthly compounding applies interest 12 times per year. This is the standard frequency for most savings accounts and certificates of deposit (CDs). It offers a good balance between frequency and simplicity.
                </p>
                <p className="text-sm text-gray-500">Best for: Traditional savings accounts, some bonds</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Quarterly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Quarterly compounding applies interest 4 times per year. Some bonds and investment accounts use this frequency. It provides moderate growth between monthly and annual compounding.
                </p>
                <p className="text-sm text-gray-500">Best for: Some bonds, certain investment accounts</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Yearly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Annual or yearly compounding applies interest once per year. While simpler to track, it generates the least amount of interest compared to more frequent compounding methods over the same period.
                </p>
                <p className="text-sm text-gray-500">Best for: Bonds, some traditional savings products</p>
              </article>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">💡 Pro Tip</h3>
              <p className="text-gray-400">
                The more frequently interest compounds, the more you earn. For example, £10,000 at 5% annual interest will grow to £12,762.82 annually, £12,834.27 monthly, £12,863.56 daily, but £12,833.01 quarterly. Use our calculator to compare different frequencies for your specific situation.
              </p>
            </div>
          </section>
        </div>

        {/* Educational Content — advanced view */}
        <div className="max-w-5xl mx-auto px-6 pb-20 space-y-0">

          {/* 1. Definition */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">What Is Compound Interest?</p>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
              Compound interest is interest earned on both your original deposit <em>and</em> the interest already accumulated. Unlike simple interest — which only applies to your starting capital — compound interest snowballs over time. The longer money stays invested, the more it earns on itself.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl mt-3">
              Most UK ISAs, savings accounts, and investment funds compound monthly or daily. Pension funds compound continuously over decades — which is why starting early makes such a dramatic difference to retirement outcomes.
            </p>
          </section>

          {/* 2. Formula */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">The Formula</p>
            <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-sm text-zinc-200 mb-6 max-w-xl text-center text-lg">
              A = P(1 + r/n)^(nt)
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-zinc-400 max-w-2xl">
              {[["A","Final amount"],["P","Principal (starting deposit)"],["r","Annual interest rate (decimal)"],["n","Compounding periods per year"],["t","Time in years"]].map(([v,d])=>(
                <div key={v} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <span className="text-blue-400 font-bold">{v}</span> — {d}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Example */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Worked Example</p>
            <p className="text-zinc-300 text-sm mb-4">You invest <strong className="text-white">£5,000</strong> at <strong className="text-white">5% annual interest</strong>, compounding monthly, for <strong className="text-white">20 years</strong>, with no extra contributions.</p>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 max-w-2xl font-mono text-sm text-zinc-300 space-y-1">
              <div>A = 5,000 × (1 + 0.05/12)^(12×20)</div>
              <div>A = 5,000 × (1.004167)^240</div>
              <div className="text-blue-400 font-bold text-base mt-2">A = £13,601</div>
            </div>
            <p className="text-zinc-400 text-sm mt-3 max-w-2xl">That's <strong className="text-white">£8,601 earned in interest</strong> without adding a single extra pound. Add £200/month and the final balance exceeds <strong className="text-white">£83,000</strong>.</p>
          </section>

          {/* 4. Explanation — compounding frequency */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">How Compounding Frequency Affects Growth</p>
            <p className="text-zinc-400 text-sm mb-4">£10,000 at 5% interest over 10 years — same rate, different compounding:</p>
            <div className="overflow-x-auto max-w-2xl">
              <table className="w-full text-sm text-zinc-300">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">Frequency</th>
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">n</th>
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">Final Value</th>
                    <th className="text-left py-3 text-[10px] font-heading uppercase tracking-widest text-white/40">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {[["Annually","1","£16,289","£6,289"],["Quarterly","4","£16,436","£6,436"],["Monthly","12","£16,470","£6,470"],["Daily","365","£16,487","£6,487"]].map(([f,n,v,i])=>(
                    <tr key={f} className="border-b border-white/5">
                      <td className="py-3 pr-6 text-white">{f}</td>
                      <td className="py-3 pr-6 text-zinc-400">{n}</td>
                      <td className="py-3 pr-6 text-blue-400 font-semibold">{v}</td>
                      <td className="py-3 text-zinc-400">{i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-zinc-500 text-xs mt-4 max-w-2xl">The rate matters far more than compounding frequency. A 4.5% account compounding monthly beats a 4.0% account compounding daily — always prioritise the rate.</p>
          </section>

          {/* 5. FAQ */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-6">Frequently Asked Questions</p>
            <div className="space-y-6 max-w-3xl">
              {[
                { q: "Is compound interest better than simple interest?", a: "Yes, for savings and investments — almost always. Simple interest only applies to your original deposit. Compound interest applies to the growing total balance, so your returns accelerate over time. The longer the period, the bigger the difference." },
                { q: "How often do UK savings accounts compound?", a: "Most UK savings accounts and ISAs compound monthly or daily. Fixed-rate bonds and NS&I products often compound annually. Always check the AER (Annual Equivalent Rate), which accounts for compounding frequency and lets you compare accounts on equal terms." },
                { q: "Does compound interest apply to investments?", a: "Yes — though with investments it works through reinvested returns (dividends, fund growth) rather than a fixed interest rate. Index funds and stocks & shares ISAs benefit from compounding when dividends are reinvested automatically." },
                { q: "What is the Rule of 72?", a: "A quick mental maths trick: divide 72 by your annual interest rate to estimate how long it takes to double your money. At 6% per year, your investment doubles in roughly 12 years (72 ÷ 6). At 9%, it doubles in 8 years." },
                { q: "Does inflation affect compound interest?", a: "Yes. If your savings account pays 4% AER but inflation is 3%, your real return is roughly 1%. Over long periods this matters enormously. This is why investing in assets that outpace inflation (equities, property) is often recommended for long-term goals." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <p className="text-white font-medium text-sm mb-2">{q}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources + Internal links */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Sources & Further Reading</p>
            <ul className="space-y-2 text-sm text-zinc-400 mb-6">
              <li><a href="https://www.moneyhelper.org.uk/en/savings/types-of-savings/what-is-compound-interest" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">MoneyHelper — What is compound interest?</a></li>
              <li><a href="https://www.vanguard.co.uk/professional/education/tools-and-resources/the-power-of-compounding" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">Vanguard UK — The power of compounding</a></li>
              <li><a href="https://www.nerdwallet.com/uk/savings/compound-interest-calculator/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">NerdWallet UK — Compound interest explained</a></li>
            </ul>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Savings Calculator", path: "/finance/savings" },
                { label: "ISA Calculator", path: "/finance/isa-calculator" },
                { label: "Retirement Calculator", path: "/finance/retirement" },
                { label: "ROI Calculator", path: "/finance/irr" },
              ].map(link => (
                <a key={link.path} href={link.path} className="px-4 py-2 rounded-lg text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{link.label}</a>
              ))}
            </div>
          </section>
        </div>

        <FinancialDisclosure variant="investment" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    );
  }

  // ── Simple view ──
  return (
    <>
      <SEO
        title="Compound Interest Calculator UK 2025 — A = P(1+r/n)^nt"
        description="Free compound interest calculator with daily, monthly and yearly compounding. See how your savings grow over time with compound interest."
        structuredData={[structuredData, breadcrumbStructuredData]}
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Compound Interest</span>
          </nav>
        </div>

        {/* ── Split-screen hero ── */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">

            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[13vw] lg:text-[120px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                COMPOUND
              </span>
              <span
                className="block text-[10vw] lg:text-[90px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}
              >
                INTEREST
              </span>
              <span
                className="block text-[8vw] lg:text-[70px] mt-1"
                style={{
                  background: `linear-gradient(135deg, #a78bfa 0%, ${ACCENT} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate the future value of your investments with precision. Watch your wealth grow exponentially over time.
              </p>
            </div>

            {/* Switch to advanced */}
            <button
              onClick={() => setShowAdvanced(true)}
              className="mt-8 self-start flex items-center gap-2 font-heading text-xs uppercase tracking-widest transition-colors"
              style={{ color: ACCENT }}
            >
              <TrendingUp className="h-4 w-4" />
              Switch to Advanced Mode
            </button>
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div className="group">
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Currency
                  </label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Principal */}
                <div className="group">
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Principal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => e.target.style.borderColor = ACCENT}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                      placeholder="10,000"
                    />
                  </div>
                </div>

                {/* Rate + Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">
                      Interest Rate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => e.target.style.borderColor = ACCENT}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder="5"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">
                      Time Period
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => e.target.style.borderColor = ACCENT}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder="10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Monthly contribution */}
                <div className="group">
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">
                    Monthly Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                      onFocus={e => e.target.style.borderColor = ACCENT}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* One-time deposit */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-heading uppercase tracking-widest text-white/40">
                      One-Time Extra Deposit
                    </label>
                    <Badge className="text-[9px] font-heading uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-none">
                      Optional
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">{sym}</span>
                        <input
                          type="number"
                          value={extraDeposit}
                          onChange={(e) => setExtraDeposit(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg pl-7 pr-3 py-3 text-white text-sm focus:outline-none transition-all"
                          onFocus={e => e.target.style.borderColor = ACCENT}
                          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Month</label>
                      <Select value={extraMonth} onValueChange={setExtraMonth}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#252323] border-white/10 text-white">
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {new Date(0, i).toLocaleString("default", { month: "short" })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Year</label>
                      <Select value={extraYear} onValueChange={setExtraYear}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#252323] border-white/10 text-white">
                          {Array.from({ length: Math.max(1, parseInt(years) || 1) }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>Yr {i + 1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 pb-2 border-t border-white/10">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Future Value</span>
                      <span className="text-3xl font-display text-white">{sym}{result.futureValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Contributions</span>
                      <span className="text-white/70 font-heading">{sym}{result.totalContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Interest Earned</span>
                      <span className="font-heading" style={{ color: ACCENT }}>{sym}{result.totalInterest.toLocaleString()}</span>
                    </div>
                    <CopyButton accentColor={ACCENT} results={[
                      { label: "Future Value", value: `${sym}${result.futureValue.toLocaleString()}` },
                      { label: "Total Contributions", value: `${sym}${result.totalContributions.toLocaleString()}` },
                      { label: "Interest Earned", value: `${sym}${result.totalInterest.toLocaleString()}` },
                    ]} />
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateCompoundInterest}
                  className="w-full group relative overflow-hidden text-white font-heading font-bold py-5 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 20px -5px ${ACCENT}80`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* ── Static content + disclaimer ── */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "What actually is compound interest?",
              description: "Think of it like a snowball rolling downhill. You start with a small ball — your original deposit. As it rolls, it picks up more snow. That extra snow then picks up even more snow. Each time, it's growing on a bigger base than before. That's compound interest in a nutshell: you earn interest, and then your interest earns interest too.\n\nHere's a real example to make it click. Say you put £5,000 into a savings account paying 5% a year. After year one you have £5,250. In year two, you earn 5% on £5,250 — not £5,000 — so you end up with £5,512. The extra £12 might not feel exciting. But over 20 years that same £5,000 becomes around £13,266. You put in five grand and got back over eight grand in interest, without adding another penny."
            }}
            howItWorks={{
              title: "How to get the most out of this calculator",
              description: "It's pretty straightforward — fill in what you know and adjust the bits you're not sure about to see what difference they make.",
              steps: [
                { step: 1, title: "Start with your opening balance", description: "Put in whatever you're starting with. Even if it's zero, that's fine — regular contributions do the heavy lifting over time." },
                { step: 2, title: "Add a monthly contribution if you have one", description: "This is often where the magic really happens. Saving £200 a month consistently will usually outpace a large lump sum that you never add to." },
                { step: 3, title: "Set the interest rate", description: "Use the AER (Annual Equivalent Rate) from your account — that's the figure that already accounts for compounding. Most UK savings accounts show this clearly." },
                { step: 4, title: "Choose your time horizon and compounding frequency", description: "How long are you leaving the money? And how often does interest get added? Monthly is the most common for UK savings accounts." },
                { step: 5, title: "Hit calculate and explore", description: "Try changing the rate by 1% or adding £50 more per month. You'll quickly see which inputs have the biggest impact on your final number." }
              ]
            }}
            formula={{
              title: "The formula behind the calculator",
              formula: "A = P(1 + r/n)^(nt)",
              explanation: "A is the final amount, P is your starting balance, r is the annual interest rate as a decimal (so 5% becomes 0.05), n is how many times interest compounds per year, and t is the number of years. For a pot with regular contributions, the calculator layers in an annuity formula on top of this. You don't need to understand the maths — but it helps to know it's the same formula used by every major UK bank and financial institution."
            }}
            faqs={faqSchema}
            tips={[
              "Start as early as you possibly can — time is your biggest advantage with compound interest",
              "Always compare AER figures when shopping for savings accounts, not the headline rate",
              "Reinvest any interest rather than withdrawing it — that's the whole point of compounding",
              "Use a Cash ISA to protect your interest from tax if you're approaching or above the Personal Savings Allowance",
              "Regular monthly contributions often matter more than getting the 'perfect' interest rate"
            ]}
          />

          {/* ── Compounding Frequency Guide ── */}
          <section className="mt-20 pt-20 border-t border-white/10">
            <h2 className="text-3xl font-display font-bold mb-4 text-white">Does compounding frequency actually matter?</h2>
            <p className="text-gray-400 mb-12 leading-relaxed max-w-3xl">
              Short answer: yes, but less than you'd think. More frequent compounding is always better — daily beats monthly beats quarterly beats annually. The difference is just smaller than most people expect. Here's how each one works in practice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Daily compounding</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Interest gets calculated and added to your balance every single day. That means tomorrow you earn a tiny bit more than today, because your balance is slightly higher. Over years, this adds up — but the honest truth is the difference versus monthly compounding on a typical savings pot is usually just a few pounds a year.
                </p>
                <p className="text-sm text-gray-500">Common in: some high-interest current accounts, certain cash ISAs</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Monthly compounding</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  This is the most common setup for UK savings accounts. Interest is added once a month, and from that point you're earning on a slightly larger balance. It's straightforward to track and understand — your monthly statement shows exactly what came in. For most savers, this is perfectly fine.
                </p>
                <p className="text-sm text-gray-500">Common in: easy access savings, fixed-rate bonds, ISAs</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Quarterly compounding</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Interest gets added four times a year — usually at the end of March, June, September and December. You'll see this on some NS&I products and certain savings bonds. It's less common for everyday savings accounts, but the maths works the same way.
                </p>
                <p className="text-sm text-gray-500">Common in: some NS&I products, certain corporate bonds</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Annual compounding</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Interest is added just once a year. This is the least favourable for savers — you're waiting a full year before your interest starts earning anything itself. You'll see this with some premium bonds and older-style savings accounts. When comparing products, always look at the AER, which adjusts for this.
                </p>
                <p className="text-sm text-gray-500">Common in: some bonds, older savings products</p>
              </article>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">The thing most people get wrong</h3>
              <p className="text-gray-400">
                People often obsess over whether to pick daily or monthly compounding when they should be thinking about the rate. A 4.5% account compounding monthly will always beat a 4.0% account compounding daily. The frequency matters at the margins — the rate and how much you save consistently are what genuinely move the needle. Use the calculator above to run the comparison for your actual numbers.
              </p>
            </div>
          </section>
        </div>

        {/* Educational Content — simple view */}
        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-0">

          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">What Is Compound Interest?</p>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">Compound interest is interest earned on both your original deposit <em>and</em> the interest already accumulated. Unlike simple interest — which only applies to your starting capital — compound interest snowballs over time. Most UK ISAs, savings accounts, and investment funds compound monthly or daily.</p>
          </section>

          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">The Formula</p>
            <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-base text-zinc-200 mb-4 max-w-xl text-center">A = P(1 + r/n)^(nt)</div>
            <p className="text-zinc-400 text-sm max-w-2xl">Where A = final amount, P = principal, r = annual rate (decimal), n = compounding periods per year, t = years.</p>
          </section>

          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Worked Example</p>
            <p className="text-zinc-300 text-sm mb-3">£5,000 at 5% compounding monthly for 20 years:</p>
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 font-mono text-sm text-zinc-300 max-w-md space-y-1">
              <div>A = 5,000 × (1 + 0.05/12)^(240)</div>
              <div className="text-blue-400 font-bold">A = £13,601</div>
            </div>
            <p className="text-zinc-400 text-sm mt-3 max-w-2xl">Without compounding (simple interest) the same £5,000 would only grow to £10,000. Compound interest adds an extra <strong className="text-white">£3,601</strong> on the same deposit.</p>
          </section>

          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-6">Frequently Asked Questions</p>
            <div className="space-y-6 max-w-3xl">
              {[
                { q: "Is compound interest better than simple interest?", a: "Yes, for savings and investments — almost always. Simple interest only applies to your original deposit. Compound interest applies to the growing total, so your returns accelerate over time." },
                { q: "How often do UK savings accounts compound?", a: "Most UK savings accounts and ISAs compound monthly or daily. Always compare the AER (Annual Equivalent Rate), which accounts for compounding frequency." },
                { q: "What is the Rule of 72?", a: "Divide 72 by your annual interest rate to estimate how long it takes to double your money. At 6%, your money doubles in roughly 12 years." },
                { q: "Does compound interest help with investing?", a: "Yes — through reinvested dividends and fund growth. Index funds and stocks & shares ISAs benefit from compounding when returns are reinvested automatically." },
                { q: "Does inflation affect my compound interest returns?", a: "Yes. If your savings account pays 4% AER but inflation is 3%, your real return is roughly 1%. For long-term goals, consider investments that can outpace inflation." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <p className="text-white font-medium text-sm mb-2">{q}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-white/8 bg-white/[0.015] px-8 py-8">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Sources & Further Reading</p>
            <ul className="space-y-2 text-sm text-zinc-400 mb-6">
              <li><a href="https://www.moneyhelper.org.uk/en/savings/types-of-savings/what-is-compound-interest" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">MoneyHelper — What is compound interest?</a></li>
              <li><a href="https://www.vanguard.co.uk/professional/education/tools-and-resources/the-power-of-compounding" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">Vanguard UK — The power of compounding</a></li>
              <li><a href="https://www.nerdwallet.com/uk/savings/compound-interest-calculator/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">NerdWallet UK — Compound interest explained</a></li>
            </ul>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Savings Calculator", path: "/finance/savings" },
                { label: "ISA Calculator", path: "/finance/isa-calculator" },
                { label: "Retirement Calculator", path: "/finance/retirement" },
                { label: "ROI Calculator", path: "/finance/irr" },
              ].map(link => (
                <a key={link.path} href={link.path} className="px-4 py-2 rounded-lg text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{link.label}</a>
              ))}
            </div>
          </section>
        </div>

        <FinancialDisclosure variant="investment" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CompoundInterest;