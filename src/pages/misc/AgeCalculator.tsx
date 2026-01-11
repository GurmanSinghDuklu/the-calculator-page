import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalMonths: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (birth > current) {
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;

    setResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
    });
  };

  return (
    <>
      <SEO 
        title="Age Calculator - Calculate Your Exact Age"
        description="Free age calculator to find your exact age in years, months, and days. Calculate age from date of birth."
        keywords="age calculator, calculate age, how old am i, age calculator from date of birth"
      />
      <CalculatorLayout
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Dates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentDate">Calculate Age On</Label>
              <Input
                id="currentDate"
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
              />
            </div>

            <Button onClick={calculateAge} className="w-full">
              Calculate Age
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Your Age</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="p-4 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-2">You are</p>
                  <p className="text-3xl font-bold text-primary">
                    {result.years} years, {result.months} months, {result.days} days old
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Months</p>
                    <p className="text-2xl font-semibold text-accent">
                      {result.totalMonths.toLocaleString()} months
                    </p>
                  </div>

                  <div className="p-3 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Days</p>
                    <p className="text-2xl font-semibold text-accent">
                      {result.totalDays.toLocaleString()} days
                    </p>
                  </div>

                  <div className="p-3 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-semibold">
                      {(result.totalDays * 24).toLocaleString()} hours
                    </p>
                  </div>

                  <div className="p-3 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Minutes</p>
                    <p className="text-2xl font-semibold">
                      {(result.totalDays * 24 * 60).toLocaleString()} minutes
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter your birth date to calculate your age</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
    </>
  );
};

export default AgeCalculator;
