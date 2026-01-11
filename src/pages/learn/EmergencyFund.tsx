import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import emergencyJar from "@/assets/blog-emergency-jar.jpg";
import savingsGrowth from "@/assets/blog-savings-growth.jpg";

export default function EmergencyFund() {
  return (
    <>
      <SEO
        title="Building an Emergency Fund That Works - Financial Safety Net Guide"
        description="Learn how to build a 3-6 month emergency fund that protects you from financial disasters. Practical UK guide to creating your safety cushion."
        keywords="emergency fund, financial safety net, savings buffer, 3 month expenses, 6 month savings, UK emergency savings"
        canonicalUrl="/learn/emergency-fund"
      />
      
      <ArticleLayout
        title="Building an Emergency Fund That Works"
        description="Your financial safety net: why you need it and how to build it"
        readTime="30–60 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{
          title: "How to Choose the Right Savings Account (UK)",
          path: "/learn/choose-savings-account"
        }}
      >
        <h2>What Is an Emergency Fund?</h2>
        <p>
          An emergency fund is a cash cushion designed to catch you when life pushes you off the edge. It's not 
          an investment. It's not for holidays. It's financial insurance against the unexpected—and trust me, 
          the unexpected always shows up.
        </p>
        
        <img 
          src={emergencyJar} 
          alt="Glass jar filled with coins and bills labeled Emergency Fund on wooden table" 
          className="w-full rounded-lg shadow-lg my-8"
        />

        <h2>Why You Need One (Even If You Think You Don't)</h2>
        <p>
          "I'll just use my credit card" is the most expensive lie we tell ourselves. Here's what happens without 
          an emergency fund:
        </p>

        <div className="not-prose bg-destructive/5 border border-destructive/20 rounded-lg p-6 my-6">
          <h4 className="font-semibold text-destructive mb-3">The Debt Spiral:</h4>
          <ol className="space-y-2 text-sm">
            <li>1. Car breaks down (£600 repair)</li>
            <li>2. Credit card pays for it at 22.9% APR</li>
            <li>3. Can only afford minimum payments</li>
            <li>4. Costs you £1,100+ over 3 years</li>
            <li>5. Next emergency hits before you've recovered</li>
            <li>6. Debt compounds, stress escalates</li>
          </ol>
        </div>

        <p>An emergency fund breaks that cycle. It turns crises into inconveniences.</p>

        <h2>How Much Do You Really Need?</h2>
        <p>
          The standard advice is 3-6 months of essential expenses. But let's get specific:
        </p>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">3 Months</div>
            <div className="font-semibold mb-2">Minimum Viable Buffer</div>
            <p className="text-sm text-muted-foreground">If you have:</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>• Stable job</li>
              <li>• Dual income household</li>
              <li>• Low fixed costs</li>
              <li>• Good support network</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-2">6 Months</div>
            <div className="font-semibold mb-2">Solid Safety Net</div>
            <p className="text-sm text-muted-foreground">If you have:</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>• Single income</li>
              <li>• Freelance/contract work</li>
              <li>• High fixed costs</li>
              <li>• Dependents</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">12 Months</div>
            <div className="font-semibold mb-2">Maximum Security</div>
            <p className="text-sm text-muted-foreground">If you have:</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>• Self-employed</li>
              <li>• Volatile income</li>
              <li>• Health concerns</li>
              <li>• Major life changes ahead</li>
            </ul>
          </div>
        </div>

        <h2>Step 1: Calculate Your Target</h2>
        <p>Don't use your total income. Calculate your <strong>essential monthly expenses</strong>:</p>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Housing (rent/mortgage)</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Utilities (gas, electric, water, internet)</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Groceries (essential food only)</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Transport (minimum to function)</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Insurance (health, car if required)</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Minimum debt payments</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-border">
              <span>Essential subscriptions (phone, etc.)</span>
              <span className="font-mono">______</span>
            </div>
            <div className="flex justify-between font-bold pt-2">
              <span>MONTHLY ESSENTIAL TOTAL:</span>
              <span className="font-mono">______</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Multiply this by 3, 6, or 12 depending on your risk profile. That's your emergency fund target.
          </p>
        </div>

        <h2>Step 2: Where to Keep It</h2>
        <p>
          Your emergency fund needs to be accessible but not <em>too</em> accessible (no debit card attached). 
          In the UK, consider:
        </p>

        <ul>
          <li><strong>Easy-access savings accounts</strong> - Instant withdrawal, 3-5% interest (2024 rates)</li>
          <li><strong>Cash ISAs</strong> - Tax-free gains if you're hitting the savings limit</li>
          <li><strong>Premium Bonds</strong> - No interest but potential prizes, backed by government</li>
          <li><strong>NOT in stocks</strong> - Volatility defeats the purpose</li>
          <li><strong>NOT in your current account</strong> - Too tempting to spend</li>
        </ul>

        <h2>Step 3: Build It (Without Feeling the Pain)</h2>
        <p>
          If your target is £9,000 (6 months × £1,500 essentials), that sounds impossible. Break it down:
        </p>
        
        <img 
          src={savingsGrowth} 
          alt="Person holding smartphone showing savings account with growing balance chart" 
          className="w-full rounded-lg shadow-lg my-8"
        />

        <div className="not-prose bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6 my-6">
          <h4 className="font-semibold mb-3">The £1,000 First Milestone</h4>
          <p className="text-sm mb-3">Before tackling the full fund, aim for £1,000. This covers 80% of common emergencies:</p>
          <ul className="text-sm space-y-1">
            <li>• Broken boiler</li>
            <li>• Car repair</li>
            <li>• Vet bill</li>
            <li>• Replacement appliance</li>
          </ul>
          <p className="text-sm mt-3 font-medium">
            At £50/week = 5 months. At £100/week = 2.5 months. Achievable? Yes. Life-changing? Absolutely.
          </p>
        </div>

        <h3>Automation Strategies:</h3>
        <ol>
          <li><strong>Set and forget</strong> - Auto-transfer on payday before you "see" the money</li>
          <li><strong>Round-up apps</strong> - Moneybox, Plum, etc. save spare change automatically</li>
          <li><strong>Windfall rule</strong> - 50% of bonuses, tax refunds, gifts go straight to the fund</li>
          <li><strong>Side hustle earmark</strong> - All extra income = emergency fund until target hit</li>
        </ol>

        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li><strong>Using it for &quot;emergencies&quot; like sales</strong> - If it was planned, it&apos;s not an emergency</li>
          <li><strong>Not replenishing after use</strong> - Rebuild immediately</li>
          <li><strong>Chasing high interest at cost of access</strong> - Liquidity {'>'}  an extra 0.5%</li>
          <li><strong>Stopping once you hit the target</strong> - Keep the habit, redirect to other goals</li>
        </ul>

        <h2>What Counts as an Emergency?</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">✓ Real Emergencies:</h4>
            <ul className="text-sm space-y-1">
              <li>• Job loss</li>
              <li>• Medical crisis</li>
              <li>• Essential car/home repair</li>
              <li>• Emergency travel (family crisis)</li>
              <li>• Broken appliance you need daily</li>
            </ul>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <h4 className="font-semibold text-destructive mb-2">✗ Not Emergencies:</h4>
            <ul className="text-sm space-y-1">
              <li>• Holiday deals</li>
              <li>• Black Friday sales</li>
              <li>• "I deserve a treat"</li>
              <li>• Predictable annual costs (MOT, gifts)</li>
              <li>• New phone because current is slow</li>
            </ul>
          </div>
        </div>

        <h2>Once You're Fully Funded</h2>
        <p>Hitting your emergency fund target is a massive achievement. Now what?</p>
        <ol>
          <li><strong>Celebrate</strong> - Seriously, acknowledge this win</li>
          <li><strong>Redirect contributions</strong> - Same auto-save, different account (debt payoff or investing)</li>
          <li><strong>Review annually</strong> - Life changes, expenses rise—adjust your target</li>
          <li><strong>Keep it sacred</strong> - This is your safety net, not a piggy bank</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 The Peace-of-Mind Test</p>
          <p className="text-sm text-muted-foreground">
            You know your emergency fund is working when your first thought during a crisis isn&apos;t &quot;How will I 
            afford this?&quot; but &quot;Which account do I transfer from?&quot; That&apos;s financial security.
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
                Work out exactly how long it will take to build your emergency fund based on your monthly savings. 
                Use our calculator to create a realistic timeline and stay motivated.
              </p>
              <Link to="/finance/how-long-to-save">
                <Button>Try Savings Timeline Calculator →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}
