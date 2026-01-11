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

export default function HowLongToSave() {
  const [targetAmount, setTargetAmount] = useState("100000");
  const [initialAmount, setInitialAmount] = useState("10000");
  const [contribution, setContribution] = useState("500");
  const [interestRate, setInterestRate] = useState("7");
  const [frequency, setFrequency] = useState("12");
  const [timing, setTiming] = useState("end");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    periods: number;
    years: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateTime = () => {
    const FV = parseFloat(targetAmount);
    const P = parseFloat(initialAmount);
    const C = parseFloat(contribution);
    const r = parseFloat(interestRate) / 100;
    const n = parseFloat(frequency);

    if (isNaN(FV) || isNaN(P) || isNaN(C) || isNaN(r) || FV <= P) {
      return;
    }

    const i = r / n; // per-period rate

    // Adjust for annuity due
    const adjustedC = timing === "start" ? C * (1 + i) : C;

    let N: number;
    if (i === 0) {
      // Zero rate edge case
      N = (FV - P) / adjustedC;
    } else {
      // Calculate periods
      N = Math.log((FV * i + adjustedC) / (P * i + adjustedC)) / Math.log(1 + i);
    }

    const years = N / n;
    const totalContributions = adjustedC * N;
    const totalInterest = FV - P - totalContributions;

    setResult({
      periods: N,
      years,
      totalContributions,
      totalInterest,
    });
  };

  const symbol = currencies[currency].symbol;
  const frequencyLabel = frequency === "12" ? "month" : frequency === "52" ? "week" : frequency === "1" ? "year" : "period";
  const seo = seoData['/finance/how-long-to-save'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/how-long-to-save`}
      />
      <CalculatorLayout
      title="How Long to Save For"
      description="Calculate how long it will take to reach your savings goal"
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
                <Label htmlFor="contribution">Regular Contribution</Label>
                <Input
                  id="contribution"
                  type="number"
                  step="10"
                  min="0"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="500"
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

            <Button onClick={calculateTime} className="w-full">
              Calculate Time Needed
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Time to Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Time Required</span>
                    <span className="text-2xl font-bold">{result.years.toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Number of Payments</span>
                    <span className="text-xl font-bold">{Math.ceil(result.periods)} {frequencyLabel}s</span>
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
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
    </>
  );
}
