import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

const SimpleInterest = () => {
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("6");
  const [time, setTime] = useState("5");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    interest: number;
    totalAmount: number;
  } | null>(null);

  const calculateSimpleInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R < 0 || T <= 0) {
      return;
    }

    const interest = (P * R * T) / 100;
    const totalAmount = P + interest;

    setResult({
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    });
  };

  return (
    <>
      <SEO 
        title="Simple Interest Calculator - Calculate Interest Earned"
        description="Free simple interest calculator to calculate interest on loans and investments. Find interest amount and total value."
        keywords="simple interest calculator, simple interest formula, calculate simple interest"
      />
      <CalculatorLayout
        title="Simple Interest Calculator"
        description="Calculate simple interest on your principal amount over time"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />

            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount ({currencies[currency].symbol})</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="5000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time Period (Years)</Label>
              <Input
                id="time"
                type="number"
                step="0.1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="5"
              />
            </div>

            <Button onClick={calculateSimpleInterest} className="w-full">
              Calculate Interest
            </Button>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Formula:</p>
              <p className="text-sm text-muted-foreground">
                Simple Interest = (P × R × T) / 100
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Where P = Principal, R = Rate, T = Time
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-5xl font-bold text-primary">
                    {currencies[currency].symbol}{result.totalAmount.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Principal</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{parseFloat(principal).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Interest Earned</span>
                    <span className="font-semibold text-accent">
                      {currencies[currency].symbol}{result.interest.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold">{rate}% per year</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Time Period</span>
                    <span className="font-semibold">{time} years</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-2">Breakdown</p>
                  <div className="flex gap-2 h-8 rounded-full overflow-hidden">
                    <div
                      className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
                      style={{
                        width: `${(parseFloat(principal) / result.totalAmount) * 100}%`,
                      }}
                    >
                      Principal
                    </div>
                    <div
                      className="bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground"
                      style={{
                        width: `${(result.interest / result.totalAmount) * 100}%`,
                      }}
                    >
                      Interest
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter your values and click Calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
    </>
  );
};

export default SimpleInterest;
