import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { Link } from "react-router-dom";

const ACCENT = "#D97706";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const materials = [
  { name: "Gravel", densityTonPerYd3: 1.4 },
  { name: "Concrete", densityTonPerYd3: 2.0 },
  { name: "Mulch", densityTonPerYd3: 0.4 },
  { name: "Topsoil", densityTonPerYd3: 1.1 },
  { name: "Sand", densityTonPerYd3: 1.3 },
];

type InputUnit = "feet" | "metres" | "yards" | "inches";

function toYards(val: number, unit: InputUnit): number {
  if (unit === "yards") return val;
  if (unit === "feet") return val / 3;
  if (unit === "metres") return val * 1.09361;
  if (unit === "inches") return val / 36;
  return val;
}

const CubicYardsCalculator = () => {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("3");
  const [depth, setDepth] = useState("0.5");
  const [unit, setUnit] = useState<InputUnit>("feet");
  const [material, setMaterial] = useState(0);

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const yd3 = toYards(l, unit) * toYards(w, unit) * toYards(d, unit);
    const ft3 = yd3 * 27;
    const m3 = yd3 * 0.764555;
    const weightTon = yd3 * materials[material].densityTonPerYd3;
    const weightKg = weightTon * 1000;
    return {
      yd3: Math.round(yd3 * 100) / 100,
      ft3: Math.round(ft3 * 100) / 100,
      m3: Math.round(m3 * 100) / 100,
      weightTon: Math.round(weightTon * 100) / 100,
      weightKg: Math.round(weightKg),
    };
  }, [length, width, depth, unit, material]);

  const faqSchema = [
    { question: "How do I calculate cubic yards?", answer: "Multiply length × width × depth, all in yards. If your measurements are in feet, divide each by 3 first. If in metres, multiply each by 1.094." },
    { question: "How many cubic feet in a cubic yard?", answer: "There are 27 cubic feet in 1 cubic yard (3 feet × 3 feet × 3 feet = 27 cubic feet)." },
    { question: "How heavy is 1 cubic yard of concrete?", answer: "Approximately 2 tonnes (2,000 kg). Concrete is denser than most materials — gravel is about 1.4 tonnes per cubic yard, topsoil about 1.1 tonnes." },
    { question: "What is a skip measured in?", answer: "UK mini skips are typically 2–3 cubic yards. A midi skip is 4–5 cubic yards. A builder's skip is 6–8 cubic yards. Knowing your cubic yardage helps you pick the right skip size." },
  ];

  return (
    <>
      <SEO
        title="Cubic Yards Calculator"
        description="Calculate cubic yards from length, width, and depth. Convert to cubic feet and cubic metres. Includes material weight estimates for gravel, concrete, topsoil."
        keywords="cubic yards calculator, cubic yards, yd3 calculator, cubic feet calculator, volume calculator construction"
        faqSchema={faqSchema}
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-amber-700/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Cubic Yards</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-8 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[8vw] lg:text-[62px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #fbbf24 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>CUBIC</span>
              <span className="block text-[8vw] lg:text-[62px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #fbbf24 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>YARDS</span>
              <span className="block text-[6vw] lg:text-[50px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CALCULATOR</span>
            </h1>
            {result && (
              <div className="mt-8 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Cubic Yards</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.yd3}<span className="text-2xl text-white/40 ml-2">yd³</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Cubic Feet</p><p className="font-display text-lg text-white">{result.ft3} ft³</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Cubic Metres</p><p className="font-display text-lg text-white">{result.m3} m³</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Weight (tonnes)</p><p className="font-display text-lg text-white">{result.weightTon} t</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Weight (kg)</p><p className="font-display text-lg text-white">{result.weightKg.toLocaleString()} kg</p></div>
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Cubic yards", value: `${result.yd3} yd³` }, { label: "Cubic metres", value: `${result.m3} m³` }, { label: "Weight", value: `${result.weightTon} tonnes` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20">
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-5">
              <div>
                <label className={labelClass}>Input Units</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["feet","metres","yards","inches"] as InputUnit[]).map(u => (
                    <button key={u} onClick={() => setUnit(u)} className="py-2 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: unit === u ? ACCENT : "rgba(255,255,255,0.05)", color: unit === u ? "#fff" : "rgba(255,255,255,0.4)", border: unit === u ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{u}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className={labelClass}>Length</label><input type="number" min="0" step="0.1" value={length} onChange={e => setLength(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                <div><label className={labelClass}>Width</label><input type="number" min="0" step="0.1" value={width} onChange={e => setWidth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                <div><label className={labelClass}>Depth</label><input type="number" min="0" step="0.1" value={depth} onChange={e => setDepth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
              </div>
              <div>
                <label className={labelClass}>Material</label>
                <select value={material} onChange={e => setMaterial(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all [color-scheme:dark]">
                  {materials.map((m, i) => <option key={m.name} value={i}>{m.name}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "What is a cubic yards calculator?", description: "Volume calculations are needed for almost every construction and landscaping project — concrete slabs, gravel driveways, topsoil for raised beds. This calculator converts length × width × depth into cubic yards, cubic feet, and cubic metres, and estimates the weight based on the material." }}
            howItWorks={{ title: "How to calculate cubic yards", description: "Convert all measurements to yards, then multiply length × width × depth. There are 27 cubic feet in 1 cubic yard.", steps: [{ step: 1, title: "Enter dimensions", description: "Set your unit (feet, metres, yards, or inches), then enter length, width, and depth." }, { step: 2, title: "Select material", description: "Pick the material to get an estimated weight in tonnes and kg." }, { step: 3, title: "Use results", description: "Order with 10% extra to account for compaction and waste." }] }}
            formula={{ title: "Volume formula", formula: "Volume (yd³) = L(yd) × W(yd) × D(yd)", explanation: "1 cubic yard = 27 cubic feet = 0.7646 cubic metres. To convert feet to yards, divide by 3. To convert metres to yards, multiply by 1.0936." }}
            tips={["1 cubic yard fills a box 3ft × 3ft × 3ft", "UK mini skip = ~2–3 cubic yards", "Add 10–15% for compaction when ordering gravel or topsoil", "Concrete needs 2% more volume than calculated to account for forms"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p></div></footer>
      </div>
    </>
  );
};

export default CubicYardsCalculator;
