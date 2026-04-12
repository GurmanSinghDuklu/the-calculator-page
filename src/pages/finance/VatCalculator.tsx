import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Calculator, ArrowRight, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Finance category ─────────────────────────────────────
const ACCENT = "#3B82F6";

// ─── Types & Calculation logic ───────────────────────────────────────────────
type VatMode = "add" | "remove";
type VatRate = 20 | 5 | 0;

interface VatResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
}

const calculateVat = (amount: number, mode: VatMode, rate: VatRate): VatResult => {
  if (amount <= 0 || rate === 0) {
    return { netAmount: amount, vatAmount: 0, grossAmount: amount };
  }
  if (mode === "add") {
    const vatAmount = amount * (rate / 100);
    return { netAmount: amount, vatAmount, grossAmount: amount + vatAmount };
  }
  // remove VAT — amount is the gross
  const netAmount = amount / (1 + rate / 100);
  const vatAmount = amount - netAmount;
  return { netAmount, vatAmount, grossAmount: amount };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

// ─── Component ────────────────────────────────────────────────────────────────
const VatCalculator = () => {
  const [mode, setMode] = useState<VatMode>("add");
  const [vatRate, setVatRate] = useState<VatRate>(20);
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState<VatResult | null>(null);

  useEffect(() => {
    const value = parseFloat(amount) || 0;
    setResult(calculateVat(value, mode, vatRate));
  }, [amount, mode, vatRate]);

  const value = parseFloat(amount) || 0;

  const vatRates: { key: VatRate; label: string; sub: string }[] = [
    { key: 20, label: "20% Standard", sub: "Most goods & services" },
    { key: 5, label: "5% Reduced", sub: "Home energy, child seats" },
    { key: 0, label: "0% Zero-rated", sub: "Food, books, children's clothes" },
  ];

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "How do I add VAT to a price?", answer: "Multiply the net price by 1.2 for standard rate VAT. For example, an item costing £100 before VAT becomes £120 including VAT. For reduced rate items at 5%, multiply by 1.05 instead." },
    { question: "How do I remove VAT from a price?", answer: "Divide the gross price by 1.2 to get the price without standard rate VAT. For example, if something costs £120 including VAT, divide by 1.2 to get the net price of £100. The VAT portion is £20." },
    { question: "What is the current UK VAT rate?", answer: "The standard UK VAT rate is 20% and has been since January 2011. There is also a reduced rate of 5% for certain goods like domestic energy and a zero rate for essentials such as most food, children's clothing and books." },
    { question: "When do I need to register for VAT?", answer: "You must register for VAT when your taxable turnover exceeds £90,000 in any 12-month period. You can also register voluntarily below this threshold, which can be beneficial if you sell mainly to VAT-registered businesses." },
  ];

  return (
    <>
      <SEO
        title="VAT Calculator UK"
        description="Free UK VAT calculator. Add or remove VAT at 20%, 5% or 0%. Instant results for invoices, expenses and tax returns."
        keywords="VAT calculator, VAT calculator UK, add VAT, remove VAT, 20% VAT, value added tax calculator"
        canonicalUrl="https://www.thecalculatorpage.com/finance/vat-calculator"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "VAT Calculator",
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
            <span className="text-white/60">VAT Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + mode & rate selector */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[13vw] lg:text-[100px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #6366f1 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                VAT
              </span>
              <span className="block text-[7vw] lg:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Add or remove VAT instantly. Works with standard (20%), reduced (5%) and zero-rated items. Perfect for invoices, expenses and Making Tax Digital returns.
              </p>
            </div>

            {/* Mode selector */}
            <div className="mt-8 flex flex-col gap-3">
              <p className={labelClass}>Calculation Mode</p>
              <div className="flex gap-3">
                {([
                  { key: "add" as VatMode, label: "Add VAT", icon: Plus, sub: "Net to Gross" },
                  { key: "remove" as VatMode, label: "Remove VAT", icon: Minus, sub: "Gross to Net" },
                ] as const).map(({ key, label, icon: Icon, sub }) => (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className="flex-1 flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                    style={{
                      borderColor: mode === key ? ACCENT : "rgba(255,255,255,0.08)",
                      background: mode === key ? `${ACCENT}15` : "transparent",
                    }}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0 transition-colors" style={{ color: mode === key ? ACCENT : "rgba(255,255,255,0.25)" }} />
                    <div>
                      <p className="font-heading text-sm uppercase tracking-widest" style={{ color: mode === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                        {label}
                      </p>
                      <p className="text-xs text-white/25 font-sans">{sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* VAT Rate selector */}
            <div className="mt-6 flex flex-col gap-3">
              <p className={labelClass}>VAT Rate</p>
              {vatRates.map(({ key, label, sub }) => (
                <button
                  key={key}
                  onClick={() => setVatRate(key)}
                  className="flex items-center gap-4 p-4 border rounded-lg transition-all text-left"
                  style={{
                    borderColor: vatRate === key ? ACCENT : "rgba(255,255,255,0.08)",
                    background: vatRate === key ? `${ACCENT}15` : "transparent",
                  }}
                >
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors" style={{ borderColor: vatRate === key ? ACCENT : "rgba(255,255,255,0.25)" }}>
                    {vatRate === key && <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }} />}
                  </div>
                  <div>
                    <p className="font-heading text-sm uppercase tracking-widest" style={{ color: vatRate === key ? ACCENT : "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    <p className="text-xs text-white/25 font-sans">{sub}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary stats */}
            {result && value > 0 && (
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Net Amount", value: formatCurrency(result.netAmount) },
                    { label: "VAT Amount", value: formatCurrency(result.vatAmount) },
                    { label: "Gross Amount", value: formatCurrency(result.grossAmount) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Net Amount", value: formatCurrency(result.netAmount) },
                  { label: "VAT Amount", value: formatCurrency(result.vatAmount) },
                  { label: "Gross Amount", value: formatCurrency(result.grossAmount) },
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
                  <label className={labelClass}>
                    {mode === "add" ? "Amount (excl. VAT)" : "Amount (incl. VAT)"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">£</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="100.00"
                      min="0"
                      step="0.01"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Live result */}
                {result && value > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">VAT Amount</span>
                      <span className="text-3xl font-display text-white">{formatCurrency(result.vatAmount)}</span>
                    </div>
                    {[
                      { label: "Net (excl. VAT)", value: formatCurrency(result.netAmount) },
                      { label: `VAT at ${vatRate}%`, value: formatCurrency(result.vatAmount) },
                      { label: "Gross (incl. VAT)", value: formatCurrency(result.grossAmount), highlight: true },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className={`font-heading ${highlight ? "text-white" : "text-white/60"}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setResult(calculateVat(value, mode, vatRate))}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  {mode === "add" ? "Add VAT" : "Remove VAT"}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick reference card */}
            {result && value > 0 && (
              <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-4">Quick Reference</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10">
                        {["Rate", "Net", "VAT", "Gross"].map(h => (
                          <th key={h} className={`py-3 font-heading uppercase tracking-widest text-white/25 ${h === "Rate" ? "text-left" : "text-right"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[20, 5, 0].map((rate) => {
                        const ref = calculateVat(
                          mode === "add" ? value : value,
                          mode,
                          rate as VatRate
                        );
                        return (
                          <tr key={rate} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${rate === vatRate ? "" : ""}`}>
                            <td className="py-3 font-heading" style={{ color: rate === vatRate ? ACCENT : "rgba(255,255,255,0.5)" }}>{rate}%</td>
                            <td className="py-3 text-right font-heading text-white/50">{formatCurrency(ref.netAmount)}</td>
                            <td className="py-3 text-right font-heading text-white/50">{formatCurrency(ref.vatAmount)}</td>
                            <td className="py-3 text-right font-heading text-white" style={{ color: rate === vatRate ? ACCENT : "rgba(255,255,255,0.3)" }}>
                              {formatCurrency(ref.grossAmount)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About section */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-[#252323]/50 border border-white/10 rounded-2xl p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-6">About UK VAT Rates</p>
            <div className="grid md:grid-cols-3 gap-8 text-sm text-white/40 font-sans leading-relaxed">
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Standard Rate (20%)</p>
                <p>The standard VAT rate of 20% applies to most goods and services in the UK. This covers everything from electronics and clothing (adult sizes) to professional services and restaurant meals.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Reduced Rate (5%)</p>
                <p>A reduced rate of 5% applies to certain goods and services including domestic fuel and power, child car seats, smoking cessation products, and some energy-saving installations.</p>
              </div>
              <div>
                <p className="font-heading uppercase tracking-widest text-white/60 text-xs mb-3" style={{ color: ACCENT }}>Zero Rate (0%)</p>
                <p>Zero-rated goods are still technically VAT-taxable, but the rate is 0%. This includes most food and drink, books and newspapers, children's clothing and shoes, and public transport.</p>
              </div>
            </div>
            <p className="text-[10px] text-white/20 font-sans italic mt-6">
              VAT rates are set by HMRC and apply across the United Kingdom. Some goods and services are exempt from VAT entirely, which is different from zero-rated. Always check HMRC guidance for specific items.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is VAT, Exactly?",
              description: "VAT stands for Value Added Tax, and it's basically a tax that gets added to most things you buy in the UK. If you've ever looked at a receipt and wondered why the total was higher than expected, VAT is usually the reason. The standard rate is 20%, which means for every £100 you spend, £20 goes to the government as tax. It's been at 20% since January 2011. Businesses collect it on behalf of HMRC and then pass it along — so if you're running a business, you're essentially a tax collector whether you like it or not. The good news is that if you're VAT-registered, you can claim back the VAT you pay on business purchases, which is why understanding VAT matters so much when you're managing your own books."
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description: "Whether you're putting together an invoice, checking an expense receipt, or working out what your client actually owes you, this calculator has you covered.",
              steps: [
                { step: 1, title: "Enter Your Amount", description: "Type in the amount you're working with. If you know the price before VAT, you'll want to add VAT. If you've got a total that already includes VAT, you'll want to remove it to find the net figure." },
                { step: 2, title: "Choose Add or Remove", description: "Pick 'Add VAT' when you have a net price and need the gross total — handy for creating invoices. Pick 'Remove VAT' when you have a VAT-inclusive price and need to know the net amount and VAT portion — useful for expense claims." },
                { step: 3, title: "Select the VAT Rate", description: "Most things are at 20%, but if you're dealing with domestic energy bills, child car seats or similar items, choose 5%. For food, books or children's clothes, the rate is 0%." },
              ]
            }}
            formula={{
              title: "The VAT Formulas",
              formula: "Add VAT: Gross = Net × 1.20 | Remove VAT: Net = Gross ÷ 1.20",
              explanation: "To add standard VAT, multiply by 1.20. So a £100 invoice becomes £120 including VAT. To strip VAT from a price, divide by 1.20 — a £120 receipt means the net amount was £100 and the VAT was £20. For the 5% reduced rate, use 1.05 instead of 1.20. A quick shortcut for finding just the VAT on a gross amount at 20%: divide by 6. For example, £1,200 divided by 6 gives you £200 of VAT."
            }}
            tips={[
              "You must register for VAT once your taxable turnover hits £90,000 in any rolling 12-month period — keep an eye on this, because HMRC charges penalties for late registration",
              "If you sell mainly to other VAT-registered businesses, voluntary registration can actually save you money since you can reclaim VAT on your purchases",
              "Making Tax Digital (MTD) means you need compatible software to file your quarterly VAT returns — spreadsheets alone won't cut it anymore",
              "Always check whether something is zero-rated, reduced-rate, or exempt before charging VAT — getting this wrong on invoices creates headaches down the line",
              "Keep your VAT receipts for at least 6 years — HMRC can ask to inspect them at any point during that window"
            ]}
            faqs={[
              { question: "What's the difference between zero-rated and VAT-exempt?", answer: "This trips up a lot of people. Zero-rated goods are technically still VAT-taxable, but the rate happens to be 0% — things like most food, children's clothes, and books. Exempt goods are outside the VAT system entirely, like financial services and postage stamps. The practical difference matters if you run a business: you can still reclaim input VAT on purchases related to zero-rated sales, but you can't reclaim input VAT on exempt sales. It's a subtle but important distinction." },
              { question: "When do I need to register for VAT?", answer: "You're legally required to register once your VAT-taxable turnover goes above £90,000 in any 12-month period. That's a rolling window, not just your financial year — so you need to keep checking. You can also register voluntarily below this threshold, which is worth considering if your customers are mostly other businesses. They can reclaim the VAT you charge, so it doesn't cost them extra, and you get to reclaim VAT on your own business expenses." },
              { question: "How often do I file VAT returns?", answer: "Most businesses file quarterly, and since Making Tax Digital became mandatory, you need to use compatible software to submit your returns to HMRC. Your VAT quarters don't have to match the calendar year — you get assigned quarters when you register, though you can ask to change them. Payment is usually due one month and seven days after the end of each quarter. Setting up a direct debit gives you an extra few days and means you won't accidentally miss a deadline." },
              { question: "Can I reclaim VAT on purchases I made before registering?", answer: "Yes, within limits. You can reclaim VAT on goods you bought up to 4 years before your registration date, as long as you still have them and they're used in your business. For services, the window is shorter — just 6 months before registration. This is worth remembering because a lot of people don't realise they can backdate claims. Dig out those old invoices for equipment, stock, and professional services — it can add up to a decent chunk of money." }
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

export default VatCalculator;
