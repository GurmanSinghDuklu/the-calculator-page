import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { CopyButton } from "@/components/CopyButton";
import { useCalculateScroll } from "@/hooks/useCalculateScroll";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Info, AlertTriangle, ShieldCheck } from "lucide-react";
import { RAP_CONFIG, FORGIVENESS_TAX } from "@/data/rap-config";
import {
  calculateRap,
  estimateForgivenessTax,
  getBracket,
  type RapResult,
} from "@/utils/rapCalculator";

const ACCENT = "#3B82F6";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt0 = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
const inputClass =
  "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all";

const RapCalculator = () => {
  const [agi, setAgi] = useState("55000");
  const [balance, setBalance] = useState("45000");
  const [interestRate, setInterestRate] = useState("6.52");
  const [dependents, setDependents] = useState("0");
  const [incomeGrowth, setIncomeGrowth] = useState("3");
  const [marginalRate, setMarginalRate] = useState("22");

  const [result, setResult] = useState<RapResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleView, setScheduleView] = useState<"yearly" | "monthly">("yearly");
  const { resultRef, onCalculate } = useCalculateScroll<HTMLDivElement>();

  const calculate = () => {
    const agiNum = parseFloat(agi);
    const balanceNum = parseFloat(balance);
    const rateNum = parseFloat(interestRate);
    const depNum = parseInt(dependents) || 0;
    const growthNum = parseFloat(incomeGrowth);

    if (isNaN(agiNum) || agiNum < 0) { toast.error("Enter a valid annual income (AGI)"); return; }
    if (isNaN(balanceNum) || balanceNum <= 0) { toast.error("Enter a valid loan balance"); return; }
    if (isNaN(rateNum) || rateNum < 0 || rateNum > 25) { toast.error("Interest rate must be between 0% and 25%"); return; }
    if (depNum < 0 || depNum > 20) { toast.error("Enter a valid number of dependents"); return; }
    if (isNaN(growthNum) || growthNum < -10 || growthNum > 20) { toast.error("Income growth must be between -10% and 20%"); return; }

    setResult(calculateRap({
      agi: agiNum,
      balance: balanceNum,
      interestRate: rateNum,
      dependents: depNum,
      annualIncomeGrowth: growthNum,
    }));
    setShowSchedule(false);
    onCalculate();
  };

  const forgivenessTax = result?.isForgiven
    ? estimateForgivenessTax(result.forgivenAmount, parseFloat(marginalRate) || 0)
    : 0;

  const currentBracket = getBracket(parseFloat(agi) || 0);

  // Yearly aggregation of the monthly schedule.
  const yearlySchedule = result
    ? Object.values(
        result.schedule.reduce((acc, row) => {
          const year = Math.ceil(row.month / 12);
          if (!acc[year]) {
            acc[year] = { year, payment: 0, interestWaived: 0, principalPaid: 0, principalMatch: 0, balance: 0 };
          }
          acc[year].payment += row.payment;
          acc[year].interestWaived += row.interestWaived;
          acc[year].principalPaid += row.principalPaid;
          acc[year].principalMatch += row.principalMatch;
          acc[year].balance = row.balance;
          return acc;
        }, {} as Record<number, { year: number; payment: number; interestWaived: number; principalPaid: number; principalMatch: number; balance: number }>),
      )
    : [];

  const faqSchema = [
    {
      question: "What is the Repayment Assistance Plan (RAP)?",
      answer:
        "RAP is the US federal student loan income-driven repayment plan that launched on 1 July 2026 under P.L. 119-21. It replaced SAVE, which was struck down in the courts, and is the only income-driven option available to borrowers whose first loan is disbursed on or after 1 July 2026. Payments are a percentage of your total Adjusted Gross Income, ranging from 1% to 10%, with a $10 monthly minimum and forgiveness after 360 qualifying payments (30 years).",
    },
    {
      question: "How is a RAP payment calculated?",
      answer:
        "RAP applies a bracketed percentage to your total Adjusted Gross Income (AGI), not your discretionary income. The rate starts at 1% for income between $10,001 and $20,000 and rises by one percentage point per $10,000 of income, reaching 10% for income above $100,000. Borrowers earning $10,000 or less pay a flat $10 per month. You then subtract $50 per month for each dependent, and the payment can never fall below the $10 monthly floor.",
    },
    {
      question: "How is RAP different from SAVE and IBR?",
      answer:
        "Three differences matter most. First, RAP uses your total AGI rather than discretionary income, so the federal poverty guideline does not reduce your payment — household size only helps through the flat $50 per dependent deduction. Second, RAP has no payment cap, so a high earner pays a straight 10% of AGI, whereas IBR caps payments at the 10-year Standard amount. Third, RAP waives unpaid interest each month, so your balance cannot grow while you pay on time.",
    },
    {
      question: "Is student loan forgiveness taxable in 2026?",
      answer:
        "Yes, for income-driven plans including RAP. The American Rescue Plan Act exclusion under Section 108(f)(5) expired on 31 December 2025 and was not extended, so balances forgiven on or after 1 January 2026 are treated as taxable cancellation-of-debt income federally. Public Service Loan Forgiveness, Teacher Loan Forgiveness, and death or disability discharge remain permanently tax-free. State treatment varies.",
    },
    {
      question: "What is the RAP interest waiver?",
      answer:
        "If your monthly RAP payment does not cover all the interest that accrued that month, the unpaid interest is cancelled rather than added to your balance. This means your loan balance cannot grow while you are making on-time payments, which was a common problem under older plans where low payments led to negative amortisation and ballooning balances.",
    },
    {
      question: "Can Parent PLUS loans be repaid under RAP?",
      answer:
        "No. Parent PLUS loans are excluded from RAP, as are consolidation loans that include a Parent PLUS loan. Parent PLUS borrowers seeking an income-driven option generally need to look at Income-Contingent Repayment, subject to the eligibility rules that apply to their loan dates.",
    },
  ];

  return (
    <>
      <SEO
        title="RAP Calculator 2026 — Repayment Assistance Plan Student Loan Estimator"
        description="Free Repayment Assistance Plan (RAP) calculator for US federal student loans. Estimate your monthly RAP payment, total cost, interest waived, forgiveness date and the tax on forgiven balances. Updated for the plan that replaced SAVE on 1 July 2026."
        keywords="RAP calculator, repayment assistance plan calculator, RAP student loan calculator, student loan calculator 2026, income driven repayment calculator, RAP payment estimator, student loan forgiveness calculator, SAVE plan replacement, RAP vs IBR, federal student loan repayment calculator, student loan forgiveness tax calculator, 360 payment forgiveness"
        canonicalUrl="https://www.thecalculatorapp.org/finance/rap-calculator"
        faqSchema={faqSchema}
        calculatorSchema={{
          name: "Repayment Assistance Plan (RAP) Calculator",
          inputs: [
            { name: "Adjusted Gross Income", description: "Annual AGI used to determine the RAP payment bracket" },
            { name: "Loan Balance", description: "Current federal student loan balance" },
            { name: "Interest Rate", description: "Annual interest rate on the loan" },
            { name: "Dependents", description: "Number of dependents, each reducing the monthly payment by $50" },
          ],
          outputs: [
            { name: "Monthly Payment", description: "Estimated monthly RAP payment" },
            { name: "Total Paid", description: "Total amount repaid over the life of the loan" },
            { name: "Forgiven Amount", description: "Balance written off after 360 qualifying payments" },
            { name: "Interest Waived", description: "Unpaid interest cancelled by the RAP interest waiver" },
          ],
        }}
        speakableSelectors={["#rap-answer", "h1"]}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">RAP Calculator</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Hero */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[9px] font-heading uppercase tracking-widest px-2.5 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400">
                New plan — live since 1 July 2026
              </span>
              <span className="text-[9px] font-heading uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 text-white/40">
                Replaces SAVE
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl text-white leading-[0.95] tracking-tight mb-5 uppercase">
              RAP Calculator
              <span className="block text-xl md:text-2xl mt-3 font-sans font-normal normal-case text-white/50">
                Repayment Assistance Plan — estimate your payment, forgiveness date and the tax on what's written off
              </span>
            </h1>

            {/* Answer-first block, targeted for AI/featured-snippet extraction */}
            <div id="rap-answer" className="max-w-3xl border-l-2 pl-5 py-1" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-white/60 text-base font-sans leading-relaxed">
                The <strong className="text-white/85">Repayment Assistance Plan (RAP)</strong> is the only income-driven
                repayment plan open to US federal student loan borrowers whose first loan is disbursed on or after
                1 July 2026. Your payment is a bracketed percentage of your <strong className="text-white/85">total
                Adjusted Gross Income</strong> — from 1% to 10% — minus $50 per dependent, with a $10 monthly minimum.
                Unpaid interest is waived each month, and any remaining balance is forgiven after
                360 qualifying payments (30 years).
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* ── Inputs ── */}
            <div className="lg:col-span-2">
              <div className="bg-[#1e1c1c]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:sticky lg:top-24">
                <h2 className="font-display text-2xl uppercase text-white tracking-wide mb-6">Your Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Adjusted Gross Income (Annual)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">$</span>
                      <input
                        type="number" value={agi} onChange={e => setAgi(e.target.value)}
                        placeholder="55000" className={`${inputClass} pl-8`}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <p className="text-[10px] text-white/25 font-sans mt-1.5">
                      RAP uses total AGI — not discretionary income. Currently in the{" "}
                      <span style={{ color: ACCENT }}>
                        {currentBracket.flatMonthly !== null
                          ? "$10 flat"
                          : `${(currentBracket.rate * 100).toFixed(0)}%`}
                      </span>{" "}
                      bracket.
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>Loan Balance</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">$</span>
                      <input
                        type="number" value={balance} onChange={e => setBalance(e.target.value)}
                        placeholder="45000" className={`${inputClass} pl-8`}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Interest Rate</label>
                      <div className="relative">
                        <input
                          type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(e.target.value)}
                          placeholder="6.52" className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Dependents</label>
                      <input
                        type="number" min="0" max="20" value={dependents} onChange={e => setDependents(e.target.value)}
                        placeholder="0" className={inputClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Income Growth / Yr</label>
                      <div className="relative">
                        <input
                          type="number" step="0.1" value={incomeGrowth} onChange={e => setIncomeGrowth(e.target.value)}
                          placeholder="3" className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Tax Rate At Forgiveness</label>
                      <div className="relative">
                        <input
                          type="number" step="1" value={marginalRate} onChange={e => setMarginalRate(e.target.value)}
                          placeholder="22" className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full py-4 rounded-lg font-heading text-sm uppercase tracking-widest transition-all"
                    style={{ background: ACCENT, color: "#fff" }}
                  >
                    Calculate RAP Payment
                  </button>

                  <p className="text-[10px] text-white/20 font-sans leading-relaxed pt-1">
                    Estimate only. Parent PLUS loans and consolidations containing them are not eligible for RAP.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Results ── */}
            <div className="lg:col-span-3" ref={resultRef}>
              {!result ? (
                <div className="bg-[#1e1c1c]/40 border border-white/8 rounded-2xl p-10 text-center">
                  <p className="text-white/30 font-sans text-sm">
                    Enter your details to see your estimated RAP payment, total cost, and forgiveness outcome.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Headline */}
                  <div className="bg-[#1e1c1c]/80 border border-white/10 rounded-2xl p-6">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                      Estimated Monthly Payment
                    </p>
                    <p className="font-display text-5xl md:text-6xl mb-1" style={{ color: ACCENT }}>
                      {fmt(result.initialMonthlyPayment)}
                    </p>
                    <p className="text-white/40 text-sm font-sans">
                      {result.onMinimumPayment
                        ? "You're at the $10 monthly minimum."
                        : `${result.bracketRatePercent}% of your AGI${
                            parseInt(dependents) > 0
                              ? `, less $${parseInt(dependents) * RAP_CONFIG.dependentDeductionMonthly} for ${dependents} dependent${parseInt(dependents) > 1 ? "s" : ""}`
                              : ""
                          }`}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className={`border rounded-2xl p-6 ${
                    result.isForgiven
                      ? "bg-amber-500/[0.07] border-amber-500/25"
                      : "bg-emerald-500/[0.07] border-emerald-500/25"
                  }`}>
                    <p className={`text-[9px] font-heading uppercase tracking-widest mb-2 ${
                      result.isForgiven ? "text-amber-400/80" : "text-emerald-400/80"
                    }`}>
                      {result.isForgiven ? "Forgiven After 30 Years" : "Paid Off In Full"}
                    </p>
                    {result.isForgiven ? (
                      <>
                        <p className="font-display text-4xl text-amber-400 mb-2">{fmt0(result.forgivenAmount)}</p>
                        <p className="text-white/50 text-sm font-sans leading-relaxed">
                          You'd repay {fmt0(result.totalPaid)} over 30 years, and this remaining balance would be
                          written off after {RAP_CONFIG.forgivenessMonths} qualifying payments.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-4xl text-emerald-400 mb-2">
                          {Math.floor((result.payoffMonth ?? 0) / 12)} yrs {(result.payoffMonth ?? 0) % 12} mos
                        </p>
                        <p className="text-white/50 text-sm font-sans leading-relaxed">
                          You'd clear the balance before the 30-year forgiveness point, repaying{" "}
                          {fmt0(result.totalPaid)} in total.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Forgiveness tax — the detail most calculators omit */}
                  {result.isForgiven && (
                    <div className="bg-red-500/[0.06] border border-red-500/25 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-red-400" />
                        <div className="flex-1">
                          <p className="text-[9px] font-heading uppercase tracking-widest text-red-400/80 mb-2">
                            Estimated Tax On Forgiven Balance
                          </p>
                          <p className="font-display text-3xl text-red-400 mb-2">{fmt0(forgivenessTax)}</p>
                          <p className="text-white/50 text-xs font-sans leading-relaxed">
                            The ARPA tax exclusion expired on 31 December 2025. Balances forgiven under income-driven
                            plans on or after 1 January 2026 count as taxable cancellation-of-debt income federally, so
                            you would likely owe tax in the year of forgiveness. PSLF remains tax-free. State treatment
                            varies.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interest waiver + principal match */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[#1e1c1c]/60 border border-white/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30">Interest Waived</p>
                      </div>
                      <p className="font-display text-2xl text-white mb-1">{fmt0(result.totalInterestWaived)}</p>
                      <p className="text-white/35 text-[11px] font-sans leading-relaxed">
                        Interest cancelled rather than added to your balance — money you never owe.
                      </p>
                    </div>
                    <div className="bg-[#1e1c1c]/60 border border-white/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                        <p className="text-[9px] font-heading uppercase tracking-widest text-white/30">Principal Match</p>
                      </div>
                      <p className="font-display text-2xl text-white mb-1">{fmt0(result.totalPrincipalMatch)}</p>
                      <p className="text-white/35 text-[11px] font-sans leading-relaxed">
                        Government contribution ensuring every payment reduces principal by at least $50.
                      </p>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { l: "Total Paid", v: fmt0(result.totalPaid) },
                      { l: "Interest Paid", v: fmt0(result.totalInterestPaid) },
                      { l: "Original Balance", v: fmt0(parseFloat(balance) || 0) },
                    ].map(({ l, v }) => (
                      <div key={l} className="bg-white/[0.03] border border-white/8 rounded-lg p-4">
                        <p className="text-[8px] font-heading uppercase tracking-widest text-white/30 mb-1">{l}</p>
                        <p className="font-display text-lg text-white">{v}</p>
                      </div>
                    ))}
                  </div>

                  <CopyButton accentColor={ACCENT} results={[
                    { label: "Monthly RAP Payment", value: fmt(result.initialMonthlyPayment) },
                    { label: "Total Paid", value: fmt0(result.totalPaid) },
                    { label: "Interest Waived", value: fmt0(result.totalInterestWaived) },
                    ...(result.isForgiven
                      ? [
                          { label: "Forgiven After 30 Years", value: fmt0(result.forgivenAmount) },
                          { label: "Estimated Tax On Forgiveness", value: fmt0(forgivenessTax) },
                        ]
                      : [{ label: "Paid Off In", value: `${Math.floor((result.payoffMonth ?? 0) / 12)} years ${(result.payoffMonth ?? 0) % 12} months` }]),
                  ]} />

                  {/* Schedule */}
                  <button
                    onClick={() => setShowSchedule(v => !v)}
                    className="w-full py-3 rounded-lg font-heading text-[11px] uppercase tracking-widest border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all"
                  >
                    {showSchedule ? "Hide" : "View"} Payment Schedule
                  </button>

                  {showSchedule && (
                    <div className="bg-[#1e1c1c]/60 border border-white/10 rounded-xl overflow-hidden">
                      <div className="flex border-b border-white/10">
                        {(["yearly", "monthly"] as const).map(v => (
                          <button
                            key={v}
                            onClick={() => setScheduleView(v)}
                            className="flex-1 py-3 font-heading text-[10px] uppercase tracking-widest transition-all"
                            style={{
                              color: scheduleView === v ? ACCENT : "rgba(255,255,255,0.3)",
                              background: scheduleView === v ? `${ACCENT}10` : "transparent",
                            }}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                      <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
                        <table className="w-full text-xs">
                          <thead className="sticky top-0 bg-[#1e1c1c]">
                            <tr className="border-b border-white/10">
                              {[scheduleView === "yearly" ? "Year" : "Month", "Paid", "Principal", "Waived", "Balance"].map(h => (
                                <th key={h} className="px-4 py-2.5 text-left font-heading text-[9px] uppercase tracking-widest text-white/30">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(scheduleView === "yearly" ? yearlySchedule : result.schedule).map((row: any) => (
                              <tr key={scheduleView === "yearly" ? row.year : row.month} className="border-b border-white/5 hover:bg-white/[0.02]">
                                <td className="px-4 py-2 text-white/50 font-heading">{scheduleView === "yearly" ? row.year : row.month}</td>
                                <td className="px-4 py-2 text-white/70">{fmt0(row.payment)}</td>
                                <td className="px-4 py-2 text-white/70">{fmt0(row.principalPaid + row.principalMatch)}</td>
                                <td className="px-4 py-2 text-emerald-400/70">{fmt0(row.interestWaived)}</td>
                                <td className="px-4 py-2 text-white/70">{fmt0(row.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bracket reference table */}
          <div className="mt-12">
            <h2 className="font-display text-2xl uppercase text-white tracking-wide mb-4">RAP Payment Brackets</h2>
            <div className="bg-[#1e1c1c]/60 border border-white/10 rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 text-left font-heading text-[10px] uppercase tracking-widest text-white/30">Adjusted Gross Income</th>
                    <th className="px-5 py-3 text-left font-heading text-[10px] uppercase tracking-widest text-white/30">Payment Rate</th>
                    <th className="px-5 py-3 text-left font-heading text-[10px] uppercase tracking-widest text-white/30">Example Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {RAP_CONFIG.brackets.map((b, i) => {
                    const exampleAgi = b.maxAgi === null ? 120_000 : (b.minAgi + b.maxAgi) / 2;
                    const example = b.flatMonthly !== null ? b.flatMonthly : (exampleAgi * b.rate) / 12;
                    return (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className="px-5 py-2.5 text-white/60 font-sans">
                          {b.maxAgi === null
                            ? `Over $${b.minAgi.toLocaleString()}`
                            : b.minAgi === 0
                              ? `$0 – $${b.maxAgi.toLocaleString()}`
                              : `$${(b.minAgi + 1).toLocaleString()} – $${b.maxAgi.toLocaleString()}`}
                        </td>
                        <td className="px-5 py-2.5 font-heading" style={{ color: ACCENT }}>
                          {b.flatMonthly !== null ? "Flat $10/mo" : `${(b.rate * 100).toFixed(0)}%`}
                        </td>
                        <td className="px-5 py-2.5 text-white/40 font-sans">
                          {fmt0(example)} on {fmt0(exampleAgi)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-white/25 font-sans mt-3 leading-relaxed">
              Less $50 per month per dependent. Minimum payment is $10/month regardless of income or dependents.
            </p>
          </div>

          {/* Sources & methodology */}
          <div className="mt-10 bg-[#1e1c1c]/60 border border-white/10 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <div className="text-xs text-white/45 font-sans leading-relaxed space-y-2">
                <p>
                  <span className="font-heading uppercase tracking-widest text-[10px] text-white/60">Sources &amp; methodology — </span>
                  RAP was established by P.L. 119-21 and took effect on 1 July 2026. Figures on this page are compiled
                  from US Department of Education material, Congressional Research Service briefing IF13075, and federal
                  loan servicer documentation. Figures confirmed as of{" "}
                  <span className="text-white/70">{RAP_CONFIG.confirmedAsOf}</span> for the{" "}
                  <span className="text-white/70">{RAP_CONFIG.awardYear}</span> award year.
                </p>
                <p>
                  <span className="font-heading uppercase tracking-widest text-[10px] text-white/60">Important limitations — </span>
                  RAP is new and Department of Education implementation guidance is still settling. This calculator
                  models the bracket rate as applying to your whole AGI, and assumes steady income growth with no
                  periods of deferment, forbearance or non-payment. Real payments are recalculated annually from your
                  filed tax return. This is an estimate, not financial advice — verify against your servicer and
                  studentaid.gov before making decisions.
                </p>
              </div>
            </div>
          </div>

          <RelatedCalculators pageKey="rap-calculator" />

          <CalculatorStaticContent
            whatIs={{
              title: "What Is The Repayment Assistance Plan?",
              description:
                "The Repayment Assistance Plan (RAP) is the US federal student loan repayment plan that took effect on 1 July 2026 under P.L. 119-21. It is the only income-driven repayment plan available to borrowers whose first loan is disbursed on or after that date, replacing the SAVE plan which was struck down by the 8th Circuit. RAP sets your monthly payment as a bracketed percentage of your total Adjusted Gross Income — between 1% and 10% — rather than a percentage of discretionary income as older plans did. It includes two borrower protections older plans lacked: unpaid monthly interest is waived rather than capitalised, and a $50 monthly principal match ensures every payment reduces what you owe.",
            }}
            howItWorks={{
              title: "How RAP Payments Are Calculated",
              description:
                "RAP applies a percentage to your total AGI based on which income bracket you fall into, then subtracts a flat $50 per dependent, with a hard floor of $10 per month. Unlike IBR, there is no cap tied to the Standard repayment amount, so higher earners pay a straight 10% of AGI. Any balance remaining after 360 qualifying payments is forgiven.",
              steps: [
                { step: 1, title: "Find your bracket", description: "Your total Adjusted Gross Income determines your rate — 1% at $10,001–$20,000, rising one point per $10,000 of income, up to 10% above $100,000." },
                { step: 2, title: "Apply the rate", description: "The bracket rate is applied to your total AGI, then divided by twelve to give the monthly figure." },
                { step: 3, title: "Deduct for dependents", description: "Subtract $50 per month for each dependent. The payment can never drop below the $10 monthly minimum." },
                { step: 4, title: "Interest is waived", description: "If your payment does not cover the month's interest, the shortfall is cancelled rather than added to your balance, so the loan cannot grow while you pay on time." },
              ],
            }}
            formula={{
              title: "RAP Payment Formula",
              formula: "Monthly Payment = max($10, (AGI × bracket rate ÷ 12) − ($50 × dependents))",
              explanation:
                "The bracket rate runs from 1% to 10% depending on total Adjusted Gross Income, with borrowers earning $10,000 or less paying a flat $10 per month. Because the rate applies to total AGI rather than discretionary income, the federal poverty guideline does not reduce the payment — household size affects the result only through the $50 per dependent deduction.",
            }}
            faqs={faqSchema.map(f => ({ question: f.question, answer: f.answer }))}
            tips={[
              "RAP has no payment cap — if you expect high earnings, compare RAP against IBR, which caps payments at the 10-year Standard amount",
              "Forgiveness under RAP is federally taxable from 2026, so plan for a tax bill in the forgiveness year — PSLF forgiveness remains tax-free",
              "Parent PLUS loans cannot be repaid under RAP, and neither can consolidation loans that include one",
              "The interest waiver means your balance will not grow while you pay on time, which is a significant change from older income-driven plans",
              "If you work in qualifying public service, PSLF forgiveness after 120 payments is both faster and tax-free compared with waiting 360 payments under RAP",
            ]}
          />
        </div>

        <FinancialDisclosure variant="general" />

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

export default RapCalculator;
