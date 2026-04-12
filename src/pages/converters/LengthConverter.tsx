import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#22C55E";

type LengthUnit = "meters" | "kilometers" | "centimeters" | "millimeters" | "feet" | "inches" | "yards" | "miles";

const toMeters: Record<LengthUnit, number> = {
  meters: 1, kilometers: 1000, centimeters: 0.01, millimeters: 0.001,
  feet: 0.3048, inches: 0.0254, yards: 0.9144, miles: 1609.344,
};

const unitLabels: Record<LengthUnit, string> = {
  meters: "Meters (m)", kilometers: "Kilometers (km)", centimeters: "Centimeters (cm)",
  millimeters: "Millimeters (mm)", feet: "Feet (ft)", inches: "Inches (in)",
  yards: "Yards (yd)", miles: "Miles (mi)",
};

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
const selectTriggerClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-base font-medium focus:outline-none focus:ring-0 focus:border-white/30 hover:border-white/20 transition-all h-auto";
const selectContentClass = "bg-[#1C1A1A] border border-white/10 text-white rounded-xl shadow-2xl";

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit]     = useState<LengthUnit>("meters");
  const [toUnit, setToUnit]         = useState<LengthUnit>("feet");
  const [result, setResult]         = useState<number | null>(null);

  const convertLength = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) return;
    const converted = (value * toMeters[fromUnit]) / toMeters[toUnit];
    setResult(Math.round(converted * 1000000) / 1000000);
  };

  const seo = seoData["/converters/length"];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorapp.org/converters/length`}
      
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Length Converter</span>
          </nav>
        </div>

        {/* Split-screen hero */}
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
              }}>LENGTH</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CONVERTER
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between feet, meters, inches, kilometres, and more — instantly and accurately.
              </p>
            </div>

            {/* Result display */}
            {result !== null && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Converted Value</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {result.toLocaleString()}
                  </p>
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
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert Length</h3>
                <Ruler className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Value input */}
                <div>
                  <label className={labelClass}>Value</label>
                  <input
                    type="number" step="0.000001" value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convertLength()}
                    placeholder="1"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* From unit */}
                <div>
                  <label className={labelClass}>From</label>
                  <Select value={fromUnit} onValueChange={v => setFromUnit(v as LengthUnit)}>
                    <SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {Object.entries(unitLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}
                          className="text-white/60 hover:text-white focus:text-white focus:bg-white/10 cursor-pointer py-2.5 px-4 rounded-lg">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* To unit */}
                <div>
                  <label className={labelClass}>To</label>
                  <Select value={toUnit} onValueChange={v => setToUnit(v as LengthUnit)}>
                    <SelectTrigger className={selectTriggerClass}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {Object.entries(unitLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}
                          className="text-white/60 hover:text-white focus:text-white focus:bg-white/10 cursor-pointer py-2.5 px-4 rounded-lg">
                          {label}
                        </SelectItem>
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
                <button
                  onClick={convertLength}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LengthConverter;