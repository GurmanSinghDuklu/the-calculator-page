import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { mortgageSchema } from "@/lib/validation";
import { toast } from "sonner";
import { Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Property category ─────────────────────────────────────
const ACCENT = "#F97316"; // accent-orange

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("70000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    principalAndInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
    totalPayment: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rateAnnual = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);
    const tax = parseFloat(propertyTax) / 12;
    const insurance = parseFloat(homeInsurance) / 12;

    try {
      mortgageSchema.parse({ homePrice: price, downPayment: down, interestRate: rateAnnual, loanTerm: termYears });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
      return;
    }

    const rate = rateAnnual / 100 / 12;
    const term = termYears * 12;
    const loanAmount = price - down;
    const principalAndInterest =
      rate === 0
        ? loanAmount / term
        : (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const monthlyPayment = principalAndInterest + tax + insurance;
    const totalPayment = principalAndInterest * term;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      principalAndInterest: Math.round(principalAndInterest * 100) / 100,
      monthlyTax: Math.round(tax * 100) / 100,
      monthlyInsurance: Math.round(insurance * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
    });
  };

  const sym = currencies[currency].symbol;
  const downPct = homePrice && downPayment
    ? ((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)
    : null;

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  const faqSchema = [
    { question: "How much can I actually borrow?", answer: "Most UK lenders will offer somewhere between 4 and 4.5 times your annual income — so if you earn £50,000, you're looking at a maximum loan of roughly £200,000–£225,000. Some lenders stretch to 5x or even 5.5x for higher earners or certain professions. But here's the thing: borrowing the maximum isn't always wise. A good rule of thumb is keeping your total monthly housing costs (mortgage, insurance, any service charge) below 30–35% of your take-home pay. Use the calculator to work backwards from a monthly payment you're comfortable with." },
    { question: "What's the difference between the interest rate and the APRC?", answer: "The interest rate is what you're charged on the loan itself. The APRC (Annual Percentage Rate of Charge) is the bigger number — it includes the interest rate plus fees, arrangement costs, and any other charges rolled up over the full term. Always compare APRC figures when comparing mortgage deals, not just the headline rate. A deal with a flashy low rate but high fees can end up costing more overall, especially if you're only fixing for 2–5 years." },
    { question: "Should I go for a longer or shorter mortgage term?", answer: "It's a genuine trade-off. A 25-year term on £200,000 at 5% gives you monthly payments of around £1,169 and total interest of about £150,000. Stretch that to 35 years and your monthly drops to £1,005 — but you pay closer to £221,000 in interest. The shorter term is cheaper overall but tighter month to month. Many people start with a longer term to keep payments manageable, then overpay when they can. That's a sensible approach — you get the breathing room without being locked in." },
    { question: "How much deposit do I need?", answer: "The minimum is usually 5% of the purchase price (95% LTV mortgages), but the rates get meaningfully better at 10%, then again at 15%, and again at 25%+. With a 5% deposit you'll pay a noticeably higher interest rate than someone putting down 25%, which adds up to a lot of extra money over a 25-year term. If you can save a bit longer to reach a lower LTV tier, it's often worth it. First-time buyers should also check whether the Lifetime ISA (LISA) applies — the government adds a 25% bonus on savings up to £4,000 per year." },
    { question: "What actually affects my mortgage rate?", answer: "Several things. Your loan-to-value (LTV) ratio is the biggest one — the more equity or deposit you have, the better rate you'll access. Your credit history matters too, particularly whether you have any missed payments, defaults or CCJs in the last 6 years. The type of mortgage (fixed vs tracker), the term length, and which lender you choose all play a role. The wider economy matters as well — rates follow the Bank of England base rate broadly, though individual lender pricing varies. A mortgage broker can often access deals not available directly from lenders, especially if your situation is slightly unusual." }
  ];

  return (
    <>
      <SEO
        title="Mortgage Calculator UK"
        description="Free UK mortgage calculator. Calculate monthly payments, total cost and see full amortisation schedules including tax and insurance."
        keywords="mortgage calculator, mortgage payment calculator, home loan calculator, monthly mortgage payment, UK mortgage calculator, US mortgage calculator, FHA calculator, PMI calculator"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Mortgage Calculator",
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
            <span className="text-white/60">Mortgage Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
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
                className="block text-[13vw] lg:text-[110px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #ef4444 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                MORTGAGE
              </span>
              <span
                className="block text-[9vw] lg:text-[75px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-10 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate your monthly mortgage payment including principal, interest, property tax, and home insurance.
              </p>
            </div>

            {/* Quick stats if result exists */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Loan Amount",     value: `${sym}${result.loanAmount.toLocaleString()}` },
                    { label: "Total Interest",  value: `${sym}${result.totalInterest.toLocaleString()}` },
                    { label: "Total Payment",   value: `${sym}${result.totalPayment.toLocaleString()}` },
                    { label: "Down Payment",    value: `${downPct}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-xl text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Monthly Payment", value: `${sym}${result.monthlyPayment.toLocaleString()}` },
                  { label: "Total Payment", value: `${sym}${result.totalPayment.toLocaleString()}` },
                  { label: "Total Interest", value: `${sym}${result.totalInterest.toLocaleString()}` },
                  { label: "Loan Amount", value: `${sym}${result.loanAmount.toLocaleString()}` },
                ]} />
              </div>
            )}
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
                <Home className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Home Price */}
                <div>
                  <label className={labelClass}>Home Price ({sym})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={homePrice}
                      onChange={e => setHomePrice(e.target.value)}
                      placeholder="350,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label className={labelClass}>Down Payment ({sym})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={e => setDownPayment(e.target.value)}
                      placeholder="70,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {downPct && (
                    <p className="text-[10px] font-heading uppercase tracking-widest mt-1" style={{ color: ACCENT }}>
                      {downPct}% down
                    </p>
                  )}
                </div>

                {/* Rate + Term */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Interest Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={e => setInterestRate(e.target.value)}
                        placeholder="6.5"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Loan Term</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={e => setLoanTerm(e.target.value)}
                        placeholder="30"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Tax + Insurance */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Property Tax (yr)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number"
                        value={propertyTax}
                        onChange={e => setPropertyTax(e.target.value)}
                        placeholder="3000"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Home Insurance (yr)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number"
                        value={homeInsurance}
                        onChange={e => setHomeInsurance(e.target.value)}
                        placeholder="1200"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Monthly Payment</span>
                      <span className="text-3xl font-display text-white">{sym}{result.monthlyPayment.toLocaleString()}</span>
                    </div>
                    {[
                      { label: "Principal & Interest", value: result.principalAndInterest },
                      { label: "Property Tax",         value: result.monthlyTax },
                      { label: "Home Insurance",       value: result.monthlyInsurance },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="text-white/70 font-heading">{sym}{value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateMortgage}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 px-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 20px -5px ${ACCENT}80`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Mortgage
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "What does a mortgage calculator actually tell you?",
              description: "A mortgage calculator takes three numbers — how much you're borrowing, the interest rate, and how long you're spreading the repayments — and works out what you'll pay each month. That's it. But knowing that monthly number is genuinely useful before you commit to anything.\n\nHere's the thing most people miss: the calculator shows you what the mortgage costs, not necessarily what you can afford. Those are different questions. A lender might approve you for £300,000, but if the monthly payments leave you nothing for groceries, that's not the right mortgage. Use the calculator to find a payment you're comfortable with first, then work backwards to the loan amount."
            }}
            howItWorks={{
              title: "How to use this calculator",
              description: "Put in the numbers you actually know, not the numbers you hope for. The result is only as useful as the inputs.",
              steps: [
                { step: 1, title: "Property price and deposit", description: "Enter the property price and how much deposit you have. The difference is your loan amount (LTV). Getting this right matters — your rate changes at key deposit thresholds like 10%, 15% and 25%." },
                { step: 2, title: "Interest rate", description: "Use the actual rate from a real mortgage offer or quote, not a guess. If you don't have one yet, use the current average for your LTV bracket as a starting point — but know it'll shift." },
                { step: 3, title: "Mortgage term", description: "How many years are you planning to repay over? Most UK mortgages run 25–35 years. A longer term reduces your monthly payment but increases total interest paid significantly." },
                { step: 4, title: "Read the total, not just the monthly", description: "Scroll down past the monthly figure and look at the total interest over the full term. That number is often a shock — and a useful reminder that overpaying when you can makes a real difference." }
              ]
            }}
            formula={{
              title: "The formula lenders use",
              formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
              explanation: "M is your monthly payment, P is the loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments. So a £200,000 mortgage at 4.5% over 25 years: monthly rate = 0.045/12 = 0.00375, n = 300 payments, giving a monthly payment of £1,111. The maths is fiddly but the calculator handles all of it instantly."
            }}
            tips={[
              "Run the numbers before you find a property you love — it keeps emotions out of the budget conversation",
              "Compare the total interest cost of a 25-year versus 30-year term, not just the monthly payment difference",
              "Even overpaying £100 a month on a typical UK mortgage can cut years off the term and save tens of thousands",
              "A mortgage broker can often access deals not available direct from lenders — worth the conversation especially for first-time buyers",
              "Factor in all the other costs too: stamp duty, solicitor fees, survey, buildings insurance, and any service charges"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="mortgage" />

        <FinancialDisclosure variant="mortgage" />

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

export default MortgageCalculator;