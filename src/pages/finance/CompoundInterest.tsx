import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { AdvancedCompoundCalculator } from "@/components/AdvancedCompoundCalculator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("100");
  const [extraDeposit, setExtraDeposit] = useState("0");
  const [extraMonth, setExtraMonth] = useState("1");
  const [extraYear, setExtraYear] = useState("1");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    const PMT = parseFloat(contribution);
    const extra = parseFloat(extraDeposit) || 0;
    const exMonth = parseInt(extraMonth);
    const exYear = parseInt(extraYear);

    try {
      if (isNaN(P) || isNaN(r) || isNaN(t)) {
        toast.error("Please enter valid numbers for principal, rate, and years.");
        return;
      }

      const totalMonths = t * 12;
      const monthlyRate = (r / 100) / 12;
      const targetDepositMonth = (exYear - 1) * 12 + exMonth;

      let currentBalance = P;
      let totalInvested = P;

      for (let month = 1; month <= totalMonths; month++) {
        // 1. Add Monthly Interest
        const interestEarned = currentBalance * monthlyRate;
        currentBalance += interestEarned;

        // 2. Add Regular Monthly Contribution
        currentBalance += PMT;
        totalInvested += PMT;

        // 3. Add One-Time Extra Deposit if we hit the target month
        if (month === targetDepositMonth) {
          currentBalance += extra;
          totalInvested += extra;
        }
      }

      const totalInterest = currentBalance - totalInvested;

      setResult({
        futureValue: Math.round(currentBalance * 100) / 100,
        totalContributions: Math.round(totalInvested * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    } catch (error) {
      toast.error("An error occurred during calculation.");
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Calculate investment growth with regular and one-time deposits."
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thecalculatorpage.com/" },
      { "@type": "ListItem", "position": 2, "name": "Finance", "item": "https://www.thecalculatorpage.com/finance" },
      { "@type": "ListItem", "position": 3, "name": "Compound Interest" }
    ]
  };

  const faqSchema = [
    { question: "What is compound interest?", answer: "Interest calculated on the principal and the accumulated interest." }
  ];

  return (
    <>
      <SEO
        title="Compound Interest Calculator"
        description="Calculate the future value of your investments."
        structuredData={[structuredData, breadcrumbStructuredData]}
        faqSchema={faqSchema}
      />
      <CalculatorLayout title="Compound Interest Calculator" description="Project your investment growth.">
        <Breadcrumbs items={[{ label: "Finance", href: "/#finance" }, { label: "Compound Interest" }]} />

        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="advanced">Advanced Calculator</TabsTrigger>
            <TabsTrigger value="simple">Quick Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="advanced">
            <AdvancedCompoundCalculator />
          </TabsContent>

          <TabsContent value="simple">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Input Values</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <CurrencySelector value={currency} onChange={setCurrency} />

                  <div className="space-y-2">
                    <Label htmlFor="principal">Initial Investment ({currencies[currency].symbol})</Label>
                    <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                    <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years">Time Period (Years)</Label>
                    <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contribution">Monthly Contribution ({currencies[currency].symbol})</Label>
                    <Input id="contribution" type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} />
                  </div>

                  <div className="pt-6 border-t border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-brand-gold">One-Time Extra Deposit (Optional)</Label>
                      <Badge variant="secondary" className="text-[10px]">Boost</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Amount</Label>
                        <Input type="number" value={extraDeposit} onChange={(e) => setExtraDeposit(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Month</Label>
                        <Select value={extraMonth} onValueChange={setExtraMonth}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {new Date(0, i).toLocaleString('default', { month: 'long' })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Year</Label>
                        <Select value={extraYear} onValueChange={setExtraYear}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: Math.max(1, parseInt(years) || 1) }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>Year {i + 1}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button onClick={calculateCompoundInterest} className="w-full">Calculate</Button>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader><CardTitle>Results</CardTitle></CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-6">
                      <div className="p-6 bg-card rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground uppercase">Future Value</p>
                        <p className="font-serif text-4xl">{currencies[currency].symbol}{result.futureValue.toLocaleString()}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-card rounded-lg">
                          <span>Total Contributions</span>
                          <span className="font-semibold">{currencies[currency].symbol}{result.totalContributions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-card rounded-lg">
                          <span>Total Interest</span>
                          <span className="font-semibold text-accent">{currencies[currency].symbol}{result.totalInterest.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">Click Calculate to see results.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <FinancialDisclaimer type="investment" className="mt-6" />
        <CalculatorStaticContent
          whatIs={{
            title: "What is Compound Interest?",
            description: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods."
          }}
          howItWorks={{
            title: "How to Use This Calculator",
            description: "Enter your initial investment, interest rate, and time period to see how your money grows."
          }}
          faqs={faqSchema} />
      </CalculatorLayout>
    </>
  );
};

export default CompoundInterest;