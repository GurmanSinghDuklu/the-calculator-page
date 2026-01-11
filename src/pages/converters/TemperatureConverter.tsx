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

type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState("0");
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>("celsius");
  const [toUnit, setToUnit] = useState<TemperatureUnit>("fahrenheit");
  const [result, setResult] = useState<number | null>(null);

  const convertTemperature = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    let celsius: number;

    // Convert to Celsius first
    switch (fromUnit) {
      case "celsius":
        celsius = value;
        break;
      case "fahrenheit":
        celsius = (value - 32) * (5 / 9);
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
    }

    // Convert from Celsius to target unit
    let converted: number;
    switch (toUnit) {
      case "celsius":
        converted = celsius;
        break;
      case "fahrenheit":
        converted = celsius * (9 / 5) + 32;
        break;
      case "kelvin":
        converted = celsius + 273.15;
        break;
    }

    setResult(Math.round(converted * 100) / 100);
  };

  const unitLabels: Record<TemperatureUnit, string> = {
    celsius: "Celsius (°C)",
    fahrenheit: "Fahrenheit (°F)",
    kelvin: "Kelvin (K)",
  };

  const seo = seoData['/converters/temperature'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/converters/temperature`}
      />
      <CalculatorLayout
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, and Kelvin"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Convert Temperature</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Value</Label>
              <Input
                id="inputValue"
                type="number"
                step="0.01"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromUnit">From</Label>
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as TemperatureUnit)}>
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
              <Select value={toUnit} onValueChange={(v) => setToUnit(v as TemperatureUnit)}>
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

            <Button onClick={convertTemperature} className="w-full">
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
                    {inputValue} {unitLabels[fromUnit]} = {result} {unitLabels[toUnit]}
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

export default TemperatureConverter;
