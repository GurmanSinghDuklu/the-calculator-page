import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Property category ─────────────────────────────────────
const ACCENT = "#F97316";

export default function MortgageOverpayment() {
  const [principal,          setPrincipal]          = useState("300000");
  const [interestRate,       setInterestRate]       = useState("4");
  const [termYears,          setTermYears]          = useState("30");
  const [monthlyOverpayment, setMonthlyOverpayment] = useState("200");
  const [lumpSum,            setLumpSum]            = useState("10000");
  const [lumpSumMonth,       setLumpSumMonth]       = useState("12");
  const [currency,           setCurrency]           = useState<Currency>("USD");
  const [mode,               setMode]               = useState<"regular" | "lump">("regular");

  const [regularResult, setRegularResult] = useState<{
    basePayment: number; newPayment: number; newTerm: number;
    interestSaved: number; timeSaved: number;
  } | null>(null);

  const [lumpResult, setLumpResult] = useState<{
    basePayment: number; outstandingBefore: number; outstandingAfter: number;
    newTerm: number; interestSaved: number; timeSaved: number;
  } | null>(null);

  const calculateRegularOverpayment = () => {
    const P = parseFloat(principal), r = parseFloat(interestRate) / 100;
    const N = parseInt(termYears) * 12, E = parseFloat(monthlyOverpayment);
    if (isNaN(P) || isNaN(r) || isNaN(N) || P <= 0 || N <= 0) return;
    const i = r / 12;
    const PMT = (P * i) / (1 - Math.pow(1 + i, -N));
    const newPMT = PMT + E;
    const newN = -Math.log(1 - (P * i) / newPMT) / Math.log(1 + i);
    const baseInterest = PMT * N - P;
    const newInterest  = newPMT * newN - P;
    setRegularResult({
      basePayment: PMT, newPayment: newPMT, newTerm: newN / 12,
      interestSaved: baseInterest - newInterest, timeSaved: (N - newN) / 12,
    });
  };

  const calculateLumpSumOverpayment = () => {
    const P = parseFloat(principal), r = parseFloat(interestRate) / 100;
    const N = parseInt(termYears) * 12, L = parseFloat(lumpSum), k = parseInt(lumpSumMonth);
    if (isNaN(P) || isNaN(r) || isNaN(N) || isNaN(L) || isNaN(k) || P <= 0 || N <= 0 || k < 0 || k >= N) return;
    const i = r / 12;
    const PMT = (P * i) / (1 - Math.pow(1 + i, -N));
    const OB_k = PMT * (1 - Math.pow(1 + i, -(N - k))) / i;
    const newP = OB_k - L;
    if (newP <= 0) { alert("The lump sum would pay off the entire mortgage!"); return; }
    const newRemaining = -Math.log(1 - (newP * i) / PMT) / Math.log(1 + i);
    const baseInterest = PMT * N - P;
    const newInterest  = PMT * k + PMT * newRemaining - P;
    setLumpResult({
      basePayment: PMT, outstandingBefore: OB_k, outstandingAfter: newP,
      newTerm: (k + newRemaining) / 12,
      interestSaved: baseInterest - newInterest, timeSaved: (N - k - newRemaining) / 12,
    });
  };

  const sym = currencies[currency].symbol;
  const seo = seoData["/finance/mortgage-overpayment"];
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const result = mode === "regular" ? regularResult : lumpResult;

  const faqSchema = [
    { question: "How do mortgage overpayments work?", answer: "Overpaying your mortgage means paying more than your required monthly amount. The extra payment reduces your outstanding balance, lowering the total interest you pay and shortening your mortgage term." },
    { question: "How much can I overpay on my mortgage?", answer: "Most lenders allow overpayments of up to 10% of your outstanding balance per year without penalty. Check your mortgage terms before overpaying to avoid early repayment charges." },
    { question: "Is it worth overpaying my mortgage?", answer: "Yes, in most cases. Overpaying reduces your loan balance faster, saving you significant interest over the life of the mortgage. Even small regular overpayments can save thousands of pounds." },
    { question: "Does overpaying reduce my monthly payment or my term?", answer: "This depends on your lender. Some reduce your term (keeping payments the same), others reduce your monthly payment. Reducing the term saves more interest overall." }
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/mortgage-overpayment`}
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
            <span className="text-white/60">Mortgage Overpayment</span>
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
                className="block text-[10vw] lg:text-[80px]"
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
                className="block text-[10vw] lg:text-[80px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                OVER-
              </span>
              <span
                className="block text-[7vw] lg:text-[55px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                PAYMENT
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate how much interest and time you save by making regular extra payments or a one-time lump sum.
              </p>
            </div>

            {/* Results on left */}
            {mode === "regular" && regularResult && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Interest Saved</p>
                  <p className="font-display text-4xl" style={{ color: ACCENT }}>
                    {sym}{regularResult.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    {regularResult.timeSaved.toFixed(1)} years off your mortgage
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Base Payment", value: `${sym}${regularResult.basePayment.toFixed(2)}` },
                    { label: "New Payment",  value: `${sym}${regularResult.newPayment.toFixed(2)}` },
                    { label: "New Term",     value: `${regularResult.newTerm.toFixed(1)} yrs` },
                    { label: "Time Saved",   value: `${regularResult.timeSaved.toFixed(1)} yrs` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Interest Saved", value: `${sym}${regularResult.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                  { label: "Time Saved", value: `${regularResult.timeSaved.toFixed(1)} yrs` },
                  { label: "New Monthly Payment", value: `${sym}${regularResult.newPayment.toFixed(2)}` },
                  { label: "New Term", value: `${regularResult.newTerm.toFixed(1)} yrs` },
                ]} />
              </div>
            )}

            {mode === "lump" && lumpResult && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Interest Saved</p>
                  <p className="font-display text-4xl" style={{ color: ACCENT }}>
                    {sym}{lumpResult.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    {lumpResult.timeSaved.toFixed(1)} years off your mortgage
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Balance Before", value: `${sym}${lumpResult.outstandingBefore.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: "Balance After",  value: `${sym}${lumpResult.outstandingAfter.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: "New Term",       value: `${lumpResult.newTerm.toFixed(1)} yrs` },
                    { label: "Time Saved",     value: `${lumpResult.timeSaved.toFixed(1)} yrs` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Interest Saved", value: `${sym}${lumpResult.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                  { label: "Time Saved", value: `${lumpResult.timeSaved.toFixed(1)} yrs` },
                  { label: "Balance After Lump Sum", value: `${sym}${lumpResult.outstandingAfter.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                  { label: "New Term", value: `${lumpResult.newTerm.toFixed(1)} yrs` },
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

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">

              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <Home className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              {/* Base mortgage inputs */}
              <div className="space-y-4">
                <p className={labelClass}>Base Mortgage</p>
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Mortgage Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input type="number" step="1000" min="0" value={principal} onChange={e => setPrincipal(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="300,000" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Interest Rate</label>
                    <div className="relative">
                      <input type="number" step="0.1" min="0" value={interestRate} onChange={e => setInterestRate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="4.0" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Mortgage Term</label>
                  <div className="relative">
                    <input type="number" step="1" min="1" value={termYears} onChange={e => setTermYears(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="30" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                  </div>
                </div>
              </div>

              {/* Mode toggle */}
              <div>
                <p className={labelClass}>Overpayment Strategy</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["regular", "lump"] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className="py-3 px-4 rounded-lg font-heading text-xs uppercase tracking-widest transition-all border"
                      style={{
                        borderColor: mode === m ? ACCENT : "rgba(255,255,255,0.08)",
                        background:  mode === m ? `${ACCENT}20` : "transparent",
                        color:       mode === m ? ACCENT : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {m === "regular" ? "Regular Extra" : "Lump Sum"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode-specific inputs */}
              {mode === "regular" ? (
                <div>
                  <label className={labelClass}>Extra Monthly Payment</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                    <input type="number" step="10" min="0" value={monthlyOverpayment} onChange={e => setMonthlyOverpayment(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="200" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Lump Sum Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input type="number" step="100" min="0" value={lumpSum} onChange={e => setLumpSum(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="10,000" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Apply at Month</label>
                    <input type="number" step="1" min="0" value={lumpSumMonth} onChange={e => setLumpSumMonth(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="12" />
                  </div>
                </div>
              )}

              {/* Result preview */}
              {mode === "regular" && regularResult && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-end pb-3 border-b border-white/10">
                    <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Interest Saved</span>
                    <span className="text-2xl font-display" style={{ color: ACCENT }}>
                      {sym}{regularResult.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {[
                    { label: "New Term",   value: `${regularResult.newTerm.toFixed(1)} yrs` },
                    { label: "Time Saved", value: `${regularResult.timeSaved.toFixed(1)} yrs` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                      <span className="text-white/70 font-heading">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              {mode === "lump" && lumpResult && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-end pb-3 border-b border-white/10">
                    <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Interest Saved</span>
                    <span className="text-2xl font-display" style={{ color: ACCENT }}>
                      {sym}{lumpResult.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {[
                    { label: "New Term",   value: `${lumpResult.newTerm.toFixed(1)} yrs` },
                    { label: "Time Saved", value: `${lumpResult.timeSaved.toFixed(1)} yrs` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                      <span className="text-white/70 font-heading">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Calculate button */}
              <button
                onClick={mode === "regular" ? calculateRegularOverpayment : calculateLumpSumOverpayment}
                className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
              >
                {mode === "regular" ? "Calculate Regular Overpayment" : "Calculate Lump Sum Impact"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
        </div>

        <FinancialDisclosure variant="mortgage" />

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