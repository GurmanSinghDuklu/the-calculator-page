import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, Percent } from "lucide-react";
import { Link } from "react-router-dom";

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

  return (
    <>
      <SEO
        title="Simple Interest Calculator - Calculate Interest Earned"
        description="Free simple interest calculator to calculate interest on loans and investments. Find interest amount and total value."
        keywords="simple interest calculator, simple interest formula, calculate simple interest"
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
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

export default SimpleInterest;