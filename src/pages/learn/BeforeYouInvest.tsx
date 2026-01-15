import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, CheckSquare, Shield, AlertTriangle } from "lucide-react";

export default function BeforeYouInvest() {
  return (
    <>
      <SEO
        title="What to Do Before You Invest - Pre-Investment Checklist"
        description="A comprehensive checklist of what you need in place before investing. Cover emergency funds, debt, risk tolerance, goals, and timelines before putting money in the market."
        keywords="before investing checklist, investment readiness, risk tolerance, investment goals, emergency fund before investing, investment timeline UK"
        canonicalUrl="/learn/before-you-invest"
      />
      
      <ArticleLayout
        title="What to Do Before You Invest"
        description="Risk tolerance, goals and timelines checklist"
        readTime="20–30 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{
          title: "Basics of Investing: Stocks, Bonds & ETFs",
          path: "/learn/investing-basics"
        }}
      >
        <h2>The Pre-Investment Checklist</h2>
        <p>
          Investing is powerful, but only when your financial foundation is solid. Jumping into 
          the markets without the basics in place is like building a house on sand. Let's make 
          sure you're truly ready.
        </p>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <CheckSquare className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Before You Invest: The Checklist</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>High-interest debt paid off (credit cards, overdrafts)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Emergency fund of 3-6 months expenses</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Stable income that covers expenses with surplus</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Workplace pension enrolled (free employer money!)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Clear investment timeline (5+ years for stocks)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Understood your risk tolerance</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Defined clear investment goals</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">□</span>
              <span>Money you can afford to leave untouched</span>
            </div>
          </div>
        </div>

        <h2>Why Each Step Matters</h2>

        <h3>1. Clear High-Interest Debt First</h3>
        <p>
          Paying off a 22% credit card gives you a guaranteed 22% return. No investment can 
          reliably match that. Clear toxic debt before investing.
        </p>
        <div className="not-prose bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 my-4">
          <p className="text-sm text-muted-foreground">
            <strong>Exception:</strong> Low-interest debt (under 5%) like student loans or mortgages 
            can run alongside investments, as investments may outperform over time.
          </p>
        </div>

        <h3>2. Build Your Emergency Fund</h3>
        <p>
          Without an emergency fund, you'll be forced to sell investments at the worst time—when 
          markets are down and you need cash. Your emergency fund is insurance for your investments.
        </p>

        <h3>3. Maximize Free Money</h3>
        <p>
          Your workplace pension likely includes employer matching. If your employer matches 5%, 
          that's an instant 100% return on your contributions. Always get the full match before 
          investing elsewhere.
        </p>

        <h2>Understanding Your Risk Tolerance</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Risk Tolerance Assessment</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Imagine you invest £10,000. How would you react if it dropped to:
          </p>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-emerald-500/10 rounded">
              <p className="font-medium text-emerald-700 dark:text-emerald-300">£9,000 (10% drop)</p>
              <p className="text-muted-foreground">Normal market fluctuation. Happens regularly.</p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded">
              <p className="font-medium text-amber-700 dark:text-amber-300">£7,500 (25% drop)</p>
              <p className="text-muted-foreground">Significant correction. Happens every few years.</p>
            </div>
            <div className="p-3 bg-destructive/10 rounded">
              <p className="font-medium text-destructive">£5,000 (50% drop)</p>
              <p className="text-muted-foreground">Major crash. Happened in 2008, 2020 briefly.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            If any of these would make you panic-sell, your portfolio needs more conservative assets.
          </p>
        </div>

        <h3>Risk Tolerance Factors</h3>
        <ul>
          <li><strong>Age:</strong> Younger = more time to recover from losses</li>
          <li><strong>Income stability:</strong> Secure job = can take more risk</li>
          <li><strong>Timeline:</strong> Longer = more risk acceptable</li>
          <li><strong>Personality:</strong> Can you sleep if your portfolio drops 30%?</li>
          <li><strong>Financial obligations:</strong> Mortgage, dependents = may need less risk</li>
        </ul>

        <h2>Defining Your Investment Goals</h2>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Common Investment Goals</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">Retirement (20-40 years away)</p>
              <p className="text-muted-foreground">
                Longest timeline, can handle high risk. Focus on growth.
              </p>
            </div>
            <div>
              <p className="font-medium">House Deposit (3-10 years away)</p>
              <p className="text-muted-foreground">
                Medium timeline. Balanced approach, reduce risk as you get closer.
              </p>
            </div>
            <div>
              <p className="font-medium">Financial Independence (10-25 years)</p>
              <p className="text-muted-foreground">
                Long timeline. Growth-focused, diversified portfolio.
              </p>
            </div>
            <div>
              <p className="font-medium">Children's Education (5-18 years)</p>
              <p className="text-muted-foreground">
                Depends on children's ages. Reduce risk as date approaches.
              </p>
            </div>
          </div>
        </div>

        <h2>The 5-Year Rule</h2>
        <p>
          Never invest money in stocks that you'll need within 5 years. Markets can and do drop 
          50% and take years to recover. If you might need the money sooner, use:
        </p>
        <ul>
          <li><strong>0-1 years:</strong> High-yield savings account</li>
          <li><strong>1-3 years:</strong> Cash ISA, notice accounts</li>
          <li><strong>3-5 years:</strong> Maybe bonds, conservative mixed portfolio</li>
          <li><strong>5+ years:</strong> Stocks and diversified investing</li>
        </ul>

        <h2>How Much to Invest</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <h4 className="font-semibold mb-3">The Investment Amount Question</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Only invest what you can genuinely afford to lock away AND afford to lose. Ask yourself:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• If this money disappeared tomorrow, would I still be okay?</li>
            <li>• Can I leave this untouched for 5+ years minimum?</li>
            <li>• Is my emergency fund fully funded?</li>
            <li>• Are my essential expenses covered from income?</li>
          </ul>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Complete the pre-investment checklist above</li>
          <li>Check your workplace pension and ensure you get full employer match</li>
          <li>Honestly assess your risk tolerance using the scenarios above</li>
          <li>Write down your investment goal(s) with specific timelines</li>
          <li>Calculate how much surplus you have after expenses and emergency fund</li>
          <li>If any checklist items are incomplete, address those first</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            There's no rush to invest. Missing a few months of market gains while you build a 
            solid foundation is far better than panic-selling when life throws you a curveball. 
            Boring preparation enables exciting results.
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
                Use our Compound Interest Calculator to project how your investments could grow 
                over your specific timeline, with different contribution amounts.
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