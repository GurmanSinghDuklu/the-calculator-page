import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#92400E";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const gravelTypes = [
  { name: "Pea Gravel", density: 1500 },
  { name: "Crushed Stone", density: 1600 },
  { name: "Limestone", density: 1500 },
  { name: "Slate Chips", density: 1400 },
  { name: "Decorative Aggregate", density: 1500 },
];

const GravelCalculator = () => {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("3");
  const [depth, setDepth] = useState("50");
  const [unit, setUnit] = useState<"metres" | "feet">("metres");
  const [gravelType, setGravelType] = useState(0);
  const [pricePerTonne, setPricePerTonne] = useState("85");

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;

    let lengthM = unit === "metres" ? l : l * 0.3048;
    let widthM = unit === "metres" ? w : w * 0.3048;
    const depthM = d / 1000; // depth is always in mm

    const volumeM3 = lengthM * widthM * depthM;
    const density = gravelTypes[gravelType].density; // kg/m³
    const weightKg = volumeM3 * density;
    const weightTonnes = weightKg / 1000;
    const bags25kg = Math.ceil(weightKg / 25);
    const bulkBags = Math.ceil(weightTonnes);
    const totalCost = weightTonnes * parseFloat(pricePerTonne);

    return {
      volumeM3: Math.round(volumeM3 * 1000) / 1000,
      volumeYd3: Math.round(volumeM3 * 1.30795 * 100) / 100,
      weightTonnes: Math.round(weightTonnes * 100) / 100,
      bags25kg,
      bulkBags,
      totalCost: isNaN(totalCost) ? null : Math.round(totalCost),
    };
  }, [length, width, depth, unit, gravelType, pricePerTonne]);

  const depthPresets = [
    { label: "Path (30mm)", value: "30" },
    { label: "Driveway (50mm)", value: "50" },
    { label: "Drainage (100mm)", value: "100" },
  ];

  const faqSchema = [
    { question: "How much gravel do I need for a driveway?", answer: "For a driveway, you need a depth of 50mm (2 inches). Measure the length and width in metres, multiply them together, then multiply by 0.05. This gives you cubic metres. Multiply by the gravel density (typically 1,500 kg/m³) to get the weight in kg." },
    { question: "How many tonnes of gravel do I need?", answer: "Multiply the volume in cubic metres by the gravel density in kg/m³, then divide by 1,000. For example, a 10m × 3m driveway at 50mm depth: 10 × 3 × 0.05 = 1.5 m³ × 1,500 kg/m³ = 2,250 kg = 2.25 tonnes." },
    { question: "How many 25kg bags of gravel do I need?", answer: "Divide the total weight in kg by 25. For 2,250 kg, you'd need 90 bags of 25 kg. Bulk bags (1 tonne bags) are more economical for larger projects." },
    { question: "What depth of gravel for a path vs driveway?", answer: "Decorative paths: 30–40mm depth. Driveways with light traffic: 50mm. Heavy traffic/vehicles: 75–100mm. Drainage layers under patios: 100mm minimum." },
  ];

  return (
    <>
      <SEO
        title="Gravel Calculator"
        description="Calculate how much gravel you need in tonnes, cubic metres, and bags. Enter area dimensions and depth for paths, driveways, and drainage."
        keywords="gravel calculator, how much gravel, gravel tonnes calculator, driveway gravel calculator, gravel bags"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-amber-900/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Gravel Calculator</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-8 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #d97706 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>GRAVEL</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CALCULATOR</span>
            </h1>
            <div className="mt-6 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Calculate gravel for paths, driveways, and drainage. Get tonnes, cubic metres, and bag counts.</p>
            </div>
            {result && (
              <div className="mt-8 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Weight Required</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.weightTonnes}<span className="text-2xl text-white/40 ml-2">tonnes</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Volume (m³)</p><p className="font-display text-lg text-white">{result.volumeM3} m³</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">25kg Bags</p><p className="font-display text-lg text-white">{result.bags25kg}</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Bulk Bags (1t)</p><p className="font-display text-lg text-white">{result.bulkBags}</p></div>
                  {result.totalCost !== null && <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Est. Cost</p><p className="font-display text-lg text-white">£{result.totalCost.toLocaleString()}</p></div>}
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Tonnes", value: `${result.weightTonnes} tonnes` }, { label: "25kg bags", value: `${result.bags25kg}` }, { label: "Volume", value: `${result.volumeM3} m³` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20">
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-5">
              <div className="flex gap-2">
                {(["metres","feet"] as const).map(u => (
                  <button key={u} onClick={() => setUnit(u)} className="flex-1 py-2 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: unit === u ? ACCENT : "rgba(255,255,255,0.05)", color: unit === u ? "#fff" : "rgba(255,255,255,0.4)", border: unit === u ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{u}</button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Length ({unit === "metres" ? "m" : "ft"})</label><input type="number" min="0" step="0.1" value={length} onChange={e => setLength(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
                <div><label className={labelClass}>Width ({unit === "metres" ? "m" : "ft"})</label><input type="number" min="0" step="0.1" value={width} onChange={e => setWidth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
              </div>
              <div>
                <label className={labelClass}>Depth (mm)</label>
                <input type="number" min="1" step="5" value={depth} onChange={e => setDepth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                <div className="flex gap-2 mt-2">{depthPresets.map(p => <button key={p.label} onClick={() => setDepth(p.value)} className="px-2 py-1 text-[10px] font-heading uppercase tracking-wider text-white/40 border border-white/10 rounded hover:text-white/70 transition-all">{p.label}</button>)}</div>
              </div>
              <div>
                <label className={labelClass}>Gravel Type</label>
                <select value={gravelType} onChange={e => setGravelType(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all [color-scheme:dark]">
                  {gravelTypes.map((t, i) => <option key={t.name} value={i}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Price per Tonne (£)</label>
                <input type="number" min="0" step="1" value={pricePerTonne} onChange={e => setPricePerTonne(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} placeholder="Optional" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "What is a gravel calculator?", description: "It calculates how much gravel you need for a given area and depth. Gravel is sold by weight (tonnes) or by bag — this tool converts between them so you can order exactly the right amount without waste." }}
            howItWorks={{ title: "How to use this gravel calculator", description: "Enter the length and width of your area, the required depth in mm, and select the gravel type. The calculator outputs tonnes, cubic metres, and bag counts.", steps: [{ step: 1, title: "Measure your area", description: "Measure the length and width in metres or feet." }, { step: 2, title: "Set the depth", description: "Use the depth presets for common applications: 30mm for paths, 50mm for driveways, 100mm for drainage." }, { step: 3, title: "Order with 10% extra", description: "Add 10% to your order to account for compaction and wastage." }] }}
            formula={{ title: "Volume formula", formula: "Volume (m³) = Length × Width × Depth (m)", explanation: "Weight (tonnes) = Volume × Density (kg/m³) ÷ 1000. Add 10% for wastage. Bulk bags (1 tonne) are more economical than individual 25kg bags for large projects." }}
            tips={["Order 10% more than calculated to account for compaction and uneven ground", "1 bulk bag (1 tonne) = 40 × 25kg bags — more economical for larger areas", "For driveways: lay a weed membrane underneath before adding gravel", "Depth of 50mm is minimum for driveways — vehicles will push through thinner layers"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default GravelCalculator;
