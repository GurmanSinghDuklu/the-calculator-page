import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CurrencySelector, Currency } from "@/components/CurrencySelector";
import { Home, TrendingDown, Clock, PiggyBank, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CalculationResult {
  monthlyPayment: number;
  weeklySimple: number;
  weeklyTrue: number;
  originalTermYears: number;
  newTermYears: number;
  newTermMonths: number;
  yearsSaved: number;
  monthsSaved: number;
  totalInterestMonthly: number;
  totalInterestWeekly: number;
  interestSaved: number;
}

const WeeklyMortgageCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const currencySymbols: Record<string, string> = {
    GBP: "£",
    USD: "$",
    EUR: "€",
    AUD: "A$",
    CAD: "C$",
  };

  const symbol = currencySymbols[currency] || "£";

  // Monthly payment formula
  const calculateMonthlyPayment = (P: number, annualRate: number, years: number): number => {
    const r = annualRate / 12 / 100;
    const n = years * 12;
    return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  // Weekly payment using true weekly amortisation
  const calculateWeeklyPaymentTrue = (P: number, annualRate: number, years: number): number => {
    const r = annualRate / 52 / 100;
    const n = years * 52;
    return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  // Simulate payoff with weekly payments
  const simulateWeeklyPayoff = (P: number, annualRate: number, weeklyPayment: number): { weeks: number; totalInterest: number } => {
    let balance = P;
    const dailyRate = annualRate / 365 / 100;
    let weeks = 0;
    let totalInterest = 0;

    while (balance > 0 && weeks < 5200) { // Max 100 years
      const interest = balance * dailyRate * 7;
      totalInterest += interest;
      balance = balance + interest - weeklyPayment;
      if (balance < 0) balance = 0;
      weeks++;
    }

    return { weeks, totalInterest };
  };

  // Calculate total interest for monthly payments
  const calculateTotalInterestMonthly = (P: number, annualRate: number, years: number): number => {
    const monthlyPayment = calculateMonthlyPayment(P, annualRate, years);
    return (monthlyPayment * years * 12) - P;
  };

  const calculate = () => {
    const P = parseFloat(mortgageAmount.replace(/,/g, ""));
    const rate = parseFloat(interestRate);
    const years = parseInt(mortgageTerm);

    if (!P || P <= 0 || !rate || rate <= 0 || !years || years <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter valid positive numbers for all fields.",
        variant: "destructive",
      });
      return;
    }

    const monthlyPayment = calculateMonthlyPayment(P, rate, years);
    const weeklySimple = monthlyPayment / 4;
    const weeklyTrue = calculateWeeklyPaymentTrue(P, rate, years);

    const { weeks, totalInterest: totalInterestWeekly } = simulateWeeklyPayoff(P, rate, weeklySimple);
    const newTermYearsExact = weeks / 52;
    const newTermYears = Math.floor(newTermYearsExact);
    const newTermMonths = Math.round((newTermYearsExact - newTermYears) * 12);

    const totalInterestMonthly = calculateTotalInterestMonthly(P, rate, years);
    const interestSaved = totalInterestMonthly - totalInterestWeekly;

    const yearsSavedExact = years - newTermYearsExact;
    const yearsSaved = Math.floor(yearsSavedExact);
    const monthsSaved = Math.round((yearsSavedExact - yearsSaved) * 12);

    setResult({
      monthlyPayment,
      weeklySimple,
      weeklyTrue,
      originalTermYears: years,
      newTermYears,
      newTermMonths,
      yearsSaved,
      monthsSaved,
      totalInterestMonthly,
      totalInterestWeekly,
      interestSaved,
    });

    toast({
      title: "Calculation complete",
      description: `You could save ${symbol}${interestSaved.toLocaleString('en-GB', { maximumFractionDigits: 0 })} in interest!`,
    });
  };

  return (
    <>
      <SEO
        title="Weekly Mortgage Payment Calculator | Save Years on Your Mortgage"
        description="Calculate how switching to weekly mortgage payments can save you thousands in interest and years off your mortgage. Free UK mortgage calculator."
        keywords="weekly mortgage payments, mortgage calculator UK, pay off mortgage faster, mortgage interest savings, bi-weekly mortgage payments"
        canonicalUrl="https://thecalculatorpage.com/finance/weekly-mortgage"
      />
      <CalculatorLayout
        title="Weekly Mortgage Calculator"
        description="Discover how weekly payments can shave years off your mortgage and save thousands in interest"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Card */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Mortgage Details
              </CardTitle>
              <CardDescription>
                Enter your mortgage information to see weekly payment benefits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Mortgage Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    {symbol}
                  </span>
                  <Input
                    id="amount"
                    type="text"
                    placeholder="250,000"
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Interest Rate (APR %)</Label>
                <div className="relative">
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    placeholder="5.0"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    %
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Mortgage Term (Years)</Label>
                <Input
                  id="term"
                  type="number"
                  placeholder="25"
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(e.target.value)}
                />
              </div>

              <CurrencySelector value={currency} onChange={setCurrency} />

              <Button onClick={calculate} className="w-full" size="lg">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Savings
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className={`glass border-border/50 transition-all duration-500 ${result ? 'opacity-100' : 'opacity-60'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-secondary" />
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Payment Comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-sm text-muted-foreground mb-1 tracking-wide uppercase">Monthly Payment</p>
                      <p className="font-serif text-2xl font-normal text-foreground">
                        {symbol}{result.monthlyPayment.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                      <p className="text-sm text-muted-foreground mb-1 tracking-wide uppercase">Weekly Payment</p>
                      <p className="font-serif text-2xl font-normal text-foreground">
                        {symbol}{result.weeklySimple.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Savings Highlights */}
                  <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <PiggyBank className="h-5 w-5 text-foreground" />
                      </div>
                      <h3 className="font-serif text-lg font-normal">Interest Saved</h3>
                    </div>
                    <p className="font-serif text-4xl font-normal text-foreground mb-2">
                      {symbol}{result.interestSaved.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      vs {symbol}{result.totalInterestMonthly.toLocaleString('en-GB', { maximumFractionDigits: 0 })} with monthly payments
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <Clock className="h-5 w-5 text-foreground" />
                      </div>
                      <h3 className="font-serif text-lg font-normal">Time Saved</h3>
                    </div>
                    <p className="font-serif text-4xl font-normal text-foreground mb-2">
                      {result.yearsSaved > 0 ? `${result.yearsSaved} years` : ''} {result.monthsSaved > 0 ? `${result.monthsSaved} months` : ''}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pay off in {result.newTermYears} years {result.newTermMonths} months instead of {result.originalTermYears} years
                    </p>
                  </div>

                  {/* Comparison Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Original Term</span>
                      <span className="font-medium">{result.originalTermYears} years</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">New Term (Weekly)</span>
                      <span className="font-medium text-primary">{result.newTermYears} years {result.newTermMonths} months</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Weekly (True Amortisation)</span>
                      <span className="font-medium">{symbol}{result.weeklyTrue.toLocaleString('en-GB', { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your mortgage details to see how much you could save
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mt-8 glass border-border/50">
          <CardHeader>
            <CardTitle>How Weekly Payments Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal mb-1">Divide by 4</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Take your monthly payment and divide by 4 to get your weekly amount
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-secondary">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal mb-1">52 Payments = 13 Months</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Because there are 52 weeks, you make the equivalent of 13 monthly payments
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal mb-1">Interest Compounds Less</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    More frequent payments reduce the balance faster, meaning less interest accrues
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FinancialDisclaimer />
      </CalculatorLayout>
    </>
  );
};

export default WeeklyMortgageCalculator;
