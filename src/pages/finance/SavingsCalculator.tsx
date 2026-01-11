import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { compoundInterestSchema } from "@/lib/validation";
import { toast } from "sonner";

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("1000");
  const [monthlyDeposit, setMonthlyDeposit] = useState("200");
  const [interestRate, setInterestRate] = useState("3");
  const [years, setYears] = useState("10");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    finalBalance: number;
    totalDeposits: number;
    totalInterest: number;
  } | null>(null);

  const calculateSavings = () => {
    const P = parseFloat(initialDeposit);
    const PMT = parseFloat(monthlyDeposit);
    const r = parseFloat(interestRate);
    const t = parseFloat(years);
    const n = parseFloat(compoundFrequency);

    // Validate inputs
    try {
      compoundInterestSchema.parse({
        principal: P,
        rate: r,
        years: t,
        frequency: n,
        contribution: PMT
      });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
      return;
    }

    const rDecimal = r / 100;

    // Future value of initial deposit
    const futureValueInitial = P * Math.pow(1 + rDecimal / n, n * t);

    // Future value of monthly deposits (annuity)
    const monthlyRate = rDecimal / 12;
    const months = t * 12;
    const futureValueMonthly = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const finalBalance = futureValueInitial + futureValueMonthly;
    const totalDeposits = P + (PMT * months);
    const totalInterest = finalBalance - totalDeposits;

    setResult({
      finalBalance: Math.round(finalBalance * 100) / 100,
      totalDeposits: Math.round(totalDeposits * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    });
  };

  return (
    <>
      <SEO 
        title="Savings Calculator - Calculate Your Savings Growth"
        description="Free savings calculator to plan your savings goals. Calculate how your money grows with compound interest, regular deposits, and different compounding frequencies."
        keywords="savings calculator, savings account calculator, compound savings calculator, savings goal calculator"
      />
      <CalculatorLayout
        title="Savings Calculator"
        description="Plan your savings goals and see how your money grows over time"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />

            <div className="space-y-2">
              <Label htmlFor="initialDeposit">Initial Deposit ({currencies[currency].symbol})</Label>
              <Input
                id="initialDeposit"
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                placeholder="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyDeposit">Monthly Deposit ({currencies[currency].symbol})</Label>
              <Input
                id="monthlyDeposit"
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                placeholder="200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compoundFrequency">Compound Frequency</Label>
              <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                <SelectTrigger id="compoundFrequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateSavings} className="w-full">
              Calculate Savings
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Savings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Final Balance</p>
                  <p className="text-5xl font-bold text-primary">
                    {currencies[currency].symbol}{result.finalBalance.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Total Deposits</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{result.totalDeposits.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-semibold text-accent">
                      {currencies[currency].symbol}{result.totalInterest.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Return on Investment</span>
                    <span className="font-semibold">
                      {((result.totalInterest / result.totalDeposits) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-2">Savings Breakdown</p>
                  <div className="flex gap-2 h-8 rounded-full overflow-hidden">
                    <div
                      className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
                      style={{
                        width: `${(result.totalDeposits / result.finalBalance) * 100}%`,
                      }}
                    >
                      Deposits
                    </div>
                    <div
                      className="bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground"
                      style={{
                        width: `${(result.totalInterest / result.finalBalance) * 100}%`,
                      }}
                    >
                      Interest
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter your savings plan details to see projections</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <FinancialDisclaimer type="investment" className="mt-6" />
    </CalculatorLayout>
    </>
  );
};

export default SavingsCalculator;
