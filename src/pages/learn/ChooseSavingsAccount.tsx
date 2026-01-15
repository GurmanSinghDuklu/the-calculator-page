import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Landmark, Percent, Shield } from "lucide-react";

export default function ChooseSavingsAccount() {
  return (
    <>
      <SEO
        title="How to Choose the Right Savings Account (UK) - ISA vs Regular Savings"
        description="Compare UK savings accounts including Cash ISAs, easy access, notice accounts, and fixed-rate bonds. Find the best place to park your cash with our comprehensive guide."
        keywords="UK savings account, Cash ISA, best savings rates, easy access savings, fixed rate bonds, FSCS protection, savings comparison UK"
        canonicalUrl="/learn/choose-savings-account"
      />
      
      <ArticleLayout
        title="How to Choose the Right Savings Account (UK)"
        description="ISA vs regular saving — where to park cash"
        readTime="20 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{
          title: "Inflation: The Silent Thief",
          path: "/learn/inflation-guide"
        }}
      >
        <h2>Why Account Choice Matters</h2>
        <p>
          Not all savings accounts are equal. The right choice can mean hundreds of pounds more in 
          interest each year, tax-free growth, and the flexibility you need. The wrong choice means 
          your money sits earning nothing while inflation erodes its value.
        </p>

        <h2>Types of UK Savings Accounts</h2>

        <h3>1. Easy Access Accounts</h3>
        <p>
          Withdraw anytime with no penalties. Best for emergency funds and money you might need quickly.
        </p>
        <ul>
          <li><strong>Pros:</strong> Flexibility, instant access, simple</li>
          <li><strong>Cons:</strong> Usually lower interest rates</li>
          <li><strong>Best for:</strong> Emergency fund, short-term savings</li>
        </ul>

        <h3>2. Notice Accounts</h3>
        <p>
          Require 30-90+ days notice before withdrawal. Trade some flexibility for better rates.
        </p>
        <ul>
          <li><strong>Pros:</strong> Higher rates than easy access</li>
          <li><strong>Cons:</strong> Must plan withdrawals in advance</li>
          <li><strong>Best for:</strong> Known future expenses, sinking funds</li>
        </ul>

        <h3>3. Fixed Rate Bonds</h3>
        <p>
          Lock money away for 1-5 years at a guaranteed rate. Best rates but no access.
        </p>
        <ul>
          <li><strong>Pros:</strong> Best rates, guaranteed return</li>
          <li><strong>Cons:</strong> Can't access money until maturity</li>
          <li><strong>Best for:</strong> House deposit savings, known future expenses</li>
        </ul>

        <h3>4. Regular Saver Accounts</h3>
        <p>
          High rates (4-8%) but limited to fixed monthly deposits (usually £100-500/month).
        </p>
        <ul>
          <li><strong>Pros:</strong> Excellent rates, builds saving habit</li>
          <li><strong>Cons:</strong> Limited deposit amounts, often tied to current accounts</li>
          <li><strong>Best for:</strong> Building savings habit, maximizing returns on small amounts</li>
        </ul>

        <h2>Understanding Cash ISAs</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Tax-Free Savings</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Individual Savings Accounts (ISAs) let you save up to £20,000 per tax year with no tax 
            on the interest. The allowance resets each April.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <strong>Cash ISA:</strong> Tax-free interest on cash savings</li>
            <li>• <strong>Stocks & Shares ISA:</strong> Tax-free investment growth</li>
            <li>• <strong>Lifetime ISA:</strong> 25% government bonus (restrictions apply)</li>
            <li>• <strong>Innovative Finance ISA:</strong> Peer-to-peer lending</li>
          </ul>
        </div>

        <h3>Do You Need an ISA?</h3>
        <p>
          Thanks to the Personal Savings Allowance, basic rate taxpayers can earn £1,000 in interest 
          tax-free, and higher rate taxpayers £500. If your savings generate less than this, a 
          non-ISA account with higher rates might be better.
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Percent className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Quick Calculation</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            At 5% interest, you'd need £20,000 saved to hit the £1,000 PSA threshold. Below that, 
            focus on getting the best rate regardless of ISA status. Above that, ISAs become more 
            valuable.
          </p>
        </div>

        <h2>FSCS Protection</h2>
        <p>
          The Financial Services Compensation Scheme protects up to £85,000 per person, per banking 
          group. If a bank fails, your money is guaranteed.
        </p>
        <ul>
          <li>Check your bank is FSCS protected</li>
          <li>Spread larger amounts across multiple banking groups</li>
          <li>Some banking brands share the same license (e.g., Halifax/Lloyds/BoS)</li>
        </ul>

        <h2>Finding the Best Rates</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Landmark className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Where to Compare</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>MoneySavingExpert:</strong> Best comprehensive comparisons</li>
            <li>• <strong>MoneySupermarket:</strong> Good for quick comparisons</li>
            <li>• <strong>Bank of England base rate:</strong> Benchmark for savings rates</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Check rates monthly—they change frequently, especially when base rates move.
          </p>
        </div>

        <h2>A Practical Savings Strategy</h2>
        <p>Consider a "ladder" approach using multiple accounts:</p>
        <ol>
          <li>
            <strong>Instant Access (1-2 months expenses):</strong> Easy access for true emergencies
          </li>
          <li>
            <strong>Notice Account (rest of emergency fund):</strong> Better rate, 30-day buffer
          </li>
          <li>
            <strong>Regular Saver:</strong> Max out monthly allowance for best rates
          </li>
          <li>
            <strong>Fixed Rate:</strong> For money you won't need for 1+ years
          </li>
          <li>
            <strong>Cash ISA:</strong> Use allowance if you're near/over PSA threshold
          </li>
        </ol>

        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li><strong>Leaving money in 0.1% accounts</strong> - The biggest sin in savings</li>
          <li><strong>Chasing rates without reading terms</strong> - Watch for bonus rate periods</li>
          <li><strong>Forgetting about expiring bonuses</strong> - Diary when introductory rates end</li>
          <li><strong>Splitting across too many accounts</strong> - Keep it manageable</li>
          <li><strong>Not using ISA allowance when beneficial</strong> - Use it or lose it</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Check your current savings account rate (many people don't know)</li>
          <li>Calculate how much interest you're earning annually</li>
          <li>Compare best buys for your savings type</li>
          <li>Open a better account if you find 0.5%+ improvement</li>
          <li>Set a calendar reminder to review rates quarterly</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Don't let the perfect be the enemy of the good. Moving from 0.1% to 4% is far more 
            important than agonizing over 4.5% vs 4.6%. Take action quickly, then optimize later.
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
                Use our Savings Calculator to see how different interest rates compound over time 
                and the real difference rate shopping makes.
              </p>
              <Link to="/finance/savings">
                <Button>Try Savings Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}