import { ArticleLayout } from "@/components/ArticleLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CalculatorFormulasGuide() {
  return (
    <ArticleLayout
      title="Complete Guide to Calculator Formulas: Understanding the Math Behind Your Money"
      description="Master the essential mathematical formulas used in financial calculators. Learn how compound interest, loan payments, mortgages, and retirement calculations work with detailed explanations and real-world examples."
      readTime="12 min read"
      category="Financial Education"
      categoryColor="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    >
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="lead text-xl text-muted-foreground mb-8">
          Understanding the mathematical formulas behind financial calculators empowers you to make better money decisions. 
          This comprehensive guide breaks down the most important calculator formulas you'll encounter in personal finance.
        </p>

        <Card className="my-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold mb-2">Quick Navigation</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <a href="#compound-interest" className="text-primary hover:underline">• Compound Interest</a>
              <a href="#loan-payment" className="text-primary hover:underline">• Loan Payments</a>
              <a href="#mortgage" className="text-primary hover:underline">• Mortgage Calculations</a>
              <a href="#apy" className="text-primary hover:underline">• APY Formula</a>
              <a href="#retirement" className="text-primary hover:underline">• Retirement Savings</a>
              <a href="#credit-card" className="text-primary hover:underline">• Credit Card Payoff</a>
            </div>
          </CardContent>
        </Card>

        <h2 id="compound-interest" className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          1. Compound Interest Formula: The Power of Growing Money
        </h2>

        <p>
          Compound interest is arguably the most important financial formula you'll ever learn. It's what allows 
          your money to grow exponentially over time by earning interest on your interest.
        </p>

        <Card className="my-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">The Formula:</p>
            <div className="bg-background p-4 rounded-lg font-mono text-lg">
              FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-6 mb-4">Breaking Down the Variables:</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>FV (Future Value):</strong> The amount your investment will be worth in the future</li>
          <li><strong>P (Principal):</strong> Your initial investment amount</li>
          <li><strong>r (Rate):</strong> Annual interest rate expressed as a decimal (5% = 0.05)</li>
          <li><strong>n (Compounding Frequency):</strong> How many times per year interest compounds (12 for monthly)</li>
          <li><strong>t (Time):</strong> Number of years the money is invested</li>
          <li><strong>PMT (Payment):</strong> Regular contributions you make each period</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Real-World Example:</h3>
        <Card className="my-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <p className="mb-3">Let's say you invest <strong>$10,000</strong> with:</p>
            <ul className="space-y-1 mb-4">
              <li>• Annual return: <strong>7%</strong></li>
              <li>• Monthly contributions: <strong>$500</strong></li>
              <li>• Time period: <strong>20 years</strong></li>
              <li>• Compounding: <strong>Monthly</strong></li>
            </ul>
            <p className="font-mono bg-background p-3 rounded-lg">
              FV = 10,000(1 + 0.07/12)^(12×20) + 500 × [((1 + 0.07/12)^(12×20) - 1) / (0.07/12)]
            </p>
            <p className="mt-4 font-semibold text-lg">Result: <span className="text-green-600 dark:text-green-400">$303,691</span></p>
            <p className="text-sm text-muted-foreground mt-2">
              You contributed $130,000 total ($10,000 + $500/month × 240 months) and earned $173,691 in interest!
            </p>
          </CardContent>
        </Card>

        <h2 id="loan-payment" className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          2. Loan Payment Formula: Understanding Your Monthly Payments
        </h2>

        <p>
          Whether you're taking out a car loan, personal loan, or any fixed-rate loan, this formula calculates 
          your monthly payment amount. This is an amortization formula that ensures you pay off the loan completely.
        </p>

        <Card className="my-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">The Formula:</p>
            <div className="bg-background p-4 rounded-lg font-mono text-lg">
              M = P × [r(1 + r)^n] / [(1 + r)^n - 1]
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-6 mb-4">Understanding the Variables:</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>M (Monthly Payment):</strong> The amount you'll pay each month</li>
          <li><strong>P (Principal):</strong> The total loan amount you're borrowing</li>
          <li><strong>r (Monthly Rate):</strong> Annual interest rate divided by 12 (5% annual = 0.05/12 = 0.00417)</li>
          <li><strong>n (Number of Payments):</strong> Total months (5-year loan = 60 months)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Practical Example:</h3>
        <Card className="my-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <p className="mb-3">You're buying a car with a loan of <strong>$25,000</strong>:</p>
            <ul className="space-y-1 mb-4">
              <li>• Loan amount: <strong>$25,000</strong></li>
              <li>• Interest rate: <strong>6% APR</strong></li>
              <li>• Loan term: <strong>5 years (60 months)</strong></li>
            </ul>
            <p className="font-mono bg-background p-3 rounded-lg text-sm">
              M = 25,000 × [0.005(1 + 0.005)^60] / [(1 + 0.005)^60 - 1]
            </p>
            <p className="mt-4 font-semibold text-lg">Monthly Payment: <span className="text-purple-600 dark:text-purple-400">$483.32</span></p>
            <p className="text-sm text-muted-foreground mt-2">
              Total paid over 5 years: $28,999. Total interest: $3,999
            </p>
          </CardContent>
        </Card>

        <h2 id="mortgage" className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          3. Mortgage Payment Formula: Your Biggest Monthly Expense
        </h2>

        <p>
          Mortgage calculations are more complex because they include principal, interest, property taxes, and insurance (PITI). 
          Understanding this helps you determine what house you can truly afford.
        </p>

        <Card className="my-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">The Formula:</p>
            <div className="bg-background p-4 rounded-lg font-mono text-sm sm:text-base">
              M = L × [r(1 + r)^n] / [(1 + r)^n - 1] + T/12 + I/12
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-6 mb-4">Variable Breakdown:</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>M (Total Monthly Payment):</strong> Your complete housing payment</li>
          <li><strong>L (Loan Amount):</strong> Home price minus down payment</li>
          <li><strong>r (Monthly Interest Rate):</strong> Annual rate ÷ 12</li>
          <li><strong>n (Number of Payments):</strong> Loan term in months (30 years = 360 months)</li>
          <li><strong>T (Annual Property Tax):</strong> Yearly property taxes</li>
          <li><strong>I (Annual Insurance):</strong> Yearly homeowners insurance premium</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Complete Example:</h3>
        <Card className="my-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <p className="mb-3">You're buying a <strong>$400,000</strong> home:</p>
            <ul className="space-y-1 mb-4">
              <li>• Home price: <strong>$400,000</strong></li>
              <li>• Down payment (20%): <strong>$80,000</strong></li>
              <li>• Loan amount: <strong>$320,000</strong></li>
              <li>• Interest rate: <strong>7% APR</strong></li>
              <li>• Loan term: <strong>30 years</strong></li>
              <li>• Annual property tax: <strong>$6,000</strong></li>
              <li>• Annual insurance: <strong>$1,800</strong></li>
            </ul>
            <div className="bg-background p-3 rounded-lg">
              <p className="text-sm mb-2">Principal & Interest:</p>
              <p className="font-mono text-sm mb-3">
                320,000 × [0.00583(1.00583)^360] / [(1.00583)^360 - 1] = $2,129
              </p>
              <p className="text-sm mb-2">Property Tax: $6,000 ÷ 12 = <strong>$500</strong></p>
              <p className="text-sm mb-2">Insurance: $1,800 ÷ 12 = <strong>$150</strong></p>
            </div>
            <p className="mt-4 font-semibold text-lg">Total Monthly Payment: <span className="text-green-600 dark:text-green-400">$2,779</span></p>
          </CardContent>
        </Card>

        <h2 id="apy" className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          4. APY Formula: Understanding True Interest Rates
        </h2>

        <p>
          APY (Annual Percentage Yield) shows the real rate of return on an investment, accounting for compounding. 
          This is crucial when comparing savings accounts or CDs that compound interest differently.
        </p>

        <Card className="my-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">The Formula:</p>
            <div className="bg-background p-4 rounded-lg font-mono text-lg">
              APY = (1 + r/n)^n - 1
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-6 mb-4">What It Means:</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>APY:</strong> The effective annual rate you actually earn</li>
          <li><strong>r:</strong> The nominal (stated) annual interest rate</li>
          <li><strong>n:</strong> Number of times interest compounds per year</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Why This Matters:</h3>
        <Card className="my-6 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6">
            <p className="mb-4">Two savings accounts both advertise <strong>5% interest</strong>:</p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Account A: Compounds Annually (n=1)</p>
                <p className="font-mono bg-background p-2 rounded text-sm">APY = (1 + 0.05/1)^1 - 1 = 5.00%</p>
              </div>
              <div>
                <p className="font-semibold">Account B: Compounds Daily (n=365)</p>
                <p className="font-mono bg-background p-2 rounded text-sm">APY = (1 + 0.05/365)^365 - 1 = 5.13%</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              On a $10,000 deposit, Account B earns you an extra <strong>$13/year</strong> just from more frequent compounding!
            </p>
          </CardContent>
        </Card>

        <h2 id="retirement" className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          5. Retirement Savings Formula: Planning Your Future
        </h2>

        <p>
          This formula helps you calculate how much you'll have saved by retirement, combining your current savings 
          and regular contributions over time.
        </p>

        <Card className="my-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">The Formula:</p>
            <div className="bg-background p-4 rounded-lg font-mono text-sm sm:text-base">
              FV = P(1 + r)^t + C × [((1 + r)^t - 1) / r]
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-6 mb-4">Components:</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>FV:</strong> Future retirement savings</li>
          <li><strong>P:</strong> Current retirement savings</li>
          <li><strong>r:</strong> Expected annual return (7-8% is historical average)</li>
          <li><strong>t:</strong> Years until retirement</li>
          <li><strong>C:</strong> Annual contribution amount</li>
        </ul>

        <Card className="my-6 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
          <CardContent className="pt-6">
            <p className="mb-3">Planning retirement at age 65 (currently 35):</p>
            <ul className="space-y-1 mb-4">
              <li>• Current 401(k) balance: <strong>$50,000</strong></li>
              <li>• Annual contribution: <strong>$10,000</strong></li>
              <li>• Expected return: <strong>7%</strong></li>
              <li>• Years to retirement: <strong>30</strong></li>
            </ul>
            <p className="font-mono bg-background p-3 rounded-lg text-sm">
              FV = 50,000(1.07)^30 + 10,000 × [((1.07)^30 - 1) / 0.07]
            </p>
            <p className="mt-4 font-semibold text-lg">Retirement Balance: <span className="text-indigo-600 dark:text-indigo-400">$1,325,433</span></p>
          </CardContent>
        </Card>

        <h2 id="credit-card" className="text-3xl font-bold mt-12 mb-6 scroll-mt-20">
          6. Credit Card Payoff Formula: Escaping Debt
        </h2>

        <p>
          This formula calculates how long it takes to pay off credit card debt, helping you understand the 
          true cost of carrying a balance.
        </p>

        <Card className="my-6 bg-muted/50">
          <CardContent className="pt-6">
            <p className="font-semibold mb-3">The Formula:</p>
            <div className="bg-background p-4 rounded-lg font-mono text-sm">
              n = -log(1 - (B × r)/M) / log(1 + r)
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-semibold mt-6 mb-4">Variables Explained:</h3>
        <ul className="space-y-2 mb-6">
          <li><strong>n:</strong> Number of months to pay off the debt</li>
          <li><strong>B:</strong> Current credit card balance</li>
          <li><strong>r:</strong> Monthly interest rate (APR ÷ 12)</li>
          <li><strong>M:</strong> Monthly payment amount</li>
        </ul>

        <Card className="my-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardContent className="pt-6">
            <p className="mb-3">Credit card scenario:</p>
            <ul className="space-y-1 mb-4">
              <li>• Balance: <strong>$5,000</strong></li>
              <li>• APR: <strong>18%</strong> (r = 0.015/month)</li>
              <li>• Monthly payment: <strong>$200</strong></li>
            </ul>
            <p className="font-mono bg-background p-3 rounded-lg text-sm">
              n = -log(1 - (5,000 × 0.015)/200) / log(1.015) = 31 months
            </p>
            <p className="mt-4 font-semibold">Payoff time: <strong>31 months (2.6 years)</strong></p>
            <p className="mt-2 font-semibold">Total interest paid: <strong>$1,200</strong></p>
            <p className="text-sm text-muted-foreground mt-3">
              Increasing payment to $300/month reduces payoff to 19 months and saves $425 in interest!
            </p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mt-12 mb-6">Key Takeaways</h2>

        <Card className="my-6 bg-primary/10 border-primary/30">
          <CardContent className="pt-6 space-y-3">
            <p className="font-semibold">✓ Compound interest is your best friend for wealth building</p>
            <p className="font-semibold">✓ Understanding loan formulas helps you negotiate better terms</p>
            <p className="font-semibold">✓ APY reveals the true earning potential of savings accounts</p>
            <p className="font-semibold">✓ Small changes in interest rates dramatically impact long-term costs</p>
            <p className="font-semibold">✓ Higher payments on debt save significant interest over time</p>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mt-12 mb-6">Practice Using These Formulas</h2>

        <p className="mb-6">
          Now that you understand these formulas, put them to work with our interactive calculators. 
          Each calculator uses these exact formulas to help you make informed financial decisions.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 my-8">
          <Link to="/finance/compound-interest">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-start">
              <span className="font-semibold">Compound Interest Calculator</span>
              <span className="text-xs text-muted-foreground mt-1">Calculate investment growth</span>
            </Button>
          </Link>
          <Link to="/finance/loan-calculator">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-start">
              <span className="font-semibold">Loan Calculator</span>
              <span className="text-xs text-muted-foreground mt-1">Calculate monthly payments</span>
            </Button>
          </Link>
          <Link to="/finance/mortgage-calculator">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-start">
              <span className="font-semibold">Mortgage Calculator</span>
              <span className="text-xs text-muted-foreground mt-1">Plan your home purchase</span>
            </Button>
          </Link>
          <Link to="/finance/retirement-calculator">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-start">
              <span className="font-semibold">Retirement Calculator</span>
              <span className="text-xs text-muted-foreground mt-1">Project retirement savings</span>
            </Button>
          </Link>
        </div>

        <Card className="my-8 bg-muted/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> These formulas provide estimates based on mathematical models. 
              Actual financial outcomes may vary due to market conditions, fees, tax implications, and other factors. 
              Always consult with a qualified financial advisor for personalized advice.
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 pt-8 border-t">
          <Link to="/formulas">
            <Button variant="default" size="lg">
              View Complete Formula Reference →
            </Button>
          </Link>
        </div>
      </div>
    </ArticleLayout>
  );
}
