import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E";

const staticContent = {
  whatIs: {
    title: "What is a Percentage Of Calculation?",
    description: "A 'percentage of' calculation finds a portion of a number based on a given percentage. It answers 'What is X% of Y?' — used everywhere from tips and discounts to statistics and financial data.",
  },
  howItWorks: {
    title: "How to Calculate Percentage Of",
    description: "Multiply the number by the percentage and divide by 100.",
    steps: [
      { step: 1, title: "Convert to decimal",  description: "Divide the percentage by 100 (e.g., 25% → 0.25)" },
      { step: 2, title: "Multiply",             description: "Multiply the decimal by the number you want the percentage of" },
      { step: 3, title: "Get the result",       description: "That's your answer — the portion of the original number" },
    ],
  },
  formula: {
    title: "The Formula",
    formula: "Result = (Percentage ÷ 100) × Number",
    explanation: "To find 25% of 80: (25 ÷ 100) × 80 = 0.25 × 80 = 20.",
  },
  faqs: [
    { question: "How do I calculate 15% of 200?",                    answer: "(15 ÷ 100) × 200 = 0.15 × 200 = 30." },
    { question: "What's the quickest way to calculate 10%?",         answer: "Move the decimal point one place to the left. 10% of 250 = 25." },
    { question: "How do I find 50% of a number?",                    answer: "50% is half — just divide by 2. 50% of 80 = 40." },
    { question: "What if the percentage is greater than 100%?",      answer: "Same formula. 150% of 80 = 1.5 × 80 = 120." },
  ],
  tips: [
    "10% is always the number divided by 10 — use this as a mental shortcut",
    "To find 5%, calculate 10% and divide by 2",
    "To find 25%, divide the number by 4",
    "For quick estimates, round numbers first then calculate",
  ],
};

const PercentageOfCalculator = () => {
  const [percentage, setPercentage] = useState("");
  const [number,     setNumber]     = useState("");
  const [result,     setResult]     = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(percentage), n = parseFloat(number);
    if (!isNaN(p) && !isNaN(n)) setResult((p / 100) * n);
  };

  const inputClass = "bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-xl font-medium text-center focus:outline-none transition-all";

  const faqSchema = [
    { question: "What does 'percentage of' mean?", answer: "Percentage of means finding a portion of a whole expressed as a fraction of 100. '15% of 200' means 15 hundredths of 200, which equals 30." },
    { question: "How do I find the percentage of a total?", answer: "Multiply the total by the percentage and divide by 100. For example, 30% of £450 = 450 × 30 / 100 = £135." },
    { question: "How do percentages apply to VAT calculations?", answer: "To find the VAT amount, multiply the price by the VAT rate (e.g. 20%). To find the pre-VAT price from a VAT-inclusive price, divide by 1.20 for 20% VAT." },
    { question: "How do I calculate a percentage of a budget?", answer: "Divide the category spend by the total budget and multiply by 100. For example, spending £300 of a £1,500 budget on food is 300 / 1500 × 100 = 20%." }
  ];

  return (
    <>
      <SEO
        title="What is X% of Y? Calculator"
        description="Instantly calculate what percentage of any number is. Simple, fast percentage calculator."
        keywords="percentage of calculator, what is percent of, calculate percentage, percentage calculator, math calculator"
        canonicalUrl="https://www.thecalculatorapp.org/misc/percentage-of"
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
            <span className="text-white/60">Percentage Of</span>
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
            }}>OF</span>
            <span className="block text-[5vw] md:text-[42px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
              CALCULATOR
            </span>
          </h1>
          <div className="mt-6 max-w-md pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
            <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
              Instantly find what any percentage of a number is. Enter your values below and press calculate.
            </p>
          </div>
        </div>

        {/* Calculator card */}
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">

            {/* Inline sentence */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white/40 font-heading text-base uppercase tracking-widest flex-wrap">
              <span>What is</span>
              <input
                type="number" value={percentage} onChange={e => setPercentage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && calculate()}
                placeholder="X" autoFocus
                className={`${inputClass} w-28`}
                onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <span>% of</span>
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
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mb-3">Result</p>
                <p className="font-display text-7xl md:text-8xl" style={{ color: ACCENT }}>
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </p>
                <p className="text-white/25 font-sans text-sm mt-4">
                  {percentage}% of {number} = {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </p>
                <div className="flex justify-center mt-4">
                  <CopyButton accentColor={ACCENT} results={[
                    { label: `${percentage}% of ${number}`, value: result.toLocaleString(undefined, { maximumFractionDigits: 6 }) },
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

export default PercentageOfCalculator;