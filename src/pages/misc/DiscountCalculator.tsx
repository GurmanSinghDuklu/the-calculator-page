import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E";

const DiscountCalculator = () => {
  const [originalPrice,   setOriginalPrice]   = useState("100");
  const [discountPercent, setDiscountPercent] = useState("20");
  const [currency,        setCurrency]        = useState<Currency>("USD");
  const [result, setResult] = useState<{ finalPrice: number; savings: number } | null>(null);

  const calculateDiscount = () => {
    const price    = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0) return;
    const savings = (price * discount) / 100;
    setResult({ finalPrice: Math.round((price - savings) * 100) / 100, savings: Math.round(savings * 100) / 100 });
  };

  const sym = currencies[currency].symbol;
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const savingsPct = result ? ((result.savings / parseFloat(originalPrice)) * 100).toFixed(1) : "0";

  const faqSchema = [
    { question: "How do I calculate a percentage discount?", answer: "Discount Amount = Original Price × (Discount % / 100). Discounted Price = Original Price - Discount Amount. For example, 20% off £50 = £10 discount, final price £40." },
    { question: "What is the difference between a discount and a sale price?", answer: "The discount is the amount saved, while the sale price is what you actually pay. Sale Price = Original Price × (1 - Discount Rate). Both terms are related but describe different things." },
    { question: "How do stacked discounts work?", answer: "Stacked discounts apply sequentially, not additively. A 20% discount followed by a 10% discount gives 28% off total, not 30%, because the second discount applies to the already-reduced price." },
    { question: "How do I calculate the original price from a discounted price?", answer: "Original Price = Discounted Price / (1 - Discount Rate). For example, if you paid £80 after a 20% discount, the original price was £80 / 0.8 = £100." }
  ];

  return (
    <>
      <SEO
        title="Discount Calculator - Calculate Sale Price & Savings"
        description="Free discount calculator to find sale prices and savings. Calculate percentage discounts instantly."
        keywords="discount calculator, sale price calculator, percentage off calculator, discount percentage calculator"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
            <span>/</span>
            <span className="text-white/60">Discount Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[82px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>DISCOUNT</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate sale prices and total savings instantly. Enter any original price and discount percentage.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Final price hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Final Price</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {sym}{result.finalPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">after {discountPercent}% discount</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Original Price", value: `${sym}${parseFloat(originalPrice).toLocaleString()}`, strike: true },
                    { label: "You Save",        value: `${sym}${result.savings.toLocaleString()}` },
                    { label: "Discount",        value: `${discountPercent}% OFF` },
                    { label: "Saving",          value: `${savingsPct}%` },
                  ].map(({ label, value, strike }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className={`font-display text-lg ${strike ? "line-through text-white/30" : "text-white"}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Savings badge */}
                <div className="rounded-lg p-4 text-center border" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}10` }}>
                  <p className="font-heading text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
                    🎉 You're saving {savingsPct}% on this purchase!
                  </p>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Final Price", value: `${sym}${result.finalPrice.toLocaleString()}` },
                  { label: "You Save", value: `${sym}${result.savings.toLocaleString()}` },
                  { label: "Discount", value: `${discountPercent}% OFF` },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <Tag className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Original price */}
                <div>
                  <label className={labelClass}>Original Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input type="number" step="0.01" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} placeholder="100"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  </div>
                </div>

                {/* Discount % */}
                <div>
                  <label className={labelClass}>Discount</label>
                  <div className="relative">
                    <input type="number" step="0.1" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} placeholder="20"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">%</span>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Final Price</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>{sym}{result.finalPrice.toLocaleString()}</span>
                    </div>
                    {[
                      { label: "Original Price", value: `${sym}${parseFloat(originalPrice).toLocaleString()}` },
                      { label: "You Save",        value: `${sym}${result.savings.toLocaleString()} (${discountPercent}%)`, accent: true },
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
                  onClick={calculateDiscount}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Discount
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DiscountCalculator;