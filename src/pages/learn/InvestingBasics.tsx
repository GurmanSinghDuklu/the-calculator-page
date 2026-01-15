import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Building, Layers } from "lucide-react";

export default function InvestingBasics() {
  return (
    <>
      <SEO
        title="Basics of Investing: Stocks, Bonds & ETFs - A Beginner's Guide"
        description="Understand the fundamental building blocks of investing: stocks, bonds, and ETFs. A clear, jargon-free introduction for UK investors starting their investment journey."
        keywords="investing basics UK, stocks for beginners, what are bonds, ETF explained, index funds UK, beginner investing, investment types"
        canonicalUrl="/learn/investing-basics"
      />
      
      <ArticleLayout
        title="Basics of Investing: Stocks, Bonds & ETFs"
        description="Core primer for new investors"
        readTime="30–45 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{
          title: "How to Build a Balanced Portfolio",
          path: "/learn/build-portfolio"
        }}
      >
        <h2>The Building Blocks of Investing</h2>
        <p>
          Every investment portfolio is built from a few core asset types. Understanding these 
          fundamentals makes everything else click. Let's break them down simply.
        </p>

        <h2>Stocks (Equities)</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">What Are Stocks?</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            When you buy a stock, you're buying a tiny piece of a company. If the company grows 
            and profits increase, your share becomes more valuable. If the company struggles, 
            your share loses value.
          </p>
        </div>

        <h3>Key Stock Concepts</h3>
        <ul>
          <li><strong>Share price:</strong> What one "share" of ownership costs</li>
          <li><strong>Market cap:</strong> Total value of all shares (company size)</li>
          <li><strong>Dividends:</strong> Cash payments companies may pay to shareholders</li>
          <li><strong>Capital gains:</strong> Profit when you sell shares for more than you paid</li>
        </ul>

        <h3>Stock Risk and Return</h3>
        <ul>
          <li><strong>Historical return:</strong> ~7-10% annually (long-term average)</li>
          <li><strong>Volatility:</strong> High—can drop 30-50% in bad years</li>
          <li><strong>Best for:</strong> Long-term growth (5+ year timeline)</li>
        </ul>

        <h2>Bonds (Fixed Income)</h2>
        
        <div className="not-prose bg-sky-500/10 border border-sky-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Building className="h-5 w-5 text-sky-600 mt-0.5" />
            <h4 className="font-semibold text-sky-700 dark:text-sky-300">What Are Bonds?</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            When you buy a bond, you're lending money to a government or company. They promise 
            to pay you back with interest. It's essentially an IOU with a fixed repayment schedule.
          </p>
        </div>

        <h3>Key Bond Concepts</h3>
        <ul>
          <li><strong>Coupon:</strong> The interest rate the bond pays</li>
          <li><strong>Maturity:</strong> When the bond's principal is repaid</li>
          <li><strong>Face value:</strong> The amount repaid at maturity</li>
          <li><strong>Yield:</strong> Your effective return based on purchase price</li>
        </ul>

        <h3>Types of Bonds</h3>
        <ul>
          <li><strong>Government bonds (Gilts in UK):</strong> Very safe, lower returns</li>
          <li><strong>Corporate bonds:</strong> Higher risk/return than government</li>
          <li><strong>High-yield bonds:</strong> Higher risk companies, higher returns</li>
        </ul>

        <h3>Bond Risk and Return</h3>
        <ul>
          <li><strong>Historical return:</strong> ~3-5% annually</li>
          <li><strong>Volatility:</strong> Lower than stocks, but not zero</li>
          <li><strong>Best for:</strong> Stability, income, balancing stock volatility</li>
        </ul>

        <h2>ETFs (Exchange-Traded Funds)</h2>
        
        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Layers className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">What Are ETFs?</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            An ETF is a basket of investments that trades like a single stock. Instead of buying 
            100 different stocks yourself, you buy one ETF that holds all 100. Instant diversification.
          </p>
        </div>

        <h3>Why ETFs Are Popular</h3>
        <ul>
          <li><strong>Diversification:</strong> Own hundreds of companies with one purchase</li>
          <li><strong>Low cost:</strong> Much cheaper than actively managed funds</li>
          <li><strong>Simplicity:</strong> One buy gives you broad market exposure</li>
          <li><strong>Transparency:</strong> You know exactly what's inside</li>
          <li><strong>Liquidity:</strong> Trade anytime the market is open</li>
        </ul>

        <h3>Popular ETF Types</h3>
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Global Stock ETFs</p>
              <p className="text-muted-foreground">
                Track thousands of companies worldwide. E.g., Vanguard FTSE All-World (VWRP)
              </p>
            </div>
            <div>
              <p className="font-medium">S&P 500 ETFs</p>
              <p className="text-muted-foreground">
                Track 500 largest US companies. E.g., Vanguard S&P 500 (VUSA)
              </p>
            </div>
            <div>
              <p className="font-medium">UK Equity ETFs</p>
              <p className="text-muted-foreground">
                Track UK companies. E.g., iShares Core FTSE 100 (ISF)
              </p>
            </div>
            <div>
              <p className="font-medium">Bond ETFs</p>
              <p className="text-muted-foreground">
                Hold hundreds of bonds. E.g., Vanguard Global Bond (VAGS)
              </p>
            </div>
          </div>
        </div>

        <h2>Index Funds vs Active Funds</h2>

        <h3>Index Funds (Passive)</h3>
        <ul>
          <li>Track a market index (S&P 500, FTSE 100, etc.)</li>
          <li>No fund manager trying to "beat the market"</li>
          <li>Very low fees (0.03% - 0.25%)</li>
          <li>Consistently outperform most active funds over time</li>
        </ul>

        <h3>Active Funds</h3>
        <ul>
          <li>Fund manager picks stocks trying to beat the market</li>
          <li>Higher fees (0.5% - 2%+)</li>
          <li>Most fail to beat index funds over 10+ years</li>
          <li>Some do outperform, but predicting which is nearly impossible</li>
        </ul>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
          <p className="text-sm text-muted-foreground">
            <strong>The evidence is clear:</strong> For most investors, low-cost index funds/ETFs 
            are the best choice. You're not trying to beat the market—you're owning the market.
          </p>
        </div>

        <h2>How These Work Together</h2>
        <p>
          A balanced portfolio typically combines stocks (for growth) and bonds (for stability). 
          The ratio depends on your risk tolerance and timeline:
        </p>
        <ul>
          <li><strong>Aggressive (young, long timeline):</strong> 90% stocks, 10% bonds</li>
          <li><strong>Moderate:</strong> 70% stocks, 30% bonds</li>
          <li><strong>Conservative (near retirement):</strong> 50% stocks, 50% bonds</li>
        </ul>

        <h2>Key Terms to Know</h2>
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Diversification</p>
              <p className="text-muted-foreground">Not putting all eggs in one basket</p>
            </div>
            <div>
              <p className="font-medium">Expense Ratio</p>
              <p className="text-muted-foreground">Annual fee as % of investment</p>
            </div>
            <div>
              <p className="font-medium">Accumulating</p>
              <p className="text-muted-foreground">Dividends auto-reinvested</p>
            </div>
            <div>
              <p className="font-medium">Distributing</p>
              <p className="text-muted-foreground">Dividends paid out as cash</p>
            </div>
            <div>
              <p className="font-medium">Ticker Symbol</p>
              <p className="text-muted-foreground">Short code for a stock/ETF (e.g., VWRP)</p>
            </div>
            <div>
              <p className="font-medium">Portfolio</p>
              <p className="text-muted-foreground">Your collection of investments</p>
            </div>
          </div>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Understand the difference between stocks, bonds, and ETFs</li>
          <li>Research a few popular global ETFs (VWRP, VUSA, SWDA)</li>
          <li>Look up the expense ratios and compare</li>
          <li>Think about what ratio of stocks to bonds suits your risk tolerance</li>
          <li>Read the next article on building a balanced portfolio</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            You don't need to understand every investment product. A single global stock ETF plus 
            a bond ETF can form a complete, diversified portfolio. Simple often beats complex.
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
                Use our Compound Interest Calculator to model long-term investment growth with 
                realistic market returns (7% stocks, 4% bonds) and see how your money could grow.
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