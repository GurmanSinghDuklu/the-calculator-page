import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import trackingExpenses from "@/assets/blog-tracking-expenses.jpg";
import spendingCategories from "@/assets/blog-spending-categories.jpg";

export default function WhereMoneyGoes() {
  return (
    <>
      <SEO
        title="Where Your Money Really Goes - Track Your Spending"
        description="Learn how to track your spending for 30 days and categorize expenses to understand where your money really goes. Essential first step in financial literacy."
        keywords="track spending, categorize expenses, money tracking, spending awareness, budget tracking, financial habits"
        canonicalUrl="/learn/where-money-goes"
      />
      
      <ArticleLayout
        title="Where Your Money Really Goes"
        description="The foundation of financial control starts with awareness"
        readTime="15–30 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{
          title: "50/30/20 Budget Made Personal",
          path: "/learn/50-30-20-budget"
        }}
      >
        <h2>Why Tracking Matters</h2>
        <p>
          Most people underestimate their spending by 20-40%. The "latte factor" isn't just about coffee—it's about 
          unconscious micro-spending that adds up to major budget leaks. Before you can optimize your finances, you 
          need to see the truth.
        </p>
        
        <img 
          src={trackingExpenses} 
          alt="Person tracking expenses in a budget planner with calculator and receipts" 
          className="w-full rounded-lg shadow-lg my-8"
        />

        <h2>The 30-Day Tracking Challenge</h2>
        <p>
          For the next 30 days, record every single expense. Yes, everything—from rent to that 1.50 coffee. 
          This isn't about judgment; it's about data.
        </p>

        <h3>How to Track</h3>
        <ul>
          <li><strong>Method 1: Bank Statements</strong> - Review and categorize all transactions from your bank app</li>
          <li><strong>Method 2: Receipt Collection</strong> - Keep every receipt and tally weekly</li>
          <li><strong>Method 3: Spending Apps</strong> - Use apps like Emma, Moneybox, or even a simple spreadsheet</li>
          <li><strong>Method 4: Cash Envelope</strong> - Old-school but effective for visual learners</li>
        </ul>

        <h2>Core Spending Categories</h2>
        <p>Organize your spending into these buckets:</p>
        
        <img 
          src={spendingCategories} 
          alt="Smartphone showing financial tracking app with spending categories" 
          className="w-full rounded-lg shadow-lg my-8"
        />
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-3">Essential Categories:</h4>
          <ul className="space-y-2 text-sm">
            <li>🏠 <strong>Housing</strong> - Rent/mortgage, council tax, insurance</li>
            <li>🍽️ <strong>Food & Groceries</strong> - Supermarket shops, household items</li>
            <li>🚗 <strong>Transport</strong> - Car payments, fuel, insurance, public transport</li>
            <li>💡 <strong>Utilities</strong> - Gas, electric, water, internet, phone</li>
            <li>👕 <strong>Personal</strong> - Clothing, toiletries, haircuts</li>
            <li>🎉 <strong>Entertainment</strong> - Dining out, subscriptions, hobbies</li>
            <li>🏥 <strong>Health</strong> - Gym, prescriptions, healthcare</li>
            <li>💳 <strong>Debt Payments</strong> - Credit cards, loans, overdrafts</li>
            <li>💰 <strong>Savings</strong> - Emergency fund, goals, investments</li>
          </ul>
        </div>

        <h2>Common Tracking Pitfalls</h2>
        <ul>
          <li><strong>Forgetting cash transactions</strong> - Cash disappears fastest</li>
          <li><strong>Ignoring annual expenses</strong> - Insurance, MOT, gifts—divide by 12</li>
          <li><strong>Shared expenses</strong> - Track what YOU pay, not what others contribute</li>
          <li><strong>Giving up after week 1</strong> - Consistency beats perfection</li>
        </ul>

        <h2>What You'll Discover</h2>
        <p>After 30 days, you'll likely find:</p>
        <ul>
          <li>1-3 categories consuming more than you thought</li>
          <li>Subscriptions you forgot you had</li>
          <li>Patterns tied to emotions (stress spending, boredom eating)</li>
          <li>Opportunities to reallocate hundreds per month</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Choose your tracking method today</li>
          <li>Set a daily reminder to log expenses</li>
          <li>Review weekly—don't wait until the end</li>
          <li>After 30 days, calculate your average monthly spending per category</li>
          <li>Identify your top 3 "budget leak" areas</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Don't try to change your spending during the tracking phase. Just observe. Behavior change comes 
            after awareness, not during. Let the data speak first.
          </p>
        </div>

        <h2>What's Next?</h2>
        <p>
          Once you have 30 days of real data, you're ready to build a budget that actually fits your life—not 
          some generic 50/30/20 split. That's what we'll cover in the next article.
        </p>

        <Card className="not-prose bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Put It Into Practice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Now that you understand where your money goes, use our Budget Calculator to organize your spending 
                into categories and create a personalized budget plan.
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
