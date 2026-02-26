import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Trophy, Target, Zap, ArrowRight } from "lucide-react";

const ACCENT = "#38BDF8"; // Accumulate — sky blue

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
        nextArticle={{ title: "Understanding Your Debt Landscape", path: "/learn/debt-landscape" }}
      >

        <h2>Why £1,000 Changes Everything</h2>
        <p>
          Your first £1,000 is more than just money — it's proof that you can do this. It's the
          psychological breakthrough that transforms "I should save" into "I am a saver." Once
          you hit £1,000, the second thousand comes easier, and the third even faster.
        </p>

        {/* ── Power of the milestone — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Power of the First Milestone</p>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Research shows that people who hit their first savings milestone are 3× more likely
            to continue saving. £1,000 is the perfect target — ambitious enough to feel meaningful,
            achievable enough to reach in 3–12 months.
          </p>
        </div>

        <h2>Choose Your Challenge</h2>
        <p>Pick the approach that fits your personality:</p>

        {/* ── Three timelines — left bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            { label: "The Steady Saver",  time: "12 months", monthly: "£84",  weekly: "£20", who: "People who prefer consistency" },
            { label: "The Sprint Saver",  time: "6 months",  monthly: "£167", weekly: "£42", who: "People motivated by quick wins" },
            { label: "The Intense Saver", time: "3 months",  monthly: "£334", weekly: "£84", who: "High earners or extremely motivated individuals" },
          ].map(({ label, time, monthly, weekly, who }) => (
            <div key={label} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: ACCENT }} />
              <div className="flex-1 flex items-start gap-6 px-6 py-5">
                <div className="shrink-0">
                  <p className="font-display text-3xl leading-none" style={{ color: ACCENT }}>{time}</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/60 mb-2">{label}</p>
                  <div className="flex gap-6 mb-2">
                    <div>
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/20">Monthly</p>
                      <p className="font-heading text-sm" style={{ color: ACCENT }}>{monthly}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/20">Weekly</p>
                      <p className="font-heading text-sm" style={{ color: ACCENT }}>{weekly}</p>
                    </div>
                  </div>
                  <p className="text-zinc-600 text-xs font-sans">Best for: {who}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Gamification Tactics</h2>

        {/* ── Milestone badges — flush grid ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Target className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Milestone Rewards</p>
          </div>
          <div className="space-y-0 divide-y divide-white/5">
            {[
              { emoji: "🥉", amount: "£100",   tier: "Bronze Saver",   desc: "You've started! Treat yourself to something small.",  color: "#CD7F32" },
              { emoji: "🥈", amount: "£250",   tier: "Silver Saver",   desc: "Quarter way! You're building momentum.",              color: "#C0C0C0" },
              { emoji: "🥇", amount: "£500",   tier: "Gold Saver",     desc: "Halfway! You can see the finish line.",               color: "#FFD700" },
              { emoji: "💎", amount: "£750",   tier: "Diamond Saver",  desc: "Almost there! Final push!",                          color: "#A78BFA" },
              { emoji: "🏆", amount: "£1,000", tier: "Champion Saver", desc: "YOU DID IT! Celebrate properly.",                    color: ACCENT    },
            ].map(({ emoji, amount, tier, desc, color }) => (
              <div key={amount} className="flex items-center gap-5 py-3.5">
                <span className="text-2xl shrink-0 w-8 text-center">{emoji}</span>
                <div className="w-16 shrink-0">
                  <p className="font-display text-xl leading-none" style={{ color }}>{amount}</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/50">{tier}</p>
                  <p className="text-zinc-600 text-xs font-sans mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Savings Booster Challenges</h2>
        <p>Add these mini-challenges to accelerate your progress:</p>

        {/* ── Challenges — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="divide-y divide-white/6">
            {[
              { label: "No-Spend Weekend",   boost: "£30–100",  desc: "One weekend per month, spend nothing except essentials. Transfer what you would have spent to savings." },
              { label: "Round-Up Week",       boost: "£5–15",    desc: "For one week, round every purchase up to the nearest pound and save the difference." },
              { label: "One-Thing Purge",     boost: "£10–50",   desc: "Sell one unused item from your home each week — clothes, books, electronics. It adds up." },
              { label: "Subscription Audit",  boost: "£5–30/mo", desc: "Cancel one subscription you don't fully use. Redirect that monthly amount to savings." },
            ].map(({ label, boost, desc }) => (
              <div key={label} className="py-4 flex items-start gap-5">
                <div className="shrink-0 text-right w-20">
                  <p className="font-heading text-xs uppercase tracking-widest" style={{ color: ACCENT }}>{boost}</p>
                  <p className="text-[9px] text-zinc-700 font-heading uppercase tracking-widest">boost</p>
                </div>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-1">{label}</p>
                  <p className="text-zinc-500 text-sm font-sans">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Psychology Hacks That Work</h2>

        {/* ── Mental tricks — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-5">
            <Zap className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Mental Tricks for Success</p>
          </div>
          <div className="space-y-3">
            {[
              ["Name your account",    '"New Car Fund" or "Freedom Money" is more motivating than "Savings Account 2"'],
              ["Visualize progress",   "Use a savings tracker printout or app that shows a progress bar filling up"],
              ["Automate immediately", "Set up a standing order on payday so you never 'decide' to save"],
              ["Hide it",              "Use a separate bank so you don't see the balance daily — less temptation to dip in"],
              ["Tell someone",         "Accountability increases success rates dramatically"],
            ].map(([trick, note]) => (
              <div key={trick as string} className="flex items-start gap-3">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px text-xs">→</span>
                <p className="text-zinc-500 text-sm font-sans">
                  <strong className="text-zinc-300">{trick}:</strong> {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2>Where to Find the Money</h2>
        <p>If you think you can't save, try these sources:</p>
        <ul>
          <li><strong>Reduce food waste:</strong> Average UK household wastes £60/month on food</li>
          <li><strong>Pack lunch:</strong> Save £5–10 per day vs buying</li>
          <li><strong>Review insurance:</strong> Annual switch can save £100+</li>
          <li><strong>Cut one subscription:</strong> Netflix, Spotify, gym — pick one</li>
          <li><strong>Energy switch:</strong> Could save £100–300/year</li>
          <li><strong>Side income:</strong> Sell items, freelance, overtime</li>
        </ul>

        <h2>After £1,000: What Next?</h2>
        <ol>
          <li>Celebrate properly — you earned it</li>
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

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "If you miss a week, don't quit. Progress beats perfection every time."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            A 10-month journey to £1,000 is still a success
          </p>
        </div>

        {/* ── CTA card — stark ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] p-7 my-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}10` }}>
              <Calculator className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl uppercase tracking-widest text-white mb-2">Put It Into Practice</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                Use our Savings Calculator to project when you'll hit £1,000 based on your weekly
                contributions, and see what happens if you increase them.
              </p>
              <Link to="/finance/savings"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Savings Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}