import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Calculator, ArrowRight, Users, Home, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Estate Planning category ─────────────────────────────
const ACCENT = "#A78BFA";

// ─── Types & Calculation logic ───────────────────────────────────────────────
type MaritalStatus = "single" | "married";
type DirectDescendant = "yes" | "no";

interface IHTResult {
  grossEstate: number;
  debts: number;
  netEstate: number;
  nilRateBand: number;
  residenceNilRateBand: number;
  totalAllowance: number;
  taxableEstate: number;
  ihtDue: number;
  effectiveRate: number;
}

const NRB = 325000;
const RNRB = 175000;

const calculateIHT = (
  estateValue: number,
  residenceValue: number,
  debts: number,
  gifts: number,
  maritalStatus: MaritalStatus,
  leavingToDescendants: DirectDescendant
): IHTResult => {
  const grossEstate = estateValue + gifts;
  const netEstate = Math.max(0, grossEstate - debts);

  if (netEstate <= 0) {
    return { grossEstate, debts, netEstate: 0, nilRateBand: 0, residenceNilRateBand: 0, totalAllowance: 0, taxableEstate: 0, ihtDue: 0, effectiveRate: 0 };
  }

  // NRB: £325,000 single, £650,000 married (transferable)
  const nilRateBand = maritalStatus === "married" ? NRB * 2 : NRB;

  // RNRB: £175,000 single, £350,000 married — only if passing home to direct descendants
  // RNRB is capped at the value of the residence
  let residenceNilRateBand = 0;
  if (leavingToDescendants === "yes") {
    const maxRNRB = maritalStatus === "married" ? RNRB * 2 : RNRB;
    residenceNilRateBand = Math.min(maxRNRB, residenceValue);
  }

  // Taper: RNRB reduced by £1 for every £2 net estate exceeds £2m
  const taperThreshold = 2000000;
  if (netEstate > taperThreshold && residenceNilRateBand > 0) {
    const taperReduction = Math.floor((netEstate - taperThreshold) / 2);
    residenceNilRateBand = Math.max(0, residenceNilRateBand - taperReduction);
  }

  const totalAllowance = nilRateBand + residenceNilRateBand;
  const taxableEstate = Math.max(0, netEstate - totalAllowance);

  // Standard rate: 40%
  const ihtDue = taxableEstate * 0.4;
  const effectiveRate = netEstate > 0 ? (ihtDue / netEstate) * 100 : 0;

  return { grossEstate, debts, netEstate, nilRateBand, residenceNilRateBand, totalAllowance, taxableEstate, ihtDue, effectiveRate };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

// ─── Component ────────────────────────────────────────────────────────────────
const InheritanceTaxCalculator = () => {
  const [estateValue, setEstateValue] = useState("500000");
  const [residenceValue, setResidenceValue] = useState("300000");
  const [debts, setDebts] = useState("0");
  const [gifts, setGifts] = useState("0");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>("single");
  const [leavingToDescendants, setLeavingToDescendants] = useState<DirectDescendant>("yes");
  const [result, setResult] = useState<IHTResult | null>(null);

  useEffect(() => {
    const estate = parseFloat(estateValue) || 0;
    const residence = parseFloat(residenceValue) || 0;
    const debt = parseFloat(debts) || 0;
    const gift = parseFloat(gifts) || 0;
    setResult(calculateIHT(estate, residence, debt, gift, maritalStatus, leavingToDescendants));
  }, [estateValue, residenceValue, debts, gifts, maritalStatus, leavingToDescendants]);

  const estate = parseFloat(estateValue) || 0;

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "How much is Inheritance Tax in the UK?", answer: "Inheritance Tax in the UK is charged at 40% on the value of an estate above the nil rate band of £325,000. If the estate qualifies for the residence nil rate band, an additional £175,000 allowance applies when passing the family home to direct descendants." },
    { question: "What is the nil rate band for Inheritance Tax?", answer: "The nil rate band is £325,000 per person. It has been frozen at this level since 2009 and is expected to remain until at least April 2028. Married couples and civil partners can transfer any unused nil rate band to the surviving spouse, giving a combined allowance of up to £650,000." },
    { question: "What is the 7-year rule for gifts and Inheritance Tax?", answer: "Gifts made more than 7 years before death are exempt from Inheritance Tax. Gifts made within 3-7 years of death are subject to taper relief, reducing the tax rate gradually. Gifts within 3 years of death are taxed at the full 40% rate." },
    { question: "What is the residence nil rate band?", answer: "The residence nil rate band (RNRB) is an additional £175,000 allowance available when you leave your main home to direct descendants such as children or grandchildren. For married couples, this can be up to £350,000. The RNRB tapers away for estates worth more than £2 million." },
    { question: "Do married couples pay Inheritance Tax?", answer: "Assets passing between married couples or civil partners are exempt from Inheritance Tax. The surviving spouse can also inherit any unused nil rate band and residence nil rate band from the deceased, potentially giving a combined tax-free allowance of up to £1 million." }
  ];

  return (
    <>
      <SEO
        title="Inheritance Tax Calculator UK"
        description="Free UK inheritance tax calculator. Work out IHT on your estate including nil rate band, residence nil rate band and spouse exemption."
        keywords="inheritance tax calculator, IHT calculator UK, inheritance tax, nil rate band, estate tax calculator, IHT threshold"
        canonicalUrl="https://www.thecalculatorapp.org/finance/inheritance-tax"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Inheritance Tax Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-purple-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Inheritance Tax</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + options */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[11vw] lg:text-[85px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #7c3aed 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                INHERITANCE
              </span>
              <span className="block text-[9vw] lg:text-[70px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #7c3aed 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                TAX
              </span>
              <span className="block text-[7vw] lg:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Work out how much Inheritance Tax (IHT) your estate could owe. Includes nil rate band, residence nil rate band, and spouse exemptions for 2025/26.
              </p>
            </div>

            {/* Marital status selector */}
            <div className="mt-8 flex flex-col gap-3">
              <p className={labelClass}>Marital Status</p>
              {([
                { key: "single" as MaritalStatus, label: "Single / Widowed", icon: Users, sub: "£325,000 NRB" },
                { key: "married" as MaritalStatus, label: "Married / Civil Partnership", icon: Heart, sub: "£650,000 transferable NRB" },
              ]).map(({ key, label, icon: Icon, sub }) => (
                <button
                  key={key}
                  onClick={() => setMaritalStatus(key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                  style={{
                    borderColor: maritalStatus === key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: maritalStatus === key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 transition-colors" style={{ color: maritalStatus === key ? ACCENT : "rgba(255,255,255,0.25)" }} />
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: maritalStatus === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Leaving home to descendants selector */}
            <div className="mt-6 flex flex-col gap-3">
              <p className={labelClass}>Leaving Home to Direct Descendants?</p>
              {([
                { key: "yes" as DirectDescendant, label: "Yes", icon: Home, sub: `+${formatCurrency(maritalStatus === "married" ? RNRB * 2 : RNRB)} RNRB` },
                { key: "no" as DirectDescendant, label: "No", icon: Users, sub: "No residence nil rate band" },
              ]).map(({ key, label, icon: Icon, sub }) => (
                <button
                  key={key}
                  onClick={() => setLeavingToDescendants(key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                  style={{
                    borderColor: leavingToDescendants === key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: leavingToDescendants === key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 transition-colors" style={{ color: leavingToDescendants === key ? ACCENT : "rgba(255,255,255,0.25)" }} />
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: leavingToDescendants === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary stats if result exists */}
            {result && estate > 0 && (
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "IHT Due",         value: formatCurrency(result.ihtDue) },
                    { label: "Effective Rate",   value: `${result.effectiveRate.toFixed(2)}%` },
                    { label: "Net Estate",       value: formatCurrency(result.netEstate) },
                    { label: "Tax-Free Allowance", value: formatCurrency(result.totalAllowance) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Net Estate", value: formatCurrency(result.netEstate) },
                  { label: "NRB Used", value: formatCurrency(result.nilRateBand) },
                  { label: "RNRB Used", value: formatCurrency(result.residenceNilRateBand) },
                  { label: "Taxable Estate", value: formatCurrency(result.taxableEstate) },
                  { label: "IHT Due", value: formatCurrency(result.ihtDue) },
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
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Estate Details</h3>
                <Calculator className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Total Estate Value (property + savings + investments + possessions)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={estateValue}
                      onChange={e => setEstateValue(e.target.value)}
                      placeholder="500,000"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Value of Main Residence</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={residenceValue}
                      onChange={e => setResidenceValue(e.target.value)}
                      placeholder="300,000"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Debts and Liabilities</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={debts}
                      onChange={e => setDebts(e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Gifts Made in Last 7 Years</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={gifts}
                      onChange={e => setGifts(e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Live result */}
                {result && estate > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">IHT Due</span>
                      <span className="text-3xl font-display text-white">{formatCurrency(result.ihtDue)}</span>
                    </div>
                    {[
                      { label: "Gross Estate", value: formatCurrency(result.grossEstate) },
                      { label: "Less Debts", value: `−${formatCurrency(result.debts)}` },
                      { label: "Net Estate", value: formatCurrency(result.netEstate) },
                      { label: "NRB Used", value: formatCurrency(result.nilRateBand) },
                      { label: "RNRB Used", value: formatCurrency(result.residenceNilRateBand) },
                      { label: "Taxable Estate", value: formatCurrency(result.taxableEstate) },
                      { label: "IHT at 40%", value: formatCurrency(result.ihtDue), highlight: true },
                      { label: "Effective Rate", value: `${result.effectiveRate.toFixed(2)}%` },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className={`font-heading ${highlight ? "text-white" : "text-white/60"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    const e = parseFloat(estateValue) || 0;
                    const r = parseFloat(residenceValue) || 0;
                    const d = parseFloat(debts) || 0;
                    const g = parseFloat(gifts) || 0;
                    setResult(calculateIHT(e, r, d, g, maritalStatus, leavingToDescendants));
                  }}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Inheritance Tax
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Allowance breakdown card */}
            {result && estate > 0 && (
              <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-4">Allowance Breakdown</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["Allowance", "Amount"].map(h => (
                          <th key={h} className={`py-3 font-heading uppercase tracking-widest text-white/25 ${h === "Allowance" ? "text-left" : "text-right"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: `Nil Rate Band${maritalStatus === "married" ? " (transferable)" : ""}`, value: result.nilRateBand },
                        { label: `Residence Nil Rate Band${leavingToDescendants === "no" ? " (not applicable)" : maritalStatus === "married" ? " (transferable)" : ""}`, value: result.residenceNilRateBand },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 text-white/50 font-sans">{row.label}</td>
                          <td className="py-3 text-right font-heading text-white/50">{formatCurrency(row.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/10">
                        <td className="py-3 font-heading uppercase tracking-widest text-white/30 text-xs">Total Tax-Free Allowance</td>
                        <td className="py-3 text-right font-display text-xl text-white">{formatCurrency(result.totalAllowance)}</td>
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
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-6">About UK Inheritance Tax (IHT)</p>
            <div className="grid md:grid-cols-3 gap-8 text-sm text-white/40 font-sans leading-relaxed">
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Nil Rate Band</p>
                <p>Everyone gets a £325,000 nil rate band — the first chunk of your estate that's completely free of IHT. It's been frozen at this level since 2009. Married couples can transfer any unused portion to the survivor.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Residence Nil Rate Band</p>
                <p>An extra £175,000 allowance if you leave your main home to direct descendants (children, grandchildren, step-children). For estates over £2 million, this tapers away at £1 for every £2 over the threshold.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>The 7-Year Rule</p>
                <p>Gifts made more than 7 years before death are completely exempt from IHT. Gifts within 3-7 years benefit from taper relief — the tax rate reduces gradually. Within 3 years, the full 40% applies.</p>
              </div>
            </div>
            <p className="text-[10px] text-white/20 font-sans italic mt-6">
              This calculator provides an estimate based on standard IHT rules for England and Wales. Business relief, agricultural relief, and charity donations may reduce IHT further. Always consult a qualified financial adviser or solicitor for estate planning advice.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is Inheritance Tax?",
              description: "Inheritance Tax is the 40% tax nobody wants to think about — but probably should. It's charged on your estate (everything you own minus what you owe) when you die, if it's worth more than the nil rate band of £325,000. That threshold has been frozen since 2009, while property prices have more than doubled, which means hundreds of thousands more families now face an IHT bill that was once reserved for the genuinely wealthy. If you're married or in a civil partnership, assets pass between spouses tax-free, and any unused allowance transfers to the surviving partner."
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description: "Enter your estate details and the calculator works out your IHT liability in real time, factoring in both nil rate bands and your marital status.",
              steps: [
                { step: 1, title: "Add Up Your Estate", description: "Enter the total value of everything you own — property, savings, investments, personal possessions. Include the value of your main residence separately so the calculator can apply the residence nil rate band correctly." },
                { step: 2, title: "Subtract Debts and Add Gifts", description: "Enter any debts (mortgage, loans, credit cards) which reduce the taxable estate. Add any gifts you've made in the last 7 years — these are brought back into the estate for IHT purposes." },
                { step: 3, title: "Choose Your Circumstances", description: "Select your marital status (married couples get double the allowances) and whether you're leaving your home to direct descendants (children or grandchildren) to unlock the residence nil rate band." }
              ]
            }}
            formula={{
              title: "How Inheritance Tax Is Calculated",
              formula: "IHT = (Net Estate − Nil Rate Band − Residence Nil Rate Band) × 40%",
              explanation: "The nil rate band is £325,000 per person (£650,000 for married couples using the transferable allowance). The residence nil rate band adds £175,000 per person (£350,000 for couples) when the family home passes to direct descendants. This means a married couple leaving their home to their children can pass on up to £1 million tax-free. Above the threshold, IHT is charged at 40%. Estates that leave 10% or more to charity qualify for a reduced rate of 36%. For estates over £2 million, the RNRB tapers — reduced by £1 for every £2 over the threshold."
            }}
            tips={[
              "Use the 7-year rule: gifts made more than 7 years before death fall outside your estate entirely. You can also give away £3,000 per year using the annual exemption without starting the 7-year clock",
              "Married couples should plan together — the surviving spouse inherits any unused nil rate band, but you need to claim it through the estate. Keep records of the first spouse's estate",
              "Consider a whole-of-life insurance policy written in trust to cover the expected IHT bill. Written in trust means the payout goes directly to beneficiaries without forming part of your estate",
              "Look into trusts for assets you don't need day-to-day. Discretionary trusts can remove assets from your estate, though they come with their own tax rules and a 10-year charge",
              "If your estate is close to £2 million, watch the RNRB taper. Pension death benefits don't count towards the £2 million threshold (from April 2027 they will), so maximising pension savings can help preserve the full RNRB"
            ]}
            faqs={[
              { question: "What is the current Inheritance Tax threshold?", answer: "The nil rate band is £325,000 per person. It has been frozen at this level since 2009 and is legislated to remain until at least April 2028. With the residence nil rate band of £175,000 on top, a single person can pass on up to £500,000 tax-free if leaving their home to direct descendants. Married couples can combine allowances for up to £1 million." },
              { question: "How does the 7-year rule work for gifts?", answer: "If you make a gift and survive for 7 years, it drops out of your estate completely. If you die within 7 years, the gift is added back to your estate for IHT purposes. Gifts within 3 years of death are taxed at the full 40%. Between 3 and 7 years, taper relief applies: 3-4 years (32%), 4-5 years (24%), 5-6 years (16%), 6-7 years (8%). The taper only reduces the tax rate, not the value of the gift." },
              { question: "What is the residence nil rate band taper?", answer: "The residence nil rate band (RNRB) starts to reduce when the total estate exceeds £2 million. For every £2 over £2 million, the RNRB is reduced by £1. This means the full RNRB of £175,000 is completely lost once an estate reaches £2.35 million (for a single person). Married couples lose both RNRBs at £2.7 million." },
              { question: "Do I pay Inheritance Tax on my pension?", answer: "Currently, most pension pots are not subject to IHT. They sit outside your estate. However, the government has announced that from April 2027, unused pension funds will be included in the estate for IHT purposes. This is a significant change that could affect estate planning strategies." },
              { question: "Can I reduce my Inheritance Tax bill?", answer: "Yes. Common strategies include making use of the annual £3,000 gift exemption, giving away larger sums and surviving 7 years, leaving 10% of your estate to charity (which reduces the rate to 36%), using trusts, maximising pension contributions while they remain outside the estate, and taking out life insurance written in trust to cover the IHT liability. Business owners may qualify for Business Relief at 50% or 100%." }
            ]}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InheritanceTaxCalculator;
