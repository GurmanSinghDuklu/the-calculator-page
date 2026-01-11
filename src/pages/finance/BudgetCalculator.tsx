import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { Plus, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const budgetStaticContent = {
  whatIs: {
    title: "What is a Budget Calculator?",
    description: "A budget calculator is a comprehensive financial planning tool that helps you track, categorize, and manage your monthly income and expenses. By organizing your finances into clear categories like housing, utilities, transportation, food, and personal spending, you can see exactly where your money goes each month. This visibility is the first step toward achieving financial goals, building savings, and eliminating unnecessary expenses. Whether you're creating your first budget or refining an existing one, this calculator provides the clarity you need to take control of your finances."
  },
  howItWorks: {
    title: "How Does This Budget Calculator Work?",
    description: "This calculator organizes your finances into logical categories, totals your income and expenses, and calculates your remaining balance. It provides visual breakdowns through charts to help you understand your spending patterns at a glance.",
    steps: [
      { step: 1, title: "Enter Your Income", description: "Add all sources of monthly income including salary, benefits, and other earnings" },
      { step: 2, title: "Fill In Fixed Expenses", description: "Enter regular monthly costs like rent/mortgage, utilities, and insurance" },
      { step: 3, title: "Add Variable Expenses", description: "Include flexible spending on groceries, entertainment, and personal items" },
      { step: 4, title: "Review Your Balance", description: "See your remaining balance and get insights on your spending distribution" }
    ]
  },
  faqs: [
    {
      question: "What is the 50/30/20 budget rule?",
      answer: "The 50/30/20 rule is a popular budgeting guideline that suggests allocating 50% of your after-tax income to needs (housing, utilities, groceries), 30% to wants (entertainment, dining out, hobbies), and 20% to savings and debt repayment. It's a simple framework to ensure balanced spending."
    },
    {
      question: "How often should I review my budget?",
      answer: "Review your budget monthly at minimum to track actual spending against planned amounts. Many people find weekly check-ins helpful for staying on track. Annual reviews are important for adjusting to life changes like raises, new expenses, or changed financial goals."
    },
    {
      question: "What expenses should I include in my budget?",
      answer: "Include all regular expenses: housing, utilities, transportation, food, insurance, healthcare, debt payments, subscriptions, personal care, and entertainment. Don't forget irregular expenses like annual subscriptions, car maintenance, gifts, and holiday spending—divide these by 12 to include monthly."
    },
    {
      question: "How can I reduce my monthly expenses?",
      answer: "Start by identifying your largest expense categories. Common ways to reduce spending include: negotiating bills, cutting unused subscriptions, meal planning to reduce food costs, using public transport, shopping with lists, and finding free entertainment options. Small changes across categories add up significantly."
    },
    {
      question: "What if my expenses exceed my income?",
      answer: "If you're spending more than you earn, prioritize essential expenses first (housing, utilities, food, transportation). Look for expenses to cut or reduce, consider ways to increase income, and avoid taking on new debt. Creating a deficit budget is unsustainable and leads to growing debt."
    }
  ],
  tips: [
    "Track every expense for one month before setting budget targets—awareness is key",
    "Build an emergency fund covering 3-6 months of essential expenses",
    "Automate savings by transferring money to savings accounts on payday",
    "Use the envelope system for variable expenses to prevent overspending",
    "Review and adjust your budget when major life changes occur"
  ]
};

interface CustomExpense {
  id: string;
  name: string;
  amount: string;
}

export default function BudgetCalculator() {
  // Income
  const [salary, setSalary] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [benefits, setBenefits] = useState("");
  const [pensionIncome, setPensionIncome] = useState("");

  // Housing
  const [rentMortgage, setRentMortgage] = useState("");
  const [councilTax, setCouncilTax] = useState("");
  const [homeInsurance, setHomeInsurance] = useState("");
  const [maintenance, setMaintenance] = useState("");

  // Utilities
  const [gas, setGas] = useState("");
  const [electricity, setElectricity] = useState("");
  const [water, setWater] = useState("");
  const [phone, setPhone] = useState("");
  const [internet, setInternet] = useState("");
  const [tv, setTv] = useState("");

  // Transport
  const [carPayment, setCarPayment] = useState("");
  const [carInsurance, setCarInsurance] = useState("");
  const [fuel, setFuel] = useState("");
  const [publicTransport, setPublicTransport] = useState("");
  const [carMaintenance, setCarMaintenance] = useState("");

  // Food & Household
  const [groceries, setGroceries] = useState("");
  const [eatingOut, setEatingOut] = useState("");
  const [householdItems, setHouseholdItems] = useState("");

  // Personal & Lifestyle
  const [clothing, setClothing] = useState("");
  const [personalCare, setPersonalCare] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [subscriptions, setSubscriptions] = useState("");
  const [gym, setGym] = useState("");

  // Insurance & Healthcare
  const [lifeInsurance, setLifeInsurance] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [healthcare, setHealthcare] = useState("");

  // Debts & Savings
  const [loanPayments, setLoanPayments] = useState("");
  const [creditCards, setCreditCards] = useState("");
  const [savings, setSavings] = useState("");
  const [investments, setInvestments] = useState("");

  // Custom Expenses
  const [customExpenses, setCustomExpenses] = useState<CustomExpense[]>([]);
  const [showResults, setShowResults] = useState(false);

  const parseValue = (value: string): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const addCustomExpense = () => {
    setCustomExpenses([
      ...customExpenses,
      { id: Date.now().toString(), name: "", amount: "" },
    ]);
  };

  const removeCustomExpense = (id: string) => {
    setCustomExpenses(customExpenses.filter((expense) => expense.id !== id));
  };

  const updateCustomExpense = (id: string, field: "name" | "amount", value: string) => {
    setCustomExpenses(
      customExpenses.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  };

  const calculateBudget = () => {
    setShowResults(true);
  };

  const totalIncome =
    parseValue(salary) +
    parseValue(otherIncome) +
    parseValue(benefits) +
    parseValue(pensionIncome);

  const housingTotal =
    parseValue(rentMortgage) +
    parseValue(councilTax) +
    parseValue(homeInsurance) +
    parseValue(maintenance);

  const utilitiesTotal =
    parseValue(gas) +
    parseValue(electricity) +
    parseValue(water) +
    parseValue(phone) +
    parseValue(internet) +
    parseValue(tv);

  const transportTotal =
    parseValue(carPayment) +
    parseValue(carInsurance) +
    parseValue(fuel) +
    parseValue(publicTransport) +
    parseValue(carMaintenance);

  const foodTotal =
    parseValue(groceries) +
    parseValue(eatingOut) +
    parseValue(householdItems);

  const personalTotal =
    parseValue(clothing) +
    parseValue(personalCare) +
    parseValue(entertainment) +
    parseValue(subscriptions) +
    parseValue(gym);

  const insuranceTotal =
    parseValue(lifeInsurance) +
    parseValue(healthInsurance) +
    parseValue(healthcare);

  const debtsTotal =
    parseValue(loanPayments) + parseValue(creditCards);

  const savingsTotal =
    parseValue(savings) + parseValue(investments);

  const customTotal = customExpenses.reduce(
    (sum, expense) => sum + parseValue(expense.amount),
    0
  );

  const totalExpenses =
    housingTotal +
    utilitiesTotal +
    transportTotal +
    foodTotal +
    personalTotal +
    insuranceTotal +
    debtsTotal +
    savingsTotal +
    customTotal;

  const remainingBalance = totalIncome - totalExpenses;

  return (
    <CalculatorLayout
      title="Budget Calculator"
      description="Track your monthly income and expenses to manage your budget effectively"
    >
      <SEO
        title="Budget Calculator - Monthly Income & Expense Tracker"
        description="Free budget calculator to track your monthly income and expenses. Categorize spending, add custom expenses, and see your remaining balance."
        keywords="budget calculator, monthly budget, income tracker, expense tracker, financial planning"
        faqSchema={budgetStaticContent.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))}
        howToSchema={{
          name: "How to Create a Monthly Budget",
          steps: budgetStaticContent.howItWorks.steps?.map(s => ({ name: s.title, text: s.description })) || []
        }}
      />

      <div className="space-y-6">
        {/* Income Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary/Wages</Label>
                <Input
                  id="salary"
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherIncome">Other Income</Label>
                <Input
                  id="otherIncome"
                  type="number"
                  value={otherIncome}
                  onChange={(e) => setOtherIncome(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Input
                  id="benefits"
                  type="number"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pensionIncome">Pension Income</Label>
                <Input
                  id="pensionIncome"
                  type="number"
                  value={pensionIncome}
                  onChange={(e) => setPensionIncome(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Housing Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Housing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rentMortgage">Rent/Mortgage</Label>
                <Input
                  id="rentMortgage"
                  type="number"
                  value={rentMortgage}
                  onChange={(e) => setRentMortgage(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="councilTax">Council Tax</Label>
                <Input
                  id="councilTax"
                  type="number"
                  value={councilTax}
                  onChange={(e) => setCouncilTax(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeInsurance">Home Insurance</Label>
                <Input
                  id="homeInsurance"
                  type="number"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenance">Maintenance/Repairs</Label>
                <Input
                  id="maintenance"
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Utilities Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Utilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gas">Gas</Label>
                <Input
                  id="gas"
                  type="number"
                  value={gas}
                  onChange={(e) => setGas(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electricity">Electricity</Label>
                <Input
                  id="electricity"
                  type="number"
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="water">Water</Label>
                <Input
                  id="water"
                  type="number"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="internet">Internet</Label>
                <Input
                  id="internet"
                  type="number"
                  value={internet}
                  onChange={(e) => setInternet(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tv">TV/Streaming</Label>
                <Input
                  id="tv"
                  type="number"
                  value={tv}
                  onChange={(e) => setTv(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transport Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Transport</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carPayment">Car Payment</Label>
                <Input
                  id="carPayment"
                  type="number"
                  value={carPayment}
                  onChange={(e) => setCarPayment(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carInsurance">Car Insurance</Label>
                <Input
                  id="carInsurance"
                  type="number"
                  value={carInsurance}
                  onChange={(e) => setCarInsurance(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel</Label>
                <Input
                  id="fuel"
                  type="number"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicTransport">Public Transport</Label>
                <Input
                  id="publicTransport"
                  type="number"
                  value={publicTransport}
                  onChange={(e) => setPublicTransport(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carMaintenance">Car Maintenance</Label>
                <Input
                  id="carMaintenance"
                  type="number"
                  value={carMaintenance}
                  onChange={(e) => setCarMaintenance(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Food & Household Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Food & Household</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groceries">Groceries</Label>
                <Input
                  id="groceries"
                  type="number"
                  value={groceries}
                  onChange={(e) => setGroceries(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eatingOut">Eating Out</Label>
                <Input
                  id="eatingOut"
                  type="number"
                  value={eatingOut}
                  onChange={(e) => setEatingOut(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="householdItems">Household Items</Label>
                <Input
                  id="householdItems"
                  type="number"
                  value={householdItems}
                  onChange={(e) => setHouseholdItems(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal & Lifestyle Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Personal & Lifestyle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clothing">Clothing</Label>
                <Input
                  id="clothing"
                  type="number"
                  value={clothing}
                  onChange={(e) => setClothing(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personalCare">Personal Care</Label>
                <Input
                  id="personalCare"
                  type="number"
                  value={personalCare}
                  onChange={(e) => setPersonalCare(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entertainment">Entertainment</Label>
                <Input
                  id="entertainment"
                  type="number"
                  value={entertainment}
                  onChange={(e) => setEntertainment(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscriptions">Subscriptions</Label>
                <Input
                  id="subscriptions"
                  type="number"
                  value={subscriptions}
                  onChange={(e) => setSubscriptions(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gym">Gym/Fitness</Label>
                <Input
                  id="gym"
                  type="number"
                  value={gym}
                  onChange={(e) => setGym(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insurance & Healthcare Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Insurance & Healthcare</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lifeInsurance">Life Insurance</Label>
                <Input
                  id="lifeInsurance"
                  type="number"
                  value={lifeInsurance}
                  onChange={(e) => setLifeInsurance(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="healthInsurance">Health Insurance</Label>
                <Input
                  id="healthInsurance"
                  type="number"
                  value={healthInsurance}
                  onChange={(e) => setHealthInsurance(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="healthcare">Healthcare Costs</Label>
                <Input
                  id="healthcare"
                  type="number"
                  value={healthcare}
                  onChange={(e) => setHealthcare(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debts & Savings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Debts & Savings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanPayments">Loan Payments</Label>
                <Input
                  id="loanPayments"
                  type="number"
                  value={loanPayments}
                  onChange={(e) => setLoanPayments(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditCards">Credit Card Payments</Label>
                <Input
                  id="creditCards"
                  type="number"
                  value={creditCards}
                  onChange={(e) => setCreditCards(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savings">Savings</Label>
                <Input
                  id="savings"
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investments">Investments</Label>
                <Input
                  id="investments"
                  type="number"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Expenses Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">Custom Expenses</CardTitle>
            <Button
              onClick={addCustomExpense}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {customExpenses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No custom expenses added. Click "Add Expense" to add one.
              </p>
            ) : (
              <div className="space-y-3">
                {customExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Expense name"
                        value={expense.name}
                        onChange={(e) =>
                          updateCustomExpense(expense.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={(e) =>
                          updateCustomExpense(expense.id, "amount", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeCustomExpense(expense.id)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calculate Button */}
        <div className="flex justify-center">
          <Button onClick={calculateBudget} size="lg" className="w-full sm:w-auto">
            Calculate Budget
          </Button>
        </div>

        {/* Results Section */}
        {showResults && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Breakdown */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Income</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Income</span>
                    <span className="text-primary">{totalIncome.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Expenses by Category</h3>
                <div className="space-y-2">
                  {housingTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Housing</span>
                      <span className="font-medium">{housingTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {utilitiesTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Utilities</span>
                      <span className="font-medium">{utilitiesTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {transportTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Transport</span>
                      <span className="font-medium">{transportTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {foodTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Food & Household</span>
                      <span className="font-medium">{foodTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {personalTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Personal & Lifestyle</span>
                      <span className="font-medium">{personalTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {insuranceTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Insurance & Healthcare</span>
                      <span className="font-medium">{insuranceTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {debtsTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Debt Payments</span>
                      <span className="font-medium">{debtsTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {savingsTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Savings & Investments</span>
                      <span className="font-medium">{savingsTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {customTotal > 0 && (
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Custom Expenses</span>
                      <span className="font-medium">{customTotal.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Expenses</span>
                    <span className="text-destructive">{totalExpenses.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Income vs Expenses Bar Chart */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Income vs Expenses</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        {
                          name: "Monthly Budget",
                          Income: totalIncome,
                          Expenses: totalExpenses,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        tick={{ fill: "hsl(var(--foreground))" }}
                      />
                      <Tooltip
                        formatter={(value: number) => value.toFixed(2)}
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "14px" }} />
                      <Bar dataKey="Income" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="Expenses" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Expense Breakdown Chart */}
              {totalExpenses > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Expense Breakdown</h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={[
                            housingTotal > 0 && { name: "Housing", value: housingTotal },
                            utilitiesTotal > 0 && { name: "Utilities", value: utilitiesTotal },
                            transportTotal > 0 && { name: "Transport", value: transportTotal },
                            foodTotal > 0 && { name: "Food & Household", value: foodTotal },
                            personalTotal > 0 && { name: "Personal & Lifestyle", value: personalTotal },
                            insuranceTotal > 0 && { name: "Insurance & Healthcare", value: insuranceTotal },
                            debtsTotal > 0 && { name: "Debt Payments", value: debtsTotal },
                            savingsTotal > 0 && { name: "Savings & Investments", value: savingsTotal },
                            customTotal > 0 && { name: "Custom Expenses", value: customTotal },
                          ].filter(Boolean)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="hsl(var(--primary))"
                          dataKey="value"
                        >
                          {[
                            "hsl(var(--chart-1))",
                            "hsl(var(--chart-2))",
                            "hsl(var(--chart-3))",
                            "hsl(var(--chart-4))",
                            "hsl(var(--chart-5))",
                            "hsl(var(--primary))",
                            "hsl(var(--secondary))",
                            "hsl(var(--accent))",
                            "hsl(var(--muted))",
                          ].map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => value.toFixed(2)}
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          wrapperStyle={{ fontSize: "14px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <div
                  className={`bg-gradient-to-r ${
                    remainingBalance >= 0
                      ? "from-primary/10 to-secondary/10"
                      : "from-destructive/10 to-destructive/20"
                  } rounded-lg p-6`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="text-xl font-bold">Remaining Balance</span>
                    <span
                      className={`text-2xl sm:text-3xl font-bold ${
                        remainingBalance >= 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {remainingBalance >= 0 ? "+" : ""}
                      {remainingBalance.toFixed(2)}
                    </span>
                  </div>
                  {remainingBalance < 0 && (
                    <p className="text-sm text-destructive mt-2 text-center sm:text-left">
                      Your expenses exceed your income. Consider reducing expenses or
                      increasing income.
                    </p>
                  )}
                  {remainingBalance > 0 && (
                    <p className="text-sm text-muted-foreground mt-2 text-center sm:text-left">
                      You have surplus income. Consider increasing savings or
                      investments.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <CalculatorStaticContent {...budgetStaticContent} />
      </div>
    </CalculatorLayout>
  );
}