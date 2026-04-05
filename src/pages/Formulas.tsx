import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

// ─── Category accents ─────────────────────────────────────────────────────────
const ACCENTS = { finance: "#3B82F6", converters: "#22C55E", misc: "#F97316" };

type Tab = "finance" | "converters" | "misc";

// ─── Formula card component ───────────────────────────────────────────────────
function FormulaCard({ title, accent, formulas, variables }: {
  title: string;
  accent: string;
  formulas: { label?: string; formula: string }[];
  variables?: { name: string; desc: string }[];
}) {
  return (
    <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <p className="text-[9px] font-heading uppercase tracking-widest mb-1" style={{ color: accent }}>{title}</p>
      <div className="space-y-3 mt-4">
        {formulas.map(({ label, formula }) => (
          <div key={formula}>
            {label && <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>}
            <div className="bg-black/40 border border-white/5 rounded-xl px-5 py-3 font-mono text-sm text-white/80 break-all">
              {formula}
            </div>
          </div>
        ))}
      </div>
      {variables && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-[9px] font-heading uppercase tracking-widest text-white/20 mb-3">Variables</p>
          <ul className="space-y-1.5">
            {variables.map(({ name, desc }) => (
              <li key={name} className="flex gap-2 text-xs font-sans">
                <span className="font-mono shrink-0" style={{ color: accent }}>{name}</span>
                <span className="text-white/30">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Tab content data ─────────────────────────────────────────────────────────
const FINANCE_CARDS = [
  {
    title: "Compound Interest",
    formulas: [{ formula: "FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]" }],
    variables: [
      { name: "FV",  desc: "Future Value" },
      { name: "P",   desc: "Principal (initial investment)" },
      { name: "r",   desc: "Annual interest rate (decimal)" },
      { name: "n",   desc: "Compounding periods per year" },
      { name: "t",   desc: "Time in years" },
      { name: "PMT", desc: "Regular contribution amount" },
    ],
  },
  {
    title: "Loan Payment (Amortization)",
    formulas: [{ formula: "M = P × [r(1 + r)^n] / [(1 + r)^n - 1]" }],
    variables: [
      { name: "M", desc: "Monthly payment" },
      { name: "P", desc: "Principal loan amount" },
      { name: "r", desc: "Monthly interest rate (annual / 12)" },
      { name: "n", desc: "Total number of payments" },
    ],
  },
  {
    title: "APY (Annual Percentage Yield)",
    formulas: [{ formula: "APY = (1 + r/n)^n - 1" }],
    variables: [
      { name: "APY", desc: "Annual Percentage Yield" },
      { name: "r",   desc: "Nominal annual interest rate (decimal)" },
      { name: "n",   desc: "Compounding periods per year" },
    ],
  },
  {
    title: "Simple Interest",
    formulas: [{ formula: "I = P × r × t" }],
    variables: [
      { name: "I", desc: "Interest earned" },
      { name: "P", desc: "Principal amount" },
      { name: "r", desc: "Annual interest rate (decimal)" },
      { name: "t", desc: "Time in years" },
    ],
  },
  {
    title: "Mortgage Payment",
    formulas: [{ formula: "M = L × [r(1 + r)^n] / [(1 + r)^n - 1] + T/12 + I/12" }],
    variables: [
      { name: "M", desc: "Total monthly payment" },
      { name: "L", desc: "Loan amount (price − down payment)" },
      { name: "r", desc: "Monthly interest rate" },
      { name: "n", desc: "Total payments (years × 12)" },
      { name: "T", desc: "Annual property tax" },
      { name: "I", desc: "Annual home insurance" },
    ],
  },
  {
    title: "Retirement Savings",
    formulas: [{ formula: "FV = P(1 + r)^t + C × [((1 + r)^t - 1) / r]" }],
    variables: [
      { name: "FV", desc: "Future value at retirement" },
      { name: "P",  desc: "Current savings" },
      { name: "r",  desc: "Annual return rate (decimal)" },
      { name: "t",  desc: "Years until retirement" },
      { name: "C",  desc: "Annual contribution" },
    ],
  },
  {
    title: "Future House Value",
    formulas: [{ formula: "FV = PV × (1 + g)^t" }],
    variables: [
      { name: "FV", desc: "Future property value" },
      { name: "PV", desc: "Present (current) value" },
      { name: "g",  desc: "Annual growth rate (decimal)" },
      { name: "t",  desc: "Time in years" },
    ],
  },
  {
    title: "Credit Card Payoff",
    formulas: [{ formula: "n = -log(1 - (B × r)/M) / log(1 + r)" }],
    variables: [
      { name: "n", desc: "Months to pay off" },
      { name: "B", desc: "Current balance" },
      { name: "r", desc: "Monthly interest rate (APR / 12)" },
      { name: "M", desc: "Monthly payment" },
    ],
  },
];

const CONVERTER_CARDS = [
  {
    title: "Temperature Conversion",
    formulas: [
      { label: "Celsius → Fahrenheit", formula: "°F = (°C × 9/5) + 32" },
      { label: "Fahrenheit → Celsius", formula: "°C = (°F - 32) × 5/9" },
      { label: "Celsius → Kelvin",     formula: "K = °C + 273.15" },
    ],
  },
  {
    title: "Length Conversion",
    formulas: [
      { label: "Meters → Feet",        formula: "feet = meters × 3.28084" },
      { label: "Kilometres → Miles",   formula: "miles = km × 0.621371" },
      { label: "Inches → Centimetres", formula: "cm = inches × 2.54" },
    ],
  },
  {
    title: "Weight Conversion",
    formulas: [
      { label: "Kilograms → Pounds", formula: "lbs = kg × 2.20462" },
      { label: "Pounds → Kilograms", formula: "kg = lbs × 0.453592" },
      { label: "Ounces → Grams",     formula: "g = oz × 28.3495" },
    ],
  },
];

const MISC_CARDS = [
  {
    title: "Percentage Calculations",
    formulas: [
      { label: "Percentage of a Number", formula: "Result = (Percentage / 100) × Number" },
      { label: "Percentage Change",      formula: "% Change = ((New - Old) / Old) × 100" },
      { label: "Percentage Increase",    formula: "New Value = Old Value × (1 + Percentage/100)" },
    ],
  },
  {
    title: "Discount Formula",
    formulas: [
      { label: "Final Price",    formula: "Final Price = Original × (1 - Discount%/100)" },
      { label: "Savings Amount", formula: "Savings = Original × (Discount% / 100)" },
    ],
  },
  {
    title: "Tip Calculation",
    formulas: [
      { label: "Tip Amount",     formula: "Tip = Bill Amount × (Tip% / 100)" },
      { label: "Total Amount",   formula: "Total = Bill Amount + Tip" },
      { label: "Split Per Person", formula: "Per Person = Total / Number of People" },
    ],
  },
  {
    title: "Age Calculation",
    formulas: [
      { label: "Basic",    formula: "Age = Current Year - Birth Year" },
      { label: "Adjusted", formula: "If (Month, Day) < (Birth Month, Day): Age = Age - 1" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Formulas() {
  const [tab, setTab] = useState<Tab>("finance");
  const accent = ACCENTS[tab];

  const tabs: { key: Tab; label: string }[] = [
    { key: "finance",    label: "Finance" },
    { key: "converters", label: "Converters" },
    { key: "misc",       label: "Miscellaneous" },
  ];

  const cards = tab === "finance" ? FINANCE_CARDS : tab === "converters" ? CONVERTER_CARDS : MISC_CARDS;

  return (
    <>
      <SEO
        title="Calculator Formulas Guide"
        description="Reference guide to all calculator formulas: compound interest, mortgage, loan and savings with explanations."
        keywords="calculator formulas, mathematical formulas, compound interest formula, mortgage formula, loan payment formula, financial calculations"
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Formulas</span>
          </nav>
        </div>

        {/* Hero title */}
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-10 select-none">
          <div className="absolute w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none -z-10" style={{ background: accent, transition: "background 0.4s" }} />
          <h1 className="font-display leading-[0.85] tracking-tighter">
            <span className="block text-[11vw] md:text-[90px]" style={{
              background: `linear-gradient(135deg, ${accent} 0%, #a78bfa 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: `drop-shadow(0 0 40px ${accent}40)`,
              transition: "all 0.4s",
            }}>FORMULA</span>
            <span className="block text-[11vw] md:text-[90px]" style={{
              background: `linear-gradient(135deg, ${accent} 0%, #a78bfa 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              transition: "all 0.4s",
            }}>REFERENCE</span>
            <span className="block text-[5vw] md:text-[42px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
              GUIDE
            </span>
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="max-w-md pl-4 border-l-2" style={{ borderColor: `${accent}60`, transition: "border-color 0.4s" }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Mathematical formulas and equations used across all calculators. Verify calculations and understand the math behind every result.
              </p>
            </div>
            <Link to="/learn/calculator-formulas-guide"
              className="group shrink-0 flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl font-heading text-xs uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all">
              <BookOpen className="h-4 w-4" />
              Full Guide
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Tab toggle + content */}
        <div className="max-w-5xl mx-auto px-6 pb-20 space-y-6">

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-[#252323]/80 border border-white/10 rounded-2xl w-fit">
            {tabs.map(({ key, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className="px-6 py-3 rounded-xl font-heading text-xs uppercase tracking-widest transition-all"
                style={{
                  background: tab === key ? `${ACCENTS[key]}20` : "transparent",
                  color:      tab === key ? ACCENTS[key] : "rgba(255,255,255,0.3)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: tab === key ? ACCENTS[key] : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map(card => (
              <FormulaCard key={card.title} accent={accent} {...card} />
            ))}
          </div>
        </div>

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