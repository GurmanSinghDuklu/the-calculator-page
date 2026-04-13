import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "How much can I borrow for a mortgage in the UK?", answer: "Most UK lenders offer between 4 and 4.5 times your annual income. On a £50,000 salary that's £200,000–£225,000. Some lenders stretch to 5x or 5.5x for higher earners or certain professions. Your deposit size, credit score, and existing debts all affect the final figure." },
  { question: "Does my deposit size affect how much I can borrow?", answer: "Yes, significantly. A larger deposit means a lower loan-to-value (LTV) ratio, which unlocks better interest rates and sometimes higher lending multiples. A 10% deposit gets you in the door. A 20%+ deposit gets you meaningfully better deals." },
  { question: "Can two salaries be combined for a mortgage?", answer: "Yes. Joint applications typically use a multiple of the combined income — so two people earning £35,000 each (£70,000 combined) could borrow £280,000–£315,000 at 4–4.5x. Some lenders weight the calculation differently for joint applications." },
  { question: "What reduces how much I can borrow?", answer: "Existing debt repayments, car finance, credit card balances, student loan deductions, and childcare costs all reduce your affordability. Lenders run a stress test assuming rates at around 6–7% to make sure you could still afford repayments if rates rise." },
  { question: "Is the mortgage calculator figure the same as what a lender will offer?", answer: "No. The calculator gives you an accurate estimate based on income multiples and standard affordability rules. Your actual offer depends on a full underwriting assessment — credit history, employment type, existing commitments, and the specific lender's criteria." },
];

export default function HowMuchCanIBorrow() {
  return (
    <>
      <SEO
        title="How Much Can I Borrow for a Mortgage in the UK? (2025 Guide)"
        description="UK lenders use income multiples, deposit size, and affordability stress tests to decide what you can borrow. Here's exactly how the numbers work."
        keywords="how much can i borrow mortgage uk, mortgage affordability calculator, mortgage income multiple, uk mortgage 2025"
        canonicalUrl="https://www.thecalculatorapp.org/blog/how-much-can-i-borrow-mortgage-uk"
        faqSchema={faqs}
      />
      <BlogLayout
        title="How Much Can I Borrow for a Mortgage in the UK?"
        subtitle="Lenders have a formula. Once you understand it, you can work the system in your favour."
        category="Mortgage"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        hasPaidSection={false}
        relatedArticles={[
          { title: "Mortgage Calculator", description: "Work out your exact monthly repayments based on what you borrow.", url: "/finance/mortgage" },
          { title: "Mortgage Overpayment Calculator", description: "See how overpaying now slashes years off your term.", url: "/finance/mortgage-overpayment" },
          { title: "Stamp Duty Calculator", description: "Find out exactly what stamp duty you'll owe before you commit.", url: "/finance/stamp-duty" },
        ]}
      >
        <p>Most people approach a mortgage backwards. They find a house they want, then wonder if they can afford it. The smarter move is to know your number before you walk into a single viewing.</p>

        <h2>The income multiple rule</h2>

        <p>UK lenders typically offer between <strong>4x and 4.5x your annual gross salary</strong>. That's the starting point for most applications.</p>

        <ul>
          <li>£40,000 salary → borrow up to £160,000–£180,000</li>
          <li>£60,000 salary → borrow up to £240,000–£270,000</li>
          <li>£80,000 salary → borrow up to £320,000–£360,000</li>
        </ul>

        <p>Some lenders — particularly for professionals like doctors, lawyers, and accountants — will stretch to <strong>5x or 5.5x</strong>. That's not a rumour. It's a specific product category several high street lenders offer.</p>

        <h2>Your deposit changes everything</h2>

        <p>The loan-to-value ratio (LTV) is the percentage of the property price you're borrowing. A £200,000 house with a £20,000 deposit means an LTV of 90%.</p>

        <p>The lower your LTV, the better your rate — and sometimes the more you can borrow. Getting from 90% to 85% LTV can drop your rate by 0.3–0.5%. On a £200,000 mortgage over 25 years, that's thousands.</p>

        <h2>What lenders actually test</h2>

        <p>The income multiple is just the headline. Behind it, lenders run an <strong>affordability assessment</strong> that looks at:</p>

        <ul>
          <li>Your monthly debt commitments (car finance, credit cards, student loan)</li>
          <li>Your living costs and dependents</li>
          <li>A stress test — can you afford repayments if rates hit 6–7%?</li>
        </ul>

        <p>Two people on the same salary can get very different offers based on their outgoings. Someone with no debt and no dependents will almost always outborrow someone with a car on finance and two children.</p>

        <h2>Joint applications</h2>

        <p>If you're buying with a partner, most lenders combine both incomes and apply the same 4–4.5x multiple. Two salaries of £35,000 each gives a combined £70,000 — and a potential borrowing range of <strong>£280,000–£315,000</strong>.</p>

        <p>Some lenders weight the higher earner's salary more heavily. Worth asking about when you compare deals.</p>

        <h2>Get your number before you start</h2>

        <p>Use the mortgage calculator to run the numbers on what your repayments would actually look like at different borrowing levels. Then you'll walk into every viewing knowing exactly where you stand.</p>
      </BlogLayout>
    </>
  );
}
