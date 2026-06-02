import { SEO } from "@/components/SEO";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertTriangle, Info } from "lucide-react";

const ACCENT = "#F97316";

const faqSchema = [
  {
    question: "Can I get a UK mortgage on a Skilled Worker visa?",
    answer: "Yes. Skilled Worker visa holders are among the most favourably treated non-UK nationals by mortgage lenders. Because the visa is tied to verified employment and a minimum salary threshold (currently £38,700/year), lenders view it as lower risk. You will typically need a 15–25% deposit and at least 12 months of UK residency, though some specialist lenders are more flexible.",
  },
  {
    question: "How much deposit do I need as a non-UK national?",
    answer: "It depends on your visa and residency status. With Indefinite Leave to Remain (ILR) you may access 5–10% deposit products. On a valid work visa without ILR, most lenders require 15–25%. Non-residents buying from overseas typically need 25–40%. A joint application with a UK resident or ILR holder can reduce the deposit requirement significantly.",
  },
  {
    question: "Do I need a UK credit history to get a mortgage?",
    answer: "No — but it helps. Specialist lenders can assess applications without UK credit history by focusing on income stability, employment contract, deposit size, and source of funds. Building UK credit before applying (via a credit card or utility bill in your name) improves your options and rates.",
  },
  {
    question: "Is there an extra stamp duty charge for non-UK residents?",
    answer: "Yes. Non-UK residents pay a 2% SDLT surcharge on top of standard stamp duty rates when buying residential property in England and Northern Ireland. You are classed as non-resident if you spent fewer than 183 days in the UK in the 365-day period before purchase. Importantly, if you are buying jointly and one applicant IS a UK resident, the surcharge does not apply.",
  },
  {
    question: "Can two non-UK nationals get a joint mortgage together?",
    answer: "Yes, and it is often the better strategy. Two incomes combined at 4× or 4.5× multiples unlock a significantly larger loan. Lenders also prefer joint applications because both parties are liable in the event of non-payment. Two people each earning £40,000 (£80,000 combined) could access mortgages of £320,000–£360,000 at standard income multiples.",
  },
  {
    question: "Which visa types can get a UK mortgage?",
    answer: "Mortgages are available to holders of Skilled Worker, Health and Care Worker, Spousal, BNO, and other long-term visas. EU/EEA nationals with Settled or Pre-Settled status also qualify. ILR holders get the widest access. Student visas are generally not accepted as they do not demonstrate a right to remain long-term.",
  },
  {
    question: "What documents do I need to apply for a UK mortgage as a foreign national?",
    answer: "You will need: valid passport, proof of visa status, last 3 months' payslips, 3 months' bank statements (sometimes 6), proof of deposit (and its source), and proof of UK address. If any documents are in a foreign language, certified English translations are required. HSBC and some lenders are particularly strict on deposit source evidence.",
  },
  {
    question: "Can I get a refund of the non-resident SDLT surcharge?",
    answer: "Yes. If you become a UK resident within 365 days of your purchase date (i.e. you spend 183+ days in the UK in any 365-day window that includes the purchase date), you can claim a refund of the 2% surcharge. You must claim within 2 years of the purchase completion date by amending your land transaction return.",
  },
];

const VISA_ROWS = [
  { visa: "Indefinite Leave to Remain (ILR)", deposit: "5–10%", lenders: "All mainstream", residency: "None required", notes: "Treated near-equal to British citizens" },
  { visa: "Skilled Worker (Tier 2)", deposit: "15–25%", lenders: "HSBC, NatWest, Halifax + specialists", residency: "12–24 months typical", notes: "Most favourable for non-ILR holders" },
  { visa: "Health & Care Worker", deposit: "15–25%", lenders: "HSBC, specialists", residency: "12 months typical", notes: "NHS employment strengthens application" },
  { visa: "Settled Status (EU/EEA)", deposit: "10–15%", lenders: "Most mainstream", residency: "Usually none", notes: "Treated similarly to ILR in most cases" },
  { visa: "Pre-Settled Status (EU/EEA)", deposit: "15–25%", lenders: "Selected lenders", residency: "1–2 years", notes: "Some lenders cap LTV at 85%" },
  { visa: "BNO Visa", deposit: "15–25%", lenders: "Specialists + some mainstream", residency: "12 months typical", notes: "Growing lender acceptance" },
  { visa: "Spousal / Family Visa", deposit: "15–25%", lenders: "Selected lenders", residency: "Varies", notes: "Joint application with UK spouse strongly preferred" },
  { visa: "Student Visa", deposit: "N/A", lenders: "Very limited", residency: "Not applicable", notes: "Rarely accepted — no long-term right to remain" },
];

const CHECKLIST = [
  { cat: "Identity", items: ["Passport (valid)", "Biometric Residence Permit (BRP) if applicable", "National ID card (EU/EEA nationals)"] },
  { cat: "Visa & Immigration", items: ["Current visa with expiry date", "Settled/Pre-Settled status letter (EU/EEA)", "ILR documentation if applicable"] },
  { cat: "Income & Employment", items: ["Last 3 months' payslips", "P60 or employment contract", "2 years' accounts if self-employed", "Employer letter confirming contract type"] },
  { cat: "Bank & Finances", items: ["3–6 months' UK bank statements", "Deposit source evidence (trail of funds)", "Overseas bank statements if deposit originated abroad", "Certified translations for foreign-language documents"] },
  { cat: "Property & Address", items: ["UK address proof (utility bill, council tax letter — max 3 months old)", "Solicitor/conveyancer details once offer accepted"] },
];

export default function MortgageForNewResidents() {
  return (
    <>
      <SEO
        title="UK Mortgage on a Visa: The Complete 2026 Guide for New Residents"
        description="Getting a UK mortgage as a foreign national or visa holder is possible — if you know the rules. Deposit requirements, which lenders say yes, stamp duty surcharges, joint application strategies, and the document checklist. Everything you need in one guide."
        keywords="mortgage on skilled worker visa UK, UK mortgage for foreign nationals, can I get a mortgage in the UK on a visa, non-UK national mortgage, mortgage with no UK credit history, mortgage for new residents UK, UK mortgage requirements for immigrants, stamp duty non-resident surcharge, joint mortgage non-UK national, mortgage on tier 2 visa UK 2026"
        canonicalUrl="/mortgages/mortgage-for-new-residents"
        faqSchema={faqSchema}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "UK Mortgage on a Visa: The Complete 2026 Guide for New Residents",
          "description": "A comprehensive guide for non-UK nationals and visa holders on getting a mortgage in the UK — covering deposit requirements, lender policies, stamp duty, and the joint application strategy.",
          "author": { "@type": "Organization", "name": "The Calculator App" },
          "publisher": { "@type": "Organization", "name": "The Calculator App", "url": "https://www.thecalculatorapp.org" },
          "datePublished": "2026-06-02",
          "dateModified": "2026-06-02",
          "url": "https://www.thecalculatorapp.org/mortgages/mortgage-for-new-residents",
          "mainEntityOfPage": "https://www.thecalculatorapp.org/mortgages/mortgage-for-new-residents",
        }}
      />

      <main className="min-h-screen bg-dark-bg text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-dark-border">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/40 font-sans mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/mortgages" className="hover:text-white/70 transition-colors">Mortgages</Link>
              <span>/</span>
              <span className="text-white/60">UK Mortgage Guide for New Residents</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-heading uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              2026 Complete Guide
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-none tracking-wide mb-6">
              <span style={{ color: ACCENT }}>NOBODY TELLS YOU THIS</span>
              <br />
              <span className="text-white/90">ABOUT GETTING A UK</span>
              <br />
              <span className="text-white/90">MORTGAGE ON A VISA</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-8">
              Hundreds of thousands of skilled workers arrive in the UK every year and quietly
              assume homeownership is out of reach. It is not. This guide covers exactly what
              lenders look for, which visa types qualify, how much deposit you actually need,
              the stamp duty trap most people walk into — and the joint application strategy
              that changes everything.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#deposit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading text-sm uppercase tracking-wider text-white border border-dark-border hover:border-orange-500/50 transition-colors">
                Deposit requirements <ArrowRight className="w-3 h-3" />
              </a>
              <a href="#lenders" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading text-sm uppercase tracking-wider text-white border border-dark-border hover:border-orange-500/50 transition-colors">
                Which lenders say yes <ArrowRight className="w-3 h-3" />
              </a>
              <a href="#stamp-duty" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading text-sm uppercase tracking-wider text-white border border-dark-border hover:border-orange-500/50 transition-colors">
                Stamp duty surcharge <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">

          {/* The big picture */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              THE TRUTH ABOUT UK MORTGAGES FOR NON-NATIONALS
            </h2>
            <div className="prose-article">
              <p className="font-sans text-white/70 text-base leading-relaxed mb-4">
                The UK mortgage market is one of the most complex in the world — and most guides
                written for foreign nationals either get the details wrong or are written by brokers
                with a product to sell you. This guide is different. We have cross-referenced
                official GOV.UK guidance, lender policy documents, and specialist broker sources
                to give you an accurate picture.
              </p>
              <p className="font-sans text-white/70 text-base leading-relaxed mb-4">
                The core truth: <strong className="text-white">your visa type matters more than your nationality.</strong>{" "}
                A Skilled Worker visa holder from any country is treated more favourably than a
                British national with poor credit history. Lenders care about one thing — your
                ability to repay. Everything else is secondary.
              </p>
              <p className="font-sans text-white/70 text-base leading-relaxed">
                Here is what the banks actually look at, in order of importance:
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ["1. Right to remain in the UK", "How long is your visa? Do you have ILR? This determines lender appetite most."],
                ["2. Stable, verifiable income", "Employed with payslips is preferred. Self-employed for 2+ years also works."],
                ["3. Deposit size and source", "Larger deposit = more lender options. Source of funds must be traceable."],
                ["4. UK credit footprint", "A thin credit file is manageable. A bad one is harder to overcome."],
                ["5. Time in the UK", "Many lenders want 12–36 months of UK residency. Specialists are more flexible."],
                ["6. Sole vs joint application", "Joint applications with a UK resident unlock significantly better terms."],
              ].map(([title, desc]) => (
                <div key={title} className="flex gap-3 p-4 bg-dark-card border border-dark-border rounded-lg">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                  <div>
                    <p className="font-heading text-sm text-white uppercase tracking-wide mb-1">{title}</p>
                    <p className="font-sans text-xs text-white/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Visa comparison table */}
          <section id="deposit">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-3">
              DEPOSIT REQUIREMENTS BY VISA TYPE
            </h2>
            <p className="font-sans text-white/60 text-sm mb-8 leading-relaxed">
              The single biggest variable in whether you can get a UK mortgage as a non-national
              is your visa status. The table below summarises the requirements across the most
              common visa categories. Always verify directly with a mortgage broker as lender
              policies change.
            </p>
            <div className="overflow-x-auto rounded-lg border border-dark-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border bg-dark-card">
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest">Visa / Status</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest">Min Deposit</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest hidden md:table-cell">Lenders</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest hidden lg:table-cell">UK Residency</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest hidden lg:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {VISA_ROWS.map((row, i) => (
                    <tr key={row.visa} className={`border-b border-dark-border last:border-0 ${i % 2 === 0 ? "bg-dark-bg" : "bg-dark-card/40"}`}>
                      <td className="px-4 py-3 font-sans text-white/80 text-xs leading-tight">{row.visa}</td>
                      <td className="px-4 py-3">
                        <span className={`font-heading text-sm ${row.deposit === "N/A" ? "text-white/30" : "text-white"}`} style={row.deposit !== "N/A" ? { color: ACCENT } : {}}>
                          {row.deposit}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-sans text-xs text-white/50 hidden md:table-cell">{row.lenders}</td>
                      <td className="px-4 py-3 font-sans text-xs text-white/50 hidden lg:table-cell">{row.residency}</td>
                      <td className="px-4 py-3 font-sans text-xs text-white/40 hidden lg:table-cell italic">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-sans text-xs text-white/30 mt-3 italic">Source: Strive Mortgages, Tembo Money, HSBC, MoneySuperMarket — cross-referenced June 2026.</p>
          </section>

          {/* No credit history */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              NO UK CREDIT HISTORY? HERE IS WHAT TO DO
            </h2>
            <div className="bg-dark-card border border-orange-500/20 rounded-lg p-6 mb-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} />
                <p className="font-sans text-sm text-white/80 leading-relaxed">
                  <strong className="text-white">The good news:</strong> UK lenders cannot access your overseas credit file,
                  so a foreign credit history — good or bad — does not directly affect your application. The challenge is
                  that a blank UK credit file triggers automated rejections from mainstream lenders. Here is how to navigate this.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Start building UK credit immediately on arrival",
                  body: "Open a UK bank account (Starling, Monzo, or any high street bank). Apply for a basic credit card — even a £500 limit used and repaid monthly registers on the UK credit file. The sooner you start, the sooner you build the 6–12 month history some lenders want to see.",
                },
                {
                  step: "02",
                  title: "Register on the electoral roll",
                  body: "Even non-British nationals living legally in the UK can register on the electoral roll. This is one of the fastest ways to establish your address history on the credit reference agencies (Experian, Equifax, TransUnion). Lenders check all three.",
                },
                {
                  step: "03",
                  title: "Use a specialist broker, not a comparison site",
                  body: "Mainstream comparison sites are built for standard applications. A specialist broker who handles foreign national mortgages daily knows which lenders use manual underwriting rather than automated credit scoring. This is the single most important thing you can do.",
                },
                {
                  step: "04",
                  title: "Strengthen with income and deposit",
                  body: "If your credit history is thin, compensate with a larger deposit (25%+) and strong, verifiable employment. An employment contract from a recognised UK employer — especially a large organisation or NHS — carries significant weight in manual underwriting.",
                },
                {
                  step: "05",
                  title: "Consider a joint application with a UK-based co-borrower",
                  body: "If your partner, spouse, or a close family member with UK credit history can co-borrow, this is often the fastest route to approval. Their credit history partially offsets your thin file. Both incomes are assessed, which also increases the mortgage size you can access.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-5 bg-dark-card border border-dark-border rounded-lg">
                  <span className="font-display text-2xl leading-none flex-shrink-0" style={{ color: ACCENT }}>{item.step}</span>
                  <div>
                    <h3 className="font-heading text-sm text-white uppercase tracking-wide mb-2">{item.title}</h3>
                    <p className="font-sans text-xs text-white/55 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Joint application strategy */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              THE JOINT APPLICATION ADVANTAGE
            </h2>
            <p className="font-sans text-white/65 text-base leading-relaxed mb-8">
              This is the strategy that most people miss. A joint mortgage application with a UK
              resident or ILR holder does not just double your borrowing power — it fundamentally
              changes the risk profile of your application in the lender's eyes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border rounded-lg overflow-hidden mb-8">
              {[
                { label: "Solo non-national", deposit: "25%+", ltv: "75% LTV cap", lenders: "Specialist only" },
                { label: "Joint (both non-national)", deposit: "15–25%", ltv: "80–85% LTV", lenders: "Wider choice" },
                { label: "Joint (one UK resident)", deposit: "5–10%", ltv: "90–95% LTV", lenders: "Most mainstream" },
              ].map((col) => (
                <div key={col.label} className="bg-dark-card p-5">
                  <p className="font-heading text-xs text-white/40 uppercase tracking-widest mb-4">{col.label}</p>
                  <p className="font-display text-3xl mb-1" style={{ color: ACCENT }}>{col.deposit}</p>
                  <p className="font-sans text-xs text-white/50 mb-3">minimum deposit</p>
                  <p className="font-heading text-sm text-white mb-1">{col.ltv}</p>
                  <p className="font-sans text-xs text-white/40">{col.lenders}</p>
                </div>
              ))}
            </div>
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-4">Why lenders prefer joint applications</h3>
              <div className="space-y-3">
                {[
                  "Two incomes assessed: most lenders use 4× to 4.5× combined gross salary, opening significantly larger loan amounts.",
                  "Shared liability reduces lender risk: if one party loses income, the other can cover payments — a documented consideration in lender risk models.",
                  "UK resident co-borrower's credit history offsets the non-national's thin UK file.",
                  "Stamp duty exemption: if even one applicant is a UK resident (183+ days in UK), the 2% non-resident SDLT surcharge does not apply — saving thousands.",
                  "Some schemes, including Help to Buy and Shared Ownership, require both applicants to meet eligibility — but many do not exclude non-nationals with the right visa.",
                ].map((point, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                    <p className="font-sans text-xs text-white/60 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stamp duty */}
          <section id="stamp-duty">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              THE STAMP DUTY TRAP — AND HOW TO AVOID IT
            </h2>
            <div className="bg-dark-card border border-yellow-500/20 rounded-lg p-6 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-400" />
                <div>
                  <p className="font-heading text-sm text-yellow-400 uppercase tracking-wide mb-2">Non-Resident SDLT Surcharge</p>
                  <p className="font-sans text-sm text-white/75 leading-relaxed">
                    Since 1 April 2021, non-UK residents pay a{" "}
                    <strong className="text-white">2% surcharge on top of standard stamp duty rates</strong>{" "}
                    when buying residential property in England and Northern Ireland. On a £400,000 property this
                    is an extra £8,000 that most buyers only discover when they receive their solicitor's completion statement.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-3">Who counts as "non-resident" for SDLT?</h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed mb-4">
                  You are classed as non-UK resident for stamp duty if you spent fewer than{" "}
                  <strong className="text-white">183 days in the UK</strong> in the 365-day period ending on the day of purchase.
                  This is different from your visa status — you can have a valid Skilled Worker visa and still be non-resident
                  for SDLT if you have not yet been physically present in the UK for long enough.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-3">The joint purchase exception</h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed">
                  This is crucial: if you are buying jointly and{" "}
                  <strong className="text-white">even one buyer qualifies as UK-resident</strong>, the 2% surcharge does not apply
                  to the transaction. This means a couple where one partner has lived in the UK for over six months avoids the
                  surcharge entirely. This can save £6,000–£16,000+ depending on the property price.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-sm text-white uppercase tracking-widest mb-3">Can you get a refund?</h3>
                <p className="font-sans text-sm text-white/65 leading-relaxed">
                  Yes. If you paid the surcharge on completion but subsequently spend 183+ days in the UK within a 365-day
                  window that includes your purchase date, you can claim a full refund. You must apply within{" "}
                  <strong className="text-white">2 years</strong> of the purchase date by amending your land transaction return
                  with HMRC. Many buyers who were almost-at-the-threshold at purchase end up qualifying for refunds — this is
                  worth checking with your solicitor.
                </p>
              </div>
            </div>
            {/* SDLT quick calc CTA */}
            <div className="mt-8 p-5 bg-dark-card border border-orange-500/20 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-heading text-sm text-white uppercase tracking-wide mb-1">Calculate your stamp duty</p>
                <p className="font-sans text-xs text-white/50">See exactly what you'll owe including the non-resident surcharge</p>
              </div>
              <Link
                to="/stamp-duty-calculator"
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-heading uppercase tracking-wider text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Stamp Duty Calculator <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

          {/* Which lenders */}
          <section id="lenders">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              WHICH LENDERS ACCEPT NON-UK NATIONALS?
            </h2>
            <p className="font-sans text-white/65 text-sm leading-relaxed mb-8">
              Lender policies change frequently. The below reflects verified information as of mid-2026. Always confirm
              directly or through a broker — a declined application leaves a footprint on your credit file.
            </p>
            <div className="space-y-3">
              {[
                {
                  lender: "HSBC",
                  stance: "Actively lends to foreign nationals",
                  detail: "One of the most foreign-national-friendly high-street lenders. Offers residential and buy-to-let mortgages for non-UK residents. Particularly strict on deposit source — expect detailed fund origin evidence.",
                  rating: 5,
                },
                {
                  lender: "NatWest",
                  stance: "Lends to foreign nationals with conditions",
                  detail: "Documented as offering mortgages to non-UK nationals. Prefers 12+ months UK residency. More accessible when applicant holds ILR or is buying jointly with a UK resident.",
                  rating: 4,
                },
                {
                  lender: "Halifax",
                  stance: "Available — conditions apply",
                  detail: "Part of Lloyds Banking Group, which has documented foreign national policies. Typically requires 2–3 years UK residency and a strong employment record. ILR holders get wider access.",
                  rating: 3,
                },
                {
                  lender: "Specialist lenders (Accord, Kent Reliance, Aldermore)",
                  stance: "Most flexible for non-standard applications",
                  detail: "Specialist lenders use manual underwriting rather than credit scoring algorithms. They can assess thin credit files, newer arrivals, and complex income structures. Rates may be slightly higher but terms can be more accessible.",
                  rating: 5,
                },
                {
                  lender: "Barclays & Santander",
                  stance: "More restrictive — verify directly",
                  detail: "Less documented foreign national policies. Likely to be more accessible for ILR holders or near-citizens. Recommended to verify current policy directly or via a broker before applying.",
                  rating: 2,
                },
              ].map((lender) => (
                <div key={lender.lender} className="p-5 bg-dark-card border border-dark-border rounded-lg">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading text-sm text-white uppercase tracking-wide">{lender.lender}</h3>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[1,2,3,4,5].map(n => (
                        <div key={n} className="w-2 h-2 rounded-full" style={{ backgroundColor: n <= lender.rating ? ACCENT : "#333" }} />
                      ))}
                    </div>
                  </div>
                  <p className="font-sans text-xs font-semibold text-orange-400 mb-2">{lender.stance}</p>
                  <p className="font-sans text-xs text-white/50 leading-relaxed">{lender.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process walkthrough */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              THE HOUSE BUYING PROCESS — FROM OFFER TO KEYS
            </h2>
            <p className="font-sans text-white/65 text-sm leading-relaxed mb-8">
              UK property purchases have two entirely separate professional sides: the financial side (mortgage lender and broker)
              and the legal side (solicitor or licensed conveyancer). Many first-time buyers — particularly those new to the UK system —
              are surprised to learn they need both.
            </p>
            <div className="relative pl-6 border-l border-dark-border space-y-8">
              {[
                {
                  phase: "Before you search",
                  title: "Mortgage in Principle (MIP)",
                  body: "Get a Mortgage in Principle from your lender or broker before making offers. This is a soft-search credit check that shows sellers you are a serious, fundable buyer. In competitive markets, sellers will not engage without one.",
                },
                {
                  phase: "Finding a property",
                  title: "Making an offer",
                  body: "Offers are made directly to the estate agent (who represents the seller, not you). Offers are not legally binding in England and Wales until exchange of contracts — a process that can take 8–16 weeks. Scotland operates differently (missives system).",
                },
                {
                  phase: "Offer accepted",
                  title: "Instruct a solicitor / conveyancer",
                  body: "The moment your offer is accepted, instruct a solicitor or licensed conveyancer to handle the legal transfer. They will conduct searches (local authority, water, environmental), review the title deeds, and manage the contract exchange process. Fees typically range from £1,000–£2,500.",
                },
                {
                  phase: "Legal & financial running in parallel",
                  title: "Formal mortgage application",
                  body: "Submit your full mortgage application with all documentation. The lender will instruct a surveyor to value the property (you pay this, usually £300–£600). You may also want an independent survey (Homebuyer Report or Building Survey) to identify structural issues.",
                },
                {
                  phase: "Exchange of contracts",
                  title: "You are legally committed",
                  body: "At exchange, both sides sign contracts and you pay your deposit (typically 10% of the purchase price). You are now legally committed. If you withdraw after exchange you lose your deposit. The seller is also locked in. Completion date is typically agreed 1–4 weeks after exchange.",
                },
                {
                  phase: "Completion",
                  title: "Keys in hand",
                  body: "Your mortgage funds are transferred to the seller's solicitor. You receive the keys. SDLT must be paid within 14 days of completion. Your solicitor registers the property in your name at HM Land Registry. The process is complete.",
                },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-dark-border" style={{ backgroundColor: ACCENT }} />
                  <p className="font-heading text-[10px] text-white/30 uppercase tracking-widest mb-1">{step.phase}</p>
                  <h3 className="font-heading text-sm text-white uppercase tracking-wide mb-2">{step.title}</h3>
                  <p className="font-sans text-xs text-white/55 leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Document checklist */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              THE COMPLETE DOCUMENT CHECKLIST
            </h2>
            <p className="font-sans text-white/65 text-sm leading-relaxed mb-8">
              Prepare these before you speak to any lender or broker. Having documents ready speeds the process and signals
              to the lender that you are organised. Any foreign-language documents must be accompanied by certified English translations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHECKLIST.map((group) => (
                <div key={group.cat} className="p-5 bg-dark-card border border-dark-border rounded-lg">
                  <h3 className="font-heading text-xs text-white/50 uppercase tracking-widest mb-4" style={{ color: ACCENT }}>{group.cat}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-400" />
                        <span className="font-sans text-xs text-white/65">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key costs summary */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              TOTAL COSTS TO BUDGET FOR
            </h2>
            <p className="font-sans text-white/65 text-sm leading-relaxed mb-6">
              The deposit is only part of what you need to have ready. Here is the full picture for a typical
              £400,000 London flat purchase as a non-resident first-time buyer:
            </p>
            <div className="overflow-x-auto rounded-lg border border-dark-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border bg-dark-card">
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest">Cost</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest">As non-resident</th>
                    <th className="text-left px-4 py-3 font-heading text-xs text-white/50 uppercase tracking-widest hidden md:table-cell">As UK resident / joint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {[
                    ["Deposit (25% / 10%)", "£100,000", "£40,000"],
                    ["Stamp Duty (SDLT)", "£22,000 (incl. 2% surcharge)", "£10,000 (no surcharge)"],
                    ["Solicitor / conveyancer", "£1,500–£2,500", "£1,500–£2,500"],
                    ["Survey (Homebuyer Report)", "£500–£800", "£500–£800"],
                    ["Mortgage arrangement fee", "£999–£2,000 (if applicable)", "£999–£2,000"],
                    ["Valuation fee", "£300–£600", "£300–£600"],
                    ["Removal costs", "£500–£2,000", "£500–£2,000"],
                    ["TOTAL (approx)", "~£125,000–£128,000", "~£55,000–£58,000"],
                  ].map(([cost, nonRes, ukRes], i) => (
                    <tr key={cost} className={i === 7 ? "bg-orange-500/8" : ""}>
                      <td className="px-4 py-3 font-sans text-xs text-white/70">{cost}</td>
                      <td className={`px-4 py-3 font-sans text-xs ${i === 7 ? "text-white font-semibold" : "text-white/60"}`}>{nonRes}</td>
                      <td className={`px-4 py-3 font-sans text-xs hidden md:table-cell ${i === 7 ? "text-white font-semibold" : "text-white/60"}`}>{ukRes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-sans text-xs text-white/30 mt-3 italic">Figures indicative for a £400,000 purchase in England. Stamp Duty calculated on standard residential rates as of June 2026.</p>
          </section>

          {/* Calculator CTA strip */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6">
              RUN YOUR OWN NUMBERS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: "What salary do I need?", desc: "Reverse-calculate the income needed at 4×, 4.5×, and 5× multiples for any property price.", to: "/mortgages/salary-for-mortgage", cta: "Salary Calculator" },
                { title: "What's my monthly payment?", desc: "Enter loan amount, rate and term to see your exact monthly mortgage repayment.", to: "/mortgage-calculator", cta: "Mortgage Calculator" },
                { title: "Stamp duty breakdown", desc: "Calculate SDLT including the non-resident 2% surcharge. See where each band falls.", to: "/stamp-duty-calculator", cta: "Stamp Duty Calculator" },
              ].map((card) => (
                <div key={card.to} className="p-5 bg-dark-card border border-dark-border rounded-lg flex flex-col">
                  <h3 className="font-heading text-sm text-white uppercase tracking-wide mb-2">{card.title}</h3>
                  <p className="font-sans text-xs text-white/50 leading-relaxed flex-1 mb-4">{card.desc}</p>
                  <Link
                    to={card.to}
                    className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider"
                    style={{ color: ACCENT }}
                  >
                    {card.cta} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-8">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-3">
              {faqSchema.map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-dark-border rounded-lg bg-dark-card overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-heading text-sm text-white uppercase tracking-wide select-none">
                    <span>{faq.question}</span>
                    <span className="text-orange-400 text-lg font-light flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="font-sans text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related articles */}
          <section>
            <h2 className="font-display text-2xl text-white tracking-wide mb-6">RELATED MORTGAGE GUIDES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Is now a good time to buy in London?", to: "/mortgages", badge: "London Market" },
                { title: "Mortgage Overpayment Calculator", to: "/mortgage-overpayment-calculator", badge: "Tool" },
                { title: "How much can I borrow? Mortgage Calculator", to: "/mortgage-calculator", badge: "Tool" },
                { title: "First-Time Buyer Stamp Duty Explained", to: "/stamp-duty-calculator", badge: "Tax" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center justify-between gap-3 p-4 bg-dark-card border border-dark-border rounded-lg hover:border-orange-500/40 transition-colors group"
                >
                  <span className="font-sans text-sm text-white/75 group-hover:text-white transition-colors">{link.title}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-heading uppercase tracking-widest px-2 py-0.5 rounded border border-dark-border text-white/30">{link.badge}</span>
                    <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-orange-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <FinancialDisclosure variant="mortgage" />
        </div>
      </main>
    </>
  );
}
