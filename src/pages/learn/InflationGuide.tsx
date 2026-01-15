import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, TrendingDown, AlertTriangle, Shield } from "lucide-react";

export default function InflationGuide() {
  return (
    <>
      <SEO
        title="Inflation: The Silent Thief - Protecting Your Money's Buying Power"
        description="Understand how inflation erodes your savings and learn strategies to protect your money's purchasing power. Real returns, inflation hedges, and practical UK-focused advice."
        keywords="inflation UK, real returns, purchasing power, inflation protection, CPI, savings vs inflation, beating inflation"
        canonicalUrl="/learn/inflation-guide"
      />
      
      <ArticleLayout
        title="Inflation: The Silent Thief"
        description="Understand real returns and protecting buying power"
        readTime="15 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{
          title: "Your First £1,000: Turning Saving Into a Habit",
          path: "/learn/first-1000"
        }}
      >
        <h2>What Is Inflation Really?</h2>
        <p>
          Inflation is the rate at which money loses purchasing power. When inflation is 5%, 
          £100 today will only buy £95 worth of goods next year. It's not that prices go up—it's 
          that your money becomes worth less.
        </p>

        <div className="not-prose bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-destructive mb-2">The Hidden Tax</p>
              <p className="text-sm text-muted-foreground">
                At 5% inflation, money loses half its purchasing power in just 14 years. That £10,000 
                emergency fund becomes worth only £5,000 in real terms—even while the number in your 
                account stays the same.
              </p>
            </div>
          </div>
        </div>

        <h2>Understanding Real vs Nominal Returns</h2>
        <p>
          The interest rate your bank shows is the <strong>nominal return</strong>. What actually 
          matters is the <strong>real return</strong>—your interest minus inflation.
        </p>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
          <p className="text-sm font-mono text-center">
            Real Return = Nominal Return − Inflation Rate
          </p>
        </div>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-3">Example Scenarios</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded">
              <span>Savings rate 5%, Inflation 3%</span>
              <span className="font-medium text-emerald-600">+2% real return ✓</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-500/10 rounded">
              <span>Savings rate 4%, Inflation 4%</span>
              <span className="font-medium text-amber-600">0% real return (treading water)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-destructive/10 rounded">
              <span>Savings rate 2%, Inflation 5%</span>
              <span className="font-medium text-destructive">-3% real return (losing money)</span>
            </div>
          </div>
        </div>

        <h2>How Inflation Is Measured</h2>
        <p>In the UK, two main measures are used:</p>
        <ul>
          <li>
            <strong>CPI (Consumer Price Index):</strong> The official measure, used for the Bank of 
            England's 2% target. Excludes housing costs.
          </li>
          <li>
            <strong>RPI (Retail Price Index):</strong> Older measure, usually higher than CPI. 
            Includes mortgage interest payments.
          </li>
          <li>
            <strong>CPIH:</strong> CPI plus owner-occupiers' housing costs. Increasingly used.
          </li>
        </ul>

        <h2>Why Keeping Cash Has a Cost</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
            <h4 className="font-semibold">The Erosion Effect</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            £10,000 in a 0% account with 5% annual inflation:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• After 1 year: £9,524 real value</li>
            <li>• After 5 years: £7,835 real value</li>
            <li>• After 10 years: £6,139 real value</li>
            <li>• After 20 years: £3,769 real value</li>
          </ul>
        </div>

        <p>
          This doesn't mean you shouldn't hold cash. Emergency funds need to be accessible. 
          But it does mean long-term wealth building requires strategies that outpace inflation.
        </p>

        <h2>Strategies to Combat Inflation</h2>

        <h3>1. Maximize Savings Interest</h3>
        <p>
          The difference between 0.1% and 5% is enormous. Always shop for the best rates and 
          consider notice accounts for better returns on money you don't need immediately.
        </p>

        <h3>2. Consider Index-Linked Savings</h3>
        <p>
          Some NS&I products and bonds offer returns linked to inflation, guaranteeing your 
          purchasing power is maintained.
        </p>

        <h3>3. Invest for the Long Term</h3>
        <p>
          Historically, diversified stock market investments have returned 7-10% annually over 
          long periods, well above inflation. The tradeoff is short-term volatility.
        </p>

        <h3>4. Own Assets That Appreciate</h3>
        <ul>
          <li><strong>Property:</strong> Tends to keep pace with or exceed inflation over time</li>
          <li><strong>Stocks:</strong> Companies can raise prices with inflation</li>
          <li><strong>Commodities:</strong> Physical goods often rise with inflation</li>
        </ul>

        <h3>5. Invest in Yourself</h3>
        <p>
          Skills and education can lead to higher earnings, which is the ultimate inflation hedge—
          your income rises with or faster than costs.
        </p>

        <h2>When Inflation Actually Helps</h2>
        <p>
          Inflation isn't all bad if you're a borrower with fixed-rate debt:
        </p>
        <ul>
          <li>Your mortgage payment stays the same while your salary (hopefully) rises</li>
          <li>The real value of your debt decreases over time</li>
          <li>Property values tend to rise, building equity faster</li>
        </ul>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The Right Balance</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Keep enough cash for emergencies (3-6 months expenses), even knowing inflation erodes it. 
            The peace of mind and flexibility is worth the cost. For anything beyond that, consider 
            investments that can beat inflation over time.
          </p>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Check your current savings rate against current CPI inflation</li>
          <li>Calculate your real return (interest rate minus inflation)</li>
          <li>Move any 0% funds to the best available easy-access rate</li>
          <li>Consider your timeline—long-term money may warrant investment</li>
          <li>Review annually as both rates and inflation change</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Don't panic about inflation eating your emergency fund. Its purpose is security, not 
            growth. Accept the "cost" of keeping 3-6 months accessible, and focus on beating 
            inflation with your long-term savings and investments.
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
                Use our Compound Interest Calculator to see how different rates affect your savings 
                growth over time, including inflation-adjusted projections.
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