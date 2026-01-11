import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

export default function CarLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("25000");
  const [interestRate, setInterestRate] = useState("6");
  const [loanTerm, setLoanTerm] = useState("60");
  const [balloon, setBalloon] = useState("0");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    balloonPayment: number;
  } | null>(null);

  const calculateCarLoan = () => {
    const P = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const N = parseInt(loanTerm);
    const B = parseFloat(balloon);

    if (isNaN(P) || isNaN(rate) || isNaN(N) || isNaN(B) || P <= 0 || N <= 0) {
      return;
    }

    const i = rate / 12; // monthly rate

    // Monthly payment formula with balloon
    const balloonPV = B / Math.pow(1 + i, N);
    const PMT = ((P - balloonPV) * i) / (1 - Math.pow(1 + i, -N));

    const totalPayment = PMT * N + B;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment: PMT,
      totalPayment,
      totalInterest,
      balloonPayment: B,
    });
  };

  const symbol = currencies[currency].symbol;
  const seo = seoData['/finance/car-loan'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/car-loan`}
      />
      <CalculatorLayout
      title="Car Loan Calculator"
      description="Calculate monthly payments for a car loan with optional balloon payment"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  step="100"
                  min="0"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="25000"
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
                  placeholder="6.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (months)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  step="1"
                  min="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="balloon">Balloon Payment (optional)</Label>
                <Input
                  id="balloon"
                  type="number"
                  step="100"
                  min="0"
                  value={balloon}
                  onChange={(e) => setBalloon(e.target.value)}
                  placeholder="0"
                />
              </div>

              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <Button onClick={calculateCarLoan} className="w-full">
              Calculate Payment
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Monthly Payment</span>
                    <span className="text-xl font-bold">{symbol}{result.monthlyPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Balloon Payment</span>
                    <span className="text-xl font-bold">{symbol}{result.balloonPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="text-xl font-bold">{symbol}{result.totalPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Interest</span>
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
