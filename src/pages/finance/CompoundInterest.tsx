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
import { compoundInterestSchema } from "@/lib/validation";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { AdvancedCompoundCalculator } from "@/components/AdvancedCompoundCalculator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState("12");
  const [contribution, setContribution] = useState("100");
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
    const n = parseFloat(frequency);
    const PMT = parseFloat(contribution);

    // Validate inputs
    try {
      const validated = compoundInterestSchema.parse({
        principal: P,
        rate: r,
        years: t,
        frequency: n,
        contribution: PMT
      });

      // Calculate compound interest with regular contributions
      const rDecimal = validated.rate / 100;
      const futureValuePrincipal = validated.principal * Math.pow(1 + rDecimal / validated.frequency, validated.frequency * validated.years);
      
      let futureValueContributions = 0;
      if (validated.contribution > 0 && frequency !== "0") {
        futureValueContributions = validated.contribution * (Math.pow(1 + rDecimal / validated.frequency, validated.frequency * validated.years) - 1) / (rDecimal / validated.frequency);
      }

      const futureValue = futureValuePrincipal + futureValueContributions;
      const totalContributions = validated.principal + (validated.contribution * validated.frequency * validated.years);
      const totalInterest = futureValue - totalContributions;

      // Check for calculation errors
      if (!isFinite(futureValue) || !isFinite(totalInterest)) {
        toast.error("Calculation resulted in invalid values. Please check your inputs.");
        return;
      }

      setResult({
        futureValue: Math.round(futureValue * 100) / 100,
        totalContributions: Math.round(totalContributions * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free compound interest calculator with regular contributions. Calculate the future value of your investments and see how your money grows with compound interest over time."
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
        "name": "Finance Calculators",
        "item": "https://www.thecalculatorpage.com/finance"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Compound Interest Calculator",
        "item": "https://www.thecalculatorpage.com/finance/compound-interest"
      }
    ]
  };

  const faqSchema = [
    { question: "What is compound interest?", answer: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. Unlike simple interest, compound interest grows exponentially over time because you earn interest on your interest." },
    { question: "How often should interest compound?", answer: "Interest can compound at different frequencies: annually (once per year), quarterly (4 times per year), monthly (12 times per year), or daily (365 times per year). More frequent compounding results in higher returns, though the difference becomes smaller as frequency increases." },
    { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Simply divide 72 by your annual interest rate. For example, at 6% interest, your money doubles in approximately 12 years (72 ÷ 6 = 12)." },
    { question: "How do regular contributions affect compound interest?", answer: "Regular contributions significantly accelerate wealth building. Each contribution begins earning compound interest immediately, creating multiple streams of growth. This is why starting early and contributing consistently is so powerful for long-term investing." },
    { question: "What is a realistic rate of return for investments?", answer: "Historical stock market returns average about 7-10% annually before inflation. Savings accounts typically offer 1-5% depending on economic conditions. Conservative estimates use 5-7% for long-term planning to account for market volatility and inflation." }
  ];

  return (
    <>
      <SEO 
        title="Compound Interest Calculator - Calculate Investment Growth"
        description="Free compound interest calculator with regular contributions. Calculate the future value of your investments and see how your money grows with compound interest over time."
        keywords="compound interest calculator, investment calculator, compound interest formula, investment growth calculator, savings calculator"
        structuredData={[structuredData, breadcrumbStructuredData]}
        faqSchema={faqSchema}
      />
      <CalculatorLayout
        title="Compound Interest Calculator"
        description="Calculate the future value of your investments with compound interest and regular contributions"
      >
        <Breadcrumbs 
          items={[
            { label: "Finance Calculators", href: "/#finance" },
            { label: "Compound Interest Calculator" }
          ]} 
        />
      <Tabs defaultValue="advanced" className="w-full">
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
              <CardHeader>
                <CardTitle>Input Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CurrencySelector value={currency} onChange={setCurrency} />

                <div className="space-y-2">
                  <Label htmlFor="principal">Initial Investment ({currencies[currency].symbol})</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="10000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="years">Time Period (Years)</Label>
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Compound Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Annually</SelectItem>
                      <SelectItem value="4">Quarterly</SelectItem>
                      <SelectItem value="12">Monthly</SelectItem>
                      <SelectItem value="52">Weekly</SelectItem>
                      <SelectItem value="365">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contribution">Regular Contribution (Monthly) ({currencies[currency].symbol})</Label>
                  <Input
                    id="contribution"
                    type="number"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    placeholder="100"
                  />
                  <p className="text-sm text-muted-foreground">
                    Amount added per compound period
                  </p>
                </div>

                <Button onClick={calculateCompoundInterest} className="w-full">
                  Calculate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="p-6 bg-card rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1 tracking-wide uppercase">Future Value</p>
                      <p className="font-serif text-4xl md:text-5xl font-normal text-foreground">
                        {currencies[currency].symbol}{result.futureValue.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                        <span className="text-muted-foreground">Total Contributions</span>
                        <span className="font-semibold">
                          {currencies[currency].symbol}{result.totalContributions.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-semibold text-accent">
                          {currencies[currency].symbol}{result.totalInterest.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                        <span className="text-muted-foreground">Return Rate</span>
                        <span className="font-semibold">
                          {((result.totalInterest / result.totalContributions) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Enter your values and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <FinancialDisclaimer type="investment" className="mt-6" />

      {/* Static SEO Content */}
      <CalculatorStaticContent
        whatIs={{
          title: "What is Compound Interest?",
          description: "Compound interest is the interest calculated on the initial principal and the accumulated interest from previous periods. This means you earn interest on your interest, creating exponential growth over time. Albert Einstein reportedly called compound interest the eighth wonder of the world, and understanding how it works is fundamental to building long-term wealth. Unlike simple interest which only calculates interest on the principal amount, compound interest accelerates your returns by reinvesting earnings automatically."
        }}
        howItWorks={{
          title: "How to Use This Calculator",
          description: "This compound interest calculator helps you project the future value of your investments based on your initial deposit, regular contributions, interest rate, and compounding frequency.",
          steps: [
            { step: 1, title: "Enter Your Initial Investment", description: "Input the lump sum amount you're starting with. This could be savings you already have or an initial deposit into an investment account." },
            { step: 2, title: "Set the Annual Interest Rate", description: "Enter the expected annual return on your investment. Historical stock market returns average 7-10%, while savings accounts typically offer 1-5%." },
            { step: 3, title: "Choose Your Time Horizon", description: "Specify how many years you plan to invest. Longer time horizons benefit more from compound interest due to exponential growth." },
            { step: 4, title: "Select Compounding Frequency", description: "Choose how often interest compounds: annually, quarterly, monthly, or daily. More frequent compounding yields slightly higher returns." },
            { step: 5, title: "Add Regular Contributions", description: "Enter any recurring deposits you'll make. Consistent contributions significantly boost your final balance through dollar-cost averaging." }
          ]
        }}
        formula={{
          title: "The Compound Interest Formula",
          formula: "A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]",
          explanation: "Where A is the final amount, P is the principal (initial investment), r is the annual interest rate (as a decimal), n is the number of times interest compounds per year, t is the time in years, and PMT is the regular contribution amount. The first part calculates the growth of your initial investment, while the second part calculates the future value of your regular contributions."
        }}
        tips={[
          "Start investing as early as possible - time is the most powerful factor in compound interest",
          "Increase your contributions when you get raises or bonuses to accelerate growth",
          "Choose tax-advantaged accounts like 401(k)s or ISAs to maximize after-tax returns",
          "Reinvest dividends and capital gains rather than withdrawing them",
          "Use the Rule of 72 to quickly estimate how long it takes to double your money (divide 72 by your interest rate)"
        ]}
        faqs={faqSchema}
      />
    </CalculatorLayout>
    </>
  );
};

export default CompoundInterest;