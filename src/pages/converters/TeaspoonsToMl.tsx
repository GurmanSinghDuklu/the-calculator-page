import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#A855F7";
const ML_PER_TSP = 5;
const ML_PER_TBSP = 15;
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

type Unit = "tsp" | "tbsp" | "ml" | "cup";
const unitLabels: Record<Unit, string> = { tsp: "Teaspoons (tsp)", tbsp: "Tablespoons (tbsp)", ml: "Millilitres (ml)", cup: "Cups (metric 250ml)" };

function toMl(val: number, unit: Unit): number {
  if (unit === "tsp") return val * ML_PER_TSP;
  if (unit === "tbsp") return val * ML_PER_TBSP;
  if (unit === "cup") return val * 250;
  return val;
}
function fromMl(ml: number, unit: Unit): number {
  if (unit === "tsp") return ml / ML_PER_TSP;
  if (unit === "tbsp") return ml / ML_PER_TBSP;
  if (unit === "cup") return ml / 250;
  return ml;
}

const TeaspoonsToMl = () => {
  const [fromUnit, setFromUnit] = useState<Unit>("tsp");
  const [inputValue, setInputValue] = useState("3");
  const [result, setResult] = useState<{ tsp: number; tbsp: number; ml: number; cup: number } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;
    const ml = toMl(val, fromUnit);
    setResult({
      tsp: Math.round(fromMl(ml, "tsp") * 1000) / 1000,
      tbsp: Math.round(fromMl(ml, "tbsp") * 1000) / 1000,
      ml: Math.round(ml * 100) / 100,
      cup: Math.round(fromMl(ml, "cup") * 1000) / 1000,
    });
  };

  const refTable = [
    { label: "½ tsp", tsp: 0.5, ml: 2.5 },
    { label: "1 tsp", tsp: 1, ml: 5 },
    { label: "2 tsp", tsp: 2, ml: 10 },
    { label: "1 tbsp", tsp: 3, ml: 15 },
    { label: "2 tbsp", tsp: 6, ml: 30 },
    { label: "¼ cup", tsp: 12, ml: 62.5 },
    { label: "½ cup", tsp: 24, ml: 125 },
    { label: "1 cup", tsp: 48, ml: 250 },
  ];

  const faqSchema = [
    { question: "How many ml in a teaspoon?", answer: "1 teaspoon = 5 ml. This is the UK metric standard. A UK tablespoon is 15 ml (3 teaspoons)." },
    { question: "How many ml in a tablespoon?", answer: "1 tablespoon = 15 ml in the UK. This is 3 teaspoons. Note: an Australian tablespoon is 20 ml — if using Australian recipes, check which standard they use." },
    { question: "How many teaspoons in a tablespoon?", answer: "3 teaspoons = 1 tablespoon. So if a recipe calls for 1 tablespoon and you only have a teaspoon measure, use 3 level teaspoons." },
    { question: "How many ml is a dose of medicine?", answer: "Most UK medicines measure doses in 5 ml spoonfuls. One 5 ml spoon = 1 teaspoon. Always use the measuring device that comes with the medicine rather than kitchen spoons, which vary in size." },
  ];

  return (
    <>
      <SEO
        title="Teaspoons to ML Converter"
        description="Convert teaspoons to millilitres, tablespoons, and cups. Includes medicine dosing reference and UK baking measurements."
        keywords="teaspoons to ml, tsp to ml, tablespoons to ml, tbsp to ml, cooking converter, ml per teaspoon"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Teaspoons to ML</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[8vw] lg:text-[62px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #d8b4fe 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>TSP TO ML</span>
              <span className="block text-[7vw] lg:text-[56px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CONVERTER</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Convert between teaspoons, tablespoons, millilitres, and cups in both directions.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {(["tsp","tbsp","ml","cup"] as Unit[]).map(u => (
                    <div key={u} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{u}</p>
                      <p className="font-display text-2xl" style={{ color: u === fromUnit ? ACCENT : undefined }}>{result[u]}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "ML", value: `${result.ml} ml` }, { label: "TSP", value: `${result.tsp} tsp` }, { label: "TBSP", value: `${result.tbsp} tbsp` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert</h3>
                <FlaskConical className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>From Unit</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["tsp","tbsp","ml","cup"] as Unit[]).map(u => (
                      <button key={u} onClick={() => { setFromUnit(u); setResult(null); }} className="py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: fromUnit === u ? ACCENT : "rgba(255,255,255,0.05)", color: fromUnit === u ? "#fff" : "rgba(255,255,255,0.4)", border: fromUnit === u ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{u}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{unitLabels[fromUnit]}</label>
                  <input type="number" min="0" step="0.25" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <button onClick={convert} className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm" style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Reference Table</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Common Measurements</p>
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Measure</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">TSP</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">ML</th></tr></thead>
                <tbody>
                  {refTable.map(({ label, tsp, ml }) => (
                    <tr key={label} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-2 text-white/70 font-medium">{label}</td>
                      <td className="py-2 text-right text-white/70">{tsp}</td>
                      <td className="py-2 text-right text-white/70">{ml} ml</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "Teaspoons, tablespoons, and ml — what's the difference?", description: "A UK teaspoon is 5 ml and a UK tablespoon is 15 ml. American recipes often use cups (240 ml US, 250 ml metric). If you're following a recipe that uses cups but your measuring jug is in ml — or vice versa — this converter shows all four at once so you never have to do the maths mid-bake." }}
            howItWorks={{ title: "How to convert teaspoons to ml", description: "1 teaspoon = 5 ml. 1 tablespoon = 15 ml = 3 teaspoons. 1 metric cup = 250 ml.", steps: [{ step: 1, title: "TSP to ML", description: "Multiply teaspoons by 5. Example: 3 tsp × 5 = 15 ml = 1 tablespoon." }, { step: 2, title: "TBSP to ML", description: "Multiply tablespoons by 15. Example: 2 tbsp × 15 = 30 ml." }, { step: 3, title: "ML to TSP", description: "Divide ml by 5. Example: 20 ml ÷ 5 = 4 teaspoons." }] }}
            formula={{ title: "Conversion formulas", formula: "1 tsp = 5 ml | 1 tbsp = 15 ml | 1 cup = 250 ml", explanation: "These are UK/metric standards. Note: US tablespoon is 14.79 ml (effectively the same). Australian tablespoon is 20 ml — be aware when using Australian recipes." }}
            tips={["Medicine is often prescribed as '5 ml spoonfuls' — this is exactly 1 teaspoon", "For salt in baking: 1 tsp = 6g, ½ tsp = 3g", "Always use level measurements unless a recipe specifies heaped", "US cups are 240 ml, metric cups are 250 ml — most UK recipes use metric"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p></div></footer>
      </div>
    </>
  );
};

export default TeaspoonsToMl;
