import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { compoundInterestSchema } from "@/lib/validation";
import { toast } from "sonner";
import { ArrowRight, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

const SavingsCalculator = () => {
  const [initialDeposit,    setInitialDeposit]    = useState("1000");
  const [monthlyDeposit,    setMonthlyDeposit]    = useState("200");
  const [interestRate,      setInterestRate]      = useState("3");
  const [years,             setYears]             = useState("10");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [currency,          setCurrency]          = useState<Currency>("USD");
  const [result, setResult] = useState<{
    finalBalance: number; totalDeposits: number; totalInterest: number;
  } | null>(null);

  const calculateSavings = () => {
    const P   = parseFloat(initialDeposit);
    const PMT = parseFloat(monthlyDeposit);
    const r   = parseFloat(interestRate);
    const t   = parseFloat(years);
    const n   = parseFloat(compoundFrequency);
    try {
      compoundInterestSchema.parse({ principal: P, rate: r, years: t, frequency: n, contribution: PMT });
    } catch (e: any) { toast.error(e.errors?.[0]?.message || "Invalid input values"); return; }

    const rD = r / 100;
    const futureValueInitial  = P * Math.pow(1 + rD / n, n * t);
    const monthlyRate         = rD / 12;
    const months              = t * 12;
    const futureValueMonthly  = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const finalBalance        = futureValueInitial + futureValueMonthly;
    const totalDeposits       = P + PMT * months;

    setResult({
      finalBalance:  Math.round(finalBalance  * 100) / 100,
      totalDeposits: Math.round(totalDeposits * 100) / 100,
      totalInterest: Math.round((finalBalance - totalDeposits) * 100) / 100,
    });
  };

  const sym = currencies[currency].symbol;
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const depositsPct  = result ? (result.totalDeposits  / result.finalBalance) * 100 : 0;
  const interestPct  = result ? (result.totalInterest  / result.finalBalance) * 100 : 0;

  const faqSchema = [
    { question: "How do I calculate savings growth?", answer: "Savings growth is calculated using compound interest. Multiply your principal by (1 + interest rate / compounding periods) raised to the power of total compounding periods." },
    { question: "How often should savings compound?", answer: "Most savings accounts compound monthly or daily. The more frequently interest compounds, the faster your savings grow due to interest being earned on interest." },
    { question: "How much should I save each month?", answer: "A common guideline is to save at least 20% of your income. Use a savings calculator to set a specific goal and work backwards to find the monthly deposit needed." },
    { question: "What is the difference between APR and APY for savings?", answer: "APR is the nominal annual rate, while APY (Annual Percentage Yield) reflects the actual return after compounding. APY is always equal to or higher than APR." }
  ];

  return (
    <>
      <SEO
        title="Savings Calculator UK 2025 — See How Your Money Grows With Interest"
        description="Free savings calculator. See how your money grows with compound interest, regular deposits and different compounding frequencies."
        keywords="savings calculator, savings account calculator, compound savings calculator, savings goal calculator"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Savings Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Savings Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[12vw] lg:text-[100px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>SAVINGS</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Plan your savings goals and see how your money grows with compound interest and regular deposits over time.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Final balance hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Final Balance</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {sym}{result.finalBalance.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">After {years} years</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Deposits", value: `${sym}${result.totalDeposits.toLocaleString()}` },
                    { label: "Interest Earned", value: `${sym}${result.totalInterest.toLocaleString()}` },
                    { label: "ROI", value: `${((result.totalInterest / result.totalDeposits) * 100).toFixed(2)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-base text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Deposits vs Interest bar */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">Savings Breakdown</p>
                  <div className="flex h-6 rounded-full overflow-hidden gap-0.5">
                    <div
                      className="flex items-center justify-center text-[10px] font-heading text-black rounded-l-full transition-all"
                      style={{ width: `${depositsPct}%`, background: ACCENT }}
                    >
                      {depositsPct > 15 ? "Deposits" : ""}
                    </div>
                    <div
                      className="flex items-center justify-center text-[10px] font-heading text-white rounded-r-full bg-purple-500/70 transition-all"
                      style={{ width: `${interestPct}%` }}
                    >
                      {interestPct > 15 ? "Interest" : ""}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                      Deposits ({depositsPct.toFixed(0)}%)
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full bg-purple-500/70" />
                      Interest ({interestPct.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Final Balance", value: `${sym}${result.finalBalance.toLocaleString()}` },
                  { label: "Total Deposits", value: `${sym}${result.totalDeposits.toLocaleString()}` },
                  { label: "Interest Earned", value: `${sym}${result.totalInterest.toLocaleString()}` },
                  { label: "ROI", value: `${((result.totalInterest / result.totalDeposits) * 100).toFixed(2)}%` },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <PiggyBank className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Initial + Monthly deposits */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Initial Deposit</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input type="number" value={initialDeposit} onChange={e => setInitialDeposit(e.target.value)} placeholder="1,000"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Deposit</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input type="number" value={monthlyDeposit} onChange={e => setMonthlyDeposit(e.target.value)} placeholder="200"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                  </div>
                </div>

                {/* Rate + Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Interest Rate</label>
                    <div className="relative">
                      <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(e.target.value)} placeholder="3.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Time Period</label>
                    <div className="relative">
                      <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Compound frequency */}
                <div>
                  <label className={labelClass}>Compound Frequency</label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger className="w-full bg-black/40 border-white/10 text-white rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C1A1A] border-white/10 text-white">
                      <SelectItem value="1">Annually</SelectItem>
                      <SelectItem value="4">Quarterly</SelectItem>
                      <SelectItem value="12">Monthly</SelectItem>
                      <SelectItem value="365">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Final Balance</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>{sym}{result.finalBalance.toLocaleString()}</span>
                    </div>
                    {[
                      { label: "Total Deposits", value: `${sym}${result.totalDeposits.toLocaleString()}` },
                      { label: "Interest Earned", value: `${sym}${result.totalInterest.toLocaleString()}`, accent: true },
                      { label: "ROI", value: `${((result.totalInterest / result.totalDeposits) * 100).toFixed(2)}%`, accent: true },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="font-heading" style={{ color: accent ? ACCENT : "rgba(255,255,255,0.7)" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateSavings}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Savings
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is a Savings Calculator?",
              description: "A savings calculator estimates how your money will grow over time based on your initial deposit, regular contributions, interest rate, and compounding frequency. It accounts for the power of compound interest — where you earn interest on your interest — giving you a realistic projection of your savings trajectory. Unlike simple interest calculations, compound interest means your returns accelerate over time, making early and consistent saving particularly powerful."
            }}
            howItWorks={{
              title: "How the Savings Calculator Works",
              description: "Our calculator uses the compound interest formula to project your savings growth. It factors in your starting balance, monthly contributions, the annual interest rate, and how often interest compounds (daily, monthly, quarterly, or annually).",
              steps: [
                { step: 1, title: "Enter Your Starting Balance", description: "Input the amount you already have saved. Even starting with zero is fine — regular contributions matter most over time." },
                { step: 2, title: "Set Monthly Contributions", description: "Enter how much you plan to save each month. The 50/30/20 rule suggests putting 20% of take-home pay toward savings and debt repayment." },
                { step: 3, title: "Choose Interest Rate & Term", description: "Enter the annual interest rate (AER) for your savings account and how many years you plan to save. UK savings accounts currently offer 3-5% AER for easy access and up to 5.5% for fixed-rate bonds." },
                { step: 4, title: "Review Your Projection", description: "See your projected final balance, total deposits made, and total interest earned. Compare different scenarios by adjusting the rate or contribution amount." }
              ]
            }}
            formula={{
              title: "Savings Growth Formula",
              formula: "FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]",
              explanation: "Where FV is future value, P is the initial principal, r is the annual interest rate (as a decimal), n is the number of times interest compounds per year, t is time in years, and PMT is the regular monthly payment. This formula combines the growth of a lump sum with the growth of a regular payment stream, both compounded at the same frequency."
            }}
            faqs={[
              { question: "How much should I save each month?", answer: "A common guideline is to save at least 20% of your income. Use the 50/30/20 rule: 50% on needs, 30% on wants, 20% on savings and debt. Start with what you can afford and increase gradually." },
              { question: "What is a good savings interest rate in the UK?", answer: "As of 2026, competitive UK savings rates range from 3-5% AER for easy access accounts and up to 5.5% for fixed-rate bonds. Cash ISAs offer tax-free interest up to your annual ISA allowance of £20,000." },
              { question: "How often should savings compound?", answer: "Most savings accounts compound monthly or daily. The more frequently interest compounds, the faster your money grows. Daily compounding earns slightly more than monthly, though the practical difference is small for most balances." },
              { question: "What is the difference between APR and AER?", answer: "APR (Annual Percentage Rate) is the simple annual rate without compounding. AER (Annual Equivalent Rate) includes the effect of compounding and shows the actual return you will earn. For savings, always compare AER figures." }
            ]}
            tips={[
              "Set up a standing order on payday so savings happen automatically before you spend",
              "Use a Cash ISA to shelter interest from tax — you get £20,000 per tax year",
              "Keep 3-6 months of expenses in an easy access account as an emergency fund",
              "For longer-term goals (5+ years), consider investing rather than saving — historically, investments have outpaced savings rates",
              "Review your savings rate annually and switch accounts if a better AER is available"
            ]}
          />
        </div>

        {/* Educational Content */}
        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-0">

          {/* 1. Definition */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">What Is a Savings Calculator?</p>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
              A savings calculator shows how your money grows over time when you combine an initial deposit, regular contributions, and compound interest. It uses the future value formula to project your balance — helping you set realistic savings goals and compare account types before committing.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl mt-3">
              Most UK savings accounts quote an <strong className="text-white">AER (Annual Equivalent Rate)</strong>, which accounts for compounding. The UK Personal Savings Allowance lets basic rate taxpayers earn £1,000/year in interest tax-free (£500 for higher rate). Cash ISAs shelter all interest — no limit.
            </p>
          </section>

          {/* 2. Formula */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">The Savings Formula</p>
            <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-sm text-zinc-200 mb-4 max-w-2xl">
              FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-zinc-400 max-w-2xl">
              {[["FV","Future value (your total savings)"],["P","Initial deposit"],["r","Annual interest rate (decimal)"],["n","Compounding periods per year"],["t","Time in years"],["PMT","Regular contribution per period"]].map(([v,d])=>(
                <div key={v} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                  <span className="text-blue-400 font-bold">{v}</span> — {d}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Example */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Worked Example</p>
            <p className="text-zinc-300 text-sm mb-4">Cash ISA: <strong className="text-white">£2,000 initial</strong>, <strong className="text-white">£200/month</strong> contributions, <strong className="text-white">4.5% AER</strong> compounding monthly, over <strong className="text-white">5 years</strong>.</p>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 max-w-md text-sm text-zinc-300 space-y-2">
              <div>Starting deposit: £2,000</div>
              <div>Contributions: £200 × 60 months = £12,000</div>
              <div>Total invested: £14,000</div>
              <div className="text-blue-400 font-bold text-base border-t border-white/10 pt-2 mt-2">Final balance: ~£15,540</div>
              <div className="text-zinc-400">Interest earned: ~£1,540</div>
            </div>
            <p className="text-zinc-400 text-sm mt-3 max-w-2xl">Over 10 years the same plan grows to ~£33,700 — more than doubling your £26,000 total contributions.</p>
          </section>

          {/* 4. Explanation — UK benchmark table */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">UK Savings Account Rates at a Glance (2026)</p>
            <div className="overflow-x-auto max-w-2xl">
              <table className="w-full text-sm text-zinc-300">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">Account Type</th>
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">Typical AER</th>
                    <th className="text-left py-3 text-[10px] font-heading uppercase tracking-widest text-white/40">Interest Taxed?</th>
                  </tr>
                </thead>
                <tbody>
                  {[["Easy Access","3.5–5.0%","Yes (PSA applies)"],["Fixed Rate Bond (1-yr)","4.0–5.2%","Yes (PSA applies)"],["Cash ISA","3.5–5.0%","No — fully sheltered"],["Lifetime ISA","up to 6.25% incl. bonus","No"],["Premium Bonds","~4.4% prize equivalent","No"]].map(([t,r,x])=>(
                    <tr key={t} className="border-b border-white/5">
                      <td className="py-3 pr-6 text-white">{t}</td>
                      <td className="py-3 pr-6 text-blue-400 font-semibold">{r}</td>
                      <td className="py-3 text-zinc-400">{x}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. FAQ */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-6">Frequently Asked Questions</p>
            <div className="space-y-6 max-w-3xl">
              {[
                { q: "What is a good savings rate in the UK?", a: "In 2026, competitive easy-access rates sit around 4–5% AER. Fixed-rate bonds and Cash ISAs can offer similar rates. Premium Bonds offer a prize-equivalent rate of around 4.4% — tax-free — though returns are variable." },
                { q: "What's the difference between AER and APR?", a: "AER (Annual Equivalent Rate) shows the actual return on savings accounting for compounding — always use this to compare savings accounts. APR (Annual Percentage Rate) is used for borrowing costs. Don't compare them directly." },
                { q: "Should I use a Cash ISA or a regular savings account?", a: "If you'll exceed your Personal Savings Allowance (£1,000 basic rate, £500 higher rate), a Cash ISA is usually better because interest is completely tax-free. If you're well within the allowance, the headline rate matters more than the wrapper." },
                { q: "How does inflation affect my savings?", a: "If your savings account pays 4% AER and inflation is 3%, your money is only growing in real terms by about 1%. Over long periods this erosion is significant — it's why long-term goals often require investing in assets with higher return potential." },
                { q: "What happens if I miss a monthly contribution?", a: "Missing one month has a small but compounding effect over time. Use the calculator above to see the impact of consistency — even adding £50/month makes a material difference over 10+ years." },
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
              <li><a href="https://www.moneyhelper.org.uk/en/savings/types-of-savings/compare-savings-accounts" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">MoneyHelper — Compare savings accounts</a></li>
              <li><a href="https://www.vanguard.co.uk/professional/education/tools-and-resources/the-power-of-compounding" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">Vanguard UK — The power of compounding</a></li>
              <li><a href="https://www.nerdwallet.com/uk/savings/savings-calculator/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">NerdWallet UK — Savings calculator guide</a></li>
            </ul>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Compound Interest Calculator", path: "/finance/compound-interest" },
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

export default SavingsCalculator;