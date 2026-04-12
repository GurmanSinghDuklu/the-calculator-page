import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { toast } from "sonner";
import { ArrowRight, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

const creditCardStaticContent = {
  whatIs: {
    title: "What is a Credit Card Payoff Calculator?",
    description: "A credit card payoff calculator helps you understand exactly how long it will take to pay off your credit card balance and how much you'll pay in total interest."
  },
  howItWorks: {
    title: "How Does This Calculator Work?",
    description: "This calculator uses your card's APR with daily compounding to determine how many months of payments you'll need to eliminate your balance.",
    steps: [
      { step: 1, title: "Enter Current Balance",    description: "Input the total amount you currently owe on your credit card" },
      { step: 2, title: "Add Your APR",             description: "Enter the annual percentage rate shown on your credit card statement" },
      { step: 3, title: "Set Monthly Payment",      description: "Choose how much you can afford to pay each month toward your balance" },
      { step: 4, title: "View Your Payoff Timeline", description: "See how many months until you're debt-free and your total interest cost" }
    ]
  },
  formula: {
    title: "The Credit Card Payoff Formula",
    formula: "N = -log(1 - (P × i) / A) / log(1 + i)",
    explanation: "Where N is months to payoff, P is the principal balance, i is the monthly interest rate (from daily compounding), and A is your fixed monthly payment."
  },
  faqs: [
    { question: "Why does credit card interest compound daily?", answer: "Most credit cards calculate interest daily based on your average daily balance, then add it monthly. This makes credit card debt grow faster than loans with monthly compounding." },
    { question: "What happens if I only pay the minimum?", answer: "Paying only the minimum keeps you in debt much longer. Minimum payments are designed to primarily cover interest, so your principal decreases very slowly." },
    { question: "How can I pay off my credit card faster?", answer: "Increase monthly payments, make bi-weekly payments, apply extra income to your balance, or consider a balance transfer card with 0% intro APR." },
    { question: "What is a good credit card APR?", answer: "Average APRs range from 15–25%. Cards under 15% are considered good, while rates over 20% are on the higher end." },
    { question: "Should I close my card after paying it off?", answer: "Not necessarily — closing a card can hurt your credit score by reducing available credit and shortening credit history." }
  ],
  tips: [
    "Always pay more than the minimum to reduce your balance faster",
    "Use the debt avalanche method: pay off highest APR cards first",
    "Look into balance transfer cards with 0% introductory APR",
    "Set up automatic payments to never miss a due date",
    "Track your progress monthly to stay motivated"
  ]
};

export default function CreditCardPayoff() {
  const [balance, setBalance]               = useState("5000");
  const [apr, setApr]                       = useState("18");
  const [monthlyPayment, setMonthlyPayment] = useState("200");
  const [currency, setCurrency]             = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);

  const calculatePayoff = () => {
    const P = parseFloat(balance);
    const r = parseFloat(apr);
    const A = parseFloat(monthlyPayment);
    if (isNaN(P) || isNaN(r) || isNaN(A) || P <= 0 || A <= 0) {
      toast.error("Please enter valid positive numbers");
      return;
    }
    const i = Math.pow(1 + r / 100 / 365, 365 / 12) - 1;
    if (A <= P * i) {
      toast.error("Monthly payment is too low — it must exceed the monthly interest charge.");
      return;
    }
    const N = -Math.log(1 - (P * i) / A) / Math.log(1 + i);
    const totalPaid = A * N;
    setResult({ monthsToPayoff: N, totalInterest: totalPaid - P, totalPaid });
  };

  const sym = currencies[currency].symbol;
  const seo = seoData["/finance/credit-card-payoff"];
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`https://www.thecalculatorpage.com/finance/credit-card-payoff`}
        faqSchema={creditCardStaticContent.faqs}
        howToSchema={{
          name: "How to Calculate Credit Card Payoff Time",
          steps: creditCardStaticContent.howItWorks.steps?.map(s => ({ name: s.title, text: s.description })) || []
        }}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Credit Card Payoff Calculator",
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
            <span className="text-white/60">Credit Card Payoff</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[11vw] lg:text-[90px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                CREDIT
              </span>
              <span
                className="block text-[11vw] lg:text-[90px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CARD
              </span>
              <span
                className="block text-[7vw] lg:text-[58px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                PAYOFF
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                See exactly how long it will take to pay off your credit card debt and how much interest you'll pay along the way.
              </p>
            </div>

            {/* Result stats on left */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Time to Pay Off</p>
                  <p className="font-display text-4xl" style={{ color: ACCENT }}>
                    {Math.ceil(result.monthsToPayoff)} <span className="text-2xl text-white/40">months</span>
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">
                    ≈ {(result.monthsToPayoff / 12).toFixed(1)} years
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Interest", value: `${sym}${result.totalInterest.toFixed(2)}` },
                    { label: "Total Paid",     value: `${sym}${result.totalPaid.toFixed(2)}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-xl text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Months to Pay Off", value: `${Math.ceil(result.monthsToPayoff)}` },
                  { label: "Time to Pay Off", value: `${(result.monthsToPayoff / 12).toFixed(1)} years` },
                  { label: "Total Interest", value: `${sym}${result.totalInterest.toFixed(2)}` },
                  { label: "Total Paid", value: `${sym}${result.totalPaid.toFixed(2)}` },
                ]} />
              </div>
            )}
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
                <CreditCard className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Currency */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <CurrencySelector value={currency} onChange={setCurrency} />
                </div>

                {/* Balance */}
                <div>
                  <label className={labelClass}>Current Balance</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number" step="1" min="0"
                      value={balance}
                      onChange={e => setBalance(e.target.value)}
                      placeholder="5,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* APR + Monthly Payment */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>APR</label>
                    <div className="relative">
                      <input
                        type="number" step="0.1" min="0"
                        value={apr}
                        onChange={e => setApr(e.target.value)}
                        placeholder="18.0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">%</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Payment</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading text-sm">{sym}</span>
                      <input
                        type="number" step="1" min="0"
                        value={monthlyPayment}
                        onChange={e => setMonthlyPayment(e.target.value)}
                        placeholder="200"
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
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Payoff Time</span>
                      <span className="text-3xl font-display text-white">
                        {Math.ceil(result.monthsToPayoff)} <span className="text-lg text-white/40">mo</span>
                      </span>
                    </div>
                    {[
                      { label: "Total Interest", value: `${sym}${result.totalInterest.toFixed(2)}`, accent: true },
                      { label: "Total Paid",     value: `${sym}${result.totalPaid.toFixed(2)}` },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="font-heading" style={{ color: accent ? ACCENT : "rgba(255,255,255,0.7)" }}>{value}</span>
                      </div>
                    ))}
                    <p className="text-[10px] text-white/20 font-sans pt-1">
                      Approx. {(result.monthsToPayoff / 12).toFixed(1)} years to become debt-free.
                    </p>
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculatePayoff}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Payoff Time
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content + disclaimer below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent {...creditCardStaticContent} />
        </div>

        <FinancialDisclosure variant="general" />

        <FinancialDisclosure variant="general" />

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
}