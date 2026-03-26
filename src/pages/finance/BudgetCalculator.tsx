import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { Plus, Trash2, ArrowRight, Wallet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Finance category ──────────────────────────────────────
const ACCENT = "#3B82F6";

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a78bfa", "#f43f5e", "#eab308", "#06b6d4", "#ec4899", "#84cc16"];

const budgetStaticContent = {
  whatIs: {
    title: "What is a Budget Calculator?",
    description: "A budget calculator helps you track, categorize, and manage your monthly income and expenses. By organizing finances into clear categories, you can see exactly where your money goes each month."
  },
  howItWorks: {
    title: "How Does This Budget Calculator Work?",
    description: "This calculator organizes your finances into logical categories, totals your income and expenses, and calculates your remaining balance.",
    steps: [
      { step: 1, title: "Enter Your Income", description: "Add all sources of monthly income including salary, benefits, and other earnings" },
      { step: 2, title: "Fill In Fixed Expenses", description: "Enter regular monthly costs like rent/mortgage, utilities, and insurance" },
      { step: 3, title: "Add Variable Expenses", description: "Include flexible spending on groceries, entertainment, and personal items" },
      { step: 4, title: "Review Your Balance", description: "See your remaining balance and get insights on your spending distribution" }
    ]
  },
  faqs: [
    { question: "What is the 50/30/20 budget rule?", answer: "The 50/30/20 rule suggests allocating 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment." },
    { question: "How often should I review my budget?", answer: "Review monthly at minimum. Many find weekly check-ins helpful. Annual reviews are important for adjusting to life changes." },
    { question: "What expenses should I include?", answer: "Include all regular expenses: housing, utilities, transportation, food, insurance, healthcare, debt payments, subscriptions, and entertainment." },
    { question: "How can I reduce monthly expenses?", answer: "Identify your largest categories, negotiate bills, cut unused subscriptions, meal plan, and shop with lists." },
    { question: "What if expenses exceed income?", answer: "Prioritize essentials first, look for expenses to cut, and consider ways to increase income. Running a deficit long-term leads to growing debt." }
  ],
  tips: [
    "Track every expense for one month before setting budget targets",
    "Build an emergency fund covering 3-6 months of essential expenses",
    "Automate savings by transferring money to savings accounts on payday",
    "Use the envelope system for variable expenses to prevent overspending",
    "Review and adjust your budget when major life changes occur"
  ]
};

interface CustomExpense { id: string; name: string; amount: string; }

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-base font-medium placeholder-white/20 focus:outline-none transition-all";

function DarkInput({ label, value, onChange, placeholder = "0" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputClass}
        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
      <p className="text-[10px] font-heading uppercase tracking-widest mb-6" style={{ color: ACCENT }}>{title}</p>
      {children}
    </div>
  );
}

export default function BudgetCalculator() {
  const [salary, setSalary] = useState(""); const [otherIncome, setOtherIncome] = useState(""); const [benefits, setBenefits] = useState(""); const [pensionIncome, setPensionIncome] = useState("");
  const [rentMortgage, setRentMortgage] = useState(""); const [councilTax, setCouncilTax] = useState(""); const [homeInsurance, setHomeInsurance] = useState(""); const [maintenance, setMaintenance] = useState("");
  const [gas, setGas] = useState(""); const [electricity, setElectricity] = useState(""); const [water, setWater] = useState(""); const [phone, setPhone] = useState(""); const [internet, setInternet] = useState(""); const [tv, setTv] = useState("");
  const [carPayment, setCarPayment] = useState(""); const [carInsurance, setCarInsurance] = useState(""); const [fuel, setFuel] = useState(""); const [publicTransport, setPublicTransport] = useState(""); const [carMaintenance, setCarMaintenance] = useState("");
  const [groceries, setGroceries] = useState(""); const [eatingOut, setEatingOut] = useState(""); const [householdItems, setHouseholdItems] = useState("");
  const [clothing, setClothing] = useState(""); const [personalCare, setPersonalCare] = useState(""); const [entertainment, setEntertainment] = useState(""); const [subscriptions, setSubscriptions] = useState(""); const [gym, setGym] = useState("");
  const [lifeInsurance, setLifeInsurance] = useState(""); const [healthInsurance, setHealthInsurance] = useState(""); const [healthcare, setHealthcare] = useState("");
  const [loanPayments, setLoanPayments] = useState(""); const [creditCards, setCreditCards] = useState(""); const [savings, setSavings] = useState(""); const [investments, setInvestments] = useState("");
  const [customExpenses, setCustomExpenses] = useState<CustomExpense[]>([]);
  const [showResults, setShowResults] = useState(false);

  const p = (v: string) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const addCustomExpense = () => setCustomExpenses([...customExpenses, { id: Date.now().toString(), name: "", amount: "" }]);
  const removeCustomExpense = (id: string) => setCustomExpenses(customExpenses.filter(e => e.id !== id));
  const updateCustomExpense = (id: string, field: "name" | "amount", value: string) => setCustomExpenses(customExpenses.map(e => e.id === id ? { ...e, [field]: value } : e));

  const totalIncome    = p(salary) + p(otherIncome) + p(benefits) + p(pensionIncome);
  const housingTotal   = p(rentMortgage) + p(councilTax) + p(homeInsurance) + p(maintenance);
  const utilitiesTotal = p(gas) + p(electricity) + p(water) + p(phone) + p(internet) + p(tv);
  const transportTotal = p(carPayment) + p(carInsurance) + p(fuel) + p(publicTransport) + p(carMaintenance);
  const foodTotal      = p(groceries) + p(eatingOut) + p(householdItems);
  const personalTotal  = p(clothing) + p(personalCare) + p(entertainment) + p(subscriptions) + p(gym);
  const insuranceTotal = p(lifeInsurance) + p(healthInsurance) + p(healthcare);
  const debtsTotal     = p(loanPayments) + p(creditCards);
  const savingsTotal   = p(savings) + p(investments);
  const customTotal    = customExpenses.reduce((sum, e) => sum + p(e.amount), 0);
  const totalExpenses  = housingTotal + utilitiesTotal + transportTotal + foodTotal + personalTotal + insuranceTotal + debtsTotal + savingsTotal + customTotal;
  const remainingBalance = totalIncome - totalExpenses;

  const chartTooltipStyle = { backgroundColor: "#1C1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white", fontFamily: "Oswald" };

  const expenseCategories = [
    { name: "Housing",          value: housingTotal   },
    { name: "Utilities",        value: utilitiesTotal },
    { name: "Transport",        value: transportTotal },
    { name: "Food & Household", value: foodTotal      },
    { name: "Personal",         value: personalTotal  },
    { name: "Insurance",        value: insuranceTotal },
    { name: "Debts",            value: debtsTotal     },
    { name: "Savings",          value: savingsTotal   },
    { name: "Custom",           value: customTotal    },
  ].filter(c => c.value > 0);

  return (
    <>
      <SEO title="Budget Calculator - Monthly Income & Expense Tracker"
        description="Free budget calculator to track your monthly income and expenses. Categorize spending, add custom expenses, and see your remaining balance."
        keywords="budget calculator, monthly budget, income tracker, expense tracker, financial planning"
        faqSchema={budgetStaticContent.faqs}
        howToSchema={{ name: "How to Create a Monthly Budget", steps: budgetStaticContent.howItWorks.steps?.map(s => ({ name: s.title, text: s.description })) || [] }} />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">

        <div className="max-w-5xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
            <span>/</span>
            <span className="text-white/60">Budget Calculator</span>
          </nav>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 select-none">
          <div className="absolute w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.07] pointer-events-none -z-10" style={{ background: ACCENT }} />
          <h1 className="font-display leading-[0.85] tracking-tighter">
            <span className="block text-[14vw] md:text-[110px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>
              BUDGET
            </span>
            <span className="block text-[9vw] md:text-[70px]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CALCULATOR</span>
          </h1>
          <div className="mt-6 max-w-md pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
            <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Track your monthly income and expenses across every category. See exactly where your money goes.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-8 space-y-4">
          <Section title="Monthly Income">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Salary / Wages"  value={salary}        onChange={setSalary} />
              <DarkInput label="Other Income"    value={otherIncome}   onChange={setOtherIncome} />
              <DarkInput label="Benefits"        value={benefits}      onChange={setBenefits} />
              <DarkInput label="Pension Income"  value={pensionIncome} onChange={setPensionIncome} />
            </div>
          </Section>
          <Section title="Housing">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Rent / Mortgage"       value={rentMortgage}  onChange={setRentMortgage} />
              <DarkInput label="Council Tax"           value={councilTax}    onChange={setCouncilTax} />
              <DarkInput label="Home Insurance"        value={homeInsurance} onChange={setHomeInsurance} />
              <DarkInput label="Maintenance / Repairs" value={maintenance}   onChange={setMaintenance} />
            </div>
          </Section>
          <Section title="Utilities">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Gas"            value={gas}         onChange={setGas} />
              <DarkInput label="Electricity"    value={electricity} onChange={setElectricity} />
              <DarkInput label="Water"          value={water}       onChange={setWater} />
              <DarkInput label="Phone"          value={phone}       onChange={setPhone} />
              <DarkInput label="Internet"       value={internet}    onChange={setInternet} />
              <DarkInput label="TV / Streaming" value={tv}          onChange={setTv} />
            </div>
          </Section>
          <Section title="Transport">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Car Payment"      value={carPayment}      onChange={setCarPayment} />
              <DarkInput label="Car Insurance"    value={carInsurance}    onChange={setCarInsurance} />
              <DarkInput label="Fuel"             value={fuel}            onChange={setFuel} />
              <DarkInput label="Public Transport" value={publicTransport} onChange={setPublicTransport} />
              <DarkInput label="Car Maintenance"  value={carMaintenance}  onChange={setCarMaintenance} />
            </div>
          </Section>
          <Section title="Food & Household">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Groceries"       value={groceries}      onChange={setGroceries} />
              <DarkInput label="Eating Out"      value={eatingOut}      onChange={setEatingOut} />
              <DarkInput label="Household Items" value={householdItems} onChange={setHouseholdItems} />
            </div>
          </Section>
          <Section title="Personal & Lifestyle">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Clothing"      value={clothing}      onChange={setClothing} />
              <DarkInput label="Personal Care" value={personalCare}  onChange={setPersonalCare} />
              <DarkInput label="Entertainment" value={entertainment} onChange={setEntertainment} />
              <DarkInput label="Subscriptions" value={subscriptions} onChange={setSubscriptions} />
              <DarkInput label="Gym / Fitness" value={gym}           onChange={setGym} />
            </div>
          </Section>
          <Section title="Insurance & Healthcare">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Life Insurance"   value={lifeInsurance}   onChange={setLifeInsurance} />
              <DarkInput label="Health Insurance" value={healthInsurance} onChange={setHealthInsurance} />
              <DarkInput label="Healthcare Costs" value={healthcare}      onChange={setHealthcare} />
            </div>
          </Section>
          <Section title="Debts & Savings">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DarkInput label="Loan Payments"        value={loanPayments} onChange={setLoanPayments} />
              <DarkInput label="Credit Card Payments" value={creditCards}  onChange={setCreditCards} />
              <DarkInput label="Savings"              value={savings}      onChange={setSavings} />
              <DarkInput label="Investments"          value={investments}  onChange={setInvestments} />
            </div>
          </Section>

          {/* Custom expenses */}
          <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-heading uppercase tracking-widest" style={{ color: ACCENT }}>Custom Expenses</p>
              <button onClick={addCustomExpense} className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest transition-colors" style={{ color: ACCENT }}>
                <Plus className="h-3 w-3" /> Add Expense
              </button>
            </div>
            {customExpenses.length === 0
              ? <p className="text-white/20 text-xs font-sans text-center py-4">No custom expenses added. Click "Add Expense" above.</p>
              : <div className="space-y-3">
                  {customExpenses.map(expense => (
                    <div key={expense.id} className="flex gap-3 items-center">
                      <input placeholder="Expense name" value={expense.name} onChange={e => updateCustomExpense(expense.id, "name", e.target.value)}
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <input type="number" placeholder="0" value={expense.amount} onChange={e => updateCustomExpense(expense.id, "amount", e.target.value)}
                        className="w-32 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                      <button onClick={() => removeCustomExpense(expense.id)} className="text-white/20 hover:text-red-400 transition-colors p-2"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
            }
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
            style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}>
            <Wallet className="h-4 w-4" /> Calculate Budget <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {showResults && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Income",     val: `£${totalIncome.toFixed(2)}`,    color: ACCENT },
                  { label: "Total Expenses",   val: `£${totalExpenses.toFixed(2)}`,   color: "#ef4444" },
                  { label: "Remaining Balance", val: `${remainingBalance >= 0 ? "+" : ""}£${remainingBalance.toFixed(2)}`, color: remainingBalance >= 0 ? ACCENT : "#ef4444" },
                ].map(({ label, val, color }) => (
                  <div key={label} className="bg-[#252323]/80 border border-white/10 rounded-2xl p-6">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">{label}</p>
                    <p className="font-display text-3xl" style={{ color }}>{val}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#252323]/80 border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-5">Expenses by Category</p>
                <div className="space-y-3">
                  {expenseCategories.map(({ name, value }, i) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                        <span className="font-heading text-xs uppercase tracking-widest text-white/50">{name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(value / totalExpenses) * 100}%`, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                        </div>
                        <span className="font-heading text-sm text-white w-20 text-right">£{value.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {remainingBalance < 0 && <p className="mt-5 text-xs text-red-400 font-sans">⚠ Your expenses exceed your income.</p>}
                {remainingBalance > 0 && <p className="mt-5 text-xs font-sans" style={{ color: ACCENT }}>✓ You have surplus income. Consider increasing savings or investments.</p>}
              </div>

              <div className="bg-[#252323]/80 border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-5">Income vs Expenses</p>
                <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={[{ name: "Monthly", Income: totalIncome, Expenses: totalExpenses }]} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontFamily: "Oswald", fontSize: 11 }} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontFamily: "Oswald", fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => `£${v.toFixed(2)}`} contentStyle={chartTooltipStyle} />
                      <Legend wrapperStyle={{ fontFamily: "Oswald", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }} />
                      <Bar dataKey="Income"   fill={ACCENT}   radius={[6,6,0,0]} />
                      <Bar dataKey="Expenses" fill="#ef4444"  radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <CopyButton accentColor={ACCENT} results={[
                { label: "Total Income", value: `£${totalIncome.toFixed(2)}` },
                { label: "Total Expenses", value: `£${totalExpenses.toFixed(2)}` },
                { label: "Remaining Balance", value: `${remainingBalance >= 0 ? "+" : ""}£${remainingBalance.toFixed(2)}` },
              ]} />

              {expenseCategories.length > 0 && (
                <div className="bg-[#252323]/80 border border-white/10 rounded-2xl p-6 md:p-8">
                  <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-5">Expense Breakdown</p>
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <ResponsiveContainer width="100%" height={380}>
                      <PieChart>
                        <Pie data={expenseCategories} cx="50%" cy="50%" labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={130} dataKey="value">
                          {expenseCategories.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => `£${v.toFixed(2)}`} contentStyle={chartTooltipStyle} />
                        <Legend wrapperStyle={{ fontFamily: "Oswald", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-4"><CalculatorStaticContent {...budgetStaticContent} /></div>
        </div>

        <FinancialDisclosure variant="general" />

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