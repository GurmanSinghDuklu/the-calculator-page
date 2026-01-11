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

type LengthUnit = "meters" | "kilometers" | "centimeters" | "millimeters" | "feet" | "inches" | "yards" | "miles";

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<LengthUnit>("meters");
  const [toUnit, setToUnit] = useState<LengthUnit>("feet");
  const [result, setResult] = useState<number | null>(null);

  // Conversion factors to meters
  const toMeters: Record<LengthUnit, number> = {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    feet: 0.3048,
    inches: 0.0254,
    yards: 0.9144,
    miles: 1609.344,
  };

  const convertLength = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) return;

    // Convert to meters first, then to target unit
    const inMeters = value * toMeters[fromUnit];
    const converted = inMeters / toMeters[toUnit];

    setResult(Math.round(converted * 1000000) / 1000000);
  };

  const unitLabels: Record<LengthUnit, string> = {
    meters: "Meters (m)",
    kilometers: "Kilometers (km)",
    centimeters: "Centimeters (cm)",
    millimeters: "Millimeters (mm)",
    feet: "Feet (ft)",
    inches: "Inches (in)",
    yards: "Yards (yd)",
    miles: "Miles (mi)",
  };

  const seo = seoData['/converters/length'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/converters/length`}
      />
      <CalculatorLayout
      title="Length Converter"
      description="Convert between feet, meters, inches, kilometers, and more"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Convert Length</CardTitle>
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
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as LengthUnit)}>
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
              <Select value={toUnit} onValueChange={(v) => setToUnit(v as LengthUnit)}>
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

            <Button onClick={convertLength} className="w-full">
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

export default LengthConverter;
