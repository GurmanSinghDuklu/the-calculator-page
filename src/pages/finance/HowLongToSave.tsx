import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

export default function HowLongToSave() {
  const [targetAmount,  setTargetAmount]  = useState("100000");
  const [initialAmount, setInitialAmount] = useState("10000");
  const [contribution,  setContribution]  = useState("500");
  const [interestRate,  setInterestRate]  = useState("7");
  const [frequency,     setFrequency]     = useState("12");
  const [timing,        setTiming]        = useState("end");
  const [currency,      setCurrency]      = useState<Currency>("USD");
  const [result, setResult] = useState<{
    periods: number;
    years: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateTime = () => {
    const FV = parseFloat(targetAmount);
    const P  = parseFloat(initialAmount);
    const C  = parseFloat(contribution);
    const r  = parseFloat(interestRate) / 100;
    const n  = parseFloat(frequency);
    if (isNaN(FV) || isNaN(P) || isNaN(C) || isNaN(r) || FV <= P) return;
    const i = r / n;
    const adjustedC = timing === "start" ? C * (1 + i) : C;
    const N = i === 0
      ? (FV - P) / adjustedC
      : Math.log((FV * i + adjustedC) / (P * i + adjustedC)) / Math.log(1 + i);
    const totalContributions = adjustedC * N;
    setResult({ periods: N, years: N / n, totalContributions, totalInterest: FV - P - totalContributions });
  };

  const sym = currencies[currency].symbol;
  const frequencyLabel = frequency === "12" ? "month" : frequency === "52" ? "week" : frequency === "1" ? "year" : "period";
  const seo = seoData["/finance/how-long-to-save"];
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const selectClass = "w-full bg-black/40 border-white/10 text-white rounded-lg";
  const selectContentClass = "bg-[#1C1A1A] border-white/10 text-white";

  const faqSchema = [
    { question: "How do I calculate how long it will take to save a target amount?", answer: "Divide your savings goal by your monthly contribution to estimate months needed (without interest). With interest, use the future value formula to get a more accurate timeline." },
    { question: "How does compound interest affect my savings timeline?", answer: "Compound interest accelerates your savings by earning interest on your interest. The higher the rate and the more frequently it compounds, the shorter your saving timeline will be." },
    { question: "What savings rate is realistic?", answer: "Typical savings account rates in the UK range from 2-6% AER. ISAs and fixed-rate bonds often offer higher rates. Shop around to maximise your return." },
    { question: "Is it better to save a lump sum or monthly?", answer: "Both are effective. Regular monthly contributions benefit from pound-cost averaging and are easier to sustain. A lump sum starts compounding immediately. A mix of both is often optimal." }
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/how-long-to-save`}
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
            <span className="text-white/60">How Long to Save</span>
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
                className="block text-[10vw] lg:text-[82px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                HOW LONG
              </span>
              <span
                className="block text-[10vw] lg:text-[82px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TO SAVE
              </span>
              <span
                className="block text-[6vw] lg:text-[50px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Find out exactly how long it will take to reach your savings goal with regular contributions and compound interest.
              </p>
            </div>

            {/* Result stats on left */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Time Required</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {result.years.toFixed(1)} <span className="text-2xl text-white/40">years</span>
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    {Math.ceil(result.periods)} {frequencyLabel}s of contributions
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Contributions", value: `${sym}${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: "Interest Earned",     value: `${sym}${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-xl text-white">{value}</p>
                    </div>
                  ))}
                </div>
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
                <PiggyBank className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Target + Initial */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Target Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number" step="100" min="0"
                        value={targetAmount}
                        onChange={e => setTargetAmount(e.target.value)}
                        placeholder="100,000"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Initial Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number" step="100" min="0"
                        value={initialAmount}
                        onChange={e => setInitialAmount(e.target.value)}
                        placeholder="10,000"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                </div>

                {/* Contribution + Rate */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Regular Contribution</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number" step="10" min="0"
                        value={contribution}
                        onChange={e => setContribution(e.target.value)}
                        placeholder="500"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Annual Interest Rate</label>
                    <div className="relative">
                      <input
                        type="number" step="0.1" min="0"
                        value={interestRate}
                        onChange={e => setInterestRate(e.target.value)}
                        placeholder="7.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                </div>

                {/* Frequency + Timing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Frequency</label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="52">Weekly</SelectItem>
                        <SelectItem value="26">Bi-weekly</SelectItem>
                        <SelectItem value="1">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className={labelClass}>Timing</label>
                    <Select value={timing} onValueChange={setTiming}>
                      <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem value="end">End of period</SelectItem>
                        <SelectItem value="start">Start of period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Time to Goal</span>
                      <span className="text-3xl font-display text-white">
                        {result.years.toFixed(1)} <span className="text-lg text-white/40">yrs</span>
                      </span>
                    </div>
                    {[
                      { label: "No. of Payments",     value: `${Math.ceil(result.periods)} ${frequencyLabel}s` },
                      { label: "Total Contributions", value: `${sym}${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      { label: "Interest Earned",     value: `${sym}${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, accent: true },
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
                  onClick={calculateTime}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Time Needed
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