import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { loanSchema } from "@/lib/validation";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { toast } from "sonner";

const loanStaticContent = {
  whatIs: {
    title: "What is a Loan Calculator?",
    description: "A loan calculator is a financial tool that helps you estimate your monthly payments, total interest costs, and overall repayment amount for any type of loan. Whether you're considering a personal loan, auto loan, student loan, or mortgage, this calculator uses the standard amortization formula to give you accurate payment projections. Understanding your loan costs before borrowing helps you make informed decisions about how much you can afford and compare different loan offers from lenders."
  },
  howItWorks: {
    title: "How Does This Loan Calculator Work?",
    description: "This calculator uses the amortization formula to determine your fixed monthly payment based on three key inputs: loan amount, interest rate, and loan term. The formula accounts for compound interest and spreads your payments evenly over the life of the loan.",
    steps: [
      { step: 1, title: "Enter Loan Amount", description: "Input the total amount you plan to borrow from the lender" },
      { step: 2, title: "Set Interest Rate", description: "Enter the annual percentage rate (APR) offered by your lender" },
      { step: 3, title: "Choose Loan Term", description: "Select how many years you want to repay the loan" },
      { step: 4, title: "Review Results", description: "See your monthly payment, total interest, and total cost breakdown" }
    ]
  },
  formula: {
    title: "The Loan Payment Formula",
    formula: "M = P × [r(1 + r)^n] / [(1 + r)^n - 1]",
    explanation: "Where M is your monthly payment, P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the total number of payments (loan term in years multiplied by 12). This formula calculates equal monthly payments that include both principal and interest portions."
  },
  faqs: [
    {
      question: "What factors affect my loan payment?",
      answer: "Your monthly loan payment is primarily affected by three factors: the loan amount (principal), the interest rate, and the loan term. A higher loan amount or interest rate increases your payment, while a longer loan term decreases it but increases total interest paid."
    },
    {
      question: "What's the difference between APR and interest rate?",
      answer: "The interest rate is the base cost of borrowing money, while APR (Annual Percentage Rate) includes the interest rate plus other fees and costs associated with the loan. APR gives you a more complete picture of the total cost of borrowing."
    },
    {
      question: "Should I choose a shorter or longer loan term?",
      answer: "A shorter loan term means higher monthly payments but less total interest paid. A longer term offers lower monthly payments but costs more in interest over time. Choose based on your monthly budget and how much you want to minimize interest costs."
    },
    {
      question: "How can I lower my monthly loan payment?",
      answer: "You can lower your monthly payment by: getting a lower interest rate through better credit, choosing a longer loan term, making a larger down payment to reduce the principal, or shopping around for better loan offers from different lenders."
    },
    {
      question: "What is loan amortization?",
      answer: "Amortization is the process of paying off a loan through regular payments over time. Each payment covers both interest and principal. Early payments go mostly toward interest, while later payments pay more principal. An amortization schedule shows this breakdown for each payment."
    }
  ],
  tips: [
    "Compare loan offers from multiple lenders to find the best interest rate",
    "Check your credit score before applying—better credit means lower rates",
    "Consider making extra payments to pay off your loan faster and save on interest",
    "Factor in all fees when comparing loans, not just the interest rate",
    "Use this calculator to see how different loan terms affect total cost"
  ]
};

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("200000");
  const [interestRate, setInterestRate] = useState("4.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const term = parseFloat(loanTerm);

    // Validate inputs
    try {
      const validated = loanSchema.parse({
        loanAmount: P,
        interestRate: rate,
        loanTerm: term
      });

      const r = validated.interestRate / 100 / 12;
      const n = validated.loanTerm * 12;

      const monthlyPayment = r === 0 ? validated.loanAmount / n : (validated.loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - validated.loanAmount;

      // Check for calculation errors
      if (!isFinite(monthlyPayment) || !isFinite(totalPayment)) {
        toast.error("Calculation resulted in invalid values. Please check your inputs.");
        return;
      }

      setResult({
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalPayment: Math.round(totalPayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Invalid input values");
    }
  };

  return (
    <>
      <SEO 
        title="Loan Calculator - Calculate Monthly Loan Payments & Interest"
        description="Free loan calculator for personal loans, auto loans, and mortgages. Calculate monthly payments, total interest, and amortization schedules instantly."
        keywords="loan calculator, personal loan calculator, auto loan calculator, loan payment calculator, loan interest calculator"
        faqSchema={loanStaticContent.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))}
        howToSchema={{
          name: "How to Calculate Loan Payments",
          steps: loanStaticContent.howItWorks.steps?.map(s => ({ name: s.title, text: s.description })) || []
        }}
      />
      <CalculatorLayout
        title="Loan Calculator"
        description="Calculate monthly payments for personal loans, auto loans, and mortgages"
      >
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />

            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount ({currencies[currency].symbol})</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="200000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="4.5"
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

            <Button onClick={calculateLoan} className="w-full">
              Calculate Payment
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="p-4 bg-card rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-4xl font-bold text-primary">
                    {currencies[currency].symbol}{result.monthlyPayment.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{result.totalPayment.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-semibold text-accent">
                      {currencies[currency].symbol}{result.totalInterest.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold">
                      {currencies[currency].symbol}{parseFloat(loanAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-card rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-2">Interest vs Principal</p>
                  <div className="flex gap-2 h-8 rounded-full overflow-hidden">
                    <div
                      className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
                      style={{
                        width: `${(parseFloat(loanAmount) / result.totalPayment) * 100}%`,
                      }}
                    >
                      {((parseFloat(loanAmount) / result.totalPayment) * 100).toFixed(0)}%
                    </div>
                    <div
                      className="bg-destructive flex items-center justify-center text-xs font-medium text-destructive-foreground"
                      style={{
                        width: `${(result.totalInterest / result.totalPayment) * 100}%`,
                      }}
                    >
                      {((result.totalInterest / result.totalPayment) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter loan details and click Calculate to see your payment breakdown</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <FinancialDisclaimer type="loan" className="mt-6" />
      
      <CalculatorStaticContent {...loanStaticContent} />
    </CalculatorLayout>
    </>
  );
};

export default LoanCalculator;