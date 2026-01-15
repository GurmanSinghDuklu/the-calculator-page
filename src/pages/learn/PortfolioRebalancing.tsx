import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, RefreshCw, Calendar, Target } from "lucide-react";

export default function PortfolioRebalancing() {
  return (
    <>
      <SEO
        title="How to Rebalance and Review Your Portfolio - Best Practices"
        description="Learn when and how to rebalance your investment portfolio. Practical guidance on maintaining your target allocation, reviewing performance, and staying disciplined."
        keywords="portfolio rebalancing, investment review, asset allocation maintenance, rebalancing strategy, portfolio management UK, investment discipline"
        canonicalUrl="/learn/portfolio-rebalancing"
      />
      
      <ArticleLayout
        title="How to Rebalance and Review Your Portfolio"
        description="Discipline and management best practices"
        readTime="20 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{
          title: "Financial Freedom: Defining Your End Goal",
          path: "/learn/financial-freedom"
        }}
      >
        <h2>What Is Rebalancing?</h2>
        <p>
          Rebalancing means adjusting your portfolio back to its target allocation. Over time, 
          some investments grow faster than others, throwing your carefully planned mix out of 
          balance. Rebalancing restores your intended risk level.
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Example: Drift in Action</h4>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-foreground">Target Allocation</p>
              <p className="text-muted-foreground">80% stocks, 20% bonds</p>
            </div>
            <div>
              <p className="font-medium text-foreground">After Strong Stock Year</p>
              <p className="text-muted-foreground">
                Stocks grew 20%, bonds grew 5%. Portfolio is now 85% stocks, 15% bonds. 
                You're taking more risk than intended.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Rebalancing Action</p>
              <p className="text-muted-foreground">
                Sell some stocks, buy bonds to return to 80/20. OR direct new contributions 
                to bonds until balance is restored.
              </p>
            </div>
          </div>
        </div>

        <h2>Why Rebalance?</h2>

        <h3>1. Maintain Your Risk Level</h3>
        <p>
          If you decided 80/20 was right for you, drifting to 90/10 means you're taking more 
          risk than you intended. When the next crash comes, you'll be more exposed.
        </p>

        <h3>2. Systematic "Buy Low, Sell High"</h3>
        <p>
          Rebalancing forces you to sell what's grown (expensive) and buy what's lagged (cheap). 
          It's the opposite of emotional investing.
        </p>

        <h3>3. Prevents Concentration Risk</h3>
        <p>
          Without rebalancing, your portfolio could become dominated by whatever performed best, 
          leaving you vulnerable if that sector reverses.
        </p>

        <h2>When to Rebalance</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Rebalancing Approaches</h4>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Calendar-Based (Simplest)</p>
              <p>Rebalance on a fixed schedule—annually or semi-annually. Set a calendar reminder 
              and do it regardless of market conditions.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Threshold-Based</p>
              <p>Rebalance when any asset class drifts more than 5% from target (e.g., 80% becomes 
              85% or 75%).</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Cash Flow-Based</p>
              <p>Direct new contributions to underweight assets rather than selling. Avoids 
              transaction costs and potential taxes.</p>
            </div>
          </div>
        </div>

        <h3>Recommended Frequency</h3>
        <p>
          For most people, annual rebalancing is sufficient. More frequent rebalancing 
          (monthly or quarterly) doesn't significantly improve returns and increases costs.
        </p>

        <h2>How to Rebalance</h2>

        <h3>Method 1: Sell and Buy</h3>
        <ol>
          <li>Calculate current allocation percentages</li>
          <li>Compare to target allocation</li>
          <li>Sell overweight assets</li>
          <li>Buy underweight assets</li>
        </ol>
        <p>
          <strong>Best for:</strong> Taxable accounts where you can use losses, or tax-sheltered 
          accounts (ISA, pension) where no tax applies.
        </p>

        <h3>Method 2: Cash Flow Rebalancing</h3>
        <ol>
          <li>Calculate current allocation</li>
          <li>Identify underweight assets</li>
          <li>Direct new contributions 100% to underweight assets</li>
          <li>Continue until balance is restored</li>
        </ol>
        <p>
          <strong>Best for:</strong> Taxable accounts, those adding regular contributions, 
          minimizing transaction costs.
        </p>

        <h2>The Annual Portfolio Review</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Target className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Your Annual Checklist</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Review current allocation vs target</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Check fund expense ratios—any cheaper alternatives?</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Verify you're using full ISA allowance</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Check pension contributions and employer match</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Has your risk tolerance changed? (new job, family, age)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Are your goals still the same?</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Rebalance if allocation has drifted 5%+</span>
            </div>
          </div>
        </div>

        <h2>What NOT to Do</h2>

        <h3>Don't React to Headlines</h3>
        <p>
          "Stocks crashed! Should I rebalance to bonds?" If stocks crashed, bonds are now 
          overweight—you should actually buy more stocks, not sell.
        </p>

        <h3>Don't Rebalance Too Often</h3>
        <p>
          Monthly rebalancing incurs more costs and doesn't improve long-term returns. 
          Stick to your schedule, ignore the noise.
        </p>

        <h3>Don't Time the Rebalance</h3>
        <p>
          "I'll wait for stocks to recover before rebalancing." This defeats the purpose. 
          Rebalance on your set schedule regardless of market conditions.
        </p>

        <h2>Adjusting Allocation Over Time</h2>
        <p>
          As you age or your circumstances change, your target allocation might need to shift:
        </p>
        <ul>
          <li>
            <strong>Approaching retirement:</strong> Gradually reduce stock allocation (e.g., 
            90→70→60% over 10-15 years)
          </li>
          <li>
            <strong>Major life change:</strong> Review if your risk tolerance has changed
          </li>
          <li>
            <strong>Major goal achieved:</strong> If you hit your retirement number, you might 
            reduce risk
          </li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Document your target asset allocation</li>
          <li>Calculate your current allocation percentages</li>
          <li>Set a calendar reminder for annual review (same date each year)</li>
          <li>Decide: sell/buy rebalancing or cash flow rebalancing?</li>
          <li>If allocation has drifted 5%+, rebalance now</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Some platforms offer automatic rebalancing—the platform does it for you. If you find 
            yourself procrastinating on rebalancing, consider using a platform with this feature 
            or an all-in-one fund that rebalances internally.
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
                Use our Compound Interest Calculator to model how your portfolio might grow with 
                consistent rebalancing over time.
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