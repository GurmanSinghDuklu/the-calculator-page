import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "How do you calculate a percentage of a number?", answer: "Multiply the number by the percentage and divide by 100. For example: 20% of £350 = (350 × 20) ÷ 100 = £70. Or simply multiply by the decimal equivalent: 350 × 0.20 = £70. This works for any percentage — 15% of 80 = 80 × 0.15 = 12." },
  { question: "How do you calculate percentage change?", answer: "Percentage change = ((New Value − Old Value) ÷ Old Value) × 100. If a price rises from £40 to £52: ((52 − 40) ÷ 40) × 100 = 30% increase. If it falls from £52 to £40: ((40 − 52) ÷ 52) × 100 = −23.1% decrease. Note that a 30% rise followed by a 23.1% fall brings you back to the same number." },
  { question: "How do you work out what percentage one number is of another?", answer: "Divide the part by the whole and multiply by 100. If 45 students out of 180 passed: (45 ÷ 180) × 100 = 25%. You scored 68 out of 85 on a test: (68 ÷ 85) × 100 = 80%. This formula works for any 'X is what % of Y' question." },
  { question: "How do you reverse a percentage (find the original number)?", answer: "Divide the final number by (1 + the percentage as a decimal) for an increase, or (1 − the decimal) for a decrease. A TV costs £399 after a 20% discount — what was the original price? £399 ÷ (1 − 0.20) = £399 ÷ 0.80 = £498.75. This is called reverse percentage or working backwards from a percentage." },
  { question: "How do you add VAT to a price?", answer: "Multiply the price by 1.20 for standard 20% UK VAT. £85 + VAT = £85 × 1.20 = £102. To remove VAT from a VAT-inclusive price, divide by 1.20: £102 ÷ 1.20 = £85 (ex-VAT). For the 5% reduced VAT rate, multiply by 1.05 or divide by 1.05 to remove it." },
];

export default function HowToCalculatePercentage() {
  return (
    <>
      <SEO
        title="How to Calculate a Percentage — 5 Methods With Examples (2025)"
        description="Percentage of a number, percentage change, reverse percentage, VAT — all the formulas explained with simple worked examples you can use instantly."
        keywords="how to calculate percentage, percentage formula, percentage change formula, reverse percentage, how to work out percentage"
        canonicalUrl="https://www.thecalculatorapp.org/blog/how-to-calculate-percentage"
        faqSchema={faqs}
      />
      <BlogLayout
        title="How to Calculate a Percentage"
        subtitle="Five types of percentage calculation — with the formula, a worked example, and when to use each one."
        category="Everyday Maths"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="To find X% of a number: multiply by the decimal (e.g. 20% of £350 = 350 × 0.20 = £70). To find percentage change: ((New − Old) ÷ Old) × 100. To find what percentage A is of B: (A ÷ B) × 100. To reverse a percentage increase: divide by (1 + decimal). To reverse a decrease or remove VAT: divide by (1 − decimal) or divide by 1.20 for 20% VAT."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Percentage Calculator", path: "/misc/percentage" },
          { label: "Percentage Change Calculator", path: "/misc/percentage-change" },
          { label: "Percentage Of Calculator", path: "/misc/percentage-of" },
          { label: "Discount Calculator", path: "/misc/discount" },
          { label: "VAT Calculator", path: "/finance/vat-calculator" },
        ]}
        relatedArticles={[
          { title: "Discount Calculator", description: "Work out sale prices and savings instantly.", url: "/misc/discount" },
          { title: "VAT Calculator", description: "Add or remove UK VAT at any rate.", url: "/finance/vat-calculator" },
        ]}
      >
        <p>Percentages come up constantly — discounts, pay rises, interest rates, exam scores, VAT. Most people guess or reach for a calculator without knowing the underlying formula. Once you know three core methods, everything else is a variation.</p>

        <h2>Method 1: Find X% of a number</h2>

        <p><strong>Formula:</strong> Number × (Percentage ÷ 100)</p>
        <p><strong>Shortcut:</strong> Number × decimal equivalent</p>

        <p>Common decimal equivalents:</p>
        <ul>
          <li>10% = × 0.10</li>
          <li>15% = × 0.15</li>
          <li>20% = × 0.20</li>
          <li>25% = × 0.25</li>
          <li>50% = × 0.50</li>
        </ul>

        <p><strong>Examples:</strong></p>
        <ul>
          <li>15% tip on a £64 restaurant bill: 64 × 0.15 = <strong>£9.60</strong></li>
          <li>20% deposit on a £280,000 house: 280,000 × 0.20 = <strong>£56,000</strong></li>
          <li>3% pension contribution on a £42,000 salary: 42,000 × 0.03 = <strong>£1,260/year</strong></li>
        </ul>

        <h2>Method 2: What percentage is A of B?</h2>

        <p><strong>Formula:</strong> (A ÷ B) × 100</p>

        <p><strong>Examples:</strong></p>
        <ul>
          <li>You scored 54 out of 75 on a test: (54 ÷ 75) × 100 = <strong>72%</strong></li>
          <li>You spend £380 on food out of a £1,900 monthly budget: (380 ÷ 1,900) × 100 = <strong>20%</strong></li>
          <li>A company's profit is £180,000 on revenue of £1,200,000: (180,000 ÷ 1,200,000) × 100 = <strong>15% profit margin</strong></li>
        </ul>

        <h2>Method 3: Percentage change</h2>

        <p><strong>Formula:</strong> ((New − Old) ÷ Old) × 100</p>

        <p>Positive result = increase. Negative result = decrease.</p>

        <p><strong>Examples:</strong></p>
        <ul>
          <li>Salary rises from £35,000 to £38,500: ((38,500 − 35,000) ÷ 35,000) × 100 = <strong>+10%</strong></li>
          <li>House price falls from £310,000 to £287,000: ((287,000 − 310,000) ÷ 310,000) × 100 = <strong>−7.4%</strong></li>
          <li>Monthly energy bill drops from £190 to £152: ((152 − 190) ÷ 190) × 100 = <strong>−20%</strong></li>
        </ul>

        <p><strong>The trap:</strong> A 50% increase followed by a 50% decrease does not return to the original. £100 → +50% → £150 → −50% → £75. The percentages are calculated on different bases each time.</p>

        <h2>Method 4: Reverse percentage (find the original)</h2>

        <p>You know the final price and the percentage change. You need the original.</p>

        <p><strong>After an increase:</strong> Original = Final ÷ (1 + decimal)</p>
        <p><strong>After a decrease:</strong> Original = Final ÷ (1 − decimal)</p>

        <p><strong>Examples:</strong></p>
        <ul>
          <li>A jacket costs £119 after a 30% increase. Original price: £119 ÷ 1.30 = <strong>£91.54</strong></li>
          <li>A TV costs £340 after a 15% discount. Original price: £340 ÷ 0.85 = <strong>£400</strong></li>
          <li>Your salary after a 5% pay cut is £33,250. Original salary: £33,250 ÷ 0.95 = <strong>£35,000</strong></li>
        </ul>

        <h2>Method 5: Adding and removing VAT</h2>

        <p>UK VAT at the standard rate is 20%. These two operations cover 99% of VAT calculations:</p>

        <p><strong>Add VAT (ex-VAT to inc-VAT):</strong> Price × 1.20</p>
        <p><strong>Remove VAT (inc-VAT to ex-VAT):</strong> Price ÷ 1.20</p>

        <ul>
          <li>A service costs £850 ex-VAT. VAT-inclusive price: 850 × 1.20 = <strong>£1,020</strong></li>
          <li>An invoice shows £2,400 inc-VAT. Ex-VAT amount: 2,400 ÷ 1.20 = <strong>£2,000</strong>. VAT element: £400.</li>
        </ul>

        <p>For the reduced 5% VAT rate (energy, children's car seats, etc.): multiply by 1.05 to add, divide by 1.05 to remove.</p>

        <h2>Mental shortcuts worth memorising</h2>

        <ul>
          <li><strong>10% of anything:</strong> move the decimal point one place left. 10% of £847 = £84.70</li>
          <li><strong>5%:</strong> find 10% and halve it. 5% of £847 = £42.35</li>
          <li><strong>15%:</strong> find 10% + 5%. 15% of £847 = £84.70 + £42.35 = £127.05</li>
          <li><strong>1%:</strong> move the decimal two places left. 1% of £2,600 = £26</li>
          <li><strong>Any %:</strong> build from 1% and 10%</li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </BlogLayout>
    </>
  );
}
