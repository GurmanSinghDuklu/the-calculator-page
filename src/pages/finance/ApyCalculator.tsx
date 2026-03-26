import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

const FREQ_LABELS: Record<string, string> = {
  "365": "daily",
  "52": "weekly",
  "26": "bi-weekly",
  "12": "monthly",
  "4": "quarterly",
  "2": "semi-annually",
  "1": "annually",
};

export default function ApyCalculator() {
  const [nominalRate, setNominalRate] = useState("5");
  const [compounding, setCompounding] = useState("12");
  const [result, setResult] = useState<{ apy: number } | null>(null);

  const calculateAPY = () => {
    const r = parseFloat(nominalRate) / 100;
    const n = parseFloat(compounding);
    if (isNaN(r) || isNaN(n) || r < 0 || n <= 0) return;
    setResult({ apy: Math.pow(1 + r / n, n) - 1 });
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "What is APY?", answer: "APY stands for Annual Percentage Yield. It represents the real rate of return on an investment, taking into account the effect of compounding interest over a year." },
    { question: "What is the difference between APY and APR?", answer: "APR (Annual Percentage Rate) is the simple annual interest rate without compounding. APY factors in compounding, so it is always higher than or equal to APR." },
    { question: "How is APY calculated?", answer: "APY = (1 + r/n)^n - 1, where r is the annual interest rate and n is the number of compounding periods per year." },
    { question: "Why does APY matter for savings accounts?", answer: "APY tells you exactly how much interest you will earn in a year. Comparing APY across accounts gives a true like-for-like comparison of returns." }
  ];

  return (
    <>
      <SEO
        title="APY Calculator - Calculate Annual Percentage Yield"
        description="Free APY calculator to find your effective annual percentage yield based on nominal interest rate and compounding frequency."
        keywords="apy calculator, annual percentage yield calculator, apy vs apr, effective annual rate calculator"
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
            <span className="text-white/60">APY Calculator</span>
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
                className="block text-[13vw] lg:text-[130px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                APY
              </span>
              <span
                className="block text-[8vw] lg:text-[68px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert a nominal APR into an effective Annual Percentage Yield. See how compounding frequency affects your real return.
              </p>
            </div>

            {/* Result callout on left */}
            {result && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 col-span-2">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Effective Annual Yield (APY)</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {(result.apy * 100).toFixed(4)}%
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Nominal Rate</p>
                  <p className="font-display text-2xl text-white">{nominalRate}%</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Compounding</p>
                  <p className="font-display text-xl text-white capitalize">{FREQ_LABELS[compounding]}</p>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "APY", value: `${(result.apy * 100).toFixed(4)}%` },
                  { label: "Nominal Rate (APR)", value: `${nominalRate}%` },
                  { label: "Compounding", value: FREQ_LABELS[compounding] },
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

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <Percent className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Nominal Rate */}
                <div>
                  <label className={labelClass}>Nominal Annual Rate (APR)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={nominalRate}
                      onChange={e => setNominalRate(e.target.value)}
                      placeholder="5.0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">%</span>
                  </div>
                </div>

                {/* Compounding frequency */}
                <div>
                  <label className={labelClass}>Compounding Frequency</label>
                  <Select value={compounding} onValueChange={setCompounding}>
                    <SelectTrigger className="w-full bg-black/40 border-white/10 text-white rounded-lg py-4 h-auto text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C1A1A] border-white/10 text-white">
                      <SelectItem value="365">Daily (365×/year)</SelectItem>
                      <SelectItem value="52">Weekly (52×/year)</SelectItem>
                      <SelectItem value="26">Bi-weekly (26×/year)</SelectItem>
                      <SelectItem value="12">Monthly (12×/year)</SelectItem>
                      <SelectItem value="4">Quarterly (4×/year)</SelectItem>
                      <SelectItem value="2">Semi-annually (2×/year)</SelectItem>
                      <SelectItem value="1">Annually (1×/year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">APY</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>
                        {(result.apy * 100).toFixed(4)}%
                      </span>
                    </div>
                    <p className="text-xs text-white/25 font-sans leading-relaxed">
                      A {nominalRate}% nominal rate compounded {FREQ_LABELS[compounding]} gives an effective annual yield of {(result.apy * 100).toFixed(4)}%.
                    </p>
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateAPY}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate APY
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        <FinancialDisclosure variant="investment" />

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