import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

const ACCENT = "#3B82F6";

export default function IrrCalculator() {
  const [invested, setInvested] = useState("10000");
  const [returned, setReturned] = useState("15000");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{
    gain: number;
    roi: number;
    annualisedRoi: number;
    length: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fmt = (n: number) =>
    n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    setError(null);
    const inv = parseFloat(invested.replace(/,/g, ""));
    const ret = parseFloat(returned.replace(/,/g, ""));
    const yrs = parseFloat(years);

    if (isNaN(inv) || isNaN(ret) || isNaN(yrs)) {
      setError("Please fill in all fields with valid numbers.");
      return;
    }
    if (inv <= 0) { setError("Amount invested must be greater than zero."); return; }
    if (yrs <= 0) { setError("Investment length must be greater than zero."); return; }

    const gain = ret - inv;
    const roi = (gain / inv) * 100;
    const annualisedRoi = (Math.pow(ret / inv, 1 / yrs) - 1) * 100;

    setResult({ gain, roi, annualisedRoi, length: yrs });
  };

  const seo = seoData["/finance/irr"] ?? {
    title: "ROI Calculator – Return on Investment",
    description: "Calculate your return on investment, annualised ROI, and investment gain instantly.",
    keywords: "ROI calculator, return on investment, annualised ROI"
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium placeholder-white/20 focus:outline-none transition-all";

  const faqSchema = [
    { question: "What is ROI (Return on Investment)?", answer: "ROI measures the profitability of an investment as a percentage of its cost. ROI = (Gain / Amount Invested) × 100. A positive ROI means you made a profit; negative means a loss." },
    { question: "What is annualised ROI?", answer: "Annualised ROI adjusts the return to reflect a per-year rate, making it easier to compare investments of different durations. It is calculated as: (Return / Invested)^(1/years) - 1." },
    { question: "What is a good ROI?", answer: "A good ROI depends on the asset class. Stock market investments historically return around 8–10% per year. Real estate typically returns 4–10%. Always compare against your cost of capital or alternative investments." },
    { question: "What is the difference between ROI and IRR?", answer: "ROI measures total return without accounting for time. IRR (Internal Rate of Return) accounts for the timing and size of cash flows over multiple periods, making it more accurate for complex investments." }
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl="https://www.thecalculatorapp.org/finance/irr"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ROI Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org"
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
            <span className="text-white/60">ROI Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Title + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[20vw] lg:text-[150px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                ROI
              </span>
              <span
                className="block text-[7vw] lg:text-[58px] mt-1"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}
              >
                CALCULATOR
              </span>
            </h1>

            {/* Description */}
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate your Return on Investment, annualised rate, and total gain from any investment. Enter the amount invested, the amount returned, and the time period.
              </p>
            </div>

            {/* Formula */}
            <div className="mt-6 max-w-sm">
              <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mb-2">Formula</p>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3">
                <p className="text-xs text-white/50 font-mono leading-relaxed">
                  ROI = (Gain ÷ Amount Invested) × 100<br />
                  Annualised ROI = (Return ÷ Invested)^(1÷Years) − 1
                </p>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Investment Gain */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Investment Gain</p>
                  <p className="font-display text-5xl" style={{ color: result.gain >= 0 ? ACCENT : "#ef4444" }}>
                    {result.gain >= 0 ? "+" : ""}£{fmt(result.gain)}
                  </p>
                  <p className="text-xs text-white/25 font-sans mt-1">over {result.length} year{result.length !== 1 ? "s" : ""}</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "ROI", value: `${fmt(result.roi)}%` },
                    { label: "Annualised ROI", value: `${fmt(result.annualisedRoi)}%` },
                    { label: "Length", value: `${result.length} yr${result.length !== 1 ? "s" : ""}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-base text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <CopyButton
                  accentColor={ACCENT}
                  results={[
                    { label: "Amount Invested", value: `£${fmt(parseFloat(invested))}` },
                    { label: "Amount Returned", value: `£${fmt(parseFloat(returned))}` },
                    { label: "Investment Gain", value: `${result.gain >= 0 ? "+" : ""}£${fmt(result.gain)}` },
                    { label: "ROI", value: `${fmt(result.roi)}%` },
                    { label: "Annualised ROI", value: `${fmt(result.annualisedRoi)}%` },
                    { label: "Investment Length", value: `${result.length} year${result.length !== 1 ? "s" : ""}` },
                  ]}
                />
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

              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl uppercase text-white tracking-wide">Calculate</h2>
                <TrendingUp className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Amount Invested */}
                <div>
                  <label className={labelClass}>Amount Invested (£)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={invested}
                    onChange={e => setInvested(e.target.value)}
                    placeholder="10000"
                    className={inputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Amount Returned */}
                <div>
                  <label className={labelClass}>Amount Returned (£)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={returned}
                    onChange={e => setReturned(e.target.value)}
                    placeholder="15000"
                    className={inputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Investment Length */}
                <div>
                  <label className={labelClass}>Investment Length (Years)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.5"
                    value={years}
                    onChange={e => setYears(e.target.value)}
                    placeholder="5"
                    className={inputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              </div>

              {/* Result preview in card */}
              {result && (
                <div className="pt-5 mt-5 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-end pb-3 border-b border-white/10">
                    <span className="text-white/40 text-sm font-heading uppercase tracking-widest">ROI</span>
                    <span className="text-3xl font-display" style={{ color: ACCENT }}>{fmt(result.roi)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Annualised ROI</span>
                    <span className="text-white/70 font-heading">{fmt(result.annualisedRoi)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Gain</span>
                    <span className="text-white/70 font-heading">{result.gain >= 0 ? "+" : ""}£{fmt(result.gain)}</span>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-5 p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                  <p className="text-xs text-red-400 font-sans">{error}</p>
                </div>
              )}

              {/* Calculate button */}
              <button
                onClick={calculate}
                className="w-full mt-6 group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
              >
                Calculate ROI
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
        </div>

        {/* ── Deep Educational Content (AI citation target) ── */}
        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-0">

          {/* Definition */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">What Is ROI?</p>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
              Return on Investment (ROI) is a financial ratio that measures the profitability of an investment relative to its cost. It expresses how much you gained (or lost) as a percentage of what you originally put in. ROI is one of the most widely used metrics in finance — from evaluating stock picks to assessing whether a business expansion paid off.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl mt-3">
              A positive ROI means the investment returned more than it cost. A negative ROI means you lost money. Because ROI doesn't account for time, longer investments with high ROI may actually be less efficient than shorter ones — which is why <strong className="text-white/80">annualised ROI</strong> (also called CAGR) is the more useful figure when comparing investments of different lengths.
            </p>
          </section>

          {/* Formula + worked example */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">The ROI Formula — Explained</p>
            <div className="bg-black/40 border border-white/10 rounded-lg px-6 py-4 font-mono text-sm text-zinc-200 mb-6 max-w-xl">
              ROI = (Gain ÷ Amount Invested) × 100<br />
              Annualised ROI = (Return ÷ Invested)^(1÷Years) − 1
            </div>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">Worked Example</p>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 max-w-2xl space-y-3 text-sm text-zinc-300">
              <p>You invest <strong className="text-white">£10,000</strong> in a stocks and shares ISA. Five years later your portfolio is worth <strong className="text-white">£15,000</strong>.</p>
              <div className="border-t border-white/10 pt-3 space-y-1">
                <p>Gain = £15,000 − £10,000 = <strong className="text-white">£5,000</strong></p>
                <p>ROI = (£5,000 ÷ £10,000) × 100 = <strong className="text-white">50%</strong></p>
                <p>Annualised ROI = (15,000 ÷ 10,000)^(1÷5) − 1 = <strong className="text-white">8.45% per year</strong></p>
              </div>
              <p className="text-zinc-400 text-xs mt-2">That 8.45% annual figure is what you should compare against other investments — not the headline 50%, which sounds impressive but took 5 years to achieve.</p>
            </div>
          </section>

          {/* What is a good ROI */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">What Is a Good ROI?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[
                { asset: "UK Stocks (FTSE All-Share)", roi: "~7–8% annualised", note: "Historical long-run average, before inflation" },
                { asset: "Global Equities (MSCI World)", roi: "~8–10% annualised", note: "Historical average; past performance ≠ future results" },
                { asset: "UK Residential Property", roi: "~4–8% total return", note: "Capital growth + rental yield combined" },
                { asset: "UK Savings Accounts", roi: "3–5% AER", note: "As of 2026; risk-free but below long-run equity returns" },
                { asset: "Cash ISA", roi: "3.5–5% AER", note: "Tax-free; compare AER not headline rate" },
                { asset: "UK Gilts (10yr)", roi: "~4% yield", note: "Government bonds; low risk, fixed return" },
              ].map(row => (
                <div key={row.asset} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[10px] font-heading uppercase tracking-widest text-white/40 mb-1">{row.asset}</p>
                  <p className="text-white font-medium text-sm mb-1">{row.roi}</p>
                  <p className="text-zinc-500 text-xs">{row.note}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-400 text-xs mt-2">Sources: <a href="https://www.moneyhelper.org.uk/en/savings/types-of-savings/savings-accounts-explained" target="_blank" rel="noopener noreferrer" className="text-white/60 underline hover:text-white transition-colors">MoneyHelper</a>, <a href="https://www.vanguard.co.uk/professional/en/insights/research/capital-markets-model-faqs" target="_blank" rel="noopener noreferrer" className="text-white/60 underline hover:text-white transition-colors">Vanguard UK</a>, <a href="https://www.nerdwallet.com/uk/investing/roi-calculator/" target="_blank" rel="noopener noreferrer" className="text-white/60 underline hover:text-white transition-colors">NerdWallet UK</a></p>
          </section>

          {/* ROI vs CAGR vs IRR */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">ROI vs CAGR vs IRR — What's the Difference?</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-zinc-300">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">Metric</th>
                    <th className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">What it measures</th>
                    <th className="text-left py-3 text-[10px] font-heading uppercase tracking-widest text-white/40">When to use it</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-6 font-medium text-white">ROI</td>
                    <td className="py-3 pr-6">Total percentage gain over the full investment period</td>
                    <td className="py-3 text-zinc-400">Comparing total return on a single investment</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-6 font-medium text-white">CAGR / Annualised ROI</td>
                    <td className="py-3 pr-6">The smoothed annual growth rate over multiple years</td>
                    <td className="py-3 text-zinc-400">Comparing investments of different durations</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-6 font-medium text-white">IRR</td>
                    <td className="py-3 pr-6">The discount rate that makes NPV of cash flows zero</td>
                    <td className="py-3 text-zinc-400">Complex projects with multiple cash flows over time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-6">Frequently Asked Questions</p>
            <div className="space-y-6 max-w-3xl">
              {[
                { q: "What is a good ROI?", a: "For UK equity investments, a long-run annualised ROI of 7–10% is generally considered good. UK savings accounts currently offer 3–5% AER. Anything above 10% per year consistently is exceptional — and often comes with higher risk." },
                { q: "What's the difference between ROI and profit?", a: "Profit is the raw pound gain (Return − Cost). ROI expresses that profit as a percentage of the original investment, making it easier to compare two different-sized investments. A £500 profit on a £1,000 investment (50% ROI) is far more impressive than £500 profit on a £100,000 investment (0.5% ROI)." },
                { q: "Why does annualised ROI matter?", a: "A 50% total ROI over 5 years sounds great — but it works out to only 8.45% per year, which is roughly in line with the long-run FTSE return. Annualised ROI lets you compare investments of different lengths on equal footing." },
                { q: "Does ROI account for inflation?", a: "No. A nominal ROI of 5% when inflation is 4% means your real return is closer to 1%. To get real ROI, subtract the inflation rate from your annualised ROI. For long-term planning, always consider both." },
                { q: "Is ROI the same as IRR?", a: "No. ROI is a simple ratio (gain / cost). IRR (Internal Rate of Return) is a more complex measure used for projects with multiple cash flows over time — it finds the discount rate that makes the net present value of those cash flows zero. For simple buy/sell investments, ROI (or annualised ROI) is the right tool." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <p className="text-white font-medium text-sm mb-2">{q}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="border border-white/8 bg-white/[0.015] px-8 py-8">
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Related Calculators</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Compound Interest Calculator", path: "/finance/compound-interest" },
                { label: "Savings Calculator", path: "/finance/savings" },
                { label: "ISA Calculator", path: "/finance/isa-calculator" },
                { label: "Retirement Calculator", path: "/finance/retirement" },
              ].map(link => (
                <a key={link.path} href={link.path} className="px-4 py-2 rounded-lg text-xs font-heading uppercase tracking-wider text-white/60 border border-white/10 hover:border-white/30 hover:text-white transition-all">{link.label}</a>
              ))}
            </div>
          </section>
        </div>

        <FinancialDisclosure variant="investment" />

        {/* Footer */}
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
