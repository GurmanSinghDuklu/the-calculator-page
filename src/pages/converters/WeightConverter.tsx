import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#22C55E";

type WeightUnit = "kilograms" | "grams" | "pounds" | "ounces" | "stones" | "tonnes";

const toKilograms: Record<WeightUnit, number> = {
  kilograms: 1, grams: 0.001, pounds: 0.453592,
  ounces: 0.0283495, stones: 6.35029, tonnes: 1000,
};

const unitLabels: Record<WeightUnit, string> = {
  kilograms: "Kilograms (kg)", grams: "Grams (g)",   pounds: "Pounds (lb)",
  ounces:    "Ounces (oz)",    stones: "Stones (st)", tonnes: "Tonnes (t)",
};

const labelClass    = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
const selectTrigger = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-base font-medium focus:outline-none focus:ring-0 focus:border-white/30 hover:border-white/20 transition-all h-auto";
const selectContent = "bg-[#1C1A1A] border border-white/10 text-white rounded-xl shadow-2xl";
const selectItem    = "text-white/60 hover:text-white focus:text-white focus:bg-white/10 cursor-pointer py-2.5 px-4 rounded-lg";

const WeightConverter = () => {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit]     = useState<WeightUnit>("kilograms");
  const [toUnit, setToUnit]         = useState<WeightUnit>("pounds");
  const [result, setResult]         = useState<number | null>(null);

  const convertWeight = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) return;
    const converted = (value * toKilograms[fromUnit]) / toKilograms[toUnit];
    setResult(Math.round(converted * 1000000) / 1000000);
  };

  const seo = seoData["/converters/weight"];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/converters/weight`}
      
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Weight Converter</span>
          </nav>
        </div>

        {/* Split-screen */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>WEIGHT</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CONVERTER
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between kilos, pounds, stones, ounces, and more — instantly and accurately.
              </p>
            </div>

            {result !== null && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Converted Value</p>
                  <p className="font-display text-6xl" style={{ color: ACCENT }}>{result.toLocaleString()}</p>
                  <p className="text-sm text-white/30 font-heading uppercase tracking-widest mt-2">{unitLabels[toUnit]}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-xs text-white/25 font-sans text-center">
                    {inputValue} {unitLabels[fromUnit]} = {result.toLocaleString()} {unitLabels[toUnit]}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert Weight</h3>
                <Scale className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Value */}
                <div>
                  <label className={labelClass}>Value</label>
                  <input type="number" step="0.000001" value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convertWeight()}
                    placeholder="1"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>

                {/* From */}
                <div>
                  <label className={labelClass}>From</label>
                  <Select value={fromUnit} onValueChange={v => setFromUnit(v as WeightUnit)}>
                    <SelectTrigger className={selectTrigger}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContent}>
                      {Object.entries(unitLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key} className={selectItem}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* To */}
                <div>
                  <label className={labelClass}>To</label>
                  <Select value={toUnit} onValueChange={v => setToUnit(v as WeightUnit)}>
                    <SelectTrigger className={selectTrigger}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContent}>
                      {Object.entries(unitLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key} className={selectItem}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Result preview */}
                {result !== null && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Result</span>
                      <span className="font-display text-2xl" style={{ color: ACCENT }}>{result.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Convert button */}
                <button onClick={convertWeight}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}>
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WeightConverter;