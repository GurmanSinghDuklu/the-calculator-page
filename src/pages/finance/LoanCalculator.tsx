import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { loanSchema } from "@/lib/validation";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { toast } from "sonner";
import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

const loanStaticContent = {
  whatIs: {
    title: "What is a Loan Calculator?",
    description: "A loan calculator helps you estimate monthly payments, total interest costs, and overall repayment amounts for any type of loan — personal, auto, student, or mortgage."
  },
  howItWorks: {
    title: "How Does This Loan Calculator Work?",
    description: "This calculator uses the amortization formula to determine your fixed monthly payment based on loan amount, interest rate, and term.",
    steps: [
      { step: 1, title: "Enter Loan Amount",  description: "Input the total amount you plan to borrow from the lender" },
      { step: 2, title: "Set Interest Rate",  description: "Enter the annual percentage rate (APR) offered by your lender" },
      { step: 3, title: "Choose Loan Term",   description: "Select how many years you want to repay the loan" },
      { step: 4, title: "Review Results",     description: "See your monthly payment, total interest, and total cost breakdown" }
    ]
  },
  formula: {
    title: "The Loan Payment Formula",
    formula: "M = P × [r(1 + r)^n] / [(1 + r)^n - 1]",
    explanation: "Where M is your monthly payment, P is the principal, r is the monthly interest rate, and n is the total number of payments."
  },
  faqs: [
    { question: "What factors affect my loan payment?", answer: "Your monthly payment is primarily affected by the loan amount, interest rate, and loan term. Higher amount or rate increases payments; longer term decreases them but increases total interest." },
    { question: "What's the difference between APR and interest rate?", answer: "The interest rate is the base cost of borrowing. APR includes the interest rate plus fees, giving a more complete picture of total borrowing cost." },
    { question: "Should I choose a shorter or longer loan term?", answer: "Shorter terms mean higher monthly payments but less total interest. Longer terms offer lower payments but cost more over time." },
    { question: "How can I lower my monthly loan payment?", answer: "Get a lower rate through better credit, choose a longer term, make a larger down payment, or shop multiple lenders." },
    { question: "What is loan amortization?", answer: "Amortization spreads loan repayment into equal regular payments covering both interest and principal. Early payments go mostly toward interest; later payments pay more principal." }
  ],
  tips: [
    "Compare loan offers from multiple lenders to find the best interest rate",
    "Check your credit score before applying — better credit means lower rates",
    "Consider making extra payments to pay off your loan faster",
    "Factor in all fees when comparing loans, not just the interest rate",
    "Use this calculator to see how different loan terms affect total cost"
  ]
};

const LoanCalculator = () => {
  const [loanAmount,   setLoanAmount]   = useState("200000");
  const [interestRate, setInterestRate] = useState("4.5");
  const [loanTerm,     setLoanTerm]     = useState("30");
  const [currency,     setCurrency]     = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    const P    = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const term = parseFloat(loanTerm);
    try {
      const validated = loanSchema.parse({ loanAmount: P, interestRate: rate, loanTerm: term });
      const r = validated.interestRate / 100 / 12;
      const n = validated.loanTerm * 12;
      const monthlyPayment = r === 0
        ? validated.loanAmount / n
        : (validated.loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - validated.loanAmount;
      if (!isFinite(monthlyPayment) || !isFinite(totalPayment)) {
        toast.error("Calculation resulted in invalid values. Please check your inputs.");
        return;
      }
      setResult({
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalPayment:   Math.round(totalPayment   * 100) / 100,
        totalInterest:  Math.round(totalInterest  * 100) / 100,
      });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
    }
  };

  const sym = currencies[currency].symbol;
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const principalPct = result ? (parseFloat(loanAmount) / result.totalPayment) * 100 : 0;
  const interestPct  = result ? (result.totalInterest  / result.totalPayment) * 100 : 0;

  return (
    <>
      <SEO
        title="Loan Calculator UK - Free"
        description="Free loan calculator for personal loans, auto loans, and mortgages. Calculate monthly payments, total interest, and amortization schedules instantly."
        keywords="loan calculator, personal loan calculator, auto loan calculator, loan payment calculator"
        faqSchema={loanStaticContent.faqs}
        howToSchema={{
          name: "How to Calculate Loan Payments",
          steps: loanStaticContent.howItWorks.steps?.map(s => ({ name: s.title, text: s.description })) || []
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
            <span className="text-white/60">Loan Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[14vw] lg:text-[115px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                LOAN
              </span>
              <span
                className="block text-[8vw] lg:text-[65px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate monthly payments for personal loans, auto loans, and mortgages. See your full cost breakdown instantly.
              </p>
            </div>

            {result && (
              <div className="mt-10 space-y-4">
                {/* Monthly payment hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Monthly Payment</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {sym}{result.monthlyPayment.toLocaleString()}
                  </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Payment",  value: `${sym}${result.totalPayment.toLocaleString()}` },
                    { label: "Total Interest", value: `${sym}${result.totalInterest.toLocaleString()}` },
                    { label: "Loan Amount",    value: `${sym}${parseFloat(loanAmount).toLocaleString()}` },
                    { label: "Loan Term",      value: `${loanTerm} years` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Principal vs Interest bar */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">Principal vs Interest</p>
                  <div className="flex h-6 rounded-full overflow-hidden gap-0.5">
                    <div
                      className="flex items-center justify-center text-[10px] font-heading text-black rounded-l-full transition-all"
                      style={{ width: `${principalPct}%`, background: ACCENT }}
                    >
                      {principalPct.toFixed(0)}%
                    </div>
                    <div
                      className="flex items-center justify-center text-[10px] font-heading text-white rounded-r-full bg-red-500/70 transition-all"
                      style={{ width: `${interestPct}%` }}
                    >
                      {interestPct.toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                      Principal
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full bg-red-500/70" />
                      Interest
                    </span>
                  </div>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Monthly Payment", value: `${sym}${result.monthlyPayment.toLocaleString()}` },
                  { label: "Total Payment", value: `${sym}${result.totalPayment.toLocaleString()}` },
                  { label: "Total Interest", value: `${sym}${result.totalInterest.toLocaleString()}` },
                ]} />
              </div>
            )}
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
                <DollarSign className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Loan Amount */}
                <div>
                  <label className={labelClass}>Loan Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={e => setLoanAmount(e.target.value)}
                      placeholder="200,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Rate + Term */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Interest Rate</label>
                    <div className="relative">
                      <input
                        type="number" step="0.1"
                        value={interestRate}
                        onChange={e => setInterestRate(e.target.value)}
                        placeholder="4.5"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Loan Term</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={e => setLoanTerm(e.target.value)}
                        placeholder="30"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Monthly Payment</span>
                      <span className="text-3xl font-display text-white">{sym}{result.monthlyPayment.toLocaleString()}</span>
                    </div>
                    {[
                      { label: "Total Payment",  value: `${sym}${result.totalPayment.toLocaleString()}` },
                      { label: "Total Interest", value: `${sym}${result.totalInterest.toLocaleString()}`, accent: true },
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
                  onClick={calculateLoan}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Payment
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content + disclaimer */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent {...loanStaticContent} />
        </div>

        <FinancialDisclosure variant="mortgage" />

        <FinancialDisclosure variant="general" />

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

export default LoanCalculator;