import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, PieChart, Shield, Zap } from "lucide-react";

export default function BuildPortfolio() {
  return (
    <>
      <SEO
        title="How to Build a Balanced Portfolio - Sample Portfolios by Risk Profile"
        description="Learn how to construct a diversified investment portfolio tailored to your risk tolerance. Includes sample portfolios from conservative to aggressive with specific ETF examples."
        keywords="build investment portfolio, portfolio allocation, asset allocation UK, diversified portfolio, risk-based investing, sample portfolios, investment strategy"
        canonicalUrl="/learn/build-portfolio"
      />
      
      <ArticleLayout
        title="How to Build a Balanced Portfolio"
        description="Sample portfolios by risk profile"
        readTime="30 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{
          title: "Long-Term Investing vs Trading",
          path: "/learn/investing-vs-trading"
        }}
      >
        <h2>What Makes a Good Portfolio?</h2>
        <p>
          A well-built portfolio balances growth potential with risk management. It should be 
          diversified (not all eggs in one basket), aligned with your timeline, and simple enough 
          that you'll actually stick with it.
        </p>

        <h2>The Core Principles</h2>

        <h3>1. Diversification</h3>
        <p>
          Spread investments across asset classes (stocks, bonds), geographies (UK, US, global), 
          and sectors. When one area struggles, others may thrive.
        </p>

        <h3>2. Risk-Appropriate Allocation</h3>
        <p>
          Your mix of stocks vs bonds should match your risk tolerance and timeline. More stocks 
          = more growth potential but more volatility.
        </p>

        <h3>3. Low Costs</h3>
        <p>
          Fees compound negatively just like interest. A 1% annual fee can cost you 25% of your 
          final portfolio over 30 years. Use low-cost index funds.
        </p>

        <h3>4. Simplicity</h3>
        <p>
          Complex portfolios are hard to maintain and rebalance. The best portfolio is one you 
          understand and will stick with through market ups and downs.
        </p>

        <h2>Sample Portfolios by Risk Profile</h2>

        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Conservative Portfolio</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            For those near retirement or with low risk tolerance. Prioritizes stability over growth.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Bonds</span>
              <span className="font-medium">50%</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Stocks</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>UK Gilts</span>
              <span className="font-medium">15%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Expected return: ~4-5% | Volatility: Low-Medium
          </p>
        </div>

        <div className="not-prose bg-sky-500/10 border border-sky-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <PieChart className="h-5 w-5 text-sky-600 mt-0.5" />
            <h4 className="font-semibold text-sky-700 dark:text-sky-300">Balanced Portfolio</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Classic 60/40 approach. Good for mid-timeline investors wanting growth with some stability.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Stocks (All-World)</span>
              <span className="font-medium">60%</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Bonds</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>UK Gilts</span>
              <span className="font-medium">10%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Expected return: ~5-7% | Volatility: Medium
          </p>
        </div>

        <div className="not-prose bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="h-5 w-5 text-emerald-600 mt-0.5" />
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Growth Portfolio</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            For younger investors with 20+ year timelines. Maximizes growth potential.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Stocks (All-World)</span>
              <span className="font-medium">80%</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Bonds</span>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex justify-between p-2 bg-background rounded">
              <span>UK Stocks (FTSE)</span>
              <span className="font-medium">5%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Expected return: ~6-8% | Volatility: Medium-High
          </p>
        </div>

        <div className="not-prose bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="h-5 w-5 text-orange-600 mt-0.5" />
            <h4 className="font-semibold text-orange-700 dark:text-orange-300">Aggressive Portfolio</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            For long timelines and high risk tolerance. 100% equities for maximum growth.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-background rounded">
              <span>Global Stocks (All-World)</span>
              <span className="font-medium">100%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Expected return: ~7-10% | Volatility: High
          </p>
        </div>

        <h2>The One-Fund Solution</h2>
        <p>
          If you want maximum simplicity, many providers offer "all-in-one" funds that hold a 
          diversified mix of stocks and bonds in a single fund:
        </p>
        <ul>
          <li><strong>Vanguard LifeStrategy 60%</strong> - 60% stocks, 40% bonds</li>
          <li><strong>Vanguard LifeStrategy 80%</strong> - 80% stocks, 20% bonds</li>
          <li><strong>Vanguard Target Retirement funds</strong> - Auto-adjust as you age</li>
        </ul>

        <h2>Example ETF Implementation</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Building a 60/40 Portfolio with ETFs</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">ETF</th>
                <th className="text-left py-2">Ticker</th>
                <th className="text-right py-2">Allocation</th>
                <th className="text-right py-2">Fee</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2">Vanguard FTSE All-World</td>
                <td className="py-2">VWRP</td>
                <td className="text-right py-2">60%</td>
                <td className="text-right py-2">0.22%</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2">Vanguard Global Aggregate Bond</td>
                <td className="py-2">VAGS</td>
                <td className="text-right py-2">30%</td>
                <td className="text-right py-2">0.10%</td>
              </tr>
              <tr>
                <td className="py-2">iShares UK Gilts</td>
                <td className="py-2">IGLT</td>
                <td className="text-right py-2">10%</td>
                <td className="text-right py-2">0.07%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-4">
            Total weighted expense ratio: ~0.16% per year
          </p>
        </div>

        <h2>Where to Invest</h2>
        <p>Use tax-efficient accounts in this priority order:</p>
        <ol>
          <li><strong>Workplace pension</strong> - Get full employer match first</li>
          <li><strong>Stocks & Shares ISA</strong> - Tax-free gains, £20k/year limit</li>
          <li><strong>SIPP</strong> - Additional pension, tax relief on contributions</li>
          <li><strong>General Investment Account</strong> - After ISA is maxed</li>
        </ol>

        <h2>Implementation Steps</h2>
        <ol>
          <li>Choose a low-cost platform (Vanguard, iWeb, InvestEngine)</li>
          <li>Select your risk profile based on timeline and tolerance</li>
          <li>Pick ETFs or a LifeStrategy fund that matches</li>
          <li>Set up regular monthly investments (pound-cost averaging)</li>
          <li>Rebalance annually to maintain target allocation</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Don't tinker. Once you've built a sensible portfolio, the best thing to do is... 
            nothing. Check it once a year, rebalance if needed, and otherwise leave it alone. 
            Fiddling usually hurts returns.
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
                Use our Compound Interest Calculator to project how different portfolio allocations 
                could grow over your investment timeline.
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