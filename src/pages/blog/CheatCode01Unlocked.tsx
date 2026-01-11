import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog/cheat-code-01")}
            className="mb-6"
          >
            ← Back to Article
          </Button>

          <Card className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <div>
                <h1 className="text-4xl font-bold">🔓 UNLOCKED: The Cheat Code Millionaire Formula</h1>
                <p className="text-muted-foreground text-lg">The secret strategy millionaires use — and why almost nobody talks about it</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
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

              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-6 rounded-lg my-8">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold m-0">💡 The Cheat Code Secret: Run Two Portfolios — Not One</h2>
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

              <div className="bg-card p-6 rounded-lg border-2 border-primary/20 my-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  <h3 className="m-0">✔ Portfolio 1: Your Automatic Wealth Engine (DCA)</h3>
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

              <div className="bg-card p-6 rounded-lg border-2 border-accent/20 my-8">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-6 w-6 text-accent" />
                  <h3 className="m-0">✔ Portfolio 2: Your Opportunistic "Crash Fund" (The Insider Method)</h3>
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

                <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
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

              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-6 rounded-lg my-8">
                <h2 className="text-3xl font-bold mb-4">🔥 Why This Two-Portfolio System Is the Millionaire Formula</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">1. DCA builds wealth automatically (slow + steady + guaranteed).</h3>
                    <p>It removes guesswork and fear.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">2. The Crash Fund accelerates wealth (fast + aggressive + opportunistic).</h3>
                    <p>It turns crashes into jackpots.</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">3. Together? This is the highest-performing strategy normal people can actually stick to.</h3>
                    <p>Professional investors know this.<br />
                    Hedge funds know this.<br />
                    Buffett uses this.<br />
                    Venture capital firms use this.</p>
                    <p>But retail investors?<br />
                    They are taught <em>only</em> the safe half of the system.</p>
                    <p className="font-bold">This is why the gap between average and wealthy keeps widening.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold">📈 Example: How this cheat code gets you to £1 million faster</h2>

              <p>Let's compare:</p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <Card className="p-6 bg-muted">
                  <h3 className="text-xl font-bold mb-2">Scenario A — Only DCA</h3>
                  <p className="text-lg">£300/month at 8% return<br />
                  = <strong>£1,000,000 in ~39 years</strong></p>
                  <p className="text-muted-foreground">Good — but not life-changing.</p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary">
                  <h3 className="text-xl font-bold mb-2">Scenario B — DCA + Crash Fund (The Cheat Code)</h3>
                  <p>You still invest £300/month…</p>
                  <p><strong>BUT you also:</strong></p>
                  <ul className="text-sm">
                    <li>save £50–100/month into your Crash Fund</li>
                    <li>wait for a 20–40% market crash</li>
                    <li>deploy £5k / £10k / £20k at once</li>
                  </ul>
                  <p className="font-bold text-primary">This can wipe off 5–10 years!</p>
                </Card>
              </div>

              <p>A single £10,000 investment during a 40% crash — if it later rebounds 70–100% — can shave <strong>years</strong> off your journey to £1M.</p>

              <p>Two or three well-timed crash deployments?<br />
              You can reach £1 million <strong>a decade sooner</strong>.</p>

              <blockquote className="border-l-4 border-primary pl-4 italic text-lg my-6">
                This is why insiders say:<br />
                <strong>"The big money is made in the crashes, not the calm periods."</strong>
              </blockquote>

              <div className="bg-card p-6 rounded-lg border-2 border-border my-8">
                <h2 className="text-3xl font-bold mb-4">🧠 The Psychological Edge: Why Almost Nobody Does This</h2>
                
                <p><strong>Most investors:</strong></p>
                <ul>
                  <li>panic sell in crashes</li>
                  <li>have no spare cash</li>
                  <li>stop investing</li>
                  <li>read the news instead of staying rational</li>
                  <li>freeze when prices drop</li>
                </ul>

                <p className="font-bold text-primary text-xl mt-4">The Cheat Code solves this.</p>

                <p><strong>You:</strong></p>
                <ul>
                  <li>✔ keep investing automatically (so you never stop growing)</li>
                  <li>✔ keep cash ready (so you never fear crashes again)</li>
                  <li>✔ expect downturns (so you feel excitement instead of panic)</li>
                </ul>

                <p className="font-bold">This mindset alone puts you in the top 1% of retail investors.</p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-8 rounded-lg my-8">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="h-10 w-10 text-primary" />
                  <h2 className="text-3xl font-bold m-0">💎 The Winning Formula Millionaires Use</h2>
                </div>
                
                <p className="text-lg mb-6">To summarise the Cheat Code:</p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-primary">1️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0">Always DCA monthly into a global equity index</h3>
                      <p>Let compounding do the heavy lifting.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-primary">2️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0">Keep 10–20% of your money as "dry powder"</h3>
                      <p>A small holding of cash waiting for opportunity.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-primary">3️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0">Deploy that Crash Fund during major dips</h3>
                      <p>20% dip? Small buy.<br />
                      30% dip? Bigger buy.<br />
                      40%+ crash? Back the truck up.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-primary">4️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0">Buy ACC funds instead of INC funds</h3>
                      <p>Automatic reinvestment = faster compounding.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-primary">5️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0">Stay invested for decades</h3>
                      <p>Time &gt; timing.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-2xl font-bold text-primary">6️⃣</span>
                    <div>
                      <h3 className="text-xl font-bold m-0">Never panic sell</h3>
                      <p>Volatility is not the enemy.<br />
                      Emotion is.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-lg border-2 border-primary my-8">
                <h2 className="text-3xl font-bold mb-4">🏆 Why This Is THE Secret Insiders Won't Say Out Loud</h2>
                
                <p><strong>Because it requires:</strong></p>
                <ul>
                  <li>✔ discipline</li>
                  <li>✔ emotional control</li>
                  <li>✔ cash management</li>
                  <li>✔ patience</li>
                  <li>✔ courage in crashes</li>
                </ul>

                <p className="text-lg mt-4">And most people simply cannot do it.</p>

                <p className="text-xl font-bold text-primary mt-6">But those who do?</p>

                <p className="text-lg">
                  They build <strong>quiet wealth</strong>.<br />
                  They don't brag.<br />
                  They don't trade daily.<br />
                  They don't chase crypto hype.
                </p>

                <p className="text-lg mt-4">
                  They follow the formula that works.<br />
                  The formula you just unlocked.
                </p>

                <p className="text-2xl font-bold text-primary mt-6">
                  This is the millionaire's path.<br />
                  This is your path now!
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <Button
                size="lg"
                onClick={() => navigate("/blog/cheat-code-01")}
              >
                Back to Article
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheatCode01Unlocked;
