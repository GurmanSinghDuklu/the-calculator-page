import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, TrendingUp, Target, Brain, Trophy } from "lucide-react";

const CheatCode01Unlocked = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has unlocked access
    const isUnlocked = localStorage.getItem("cheatcode01_unlocked");
    if (!isUnlocked) {
      navigate("/blog/cheat-code-01");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/blog/cheat-code-01")}
            className="inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white/20 text-white/40 hover:border-white hover:text-white transition-all mb-8"
          >
            ← Back to Article
          </button>

          <div className="border border-white/10 bg-white/[0.015] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <div>
                <h1 className="font-display text-4xl font-normal text-white">🔓 UNLOCKED: The Cheat Code Millionaire Formula</h1>
                <p className="text-zinc-400 text-lg font-sans mt-1">The secret strategy millionaires use — and why almost nobody talks about it</p>
              </div>
            </div>

            <article className="
              prose prose-invert max-w-none
              prose-headings:text-white
              prose-headings:font-display
              prose-headings:font-normal
              prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white prose-p:leading-relaxed prose-p:font-sans
              prose-li:text-white prose-li:font-sans
              prose-ul:text-white
              prose-ol:text-white
              prose-strong:text-white
              prose-em:text-white
              prose-a:text-white prose-a:underline prose-a:underline-offset-2
              hover:prose-a:text-white/70
              prose-blockquote:text-white prose-blockquote:border-white/20
              prose-code:text-white prose-code:bg-white/5
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/8
              prose-hr:border-white/10
              [&_*]:text-white
            ">
              <p className="text-lg">
                Congratulations — you've unlocked the page that most people <strong>never</strong> reach.
                This is <em>the real cheat code</em>: the formula that separates everyday investors from those who quietly stack wealth into seven figures and beyond.
              </p>

              <p>
                Most people think getting to £1 million is just about "invest consistently" and "let compounding do its job."
              </p>

              <p>That's true…<br />But it's <strong>not</strong> the whole story.</p>

              <p>Millionaires — especially self-made investors — follow a deeper, quieter system.</p>

              <p>They use:</p>
              <ul>
                <li>✔ <strong>Compounding</strong></li>
                <li>✔ <strong>Low-cost index investing</strong></li>
                <li>✔ <strong>DCA (Dollar-Cost Averaging)</strong></li>
                <li>✔ <strong>Automatic investing habits</strong></li>
              </ul>

              <p>…but <strong>also</strong> something far more powerful.</p>

              <p>
                This secret is why Warren Buffett went from selling chewing gum door-to-door to becoming the <strong>richest investor in the world</strong>.
              </p>

              <p className="text-2xl font-bold text-primary">This is the <em>Cheat Code</em>.</p>

              <div className="border border-white/10 bg-white/[0.015] p-6 my-8">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-white/60" />
                  <h2 className="text-3xl font-bold m-0 text-white">💡 The Cheat Code Secret: Run Two Portfolios — Not One</h2>
                </div>
              </div>

              <p>Most investors do this wrong…</p>

              <p>They put <strong>all</strong> their money into one single strategy:</p>

              <h3>❌ Either</h3>
              <ul>
                <li>invest monthly (DCA),</li>
                <li>or wait for big stock market crashes.</li>
              </ul>

              <p>But the wealthy?<br />They combine <strong>both</strong>.</p>

              <div className="border border-white/10 bg-white/[0.015] p-6 my-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-white/60" />
                  <h3 className="m-0 text-white">✔ Portfolio 1: Your Automatic Wealth Engine (DCA)</h3>
                </div>
                <p>You invest every month, consistently, no matter what.<br />
                Example: £300/month in a global index fund (VWRP/Vanguard FTSE Global All Cap / MSCI World).</p>

                <p><strong>This works because:</strong></p>
                <ul>
                  <li>It removes emotion</li>
                  <li>It buys more shares during downturns</li>
                  <li>It compounds quietly in the background</li>
                  <li>It smooths your entry price</li>
                </ul>

                <p>This is the engine that <em>guarantees</em> progress.</p>
              </div>

              <p>But here's where the magic happens…</p>

              <div className="border border-white/10 bg-white/[0.015] p-6 my-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-6 w-6 text-white/60" />
                  <h3 className="m-0 text-white">✔ Portfolio 2: Your Opportunistic "Crash Fund" (The Insider Method)</h3>
                </div>
                <p>This is the part nobody teaches.<br />
                This is what insiders call <strong>"dry powder"</strong> — cash intentionally kept waiting for crashes.</p>

                <p>Millionaires keep <strong>10–20%</strong> of their investable money <em>off to the side</em>.</p>

                <p>Not because they're scared.<br />
                Not because they're waiting for the "perfect time."</p>

                <p>But because they are preparing for the moment <strong>everyone else panics</strong>.</p>

                <p>When the stock market drops 20%, 30%, 40%…<br />
                They strike with terrifying precision.</p>

                <p>They buy:</p>
                <ul>
                  <li>Global equity index funds</li>
                  <li>Accumulating ETFs</li>
                  <li>High-quality companies</li>
                  <li>Broad market trackers</li>
                </ul>

                <p>These moments, though rare, accelerate wealth like nothing else.</p>

                <blockquote className="border-l-4 border-white/20 pl-4 italic text-lg text-white">
                  <strong>Warren Buffett famously said:</strong><br />
                  "Be fearful when others are greedy, and greedy when others are fearful."
                </blockquote>

                <p>This is what he means.<br />
                This is why he wins.</p>

                <p>Most people can't do this because:</p>
                <ul>
                  <li>they panic</li>
                  <li>they sell</li>
                  <li>or they have <em>no cash on the sidelines</em> to take advantage of the opportunity</li>
                </ul>

                <p><strong>But you will.</strong></p>
              </div>

              <div className="border border-white/10 bg-white/[0.015] p-6 my-8">
                <h2 className="text-3xl font-bold mb-4 text-white">🔥 Why This Two-Portfolio System Is the Millionaire Formula</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">1. DCA builds wealth automatically (slow + steady + guaranteed).</h3>
                    <p className="text-white">It removes guesswork and fear.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">2. The Crash Fund accelerates wealth (fast + aggressive + opportunistic).</h3>
                    <p className="text-white">It turns crashes into jackpots.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">3. Together? This is the highest-performing strategy normal people can actually stick to.</h3>
                    <p className="text-white">Professional investors know this.<br />
                    Hedge funds know this.<br />
                    Buffett uses this.<br />
                    Venture capital firms use this.</p>
                    <p className="text-white">But retail investors?<br />
                    They are taught <em>only</em> the safe half of the system.</p>
                    <p className="font-bold text-white">This is why the gap between average and wealthy keeps widening.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold">📈 Example: How this cheat code gets you to £1 million faster</h2>

              <p>Let's compare:</p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="border border-white/10 bg-white/[0.015] p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Scenario A — Only DCA</h3>
                  <p className="text-lg text-white">£300/month at 8% return<br />
                  = <strong>£1,000,000 in ~39 years</strong></p>
                  <p className="text-zinc-400">Good — but not life-changing.</p>
                </div>

                <div className="border border-white/10 bg-white/[0.015] p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Scenario B — DCA + Crash Fund (The Cheat Code)</h3>
                  <p className="text-white">You still invest £300/month…</p>
                  <p className="text-white"><strong>BUT you also:</strong></p>
                  <ul className="text-sm text-white">
                    <li>save £50–100/month into your Crash Fund</li>
                    <li>wait for a 20–40% market crash</li>
                    <li>deploy £5k / £10k / £20k at once</li>
                  </ul>
                  <p className="font-bold text-white">This can wipe off 5–10 years!</p>
                </div>
              </div>

              <p>A single £10,000 investment during a 40% crash — if it later rebounds 70–100% — can shave <strong>years</strong> off your journey to £1M.</p>

              <p>Two or three well-timed crash deployments?<br />
              You can reach £1 million <strong>a decade sooner</strong>.</p>

              <blockquote className="border-l-4 border-white/20 pl-4 italic text-lg my-6 text-white">
                This is why insiders say:<br />
                <strong>"The big money is made in the crashes, not the calm periods."</strong>
              </blockquote>

              <div className="border border-white/10 bg-white/[0.015] p-6 my-8">
                <h2 className="text-3xl font-bold mb-4 text-white">🧠 The Psychological Edge: Why Almost Nobody Does This</h2>
                
                <p className="text-white"><strong>Most investors:</strong></p>
                <ul className="text-white">
                  <li>panic sell in crashes</li>
                  <li>have no spare cash</li>
                  <li>stop investing</li>
                  <li>read the news instead of staying rational</li>
                  <li>freeze when prices drop</li>
                </ul>

                <p className="font-bold text-white text-xl mt-4">The Cheat Code solves this.</p>

                <p className="text-white"><strong>You:</strong></p>
                <ul className="text-white">
                  <li>✔ keep investing automatically (so you never stop growing)</li>
                  <li>✔ keep cash ready (so you never fear crashes again)</li>
                  <li>✔ expect downturns (so you feel excitement instead of panic)</li>
                </ul>

                <p className="font-bold text-white">This mindset alone puts you in the top 1% of retail investors.</p>
              </div>

              <div className="border border-white/10 bg-white/[0.015] p-8 my-8">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="h-10 w-10 text-white/60" />
                  <h2 className="text-3xl font-bold m-0 text-white">💎 The Winning Formula Millionaires Use</h2>
                </div>

                <p className="text-lg mb-6 text-white">To summarise the Cheat Code:</p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-white">1️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0 text-white">Always DCA monthly into a global equity index</h3>
                      <p className="text-white">Let compounding do the heavy lifting.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-white">2️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0 text-white">Keep 10–20% of your money as "dry powder"</h3>
                      <p className="text-white">A small holding of cash waiting for opportunity.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-white">3️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0 text-white">Deploy that Crash Fund during major dips</h3>
                      <p className="text-white">20% dip? Small buy.<br />
                      30% dip? Bigger buy.<br />
                      40%+ crash? Back the truck up.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-white">4️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0 text-white">Buy ACC funds instead of INC funds</h3>
                      <p className="text-white">Automatic reinvestment = faster compounding.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-white">5️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0 text-white">Stay invested for decades</h3>
                      <p className="text-white">Time &gt; timing.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-white">6️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0 text-white">Never panic sell</h3>
                      <p className="text-white">Volatility is not the enemy.<br />
                      Emotion is.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 bg-white/[0.015] p-8 my-8">
                <h2 className="text-3xl font-bold mb-4 text-white">🏆 Why This Is THE Secret Insiders Won't Say Out Loud</h2>

                <p className="text-white"><strong>Because it requires:</strong></p>
                <ul className="text-white">
                  <li>✔ discipline</li>
                  <li>✔ emotional control</li>
                  <li>✔ cash management</li>
                  <li>✔ patience</li>
                  <li>✔ courage in crashes</li>
                </ul>

                <p className="text-lg mt-4 text-white">And most people simply cannot do it.</p>

                <p className="text-xl font-bold text-white mt-6">But those who do?</p>

                <p className="text-lg text-white">
                  They build <strong>quiet wealth</strong>.<br />
                  They don't brag.<br />
                  They don't trade daily.<br />
                  They don't chase crypto hype.
                </p>

                <p className="text-lg mt-4 text-white">
                  They follow the formula that works.<br />
                  The formula you just unlocked.
                </p>

                <p className="text-2xl font-bold text-white mt-6">
                  This is the millionaire's path.<br />
                  This is your path now!
                </p>
              </div>
            </article>

            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <button
                onClick={() => navigate("/blog/cheat-code-01")}
                className="inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white bg-white text-black hover:bg-white/80 transition-all"
              >
                Back to Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheatCode01Unlocked;
