import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Users, BookOpen, MessageCircle, ArrowRight } from "lucide-react";

const ACCENT = "#A78BFA"; // Thrive — violet
const GREEN  = "#34D399";

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

        {/* ── Four age stages — left bar stacked ── */}
        <div className="not-prose border border-white/8 divide-y divide-white/6 my-8">
          {[
            {
              stage: "Ages 3–5",   badge: "Basic Concepts",
              items: ["Introduce the concept that things cost money", "Play shop with toy money", "Let them see you pay for things (cash helps visualize)", "Introduce waiting — 'we're saving up for that'"],
            },
            {
              stage: "Ages 6–10",  badge: "Earning & Saving",
              items: ["Connect money to effort — earn through chores", "Let them make small buying decisions (and mistakes)", "Open a children's savings account", "Match their savings to encourage the habit"],
            },
            {
              stage: "Ages 11–15", badge: "Real-World Skills",
              items: ["Explain needs vs wants in household context", "Show them how household bills work", "Introduce compound interest with simple examples", "Let them manage a budget for school supplies"],
            },
            {
              stage: "Ages 16–18", badge: "Independence",
              items: ["Help them open a current account and debit card", "Explain credit, debt, and credit scores", "Discuss student loans and their reality", "Introduce investing concepts — consider a Junior ISA"],
            },
          ].map(({ stage, badge, items }) => (
            <div key={stage} className="flex gap-0 bg-black hover:bg-white/[0.015] transition-colors">
              <div className="w-1 shrink-0" style={{ background: ACCENT }} />
              <div className="flex-1 px-6 py-5">
                <div className="flex items-center gap-3 mb-3">
                  <p className="font-display text-xl leading-none" style={{ color: ACCENT }}>{stage}</p>
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/25">{badge}</p>
                </div>
                <ul className="space-y-1.5">
                  {items.map(i => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                      <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── Three jars — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <BookOpen className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Three Jars System (Ages 6–10)</p>
          </div>
          <p className="text-zinc-500 text-sm mb-5">Give pocket money and have children split it into three jars:</p>
          <div className="divide-y divide-white/6">
            {[
              { emoji: "💰", label: "Spend", note: "For small treats and wants — immediate gratification managed." },
              { emoji: "🏦", label: "Save",  note: "For bigger goals like a toy or game — patience and planning." },
              { emoji: "❤️", label: "Give",  note: "For charity or gifts — empathy and generosity." },
            ].map(({ emoji, label, note }) => (
              <div key={label} className="flex items-center gap-5 py-3.5">
                <span className="text-xl shrink-0">{emoji}</span>
                <div className="w-16 shrink-0">
                  <p className="font-heading text-[10px] uppercase tracking-widest" style={{ color: ACCENT }}>{label}</p>
                </div>
                <p className="text-zinc-500 text-sm font-sans">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Teaching Partners and Spouses</h2>

        {/* ── Money conversations — left border ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Starting Money Conversations</p>
          </div>
          <p className="text-zinc-500 text-sm mb-4">Money is a top cause of relationship conflict. Approach it as a team:</p>
          <ul className="space-y-2">
            {[
              "Schedule regular 'money dates' (monthly reviews)",
              "Share openly about your money history and beliefs",
              "Focus on shared goals, not blame",
              "Respect different money personalities",
              "Make decisions together on major purchases",
            ].map(i => (
              <li key={i} className="flex items-start gap-2 text-sm font-sans text-zinc-500">
                <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
              </li>
            ))}
          </ul>
        </div>

        <h3>When One Partner Knows More</h3>
        <ul>
          <li>Teach without condescending — share the journey, not lectures</li>
          <li>Start with their interests (saving for a holiday, home)</li>
          <li>Involve them in decisions, even if you lead</li>
          <li>Ensure both know how to manage finances if something happens to you</li>
        </ul>

        <h2>When Asked for Help</h2>

        {/* ── Helping others start — flush box numbered ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <Users className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Helping Others Start</p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              { label: "Listen first",        note: "Understand their situation and goals before offering any advice." },
              { label: "Start small",         note: "One action at a time, not a complete financial overhaul." },
              { label: "Focus on wins",       note: "Quick wins build confidence and create momentum." },
              { label: "Recommend resources", note: "Books, podcasts, this site — not just your opinion." },
              { label: "Be patient",          note: "Change takes time. Long-held habits don't shift overnight." },
            ].map(({ label, note }, i) => (
              <div key={label} className="flex items-start gap-5 py-3.5">
                <span className="font-display text-2xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.25 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-0.5">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-0.5">{label}</p>
                  <p className="text-zinc-500 text-sm font-sans">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Teaching in Your Community</h2>
        <ul>
          <li><strong>Volunteer:</strong> With financial literacy charities (MyBnk, Money Charity)</li>
          <li><strong>Workplace:</strong> Offer to run a lunch-and-learn on pensions or budgeting</li>
          <li><strong>Schools:</strong> Some schools welcome volunteer sessions on money</li>
          <li><strong>Online:</strong> Share knowledge through blogs, social media, videos</li>
          <li><strong>Mentoring:</strong> Formal or informal mentoring of younger colleagues</li>
        </ul>

        <h2>Recommended Resources to Share</h2>

        {/* ── Resources by audience — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">For Different Audiences</p>
          <div className="divide-y divide-white/6">
            {[
              { audience: "For Children",    recs: "Money Monsters (John Donvan), GoHenry app, Rooster Money" },
              { audience: "For Beginners",   recs: "The Richest Man in Babylon, MoneySavingExpert, this Financial Journey" },
              { audience: "For Intermediate",recs: "I Will Teach You to Be Rich, Smarter Investing (Tim Hale), Monevator blog" },
              { audience: "For Advanced",    recs: "The Psychology of Money, A Random Walk Down Wall Street" },
            ].map(({ audience, recs }) => (
              <div key={audience} className="py-3.5 flex items-start gap-5">
                <p className="font-heading text-[9px] uppercase tracking-widest text-white/25 shrink-0 w-28">{audience}</p>
                <p className="text-zinc-500 text-sm font-sans">{recs}</p>
              </div>
            ))}
          </div>
        </div>

        <h2>Common Mistakes When Teaching</h2>
        <ul>
          <li><strong>Too much too fast:</strong> Overwhelm leads to inaction</li>
          <li><strong>Shaming:</strong> Never mock past mistakes</li>
          <li><strong>One-size-fits-all:</strong> Different people need different approaches</li>
          <li><strong>Ignoring emotions:</strong> Money is emotional, not just logical</li>
          <li><strong>Giving up:</strong> Change happens slowly — be patient</li>
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
          <li>Consider volunteering with a financial literacy organisation</li>
          <li>Share this Financial Journey with someone who might benefit</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "The best way to teach is to keep learning yourself. You don't need to know everything — just enough to help someone take their next step."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Stay curious. Share freely. Watch the ripple spread.
          </p>
        </div>

        {/* ── Congratulations — editorial celebration card ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] px-7 py-7 my-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-[0.06] pointer-events-none"
            style={{ background: `radial-gradient(circle, ${GREEN}, ${ACCENT})`, transform: "translate(30%, -30%)" }} />
          <p className="font-display text-4xl uppercase tracking-widest mb-1" style={{
            background: `linear-gradient(135deg, ${GREEN}, ${ACCENT})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Congratulations</p>
          <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-white/20 mb-4">Financial Growth Journey Complete</p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            If you've completed this entire Financial Growth Journey, you've gained a solid
            foundation in personal finance. You understand budgeting, saving, debt management,
            investing, and wealth protection. Now go share that knowledge with others.
          </p>
        </div>

        {/* ── CTA card — stark ── */}
        <div className="not-prose border border-white/10 bg-white/[0.015] p-7 my-10">
          <div className="flex items-start gap-6">
            <div className="shrink-0 border border-white/10 p-3" style={{ background: `${ACCENT}10` }}>
              <Calculator className="h-5 w-5" style={{ color: ACCENT }} />
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl uppercase tracking-widest text-white mb-2">Explore More Calculators</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                Share our calculators with others to help them with their financial planning.
                From budgeting to retirement, there's a tool for every step of the journey.
              </p>
              <Link to="/home"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                View All Calculators <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}