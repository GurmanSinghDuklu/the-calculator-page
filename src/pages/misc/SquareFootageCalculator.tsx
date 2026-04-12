import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { Plus, Trash2, Square } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#F59E0B";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

type UnitSystem = "feet" | "metres" | "yards";
const conversions: Record<UnitSystem, { toSqFt: number; label: string }> = {
  feet: { toSqFt: 1, label: "ft" },
  metres: { toSqFt: 10.7639, label: "m" },
  yards: { toSqFt: 9, label: "yd" },
};

interface Room { id: number; name: string; length: string; width: string; }

const SquareFootageCalculator = () => {
  const [unit, setUnit] = useState<UnitSystem>("metres");
  const [rooms, setRooms] = useState<Room[]>([{ id: 1, name: "Room 1", length: "4", width: "3.5" }]);

  const addRoom = () => setRooms(r => [...r, { id: Date.now(), name: `Room ${r.length + 1}`, length: "", width: "" }]);
  const removeRoom = (id: number) => setRooms(r => r.filter(x => x.id !== id));
  const updateRoom = (id: number, field: keyof Room, val: string) => setRooms(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const results = rooms.map(room => {
    const l = parseFloat(room.length);
    const w = parseFloat(room.width);
    if (isNaN(l) || isNaN(w)) return { ...room, area: null, sqFt: null, sqM: null };
    const area = l * w;
    const sqFt = area * conversions[unit].toSqFt;
    const sqM = unit === "metres" ? area : unit === "feet" ? area / 10.7639 : area * 0.836127;
    return { ...room, area: Math.round(area * 100) / 100, sqFt: Math.round(sqFt * 100) / 100, sqM: Math.round(sqM * 100) / 100 };
  });

  const totalSqFt = results.reduce((s, r) => s + (r.sqFt || 0), 0);
  const totalSqM = results.reduce((s, r) => s + (r.sqM || 0), 0);

  const faqSchema = [
    { question: "How do I calculate square footage?", answer: "Multiply the length by the width. If your room is 12 feet by 10 feet, the area is 120 square feet. For irregular rooms, divide into rectangles and add the areas together." },
    { question: "How do I convert square metres to square feet?", answer: "Multiply square metres by 10.764. For example, 25 square metres × 10.764 = 269 square feet. To convert the other way, divide square feet by 10.764." },
    { question: "How big is a typical UK bedroom in square metres?", answer: "A standard double bedroom in the UK is around 10–13 square metres (107–140 sq ft). A master bedroom is typically 14–20 sq m. A single bedroom can be as small as 7 sq m (75 sq ft)." },
    { question: "Why do UK property listings sometimes use square feet?", answer: "Newer UK property listings often include both sq ft and sq m. Older listings and estate agents with American clients tend to use square feet. The legal standard in the UK is metric (sq m), but sq ft remains common." },
  ];

  const presets = [
    { name: "Double bedroom", l: "3.7", w: "3.5" },
    { name: "Living room", l: "5", w: "4" },
    { name: "Kitchen", l: "3.5", w: "3.5" },
    { name: "Bathroom", l: "2.4", w: "2" },
    { name: "Garage", l: "6", w: "3" },
  ];

  return (
    <>
      <SEO
        title="Square Footage Calculator"
        description="Calculate room area in square feet, square metres, and square yards. Add multiple rooms and get a total. Includes UK room size reference."
        keywords="square footage calculator, sq ft calculator, area calculator, room size calculator, square metres to square feet"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-amber-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Square Footage</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-start pt-20">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[8vw] lg:text-[62px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #fcd34d 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>SQUARE</span>
              <span className="block text-[7vw] lg:text-[56px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>FOOTAGE</span>
            </h1>
            <div className="mt-6 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Add multiple rooms and get total area in sq ft, sq m, and sq yd.</p>
            </div>

            {totalSqFt > 0 && (
              <div className="mt-8 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Total Area</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{Math.round(totalSqFt).toLocaleString()}<span className="text-2xl text-white/40 ml-2">sq ft</span></p>
                  <p className="text-white/50 mt-2">{Math.round(totalSqM * 10) / 10} sq m</p>
                </div>
                {results.filter(r => r.sqFt).map(r => (
                  <div key={r.id} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/60 text-sm">{r.name}</span>
                    <span className="text-white font-medium text-sm">{r.sqFt} sq ft / {r.sqM} sq m</span>
                  </div>
                ))}
                <CopyButton accentColor={ACCENT} results={[{ label: "Total sq ft", value: `${Math.round(totalSqFt)} sq ft` }, { label: "Total sq m", value: `${Math.round(totalSqM * 10) / 10} sq m` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20 space-y-4">
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl uppercase text-white tracking-wide">Unit</h3>
                <Square className="h-5 w-5" style={{ color: ACCENT }} />
              </div>
              <div className="flex gap-2">
                {(["feet","metres","yards"] as UnitSystem[]).map(u => (
                  <button key={u} onClick={() => setUnit(u)} className="flex-1 py-2 rounded-lg text-xs font-heading uppercase tracking-widest transition-all" style={{ background: unit === u ? ACCENT : "rgba(255,255,255,0.05)", color: unit === u ? "#fff" : "rgba(255,255,255,0.4)", border: unit === u ? "none" : "1px solid rgba(255,255,255,0.1)" }}>{u}</button>
                ))}
              </div>
            </div>

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl uppercase text-white tracking-wide">Rooms</h3>
                <button onClick={addRoom} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-all" style={{ background: `${ACCENT}20`, color: ACCENT, border: `1px solid ${ACCENT}40` }}>
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
              <div className="space-y-4">
                {rooms.map(room => (
                  <div key={room.id} className="border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input value={room.name} onChange={e => updateRoom(room.id, "name", e.target.value)} className="flex-1 bg-transparent text-white/70 text-sm font-heading uppercase tracking-widest focus:outline-none" />
                      {rooms.length > 1 && <button onClick={() => removeRoom(room.id)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Length ({conversions[unit].label})</label>
                        <input type="number" min="0" step="0.1" value={room.length} onChange={e => updateRoom(room.id, "length", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      </div>
                      <div>
                        <label className={labelClass}>Width ({conversions[unit].label})</label>
                        <input type="number" min="0" step="0.1" value={room.width} onChange={e => updateRoom(room.id, "width", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-white font-medium focus:outline-none transition-all" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">Room Presets</p>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button key={p.name} onClick={() => { updateRoom(rooms[rooms.length - 1].id, "name", p.name); updateRoom(rooms[rooms.length - 1].id, "length", p.l); updateRoom(rooms[rooms.length - 1].id, "width", p.w); if (unit !== "metres") setUnit("metres"); }} className="px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all">{p.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "What is a square footage calculator?", description: "It calculates the floor area of a room by multiplying length by width. You can add multiple rooms and see the combined total — useful when flooring, tiling, or painting an entire floor of a property." }}
            howItWorks={{ title: "How to measure square footage", description: "Measure the length and width of each room. Multiply them together. The calculator shows the result in sq ft, sq m, and sq yd simultaneously.", steps: [{ step: 1, title: "Measure each room", description: "Use a tape measure to get length and width. Measure at the widest points." }, { step: 2, title: "Add all rooms", description: "Click 'Add Room' to calculate multiple spaces and get a total." }, { step: 3, title: "Switch units", description: "Toggle between feet, metres, and yards. The calculator converts automatically." }] }}
            formula={{ title: "Area formula", formula: "Area = Length × Width", explanation: "For square metres to sq ft, multiply by 10.764. For sq ft to sq m, divide by 10.764. Add 10–15% for waste when buying flooring." }}
            tips={["Always add 10–15% to your flooring order to account for cuts and waste", "UK carpets are often sold by the square metre; tiles and wood flooring may be by sq ft or sq m", "Average UK semi-detached house: ~85 sq m (915 sq ft) of floor area", "A garden shed base: 1.8×2.4m = 4.32 sq m = 46.5 sq ft"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p></div></footer>
      </div>
    </>
  );
};

export default SquareFootageCalculator;
