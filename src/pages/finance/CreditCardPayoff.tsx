import { useState } from "react";
import { SEO } from "@/components/SEO";
import { seoData } from "@/utils/seoData";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, Currency, currencies } from "@/components/CurrencySelector";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { toast } from "sonner";

const creditCardStaticContent = {
  whatIs: {
    title: "What is a Credit Card Payoff Calculator?",
    description: "A credit card payoff calculator is a financial planning tool that helps you understand exactly how long it will take to pay off your credit card balance and how much you'll pay in total interest. By entering your current balance, APR (Annual Percentage Rate), and monthly payment amount, you can see a clear timeline for becoming debt-free. This calculator is essential for anyone looking to create a strategic plan to eliminate credit card debt and save money on interest charges."
  },
  howItWorks: {
    title: "How Does This Credit Card Payoff Calculator Work?",
    description: "This calculator uses your credit card's APR with daily compounding (typical for most cards) to determine exactly how many months of payments you'll need to eliminate your balance. It factors in how interest accrues on your remaining balance each month.",
    steps: [
      { step: 1, title: "Enter Current Balance", description: "Input the total amount you currently owe on your credit card" },
      { step: 2, title: "Add Your APR", description: "Enter the annual percentage rate shown on your credit card statement" },
      { step: 3, title: "Set Monthly Payment", description: "Choose how much you can afford to pay each month toward your balance" },
      { step: 4, title: "View Your Payoff Timeline", description: "See how many months until you're debt-free and your total interest cost" }
    ]
  },
  formula: {
    title: "The Credit Card Payoff Formula",
    formula: "N = -log(1 - (P × i) / A) / log(1 + i)",
    explanation: "Where N is the number of months to pay off the balance, P is the principal (current balance), i is the monthly interest rate (calculated from daily compounding), and A is your fixed monthly payment. The payment must exceed the monthly interest charge, or the balance will never be paid off."
  },
  faqs: [
    {
      question: "Why does credit card interest compound daily?",
      answer: "Most credit cards calculate interest daily based on your average daily balance, then add it to your account monthly. This means interest compounds more frequently than loans with monthly compounding, making credit card debt grow faster if not paid off quickly."
    },
    {
      question: "What happens if I only pay the minimum?",
      answer: "Paying only the minimum keeps you in debt much longer and costs significantly more in interest. Minimum payments are designed to primarily cover interest charges, so your principal balance decreases very slowly. Try to pay more than the minimum whenever possible."
    },
    {
      question: "How can I pay off my credit card faster?",
      answer: "To pay off faster: increase your monthly payment even by small amounts, make bi-weekly payments instead of monthly, apply any extra income to your balance, consider balance transfer cards with 0% intro APR, or use the debt avalanche method to tackle high-interest cards first."
    },
    {
      question: "What is a good credit card APR?",
      answer: "Average credit card APRs typically range from 15% to 25%, with rates varying based on your credit score. Cards under 15% APR are considered good, while rates over 20% are on the higher end. Store cards often have even higher rates, sometimes exceeding 25%."
    },
    {
      question: "Should I close my card after paying it off?",
      answer: "Not necessarily. Closing a credit card can hurt your credit score by reducing your available credit and shortening your credit history. Consider keeping the card open with occasional small purchases that you pay off immediately, unless it has an annual fee you want to avoid."
    }
  ],
  tips: [
    "Always pay more than the minimum payment to reduce your balance faster",
    "Consider the debt avalanche method: pay off highest APR cards first",
    "Look into balance transfer cards with 0% introductory APR offers",
    "Set up automatic payments to never miss a due date and avoid late fees",
    "Track your progress monthly to stay motivated on your payoff journey"
  ]
};

export default function CreditCardPayoff() {
  const [balance, setBalance] = useState("5000");
  const [apr, setApr] = useState("18");
  const [monthlyPayment, setMonthlyPayment] = useState("200");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [result, setResult] = useState<{
    monthsToPayoff: number;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);

  const calculatePayoff = () => {
    const P = parseFloat(balance);
    const r = parseFloat(apr);
    const A = parseFloat(monthlyPayment);

    if (isNaN(P) || isNaN(r) || isNaN(A) || P <= 0 || A <= 0) {
      toast.error("Please enter valid positive numbers");
      return;
    }

    // Monthly interest rate (daily compounding converted to monthly)
    const i = Math.pow(1 + r / 100 / 365, 365 / 12) - 1;

    // Check if payment is sufficient
    if (A <= P * i) {
      toast.error("Monthly payment is too low. It must exceed the monthly interest to pay off the balance.");
      return;
    }

    // Calculate months to pay off
    const N = -Math.log(1 - (P * i) / A) / Math.log(1 + i);
    const totalPaid = A * N;
    const totalInterest = totalPaid - P;

    setResult({
      monthsToPayoff: N,
      totalInterest,
      totalPaid,
    });
  };

  const symbol = currencies[currency].symbol;
  const seo = seoData['/finance/credit-card-payoff'];

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={`${window.location.origin}/finance/credit-card-payoff`}
        faqSchema={creditCardStaticContent.faqs.map(faq => ({ question: faq.question, answer: faq.answer }))}
        howToSchema={{
          name: "How to Calculate Credit Card Payoff Time",
          steps: creditCardStaticContent.howItWorks.steps?.map(s => ({ name: s.title, text: s.description })) || []
        }}
      />
      <CalculatorLayout
      title="Credit Card Payoff Calculator"
      description="Calculate how long it will take to pay off your credit card debt"
    >
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance & Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="balance">Current Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  step="1"
                  min="0"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="5000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apr">Annual Interest Rate (APR %)</Label>
                <Input
                  id="apr"
                  type="number"
                  step="0.1"
                  min="0"
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  placeholder="18.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  step="1"
                  min="0"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="200"
                />
              </div>

              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <Button onClick={calculatePayoff} className="w-full">
              Calculate Payoff Time
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Payoff Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Time to Pay Off</span>
                    <span className="text-2xl font-bold">{result.monthsToPayoff.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Interest Paid</span>
                    <span className="text-xl font-bold">{symbol}{result.totalInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Total Amount Paid</span>
                    <span className="text-xl font-bold">{symbol}{result.totalPaid.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>It will take approximately {Math.ceil(result.monthsToPayoff)} months ({(result.monthsToPayoff / 12).toFixed(1)} years) to pay off your credit card debt.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <FinancialDisclaimer type="loan" className="mt-6" />
        
        <CalculatorStaticContent {...creditCardStaticContent} />
      </div>
    </CalculatorLayout>
    </>
  );
}