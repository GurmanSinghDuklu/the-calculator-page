import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#EC4899";
const CM_PER_INCH = 2.54;
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const InchesToCm = () => {
  const [inputValue, setInputValue] = useState("55");
  const [result, setResult] = useState<{ inches: number; cm: number } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;
    setResult({ inches: val, cm: Math.round(val * CM_PER_INCH * 100) / 100 });
  };

  const refTable = [1, 2, 3, 4, 5, 6, 12, 24, 36, 48, 55, 65].map(inches => ({
    inches,
    cm: Math.round(inches * CM_PER_INCH * 100) / 100,
    note: inches === 55 ? "55\" TV" : inches === 65 ? "65\" TV" : inches === 36 ? "3 feet" : inches === 12 ? "1 foot" : "",
  }));

  const faqSchema = [
    { question: "How many cm is 1 inch?", answer: "One inch is exactly 2.54 centimetres. To convert inches to cm, multiply the number of inches by 2.54." },
    { question: "What is 55 inches in cm?", answer: "55 inches is 139.7 cm. This is the diagonal measurement of a 55-inch TV — the most popular size in the UK." },
    { question: "How do I measure a TV in cm?", answer: "TV sizes are always the diagonal measurement, corner to corner across the screen (not including the bezel). A 55-inch TV is 139.7cm diagonal. Common UK sizes: 32in=81.3cm, 43in=109.2cm, 55in=139.7cm, 65in=165.1cm, 75in=190.5cm." },
    { question: "Is the inch the same in the UK and USA?", answer: "Yes. The inch was standardised internationally in 1959 at exactly 2.54 cm. UK, US, and Canadian inches are all identical." },
  ];

  return (
    <>
      <SEO
        title="Inches to CM Converter"
        description="Convert inches to centimetres instantly. Includes TV screen sizes, monitor sizes, and a quick reference table for common measurements."
        keywords="inches to cm, inches to centimetres, in to cm, convert inches to cm, tv size in cm"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-pink-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Inches to CM</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #f9a8d4 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>INCHES</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>TO CM</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Convert inches to centimetres. Great for TV sizes, monitor screens, and clothing measurements.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">In Centimetres</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.cm}<span className="text-2xl text-white/40 ml-2">cm</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Inches</p><p className="font-display text-lg text-white">{result.inches} in</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Centimetres</p><p className="font-display text-lg text-white">{result.cm} cm</p></div>
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Centimetres", value: `${result.cm} cm` }, { label: "Inches", value: `${result.inches} in` }]} />
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
                <div>
                  <label className={labelClass}>Inches</label>
                  <input type="number" min="0" step="0.1" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <div>
                  <label className={labelClass}>TV Size Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[32, 43, 50, 55, 65, 75].map(s => (
                      <button key={s} onClick={() => { setInputValue(String(s)); setResult({ inches: s, cm: Math.round(s * CM_PER_INCH * 100) / 100 }); }} className="px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all">{s}"</button>
                    ))}
                  </div>
                </div>
                <button onClick={convert} className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm" style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Quick Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Inches to CM</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Inches</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">CM</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Note</th></tr></thead>
                  <tbody>
                    {refTable.map(({ inches, cm, note }) => (
                      <tr key={inches} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{inches}"</td>
                        <td className="py-2 text-right text-white/70">{cm} cm</td>
                        <td className="py-2 text-right text-white/30 text-xs">{note}</td>
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
            whatIs={{ title: "When do you need inches to cm?", description: "TV screens, computer monitors, tablet displays, and phone screens are all measured in inches diagonally — even in the UK. Clothing measurements for waist, chest, and inseam are often in inches on American brands. Bike frame sizes in some brands still use inches. This converter is your go-to for any screen or product sized in inches." }}
            howItWorks={{ title: "How to convert inches to centimetres", description: "Multiply inches by 2.54. One inch is exactly 2.54 cm.", steps: [{ step: 1, title: "Multiply by 2.54", description: "For example, 55 inches × 2.54 = 139.7 cm." }, { step: 2, title: "For TV sizes", description: "Remember the measurement is diagonal. A 55-inch TV measures 139.7 cm diagonally, but its width will be around 122 cm depending on aspect ratio." }] }}
            formula={{ title: "Conversion formula", formula: "cm = inches × 2.54", explanation: "The inch has been defined as exactly 2.54 cm since 1959. This is an exact relationship, not an approximation." }}
            tips={["TV screens are measured diagonally — a 55\" TV is 139.7cm diagonal, approx 122cm wide", "UK trouser inseam is in inches: 30\" = 76.2cm, 32\" = 81.3cm", "Bike wheel sizes in inches: 26\" = 66cm, 27.5\" = 69.9cm, 29\" = 73.7cm", "A ruler is typically 12 inches (30.48 cm) or 30 cm — keep that in mind for estimation"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><Logo size="sm" /><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default InchesToCm;
