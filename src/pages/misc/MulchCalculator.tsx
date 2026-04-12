import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { Link } from "react-router-dom";

const ACCENT = "#65A30D";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const mulchTypes = [
  { name: "Bark Mulch", litresPerM3: 1000 },
  { name: "Wood Chip", litresPerM3: 1000 },
  { name: "Compost", litresPerM3: 1000 },
  { name: "Decorative Bark", litresPerM3: 1000 },
];

const depthPresets = [
  { label: "Flower beds (50mm)", value: 50 },
  { label: "Around trees (75mm)", value: 75 },
  { label: "Play area (300mm)", value: 300 },
];

const MulchCalculator = () => {
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("3");
  const [depth, setDepth] = useState("75");
  const [unit, setUnit] = useState<"metres" | "feet">("metres");
  const [mulchType, setMulchType] = useState(0);
  const [pricePerBag, setPricePerBag] = useState("8");
  const [bagSize, setBagSize] = useState<50 | 100>(50);

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    if (isNaN(l) || isNaN(w) || isNaN(d)) return null;
    const lM = unit === "metres" ? l : l * 0.3048;
    const wM = unit === "metres" ? w : w * 0.3048;
    const dM = d / 1000;
    const volumeM3 = lM * wM * dM;
    const volumeLitres = volumeM3 * 1000;
    const bags = Math.ceil(volumeLitres / bagSize);
    const totalCost = bags * parseFloat(pricePerBag);
    return {
      volumeM3: Math.round(volumeM3 * 100) / 100,
      volumeLitres: Math.round(volumeLitres),
      bags,
      totalCost: isNaN(totalCost) ? null : Math.round(totalCost),
    };
  }, [length, width, depth, unit, mulchType, pricePerBag, bagSize]);

  const faqSchema = [
    { question: "How much mulch do I need?", answer: "Multiply the length × width of your area in metres to get square metres. Then multiply by the depth in metres (e.g., 75mm = 0.075m) to get cubic metres. Multiply by 1,000 to get litres, then divide by your bag size (50L or 100L)." },
    { question: "What depth of mulch should I use?", answer: "Flower beds: 50–75mm. Around trees and shrubs: 75–100mm (keep 150mm away from the trunk). Play areas: 300mm minimum for fall protection. Top up annually — mulch breaks down over time." },
    { question: "When is the best time to mulch?", answer: "The RHS recommends mulching in spring (April) when the soil has warmed, or autumn (October) to protect roots. Avoid mulching frozen or very dry soil." },
    { question: "What is the difference between bark mulch and wood chip?", answer: "Bark mulch comes from the outer bark and lasts 2–3 years. Wood chip is chipped whole branches and breaks down faster (1–2 years), feeding the soil. Bark looks more decorative; wood chip is better for improving soil structure." },
  ];

  return (
    <>
      <SEO
        title="Mulch Calculator"
        description="Calculate how many bags of mulch you need for your garden. Enter area and depth to get litres, cubic metres, and bag count for 50L or 100L bags."
        keywords="mulch calculator, how much mulch, garden mulch calculator, bark mulch calculator, mulch bags"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-lime-700/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Mulch Calculator</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #a3e635 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>MULCH</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CALCULATOR</span>
            </h1>
            <div className="mt-6 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Calculate how many bags of mulch you need. Enter your area and depth to get bag counts and estimated cost.</p>
            </div>
            {result && (
              <div className="mt-8 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Bags Required ({bagSize}L)</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.bags}<span className="text-2xl text-white/40 ml-2">bags</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Volume (litres)</p><p className="font-display text-lg text-white">{result.volumeLitres.toLocaleString()} L</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Volume (m³)</p><p className="font-display text-lg text-white">{result.volumeM3} m³</p></div>
                  {result.totalCost !== null && <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 col-span-2"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Est. Cost</p><p className="font-display text-lg text-white">£{result.totalCost.toLocaleString()}</p></div>}
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Bags", value: `${result.bags} × ${bagSize}L bags` }, { label: "Volume", value: `${result.volumeLitres}L / ${result.volumeM3}m³` }]} />
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
                <input type="number" min="10" step="5" value={depth} onChange={e => setDepth(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                <div className="flex flex-wrap gap-2 mt-2">{depthPresets.map(p => <button key={p.label} onClick={() => setDepth(String(p.value))} className="px-2 py-1 text-[10px] font-heading uppercase tracking-wider text-white/40 border border-white/10 rounded hover:text-white/70 transition-all">{p.label}</button>)}</div>
              </div>
              <div>
                <label className={labelClass}>Mulch Type</label>
                <select value={mulchType} onChange={e => setMulchType(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all [color-scheme:dark]">
                  {mulchTypes.map((t, i) => <option key={t.name} value={i}>{t.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Bag Size</label>
                  <div className="flex gap-2">
                    {([50, 100] as const).map(s => <button key={s} onClick={() => setBagSize(s)} className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: bagSize === s ? ACCENT : "rgba(255,255,255,0.05)", color: bagSize === s ? "#fff" : "rgba(255,255,255,0.4)", border: bagSize === s ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{s}L</button>)}
                  </div>
                </div>
                <div><label className={labelClass}>Price per Bag (£)</label><input type="number" min="0" step="0.5" value={pricePerBag} onChange={e => setPricePerBag(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "What is a mulch calculator?", description: "It calculates how many bags of mulch you need for a given area and depth. Mulch is sold by volume (litres per bag), so you need to convert your area and depth into litres to know how many bags to buy." }}
            howItWorks={{ title: "How to calculate mulch", description: "Multiply length × width × depth in metres to get cubic metres. Multiply by 1,000 to get litres. Divide by bag size (50L or 100L).", steps: [{ step: 1, title: "Measure your area", description: "Measure the length and width of the bed in metres." }, { step: 2, title: "Set depth", description: "Use the presets: 50mm for flower beds, 75mm around trees, 300mm for play areas." }, { step: 3, title: "Order with 10% extra", description: "Add 10% buffer to account for uneven ground and compaction." }] }}
            formula={{ title: "Volume formula", formula: "Volume (L) = Length(m) × Width(m) × Depth(m) × 1000", explanation: "Depth in mm ÷ 1000 = depth in metres. Multiply the result by 1.1 to add 10% wastage." }}
            tips={["Apply mulch in spring after the soil has warmed — applying too early keeps the soil cold", "Keep mulch 150mm away from tree trunks to prevent rot", "A 50L bag covers approximately 0.5–1 sq m at 50–100mm depth", "Top up each year — mulch breaks down and feeds the soil over time"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><Logo size="sm" /><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default MulchCalculator;
