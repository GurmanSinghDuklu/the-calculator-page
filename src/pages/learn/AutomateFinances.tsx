import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import automateBanking from "@/assets/blog-automate-banking.jpg";

export default function AutomateFinances() {
  return (
    <>
      <SEO
        title="Automate Your Finances Like a Pro - Set and Forget Money Management"
        description="Learn how to automate savings, bills, and investments with UK-specific tools and strategies. Financial automation for beginners."
        keywords="automate finances UK, standing orders, direct debits, automatic savings, financial automation, set and forget banking"
        canonicalUrl="/learn/automate-finances"
      />
      
      <ArticleLayout
        title="Automate Your Finances Like a Pro"
        description="Build a money system that works while you sleep"
        readTime="20 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{
          title: "Budgeting for Unexpected Costs",
          path: "/learn/budget-irregular-costs"
        }}
      >
        <h2>Why Automation Beats Willpower</h2>
        <p>
          Financial discipline is exhausting. Every manual payment is a decision point—and humans are terrible 
          at making consistent decisions under pressure. Automation removes friction, eliminates procrastination, 
          and makes saving effortless.
        </p>

        <div className="not-prose bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6 my-6">
          <h4 className="font-semibold mb-2">The Automation Advantage</h4>
          <p className="text-sm">
            Research shows automated savers accumulate 2-3x more wealth than manual savers earning the same income. 
            Why? Because automation happens before you see the money. Out of sight, into savings.
          </p>
        </div>

        <h2>The Core Systems to Automate</h2>
        
        <img 
          src={automateBanking} 
          alt="Person setting up online banking automation on laptop in modern home office" 
          className="w-full rounded-lg shadow-lg my-8"
        />
        
        <h3>1. The Payday Protocol</h3>
        <p>
          The moment your salary hits your account, money should flow automatically to designated buckets:
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Payday Sequence (Set for the day after payday):</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <div className="font-medium">Savings Transfer</div>
                <div className="text-muted-foreground">Standing order to separate savings account (20% of income or your target %)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <div className="font-medium">Investment Contribution</div>
                <div className="text-muted-foreground">Auto-deposit to ISA or pension (if applicable)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <div>
                <div className="font-medium">Bill Payment Account Top-Up</div>
                <div className="text-muted-foreground">Transfer to separate account that handles all direct debits</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
              <div>
                <div className="font-medium">Whatever Remains</div>
                <div className="text-muted-foreground">Guilt-free spending account—you can&apos;t overspend because everything else is sorted</div>
              </div>
            </div>
          </div>
        </div>

        <h3>2. Bill Segregation Strategy</h3>
        <p>
          Open a separate &quot;Bills Only&quot; account. All direct debits come from this account. On payday, 
          auto-transfer the total needed for bills. Benefits:
        </p>
        <ul>
          <li>Never accidentally spend rent money</li>
          <li>Clear visibility of discretionary funds</li>
          <li>Easy monthly review (one account statement = all fixed costs)</li>
        </ul>

        <h3>3. Savings Buckets</h3>
        <p>UK banks like Monzo, Starling, and Chase offer built-in &quot;pots&quot; or &quot;spaces&quot; for goals:</p>
        <ul>
          <li><strong>Emergency Fund</strong> - Auto-save until 3-6 months expenses</li>
          <li><strong>Annual Expenses</strong> - MOT, insurance renewals, Christmas—divide by 12 and auto-save monthly</li>
          <li><strong>Short-Term Goals</strong> - Holiday, new phone, house deposit</li>
        </ul>

        <h2>UK-Specific Automation Tools</h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Standing Orders</h4>
            <p className="text-sm text-muted-foreground mb-2">Best for: Savings, rent, regular transfers</p>
            <ul className="text-sm space-y-1">
              <li>✓ You control start/stop</li>
              <li>✓ Fixed amounts</li>
              <li>✓ Won&apos;t take money if insufficient funds</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Direct Debits</h4>
            <p className="text-sm text-muted-foreground mb-2">Best for: Bills, subscriptions, loans</p>
            <ul className="text-sm space-y-1">
              <li>✓ Company controls amount</li>
              <li>✓ Protected by Direct Debit Guarantee</li>
              <li>✓ Can vary (e.g., energy bills)</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Round-Up Apps</h4>
            <p className="text-sm text-muted-foreground mb-2">Moneybox, Plum, Chip</p>
            <ul className="text-sm space-y-1">
              <li>✓ Rounds purchases to nearest £1</li>
              <li>✓ Saves the difference automatically</li>
              <li>✓ Painless micro-savings</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Employer Pension Auto-Enrolment</h4>
            <p className="text-sm text-muted-foreground mb-2">Workplace pensions</p>
            <ul className="text-sm space-y-1">
              <li>✓ Deducted pre-tax</li>
              <li>✓ Employer match = free money</li>
              <li>✓ Increase contribution % annually</li>
            </ul>
          </div>
        </div>

        <h2>Setting Up Your Automation System</h2>

        <h3>Step 1: Map Your Cash Flow</h3>
        <p>Before automating, know these numbers:</p>
        <ul>
          <li>Monthly take-home pay</li>
          <li>Total essential expenses (from your tracking)</li>
          <li>Savings target (% or fixed amount)</li>
          <li>Bill payment dates</li>
        </ul>

        <h3>Step 2: Choose Your Account Structure</h3>
        <p>Minimum viable setup:</p>
        <ol>
          <li><strong>Main Current Account</strong> - Salary lands here</li>
          <li><strong>Bills Account</strong> - All direct debits</li>
          <li><strong>Savings Account</strong> - Emergency fund + goals</li>
        </ol>

        <h3>Step 3: Schedule Standing Orders</h3>
        <p>Set these up in your banking app (day after payday is optimal):</p>
        <div className="not-prose bg-muted/50 p-4 rounded-lg my-4">
          <div className="space-y-2 text-sm font-mono">
            <div>Payday + 1 day → Emergency Fund (£250)</div>
            <div>Payday + 1 day → Bills Account (£1,200)</div>
            <div>Payday + 1 day → Holiday Pot (£100)</div>
          </div>
        </div>

        <h3>Step 4: Redirect Direct Debits</h3>
        <p>Contact each utility/subscription provider and update payment account to your Bills Account.</p>

        <h3>Step 5: Test and Adjust</h3>
        <p>Run the system for 2 months. Track:</p>
        <ul>
          <li>Do standing orders execute successfully?</li>
          <li>Is bills account balance sufficient?</li>
          <li>Are you comfortable with leftover spending money?</li>
        </ul>

        <h2>Advanced Automation Hacks</h2>

        <h3>The 1% Annual Increase</h3>
        <p>
          Set a calendar reminder to increase your savings standing order by 1% each year. Barely noticeable, 
          massively compounding.
        </p>

        <h3>The Bonus Redirect</h3>
        <p>
          When you get a raise or bonus, immediately increase your automated savings by 50% of the increase. 
          Lifestyle creep prevention built-in.
        </p>

        <h3>The Bill Consolidation Day</h3>
        <p>
          Where possible, move all bills to the same payment date (a few days after payday). Easier tracking, 
          one monthly review.
        </p>

        <h2>What Not to Automate</h2>
        <p>Some things benefit from manual control:</p>
        <ul>
          <li><strong>Debt overpayments</strong> - Automate minimums, but manually attack high-interest debt when you have extra</li>
          <li><strong>Groceries</strong> - Weekly spending varies; stay conscious</li>
          <li><strong>Discretionary fun</strong> - Keep this visible to maintain awareness</li>
        </ul>

        <h2>Common Automation Mistakes</h2>
        <ul>
          <li><strong>Automating before tracking</strong> - Know your numbers first</li>
          <li><strong>Setting amounts too aggressively</strong> - Start conservative, increase gradually</li>
          <li><strong>Forgetting to review quarterly</strong> - Life changes, automation should too</li>
          <li><strong>Ignoring failed payments</strong> - Set alerts for declined direct debits</li>
        </ul>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 The Ultimate Automation Test</p>
          <p className="text-sm text-muted-foreground">
            If you went on holiday for a month without checking your bank account, would your bills get paid 
            and your savings grow? If yes, you&apos;ve built a system that works without you. That&apos;s the goal.
          </p>
        </div>

        <h2>Your 30-Day Automation Challenge</h2>
        <ol>
          <li><strong>Week 1:</strong> Open a bills account and savings account</li>
          <li><strong>Week 2:</strong> Set up standing orders for savings and bills funding</li>
          <li><strong>Week 3:</strong> Redirect all direct debits to bills account</li>
          <li><strong>Week 4:</strong> Monitor the first full cycle and adjust</li>
        </ol>

        <p>
          By the end of next month, you&apos;ll have a financial system that runs itself. Willpower not required.
        </p>

        <Card className="not-prose bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Put It Into Practice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Calculate exactly how much you should automate for savings each month. Our Savings Calculator 
                helps you plan your standing orders and reach your goals faster.
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
