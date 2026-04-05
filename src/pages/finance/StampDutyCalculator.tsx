import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Home, Building2, TrendingUp, Calculator, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Property category ─────────────────────────────────────
const ACCENT = "#F97316";

// ─── Types & Calculation logic (100% unchanged) ───────────────────────────────
type BuyerType = "first-time" | "home-mover" | "additional";

interface TaxBand {
  from: number;
  to: number | null;
  rate: number;
  taxableSum: number;
  tax: number;
}

interface CalculationResult {
  totalTax: number;
  effectiveRate: number;
  bands: TaxBand[];
}

const STAMP_DUTY_RATES = {
  "first-time": {
    thresholdForRelief: 500000,
    bands: [
      { from: 0,      to: 300000, rate: 0 },
      { from: 300000, to: 500000, rate: 5 },
    ],
    standardBands: [
      { from: 0,       to: 125000,  rate: 0  },
      { from: 125000,  to: 250000,  rate: 2  },
      { from: 250000,  to: 925000,  rate: 5  },
      { from: 925000,  to: 1500000, rate: 10 },
      { from: 1500000, to: null,    rate: 12 },
    ],
  },
  "home-mover": {
    bands: [
      { from: 0,       to: 125000,  rate: 0  },
      { from: 125000,  to: 250000,  rate: 2  },
      { from: 250000,  to: 925000,  rate: 5  },
      { from: 925000,  to: 1500000, rate: 10 },
      { from: 1500000, to: null,    rate: 12 },
    ],
  },
  "additional": {
    bands: [
      { from: 0,       to: 125000,  rate: 5  },
      { from: 125000,  to: 250000,  rate: 7  },
      { from: 250000,  to: 925000,  rate: 10 },
      { from: 925000,  to: 1500000, rate: 15 },
      { from: 1500000, to: null,    rate: 17 },
    ],
  },
};

const calculateStampDuty = (propertyPrice: number, buyerType: BuyerType): CalculationResult => {
  if (propertyPrice <= 0) return { totalTax: 0, effectiveRate: 0, bands: [] };
  let bands: { from: number; to: number | null; rate: number }[];
  if (buyerType === "first-time") {
    bands = propertyPrice > STAMP_DUTY_RATES["first-time"].thresholdForRelief
      ? STAMP_DUTY_RATES["first-time"].standardBands
      : STAMP_DUTY_RATES["first-time"].bands;
  } else {
    bands = STAMP_DUTY_RATES[buyerType].bands;
  }
  const calculatedBands: TaxBand[] = [];
  let totalTax = 0;
  let remainingValue = propertyPrice;
  for (const band of bands) {
    const bandEnd = band.to ?? Infinity;
    if (remainingValue <= 0 || propertyPrice <= band.from) {
      calculatedBands.push({ from: band.from, to: band.to, rate: band.rate, taxableSum: 0, tax: 0 });
      continue;
    }
    const taxableInBand = Math.min(Math.max(0, propertyPrice - band.from), bandEnd - band.from);
    const actualTaxable = Math.min(taxableInBand, remainingValue);
    const taxForBand = actualTaxable * (band.rate / 100);
    calculatedBands.push({ from: band.from, to: band.to, rate: band.rate, taxableSum: actualTaxable, tax: taxForBand });
    totalTax += taxForBand;
    remainingValue -= actualTaxable;
  }
  return { totalTax, effectiveRate: (totalTax / propertyPrice) * 100, bands: calculatedBands };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const formatBandRange = (from: number, to: number | null) => {
  if (to === null) return `Over ${formatCurrency(from)}`;
  if (from === 0) return `Up to ${formatCurrency(to)}`;
  return `${formatCurrency(from)} – ${formatCurrency(to)}`;
};

// ─── Component ────────────────────────────────────────────────────────────────
const StampDutyCalculator = () => {
  const [buyerType, setBuyerType] = useState<BuyerType>("first-time");
  const [propertyPrice, setPropertyPrice] = useState("350000");
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const price = parseFloat(propertyPrice) || 0;
    setResult(calculateStampDuty(price, buyerType));
  }, [propertyPrice, buyerType]);

  const price = parseFloat(propertyPrice) || 0;
  const showFTBWarning = buyerType === "first-time" && price > STAMP_DUTY_RATES["first-time"].thresholdForRelief;

  const buyerTypes: { key: BuyerType; label: string; icon: typeof Home; sub: string }[] = [
    { key: "first-time", label: "First Time Buyer",          icon: Home,      sub: "Relief up to £500k" },
    { key: "home-mover", label: "Home Mover",                icon: Building2, sub: "Standard rates" },
    { key: "additional", label: "Buy to Let",                icon: TrendingUp, sub: "+5% surcharge" },
  ];

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "What is Stamp Duty Land Tax (SDLT)?", answer: "Stamp Duty Land Tax is a tax paid when buying property or land in England and Northern Ireland. The amount depends on the purchase price and whether you are a first-time buyer." },
    { question: "How much stamp duty do first-time buyers pay?", answer: "First-time buyers pay no stamp duty on properties up to £425,000. Between £425,001 and £625,000 they pay 5%. Properties above £625,000 do not qualify for first-time buyer relief." },
    { question: "When do I pay stamp duty?", answer: "Stamp duty must be paid within 14 days of completing your property purchase. Your solicitor or conveyancer usually handles the payment on your behalf." },
    { question: "Do I pay stamp duty on a second home?", answer: "Yes, there is a 3% surcharge on top of standard stamp duty rates for second homes and buy-to-let properties in England and Northern Ireland." }
  ];

  return (
    <>
      <SEO
        title="UK Stamp Duty Calculator - Calculate SDLT Tax"
        description="Free UK stamp duty calculator for 2025. Calculate SDLT for first time buyers, home movers, and buy to let properties in England and Northern Ireland."
        keywords="stamp duty calculator, SDLT calculator, UK stamp duty, first time buyer stamp duty"
        canonicalUrl="https://www.thecalculatorpage.com/finance/stamp-duty"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/property" className="hover:text-white transition-colors">Property</Link>
            <span>/</span>
            <span className="text-white/60">Stamp Duty</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + buyer type selector */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[13vw] lg:text-[100px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                STAMP
              </span>
              <span className="block text-[9vw] lg:text-[70px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                DUTY
              </span>
              <span className="block text-[7vw] lg:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate Stamp Duty Land Tax (SDLT) for residential properties in England and Northern Ireland. Rates effective from 1st April 2025.
              </p>
            </div>

            {/* Buyer type selector */}
            <div className="mt-8 flex flex-col gap-3">
              <p className={labelClass}>Buyer Type</p>
              {buyerTypes.map(({ key, label, icon: Icon, sub }) => (
                <button
                  key={key}
                  onClick={() => setBuyerType(key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                  style={{
                    borderColor: buyerType === key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: buyerType === key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 transition-colors" style={{ color: buyerType === key ? ACCENT : "rgba(255,255,255,0.25)" }} />
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: buyerType === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary stats if result exists */}
            {result && price > 0 && (
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Stamp Duty",    value: formatCurrency(result.totalTax) },
                    { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
                    { label: "Property Price", value: formatCurrency(price) },
                    { label: "Total Cost",     value: formatCurrency(price + result.totalTax) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Stamp Duty", value: formatCurrency(result.totalTax) },
                  { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
                  { label: "Total Cost", value: formatCurrency(price + result.totalTax) },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form + results card */}
          <div className="w-full lg:w-1/2 z-20 relative flex flex-col gap-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            {/* Input card */}
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <Calculator className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Property Purchase Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={propertyPrice}
                      onChange={e => setPropertyPrice(e.target.value)}
                      placeholder="350,000"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* FTB warning */}
                {showFTBWarning && (
                  <div className="flex items-start gap-3 p-4 border rounded-lg" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}10` }}>
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                    <p className="text-xs font-sans leading-relaxed" style={{ color: ACCENT }}>
                      First time buyer relief is only available for properties up to £500,000. Standard rates apply for this purchase.
                    </p>
                  </div>
                )}

                {/* Live result */}
                {result && price > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Total SDLT</span>
                      <span className="text-3xl font-display text-white">{formatCurrency(result.totalTax)}</span>
                    </div>
                    {[
                      { label: "Property Price", value: formatCurrency(price) },
                      { label: "Stamp Duty",     value: formatCurrency(result.totalTax) },
                      { label: "Total Cost",     value: formatCurrency(price + result.totalTax), highlight: true },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className={`font-heading ${highlight ? "text-white" : "text-white/60"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setResult(calculateStampDuty(price, buyerType))}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Stamp Duty
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Tax band breakdown table */}
            {result && result.bands.length > 0 && price > 0 && (
              <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-4">Tax Band Breakdown</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["Band", "Rate", "Taxable", "Tax"].map(h => (
                          <th key={h} className={`py-3 font-heading uppercase tracking-widest text-white/25 ${h === "Band" ? "text-left" : "text-right"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.bands.map((band, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 text-white/50 font-sans">{formatBandRange(band.from, band.to)}</td>
                          <td className="py-3 text-right font-heading text-white/50">{band.rate}%</td>
                          <td className="py-3 text-right font-heading text-white/50">{formatCurrency(band.taxableSum)}</td>
                          <td className="py-3 text-right font-heading text-white" style={{ color: band.tax > 0 ? ACCENT : "rgba(255,255,255,0.3)" }}>
                            {formatCurrency(band.tax)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/10">
                        <td colSpan={3} className="py-3 font-heading uppercase tracking-widest text-white/30 text-xs text-right">Total SDLT</td>
                        <td className="py-3 text-right font-display text-xl text-white">{formatCurrency(result.totalTax)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About section */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-[#252323]/50 border border-white/10 rounded-2xl p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-6">About UK Stamp Duty (SDLT)</p>
            <div className="grid md:grid-cols-3 gap-8 text-sm text-white/40 font-sans leading-relaxed">
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>First Time Buyers</p>
                <p>No tax on the first £300,000, with 5% charged on the portion between £300,000 and £500,000. Properties over £500,000 pay standard rates.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Home Movers</p>
                <p>Standard rates apply for home movers replacing their main residence. The nil rate band is £125,000, with graduated rates above this threshold.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Additional Properties</p>
                <p>A 5% surcharge applies to purchases of additional residential properties, including buy-to-let and second homes, added to standard rates.</p>
              </div>
            </div>
            <p className="text-[10px] text-white/20 font-sans italic mt-6">
              For freehold residential properties in England and Northern Ireland only. Different rules apply in Scotland (LBTT) and Wales (LTT). Always consult a professional for specific advice.
            </p>
          </div>
        </div>

                <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is Stamp Duty Land Tax?",
              description: "Stamp Duty Land Tax (SDLT) is a tax paid when purchasing property or land in England and Northern Ireland above a certain threshold. The tax is calculated in bands — you only pay the higher rate on the portion of the price within each band, not on the entire purchase price. Scotland has its own Land and Buildings Transaction Tax (LBTT), and Wales has Land Transaction Tax (LTT). SDLT rates differ for first-time buyers, home movers, additional properties, and non-UK residents."
            }}
            howItWorks={{
              title: "How Stamp Duty Is Calculated",
              description: "SDLT uses a progressive band system similar to income tax. Each band has a different rate, and you only pay that rate on the portion of the price falling within that band.",
              steps: [
                { step: 1, title: "Enter the Property Price", description: "Input the full purchase price of the property. SDLT is calculated on the total consideration including any fixtures or fittings included in the price." },
                { step: 2, title: "Select Your Buyer Type", description: "Choose whether you are a first-time buyer, home mover, or purchasing an additional property. First-time buyers benefit from significant relief." },
                { step: 3, title: "Review the Breakdown", description: "See exactly how much SDLT is due at each band, the total tax, and the effective rate as a percentage of the purchase price." }
              ]
            }}
            formula={{
              title: "SDLT Bands (England & Northern Ireland 2025/26)",
              formula: "£0-£250,000: 0% | £250,001-£925,000: 5% | £925,001-£1,500,000: 10% | £1,500,001+: 12%",
              explanation: "First-time buyers pay 0% up to £425,000 and 5% on the portion from £425,001 to £625,000 (no relief if price exceeds £625,000). Additional properties incur a 3% surcharge on top of standard rates. Non-UK residents pay an additional 2% surcharge. For example, a £350,000 home costs £5,000 in SDLT for home movers (5% on £100,000 above £250,000) but £0 for first-time buyers."
            }}
            faqs={[
              { question: "What is Stamp Duty Land Tax?", answer: "SDLT is a tax charged on property purchases in England and Northern Ireland. It applies to residential properties above £250,000 (or £425,000 for first-time buyers). The tax is paid by the buyer and must be submitted to HMRC within 14 days of completion." },
              { question: "How much stamp duty do first-time buyers pay?", answer: "First-time buyers pay no stamp duty on properties up to £425,000. For properties between £425,001 and £625,000, they pay 5% only on the amount above £425,000. If the property exceeds £625,000, first-time buyer relief does not apply and standard rates are used." },
              { question: "When do I pay stamp duty?", answer: "Stamp duty must be paid within 14 days of completing your property purchase. Your solicitor or conveyancer typically handles the SDLT return and payment on your behalf as part of the conveyancing process." },
              { question: "Do I pay extra stamp duty on a second home?", answer: "Yes. There is a 3% surcharge on top of standard SDLT rates for additional residential properties. This applies to buy-to-let investments, holiday homes, and any property where you already own another residential property." }
            ]}
            tips={[
              "If you are a first-time buyer, check you qualify — you must never have owned property anywhere in the world",
              "Budget for stamp duty separately from your deposit — it is due on completion day and cannot be added to your mortgage",
              "Consider the additional 3% surcharge before purchasing buy-to-let property — it significantly increases upfront costs",
              "If buying jointly and one partner already owns property, the 3% surcharge applies to the entire purchase",
              "Your solicitor should file the SDLT return within 14 days — late filing attracts penalties and interest"
            ]}
          />
        </div>

<FinancialDisclosure variant="mortgage" />

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

export default StampDutyCalculator;