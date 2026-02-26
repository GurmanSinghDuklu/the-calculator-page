import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { Trash2, Plus, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

export default function IrrCalculator() {
  const [cashflows, setCashflows] = useState<string[]>(["-10000", "3000", "3000", "3000", "3000"]);
  const [result, setResult] = useState<{ irr: number; annualIrr: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addCashflow = () => setCashflows([...cashflows, "0"]);
  const removeCashflow = (index: number) => {
    if (cashflows.length > 2) setCashflows(cashflows.filter((_, i) => i !== index));
  };
  const updateCashflow = (index: number, value: string) => {
    const updated = [...cashflows];
    updated[index] = value;
    setCashflows(updated);
  };

  const calculateIRR = () => {
    setError(null);
    const cf = cashflows.map(v => parseFloat(v)).filter(v => !isNaN(v));
    if (cf.length < 2) { setError("Please enter at least 2 cash flows."); return; }

    let x = 0.1;
    const maxIterations = 1000;
    const tolerance = 0.000001;

    for (let iter = 0; iter < maxIterations; iter++) {
      let npv = 0, dnpv = 0;
      for (let t = 0; t < cf.length; t++) {
        npv += cf[t] / Math.pow(1 + x, t);
        if (t > 0) dnpv += (-t * cf[t]) / Math.pow(1 + x, t + 1);
      }
      if (Math.abs(npv) < tolerance) {
        setResult({ irr: x * 100, annualIrr: x * 100 });
        return;
      }
      if (Math.abs(dnpv) < tolerance) { setError("Cannot calculate IRR — derivative too small."); return; }
      x = x - npv / dnpv;
      if (x < -0.99) x = -0.99;
      if (x > 10) x = 10;
    }
    setError("IRR calculation did not converge. Please check your cash flows.");
  };

  const seo = seoData["/finance/irr"];
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/irr`}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">IRR Calculator</span>
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
                className="block text-[20vw] lg:text-[160px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                IRR
              </span>
              <span
                className="block text-[7vw] lg:text-[58px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate the Internal Rate of Return for any series of cash flows. Uses Newton-Raphson iteration for precision.
              </p>
            </div>

            {/* Result on left */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Internal Rate of Return</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {result.irr.toFixed(4)}<span className="text-2xl text-white/40">%</span>
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">per period (assuming annual)</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Annualized IRR</p>
                  <p className="font-display text-2xl text-white">{result.annualIrr.toFixed(4)}%</p>
                </div>
                <p className="text-xs text-white/20 font-sans leading-relaxed">
                  The IRR is the discount rate that makes the net present value of all cash flows equal to zero.
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

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Cash Flows</h3>
                <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <p className="text-[10px] text-white/25 font-sans mb-6">
                Negative = investment / outflow &nbsp;·&nbsp; Positive = return / inflow
              </p>

              <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
                {cashflows.map((cf, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-[10px] font-heading uppercase tracking-widest text-white/25 w-16 shrink-0">
                      Period {index}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={cf}
                      onChange={e => updateCashflow(index, e.target.value)}
                      placeholder="0"
                      className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    {cashflows.length > 2 && (
                      <button
                        onClick={() => removeCashflow(index)}
                        className="text-white/20 hover:text-red-400 transition-colors p-1.5 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add period */}
              <button
                onClick={addCashflow}
                className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest transition-colors mb-5"
                style={{ color: ACCENT }}
              >
                <Plus className="h-3 w-3" />
                Add Period
              </button>

              {/* Result preview */}
              {result && (
                <div className="pt-4 border-t border-white/10 space-y-3 mb-5">
                  <div className="flex justify-between items-end pb-3 border-b border-white/10">
                    <span className="text-white/40 text-sm font-heading uppercase tracking-widest">IRR</span>
                    <span className="text-3xl font-display" style={{ color: ACCENT }}>{result.irr.toFixed(4)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Annualized IRR</span>
                    <span className="text-white/70 font-heading">{result.annualIrr.toFixed(4)}%</span>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-5 p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                  <p className="text-xs text-red-400 font-sans">{error}</p>
                </div>
              )}

              {/* Calculate button */}
              <button
                onClick={calculateIRR}
                className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
              >
                Calculate IRR
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

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