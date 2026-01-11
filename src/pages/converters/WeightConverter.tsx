import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type WeightUnit = "kilograms" | "grams" | "pounds" | "ounces" | "stones" | "tonnes";

const WeightConverter = () => {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<WeightUnit>("kilograms");
  const [toUnit, setToUnit] = useState<WeightUnit>("pounds");
  const [result, setResult] = useState<number | null>(null);

  // Conversion factors to kilograms
  const toKilograms: Record<WeightUnit, number> = {
    kilograms: 1,
    grams: 0.001,
    pounds: 0.453592,
    ounces: 0.0283495,
    stones: 6.35029,
    tonnes: 1000,
  };

  const convertWeight = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) return;

    // Convert to kilograms first, then to target unit
    const inKilograms = value * toKilograms[fromUnit];
    const converted = inKilograms / toKilograms[toUnit];

    setResult(Math.round(converted * 1000000) / 1000000);
  };

  const unitLabels: Record<WeightUnit, string> = {
    kilograms: "Kilograms (kg)",
    grams: "Grams (g)",
    pounds: "Pounds (lb)",
    ounces: "Ounces (oz)",
    stones: "Stones (st)",
    tonnes: "Tonnes (t)",
  };

  const seo = seoData['/converters/weight'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/converters/weight`}
      />
      <CalculatorLayout
      title="Weight Converter"
      description="Convert between kilos, pounds, stones, ounces, and more"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Convert Weight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Value</Label>
              <Input
                id="inputValue"
                type="number"
                step="0.000001"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromUnit">From</Label>
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as WeightUnit)}>
                <SelectTrigger id="fromUnit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toUnit">To</Label>
              <Select value={toUnit} onValueChange={(v) => setToUnit(v as WeightUnit)}>
                <SelectTrigger id="toUnit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={convertWeight} className="w-full">
              Convert
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result !== null ? (
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-2">Converted Value</p>
                  <p className="text-5xl font-bold text-primary">
                    {result.toLocaleString()}
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">
                    {unitLabels[toUnit]}
                  </p>
                </div>

                <div className="p-4 bg-card rounded-lg">
                  <p className="text-center text-muted-foreground">
                    {inputValue} {unitLabels[fromUnit]} = {result.toLocaleString()} {unitLabels[toUnit]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter a value to convert</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
    </>
  );
};

export default WeightConverter;
