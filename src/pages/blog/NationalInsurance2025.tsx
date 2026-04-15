import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What are the National Insurance rates for 2025/26?", answer: "For 2025/26, employees pay 8% National Insurance on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. The lower earnings limit is £6,396. Below that, no NI is due. Self-employed people pay Class 4 NI at 6% on profits between £12,570 and £50,270, and 2% above." },
  { question: "What is the National Insurance threshold for 2025/26?", answer: "The Primary Threshold — where employees start paying NI — is £12,570 per year (£1,048 per month). This aligns with the income tax personal allowance. Below £12,570, you pay no NI. Between £6,396 and £12,570 you're still building NI credits without actually paying contributions." },
  { question: "Does National Insurance reduce after 50 or 60?", answer: "No. Employee NI rates are the same regardless of age until you reach State Pension age. Once you reach State Pension age, you stop paying employee National Insurance entirely — even if you continue working." },
  { question: "How does National Insurance affect my State Pension?", answer: "You need 35 qualifying years of NI contributions for the full new State Pension (£221.20 per week in 2025/26). Earning between £6,396 and £12,570 counts as a qualifying year even though you don't pay contributions. You can also make voluntary Class 3 contributions (£17.45/week in 2025/26) to fill gaps." },
  { question: "Do employers pay National Insurance too?", answer: "Yes. Employers pay Class 1 NI at 15% on employee earnings above £5,000 per year (from April 2025). This is a cost to the employer on top of your salary — you don't see it in your payslip, but it significantly increases the total cost of employing you." },
];

export default function NationalInsurance2025() {
  return (
    <>
      <SEO
        title="National Insurance 2025/26 — Rates, Thresholds and What You Actually Pay"
        description="National Insurance rates for 2025/26: 8% up to £50,270, 2% above. Here's how NI is calculated, how it affects your take-home, and what it means for your State Pension."
        keywords="national insurance 2025, national insurance rates 2025, ni threshold 2025, national insurance calculator, how much national insurance do i pay"
        canonicalUrl="https://www.thecalculatorapp.org/blog/national-insurance-2025"
        faqSchema={faqs}
      />
      <BlogLayout
        title="National Insurance 2025/26 — Rates, Thresholds and What You Actually Pay"
        subtitle="The second deduction on your payslip — and the one most people understand least."
        category="Salary & Tax"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="In 2025/26, employees pay 8% National Insurance on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. There is no NI below £12,570. On a £40,000 salary that is approximately £2,194 per year in NI contributions, or £183 per month, on top of income tax."
        hasPaidSection={false}
        relatedArticles={[
          { title: "UK Salary Calculator", description: "See your exact take-home after income tax and National Insurance.", url: "/finance/salary" },
          { title: "UK Tax Brackets 2025/26", description: "How income tax and NI combine to determine what you keep.", url: "/blog/uk-tax-brackets-2025" },
          { title: "What Is the Personal Allowance?", description: "The tax-free amount that also aligns with the NI threshold.", url: "/blog/personal-allowance-uk" },
        ]}
      >
        <p>Most people know they pay income tax. Fewer people know exactly how much National Insurance they pay — or what they're getting for it. It's on every payslip, it's significant, and it's worth understanding properly.</p>

        <h2>The 2025/26 employee NI rates</h2>

        <ul>
          <li><strong>£0 – £12,570</strong> — No NI (below Primary Threshold)</li>
          <li><strong>£12,571 – £50,270</strong> — 8% NI</li>
          <li><strong>Above £50,270</strong> — 2% NI</li>
        </ul>

        <p>On a £40,000 salary, that's: 8% on £27,430 (£40,000 minus £12,570) = <strong>£2,194 per year</strong> in NI, or about £183 per month.</p>

        <p>On a £60,000 salary: 8% on £37,700 + 2% on £9,730 = £3,016 + £195 = <strong>£3,211 per year</strong>.</p>

        <h2>How NI compares to income tax</h2>

        <p>NI and income tax have the same lower threshold (£12,570) but different upper limits. Income tax jumps to 40% at £50,270. NI drops to 2% at the same point. The combined marginal rate on income between £12,570 and £50,270 is 20% + 8% = <strong>28%</strong>. Above £50,270 it's 40% + 2% = <strong>42%</strong>.</p>

        <p>This is why a pay rise from £49,000 to £55,000 doesn't feel as generous as it sounds — 42% of every extra pound above £50,270 goes to HMRC.</p>

        <h2>What NI actually pays for</h2>

        <p>National Insurance contributions build entitlement to the State Pension and other benefits including Jobseeker's Allowance, Employment and Support Allowance, and Maternity Allowance. You need <strong>35 qualifying years</strong> to get the full new State Pension — currently <strong>£221.20 per week</strong> in 2025/26.</p>

        <p>Even if you earn between £6,396 and £12,570 — below the threshold where you actually pay contributions — those years still count as qualifying years. You're building your pension record without making any payment.</p>

        <h2>What happens when you reach State Pension age</h2>

        <p>Once you reach State Pension age (currently 66), you stop paying employee National Insurance — even if you keep working. That's a significant boost to your take-home pay if you work past 66.</p>

        <h2>Self-employed NI rates</h2>

        <p>Self-employed people pay Class 4 NI instead of Class 1: <strong>6%</strong> on profits between £12,570 and £50,270, and 2% above. That's lower than employee rates — but employees also benefit from employer contributions (15% on wages above £5,000) that fund the same entitlements.</p>

        <h2>Check your take-home</h2>

        <p>The salary calculator calculates both income tax and National Insurance together, showing you the exact split and your real take-home figure. Enter your salary to see both deductions side by side.</p>
      </BlogLayout>
    </>
  );
}
