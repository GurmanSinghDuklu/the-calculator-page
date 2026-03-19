import { useState } from "react";
import { SEO } from "@/components/SEO";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CurrencySelector, Currency } from "@/components/CurrencySelector";
import { Home, TrendingDown, Clock, PiggyBank, Calculator, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// ─── Accent colour for Property category ─────────────────────────────────────
const ACCENT = "#F97316";

const currencySymbols: Record<string, string> = { GBP: "£", USD: "$", EUR: "€", AUD: "A$", CAD: "C$" };

// ─── Calculation helpers (unchanged) ─────────────────────────────────────────
const calcMonthlyPayment = (P: number, rate: number, years: number) => {
  const r = rate / 12 / 100, n = years * 12;
  return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};
const calcWeeklyTrue = (P: number, rate: number, years: number) => {
  const r = rate / 52 / 100, n = years * 52;
  return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};
const simulateWeeklyPayoff = (P: number, rate: number, weeklyPayment: number) => {
  let balance = P, totalInterest = 0, weeks = 0;
  const dailyRate = rate / 365 / 100;
  while (balance > 0 && weeks < 5200) {
    const interest = balance * dailyRate * 7;
    totalInterest += interest;
    balance = Math.max(0, balance + interest - weeklyPayment);
    weeks++;
  }
  return { weeks, totalInterest };
};
const calcTotalInterestMonthly = (P: number, rate: number, years: number) =>
  (calcMonthlyPayment(P, rate, years) * years * 12) - P;

interface CalculationResult {
  monthlyPayment: number; weeklySimple: number; weeklyTrue: number;
  originalTermYears: number; newTermYears: number; newTermMonths: number;
  yearsSaved: number; monthsSaved: number;
  totalInterestMonthly: number; totalInterestWeekly: number; interestSaved: number;
}

// ─── Component ────────────────────────────────────────────────────────────────
const WeeklyMortgageCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [interestRate,   setInterestRate]   = useState("");
  const [mortgageTerm,   setMortgageTerm]   = useState("");
  const [currency,       setCurrency]       = useState<Currency>("GBP");
  const [result,         setResult]         = useState<CalculationResult | null>(null);

  const symbol = currencySymbols[currency] || "£";
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "Does paying my mortgage weekly save money?", answer: "Yes. Making weekly payments means you make the equivalent of 13 monthly payments per year instead of 12. This reduces your principal faster, saving interest and shortening your mortgage term." },
    { question: "How do I calculate weekly mortgage payments?", answer: "Divide your annual mortgage payment by 52 to get the weekly amount. Some lenders offer true weekly payment schedules that further accelerate payoff." },
    { question: "What is the difference between bi-weekly and weekly mortgage payments?", answer: "Bi-weekly payments are made every two weeks (26 half-payments = 13 full payments per year). Weekly payments are made 52 times a year. Both save interest compared to monthly payments." },
    { question: "Will my lender accept weekly mortgage payments?", answer: "Not all lenders accept weekly payments. Check with your lender or mortgage provider to confirm they support this payment frequency before switching." }
  ];

  const calculate = () => {
    const P    = parseFloat(mortgageAmount.replace(/,/g, ""));
    const rate = parseFloat(interestRate);
    const years = parseInt(mortgageTerm);

    if (!P || P <= 0 || !rate || rate <= 0 || !years || years <= 0) {
      toast({ title: "Invalid input", description: "Please enter valid positive numbers for all fields.", variant: "destructive" });
      return;
    }

    const monthlyPayment = calcMonthlyPayment(P, rate, years);
    const weeklySimple   = monthlyPayment / 4;
    const weeklyTrue     = calcWeeklyTrue(P, rate, years);
    const { weeks, totalInterest: totalInterestWeekly } = simulateWeeklyPayoff(P, rate, weeklySimple);

    const newTermYearsExact = weeks / 52;
    const newTermYears  = Math.floor(newTermYearsExact);
    const newTermMonths = Math.round((newTermYearsExact - newTermYears) * 12);
    const totalInterestMonthly = calcTotalInterestMonthly(P, rate, years);
    const interestSaved = totalInterestMonthly - totalInterestWeekly;
    const yearsSavedExact = years - newTermYearsExact;
    const yearsSaved  = Math.floor(yearsSavedExact);
    const monthsSaved = Math.round((yearsSavedExact - yearsSaved) * 12);

    setResult({ monthlyPayment, weeklySimple, weeklyTrue, originalTermYears: years, newTermYears, newTermMonths, yearsSaved, monthsSaved, totalInterestMonthly, totalInterestWeekly, interestSaved });
    toast({ title: "Calculation complete", description: `You could save ${symbol}${interestSaved.toLocaleString("en-GB", { maximumFractionDigits: 0 })} in interest!` });
  };

  const fmt = (n: number) => n.toLocaleString("en-GB", { maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString("en-GB", { maximumFractionDigits: 0 });

  return (
    <>
      <SEO
        title="Weekly Mortgage Payment Calculator | Save Years on Your Mortgage"
        description="Calculate how switching to weekly mortgage payments can save you thousands in interest and years off your mortgage."
        keywords="weekly mortgage payments, mortgage calculator UK, pay off mortgage faster, mortgage interest savings"
        canonicalUrl="https://www.thecalculatorpage.com/finance/weekly-mortgage"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/property" className="hover:text-white transition-colors">Property</Link>
            <span>/</span>
            <span className="text-white/60">Weekly Mortgage</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>WEEKLY</span>
              <span className="block text-[10vw] lg:text-[82px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>MORTGAGE</span>
              <span className="block text-[6vw] lg:text-[50px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Discover how switching to weekly payments can shave years off your mortgage and save thousands in interest.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Interest saved hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <PiggyBank className="h-4 w-4" style={{ color: ACCENT }} />
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30">Interest Saved</p>
                  </div>
                  <p className="font-display text-4xl" style={{ color: ACCENT }}>{symbol}{fmt0(result.interestSaved)}</p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    vs {symbol}{fmt0(result.totalInterestMonthly)} with monthly payments
                  </p>
                </div>

                {/* Time saved */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" style={{ color: ACCENT }} />
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30">Time Saved</p>
                  </div>
                  <p className="font-display text-3xl text-white">
                    {result.yearsSaved > 0 ? `${result.yearsSaved} yrs ` : ""}{result.monthsSaved > 0 ? `${result.monthsSaved} mo` : ""}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    Pay off in {result.newTermYears} yrs {result.newTermMonths} mo instead of {result.originalTermYears} yrs
                  </p>
                </div>

                {/* Payment comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Monthly Payment",  value: `${symbol}${fmt(result.monthlyPayment)}` },
                    { label: "Weekly Payment",   value: `${symbol}${fmt(result.weeklySimple)}` },
                    { label: "Weekly (True Amort.)", value: `${symbol}${fmt(result.weeklyTrue)}` },
                    { label: "Original Term",    value: `${result.originalTermYears} yrs` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-base text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Mortgage Details</h3>
                <Home className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Mortgage amount */}
                <div>
                  <label className={labelClass}>Mortgage Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{symbol}</span>
                    <input
                      type="text" value={mortgageAmount} onChange={e => setMortgageAmount(e.target.value)} placeholder="250,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Rate + Term */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Interest Rate (APR)</label>
                    <div className="relative">
                      <input
                        type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(e.target.value)} placeholder="5.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Mortgage Term</label>
                    <div className="relative">
                      <input
                        type="number" value={mortgageTerm} onChange={e => setMortgageTerm(e.target.value)} placeholder="25"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Interest Saved</span>
                      <span className="text-2xl font-display" style={{ color: ACCENT }}>{symbol}{fmt0(result.interestSaved)}</span>
                    </div>
                    {[
                      { label: "New Term",        value: `${result.newTermYears} yrs ${result.newTermMonths} mo` },
                      { label: "Time Saved",      value: `${result.yearsSaved} yrs ${result.monthsSaved} mo` },
                      { label: "Weekly Payment",  value: `${symbol}${fmt(result.weeklySimple)}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="text-white/70 font-heading">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculate}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  <Calculator className="h-4 w-4" />
                  Calculate Savings
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest mb-8" style={{ color: ACCENT }}>How Weekly Payments Work</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: "1", title: "Divide by 4", body: "Take your monthly payment and divide by 4 to get your weekly amount." },
                { n: "2", title: "52 Payments = 13 Months", body: "Because there are 52 weeks, you make the equivalent of 13 monthly payments per year." },
                { n: "3", title: "Interest Compounds Less", body: "More frequent payments reduce the balance faster, meaning less interest accrues over time." },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-black text-sm" style={{ background: ACCENT }}>
                    {n}
                  </div>
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest text-white mb-2">{title}</p>
                    <p className="text-xs text-white/30 font-sans leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FinancialDisclaimer className="mt-4" />
        </div>

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

export default WeeklyMortgageCalculator;