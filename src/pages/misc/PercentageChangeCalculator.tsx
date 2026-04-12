import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E";

const staticContent = {
  whatIs: {
    title: "What is a Percentage Increase/Decrease?",
    description: "A percentage increase or decrease calculates the new value after adding or subtracting a percentage from an original number. Essential for price changes, salary adjustments, investment returns, discounts, and inflation effects.",
  },
  howItWorks: {
    title: "How to Calculate Percentage Change",
    description: "Multiply the original number by the percentage, then add (increase) or subtract (decrease) from the original.",
    steps: [
      { step: 1, title: "Calculate the change amount", description: "Multiply the original number by the percentage divided by 100" },
      { step: 2, title: "Apply the change",            description: "Add for an increase, or subtract for a decrease" },
      { step: 3, title: "Get the new value",           description: "The result is your new value after the percentage change" },
    ],
  },
  formula: {
    title: "The Formulas",
    formula: "Increase: New Value = Original × (1 + Percentage/100)\nDecrease: New Value = Original × (1 - Percentage/100)",
    explanation: "For a 20% increase on 80: 80 × 1.20 = 96. For a 20% decrease on 80: 80 × 0.80 = 64.",
  },
  faqs: [
    { question: "What's a 25% increase on £200?",                                          answer: "£200 × 0.25 = £50 change. £200 + £50 = £250." },
    { question: "If something decreases by 30%, what's left?",                             answer: "70% remains (100% - 30%). Multiply by 0.70 to get the new value." },
    { question: "Why isn't a 50% increase then 50% decrease the same as the original?",   answer: "The decrease is calculated on the larger number. £100 + 50% = £150. £150 - 50% = £75, not £100." },
    { question: "How do I find the original value before a percentage change?",            answer: "For increase: Original = New ÷ (1 + %/100). For decrease: Original = New ÷ (1 - %/100)." },
  ],
  tips: [
    "A 100% increase doubles the original value",
    "A 50% decrease halves the original value",
    "VAT at 20% means the price increases by a factor of 1.20",
    "To reverse a discount, divide by (1 - discount percentage)",
  ],
};

const PercentageChangeCalculator = () => {
  const [percentage, setPercentage] = useState("");
  const [number,     setNumber]     = useState("");
  const [mode,       setMode]       = useState<"increase" | "decrease">("increase");
  const [result, setResult] = useState<{ value: number; change: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(percentage), n = parseFloat(number);
    if (!isNaN(p) && !isNaN(n)) {
      const change = (p / 100) * n;
      setResult({ value: mode === "increase" ? n + change : n - change, change });
    }
  };

  const inputClass = "bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-xl font-medium text-center focus:outline-none transition-all w-28";

  const faqSchema = [
    { question: "How do I calculate percentage change?", answer: "Percentage Change = ((New Value - Old Value) / |Old Value|) × 100. A positive result is an increase; a negative result is a decrease." },
    { question: "What is the difference between percentage change and percentage difference?", answer: "Percentage change measures how a value has changed from a starting point. Percentage difference compares two values without implying direction, using the average as the base." },
    { question: "How do I calculate a percentage decrease?", answer: "Percentage Decrease = ((Old Value - New Value) / Old Value) × 100. For example, from £200 to £150 is a 25% decrease." },
    { question: "Can percentage change be more than 100%?", answer: "Yes. If a value doubles, that is a 100% increase. If it triples, that is a 200% increase. Percentage change has no upper limit for increases." }
  ];

  return (
    <>
      <SEO
        title="Percentage Change Calculator"
        description="Calculate percentage increase or decrease instantly. What is X% increase or decrease of Y?"
        keywords="percentage increase calculator, percentage decrease calculator, calculate percentage change, percent increase, percent decrease"
        canonicalUrl="https://www.thecalculatorapp.org/misc/percentage-change"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Age Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
            <span>/</span>
            <span className="text-white/60">Percentage Change</span>
          </nav>
        </div>

        {/* Hero title */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-4 select-none">
          <div className="absolute w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.07] pointer-events-none -z-10" style={{ background: ACCENT }} />
          <h1 className="font-display leading-[0.85] tracking-tighter">
            <span className="block text-[10vw] md:text-[82px]" style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
            }}>PERCENTAGE</span>
            <span className="block text-[10vw] md:text-[82px]" style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>CHANGE</span>
            <span className="block text-[5vw] md:text-[42px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
              CALCULATOR
            </span>
          </h1>
          <div className="mt-6 max-w-md pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
            <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
              Calculate any percentage increase or decrease instantly. Enter your percentage and number below.
            </p>
          </div>
        </div>

        {/* Calculator card */}
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">

            {/* Mode toggle */}
            <div className="flex justify-center mb-10">
              <div className="grid grid-cols-2 gap-2 p-1 bg-black/30 rounded-xl border border-white/10">
                {(["increase", "decrease"] as const).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className="flex items-center gap-2 px-8 py-3 rounded-lg font-heading text-xs uppercase tracking-widest transition-all"
                    style={{
                      background:  mode === m ? ACCENT : "transparent",
                      color:       mode === m ? "black" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {m === "increase" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Inline sentence input */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white/40 font-heading text-base uppercase tracking-widest flex-wrap">
              <span>What is a</span>
              <input
                type="number" value={percentage} onChange={e => setPercentage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && calculate()}
                placeholder="X" autoFocus
                className={inputClass}
                onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <span>%</span>
              <span style={{ color: mode === "increase" ? ACCENT : "#ef4444" }}>{mode}</span>
              <span>on</span>
              <input
                type="number" value={number} onChange={e => setNumber(e.target.value)}
                onKeyDown={e => e.key === "Enter" && calculate()}
                placeholder="Y"
                className={`${inputClass} w-36`}
                onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <span>?</span>
            </div>

            {/* Result */}
            {result !== null && (
              <div className="mt-10 text-center">
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mb-3">New Value</p>
                <p className="font-display text-7xl md:text-8xl" style={{ color: ACCENT }}>
                  {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </p>
                <p className="text-white/25 font-sans text-sm mt-4">
                  {number} {mode === "increase" ? "+" : "−"} {percentage}%
                  ({result.change.toLocaleString(undefined, { maximumFractionDigits: 6 })})
                  = {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </p>
                <div className="flex justify-center mt-4">
                  <CopyButton accentColor={ACCENT} results={[
                    { label: "New Value", value: result.value.toLocaleString(undefined, { maximumFractionDigits: 6 }) },
                    { label: "Change Amount", value: result.change.toLocaleString(undefined, { maximumFractionDigits: 6 }) },
                    { label: "Percentage", value: `${percentage}% ${mode}` },
                  ]} />
                </div>
              </div>
            )}

            {/* Calculate button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={calculate}
                className="group flex items-center gap-2 px-10 py-4 text-black font-heading font-bold rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
              >
                Calculate
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Static content */}
          <div className="mt-4">
            <CalculatorStaticContent {...staticContent} />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PercentageChangeCalculator;