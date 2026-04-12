import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#F97316";
const G_PER_OZ = 28.3495;
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const OuncesToGrams = () => {
  const [direction, setDirection] = useState<"oz-to-g" | "g-to-oz">("oz-to-g");
  const [inputValue, setInputValue] = useState("8");
  const [result, setResult] = useState<{ oz: number; g: number; lbs: number; remOz: number } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;
    let oz: number, g: number;
    if (direction === "oz-to-g") { oz = val; g = val * G_PER_OZ; }
    else { g = val; oz = val / G_PER_OZ; }
    const lbs = Math.floor(oz / 16);
    const remOz = Math.round((oz - lbs * 16) * 100) / 100;
    setResult({ oz: Math.round(oz * 100) / 100, g: Math.round(g * 100) / 100, lbs, remOz });
  };

  const refTable = [1, 2, 4, 6, 8, 10, 12, 16].map(oz => ({
    oz, g: Math.round(oz * G_PER_OZ * 100) / 100,
    note: oz === 16 ? "1 lb" : oz === 8 ? "½ lb" : "",
  }));

  const faqSchema = [
    { question: "How many grams in an ounce?", answer: "One ounce (avoirdupois) is 28.3495 grams. For baking, it's common to round to 28g per ounce." },
    { question: "What is 250g in ounces?", answer: "250g is 8.82 ounces. This is a common portion size in UK cooking — one average chicken breast is around 150–200g." },
    { question: "How many ounces in a pound?", answer: "There are 16 ounces in 1 pound. So 1 lb = 16 oz = 453.6g." },
    { question: "Why do older UK recipes use ounces?", answer: "The UK went metric for food labelling in 1995, but many traditional recipes and cookbooks from before that era use ounces. This is especially common for baking recipes passed down through families." },
  ];

  return (
    <>
      <SEO
        title="Ounces to Grams Converter"
        description="Convert ounces to grams and back. Includes lbs and oz breakdown, quick reference table, and UK cooking context."
        keywords="ounces to grams, oz to grams, grams to ounces, oz to g, weight converter cooking"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Ounces to Grams</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #fdba74 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>OUNCES</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>TO GRAMS</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Convert ounces to grams for cooking, baking, and postal weights.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{direction === "oz-to-g" ? "In Grams" : "In Ounces"}</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{direction === "oz-to-g" ? result.g : result.oz}<span className="text-2xl text-white/40 ml-2">{direction === "oz-to-g" ? "g" : "oz"}</span></p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Ounces</p><p className="font-display text-lg text-white">{result.oz} oz</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Grams</p><p className="font-display text-lg text-white">{result.g} g</p></div>
                  {result.lbs > 0 && <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Lbs & Oz</p><p className="font-display text-lg text-white">{result.lbs}lb {result.remOz}oz</p></div>}
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Ounces", value: `${result.oz} oz` }, { label: "Grams", value: `${result.g} g` }]} />
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
                  {([["oz-to-g", "OZ → G"], ["g-to-oz", "G → OZ"]] as const).map(([d, label]) => (
                    <button key={d} onClick={() => { setDirection(d); setResult(null); }} className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: direction === d ? ACCENT : "rgba(255,255,255,0.05)", color: direction === d ? "#fff" : "rgba(255,255,255,0.4)", border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{label}</button>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>{direction === "oz-to-g" ? "Ounces (oz)" : "Grams (g)"}</label>
                  <input type="number" min="0" step="0.1" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <button onClick={convert} className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm" style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Quick Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">OZ to Grams</p>
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Oz</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Grams</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Note</th></tr></thead>
                <tbody>
                  {refTable.map(({ oz, g, note }) => (
                    <tr key={oz} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-2 text-white/70 font-medium">{oz} oz</td>
                      <td className="py-2 text-right text-white/70">{g} g</td>
                      <td className="py-2 text-right text-white/30 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "Ounces to grams — why you need this", description: "Older UK recipes, American cookbooks, and imported food packaging all use ounces. Modern UK recipes, nutrition labels, and postal services use grams. If you're baking from a 1970s Delia Smith recipe or ordering protein powder from a US website, you'll need this conversion." }}
            howItWorks={{ title: "How to convert ounces to grams", description: "Multiply ounces by 28.3495. For a rough estimate, multiply by 28.", steps: [{ step: 1, title: "OZ to grams", description: "Multiply oz × 28.3495. Example: 8 oz × 28.35 = 226.8 g." }, { step: 2, title: "Grams to oz", description: "Divide grams by 28.3495. Example: 250 g ÷ 28.35 = 8.82 oz." }] }}
            formula={{ title: "Conversion formula", formula: "grams = ounces × 28.3495", explanation: "The international avoirdupois ounce is defined as exactly 28.349523125 grams. There are 16 ounces in one pound (453.6g)." }}
            tips={["A good approximation: 1 oz ≈ 30g (slightly over — use for rough estimates only)", "UK large eggs weigh about 63g (2.2 oz)", "A standard UK letter weighs up to 100g (3.5 oz) for first class", "Royal Mail large letter limit is 250g (8.8 oz)"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default OuncesToGrams;
