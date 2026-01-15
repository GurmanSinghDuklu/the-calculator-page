import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, ClipboardList, AlertTriangle, TrendingDown } from "lucide-react";

export default function DebtLandscape() {
  return (
    <>
      <SEO
        title="Understanding Your Debt Landscape - List, Categorize and Prioritize"
        description="Take control of your debt by creating a complete inventory. Learn how to categorize good vs bad debt, prioritize repayment, and create your debt freedom roadmap."
        keywords="debt inventory, debt prioritization, good debt vs bad debt, debt management UK, debt freedom, debt list, paying off debt"
        canonicalUrl="/learn/debt-landscape"
      />
      
      <ArticleLayout
        title="Understanding Your Debt Landscape"
        description="List, categorise and prioritise debts"
        readTime="30 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{
          title: "Snowball vs Avalanche",
          path: "/learn/snowball-avalanche"
        }}
      >
        <h2>Why You Need a Complete Picture</h2>
        <p>
          You can't navigate out of debt without a map. Most people have a vague sense of what 
          they owe, but rarely know the exact totals, interest rates, and minimum payments. This 
          knowledge gap keeps them stuck.
        </p>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <ClipboardList className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The Debt Inventory</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Today, you'll create a complete inventory of every debt you have. This might feel 
            uncomfortable, but knowledge is power. You can't solve a problem you haven't fully 
            acknowledged.
          </p>
        </div>

        <h2>Gathering Your Information</h2>
        <p>For each debt, you need to know:</p>
        <ul>
          <li><strong>Creditor name</strong> - Who do you owe?</li>
          <li><strong>Current balance</strong> - How much do you owe?</li>
          <li><strong>Interest rate (APR)</strong> - What does it cost you?</li>
          <li><strong>Minimum payment</strong> - What must you pay monthly?</li>
          <li><strong>Payment due date</strong> - When is it due?</li>
          <li><strong>Type of debt</strong> - Credit card, loan, overdraft, etc.</li>
        </ul>

        <h2>Common Debt Types</h2>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Debt Inventory Template</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Creditor</th>
                  <th className="text-right py-2 px-4">Balance</th>
                  <th className="text-right py-2 px-4">APR</th>
                  <th className="text-right py-2 px-4">Min Payment</th>
                  <th className="text-right py-2 pl-4">Due Date</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Credit Card A</td>
                  <td className="text-right py-2 px-4">£3,500</td>
                  <td className="text-right py-2 px-4">22.9%</td>
                  <td className="text-right py-2 px-4">£85</td>
                  <td className="text-right py-2 pl-4">15th</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Overdraft</td>
                  <td className="text-right py-2 px-4">£1,200</td>
                  <td className="text-right py-2 px-4">39.9%</td>
                  <td className="text-right py-2 px-4">Interest only</td>
                  <td className="text-right py-2 pl-4">Ongoing</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Car Loan</td>
                  <td className="text-right py-2 px-4">£8,000</td>
                  <td className="text-right py-2 px-4">7.9%</td>
                  <td className="text-right py-2 px-4">£220</td>
                  <td className="text-right py-2 pl-4">1st</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">TOTAL</td>
                  <td className="text-right py-2 px-4 font-medium">£12,700</td>
                  <td className="text-right py-2 px-4">—</td>
                  <td className="text-right py-2 px-4 font-medium">£305+</td>
                  <td className="text-right py-2 pl-4">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2>Good Debt vs Toxic Debt</h2>
        <p>Not all debt is created equal:</p>

        <h3>"Good" Debt (Strategic)</h3>
        <ul>
          <li><strong>Mortgage:</strong> Builds equity, typically low rates, asset appreciation</li>
          <li><strong>Student loans:</strong> Investment in earning potential (Plan 1/2 terms matter)</li>
          <li><strong>Business loans:</strong> When used for income-generating purposes</li>
        </ul>

        <h3>"Neutral" Debt (Situational)</h3>
        <ul>
          <li><strong>0% credit cards:</strong> Only if paid before promo ends</li>
          <li><strong>Car finance:</strong> Depends on rate and necessity</li>
          <li><strong>0% Buy Now Pay Later:</strong> Only if planned and tracked</li>
        </ul>

        <h3>"Toxic" Debt (Prioritize Elimination)</h3>
        <div className="not-prose bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-destructive mb-2">High-Priority Debt</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Overdrafts:</strong> Often 35-40% APR, disguised as convenience</li>
                <li>• <strong>Store cards:</strong> Typically 25-30% APR</li>
                <li>• <strong>Payday loans:</strong> Can exceed 1,000% APR</li>
                <li>• <strong>Catalogue credit:</strong> High rates, minimum payments trap</li>
                <li>• <strong>Credit cards (carrying balance):</strong> 18-30% typical</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>The True Cost of Minimum Payments</h2>
        <p>
          Minimum payments are designed to keep you in debt. Credit card companies love them.
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <TrendingDown className="h-5 w-5 text-destructive mt-0.5" />
            <h4 className="font-semibold">Example: £3,000 Credit Card at 22% APR</h4>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Minimum payments only (2% or £5):</strong></p>
            <ul className="space-y-1">
              <li>• Time to pay off: 27 years</li>
              <li>• Total interest paid: £4,400</li>
              <li>• Total repaid: £7,400</li>
            </ul>
            <p className="mt-4"><strong>Fixed £100/month payments:</strong></p>
            <ul className="space-y-1">
              <li>• Time to pay off: 3 years</li>
              <li>• Total interest paid: £600</li>
              <li>• Total repaid: £3,600</li>
            </ul>
            <p className="mt-4 font-medium text-foreground">
              Difference: £3,800 saved, 24 years faster
            </p>
          </div>
        </div>

        <h2>Prioritization Frameworks</h2>
        <p>Once you have your inventory, decide how to attack:</p>

        <h3>By Interest Rate (Avalanche)</h3>
        <p>Pay off highest APR first. Mathematically optimal, saves most money.</p>

        <h3>By Balance (Snowball)</h3>
        <p>Pay off smallest balance first. Psychologically powerful, builds momentum.</p>

        <h3>By Emotional Weight</h3>
        <p>
          Some debts feel worse than others (money owed to family, payday loans with shame 
          attached). Consider tackling these for mental freedom.
        </p>

        <h2>Quick Wins Before Deep Strategy</h2>
        <ol>
          <li><strong>Balance transfer:</strong> Move high-rate credit cards to 0% offers</li>
          <li><strong>Consolidation:</strong> Combine multiple debts into one lower-rate loan</li>
          <li><strong>Overdraft switch:</strong> Move to a bank offering arranged overdraft at lower rates</li>
          <li><strong>Negotiate:</strong> Call creditors—they sometimes reduce rates or offer hardship plans</li>
        </ol>

        <h2>Action Steps</h2>
        <ol>
          <li>Create a spreadsheet or use paper with all your debts</li>
          <li>Log into every account and get exact balances and APRs</li>
          <li>Calculate your total debt and total minimum payments</li>
          <li>Identify your highest-rate debt</li>
          <li>Check if you qualify for any 0% balance transfers</li>
          <li>Read the next article on Snowball vs Avalanche strategies</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Update your debt inventory monthly. Watching balances decrease is incredibly 
            motivating, and it keeps you connected to your progress.
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
                Use our Credit Card Payoff Calculator to see exactly how long it will take to 
                become debt-free and how much you'll pay in interest.
              </p>
              <Link to="/finance/credit-card-payoff">
                <Button>Try Credit Card Payoff Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}