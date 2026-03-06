import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Property category ─────────────────────────────────────
const ACCENT = "#F97316";

export default function FutureHouseValue() {
  const [currentValue, setCurrentValue] = useState("300000");
  const [growthRate, setGrowthRate]     = useState("3");
  const [years, setYears]               = useState("10");
  const [currency, setCurrency]         = useState<Currency>("USD");
  const [result, setResult] = useState<{
    futureValue: number;
    totalGain: number;
    totalGainPercent: number;
  } | null>(null);

  const calculateFutureValue = () => {
    const V0 = parseFloat(currentValue);
    const g  = parseFloat(growthRate) / 100;
    const t  = parseFloat(years);
    if (isNaN(V0) || isNaN(g) || isNaN(t) || V0 <= 0 || t < 0) return;
    const FV = V0 * Math.pow(1 + g, t);
    const totalGain = FV - V0;
    setResult({ futureValue: FV, totalGain, totalGainPercent: (totalGain / V0) * 100 });
  };

  const sym = currencies[currency].symbol;
  const seo = seoData["/finance/future-house-value"];
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/future-house-value`}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/property" className="hover:text-white transition-colors">Property</Link>
            <span>/</span>
            <span className="text-white/60">Future House Value</span>
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
                className="block text-[12vw] lg:text-[95px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                FUTURE
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
                HOUSE
              </span>
              <span
                className="block text-[7vw] lg:text-[58px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                VALUE
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Project your property's future value based on an annual growth rate. See how much your home could appreciate over time.
              </p>
            </div>

            {/* Result stats on left */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Future Property Value</p>
                  <p className="font-display text-4xl" style={{ color: ACCENT }}>
                    {sym}{result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    In {years} years at {growthRate}% annual growth
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Appreciation", value: `${sym}${result.totalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: "Total Gain",          value: `${result.totalGainPercent.toFixed(2)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-xl text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/20 font-sans leading-relaxed">
                  A property worth {sym}{parseFloat(currentValue).toLocaleString(undefined, { maximumFractionDigits: 0 })} today will be worth {sym}{result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} in {years} years at {growthRate}% annual growth.
                </p>
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
                <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Current Value */}
                <div>
                  <label className={labelClass}>Current Property Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number" step="1000" min="0"
                      value={currentValue}
                      onChange={e => setCurrentValue(e.target.value)}
                      placeholder="300,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Growth Rate + Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Annual Growth Rate</label>
                    <div className="relative">
                      <input
                        type="number" step="0.1"
                        value={growthRate}
                        onChange={e => setGrowthRate(e.target.value)}
                        placeholder="3.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Time Period</label>
                    <div className="relative">
                      <input
                        type="number" step="1" min="0"
                        value={years}
                        onChange={e => setYears(e.target.value)}
                        placeholder="10"
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
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Future Value</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>
                        {sym}{result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    {[
                      { label: "Total Appreciation", value: `${sym}${result.totalGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      { label: "Total Gain %",        value: `+${result.totalGainPercent.toFixed(2)}%` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="font-heading text-white/70">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateFutureValue}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Future Value
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