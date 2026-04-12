import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

const STONE_TO_KG = 6.35029;
const LB_TO_KG = 0.453592;
const LBS_PER_STONE = 14;

type Direction = "stone-to-kg" | "kg-to-stone";

const StoneConverter = () => {
  const [direction, setDirection] = useState<Direction>("stone-to-kg");
  const [stoneInput, setStoneInput] = useState("10");
  const [lbsInput, setLbsInput] = useState("0");
  const [kgInput, setKgInput] = useState("");
  const [result, setResult] = useState<{
    kg: number;
    stone: number;
    lbs: number;
    totalLbs: number;
  } | null>(null);

  const convert = () => {
    if (direction === "stone-to-kg") {
      const st = parseFloat(stoneInput) || 0;
      const lb = parseFloat(lbsInput) || 0;
      if (st < 0 || lb < 0) return;
      const totalKg = st * STONE_TO_KG + lb * LB_TO_KG;
      const totalLbs = st * LBS_PER_STONE + lb;
      setResult({
        kg: Math.round(totalKg * 100) / 100,
        stone: st,
        lbs: lb,
        totalLbs: Math.round(totalLbs * 100) / 100,
      });
    } else {
      const kg = parseFloat(kgInput);
      if (isNaN(kg) || kg < 0) return;
      const totalLbs = kg / LB_TO_KG;
      const stone = Math.floor(totalLbs / LBS_PER_STONE);
      const remainingLbs = Math.round((totalLbs - stone * LBS_PER_STONE) * 10) / 10;
      setResult({
        kg: Math.round(kg * 100) / 100,
        stone,
        lbs: remainingLbs,
        totalLbs: Math.round(totalLbs * 100) / 100,
      });
    }
  };

  // Quick reference table: 8st to 20st
  const referenceTable = Array.from({ length: 13 }, (_, i) => {
    const st = i + 8;
    const kg = Math.round(st * STONE_TO_KG * 10) / 10;
    const lbs = st * LBS_PER_STONE;
    return { st, kg, lbs };
  });

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "How many kg is 1 stone?", answer: "One stone is exactly 6.35029 kilograms. So 10 stone is 63.5 kg, and 12 stone is 76.2 kg." },
    { question: "Why does the UK use stone for body weight?", answer: "It is a hangover from the imperial system. The UK officially went metric in 1985, but stone stuck for body weight because people grew up hearing their parents use it. The NHS records weight in kilograms, but most people still think of their weight in stone and pounds." },
    { question: "How do I convert stone and pounds to kg?", answer: "Multiply the stone by 6.35029 to get kg, then multiply the remaining pounds by 0.4536 and add them together. For example, 11 stone 4 pounds = (11 x 6.35) + (4 x 0.4536) = 69.85 + 1.81 = 71.67 kg." },
    { question: "What countries use stone for weight?", answer: "Mainly the UK and Ireland. Australia and Canada used to use stone but switched fully to metric decades ago. The US uses pounds only, and most of Europe uses kilograms." },
  ];

  return (
    <>
      <SEO
        title="Stone to KG Converter"
        description="Convert between stone, pounds and kilograms instantly. Includes quick reference table for common UK weights."
        keywords="stone to kg, kg to stone, stone to kilograms, weight converter UK, stone and pounds to kg"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Stone to KG</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>STONE</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO KG
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between stone, pounds, and kilograms — the way British people actually need it.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "stone-to-kg" ? "In Kilograms" : "In Stone & Pounds"}
                  </p>
                  {direction === "stone-to-kg" ? (
                    <>
                      <p className="font-display text-5xl" style={{ color: ACCENT }}>
                        {result.kg} <span className="text-2xl text-white/40">kg</span>
                      </p>
                      <p className="text-sm text-white/40 mt-2 font-heading uppercase tracking-widest">
                        {result.totalLbs} lbs total
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-5xl" style={{ color: ACCENT }}>
                        {result.stone} <span className="text-2xl text-white/40">st</span>{" "}
                        {result.lbs} <span className="text-2xl text-white/40">lbs</span>
                      </p>
                      <p className="text-sm text-white/40 mt-2 font-heading uppercase tracking-widest">
                        {result.totalLbs} lbs total
                      </p>
                    </>
                  )}
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Kilograms</p>
                    <p className="font-display text-lg text-white">{result.kg} kg</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Stone & Pounds</p>
                    <p className="font-display text-lg text-white">{result.stone} st {result.lbs} lbs</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Pounds</p>
                    <p className="font-display text-lg text-white">{result.totalLbs} lbs</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Grams</p>
                    <p className="font-display text-lg text-white">{(result.kg * 1000).toLocaleString()} g</p>
                  </div>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Kilograms", value: `${result.kg} kg` },
                  { label: "Stone & Pounds", value: `${result.stone} st ${result.lbs} lbs` },
                  { label: "Total Pounds", value: `${result.totalLbs} lbs` },
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
                <Scale className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Direction toggle */}
                <div className="flex gap-2">
                  {([["stone-to-kg", "Stone → KG"], ["kg-to-stone", "KG → Stone"]] as const).map(([d, label]) => (
                    <button
                      key={d}
                      onClick={() => { setDirection(d); setResult(null); }}
                      className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                      style={{
                        background: direction === d ? ACCENT : "rgba(255,255,255,0.05)",
                        color: direction === d ? "#000" : "rgba(255,255,255,0.4)",
                        border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {direction === "stone-to-kg" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Stone</label>
                      <input
                        type="number"
                        min="0"
                        value={stoneInput}
                        onChange={e => setStoneInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && convert()}
                        placeholder="10"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Pounds</label>
                      <input
                        type="number"
                        min="0"
                        max="13"
                        value={lbsInput}
                        onChange={e => setLbsInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && convert()}
                        placeholder="0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Kilograms</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={kgInput}
                      onChange={e => setKgInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && convert()}
                      placeholder="70"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                )}

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Result</span>
                      <span className="font-display text-2xl" style={{ color: ACCENT }}>
                        {direction === "stone-to-kg"
                          ? `${result.kg} kg`
                          : `${result.stone} st ${result.lbs} lbs`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Convert button */}
                <button
                  onClick={convert}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
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
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-4">Quick Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Stone</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Kilograms</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Pounds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceTable.map(({ st, kg, lbs }) => (
                      <tr key={st} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{st} st</td>
                        <td className="py-2 text-right text-white/70">{kg} kg</td>
                        <td className="py-2 text-right text-white/70">{lbs} lbs</td>
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
              title: "Why do British people weigh themselves in stone?",
              description: "The UK officially adopted metric in 1985, but nobody told the bathroom scales. Walk into any gym, GP surgery, or pub in Britain and people will tell you their weight in stone. It is deeply cultural — your mum knows she's 9 stone 7, your mate reckons he's 'about 14 stone', and the NHS dutifully converts it all to kilograms for their records. The stone is 14 pounds (6.35 kg), and it has been used in the British Isles since the 14th century for weighing everything from wool to people. It stuck because the numbers are more manageable — saying '11 stone 2' feels more natural than '70.8 kilograms' if you grew up hearing it."
            }}
            howItWorks={{
              title: "How to convert stone to kg (and back)",
              description: "The maths is straightforward once you know the conversion factors.",
              steps: [
                { step: 1, title: "Stone to kilograms", description: "Multiply the stone by 6.35029. If you have extra pounds, multiply those by 0.4536 and add them on. So 11 stone 4 lbs = (11 x 6.35) + (4 x 0.4536) = 71.67 kg." },
                { step: 2, title: "Kilograms to stone", description: "Divide the kg by 6.35029 to get the stone value. The whole number is your stone, and the decimal part multiplied by 14 gives you the remaining pounds." },
                { step: 3, title: "Use the reference table", description: "For quick lookups, scroll down to the table below the converter. It covers 8 stone to 20 stone in 1-stone increments — the range that covers most adult body weights." }
              ]
            }}
            formula={{
              title: "The conversion formulas",
              formula: "kg = (stone x 6.35029) + (lbs x 0.45359)",
              explanation: "One stone equals exactly 6.35029 kilograms (or 14 pounds). One pound is 0.45359 kg. To go the other way, divide kilograms by 6.35029 for stone, or by 0.45359 for pounds. The converter handles fractional pounds and rounds to a sensible number of decimal places."
            }}
            tips={[
              "NHS records use kilograms, so if you need your weight for a medical form, convert from stone first",
              "BMI calculators need your weight in kilograms — a common trip-up for UK users who only know their weight in stone",
              "If you are tracking weight loss, kilograms show smaller increments which can be more motivating week to week",
              "Airline baggage allowances are always in kilograms — knowing your suitcase weighs '2 stone' is not much help at check-in",
              "Most UK gym equipment displays in kilograms, so knowing your body weight in kg helps when calculating relative strength"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

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

export default StoneConverter;
