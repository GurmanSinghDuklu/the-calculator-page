import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { TrendingUp, Calculator, ArrowRight, BarChart3, Home, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Tax category ─────────────────────────────────────────
const ACCENT = "#F97316";

// ─── Types & Calculation logic ───────────────────────────────────────────────
type AssetType = "shares" | "residential-property" | "other";
type TaxBand = "basic" | "higher";

interface CalculationResult {
  totalGain: number;
  allowableCosts: number;
  annualExemptAmount: number;
  taxableGain: number;
  cgtDue: number;
  effectiveRate: number;
  cgtRate: number;
}

const ANNUAL_EXEMPT_AMOUNT = 3000; // 2024/25 onwards

const CGT_RATES: Record<AssetType, Record<TaxBand, number>> = {
  "shares":               { basic: 10, higher: 20 },
  "residential-property": { basic: 18, higher: 24 },
  "other":                { basic: 10, higher: 20 },
};

const calculateCGT = (
  purchasePrice: number,
  salePrice: number,
  costs: number,
  assetType: AssetType,
  taxBand: TaxBand
): CalculationResult => {
  if (salePrice <= 0 && purchasePrice <= 0) {
    return { totalGain: 0, allowableCosts: 0, annualExemptAmount: 0, taxableGain: 0, cgtDue: 0, effectiveRate: 0, cgtRate: 0 };
  }

  const totalGain = salePrice - purchasePrice;
  const allowableCosts = costs;
  const gainAfterCosts = Math.max(0, totalGain - allowableCosts);
  const annualExemptAmount = Math.min(gainAfterCosts, ANNUAL_EXEMPT_AMOUNT);
  const taxableGain = Math.max(0, gainAfterCosts - ANNUAL_EXEMPT_AMOUNT);
  const cgtRate = CGT_RATES[assetType][taxBand];
  const cgtDue = taxableGain * (cgtRate / 100);
  const effectiveRate = totalGain > 0 ? (cgtDue / totalGain) * 100 : 0;

  return { totalGain, allowableCosts, annualExemptAmount, taxableGain, cgtDue, effectiveRate, cgtRate };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

// ─── Component ────────────────────────────────────────────────────────────────
const CapitalGainsTaxCalculator = () => {
  const [assetType, setAssetType] = useState<AssetType>("shares");
  const [taxBand, setTaxBand] = useState<TaxBand>("basic");
  const [purchasePrice, setPurchasePrice] = useState("50000");
  const [salePrice, setSalePrice] = useState("80000");
  const [costs, setCosts] = useState("1000");
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    const purchase = parseFloat(purchasePrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const totalCosts = parseFloat(costs) || 0;
    setResult(calculateCGT(purchase, sale, totalCosts, assetType, taxBand));
  }, [purchasePrice, salePrice, costs, assetType, taxBand]);

  const purchase = parseFloat(purchasePrice) || 0;
  const sale = parseFloat(salePrice) || 0;
  const totalCosts = parseFloat(costs) || 0;

  const assetTypes: { key: AssetType; label: string; icon: typeof TrendingUp; sub: string }[] = [
    { key: "shares",               label: "Shares / Investments", icon: BarChart3,   sub: "10% / 20% rates" },
    { key: "residential-property", label: "Residential Property", icon: Home,        sub: "18% / 24% rates" },
    { key: "other",                label: "Other Assets",         icon: Briefcase,   sub: "10% / 20% rates" },
  ];

  const taxBands: { key: TaxBand; label: string; sub: string }[] = [
    { key: "basic",  label: "Basic Rate Taxpayer",  sub: assetType === "residential-property" ? "18% CGT rate" : "10% CGT rate" },
    { key: "higher", label: "Higher Rate Taxpayer",  sub: assetType === "residential-property" ? "24% CGT rate" : "20% CGT rate" },
  ];

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "What is Capital Gains Tax in the UK?", answer: "Capital Gains Tax (CGT) is a tax on the profit when you sell or dispose of an asset that has increased in value. It applies to shares, investment property, and other valuable assets. You only pay CGT on your overall gains above the annual exempt amount of £3,000 (2024/25 onwards)." },
    { question: "How much is the CGT annual exempt amount?", answer: "The annual exempt amount for Capital Gains Tax is £3,000 for the 2024/25 tax year onwards. This was reduced from £6,000 in 2023/24 and £12,300 in 2022/23." },
    { question: "What are the CGT rates for 2024/25?", answer: "For 2024/25, basic rate taxpayers pay 10% on gains from shares and other assets, or 18% on residential property gains. Higher and additional rate taxpayers pay 20% on shares and other assets, or 24% on residential property gains." },
    { question: "Do I pay CGT on my main home?", answer: "No. Your main home (principal private residence) is usually exempt from CGT thanks to Private Residence Relief. CGT on residential property only applies to second homes, buy-to-let properties, and other property that is not your main residence." },
    { question: "When do I need to report and pay CGT?", answer: "For UK residential property disposals, you must report and pay CGT within 60 days of completion. For other assets, you report gains through your Self Assessment tax return by 31 January following the end of the tax year." }
  ];

  return (
    <>
      <SEO
        title="Capital Gains Tax Calculator UK"
        description="Free UK capital gains tax calculator. Work out CGT on shares, property and other assets. Includes 2024/25 annual exempt amount and tax rates."
        keywords="capital gains tax calculator, CGT calculator UK, capital gains tax, CGT on shares, CGT on property, annual exempt amount"
        canonicalUrl="https://www.thecalculatorpage.com/finance/capital-gains-tax"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Capital Gains Tax Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Capital Gains Tax</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + asset type & tax band selectors */}
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
                CAPITAL
              </span>
              <span className="block text-[9vw] lg:text-[70px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                GAINS TAX
              </span>
              <span className="block text-[7vw] lg:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Work out how much Capital Gains Tax you owe on shares, property, or other assets using current 2024/25 UK rates and the £3,000 annual exempt amount.
              </p>
            </div>

            {/* Asset type selector */}
            <div className="mt-8 flex flex-col gap-3">
              <p className={labelClass}>Asset Type</p>
              {assetTypes.map(({ key, label, icon: Icon, sub }) => (
                <button
                  key={key}
                  onClick={() => setAssetType(key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                  style={{
                    borderColor: assetType === key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: assetType === key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 transition-colors" style={{ color: assetType === key ? ACCENT : "rgba(255,255,255,0.25)" }} />
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: assetType === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Tax band selector */}
            <div className="mt-6 flex flex-col gap-3">
              <p className={labelClass}>Your Income Tax Band</p>
              {taxBands.map(({ key, label, sub }) => (
                <button
                  key={key}
                  onClick={() => setTaxBand(key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                  style={{
                    borderColor: taxBand === key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: taxBand === key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <TrendingUp className="h-5 w-5 flex-shrink-0 transition-colors" style={{ color: taxBand === key ? ACCENT : "rgba(255,255,255,0.25)" }} />
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: taxBand === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary stats if result exists */}
            {result && result.totalGain > 0 && (
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "CGT Due",        value: formatCurrency(result.cgtDue) },
                    { label: "Effective Rate",  value: `${result.effectiveRate.toFixed(2)}%` },
                    { label: "Taxable Gain",    value: formatCurrency(result.taxableGain) },
                    { label: "Total Gain",      value: formatCurrency(result.totalGain) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Total Gain", value: formatCurrency(result.totalGain) },
                  { label: "Allowable Costs", value: formatCurrency(result.allowableCosts) },
                  { label: "Annual Exempt Amount", value: formatCurrency(result.annualExemptAmount) },
                  { label: "Taxable Gain", value: formatCurrency(result.taxableGain) },
                  { label: "CGT Rate", value: `${result.cgtRate}%` },
                  { label: "CGT Due", value: formatCurrency(result.cgtDue) },
                  { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
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
                  <label className={labelClass}>Purchase Price of Asset</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={e => setPurchasePrice(e.target.value)}
                      placeholder="50,000"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Sale Price of Asset</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={e => setSalePrice(e.target.value)}
                      placeholder="80,000"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Allowable Costs (buying, selling, improvements)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={costs}
                      onChange={e => setCosts(e.target.value)}
                      placeholder="1,000"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Annual exempt amount info */}
                <div className="flex items-start gap-3 p-4 border rounded-lg" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}10` }}>
                  <TrendingUp className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <p className="text-xs font-sans leading-relaxed" style={{ color: ACCENT }}>
                    Annual exempt amount: £3,000 (2024/25 onwards). You only pay CGT on gains above this threshold.
                  </p>
                </div>

                {/* Live result */}
                {result && (sale > 0 || purchase > 0) && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">CGT Due</span>
                      <span className="text-3xl font-display text-white">{formatCurrency(result.cgtDue)}</span>
                    </div>
                    {[
                      { label: "Total Gain",           value: formatCurrency(result.totalGain) },
                      { label: "Less Allowable Costs",  value: `- ${formatCurrency(result.allowableCosts)}` },
                      { label: "Less Annual Exempt",    value: `- ${formatCurrency(result.annualExemptAmount)}` },
                      { label: "Taxable Gain",          value: formatCurrency(result.taxableGain) },
                      { label: `CGT @ ${result.cgtRate}%`, value: formatCurrency(result.cgtDue), highlight: true },
                      { label: "Effective Rate",        value: `${result.effectiveRate.toFixed(2)}%` },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className={`font-heading ${highlight ? "text-white" : "text-white/60"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setResult(calculateCGT(purchase, sale, totalCosts, assetType, taxBand))}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate CGT
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* CGT rate reference table */}
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-4">2024/25 CGT Rates</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Asset Type", "Basic Rate", "Higher Rate"].map(h => (
                        <th key={h} className={`py-3 font-heading uppercase tracking-widest text-white/25 ${h === "Asset Type" ? "text-left" : "text-right"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { asset: "Shares & Investments", basic: "10%", higher: "20%" },
                      { asset: "Residential Property", basic: "18%", higher: "24%" },
                      { asset: "Other Assets",         basic: "10%", higher: "20%" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 text-white/50 font-sans">{row.asset}</td>
                        <td className="py-3 text-right font-heading text-white/50">{row.basic}</td>
                        <td className="py-3 text-right font-heading text-white/50">{row.higher}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-white/10">
                      <td colSpan={3} className="py-3 font-sans text-white/20 text-[10px] italic">
                        Annual exempt amount: £3,000 per person (2024/25 onwards)
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-[#252323]/50 border border-white/10 rounded-2xl p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-6">About UK Capital Gains Tax</p>
            <div className="grid md:grid-cols-3 gap-8 text-sm text-white/40 font-sans leading-relaxed">
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Shares & Investments</p>
                <p>CGT on shares applies when you sell stocks, funds, or other investments at a profit. Basic rate taxpayers pay 10%, while higher rate taxpayers pay 20%. Shares held in an ISA or pension are completely exempt from CGT.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Residential Property</p>
                <p>Higher CGT rates apply to residential property that is not your main home. Basic rate taxpayers pay 18% and higher rate taxpayers pay 24%. Your main home is usually exempt thanks to Private Residence Relief.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Reporting & Deadlines</p>
                <p>UK property disposals must be reported to HMRC within 60 days. For other assets, report through Self Assessment by 31 January after the tax year ends. Late reporting can result in penalties.</p>
              </div>
            </div>
            <p className="text-[10px] text-white/20 font-sans italic mt-6">
              Rates shown are for the 2024/25 tax year onwards. Different rules may apply for business assets (Business Asset Disposal Relief). Always consult a tax professional for specific advice.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is Capital Gains Tax?",
              description: "Capital Gains Tax (CGT) is a tax on the profit you make when you sell or dispose of an asset that has gone up in value. It is the gain that gets taxed, not the total amount you receive. Importantly, you do not pay CGT on your main home (thanks to Private Residence Relief), personal possessions worth £6,000 or less, ISAs and pensions, or UK government gilts. You only pay CGT on gains above your annual exempt amount, which is £3,000 for the 2024/25 tax year onwards. This was slashed from £12,300 just two years ago, so more people than ever are now caught by CGT."
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description: "This calculator works out your Capital Gains Tax liability step by step, using the correct 2024/25 UK rates for your asset type and tax band.",
              steps: [
                { step: 1, title: "Enter Your Purchase and Sale Prices", description: "Input what you originally paid for the asset and what you sold it for. The difference is your total gain (or loss)." },
                { step: 2, title: "Add Your Allowable Costs", description: "Include buying costs (e.g. broker fees, solicitor fees), selling costs (e.g. estate agent fees), and any improvement costs that enhanced the asset's value. General maintenance does not count." },
                { step: 3, title: "Select Asset Type and Tax Band", description: "Choose the type of asset you sold and whether you are a basic rate or higher/additional rate taxpayer. Residential property attracts higher CGT rates than shares and other assets." },
                { step: 4, title: "Review Your Breakdown", description: "See your total gain, deductions, the £3,000 annual exempt amount, taxable gain, CGT due, and your effective tax rate on the gain." }
              ]
            }}
            formula={{
              title: "Capital Gains Tax Formula",
              formula: "CGT = (Sale Price - Purchase Price - Allowable Costs - £3,000 Annual Exempt Amount) x Tax Rate",
              explanation: "First, calculate your total gain by subtracting the purchase price from the sale price. Then subtract any allowable costs (buying, selling, and improvement costs). Next, deduct your £3,000 annual exempt amount. The remaining taxable gain is multiplied by the appropriate CGT rate. For example, if you bought shares for £20,000 and sold them for £35,000 with £500 in costs, your gain is £14,500. After costs (£14,000) and the exempt amount (£11,000 taxable), a basic rate taxpayer would pay £1,100 in CGT (10%)."
            }}
            tips={[
              "Use your ISA allowance to shelter investments from CGT entirely — you can transfer existing shares into an ISA using a 'Bed and ISA' strategy",
              "Each person has their own £3,000 annual exempt amount — jointly owned assets can be split between partners to use both allowances",
              "Time your disposals across tax years to use two annual exempt amounts — sell some before 5 April and the rest after",
              "Keep records of all purchase costs, improvement costs, and selling costs — they all reduce your taxable gain",
              "Report UK residential property gains to HMRC within 60 days of completion, or face penalties and interest",
              "If you have losses from other disposals, you can offset them against gains before applying the annual exempt amount"
            ]}
            faqs={[
              { question: "What is the CGT annual exempt amount for 2024/25?", answer: "The annual exempt amount is £3,000 for the 2024/25 tax year onwards. This means you can make up to £3,000 in gains each year without paying any CGT. It was cut from £6,000 in 2023/24 and £12,300 in 2022/23, which means far more people are now affected." },
              { question: "Do I pay CGT on my main home?", answer: "No, your main home is usually completely exempt from CGT thanks to Private Residence Relief. CGT on property only applies to second homes, buy-to-let properties, and other property that is not your primary residence. If you have used part of your home exclusively for business, a portion may be liable." },
              { question: "What counts as an allowable cost for CGT?", answer: "Allowable costs include what you paid to buy the asset (stamp duty, broker fees, solicitor fees), costs of selling it (agent fees, advertising), and costs of improving it (extensions, renovations). Day-to-day maintenance and repair costs do not count." },
              { question: "When do I need to report capital gains to HMRC?", answer: "For UK residential property, you must report and pay within 60 days of completion using HMRC's online service. For shares and other assets, you report through your Self Assessment tax return, which is due by 31 January after the end of the tax year (e.g., 31 January 2026 for gains in 2024/25)." },
              { question: "How can I legally reduce my CGT bill?", answer: "Use your annual exempt amount (£3,000), invest through ISAs and pensions (fully exempt), transfer assets to your spouse (no CGT between spouses), offset capital losses against gains, spread disposals across tax years, and claim all allowable costs. For business owners, Business Asset Disposal Relief offers a reduced 10% rate on qualifying gains up to a lifetime limit of £1 million." }
            ]}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CapitalGainsTaxCalculator;
