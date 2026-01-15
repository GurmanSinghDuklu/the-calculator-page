import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, AlertTriangle, Calendar, PiggyBank } from "lucide-react";

export default function BudgetIrregularCosts() {
  return (
    <>
      <SEO
        title="Budgeting for Unexpected Costs - Plan for Irregular Expenses"
        description="Learn how to plan for irregular and unexpected expenses. Build a buffer for annual costs, emergencies, and surprise bills with practical budgeting strategies."
        keywords="irregular expenses, unexpected costs, budget planning, annual expenses, sinking funds, emergency budget, financial planning UK"
        canonicalUrl="/learn/budget-irregular-costs"
      />
      
      <ArticleLayout
        title="Budgeting for Unexpected Costs"
        description="Plan for irregular and unexpected expenses"
        readTime="15 min"
        category="Budget"
        categoryColor="bg-rose-500/10 text-rose-700 dark:text-rose-300"
        nextArticle={{
          title: "Your Monthly Financial Dashboard",
          path: "/learn/monthly-dashboard"
        }}
      >
        <h2>Why Irregular Costs Derail Budgets</h2>
        <p>
          Most budget failures aren't caused by daily overspending—they're caused by annual insurance 
          bills, car repairs, or a broken boiler. These "surprise" expenses are actually predictable 
          if you plan for them.
        </p>

        <div className="not-prose bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-destructive mb-2">The Budget Buster Effect</p>
              <p className="text-sm text-muted-foreground">
                A £600 car insurance bill paid annually = £50/month. If you don't account for it monthly, 
                that single bill can wipe out your savings and derail your budget for months.
              </p>
            </div>
          </div>
        </div>

        <h2>Types of Irregular Expenses</h2>

        <h3>1. Predictable Annual Costs</h3>
        <ul>
          <li><strong>Insurance</strong> - Car, home, life, travel</li>
          <li><strong>Subscriptions</strong> - Annual memberships, software licenses</li>
          <li><strong>Vehicle</strong> - MOT, road tax, servicing</li>
          <li><strong>Home</strong> - Boiler service, chimney sweep, gutter cleaning</li>
          <li><strong>Personal</strong> - Birthdays, Christmas, anniversaries</li>
        </ul>

        <h3>2. Semi-Predictable Costs</h3>
        <ul>
          <li><strong>Medical</strong> - Dental checkups, optician, prescriptions</li>
          <li><strong>Home repairs</strong> - Appliance replacement, decorating</li>
          <li><strong>Vehicle repairs</strong> - Tyres, brakes, unexpected fixes</li>
          <li><strong>Clothing</strong> - Seasonal wardrobe updates, school uniforms</li>
        </ul>

        <h3>3. True Emergencies</h3>
        <ul>
          <li>Job loss or reduced income</li>
          <li>Medical emergencies</li>
          <li>Major home repairs (roof, boiler failure)</li>
          <li>Family emergencies requiring travel</li>
        </ul>

        <h2>The Sinking Fund Strategy</h2>
        <p>
          A sinking fund is money you set aside each month for a known future expense. Instead of being 
          surprised by a £1,200 car insurance bill, you save £100/month and it's ready when needed.
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Sample Sinking Funds</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">Annual Costs</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Car insurance: £600 ÷ 12 = £50/month</li>
                <li>• Home insurance: £300 ÷ 12 = £25/month</li>
                <li>• Christmas gifts: £600 ÷ 12 = £50/month</li>
                <li>• MOT + service: £400 ÷ 12 = £33/month</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Maintenance Funds</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Car repairs: £600/year = £50/month</li>
                <li>• Home maintenance: £1,200/year = £100/month</li>
                <li>• Medical/dental: £300/year = £25/month</li>
                <li>• Clothing: £600/year = £50/month</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>How to Set Up Your System</h2>
        <ol>
          <li>
            <strong>Audit last year</strong> - Review bank statements for all irregular expenses from the 
            past 12 months
          </li>
          <li>
            <strong>Categorize and total</strong> - Group similar expenses and calculate annual totals
          </li>
          <li>
            <strong>Divide by 12</strong> - Convert each category to a monthly savings amount
          </li>
          <li>
            <strong>Create dedicated savings</strong> - Use separate savings accounts or pots for each fund
          </li>
          <li>
            <strong>Automate transfers</strong> - Set up standing orders on payday
          </li>
        </ol>

        <h2>Organizing Your Funds</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <PiggyBank className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Account Structure Options</h4>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Option 1: Separate Accounts</p>
              <p className="text-muted-foreground">
                Create individual savings accounts for each category. Most online banks offer free 
                savings pots. Best for visual people who like seeing progress.
              </p>
            </div>
            <div>
              <p className="font-medium">Option 2: Single Account + Spreadsheet</p>
              <p className="text-muted-foreground">
                Keep all sinking funds in one account but track allocations in a spreadsheet. 
                Simpler to manage, but requires discipline.
              </p>
            </div>
            <div>
              <p className="font-medium">Option 3: Combined Annual Buffer</p>
              <p className="text-muted-foreground">
                Calculate your total irregular expenses and save 1/12th monthly. Less precise 
                but still effective.
              </p>
            </div>
          </div>
        </div>

        <h2>The 1% Home Maintenance Rule</h2>
        <p>
          Budget 1% of your home's value annually for maintenance. For a £250,000 home, that's 
          £2,500/year or roughly £210/month. This covers everything from boiler repairs to 
          appliance replacements.
        </p>

        <h2>Car Expense Planning</h2>
        <p>Beyond insurance and road tax, budget for:</p>
        <ul>
          <li><strong>Depreciation fund</strong> - Save for your next car while driving your current one</li>
          <li><strong>MOT failures</strong> - Allow £200-500 for unexpected repairs</li>
          <li><strong>Tyres</strong> - Expect to replace tyres every 2-3 years</li>
          <li><strong>Major servicing</strong> - Timing belt, brakes, etc.</li>
        </ul>

        <h2>Action Steps</h2>
        <ol>
          <li>Pull up your bank statements from the last 12 months</li>
          <li>List every irregular expense (anything not monthly)</li>
          <li>Calculate the total and divide by 12</li>
          <li>Add 10-20% buffer for expenses you missed</li>
          <li>Set up automatic transfers to a dedicated savings account</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            When an irregular expense comes in, pay it from your sinking fund and feel the satisfaction 
            of being prepared. This transforms stressful surprise bills into expected, budgeted expenses.
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
                Use our Budget Calculator to allocate your sinking fund contributions alongside your 
                regular monthly expenses.
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