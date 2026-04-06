import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#8B5CF6";

const CM_PER_INCH = 2.54;

type Direction = "cm-to-inches" | "inches-to-cm";

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const CmToInches = () => {
  const [direction, setDirection] = useState<Direction>("cm-to-inches");
  const [inputValue, setInputValue] = useState("170");
  const [result, setResult] = useState<{
    cm: number;
    inches: number;
    feet: number;
    remainingInches: number;
  } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;

    let cm: number;
    let totalInches: number;

    if (direction === "cm-to-inches") {
      cm = val;
      totalInches = val / CM_PER_INCH;
    } else {
      totalInches = val;
      cm = val * CM_PER_INCH;
    }

    const feet = Math.floor(totalInches / 12);
    const remainingInches = Math.round((totalInches - feet * 12) * 100) / 100;

    setResult({
      cm: Math.round(cm * 100) / 100,
      inches: Math.round(totalInches * 100) / 100,
      feet,
      remainingInches,
    });
  };

  // Quick reference: common heights 150cm to 200cm in 5cm steps
  const referenceTable = Array.from({ length: 11 }, (_, i) => {
    const cm = 150 + i * 5;
    const totalInches = cm / CM_PER_INCH;
    const feet = Math.floor(totalInches / 12);
    const remIn = Math.round((totalInches - feet * 12) * 10) / 10;
    return { cm, inches: Math.round(totalInches * 100) / 100, feet, remIn };
  });

  const faqSchema = [
    { question: "How many inches is 1 cm?", answer: "One centimetre is 0.3937 inches. To convert cm to inches, divide by 2.54. So 10 cm is about 3.94 inches." },
    { question: "How do I convert my height from cm to feet and inches?", answer: "Divide your height in cm by 2.54 to get total inches. Then divide that by 12 — the whole number is feet, and the remainder is inches. For example, 175 cm = 68.9 inches = 5 feet 8.9 inches." },
    { question: "Why does the UK use both cm and inches?", answer: "The UK officially uses metric, but older generations grew up with imperial. Height is commonly given in feet and inches in everyday conversation, while medical records, passports, and driving licences use centimetres. You end up needing to know both." },
    { question: "What is 5 foot 10 in cm?", answer: "5 foot 10 inches is 177.8 cm. Multiply the feet by 30.48 (12 inches x 2.54) and the inches by 2.54, then add them together: (5 x 30.48) + (10 x 2.54) = 152.4 + 25.4 = 177.8 cm." },
  ];

  return (
    <>
      <SEO
        title="CM to Inches Converter"
        description="Convert centimetres to inches and back. Includes feet and inches breakdown for heights, plus a quick reference table for 150 cm to 200 cm."
        keywords="cm to inches, inches to cm, height converter, centimetres to inches, cm to feet and inches, height in cm"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-violet-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">CM to Inches</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>CM</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO INCHES
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between centimetres and inches, with a feet-and-inches breakdown for heights.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "cm-to-inches" ? "In Inches" : "In Centimetres"}
                  </p>
                  {direction === "cm-to-inches" ? (
                    <>
                      <p className="font-display text-5xl" style={{ color: ACCENT }}>
                        {result.inches} <span className="text-2xl text-white/40">in</span>
                      </p>
                      {result.inches >= 12 && (
                        <p className="text-sm text-white/40 mt-2 font-heading uppercase tracking-widest">
                          {result.feet} ft {result.remainingInches} in
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.cm} <span className="text-2xl text-white/40">cm</span>
                    </p>
                  )}
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Centimetres</p>
                    <p className="font-display text-lg text-white">{result.cm} cm</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Inches</p>
                    <p className="font-display text-lg text-white">{result.inches} in</p>
                  </div>
                  {result.inches >= 12 && (
                    <>
                      <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Feet & Inches</p>
                        <p className="font-display text-lg text-white">{result.feet}&apos; {result.remainingInches}&quot;</p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Metres</p>
                        <p className="font-display text-lg text-white">{(result.cm / 100).toFixed(2)} m</p>
                      </div>
                    </>
                  )}
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Centimetres", value: `${result.cm} cm` },
                  { label: "Inches", value: `${result.inches} in` },
                  ...(result.inches >= 12 ? [{ label: "Feet & Inches", value: `${result.feet} ft ${result.remainingInches} in` }] : []),
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
                <Ruler className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Direction toggle */}
                <div className="flex gap-2">
                  {([["cm-to-inches", "CM \u2192 Inches"], ["inches-to-cm", "Inches \u2192 CM"]] as const).map(([d, label]) => (
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
                  <label className={labelClass}>{direction === "cm-to-inches" ? "Centimetres" : "Inches"}</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convert()}
                    placeholder={direction === "cm-to-inches" ? "170" : "67"}
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
                        {direction === "cm-to-inches"
                          ? `${result.inches} in`
                          : `${result.cm} cm`}
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

            {/* Quick reference table: common heights */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Height Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Common Heights</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">CM</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Inches</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Feet & Inches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceTable.map(({ cm, inches, feet, remIn }) => (
                      <tr key={cm} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{cm} cm</td>
                        <td className="py-2 text-right text-white/70">{inches} in</td>
                        <td className="py-2 text-right text-white/70">{feet}&apos; {remIn}&quot;</td>
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
              title: "Why you need a cm-to-inches converter",
              description: "The UK is stuck between two systems. Your passport lists your height in centimetres, your driving licence doesn't mention height at all, and your nan will insist you're five foot eleven until the day she dies. Online shopping for clothes, bikes, or furniture often means switching between cm and inches depending on whether the brand is European or American. This converter does the maths so you don't have to hold the calculation in your head while browsing a sizing chart."
            }}
            howItWorks={{
              title: "How to convert cm to inches",
              description: "One inch is exactly 2.54 centimetres. That is the only number you need.",
              steps: [
                { step: 1, title: "CM to inches", description: "Divide the centimetre value by 2.54. For example, 180 cm / 2.54 = 70.87 inches." },
                { step: 2, title: "Inches to cm", description: "Multiply the inch value by 2.54. For example, 66 inches x 2.54 = 167.64 cm." },
                { step: 3, title: "Getting feet and inches", description: "Once you have total inches, divide by 12. The whole number is feet, the remainder is inches. So 70.87 inches = 5 feet 10.87 inches, which you'd round to 5 ft 11 in conversation." }
              ]
            }}
            formula={{
              title: "The conversion formula",
              formula: "inches = cm / 2.54",
              explanation: "The inch was officially defined as exactly 2.54 centimetres in 1959 by international agreement. This makes the conversion exact, not an approximation. To go from inches to cm, multiply by 2.54. To break inches into feet and inches, divide by 12 — there are 12 inches in a foot. The converter also shows metres for convenience (just divide cm by 100)."
            }}
            tips={[
              "For a rough mental conversion, divide cm by 2.5 — it's close enough for everyday estimates",
              "UK clothing sizes often list measurements in inches (chest, waist), while European sizes use cm — check which system the brand uses before ordering",
              "TV and monitor sizes are always measured in inches diagonally, even in metric countries",
              "If someone tells you their height in feet and inches and you need cm: multiply feet by 30.48, add inches times 2.54",
              "The height reference table covers 150 cm to 200 cm — the range for most adults — so you can quickly look up any height"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CmToInches;
