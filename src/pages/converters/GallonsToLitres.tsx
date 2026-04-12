import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

const UK_GAL_TO_L = 4.54609;
const US_GAL_TO_L = 3.78541;

type Direction = "gallons-to-litres" | "litres-to-gallons";
type GallonType = "uk" | "us";

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const REFERENCE_VOLUMES = [1, 2, 5, 10, 20, 50, 100];

const GallonsToLitres = () => {
  const [direction, setDirection] = useState<Direction>("gallons-to-litres");
  const [gallonType, setGallonType] = useState<GallonType>("uk");
  const [inputValue, setInputValue] = useState("10");
  const [result, setResult] = useState<{
    gallons: number;
    litres: number;
  } | null>(null);

  const factor = gallonType === "uk" ? UK_GAL_TO_L : US_GAL_TO_L;

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;

    let gallons: number;
    let litres: number;

    if (direction === "gallons-to-litres") {
      gallons = val;
      litres = val * factor;
    } else {
      litres = val;
      gallons = val / factor;
    }

    setResult({
      gallons: Math.round(gallons * 10000) / 10000,
      litres: Math.round(litres * 10000) / 10000,
    });
  };

  const referenceTable = REFERENCE_VOLUMES.map((v) => {
    const ukL = Math.round(v * UK_GAL_TO_L * 100) / 100;
    const usL = Math.round(v * US_GAL_TO_L * 100) / 100;
    return { gallons: v, ukLitres: ukL, usLitres: usL };
  });

  const faqSchema = [
    { question: "What is the difference between a UK gallon and a US gallon?", answer: "A UK (imperial) gallon is 4.54609 litres, while a US gallon is 3.78541 litres. The imperial gallon is about 20% larger. This matters when comparing fuel economy figures — UK mpg and US mpg are not the same." },
    { question: "How many litres are in a UK gallon?", answer: "One UK (imperial) gallon equals exactly 4.54609 litres. So 10 UK gallons is about 45.46 litres, which is roughly the size of a typical car fuel tank." },
    { question: "Why does the UK use both gallons and litres for fuel?", answer: "UK petrol stations price fuel in pence per litre, but fuel economy is still officially quoted in miles per gallon (mpg) on car spec sheets. This quirk dates from the partial metrication of the 1970s — volumes went metric but road distances stayed in miles." },
    { question: "How do I convert UK mpg to litres per 100 km?", answer: "Divide 282.481 by the mpg figure. For example, a car doing 40 mpg (UK) uses 282.481 / 40 = 7.06 litres per 100 km. The constant 282.481 accounts for the imperial gallon and the miles-to-km conversion." },
  ];

  return (
    <>
      <SEO
        title="Gallons to Litres Converter"
        description="Convert UK imperial gallons and US gallons to litres and back. Quick reference table, fuel economy context, and common volume conversions."
        keywords="gallons to litres, litres to gallons, uk gallons to litres, us gallons to litres"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Gallons to Litres</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[90px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #60a5fa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>Gallons</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO LITRES
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between gallons and litres. Supports both UK imperial and US gallons — because a gallon isn&apos;t always a gallon.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "gallons-to-litres" ? "In Litres" : `In ${gallonType === "uk" ? "UK" : "US"} Gallons`}
                  </p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {direction === "gallons-to-litres"
                      ? <>{result.litres} <span className="text-2xl text-white/40">L</span></>
                      : <>{result.gallons} <span className="text-2xl text-white/40">gal</span></>}
                  </p>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{gallonType === "uk" ? "UK" : "US"} Gallons</p>
                    <p className="font-display text-lg text-white">{result.gallons} gal</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Litres</p>
                    <p className="font-display text-lg text-white">{result.litres} L</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Millilitres</p>
                    <p className="font-display text-lg text-white">{Math.round(result.litres * 1000)} mL</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{gallonType === "uk" ? "US" : "UK"} Gallons</p>
                    <p className="font-display text-lg text-white">
                      {Math.round((result.litres / (gallonType === "uk" ? US_GAL_TO_L : UK_GAL_TO_L)) * 10000) / 10000} gal
                    </p>
                  </div>
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: `${gallonType === "uk" ? "UK" : "US"} Gallons`, value: `${result.gallons} gal` },
                  { label: "Litres", value: `${result.litres} L` },
                  { label: "Millilitres", value: `${Math.round(result.litres * 1000)} mL` },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert</h3>
                <Droplets className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Gallon type toggle */}
                <div>
                  <label className={labelClass}>Gallon Type</label>
                  <div className="flex gap-2">
                    {([["uk", "UK Imperial"], ["us", "US"]] as const).map(([t, label]) => (
                      <button
                        key={t}
                        onClick={() => { setGallonType(t); setResult(null); }}
                        className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                        style={{
                          background: gallonType === t ? ACCENT : "rgba(255,255,255,0.05)",
                          color: gallonType === t ? "#fff" : "rgba(255,255,255,0.4)",
                          border: gallonType === t ? "none" : "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direction toggle */}
                <div className="flex gap-2">
                  {([["gallons-to-litres", "Gal \u2192 Litres"], ["litres-to-gallons", "Litres \u2192 Gal"]] as const).map(([d, label]) => (
                    <button
                      key={d}
                      onClick={() => { setDirection(d); setResult(null); }}
                      className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                      style={{
                        background: direction === d ? ACCENT : "rgba(255,255,255,0.05)",
                        color: direction === d ? "#fff" : "rgba(255,255,255,0.4)",
                        border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Value */}
                <div>
                  <label className={labelClass}>{direction === "gallons-to-litres" ? `${gallonType === "uk" ? "UK" : "US"} Gallons` : "Litres"}</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convert()}
                    placeholder="10"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Result</span>
                      <span className="font-display text-2xl" style={{ color: ACCENT }}>
                        {direction === "gallons-to-litres"
                          ? `${result.litres} L`
                          : `${result.gallons} gal`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Convert button */}
                <button
                  onClick={convert}
                  className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

            {/* Quick reference table */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Volume Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Gallons to Litres</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Gallons</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">UK Litres</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">US Litres</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceTable.map(({ gallons, ukLitres, usLitres }) => (
                      <tr key={gallons} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{gallons} gal</td>
                        <td className="py-2 text-right text-white/70">{ukLitres} L</td>
                        <td className="py-2 text-right text-white/70">{usLitres} L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UK fuel context */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">UK Fuel Context</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Real-World Volumes</p>
              <div className="space-y-3 text-sm text-white/60 leading-relaxed">
                <p><span className="text-white/80 font-medium">Typical car tank:</span> 40 &ndash; 55 litres (about 9 &ndash; 12 UK gallons). A full tank at 145p/litre costs roughly &pound;58 &ndash; &pound;80.</p>
                <p><span className="text-white/80 font-medium">Fuel economy:</span> A car rated 50 mpg (UK) uses 5.65 L/100 km. Remember, UK mpg figures are ~20% higher than US mpg because the imperial gallon is larger.</p>
                <p><span className="text-white/80 font-medium">Price per gallon:</span> At 145p/litre, one UK gallon of petrol costs about &pound;6.59. One US gallon at the same pump price would be &pound;5.49.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Static content below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "Why you need a gallons-to-litres converter",
              description: "The UK prices fuel in litres but measures fuel economy in miles per gallon. Car spec sheets quote tank capacity in litres, yet older drivers still think in gallons. If you are comparing fuel costs, planning a road trip, or just trying to make sense of your car's fuel gauge, you need to switch between the two constantly. This converter handles both UK imperial gallons and US gallons, because the two are not the same — a US gallon is about 20% smaller than a UK gallon, which catches people out when reading American car reviews or fuel economy figures."
            }}
            howItWorks={{
              title: "How to convert gallons to litres",
              description: "Multiply by the correct conversion factor for the gallon type you are using.",
              steps: [
                { step: 1, title: "UK gallons to litres", description: "Multiply by 4.54609. For example, 10 UK gallons = 10 x 4.54609 = 45.46 litres." },
                { step: 2, title: "US gallons to litres", description: "Multiply by 3.78541. For example, 10 US gallons = 10 x 3.78541 = 37.85 litres." },
                { step: 3, title: "Litres to gallons", description: "Divide the litre value by the appropriate factor. So 50 litres / 4.54609 = 11.0 UK gallons, or 50 / 3.78541 = 13.21 US gallons." }
              ]
            }}
            formula={{
              title: "The conversion formulae",
              formula: "litres = UK gallons x 4.54609 | litres = US gallons x 3.78541",
              explanation: "The imperial gallon was defined in 1824 as the volume of 10 pounds of water at 62 degrees Fahrenheit. The US gallon descends from the older English wine gallon of 231 cubic inches. Because they have different origins, they are different sizes. One imperial gallon is exactly 4.54609 litres, and one US gallon is exactly 3.785411784 litres. To convert UK mpg to L/100 km, divide 282.481 by the mpg figure."
            }}
            tips={[
              "UK fuel economy is quoted in imperial mpg — do not compare directly with US mpg figures without converting",
              "For a rough estimate, a UK gallon is about 4.5 litres and a US gallon is about 3.8 litres",
              "A typical UK car tank holds 45-55 litres, which is roughly 10-12 imperial gallons",
              "When reading American car reviews, their mpg numbers will always look lower because US gallons are smaller",
              "To convert pence per litre to pounds per gallon (UK), multiply by 4.546 and divide by 100"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GallonsToLitres;
