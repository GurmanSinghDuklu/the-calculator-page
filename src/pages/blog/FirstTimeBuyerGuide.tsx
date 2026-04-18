import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "How much deposit do I need as a first-time buyer?", answer: "The minimum is typically 5% of the purchase price. On a £250,000 property that's £12,500. A 10% deposit opens up significantly better mortgage rates. Most financial advisers recommend saving at least 10% if you can, as the rate difference saves more than the extra time spent saving." },
  { question: "What government schemes are available for first-time buyers in 2025?", answer: "The main scheme in 2025 is the Mortgage Guarantee Scheme, which helps buyers with 5% deposits access 95% LTV mortgages. Shared Ownership allows you to buy a percentage of a property and pay rent on the rest. Help to Buy ISA and the Lifetime ISA (LISA) provide government top-ups on savings used for a first home purchase." },
  { question: "What is a Lifetime ISA and should I use one?", answer: "A Lifetime ISA (LISA) lets you save up to £4,000 per year and receive a 25% government bonus — up to £1,000 per year. The money must be used to buy your first home (valued under £450,000) or held until retirement. It's one of the best savings vehicles available to first-time buyers." },
  { question: "How long does it take to buy a house as a first-time buyer?", answer: "From offer accepted to completion typically takes 8–12 weeks. Getting a mortgage agreement in principle before you start viewing takes 1–2 days. The full process including solicitors, surveys, and searches usually runs 2–4 months." },
  { question: "Should I use a mortgage broker as a first-time buyer?", answer: "Almost always yes. Brokers have access to deals not available directly to consumers, can advise on which lenders are most likely to accept your specific situation, and handle the paperwork. Many charge no fee (they're paid by the lender). For a first purchase, the guidance is worth more than the potential saving of going direct." },
];

export default function FirstTimeBuyerGuide() {
  return (
    <>
      <SEO
        title="First-Time Buyer UK 2025 — The Numbers You Need Before You Apply"
        description="Deposit, affordability, stamp duty relief, LISAs, schemes. Everything a first-time buyer needs to know in 2025 — with the actual numbers."
        keywords="first time buyer uk 2025, first time buyer guide, first time buyer deposit, first time buyer mortgage, lifetime isa first home"
        canonicalUrl="https://www.thecalculatorapp.org/blog/first-time-buyer-uk-2025"
        faqSchema={faqs}
      />
      <BlogLayout
        title="First-Time Buyer UK 2025 — The Numbers You Need Before You Apply"
        subtitle="Before you look at a single property, know your deposit, your borrowing limit, and your stamp duty bill."
        category="Mortgage"
        publishDate="April 2026"
        readTime="5 min"
        heroImage="/og-image.png"
        directAnswer="The minimum deposit for a UK mortgage is 5% of the purchase price. On a £250,000 property that is £12,500. However, a 10% deposit unlocks significantly better mortgage rates — typically 0.3 to 0.5 percentage points lower — which saves more over the term than the extra time spent saving. First-time buyers can use a Lifetime ISA to receive a 25% government bonus on up to £4,000 per year."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
          { label: "Mortgage Calculator", path: "/finance/mortgage" },
          { label: "Future House Value", path: "/finance/future-house-value" },
        ]}
        relatedArticles={[
          { title: "Mortgage Calculator", description: "Calculate your monthly repayments on any loan amount.", url: "/finance/mortgage" },
          { title: "Stamp Duty Calculator", description: "First-time buyer relief calculated instantly.", url: "/finance/stamp-duty" },
          { title: "How Much Can I Borrow?", description: "Work out your maximum mortgage before you start viewing.", url: "/blog/how-much-can-i-borrow-mortgage-uk" },
        ]}
      >
        <p>The biggest mistake first-time buyers make is falling in love with a house before they know what they can actually afford. By the time the numbers don't work, they're emotionally committed to a property they can't have.</p>

        <p>Do the maths first. Everything else follows.</p>

        <h2>Your deposit — the minimum and the ideal</h2>

        <p>The minimum deposit for most mortgages is <strong>5%</strong>. On a £250,000 property that's £12,500. On a £350,000 property it's £17,500.</p>

        <p>But 5% gets you the most expensive rates. A 10% deposit (£25,000 on a £250k property) unlocks meaningfully better deals — typically 0.3–0.5% lower rates, saving thousands over the term. If you can wait the extra time to save a 10% deposit, the maths usually support it.</p>

        <h2>The LISA — the most underused first-time buyer tool</h2>

        <p>A Lifetime ISA gives you a <strong>25% government bonus</strong> on up to £4,000 per year — a free £1,000 annually. That's not a small print deal. That's real money added to your deposit savings.</p>

        <p>Rules: you must be 18–39 to open one. The money must go towards a first home worth under £450,000. You can't touch the money until you buy or turn 60 (there's a withdrawal penalty otherwise).</p>

        <p>If you're planning to buy in 2–5 years and haven't opened a LISA, open one now. Even parking £1 in it opens your account and starts the clock.</p>

        <h2>What you can borrow</h2>

        <p>Lenders typically offer <strong>4–4.5x your annual salary</strong>. Joint buyers use combined income. A couple earning £35,000 each (£70,000 combined) can borrow approximately £280,000–£315,000.</p>

        <p>Existing debt, childcare costs, and car finance all reduce this figure. Get an Agreement in Principle from a lender or broker before you start viewing — it's free, quick, and tells you your real number.</p>

        <h2>Stamp duty as a first-time buyer</h2>

        <p>First-time buyers pay <strong>0% up to £300,000</strong> and 5% on the portion from £300,001 to £500,000. Above £500,000 there's no relief.</p>

        <p>On a £350,000 first purchase: 0% on £300k + 5% on £50k = <strong>£2,500</strong>. A non-first-time buyer pays £7,500 on the same property. Budget for this before you add it to your deposit savings.</p>

        <h2>The realistic timeline</h2>

        <ul>
          <li><strong>Today:</strong> Open a LISA if you haven't. Start saving.</li>
          <li><strong>When deposit ready:</strong> Get an Agreement in Principle.</li>
          <li><strong>Offer accepted:</strong> Instruct a solicitor and book a survey.</li>
          <li><strong>Completion:</strong> 8–12 weeks after offer acceptance typically.</li>
        </ul>

        <p>Use the mortgage calculator to model your monthly costs at different property prices before you go to any viewings. Know your comfortable payment range. Stick to it.</p>
      </BlogLayout>
    </>
  );
}
