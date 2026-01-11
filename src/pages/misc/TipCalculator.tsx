import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("100");
  const [tipPercent, setTipPercent] = useState("15");
  const [numPeople, setNumPeople] = useState("1");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPerson: number;
    tipPerPerson: number;
  } | null>(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const people = parseInt(numPeople);

    if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || people <= 0) {
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    setResult({
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    });
  };

  const presetTips = ["10", "15", "18", "20", "25"];

  return (
    <>
      <SEO 
        title="Tip Calculator - Calculate Tips & Split Bills"
        description="Free tip calculator to calculate restaurant tips and split bills. Choose from preset tip percentages or customize your own. Perfect for dining out with friends."
        keywords="tip calculator, tip calculator restaurant, calculate tip, split bill calculator, gratuity calculator"
      />
      <CalculatorLayout
        title="Tip Calculator"
        description="Calculate tips and split bills easily with friends"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />

            <div className="space-y-2">
              <Label htmlFor="billAmount">Bill Amount ({currencies[currency].symbol})</Label>
              <Input
                id="billAmount"
                type="number"
                step="0.01"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="100.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipPercent">Tip Percentage (%)</Label>
              <Input
                id="tipPercent"
                type="number"
                step="0.1"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                placeholder="15"
              />
              
              <div className="flex gap-2 mt-2">
                {presetTips.map((preset) => (
                  <Button
                    key={preset}
                    variant={tipPercent === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipPercent(preset)}
                    className="flex-1"
                  >
                    {preset}%
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numPeople">Number of People</Label>
              <Input
                id="numPeople"
                type="number"
                min="1"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                placeholder="1"
              />
            </div>

            <Button onClick={calculateTip} className="w-full">
              Calculate Tip
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
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
                    <span className="text-muted-foreground">Bill Amount</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{parseFloat(billAmount).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Tip Amount ({tipPercent}%)</span>
                    <span className="font-semibold text-accent">
                      {currencies[currency].symbol}{result.tipAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {parseInt(numPeople) > 1 && (
                  <div className="p-4 bg-card rounded-lg border-2 border-accent">
                    <p className="text-sm text-muted-foreground mb-3">Split Between {numPeople} People</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Per Person Total</span>
                        <span className="font-bold text-lg text-primary">
                          {currencies[currency].symbol}{result.perPerson.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tip Per Person</span>
                        <span className="font-semibold text-accent">
                          {currencies[currency].symbol}{result.tipPerPerson.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter bill details to calculate tip and split</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
    </>
  );
};

export default TipCalculator;
