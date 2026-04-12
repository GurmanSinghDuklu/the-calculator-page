import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Thermometer } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#EF4444";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const FahrenheitToCelsius = () => {
  const [direction, setDirection] = useState<"f-to-c" | "c-to-f">("f-to-c");
  const [inputValue, setInputValue] = useState("350");
  const [result, setResult] = useState<{ f: number; c: number; k: number } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return;
    let f: number, c: number;
    if (direction === "f-to-c") { f = val; c = (val - 32) * 5 / 9; }
    else { c = val; f = val * 9 / 5 + 32; }
    const k = c + 273.15;
    setResult({ f: Math.round(f * 100) / 100, c: Math.round(c * 100) / 100, k: Math.round(k * 100) / 100 });
  };

  const keyTemps = [
    { label: "Absolute Zero", c: -273.15, f: -459.67 },
    { label: "Freezing point", c: 0, f: 32 },
    { label: "Fridge temp", c: 4, f: 39 },
    { label: "Room temp", c: 20, f: 68 },
    { label: "Body temp", c: 37, f: 98.6 },
    { label: "Fever", c: 38.5, f: 101.3 },
    { label: "Boiling point", c: 100, f: 212 },
    { label: "Gas Mark 4", c: 180, f: 356 },
    { label: "Gas Mark 6", c: 200, f: 392 },
    { label: "Gas Mark 8", c: 230, f: 446 },
  ];

  const faqSchema = [
    { question: "How do I convert Fahrenheit to Celsius?", answer: "Subtract 32, then multiply by 5/9. For example, 350°F: (350 - 32) × 5/9 = 176.7°C. A useful shortcut: subtract 30, then halve it — it's rough but works for everyday temperatures." },
    { question: "What is 350°F in Celsius?", answer: "350°F is 176.7°C, which is Gas Mark 4. This is the most common oven temperature in US recipes for baking cakes and biscuits." },
    { question: "What is normal body temperature in Fahrenheit?", answer: "Normal body temperature is 98.6°F (37°C). A temperature above 100.4°F (38°C) is generally considered a fever." },
    { question: "Does the UK use Fahrenheit or Celsius?", answer: "The UK officially uses Celsius (°C). Weather forecasts, medical readings, and cooking all use Celsius. Fahrenheit is still seen in older recipes from the US and occasionally in informal conversation among older generations." },
  ];

  return (
    <>
      <SEO
        title="Fahrenheit to Celsius Converter"
        description="Convert Fahrenheit to Celsius and back. Includes oven temperatures, Gas Mark equivalents, body temperature, and key reference points."
        keywords="fahrenheit to celsius, celsius to fahrenheit, f to c, c to f, temperature converter, oven temperature"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-red-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Fahrenheit to Celsius</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[80px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #fca5a5 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>°F TO °C</span>
              <span className="block text-[7vw] lg:text-[56px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CONVERTER</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Convert between Fahrenheit and Celsius. Includes oven Gas Mark reference and key temperatures.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{direction === "f-to-c" ? "In Celsius" : "In Fahrenheit"}</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{direction === "f-to-c" ? result.c : result.f}<span className="text-2xl text-white/40 ml-2">{direction === "f-to-c" ? "°C" : "°F"}</span></p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">°F</p><p className="font-display text-lg text-white">{result.f}°F</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">°C</p><p className="font-display text-lg text-white">{result.c}°C</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Kelvin</p><p className="font-display text-lg text-white">{result.k}K</p></div>
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Celsius", value: `${result.c}°C` }, { label: "Fahrenheit", value: `${result.f}°F` }, { label: "Kelvin", value: `${result.k}K` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert</h3>
                <Thermometer className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <div className="space-y-5">
                <div className="flex gap-2">
                  {([["f-to-c", "°F → °C"], ["c-to-f", "°C → °F"]] as const).map(([d, label]) => (
                    <button key={d} onClick={() => { setDirection(d); setResult(null); }} className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: direction === d ? ACCENT : "rgba(255,255,255,0.05)", color: direction === d ? "#fff" : "rgba(255,255,255,0.4)", border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{label}</button>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>{direction === "f-to-c" ? "Fahrenheit (°F)" : "Celsius (°C)"}</label>
                  <input type="number" step="0.1" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && convert()} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <div>
                  <label className={labelClass}>Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {(direction === "f-to-c" ? [[32,"Freezing"],[98.6,"Body"],[350,"Gas 4"],[400,"Gas 6"],[450,"Gas 8"]] : [[-10,"Cold"],[0,"Freeze"],[20,"Room"],[37,"Body"],[180,"Gas 4"]]).map(([v, l]) => (
                      <button key={l} onClick={() => { setInputValue(String(v)); }} className="px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all">{l}</button>
                    ))}
                  </div>
                </div>
                <button onClick={convert} className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm" style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Key Temperatures</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Reference Chart</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Description</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">°C</th><th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">°F</th></tr></thead>
                  <tbody>
                    {keyTemps.map(({ label, c, f }) => (
                      <tr key={label} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{label}</td>
                        <td className="py-2 text-right text-white/70">{c}°C</td>
                        <td className="py-2 text-right text-white/70">{f}°F</td>
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
            whatIs={{ title: "When do you need this converter?", description: "US recipes use Fahrenheit, UK ovens use Celsius and Gas Marks. American weather forecasts say 95°F when it's 35°C outside. Science papers use Kelvin. This converter handles all three and includes a Gas Mark reference table so you can follow any recipe without a second lookup." }}
            howItWorks={{ title: "How to convert °F to °C", description: "Subtract 32, then multiply by 5/9. To go the other way, multiply by 9/5 then add 32.", steps: [{ step: 1, title: "°F to °C", description: "(°F − 32) × 5/9 = °C. Example: (350 − 32) × 5/9 = 176.7°C." }, { step: 2, title: "°C to °F", description: "(°C × 9/5) + 32 = °F. Example: 200°C × 1.8 + 32 = 392°F." }, { step: 3, title: "Quick estimate", description: "Subtract 30 then halve it for °C from °F. It's an approximation but close enough for weather." }] }}
            formula={{ title: "Conversion formula", formula: "°C = (°F − 32) × 5/9", explanation: "The Celsius scale sets 0° at water's freezing point and 100° at boiling. Fahrenheit sets them at 32° and 212°. The 32-degree offset plus the 9/5 ratio come from these different reference points. Kelvin = °C + 273.15." }}
            tips={["Gas Mark 4 = 180°C = 350°F — the universal 'moderate oven' for baking", "UK weather is always in °C — 30°C is a hot summer day, 10°C is a cool autumn day", "Body temperature: 37°C (98.6°F) normal, 38°C (100.4°F) fever threshold", "Fridge: 1–4°C (34–39°F). Freezer: -18°C (0°F)"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p></div></footer>
      </div>
    </>
  );
};

export default FahrenheitToCelsius;
