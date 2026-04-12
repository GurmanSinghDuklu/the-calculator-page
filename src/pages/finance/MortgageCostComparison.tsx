import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, ChevronDown, ChevronUp, Info } from "lucide-react";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

const ACCENT = "#F97316";

interface DealInputs {
  label: string;
  balance: string;
  rate: string;
  dealTermMonths: string;
  fullTermYears: string;
  productFee: string;
  productFeeToBalance: boolean;
  valuationFee: string;
  legalFees: string;
  otherFees: string;
}

interface DealResult {
  monthlyPayment: number;
  monthlyPaymentWithFee: number;
  totalPaymentsDeal: number;
  totalInterestDeal: number;
  upfrontFees: number;
  totalCostOfDeal: number;
  remainingBalance: number;
  effectiveBalance: number;
}

const DEFAULT_DEAL = (label: string): DealInputs => ({
  label,
  balance: "250000",
  rate: label === "Deal A" ? "4.49" : "4.19",
  dealTermMonths: label === "Deal A" ? "26" : "62",
  fullTermYears: "25",
  productFee: label === "Deal A" ? "999" : "1499",
  productFeeToBalance: false,
  valuationFee: "300",
  legalFees: "1000",
  otherFees: "0",
});

function calcDeal(d: DealInputs): DealResult | null {
  const balance = parseFloat(d.balance);
  const rate = parseFloat(d.rate);
  const dealMonths = parseInt(d.dealTermMonths);
  const fullYears = parseFloat(d.fullTermYears);
  const productFee = parseFloat(d.productFee) || 0;
  const valuationFee = parseFloat(d.valuationFee) || 0;
  const legalFees = parseFloat(d.legalFees) || 0;
  const otherFees = parseFloat(d.otherFees) || 0;

  if (
    isNaN(balance) || isNaN(rate) || isNaN(dealMonths) || isNaN(fullYears) ||
    balance <= 0 || rate < 0 || dealMonths <= 0 || fullYears <= 0
  ) return null;

  const r = rate / 100 / 12;
  const n = Math.round(fullYears * 12);
  const k = dealMonths;

  // Monthly payment — base (no fee added)
  const monthlyBase =
    r === 0
      ? balance / n
      : (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  // Monthly payment with product fee added to balance
  const effectiveBalance = d.productFeeToBalance ? balance + productFee : balance;
  const monthly =
    r === 0
      ? effectiveBalance / n
      : (effectiveBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  // Remaining balance after deal period
  const remainingBalance =
    r === 0
      ? effectiveBalance - monthly * k
      : effectiveBalance * Math.pow(1 + r, k) - monthly * ((Math.pow(1 + r, k) - 1) / r);

  // Costs during deal term
  const totalPaymentsDeal = monthly * k;
  const capitalRepaid = effectiveBalance - remainingBalance;
  const totalInterestDeal = totalPaymentsDeal - capitalRepaid;

  // Fees NOT added to mortgage = paid upfront
  const upfrontFees = (d.productFeeToBalance ? 0 : productFee) + valuationFee + legalFees + otherFees;

  // Total cost of deal = what you actually spend
  const totalCostOfDeal = totalPaymentsDeal + upfrontFees;

  return {
    monthlyPayment: Math.round(monthly * 100) / 100,
    monthlyPaymentWithFee: Math.round(monthly * 100) / 100,
    totalPaymentsDeal: Math.round(totalPaymentsDeal * 100) / 100,
    totalInterestDeal: Math.round(totalInterestDeal * 100) / 100,
    upfrontFees: Math.round(upfrontFees * 100) / 100,
    totalCostOfDeal: Math.round(totalCostOfDeal * 100) / 100,
    remainingBalance: Math.round(remainingBalance * 100) / 100,
    effectiveBalance: Math.round(effectiveBalance * 100) / 100,
  };
}

const fmt = (n: number) =>
  "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
const inputClass =
  "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all";

function DealCard({
  deal,
  onChange,
  result,
  index,
}: {
  deal: DealInputs;
  onChange: (d: DealInputs) => void;
  result: DealResult | null;
  index: number;
}) {
  const [showOptional, setShowOptional] = useState(true);
  const accent = index === 0 ? ACCENT : "#22C55E";

  const set = (field: keyof DealInputs, value: string | boolean) =>
    onChange({ ...deal, [field]: value });

  return (
    <div
      className="bg-[#1e1c1c]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
      style={{ borderTopColor: accent, borderTopWidth: 2 }}
    >
      {/* Deal header */}
      <div className="px-6 pt-5 pb-4 border-b border-white/5">
        <h2 className="font-display text-2xl uppercase text-white tracking-wide">{deal.label}</h2>
      </div>

      <div className="p-6 space-y-4">
        {/* Core inputs */}
        <div>
          <label className={labelClass}>Mortgage Balance (£)</label>
          <input type="number" value={deal.balance} onChange={e => set("balance", e.target.value)}
            placeholder="250000" className={inputClass}
            onFocus={e => (e.target.style.borderColor = accent)}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Interest Rate (%)</label>
            <input type="number" step="0.01" value={deal.rate} onChange={e => set("rate", e.target.value)}
              placeholder="4.49" className={inputClass}
              onFocus={e => (e.target.style.borderColor = accent)}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <div>
            <label className={labelClass}>Deal Term (Months)</label>
            <input type="number" value={deal.dealTermMonths} onChange={e => set("dealTermMonths", e.target.value)}
              placeholder="26" className={inputClass}
              onFocus={e => (e.target.style.borderColor = accent)}
              onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Full Mortgage Term (Years)</label>
          <input type="number" value={deal.fullTermYears} onChange={e => set("fullTermYears", e.target.value)}
            placeholder="25" className={inputClass}
            onFocus={e => (e.target.style.borderColor = accent)}
            onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
        </div>

        {/* Fees section */}
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-widest transition-colors w-full pt-2"
          style={{ color: `${accent}cc` }}
        >
          {showOptional ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          Fees & Costs
        </button>

        {showOptional && (
          <div className="space-y-4 pt-1">
            <div>
              <label className={labelClass}>Product / Arrangement Fee (£)</label>
              <input type="number" value={deal.productFee} onChange={e => set("productFee", e.target.value)}
                placeholder="999" className={inputClass}
                onFocus={e => (e.target.style.borderColor = accent)}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              {/* Add to balance toggle */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => set("productFeeToBalance", !deal.productFeeToBalance)}
                  className="flex items-center gap-2 text-[10px] font-heading uppercase tracking-widest transition-colors"
                  style={{ color: deal.productFeeToBalance ? accent : "rgba(255,255,255,0.3)" }}
                >
                  <span
                    className="w-8 h-4 rounded-full flex items-center px-0.5 transition-all"
                    style={{ background: deal.productFeeToBalance ? `${accent}40` : "rgba(255,255,255,0.1)" }}
                  >
                    <span
                      className="w-3 h-3 rounded-full transition-all"
                      style={{
                        background: deal.productFeeToBalance ? accent : "rgba(255,255,255,0.3)",
                        transform: deal.productFeeToBalance ? "translateX(16px)" : "translateX(0)",
                      }}
                    />
                  </span>
                  Add fee to mortgage balance
                </button>
              </div>
              {deal.productFeeToBalance && (
                <p className="text-[10px] text-white/25 font-sans mt-1 flex items-start gap-1">
                  <Info className="h-3 w-3 mt-0.5 shrink-0" style={{ color: accent }} />
                  Fee added to balance — monthly payment and interest will increase
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Valuation Fee (£)</label>
                <input type="number" value={deal.valuationFee} onChange={e => set("valuationFee", e.target.value)}
                  placeholder="300" className={inputClass}
                  onFocus={e => (e.target.style.borderColor = accent)}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label className={labelClass}>Legal / Conveyancing (£)</label>
                <input type="number" value={deal.legalFees} onChange={e => set("legalFees", e.target.value)}
                  placeholder="1000" className={inputClass}
                  onFocus={e => (e.target.style.borderColor = accent)}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Other Fees (£)</label>
              <input type="number" value={deal.otherFees} onChange={e => set("otherFees", e.target.value)}
                placeholder="0" className={inputClass}
                onFocus={e => (e.target.style.borderColor = accent)}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
          </div>
        )}

        {/* Results for this deal */}
        {result && (
          <div className="pt-4 border-t border-white/10 space-y-2 mt-2">
            {[
              { label: "Monthly Payment", value: fmt(result.monthlyPayment), highlight: true },
              { label: "Total Payments", value: fmt(result.totalPaymentsDeal) },
              { label: "Interest During Deal", value: fmt(result.totalInterestDeal) },
              { label: "Upfront Fees", value: fmt(result.upfrontFees) },
              { label: "Remaining Balance", value: fmt(result.remainingBalance) },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                <span className="text-[10px] font-heading uppercase tracking-widest text-white/35">{label}</span>
                <span
                  className={`font-display text-sm ${highlight ? "text-lg" : ""}`}
                  style={{ color: highlight ? accent : "rgba(255,255,255,0.7)" }}
                >
                  {value}
                </span>
              </div>
            ))}

            {/* Total cost — prominent */}
            <div className="mt-3 p-4 rounded-lg" style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}>
              <p className="text-[9px] font-heading uppercase tracking-widest mb-1" style={{ color: `${accent}99` }}>
                Total Cost of Deal
              </p>
              <p className="font-display text-3xl" style={{ color: accent }}>
                {fmt(result.totalCostOfDeal)}
              </p>
              <p className="text-[10px] text-white/25 font-sans mt-1">
                Payments + upfront fees over {deal.dealTermMonths} months
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MortgageCostComparison() {
  const [deals, setDeals] = useState<DealInputs[]>([
    DEFAULT_DEAL("Deal A"),
    DEFAULT_DEAL("Deal B"),
  ]);
  const [results, setResults] = useState<(DealResult | null)[]>([null, null]);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDeal = (i: number, d: DealInputs) => {
    const updated = [...deals];
    updated[i] = d;
    setDeals(updated);
  };

  const calculate = () => {
    setError(null);
    const res = deals.map(calcDeal);
    if (res.some(r => r === null)) {
      setError("Please fill in all required fields (Balance, Rate, Deal Term, Full Term) for each deal.");
      return;
    }
    setResults(res);
    setCalculated(true);
  };

  const resA = results[0];
  const resB = results[1];
  const winner =
    resA && resB
      ? resA.totalCostOfDeal < resB.totalCostOfDeal
        ? "A"
        : resB.totalCostOfDeal < resA.totalCostOfDeal
        ? "B"
        : "EQUAL"
      : null;
  const saving =
    resA && resB ? Math.abs(resA.totalCostOfDeal - resB.totalCostOfDeal) : 0;

  const faqSchema = [
    {
      question: "How do mortgage advisors compare deals for cost effectiveness?",
      answer:
        "Advisors calculate the total cost of each deal over its term by multiplying the monthly payment by the number of months, then adding all associated fees (product fee, valuation, legal costs). The deal with the lowest total cost is the most cost-effective.",
    },
    {
      question: "Should I add the product fee to my mortgage balance?",
      answer:
        "Adding the product fee to your mortgage avoids an upfront cash payment but increases the balance you pay interest on. Over the deal term this costs more in interest — our calculator shows both scenarios so you can compare the true difference.",
    },
    {
      question: "Why is a 2-year fixed deal sometimes 26 months?",
      answer:
        "Lenders often structure deals over slightly more than the headline period — for example a '2-year fix' may run for 26 months. Using the exact months rather than 24 gives you a more accurate total cost comparison.",
    },
    {
      question: "What does remaining mortgage balance mean?",
      answer:
        "The remaining balance is how much you still owe on the mortgage at the end of the deal period. A lower remaining balance means more capital has been repaid, which affects your loan-to-value ratio and the rates you will be offered at remortgage.",
    },
  ];

  return (
    <>
      <SEO
        title="Mortgage Cost Comparison UK"
        description="Compare mortgage deals by true cost: payments, fees, valuation and remaining balance. Built for UK advisors and brokers."
        keywords="mortgage cost comparison calculator, compare mortgage deals UK, true cost mortgage calculator, mortgage calculator with fees, mortgage arrangement fee calculator, remortgage comparison calculator, mortgage deal comparison tool, mortgage advisor calculator, mortgage broker tool, total mortgage cost calculator, APRC mortgage calculator, mortgage product fee calculator, remortgage savings calculator, cost effective mortgage UK, mortgage fee to balance calculator"
        canonicalUrl="https://www.thecalculatorpage.com/finance/mortgage-cost-comparison"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Mortgage Cost Comparison Calculator",
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
            <Link to="/categories/property" className="hover:text-white transition-colors">Property</Link>
            <span>/</span>
            <span className="text-white/60">Mortgage Cost Comparison</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-white/30 mb-3">Property Tools</p>
              <h1 className="font-display leading-[0.85] tracking-tighter">
                <span
                  className="block text-[13vw] lg:text-[100px]"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #fbbf24 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                  }}
                >
                  MORTGAGE
                </span>
                <span
                  className="block text-[7vw] lg:text-[52px]"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}
                >
                  COST COMPARISON
                </span>
              </h1>
            </div>

            <div className="max-w-md">
              <div className="pl-4 border-l-2" style={{ borderColor: `${ACCENT}50` }}>
                <p className="text-[10px] font-heading uppercase tracking-[0.25em] mb-3" style={{ color: `${ACCENT}80` }}>
                  Designed by mortgage advisors · Built for the mortgage industry
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Compare mortgage deals on their true cost — including payments over the deal term, product fees, valuation, legal costs, and remaining balance. See whether adding a fee to the mortgage actually costs you more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Cards */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deals.map((deal, i) => (
              <DealCard
                key={i}
                deal={deal}
                onChange={d => updateDeal(i, d)}
                result={results[i]}
                index={i}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
              <p className="text-xs text-red-400 font-sans">{error}</p>
            </div>
          )}

          {/* Calculate button */}
          <button
            onClick={calculate}
            className="w-full mt-6 group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
            style={{ background: ACCENT, boxShadow: `0 0 24px -5px ${ACCENT}70` }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px -5px ${ACCENT}90`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 24px -5px ${ACCENT}70`)}
          >
            Compare Deals
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Comparison Summary */}
        {calculated && resA && resB && (
          <div className="max-w-7xl mx-auto px-6 pb-12">

            {/* Winner banner */}
            <div
              className="rounded-xl p-6 mb-6 border"
              style={{
                background: winner === "EQUAL"
                  ? "rgba(255,255,255,0.03)"
                  : winner === "A"
                  ? `${ACCENT}12`
                  : "#22C55E12",
                borderColor: winner === "EQUAL"
                  ? "rgba(255,255,255,0.1)"
                  : winner === "A"
                  ? `${ACCENT}40`
                  : "#22C55E40",
              }}
            >
              {winner === "EQUAL" ? (
                <p className="font-display text-2xl text-white uppercase text-center">Both deals cost the same</p>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-heading uppercase tracking-widest text-white/40 mb-1">Most Cost-Effective Deal</p>
                    <p
                      className="font-display text-4xl uppercase"
                      style={{ color: winner === "A" ? ACCENT : "#22C55E" }}
                    >
                      {winner === "A" ? deals[0].label : deals[1].label}
                    </p>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Lower total cost over the deal term
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-heading uppercase tracking-widest text-white/40 mb-1">You Save</p>
                    <p
                      className="font-display text-4xl"
                      style={{ color: winner === "A" ? ACCENT : "#22C55E" }}
                    >
                      {fmt(saving)}
                    </p>
                    <p className="text-[10px] text-white/30 font-sans mt-1">vs. {winner === "A" ? deals[1].label : deals[0].label}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Side-by-side comparison table */}
            <div className="bg-[#1e1c1c]/60 border border-white/10 rounded-xl overflow-hidden mb-4">
              <div className="grid grid-cols-3 border-b border-white/10">
                <div className="px-5 py-3 text-[10px] font-heading uppercase tracking-widest text-white/30" />
                <div className="px-5 py-3 text-[10px] font-heading uppercase tracking-widest text-center border-l border-white/10"
                  style={{ color: ACCENT }}>{deals[0].label}</div>
                <div className="px-5 py-3 text-[10px] font-heading uppercase tracking-widest text-center border-l border-white/10 text-[#22C55E]">
                  {deals[1].label}
                </div>
              </div>
              {(
                [
                  { label: "Monthly Payment", a: fmt(resA.monthlyPayment), b: fmt(resB.monthlyPayment) },
                  { label: "Deal Term", a: `${deals[0].dealTermMonths} months`, b: `${deals[1].dealTermMonths} months` },
                  { label: "Total Payments", a: fmt(resA.totalPaymentsDeal), b: fmt(resB.totalPaymentsDeal) },
                  { label: "Interest During Deal", a: fmt(resA.totalInterestDeal), b: fmt(resB.totalInterestDeal) },
                  { label: "Upfront Fees", a: fmt(resA.upfrontFees), b: fmt(resB.upfrontFees) },
                  { label: "Total Cost of Deal", a: fmt(resA.totalCostOfDeal), b: fmt(resB.totalCostOfDeal), bold: true },
                  { label: "Remaining Balance", a: fmt(resA.remainingBalance), b: fmt(resB.remainingBalance) },
                ] as { label: string; a: string; b: string; bold?: boolean }[]
              ).map(({ label, a, b, bold }) => (
                <div key={label} className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <div className="px-5 py-3 text-[10px] font-heading uppercase tracking-widest text-white/35">{label}</div>
                  <div
                    className={`px-5 py-3 text-center border-l border-white/5 font-display ${bold ? "text-lg" : "text-sm"}`}
                    style={{
                      color: bold
                        ? winner === "A" ? ACCENT : "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {a}
                  </div>
                  <div
                    className={`px-5 py-3 text-center border-l border-white/5 font-display ${bold ? "text-lg" : "text-sm"}`}
                    style={{
                      color: bold
                        ? winner === "B" ? "#22C55E" : "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {b}
                  </div>
                </div>
              ))}
            </div>

            {/* Fee-to-balance note */}
            {(deals[0].productFeeToBalance || deals[1].productFeeToBalance) && (
              <div className="bg-white/[0.02] border border-white/10 rounded-lg px-5 py-4 mb-4 flex gap-3 items-start">
                <Info className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                <p className="text-xs text-white/40 font-sans leading-relaxed">
                  {deals[0].productFeeToBalance && deals[1].productFeeToBalance
                    ? "Both deals have the product fee added to the mortgage balance."
                    : deals[0].productFeeToBalance
                    ? `${deals[0].label} has the product fee added to the balance. This increases monthly payments and total interest paid.`
                    : `${deals[1].label} has the product fee added to the balance. This increases monthly payments and total interest paid.`}
                  {" "}The total cost of deal reflects this in the monthly payments rather than as an upfront fee.
                </p>
              </div>
            )}

            {/* Copy button */}
            <CopyButton
              accentColor={ACCENT}
              results={[
                { label: "— Deal A —", value: "" },
                { label: "Monthly Payment", value: fmt(resA.monthlyPayment) },
                { label: "Total Payments", value: fmt(resA.totalPaymentsDeal) },
                { label: "Interest During Deal", value: fmt(resA.totalInterestDeal) },
                { label: "Upfront Fees", value: fmt(resA.upfrontFees) },
                { label: "Total Cost of Deal", value: fmt(resA.totalCostOfDeal) },
                { label: "Remaining Balance", value: fmt(resA.remainingBalance) },
                { label: "— Deal B —", value: "" },
                { label: "Monthly Payment", value: fmt(resB.monthlyPayment) },
                { label: "Total Payments", value: fmt(resB.totalPaymentsDeal) },
                { label: "Interest During Deal", value: fmt(resB.totalInterestDeal) },
                { label: "Upfront Fees", value: fmt(resB.upfrontFees) },
                { label: "Total Cost of Deal", value: fmt(resB.totalCostOfDeal) },
                { label: "Remaining Balance", value: fmt(resB.remainingBalance) },
                { label: "— Summary —", value: "" },
                { label: "Most Cost-Effective", value: winner === "EQUAL" ? "Equal" : winner === "A" ? deals[0].label : deals[1].label },
                { label: "Saving", value: fmt(saving) },
              ]}
            />
          </div>
        )}

        {/* Formula & methodology */}
        <section className="max-w-7xl mx-auto px-6 pb-12 border-t border-white/5 pt-10">
          <h2 className="font-display text-3xl uppercase text-white mb-6 tracking-tight">
            How the Comparison Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <h3 className="text-[10px] font-heading uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
                Monthly Repayment Formula
              </h3>
              <div className="bg-black/40 rounded-lg p-4 mb-3 font-mono text-xs text-white/50 leading-relaxed">
                M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]<br /><br />
                P = mortgage balance<br />
                r = monthly interest rate (annual ÷ 12 ÷ 100)<br />
                n = full term in months
              </div>
              <p className="text-xs text-white/35 font-sans leading-relaxed">
                The standard UK capital repayment formula. If the product fee is added to the mortgage, P increases accordingly, raising both the monthly payment and total interest.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <h3 className="text-[10px] font-heading uppercase tracking-widest mb-3" style={{ color: "#22C55E" }}>
                Remaining Balance Formula
              </h3>
              <div className="bg-black/40 rounded-lg p-4 mb-3 font-mono text-xs text-white/50 leading-relaxed">
                B(k) = P(1+r)^k − M × [(1+r)^k − 1] ÷ r<br /><br />
                k = deal term in months<br />
                B(k) = outstanding balance at end of deal
              </div>
              <p className="text-xs text-white/35 font-sans leading-relaxed">
                The remaining balance matters at remortgage — a lower balance improves your loan-to-value ratio and may qualify you for better rates on your next deal.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <h3 className="text-[10px] font-heading uppercase tracking-widest mb-3 text-white/50">
                Total Cost of Deal
              </h3>
              <div className="bg-black/40 rounded-lg p-4 mb-3 font-mono text-xs text-white/50 leading-relaxed">
                Total Cost = (M × k) + Upfront Fees<br /><br />
                Upfront Fees = product fee (if not on balance)<br />
                + valuation + legal + other fees
              </div>
              <p className="text-xs text-white/35 font-sans leading-relaxed">
                This is the true cash outflow during the deal period. It is the primary figure mortgage advisors use to determine which deal is genuinely cheaper for a client.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
              <h3 className="text-[10px] font-heading uppercase tracking-widest mb-3 text-white/50">
                Fee to Mortgage vs. Pay Upfront
              </h3>
              <div className="bg-black/40 rounded-lg p-4 mb-3 font-mono text-xs text-white/50 leading-relaxed">
                Added to balance → P increases<br />
                → Higher M, more interest paid<br /><br />
                Paid upfront → P unchanged<br />
                → Lower M, fee added directly to total cost
              </div>
              <p className="text-xs text-white/35 font-sans leading-relaxed">
                Adding a fee to the mortgage typically costs more over the term due to compounding interest, but avoids an upfront cash requirement. This calculator shows both scenarios clearly.
              </p>
            </div>
          </div>
        </section>

        <FinancialDisclosure variant="mortgage" />

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
}
