import { useState } from "react";
import { SEO } from "@/components/SEO";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { retirementSchema } from "@/lib/validation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ───────────────────────────────────────
const ACCENT = "#3B82F6";
const PIE_COLORS = [ACCENT, "#a78bfa"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

function DI({ value, onChange, min, max, step, placeholder }: {
  value: string; onChange: (v: string) => void;
  min?: string; max?: string; step?: string; placeholder?: string;
}) {
  return (
    <input
      type="number" value={value} onChange={e => onChange(e.target.value)}
      min={min} max={max} step={step} placeholder={placeholder}
      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all"
      onFocus={e => (e.target.style.borderColor = ACCENT)}
      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
    />
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
      <p className="text-[10px] font-heading uppercase tracking-widest mb-5" style={{ color: ACCENT }}>{title}</p>
      {children}
    </div>
  );
}

const fmt = (n: number) => {
  if (!isFinite(n)) return "—";
  return "£" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

interface RetirementResults {
  yearsToRetirement: number; totalContributions: number;
  retirementPot: number; realPot: number; annualIncome: number;
  statePension: number; totalAnnualIncome: number;
}

const faqSchema = [
  { question: "How much do I need to retire comfortably in the UK?", answer: "The PLSA suggests about £31,000/year for a moderate retirement, or £43,000 for a comfortable one. This varies by location, lifestyle, and whether you own your home." },
  { question: "What is the 4% withdrawal rule?", answer: "The 4% rule suggests you can withdraw 4% of your retirement pot annually without running out over 30 years. Some advisors now suggest 3–3.5% given current market conditions." },
  { question: "How much State Pension will I get?", answer: "The full new State Pension is £11,502/year (2024/25). You need 35 qualifying NI years. Check your forecast at gov.uk." },
  { question: "What age can I access my pension in the UK?", answer: "Private pensions are accessible from age 55 (rising to 57 in 2028). State Pension age is 66, rising to 67 between 2026–2028." },
  { question: "Should I increase my pension contributions?", answer: "At minimum, contribute enough to get the full employer match — it's free money. Beyond that, more contributions mean a larger pot and more retirement income." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function RetirementCalculator() {
  const [currentAge,           setCurrentAge]           = useState("35");
  const [retirementAge,        setRetirementAge]        = useState("67");
  const [currentPot,           setCurrentPot]           = useState("25000");
  const [salary,               setSalary]               = useState("45000");
  const [employeeContribution, setEmployeeContribution] = useState("5");
  const [employerContribution, setEmployerContribution] = useState("3");
  const [inflationRate,        setInflationRate]        = useState("2");
  const [growthRate,           setGrowthRate]           = useState("7");
  const [statePension,         setStatePension]         = useState("11502");
  const [withdrawalRate,       setWithdrawalRate]       = useState("4");
  const [results,              setResults]              = useState<RetirementResults | null>(null);

  const calculate = () => {
    const nums = {
      currentAge: parseFloat(currentAge), retirementAge: parseFloat(retirementAge),
      currentPot: parseFloat(currentPot), salary: parseFloat(salary),
      employeeContribution: parseFloat(employeeContribution), employerContribution: parseFloat(employerContribution),
      inflationRate: parseFloat(inflationRate), growthRate: parseFloat(growthRate),
      statePension: parseFloat(statePension), withdrawalRate: parseFloat(withdrawalRate),
    };
    try { retirementSchema.parse(nums); } catch (e: any) { toast.error(e.errors?.[0]?.message || "Invalid input values"); return; }

    const years = nums.retirementAge - nums.currentAge;
    const annualContribution = nums.salary * (nums.employeeContribution + nums.employerContribution) / 100;
    const r = nums.growthRate / 100;
    const fvOfCurrentPot = nums.currentPot * Math.pow(1 + r, years);
    const fvOfContributions = annualContribution * ((Math.pow(1 + r, years) - 1) / r);
    const retirementPot = fvOfCurrentPot + fvOfContributions;
    const realPot = retirementPot / Math.pow(1 + nums.inflationRate / 100, years);
    const annualIncome = retirementPot * (nums.withdrawalRate / 100);

    setResults({
      yearsToRetirement: years,
      totalContributions: nums.currentPot + annualContribution * years,
      retirementPot, realPot, annualIncome,
      statePension: nums.statePension,
      totalAnnualIncome: annualIncome + nums.statePension,
    });
  };

  const loadDemo = () => {
    setCurrentAge("35"); setRetirementAge("67"); setCurrentPot("25000"); setSalary("45000");
    setEmployeeContribution("5"); setEmployerContribution("3"); setInflationRate("2");
    setGrowthRate("7"); setStatePension("11502"); setWithdrawalRate("4");
    setTimeout(calculate, 100);
  };

  const annualContrib = parseFloat(salary) * (parseFloat(employeeContribution) + parseFloat(employerContribution)) / 100;

  return (
    <>
      <SEO
        title="Retirement Calculator UK - Plan Your Pension & Retirement Income"
        description="Free UK retirement calculator to estimate your pension pot and annual retirement income. Includes state pension, employer contributions, and inflation adjustments."
        keywords="retirement calculator UK, pension calculator, retirement planning calculator, state pension calculator"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Retirement Calculator</span>
          </nav>
        </div>

        {/* Hero title */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 select-none">
          <div className="absolute w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.07] pointer-events-none -z-10" style={{ background: ACCENT }} />
          <h1 className="font-display leading-[0.85] tracking-tighter">
            <span className="block text-[12vw] md:text-[95px]" style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
            }}>RETIREMENT</span>
            <span className="block text-[7vw] md:text-[58px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
              CALCULATOR (UK)
            </span>
          </h1>
          <div className="mt-6 max-w-md pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
            <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
              Estimate your pension pot and annual retirement income. Includes State Pension, employer contributions, and inflation-adjusted projections.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-20 space-y-4">

          {/* Basic info */}
          <Section title="Your Details">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className={labelClass}>Current Age</label><DI value={currentAge} onChange={setCurrentAge} min="18" max="80" placeholder="35" /></div>
              <div><label className={labelClass}>Retirement Age</label><DI value={retirementAge} onChange={setRetirementAge} min="50" max="75" placeholder="67" /></div>
              <div><label className={labelClass}>Current Pension Pot (£)</label><DI value={currentPot} onChange={setCurrentPot} min="0" step="0.01" placeholder="25000" /></div>
              <div><label className={labelClass}>Gross Salary (£/yr)</label><DI value={salary} onChange={setSalary} min="0" step="0.01" placeholder="45000" /></div>
            </div>
          </Section>

          {/* Contributions */}
          <Section title="Contributions">
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelClass}>Employee Contribution (%)</label><DI value={employeeContribution} onChange={setEmployeeContribution} min="0" step="0.1" placeholder="5" /></div>
              <div><label className={labelClass}>Employer Contribution (%)</label><DI value={employerContribution} onChange={setEmployerContribution} min="0" step="0.1" placeholder="3" /></div>
            </div>
            {!isNaN(annualContrib) && annualContrib > 0 && (
              <p className="text-xs text-white/25 font-sans mt-3">
                Combined annual contribution: <span style={{ color: ACCENT }}>£{annualContrib.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </p>
            )}
          </Section>

          {/* Rates & Assumptions */}
          <Section title="Rates & Assumptions">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Inflation Rate (%)</label>
                <DI value={inflationRate} onChange={setInflationRate} min="0" step="0.1" placeholder="2" />
              </div>
              <div>
                <label className={labelClass}>Growth Rate (% p.a.)</label>
                <DI value={growthRate} onChange={setGrowthRate} min="0" step="0.1" placeholder="7" />
              </div>
              <div>
                <label className={labelClass}>State Pension (£/yr)</label>
                <DI value={statePension} onChange={setStatePension} min="0" step="0.01" placeholder="11502" />
              </div>
              <div>
                <label className={labelClass}>Withdrawal Rate (%)</label>
                <DI value={withdrawalRate} onChange={setWithdrawalRate} min="0" step="0.1" placeholder="4" />
              </div>
            </div>
          </Section>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={calculate}
              className="group flex items-center gap-2 px-8 py-4 text-black font-heading font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
              style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
            >
              Calculate
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={loadDemo}
              className="px-6 py-4 border border-white/10 rounded-xl font-heading text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              Quick Demo
            </button>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Retirement Pot",         value: fmt(results.retirementPot),      large: true },
                  { label: "Real Value (Today's £)",  value: fmt(results.realPot) },
                  { label: "Total Contributions",    value: fmt(results.totalContributions) },
                  { label: "Total Annual Income",    value: fmt(results.totalAnnualIncome),  large: true },
                ].map(({ label, value, large }) => (
                  <div key={label} className="bg-[#252323]/80 border border-white/10 rounded-2xl p-5">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{label}</p>
                    <p className={`font-display ${large ? "text-3xl" : "text-2xl"} text-white`} style={{ color: large ? ACCENT : "white" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Pie chart */}
              <Section title="Annual Income Sources">
                <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Pension Withdrawal", value: results.annualIncome },
                          { name: "State Pension",      value: results.statePension },
                        ]}
                        cx="50%" cy="50%"
                        innerRadius={60} outerRadius={100}
                        paddingAngle={5} dataKey="value"
                        label={entry => fmt(entry.value)}
                      >
                        {[0, 1].map(i => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => fmt(v)}
                        contentStyle={{ backgroundColor: "#1C1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontFamily: "Oswald" }}
                      />
                      <Legend wrapperStyle={{ fontFamily: "Oswald", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Section>

              {/* Breakdown table */}
              <Section title="Detailed Breakdown">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        { label: "Years to retirement",                                          value: `${results.yearsToRetirement}` },
                        { label: "Annual contribution (employee + employer)",                    value: fmt(annualContrib) },
                        { label: `Total contributions over ${results.yearsToRetirement} years`,  value: fmt(results.totalContributions) },
                        { label: "Retirement pot (nominal)",                                     value: fmt(results.retirementPot), highlight: true },
                        { label: `Real value (adjusted for ${inflationRate}% inflation)`,        value: fmt(results.realPot) },
                        { label: `Annual income from pot (${withdrawalRate}% withdrawal)`,       value: fmt(results.annualIncome) },
                        { label: "State pension",                                                value: fmt(results.statePension) },
                        { label: "Total annual retirement income",                               value: fmt(results.totalAnnualIncome), highlight: true },
                      ].map(({ label, value, highlight }) => (
                        <tr key={label} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className={`py-3 pr-8 font-sans text-xs ${highlight ? "text-white" : "text-white/40"}`}>{label}</td>
                          <td className={`py-3 text-right font-heading ${highlight ? "text-xl" : ""}`} style={{ color: highlight ? ACCENT : "rgba(255,255,255,0.7)" }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              <CopyButton accentColor={ACCENT} results={[
                { label: "Retirement Pot", value: fmt(results.retirementPot) },
                { label: "Real Value (Today's £)", value: fmt(results.realPot) },
                { label: "Total Annual Income", value: fmt(results.totalAnnualIncome) },
                { label: "Total Contributions", value: fmt(results.totalContributions) },
              ]} />

              {/* Notes */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mb-3">Important Notes</p>
                <ul className="text-xs text-white/30 font-sans space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>Calculations assume constant contribution and growth rates</li>
                  <li>Real value shows purchasing power in today's money after inflation</li>
                  <li>Withdrawal rate is commonly 4% for sustainable retirement income</li>
                  <li>State pension amount varies — check gov.uk for your personal forecast</li>
                  <li>This is an estimate — consult a financial adviser for personalised advice</li>
                </ul>
              </div>
            </>
          )}

          {/* Disclaimer + static content */}
          <FinancialDisclaimer type="retirement" className="mt-2" />
          <CalculatorStaticContent
            whatIs={{ title: "What is Retirement Planning?", description: "Retirement planning determines your income goals and the actions needed to achieve them. In the UK, retirement income typically comes from the State Pension, workplace pensions, and personal savings. Starting early and contributing consistently are key." }}
            howItWorks={{
              title: "How to Use This Retirement Calculator",
              description: "This calculator projects your retirement pot based on current savings, contributions, expected growth, and the UK State Pension.",
              steps: [
                { step: 1, title: "Enter Your Current Details",   description: "Input your age, target retirement age, current pension pot, and gross annual salary." },
                { step: 2, title: "Set Contribution Rates",       description: "Enter employee and employer contribution percentages." },
                { step: 3, title: "Adjust Growth and Inflation",  description: "Set expected investment growth rate and inflation rate." },
                { step: 4, title: "Include State Pension",        description: "Enter your expected State Pension amount from gov.uk." },
                { step: 5, title: "Choose Withdrawal Rate",       description: "The 4% rule is a common starting point for sustainable income." },
              ]
            }}
            formula={{
              title: "The Retirement Calculation",
              formula: "FV = PV × (1+r)^n + PMT × [(1+r)^n - 1] / r",
              explanation: "FV is the future retirement pot, PV is the current pot, r is the annual growth rate, n is years until retirement, PMT is annual contribution. Real value adjusts for inflation. Annual income = FV × withdrawal rate + State Pension.",
            }}
            tips={[
              "Take full advantage of employer matching — it's free money for your retirement",
              "Use salary sacrifice if available — it reduces tax and National Insurance",
              "Review your pension investments regularly to match your risk tolerance",
              "Consider consolidating old workplace pensions to simplify management",
              "Check your State Pension forecast at gov.uk and fill any NI gaps",
            ]}
            faqs={faqSchema}
          />
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
    </>
  );
}