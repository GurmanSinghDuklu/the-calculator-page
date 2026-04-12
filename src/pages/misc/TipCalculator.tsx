import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E";

const PRESET_TIPS = ["10", "15", "18", "20", "25"];

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("100");
  const [tipPercent, setTipPercent] = useState("15");
  const [numPeople,  setNumPeople]  = useState("1");
  const [currency,   setCurrency]   = useState<Currency>("USD");
  const [result, setResult] = useState<{
    tipAmount: number; totalAmount: number; perPerson: number; tipPerPerson: number;
  } | null>(null);

  const calculateTip = () => {
    const bill   = parseFloat(billAmount);
    const tip    = parseFloat(tipPercent);
    const people = parseInt(numPeople);
    if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || people <= 0) return;
    const tipAmount   = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    setResult({
      tipAmount:    Math.round(tipAmount    * 100) / 100,
      totalAmount:  Math.round(totalAmount  * 100) / 100,
      perPerson:    Math.round((totalAmount / people) * 100) / 100,
      tipPerPerson: Math.round((tipAmount   / people) * 100) / 100,
    });
  };

  const sym = currencies[currency].symbol;
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const people = parseInt(numPeople);

  const faqSchema = [
    { question: "How much should I tip at a restaurant?", answer: "In the UK, tipping 10-15% for good service is standard. In the US, 15-20% is expected. Check your bill first as some restaurants add a service charge automatically." },
    { question: "Should I tip on the pre-tax or post-tax amount?", answer: "In the UK, tipping on the pre-tax total is common. In the US, most people tip on the pre-tax amount, though some tip on the full bill. Either is acceptable." },
    { question: "How do I split a bill equally?", answer: "Divide the total bill (including tip) by the number of people. Use a tip calculator to include the tip before splitting so everyone pays their fair share including gratuity." },
    { question: "Do I have to tip in the UK?", answer: "Tipping is not legally required in the UK, but it is customary to tip for good service in restaurants, taxis, and hair salons. A 10% tip is widely considered standard." }
  ];

  return (
    <>
      <SEO
        title="Tip Calculator - Calculate Tips & Split Bills"
        description="Free tip calculator to calculate restaurant tips and split bills. Choose from preset tip percentages or customize your own."
        keywords="tip calculator, tip calculator restaurant, calculate tip, split bill calculator, gratuity calculator"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
            <span>/</span>
            <span className="text-white/60">Tip Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[18vw] lg:text-[145px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>TIP</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate restaurant tips and split the bill between any number of people. Choose a preset or enter a custom percentage.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Total hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Total Amount</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {sym}{result.totalAmount.toLocaleString()}
                  </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Bill Amount",        value: `${sym}${parseFloat(billAmount).toLocaleString()}` },
                    { label: `Tip (${tipPercent}%)`, value: `${sym}${result.tipAmount.toLocaleString()}` },
                    ...(people > 1 ? [
                      { label: "Per Person Total",  value: `${sym}${result.perPerson.toLocaleString()}` },
                      { label: "Tip Per Person",    value: `${sym}${result.tipPerPerson.toLocaleString()}` },
                    ] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Split callout */}
                {people > 1 && (
                  <div className="rounded-lg p-4 border text-center" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}10` }}>
                    <p className="font-heading text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
                      Split {people} ways · {sym}{result.perPerson.toLocaleString()} each
                    </p>
                  </div>
                )}
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Total Amount", value: `${sym}${result.totalAmount.toLocaleString()}` },
                  { label: `Tip (${tipPercent}%)`, value: `${sym}${result.tipAmount.toLocaleString()}` },
                  ...(people > 1 ? [
                    { label: "Per Person Total", value: `${sym}${result.perPerson.toLocaleString()}` },
                    { label: "Tip Per Person", value: `${sym}${result.tipPerPerson.toLocaleString()}` },
                  ] : []),
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Bill Details</h3>
                <UtensilsCrossed className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Bill amount */}
                <div>
                  <label className={labelClass}>Bill Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input type="number" step="0.01" value={billAmount} onChange={e => setBillAmount(e.target.value)} placeholder="100.00"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  </div>
                </div>

                {/* Tip % + presets */}
                <div>
                  <label className={labelClass}>Tip Percentage</label>
                  <div className="relative mb-3">
                    <input type="number" step="0.1" value={tipPercent} onChange={e => setTipPercent(e.target.value)} placeholder="15"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">%</span>
                  </div>
                  {/* Preset pills */}
                  <div className="flex gap-2">
                    {PRESET_TIPS.map(p => (
                      <button key={p} onClick={() => setTipPercent(p)}
                        className="flex-1 py-2 rounded-lg font-heading text-xs uppercase tracking-widest transition-all border"
                        style={{
                          borderColor: tipPercent === p ? ACCENT : "rgba(255,255,255,0.08)",
                          background:  tipPercent === p ? `${ACCENT}20` : "transparent",
                          color:       tipPercent === p ? ACCENT : "rgba(255,255,255,0.3)",
                        }}
                      >{p}%</button>
                    ))}
                  </div>
                </div>

                {/* Number of people */}
                <div>
                  <label className={labelClass}>Number of People</label>
                  <input type="number" min="1" value={numPeople} onChange={e => setNumPeople(e.target.value)} placeholder="1"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Total</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>{sym}{result.totalAmount.toLocaleString()}</span>
                    </div>
                    {[
                      { label: `Tip (${tipPercent}%)`, value: `${sym}${result.tipAmount.toLocaleString()}`, accent: true },
                      ...(people > 1 ? [{ label: "Per Person", value: `${sym}${result.perPerson.toLocaleString()}`, accent: false }] : []),
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="font-heading" style={{ color: accent ? ACCENT : "rgba(255,255,255,0.7)" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateTip}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Tip
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

export default TipCalculator;