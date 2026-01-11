import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import budgetSplit from "@/assets/blog-budget-split.jpg";

export default function FiftyThirtyTwentyBudget() {
  return (
    <>
      <SEO
        title="50/30/20 Budget Rule Made Personal - Flexible Budgeting Guide"
        description="Learn how to adapt the popular 50/30/20 budget rule to your real income and lifestyle. Practical budgeting framework for UK residents."
        keywords="50/30/20 budget, budget rule, personal budgeting, flexible budget, needs wants savings, budgeting framework UK"
        canonicalUrl="/learn/50-30-20-budget"
      />
      
      <ArticleLayout
        title="The 50/30/20 Budget Made Personal"
        description="Adapt the classic rule to your real life and income"
        readTime="20 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{
          title: "Automate Your Finances Like a Pro",
          path: "/learn/automate-finances"
        }}
      >
        <h2>What Is the 50/30/20 Rule?</h2>
        <p>
          The 50/30/20 budget rule, popularized by Senator Elizabeth Warren, suggests splitting your after-tax 
          income into three categories:
        </p>
        
        <img 
          src={budgetSplit} 
          alt="Colorful pie chart showing 50/30/20 budget split with calculator and coins" 
          className="w-full rounded-lg shadow-lg my-8"
        />
        
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-2">50%</div>
            <div className="font-semibold mb-1">Needs</div>
            <p className="text-sm text-muted-foreground">Essential expenses you can't avoid</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">30%</div>
            <div className="font-semibold mb-1">Wants</div>
            <p className="text-sm text-muted-foreground">Lifestyle and discretionary spending</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">20%</div>
            <div className="font-semibold mb-1">Savings</div>
            <p className="text-sm text-muted-foreground">Future you, debt payoff, investments</p>
          </div>
        </div>

        <h2>Why It Works (In Theory)</h2>
        <p>
          The rule provides structure without micromanagement. It acknowledges that life should be enjoyed (30% wants) 
          while ensuring financial security (20% savings) without overspending on essentials (50% needs).
        </p>

        <h2>Why It Doesn't Always Work (In Reality)</h2>
        <p>
          If you live in London, earn below median income, or have dependents, 50% for needs might be laughable. 
          Housing alone could consume 40-50% of your income. Here's how to adapt:
        </p>

        <h3>High-Cost-of-Living Adjustment: 60/20/20</h3>
        <ul>
          <li>60% Needs (rent + bills eat more)</li>
          <li>20% Wants (tighten lifestyle temporarily)</li>
          <li>20% Savings (prioritize future you)</li>
        </ul>

        <h3>Debt Payoff Mode: 50/20/30</h3>
        <ul>
          <li>50% Needs</li>
          <li>20% Wants (maintain sanity)</li>
          <li>30% Savings + Aggressive Debt Payoff</li>
        </ul>

        <h3>Low-Income Survival: 70/20/10</h3>
        <ul>
          <li>70% Needs (essentials dominate)</li>
          <li>20% Wants (don't eliminate joy completely)</li>
          <li>10% Savings (something is better than nothing)</li>
        </ul>

        <h2>Needs vs Wants: The Grey Zone</h2>
        <p>
          The hardest part? Deciding what's actually a "need." Here's a reality-check framework:
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-3">Clear Needs:</h4>
          <ul className="space-y-1 text-sm mb-4">
            <li>✓ Rent/mortgage (can't negotiate short-term)</li>
            <li>✓ Utilities (heat, water, basic electric)</li>
            <li>✓ Groceries (not takeaways)</li>
            <li>✓ Transport to work</li>
            <li>✓ Minimum debt payments</li>
            <li>✓ Essential insurance (health, car if required)</li>
          </ul>

          <h4 className="font-semibold mb-3">Sneaky Wants Disguised as Needs:</h4>
          <ul className="space-y-1 text-sm">
            <li>✗ £150/month phone contract (need a phone, not the latest iPhone)</li>
            <li>✗ Premium gym membership (need exercise, not a spa)</li>
            <li>✗ Dining out "for convenience" (it's a want)</li>
            <li>✗ New clothes because "I need something to wear" (most of us have enough)</li>
            <li>✗ Subscription boxes (definitely wants)</li>
          </ul>
        </div>

        <h2>Building Your Personal Budget Formula</h2>
        <ol>
          <li><strong>Calculate after-tax income</strong> - Use your actual take-home pay</li>
          <li><strong>List true needs from your 30-day tracking</strong> - Be honest</li>
          <li><strong>Calculate needs percentage</strong> - Total needs ÷ income</li>
          <li><strong>Adjust the rule</strong> - If needs are 65%, your formula is 65/20/15</li>
          <li><strong>Set category limits</strong> - This becomes your spending ceiling</li>
        </ol>

        <h2>Example: Real UK Budget</h2>
        <div className="not-prose bg-card border border-border rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-4">Sarah, 28, Manchester, £2,200/month take-home</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-medium">Needs (58%):</span>
              <span>£1,280</span>
            </div>
            <div className="pl-4 space-y-1 text-muted-foreground">
              <div className="flex justify-between"><span>Rent + bills</span><span>£850</span></div>
              <div className="flex justify-between"><span>Groceries</span><span>£200</span></div>
              <div className="flex justify-between"><span>Transport</span><span>£120</span></div>
              <div className="flex justify-between"><span>Phone</span><span>£25</span></div>
              <div className="flex justify-between"><span>Debt minimums</span><span>£85</span></div>
            </div>

            <div className="flex justify-between border-b border-border pb-2 pt-2">
              <span className="font-medium">Wants (22%):</span>
              <span>£480</span>
            </div>
            <div className="pl-4 space-y-1 text-muted-foreground">
              <div className="flex justify-between"><span>Eating out</span><span>£150</span></div>
              <div className="flex justify-between"><span>Subscriptions</span><span>£45</span></div>
              <div className="flex justify-between"><span>Hobbies</span><span>£100</span></div>
              <div className="flex justify-between"><span>Clothes/personal</span><span>£85</span></div>
              <div className="flex justify-between"><span>Fun fund</span><span>£100</span></div>
            </div>

            <div className="flex justify-between border-b border-border pb-2 pt-2">
              <span className="font-medium">Savings (20%):</span>
              <span>£440</span>
            </div>
            <div className="pl-4 space-y-1 text-muted-foreground">
              <div className="flex justify-between"><span>Emergency fund</span><span>£250</span></div>
              <div className="flex justify-between"><span>Extra debt payoff</span><span>£190</span></div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Sarah's formula: <strong>58/22/20</strong> — not the textbook version, but it works for her life.
        </p>

        <h2>Making It Stick</h2>
        <ul>
          <li><strong>Review monthly</strong> - Adjust as income or needs change</li>
          <li><strong>Use sub-categories</strong> - Break "wants" into smaller buckets</li>
          <li><strong>Build in flexibility</strong> - One bad month doesn't break the system</li>
          <li><strong>Celebrate wins</strong> - Hit your savings target? Acknowledge it</li>
        </ul>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Remember</p>
          <p className="text-sm text-muted-foreground">
            The "right" budget is the one you'll actually follow. If 50/30/20 doesn't fit your life, adapt it. 
            The goal is sustainable money management, not perfection.
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
                Ready to create your personalized budget formula? Use our Budget Calculator to input your income 
                and expenses, and see how your numbers compare to the 50/30/20 rule.
              </p>
              <Link to="/finance/budget">
                <Button>Try Budget Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}
