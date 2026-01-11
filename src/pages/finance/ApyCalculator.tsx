import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ApyCalculator() {
  const [nominalRate, setNominalRate] = useState("5");
  const [compounding, setCompounding] = useState("12");
  const [result, setResult] = useState<{ apy: number } | null>(null);

  const calculateAPY = () => {
    const r = parseFloat(nominalRate) / 100;
    const n = parseFloat(compounding);

    if (isNaN(r) || isNaN(n) || r < 0 || n <= 0) {
      return;
    }

    const apy = Math.pow(1 + r / n, n) - 1;

    setResult({ apy });
  };

  return (
    <>
      <SEO 
        title="APY Calculator - Calculate Annual Percentage Yield"
        description="Free APY calculator to find your effective annual percentage yield based on nominal interest rate and compounding frequency."
        keywords="apy calculator, annual percentage yield calculator, apy vs apr, effective annual rate calculator"
      />
      <CalculatorLayout
        title="APY Calculator"
        description="Convert nominal APR to effective annual percentage yield (APY)"
      >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nominalRate">Nominal Annual Rate (APR %)</Label>
                <Input
                  id="nominalRate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={nominalRate}
                  onChange={(e) => setNominalRate(e.target.value)}
                  placeholder="5.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compounding">Compounding Frequency</Label>
                <Select value={compounding} onValueChange={setCompounding}>
                  <SelectTrigger id="compounding">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="365">Daily (365)</SelectItem>
                    <SelectItem value="52">Weekly (52)</SelectItem>
                    <SelectItem value="26">Bi-weekly (26)</SelectItem>
                    <SelectItem value="12">Monthly (12)</SelectItem>
                    <SelectItem value="4">Quarterly (4)</SelectItem>
                    <SelectItem value="2">Semi-annually (2)</SelectItem>
                    <SelectItem value="1">Annually (1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculateAPY} className="w-full">
              Calculate APY
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Effective Annual Yield (APY)</span>
                  <span className="text-2xl font-bold">{(result.apy * 100).toFixed(4)}%</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>A {nominalRate}% nominal rate with {compounding === "365" ? "daily" : compounding === "12" ? "monthly" : compounding === "52" ? "weekly" : compounding === "4" ? "quarterly" : compounding === "2" ? "semi-annual" : "annual"} compounding equals an effective annual yield of {(result.apy * 100).toFixed(4)}%.</p>
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
