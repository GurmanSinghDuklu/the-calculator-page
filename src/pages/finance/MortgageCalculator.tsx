import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { mortgageSchema } from "@/lib/validation";
import { toast } from "sonner";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("70000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    principalAndInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
    totalPayment: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rateAnnual = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);
    const tax = parseFloat(propertyTax) / 12;
    const insurance = parseFloat(homeInsurance) / 12;

    // Validate inputs
    try {
      mortgageSchema.parse({
        homePrice: price,
        downPayment: down,
        interestRate: rateAnnual,
        loanTerm: termYears
      });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
      return;
    }

    const rate = rateAnnual / 100 / 12;
    const term = termYears * 12;
    const loanAmount = price - down;
    
    const principalAndInterest =
      rate === 0
        ? loanAmount / term
        : (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);

    const monthlyPayment = principalAndInterest + tax + insurance;
    const totalPayment = principalAndInterest * term;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      principalAndInterest: Math.round(principalAndInterest * 100) / 100,
      monthlyTax: Math.round(tax * 100) / 100,
      monthlyInsurance: Math.round(insurance * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
    });
  };

  const faqSchema = [
    { question: "How much house can I afford?", answer: "Financial experts recommend spending no more than 28-30% of your gross monthly income on housing costs, including mortgage payment, property taxes, and insurance. Use the 28/36 rule: housing costs should be under 28% of income, and total debt under 36%." },
    { question: "What is the difference between APR and interest rate?", answer: "The interest rate is the cost of borrowing the principal loan amount. APR (Annual Percentage Rate) includes the interest rate plus other costs like mortgage insurance, closing costs, and lender fees, giving you a more complete picture of the loan's true cost." },
    { question: "Should I choose a 15-year or 30-year mortgage?", answer: "A 15-year mortgage has higher monthly payments but lower total interest costs and builds equity faster. A 30-year mortgage has lower monthly payments, providing more flexibility, but you'll pay significantly more in interest over the life of the loan." },
    { question: "How much down payment do I need?", answer: "While 20% down is traditional and helps avoid PMI (Private Mortgage Insurance), many loans allow lower down payments. FHA loans require as little as 3.5%, and some conventional loans accept 3-5%. However, larger down payments mean lower monthly payments and less interest paid." },
    { question: "What factors affect mortgage interest rates?", answer: "Rates depend on your credit score, down payment size, loan type, loan term, property type, and current market conditions. A higher credit score (740+) typically qualifies for the best rates. Economic factors like inflation and Federal Reserve policies also influence rates." }
  ];

  return (
    <>
      <SEO 
        title="Mortgage Calculator - Calculate Monthly Mortgage Payments"
        description="Free mortgage calculator to estimate your monthly payment including principal, interest, property tax, and home insurance. Compare loan terms and interest rates."
        keywords="mortgage calculator, mortgage payment calculator, home loan calculator, monthly mortgage payment, property tax calculator"
        faqSchema={faqSchema}
      />
      <CalculatorLayout
        title="Mortgage Calculator"
        description="Calculate monthly mortgage payments including property tax and insurance"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mortgage Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />

            <div className="space-y-2">
              <Label htmlFor="homePrice">Home Price ({currencies[currency].symbol})</Label>
              <Input
                id="homePrice"
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                placeholder="350000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment ({currencies[currency].symbol})</Label>
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="70000"
              />
              <p className="text-sm text-muted-foreground">
                {homePrice && downPayment
                  ? `${((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)}% down`
                  : ""}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (% per year)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="6.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyTax">Property Tax ($ per year)</Label>
              <Input
                id="propertyTax"
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                placeholder="3000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeInsurance">Home Insurance ($ per year)</Label>
              <Input
                id="homeInsurance"
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(e.target.value)}
                placeholder="1200"
              />
            </div>

            <Button onClick={calculateMortgage} className="w-full">
              Calculate Mortgage
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="p-4 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Total Monthly Payment</p>
                  <p className="text-3xl font-bold text-primary">
                    {currencies[currency].symbol}{result.monthlyPayment.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Principal & Interest</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{result.principalAndInterest.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Property Tax (monthly)</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{result.monthlyTax.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Home Insurance (monthly)</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{result.monthlyInsurance.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-card rounded-lg border">
                  <h4 className="font-semibold mb-3">Loan Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount</span>
                      <span className="font-medium">{currencies[currency].symbol}{result.loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Interest</span>
                      <span className="font-medium text-destructive">
                        {currencies[currency].symbol}{result.totalInterest.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Payment</span>
                      <span className="font-medium">{currencies[currency].symbol}{result.totalPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter mortgage details to calculate your monthly payment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <FinancialDisclaimer type="loan" className="mt-6" />

      {/* Static SEO Content */}
      <CalculatorStaticContent
        whatIs={{
          title: "What is a Mortgage?",
          description: "A mortgage is a loan used to purchase real estate, where the property itself serves as collateral. The borrower makes regular payments over a set period (typically 15 or 30 years) that include both principal (the amount borrowed) and interest. Understanding your mortgage payment is crucial for budgeting and determining how much house you can truly afford. This calculator helps you estimate your monthly payment including all major costs: principal, interest, property taxes, and homeowner's insurance."
        }}
        howItWorks={{
          title: "How to Calculate Your Mortgage Payment",
          description: "This mortgage calculator uses the standard amortization formula to determine your monthly payment, then adds estimated property taxes and insurance for a complete picture of your housing costs.",
          steps: [
            { step: 1, title: "Enter the Home Price", description: "Input the purchase price of the home you're considering. This is the total amount before subtracting your down payment." },
            { step: 2, title: "Specify Your Down Payment", description: "Enter the amount you'll pay upfront. A larger down payment means a smaller loan and lower monthly payments. Aim for 20% to avoid PMI." },
            { step: 3, title: "Set the Interest Rate", description: "Input your expected mortgage interest rate. Current rates vary based on your credit score, loan type, and market conditions. Shop multiple lenders for the best rate." },
            { step: 4, title: "Choose Your Loan Term", description: "Select the length of your mortgage. Common options are 15-year (higher payments, less interest) or 30-year (lower payments, more interest over time)." },
            { step: 5, title: "Add Property Tax and Insurance", description: "Enter annual estimates for property taxes and homeowner's insurance. These are typically included in your monthly escrow payment." }
          ]
        }}
        formula={{
          title: "The Mortgage Payment Formula",
          formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
          explanation: "Where M is the monthly payment, P is the principal (loan amount), r is the monthly interest rate (annual rate divided by 12), and n is the total number of payments (years × 12). This formula calculates the principal and interest portion of your payment. Property taxes and insurance are added separately as they vary by location and coverage."
        }}
        tips={[
          "Get pre-approved before house hunting to know your true budget and strengthen your offers",
          "Compare rates from at least 3-5 lenders - even a 0.25% difference can save thousands over the loan term",
          "Consider making bi-weekly payments instead of monthly to pay off your mortgage faster",
          "Review your loan estimate carefully - look for hidden fees and compare APR, not just interest rate",
          "Build an emergency fund of 3-6 months of housing costs before buying"
        ]}
        faqs={faqSchema}
      />
    </CalculatorLayout>
    </>
  );
};

export default MortgageCalculator;