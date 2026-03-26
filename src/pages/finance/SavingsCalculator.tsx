import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { compoundInterestSchema } from "@/lib/validation";
import { toast } from "sonner";
import { ArrowRight, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

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
        title="Savings Calculator - Calculate Your Savings Growth"
        description="Free savings calculator to plan your savings goals. See how your money grows with compound interest, regular deposits, and different compounding frequencies."
        keywords="savings calculator, savings account calculator, compound savings calculator, savings goal calculator"
        faqSchema={faqSchema}
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
          <FinancialDisclaimer type="investment" className="mt-2" />
        </div>

        <FinancialDisclosure variant="investment" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SavingsCalculator;