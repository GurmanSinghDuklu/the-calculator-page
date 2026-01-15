import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export default function CreditScores() {
  return (
    <>
      <SEO
        title="Credit Scores and Borrowing Wisely - Build or Repair Your Credit"
        description="Understand UK credit scores, how they work, and practical strategies to build or repair your credit. Learn to borrow wisely and improve your financial options."
        keywords="credit score UK, improve credit score, credit rating, Experian, Equifax, credit repair, borrowing tips UK, credit file"
        canonicalUrl="/learn/credit-scores"
      />
      
      <ArticleLayout
        title="Credit Scores and Borrowing Wisely"
        description="Build or repair credit health"
        readTime="20 min"
        category="Pay Off"
        categoryColor="bg-amber-500/10 text-amber-700 dark:text-amber-300"
        nextArticle={{
          title: "What to Do Before You Invest",
          path: "/learn/before-you-invest"
        }}
      >
        <h2>What Is a Credit Score?</h2>
        <p>
          Your credit score is a number that represents how risky you are to lend to. Higher scores 
          mean you're seen as more reliable, which gets you better interest rates and more lending 
          options. Lower scores mean higher rates or rejection.
        </p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">UK Credit Reference Agencies</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-medium mb-1">Experian</p>
              <p className="text-muted-foreground">Score: 0-999</p>
              <p className="text-xs text-muted-foreground mt-2">Free via MoneySavingExpert Credit Club</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-medium mb-1">Equifax</p>
              <p className="text-muted-foreground">Score: 0-1000</p>
              <p className="text-xs text-muted-foreground mt-2">Free via ClearScore</p>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="font-medium mb-1">TransUnion</p>
              <p className="text-muted-foreground">Score: 0-710</p>
              <p className="text-xs text-muted-foreground mt-2">Free via Credit Karma</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Different lenders use different agencies. Check all three for a complete picture.
          </p>
        </div>

        <h2>What Affects Your Score?</h2>

        <h3>Payment History (Most Important)</h3>
        <ul>
          <li>Late payments stay on your file for 6 years</li>
          <li>Even one missed payment can drop your score significantly</li>
          <li>Defaults and CCJs have the biggest negative impact</li>
        </ul>

        <h3>Credit Utilization</h3>
        <ul>
          <li>How much of your available credit you're using</li>
          <li>Aim to use less than 30% of your credit limits</li>
          <li>Maxed-out cards hurt your score even if you pay on time</li>
        </ul>

        <h3>Credit History Length</h3>
        <ul>
          <li>Older accounts help your score</li>
          <li>Don't close old credit cards unnecessarily</li>
          <li>Time heals—negative marks fade after 6 years</li>
        </ul>

        <h3>Credit Mix</h3>
        <ul>
          <li>Having different types of credit (cards, loans) can help</li>
          <li>Don't open credit just for variety though</li>
        </ul>

        <h3>Hard Searches</h3>
        <ul>
          <li>Each credit application leaves a "hard search" mark</li>
          <li>Too many applications in short time looks desperate</li>
          <li>Use eligibility checkers (soft searches) first</li>
        </ul>

        <h2>Building Credit from Scratch</h2>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Steps for Credit Newbies</h4>
          </div>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. <strong>Register on the electoral roll</strong> at your current address</li>
            <li>2. <strong>Get a credit builder card</strong> (Aqua, Vanquis, Capital One)</li>
            <li>3. <strong>Use it for small purchases</strong> (£20-50/month)</li>
            <li>4. <strong>Pay in full every month</strong> (set up Direct Debit)</li>
            <li>5. <strong>Wait 3-6 months</strong> and check score improvement</li>
            <li>6. <strong>Don't apply for more credit</strong> until score improves</li>
          </ol>
        </div>

        <h2>Repairing Damaged Credit</h2>

        <div className="not-prose bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-700 dark:text-amber-300 mb-2">If You Have Bad Credit</p>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li>1. <strong>Get your free credit reports</strong> from all three agencies</li>
                <li>2. <strong>Check for errors</strong> and dispute any mistakes</li>
                <li>3. <strong>Ensure you're on the electoral roll</strong></li>
                <li>4. <strong>Pay all current bills on time</strong> without fail</li>
                <li>5. <strong>Reduce credit utilization</strong> below 30%</li>
                <li>6. <strong>Don't apply for new credit</strong> for 6-12 months</li>
                <li>7. <strong>Consider a credit builder card</strong> if you can get one</li>
                <li>8. <strong>Wait</strong> - negative marks disappear after 6 years</li>
              </ol>
            </div>
          </div>
        </div>

        <h2>Borrowing Wisely</h2>

        <h3>Before You Borrow, Ask:</h3>
        <ul>
          <li>Do I actually need this, or do I want it?</li>
          <li>Can I wait and save instead?</li>
          <li>What's the true total cost including interest?</li>
          <li>Can I afford the monthly payments without stress?</li>
          <li>What happens if my income drops?</li>
        </ul>

        <h3>Good Reasons to Borrow</h3>
        <ul>
          <li>Mortgage for a home you can afford</li>
          <li>Consolidating high-rate debt to a lower rate</li>
          <li>Essential car for work (if public transport isn't viable)</li>
          <li>Education that increases earning potential</li>
        </ul>

        <h3>Bad Reasons to Borrow</h3>
        <ul>
          <li>Holidays or experiences</li>
          <li>Keeping up with others' lifestyles</li>
          <li>Consumer goods that depreciate</li>
          <li>To gamble or speculate</li>
          <li>Because you can</li>
        </ul>

        <h2>Smart Credit Card Strategies</h2>
        
        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Using Credit Cards Wisely</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ <strong>Pay in full every month</strong> - treat it like a debit card</li>
            <li>✓ <strong>Use for protection</strong> - Section 75 covers purchases £100-30,000</li>
            <li>✓ <strong>Collect rewards</strong> - cashback or points (only if paying in full)</li>
            <li>✓ <strong>Set up Direct Debit</strong> for full balance to avoid accidents</li>
            <li>✗ <strong>Never withdraw cash</strong> - instant interest, fees apply</li>
            <li>✗ <strong>Don't pay just minimums</strong> - unless in financial distress</li>
          </ul>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Sign up for free credit scores from all three agencies</li>
          <li>Check your reports for any errors</li>
          <li>Verify you're registered on the electoral roll</li>
          <li>Calculate your credit utilization across all cards</li>
          <li>Set up Direct Debits for at least minimum payments on all credit</li>
          <li>Before any new credit, use eligibility checkers first</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Your credit score matters most when you're about to borrow. If you're not planning to 
            get a mortgage or loan soon, don't obsess over the number. Focus on good habits—the 
            score will follow.
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
                Use our Loan Calculator to compare the true cost of different loan offers and see 
                how interest rates affect your total repayment.
              </p>
              <Link to="/finance/loan">
                <Button>Try Loan Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}