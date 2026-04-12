import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";

type Country = "UK" | "US";
type FilingStatus = "single" | "married_joint" | "married_separate" | "head_household";

// ─── Tax logic (100% unchanged) ───────────────────────────────────────────────
const ukPersonalAllowance = 12570;
const ukBasicRateThreshold = 50270;
const ukHigherRateThreshold = 125140;

const usTaxBrackets: Record<FilingStatus, { min: number; max: number; rate: number }[]> = {
  single:           [{ min: 0, max: 11600, rate: .10 },{ min: 11600, max: 47150, rate: .12 },{ min: 47150, max: 100525, rate: .22 },{ min: 100525, max: 191950, rate: .24 },{ min: 191950, max: 243725, rate: .32 },{ min: 243725, max: 609350, rate: .35 },{ min: 609350, max: Infinity, rate: .37 }],
  married_joint:    [{ min: 0, max: 23200, rate: .10 },{ min: 23200, max: 94300, rate: .12 },{ min: 94300, max: 201050, rate: .22 },{ min: 201050, max: 383900, rate: .24 },{ min: 383900, max: 487450, rate: .32 },{ min: 487450, max: 731200, rate: .35 },{ min: 731200, max: Infinity, rate: .37 }],
  married_separate: [{ min: 0, max: 11600, rate: .10 },{ min: 11600, max: 47150, rate: .12 },{ min: 47150, max: 100525, rate: .22 },{ min: 100525, max: 191950, rate: .24 },{ min: 191950, max: 243725, rate: .32 },{ min: 243725, max: 365600, rate: .35 },{ min: 365600, max: Infinity, rate: .37 }],
  head_household:   [{ min: 0, max: 16550, rate: .10 },{ min: 16550, max: 63100, rate: .12 },{ min: 63100, max: 100500, rate: .22 },{ min: 100500, max: 191950, rate: .24 },{ min: 191950, max: 243700, rate: .32 },{ min: 243700, max: 609350, rate: .35 },{ min: 609350, max: Infinity, rate: .37 }],
};
const usStandardDeduction: Record<FilingStatus, number> = { single: 14600, married_joint: 29200, married_separate: 14600, head_household: 21900 };
const stateTaxRates: Record<string, number> = { none: 0, CA: 0.0725, NY: 0.0685, TX: 0, FL: 0, WA: 0, IL: 0.0495, PA: 0.0307, OH: 0.04, GA: 0.055, NC: 0.0525 };

function calculateUKTax(annualSalary: number) {
  let taxableIncome = Math.max(0, annualSalary - ukPersonalAllowance);
  if (annualSalary > 100000) {
    const reduction = Math.min(ukPersonalAllowance, (annualSalary - 100000) / 2);
    taxableIncome = annualSalary - (ukPersonalAllowance - reduction);
  }
  let incomeTax = 0;
  if (taxableIncome > 0) incomeTax += Math.min(taxableIncome, ukBasicRateThreshold - ukPersonalAllowance) * 0.20;
  if (taxableIncome > (ukBasicRateThreshold - ukPersonalAllowance)) incomeTax += Math.min(taxableIncome - (ukBasicRateThreshold - ukPersonalAllowance), ukHigherRateThreshold - ukBasicRateThreshold) * 0.40;
  if (taxableIncome > (ukHigherRateThreshold - ukPersonalAllowance)) incomeTax += (taxableIncome - (ukHigherRateThreshold - ukPersonalAllowance)) * 0.45;
  let nationalInsurance = 0;
  if (annualSalary > 12570) {
    nationalInsurance += Math.min(annualSalary - 12570, 50270 - 12570) * 0.12;
    if (annualSalary > 50270) nationalInsurance += (annualSalary - 50270) * 0.02;
  }
  return { incomeTax, socialTax: nationalInsurance, socialTaxLabel: "National Insurance", federalTax: undefined, stateTax: undefined };
}

function calculateUSTax(annualSalary: number, filingStatus: FilingStatus, state: string) {
  const deduction = usStandardDeduction[filingStatus];
  const taxableIncome = Math.max(0, annualSalary - deduction);
  let federalTax = 0, remaining = taxableIncome;
  for (const b of usTaxBrackets[filingStatus]) {
    if (remaining <= 0) break;
    const taxable = Math.min(remaining, b.max - b.min);
    federalTax += taxable * b.rate;
    remaining -= taxable;
  }
  const socialSecurity = Math.min(annualSalary, 168600) * 0.062;
  const medicare = annualSalary * 0.0145 + (annualSalary > 200000 ? (annualSalary - 200000) * 0.009 : 0);
  const stateTax = annualSalary * (stateTaxRates[state] || 0);
  return { incomeTax: federalTax + stateTax, socialTax: socialSecurity + medicare, socialTaxLabel: "FICA (SS + Medicare)", federalTax, stateTax };
}

// ─── Component ────────────────────────────────────────────────────────────────
const SalaryCalculator = () => {
  // SEO Configuration
  const faqSchema = [
    { question: "How is UK income tax calculated?", answer: "UK income tax is calculated in bands: personal allowance (£0-£12,570 tax-free), basic rate (20%), higher rate (40%), and additional rate (45%). National Insurance is calculated separately on earnings above £12,570." },
    { question: "What is National Insurance?", answer: "National Insurance (NI) is a social security contribution in the UK. Employees pay 8% on earnings between £12,570-£50,270, then 2% on amounts above. It funds State Pension and benefits." },
    { question: "How does US federal income tax work?", answer: "US federal tax uses progressive tax brackets. You pay different rates on different portions of income. Standard deductions reduce taxable income, and credits can reduce tax owed." },
    { question: "What are FICA taxes?", answer: "FICA (Federal Insurance Contributions Act) includes Social Security (6.2%) and Medicare (1.45%). Employers also match these amounts for a total of 15.3%." },
    { question: "How much should I contribute to a pension?", answer: "Financial experts recommend saving 10-15% of gross income for retirement. Many employers match contributions up to 3-6%, so contribute at least enough to get the full match." }
  ];
  const [salary,        setSalary]        = useState("50000");
  const [country,       setCountry]       = useState<Country>("UK");
  const [taxCode,       setTaxCode]       = useState("1257L");
  const [filingStatus,  setFilingStatus]  = useState<FilingStatus>("single");
  const [state,         setState]         = useState("none");

  const annualSalary = parseFloat(salary) || 0;
  const taxResult = country === "UK"
    ? calculateUKTax(annualSalary)
    : calculateUSTax(annualSalary, filingStatus, state);

  const totalDeductions = taxResult.incomeTax + taxResult.socialTax;
  const net     = annualSalary - totalDeductions;
  const monthly = net / 12;
  const weekly  = net / 52;
  const daily   = net / 260;

  const fmt = (n: number) => new Intl.NumberFormat(country === "UK" ? "en-GB" : "en-US", {
    style: "currency", currency: country === "UK" ? "GBP" : "USD",
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(n);

  const sym = country === "UK" ? "£" : "$";
  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const selectClass = "w-full bg-black/40 border-white/10 text-white rounded-lg";
  const selectContent = "bg-[#1C1A1A] border-white/10 text-white";

  return (
    <>
      <SEO
        title="Salary Calculator UK & US"
        description="Calculate take-home pay after income tax, national insurance and state taxes. Supports UK and US with pension contributions."
        keywords="salary calculator, take home pay calculator, income tax calculator UK, national insurance calculator, net salary, US income tax calculator, FICA calculator, state tax, federal tax, paycheck calculator, net pay"
        canonicalUrl="https://www.thecalculatorapp.org/finance/salary"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "UK Salary Calculator",
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
            <span className="text-white/60">Salary Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + live results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[12vw] lg:text-[100px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>SALARY</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Calculate your take-home pay after {country === "UK" ? "UK income tax and National Insurance" : "US federal, state tax, and FICA"} deductions. Updates live as you type.
              </p>
            </div>

            {/* Live result cards */}
            {annualSalary > 0 && (
              <div className="mt-10 space-y-4">
                {/* Net annual hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Net Annual Salary</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{fmt(net)}</p>
                  <p className="text-xs text-white/25 font-sans mt-1">After all deductions</p>
                </div>

                {/* Breakdown grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Monthly", value: fmt(monthly) },
                    { label: "Weekly",  value: fmt(weekly) },
                    { label: "Daily",   value: fmt(daily) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-sm text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Deduction breakdown */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-2">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-3">Deductions</p>
                  <div className="flex justify-between">
                    <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Gross</span>
                    <span className="text-white/60 font-heading text-sm">{fmt(annualSalary)}</span>
                  </div>
                  {country === "US" && typeof taxResult.federalTax === "number" && (
                    <div className="flex justify-between">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Federal Tax</span>
                      <span className="text-red-400 font-heading text-sm">-{fmt(taxResult.federalTax)}</span>
                    </div>
                  )}
                  {country === "US" && typeof taxResult.stateTax === "number" && taxResult.stateTax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">State Tax</span>
                      <span className="text-red-400 font-heading text-sm">-{fmt(taxResult.stateTax)}</span>
                    </div>
                  )}
                  {country === "UK" && (
                    <div className="flex justify-between">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Income Tax</span>
                      <span className="text-red-400 font-heading text-sm">-{fmt(taxResult.incomeTax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/40 text-xs font-heading uppercase tracking-widest">{taxResult.socialTaxLabel}</span>
                    <span className="text-red-400 font-heading text-sm">-{fmt(taxResult.socialTax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white text-xs font-heading uppercase tracking-widest">Net</span>
                    <span className="font-heading text-sm" style={{ color: ACCENT }}>{fmt(net)}</span>
                  </div>
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Net Annual Salary", value: fmt(net) },
                  { label: "Monthly Take-Home", value: fmt(monthly) },
                  { label: "Weekly Take-Home", value: fmt(weekly) },
                  { label: "Daily Take-Home", value: fmt(daily) },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <h3 className="font-display text-3xl uppercase text-white tracking-wide mb-8">Parameters</h3>

              <div className="space-y-5">

                {/* Country toggle */}
                <div>
                  <label className={labelClass}>Country</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["UK", "US"] as Country[]).map(c => (
                      <button key={c} onClick={() => setCountry(c)}
                        className="py-3 px-4 rounded-lg font-heading text-sm uppercase tracking-widest transition-all border"
                        style={{
                          borderColor: country === c ? ACCENT : "rgba(255,255,255,0.08)",
                          background:  country === c ? `${ACCENT}20` : "transparent",
                          color:       country === c ? ACCENT : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {c === "UK" ? "🇬🇧 United Kingdom" : "🇺🇸 United States"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className={labelClass}>Annual Salary ({sym})</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-heading">{sym}</span>
                    <input
                      type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="50,000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pl-8 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>

                {/* UK-specific */}
                {country === "UK" && (
                  <div>
                    <label className={labelClass}>Tax Code (2024/25)</label>
                    <input
                      type="text" value={taxCode} onChange={e => setTaxCode(e.target.value)} placeholder="1257L"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <p className="text-[10px] text-white/20 font-sans mt-1">Standard code is 1257L — affects personal allowance</p>
                  </div>
                )}

                {/* US-specific */}
                {country === "US" && (
                  <>
                    <div>
                      <label className={labelClass}>Filing Status</label>
                      <Select value={filingStatus} onValueChange={v => setFilingStatus(v as FilingStatus)}>
                        <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                        <SelectContent className={selectContent}>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married_joint">Married Filing Jointly</SelectItem>
                          <SelectItem value="married_separate">Married Filing Separately</SelectItem>
                          <SelectItem value="head_household">Head of Household</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className={labelClass}>State</label>
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                        <SelectContent className={selectContent}>
                          <SelectItem value="none">No State Tax</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas (No Income Tax)</SelectItem>
                          <SelectItem value="FL">Florida (No Income Tax)</SelectItem>
                          <SelectItem value="WA">Washington (No Income Tax)</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Info about tax rates */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mb-3">
                    {country === "UK" ? "UK Tax Rates 2024/25" : "US Tax Rates 2024"}
                  </p>
                  {country === "UK" ? (
                    <ul className="text-[10px] text-white/20 font-sans space-y-1">
                      <li>Personal Allowance: £12,570 (tax-free)</li>
                      <li>Basic Rate 20%: £12,571–£50,270</li>
                      <li>Higher Rate 40%: £50,271–£125,140</li>
                      <li>Additional Rate 45%: Over £125,140</li>
                      <li>NI: 12% on £12,571–£50,270, then 2%</li>
                    </ul>
                  ) : (
                    <ul className="text-[10px] text-white/20 font-sans space-y-1">
                      <li>Standard Deduction (Single): $14,600</li>
                      <li>Federal brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%</li>
                      <li>Social Security: 6.2% (up to $168,600)</li>
                      <li>Medicare: 1.45% (+ 0.9% above $200k)</li>
                    </ul>
                  )}
                  <p className="text-[9px] text-white/15 font-sans mt-3 leading-relaxed">
                    Simplified calculation. Actual pay may vary based on pension, student loans, and other deductions.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

                <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What Is a Salary Calculator?",
              description: "A salary calculator converts your gross annual salary into your actual take-home pay after all deductions. For UK workers, this includes income tax across multiple bands (personal allowance, basic rate at 20%, higher rate at 40%, and additional rate at 45%), National Insurance contributions (Class 1), student loan repayments, and pension contributions. Understanding your net pay is essential for budgeting accurately and evaluating job offers."
            }}
            howItWorks={{
              title: "How UK Salary Tax Is Calculated",
              description: "UK income tax is calculated progressively using tax bands. You only pay the higher rate on income above each threshold, not on your entire salary. National Insurance is calculated separately at 8% on earnings between £12,570 and £50,270, then 2% above that.",
              steps: [
                { step: 1, title: "Enter Your Gross Salary", description: "Input your annual gross salary before any deductions. Include bonuses or overtime if they are regular." },
                { step: 2, title: "Select Your Country", description: "Choose UK or US. Tax bands, rates, and deduction types differ significantly between countries." },
                { step: 3, title: "Add Pension Contributions", description: "Enter your monthly pension contribution if applicable. Workplace pensions reduce your taxable income, giving you tax relief." },
                { step: 4, title: "Review Your Breakdown", description: "See your monthly and annual take-home pay, plus a detailed breakdown of income tax, NI, and other deductions." }
              ]
            }}
            formula={{
              title: "UK Income Tax Formula (2025/26)",
              formula: "Tax = 0% × £12,570 + 20% × (£50,270 - £12,570) + 40% × (£125,140 - £50,270) + 45% × (income - £125,140)",
              explanation: "The personal allowance of £12,570 is tax-free. The basic rate of 20% applies to income from £12,571 to £50,270. The higher rate of 40% applies from £50,271 to £125,140. The additional rate of 45% applies to income above £125,140. Note: the personal allowance reduces by £1 for every £2 earned above £100,000."
            }}
            faqs={[
              { question: "How is UK income tax calculated?", answer: "UK income tax is progressive — you pay different rates on different portions of your income. The first £12,570 is tax-free (personal allowance), then 20% basic rate up to £50,270, 40% higher rate up to £125,140, and 45% additional rate above that." },
              { question: "What is National Insurance?", answer: "National Insurance is a separate contribution paid by UK employees. Class 1 NI is 8% on earnings between £12,570 and £50,270, then 2% on earnings above £50,270. It funds the state pension, NHS, and benefits system." },
              { question: "Does pension reduce my tax?", answer: "Yes. Workplace pension contributions are deducted from your gross salary before tax is calculated, reducing your taxable income. This gives you tax relief at your marginal rate — 20% for basic rate taxpayers, 40% for higher rate." },
              { question: "What is the personal allowance taper?", answer: "If you earn over £100,000, your personal allowance reduces by £1 for every £2 above £100,000. This creates an effective 60% tax rate on income between £100,000 and £125,140. This is an important consideration for salary negotiations." }
            ]}
            tips={[
              "Salary sacrifice into your pension to reduce tax — particularly effective if you are near a tax band threshold",
              "Use your full ISA allowance (£20,000) to shelter savings and investment returns from tax",
              "If you earn between £100,000 and £125,140, pension contributions can eliminate the 60% effective rate",
              "Remember to factor in employer pension contributions when comparing job offers — they are part of your total compensation",
              "Check your tax code on your payslip — an incorrect code means you could be over or underpaying tax"
            ]}
          />
        </div>

<FinancialDisclosure variant="general" />

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
};

export default SalaryCalculator;