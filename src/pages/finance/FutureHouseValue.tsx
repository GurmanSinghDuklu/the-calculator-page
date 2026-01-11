import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";

export default function FutureHouseValue() {
  const [currentValue, setCurrentValue] = useState("300000");
  const [growthRate, setGrowthRate] = useState("3");
  const [years, setYears] = useState("10");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    futureValue: number;
    totalGain: number;
    totalGainPercent: number;
  } | null>(null);

  const calculateFutureValue = () => {
    const V0 = parseFloat(currentValue);
    const g = parseFloat(growthRate) / 100;
    const t = parseFloat(years);

    if (isNaN(V0) || isNaN(g) || isNaN(t) || V0 <= 0 || t < 0) {
      return;
    }

    const FV = V0 * Math.pow(1 + g, t);
    const totalGain = FV - V0;
    const totalGainPercent = (totalGain / V0) * 100;

    setResult({
      futureValue: FV,
      totalGain,
      totalGainPercent,
    });
  };

  const symbol = currencies[currency].symbol;
  const seo = seoData['/finance/future-house-value'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/future-house-value`}
      />
      <CalculatorLayout
      title="Future House Value Calculator"
      description="Calculate the future value of your property based on annual growth rate"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentValue">Current Property Value</Label>
                <Input
                  id="currentValue"
                  type="number"
                  step="1000"
                  min="0"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="300000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="growthRate">Annual Growth Rate (%)</Label>
                <Input
                  id="growthRate"
                  type="number"
                  step="0.1"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  placeholder="3.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Time Period (years)</Label>
                <Input
                  id="years"
                  type="number"
                  step="1"
                  min="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="10"
                />
              </div>

              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <Button onClick={calculateFutureValue} className="w-full">
              Calculate Future Value
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Future Value Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Future Property Value</span>
                    <span className="text-2xl font-bold">{symbol}{result.futureValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Appreciation</span>
                    <span className="text-xl font-bold">{symbol}{result.totalGain.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Gain</span>
                    <span className="text-xl font-bold">{result.totalGainPercent.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Based on a {growthRate}% annual growth rate, your property valued at {symbol}{parseFloat(currentValue).toFixed(2)} today will be worth {symbol}{result.futureValue.toFixed(2)} in {years} years.</p>
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
