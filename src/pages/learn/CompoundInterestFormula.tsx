import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Info, AlertTriangle, Zap, Clock } from "lucide-react";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

const ACCENT = "#3B82F6";

const faqSchema = [
  {
    question: "What is the compound interest formula?",
    answer: "The compound interest formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is time in years. To find only the interest earned, use I = P(1 + r/n)^(nt) - P.",
  },
  {
    question: "What is continuous compounding and how does it apply to crypto?",
    answer: "Continuous compounding uses the formula A = Pe^(rt), where e is Euler's number (~2.71828). It represents the theoretical maximum return when interest is compounded at every infinitesimal moment. Crypto markets trade 24/7/365, making daily or even more frequent compounding the practical reality for DeFi yield products, perpetual funding rates, and staking rewards — far closer to continuous compounding than traditional monthly or annual bank interest.",
  },
  {
    question: "What is Dollar Cost Averaging (DCA) and how does compounding apply to it?",
    answer: "Dollar Cost Averaging (DCA) is the strategy of investing a fixed amount at regular intervals regardless of price — for example, £50 into Bitcoin every week. Because you buy more units when prices are low and fewer when prices are high, DCA reduces the impact of volatility on your average cost. When the assets you're accumulating through DCA also generate yield (staking, dividends), the compounding effect applies to each tranche independently from its entry date.",
  },
  {
    question: "How does inflation affect compound interest returns?",
    answer: "Inflation erodes the purchasing power of your nominal returns. The real return formula is: Real Rate = [(1 + Nominal Rate) / (1 + Inflation Rate)] - 1. For example, a 6% nominal return during 4% inflation gives a real return of only 1.92%. Since 2021, UK and US inflation reached 10%+, meaning many savings accounts with sub-2% rates delivered deeply negative real returns. Always assess investments on real returns, not nominal.",
  },
  {
    question: "How much does compounding frequency actually matter?",
    answer: "The difference between annual and daily compounding is smaller than most people expect for moderate rates. At 5% annual rate on £10,000 over 20 years: annual compounding gives £26,533, while daily compounding gives £27,182 — a difference of £649. At higher rates (10%+), the frequency gap widens significantly. For crypto staking yields of 10–20% APY, daily compounding can add thousands versus annual.",
  },
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a shortcut to estimate how long it takes for an investment to double at a given compound interest rate. Simply divide 72 by the annual interest rate. At 6% per year, money doubles in approximately 72/6 = 12 years. At 10%, it doubles in about 7.2 years. The rule works best for rates between 5% and 15%.",
  },
  {
    question: "What is the difference between APR and APY / AER?",
    answer: "APR (Annual Percentage Rate) is the stated interest rate without accounting for compounding within the year. APY (Annual Percentage Yield) — called AER (Annual Equivalent Rate) in the UK — reflects the actual return after intra-year compounding. A savings account paying 5% APR compounded monthly has an AER of 5.12%. When comparing savings products, always compare AER, not APR.",
  },
  {
    question: "Did Einstein really call compound interest the eighth wonder of the world?",
    answer: "No verified source exists for this quote. It does not appear in any of Einstein's published works, letters, or documented interviews. The attribution appears to have emerged in the mid-20th century and spread through financial marketing. The quote itself may be much older — versions of the sentiment appear in 18th-century merchant writings. The maths, however, is genuinely powerful regardless of who said it.",
  },
];

// ─── Formula block component ──────────────────────────────────────────────────
function Formula({ children, label }: { children: string; label?: string }) {
  return (
    <div className="not-prose my-6">
      {label && <p className="font-heading text-[9px] uppercase tracking-widest text-white/30 mb-2">{label}</p>}
      <div className="bg-black/40 border border-white/10 rounded-xl px-6 py-5 font-mono text-lg md:text-xl text-white/90 text-center tracking-wide overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

// ─── Data table component ─────────────────────────────────────────────────────
function DataTable({ headers, rows, highlight }: {
  headers: string[];
  rows: (string | number)[][];
  highlight?: number;
}) {
  return (
    <div className="not-prose overflow-x-auto rounded-xl border border-dark-border my-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-dark-card border-b border-dark-border">
            {headers.map(h => (
              <th key={h} className="text-left px-4 py-3 font-heading text-[9px] uppercase tracking-widest text-white/40">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dark-border">
          {rows.map((row, i) => (
            <tr key={i} className={i === highlight ? "bg-blue-500/10" : i % 2 === 0 ? "bg-dark-bg" : "bg-dark-card/30"}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 font-sans text-xs ${j === 0 ? "text-white/60" : "text-white/80"} ${i === highlight ? "font-semibold" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Callout component ────────────────────────────────────────────────────────
function Callout({ type = "info", title, children }: {
  type?: "info" | "warning" | "key";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info:    { border: "border-blue-500/20",   bg: "bg-blue-500/5",   icon: <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />,    titleColor: "text-blue-400" },
    warning: { border: "border-orange-500/20", bg: "bg-orange-500/5", icon: <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />, titleColor: "text-orange-400" },
    key:     { border: "border-green-500/20",  bg: "bg-green-500/5",  icon: <Zap className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />,    titleColor: "text-green-400" },
  };
  const s = styles[type];
  return (
    <div className={`not-prose flex gap-3 p-5 rounded-xl border ${s.border} ${s.bg} my-6`}>
      {s.icon}
      <div>
        {title && <p className={`font-heading text-xs uppercase tracking-wide mb-1.5 ${s.titleColor}`}>{title}</p>}
        <div className="font-sans text-sm text-white/65 leading-relaxed space-y-1">{children}</div>
      </div>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mt-16 mb-6 scroll-mt-8">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-base text-white uppercase tracking-wide mt-8 mb-4">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-sm md:text-base text-white/65 leading-relaxed mb-4">{children}</p>;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CompoundInterestFormula() {
  return (
    <>
      <SEO
        title="Compound Interest Formula: The Complete 2026 Guide — Crypto, DCA, Inflation & Modern Investing"
        description="The most comprehensive free guide to compound interest formulas. Covers A=P(1+r/n)^nt, continuous compounding, the crypto compounding revolution, Dollar Cost Averaging, inflation-adjusted real returns, the Rule of 72, APR vs AER, and worked examples with every formula. Updated 2026."
        keywords="compound interest formula, compound interest formula explained, continuous compounding formula, crypto compounding, DCA compound interest, dollar cost averaging compound interest, inflation adjusted returns compound interest, compound interest calculator, APY vs APR, AER explained, rule of 72, compound interest formula with examples, compound interest 2026"
        canonicalUrl="/learn/compound-interest-formula"
        faqSchema={faqSchema}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Compound Interest Formula: The Complete 2026 Guide",
          "description": "The most comprehensive free guide to compound interest formulas covering traditional finance, crypto compounding, DCA, inflation-adjusted returns, and modern retail investing.",
          "author": { "@type": "Organization", "name": "The Calculator App Editorial Team" },
          "publisher": { "@type": "Organization", "name": "The Calculator App", "url": "https://www.thecalculatorapp.org" },
          "datePublished": "2026-06-08",
          "dateModified": "2026-06-08",
          "url": "https://www.thecalculatorapp.org/learn/compound-interest-formula",
          "mainEntityOfPage": "https://www.thecalculatorapp.org/learn/compound-interest-formula",
          "about": [
            { "@type": "Thing", "name": "Compound interest" },
            { "@type": "Thing", "name": "Dollar cost averaging" },
            { "@type": "Thing", "name": "Cryptocurrency investment" },
            { "@type": "Thing", "name": "Inflation" },
          ],
        }}
      />

      <div className="bg-dark-bg text-white min-h-screen font-sans">

        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/learn" className="hover:text-white transition-colors">Learn</Link>
            <span>/</span>
            <span className="text-white/60">Compound Interest Formula</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-12 border-b border-dark-border">
          <div className="flex flex-wrap gap-2 mb-6">
            {["Finance", "Investing", "Crypto", "2026"].map(tag => (
              <span key={tag} className="text-[9px] font-heading uppercase tracking-widest px-2.5 py-1 rounded border border-dark-border text-white/30">{tag}</span>
            ))}
            <span className="text-[9px] font-heading uppercase tracking-widest px-2.5 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400">Updated June 2026</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-none tracking-wide mb-6 uppercase">
            Compound Interest Formula
            <span className="block text-2xl md:text-3xl mt-3 font-sans font-normal normal-case text-white/50">
              The complete guide: from A = P(1+r/n)^nt to crypto staking, DCA, and inflation-adjusted returns
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 text-xs font-sans text-white/40 mb-8">
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 25–35 min read</span>
            <span>By The Calculator App Editorial Team</span>
            <span>Published June 2026</span>
          </div>

          <p className="font-sans text-base md:text-lg text-white/65 leading-relaxed max-w-3xl mb-8">
            Compound interest is the single most powerful mathematical force in personal finance. This guide covers every formula from first principles — the standard compound interest equation, monthly contribution variants, continuous compounding, and the modern dimensions that have transformed how ordinary people interact with compounding since 2018: 24/7 crypto markets, Dollar Cost Averaging, the retail investing revolution, and the inflation reality that has fundamentally changed what returns actually mean.
          </p>

          {/* Table of contents */}
          <div className="p-5 bg-dark-card border border-dark-border rounded-xl">
            <p className="font-heading text-[9px] uppercase tracking-widest text-white/30 mb-4">Contents</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                ["#core-formula", "1. The Core Formula: A = P(1+r/n)^nt"],
                ["#interest-formula", "2. Isolating Interest: I = P(1+r/n)^nt - P"],
                ["#frequency", "3. Compounding Frequency — Does It Actually Matter?"],
                ["#continuous", "4. Continuous Compounding: A = Pe^rt"],
                ["#rule-of-72", "5. The Rule of 72"],
                ["#contributions", "6. Regular Contributions Formula"],
                ["#crypto", "7. The Crypto Compounding Revolution"],
                ["#dca", "8. Dollar Cost Averaging and Compounding"],
                ["#retail", "9. The Retail Investor Revolution"],
                ["#inflation", "10. Inflation-Adjusted Real Returns"],
                ["#apr-aer", "11. APR vs AER — What You're Actually Being Paid"],
                ["#history", "12. Historical Origins"],
                ["#mistakes", "13. Common Mistakes and Misconceptions"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="flex items-center gap-2 font-sans text-xs text-white/45 hover:text-white transition-colors py-0.5">
                  <ArrowRight className="w-2.5 h-2.5 flex-shrink-0 text-blue-400" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-2">

          {/* ── SECTION 1 ── */}
          <H2 id="core-formula">1. The Core Formula: A = P(1 + r/n)^nt</H2>

          <P>
            Compound interest is interest calculated on the initial principal <em>and</em> on the interest already accumulated. This self-referential growth — interest earning interest — is what distinguishes it from simple interest, and what makes it so powerful over long time horizons.
          </P>

          <Formula label="Standard compound interest formula">
            A = P × (1 + r/n)^(nt)
          </Formula>

          <P>Each variable defined precisely:</P>

          <DataTable
            headers={["Variable", "Meaning", "Example"]}
            rows={[
              ["A", "Final amount (principal + interest)", "£33,102"],
              ["P", "Principal — the initial amount invested", "£10,000"],
              ["r", "Annual interest rate as a decimal (not %)", "0.06 (i.e. 6%)"],
              ["n", "Number of compounding periods per year", "12 (monthly)"],
              ["t", "Time in years", "20"],
            ]}
          />

          <H3>Worked Example</H3>
          <P>
            You invest <strong className="text-white">£10,000</strong> at <strong className="text-white">6% annual interest</strong>, compounded <strong className="text-white">monthly</strong>, for <strong className="text-white">20 years</strong>.
          </P>

          <Formula label="Step 1: substitute values">
            A = 10,000 × (1 + 0.06/12)^(12×20)
          </Formula>
          <Formula label="Step 2: simplify inside the brackets">
            A = 10,000 × (1.005)^240
          </Formula>
          <Formula label="Step 3: calculate the exponent">
            A = 10,000 × 3.3102
          </Formula>
          <Formula label="Final result">
            A = £33,102.04
          </Formula>

          <P>
            Your £10,000 has grown to £33,102 — the £23,102 in growth is entirely compound interest. If the same sum had earned <em>simple</em> interest at 6% annually, you would have only £22,000 after 20 years. The difference of £11,102 is compounding at work.
          </P>

          <Callout type="key" title="BODMAS / PEMDAS Order of Operations">
            <p>Always work inside brackets first, then apply the exponent (the power), then multiply. A common mistake is adding r/n to 1 before applying the exponent — which is correct — but then forgetting to multiply the result by P at the end.</p>
          </Callout>

          {/* ── SECTION 2 ── */}
          <H2 id="interest-formula">2. Isolating Interest: I = P(1 + r/n)^nt − P</H2>

          <P>
            The standard formula gives you the <em>total</em> final amount A, which includes the original principal. To find only the interest earned, subtract the principal:
          </P>

          <Formula label="Compound interest earned">
            I = P(1 + r/n)^(nt) − P
          </Formula>

          <P>
            Using the same example above: I = £33,102.04 − £10,000 = <strong className="text-white">£23,102.04</strong> earned in interest over 20 years.
          </P>

          <P>
            This formula matters because it answers a different question than the total-amount formula. An investor asking "how much have I made?" needs this version, not the total. A lender assessing how much interest they will collect needs this version. It is also the formula used as the mathematical basis for the compound interest entry on Wikipedia's references — the interest-only derivation that isolates the growth component from the original capital.
          </P>

          <H3>Compounding Period Shorthand Variants</H3>

          <DataTable
            headers={["Frequency", "n value", "Formula shorthand"]}
            rows={[
              ["Annually", "1",   "A = P(1 + r)^t"],
              ["Semi-annually", "2", "A = P(1 + r/2)^(2t)"],
              ["Quarterly", "4",  "A = P(1 + r/4)^(4t)"],
              ["Monthly", "12",   "A = P(1 + r/12)^(12t)"],
              ["Weekly", "52",    "A = P(1 + r/52)^(52t)"],
              ["Daily", "365",    "A = P(1 + r/365)^(365t)"],
              ["Continuous", "∞", "A = Pe^(rt)"],
            ]}
          />

          {/* ── SECTION 3 ── */}
          <H2 id="frequency">3. Compounding Frequency — Does It Actually Matter?</H2>

          <P>
            One of the most persistently misunderstood aspects of compound interest is how much compounding frequency actually changes outcomes. The honest answer: at modest interest rates, less than most people assume. At high rates — like the yields offered in DeFi and crypto staking — the difference becomes meaningful.
          </P>

          <P>
            Here is <strong className="text-white">£10,000 invested at 5% for 20 years</strong> across every major compounding frequency:
          </P>

          <DataTable
            headers={["Frequency", "Final Amount", "Interest Earned", "vs Annual"]}
            rows={[
              ["Annual",       "£26,532.98", "£16,532.98", "—"],
              ["Semi-annual",  "£26,685.64", "£16,685.64", "+£152.66"],
              ["Quarterly",    "£26,850.64", "£16,850.64", "+£317.66"],
              ["Monthly",      "£26,916.32", "£16,916.32", "+£383.34"],
              ["Weekly",       "£26,929.56", "£16,929.56", "+£396.58"],
              ["Daily",        "£27,180.96", "£17,180.96", "+£648.00"],
              ["Continuous",   "£27,182.82", "£17,182.82", "+£649.84"],
            ]}
            highlight={5}
          />

          <P>
            The full range from annual to continuous compounding at 5% over 20 years is just <strong className="text-white">£649.84</strong> — less than 2.5% extra. For the average saver with a high-street account, chasing daily vs monthly compounding is not where the meaningful gains lie.
          </P>

          <P>
            Now watch what happens at <strong className="text-white">15% annual rate</strong> (representative of some crypto staking yields in 2023–2024):
          </P>

          <DataTable
            headers={["Frequency", "Final Amount at 15% / 20 years", "vs Annual"]}
            rows={[
              ["Annual",     "£163,665.37", "—"],
              ["Monthly",    "£180,454.87", "+£16,789.50"],
              ["Daily",      "£182,193.72", "+£18,528.35"],
              ["Continuous", "£182,211.88", "+£18,546.51"],
            ]}
          />

          <P>
            At higher rates, the compounding frequency gap widens dramatically. The same £10,000 at 15% earns over <strong className="text-white">£18,500 more</strong> with daily versus annual compounding over 20 years. This is why compounding frequency matters enormously in high-yield environments — and why crypto platforms competing on APY are competing on frequency as much as rate.
          </P>

          {/* ── SECTION 4 ── */}
          <H2 id="continuous">4. Continuous Compounding: A = Pe^rt</H2>

          <P>
            Continuous compounding is the mathematical limit of the standard formula as n approaches infinity — when interest is compounded not monthly, not daily, but at every infinitesimal instant. It uses Euler's number <em>e</em> (~2.71828), one of mathematics' fundamental constants.
          </P>

          <Formula label="Continuous compounding formula">
            A = P × e^(rt)
          </Formula>

          <P>
            Where e ≈ 2.71828, r is the annual rate, and t is time in years.
          </P>

          <H3>Where Does e Come From?</H3>
          <P>
            In 1683, Swiss mathematician Jacob Bernoulli was studying compound interest and asked: what happens to (1 + 1/n)^n as n grows without bound? He discovered that the sequence converges on a specific constant — what we now call e. The connection between compound interest and one of mathematics' most important constants is not coincidental. Bernoulli was literally working out what happens when you compound continuously.
          </P>

          <Formula label="Bernoulli's discovery — the definition of e">
            e = lim(n→∞) (1 + 1/n)^n ≈ 2.71828...
          </Formula>

          <H3>Worked Example</H3>
          <P>
            £10,000 at 6% continuously compounded for 20 years:
          </P>
          <Formula>A = 10,000 × e^(0.06 × 20) = 10,000 × e^1.2 = 10,000 × 3.3201 = £33,201</Formula>

          <P>
            Compare to monthly compounding (£33,102) — the difference is just £99. Continuous compounding represents the theoretical ceiling, not a practically available product in traditional banking. In crypto and DeFi, however, it becomes directly relevant.
          </P>

          <Callout type="info" title="Continuous Compounding in the Real World">
            <p>No traditional savings account compounds continuously. But this formula underpins option pricing (the Black-Scholes model), bond yield mathematics, and the pricing of perpetual financial instruments. In crypto, DeFi protocols that rebalance yield positions every block (~12 seconds on Ethereum) are closer to continuous compounding than anything in traditional finance.</p>
          </Callout>

          {/* ── SECTION 5 ── */}
          <H2 id="rule-of-72">5. The Rule of 72</H2>

          <P>
            The Rule of 72 is a mental arithmetic shortcut that estimates how long it takes for money to double at a given compound interest rate. Divide 72 by the annual rate and you get the approximate doubling time in years.
          </P>

          <Formula label="Rule of 72">
            Years to double ≈ 72 / Annual Interest Rate (%)
          </Formula>

          <DataTable
            headers={["Annual Rate", "Approx. Doubling Time", "Real Doubling Time (exact)"]}
            rows={[
              ["2%",  "36 years",  "35.0 years"],
              ["4%",  "18 years",  "17.7 years"],
              ["6%",  "12 years",  "11.9 years"],
              ["8%",  "9 years",   "9.0 years"],
              ["10%", "7.2 years", "7.3 years"],
              ["12%", "6 years",   "6.1 years"],
              ["18%", "4 years",   "4.2 years"],
              ["24%", "3 years",   "3.2 years"],
            ]}
          />

          <P>
            The rule breaks down at very high rates (above 30%) but is remarkably accurate for the 5–15% range covering most savings accounts, equity markets, and moderate crypto staking yields.
          </P>

          <Callout type="key" title="The Rule of 72 Applied to Inflation">
            <p>The Rule of 72 works equally well in reverse — to calculate how quickly inflation halves the purchasing power of cash. At 7% inflation (UK peak in 2022–2023), money in a non-interest-bearing account loses half its real value in approximately 72/7 = 10.3 years. This is why holding large cash balances during inflationary periods destroys wealth.</p>
          </Callout>

          {/* ── SECTION 6 ── */}
          <H2 id="contributions">6. Regular Contributions Formula</H2>

          <P>
            Most real-world investors do not make a single lump sum and walk away. They invest regularly — monthly pension contributions, weekly DCA into Bitcoin, quarterly ISA top-ups. The future value of a series of regular contributions uses the following formula:
          </P>

          <Formula label="Future value with regular end-of-period contributions">
            FV = P(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) - 1) / (r/n)]
          </Formula>

          <P>
            If contributions are made at the <em>beginning</em> of each period (annuity-due), multiply the contribution portion by (1 + r/n):
          </P>

          <Formula label="Future value with regular start-of-period contributions">
            FV = P(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) - 1) / (r/n)] × (1 + r/n)
          </Formula>

          <P>Where PMT is the regular payment amount per period.</P>

          <H3>Worked Example — ISA Monthly Savings</H3>
          <P>
            You open a Stocks & Shares ISA with <strong className="text-white">£1,000 initial deposit</strong>, contribute <strong className="text-white">£200/month</strong>, and achieve <strong className="text-white">7% average annual return</strong> over <strong className="text-white">25 years</strong>.
          </P>

          <DataTable
            headers={["Component", "Value"]}
            rows={[
              ["Initial deposit grown at 7%/25yr", "£5,427"],
              ["Monthly contributions (£200/mo × 25yr = £60,000 total invested)", "£155,729"],
              ["Total portfolio value", "£161,156"],
              ["Total invested (capital)", "£61,000"],
              ["Total growth from compounding", "£100,156"],
            ]}
            highlight={4}
          />

          <P>
            You invested £61,000 of your own money. Compound growth added over <strong className="text-white">£100,000</strong> on top — more than your own contributions. This is the core argument for starting early and contributing regularly: time is worth more than contribution size.
          </P>

          <Callout type="key" title="Start Early — The Numbers Are Stark">
            <p>Investor A starts at 25, contributes £200/month for 10 years (£24,000 total) then stops. At 7% compounding to age 65, they have approximately £228,000.</p>
            <p className="mt-2">Investor B starts at 35, contributes £200/month for 30 years (£72,000 total) and keeps going. At 65, they have approximately £243,000.</p>
            <p className="mt-2">Investor A contributed £48,000 less and finished at almost the same amount. The 10-year head start was worth more than 30 years of extra contributions. This is compounding time in practice.</p>
          </Callout>

          {/* ── SECTION 7 — CRYPTO ── */}
          <H2 id="crypto">7. The Crypto Compounding Revolution</H2>

          <div className="not-prose flex items-center gap-3 p-4 rounded-xl border border-blue-500/20 bg-blue-500/8 mb-8">
            <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="font-sans text-sm text-white/70">
              <strong className="text-white">This section covers developments since 2018</strong> that no compound interest article written before the DeFi era adequately addresses. The rules of compounding have not changed — but the environments in which they operate have transformed beyond recognition.
            </p>
          </div>

          <P>
            Prior to 2017, compound interest was largely the preserve of products that operated on human business hours: savings accounts, bonds, and stock dividends, all settling on banking days with overnight and weekend pauses. Crypto changed this permanently.
          </P>

          <H3>24/7/365 Markets — Compounding That Never Sleeps</H3>
          <P>
            Bitcoin trades continuously. Ethereum processes blocks every ~12 seconds. Stablecoin lending protocols on Aave and Compound update interest rates every block. There are no weekends, no bank holidays, no overnight pauses. This has a concrete mathematical implication: compounding in crypto is closer to the continuous model (A = Pe^rt) than anything available in traditional finance.
          </P>

          <P>
            A DeFi lending protocol offering 8% APY on USDC is not offering 8% annual simple interest. It is offering 8% compounded continuously — or at the frequency of each Ethereum block. The actual yield, once converted to an annualised rate accounting for compounding frequency, will be marginally higher than 8% nominal.
          </P>

          <DataTable
            headers={["Product type", "Compounding frequency", "Closest formula"]}
            rows={[
              ["UK high-street savings account", "Monthly or annual", "A = P(1+r/12)^(12t)"],
              ["US Treasury bond", "Semi-annual", "A = P(1+r/2)^(2t)"],
              ["Stock dividend reinvestment", "Quarterly or monthly", "A = P(1+r/4)^(4t)"],
              ["Crypto exchange savings (e.g. Coinbase)", "Daily", "A = P(1+r/365)^(365t)"],
              ["DeFi lending protocol (Aave, Compound)", "Per block (~12 seconds)", "A ≈ Pe^(rt)"],
              ["Liquid staking (Lido stETH)", "Per consensus epoch (~6.4 min)", "A ≈ Pe^(rt)"],
            ]}
          />

          <H3>Staking Rewards and APY</H3>
          <P>
            Proof-of-Stake blockchains — Ethereum (post-Merge 2022), Solana, Cardano, Polkadot — pay validators and delegators for participating in consensus. These rewards are typically expressed as APY (Annual Percentage Yield), meaning the compounding effect is already baked into the quoted figure.
          </P>

          <P>
            Ethereum staking yields have ranged from 3.5% to 6% APY since the Merge (September 2022). Solana validators typically earn 6–8% APY. These are real yields — not promises — paid in the native token. The critical distinction from a traditional savings account: the reward is denominated in an asset whose price fluctuates. A 5% APY on ETH staking is 5% more ETH — but if ETH's price falls 30%, the real return (in GBP or USD terms) is deeply negative.
          </P>

          <Callout type="warning" title="Nominal Crypto Yield vs Real Return">
            <p>High APY figures in crypto are denominated in the underlying token. A 20% APY on a new token means you earn 20% more tokens — but if the token's value falls 60%, you have lost money in fiat terms despite "earning compound interest." Always assess crypto yields in your home currency, accounting for token price risk.</p>
          </Callout>

          <H3>DeFi Auto-Compounding Vaults</H3>
          <P>
            One genuinely novel innovation in crypto is the auto-compounding vault. Protocols like Beefy Finance and Yearn Finance take yield-bearing positions (liquidity pool rewards, staking rewards) and automatically reinvest them — harvesting and compounding rewards every few hours or days, depending on gas costs. This mechanises the compounding reinvestment step that investors in traditional markets must do manually.
          </P>

          <P>
            The compounding formula for a vault that harvests every <em>h</em> hours is equivalent to:
          </P>

          <Formula label="Auto-compounding vault (h = hours between compounds)">
            A = P × (1 + r/(8760/h))^((8760/h) × t)
          </Formula>

          <P>
            A vault harvesting every 12 hours (h=12) compounds 730 times per year. At 20% base APR, this produces an APY of approximately 22.1% — meaningfully higher than simple annual compounding, and the gap widens at higher base rates.
          </P>

          {/* ── SECTION 8 — DCA ── */}
          <H2 id="dca">8. Dollar Cost Averaging and Compounding</H2>

          <P>
            Dollar Cost Averaging (DCA) is the practice of investing a fixed amount at regular intervals — weekly, fortnightly, monthly — regardless of the asset's current price. It is the dominant investment strategy for retail participants in both traditional markets (index fund contributions, pension schemes) and crypto markets (automated Bitcoin purchases via apps like CoinJar, Revolut, and Strike).
          </P>

          <P>
            DCA and compounding interact in a specific way that is often misunderstood. DCA does <em>not</em> compound in the traditional sense — it is not a single sum growing exponentially. Instead, each individual tranche invested through DCA begins its own compounding journey from the date of purchase.
          </P>

          <H3>Why DCA Works — The Volatility Benefit</H3>
          <P>
            Because you buy a fixed GBP (or USD) amount each period regardless of price, you automatically buy more units when prices are low and fewer when prices are high. Over time, this means your average cost per unit is lower than the arithmetic average of all prices during the investment period.
          </P>

          <DataTable
            headers={["Month", "BTC Price (£)", "Amount Invested", "BTC Purchased", "Cumulative BTC"]}
            rows={[
              ["Jan", "£35,000", "£100", "0.002857", "0.002857"],
              ["Feb", "£28,000", "£100", "0.003571", "0.006428"],
              ["Mar", "£22,000", "£100", "0.004545", "0.010973"],
              ["Apr", "£31,000", "£100", "0.003226", "0.014199"],
              ["May", "£40,000", "£100", "0.002500", "0.016699"],
              ["Jun", "£38,000", "£100", "0.002632", "0.019331"],
              ["Total / Average", "Avg: £32,333", "£600", "0.019331 BTC", "Value: £734.58"],
            ]}
          />

          <P>
            Total invested: £600. Value at final month price (£38,000): £38,000 × 0.019331 = <strong className="text-white">£734.58</strong>. Return: +22.4%. The average price paid was £600 / 0.019331 = £31,038 per BTC — below the arithmetic average price of £32,333. DCA captured price volatility in your favour.
          </P>

          <H3>DCA + Staking: Compounding on Accumulation</H3>
          <P>
            Where DCA and compounding converge most powerfully is when the accumulated asset itself generates yield. An investor DCA-ing into ETH, then staking each tranche as it's purchased, earns staking yield on every individual tranche from the date of purchase. The accumulated effect is:
          </P>

          <ul className="not-prose space-y-2 mb-6 ml-4">
            {[
              "Each DCA tranche begins compounding immediately at the staking rate",
              "The total staking yield grows as each new tranche is added",
              "Price appreciation on the growing token balance adds a second compounding dimension",
              "The staked yield itself generates additional yield when restaked",
            ].map(item => (
              <li key={item} className="flex gap-2.5 font-sans text-sm text-white/60">
                <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: ACCENT }} />
                {item}
              </li>
            ))}
          </ul>

          <Callout type="info" title="DCA vs Lump Sum — What the Research Shows">
            <p>Vanguard's 2012 analysis of US equity markets found that lump-sum investing outperforms DCA approximately 68% of the time over rolling 12-month periods. However, for investors who do not have a lump sum — i.e., most retail investors contributing from monthly income — DCA is not a sub-optimal choice. It is the only available strategy. The comparison to lump sum is largely irrelevant for income investors.</p>
          </Callout>

          {/* ── SECTION 9 — RETAIL REVOLUTION ── */}
          <H2 id="retail">9. The Retail Investor Revolution — Technology, Access, and Small-Amount Compounding</H2>

          <P>
            Prior to approximately 2015, accessing the compound growth of financial markets required meaningful capital. Brokerage minimums, trading commissions of £10–£25 per trade, and the absence of fractional shares made small-amount investing economically unviable. A £50 monthly investment into a UK equity index would have been eaten by commission charges.
          </P>

          <P>
            The decade from 2015 to 2025 dismantled these barriers almost entirely. The consequences for compound interest — and who can access it — are profound.
          </P>

          <H3>Zero-Commission Fractional Investing</H3>
          <P>
            Apps like Freetrade, Trading 212, and InvestEngine (UK), alongside Robinhood, Webull, and Public (US), eliminated trading commissions and introduced fractional share ownership. You can now invest £10 into a fractional share of Amazon or Apple without paying a £12 commission that would represent 120% of your investment.
          </P>

          <P>
            This has a specific compound interest implication: compounding requires reinvestment of earnings. When reinvestment was expensive (£12 per dividend reinvestment on a £50 dividend), compounding was economically inaccessible for small investors. Zero-commission DRIP (Dividend Reinvestment Plans) have changed this permanently.
          </P>

          <H3>Automated Recurring Investments and Compounding Frequency Choice</H3>
          <P>
            Modern platforms now offer daily, weekly, fortnightly, and monthly automatic investment schedules — directly in-app, with no manual action required. The ability to choose compounding/investment frequency is no longer an institutional privilege:
          </P>

          <DataTable
            headers={["Platform (UK)", "Minimum investment", "Automated investment frequency", "Asset types"]}
            rows={[
              ["InvestEngine", "£1", "Daily, weekly, monthly", "ETFs"],
              ["Trading 212", "£1", "Daily, weekly, monthly, quarterly", "Stocks, ETFs"],
              ["Freetrade", "£2", "Weekly, monthly", "Stocks, ETFs"],
              ["Moneybox", "£1", "Weekly, monthly (with round-ups)", "ISA, pension, funds"],
              ["Nutmeg", "£500 initial", "Monthly", "Managed portfolios"],
              ["Coinbase (crypto)", "£2", "Daily, weekly, monthly", "Crypto assets"],
              ["Strike (Bitcoin)", "£1", "Daily DCA", "Bitcoin only"],
            ]}
          />

          <H3>Real-Time Data — Institutional-Grade Information for Retail</H3>
          <P>
            In 2005, a retail investor deciding whether to compound earnings into a particular asset had access to end-of-day pricing, quarterly reports, and whatever their broker's research team published. By 2025, the same investor has real-time level 2 order book data, earnings call transcripts published instantly, SEC/FCA filing alerts, social sentiment analysis, and on-chain blockchain analytics — all free or low-cost.
          </P>

          <P>
            This information asymmetry reduction matters for compound interest strategy specifically because informed reinvestment decisions are better reinvestment decisions. The retail investor can now assess whether to compound earnings back into the same asset or rotate into a higher-yielding position with comparable risk — a portfolio-management decision that was previously only viable with professional research support.
          </P>

          <Callout type="key" title="The Power of Micro-Investing at Scale">
            <p>A 22-year-old investing £50/week (£2,600/year) into a global equity ETF averaging 8% annual return will have approximately £912,000 by age 65 — having contributed £111,800 of their own money. The remaining £800,200 is compounding. This scenario, mechanically inaccessible to most people in 2005, requires nothing more than a phone app in 2026.</p>
          </Callout>

          {/* ── SECTION 10 — INFLATION ── */}
          <H2 id="inflation">10. Inflation-Adjusted Real Returns — The Dimension That Changes Everything Since 2018</H2>

          <P>
            Between 2009 and 2021, UK and US inflation averaged approximately 1.5–2% annually. In that environment, a savings account paying 2% had a near-zero real return, but at least it was not deeply negative. This benign inflation environment is not the norm — it was a historical anomaly, and it ended abruptly.
          </P>

          <P>
            UK CPI peaked at 11.1% in October 2022. US CPI peaked at 9.1% in June 2022. For compound interest planning, this changes everything. Nominal returns that would have represented genuine wealth growth in a low-inflation period represent real losses once inflation is properly accounted for.
          </P>

          <Formula label="Real return formula (Fisher equation)">
            Real Rate = [(1 + Nominal Rate) / (1 + Inflation Rate)] − 1
          </Formula>

          <H3>Worked Examples Across Recent Inflation Environments</H3>

          <DataTable
            headers={["Scenario", "Nominal Return", "Inflation Rate", "Real Return", "£10,000 real value after 10yr"]}
            rows={[
              ["Pre-2022 savings account", "1.5%", "1.8%", "−0.29%", "£9,714"],
              ["2022 peak — ISA in cash", "1.5%", "11.1%", "−8.65%", "£4,081"],
              ["2024 high-street savings", "4.5%", "3.2%", "+1.26%", "£11,333"],
              ["2026 target environment", "4.0%", "2.5%", "+1.46%", "£11,543"],
              ["UK equity market (avg)", "8.0%", "3.0%", "+4.85%", "£16,035"],
              ["S&P 500 historical avg", "10.0%", "3.0%", "+6.80%", "£19,340"],
            ]}
          />

          <P>
            The 2022 scenario is striking: a cash ISA earning 1.5% during 11.1% inflation had a real return of −8.65% per year. £10,000 held in cash for 10 years at those rates would have the purchasing power of just £4,081 in 2022 money. This is not a theoretical risk — it is recent UK financial history.
          </P>

          <H3>Inflation-Adjusted Compound Interest Formula</H3>

          <Formula label="Real future value accounting for inflation">
            Real FV = P × [(1 + r) / (1 + i)]^t
          </Formula>

          <P>
            Where i is the annual inflation rate. This gives you the purchasing-power-equivalent value of your investment in today's money.
          </P>

          <P>
            Example: £10,000 invested at 7% nominal return, 3% inflation, for 20 years:
          </P>
          <Formula>Real FV = 10,000 × [(1.07) / (1.03)]^20 = 10,000 × (1.0388)^20 = 10,000 × 2.143 = £21,430</Formula>

          <P>
            The nominal value of your portfolio is £38,697 — but expressed in today's purchasing power, it is worth £21,430. The difference is not profit; it is the inflation premium you needed to earn just to stay ahead of price level increases. This is why investing in assets that outpace inflation — equities, real estate, inflation-linked bonds, and historically Bitcoin over long time horizons — matters as a compound interest decision, not just a returns decision.
          </P>

          <Callout type="warning" title="The Inflation Lesson of 2021–2023">
            <p>An investor who held £50,000 in a savings account from January 2021 to December 2023, earning an average of 2% nominal interest annually, lost approximately £8,900 in purchasing power during a period of cumulative 20%+ inflation. Compound interest on a sub-inflation nominal return is negative real compounding — your purchasing power is shrinking, not growing.</p>
          </Callout>

          {/* ── SECTION 11 — APR VS AER ── */}
          <H2 id="apr-aer">11. APR vs AER — What You Are Actually Being Paid</H2>

          <P>
            This is one of the most practically important distinctions in UK personal finance and one of the most widely confused. The compound interest formula is what creates the difference between these two rates.
          </P>

          <DataTable
            headers={["Term", "What it means", "Used by"]}
            rows={[
              ["APR (Annual Percentage Rate)", "The stated annual rate before intra-year compounding", "Mortgages, loans (cost to borrower)"],
              ["AER (Annual Equivalent Rate)", "The effective rate after compounding — what you actually earn", "Savings accounts, ISAs"],
              ["APY (Annual Percentage Yield)", "US equivalent of AER", "US savings products, crypto platforms"],
              ["EAR (Effective Annual Rate)", "Interchangeable with AER in most contexts", "Academic finance, some loan products"],
            ]}
          />

          <Formula label="Converting APR to AER (monthly compounding)">
            AER = (1 + APR/12)^12 − 1
          </Formula>

          <DataTable
            headers={["Stated APR", "Compounding", "Actual AER", "Difference"]}
            rows={[
              ["5.00%", "Annual",    "5.000%", "0.000%"],
              ["5.00%", "Quarterly", "5.095%", "+0.095%"],
              ["5.00%", "Monthly",   "5.116%", "+0.116%"],
              ["5.00%", "Daily",     "5.127%", "+0.127%"],
              ["10.00%", "Monthly",  "10.471%", "+0.471%"],
              ["20.00%", "Monthly",  "21.939%", "+1.939%"],
            ]}
          />

          <P>
            When a crypto platform advertises "20% APY," that is an AER figure — the compounding is already included. When a bank advertises "5% AER," the compounding is included. But when a loan product advertises "5% APR," the actual interest charged over the year through compounding will be higher than 5%. Always compare savings products on AER and loan products on APR APRC (Annual Percentage Rate of Charge, which includes fees).
          </P>

          {/* ── SECTION 12 — HISTORY ── */}
          <H2 id="history">12. Historical Origins of Compound Interest</H2>

          <P>
            Compound interest is older than writing itself — or nearly so. Clay tablets from ancient Mesopotamia (~2400 BCE) record compound interest on grain loans, with interest charged on outstanding interest when debts were unpaid at harvest. The mathematical concept predates Greek civilisation.
          </P>

          <H3>Key Milestones</H3>

          <div className="not-prose relative pl-6 border-l border-dark-border space-y-8 my-8">
            {[
              { year: "~2400 BCE", title: "Babylonian clay tablets", body: "The earliest known records of compound interest: Mesopotamian lenders charging interest-on-interest on grain loans. Tablets from the city of Nippur record these calculations." },
              { year: "1202 CE", title: "Fibonacci's Liber Abaci", body: "Leonardo Fibonacci's mathematical compendium introduced Hindu-Arabic numerals to Europe and included compound interest problems. This text laid the groundwork for European financial mathematics." },
              { year: "1613", title: "Richard Witt — Arithmeticall Questions", body: "The first English-language book dedicated to compound interest calculations. Witt was a London mathematician who produced highly accurate tables for compound interest calculations that were used by merchants for generations." },
              { year: "1683", title: "Jacob Bernoulli discovers e", body: "While studying the mathematical limit of compound interest as compounding frequency approaches infinity, Bernoulli discovered Euler's number e ≈ 2.71828. One of mathematics' fundamental constants emerged directly from compound interest theory." },
              { year: "1730", title: "Abraham de Moivre — annuity mathematics", body: "De Moivre formalised the mathematics of regular-contribution compound growth — what we now call the future value of an annuity formula. This work directly underlies modern pension and savings calculations." },
              { year: "2009", title: "Bitcoin — 24/7 monetary network", body: "Satoshi Nakamoto's Bitcoin whitepaper and subsequent launch created the first globally accessible financial asset that trades and settles continuously. This created the first mass-market context in which retail participants could interact with near-continuous compounding." },
              { year: "2020–2022", title: "DeFi summer and yield farming", body: "Decentralised finance protocols introduced automated market makers, liquidity mining, and yield optimisers — creating compounding mechanisms that operated at blockchain speed (~12 seconds per Ethereum block), the closest any mass-market financial product has come to true continuous compounding." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-dark-border" style={{ backgroundColor: ACCENT }} />
                <p className="font-heading text-[9px] uppercase tracking-widest text-white/30 mb-1">{item.year}</p>
                <h4 className="font-heading text-sm text-white uppercase tracking-wide mb-2">{item.title}</h4>
                <p className="font-sans text-xs text-white/55 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <H3>The Einstein Attribution — Setting the Record Straight</H3>
          <P>
            "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it." This quote is almost universally attributed to Einstein in financial marketing. It does not appear in any of Einstein's published works, documented interviews, or archived correspondence. The Albert Einstein Archives and the Quote Investigator project have both concluded the attribution is false.
          </P>
          <P>
            Versions of the sentiment appear in English commercial writing as early as the 1700s. The Einstein attribution appears to have emerged in American financial advertising in the mid-20th century, likely because attaching a celebrated physicist's name to a mathematical concept gave it greater authority. The mathematics is real and powerful — it does not need a false celebrity endorsement.
          </P>

          {/* ── SECTION 13 — MISTAKES ── */}
          <H2 id="mistakes">13. Common Mistakes and Misconceptions</H2>

          <div className="not-prose space-y-4 my-6">
            {[
              {
                title: "Confusing APR and AER on savings products",
                body: "Many savers compare products using the headline rate without checking whether it's APR or AER. For savings accounts, always compare AER. A 5% APR account compounding monthly is actually a 5.116% AER account — and a competitor offering 5.1% AER monthly-compounded is offering a better deal.",
              },
              {
                title: "Ignoring inflation when calculating compound growth",
                body: "A 5% nominal return on savings during 6% inflation is a −0.94% real return. You are losing purchasing power, not gaining it. Every compound interest calculation should include a real return check, especially in post-2021 inflation environments.",
              },
              {
                title: "Assuming higher compounding frequency is always better",
                body: "At modest rates (below 10%), the difference between monthly and daily compounding is typically under 0.15% per year — often less than the difference between two competing savings products. Do not choose a lower-rate account purely because it compounds daily rather than monthly.",
              },
              {
                title: "Treating crypto APY as equivalent to savings APY",
                body: "A bank savings account paying 4% AER has no price risk — your £10,000 remains £10,000 in nominal terms. A crypto platform paying 15% APY in a native token has significant price risk — your underlying asset could fall 50% while you are 'earning' 15%. The yields are not comparable on a like-for-like basis.",
              },
              {
                title: "Not reinvesting income (breaking the compounding chain)",
                body: "Compound interest only works if you reinvest earnings. An investor who earns £500 in interest/dividends and spends it rather than reinvesting has earned simple interest, not compound interest. The entire compounding mechanism depends on reinvestment. Use DRIP (Dividend Reinvestment Plans) or automatic reinvestment settings wherever available.",
              },
              {
                title: "Using simple interest tax calculations on compound returns",
                body: "In a standard taxable account, interest may be taxed each year as it is earned — which means you pay tax before compounding occurs, reducing the effective rate. ISAs and SIPPs shelter compound growth from this drag. An investor earning 5% in a taxable account (20% tax rate) effectively compounds at 4%, not 5%. Over 30 years, this difference in effective rate is worth tens of thousands of pounds.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-dark-card border border-dark-border rounded-xl">
                <span className="font-display text-2xl leading-none flex-shrink-0" style={{ color: ACCENT }}>0{i + 1}</span>
                <div>
                  <h4 className="font-heading text-sm text-white uppercase tracking-wide mb-2">{item.title}</h4>
                  <p className="font-sans text-xs text-white/55 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CALCULATOR CTA ── */}
          <div className="not-prose mt-16 p-8 rounded-2xl border border-blue-500/25 bg-blue-500/8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2">Run Your Own Numbers</h3>
                <p className="font-sans text-sm text-white/55 leading-relaxed mb-5">
                  Use our advanced compound interest calculator — supports daily, weekly, monthly, quarterly, and annual compounding, regular contributions, and inflation-adjusted real return modelling.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/finance/compound-interest"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading text-sm uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
                    style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}60` }}
                  >
                    Compound Interest Calculator <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/finance/savings"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading text-sm uppercase tracking-widest text-white border border-dark-border hover:border-white/30 transition-colors"
                  >
                    Savings Calculator <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="not-prose mt-16">
            <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqSchema.map(faq => (
                <details key={faq.question} className="group border border-dark-border rounded-xl bg-dark-card overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-heading text-sm text-white uppercase tracking-wide select-none">
                    <span>{faq.question}</span>
                    <span className="text-blue-400 text-lg font-light flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="font-sans text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* ── Related ── */}
          <div className="not-prose mt-16">
            <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-5">Related Guides & Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "What Is Compound Interest?", to: "/blog/what-is-compound-interest", badge: "Guide" },
                { title: "Advanced Compound Interest Calculator", to: "/finance/compound-interest", badge: "Tool" },
                { title: "Debt Payoff — Avalanche vs Snowball", to: "/finance/credit-card-payoff", badge: "Tool" },
                { title: "Budget Calculator", to: "/finance/budget", badge: "Tool" },
                { title: "ISA Calculator", to: "/finance/isa", badge: "Tool" },
                { title: "Savings Calculator", to: "/finance/savings", badge: "Tool" },
              ].map(link => (
                <Link key={link.to} to={link.to}
                  className="flex items-center justify-between gap-3 p-4 bg-dark-card border border-dark-border rounded-xl hover:border-blue-500/40 transition-colors group"
                >
                  <span className="font-sans text-sm text-white/70 group-hover:text-white transition-colors">{link.title}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[9px] font-heading uppercase tracking-widest px-2 py-0.5 rounded border border-dark-border text-white/30">{link.badge}</span>
                    <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-blue-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        <FinancialDisclosure variant="investment" />
      </div>
    </>
  );
}
