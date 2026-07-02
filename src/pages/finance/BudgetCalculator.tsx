import { Logo } from "@/components/Logo";
import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { Plus, Trash2, ArrowRight, Wallet, Target, TrendingUp, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Info } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { Link } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

const CAT_COLORS: Record<string, string> = {
  Housing:      "#3b82f6",
  Utilities:    "#06b6d4",
  Transport:    "#a78bfa",
  Food:         "#22c55e",
  Personal:     "#f97316",
  Insurance:    "#eab308",
  Debts:        "#f43f5e",
  Savings:      "#10b981",
  Children:     "#ec4899",
  Custom:       "#84cc16",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type BudgetMethod = "5030020" | "zerobased" | "payyourselffirst";
type IncomeMode   = "regular" | "irregular";

interface LineItem  { id: string; label: string; monthly: string; annual: string; }
interface SinkFund  { id: string; label: string; annual: string; }

// ─── Helpers ──────────────────────────────────────────────────────────────────
const n = (v: string) => { const x = parseFloat(v); return isNaN(x) ? 0 : x; };
const fmt = (v: number, sym = "£") =>
  sym + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-1.5";

function Inp({ value, onChange, prefix = "£", placeholder = "0", annual = false }: {
  value: string; onChange: (v: string) => void;
  prefix?: string; placeholder?: string; annual?: boolean;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">{prefix}</span>
      <input
        type="number" step="0.01" min="0"
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-white/10 rounded-lg pl-7 pr-3 py-3 text-white text-sm font-medium placeholder-white/20 focus:outline-none transition-all"
        onFocus={e => (e.target.style.borderColor = annual ? "#f97316" : ACCENT)}
        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

function CollapsibleSection({ title, color = ACCENT, children, defaultOpen = true }: {
  title: string; color?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/3 transition-colors"
      >
        <span className="font-heading text-xs uppercase tracking-widest" style={{ color }}>{title}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/30" />
          : <ChevronDown className="w-4 h-4 text-white/30" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

// ─── Custom pie tooltip ────────────────────────────────────────────────────────
function PieTip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: { color } } = payload[0];
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs font-sans shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-white/70">{name}</span>
        <span className="text-white font-medium ml-1">{fmt(value)}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BudgetCalculator() {
  // ── Income mode & method ──
  const [incomeMode, setIncomeMode] = useState<IncomeMode>("regular");
  const [method, setMethod] = useState<BudgetMethod>("5030020");

  // ── Regular income ──
  const [salary,       setSalary]       = useState("");
  const [otherIncome,  setOtherIncome]  = useState("");
  const [benefits,     setBenefits]     = useState("");
  const [pension,      setPension]      = useState("");

  // ── Irregular income ──
  const [bestMonth,    setBestMonth]    = useState("");
  const [worstMonth,   setWorstMonth]   = useState("");
  const [avgMonth,     setAvgMonth]     = useState("");

  // ── Housing ──
  const [rent,         setRent]         = useState("");
  const [councilTax,   setCouncilTax]   = useState("");
  const [homeInsur,    setHomeInsur]    = useState("");
  const [maintenance,  setMaintenance]  = useState("");

  // ── Utilities ──
  const [gas,          setGas]          = useState("");
  const [electricity,  setElectricity]  = useState("");
  const [water,        setWater]        = useState("");
  const [phone,        setPhone]        = useState("");
  const [internet,     setInternet]     = useState("");
  const [tv,           setTv]           = useState("");

  // ── Transport ──
  const [carPayment,   setCarPayment]   = useState("");
  const [carInsur,     setCarInsur]     = useState("");
  const [fuel,         setFuel]         = useState("");
  const [pubTransport, setPubTransport] = useState("");
  const [carMaint,     setCarMaint]     = useState("");

  // ── Food ──
  const [groceries,    setGroceries]    = useState("");
  const [eatingOut,    setEatingOut]    = useState("");
  const [household,    setHousehold]    = useState("");

  // ── Personal ──
  const [clothing,     setClothing]     = useState("");
  const [personalCare, setPersonalCare] = useState("");
  const [entertain,    setEntertain]    = useState("");
  const [subs,         setSubs]         = useState("");
  const [gym,          setGym]          = useState("");

  // ── Insurance & health ──
  const [lifeInsur,    setLifeInsur]    = useState("");
  const [healthInsur,  setHealthInsur]  = useState("");
  const [healthcare,   setHealthcare]   = useState("");

  // ── Debts ──
  const [loanPay,      setLoanPay]      = useState("");
  const [creditCards,  setCreditCards]  = useState("");

  // ── Savings ──
  const [savings,      setSavings]      = useState("");
  const [investments,  setInvestments]  = useState("");
  const [pension2,     setPension2]     = useState("");

  // ── Children ──
  const [childcare,    setChildcare]    = useState("");
  const [schoolFees,   setSchoolFees]   = useState("");

  // ── Sinking funds (annual → monthly auto-convert) ──
  const [sinkFunds, setSinkFunds] = useState<SinkFund[]>([
    { id: "1", label: "Holiday / Vacation",   annual: "" },
    { id: "2", label: "Car Registration/MOT", annual: "" },
    { id: "3", label: "Christmas / Gifts",    annual: "" },
  ]);

  // ── Custom ──
  const [customItems, setCustomItems] = useState<LineItem[]>([]);

  // ── Savings goal ──
  const [goalName,     setGoalName]    = useState("Emergency Fund");
  const [goalAmount,   setGoalAmount]  = useState("5000");

  // ── Results visible ──
  const [showResults, setShowResults] = useState(false);

  // ─── Computed totals ────────────────────────────────────────────────────────
  const totalIncome = useMemo(() => {
    if (incomeMode === "irregular") {
      // Conservative: use worst-month as baseline, avg as tooltip note
      const w = n(worstMonth), a = n(avgMonth);
      return w > 0 ? w : a;
    }
    return n(salary) + n(otherIncome) + n(benefits) + n(pension);
  }, [incomeMode, salary, otherIncome, benefits, pension, worstMonth, avgMonth]);

  const housingTotal   = n(rent) + n(councilTax) + n(homeInsur) + n(maintenance);
  const utilitiesTotal = n(gas) + n(electricity) + n(water) + n(phone) + n(internet) + n(tv);
  const transportTotal = n(carPayment) + n(carInsur) + n(fuel) + n(pubTransport) + n(carMaint);
  const foodTotal      = n(groceries) + n(eatingOut) + n(household);
  const personalTotal  = n(clothing) + n(personalCare) + n(entertain) + n(subs) + n(gym);
  const insurTotal     = n(lifeInsur) + n(healthInsur) + n(healthcare);
  const debtsTotal     = n(loanPay) + n(creditCards);
  const savingsTotal   = n(savings) + n(investments) + n(pension2);
  const childrenTotal  = n(childcare) + n(schoolFees);
  const sinkTotal      = sinkFunds.reduce((s, f) => s + n(f.annual) / 12, 0);
  const customTotal    = customItems.reduce((s, i) => s + n(i.monthly), 0);

  const totalExpenses  = housingTotal + utilitiesTotal + transportTotal + foodTotal +
    personalTotal + insurTotal + debtsTotal + savingsTotal + childrenTotal + sinkTotal + customTotal;

  const surplus        = totalIncome - totalExpenses;
  const savingsRate    = totalIncome > 0 ? (savingsTotal / totalIncome) * 100 : 0;
  const monthsToGoal   = surplus > 0 && n(goalAmount) > 0 ? n(goalAmount) / surplus : null;
  const dti            = totalIncome > 0 ? ((debtsTotal / totalIncome) * 100) : 0;

  // 50/30/20 analysis
  const needs50  = (housingTotal + utilitiesTotal + transportTotal + foodTotal + insurTotal + childrenTotal) / (totalIncome || 1) * 100;
  const wants30  = personalTotal / (totalIncome || 1) * 100;
  const savings20 = (savingsTotal + surplus) / (totalIncome || 1) * 100;

  const pieData = [
    { name: "Housing",   value: housingTotal,   color: CAT_COLORS.Housing },
    { name: "Utilities", value: utilitiesTotal, color: CAT_COLORS.Utilities },
    { name: "Transport", value: transportTotal, color: CAT_COLORS.Transport },
    { name: "Food",      value: foodTotal,      color: CAT_COLORS.Food },
    { name: "Personal",  value: personalTotal,  color: CAT_COLORS.Personal },
    { name: "Insurance", value: insurTotal,     color: CAT_COLORS.Insurance },
    { name: "Debts",     value: debtsTotal,     color: CAT_COLORS.Debts },
    { name: "Savings",   value: savingsTotal,   color: CAT_COLORS.Savings },
    { name: "Children",  value: childrenTotal,  color: CAT_COLORS.Children },
    { name: "Sinking",   value: sinkTotal,      color: "#f59e0b" },
    { name: "Custom",    value: customTotal,    color: CAT_COLORS.Custom },
  ].filter(d => d.value > 0);

  // Method-specific targets
  const methodTargets = useMemo(() => {
    if (method === "5030020") return [
      { label: "Needs (50%)", actual: needs50, target: 50, color: "#3b82f6" },
      { label: "Wants (30%)", actual: wants30, target: 30, color: "#f97316" },
      { label: "Save/Debt (20%)", actual: savings20, target: 20, color: "#22c55e" },
    ];
    if (method === "payyourselffirst") return [
      { label: "Savings First (20%+)", actual: savingsRate, target: 20, color: "#22c55e" },
      { label: "Remaining", actual: 100 - savingsRate, target: 80, color: "#3b82f6" },
    ];
    // zero-based: surplus should = 0
    return [
      { label: "Unallocated",  actual: surplus > 0 ? (surplus / (totalIncome || 1) * 100) : 0, target: 0, color: "#f97316" },
      { label: "Allocated",    actual: (totalExpenses / (totalIncome || 1) * 100), target: 100, color: "#22c55e" },
    ];
  }, [method, needs50, wants30, savings20, savingsRate, surplus, totalIncome, totalExpenses]);

  const addSinkFund  = () => setSinkFunds(f => [...f, { id: Date.now().toString(), label: "", annual: "" }]);
  const removeSink   = (id: string) => setSinkFunds(f => f.filter(x => x.id !== id));
  const updateSink   = (id: string, field: keyof SinkFund, val: string) =>
    setSinkFunds(f => f.map(x => x.id === id ? { ...x, [field]: val } : x));

  const addCustom    = () => setCustomItems(i => [...i, { id: Date.now().toString(), label: "", monthly: "", annual: "" }]);
  const removeCustom = (id: string) => setCustomItems(i => i.filter(x => x.id !== id));
  const updateCustom = (id: string, field: keyof LineItem, val: string) =>
    setCustomItems(i => i.map(x => x.id === id ? { ...x, [field]: val } : x));

  return (
    <>
      <SEO
        title="Budget Calculator UK 2026 — Monthly Budget Planner with 50/30/20"
        description="The UK's most complete free budget calculator. Enter income and expenses across every category, choose your budgeting method (50/30/20, zero-based, pay-yourself-first), see a live pie chart breakdown and calculate exactly how long until you reach your savings goal."
        keywords="budget calculator UK, monthly budget planner, 50 30 20 budget calculator, zero based budget calculator, budget calculator 2026, free budget planner UK, household budget calculator, income expense calculator UK, savings goal calculator, irregular income budget"
        canonicalUrl="https://www.thecalculatorapp.org/finance/budget"
        faqSchema={[
          { question: "What is the 50/30/20 budget rule?", answer: "The 50/30/20 rule allocates 50% of take-home pay to needs (housing, bills, food), 30% to wants (entertainment, dining out, subscriptions), and 20% to savings and debt repayment. It's the most widely recommended budgeting framework for beginners." },
          { question: "What is zero-based budgeting?", answer: "Zero-based budgeting means allocating every pound of income to a specific category — including savings — so that income minus expenses equals zero. Every pound has a 'job'. It requires more discipline but is highly effective for debt reduction." },
          { question: "What is a sinking fund?", answer: "A sinking fund is money set aside each month for a known future expense — like a holiday, Christmas, car MOT, or annual insurance premium. By saving 1/12th of the annual cost each month, you avoid the shock of large irregular bills." },
          { question: "How do I budget with irregular income?", answer: "Use your worst or lowest month as your income baseline. Build your essential expenses around that figure. In higher-income months, allocate the surplus to an emergency buffer or sinking funds rather than spending it. This way you're never caught short." },
          { question: "What is a good debt-to-income ratio?", answer: "Most lenders consider a DTI ratio of 36% or lower to be healthy, with 28% or less going to housing alone. Above 43% is generally considered high-risk. Your DTI affects your ability to get mortgages, car loans, and credit cards." },
          { question: "How much should I save each month?", answer: "A common target is 20% of take-home pay. If that's not possible right now, start with any amount — even £50/month — and automate it. The emergency fund target is 3–6 months of essential expenses." },
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Budget Calculator UK 2026",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org/finance/budget",
        }}
      />

      <div className="bg-dark-bg text-white min-h-screen font-sans selection:bg-blue-500/30">

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Budget Calculator</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-6 pointer-events-none" style={{ background: ACCENT }} />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-4 pointer-events-none bg-cyan-400" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-heading uppercase tracking-widest mb-6">
            <Wallet className="w-3 h-3" />
            Monthly Budget Planner
          </div>

          <h1 className="sr-only">Budget Calculator UK 2025</h1>
          <div aria-hidden="true" className="font-display leading-none tracking-wide mb-6">
            <span className="block text-[14vw] sm:text-[100px] lg:text-[120px]" style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 50%, #22c55e 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: `drop-shadow(0 0 40px ${ACCENT}30)`,
            }}>BUDGET</span>
            <span className="block text-[8vw] sm:text-[58px] lg:text-[70px] -mt-2" style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent"
            }}>CALCULATOR</span>
          </div>

          <p className="font-sans text-base text-white/60 max-w-xl leading-relaxed mb-8">
            The only free UK budget calculator with irregular income support, sinking funds,
            a method switcher, and a savings goal timeline. No sign-up. No ads.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {["50/30/20 · Zero-Based · Pay Yourself First", "Irregular income mode", "Sinking funds", "Savings goal countdown", "Live pie chart"].map(f => (
              <span key={f} className="text-[9px] font-heading uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-white/40">{f}</span>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-5">

          {/* ── STEP 1: Method + Income mode ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Budgeting method */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
              <p className={labelClass}>Budgeting Method</p>
              <div className="space-y-2 mt-3">
                {([
                  ["5030020",         "50/30/20",           "50% needs · 30% wants · 20% savings"],
                  ["zerobased",       "Zero-Based",          "Every pound gets a job — income − expenses = 0"],
                  ["payyourselffirst","Pay Yourself First",  "Savings come out first, the rest is yours to spend"],
                ] as const).map(([val, label, desc]) => (
                  <button
                    key={val}
                    onClick={() => setMethod(val)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${method === val ? "border-blue-500/50 bg-blue-500/10" : "border-white/8 bg-black/20 hover:border-white/20"}`}
                  >
                    <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 border-2 transition-colors ${method === val ? "border-blue-400 bg-blue-400" : "border-white/20"}`} />
                    <div>
                      <p className={`font-heading text-xs uppercase tracking-wide ${method === val ? "text-blue-400" : "text-white/70"}`}>{label}</p>
                      <p className="font-sans text-[10px] text-white/35 mt-0.5">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Income mode */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
              <p className={labelClass}>Income Type</p>
              <div className="flex gap-2 mt-3 mb-5">
                {(["regular", "irregular"] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setIncomeMode(m)}
                    className={`flex-1 py-2.5 rounded-lg border font-heading text-xs uppercase tracking-widest transition-all ${incomeMode === m ? "border-blue-500/50 bg-blue-500/10 text-blue-400" : "border-white/10 text-white/40 hover:border-white/20"}`}
                  >
                    {m === "regular" ? "Regular" : "Irregular / Freelance"}
                  </button>
                ))}
              </div>

              {incomeMode === "regular" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelClass}>Salary (after tax)</label><Inp value={salary} onChange={setSalary} placeholder="2500" /></div>
                  <div><label className={labelClass}>Other Income</label><Inp value={otherIncome} onChange={setOtherIncome} placeholder="0" /></div>
                  <div><label className={labelClass}>Benefits</label><Inp value={benefits} onChange={setBenefits} placeholder="0" /></div>
                  <div><label className={labelClass}>Pension / Rental</label><Inp value={pension} onChange={setPension} placeholder="0" /></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/8 border border-orange-500/20 mb-3">
                    <Info className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-[10px] text-orange-300/70 leading-relaxed">We use your <strong className="text-orange-300">worst month</strong> as the baseline — budget around what you're guaranteed to earn.</p>
                  </div>
                  <div><label className={labelClass}>Best Month</label><Inp value={bestMonth} onChange={setBestMonth} placeholder="4000" /></div>
                  <div><label className={labelClass}>Average Month</label><Inp value={avgMonth} onChange={setAvgMonth} placeholder="2800" /></div>
                  <div><label className={labelClass}>Worst / Minimum Month</label><Inp value={worstMonth} onChange={setWorstMonth} placeholder="1500" /></div>
                </div>
              )}
            </div>
          </div>

          {/* ── EXPENSES ── */}
          <CollapsibleSection title="🏠  Housing" color="#3b82f6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><label className={labelClass}>Rent / Mortgage</label><Inp value={rent} onChange={setRent} /></div>
              <div><label className={labelClass}>Council Tax</label><Inp value={councilTax} onChange={setCouncilTax} /></div>
              <div><label className={labelClass}>Home Insurance</label><Inp value={homeInsur} onChange={setHomeInsur} /></div>
              <div><label className={labelClass}>Maintenance</label><Inp value={maintenance} onChange={setMaintenance} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="💡  Utilities" color="#06b6d4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div><label className={labelClass}>Gas</label><Inp value={gas} onChange={setGas} /></div>
              <div><label className={labelClass}>Electricity</label><Inp value={electricity} onChange={setElectricity} /></div>
              <div><label className={labelClass}>Water</label><Inp value={water} onChange={setWater} /></div>
              <div><label className={labelClass}>Mobile / Phone</label><Inp value={phone} onChange={setPhone} /></div>
              <div><label className={labelClass}>Broadband</label><Inp value={internet} onChange={setInternet} /></div>
              <div><label className={labelClass}>TV / Streaming</label><Inp value={tv} onChange={setTv} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="🚗  Transport" color="#a78bfa">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div><label className={labelClass}>Car Finance</label><Inp value={carPayment} onChange={setCarPayment} /></div>
              <div><label className={labelClass}>Car Insurance</label><Inp value={carInsur} onChange={setCarInsur} /></div>
              <div><label className={labelClass}>Fuel / Charging</label><Inp value={fuel} onChange={setFuel} /></div>
              <div><label className={labelClass}>Public Transport</label><Inp value={pubTransport} onChange={setPubTransport} /></div>
              <div><label className={labelClass}>MOT / Servicing</label><Inp value={carMaint} onChange={setCarMaint} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="🛒  Food & Household" color="#22c55e">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div><label className={labelClass}>Groceries</label><Inp value={groceries} onChange={setGroceries} /></div>
              <div><label className={labelClass}>Eating Out / Takeaways</label><Inp value={eatingOut} onChange={setEatingOut} /></div>
              <div><label className={labelClass}>Household Items</label><Inp value={household} onChange={setHousehold} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="🎯  Personal & Lifestyle" color="#f97316">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div><label className={labelClass}>Clothing</label><Inp value={clothing} onChange={setClothing} /></div>
              <div><label className={labelClass}>Personal Care</label><Inp value={personalCare} onChange={setPersonalCare} /></div>
              <div><label className={labelClass}>Entertainment</label><Inp value={entertain} onChange={setEntertain} /></div>
              <div><label className={labelClass}>Subscriptions</label><Inp value={subs} onChange={setSubs} /></div>
              <div><label className={labelClass}>Gym / Sports</label><Inp value={gym} onChange={setGym} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="🛡️  Insurance & Healthcare" color="#eab308" defaultOpen={false}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div><label className={labelClass}>Life Insurance</label><Inp value={lifeInsur} onChange={setLifeInsur} /></div>
              <div><label className={labelClass}>Health Insurance</label><Inp value={healthInsur} onChange={setHealthInsur} /></div>
              <div><label className={labelClass}>Healthcare / Dental</label><Inp value={healthcare} onChange={setHealthcare} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="💳  Debts" color="#f43f5e" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelClass}>Loan Payments</label><Inp value={loanPay} onChange={setLoanPay} /></div>
              <div><label className={labelClass}>Credit Card Payments</label><Inp value={creditCards} onChange={setCreditCards} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="📈  Savings & Investments" color="#10b981" defaultOpen={false}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div><label className={labelClass}>Savings / ISA</label><Inp value={savings} onChange={setSavings} /></div>
              <div><label className={labelClass}>Investments</label><Inp value={investments} onChange={setInvestments} /></div>
              <div><label className={labelClass}>Pension Contributions</label><Inp value={pension2} onChange={setPension2} /></div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="👶  Children & Education" color="#ec4899" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelClass}>Childcare / Nursery</label><Inp value={childcare} onChange={setChildcare} /></div>
              <div><label className={labelClass}>School Fees / Supplies</label><Inp value={schoolFees} onChange={setSchoolFees} /></div>
            </div>
          </CollapsibleSection>

          {/* Sinking Funds */}
          <div className="bg-dark-card border border-amber-500/20 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-heading text-xs uppercase tracking-widest text-amber-400">💰  Sinking Funds — Annual Expenses</p>
                <p className="font-sans text-[10px] text-white/35 mt-1">Enter the yearly total — we convert to monthly automatically</p>
              </div>
              <button onClick={addSinkFund} className="flex items-center gap-1.5 text-amber-400 font-heading text-xs uppercase tracking-widest hover:text-amber-300 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="px-6 pb-6 space-y-2">
              {sinkFunds.map(sf => (
                <div key={sf.id} className="grid grid-cols-[1fr_140px_36px] gap-2 items-center">
                  <input
                    value={sf.label} onChange={e => updateSink(sf.id, "label", e.target.value)}
                    placeholder="e.g. Holiday"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = "#f59e0b")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">£/yr</span>
                    <input
                      type="number" step="0.01" min="0"
                      value={sf.annual} onChange={e => updateSink(sf.id, "annual", e.target.value)}
                      placeholder="0"
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = "#f59e0b")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {n(sf.annual) > 0 && (
                    <span className="text-[9px] font-heading text-amber-400 hidden sm:block whitespace-nowrap">
                      £{(n(sf.annual) / 12).toFixed(0)}/mo
                    </span>
                  )}
                  <button onClick={() => removeSink(sf.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {sinkTotal > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-amber-500/10">
                  <span className="font-heading text-[9px] text-amber-400/60 uppercase tracking-widest">Monthly sinking total</span>
                  <span className="font-heading text-sm text-amber-400">{fmt(sinkTotal)}/mo</span>
                </div>
              )}
            </div>
          </div>

          {/* Custom */}
          <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
              <p className="font-heading text-xs uppercase tracking-widest text-white/40">➕  Custom Expenses</p>
              <button onClick={addCustom} className="flex items-center gap-1.5 font-heading text-xs uppercase tracking-widest transition-colors" style={{ color: ACCENT }}>
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            {customItems.length > 0 && (
              <div className="px-6 pb-6 space-y-2">
                {customItems.map(item => (
                  <div key={item.id} className="grid grid-cols-[1fr_120px_36px] gap-2 items-center">
                    <input
                      value={item.label} onChange={e => updateCustom(item.id, "label", e.target.value)}
                      placeholder="Expense name"
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">£</span>
                      <input
                        type="number" step="0.01" min="0"
                        value={item.monthly} onChange={e => updateCustom(item.id, "monthly", e.target.value)}
                        placeholder="0"
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-7 pr-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <button onClick={() => removeCustom(item.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Savings goal */}
          <div className="p-6 bg-dark-card border border-green-500/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-green-400" />
              <p className="font-heading text-xs uppercase tracking-widest text-green-400">Savings Goal</p>
              <span className="text-[9px] font-sans text-white/30 ml-1">— we'll tell you when you'll hit it</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Goal Name</label>
                <input
                  value={goalName} onChange={e => setGoalName(e.target.value)}
                  placeholder="Emergency Fund"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                  onFocus={e => (e.target.style.borderColor = "#22c55e")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label className={labelClass}>Target Amount</label>
                <Inp value={goalAmount} onChange={setGoalAmount} placeholder="5000" />
              </div>
            </div>
          </div>

          {/* ── CALCULATE ── */}
          <button
            onClick={() => setShowResults(true)}
            className="w-full group flex items-center justify-center gap-3 text-white font-heading font-bold py-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, #06b6d4, #22c55e)`,
              boxShadow: `0 0 30px -8px ${ACCENT}80`,
            }}
          >
            <Wallet className="h-4 w-4" />
            Calculate My Budget
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* ── RESULTS ── */}
          {showResults && (
            <div className="space-y-6 pt-4">

              {/* Top KPI cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Monthly Income",   val: fmt(totalIncome),   color: ACCENT,    icon: <TrendingUp className="w-3.5 h-3.5" /> },
                  { label: "Total Expenses",   val: fmt(totalExpenses), color: "#f43f5e", icon: <Wallet className="w-3.5 h-3.5" /> },
                  { label: surplus >= 0 ? "Monthly Surplus" : "Monthly Deficit",
                    val: (surplus >= 0 ? "+" : "-") + fmt(Math.abs(surplus)),
                    color: surplus >= 0 ? "#22c55e" : "#f43f5e",
                    icon: surplus >= 0 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" /> },
                  { label: "Savings Rate",     val: savingsRate.toFixed(1) + "%", color: "#10b981", icon: <Target className="w-3.5 h-3.5" /> },
                ].map(k => (
                  <div key={k.label} className="p-5 bg-dark-card border border-dark-border rounded-2xl">
                    <div className="flex items-center gap-1.5 mb-3" style={{ color: k.color }}>
                      {k.icon}
                      <p className="font-heading text-[9px] uppercase tracking-widest" style={{ color: k.color }}>{k.label}</p>
                    </div>
                    <p className="font-display text-2xl md:text-3xl text-white">{k.val}</p>
                  </div>
                ))}
              </div>

              {/* Savings goal countdown */}
              {n(goalAmount) > 0 && (
                <div className={`p-5 rounded-2xl border flex items-center gap-4 ${surplus > 0 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                  <Target className={`w-8 h-8 flex-shrink-0 ${surplus > 0 ? "text-green-400" : "text-red-400"}`} />
                  <div>
                    <p className={`font-heading text-xs uppercase tracking-widest mb-1 ${surplus > 0 ? "text-green-400" : "text-red-400"}`}>{goalName}</p>
                    {surplus > 0 && monthsToGoal !== null ? (
                      <p className="font-sans text-sm text-white/75">
                        At your current surplus of <strong className="text-white">{fmt(surplus)}/mo</strong>, you'll reach{" "}
                        <strong className="text-white">{fmt(n(goalAmount))}</strong> in{" "}
                        <strong className="text-green-400">{Math.ceil(monthsToGoal)} months</strong>{" "}
                        ({(monthsToGoal / 12).toFixed(1)} years).
                      </p>
                    ) : surplus <= 0 ? (
                      <p className="font-sans text-sm text-red-300/80">You're currently spending more than you earn. Reduce expenses to start saving toward this goal.</p>
                    ) : (
                      <p className="font-sans text-sm text-white/50">Enter a goal amount above to see your timeline.</p>
                    )}
                  </div>
                </div>
              )}

              {/* DTI warning */}
              {dti > 35 && (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading text-xs text-yellow-400 uppercase tracking-widest mb-1">Debt-to-Income Ratio: {dti.toFixed(1)}%</p>
                    <p className="font-sans text-xs text-white/55 leading-relaxed">Your debt payments are {dti.toFixed(1)}% of income. Most lenders prefer below 36%. Above 43% may limit your ability to get a mortgage or new credit.</p>
                  </div>
                </div>
              )}

              {/* Chart + method targets row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Pie chart */}
                <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
                  <p className="font-heading text-xs uppercase tracking-widest text-white/40 mb-5">Spending Breakdown</p>
                  {pieData.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                            paddingAngle={2} dataKey="value" nameKey="name">
                            {pieData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} stroke="transparent" />
                            ))}
                          </Pie>
                          <Tooltip content={<PieTip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-2 gap-1.5 mt-3">
                        {pieData.map(d => (
                          <div key={d.name} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                            <span className="font-sans text-[10px] text-white/50 truncate">{d.name}</span>
                            <span className="font-heading text-[10px] text-white/70 ml-auto">{fmt(d.value)}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-white/20 text-sm font-sans py-10">Enter expenses above to see the chart</p>
                  )}
                </div>

                {/* Method targets */}
                <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
                  <p className="font-heading text-xs uppercase tracking-widest text-white/40 mb-5">
                    {method === "5030020" ? "50/30/20 Analysis" : method === "zerobased" ? "Zero-Based Budget Status" : "Pay Yourself First Status"}
                  </p>
                  <div className="space-y-4">
                    {methodTargets.map(t => {
                      const over = t.actual > t.target + 5;
                      return (
                        <div key={t.label}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-heading text-xs text-white/60 uppercase tracking-wide">{t.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-heading text-xs" style={{ color: t.color }}>{t.actual.toFixed(1)}%</span>
                              <span className="text-white/20 text-xs">/ {t.target}%</span>
                              {over && <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                            </div>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${Math.min(100, t.actual)}%`,
                                backgroundColor: over ? "#f59e0b" : t.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Category bar chart */}
                  {pieData.length > 0 && (
                    <div className="mt-6">
                      <p className="font-heading text-[9px] uppercase tracking-widest text-white/25 mb-3">Category Bars</p>
                      <ResponsiveContainer width="100%" height={160}>
                        <BarChart data={pieData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                          <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} />
                          <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                            formatter={(v: number) => [fmt(v), "Amount"]}
                            labelStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}
                          />
                          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                            {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>

              {/* Full breakdown table */}
              <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-dark-border">
                  <p className="font-heading text-xs uppercase tracking-widest text-white/40">Full Breakdown</p>
                </div>
                <div className="divide-y divide-dark-border">
                  {[
                    { cat: "Housing",   total: housingTotal,   color: CAT_COLORS.Housing },
                    { cat: "Utilities", total: utilitiesTotal, color: CAT_COLORS.Utilities },
                    { cat: "Transport", total: transportTotal, color: CAT_COLORS.Transport },
                    { cat: "Food",      total: foodTotal,      color: CAT_COLORS.Food },
                    { cat: "Personal",  total: personalTotal,  color: CAT_COLORS.Personal },
                    { cat: "Insurance", total: insurTotal,     color: CAT_COLORS.Insurance },
                    { cat: "Debts",     total: debtsTotal,     color: CAT_COLORS.Debts },
                    { cat: "Savings",   total: savingsTotal,   color: CAT_COLORS.Savings },
                    { cat: "Children",  total: childrenTotal,  color: CAT_COLORS.Children },
                    { cat: "Sinking Funds", total: sinkTotal,  color: "#f59e0b" },
                    { cat: "Custom",    total: customTotal,    color: CAT_COLORS.Custom },
                  ].filter(r => r.total > 0).map(row => (
                    <div key={row.cat} className="flex items-center justify-between px-6 py-3 hover:bg-white/2 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                        <span className="font-heading text-xs text-white/60 uppercase tracking-wide">{row.cat}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-white/5 rounded-full h-1.5 hidden sm:block">
                          <div className="h-full rounded-full" style={{ width: `${Math.min(100, (row.total / (totalExpenses || 1)) * 100)}%`, backgroundColor: row.color }} />
                        </div>
                        <span className="font-heading text-sm text-white w-24 text-right">{fmt(row.total)}</span>
                        <span className="font-sans text-xs text-white/30 w-10 text-right">{totalExpenses > 0 ? ((row.total / totalExpenses) * 100).toFixed(0) : 0}%</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-6 py-4 bg-white/3">
                    <span className="font-heading text-xs text-white uppercase tracking-widest">Total Expenses</span>
                    <span className="font-heading text-lg text-white">{fmt(totalExpenses)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── EDITORIAL CONTENT ── */}
          <div className="pt-8 border-t border-dark-border space-y-14">

            {/* 50/30/20 explainer */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-6">
                The <span style={{ color: ACCENT }}>50/30/20</span> Budget Rule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border rounded-xl overflow-hidden mb-6">
                {[
                  { pct: "50%", label: "Needs", color: "#3b82f6", items: ["Rent / mortgage", "Council tax", "Utilities", "Groceries", "Insurance", "Minimum debt payments", "Childcare"] },
                  { pct: "30%", label: "Wants", color: "#f97316", items: ["Dining out", "Entertainment", "Holidays", "Gym", "Subscriptions", "Clothing", "Hobbies"] },
                  { pct: "20%", label: "Savings & Debt", color: "#22c55e", items: ["Emergency fund", "ISA / pension", "Investments", "Extra debt payments", "House deposit", "Future goals"] },
                ].map(col => (
                  <div key={col.label} className="bg-dark-card p-5">
                    <p className="font-display text-4xl mb-1" style={{ color: col.color }}>{col.pct}</p>
                    <p className="font-heading text-xs uppercase tracking-widest text-white mb-3">{col.label}</p>
                    <ul className="space-y-1">
                      {col.items.map(item => (
                        <li key={item} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: col.color }} />
                          <span className="font-sans text-[11px] text-white/50">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border border-white/8 bg-dark-card">
                <p className="font-sans text-sm text-white/60 leading-relaxed">
                  <strong className="text-white">Important:</strong> The 50/30/20 rule uses after-tax take-home pay as the base — not gross salary.
                  If you live in London or another high cost-of-living area, your needs may legitimately exceed 50%. That's fine — adjust the
                  percentages to what works for your situation. The framework is a guide, not a rule.
                </p>
              </div>
            </div>

            {/* Zero-based */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-4">
                Zero-Based <span style={{ color: "#f97316" }}>Budgeting</span>
              </h2>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
                Zero-based budgeting means every pound of income is allocated to a specific category before the month begins —
                including savings. Income minus all allocations = exactly zero. It's the most rigorous budgeting method and is
                particularly powerful for people paying off debt, as it forces intentional decision-making about every pound.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { pro: true,  text: "Forces you to decide where every pound goes before you spend it" },
                  { pro: true,  text: "Excellent for aggressive debt payoff — every surplus is pre-allocated" },
                  { pro: true,  text: "Eliminates 'mystery spending' at the end of the month" },
                  { pro: false, text: "Requires a complete budget re-do each month as income/expenses change" },
                  { pro: false, text: "More time-intensive than simpler methods" },
                  { pro: false, text: "Difficult to implement with genuinely irregular income" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-dark-card border border-dark-border">
                    <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${item.pro ? "bg-green-500/20" : "bg-red-500/20"}`}>
                      <span className={`text-[8px] font-bold ${item.pro ? "text-green-400" : "text-red-400"}`}>{item.pro ? "✓" : "✗"}</span>
                    </div>
                    <p className="font-sans text-xs text-white/60 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Irregular income */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-4">
                Budgeting With <span className="text-orange-400">Irregular Income</span>
              </h2>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
                Freelancers, contractors, commission earners, and seasonal workers face a budgeting challenge that no mainstream
                calculator addresses: your income varies every month. Here's the framework that works.
              </p>
              <div className="space-y-3">
                {[
                  { n: "01", t: "Budget from your worst month", d: "Identify your lowest income month over the past year. Build your essential expenses budget around that figure. If you can't cover essentials on your worst month, you need to either reduce expenses or build a larger buffer first." },
                  { n: "02", t: "Build an income buffer first", d: "Before aggressively saving or investing, build a 2–3 month income buffer in a separate account. This smooths out the feast-and-famine cycle. Think of it as your operating capital, not your emergency fund." },
                  { n: "03", t: "Use sinking funds for irregular expenses", d: "Annual costs (car MOT, insurance renewals, Christmas, holidays) feel manageable when you divide them by 12 and save monthly. Our sinking funds section above handles this automatically." },
                  { n: "04", t: "Allocate surplus months intentionally", d: "In higher-income months, follow a waterfall: (1) top up your income buffer, (2) max out tax-efficient savings (ISA, pension), (3) prepay known future expenses, (4) invest the remainder." },
                ].map(step => (
                  <div key={step.n} className="flex gap-4 p-5 bg-dark-card border border-dark-border rounded-xl">
                    <span className="font-display text-2xl leading-none flex-shrink-0 text-orange-400">{step.n}</span>
                    <div>
                      <p className="font-heading text-xs text-white uppercase tracking-wide mb-1.5">{step.t}</p>
                      <p className="font-sans text-xs text-white/50 leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sinking funds */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-4">
                What Are <span className="text-amber-400">Sinking Funds?</span>
              </h2>
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
                A sinking fund is money you set aside each month for a known future expense. Instead of being blindsided by a £600 car
                service or a £1,200 holiday, you save £50 or £100 per month throughout the year. The "shock" disappears.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { fund: "Holiday", annual: "£1,200", monthly: "£100" },
                  { fund: "Christmas / Gifts", annual: "£600", monthly: "£50" },
                  { fund: "Car MOT/Service", annual: "£360", monthly: "£30" },
                  { fund: "Home Maintenance", annual: "£1,200", monthly: "£100" },
                  { fund: "Clothing & Shoes", annual: "£480", monthly: "£40" },
                  { fund: "Pet Vet Bills", annual: "£600", monthly: "£50" },
                  { fund: "Annual Insurance", annual: "£840", monthly: "£70" },
                  { fund: "Tech / Devices", annual: "£360", monthly: "£30" },
                ].map(f => (
                  <div key={f.fund} className="p-4 bg-dark-card border border-amber-500/15 rounded-xl">
                    <p className="font-heading text-[10px] text-amber-400 uppercase tracking-widest mb-2">{f.fund}</p>
                    <p className="font-display text-xl text-white">{f.monthly}<span className="text-xs text-white/30">/mo</span></p>
                    <p className="font-sans text-[10px] text-white/30 mt-1">= {f.annual}/yr</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick tips */}
            <div className="p-6 bg-dark-card border border-dark-border rounded-2xl">
              <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-6">5 Rules That Actually Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { n: "01", t: "Pay yourself first", d: "Set up a standing order on payday to move savings before you can spend them. Savings you never see, you never miss." },
                  { n: "02", t: "Track for 30 days before setting targets", d: "Budgets built on assumptions fail. One month of honest tracking reveals where money actually goes — usually not where you think." },
                  { n: "03", t: "Audit subscriptions quarterly", d: "Most people have £50–£150/month in subscriptions they've forgotten. Review bank statements every 3 months and cancel anything unused." },
                  { n: "04", t: "Round up debt payments", d: "If your minimum is £47, pay £50 or £60. Small round-ups dramatically accelerate payoff and require almost no willpower." },
                  { n: "05", t: "Review and adjust every month", d: "A budget isn't a set-and-forget document. Life changes — income, expenses, goals. A 15-minute monthly review keeps you on track." },
                ].map(tip => (
                  <div key={tip.n} className="p-4 bg-dark-bg border border-dark-border rounded-xl">
                    <span className="font-display text-2xl leading-none block mb-2" style={{ color: ACCENT }}>{tip.n}</span>
                    <p className="font-heading text-xs text-white uppercase tracking-wide mb-1">{tip.t}</p>
                    <p className="font-sans text-[11px] text-white/45 leading-relaxed">{tip.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related calculators */}
            <div>
              <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-5">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Debt Payoff — Avalanche vs Snowball", desc: "Once you know your budget, see how fast you can clear your debts.", to: "/finance/credit-card-payoff" },
                  { title: "Savings Calculator", desc: "Project how your monthly savings will grow with interest over time.", to: "/finance/savings" },
                  { title: "Salary Calculator", desc: "See your take-home pay after tax and NI before entering your budget.", to: "/finance/salary" },
                ].map(c => (
                  <Link key={c.to} to={c.to}
                    className="flex flex-col gap-2 p-5 bg-dark-card border border-dark-border rounded-xl hover:border-blue-500/40 transition-colors group"
                  >
                    <p className="font-heading text-sm text-white uppercase tracking-wide group-hover:text-blue-400 transition-colors">{c.title}</p>
                    <p className="font-sans text-xs text-white/45 leading-relaxed flex-1">{c.desc}</p>
                    <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <FinancialDisclosure variant="general" />
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
