import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, BarChart3, TrendingUp, CheckCircle } from "lucide-react";

export default function MonthlyDashboard() {
  return (
    <>
      <SEO
        title="Your Monthly Financial Dashboard - Review and Adjust Your Finances"
        description="Learn how to conduct monthly financial reviews with key KPIs and adjustments. Track your progress and stay on top of your money with a personal finance dashboard."
        keywords="monthly financial review, money dashboard, financial KPIs, budget review, money tracking, personal finance metrics UK"
        canonicalUrl="/learn/monthly-dashboard"
      />
      
      <ArticleLayout
        title="Your Monthly Financial Dashboard"
        description="Monthly KPI review and adjustments"
        readTime="20 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{
          title: "Building an Emergency Fund That Works",
          path: "/learn/emergency-fund"
        }}
      >
        <h2>Why Monthly Reviews Matter</h2>
        <p>
          A budget without regular reviews is like a car without a steering wheel. Monthly check-ins 
          help you catch problems early, celebrate wins, and make adjustments before small issues 
          become major financial problems.
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The Monthly Money Date</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Block 30-45 minutes at the start of each month (or end of month) for your "Money Date." 
            Make it pleasant—grab a coffee, put on music, and treat it as self-care, not a chore.
          </p>
        </div>

        <h2>Your Key Financial Metrics</h2>
        <p>Track these KPIs monthly to understand your financial health:</p>

        <h3>1. Net Worth</h3>
        <p>
          Assets (savings, investments, property value) minus liabilities (debts, loans, mortgage). 
          This single number tells you if you're moving forward or backward.
        </p>
        <ul>
          <li>Calculate on the same day each month</li>
          <li>Track the trend, not the number itself</li>
          <li>Don't panic about short-term fluctuations</li>
        </ul>

        <h3>2. Savings Rate</h3>
        <p>
          What percentage of your income went to savings and investments this month?
        </p>
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
          <p className="text-sm font-mono">
            Savings Rate = (Amount Saved ÷ Net Income) × 100
          </p>
        </div>
        <ul>
          <li><strong>10%</strong> = Good starting point</li>
          <li><strong>20%</strong> = Solid financial progress</li>
          <li><strong>50%+</strong> = FIRE territory</li>
        </ul>

        <h3>3. Spending by Category</h3>
        <p>
          Compare actual spending to your budget in each category. Highlight variances over 10%.
        </p>

        <h3>4. Debt Paydown Progress</h3>
        <p>
          Track total debt balance and monthly reduction. Watching debt shrink is incredibly motivating.
        </p>

        <h3>5. Emergency Fund Coverage</h3>
        <p>
          How many months of expenses does your emergency fund cover? Target: 3-6 months.
        </p>

        <h2>The Monthly Review Checklist</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
            <h4 className="font-semibold">Your 30-Minute Review Routine</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Update net worth tracker (all account balances)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Review bank statements and categorize spending</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Compare actual vs. budgeted spending per category</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Calculate this month's savings rate</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Check debt balances and payoff progress</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Review upcoming irregular expenses for next month</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Adjust budget categories if needed</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground">□</span>
              <span>Set one financial goal for next month</span>
            </div>
          </div>
        </div>

        <h2>Analyzing Your Spending</h2>
        <p>Look for these patterns:</p>
        <ul>
          <li><strong>Lifestyle creep</strong> - Are "wants" growing faster than income?</li>
          <li><strong>Subscription bloat</strong> - Any unused subscriptions to cancel?</li>
          <li><strong>Emotional spending</strong> - Spikes after stressful periods?</li>
          <li><strong>Category drift</strong> - Consistently overspending in certain areas?</li>
        </ul>

        <h2>Making Adjustments</h2>
        <p>
          Budgets aren't set in stone. Use your monthly review to make smart adjustments:
        </p>

        <h3>When to Adjust Up</h3>
        <ul>
          <li>Consistently overspending in a category despite genuine effort</li>
          <li>Life changes (new baby, longer commute)</li>
          <li>Inflation increases on essentials</li>
        </ul>

        <h3>When to Adjust Down</h3>
        <ul>
          <li>Consistently underspending in a category</li>
          <li>Lifestyle changes (working from home, cutting subscriptions)</li>
          <li>Found cheaper alternatives</li>
        </ul>

        <h3>Where to Reallocate</h3>
        <ul>
          <li>Savings and investments</li>
          <li>Debt acceleration</li>
          <li>Sinking funds for future goals</li>
        </ul>

        <h2>Tracking Your Progress</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Visual Progress Tracking</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Create simple charts or graphs to visualize your progress over time:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Net worth line chart (monthly)</li>
            <li>• Savings rate bar chart</li>
            <li>• Debt payoff countdown</li>
            <li>• Emergency fund progress bar</li>
          </ul>
        </div>

        <h2>Celebrating Wins</h2>
        <p>
          Don't just focus on problems. Celebrate when you:
        </p>
        <ul>
          <li>Hit a savings milestone</li>
          <li>Stay under budget in a challenging category</li>
          <li>Pay off a debt</li>
          <li>Increase your net worth month-over-month</li>
          <li>Reach a new savings rate personal best</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Schedule your first "Money Date" in your calendar (recurring monthly)</li>
          <li>Create a simple spreadsheet or use an app to track your KPIs</li>
          <li>Gather all account login details so reviews are quick</li>
          <li>Set up automatic exports from your bank if available</li>
          <li>Complete your first review and establish baseline numbers</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Keep your review simple. It's better to do a basic 15-minute review consistently than 
            to plan an elaborate 2-hour session you'll avoid. Start small and add complexity later.
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
                Use our Savings Calculator to project your progress based on your current savings rate 
                and see how small changes compound over time.
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