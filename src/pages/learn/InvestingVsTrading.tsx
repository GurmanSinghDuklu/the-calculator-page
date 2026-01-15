import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Clock, Zap, Brain } from "lucide-react";

export default function InvestingVsTrading() {
  return (
    <>
      <SEO
        title="Long-Term Investing vs Trading - Psychology and Strategy"
        description="Understand the crucial difference between investing and trading. Learn why long-term investing wins for most people and how to master the psychology of staying the course."
        keywords="investing vs trading, long term investing, buy and hold, trading psychology, investment strategy, patient investing UK"
        canonicalUrl="/learn/investing-vs-trading"
      />
      
      <ArticleLayout
        title="Long-Term Investing vs Trading"
        description="Psychology and behaviour guidance"
        readTime="20 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{
          title: "Tax-Efficient Accounts (ISAs, SIPPs)",
          path: "/learn/tax-efficient-accounts"
        }}
      >
        <h2>Two Very Different Games</h2>
        <p>
          Investing and trading may look similar—both involve buying assets—but they're completely 
          different activities with different skills, time requirements, and success rates. 
          Knowing which game you're playing is crucial.
        </p>

        <h2>What Is Long-Term Investing?</h2>
        
        <div className="not-prose bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="h-5 w-5 text-emerald-600 mt-0.5" />
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">The Investing Approach</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Buy diversified assets (index funds, ETFs)</li>
            <li>• Hold for years or decades</li>
            <li>• Ignore short-term market movements</li>
            <li>• Reinvest dividends</li>
            <li>• Rebalance occasionally (annually)</li>
            <li>• Time in market beats timing the market</li>
          </ul>
        </div>

        <h2>What Is Trading?</h2>
        
        <div className="not-prose bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="h-5 w-5 text-orange-600 mt-0.5" />
            <h4 className="font-semibold text-orange-700 dark:text-orange-300">The Trading Approach</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Buy individual stocks, options, crypto, etc.</li>
            <li>• Hold for days, hours, or minutes</li>
            <li>• React to market movements constantly</li>
            <li>• Try to predict short-term price changes</li>
            <li>• Requires significant time and attention</li>
            <li>• Attempt to beat the market</li>
          </ul>
        </div>

        <h2>The Evidence Is Clear</h2>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Studies Show:</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong>70-90% of day traders lose money</strong> - After fees, taxes, and time, 
              most traders would have been better off investing passively.
            </li>
            <li>
              <strong>Missing the best days is devastating</strong> - If you missed the 10 best 
              market days over 20 years, your returns would be halved.
            </li>
            <li>
              <strong>Professional fund managers underperform</strong> - 85%+ of active managers 
              fail to beat index funds over 15 years.
            </li>
            <li>
              <strong>Trading costs compound</strong> - Frequent trading means more fees, more 
              taxes, and more chances to make emotional mistakes.
            </li>
          </ul>
        </div>

        <h2>Why Trading Is So Hard</h2>

        <h3>1. You're Competing Against Professionals</h3>
        <p>
          Hedge funds have AI, teams of analysts, and millisecond execution. You're competing 
          against them with a mobile app.
        </p>

        <h3>2. Fees Eat Your Gains</h3>
        <p>
          Every trade costs money. Frequent trading means fees compound against you, not for you.
        </p>

        <h3>3. Taxes Are Higher</h3>
        <p>
          Short-term gains are taxed as income. Long-term investments in ISAs pay zero tax.
        </p>

        <h3>4. Psychology Works Against You</h3>
        <p>
          Our brains are wired for loss aversion. We sell winners too early and hold losers 
          too long. We panic at dips and get greedy at peaks.
        </p>

        <h2>The Psychology of Staying the Course</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Brain className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Mental Models for Long-Term Investors</h4>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">1. Market drops are sales</p>
              <p>When stocks fall 20%, you're buying at a 20% discount. Would you panic if your 
              favorite store had a sale?</p>
            </div>
            <div>
              <p className="font-medium text-foreground">2. You're buying time</p>
              <p>You're not buying today's prices—you're buying 20 years of future returns.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">3. Volatility is the fee for returns</p>
              <p>Higher returns require accepting temporary drops. It's the price of admission.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">4. You don't lose until you sell</p>
              <p>Paper losses aren't real losses. They become real only when you panic and sell.</p>
            </div>
          </div>
        </div>

        <h2>How to Stay Invested During Crashes</h2>
        <ol>
          <li><strong>Have a written investment plan</strong> - Remind yourself why you're invested</li>
          <li><strong>Don't check daily</strong> - Checking less reduces emotional reactions</li>
          <li><strong>Automate contributions</strong> - Remove the decision to invest</li>
          <li><strong>Remember history</strong> - Every crash has been followed by recovery</li>
          <li><strong>Have enough cash</strong> - Emergency fund prevents forced selling</li>
          <li><strong>Talk to someone calm</strong> - Not financial news, not panicking friends</li>
        </ol>

        <h2>When Trading Might Make Sense</h2>
        <p>Trading isn't always wrong, but be honest about why:</p>
        <ul>
          <li><strong>Entertainment:</strong> Use a small "play money" account (max 5-10% of portfolio)</li>
          <li><strong>Education:</strong> Learning about markets, not expecting profits</li>
          <li><strong>Professional pursuit:</strong> If you're genuinely building trading skills</li>
        </ul>
        <p>
          Just don't confuse trading for entertainment with a strategy for building wealth.
        </p>

        <h2>The Bottom Line</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">For Most People</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Buy low-cost, diversified index funds</p>
            <p>✓ Invest regularly regardless of market conditions</p>
            <p>✓ Rebalance once a year maximum</p>
            <p>✓ Hold for decades, not days</p>
            <p>✓ Ignore financial news and market predictions</p>
            <p>✓ Focus on things you can control (savings rate, costs)</p>
          </div>
          <p className="text-sm font-medium mt-4">
            This boring approach beats 90% of traders and most professional fund managers.
          </p>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Decide: Are you an investor or do you want to trade?</li>
          <li>If investing: Set up automated monthly contributions</li>
          <li>Write down your investment plan and reasons</li>
          <li>Delete trading apps from your phone (keep investment accounts)</li>
          <li>Set a calendar reminder to check your portfolio quarterly, not daily</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            If you feel the urge to trade, open a practice account with fake money first. Track 
            your results for a year. Most people discover they would have been better off doing 
            nothing.
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
                Use our Compound Interest Calculator to see how consistent, long-term investing 
                beats trying to time the market over 20-30 years.
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