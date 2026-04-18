import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "Does overpaying a mortgage actually save money?", answer: "Yes — significantly. Every pound you overpay reduces your outstanding balance, which reduces the interest calculated next month. On a £200,000 mortgage at 4.5%, overpaying £200/month saves roughly £26,000 in interest and cuts 5 years off your term." },
  { question: "How much can I overpay without a penalty?", answer: "Most fixed rate mortgages allow overpayments of up to 10% of the outstanding balance per year without an early repayment charge. Always check your mortgage terms. Tracker and variable rate mortgages often allow unlimited overpayments." },
  { question: "Is it better to overpay my mortgage or invest?", answer: "It depends on your mortgage rate versus expected investment returns. If your mortgage rate is 5% and you expect investments to return 7%, investing wins mathematically. But overpaying is risk-free and guaranteed — investments aren't. Most financial advisers suggest doing both if you can." },
  { question: "Should I increase my monthly payment or make lump sum overpayments?", answer: "Both work. Regular monthly overpayments compound more efficiently over time. Lump sum payments are useful when you have bonus income or savings. Many people do both — a modest monthly overpayment plus an annual lump sum when their bonus arrives." },
  { question: "What happens at the end of a fixed rate if I've overpaid?", answer: "Your outstanding balance will be lower than the original schedule, which means a lower LTV at remortgage time. That can unlock a better rate, compounding the benefit of your overpayments further." },
];

export default function PayOffMortgageEarly() {
  return (
    <>
      <SEO
        title="How to Pay Off Your Mortgage Early — The Numbers That Actually Work"
        description="You don't need to overpay by thousands to cut years off your mortgage. Small, consistent overpayments compound dramatically. Here's the maths."
        keywords="pay off mortgage early, mortgage overpayment calculator, overpay mortgage uk, mortgage early repayment, save interest mortgage"
        canonicalUrl="https://www.thecalculatorapp.org/blog/pay-off-mortgage-early"
        faqSchema={faqs}
      />
      <BlogLayout
        title="How to Pay Off Your Mortgage Early — The Numbers That Actually Work"
        subtitle="Small overpayments compound harder than most people realise. The maths might surprise you."
        category="Mortgage"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="Yes, overpaying your mortgage saves significant money by reducing the outstanding balance earlier, which means less interest is charged on every future payment. On a £200,000 mortgage at 4.5%, overpaying £200 per month saves roughly £26,000 in interest and cuts 5 years from a 25-year term."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "Mortgage Calculator", path: "/finance/mortgage" },
          { label: "Mortgage Overpayment", path: "/finance/mortgage-overpayment" },
          { label: "Stamp Duty Calculator", path: "/finance/stamp-duty" },
          { label: "Mortgage Comparison", path: "/finance/mortgage-cost-comparison" },
        ]}
        relatedArticles={[
          { title: "Mortgage Overpayment Calculator", description: "See exactly how much interest you save and how many years you cut.", url: "/finance/mortgage-overpayment" },
          { title: "Mortgage Calculator", description: "Understand your baseline repayments before you plan overpayments.", url: "/finance/mortgage" },
          { title: "Weekly Mortgage Calculator", description: "Switching to weekly payments is another way to cut your term.", url: "/finance/weekly-mortgage" },
        ]}
      >
        <p>A 25-year mortgage doesn't have to take 25 years. Most people could pay theirs off significantly earlier without making a dramatic change to their lifestyle. The mechanism is simple — and the compounding effect is bigger than it looks.</p>

        <h2>Why overpayments are so powerful</h2>

        <p>Mortgage interest is calculated on your outstanding balance. Reduce the balance faster, and every future interest calculation is on a smaller number. The saving isn't just for one month — it compounds through every remaining payment.</p>

        <p>Take a £200,000 mortgage at 4.5% over 25 years. Monthly payment: <strong>£1,111</strong>. Total interest: <strong>£133,300</strong>.</p>

        <p>Overpay by <strong>£200/month</strong>:</p>
        <ul>
          <li>Interest saved: <strong>~£26,000</strong></li>
          <li>Term cut: <strong>~5 years</strong></li>
          <li>You pay off at year 20 instead of year 25</li>
        </ul>

        <p>£200 extra per month. Five fewer years of mortgage payments. That's the compounding effect in action.</p>

        <h2>The 10% rule</h2>

        <p>Most fixed rate mortgages allow you to overpay up to <strong>10% of the outstanding balance per year</strong> without an early repayment charge. On a £200,000 mortgage that's £20,000 per year — far more than most people would ever overpay.</p>

        <p>Always check your mortgage terms. Tracker and variable rate mortgages typically allow unlimited overpayments. If you're mid-fix, stay within the 10% limit.</p>

        <h2>Monthly overpayments vs lump sums</h2>

        <p>Both work. Regular monthly overpayments are slightly more efficient because they reduce your balance sooner, giving compound interest less to work with throughout the year. Lump sums are excellent when you get bonus income, an inheritance, or unexpected cash.</p>

        <p>The best approach: a modest monthly overpayment you can sustain indefinitely, plus an annual lump sum when you can afford it.</p>

        <h2>But what about investing?</h2>

        <p>If your mortgage rate is 4.5% and you believe you can make 7%+ investing, the maths favours investing. That's true. But overpaying is <em>guaranteed</em>. Investment returns are not. For most people, doing both — overpaying modestly and investing the rest — is the right balance.</p>

        <h2>Run your own numbers</h2>

        <p>Use the mortgage overpayment calculator to see exactly what your overpayments would save. Enter your balance, rate, and term — then adjust the overpayment amount and watch the interest saving update in real time.</p>
      </BlogLayout>
    </>
  );
}
