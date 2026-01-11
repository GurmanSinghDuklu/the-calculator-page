import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DateCalculator = () => {
  const [addDate, setAddDate] = useState(new Date().toISOString().split('T')[0]);
  const [addValue, setAddValue] = useState("30");
  const [addUnit, setAddUnit] = useState("days");
  const [addResult, setAddResult] = useState<string | null>(null);

  const [date1, setDate1] = useState(new Date().toISOString().split('T')[0]);
  const [date2, setDate2] = useState(new Date().toISOString().split('T')[0]);
  const [inclusive, setInclusive] = useState(false);
  const [diffResult, setDiffResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [fromTodayInclusive, setFromTodayInclusive] = useState(false);
  const [fromTodayResult, setFromTodayResult] = useState<number | null>(null);

  // UTC-based helpers to avoid DST issues
  const MS_PER_DAY = 86_400_000;
  const toUtcMidnight = (d: Date | string) => {
    const dt = (d instanceof Date) ? d : new Date(d);
    return Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
  };

  const daysBetween = (d1: Date | string, d2: Date | string, isInclusive: boolean) => {
    const days = Math.round((toUtcMidnight(d2) - toUtcMidnight(d1)) / MS_PER_DAY);
    return isInclusive ? (days >= 0 ? days + 1 : days - 1) : days;
  };

  const daysFromToday = (target: Date | string, isInclusive: boolean) => {
    const today = new Date();
    const days = Math.round((toUtcMidnight(target) - Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())) / MS_PER_DAY);
    return isInclusive ? (days >= 0 ? days + 1 : days - 1) : days;
  };

  const calculateAddDate = () => {
    const date = new Date(addDate);
    const value = parseInt(addValue);

    if (isNaN(value)) return;

    switch (addUnit) {
      case 'days':
        date.setDate(date.getDate() + value);
        break;
      case 'weeks':
        date.setDate(date.getDate() + value * 7);
        break;
      case 'months':
        date.setMonth(date.getMonth() + value);
        break;
      case 'years':
        date.setFullYear(date.getFullYear() + value);
        break;
    }

    setAddResult(date.toISOString().split('T')[0]);
  };

  const calculateDateDifference = () => {
    const days = daysBetween(date1, date2, inclusive);
    const weeks = Math.floor(Math.abs(days) / 7);
    const months = Math.floor(Math.abs(days) / 30.44);
    const years = Math.floor(Math.abs(days) / 365.25);

    setDiffResult({ days: Math.abs(days), weeks, months, years });
  };

  const calculateDaysFromToday = () => {
    const days = daysFromToday(targetDate, fromTodayInclusive);
    setFromTodayResult(days);
  };

  return (
    <>
      <SEO 
        title="Date Calculator - Add, Subtract & Compare Dates"
        description="Free date calculator to add or subtract days, weeks, months from any date. Calculate the difference between two dates."
        keywords="date calculator, date difference calculator, add days to date, subtract dates"
      />
      <CalculatorLayout
        title="Date Calculator"
        description="Add or subtract days from dates and calculate differences between dates"
      >
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add">Add/Subtract</TabsTrigger>
          <TabsTrigger value="difference">Days Between</TabsTrigger>
          <TabsTrigger value="fromToday">Days From Today</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add or Subtract Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="addDate">Start Date</Label>
                <Input
                  id="addDate"
                  type="date"
                  value={addDate}
                  onChange={(e) => setAddDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addValue">Add/Subtract</Label>
                  <Input
                    id="addValue"
                    type="number"
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                    placeholder="30"
                  />
                  <p className="text-xs text-muted-foreground">Use negative numbers to subtract</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addUnit">Time Unit</Label>
                  <Select value={addUnit} onValueChange={setAddUnit}>
                    <SelectTrigger id="addUnit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateAddDate} className="w-full">
                Calculate Date
              </Button>

              {addResult && (
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Result Date</p>
                  <p className="text-3xl font-bold text-primary">
                    {new Date(addResult).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{addResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="difference">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Date Difference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date1">First Date</Label>
                <Input
                  id="date1"
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date2">Second Date</Label>
                <Input
                  id="date2"
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="inclusive"
                  checked={inclusive}
                  onChange={(e) => setInclusive(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="inclusive" className="text-sm font-normal cursor-pointer">
                  Inclusive (add 1 day)
                </Label>
              </div>

              <Button onClick={calculateDateDifference} className="w-full">
                Calculate Difference
              </Button>

              {diffResult && (
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary">
                    <p className="text-sm text-muted-foreground mb-1">Days Between</p>
                    <p className="text-3xl font-bold text-primary">
                      {diffResult.days.toLocaleString()} days
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-card rounded-lg border">
                      <p className="text-xs text-muted-foreground">Weeks</p>
                      <p className="text-xl font-semibold">{diffResult.weeks}</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border">
                      <p className="text-xs text-muted-foreground">Months</p>
                      <p className="text-xl font-semibold">{diffResult.months}</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border">
                      <p className="text-xs text-muted-foreground">Years</p>
                      <p className="text-xl font-semibold">{diffResult.years}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fromToday">
          <Card>
            <CardHeader>
              <CardTitle>Days From Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id="fromTodayInclusive"
                  checked={fromTodayInclusive}
                  onChange={(e) => setFromTodayInclusive(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="fromTodayInclusive" className="text-sm font-normal cursor-pointer">
                  Inclusive (add 1 day)
                </Label>
              </div>

              <Button onClick={calculateDaysFromToday} className="w-full">
                Calculate Days
              </Button>

              {fromTodayResult !== null && (
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">
                    {fromTodayResult >= 0 ? 'Days Until' : 'Days Since'}
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {Math.abs(fromTodayResult).toLocaleString()} days
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {fromTodayResult >= 0 
                      ? `${Math.abs(fromTodayResult)} days from today` 
                      : `${Math.abs(fromTodayResult)} days ago`}
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

export default DateCalculator;
