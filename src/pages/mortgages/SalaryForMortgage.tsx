import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { CopyButton } from "@/components/CopyButton";
import { toast } from "sonner";
import { ArrowRight, PoundSterling } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const ACCENT = "#F97316";

const faqSchema = [
  { question: "How much salary do I need for a £250,000 mortgage?", answer: "At a 4× income multiple you would need a salary of £62,500. At 4.5× you would need £55,556. With two applicants, the combined income is used. A £250,000 mortgage at 5% over 25 years costs approximately £1,461 per month." },
  { question: "How much salary do I need for a £300,000 mortgage?", answer: "At a 4× income multiple you would need £75,000. At 4.5× income you would need £66,667. Use our calculator above to get the exact monthly payment and see how deposit size affects the figure." },
  { question: "How much salary do I need for a £400,000 mortgage?", answer: "At 4× income: £100,000. At 4.5× income: £88,889. Many high-street lenders cap at 4.5× but some specialist lenders offer 5× or 5.5× for professional borrowers with strong credit histories." },
  { question: "Can I get a mortgage at 5× my salary?", answer: "Yes, some lenders offer 5× income multiples for specific borrowers — typically those earning over £75,000, key workers under certain government schemes, or first-time buyers using certain products. This is less common and usually requires a clean credit record and low commitments." },
  { question: "Does my deposit size affect how much I can borrow?", answer: "Indirectly, yes. A larger deposit gives you a lower LTV (loan-to-value ratio), which unlocks better interest rates. A lower rate means a lower monthly payment, which means the lender's affordability assessment is easier to pass. A 10% deposit vs 5% deposit can unlock significantly better rates." },
  { question: "Do lenders use gross or net salary for mortgage affordability?", answer: "Lenders use gross salary (before tax and National Insurance). They then apply their own stress tests, typically assessing whether you could afford payments if rates rose to 6-8%. This is why the 'income multiple' is a guide — individual lender affordability assessments vary." },
  { question: "What is a joint mortgage income multiple?", answer: "For joint mortgages, most lenders use the combined gross income of both applicants. So two people earning £35,000 each (£70,000 combined) could borrow £280,000-£315,000 on 4× to 4.5× multiples. Some lenders use 100% of the highest earner's income plus 50% of the second income." },
];

type CalcResult = {
  loanNeeded: number;
  salaryAt4x: number;
  salaryAt45x: number;
  salaryAt5x: number;
  jointAt4x: number;
  jointAt45x: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  ltv: number;
  depositPct: number;
};

export default function SalaryForMortgage() {
  const [propertyPrice, setPropertyPrice] = useState("300000");
  const [deposit,       setDeposit]       = useState("30000");
  const [interestRate,  setInterestRate]  = useState("5.0");
  const [termYears,     setTermYears]     = useState("25");
  const [currency,      setCurrency]      = useState<Currency>("GBP");
  const [result,        setResult]        = useState<CalcResult | null>(null);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const price = searchParams.get("price");
    if (price) setPropertyPrice(price);
  }, [searchParams]);

  const calculate = () => {
    const price = parseFloat(propertyPrice);
    const dep   = parseFloat(deposit);
    const rate  = parseFloat(interestRate);
    const term  = parseInt(termYears);

    if (isNaN(price) || price <= 0) { toast.error("Please enter a valid property price"); return; }
    if (isNaN(dep) || dep < 0)      { toast.error("Please enter a valid deposit amount"); return; }
    if (dep >= price)               { toast.error("Deposit cannot exceed the property price"); return; }
    if (isNaN(rate) || rate <= 0)   { toast.error("Please enter a valid interest rate"); return; }
    if (isNaN(term) || term <= 0)   { toast.error("Please enter a valid term"); return; }

    const loan = price - dep;
    const r    = rate / 100 / 12;
    const n    = term * 12;
    const M    = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = M * n;

    setResult({
      loanNeeded:    Math.round(loan),
      salaryAt4x:   Math.round(loan / 4),
      salaryAt45x:  Math.round(loan / 4.5),
      salaryAt5x:   Math.round(loan / 5),
      jointAt4x:    Math.round(loan / 4 / 2),
      jointAt45x:   Math.round(loan / 4.5 / 2),
      monthlyPayment: Math.round(M * 100) / 100,
      totalInterest:  Math.round((total - loan) * 100) / 100,
      totalPayment:   Math.round(total * 100) / 100,
      ltv:            Math.round((loan / price) * 1000) / 10,
      depositPct:     Math.round((dep / price) * 1000) / 10,
    });
  };

  const sym = currencies[currency].symbol;
  const fmt = (n: number) => sym + n.toLocaleString();
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  return (
    <>
      <SEO
        title="What Salary Do I Need for a Mortgage? UK Calculator 2026"
        description="Find out exactly what salary you need for any UK mortgage. Enter property price and deposit to get the minimum single and joint salary required at 4×, 4.5× and 5× income multiples. Free, instant, no sign-up."
        keywords="what salary do I need for a mortgage, salary for mortgage calculator UK, mortgage affordability calculator, how much salary for mortgage, income multiple mortgage UK, mortgage salary calculator 2026, salary needed for £300000 mortgage UK"
        canonicalUrl="/mortgages/salary-for-mortgage"
        faqSchema={faqSchema}
        howToSchema={{
          name: "How to Calculate the Salary You Need for a UK Mortgage",
          steps: [
            { name: "Enter the property price", text: "Type in the full asking price or market value of the property you want to buy." },
            { name: "Enter your deposit", text: "Enter how much deposit you have saved. The calculator will show you the loan amount needed." },
            { name: "Set the interest rate", text: "Enter the mortgage rate you have been quoted or use the current average of around 5.0% for 2026." },
            { name: "Choose your term", text: "Select how many years you want to repay over. 25 years is typical; 30-35 years is increasingly common for first-time buyers." },
            { name: "Read your results", text: "The calculator shows the minimum salary required at 4×, 4.5×, and 5× income multiples — for both single and joint applications." },
          ],
          estimatedTime: "PT1M",
        }}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Salary for Mortgage Calculator UK",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org/mortgages/salary-for-mortgage",
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/mortgages" className="hover:text-white transition-colors">Mortgages</Link>
            <span>/</span>
            <span className="text-white/60">Salary for Mortgage</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="sr-only">Salary for Mortgage Calculator UK 2026</h1>
            <div aria-hidden="true" className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[10vw] lg:text-[82px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #fbbf24 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                SALARY
              </span>
              <span
                className="block text-[10vw] lg:text-[82px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #fbbf24 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FOR
              </span>
              <span
                className="block text-[6vw] lg:text-[50px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                MORTGAGE
              </span>
            </div>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Find out exactly what salary you need to secure a UK mortgage on any property. See single and joint income requirements at 4×, 4.5×, and 5× multiples — plus your monthly payment.
              </p>
            </div>

            {result && (
              <div className="mt-10 space-y-4">
                {/* Loan needed hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Mortgage Needed</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{fmt(result.loanNeeded)}</p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    LTV: {result.ltv}% — Deposit: {result.depositPct}%
                  </p>
                </div>

                {/* Salary table */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/8">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30">Minimum Salary Required</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="px-5 py-2 text-left text-[9px] font-heading uppercase tracking-widest text-white/25">Multiple</th>
                        <th className="px-5 py-2 text-left text-[9px] font-heading uppercase tracking-widest text-white/25">Single</th>
                        <th className="px-5 py-2 text-left text-[9px] font-heading uppercase tracking-widest text-white/25">Joint (each)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "4× income", single: result.salaryAt4x,  joint: result.jointAt4x,  highlight: false },
                        { label: "4.5× income", single: result.salaryAt45x, joint: result.jointAt45x, highlight: true },
                        { label: "5× income", single: result.salaryAt5x,  joint: Math.round(result.loanNeeded / 5 / 2), highlight: false },
                      ].map(row => (
                        <tr
                          key={row.label}
                          className="border-b border-white/[0.04]"
                          style={row.highlight ? { backgroundColor: `${ACCENT}10` } : {}}
                        >
                          <td className="px-5 py-3 font-heading text-[10px] uppercase tracking-widest" style={{ color: row.highlight ? ACCENT : "rgba(255,255,255,0.4)" }}>
                            {row.label}
                            {row.highlight && <span className="ml-2 text-[8px] opacity-60">typical</span>}
                          </td>
                          <td className="px-5 py-3 font-heading text-sm text-white">{fmt(row.single)}</td>
                          <td className="px-5 py-3 font-heading text-sm text-white/60">{fmt(row.joint)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Payment stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Monthly Payment", value: fmt(result.monthlyPayment) },
                    { label: "Total Interest", value: fmt(result.totalInterest) },
                    { label: "Total Repaid", value: fmt(result.totalPayment) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-base text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Mortgage Needed", value: fmt(result.loanNeeded) },
                  { label: "LTV", value: `${result.ltv}%` },
                  { label: "Salary at 4×", value: fmt(result.salaryAt4x) },
                  { label: "Salary at 4.5×", value: fmt(result.salaryAt45x) },
                  { label: "Salary at 5×", value: fmt(result.salaryAt5x) },
                  { label: "Monthly Payment", value: fmt(result.monthlyPayment) },
                  { label: "Total Interest", value: fmt(result.totalInterest) },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl uppercase text-white tracking-wide">Your Property</h2>
                <PoundSterling className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                <div>
                  <label className={labelClass}>Property Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number" min="0" step="1000"
                      value={propertyPrice}
                      onChange={e => setPropertyPrice(e.target.value)}
                      placeholder="300,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Your Deposit</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number" min="0" step="1000"
                      value={deposit}
                      onChange={e => setDeposit(e.target.value)}
                      placeholder="30,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {parseFloat(deposit) > 0 && parseFloat(propertyPrice) > 0 && (
                    <p className="mt-1.5 text-[10px] font-heading uppercase tracking-widest" style={{ color: `${ACCENT}80` }}>
                      {Math.round((parseFloat(deposit) / parseFloat(propertyPrice)) * 100)}% deposit
                      — {Math.round((1 - parseFloat(deposit) / parseFloat(propertyPrice)) * 100)}% LTV
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Mortgage Rate</label>
                    <div className="relative">
                      <input
                        type="number" step="0.1" min="0"
                        value={interestRate}
                        onChange={e => setInterestRate(e.target.value)}
                        placeholder="5.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Term</label>
                    <div className="relative">
                      <input
                        type="number" min="5" max="40" step="1"
                        value={termYears}
                        onChange={e => setTermYears(e.target.value)}
                        placeholder="25"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">YRS</span>
                    </div>
                  </div>
                </div>

                {/* Quick result preview in form */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Salary needed (4.5×)</span>
                      <span className="font-heading text-lg" style={{ color: ACCENT }}>{fmt(result.salaryAt45x)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Monthly payment</span>
                      <span className="font-heading text-white/70">{fmt(result.monthlyPayment)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={calculate}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Required Salary
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Related tools */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/30 mb-4">Related Mortgage Tools</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Mortgage Calculator", path: "/finance/mortgage" },
              { label: "Mortgage Overpayment", path: "/finance/mortgage-overpayment" },
              { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
              { label: "Mortgage Cost Comparison", path: "/finance/mortgage-cost-comparison" },
              { label: "All Mortgage Tools", path: "/mortgages" },
            ].map(t => (
              <Link
                key={t.path}
                to={t.path}
                className="flex items-center gap-1.5 px-4 py-2 border border-white/10 text-[10px] font-heading uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all rounded-sm"
              >
                {t.label} <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Static content + disclaimer */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is This Calculator For?",
              description: "This calculator answers the single most important question for anyone looking to buy property in the UK: what salary do I actually need? It uses the standard income multiple approach that UK mortgage lenders use — typically 4×, 4.5×, or 5× your gross annual income — and combines it with a full mortgage repayment calculation so you can see both the borrowing threshold and the monthly cost. Unlike lender's own affordability tools, this gives you a clean, transparent view of the numbers before you approach any bank or broker."
            }}
            howItWorks={{
              title: "How UK Mortgage Affordability Works",
              description: "UK lenders assess affordability in two stages: an income multiple check and a detailed affordability assessment.",
              steps: [
                { step: 1, title: "Income Multiple (Stage 1)", description: "Most lenders will lend a maximum of 4× to 4.5× your gross annual income. So a £50,000 salary typically supports a mortgage of £200,000-£225,000. Some lenders offer 5× or 5.5× for specific borrowers." },
                { step: 2, title: "Affordability Assessment (Stage 2)", description: "The lender also stress-tests whether you could afford the monthly payments if interest rates rose to 6-8%. They check your outgoings, existing debts, dependants, and credit commitments. This is where some borrowers fail even when the income multiple is met." },
                { step: 3, title: "Deposit & LTV", description: "A larger deposit gives you a lower loan-to-value ratio. This unlocks better rates — the difference between a 95% LTV and 75% LTV mortgage can be 1.5-2% in interest rate, which significantly changes your monthly payment and total cost." },
                { step: 4, title: "Joint Applications", description: "Two incomes are combined for the affordability assessment. Our calculator shows the per-person salary each joint applicant needs if both earn equally — adjust for situations where incomes differ." },
              ]
            }}
            formula={{
              title: "Income Multiple Formula",
              formula: "Max Mortgage = Gross Annual Salary × Income Multiple (4× to 5×)",
              explanation: "Lenders use: Maximum loan = Gross annual income × lender's income cap. The most common cap is 4.5×. Monthly payment uses the amortisation formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the mortgage amount, r is monthly rate (annual rate ÷ 12), and n is total months. This calculator solves the inverse: given P, what income is needed at each multiple?"
            }}
            faqs={faqSchema}
            tips={[
              "The 4.5× income multiple is the most commonly used — use this as your planning baseline",
              "A 10% deposit unlocks significantly better rates than 5% — even saving an extra 2-3% can save thousands over the term",
              "Lenders stress-test at 6-8% rate — make sure you could still afford the payment if rates rose",
              "Pay off any existing debts before applying — credit card balances and car finance reduce what you can borrow",
              "Joint applications are powerful — two modest salaries can access mortgages that neither could alone",
              "A mortgage broker can access deals not available direct — often worth the fee on larger mortgages",
            ]}
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
}
