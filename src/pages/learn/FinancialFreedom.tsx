import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Target, Flame, Sparkles } from "lucide-react";

export default function FinancialFreedom() {
  return (
    <>
      <SEO
        title="Financial Freedom: Defining Your End Goal"
        description="Explore different financial freedom models from coast FIRE to fat FIRE. Define your personal freedom number and create a roadmap to financial independence."
        keywords="financial freedom, FIRE movement UK, financial independence, retire early, freedom number, passive income, coast FIRE, barista FIRE"
        canonicalUrl="/learn/financial-freedom"
      />
      
      <ArticleLayout
        title="Financial Freedom: Defining Your End Goal"
        description="Personalised freedom vs FIRE models"
        readTime="30 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
        nextArticle={{
          title: "Protecting Your Wealth (Insurance & Wills)",
          path: "/learn/protect-wealth"
        }}
      >
        <h2>What Is Financial Freedom?</h2>
        <p>
          Financial freedom means your investments and passive income cover your living expenses. 
          You work because you want to, not because you have to. But what that looks like is 
          deeply personal.
        </p>

        <h2>The FIRE Movement</h2>
        
        <div className="not-prose bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Flame className="h-5 w-5 text-orange-600 mt-0.5" />
            <h4 className="font-semibold text-orange-700 dark:text-orange-300">Financial Independence, Retire Early</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            FIRE is a movement focused on aggressive saving and investing to achieve financial 
            independence years or decades before traditional retirement age. The core principle: 
            save 50-70% of income, invest in index funds, reach your "number."
          </p>
        </div>

        <h3>Types of FIRE</h3>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Lean FIRE</p>
              <p className="text-muted-foreground">
                Financial independence on a minimal budget (£15-25k/year). Requires extreme 
                frugality and often geographic arbitrage.
              </p>
            </div>
            <div>
              <p className="font-medium">Regular FIRE</p>
              <p className="text-muted-foreground">
                Traditional financial independence with moderate spending (£25-50k/year). 
                Comfortable but not lavish lifestyle.
              </p>
            </div>
            <div>
              <p className="font-medium">Fat FIRE</p>
              <p className="text-muted-foreground">
                Financial independence with abundant spending (£75k+/year). No lifestyle 
                sacrifices, travel, nice things.
              </p>
            </div>
            <div>
              <p className="font-medium">Coast FIRE</p>
              <p className="text-muted-foreground">
                Invested enough that compound growth will fund retirement. Can stop saving 
                aggressively, work lower-stress jobs.
              </p>
            </div>
            <div>
              <p className="font-medium">Barista FIRE</p>
              <p className="text-muted-foreground">
                Partially funded by investments + part-time work. Often for healthcare benefits 
                (more relevant in US) or social connection.
              </p>
            </div>
          </div>
        </div>

        <h2>Calculating Your Freedom Number</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Target className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The 4% Rule</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            The Trinity Study suggests you can withdraw 4% of your portfolio annually with high 
            confidence it will last 30+ years. This gives us:
          </p>
          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <p className="font-mono text-lg">
              Freedom Number = Annual Expenses × 25
            </p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>• £30,000/year spending = £750,000 needed</p>
            <p>• £40,000/year spending = £1,000,000 needed</p>
            <p>• £50,000/year spending = £1,250,000 needed</p>
          </div>
        </div>

        <h3>Adjusting the 4% Rule</h3>
        <ul>
          <li>
            <strong>Longer retirement (50+ years):</strong> Consider 3.5% or 3% safer
          </li>
          <li>
            <strong>Flexible spending:</strong> 4.5% might work if you can cut back in bad years
          </li>
          <li>
            <strong>Other income sources:</strong> State pension, rental income, part-time work 
            reduce needed portfolio
          </li>
        </ul>

        <h2>Personalized Freedom</h2>
        
        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Beyond the Numbers</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Financial freedom isn't just about a number. Ask yourself:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• What would you do if you didn't need to work?</li>
            <li>• Do you actually want to stop working, or just have options?</li>
            <li>• What does your ideal day look like?</li>
            <li>• What would you regret not doing?</li>
            <li>• How much do you actually need to be happy?</li>
          </ul>
        </div>

        <h3>Different Paths to Freedom</h3>
        <ul>
          <li>
            <strong>The Marathon Saver:</strong> 15% savings rate, normal career, retire at 60-65 
            with comfortable funds
          </li>
          <li>
            <strong>The Sprinter:</strong> 50%+ savings rate, aggressive FIRE pursuit, retire 40-50
          </li>
          <li>
            <strong>The Lifestyle Designer:</strong> Build passive income streams, semi-retire 
            early, work on passion projects
          </li>
          <li>
            <strong>The Career Pivoter:</strong> Coast FIRE, then switch to meaningful but 
            lower-paid work
          </li>
        </ul>

        <h2>UK-Specific Considerations</h2>

        <h3>State Pension</h3>
        <p>
          The full new State Pension is ~£11,500/year (2024). This reduces your needed portfolio 
          significantly. With two people, that's £23,000/year guaranteed income after 67.
        </p>

        <h3>NHS Healthcare</h3>
        <p>
          Unlike the US, healthcare costs aren't a major retirement concern. This makes lean 
          FIRE more viable in the UK.
        </p>

        <h3>Pension Access Rules</h3>
        <p>
          You can't access private pensions until 55 (57 from 2028). Early retirees need ISA 
          and general investment accounts to bridge the gap.
        </p>

        <h2>Building Your Roadmap</h2>
        <ol>
          <li>
            <strong>Define your ideal life:</strong> Not just retirement, but what you want 
            day-to-day
          </li>
          <li>
            <strong>Calculate required annual spending:</strong> Be realistic about lifestyle
          </li>
          <li>
            <strong>Determine your freedom number:</strong> Annual spending × 25
          </li>
          <li>
            <strong>Assess current position:</strong> Net worth, savings rate, investment returns
          </li>
          <li>
            <strong>Project timeline:</strong> When will you hit your number at current pace?
          </li>
          <li>
            <strong>Adjust if needed:</strong> Increase income, reduce expenses, or accept 
            longer timeline
          </li>
        </ol>

        <h2>Action Steps</h2>
        <ol>
          <li>Track your current annual spending accurately</li>
          <li>Calculate your freedom number (expenses × 25)</li>
          <li>Determine your savings rate</li>
          <li>Project when you'll reach your number</li>
          <li>Decide if you're happy with that timeline, or want to adjust</li>
          <li>Write down what you'd do with financial freedom</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Don't sacrifice your whole life for a future freedom number. Balance matters. 
            The best path is one where you enjoy the journey AND the destination. Consider 
            "Coast FIRE"—it lets you ease off the accelerator while still reaching your goal.
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
                Use our Retirement Calculator to model different scenarios and see how changes 
                to savings rate, returns, and timeline affect your freedom date.
              </p>
              <Link to="/finance/retirement">
                <Button>Try Retirement Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}