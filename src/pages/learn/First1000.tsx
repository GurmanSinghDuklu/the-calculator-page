import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Trophy, Target, Zap } from "lucide-react";

export default function First1000() {
  return (
    <>
      <SEO
        title="Your First £1,000: Turning Saving Into a Habit"
        description="A gamified approach to saving your first £1,000. Build lasting savings habits with milestones, challenges, and psychological tricks that make saving feel rewarding."
        keywords="save first 1000, saving habits, savings challenge, money saving tips UK, building savings habit, savings milestones"
        canonicalUrl="/learn/first-1000"
      />
      
      <ArticleLayout
        title="Your First £1,000: Turning Saving Into a Habit"
        description="Gamified habit-building approach"
        readTime="10–20 min"
        category="Accumulate"
        categoryColor="bg-sky-500/10 text-sky-700 dark:text-sky-300"
        nextArticle={{
          title: "Understanding Your Debt Landscape",
          path: "/learn/debt-landscape"
        }}
      >
        <h2>Why £1,000 Changes Everything</h2>
        <p>
          Your first £1,000 is more than just money—it's proof that you can do this. It's the 
          psychological breakthrough that transforms "I should save" into "I am a saver." Once 
          you hit £1,000, the second thousand comes easier, and the third even faster.
        </p>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Trophy className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The Power of the First Milestone</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Research shows that people who hit their first savings milestone are 3x more likely 
            to continue saving. £1,000 is the perfect target—ambitious enough to feel meaningful, 
            achievable enough to reach in 3-12 months.
          </p>
        </div>

        <h2>Choose Your Challenge</h2>
        <p>Pick the approach that fits your personality:</p>

        <h3>The Steady Saver (12 months)</h3>
        <p>Save £84/month or roughly £20/week. Slow and steady wins the race.</p>
        <ul>
          <li>Best for: People who prefer consistency</li>
          <li>Monthly target: £84</li>
          <li>Weekly target: £20</li>
        </ul>

        <h3>The Sprint Saver (6 months)</h3>
        <p>Save £167/month or roughly £42/week. Faster results, more motivation.</p>
        <ul>
          <li>Best for: People motivated by quick wins</li>
          <li>Monthly target: £167</li>
          <li>Weekly target: £42</li>
        </ul>

        <h3>The Intense Saver (3 months)</h3>
        <p>Save £334/month or roughly £84/week. For those ready to sprint.</p>
        <ul>
          <li>Best for: High earners or extremely motivated individuals</li>
          <li>Monthly target: £334</li>
          <li>Weekly target: £84</li>
        </ul>

        <h2>Gamification Tactics</h2>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <Target className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Milestone Rewards</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded">
              <span className="text-xl">🥉</span>
              <span><strong>£100:</strong> Bronze Saver - You've started! Treat yourself to something small.</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-400/10 rounded">
              <span className="text-xl">🥈</span>
              <span><strong>£250:</strong> Silver Saver - Quarter way! You're building momentum.</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-400/10 rounded">
              <span className="text-xl">🥇</span>
              <span><strong>£500:</strong> Gold Saver - Halfway! You can see the finish line.</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded">
              <span className="text-xl">💎</span>
              <span><strong>£750:</strong> Diamond Saver - Almost there! Final push!</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded">
              <span className="text-xl">🏆</span>
              <span><strong>£1,000:</strong> Champion Saver - YOU DID IT! Celebrate properly.</span>
            </div>
          </div>
        </div>

        <h2>Savings Booster Challenges</h2>
        <p>Add these mini-challenges to accelerate your progress:</p>

        <h3>No-Spend Weekend</h3>
        <p>
          One weekend per month, spend nothing except essentials. Transfer what you would have 
          spent to savings. Typical boost: £30-100.
        </p>

        <h3>Round-Up Week</h3>
        <p>
          For one week, round every purchase up to the nearest pound and save the difference. 
          Typical boost: £5-15.
        </p>

        <h3>One-Thing Purge</h3>
        <p>
          Sell one unused item from your home each week. Clothes, books, electronics—it adds up. 
          Typical boost: £10-50 per item.
        </p>

        <h3>Subscription Audit</h3>
        <p>
          Cancel one subscription you don't fully use. Redirect that monthly amount to savings. 
          Typical boost: £5-30/month ongoing.
        </p>

        <h2>Psychology Hacks That Work</h2>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Zap className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Mental Tricks for Success</h4>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <strong>Name your account:</strong> "New Car Fund" or "Freedom Money" is more motivating 
              than "Savings Account 2"
            </li>
            <li>
              <strong>Visualize progress:</strong> Use a savings tracker printout or app that shows 
              a progress bar filling up
            </li>
            <li>
              <strong>Automate immediately:</strong> Set up a standing order on payday so you never 
              "decide" to save
            </li>
            <li>
              <strong>Hide it:</strong> Use a separate bank so you don't see the balance daily—less 
              temptation to dip in
            </li>
            <li>
              <strong>Tell someone:</strong> Accountability increases success rates dramatically
            </li>
          </ul>
        </div>

        <h2>Where to Find the Money</h2>
        <p>If you think you can't save, try these sources:</p>
        <ul>
          <li><strong>Reduce food waste:</strong> Average UK household wastes £60/month on food</li>
          <li><strong>Pack lunch:</strong> Save £5-10 per day vs buying</li>
          <li><strong>Review insurance:</strong> Annual switch can save £100+</li>
          <li><strong>Cut one subscription:</strong> Netflix, Spotify, gym—pick one</li>
          <li><strong>Energy switch:</strong> Could save £100-300/year</li>
          <li><strong>Side income:</strong> Sell items, freelance, overtime</li>
        </ul>

        <h2>After £1,000: What Next?</h2>
        <p>
          Once you hit £1,000, keep the momentum going:
        </p>
        <ol>
          <li>Celebrate properly—you earned it</li>
          <li>Set your next target (often £2,500 or £5,000)</li>
          <li>Consider moving to a longer-term savings vehicle</li>
          <li>Keep the automated savings running</li>
          <li>Start learning about investing for the future</li>
        </ol>

        <h2>Action Steps</h2>
        <ol>
          <li>Choose your timeline: 3, 6, or 12 months</li>
          <li>Calculate your weekly/monthly savings target</li>
          <li>Open a dedicated savings account (name it something motivating)</li>
          <li>Set up an automatic transfer for payday</li>
          <li>Print a progress tracker and put it somewhere visible</li>
          <li>Tell one person about your goal</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            If you miss a week, don't beat yourself up or quit. Just continue from where you are. 
            Progress beats perfection every time. A 10-month journey to £1,000 is still a success.
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
                Use our Savings Calculator to project when you'll hit £1,000 based on your weekly 
                contributions, and see what happens if you increase them.
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