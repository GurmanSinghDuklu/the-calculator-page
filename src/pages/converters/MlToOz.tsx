import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#0EA5E9";

const ML_PER_UK_FL_OZ = 28.4131;
const ML_PER_US_FL_OZ = 29.5735;

type Direction = "ml-to-oz" | "oz-to-ml";
type Standard = "uk" | "us";

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const MlToOz = () => {
  const [direction, setDirection] = useState<Direction>("ml-to-oz");
  const [standard, setStandard] = useState<Standard>("uk");
  const [inputValue, setInputValue] = useState("250");
  const [result, setResult] = useState<{
    ml: number;
    ukOz: number;
    usOz: number;
    litres: number;
  } | null>(null);

  const mlPerOz = standard === "uk" ? ML_PER_UK_FL_OZ : ML_PER_US_FL_OZ;

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;

    let ml: number;
    if (direction === "ml-to-oz") {
      ml = val;
    } else {
      ml = val * mlPerOz;
    }

    setResult({
      ml: Math.round(ml * 100) / 100,
      ukOz: Math.round((ml / ML_PER_UK_FL_OZ) * 100) / 100,
      usOz: Math.round((ml / ML_PER_US_FL_OZ) * 100) / 100,
      litres: Math.round((ml / 1000) * 1000) / 1000,
    });
  };

  // Quick reference: common volumes
  const commonMl = [25, 50, 100, 200, 250, 330, 500, 750, 1000];
  const referenceTable = commonMl.map(ml => ({
    ml,
    ukOz: Math.round((ml / ML_PER_UK_FL_OZ) * 100) / 100,
    usOz: Math.round((ml / ML_PER_US_FL_OZ) * 100) / 100,
    context:
      ml === 25 ? "Single spirit measure" :
      ml === 50 ? "Double spirit measure" :
      ml === 100 ? "Small wine glass" :
      ml === 200 ? "Baby bottle feed" :
      ml === 250 ? "Standard cup" :
      ml === 330 ? "Can of lager" :
      ml === 500 ? "Pint (approx.)" :
      ml === 750 ? "Wine bottle" :
      "1 litre",
  }));

  const primaryOz = standard === "uk" ? result?.ukOz : result?.usOz;
  const ozLabel = standard === "uk" ? "UK fl oz" : "US fl oz";

  const faqSchema = [
    { question: "What is the difference between UK and US fluid ounces?", answer: "A UK fluid ounce is 28.4131 ml, while a US fluid ounce is 29.5735 ml. The US fl oz is slightly larger. This means a US pint (16 fl oz = 473 ml) is smaller than a UK pint (20 fl oz = 568 ml). Always check which standard a recipe or label is using." },
    { question: "How many ml is a standard UK spirit measure?", answer: "A single spirit measure in England and Wales is 25 ml (0.88 UK fl oz). In Scotland and Northern Ireland, a single is 25 ml or 35 ml depending on the establishment. A double is 50 ml. Pubs must display which measure they use." },
    { question: "How do I convert ml to oz for baby bottle feeds?", answer: "Divide the millilitres by 28.41 for UK fl oz or 29.57 for US fl oz. For example, a 200 ml feed is about 7.04 UK fl oz. Most UK health visitors give guidance in ml, but some imported bottles show US fl oz on the scale — check which markings your bottle uses." },
    { question: "Why do UK recipes sometimes use fl oz instead of ml?", answer: "Older British cookbooks and family recipes were written before metrication in the 1970s and 1980s. They use imperial fluid ounces (UK standard). Modern BBC Good Food and Delia recipes use ml, but you will still find fl oz on some packaging and in handed-down recipes." },
  ];

  return (
    <>
      <SEO
        title="ML to Oz Converter"
        description="Convert millilitres to fluid ounces and back. Supports UK and US fl oz with a quick reference table for common drink and cooking volumes."
        keywords="ml to oz, millilitres to ounces, oz to ml, fluid ounces to ml, ml to fl oz, uk fluid ounces"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-sky-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">ML to Oz</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #38bdf8 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>ML</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO OZ
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between millilitres and fluid ounces, with support for both UK and US standards.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "ml-to-oz" ? `In ${ozLabel}` : "In Millilitres"}
                  </p>
                  {direction === "ml-to-oz" ? (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {primaryOz} <span className="text-2xl text-white/40">{ozLabel}</span>
                    </p>
                  ) : (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.ml} <span className="text-2xl text-white/40">ml</span>
                    </p>
                  )}
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Millilitres</p>
                    <p className="font-display text-lg text-white">{result.ml} ml</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Litres</p>
                    <p className="font-display text-lg text-white">{result.litres} L</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">UK Fl Oz</p>
                    <p className="font-display text-lg text-white">{result.ukOz} fl oz</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">US Fl Oz</p>
                    <p className="font-display text-lg text-white">{result.usOz} fl oz</p>
                  </div>
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Millilitres", value: `${result.ml} ml` },
                  { label: "UK Fl Oz", value: `${result.ukOz} UK fl oz` },
                  { label: "US Fl Oz", value: `${result.usOz} US fl oz` },
                  { label: "Litres", value: `${result.litres} L` },
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

                {/* Direction toggle */}
                <div className="flex gap-2">
                  {([["ml-to-oz", "ML \u2192 Oz"], ["oz-to-ml", "Oz \u2192 ML"]] as const).map(([d, label]) => (
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

                {/* UK / US toggle */}
                <div className="flex gap-2">
                  {([["uk", "UK Fl Oz"], ["us", "US Fl Oz"]] as const).map(([s, label]) => (
                    <button
                      key={s}
                      onClick={() => { setStandard(s); setResult(null); }}
                      className="flex-1 py-2.5 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                      style={{
                        background: standard === s ? "rgba(255,255,255,0.08)" : "transparent",
                        color: standard === s ? ACCENT : "rgba(255,255,255,0.3)",
                        border: standard === s ? `1px solid ${ACCENT}40` : "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Value */}
                <div>
                  <label className={labelClass}>{direction === "ml-to-oz" ? "Millilitres" : `Fluid Ounces (${ozLabel})`}</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convert()}
                    placeholder={direction === "ml-to-oz" ? "250" : "8"}
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
                        {direction === "ml-to-oz"
                          ? `${primaryOz} ${ozLabel}`
                          : `${result.ml} ml`}
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
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Common UK Volumes</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">ML</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">UK Fl Oz</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">US Fl Oz</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30 hidden sm:table-cell">Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceTable.map(({ ml, ukOz, usOz, context }) => (
                      <tr key={ml} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{ml} ml</td>
                        <td className="py-2 text-right text-white/70">{ukOz}</td>
                        <td className="py-2 text-right text-white/70">{usOz}</td>
                        <td className="py-2 text-right text-white/50 text-xs hidden sm:table-cell">{context}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Static content below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "Why you need an ml-to-oz converter",
              description: "The UK uses metric for most things, but fluid ounces still turn up everywhere — old recipe books, imported American products, baby bottle markings, and pub measures. To make it worse, a UK fluid ounce (28.41 ml) is a different size from a US fluid ounce (29.57 ml), so you cannot just eyeball it. This converter handles both standards and shows common drink and cooking volumes so you always pour the right amount."
            }}
            howItWorks={{
              title: "How to convert ml to fluid ounces",
              description: "You need one number: how many millilitres are in a fluid ounce. For UK, it is 28.4131 ml. For US, it is 29.5735 ml.",
              steps: [
                { step: 1, title: "ML to fluid ounces", description: "Divide the millilitre value by 28.4131 (UK) or 29.5735 (US). For example, 500 ml / 28.4131 = 17.60 UK fl oz." },
                { step: 2, title: "Fluid ounces to ml", description: "Multiply the fluid ounce value by 28.4131 (UK) or 29.5735 (US). For example, 8 US fl oz x 29.5735 = 236.59 ml." },
                { step: 3, title: "Choosing UK or US", description: "If you are following a British recipe or reading UK product labels, use UK fl oz. For American recipes, US nutritional labels, or FDA guidelines, use US fl oz. When in doubt in the UK, default to UK fl oz." }
              ]
            }}
            formula={{
              title: "The conversion formulas",
              formula: "UK fl oz = ml / 28.4131  |  US fl oz = ml / 29.5735",
              explanation: "The UK fluid ounce is defined as 1/20 of an imperial pint (568.261 ml). The US fluid ounce is 1/16 of a US pint (473.176 ml). Because the pint sizes differ, the fluid ounces differ too. A UK fl oz is slightly smaller than a US fl oz, which means you get more UK fl oz from the same volume of liquid. The converter shows both so you can always pick the right one."
            }}
            tips={[
              "A UK single spirit measure is 25 ml (about 0.88 fl oz) — pubs in England and Wales must serve either 25 ml or 35 ml singles",
              "Baby bottles sold in the UK often have dual markings — check whether the oz scale is UK or US before measuring feeds",
              "A standard UK pint is 568 ml (20 UK fl oz), but a US pint is only 473 ml (16 US fl oz) — nearly 100 ml less",
              "For medicine dosing, always use the ml measurement on the syringe or cup — never convert to fl oz, as small rounding errors matter",
              "A 330 ml can of lager is about 11.6 UK fl oz — roughly two-thirds of a pint"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MlToOz;
