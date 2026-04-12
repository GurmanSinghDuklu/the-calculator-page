import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { ArrowRight, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

function DarkInput({ value, onChange, step = "1", placeholder = "0" }: {
  value: string; onChange: (v: string) => void; step?: string; placeholder?: string;
}) {
  return (
    <input
      type="number"
      step={step}
      min="0"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
      onFocus={e => (e.target.style.borderColor = ACCENT)}
      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

export default function CashbackCalculator() {
  const [groceries,     setGroceries]     = useState("500");
  const [groceriesRate, setGroceriesRate] = useState("5");
  const [gas,           setGas]           = useState("200");
  const [gasRate,       setGasRate]       = useState("3");
  const [dining,        setDining]        = useState("300");
  const [diningRate,    setDiningRate]    = useState("2");
  const [other,         setOther]         = useState("400");
  const [otherRate,     setOtherRate]     = useState("1");
  const [annualFee,     setAnnualFee]     = useState("0");
  const [currency,      setCurrency]      = useState<Currency>("USD");
  const [result, setResult] = useState<{
    totalCashback: number;
    netCashback: number;
    totalSpending: number;
    netRate: number;
  } | null>(null);

  const calculateCashback = () => {
    const s1 = parseFloat(groceries),  r1 = parseFloat(groceriesRate) / 100;
    const s2 = parseFloat(gas),        r2 = parseFloat(gasRate) / 100;
    const s3 = parseFloat(dining),     r3 = parseFloat(diningRate) / 100;
    const s4 = parseFloat(other),      r4 = parseFloat(otherRate) / 100;
    const fee = parseFloat(annualFee);
    const totalCashback  = s1*r1 + s2*r2 + s3*r3 + s4*r4;
    const totalSpending  = s1 + s2 + s3 + s4;
    const netCashback    = totalCashback - fee;
    setResult({
      totalCashback,
      netCashback,
      totalSpending,
      netRate: totalSpending > 0 ? (netCashback / totalSpending) * 100 : 0,
    });
  };

  const sym = currencies[currency].symbol;
  const seo = seoData["/finance/cashback"];

  const faqSchema = [
    { question: "How does cashback work?", answer: "Cashback rewards give you a percentage of your spending back as cash. For example, a 2% cashback card returns £2 for every £100 spent. Rewards are usually paid monthly or annually." },
    { question: "Is cashback worth it?", answer: "Yes, if you pay your balance in full each month. If you carry a balance, the interest charges typically outweigh any cashback earned. Always clear the full balance to benefit." },
    { question: "What is a good cashback rate?", answer: "Cashback rates typically range from 0.5% to 5%. Premium cards with annual fees may offer higher rates. Calculate whether the cashback earned exceeds any annual fee." },
    { question: "How do I calculate my annual cashback earnings?", answer: "Multiply your total annual spending by the cashback percentage. For example, £12,000 spent at 1.5% cashback earns £180 per year." }
  ];

  const categories = [
    { label: "Groceries",         spend: groceries,  setSpend: setGroceries,  rate: groceriesRate, setRate: setGroceriesRate },
    { label: "Gas / Fuel",        spend: gas,        setSpend: setGas,        rate: gasRate,       setRate: setGasRate },
    { label: "Dining / Restaurants", spend: dining,  setSpend: setDining,     rate: diningRate,    setRate: setDiningRate },
    { label: "Other Spending",    spend: other,      setSpend: setOther,      rate: otherRate,     setRate: setOtherRate },
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/cashback`}
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Cashback Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Cashback Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[13vw] lg:text-[105px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                CASHBACK
              </span>
              <span
                className="block text-[8vw] lg:text-[65px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate your total cashback rewards across spending categories and see your effective return after card fees.
              </p>
            </div>

            {/* Result stats on left */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Spending",        value: `${sym}${result.totalSpending.toFixed(2)}` },
                    { label: "Total Cashback",        value: `${sym}${result.totalCashback.toFixed(2)}` },
                    { label: "Net Cashback",          value: `${sym}${result.netCashback.toFixed(2)}` },
                    { label: "Effective Rate",        value: `${result.netRate.toFixed(2)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-xl text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Net Cashback", value: `${sym}${result.netCashback.toFixed(2)}` },
                  { label: "Total Cashback", value: `${sym}${result.totalCashback.toFixed(2)}` },
                  { label: "Effective Rate", value: `${result.netRate.toFixed(2)}%` },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Monthly Spend</h3>
                <CreditCard className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Category rows */}
                {categories.map(({ label, spend, setSpend, rate, setRate }) => (
                  <div key={label}>
                    <label className={labelClass}>{label}</label>
                    <div className="grid grid-cols-[1fr_100px] gap-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                        <input
                          type="number" step="1" min="0"
                          value={spend}
                          onChange={e => setSpend(e.target.value)}
                          placeholder="0"
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="number" step="0.1" min="0"
                          value={rate}
                          onChange={e => setRate(e.target.value)}
                          placeholder="0"
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Annual Card Fee</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <DarkInput value={annualFee} onChange={setAnnualFee} placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Currency</label>
                    <CurrencySelector value={currency} onChange={setCurrency} />
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Net Cashback</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>
                        {sym}{result.netCashback.toFixed(2)}
                      </span>
                    </div>
                    {[
                      { label: "Total Cashback",  value: `${sym}${result.totalCashback.toFixed(2)}` },
                      { label: "Total Spending",  value: `${sym}${result.totalSpending.toFixed(2)}` },
                      { label: "Effective Rate",  value: `${result.netRate.toFixed(2)}%` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="text-white/70 font-heading">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateCashback}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Cashback
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        <FinancialDisclosure variant="general" />

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
}