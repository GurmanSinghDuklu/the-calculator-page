import { SEO } from "@/components/SEO";
import { ArticleLayout } from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import { Calculator, Clock, Zap, Brain, ArrowRight } from "lucide-react";

const ACCENT = "#34D399"; // Invest — emerald
const ORANGE = "#F97316";

export default function InvestingVsTrading() {
  return (
    <>
      <SEO
        title="Long-Term Investing vs Trading - Psychology and Strategy"
        description="Understand the crucial difference between investing and trading. Learn why long-term investing wins for most people and how to master the psychology of staying the course."
        keywords="investing vs trading, long term investing, buy and hold, trading psychology, investment strategy, patient investing UK"
        canonicalUrl="/learn/investing-vs-trading"
      />

      <ArticleLayout
        title="Long-Term Investing vs Trading"
        description="Psychology and behaviour guidance"
        readTime="20 min"
        category="Invest"
        categoryColor="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        nextArticle={{ title: "Tax-Efficient Accounts (ISAs, SIPPs)", path: "/learn/tax-efficient-accounts" }}
      >

        <h2>Two Very Different Games</h2>
        <p>
          Investing and trading may look similar — both involve buying assets — but they're completely
          different activities with different skills, time requirements, and success rates.
          Knowing which game you're playing is crucial.
        </p>

        {/* ── Two approaches — flush side-by-side ── */}
        <div className="not-prose grid md:grid-cols-2 gap-px bg-white/8 border border-white/8 my-10">
          {/* Investing */}
          <div className="bg-black px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>The Investing Approach</p>
            </div>
            <ul className="space-y-2">
              {[
                "Buy diversified assets (index funds, ETFs)",
                "Hold for years or decades",
                "Ignore short-term market movements",
                "Reinvest dividends",
                "Rebalance occasionally (annually)",
                "Time in market beats timing the market",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: ACCENT }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
          {/* Trading */}
          <div className="bg-black px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-4 w-4 shrink-0" style={{ color: ORANGE }} />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ORANGE }}>The Trading Approach</p>
            </div>
            <ul className="space-y-2">
              {[
                "Buy individual stocks, options, crypto, etc.",
                "Hold for days, hours, or minutes",
                "React to market movements constantly",
                "Try to predict short-term price changes",
                "Requires significant time and attention",
                "Attempt to beat the market",
              ].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 font-sans">
                  <span style={{ color: ORANGE }} className="shrink-0 mt-px">→</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>The Evidence Is Clear</h2>

        {/* ── Studies — flush box with dividers ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">Studies Show</p>
          <div className="divide-y divide-white/6">
            {[
              { stat: "70–90%",  label: "of day traders lose money",             note: "After fees, taxes, and time, most traders would have been better off investing passively." },
              { stat: "÷2",     label: "returns if you miss the 10 best days",   note: "Missing just 10 best market days over 20 years halves your total return." },
              { stat: "85%+",   label: "of active managers fail to beat index",   note: "Professional fund managers underperform index funds over 15 years." },
              { stat: "∞",      label: "trading costs compound against you",      note: "Frequent trading means more fees, more taxes, and more chances for emotional mistakes." },
            ].map(({ stat, label, note }) => (
              <div key={label} className="py-4 flex items-start gap-5">
                <p className="font-display text-2xl leading-none shrink-0 w-12 text-right" style={{ color: ORANGE, opacity: 0.7 }}>{stat}</p>
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/50 mb-1">{label}</p>
                  <p className="text-zinc-500 text-sm font-sans">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Why Trading Is So Hard</h2>

        <h3>1. You're Competing Against Professionals</h3>
        <p>Hedge funds have AI, teams of analysts, and millisecond execution. You're competing against them with a mobile app.</p>

        <h3>2. Fees Eat Your Gains</h3>
        <p>Every trade costs money. Frequent trading means fees compound against you, not for you.</p>

        <h3>3. Taxes Are Higher</h3>
        <p>Short-term gains are taxed as income. Long-term investments in ISAs pay zero tax.</p>

        <h3>4. Psychology Works Against You</h3>
        <p>Our brains are wired for loss aversion. We sell winners too early and hold losers too long. We panic at dips and get greedy at peaks.</p>

        <h2>The Psychology of Staying the Course</h2>

        {/* ── Mental models — left border + numbered ── */}
        <div className="not-prose border-l-2 pl-6 py-1 my-8" style={{ borderColor: ACCENT }}>
          <div className="flex items-center gap-3 mb-5">
            <Brain className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Mental Models for Long-Term Investors</p>
          </div>
          <div className="space-y-0 divide-y divide-white/6">
            {[
              { model: "Market drops are sales",        note: "When stocks fall 20%, you're buying at a 20% discount. Would you panic if your favourite store had a sale?" },
              { model: "You're buying time",             note: "You're not buying today's prices — you're buying 20 years of future returns." },
              { model: "Volatility is the fee",          note: "Higher returns require accepting temporary drops. It's the price of admission for long-term growth." },
              { model: "You don't lose until you sell",  note: "Paper losses aren't real losses. They become real only when you panic and sell." },
            ].map(({ model, note }, i) => (
              <div key={model} className="flex items-start gap-5 py-3.5">
                <span className="font-display text-3xl leading-none shrink-0 tabular-nums" style={{ color: ACCENT, opacity: 0.2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-0.5">
                  <p className="font-heading text-[10px] uppercase tracking-widest text-white/55 mb-0.5">{model}</p>
                  <p className="text-zinc-500 text-sm font-sans">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>How to Stay Invested During Crashes</h2>
        <ol>
          <li><strong>Have a written investment plan</strong> — Remind yourself why you're invested</li>
          <li><strong>Don't check daily</strong> — Checking less reduces emotional reactions</li>
          <li><strong>Automate contributions</strong> — Remove the decision to invest</li>
          <li><strong>Remember history</strong> — Every crash has been followed by recovery</li>
          <li><strong>Have enough cash</strong> — Emergency fund prevents forced selling</li>
          <li><strong>Talk to someone calm</strong> — Not financial news, not panicking friends</li>
        </ol>

        <h2>When Trading Might Make Sense</h2>
        <p>Trading isn't always wrong, but be honest about why:</p>
        <ul>
          <li><strong>Entertainment:</strong> Use a small "play money" account (max 5–10% of portfolio)</li>
          <li><strong>Education:</strong> Learning about markets, not expecting profits</li>
          <li><strong>Professional pursuit:</strong> If you're genuinely building trading skills</li>
        </ul>
        <p>Just don't confuse trading for entertainment with a strategy for building wealth.</p>

        <h2>The Bottom Line</h2>

        {/* ── For most people — flush box ── */}
        <div className="not-prose border border-white/8 bg-white/[0.015] px-6 py-5 my-8">
          <p className="text-[9px] font-heading uppercase tracking-[0.25em] text-white/20 pb-4 mb-4 border-b border-white/6">For Most People</p>
          <div className="space-y-2.5">
            {[
              "Buy low-cost, diversified index funds",
              "Invest regularly regardless of market conditions",
              "Rebalance once a year maximum",
              "Hold for decades, not days",
              "Ignore financial news and market predictions",
              "Focus on things you can control (savings rate, costs)",
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <span style={{ color: ACCENT }} className="shrink-0 mt-0.5 text-xs">✓</span>
                <p className="text-zinc-500 text-sm font-sans">{item}</p>
              </div>
            ))}
          </div>
          <p className="font-heading text-xs uppercase tracking-widest mt-5 pt-4 border-t border-white/6" style={{ color: ACCENT }}>
            This boring approach beats 90% of traders and most professional fund managers
          </p>
        </div>

        <h2>Action Steps</h2>
        <ol>
          <li>Decide: Are you an investor or do you want to trade?</li>
          <li>If investing: Set up automated monthly contributions</li>
          <li>Write down your investment plan and reasons</li>
          <li>Delete trading apps from your phone (keep investment accounts)</li>
          <li>Set a calendar reminder to check your portfolio quarterly, not daily</li>
        </ol>

        {/* ── Pull-quote ── */}
        <div className="not-prose border-y border-white/10 py-8 my-10">
          <p className="font-display text-3xl md:text-4xl text-white/70 leading-tight tracking-wide">
            "If you feel the urge to trade, use a practice account with fake money first. Most people discover they'd have been better off doing nothing."
          </p>
          <p className="text-[10px] font-heading uppercase tracking-[0.2em] mt-4" style={{ color: `${ACCENT}70` }}>
            Track your results for a year before risking real money
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
                Use our Compound Interest Calculator to see how consistent, long-term investing
                beats trying to time the market over 20–30 years.
              </p>
              <Link to="/finance/compound-interest"
                className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
                style={{ color: ACCENT, borderColor: `${ACCENT}50`, background: `${ACCENT}08` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${ACCENT}18`; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.borderColor = `${ACCENT}50`; }}>
                Try Compound Interest Calculator <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </ArticleLayout>
    </>
  );
}