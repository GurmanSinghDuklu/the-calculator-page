import { BlogLayout } from "@/components/BlogLayout";
import { SEO } from "@/components/SEO";

const faqs = [
  { question: "What is a healthy BMI?", answer: "The World Health Organisation (WHO) classifies BMI for adults as: underweight (below 18.5), healthy weight (18.5–24.9), overweight (25–29.9), and obese (30 and above). A BMI of 18.5–24.9 is considered the healthy range. However, BMI is a screening tool, not a diagnostic measure — it doesn't account for muscle mass, bone density, age, or ethnic differences in body composition." },
  { question: "How do you calculate BMI?", answer: "BMI = weight in kilograms ÷ (height in metres)². For example: a person who is 75kg and 1.75m tall has a BMI of 75 ÷ (1.75 × 1.75) = 75 ÷ 3.0625 = 24.5. In imperial: BMI = (weight in pounds × 703) ÷ (height in inches)². A 165lb person who is 5'9\" (69 inches): (165 × 703) ÷ (69 × 69) = 116,000 ÷ 4,761 = 24.4." },
  { question: "What BMI is considered obese?", answer: "A BMI of 30 or above is classified as obese. This is further divided into: Class 1 obesity (30–34.9), Class 2 obesity (35–39.9), and Class 3/morbid obesity (40 and above). For people of Asian descent, the NHS uses lower thresholds — increased health risk begins at 23, and obesity is classified at 27.5. This is because the same BMI corresponds to a higher body fat percentage in many Asian populations." },
  { question: "Is BMI accurate?", answer: "BMI is a useful population-level screening tool but has well-documented limitations. It overestimates body fat in athletes and muscular individuals (a professional rugby player might have a BMI of 29 with very low body fat). It underestimates body fat in older adults who have lost muscle mass. It also doesn't account for where fat is distributed — visceral fat around the abdomen carries higher health risks than subcutaneous fat. Waist circumference and waist-to-hip ratio are better indicators of metabolic risk." },
  { question: "What is a healthy BMI for women vs men?", answer: "The WHO BMI classifications are the same for men and women. However, women naturally have a higher body fat percentage than men at the same BMI due to physiological differences (breast tissue, reproductive organs, hormonal differences). A healthy body fat percentage is approximately 20–35% for women and 8–24% for men. BMI does not measure body fat directly, so two people with identical BMIs can have very different body compositions." },
];

export default function WhatIsBMI() {
  return (
    <>
      <SEO
        title="What Is BMI? How to Calculate It and What It Means (2025)"
        description="BMI = weight (kg) ÷ height (m)². Healthy range is 18.5–24.9. Here's how to calculate yours, what the categories mean, and where BMI falls short."
        keywords="what is bmi, how to calculate bmi, healthy bmi, bmi chart uk, bmi calculator, what is a healthy bmi"
        canonicalUrl="https://www.thecalculatorapp.org/blog/what-is-bmi"
        faqSchema={faqs}
      />
      <BlogLayout
        title="What Is BMI?"
        subtitle="Body Mass Index measures weight relative to height. Healthy is 18.5–24.9. Here's the formula, the categories, and why BMI has real limitations."
        category="Health"
        publishDate="April 2026"
        readTime="4 min"
        heroImage="/og-image.png"
        directAnswer="BMI (Body Mass Index) = weight in kg ÷ height in metres squared. A BMI of 18.5–24.9 is healthy weight. Below 18.5 is underweight. 25–29.9 is overweight. 30 or above is obese. BMI is a useful screening tool but doesn't measure body fat directly — it misclassifies muscular athletes as overweight and can underestimate risk in people with low muscle mass."
        hasPaidSection={false}
        relatedCalculators={[
          { label: "BMI Calculator", path: "/misc/bmi-calculator" },
          { label: "Calorie Calculator", path: "/misc/calorie-calculator" },
        ]}
        relatedArticles={[
          { title: "Calorie Calculator", description: "Your daily calorie needs based on weight, height, age and activity.", url: "/misc/calorie-calculator" },
        ]}
      >
        <p>BMI is one of the most widely used — and most misunderstood — health metrics. GPs use it. Insurers use it. It takes 10 seconds to calculate. But it doesn't tell you what most people think it does.</p>

        <h2>How to calculate BMI</h2>

        <p><strong>Metric:</strong> BMI = weight (kg) ÷ height (m)²</p>
        <p><strong>Imperial:</strong> BMI = (weight in lbs × 703) ÷ height (inches)²</p>

        <p><strong>Worked examples:</strong></p>
        <ul>
          <li>80kg, 1.78m: 80 ÷ (1.78²) = 80 ÷ 3.1684 = <strong>25.2</strong> (overweight)</li>
          <li>62kg, 1.65m: 62 ÷ (1.65²) = 62 ÷ 2.7225 = <strong>22.8</strong> (healthy)</li>
          <li>95kg, 1.80m: 95 ÷ (1.80²) = 95 ÷ 3.24 = <strong>29.3</strong> (overweight)</li>
        </ul>

        <h2>BMI categories (WHO classification)</h2>

        <ul>
          <li><strong>Below 18.5</strong> — Underweight</li>
          <li><strong>18.5–24.9</strong> — Healthy weight</li>
          <li><strong>25.0–29.9</strong> — Overweight</li>
          <li><strong>30.0–34.9</strong> — Obese (Class 1)</li>
          <li><strong>35.0–39.9</strong> — Obese (Class 2)</li>
          <li><strong>40.0 and above</strong> — Severely obese (Class 3)</li>
        </ul>

        <p>The NHS uses lower thresholds for people of South Asian, Chinese, Black African, African-Caribbean, and other non-white ethnic backgrounds, as research shows higher health risks at lower BMI levels in these populations. For these groups, overweight begins at 23 and obese at 27.5.</p>

        <h2>Why BMI has real limitations</h2>

        <p>BMI was developed in the 1830s by Belgian mathematician Adolphe Quetelet as a population statistics tool — not as a medical diagnostic for individuals. It has several well-documented flaws:</p>

        <p><strong>It doesn't measure body fat.</strong> BMI measures weight relative to height. Muscle weighs more than fat. A highly muscular person — a professional athlete, a weightlifter — will often have a BMI in the overweight range despite being extremely lean. Conversely, a sedentary person with low muscle mass might have a "healthy" BMI while carrying a high proportion of body fat.</p>

        <p><strong>It ignores fat distribution.</strong> Where you carry fat matters more than how much you carry. Visceral fat — stored around internal organs in the abdomen — is strongly associated with type 2 diabetes, heart disease, and metabolic syndrome. A person with a "healthy" BMI but a large waist circumference may be at higher risk than someone with a BMI of 27 but a lean midsection.</p>

        <p><strong>It varies by age.</strong> Older adults typically have lower muscle mass and higher body fat at the same BMI as younger adults. Children use a separate BMI-for-age chart rather than absolute thresholds.</p>

        <h2>Better measures to use alongside BMI</h2>

        <p><strong>Waist circumference:</strong> A waist measurement above 94cm (men) or 80cm (women) indicates increased health risk. Above 102cm (men) or 88cm (women) indicates high risk. This is a stronger predictor of cardiovascular disease than BMI alone.</p>

        <p><strong>Waist-to-height ratio:</strong> Simply keep your waist circumference to less than half your height. A person 180cm tall should aim for a waist below 90cm. This ratio works across ethnicities and age groups better than BMI.</p>

        <p><strong>Body fat percentage:</strong> Measured by DEXA scan (most accurate), underwater weighing, or bioelectrical impedance (gym scales). Healthy ranges: women 20–35%, men 8–24%.</p>

        <h2>What should you actually do with your BMI?</h2>

        <p>Use BMI as a starting point, not a verdict. If your BMI is in the healthy range and your waist circumference is within target, you're likely in good metabolic health regardless of exact BMI value.</p>

        <p>If your BMI is in the overweight or obese range, it's worth discussing with a GP — not because the BMI number itself causes problems, but because it flags a higher statistical risk of conditions worth screening for.</p>

        <p>Don't obsess over the number. What matters is the trajectory — is it stable, improving, or worsening? — and the behaviours driving it.</p>

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
