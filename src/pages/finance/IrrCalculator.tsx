import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

const ACCENT = "#3B82F6";

export default function IrrCalculator() {
  const [invested, setInvested] = useState("10000");
  const [returned, setReturned] = useState("15000");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{
    gain: number;
    roi: number;
    annualisedRoi: number;
    length: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmt = (n: number) =>
    n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    setError(null);
    const inv = parseFloat(invested.replace(/,/g, ""));
    const ret = parseFloat(returned.replace(/,/g, ""));
    const yrs = parseFloat(years);

    if (isNaN(inv) || isNaN(ret) || isNaN(yrs)) {
      setError("Please fill in all fields with valid numbers.");
      return;
    }
    if (inv <= 0) { setError("Amount invested must be greater than zero."); return; }
    if (yrs <= 0) { setError("Investment length must be greater than zero."); return; }

    const gain = ret - inv;
    const roi = (gain / inv) * 100;
    const annualisedRoi = (Math.pow(ret / inv, 1 / yrs) - 1) * 100;

    setResult({ gain, roi, annualisedRoi, length: yrs });
  };

  const seo = seoData["/finance/irr"] ?? {
    title: "ROI Calculator – Return on Investment",
    description: "Calculate your return on investment, annualised ROI, and investment gain instantly.",
    keywords: "ROI calculator, return on investment, annualised ROI"
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all";

  const faqSchema = [
    { question: "What is ROI (Return on Investment)?", answer: "ROI measures the profitability of an investment as a percentage of its cost. ROI = (Gain / Amount Invested) × 100. A positive ROI means you made a profit; negative means a loss." },
    { question: "What is annualised ROI?", answer: "Annualised ROI adjusts the return to reflect a per-year rate, making it easier to compare investments of different durations. It is calculated as: (Return / Invested)^(1/years) - 1." },
    { question: "What is a good ROI?", answer: "A good ROI depends on the asset class. Stock market investments historically return around 8–10% per year. Real estate typically returns 4–10%. Always compare against your cost of capital or alternative investments." },
    { question: "What is the difference between ROI and IRR?", answer: "ROI measures total return without accounting for time. IRR (Internal Rate of Return) accounts for the timing and size of cash flows over multiple periods, making it more accurate for complex investments." }
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://www.thecalculatorpage.com/finance/irr"
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
            <span className="text-white/60">ROI Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Title + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[20vw] lg:text-[150px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                ROI
              </span>
              <span
                className="block text-[7vw] lg:text-[58px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            {/* Description */}
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate your Return on Investment, annualised rate, and total gain from any investment. Enter the amount invested, the amount returned, and the time period.
              </p>
            </div>

            {/* Formula */}
            <div className="mt-6 max-w-sm">
              <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mb-2">Formula</p>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3">
                <p className="text-xs text-white/50 font-mono leading-relaxed">
                  ROI = (Gain ÷ Amount Invested) × 100<br />
                  Annualised ROI = (Return ÷ Invested)^(1÷Years) − 1
                </p>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Investment Gain */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Investment Gain</p>
                  <p className="font-display text-5xl" style={{ color: result.gain >= 0 ? ACCENT : "#ef4444" }}>
                    {result.gain >= 0 ? "+" : ""}£{fmt(result.gain)}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">over {result.length} year{result.length !== 1 ? "s" : ""}</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "ROI", value: `${fmt(result.roi)}%` },
                    { label: "Annualised ROI", value: `${fmt(result.annualisedRoi)}%` },
                    { label: "Length", value: `${result.length} yr${result.length !== 1 ? "s" : ""}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-base text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <CopyButton
                  accentColor={ACCENT}
                  results={[
                    { label: "Amount Invested", value: `£${fmt(parseFloat(invested))}` },
                    { label: "Amount Returned", value: `£${fmt(parseFloat(returned))}` },
                    { label: "Investment Gain", value: `${result.gain >= 0 ? "+" : ""}£${fmt(result.gain)}` },
                    { label: "ROI", value: `${fmt(result.roi)}%` },
                    { label: "Annualised ROI", value: `${fmt(result.annualisedRoi)}%` },
                    { label: "Investment Length", value: `${result.length} year${result.length !== 1 ? "s" : ""}` },
                  ]}
                />
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

              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl uppercase text-white tracking-wide">Calculate</h2>
                <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Amount Invested */}
                <div>
                  <label className={labelClass}>Amount Invested (£)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={invested}
                    onChange={e => setInvested(e.target.value)}
                    placeholder="10000"
                    className={inputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Amount Returned */}
                <div>
                  <label className={labelClass}>Amount Returned (£)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={returned}
                    onChange={e => setReturned(e.target.value)}
                    placeholder="15000"
                    className={inputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Investment Length */}
                <div>
                  <label className={labelClass}>Investment Length (Years)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.5"
                    value={years}
                    onChange={e => setYears(e.target.value)}
                    placeholder="5"
                    className={inputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              </div>

              {/* Result preview in card */}
              {result && (
                <div className="pt-5 mt-5 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-end pb-3 border-b border-white/10">
                    <span className="text-white/40 text-sm font-heading uppercase tracking-widest">ROI</span>
                    <span className="text-3xl font-display" style={{ color: ACCENT }}>{fmt(result.roi)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Annualised ROI</span>
                    <span className="text-white/70 font-heading">{fmt(result.annualisedRoi)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Gain</span>
                    <span className="text-white/70 font-heading">{result.gain >= 0 ? "+" : ""}£{fmt(result.gain)}</span>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-5 p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                  <p className="text-xs text-red-400 font-sans">{error}</p>
                </div>
              )}

              {/* Calculate button */}
              <button
                onClick={calculate}
                className="w-full mt-6 group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
              >
                Calculate ROI
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
