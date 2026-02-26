import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { mortgageSchema } from "@/lib/validation";
import { toast } from "sonner";
import { Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Property category ─────────────────────────────────────
const ACCENT = "#F97316"; // accent-orange

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("70000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    principalAndInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
    totalPayment: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rateAnnual = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);
    const tax = parseFloat(propertyTax) / 12;
    const insurance = parseFloat(homeInsurance) / 12;

    try {
      mortgageSchema.parse({ homePrice: price, downPayment: down, interestRate: rateAnnual, loanTerm: termYears });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
      return;
    }

    const rate = rateAnnual / 100 / 12;
    const term = termYears * 12;
    const loanAmount = price - down;
    const principalAndInterest =
      rate === 0
        ? loanAmount / term
        : (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const monthlyPayment = principalAndInterest + tax + insurance;
    const totalPayment = principalAndInterest * term;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      principalAndInterest: Math.round(principalAndInterest * 100) / 100,
      monthlyTax: Math.round(tax * 100) / 100,
      monthlyInsurance: Math.round(insurance * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
    });
  };

  const sym = currencies[currency].symbol;
  const downPct = homePrice && downPayment
    ? ((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)
    : null;

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "How much house can I afford?", answer: "Financial experts recommend spending no more than 28-30% of your gross monthly income on housing costs, including mortgage payment, property taxes, and insurance." },
    { question: "What is the difference between APR and interest rate?", answer: "The interest rate is the cost of borrowing the principal loan amount. APR includes the interest rate plus other costs like mortgage insurance, closing costs, and lender fees." },
    { question: "Should I choose a 15-year or 30-year mortgage?", answer: "A 15-year mortgage has higher monthly payments but lower total interest costs. A 30-year mortgage has lower monthly payments but you pay significantly more in interest over time." },
    { question: "How much down payment do I need?", answer: "While 20% down is traditional and helps avoid PMI, many loans allow lower down payments. FHA loans require as little as 3.5%." },
    { question: "What factors affect mortgage interest rates?", answer: "Rates depend on your credit score, down payment size, loan type, loan term, property type, and current market conditions." }
  ];

  return (
    <>
      <SEO
        title="Mortgage Calculator - Calculate Monthly Mortgage Payments"
        description="Free mortgage calculator to estimate your monthly payment including principal, interest, property tax, and home insurance."
        keywords="mortgage calculator, mortgage payment calculator, home loan calculator, monthly mortgage payment"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/property" className="hover:text-white transition-colors">Property</Link>
            <span>/</span>
            <span className="text-white/60">Mortgage Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            {/* Glow */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[13vw] lg:text-[110px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                MORTGAGE
              </span>
              <span
                className="block text-[9vw] lg:text-[75px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate your monthly mortgage payment including principal, interest, property tax, and home insurance.
              </p>
            </div>

            {/* Quick stats if result exists */}
            {result && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: "Loan Amount",     value: `${sym}${result.loanAmount.toLocaleString()}` },
                  { label: "Total Interest",  value: `${sym}${result.totalInterest.toLocaleString()}` },
                  { label: "Total Payment",   value: `${sym}${result.totalPayment.toLocaleString()}` },
                  { label: "Down Payment",    value: `${downPct}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                    <p className="font-display text-xl text-white">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            {/* Card glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <Home className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Home Price */}
                <div>
                  <label className={labelClass}>Home Price ({sym})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={homePrice}
                      onChange={e => setHomePrice(e.target.value)}
                      placeholder="350,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label className={labelClass}>Down Payment ({sym})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={e => setDownPayment(e.target.value)}
                      placeholder="70,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {downPct && (
                    <p className="text-[10px] font-heading uppercase tracking-widest mt-1" style={{ color: ACCENT }}>
                      {downPct}% down
                    </p>
                  )}
                </div>

                {/* Rate + Term */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Interest Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={e => setInterestRate(e.target.value)}
                        placeholder="6.5"
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

                {/* Tax + Insurance */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Property Tax (yr)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number"
                        value={propertyTax}
                        onChange={e => setPropertyTax(e.target.value)}
                        placeholder="3000"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Home Insurance (yr)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number"
                        value={homeInsurance}
                        onChange={e => setHomeInsurance(e.target.value)}
                        placeholder="1200"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
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
                      { label: "Principal & Interest", value: result.principalAndInterest },
                      { label: "Property Tax",         value: result.monthlyTax },
                      { label: "Home Insurance",       value: result.monthlyInsurance },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="text-white/70 font-heading">{sym}{value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateMortgage}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 20px -5px ${ACCENT}80`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Mortgage
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <FinancialDisclaimer type="loan" className="mt-6" />
          <CalculatorStaticContent
            whatIs={{
              title: "What is a Mortgage?",
              description: "A mortgage is a loan used to purchase real estate, where the property itself serves as collateral. The borrower makes regular payments over a set period (typically 15 or 30 years) that include both principal and interest."
            }}
            howItWorks={{
              title: "How to Calculate Your Mortgage Payment",
              description: "This calculator uses the standard amortization formula to determine your monthly payment, then adds estimated property taxes and insurance.",
              steps: [
                { step: 1, title: "Enter the Home Price", description: "Input the purchase price of the home you're considering." },
                { step: 2, title: "Specify Your Down Payment", description: "Enter the amount you'll pay upfront. A larger down payment means a smaller loan." },
                { step: 3, title: "Set the Interest Rate", description: "Input your expected mortgage interest rate." },
                { step: 4, title: "Choose Your Loan Term", description: "Select the length of your mortgage — 15 or 30 years are most common." },
                { step: 5, title: "Add Tax and Insurance", description: "Enter annual estimates for property taxes and homeowner's insurance." }
              ]
            }}
            formula={{
              title: "The Mortgage Payment Formula",
              formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
              explanation: "Where M is the monthly payment, P is the principal, r is the monthly interest rate, and n is the total number of payments."
            }}
            tips={[
              "Get pre-approved before house hunting to know your true budget",
              "Compare rates from at least 3–5 lenders — even 0.25% can save thousands",
              "Consider bi-weekly payments to pay off your mortgage faster",
              "Build an emergency fund of 3–6 months of housing costs before buying"
            ]}
            faqs={faqSchema}
          />
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

export default MortgageCalculator;