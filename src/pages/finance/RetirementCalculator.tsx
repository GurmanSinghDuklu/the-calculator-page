import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { retirementSchema } from "@/lib/validation";
import { toast } from "sonner";

interface RetirementResults {
  yearsToRetirement: number;
  totalContributions: number;
  retirementPot: number;
  realPot: number;
  annualIncome: number;
  statePension: number;
  totalAnnualIncome: number;
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("35");
  const [retirementAge, setRetirementAge] = useState("67");
  const [currentPot, setCurrentPot] = useState("25000");
  const [salary, setSalary] = useState("45000");
  const [employeeContribution, setEmployeeContribution] = useState("5");
  const [employerContribution, setEmployerContribution] = useState("3");
  const [inflationRate, setInflationRate] = useState("2");
  const [growthRate, setGrowthRate] = useState("7");
  const [statePension, setStatePension] = useState("11502");
  const [withdrawalRate, setWithdrawalRate] = useState("4");

  const [results, setResults] = useState<RetirementResults | null>(null);

  const calculate = () => {
    const currentAgeNum = parseFloat(currentAge);
    const retirementAgeNum = parseFloat(retirementAge);
    const currentPotNum = parseFloat(currentPot);
    const salaryNum = parseFloat(salary);
    const employeeContributionNum = parseFloat(employeeContribution);
    const employerContributionNum = parseFloat(employerContribution);
    const inflationRateNum = parseFloat(inflationRate);
    const growthRateNum = parseFloat(growthRate);
    const statePensionNum = parseFloat(statePension);
    const withdrawalRateNum = parseFloat(withdrawalRate);

    // Validate inputs
    try {
      retirementSchema.parse({
        currentAge: currentAgeNum,
        retirementAge: retirementAgeNum,
        currentPot: currentPotNum,
        salary: salaryNum,
        employeeContribution: employeeContributionNum,
        employerContribution: employerContributionNum,
        inflationRate: inflationRateNum,
        growthRate: growthRateNum,
        statePension: statePensionNum,
        withdrawalRate: withdrawalRateNum
      });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
      return;
    }

    const years = retirementAgeNum - currentAgeNum;

    const annualContribution = salaryNum * (employeeContributionNum + employerContributionNum) / 100;
    const totalContributions = currentPotNum + (annualContribution * years);

    // Calculate future value with compound growth
    const r = growthRateNum / 100;
    const fvOfCurrentPot = currentPotNum * Math.pow(1 + r, years);
    
    // Future value of annuity (regular contributions)
    const fvOfContributions = annualContribution * ((Math.pow(1 + r, years) - 1) / r);
    
    
    const retirementPot = fvOfCurrentPot + fvOfContributions;

    // Adjust for inflation (real purchasing power)
    const inflationFactor = Math.pow(1 + inflationRateNum / 100, years);
    const realPot = retirementPot / inflationFactor;

    // Annual income using withdrawal rate
    const annualIncome = retirementPot * (withdrawalRateNum / 100);
    const totalAnnualIncome = annualIncome + statePensionNum;

    setResults({
      yearsToRetirement: years,
      totalContributions,
      retirementPot,
      realPot,
      annualIncome,
      statePension: statePensionNum,
      totalAnnualIncome,
    });
  };

  const loadDemo = () => {
    setCurrentAge("35");
    setRetirementAge("67");
    setCurrentPot("25000");
    setSalary("45000");
    setEmployeeContribution("5");
    setEmployerContribution("3");
    setInflationRate("2");
    setGrowthRate("7");
    setStatePension("11502");
    setWithdrawalRate("4");
    setTimeout(calculate, 100);
  };

  const fmt = (n: number) => {
    if (!isFinite(n)) return "—";
    return "£" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

  const faqSchema = [
    { question: "How much do I need to retire comfortably in the UK?", answer: "The Pensions and Lifetime Savings Association suggests you need about £31,000 per year for a moderate retirement lifestyle in the UK, or £43,000 for a comfortable retirement. This varies based on your location, lifestyle expectations, and whether you own your home outright." },
    { question: "What is the 4% withdrawal rule?", answer: "The 4% rule suggests you can withdraw 4% of your retirement pot annually without running out of money over a 30-year retirement. This rate accounts for inflation adjustments and market fluctuations. Some financial advisors now suggest 3-3.5% may be more sustainable given current market conditions." },
    { question: "How much State Pension will I get?", answer: "The full new State Pension in the UK is £11,502 per year (2024/25). To get the full amount, you need 35 qualifying years of National Insurance contributions. You can check your State Pension forecast at gov.uk to see your estimated amount." },
    { question: "What age can I access my pension in the UK?", answer: "You can access your private pension from age 55 (rising to 57 in 2028). The State Pension age is currently 66 and will rise to 67 between 2026-2028, and to 68 between 2044-2046. Early withdrawal may impact the sustainability of your retirement savings." },
    { question: "Should I increase my pension contributions?", answer: "If your employer offers matching contributions, aim to contribute at least enough to get the full match - it is essentially free money. Beyond that, consider contributing more if you can afford it, especially if you are behind on retirement savings. The tax relief on pension contributions makes them particularly efficient." }
  ];

  return (
    <>
      <SEO 
        title="Retirement Calculator UK - Plan Your Pension & Retirement Income"
        description="Free UK retirement calculator to estimate your pension pot and annual retirement income. Includes state pension, employer contributions, and inflation adjustments."
        keywords="retirement calculator UK, pension calculator, retirement planning calculator, state pension calculator, pension pot calculator"
        faqSchema={faqSchema}
      />
      <CalculatorLayout
        title="Retirement Calculator (UK)"
        description="Estimate your retirement pot and yearly income. Includes State Pension and income breakdown."
      >
      <div className="space-y-6">
        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Enter your current situation and retirement goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentAge">Current age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  min="18"
                  max="80"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="35"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retirementAge">Retirement age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  min="50"
                  max="75"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  placeholder="67"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPot">Current pension pot (£)</Label>
                <Input
                  id="currentPot"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentPot}
                  onChange={(e) => setCurrentPot(e.target.value)}
                  placeholder="25000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Gross salary (£/year)</Label>
                <Input
                  id="salary"
                  type="number"
                  min="0"
                  step="0.01"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="45000"
                />
              </div>
            </div>

            <div className="border-t pt-4" />

            {/* Contributions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeContribution">Employee contribution (% of salary)</Label>
                <Input
                  id="employeeContribution"
                  type="number"
                  min="0"
                  step="0.1"
                  value={employeeContribution}
                  onChange={(e) => setEmployeeContribution(e.target.value)}
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employerContribution">Employer contribution (% of salary)</Label>
                <Input
                  id="employerContribution"
                  type="number"
                  min="0"
                  step="0.1"
                  value={employerContribution}
                  onChange={(e) => setEmployerContribution(e.target.value)}
                  placeholder="3"
                />
              </div>
            </div>

            <div className="border-t pt-4" />

            {/* Rates & Assumptions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inflationRate">Inflation rate (%)</Label>
                <Input
                  id="inflationRate"
                  type="number"
                  min="0"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  placeholder="2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="growthRate">Growth rate (% p.a.)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  min="0"
                  step="0.1"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  placeholder="7"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statePension">State pension (£/year)</Label>
                <Input
                  id="statePension"
                  type="number"
                  min="0"
                  step="0.01"
                  value={statePension}
                  onChange={(e) => setStatePension(e.target.value)}
                  placeholder="11502"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdrawalRate">Withdrawal rate (%)</Label>
                <Input
                  id="withdrawalRate"
                  type="number"
                  min="0"
                  step="0.1"
                  value={withdrawalRate}
                  onChange={(e) => setWithdrawalRate(e.target.value)}
                  placeholder="4"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={calculate} className="bg-[var(--gradient-primary)] text-white">
                Calculate
              </Button>
              <Button variant="outline" onClick={loadDemo}>
                Quick Demo
              </Button>
              <p className="text-sm text-muted-foreground self-center">
                Default values based on UK averages. Adjust to match your situation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card className="border-2 border-primary/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle className="text-xl">Your Retirement Projection</CardTitle>
              <CardDescription>Based on {results.yearsToRetirement} years until retirement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">Retirement Pot (nominal)</div>
                  <div className="text-2xl font-bold text-primary">{fmt(results.retirementPot)}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-secondary/10">
                  <div className="text-sm text-muted-foreground mb-1">Real Value (today's £)</div>
                  <div className="text-2xl font-bold text-secondary">{fmt(results.realPot)}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-accent/10">
                  <div className="text-sm text-muted-foreground mb-1">Total Contributions</div>
                  <div className="text-2xl font-bold text-accent">{fmt(results.totalContributions)}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">Total Annual Income</div>
                  <div className="text-2xl font-bold text-primary">{fmt(results.totalAnnualIncome)}</div>
                </div>
              </div>

              {/* Income Breakdown Chart */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Annual Income Sources</h3>
                <div className="bg-muted/30 rounded-lg p-4 border border-primary/10">
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Pension Withdrawal', value: results.annualIncome },
                          { name: 'State Pension', value: results.statePension },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={(entry) => `${fmt(entry.value)}`}
                      >
                        {[0, 1].map((index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                        formatter={(value: number) => fmt(value)}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
                <div className="bg-muted/30 rounded-lg p-4 border border-primary/10 overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">Years to retirement</td>
                        <td className="py-3 text-right font-semibold">{results.yearsToRetirement}</td>
                      </tr>
                      <tr className="hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">Annual contribution</td>
                        <td className="py-3 text-right font-semibold">
                          {fmt(parseFloat(salary) * (parseFloat(employeeContribution) + parseFloat(employerContribution)) / 100)}
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">Total contributions over {results.yearsToRetirement} years</td>
                        <td className="py-3 text-right font-semibold">{fmt(results.totalContributions)}</td>
                      </tr>
                      <tr className="hover:bg-muted/20 bg-primary/5">
                        <td className="py-3 font-semibold">Retirement pot (nominal)</td>
                        <td className="py-3 text-right font-bold text-primary text-lg">{fmt(results.retirementPot)}</td>
                      </tr>
                      <tr className="hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">Real value (adjusted for {inflationRate}% inflation)</td>
                        <td className="py-3 text-right font-semibold text-secondary">{fmt(results.realPot)}</td>
                      </tr>
                      <tr className="hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">Annual income from pot ({withdrawalRate}% withdrawal)</td>
                        <td className="py-3 text-right font-semibold">{fmt(results.annualIncome)}</td>
                      </tr>
                      <tr className="hover:bg-muted/20">
                        <td className="py-3 text-muted-foreground">State pension</td>
                        <td className="py-3 text-right font-semibold">{fmt(results.statePension)}</td>
                      </tr>
                      <tr className="hover:bg-muted/20 bg-primary/5">
                        <td className="py-3 font-semibold">Total annual retirement income</td>
                        <td className="py-3 text-right font-bold text-primary text-lg">{fmt(results.totalAnnualIncome)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-sm">Important Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Calculations assume constant contribution and growth rates</li>
                  <li>Real value shows purchasing power in today's money after inflation</li>
                  <li>Withdrawal rate is commonly 4% for sustainable retirement income</li>
                  <li>State pension amount varies; check gov.uk for your forecast</li>
                  <li>This is an estimate - consult a financial advisor for personalized advice</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        <FinancialDisclaimer type="retirement" className="mt-6" />

        {/* Static SEO Content */}
        <CalculatorStaticContent
          whatIs={{
            title: "What is Retirement Planning?",
            description: "Retirement planning is the process of determining your retirement income goals and the actions needed to achieve them. It involves estimating future expenses, calculating required savings, and developing a strategy to build your pension pot. In the UK, retirement income typically comes from three sources: the State Pension, workplace pensions, and personal savings or investments. Starting early and contributing consistently are key to building a comfortable retirement fund."
          }}
          howItWorks={{
            title: "How to Use This Retirement Calculator",
            description: "This calculator projects your retirement pot based on your current pension savings, contributions, expected growth, and the UK State Pension.",
            steps: [
              { step: 1, title: "Enter Your Current Details", description: "Input your age, target retirement age, current pension pot value, and gross annual salary. These form the baseline for your projection." },
              { step: 2, title: "Set Contribution Rates", description: "Enter your employee and employer contribution percentages. Under auto-enrolment, the minimum is 5% employee and 3% employer, but contributing more builds wealth faster." },
              { step: 3, title: "Adjust Growth and Inflation", description: "Set expected investment growth rate (historically 5-7% after inflation) and inflation rate (typically 2-3% in the UK)." },
              { step: 4, title: "Include State Pension", description: "Enter your expected State Pension amount. Check gov.uk for your personal forecast based on your National Insurance record." },
              { step: 5, title: "Choose Withdrawal Rate", description: "The 4% rule is a common starting point for sustainable retirement income, though some advisors recommend 3-3.5% for longer retirements." }
            ]
          }}
          formula={{
            title: "The Retirement Calculation",
            formula: "FV = PV × (1+r)^n + PMT × [(1+r)^n - 1] / r",
            explanation: "Where FV is the future value (retirement pot), PV is the present value (current pot), r is the annual growth rate, n is years until retirement, and PMT is the annual contribution. The real value adjusts for inflation to show purchasing power in todays money. Your annual retirement income is calculated using your chosen withdrawal rate multiplied by your pot, plus the State Pension."
          }}
          tips={[
            "Take full advantage of employer matching - it is free money for your retirement",
            "Use salary sacrifice if available - it reduces your tax and National Insurance contributions",
            "Review your pension investments regularly - ensure they match your risk tolerance and timeline",
            "Consider consolidating old workplace pensions to simplify management and reduce fees",
            "Check your State Pension forecast at gov.uk and fill any gaps in your National Insurance record"
          ]}
          faqs={faqSchema}
        />
      </div>
    </CalculatorLayout>
    </>
  );
}