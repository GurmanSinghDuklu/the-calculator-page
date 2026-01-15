import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, Users, BookOpen, MessageCircle } from "lucide-react";

export default function TeachMoneySkills() {
  return (
    <>
      <SEO
        title="How to Teach Money Skills to Others - Share Your Knowledge"
        description="Learn how to pass on financial literacy to children, partners, friends, and community. Practical strategies for teaching money skills at every age and stage."
        keywords="teach kids about money, financial education, money skills for children, financial literacy teaching, sharing money knowledge, money conversations"
        canonicalUrl="/learn/teach-money-skills"
      />
      
      <ArticleLayout
        title="How to Teach Money Skills to Others"
        description="Share and multiply your impact"
        readTime="15–25 min"
        category="Thrive"
        categoryColor="bg-violet-500/10 text-violet-700 dark:text-violet-300"
      >
        <h2>Why Teaching Matters</h2>
        <p>
          Financial literacy is one of the most valuable gifts you can give. Schools rarely 
          teach it properly, yet money touches every aspect of life. By sharing what you've 
          learned, you create ripples that extend far beyond yourself.
        </p>

        <h2>Teaching Children About Money</h2>

        <h3>Ages 3-5: Basic Concepts</h3>
        <ul>
          <li>Introduce the concept that things cost money</li>
          <li>Play shop with toy money</li>
          <li>Let them see you pay for things (cash helps visualize)</li>
          <li>Introduce waiting—"we're saving up for that"</li>
        </ul>

        <h3>Ages 6-10: Earning and Saving</h3>
        
        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">The Three Jars System</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Give pocket money and have children split it into three jars:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>💰 <strong>Spend:</strong> For small treats and wants</li>
            <li>🏦 <strong>Save:</strong> For bigger goals (toy, game)</li>
            <li>❤️ <strong>Give:</strong> For charity or gifts</li>
          </ul>
        </div>

        <ul>
          <li>Connect money to effort—earn through chores</li>
          <li>Let them make small buying decisions (and mistakes)</li>
          <li>Open a children's savings account</li>
          <li>Match their savings to encourage the habit</li>
        </ul>

        <h3>Ages 11-15: Real-World Skills</h3>
        <ul>
          <li>Explain needs vs wants in household context</li>
          <li>Show them how household bills work</li>
          <li>Introduce compound interest with simple examples</li>
          <li>Discuss advertising and how it manipulates</li>
          <li>Let them manage a budget for school supplies or activities</li>
        </ul>

        <h3>Ages 16-18: Preparing for Independence</h3>
        <ul>
          <li>Help them open a current account and debit card</li>
          <li>Explain credit, debt, and credit scores</li>
          <li>Discuss student loans and their reality</li>
          <li>Introduce investing concepts (you could open a Junior ISA)</li>
          <li>Teach basic budgeting with their own income</li>
        </ul>

        <h2>Teaching Partners and Spouses</h2>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
            <h4 className="font-semibold">Starting Money Conversations</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Money is a top cause of relationship conflict. Approach it as a team:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Schedule regular "money dates" (monthly reviews)</li>
            <li>• Share openly about your money history and beliefs</li>
            <li>• Focus on shared goals, not blame</li>
            <li>• Respect different money personalities</li>
            <li>• Make decisions together on major purchases</li>
          </ul>
        </div>

        <h3>When One Partner Knows More</h3>
        <ul>
          <li>Teach without condescending—share the journey, not lectures</li>
          <li>Start with their interests (saving for a holiday, home)</li>
          <li>Involve them in decisions, even if you lead</li>
          <li>Ensure both know how to manage finances if something happens to you</li>
        </ul>

        <h2>Teaching Friends and Family</h2>

        <h3>Lead by Example</h3>
        <ul>
          <li>Be open about your financial journey (appropriately)</li>
          <li>Share successes without being preachy</li>
          <li>Offer resources rather than unsolicited advice</li>
        </ul>

        <h3>When Asked for Help</h3>
        
        <div className="not-prose bg-violet-500/10 border border-violet-500/20 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3 mb-4">
            <Users className="h-5 w-5 text-violet-600 mt-0.5" />
            <h4 className="font-semibold text-violet-700 dark:text-violet-300">Helping Others Start</h4>
          </div>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. <strong>Listen first:</strong> Understand their situation and goals</li>
            <li>2. <strong>Start small:</strong> One action at a time, not a complete overhaul</li>
            <li>3. <strong>Focus on wins:</strong> Quick wins build confidence</li>
            <li>4. <strong>Recommend resources:</strong> Books, podcasts, this site!</li>
            <li>5. <strong>Be patient:</strong> Change takes time</li>
          </ol>
        </div>

        <h2>Teaching in Your Community</h2>

        <h3>Ways to Give Back</h3>
        <ul>
          <li><strong>Volunteer:</strong> With financial literacy charities (MyBnk, Money Charity)</li>
          <li><strong>Workplace:</strong> Offer to run a lunch-and-learn on pensions or budgeting</li>
          <li><strong>Schools:</strong> Some schools welcome volunteer sessions on money</li>
          <li><strong>Online:</strong> Share knowledge through blogs, social media, videos</li>
          <li><strong>Mentoring:</strong> Formal or informal mentoring of younger colleagues</li>
        </ul>

        <h2>Recommended Resources to Share</h2>

        <div className="not-prose bg-muted/50 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">For Different Audiences</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium">For Children</p>
              <p className="text-muted-foreground">
                "Money Monsters" by John Donvan, GoHenry app, Rooster Money
              </p>
            </div>
            <div>
              <p className="font-medium">For Beginners</p>
              <p className="text-muted-foreground">
                "The Richest Man in Babylon," MoneySavingExpert, this Financial Journey
              </p>
            </div>
            <div>
              <p className="font-medium">For Intermediate</p>
              <p className="text-muted-foreground">
                "I Will Teach You to Be Rich," "Smarter Investing" by Tim Hale, Monevator blog
              </p>
            </div>
            <div>
              <p className="font-medium">For Advanced</p>
              <p className="text-muted-foreground">
                "The Psychology of Money," "A Random Walk Down Wall Street"
              </p>
            </div>
          </div>
        </div>

        <h2>Common Mistakes When Teaching</h2>
        <ul>
          <li><strong>Too much too fast:</strong> Overwhelm leads to inaction</li>
          <li><strong>Shaming:</strong> Never mock past mistakes</li>
          <li><strong>One-size-fits-all:</strong> Different people need different approaches</li>
          <li><strong>Ignoring emotions:</strong> Money is emotional, not just logical</li>
          <li><strong>Giving up:</strong> Change happens slowly, be patient</li>
        </ul>

        <h2>The Ripple Effect</h2>
        <p>
          When you teach someone about money, they'll teach others. A child who learns good 
          money habits will pass them to their children. A colleague who learns about pensions 
          will share with their family. Your impact multiplies.
        </p>

        <h2>Action Steps</h2>
        <ol>
          <li>Identify one person you could help with money skills</li>
          <li>If you have children, choose one age-appropriate money lesson to start</li>
          <li>Schedule a money date with your partner if applicable</li>
          <li>Consider volunteering with a financial literacy organization</li>
          <li>Share this Financial Journey with someone who might benefit</li>
        </ol>

        <div className="not-prose bg-primary/5 border border-primary/20 rounded-lg p-6 my-6">
          <p className="text-sm font-medium mb-2">💡 Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            The best way to teach is to keep learning yourself. Stay curious, keep reading, 
            and remember that you don't need to know everything—just enough to help someone 
            take their next step.
          </p>
        </div>

        <div className="not-prose bg-gradient-to-r from-emerald-500/10 to-violet-500/10 border border-emerald-500/20 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold mb-2">🎉 Congratulations!</h3>
          <p className="text-sm text-muted-foreground">
            If you've completed this entire Financial Growth Journey, you've gained a solid 
            foundation in personal finance. You understand budgeting, saving, debt management, 
            investing, and wealth protection. Now go share that knowledge with others!
          </p>
        </div>

        <Card className="not-prose bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-6 my-8">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Explore More Calculators</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share our calculators with others to help them with their financial planning. 
                From budgeting to retirement, there's a tool for every step of the journey.
              </p>
              <Link to="/home">
                <Button>View All Calculators →</Button>
              </Link>
            </div>
          </div>
        </Card>
      </ArticleLayout>
    </>
  );
}