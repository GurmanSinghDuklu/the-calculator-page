import { useState } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Percent } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E"; // accent-green

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Percentage Calculator",
  "applicationCategory": "UtilitiesApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free online percentage calculator. Calculate percentage of a number, percentage increase, percentage decrease, and find what percent one number is of another."
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thecalculatorpage.com/" },
    { "@type": "ListItem", "position": 2, "name": "Everyday Calculators", "item": "https://www.thecalculatorpage.com/#misc" },
    { "@type": "ListItem", "position": 3, "name": "Percentage Calculator", "item": "https://www.thecalculatorpage.com/misc/percentage" }
  ]
};

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all";

type Mode = "percentOf" | "whatPercent" | "change";

const PercentageCalculator = () => {
  const [mode, setMode] = useState<Mode>("percentOf");

  // What is X% of Y
  const [percentOf, setPercentOf] = useState({ percent: "15", number: "200" });
  const [percentOfResult, setPercentOfResult] = useState<number | null>(null);

  // X is what % of Y
  const [whatPercent, setWhatPercent] = useState({ number1: "50", number2: "200" });
  const [whatPercentResult, setWhatPercentResult] = useState<number | null>(null);

  // Percentage change
  const [percentChange, setPercentChange] = useState({ from: "100", to: "150" });
  const [percentChangeResult, setPercentChangeResult] = useState<number | null>(null);

  const calculatePercentOf = () => {
    const percent = parseFloat(percentOf.percent);
    const number = parseFloat(percentOf.number);
    if (!isNaN(percent) && !isNaN(number)) {
      setPercentOfResult(Math.round((percent / 100) * number * 100) / 100);
    }
  };

  const calculateWhatPercent = () => {
    const num1 = parseFloat(whatPercent.number1);
    const num2 = parseFloat(whatPercent.number2);
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
      setWhatPercentResult(Math.round((num1 / num2) * 100 * 100) / 100);
    }
  };

  const calculatePercentChange = () => {
    const from = parseFloat(percentChange.from);
    const to = parseFloat(percentChange.to);
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      setPercentChangeResult(Math.round(((to - from) / from) * 100 * 100) / 100);
    }
  };

  const modes: { key: Mode; label: string; sub: string }[] = [
    { key: "percentOf",    label: "% of Number", sub: "What is X% of Y?" },
    { key: "whatPercent",  label: "What %",       sub: "X is what % of Y?" },
    { key: "change",       label: "% Change",     sub: "Increase or decrease" },
  ];

  return (
    <>
      <SEO
        title="Percentage Calculator - Calculate Percentages, Increase & Decrease"
        description="Free online percentage calculator. Calculate percentage of a number, percentage increase, percentage decrease, and find what percent one number is of another."
        keywords="percentage calculator, percent calculator, percentage increase calculator"
        structuredData={[structuredData, breadcrumbStructuredData]}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
            <span>/</span>
            <span className="text-white/60">Percentage Calculator</span>
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
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #84cc16 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                PERCENT
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
                Find percentages, calculate increases and decreases, and discover what percent one number is of another — instantly.
              </p>
            </div>

            {/* Mode selector on left */}
            <div className="mt-10 flex flex-col gap-3">
              {modes.map(m => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left group"
                  style={{
                    borderColor: mode === m.key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: mode === m.key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all"
                    style={{ background: mode === m.key ? ACCENT : "rgba(255,255,255,0.15)" }}
                  />
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: mode === m.key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {m.label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{m.sub}</p>
                  </div>
                </button>
              ))}
            </div>
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
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">
                  {modes.find(m => m.key === mode)?.sub}
                </h3>
                <Percent className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              {/* ── Mode: % of Number ── */}
              {mode === "percentOf" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Percentage</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={percentOf.percent}
                          onChange={e => setPercentOf({ ...percentOf, percent: e.target.value })}
                          placeholder="15"
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">%</span>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Of Number</label>
                      <input
                        type="number"
                        value={percentOf.number}
                        onChange={e => setPercentOf({ ...percentOf, number: e.target.value })}
                        placeholder="200"
                        className={inputClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  {percentOfResult !== null && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-end pb-3 border-b border-white/10">
                        <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Result</span>
                        <span className="text-3xl font-display text-white">{percentOfResult.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-white/25 font-sans mt-2">
                        {percentOf.percent}% of {percentOf.number} = {percentOfResult}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={calculatePercentOf}
                    className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                    style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                  >
                    Calculate
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* ── Mode: What % ── */}
              {mode === "whatPercent" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Number</label>
                      <input
                        type="number"
                        value={whatPercent.number1}
                        onChange={e => setWhatPercent({ ...whatPercent, number1: e.target.value })}
                        placeholder="50"
                        className={inputClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Of Number</label>
                      <input
                        type="number"
                        value={whatPercent.number2}
                        onChange={e => setWhatPercent({ ...whatPercent, number2: e.target.value })}
                        placeholder="200"
                        className={inputClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  {whatPercentResult !== null && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-end pb-3 border-b border-white/10">
                        <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Result</span>
                        <span className="text-3xl font-display text-white">{whatPercentResult.toLocaleString()}%</span>
                      </div>
                      <p className="text-xs text-white/25 font-sans mt-2">
                        {whatPercent.number1} is {whatPercentResult}% of {whatPercent.number2}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={calculateWhatPercent}
                    className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                    style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                  >
                    Calculate
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* ── Mode: % Change ── */}
              {mode === "change" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>From Value</label>
                      <input
                        type="number"
                        value={percentChange.from}
                        onChange={e => setPercentChange({ ...percentChange, from: e.target.value })}
                        placeholder="100"
                        className={inputClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>To Value</label>
                      <input
                        type="number"
                        value={percentChange.to}
                        onChange={e => setPercentChange({ ...percentChange, to: e.target.value })}
                        placeholder="150"
                        className={inputClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  {percentChangeResult !== null && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-end pb-3 border-b border-white/10">
                        <span className="text-white/40 text-sm font-heading uppercase tracking-widest">
                          {percentChangeResult >= 0 ? "Increase" : "Decrease"}
                        </span>
                        <span
                          className="text-3xl font-display"
                          style={{ color: percentChangeResult >= 0 ? ACCENT : "#ef4444" }}
                        >
                          {percentChangeResult >= 0 ? "+" : ""}{percentChangeResult}%
                        </span>
                      </div>
                      <p className="text-xs text-white/25 font-sans mt-2">
                        From {percentChange.from} to {percentChange.to}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={calculatePercentChange}
                    className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                    style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                  >
                    Calculate Change
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

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

export default PercentageCalculator;