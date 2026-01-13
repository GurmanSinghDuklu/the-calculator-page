import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TrendingUp, TrendingDown } from "lucide-react";

const PercentageChangeCalculator = () => {
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [mode, setMode] = useState<"increase" | "decrease">("increase");
  const [result, setResult] = useState<{ value: number; change: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(percentage);
    const n = parseFloat(number);
    if (!isNaN(p) && !isNaN(n)) {
      const change = (p / 100) * n;
      const value = mode === "increase" ? n + change : n - change;
      setResult({ value, change });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  const staticContent = {
    whatIs: {
      title: "What is a Percentage Increase/Decrease?",
      description: "A percentage increase or decrease calculates the new value after adding or subtracting a percentage from an original number. This is essential for understanding price changes, salary adjustments, investment returns, discounts, and inflation effects. For example, a 20% increase on £100 gives you £120, while a 20% decrease gives you £80."
    },
    howItWorks: {
      title: "How to Calculate Percentage Change",
      description: "To calculate a percentage increase or decrease, first find the amount of change by multiplying the original number by the percentage, then add (for increase) or subtract (for decrease) that amount from the original.",
      steps: [
        { step: 1, title: "Calculate the change amount", description: "Multiply the original number by the percentage divided by 100" },
        { step: 2, title: "Apply the change", description: "Add the change for an increase, or subtract it for a decrease" },
        { step: 3, title: "Get the new value", description: "The result is your new value after the percentage change" }
      ]
    },
    formula: {
      title: "The Formulas",
      formula: "Increase: New Value = Original × (1 + Percentage/100)\nDecrease: New Value = Original × (1 - Percentage/100)",
      explanation: "For a 20% increase on 80: 80 × (1 + 20/100) = 80 × 1.20 = 96. For a 20% decrease on 80: 80 × (1 - 20/100) = 80 × 0.80 = 64."
    },
    faqs: [
      {
        question: "What's a 25% increase on £200?",
        answer: "Calculate the change: £200 × 0.25 = £50. Add to original: £200 + £50 = £250. So a 25% increase on £200 is £250."
      },
      {
        question: "If something decreases by 30%, what's left?",
        answer: "If you decrease by 30%, you have 70% remaining (100% - 30% = 70%). So multiply by 0.70 to get the new value."
      },
      {
        question: "Why isn't a 50% increase followed by a 50% decrease the same as the original?",
        answer: "Because the decrease is calculated on the larger number. £100 + 50% = £150. Then £150 - 50% = £75 (not £100). The percentage is based on different base values."
      },
      {
        question: "How do I calculate the original value before a percentage change?",
        answer: "For increase: Original = New Value ÷ (1 + Percentage/100). For decrease: Original = New Value ÷ (1 - Percentage/100)."
      }
    ],
    tips: [
      "A 100% increase doubles the original value",
      "A 50% decrease halves the original value",
      "VAT at 20% means the price increases by a factor of 1.20",
      "To reverse a discount, divide by (1 - discount percentage)"
    ]
  };

  return (
    <>
      <SEO
        title="Percentage Increase/Decrease Calculator - Free Online Tool"
        description="Calculate percentage increase or decrease instantly. What is X% increase or decrease of Y? Simple, fast calculator with formula explanation."
        keywords="percentage increase calculator, percentage decrease calculator, calculate percentage change, percent increase, percent decrease, percentage calculator"
        canonicalUrl="https://thecalculatorpage.com/misc/percentage-change"
      />
      <CalculatorLayout
        title="Percentage Increase/Decrease Calculator"
        description="Calculate any percentage increase or decrease instantly."
      >
        <Card className="border-border/50">
          <CardContent className="pt-8 pb-10">
            <div className="flex justify-center mb-6">
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(value) => value && setMode(value as "increase" | "decrease")}
                className="bg-muted p-1 rounded-lg"
              >
                <ToggleGroupItem
                  value="increase"
                  className="px-6 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Increase
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="decrease"
                  className="px-6 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground gap-2"
                >
                  <TrendingDown className="h-4 w-4" />
                  Decrease
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
              <span className="text-lg text-muted-foreground">What is a</span>
              <Input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="X"
                className="w-24 text-center text-lg font-medium"
                autoFocus
              />
              <span className="text-lg text-muted-foreground">% {mode} on</span>
              <Input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Y"
                className="w-32 text-center text-lg font-medium"
              />
              <span className="text-lg text-muted-foreground">?</span>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={calculate} size="lg" className="px-10">
                Calculate
              </Button>
            </div>

            {result !== null && (
              <div className="mt-8 text-center">
                <div className="text-sm text-muted-foreground mb-2">New Value</div>
                <div className="text-5xl font-bold text-primary">
                  {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <div className="text-muted-foreground mt-3">
                  {number} {mode === "increase" ? "+" : "−"} {percentage}% ({result.change.toLocaleString(undefined, { maximumFractionDigits: 6 })}) = {result.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <CalculatorStaticContent {...staticContent} />
      </CalculatorLayout>
    </>
  );
};

export default PercentageChangeCalculator;