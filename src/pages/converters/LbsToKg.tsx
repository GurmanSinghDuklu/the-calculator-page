import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#10B981";
const KG_PER_LB = 0.453592;
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const LbsToKg = () => {
  const [direction, setDirection] = useState<"lbs-to-kg" | "kg-to-lbs">("lbs-to-kg");
  const [inputValue, setInputValue] = useState("150");
  const [result, setResult] = useState<{ lbs: number; kg: number; stone: number; stoneLbs: number } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;
    let lbs: number, kg: number;
    if (direction === "lbs-to-kg") { lbs = val; kg = val * KG_PER_LB; }
    else { kg = val; lbs = val / KG_PER_LB; }
    const totalStone = lbs / 14;
    const stone = Math.floor(totalStone);
    const stoneLbs = Math.round((totalStone - stone) * 14 * 10) / 10;
    setResult({ lbs: Math.round(lbs * 100) / 100, kg: Math.round(kg * 100) / 100, stone, stoneLbs });
  };

  const refTable = [1, 5, 10, 20, 50, 100, 150, 200].map(lbs => {
    const kg = lbs * KG_PER_LB;
    const stone = Math.floor(lbs / 14);
    const remLbs = Math.round((lbs - stone * 14) * 10) / 10;
    return { lbs, kg: Math.round(kg * 100) / 100, stone, remLbs };
  });

  const faqSchema = [
    { question: "How many kg is 1 lb?", answer: "1 pound is 0.453592 kilograms. To convert lbs to kg, multiply the pounds by 0.4536. For a rough estimate, multiply by 0.45." },
    { question: "How do I convert kg to stone and pounds?", answer: "Divide the kg by 6.35 to get stone. Take the decimal remainder and multiply by 14 to get the remaining pounds. For example, 70 kg = 11 stone 0.2 lbs (11st 0lb in everyday use)." },
    { question: "What is 23 kg in pounds?", answer: "23 kg is 50.7 pounds. This is the standard airline hand luggage limit — useful to know when packing." },
    { question: "Why does the UK use both kg and stone?", answer: "The UK officially went metric in 1995, but body weight is still commonly expressed in stone and pounds in everyday conversation. Medical records and gym equipment use kg. You often need to know both." },
  ];

  return (
    <>
      <SEO
        title="LBS to KG Converter"
        description="Convert pounds to kilograms and back. Includes stone and pounds breakdown for UK users, with a quick reference table."
        keywords="lbs to kg, pounds to kg, kg to lbs, lbs to kilograms, weight converter"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Age Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-emerald-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">LBS to KG</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #34d399 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>LBS</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>TO KG</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Convert pounds to kilograms with stone and lbs breakdown for UK users.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{direction === "lbs-to-kg" ? "In Kilograms" : "In Pounds"}</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {direction === "lbs-to-kg" ? `${result.kg}` : `${result.lbs}`}
                    <span className="text-2xl text-white/40 ml-2">{direction === "lbs-to-kg" ? "kg" : "lbs"}</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Pounds</p>
                    <p className="font-display text-lg text-white">{result.lbs} lbs</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Kilograms</p>
                    <p className="font-display text-lg text-white">{result.kg} kg</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Stone</p>
                    <p className="font-display text-lg text-white">{result.stone}st {result.stoneLbs}lb</p>
                  </div>
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Kilograms", value: `${result.kg} kg` }, { label: "Pounds", value: `${result.lbs} lbs` }, { label: "Stone", value: `${result.stone}st ${result.stoneLbs}lb` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert</h3>
                <Scale className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <div className="space-y-5">
                <div className="flex gap-2">
                  {([["lbs-to-kg", "LBS → KG"], ["kg-to-lbs", "KG → LBS"]] as const).map(([d, label]) => (
                    <button key={d} onClick={() => { setDirection(d); setResult(null); }} className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: direction === d ? ACCENT : "rgba(255,255,255,0.05)", color: direction === d ? "#fff" : "rgba(255,255,255,0.4)", border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{label}</button>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>{direction === "lbs-to-kg" ? "Pounds (lbs)" : "Kilograms (kg)"}</label>
                  <input type="number" min="0" step="0.1" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <button onClick={convert} className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm" style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Quick Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">LBS to KG</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">LBS</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">KG</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Stone</th></tr></thead>
                  <tbody>
                    {refTable.map(({ lbs, kg, stone, remLbs }) => (
                      <tr key={lbs} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{lbs} lbs</td>
                        <td className="py-2 text-right text-white/70">{kg} kg</td>
                        <td className="py-2 text-right text-white/70">{stone}st {remLbs}lb</td>
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
            whatIs={{ title: "Why convert lbs to kg?", description: "The UK uses a mix of metric and imperial for weight. Body weight is commonly discussed in stone and pounds socially, while medical settings and gym equipment use kilograms. Luggage allowances are in kg (typically 23kg = 50.7lbs for hold luggage). Online fitness apps often use lbs. This converter handles all three systems." }}
            howItWorks={{ title: "How to convert lbs to kg", description: "One pound is exactly 0.453592 kilograms. To convert, multiply pounds by 0.4536. To get stone and pounds, divide the total lbs by 14.", steps: [{ step: 1, title: "LBS to KG", description: "Multiply lbs by 0.453592. For example, 150 lbs × 0.453592 = 68.04 kg." }, { step: 2, title: "KG to LBS", description: "Divide kg by 0.453592 (or multiply by 2.20462). For example, 70 kg = 154.3 lbs." }, { step: 3, title: "Getting stone and pounds", description: "Divide total lbs by 14. The whole number is stone, multiply the remainder by 14 to get lbs back." }] }}
            formula={{ title: "Conversion formula", formula: "kg = lbs × 0.453592", explanation: "The pound is defined internationally as exactly 0.45359237 kg. To reverse: lbs = kg × 2.20462. For stone: divide lbs by 14." }}
            tips={["Airline luggage limit of 23 kg = 50.7 lbs", "NHS healthy weight range uses BMI with kg — use this converter alongside the BMI calculator", "Gym plates in the UK are usually in kg; US-based fitness programmes often use lbs", "A rough mental shortcut: halve the lbs and subtract 10% to get kg"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default LbsToKg;
