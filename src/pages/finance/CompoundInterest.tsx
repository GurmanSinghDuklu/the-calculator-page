import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { AdvancedCompoundCalculator } from "@/components/AdvancedCompoundCalculator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

const ACCENT = "#3B82F6";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("100");
  const [extraDeposit, setExtraDeposit] = useState("0");
  const [extraMonth, setExtraMonth] = useState("1");
  const [extraYear, setExtraYear] = useState("1");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showAdvanced, setShowAdvanced] = useState(true); // advanced by default
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
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest which only applies to the original amount, compound interest grows exponentially over time. This is why Albert Einstein reportedly called it the eighth wonder of the world — small amounts can grow significantly when left to compound over years." },
    { question: "What's the difference between daily and monthly compounding?", answer: "Daily compounding applies interest 365 times per year, while monthly compounds 12 times. Daily compounding results in slightly higher returns over time." },
    { question: "Which compounding frequency is best?", answer: "More frequent compounding (daily vs yearly) generates slightly more interest over time. However, the practical difference becomes smaller as the time period decreases. Choose based on your account type." },
    { question: "How to calculate daily compound interest?", answer: "Use the formula: A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency (365 for daily), and t is time in years. Our calculator does this automatically." }
  ];

  const sym = currencies[currency].symbol;

  // ── Advanced view (default) ──
  if (showAdvanced) {
    return (
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <SEO
          title="Compound Interest Calculator UK"
          description="Free compound interest calculator with daily, monthly and yearly compounding. See how your savings grow over time with compound interest."
          structuredData={[structuredData, breadcrumbStructuredData]}
          faqSchema={faqSchema}
        />
        <div className="max-w-5xl mx-auto px-6 py-20">
          <button
            onClick={() => setShowAdvanced(false)}
            className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-12"
          >
            ← Switch to Simple Mode
          </button>
          <AdvancedCompoundCalculator />
        </div>

        {/* ── Static content + disclaimer ── */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
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

          {/* ── Compounding Frequency Guide ── */}
          <section className="mt-20 pt-20 border-t border-white/10">
            <h2 className="text-3xl font-display font-bold mb-12 text-white">Compounding Frequency Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Daily Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Daily compounding applies interest 365 times per year. This is the most common frequency for savings accounts and money market accounts. It generates the highest returns compared to monthly or annual compounding.
                </p>
                <p className="text-sm text-gray-500">Best for: High-yield savings accounts, money market accounts</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Monthly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Monthly compounding applies interest 12 times per year. This is the standard frequency for most savings accounts and certificates of deposit (CDs). It offers a good balance between frequency and simplicity.
                </p>
                <p className="text-sm text-gray-500">Best for: Traditional savings accounts, some bonds</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Quarterly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Quarterly compounding applies interest 4 times per year. Some bonds and investment accounts use this frequency. It provides moderate growth between monthly and annual compounding.
                </p>
                <p className="text-sm text-gray-500">Best for: Some bonds, certain investment accounts</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Yearly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Annual or yearly compounding applies interest once per year. While simpler to track, it generates the least amount of interest compared to more frequent compounding methods over the same period.
                </p>
                <p className="text-sm text-gray-500">Best for: Bonds, some traditional savings products</p>
              </article>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">💡 Pro Tip</h3>
              <p className="text-gray-400">
                The more frequently interest compounds, the more you earn. For example, £10,000 at 5% annual interest will grow to £12,762.82 annually, £12,834.27 monthly, £12,863.56 daily, but £12,833.01 quarterly. Use our calculator to compare different frequencies for your specific situation.
              </p>
            </div>
          </section>
        </div>

        <FinancialDisclosure variant="investment" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    );
  }

  // ── Simple view ──
  return (
    <>
      <SEO
        title="Compound Interest Calculator UK"
        description="Free compound interest calculator with daily, monthly and yearly compounding. See how your savings grow over time with compound interest."
        structuredData={[structuredData, breadcrumbStructuredData]}
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
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
              <span
                className="block text-[8vw] lg:text-[70px] mt-1"
                style={{
                  background: `linear-gradient(135deg, #a78bfa 0%, ${ACCENT} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate the future value of your investments with precision. Watch your wealth grow exponentially over time.
              </p>
            </div>

            {/* Switch to advanced */}
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
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

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
                    <CopyButton accentColor={ACCENT} results={[
                      { label: "Future Value", value: `${sym}${result.futureValue.toLocaleString()}` },
                      { label: "Total Contributions", value: `${sym}${result.totalContributions.toLocaleString()}` },
                      { label: "Interest Earned", value: `${sym}${result.totalInterest.toLocaleString()}` },
                    ]} />
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

        {/* ── Static content + disclaimer ── */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
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

          {/* ── Compounding Frequency Guide ── */}
          <section className="mt-20 pt-20 border-t border-white/10">
            <h2 className="text-3xl font-display font-bold mb-12 text-white">Compounding Frequency Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Daily Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Daily compounding applies interest 365 times per year. This is the most common frequency for savings accounts and money market accounts. It generates the highest returns compared to monthly or annual compounding.
                </p>
                <p className="text-sm text-gray-500">Best for: High-yield savings accounts, money market accounts</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Monthly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Monthly compounding applies interest 12 times per year. This is the standard frequency for most savings accounts and certificates of deposit (CDs). It offers a good balance between frequency and simplicity.
                </p>
                <p className="text-sm text-gray-500">Best for: Traditional savings accounts, some bonds</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Quarterly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Quarterly compounding applies interest 4 times per year. Some bonds and investment accounts use this frequency. It provides moderate growth between monthly and annual compounding.
                </p>
                <p className="text-sm text-gray-500">Best for: Some bonds, certain investment accounts</p>
              </article>

              <article className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-white">Yearly Compound Interest Calculator</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Annual or yearly compounding applies interest once per year. While simpler to track, it generates the least amount of interest compared to more frequent compounding methods over the same period.
                </p>
                <p className="text-sm text-gray-500">Best for: Bonds, some traditional savings products</p>
              </article>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">💡 Pro Tip</h3>
              <p className="text-gray-400">
                The more frequently interest compounds, the more you earn. For example, $10,000 at 5% annual interest will grow to $12,762.82 annually, $12,834.27 monthly, $12,863.56 daily, but $12,833.01 quarterly. Use our calculator to compare different frequencies for your specific situation.
              </p>
            </div>
          </section>
        </div>

        <FinancialDisclosure variant="investment" />

        <FinancialDisclosure variant="investment" />

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