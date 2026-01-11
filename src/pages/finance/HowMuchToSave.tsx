import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

export default function HowMuchToSave() {
  const [targetAmount, setTargetAmount] = useState("100000");
  const [initialAmount, setInitialAmount] = useState("10000");
  const [years, setYears] = useState("10");
  const [interestRate, setInterestRate] = useState("7");
  const [frequency, setFrequency] = useState("12");
  const [timing, setTiming] = useState("end");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    periodicContribution: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateContribution = () => {
    const FV = parseFloat(targetAmount);
    const P = parseFloat(initialAmount);
    const t = parseFloat(years);
    const r = parseFloat(interestRate) / 100;
    const n = parseFloat(frequency);

    if (isNaN(FV) || isNaN(P) || isNaN(t) || isNaN(r) || t <= 0) {
      return;
    }

    const i = r / n; // per-period rate
    const N = t * n; // total periods

    const futureValueOfInitial = P * Math.pow(1 + i, N);
    const difference = FV - futureValueOfInitial;

    let C: number;
    if (timing === "end") {
      // End of period contributions
      C = difference * (i / (Math.pow(1 + i, N) - 1));
    } else {
      // Start of period (annuity due)
      C = difference * (i / ((Math.pow(1 + i, N) - 1) * (1 + i)));
    }

    const totalContributions = C * N;
    const totalInterest = FV - P - totalContributions;

    setResult({
      periodicContribution: C,
      totalContributions,
      totalInterest,
    });
  };

  const symbol = currencies[currency].symbol;
  const frequencyLabel = frequency === "12" ? "Monthly" : frequency === "52" ? "Weekly" : frequency === "26" ? "Bi-weekly" : "Annual";
  const seo = seoData['/finance/how-much-to-save'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/how-much-to-save`}
      />
      <CalculatorLayout
      title="How Much Do I Need to Save"
      description="Calculate the periodic contribution needed to reach your savings goal"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  step="100"
                  min="0"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="100000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialAmount">Initial Amount</Label>
                <Input
                  id="initialAmount"
                  type="number"
                  step="100"
                  min="0"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Time Period (years)</Label>
                <Input
                  id="years"
                  type="number"
                  step="0.1"
                  min="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  min="0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="7.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Contribution Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="52">Weekly</SelectItem>
                    <SelectItem value="26">Bi-weekly</SelectItem>
                    <SelectItem value="1">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timing">Contribution Timing</Label>
                <Select value={timing} onValueChange={setTiming}>
                  <SelectTrigger id="timing">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="end">End of period</SelectItem>
                    <SelectItem value="start">Start of period</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <Button onClick={calculateContribution} className="w-full">
              Calculate Required Savings
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Required Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">{frequencyLabel} Contribution</span>
                    <span className="text-2xl font-bold">{symbol}{result.periodicContribution.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Contributions</span>
                    <span className="text-xl font-bold">{symbol}{result.totalContributions.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Interest Earned</span>
                    <span className="text-xl font-bold">{symbol}{result.totalInterest.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>To reach your goal of {symbol}{parseFloat(targetAmount).toLocaleString()} in {years} years, you need to save {symbol}{result.periodicContribution.toFixed(2)} {frequencyLabel.toLowerCase()}.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
}
