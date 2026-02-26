import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { AdvancedCompoundCalculator } from "@/components/AdvancedCompoundCalculator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6"; // accent-blue

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("100");
  const [extraDeposit, setExtraDeposit] = useState("0");
  const [extraMonth, setExtraMonth] = useState("1");
  const [extraYear, setExtraYear] = useState("1");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    const PMT = parseFloat(contribution);
    const extra = parseFloat(extraDeposit) || 0;
    const exMonth = parseInt(extraMonth);
    const exYear = parseInt(extraYear);

    try {
      if (isNaN(P) || isNaN(r) || isNaN(t)) {
        toast.error("Please enter valid numbers for principal, rate, and years.");
        return;
      }
      const totalMonths = t * 12;
      const monthlyRate = (r / 100) / 12;
      const targetDepositMonth = (exYear - 1) * 12 + exMonth;
      let currentBalance = P;
      let totalInvested = P;
      for (let month = 1; month <= totalMonths; month++) {
        currentBalance += currentBalance * monthlyRate;
        currentBalance += PMT;
        totalInvested += PMT;
        if (month === targetDepositMonth) {
          currentBalance += extra;
          totalInvested += extra;
        }
      }
      const totalInterest = currentBalance - totalInvested;
      setResult({
        futureValue: Math.round(currentBalance * 100) / 100,
        totalContributions: Math.round(totalInvested * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    } catch {
      toast.error("An error occurred during calculation.");
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Calculate investment growth with regular and one-time deposits."
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thecalculatorpage.com/" },
      { "@type": "ListItem", "position": 2, "name": "Finance", "item": "https://www.thecalculatorpage.com/finance" },
      { "@type": "ListItem", "position": 3, "name": "Compound Interest" }
    ]
  };

  const faqSchema = [
    { question: "What is compound interest?", answer: "Interest calculated on the principal and the accumulated interest." }
  ];

  const sym = currencies[currency].symbol;

  if (showAdvanced) {
    return (
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <SEO title="Compound Interest Calculator" description="Calculate the future value of your investments." structuredData={[structuredData, breadcrumbStructuredData]} faqSchema={faqSchema} />
        <div className="max-w-5xl mx-auto px-6 py-20">
          <button onClick={() => setShowAdvanced(false)} className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-12">
            ← Back to Calculator
          </button>
          <AdvancedCompoundCalculator />
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Compound Interest Calculator"
        description="Calculate the future value of your investments."
        structuredData={[structuredData, breadcrumbStructuredData]}
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/home" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Compound Interest</span>
          </nav>
        </div>

        {/* ── Split-screen hero ── */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">

            {/* Glow */}
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[13vw] lg:text-[120px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                COMPOUND
              </span>
              <span
                className="block text-[10vw] lg:text-[90px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}
              >
                INTEREST
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate the future value of your investments with precision. Watch your wealth grow exponentially over time.
              </p>
            </div>

            {/* Advanced mode toggle */}
            <button
              onClick={() => setShowAdvanced(true)}
              className="mt-8 self-start flex items-center gap-2 font-heading text-xs uppercase tracking-widest transition-colors"
              style={{ color: ACCENT }}
            >
              <TrendingUp className="h-4 w-4" />
              Switch to Advanced Mode
            </button>
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            {/* Card glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

              {/* Card header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div className="group">
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Currency
                  </label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Principal */}
                <div className="group">
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Principal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      style={{ "--tw-ring-color": ACCENT } as React.CSSProperties}
                      onFocus={e => e.target.style.borderColor = ACCENT}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                      placeholder="10,000"
                    />
                  </div>
                </div>

                {/* Rate + Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">
                      Interest Rate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => e.target.style.borderColor = ACCENT}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder="5"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">
                      Time Period
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => e.target.style.borderColor = ACCENT}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder="10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Monthly contribution */}
                <div className="group">
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">
                    Monthly Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                      onFocus={e => e.target.style.borderColor = ACCENT}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* One-time deposit */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-heading uppercase tracking-widest text-white/40">
                      One-Time Extra Deposit
                    </label>
                    <Badge className="text-[9px] font-heading uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-none">
                      Optional
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">{sym}</span>
                        <input
                          type="number"
                          value={extraDeposit}
                          onChange={(e) => setExtraDeposit(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg pl-7 pr-3 py-3 text-white text-sm focus:outline-none transition-all"
                          onFocus={e => e.target.style.borderColor = ACCENT}
                          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Month</label>
                      <Select value={extraMonth} onValueChange={setExtraMonth}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#252323] border-white/10 text-white">
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {new Date(0, i).toLocaleString("default", { month: "short" })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Year</label>
                      <Select value={extraYear} onValueChange={setExtraYear}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#252323] border-white/10 text-white">
                          {Array.from({ length: Math.max(1, parseInt(years) || 1) }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>Yr {i + 1}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 pb-2 border-t border-white/10">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Future Value</span>
                      <span className="text-3xl font-display text-white">{sym}{result.futureValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Contributions</span>
                      <span className="text-white/70 font-heading">{sym}{result.totalContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Interest Earned</span>
                      <span className="font-heading" style={{ color: ACCENT }}>{sym}{result.totalInterest.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateCompoundInterest}
                  className="w-full group relative overflow-hidden text-white font-heading font-bold py-5 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 20px -5px ${ACCENT}80`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* ── Static content + disclaimer below the fold ── */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <FinancialDisclaimer type="investment" className="mt-6" />
          <CalculatorStaticContent
            whatIs={{
              title: "What is Compound Interest?",
              description: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods."
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description: "Enter your initial investment, interest rate, and time period to see how your money grows."
            }}
            faqs={faqSchema}
          />
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

export default CompoundInterest;