import { Logo } from "@/components/Logo";
import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { toast } from "sonner";
import { ArrowRight, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

const ACCENT = "#F97316";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MortgagePart {
  id: number;
  label: string;
  amount: string;
  rate: string;
  termYears: string;
  termMonths: string;
}

interface PartResult {
  id: number;
  label: string;
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  termMonths: number;
  schedule: ScheduleRow[];
}

interface ScheduleRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcPart(amount: number, annualRate: number, totalMonths: number): { monthly: number; schedule: ScheduleRow[] } {
  if (totalMonths <= 0 || amount <= 0) return { monthly: 0, schedule: [] };
  const r = annualRate / 100 / 12;
  const monthly = r === 0
    ? amount / totalMonths
    : (amount * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);

  const schedule: ScheduleRow[] = [];
  let balance = amount;
  for (let m = 1; m <= totalMonths; m++) {
    const interest = balance * r;
    const principal = Math.min(monthly - interest, balance);
    balance = Math.max(balance - principal, 0);
    schedule.push({
      month: m,
      payment: Math.round((principal + interest) * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }
  return { monthly: Math.round(monthly * 100) / 100, schedule };
}

function aggregateByYear(schedule: ScheduleRow[]): { year: number; payment: number; principal: number; interest: number; balance: number }[] {
  const years: Record<number, { payment: number; principal: number; interest: number; balance: number }> = {};
  for (const row of schedule) {
    const y = Math.ceil(row.month / 12);
    if (!years[y]) years[y] = { payment: 0, principal: 0, interest: 0, balance: 0 };
    years[y].payment += row.payment;
    years[y].principal += row.principal;
    years[y].interest += row.interest;
    years[y].balance = row.balance; // end-of-year balance
  }
  return Object.entries(years).map(([y, v]) => ({
    year: parseInt(y),
    payment: Math.round(v.payment * 100) / 100,
    principal: Math.round(v.principal * 100) / 100,
    interest: Math.round(v.interest * 100) / 100,
    balance: Math.round(v.balance * 100) / 100,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────
const MortgageCalculator = () => {
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [houseValuation, setHouseValuation] = useState("350000");
  const [parts, setParts] = useState<MortgagePart[]>([
    { id: 1, label: "Part 1", amount: "280000", rate: "4.5", termYears: "25", termMonths: "0" },
  ]);
  const [results, setResults] = useState<PartResult[] | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [breakdownView, setBreakdownView] = useState<"yearly" | "monthly">("yearly");
  const [activePartTab, setActivePartTab] = useState(0);

  const sym = currencies[currency].symbol;
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all";

  // ── LTV ────────────────────────────────────────────────────────────────────
  const ltv = useMemo(() => {
    const val = parseFloat(houseValuation);
    const totalBorrowed = parts.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    if (val > 0 && totalBorrowed > 0) return ((totalBorrowed / val) * 100).toFixed(1);
    return null;
  }, [houseValuation, parts]);

  // ── Part management ────────────────────────────────────────────────────────
  const addPart = () => {
    if (parts.length >= 3) return;
    const id = Date.now();
    setParts(prev => [...prev, {
      id,
      label: `Part ${prev.length + 1}`,
      amount: "50000",
      rate: "5.5",
      termYears: "20",
      termMonths: "0",
    }]);
  };

  const removePart = (id: number) => {
    setParts(prev => prev.filter(p => p.id !== id).map((p, i) => ({ ...p, label: `Part ${i + 1}` })));
    setActivePartTab(0);
  };

  const updatePart = (id: number, field: keyof MortgagePart, value: string) => {
    setParts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // ── Calculate ──────────────────────────────────────────────────────────────
  const calculate = () => {
    const partResults: PartResult[] = [];

    for (const p of parts) {
      const amount = parseFloat(p.amount);
      const rate = parseFloat(p.rate);
      const years = parseInt(p.termYears) || 0;
      const months = parseInt(p.termMonths) || 0;
      const totalMonths = years * 12 + months;

      if (!amount || amount <= 0) { toast.error(`${p.label}: enter a valid mortgage amount`); return; }
      if (isNaN(rate) || rate < 0 || rate > 30) { toast.error(`${p.label}: interest rate must be 0–30%`); return; }
      if (totalMonths < 1) { toast.error(`${p.label}: term must be at least 1 month`); return; }
      if (amount > 100_000_000) { toast.error(`${p.label}: amount seems too large`); return; }

      const { monthly, schedule } = calcPart(amount, rate, totalMonths);
      const totalPayment = schedule.reduce((s, r) => s + r.payment, 0);
      const totalInterest = Math.round((totalPayment - amount) * 100) / 100;

      partResults.push({
        id: p.id,
        label: p.label,
        loanAmount: amount,
        monthlyPayment: monthly,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest,
        termMonths: totalMonths,
        schedule,
      });
    }

    setResults(partResults);
    setShowBreakdown(false);
    setActivePartTab(0);
  };

  const totalMonthly = results ? results.reduce((s, r) => s + r.monthlyPayment, 0) : 0;
  const totalInterest = results ? results.reduce((s, r) => s + r.totalInterest, 0) : 0;
  const totalRepayment = results ? results.reduce((s, r) => s + r.totalPayment, 0) : 0;
  const maxTerm = results ? Math.max(...results.map(r => r.termMonths)) : 0;

  // ── Combined schedule (all parts, month by month up to longest term) ───────
  const combinedSchedule = useMemo(() => {
    if (!results) return [];
    const rows: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    for (let m = 1; m <= maxTerm; m++) {
      let payment = 0, principal = 0, interest = 0, balance = 0;
      for (const r of results) {
        const row = r.schedule[m - 1];
        if (row) {
          payment += row.payment;
          principal += row.principal;
          interest += row.interest;
          balance += row.balance;
        }
      }
      rows.push({ month: m, payment: Math.round(payment * 100) / 100, principal: Math.round(principal * 100) / 100, interest: Math.round(interest * 100) / 100, balance: Math.round(balance * 100) / 100 });
    }
    return rows;
  }, [results, maxTerm]);

  const partColors = ["#F97316", "#3B82F6", "#22C55E"];

  const faqSchema = [
    { question: "How much can I actually borrow?", answer: "Most UK lenders will offer somewhere between 4 and 4.5 times your annual income — so if you earn £50,000, you're looking at a maximum loan of roughly £200,000–£225,000. Some lenders stretch to 5x or even 5.5x for higher earners or certain professions." },
    { question: "What is a part-and-part mortgage?", answer: "Some lenders split a mortgage into two or more parts with different interest rates or repayment types — for example, part repayment and part interest-only, or a fixed portion and a tracker portion. This calculator lets you model each part separately and see the combined monthly payment and full balance schedule." },
    { question: "What's the difference between the interest rate and the APRC?", answer: "The interest rate is what you're charged on the loan itself. The APRC (Annual Percentage Rate of Charge) is the bigger number — it includes the interest rate plus all fees and charges. Always compare APRC figures when comparing mortgage deals." },
    { question: "Should I go for a longer or shorter mortgage term?", answer: "A longer term reduces your monthly payment but significantly increases total interest paid. Many people start with a longer term for breathing room, then overpay when they can. That's a sensible approach." },
  ];

  return (
    <>
      <SEO
        title="Mortgage Calculator UK 2025 — Monthly Repayments & Total Cost"
        description="Free UK mortgage calculator with multi-part mortgage support. Calculate monthly payments for up to 3 parts with different rates and terms, plus full month-by-month balance breakdown."
        keywords="mortgage calculator uk, mortgage payment calculator, part and part mortgage, multi part mortgage calculator, monthly mortgage breakdown, amortisation schedule uk"
        canonicalUrl="https://www.thecalculatorapp.org/finance/mortgage"
        faqSchema={faqSchema}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Mortgage Calculator UK",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org/finance/mortgage"
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
            <span className="text-white/60">Mortgage Calculator</span>
          </nav>
        </div>

        {/* Hero split */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-16 items-start">

          {/* LEFT — Hero + summary */}
          <div className="flex flex-col z-10 lg:w-[45%] lg:sticky lg:top-8 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[12vw] lg:text-[100px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>
                MORTGAGE
              </span>
              <span className="block text-[8vw] lg:text-[66px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-sm leading-relaxed font-sans font-light">
                Multi-part mortgage calculator with full month-by-month balance breakdown. Model up to 3 parts on different rates and terms.
              </p>
            </div>

            {/* Summary results */}
            {results && (
              <div className="mt-8 space-y-4">
                {/* Combined total */}
                <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Monthly Payment</p>
                  <p className="font-display text-4xl text-white">{sym}{totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  {ltv && <p className="text-[10px] font-heading uppercase tracking-widest mt-2" style={{ color: ACCENT }}>LTV: {ltv}%</p>}
                </div>

                {/* Per-part breakdown */}
                {results.map((r, i) => (
                  <div key={r.id} className="bg-white/[0.02] border border-white/8 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: partColors[i] }} />
                      <p className="text-[10px] font-heading uppercase tracking-widest" style={{ color: partColors[i] }}>{r.label}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { l: "Monthly", v: `${sym}${r.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                        { l: "Borrowed", v: `${sym}${r.loanAmount.toLocaleString()}` },
                        { l: "Total Interest", v: `${sym}${r.totalInterest.toLocaleString()}` },
                        { l: "Total Repayment", v: `${sym}${r.totalPayment.toLocaleString()}` },
                      ].map(({ l, v }) => (
                        <div key={l}>
                          <p className="text-white/30 font-heading uppercase tracking-widest text-[8px]">{l}</p>
                          <p className="text-white font-heading text-sm">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "Total Borrowed", v: `${sym}${results.reduce((s, r) => s + r.loanAmount, 0).toLocaleString()}` },
                    { l: "Total Interest", v: `${sym}${Math.round(totalInterest).toLocaleString()}` },
                    { l: "Total Repayment", v: `${sym}${Math.round(totalRepayment).toLocaleString()}` },
                    { l: "LTV Ratio", v: ltv ? `${ltv}%` : "—" },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-white/[0.03] border border-white/8 rounded-lg p-3">
                      <p className="text-[8px] font-heading uppercase tracking-widest text-white/30 mb-1">{l}</p>
                      <p className="font-display text-lg text-white">{v}</p>
                    </div>
                  ))}
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Total Monthly Payment", value: `${sym}${totalMonthly.toFixed(2)}` },
                  { label: "Total Repayment", value: `${sym}${totalRepayment.toFixed(2)}` },
                  { label: "Total Interest", value: `${sym}${totalInterest.toFixed(2)}` },
                ]} />

                {/* Toggle breakdown */}
                <button
                  onClick={() => setShowBreakdown(v => !v)}
                  className="w-full flex items-center justify-between px-5 py-3.5 border border-white/10 rounded-xl text-white/50 hover:text-white hover:border-white/30 transition-all font-heading text-[10px] uppercase tracking-widest"
                >
                  {showBreakdown ? "Hide" : "View"} Monthly & Balance Breakdown
                  {showBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Form */}
          <div className="w-full lg:w-[55%] space-y-5">

            {/* House valuation + currency */}
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-2xl uppercase text-white tracking-wide mb-5">Property Details</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>
                <div>
                  <label className={labelClass}>House Valuation ({sym})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={houseValuation}
                      onChange={e => setHouseValuation(e.target.value)}
                      placeholder="350,000"
                      className={`${inputClass} pl-8`}
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {ltv && (
                    <p className="text-[10px] font-heading uppercase tracking-widest mt-1.5" style={{ color: ACCENT }}>
                      LTV: {ltv}% — {parseFloat(ltv) <= 60 ? "Excellent rate tier" : parseFloat(ltv) <= 75 ? "Good rate tier" : parseFloat(ltv) <= 85 ? "Standard rates" : parseFloat(ltv) <= 90 ? "Higher rate tier" : "High LTV — limited deals"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Mortgage parts */}
            {parts.map((part, idx) => (
              <div
                key={part.id}
                className="bg-[#252323]/80 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl transition-all"
                style={{ borderColor: `${partColors[idx]}30` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: partColors[idx] }} />
                    <h3 className="font-display text-2xl uppercase text-white tracking-wide">{part.label}</h3>
                  </div>
                  {idx > 0 && (
                    <button onClick={() => removePart(part.id)} className="text-white/20 hover:text-red-400 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Mortgage Amount */}
                  <div>
                    <label className={labelClass}>Mortgage Amount ({sym})</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                      <input
                        type="number"
                        value={part.amount}
                        onChange={e => updatePart(part.id, "amount", e.target.value)}
                        placeholder="280,000"
                        className={`${inputClass} pl-8`}
                        onFocus={e => (e.target.style.borderColor = partColors[idx])}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className={labelClass}>Interest Rate (% per annum)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={part.rate}
                        onChange={e => updatePart(part.id, "rate", e.target.value)}
                        placeholder="4.5"
                        className={inputClass}
                        onFocus={e => (e.target.style.borderColor = partColors[idx])}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>

                  {/* Term — years + months */}
                  <div>
                    <label className={labelClass}>Mortgage Term</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="40"
                          value={part.termYears}
                          onChange={e => updatePart(part.id, "termYears", e.target.value)}
                          placeholder="25"
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = partColors[idx])}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-xs">YRS</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={part.termMonths}
                          onChange={e => updatePart(part.id, "termMonths", e.target.value)}
                          placeholder="0"
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = partColors[idx])}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-xs">MOS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add part button */}
            {parts.length < 3 && (
              <button
                onClick={addPart}
                className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-white/15 rounded-2xl text-white/30 hover:text-white hover:border-white/30 transition-all font-heading text-[10px] uppercase tracking-widest"
              >
                <Plus className="h-4 w-4" />
                Add Additional Borrowing Part ({parts.length}/3)
              </button>
            )}

            {/* Calculate */}
            <button
              onClick={calculate}
              className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 px-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
              style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
            >
              Calculate Mortgage
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Monthly & Balance Breakdown ─────────────────────────────────────── */}
        {results && showBreakdown && (
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="bg-[#1a1818] border border-white/10 rounded-2xl overflow-hidden">

              {/* Breakdown header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide">Balance Breakdown</h2>
                  <p className="text-white/30 text-xs font-heading uppercase tracking-widest mt-1">
                    {results.length > 1 ? `${results.length} parts · ` : ""}Total term: {Math.floor(maxTerm / 12)}y {maxTerm % 12}m
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Part tabs (only if multiple parts) */}
                  {results.length > 1 && (
                    <div className="flex rounded-lg border border-white/10 overflow-hidden">
                      <button
                        onClick={() => setActivePartTab(0)}
                        className={`px-3 py-2 text-[9px] font-heading uppercase tracking-widest transition-colors ${activePartTab === 0 ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                      >
                        Combined
                      </button>
                      {results.map((r, i) => (
                        <button
                          key={r.id}
                          onClick={() => setActivePartTab(i + 1)}
                          className={`px-3 py-2 text-[9px] font-heading uppercase tracking-widest transition-colors ${activePartTab === i + 1 ? "text-white" : "text-white/30 hover:text-white"}`}
                          style={activePartTab === i + 1 ? { background: `${partColors[i]}20`, color: partColors[i] } : {}}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* View toggle */}
                  <div className="flex rounded-lg border border-white/10 overflow-hidden">
                    {(["yearly", "monthly"] as const).map(v => (
                      <button
                        key={v}
                        onClick={() => setBreakdownView(v)}
                        className={`px-4 py-2 text-[9px] font-heading uppercase tracking-widest transition-colors ${breakdownView === v ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table */}
              {(() => {
                const activeResult = activePartTab === 0
                  ? null
                  : results[activePartTab - 1];

                const rawSchedule = activeResult ? activeResult.schedule : combinedSchedule;
                const color = activeResult ? partColors[activePartTab - 1] : ACCENT;

                const rows = breakdownView === "yearly"
                  ? aggregateByYear(rawSchedule).map(r => ({ period: `Year ${r.year}`, ...r }))
                  : rawSchedule.slice(0, 600).map(r => ({ period: `Month ${r.month}`, ...r }));

                return (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/8">
                          {["Period", "Payment", "Principal", "Interest", "Balance"].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-[9px] font-heading uppercase tracking-widest text-white/30">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row: { period: string; payment: number; principal: number; interest: number; balance: number }, i: number) => (
                          <tr
                            key={i}
                            className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="px-5 py-3 font-heading text-[10px] uppercase tracking-widest" style={{ color }}>{row.period}</td>
                            <td className="px-5 py-3 text-white/70 font-heading text-xs">{sym}{row.payment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="px-5 py-3 text-white/70 font-heading text-xs">{sym}{row.principal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="px-5 py-3 text-white/50 font-heading text-xs">{sym}{row.interest?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="px-5 py-3 font-heading text-xs font-medium text-white">{sym}{row.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {breakdownView === "monthly" && rawSchedule.length > 600 && (
                      <p className="px-5 py-3 text-white/20 text-xs font-heading uppercase tracking-widest">Showing first 600 months</p>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Static content */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "What does this mortgage calculator tell you?",
              description: "This calculator works out your monthly repayment using the standard amortisation formula, then builds a full schedule showing your outstanding balance every month and year until the mortgage is cleared. It supports multi-part mortgages — where different portions are borrowed at different rates or over different terms — which is common for additional borrowing, Help to Buy equity loans, or part-and-part arrangements."
            }}
            howItWorks={{
              title: "How to use this calculator",
              description: "Enter your house valuation for the LTV calculation, then fill in Part 1 with your main mortgage amount, rate and term. If you have additional borrowing on a different rate or term, click Add Additional Borrowing Part.",
              steps: [
                { step: 1, title: "House valuation", description: "Enter the full property value. This is used only to calculate your LTV ratio — it doesn't affect the repayment calculation." },
                { step: 2, title: "Part 1 — main mortgage", description: "Enter the amount you're borrowing, the annual interest rate, and the term in years and months. Use the exact term offered by your lender for accuracy." },
                { step: 3, title: "Additional parts", description: "If you have further borrowing — a second charge, Help to Buy, or different rate tranche — click Add Part and enter those details separately." },
                { step: 4, title: "Balance breakdown", description: "After calculating, click View Monthly & Balance Breakdown to see a full amortisation schedule. Switch between yearly and monthly views, and between combined and individual parts." },
              ]
            }}
            formula={{
              title: "The formula used",
              formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
              explanation: "M is monthly payment, P is loan amount, r is monthly rate (annual ÷ 12), n is total months. Applied independently to each part, then summed for the combined total. The balance schedule runs month by month: interest = balance × r, principal = M − interest, new balance = previous balance − principal."
            }}
            tips={[
              "Use years AND months for exact term matching — a 25-year 3-month mortgage is different from 25 years",
              "The LTV indicator tells you which rate tier you're in — 60%, 75%, 85% and 90% are key thresholds",
              "View the yearly breakdown to see how your balance drops — it falls slowly at first and accelerates later",
              "Additional borrowing parts are independent — each runs its own amortisation schedule",
              "Even overpaying £100/month on a £250,000 mortgage at 4.5% can save over £20,000 in interest"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="mortgage" />

        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MortgageCalculator;
