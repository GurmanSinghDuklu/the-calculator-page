import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, TrendingDown, Clock, AlertTriangle } from "lucide-react";

export default function InterestImpact() {
  return (
    <>
      <SEO
        title="How Interest Eats Your Wealth - The Reverse Compounding Effect"
        description="Visualize how compound interest works against you when you're in debt. Understand the true cost of borrowing and why paying off debt is like guaranteed returns."
        keywords="compound interest debt, interest on loans, debt interest calculator, true cost of borrowing, reverse compounding, debt visualisation UK"
        canonicalUrl="/learn/interest-impact"
      />
      
      <ArticleLayout
        title="How Interest Eats Your Wealth"
        description="Reverse compounding visual guide"
        readTime="15 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{
          title: "Credit Scores and Borrowing Wisely",
          path: "/learn/credit-scores"
        }}
      >
        <h2>Compound Interest in Reverse</h2>
        <p>
          You've heard that compound interest is the "eighth wonder of the world." What's less 
          celebrated is its dark twin: compound interest working against you. When you're in debt, 
          every day you don't pay it off, interest compounds on interest.
        </p>

        <div className="not-prose bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-destructive mb-2">The Wealth Destroyer</p>
              <p className="text-sm text-muted-foreground">
                A credit card at 22% APR doubles what you owe in just 3.3 years if you make no 
                payments. A payday loan at 1,000% APR? Your debt multiplies 11x in one year.
              </p>
            </div>
          </div>
        </div>

        <h2>Visualizing the Drain</h2>
        <p>
          Imagine filling a bathtub (your wealth) while the drain is open (interest on debt). 
          The higher your interest rate, the wider the drain. You can pour in money all month, 
          but if the drain is big enough, the water level never rises.
        </p>

        <h3>The Daily Bleed</h3>
        <p>Interest accrues daily, even when you're sleeping:</p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Daily Interest on £5,000 Debt</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded">
              <span>7% APR (good personal loan)</span>
              <span className="font-medium">£0.96/day</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-500/10 rounded">
              <span>19.9% APR (decent credit card)</span>
              <span className="font-medium">£2.72/day</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded">
              <span>29.9% APR (store card)</span>
              <span className="font-medium">£4.09/day</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-destructive/10 rounded">
              <span>39.9% APR (overdraft)</span>
              <span className="font-medium">£5.46/day</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            That overdraft costs you £38/week, £164/month, or £1,970/year in interest alone.
          </p>
        </div>

        <h2>The Minimum Payment Trap</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">£3,000 Credit Card at 22% APR</h4>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-2">Making minimum payments (2%):</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-destructive/10 rounded">
                  <p className="text-2xl font-bold text-destructive">27</p>
                  <p className="text-xs text-muted-foreground">years</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded">
                  <p className="text-2xl font-bold text-destructive">£4,400</p>
                  <p className="text-xs text-muted-foreground">interest paid</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded">
                  <p className="text-2xl font-bold text-destructive">£7,400</p>
                  <p className="text-xs text-muted-foreground">total repaid</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Paying £150/month fixed:</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-emerald-500/10 rounded">
                  <p className="text-2xl font-bold text-emerald-600">2</p>
                  <p className="text-xs text-muted-foreground">years</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded">
                  <p className="text-2xl font-bold text-emerald-600">£650</p>
                  <p className="text-xs text-muted-foreground">interest paid</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded">
                  <p className="text-2xl font-bold text-emerald-600">£3,650</p>
                  <p className="text-xs text-muted-foreground">total repaid</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm font-medium mt-4">
            Same debt, same rate: £3,750 difference based on payment strategy.
          </p>
        </div>

        <h2>The Investment Comparison</h2>
        <p>
          Paying off debt is a guaranteed investment return. Consider this:
        </p>
        <ul>
          <li>Stock market average return: ~7-10% (not guaranteed, can lose)</li>
          <li>Savings account: ~4-5% (guaranteed)</li>
          <li>Paying off 22% credit card debt: 22% guaranteed return</li>
        </ul>
        <p>
          Every £100 you put toward a 22% debt saves you £22/year in interest—guaranteed. 
          No investment can match that risk-free return.
        </p>

        <h2>Interest Rate Impact Over Time</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">£10,000 Debt Over 10 Years (Minimum Payments)</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">APR</th>
                <th className="text-right py-2">Interest Paid</th>
                <th className="text-right py-2">Total Repaid</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2">7%</td>
                <td className="text-right py-2">£4,200</td>
                <td className="text-right py-2">£14,200</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">15%</td>
                <td className="text-right py-2">£10,500</td>
                <td className="text-right py-2">£20,500</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">22%</td>
                <td className="text-right py-2">£18,800</td>
                <td className="text-right py-2">£28,800</td>
              </tr>
              <tr>
                <td className="py-2">30%</td>
                <td className="text-right py-2">£28,000</td>
                <td className="text-right py-2">£38,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Breaking Free: Strategies</h2>

        <h3>1. Attack the Rate</h3>
        <ul>
          <li>Balance transfer to 0% card</li>
          <li>Consolidate to lower-rate personal loan</li>
          <li>Negotiate with current lender</li>
        </ul>

        <h3>2. Attack the Balance</h3>
        <ul>
          <li>Pay more than minimum—any extra helps</li>
          <li>Use windfalls for debt (tax refunds, bonuses)</li>
          <li>Redirect savings temporarily to debt (if interest rate is higher)</li>
        </ul>

        <h3>3. Attack the Timeline</h3>
        <ul>
          <li>Set a debt-free date and work backwards</li>
          <li>Use bi-weekly payments (26 half-payments = 13 full payments)</li>
          <li>Round up payments for psychological wins</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Calculate the daily interest cost of each debt</li>
          <li>Look at your total debt and imagine the daily "drain"</li>
          <li>Compare your highest debt rate to investment returns</li>
          <li>Commit to paying more than the minimum on your highest-rate debt</li>
          <li>Explore 0% balance transfers or consolidation options</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Think of debt interest as a subscription you're paying for nothing. Unlike Netflix or 
            Spotify, you get zero value from interest payments. Every pound of interest is a pound 
            that could have been yours.
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
                Use our Compound Interest Calculator to visualize how interest accumulates on debt, 
                and see the dramatic difference higher payments make.
              </p>
              <Link to="/finance/compound-interest">
                <Button>Try Compound Interest Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}