import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

export default function MortgageOverpayment() {
  const [principal, setPrincipal] = useState("300000");
  const [interestRate, setInterestRate] = useState("4");
  const [termYears, setTermYears] = useState("30");
  const [monthlyOverpayment, setMonthlyOverpayment] = useState("200");
  const [lumpSum, setLumpSum] = useState("10000");
  const [lumpSumMonth, setLumpSumMonth] = useState("12");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [regularResult, setRegularResult] = useState<{
    basePayment: number;
    newPayment: number;
    newTerm: number;
    interestSaved: number;
    timeSaved: number;
  } | null>(null);
  const [lumpResult, setLumpResult] = useState<{
    basePayment: number;
    outstandingBefore: number;
    outstandingAfter: number;
    newTerm: number;
    interestSaved: number;
    timeSaved: number;
  } | null>(null);

  const calculateRegularOverpayment = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const N = parseInt(termYears) * 12;
    const E = parseFloat(monthlyOverpayment);

    if (isNaN(P) || isNaN(r) || isNaN(N) || P <= 0 || N <= 0) {
      return;
    }

    const i = r / 12;

    // Base payment
    const PMT = (P * i) / (1 - Math.pow(1 + i, -N));

    // New payment with overpayment
    const newPMT = PMT + E;

    // New payoff months
    const newN = -Math.log(1 - (P * i) / newPMT) / Math.log(1 + i);

    // Interest calculation
    const baseInterest = PMT * N - P;
    const newInterest = newPMT * newN - P;
    const interestSaved = baseInterest - newInterest;
    const timeSaved = (N - newN) / 12;

    setRegularResult({
      basePayment: PMT,
      newPayment: newPMT,
      newTerm: newN / 12,
      interestSaved,
      timeSaved,
    });
  };

  const calculateLumpSumOverpayment = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const N = parseInt(termYears) * 12;
    const L = parseFloat(lumpSum);
    const k = parseInt(lumpSumMonth);

    if (isNaN(P) || isNaN(r) || isNaN(N) || isNaN(L) || isNaN(k) || P <= 0 || N <= 0 || k < 0 || k >= N) {
      return;
    }

    const i = r / 12;

    // Base payment
    const PMT = (P * i) / (1 - Math.pow(1 + i, -N));

    // Outstanding balance before lump sum
    const OB_k = PMT * (1 - Math.pow(1 + i, -(N - k))) / i;

    // New principal after lump sum
    const newP = OB_k - L;

    if (newP <= 0) {
      alert("The lump sum payment would pay off the entire mortgage!");
      return;
    }

    // New remaining months
    const newRemaining = -Math.log(1 - (newP * i) / PMT) / Math.log(1 + i);
    const newTotalTerm = (k + newRemaining) / 12;

    // Interest calculation
    const baseInterest = PMT * N - P;
    const newInterest = PMT * k + PMT * newRemaining - P;
    const interestSaved = baseInterest - newInterest;
    const timeSaved = (N - k - newRemaining) / 12;

    setLumpResult({
      basePayment: PMT,
      outstandingBefore: OB_k,
      outstandingAfter: newP,
      newTerm: newTotalTerm,
      interestSaved,
      timeSaved,
    });
  };

  const symbol = currencies[currency].symbol;
  const seo = seoData['/finance/mortgage-overpayment'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/mortgage-overpayment`}
      />
      <CalculatorLayout
      title="Mortgage Overpayment Calculator"
      description="Calculate how much you can save with mortgage overpayments"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Base Mortgage Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="principal">Mortgage Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  step="1000"
                  min="0"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="300000"
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
                  placeholder="4.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="termYears">Mortgage Term (years)</Label>
                <Input
                  id="termYears"
                  type="number"
                  step="1"
                  min="1"
                  value={termYears}
                  onChange={(e) => setTermYears(e.target.value)}
                  placeholder="30"
                />
              </div>

              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overpayment Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="regular" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="regular">Regular Overpayment</TabsTrigger>
                <TabsTrigger value="lump">One-Time Lump Sum</TabsTrigger>
              </TabsList>

              <TabsContent value="regular" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyOverpayment">Extra Monthly Payment</Label>
                  <Input
                    id="monthlyOverpayment"
                    type="number"
                    step="10"
                    min="0"
                    value={monthlyOverpayment}
                    onChange={(e) => setMonthlyOverpayment(e.target.value)}
                    placeholder="200"
                  />
                </div>
                <Button onClick={calculateRegularOverpayment} className="w-full">
                  Calculate Regular Overpayment
                </Button>

                {regularResult && (
                  <div className="space-y-4 mt-6">
                    <h3 className="font-semibold">Results</h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Base Monthly Payment</span>
                        <span className="text-xl font-bold">{symbol}{regularResult.basePayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">New Monthly Payment</span>
                        <span className="text-xl font-bold">{symbol}{regularResult.newPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">New Payoff Time</span>
                        <span className="text-xl font-bold">{regularResult.newTerm.toFixed(1)} years</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Time Saved</span>
                        <span className="text-xl font-bold">{regularResult.timeSaved.toFixed(1)} years</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Interest Saved</span>
                        <span className="text-xl font-bold">{symbol}{regularResult.interestSaved.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="lump" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lumpSum">Lump Sum Amount</Label>
                    <Input
                      id="lumpSum"
                      type="number"
                      step="100"
                      min="0"
                      value={lumpSum}
                      onChange={(e) => setLumpSum(e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lumpSumMonth">Apply at Month</Label>
                    <Input
                      id="lumpSumMonth"
                      type="number"
                      step="1"
                      min="0"
                      value={lumpSumMonth}
                      onChange={(e) => setLumpSumMonth(e.target.value)}
                      placeholder="12"
                    />
                  </div>
                </div>
                <Button onClick={calculateLumpSumOverpayment} className="w-full">
                  Calculate Lump Sum Impact
                </Button>

                {lumpResult && (
                  <div className="space-y-4 mt-6">
                    <h3 className="font-semibold">Results</h3>
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Monthly Payment</span>
                        <span className="text-xl font-bold">{symbol}{lumpResult.basePayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Balance Before Lump Sum</span>
                        <span className="text-xl font-bold">{symbol}{lumpResult.outstandingBefore.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Balance After Lump Sum</span>
                        <span className="text-xl font-bold">{symbol}{lumpResult.outstandingAfter.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">New Payoff Time</span>
                        <span className="text-xl font-bold">{lumpResult.newTerm.toFixed(1)} years</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Time Saved</span>
                        <span className="text-xl font-bold">{lumpResult.timeSaved.toFixed(1)} years</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Interest Saved</span>
                        <span className="text-xl font-bold">{symbol}{lumpResult.interestSaved.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
    </>
  );
}
