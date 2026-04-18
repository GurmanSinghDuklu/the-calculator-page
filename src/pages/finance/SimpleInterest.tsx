import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

const SimpleInterest = () => {
  const [principal, setPrincipal] = useState("5000");
  const [rate,      setRate]      = useState("6");
  const [time,      setTime]      = useState("5");
  const [currency,  setCurrency]  = useState<Currency>("USD");
  const [result, setResult] = useState<{ interest: number; totalAmount: number } | null>(null);

  const calculateSimpleInterest = () => {
    const P = parseFloat(principal), R = parseFloat(rate), T = parseFloat(time);
    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R < 0 || T <= 0) return;
    const interest = (P * R * T) / 100;
    setResult({
      interest:    Math.round(interest           * 100) / 100,
      totalAmount: Math.round((P + interest)     * 100) / 100,
    });
  };

  const sym = currencies[currency].symbol;
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const principalPct = result ? (parseFloat(principal) / result.totalAmount) * 100 : 0;
  const interestPct  = result ? (result.interest       / result.totalAmount) * 100 : 0;

  const faqSchema = [
    { question: "What is the simple interest formula?", answer: "Simple interest is calculated as: Interest = Principal × Rate × Time. For example, £1,000 at 5% for 3 years earns £150 in simple interest." },
    { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any accumulated interest, resulting in faster growth over time." },
    { question: "When is simple interest used?", answer: "Simple interest is commonly used for short-term loans, car loans, and some personal loans. It is also used in savings bonds and treasury bills." },
    { question: "How do I calculate the total amount with simple interest?", answer: "Total Amount = Principal + (Principal × Rate × Time). So £1,000 at 5% for 2 years gives a total of £1,100." }
  ];

  return (
    <>
      <SEO
        title="Simple Interest Calculator UK 2025 — I = PRT Formula"
        description="Free simple interest calculator to calculate interest on loans and investments. Find interest amount and total value."
        keywords="simple interest calculator, simple interest formula, calculate simple interest"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Simple Interest Calculator",
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
            <span className="text-white/60">Simple Interest</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[9vw] lg:text-[75px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>SIMPLE</span>
              <span className="block text-[9vw] lg:text-[75px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>INTEREST</span>
              <span className="block text-[6vw] lg:text-[50px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate simple interest on any principal amount. Formula: <span className="text-white/50">I = (P × R × T) / 100</span>
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Total amount hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Total Amount</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {sym}{result.totalAmount.toLocaleString()}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Principal",       value: `${sym}${parseFloat(principal).toLocaleString()}` },
                    { label: "Interest Earned", value: `${sym}${result.interest.toLocaleString()}` },
                    { label: "Rate",            value: `${rate}% per year` },
                    { label: "Time Period",     value: `${time} years` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Principal vs Interest bar */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">Breakdown</p>
                  <div className="flex h-6 rounded-full overflow-hidden gap-0.5">
                    <div className="flex items-center justify-center text-[10px] font-heading text-black rounded-l-full transition-all"
                      style={{ width: `${principalPct}%`, background: ACCENT }}>
                      {principalPct > 20 ? "Principal" : ""}
                    </div>
                    <div className="flex items-center justify-center text-[10px] font-heading text-white rounded-r-full bg-purple-500/70 transition-all"
                      style={{ width: `${interestPct}%` }}>
                      {interestPct > 10 ? "Interest" : ""}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                      Principal ({principalPct.toFixed(0)}%)
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full bg-purple-500/70" />
                      Interest ({interestPct.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Total Amount", value: `${sym}${result.totalAmount.toLocaleString()}` },
                  { label: "Interest Earned", value: `${sym}${result.interest.toLocaleString()}` },
                  { label: "Principal", value: `${sym}${parseFloat(principal).toLocaleString()}` },
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
                <Percent className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Principal */}
                <div>
                  <label className={labelClass}>Principal Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="5,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  </div>
                </div>

                {/* Rate + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Annual Rate</label>
                    <div className="relative">
                      <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} placeholder="6"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Time Period</label>
                    <div className="relative">
                      <input type="number" step="0.1" value={time} onChange={e => setTime(e.target.value)} placeholder="5"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Formula card */}
                <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/20 mb-1">Formula</p>
                  <p className="font-heading text-white/50 text-sm">I = (P × R × T) / 100</p>
                  <p className="text-[9px] text-white/20 font-sans mt-1">P = Principal &nbsp;·&nbsp; R = Rate &nbsp;·&nbsp; T = Time</p>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Total Amount</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>{sym}{result.totalAmount.toLocaleString()}</span>
                    </div>
                    {[
                      { label: "Principal",       value: `${sym}${parseFloat(principal).toLocaleString()}` },
                      { label: "Interest Earned", value: `${sym}${result.interest.toLocaleString()}`, accent: true },
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
                  onClick={calculateSimpleInterest}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Interest
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

                <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is Simple Interest?",
              description: "Simple interest is calculated only on the original principal amount — it does not compound. This makes it straightforward to calculate and commonly used for short-term loans, car finance, Treasury bills, and some personal loans. Unlike compound interest where you earn interest on interest, simple interest remains constant each period, making total costs more predictable but also meaning your money grows more slowly if saving."
            }}
            howItWorks={{
              title: "How Simple Interest Is Calculated",
              description: "Simple interest multiplies the principal by the rate and time period. The interest amount stays the same each year because it is always calculated on the original amount, never on accumulated interest.",
              steps: [
                { step: 1, title: "Enter the Principal", description: "Input the initial amount borrowed or invested. This is the base on which all interest will be calculated." },
                { step: 2, title: "Set the Annual Rate", description: "Enter the annual interest rate as a percentage. For loans, this is the cost of borrowing. For investments, this is your return." },
                { step: 3, title: "Choose the Time Period", description: "Enter the number of years. Simple interest grows linearly, so doubling the time doubles the interest — unlike compound interest which accelerates." },
                { step: 4, title: "Review the Results", description: "See the total interest earned or paid, and the final amount. Compare with compound interest to understand the difference." }
              ]
            }}
            formula={{
              title: "Simple Interest Formula",
              formula: "I = P × r × t",
              explanation: "Where I is the interest earned, P is the principal (initial amount), r is the annual interest rate expressed as a decimal (e.g., 5% = 0.05), and t is the time in years. The total amount is A = P + I. For example, £10,000 at 5% for 3 years = £10,000 × 0.05 × 3 = £1,500 interest, giving a total of £11,500."
            }}
            faqs={[
              { question: "What is the simple interest formula?", answer: "The formula is I = P × r × t, where I is interest, P is principal, r is the annual rate as a decimal, and t is time in years. Total amount = Principal + Interest. It is the most straightforward interest calculation." },
              { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously accumulated interest. Over time, compound interest produces significantly higher returns because you earn interest on your interest." },
              { question: "When is simple interest used?", answer: "Simple interest is commonly used for short-term personal loans, car finance agreements, Treasury bills, some bonds, and hire purchase agreements. It is also used in some savings accounts, though most UK savings accounts use compound interest." },
              { question: "Is simple interest better for borrowers or savers?", answer: "Simple interest benefits borrowers because you pay less total interest compared to compound interest over the same period. For savers, compound interest is better because your returns grow faster over time. This is why most savings accounts compound." }
            ]}
            tips={[
              "When comparing loans, check whether interest is simple or compound — compound interest costs more over the same period",
              "Simple interest is ideal for short-term borrowing where the difference from compound interest is minimal",
              "For savings, always prefer compound interest accounts — the difference grows significantly over longer periods",
              "Convert between simple and compound rates using: effective rate = (1 + r/n)^n - 1"
            ]}
          />
        </div>

<FinancialDisclosure variant="general" />

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

export default SimpleInterest;