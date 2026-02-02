import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const PercentageOfCalculator = () => {
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(percentage);
    const n = parseFloat(number);
    if (!isNaN(p) && !isNaN(n)) {
      setResult((p / 100) * n);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  const staticContent = {
    whatIs: {
      title: "What is a Percentage Of Calculation?",
      description: "A 'percentage of' calculation finds a portion of a number based on a given percentage. It answers the question: 'What is X% of Y?' This is one of the most common mathematical operations used in everyday life, from calculating tips and discounts to understanding statistics and financial data."
    },
    howItWorks: {
      title: "How to Calculate Percentage Of",
      description: "To find what percentage of a number is, you multiply the number by the percentage and divide by 100. This gives you the portion of the original number that corresponds to that percentage.",
      steps: [
        { step: 1, title: "Convert percentage to decimal", description: "Divide the percentage by 100 (e.g., 25% becomes 0.25)" },
        { step: 2, title: "Multiply", description: "Multiply the decimal by the number you want the percentage of" },
        { step: 3, title: "Get the result", description: "The result is your answer - the portion of the number" }
      ]
    },
    formula: {
      title: "The Formula",
      formula: "Result = (Percentage ÷ 100) × Number",
      explanation: "For example, to find 25% of 80: (25 ÷ 100) × 80 = 0.25 × 80 = 20. So 25% of 80 is 20."
    },
    faqs: [
      {
        question: "How do I calculate 15% of 200?",
        answer: "Using the formula: (15 ÷ 100) × 200 = 0.15 × 200 = 30. So 15% of 200 is 30."
      },
      {
        question: "What's the quickest way to calculate 10% of any number?",
        answer: "Simply move the decimal point one place to the left. For example, 10% of 250 is 25.0 (or just 25)."
      },
      {
        question: "How do I find 50% of a number?",
        answer: "50% is the same as half, so just divide the number by 2. For example, 50% of 80 is 40."
      },
      {
        question: "What if I need to find a percentage greater than 100%?",
        answer: "The calculation works the same way. For example, 150% of 80 = (150 ÷ 100) × 80 = 1.5 × 80 = 120."
      }
    ],
    tips: [
      "10% is always the number divided by 10 - use this as a mental shortcut",
      "To find 5%, calculate 10% and divide by 2",
      "To find 25%, divide the number by 4",
      "For quick estimates, round numbers first then calculate"
    ]
  };

  return (
    <>
      <SEO
        title="Percentage Of Calculator - What is X% of Y? | Free Online Tool"
        description="Instantly calculate what percentage of any number is. Simple, fast percentage calculator. What is X% of Y? Free online tool with formula explanation."
        keywords="percentage of calculator, what is percent of, calculate percentage, percentage calculator, math calculator, percentage formula"
        canonicalUrl="https://www.thecalculatorpage.com/misc/percentage-of"
      />
      <CalculatorLayout
        title="Percentage Of Calculator"
        description="Instantly calculate what any percentage of a number is."
      >
        <Card className="border-border/50">
          <CardContent className="pt-8 pb-10">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
              <span className="text-lg text-muted-foreground">What is</span>
              <Input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="X"
                className="w-24 text-center text-lg font-medium"
                autoFocus
              />
              <span className="text-lg text-muted-foreground">% of</span>
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
                <div className="text-sm text-muted-foreground mb-2">Result</div>
                <div className="text-5xl font-bold text-primary">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <div className="text-muted-foreground mt-3">
                  {percentage}% of {number} = {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
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

export default PercentageOfCalculator;