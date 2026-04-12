import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { toast } from "sonner";
import { ArrowRight, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour — green for savings / ISA ────────────────────────────────
const ACCENT = "#22C55E";

type IsaType = "cash" | "stocks" | "lisa";

const IsaCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [growthRate, setGrowthRate] = useState("5");
  const [years, setYears] = useState("10");
  const [isaType, setIsaType] = useState<IsaType>("cash");
  const [result, setResult] = useState<{
    finalValue: number;
    totalContributions: number;
    totalGrowth: number;
    totalBonus: number;
    taxSaved: number;
  } | null>(null);

  const calculateIsa = () => {
    const P = parseFloat(initialDeposit) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(growthRate);
    const t = parseFloat(years);

    if (isNaN(r) || isNaN(t) || r < 0 || t <= 0) {
      toast.error("Please enter valid positive numbers for rate and years.");
      return;
    }
    if (P < 0 || PMT < 0) {
      toast.error("Deposit and contribution cannot be negative.");
      return;
    }

    const monthlyRate = r / 100 / 12;
    const months = Math.round(t * 12);

    // Calculate compound growth month by month to handle LISA bonus correctly
    let balance = P;
    let totalContributions = P;
    let totalBonus = 0;

    // For LISA: government adds 25% bonus on contributions up to £4,000/year
    // Max bonus = £1,000/year. Bonus is paid on contributions, not growth.
    let yearlyContributionTracker = 0;
    let currentYear = 1;

    // If initial deposit is in year 1 for LISA, it counts toward the £4,000 limit
    if (isaType === "lisa") {
      const eligibleInitial = Math.min(P, 4000);
      const initialBonus = eligibleInitial * 0.25;
      totalBonus += initialBonus;
      balance += initialBonus;
      yearlyContributionTracker = P; // track how much contributed in year 1
    }

    for (let m = 1; m <= months; m++) {
      // Apply monthly interest/growth
      balance *= (1 + monthlyRate);

      // Add monthly contribution
      balance += PMT;
      totalContributions += PMT;

      // LISA bonus logic
      if (isaType === "lisa") {
        yearlyContributionTracker += PMT;
        // Calculate bonus for this month's contribution
        // Only contributions up to £4,000/year get the 25% bonus
        const prevContrib = yearlyContributionTracker - PMT;
        if (prevContrib < 4000) {
          const eligibleThisMonth = Math.min(PMT, 4000 - prevContrib);
          const monthBonus = eligibleThisMonth * 0.25;
          totalBonus += monthBonus;
          balance += monthBonus;
        }
      }

      // Reset yearly tracker at end of each tax year (every 12 months)
      if (m % 12 === 0) {
        yearlyContributionTracker = 0;
        currentYear++;
      }
    }

    const totalGrowth = balance - totalContributions - totalBonus;

    // Tax saved vs non-ISA:
    // Basic rate taxpayer: 20% on interest/growth above Personal Savings Allowance (£1,000)
    // For simplicity we calculate total tax that WOULD be owed on the growth outside an ISA
    // Using basic rate (20%) on all growth — conservative estimate
    const taxableGrowth = totalGrowth;
    const taxSaved = Math.max(0, taxableGrowth * 0.2);

    setResult({
      finalValue: Math.round(balance * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalGrowth: Math.round(totalGrowth * 100) / 100,
      totalBonus: Math.round(totalBonus * 100) / 100,
      taxSaved: Math.round(taxSaved * 100) / 100,
    });
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const contributionsPct = result ? (result.totalContributions / result.finalValue) * 100 : 0;
  const growthPct = result ? (result.totalGrowth / result.finalValue) * 100 : 0;
  const bonusPct = result && isaType === "lisa" ? (result.totalBonus / result.finalValue) * 100 : 0;

  const isaTypeLabel = isaType === "cash" ? "Cash ISA" : isaType === "stocks" ? "Stocks & Shares ISA" : "Lifetime ISA";

  const faqSchema = [
    { question: "What is the ISA allowance for 2025/26?", answer: "The ISA allowance for the 2025/26 tax year is £20,000. You can split this across different ISA types (Cash, Stocks & Shares, Innovative Finance, Lifetime) but the total cannot exceed £20,000. The Lifetime ISA has a separate sub-limit of £4,000 per year." },
    { question: "Should I choose a Cash ISA or Stocks & Shares ISA?", answer: "Cash ISAs suit short-term savings (under 5 years) and offer guaranteed returns. Stocks & Shares ISAs historically outperform over longer periods (5+ years) but your capital is at risk. Many people use both: a Cash ISA for emergency savings and a Stocks & Shares ISA for long-term goals." },
    { question: "How does the Lifetime ISA government bonus work?", answer: "The government adds a 25% bonus on contributions to a Lifetime ISA, up to £4,000 per year — meaning a maximum bonus of £1,000 annually. You can use it to buy your first home (worth up to £450,000) or withdraw from age 60. Early withdrawal for other reasons incurs a 25% penalty on the amount withdrawn." },
    { question: "Do I pay tax on ISA interest or gains?", answer: "No. All growth inside an ISA — whether interest, dividends, or capital gains — is completely tax-free. This is one of the biggest advantages of ISAs. Outside an ISA, basic rate taxpayers get a £1,000 Personal Savings Allowance, but anything above that is taxed at your marginal rate." },
    { question: "Can I transfer between different ISA types?", answer: "Yes. You can transfer between Cash ISAs, Stocks & Shares ISAs and Lifetime ISAs without losing your tax-free status. Transfers do not count toward your annual ISA allowance. Just make sure to use the official transfer process rather than withdrawing and re-depositing, or you will use up your allowance." },
  ];

  const copyResults = result ? [
    { label: "ISA Type", value: isaTypeLabel },
    { label: "Final Value", value: `£${result.finalValue.toLocaleString()}` },
    { label: "Total Contributions", value: `£${result.totalContributions.toLocaleString()}` },
    { label: "Total Growth", value: `£${result.totalGrowth.toLocaleString()}` },
    ...(isaType === "lisa" ? [{ label: "Government Bonus", value: `£${result.totalBonus.toLocaleString()}` }] : []),
    { label: "Estimated Tax Saved", value: `£${result.taxSaved.toLocaleString()}` },
  ] : [];

  return (
    <>
      <SEO
        title="ISA Calculator UK"
        description="Free UK ISA calculator. Compare Cash ISA, Stocks & Shares ISA and Lifetime ISA returns. See your tax-free growth and LISA government bonus."
        keywords="ISA calculator, ISA calculator UK, cash ISA, stocks and shares ISA, lifetime ISA calculator, LISA calculator, ISA allowance"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ISA Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">ISA Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[12vw] lg:text-[100px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>ISA</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                See how your ISA could grow tax-free. Compare Cash ISA, Stocks & Shares ISA and Lifetime ISA — with government bonus calculations built in.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Final value hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Final ISA Value</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    £{result.finalValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">After {years} years — {isaTypeLabel}</p>
                </div>

                {/* Stats grid */}
                <div className={`grid ${isaType === "lisa" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3"} gap-3`}>
                  {[
                    { label: "Contributions", value: `£${result.totalContributions.toLocaleString()}` },
                    { label: "Growth", value: `£${result.totalGrowth.toLocaleString()}` },
                    ...(isaType === "lisa" ? [{ label: "Gov Bonus", value: `£${result.totalBonus.toLocaleString()}` }] : []),
                    { label: "Tax Saved", value: `£${result.taxSaved.toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-base text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Breakdown bar */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">ISA Breakdown</p>
                  <div className="flex h-6 rounded-full overflow-hidden gap-0.5">
                    <div
                      className="flex items-center justify-center text-[10px] font-heading text-black rounded-l-full transition-all"
                      style={{ width: `${contributionsPct}%`, background: ACCENT }}
                    >
                      {contributionsPct > 15 ? "Deposits" : ""}
                    </div>
                    <div
                      className="flex items-center justify-center text-[10px] font-heading text-white bg-purple-500/70 transition-all"
                      style={{ width: `${growthPct}%` }}
                    >
                      {growthPct > 15 ? "Growth" : ""}
                    </div>
                    {isaType === "lisa" && bonusPct > 0 && (
                      <div
                        className="flex items-center justify-center text-[10px] font-heading text-black rounded-r-full bg-amber-400 transition-all"
                        style={{ width: `${bonusPct}%` }}
                      >
                        {bonusPct > 10 ? "Bonus" : ""}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                      Contributions ({contributionsPct.toFixed(0)}%)
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                      <span className="w-2 h-2 rounded-full bg-purple-500/70" />
                      Growth ({growthPct.toFixed(0)}%)
                    </span>
                    {isaType === "lisa" && bonusPct > 0 && (
                      <span className="flex items-center gap-1.5 text-[9px] font-heading uppercase tracking-widest text-white/30">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Bonus ({bonusPct.toFixed(0)}%)
                      </span>
                    )}
                  </div>
                </div>

                <CopyButton accentColor={ACCENT} results={copyResults} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <PiggyBank className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* ISA Type */}
                <div>
                  <label className={labelClass}>ISA Type</label>
                  <Select value={isaType} onValueChange={(v) => setIsaType(v as IsaType)}>
                    <SelectTrigger className="w-full bg-black/40 border-white/10 text-white rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C1A1A] border-white/10 text-white">
                      <SelectItem value="cash">Cash ISA</SelectItem>
                      <SelectItem value="stocks">Stocks & Shares ISA</SelectItem>
                      <SelectItem value="lisa">Lifetime ISA (LISA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LISA info banner */}
                {isaType === "lisa" && (
                  <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-4 text-sm text-amber-200/80">
                    <p className="font-heading text-[10px] uppercase tracking-widest text-amber-400 mb-1">Lifetime ISA Rules</p>
                    <p>Max £4,000/year contribution. Government adds 25% bonus (up to £1,000/year). Must be 18-39 to open. For first home (up to £450,000) or retirement (age 60+).</p>
                  </div>
                )}

                {/* Initial deposit + Monthly contribution */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Initial Deposit</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">£</span>
                      <input type="number" value={initialDeposit} onChange={e => setInitialDeposit(e.target.value)} placeholder="5,000"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Contribution</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">£</span>
                      <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} placeholder="200"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                  </div>
                </div>

                {/* Rate + Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>{isaType === "stocks" ? "Expected Growth Rate" : "Interest Rate"}</label>
                    <div className="relative">
                      <input type="number" step="0.1" value={growthRate} onChange={e => setGrowthRate(e.target.value)} placeholder="5.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Time Period</label>
                    <div className="relative">
                      <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Result preview in form */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Final Value</span>
                      <span className="text-3xl font-display" style={{ color: ACCENT }}>£{result.finalValue.toLocaleString()}</span>
                    </div>
                    {[
                      { label: "Contributions", value: `£${result.totalContributions.toLocaleString()}` },
                      { label: "Growth", value: `£${result.totalGrowth.toLocaleString()}`, accent: true },
                      ...(isaType === "lisa" ? [{ label: "Gov Bonus", value: `£${result.totalBonus.toLocaleString()}`, accent: true }] : []),
                      { label: "Tax Saved", value: `£${result.taxSaved.toLocaleString()}`, accent: true },
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
                  onClick={calculateIsa}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate ISA
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content */}
        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is an ISA?",
              description: "An Individual Savings Account (ISA) is one of the best deals in UK personal finance. It's a tax-free wrapper around your savings or investments — meaning every penny of interest, dividends, or capital gains you earn inside it is yours to keep. No income tax, no capital gains tax, nothing. The government gives every UK adult a £20,000 annual ISA allowance, and honestly, if you're not using at least some of it, you're leaving free money on the table. There are several types: Cash ISAs work like savings accounts, Stocks & Shares ISAs let you invest in funds and shares tax-free, and Lifetime ISAs give you a 25% government bonus on top. Whether you're saving for a rainy day or building long-term wealth, ISAs should be part of your plan."
            }}
            howItWorks={{
              title: "How This ISA Calculator Works",
              description: "Plug in your numbers and see exactly how your ISA could grow over time. The calculator handles compound interest for Cash ISAs and projected growth for Stocks & Shares ISAs — and if you pick the Lifetime ISA option, it automatically works out your government bonus.",
              steps: [
                { step: 1, title: "Choose Your ISA Type", description: "Pick from Cash ISA, Stocks & Shares ISA, or Lifetime ISA. Each has different rules and expected returns. The calculator adjusts automatically — for example, selecting LISA shows the bonus calculation." },
                { step: 2, title: "Enter Your Deposit & Contributions", description: "Set your initial lump sum and how much you plan to add each month. Remember the total annual ISA allowance is £20,000 across all ISA types, and LISA contributions are capped at £4,000 per year." },
                { step: 3, title: "Set Your Rate & Timeframe", description: "For Cash ISAs, enter the AER your provider offers (typically 3-5%). For Stocks & Shares ISAs, 5-7% is a reasonable long-term assumption, though returns are not guaranteed." },
                { step: 4, title: "Review Your Projection", description: "See your final ISA value, total growth, government bonus (for LISA), and how much tax you've saved compared to holding the same investments outside an ISA." }
              ]
            }}
            formula={{
              title: "ISA Growth Formula",
              formula: "FV = P(1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) - 1) / (r/12)] + LISA Bonus",
              explanation: "Where FV is the final ISA value, P is the initial deposit, r is the annual interest/growth rate as a decimal, t is time in years, and PMT is the monthly contribution. For Lifetime ISAs, the government bonus is calculated as 25% of annual contributions up to £4,000 — giving a maximum bonus of £1,000 per year. The bonus is added to the ISA and compounds alongside your own contributions. Tax saved is estimated at 20% (basic rate) of total growth, representing the income tax you would have owed on interest or gains outside an ISA."
            }}
            faqs={[
              { question: "What is the ISA allowance for 2025/26?", answer: "The total ISA allowance for 2025/26 is £20,000 per person per tax year. You can split this across different ISA types — for example, £4,000 in a Lifetime ISA and £16,000 in a Stocks & Shares ISA. The Lifetime ISA has its own sub-limit of £4,000. You cannot carry over unused allowance to the next year, so it's genuinely use-it-or-lose-it." },
              { question: "Cash ISA or Stocks & Shares ISA — which is better?", answer: "It depends on your timeframe. For money you might need within the next 5 years, a Cash ISA is safer — your capital is protected and you earn a fixed or variable interest rate. For longer-term goals (5+ years), a Stocks & Shares ISA has historically delivered better returns, averaging 7-8% annually for global equity funds before fees. But your capital is at risk and values can fall. Many people sensibly use both." },
              { question: "How does the Lifetime ISA (LISA) work?", answer: "You can open a LISA if you're aged 18-39. Contribute up to £4,000 per year and the government adds a 25% bonus — that's up to £1,000 of free money annually. You can use it for your first home (property up to £450,000) or from age 60 for retirement. Withdraw early for any other reason and you'll pay a 25% withdrawal penalty, which actually means you lose more than the bonus. The LISA contribution counts toward your overall £20,000 ISA allowance." },
              { question: "Do I pay any tax on ISA returns?", answer: "No. Zero. That's the whole point. Interest earned in a Cash ISA, dividends in a Stocks & Shares ISA, and capital gains when you sell investments — all completely tax-free. Outside an ISA, basic rate taxpayers get a £1,000 Personal Savings Allowance for interest and a £500 dividend allowance, but above those thresholds you're paying 20%+ tax. Higher rate taxpayers only get a £500 Personal Savings Allowance, making ISAs even more valuable." },
              { question: "Can I transfer my ISA to a different provider?", answer: "Yes, and you absolutely should if you're getting a poor rate. You can transfer between providers and even between ISA types (e.g., Cash to Stocks & Shares) without losing your tax-free status and without it counting toward your annual allowance. Always use the official ISA transfer process through your new provider — never withdraw and re-deposit, or you'll use up that year's allowance." },
            ]}
            tips={[
              "Use your £20,000 ISA allowance every tax year if you can — you lose it on 6 April and it never rolls over",
              "If you're a first-time buyer under 40, open a Lifetime ISA immediately — even with £1 — to start the clock on the 12-month qualifying period",
              "For Stocks & Shares ISAs, low-cost global index funds (like a FTSE Global All Cap tracker) are hard to beat for long-term growth",
              "Couples can shelter £40,000 per year between them — that's serious tax-free compounding over a decade",
              "Don't leave large sums in a current account earning nothing when Cash ISAs are paying 4-5% tax-free"
            ]}
          />
        </div>

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

export default IsaCalculator;
