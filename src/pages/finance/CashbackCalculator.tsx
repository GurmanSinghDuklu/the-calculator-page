import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

export default function CashbackCalculator() {
  const [groceries, setGroceries] = useState("500");
  const [groceriesRate, setGroceriesRate] = useState("5");
  const [gas, setGas] = useState("200");
  const [gasRate, setGasRate] = useState("3");
  const [dining, setDining] = useState("300");
  const [diningRate, setDiningRate] = useState("2");
  const [other, setOther] = useState("400");
  const [otherRate, setOtherRate] = useState("1");
  const [annualFee, setAnnualFee] = useState("0");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    totalCashback: number;
    netCashback: number;
    totalSpending: number;
    netRate: number;
  } | null>(null);

  const calculateCashback = () => {
    const s1 = parseFloat(groceries);
    const r1 = parseFloat(groceriesRate) / 100;
    const s2 = parseFloat(gas);
    const r2 = parseFloat(gasRate) / 100;
    const s3 = parseFloat(dining);
    const r3 = parseFloat(diningRate) / 100;
    const s4 = parseFloat(other);
    const r4 = parseFloat(otherRate) / 100;
    const fee = parseFloat(annualFee);

    const cb1 = s1 * r1;
    const cb2 = s2 * r2;
    const cb3 = s3 * r3;
    const cb4 = s4 * r4;

    const totalCashback = cb1 + cb2 + cb3 + cb4;
    const totalSpending = s1 + s2 + s3 + s4;
    const netCashback = totalCashback - fee;
    const netRate = totalSpending > 0 ? (netCashback / totalSpending) * 100 : 0;

    setResult({
      totalCashback,
      netCashback,
      totalSpending,
      netRate,
    });
  };

  const symbol = currencies[currency].symbol;
  const seo = seoData['/finance/cashback'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/cashback`}
      />
      <CalculatorLayout
      title="Cashback Calculator"
      description="Calculate your total cashback rewards from credit card spending"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="groceries">Groceries</Label>
                  <Input
                    id="groceries"
                    type="number"
                    step="1"
                    min="0"
                    value={groceries}
                    onChange={(e) => setGroceries(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groceriesRate">Cashback Rate (%)</Label>
                  <Input
                    id="groceriesRate"
                    type="number"
                    step="0.1"
                    min="0"
                    value={groceriesRate}
                    onChange={(e) => setGroceriesRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gas">Gas/Fuel</Label>
                  <Input
                    id="gas"
                    type="number"
                    step="1"
                    min="0"
                    value={gas}
                    onChange={(e) => setGas(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gasRate">Cashback Rate (%)</Label>
                  <Input
                    id="gasRate"
                    type="number"
                    step="0.1"
                    min="0"
                    value={gasRate}
                    onChange={(e) => setGasRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dining">Dining/Restaurants</Label>
                  <Input
                    id="dining"
                    type="number"
                    step="1"
                    min="0"
                    value={dining}
                    onChange={(e) => setDining(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diningRate">Cashback Rate (%)</Label>
                  <Input
                    id="diningRate"
                    type="number"
                    step="0.1"
                    min="0"
                    value={diningRate}
                    onChange={(e) => setDiningRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="other">Other Spending</Label>
                  <Input
                    id="other"
                    type="number"
                    step="1"
                    min="0"
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherRate">Cashback Rate (%)</Label>
                  <Input
                    id="otherRate"
                    type="number"
                    step="0.1"
                    min="0"
                    value={otherRate}
                    onChange={(e) => setOtherRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="annualFee">Annual Card Fee</Label>
                  <Input
                    id="annualFee"
                    type="number"
                    step="1"
                    min="0"
                    value={annualFee}
                    onChange={(e) => setAnnualFee(e.target.value)}
                  />
                </div>
                <CurrencySelector value={currency} onChange={setCurrency} />
              </div>
            </div>

            <Button onClick={calculateCashback} className="w-full">
              Calculate Cashback
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Cashback Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Spending</span>
                    <span className="text-xl font-bold">{symbol}{result.totalSpending.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Cashback</span>
                    <span className="text-xl font-bold">{symbol}{result.totalCashback.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Net Cashback (after fees)</span>
                    <span className="text-xl font-bold">{symbol}{result.netCashback.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Effective Rate</span>
                    <span className="text-xl font-bold">{result.netRate.toFixed(2)}%</span>
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
