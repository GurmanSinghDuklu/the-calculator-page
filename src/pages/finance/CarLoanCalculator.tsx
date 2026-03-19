import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, Car } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

export default function CarLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("25000");
  const [interestRate, setInterestRate] = useState("6");
  const [loanTerm, setLoanTerm] = useState("60");
  const [balloon, setBalloon] = useState("0");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    balloonPayment: number;
  } | null>(null);

  const calculateCarLoan = () => {
    const P = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const N = parseInt(loanTerm);
    const B = parseFloat(balloon);
    if (isNaN(P) || isNaN(rate) || isNaN(N) || isNaN(B) || P <= 0 || N <= 0) return;
    const i = rate / 12;
    const balloonPV = B / Math.pow(1 + i, N);
    const PMT = ((P - balloonPV) * i) / (1 - Math.pow(1 + i, -N));
    const totalPayment = PMT * N + B;
    setResult({
      monthlyPayment: PMT,
      totalPayment,
      totalInterest: totalPayment - P,
      balloonPayment: B,
    });
  };

  const sym = currencies[currency].symbol;
  const seo = seoData["/finance/car-loan"];
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "How is a car loan monthly payment calculated?", answer: "Monthly payment = [P × r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate, and n is the number of months." },
    { question: "What is a good interest rate for a car loan?", answer: "A good car loan rate depends on your credit score and the lender. In the UK, rates typically range from 4% to 14% APR. The better your credit score, the lower the rate." },
    { question: "Should I put a deposit down on a car loan?", answer: "Yes, a larger deposit reduces the loan amount, lowering your monthly payments and total interest paid. Most lenders recommend at least 10-20% deposit." },
    { question: "What is the total cost of a car loan?", answer: "Total cost = total monthly payments + any fees - deposit. Use a car loan calculator to compare different terms and interest rates to find the most affordable option." }
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/car-loan`}
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
            <span className="text-white/60">Car Loan</span>
          </nav>
        </div>

        {/* Split-screen hero */}
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
                CAR
              </span>
              <span
                className="block text-[10vw] lg:text-[85px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                LOAN
              </span>
              <span
                className="block text-[7vw] lg:text-[60px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate monthly payments for a car loan with an optional balloon payment at the end of the term.
              </p>
            </div>

            {/* Result stats on left */}
            {result && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: "Monthly Payment", value: `${sym}${result.monthlyPayment.toFixed(2)}` },
                  { label: "Balloon Payment", value: `${sym}${result.balloonPayment.toFixed(2)}` },
                  { label: "Total Payment",   value: `${sym}${result.totalPayment.toFixed(2)}` },
                  { label: "Total Interest",  value: `${sym}${result.totalInterest.toFixed(2)}` },
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
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <Car className="h-6 w-6" style={{ color: ACCENT }} />
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
                      type="number" step="100" min="0"
                      value={loanAmount}
                      onChange={e => setLoanAmount(e.target.value)}
                      placeholder="25,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
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
                        type="number" step="0.1" min="0"
                        value={interestRate}
                        onChange={e => setInterestRate(e.target.value)}
                        placeholder="6.0"
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
                        type="number" step="1" min="1"
                        value={loanTerm}
                        onChange={e => setLoanTerm(e.target.value)}
                        placeholder="60"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">mo</span>
                    </div>
                  </div>
                </div>

                {/* Balloon payment */}
                <div>
                  <label className={labelClass}>Balloon Payment (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number" step="100" min="0"
                      value={balloon}
                      onChange={e => setBalloon(e.target.value)}
                      placeholder="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <p className="text-[10px] text-white/20 font-sans mt-1">A lump sum due at the end of the loan term</p>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Monthly Payment</span>
                      <span className="text-3xl font-display text-white">{sym}{result.monthlyPayment.toFixed(2)}</span>
                    </div>
                    {[
                      { label: "Total Payment",  value: `${sym}${result.totalPayment.toFixed(2)}` },
                      { label: "Total Interest", value: `${sym}${result.totalInterest.toFixed(2)}`, accent: true },
                      ...(result.balloonPayment > 0 ? [{ label: "Balloon Payment", value: `${sym}${result.balloonPayment.toFixed(2)}` }] : []),
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
                  onClick={calculateCarLoan}
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
}