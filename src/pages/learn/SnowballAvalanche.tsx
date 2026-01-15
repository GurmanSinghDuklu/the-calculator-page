import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Snowflake, Mountain, Scale } from "lucide-react";

export default function SnowballAvalanche() {
  return (
    <>
      <SEO
        title="Snowball vs Avalanche: Debt Payoff Strategies Compared"
        description="Compare the debt snowball and avalanche methods with worked examples. Find which debt payoff strategy works best for your personality and financial situation."
        keywords="debt snowball, debt avalanche, debt payoff strategy, debt repayment methods, paying off debt UK, debt free strategies"
        canonicalUrl="/learn/snowball-avalanche"
      />
      
      <ArticleLayout
        title="Snowball vs Avalanche"
        description="Two payoff strategies with worked examples"
        readTime="20–40 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{
          title: "How Interest Eats Your Wealth",
          path: "/learn/interest-impact"
        }}
      >
        <h2>Two Proven Strategies</h2>
        <p>
          Both the Snowball and Avalanche methods work. The best choice depends on your 
          personality—whether you need quick wins for motivation or prefer mathematical optimization.
        </p>

        <h2>The Debt Avalanche Method</h2>
        
        <div className="not-prose bg-sky-500/10 border border-sky-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Mountain className="h-5 w-5 text-sky-600 mt-0.5" />
            <h4 className="font-semibold text-sky-700 dark:text-sky-300">Highest Interest First</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Pay minimums on all debts, then throw every extra pound at the debt with the 
            highest interest rate. Once that's paid, move to the next highest.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✓ Saves the most money in interest</li>
            <li>✓ Mathematically optimal</li>
            <li>✓ Fastest total payoff time</li>
            <li>✗ May take longer to see first win</li>
          </ul>
        </div>

        <h2>The Debt Snowball Method</h2>
        
        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Snowflake className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Smallest Balance First</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Pay minimums on all debts, then throw every extra pound at the debt with the 
            smallest balance. Once that's paid, move to the next smallest.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✓ Quick psychological wins</li>
            <li>✓ Builds momentum and motivation</li>
            <li>✓ Reduces number of debts faster</li>
            <li>✗ Costs more in total interest</li>
          </ul>
        </div>

        <h2>Worked Example</h2>
        <p>Let's compare both strategies with the same debt profile and £400/month to pay:</p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Starting Debts</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">Debt</th>
                <th className="text-right py-2">Balance</th>
                <th className="text-right py-2">APR</th>
                <th className="text-right py-2">Minimum</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2">Store Card</td>
                <td className="text-right py-2">£500</td>
                <td className="text-right py-2">29.9%</td>
                <td className="text-right py-2">£15</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">Credit Card</td>
                <td className="text-right py-2">£3,000</td>
                <td className="text-right py-2">22.9%</td>
                <td className="text-right py-2">£75</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">Overdraft</td>
                <td className="text-right py-2">£1,500</td>
                <td className="text-right py-2">39.9%</td>
                <td className="text-right py-2">£50</td>
              </tr>
              <tr>
                <td className="py-2">Car Loan</td>
                <td className="text-right py-2">£5,000</td>
                <td className="text-right py-2">7.9%</td>
                <td className="text-right py-2">£120</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Total debt:</strong> £10,000 | <strong>Total minimums:</strong> £260/month | 
            <strong>Extra to allocate:</strong> £140/month
          </p>
        </div>

        <h3>Avalanche Order (by APR)</h3>
        <ol>
          <li><strong>Overdraft (39.9%)</strong> - Pay first</li>
          <li><strong>Store Card (29.9%)</strong> - Pay second</li>
          <li><strong>Credit Card (22.9%)</strong> - Pay third</li>
          <li><strong>Car Loan (7.9%)</strong> - Pay last</li>
        </ol>
        <p>
          <strong>Result:</strong> Debt-free in 31 months, £1,850 total interest paid
        </p>

        <h3>Snowball Order (by Balance)</h3>
        <ol>
          <li><strong>Store Card (£500)</strong> - Pay first (4 months)</li>
          <li><strong>Overdraft (£1,500)</strong> - Pay second</li>
          <li><strong>Credit Card (£3,000)</strong> - Pay third</li>
          <li><strong>Car Loan (£5,000)</strong> - Pay last</li>
        </ol>
        <p>
          <strong>Result:</strong> Debt-free in 33 months, £2,100 total interest paid
        </p>

        <h2>The Comparison</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Scale className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Side by Side</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-sky-500/10 rounded-lg">
              <p className="font-medium text-sky-700 dark:text-sky-300 mb-2">Avalanche</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 31 months to debt-free</li>
                <li>• £1,850 total interest</li>
                <li>• First win: 11 months</li>
              </ul>
            </div>
            <div className="p-4 bg-violet-500/10 rounded-lg">
              <p className="font-medium text-violet-700 dark:text-violet-300 mb-2">Snowball</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 33 months to debt-free</li>
                <li>• £2,100 total interest</li>
                <li>• First win: 4 months</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Avalanche saves £250 and 2 months, but Snowball gives you a win 7 months sooner.
          </p>
        </div>

        <h2>Which Should You Choose?</h2>

        <h3>Choose Avalanche If:</h3>
        <ul>
          <li>You're motivated by math and logic</li>
          <li>You can stay committed without quick wins</li>
          <li>The interest rate differences are significant</li>
          <li>You want to pay the least amount possible</li>
        </ul>

        <h3>Choose Snowball If:</h3>
        <ul>
          <li>You need motivation and quick wins</li>
          <li>You've tried and failed with debt payoff before</li>
          <li>You have many small debts cluttering your finances</li>
          <li>The emotional burden of multiple debts is heavy</li>
        </ul>

        <h3>Hybrid Approach</h3>
        <p>
          Some people combine both: knock out one or two tiny debts for momentum, then switch 
          to avalanche for the rest. This gets you quick wins AND saves on interest.
        </p>

        <h2>The Rollover Effect</h2>
        <p>
          Here's where both methods gain power: when you pay off a debt, you don't reduce your 
          monthly payment—you roll that payment onto the next debt.
        </p>
        <ul>
          <li>Pay off Store Card (minimum was £15) → Add £15 to next debt payment</li>
          <li>Pay off Overdraft (minimum was £50) → Add £65 to next debt payment</li>
          <li>Each payoff accelerates the next one</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>List all your debts with balances and APRs</li>
          <li>Decide: Are you motivated by math (Avalanche) or momentum (Snowball)?</li>
          <li>Order your debts according to your chosen method</li>
          <li>Calculate your total minimum payments</li>
          <li>Determine how much extra you can pay each month</li>
          <li>Set up payments and start attacking debt #1</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            The best method is the one you'll actually stick to. A mathematically perfect plan 
            you abandon is worse than a slightly less optimal plan you complete. Choose based on 
            self-knowledge, not ego.
          </p>
        </div>

        <Card className="not-prose bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Put It Into Practice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our Multi-Card Payoff Calculator to run both strategies with your actual debts 
                and see exactly which approach works best for your situation.
              </p>
              <Link to="/finance/multi-card-payoff">
                <Button>Try Multi-Card Payoff Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}