import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PercentageCalculator = () => {
  // What is X% of Y
  const [percentOf, setPercentOf] = useState({ percent: "15", number: "200" });
  const [percentOfResult, setPercentOfResult] = useState<number | null>(null);

  // X is what % of Y
  const [whatPercent, setWhatPercent] = useState({ number1: "50", number2: "200" });
  const [whatPercentResult, setWhatPercentResult] = useState<number | null>(null);

  // Percentage increase/decrease
  const [percentChange, setPercentChange] = useState({ from: "100", to: "150" });
  const [percentChangeResult, setPercentChangeResult] = useState<number | null>(null);

  const calculatePercentOf = () => {
    const percent = parseFloat(percentOf.percent);
    const number = parseFloat(percentOf.number);
    if (!isNaN(percent) && !isNaN(number)) {
      setPercentOfResult(Math.round((percent / 100) * number * 100) / 100);
    }
  };

  const calculateWhatPercent = () => {
    const num1 = parseFloat(whatPercent.number1);
    const num2 = parseFloat(whatPercent.number2);
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
      setWhatPercentResult(Math.round((num1 / num2) * 100 * 100) / 100);
    }
  };

  const calculatePercentChange = () => {
    const from = parseFloat(percentChange.from);
    const to = parseFloat(percentChange.to);
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      const change = ((to - from) / from) * 100;
      setPercentChangeResult(Math.round(change * 100) / 100);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Percentage Calculator",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online percentage calculator. Calculate percentage of a number, percentage increase, percentage decrease, and find what percent one number is of another."
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.thecalculatorpage.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Everyday Calculators",
        "item": "https://www.thecalculatorpage.com/#misc"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Percentage Calculator",
        "item": "https://www.thecalculatorpage.com/misc/percentage"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="Percentage Calculator - Calculate Percentages, Increase & Decrease"
        description="Free online percentage calculator. Calculate percentage of a number, percentage increase, percentage decrease, and find what percent one number is of another."
        keywords="percentage calculator, percent calculator, percentage increase calculator, percentage decrease calculator, calculate percentage"
        structuredData={[structuredData, breadcrumbStructuredData]}
      />
      <CalculatorLayout
        title="Percentage Calculator"
        description="Calculate percentages, increases, decreases, and more"
      >
        <Breadcrumbs 
          items={[
            { label: "Everyday Calculators", href: "/#misc" },
            { label: "Percentage Calculator" }
          ]} 
        />
      <Tabs defaultValue="percentOf" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="percentOf">% of Number</TabsTrigger>
          <TabsTrigger value="whatPercent">What %</TabsTrigger>
          <TabsTrigger value="change">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="percentOf">
          <Card>
            <CardHeader>
              <CardTitle>What is X% of Y?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percent">Percentage (%)</Label>
                  <Input
                    id="percent"
                    type="number"
                    value={percentOf.percent}
                    onChange={(e) => setPercentOf({ ...percentOf, percent: e.target.value })}
                    placeholder="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Of Number</Label>
                  <Input
                    id="number"
                    type="number"
                    value={percentOf.number}
                    onChange={(e) => setPercentOf({ ...percentOf, number: e.target.value })}
                    placeholder="200"
                  />
                </div>
              </div>

              <Button onClick={calculatePercentOf} className="w-full">
                Calculate
              </Button>

              {percentOfResult !== null && (
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Result</p>
                  <p className="text-3xl font-bold text-primary">
                    {percentOfResult.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {percentOf.percent}% of {percentOf.number} = {percentOfResult}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatPercent">
          <Card>
            <CardHeader>
              <CardTitle>X is what % of Y?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number1">First Number</Label>
                  <Input
                    id="number1"
                    type="number"
                    value={whatPercent.number1}
                    onChange={(e) => setWhatPercent({ ...whatPercent, number1: e.target.value })}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number2">Of Number</Label>
                  <Input
                    id="number2"
                    type="number"
                    value={whatPercent.number2}
                    onChange={(e) => setWhatPercent({ ...whatPercent, number2: e.target.value })}
                    placeholder="200"
                  />
                </div>
              </div>

              <Button onClick={calculateWhatPercent} className="w-full">
                Calculate
              </Button>

              {whatPercentResult !== null && (
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Result</p>
                  <p className="text-3xl font-bold text-primary">
                    {whatPercentResult.toLocaleString()}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {whatPercent.number1} is {whatPercentResult}% of {whatPercent.number2}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Change</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From Value</Label>
                  <Input
                    id="from"
                    type="number"
                    value={percentChange.from}
                    onChange={(e) => setPercentChange({ ...percentChange, from: e.target.value })}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To Value</Label>
                  <Input
                    id="to"
                    type="number"
                    value={percentChange.to}
                    onChange={(e) => setPercentChange({ ...percentChange, to: e.target.value })}
                    placeholder="150"
                  />
                </div>
              </div>

              <Button onClick={calculatePercentChange} className="w-full">
                Calculate Change
              </Button>

              {percentChangeResult !== null && (
                <div className={`p-4 bg-gradient-to-br rounded-lg border-2 ${
                  percentChangeResult >= 0 
                    ? 'from-accent/10 to-green-500/10 border-accent' 
                    : 'from-destructive/10 to-red-500/10 border-destructive'
                }`}>
                  <p className="text-sm text-muted-foreground mb-1">
                    {percentChangeResult >= 0 ? "Percentage Increase" : "Percentage Decrease"}
                  </p>
                  <p className={`text-3xl font-bold ${
                    percentChangeResult >= 0 ? 'text-accent' : 'text-destructive'
                  }`}>
                    {percentChangeResult >= 0 ? '+' : ''}{percentChangeResult}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    From {percentChange.from} to {percentChange.to}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
    </>
  );
};

export default PercentageCalculator;
