import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { Link } from "react-router-dom";

const ACCENT = "#78716C";
const CONCRETE_DENSITY = 2400; // kg/m³
const BAG_20KG_M3 = 0.009;
const BAG_25KG_M3 = 0.011;
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

type Shape = "slab" | "column";

const ConcreteCalculator = () => {
  const [shape, setShape] = useState<Shape>("slab");
  const [length, setLength] = useState("4");
  const [width, setWidth] = useState("3");
  const [depth, setDepth] = useState("100");
  const [diameter, setDiameter] = useState("0.3");
  const [height, setHeight] = useState("1");
  const [unit, setUnit] = useState<"metres" | "feet">("metres");
  const [pricePerM3, setPricePerM3] = useState("120");

  const depthPresets = [
    { label: "Patio (75mm)", value: "75" },
    { label: "Shed base (100mm)", value: "100" },
    { label: "Garage (150mm)", value: "150" },
    { label: "Driveway (150mm)", value: "150" },
  ];

  const result = useMemo(() => {
    let volumeM3 = 0;
    if (shape === "slab") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const d = parseFloat(depth) / 1000; // depth in mm → m
      if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
      const lM = unit === "metres" ? l : l * 0.3048;
      const wM = unit === "metres" ? w : w * 0.3048;
      volumeM3 = lM * wM * d;
    } else {
      const r = parseFloat(diameter) / 2;
      const h = parseFloat(height);
      if (isNaN(r) || isNaN(h)) return null;
      const rM = unit === "metres" ? r : r * 0.3048;
      const hM = unit === "metres" ? h : h * 0.3048;
      volumeM3 = Math.PI * rM * rM * hM;
    }

    const volumeYd3 = volumeM3 * 1.30795;
    const weightKg = volumeM3 * CONCRETE_DENSITY;
    const weightTonnes = weightKg / 1000;
    const bags20 = Math.ceil(volumeM3 / BAG_20KG_M3);
    const bags25 = Math.ceil(volumeM3 / BAG_25KG_M3);
    const readyMixCost = volumeM3 * parseFloat(pricePerM3);

    return {
      volumeM3: Math.round(volumeM3 * 1000) / 1000,
      volumeYd3: Math.round(volumeYd3 * 100) / 100,
      weightTonnes: Math.round(weightTonnes * 100) / 100,
      bags20,
      bags25,
      readyMixCost: isNaN(readyMixCost) ? null : Math.round(readyMixCost),
    };
  }, [shape, length, width, depth, diameter, height, unit, pricePerM3]);

  const faqSchema = [
    { question: "How much concrete do I need for a shed base?", answer: "A typical 2.4m × 1.8m shed base at 100mm depth requires: 2.4 × 1.8 × 0.1 = 0.432 m³. That's about 48 bags of 25kg pre-mix, or you could order ready-mix (minimum order typically 1 m³)." },
    { question: "How many 25kg bags of concrete do I need?", answer: "One 25kg bag covers approximately 0.011 m³. Divide your total volume in m³ by 0.011 to get the number of bags. Add 10% for waste. For volumes over 1 m³, ready-mix is more economical." },
    { question: "What is the minimum concrete thickness for a driveway?", answer: "For a domestic driveway with cars: 100mm minimum, 150mm recommended. For heavy vehicles or lorries: 200mm. Concrete should also be laid on a 100mm compacted hardcore sub-base." },
    { question: "How much does ready-mix concrete cost in the UK?", answer: "Ready-mix concrete typically costs £90–£150 per m³ depending on grade and location (2024 prices). Most suppliers have a minimum order of 1 m³. For small volumes, pre-mixed bags are more practical." },
  ];

  return (
    <>
      <SEO
        title="Concrete Calculator"
        description="Calculate concrete volume for slabs and columns. Get cubic metres, bag count for 20kg and 25kg bags, and ready-mix cost estimate."
        keywords="concrete calculator, how much concrete, concrete bags calculator, concrete slab calculator, ready mix concrete"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-stone-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Concrete Calculator</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-8 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[8vw] lg:text-[62px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #a8a29e 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>CONCRETE</span>
              <span className="block text-[8vw] lg:text-[62px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CALCULATOR</span>
            </h1>
            <div className="mt-6 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Calculate concrete for slabs and columns. Get cubic metres, bag counts, and ready-mix cost.</p>
            </div>
            {result && (
              <div className="mt-8 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Volume</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.volumeM3}<span className="text-2xl text-white/40 ml-2">m³</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">20kg Bags</p><p className="font-display text-lg text-white">{result.bags20}</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">25kg Bags</p><p className="font-display text-lg text-white">{result.bags25}</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Weight</p><p className="font-display text-lg text-white">{result.weightTonnes} t</p></div>
                  {result.readyMixCost !== null && <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Ready-mix Est.</p><p className="font-display text-lg text-white">£{result.readyMixCost}</p></div>}
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Volume", value: `${result.volumeM3} m³` }, { label: "25kg bags", value: `${result.bags25}` }, { label: "Weight", value: `${result.weightTonnes} tonnes` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20">
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-5">
              <div className="flex gap-2">
                {(["slab","column"] as Shape[]).map(s => (
                  <button key={s} onClick={() => setShape(s)} className="flex-1 py-2 rounded-lg text-xs font-heading uppercase tracking-widest transition-all capitalize" style={{ background: shape === s ? ACCENT : "rgba(255,255,255,0.05)", color: shape === s ? "#fff" : "rgba(255,255,255,0.4)", border: shape === s ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{s}</button>
                ))}
              </div>
              <div className="flex gap-2">
                {(["metres","feet"] as const).map(u => (
                  <button key={u} onClick={() => setUnit(u)} className="flex-1 py-2 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: unit === u ? `${ACCENT}80` : "rgba(255,255,255,0.05)", color: unit === u ? "#fff" : "rgba(255,255,255,0.4)", border: unit === u ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{u}</button>
                ))}
              </div>
              {shape === "slab" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Length</label><input type="number" min="0" step="0.1" value={length} onChange={e => setLength(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                    <div><label className={labelClass}>Width</label><input type="number" min="0" step="0.1" value={width} onChange={e => setWidth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                  </div>
                  <div>
                    <label className={labelClass}>Depth (mm)</label>
                    <input type="number" min="50" step="5" value={depth} onChange={e => setDepth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    <div className="flex flex-wrap gap-2 mt-2">{depthPresets.map(p => <button key={p.label} onClick={() => setDepth(p.value)} className="px-2 py-1 text-[10px] font-heading uppercase tracking-wider text-white/40 border border-white/10 rounded hover:text-white/70 transition-all">{p.label}</button>)}</div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Diameter</label><input type="number" min="0" step="0.05" value={diameter} onChange={e => setDiameter(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                  <div><label className={labelClass}>Height</label><input type="number" min="0" step="0.1" value={height} onChange={e => setHeight(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                </div>
              )}
              <div><label className={labelClass}>Ready-mix Price per m³ (£)</label><input type="number" min="0" step="5" value={pricePerM3} onChange={e => setPricePerM3(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="Optional" /></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "What is a concrete calculator?", description: "It calculates the volume of concrete needed for a project and converts it into the number of pre-mix bags or cubic metres for a ready-mix order. Essential for shed bases, patios, garage floors, driveways, and post holes." }}
            howItWorks={{ title: "How to calculate concrete", description: "For a slab: multiply length × width × depth (in metres). For a column: π × radius² × height.", steps: [{ step: 1, title: "Choose your shape", description: "Slab for flat pours (patios, floors). Column for post holes and pillars." }, { step: 2, title: "Enter dimensions", description: "Use the depth presets for common UK applications." }, { step: 3, title: "Read results", description: "Get bags needed and ready-mix volume. Always add 5–10% for waste." }] }}
            formula={{ title: "Volume formula", formula: "Slab: V = L × W × D | Column: V = π × r² × h", explanation: "All in metres. 1 m³ concrete ≈ 2.4 tonnes. One 25kg bag covers ~0.011 m³. Ready-mix suppliers typically have a 1 m³ minimum order." }}
            tips={["Add 10% to your order to allow for spillage and uneven ground", "Ready-mix is more economical above 1 m³ — and saves hours of mixing", "Concrete must be laid on compacted hardcore — never directly on loose soil", "Minimum curing time before use: 24 hours foot traffic, 7 days vehicles"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default ConcreteCalculator;
