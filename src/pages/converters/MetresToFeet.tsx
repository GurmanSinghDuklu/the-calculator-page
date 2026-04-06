import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#6366F1";
const FEET_PER_METRE = 3.28084;
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const MetresToFeet = () => {
  const [direction, setDirection] = useState<"m-to-ft" | "ft-to-m">("m-to-ft");
  const [inputValue, setInputValue] = useState("1.8");
  const [result, setResult] = useState<{ metres: number; totalFeet: number; feet: number; inches: number } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;
    let metres: number, totalFeet: number;
    if (direction === "m-to-ft") { metres = val; totalFeet = val * FEET_PER_METRE; }
    else { totalFeet = val; metres = val / FEET_PER_METRE; }
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * 12 * 10) / 10;
    setResult({ metres: Math.round(metres * 1000) / 1000, totalFeet: Math.round(totalFeet * 100) / 100, feet, inches });
  };

  const refTable = Array.from({ length: 11 }, (_, i) => {
    const m = 1.5 + i * 0.05;
    const total = m * FEET_PER_METRE;
    const ft = Math.floor(total);
    const inch = Math.round((total - ft) * 12 * 10) / 10;
    return { m: Math.round(m * 100) / 100, totalFt: Math.round(total * 100) / 100, ft, inch };
  });

  const faqSchema = [
    { question: "How many feet is 1 metre?", answer: "1 metre is 3.28084 feet, or 3 feet 3.37 inches. For a rough estimate, multiply metres by 3.28." },
    { question: "What is 2 metres in feet and inches?", answer: "2 metres is 6.56 feet, or 6 feet 6.74 inches. This is relevant for UK garden fence regulations — fences up to 2 metres don't require planning permission." },
    { question: "How do I convert my height to metres?", answer: "Divide total inches by 39.3701. Or: multiply feet by 0.3048 and add inches times 0.0254. For example, 5ft 10in = (5 × 0.3048) + (10 × 0.0254) = 1.524 + 0.254 = 1.778 m." },
    { question: "Why does the UK use both metres and feet?", answer: "The UK officially uses metric, but feet and inches are deeply embedded in everyday use — height, property room sizes, and screen sizes are all still commonly described in imperial. Construction uses both: structural calculations use metric, but older drawings and some trades use feet." },
  ];

  return (
    <>
      <SEO
        title="Metres to Feet Converter"
        description="Convert metres to feet and inches and back. Includes height reference table from 1.50m to 2.00m with feet and inches equivalents."
        keywords="metres to feet, meters to feet, feet to metres, height converter, m to ft"
        faqSchema={faqSchema}
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-indigo-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Metres to Feet</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #a5b4fc 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>METRES</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>TO FEET</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Convert between metres and feet+inches. Handles heights, room sizes, and garden dimensions.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{direction === "m-to-ft" ? "In Feet & Inches" : "In Metres"}</p>
                  {direction === "m-to-ft" ? (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.feet}<span className="text-2xl text-white/40">ft</span> {result.inches}<span className="text-2xl text-white/40">in</span></p>
                  ) : (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.metres}<span className="text-2xl text-white/40 ml-2">m</span></p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Metres</p><p className="font-display text-lg text-white">{result.metres} m</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Decimal Feet</p><p className="font-display text-lg text-white">{result.totalFeet} ft</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 col-span-2"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Feet & Inches</p><p className="font-display text-lg text-white">{result.feet}' {result.inches}"</p></div>
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Metres", value: `${result.metres} m` }, { label: "Feet", value: `${result.totalFeet} ft` }, { label: "Feet & Inches", value: `${result.feet}' ${result.inches}"` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert</h3>
                <Ruler className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <div className="space-y-5">
                <div className="flex gap-2">
                  {([["m-to-ft", "M → Feet"], ["ft-to-m", "Feet → M"]] as const).map(([d, label]) => (
                    <button key={d} onClick={() => { setDirection(d); setResult(null); }} className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: direction === d ? ACCENT : "rgba(255,255,255,0.05)", color: direction === d ? "#fff" : "rgba(255,255,255,0.4)", border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{label}</button>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>{direction === "m-to-ft" ? "Metres" : "Feet (decimal)"}</label>
                  <input type="number" min="0" step="0.01" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <button onClick={convert} className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm" style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Height Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">1.50m – 2.00m</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Metres</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Feet</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Ft & In</th></tr></thead>
                  <tbody>
                    {refTable.map(({ m, totalFt, ft, inch }) => (
                      <tr key={m} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{m} m</td>
                        <td className="py-2 text-right text-white/70">{totalFt} ft</td>
                        <td className="py-2 text-right text-white/70">{ft}' {inch}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "Metres to feet — when do you need this?", description: "Room heights in UK property listings are in metres, but older generations still think in feet. Garden fence regulations (2m without planning permission) and ceiling heights (2.4m standard) are metric, yet architects' drawings from the 80s use feet and inches. This converter is most useful for property, construction, and height comparisons." }}
            howItWorks={{ title: "How to convert metres to feet", description: "One foot is exactly 0.3048 metres. One metre is 3.28084 feet.", steps: [{ step: 1, title: "Metres to feet", description: "Multiply metres by 3.28084. For example, 2.4 m × 3.28084 = 7.87 ft." }, { step: 2, title: "Getting feet and inches", description: "Take the decimal part of the foot result and multiply by 12. E.g., 7.87 ft = 7 ft + 0.87 × 12 = 7 ft 10.4 in." }, { step: 3, title: "Feet to metres", description: "Multiply feet by 0.3048. For inches within a reading, multiply those by 0.0254 and add." }] }}
            formula={{ title: "Conversion formula", formula: "feet = metres × 3.28084", explanation: "One international foot is defined as exactly 0.3048 metres. To reverse: metres = feet × 0.3048. Ceiling heights, property listings, and garden dimensions are the most common use cases." }}
            tips={["UK garden fences up to 2m (6ft 7in) don't need planning permission", "Standard UK ceiling height is 2.4m = 7ft 10in", "UK door height standard is 1.981m = 6ft 6in", "UK swimming pools use metres for lengths, so 50m = 164 ft"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p></div></footer>
      </div>
    </>
  );
};

export default MetresToFeet;
