import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export default function IrrCalculator() {
  const [cashflows, setCashflows] = useState<string[]>(["-10000", "3000", "3000", "3000", "3000"]);
  const [result, setResult] = useState<{
    irr: number;
    annualIrr: number;
  } | null>(null);

  const addCashflow = () => {
    setCashflows([...cashflows, "0"]);
  };

  const removeCashflow = (index: number) => {
    if (cashflows.length > 2) {
      setCashflows(cashflows.filter((_, i) => i !== index));
    }
  };

  const updateCashflow = (index: number, value: string) => {
    const updated = [...cashflows];
    updated[index] = value;
    setCashflows(updated);
  };

  const calculateIRR = () => {
    const cf = cashflows.map(v => parseFloat(v)).filter(v => !isNaN(v));
    
    if (cf.length < 2) {
      alert("Please enter at least 2 cash flows.");
      return;
    }

    // Newton-Raphson method to find IRR
    let x = 0.1; // Initial guess
    const maxIterations = 1000;
    const tolerance = 0.000001;

    for (let iter = 0; iter < maxIterations; iter++) {
      let npv = 0;
      let dnpv = 0;

      for (let t = 0; t < cf.length; t++) {
        npv += cf[t] / Math.pow(1 + x, t);
        if (t > 0) {
          dnpv += (-t * cf[t]) / Math.pow(1 + x, t + 1);
        }
      }

      if (Math.abs(npv) < tolerance) {
        // Found IRR
        const periodicIRR = x;
        const annualIRR = periodicIRR; // Assuming annual periods

        setResult({
          irr: periodicIRR * 100,
          annualIrr: annualIRR * 100,
        });
        return;
      }

      if (Math.abs(dnpv) < tolerance) {
        alert("Cannot calculate IRR - derivative too small.");
        return;
      }

      x = x - npv / dnpv;

      // Prevent extreme values
      if (x < -0.99) x = -0.99;
      if (x > 10) x = 10;
    }

    alert("IRR calculation did not converge. Please check your cash flows.");
  };

  const seo = seoData['/finance/irr'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/irr`}
      />
      <CalculatorLayout
      title="IRR Calculator"
      description="Calculate the Internal Rate of Return for a series of cash flows"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cash Flows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Enter your cash flows in order. Negative values represent investments/outflows, positive values represent returns/inflows.
            </div>
            <div className="space-y-3">
              {cashflows.map((cf, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Label className="w-24 shrink-0">Period {index}</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={cf}
                    onChange={(e) => updateCashflow(index, e.target.value)}
                    placeholder="0"
                  />
                  {cashflows.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCashflow(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={addCashflow} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Period
              </Button>
              <Button onClick={calculateIRR} className="flex-1">
                Calculate IRR
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Internal Rate of Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground">IRR (per period)</span>
                  <span className="text-2xl font-bold">{result.irr.toFixed(4)}%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Annualized IRR</span>
                  <span className="text-xl font-bold">{result.annualIrr.toFixed(4)}%</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>The Internal Rate of Return (IRR) is the discount rate that makes the net present value of all cash flows equal to zero.</p>
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
