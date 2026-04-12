import { useState } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour for Health category ──────────────────────────────────────
const ACCENT = "#22C55E";

// ─── Types & helpers ────────────────────────────────────────────────────────
type UnitSystem = "metric" | "imperial";

interface BmiResult {
  bmi: number;
  category: string;
  colour: string;
}

const getBmiResult = (bmi: number): BmiResult => {
  if (bmi < 18.5) return { bmi, category: "Underweight", colour: "#60A5FA" };
  if (bmi < 25)   return { bmi, category: "Healthy weight", colour: "#22C55E" };
  if (bmi < 30)   return { bmi, category: "Overweight", colour: "#F59E0B" };
  return { bmi, category: "Obese", colour: "#EF4444" };
};

// ─── Component ──────────────────────────────────────────────────────────────
const BmiCalculator = () => {
  const [units, setUnits] = useState<UnitSystem>("imperial");

  // Metric inputs
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Imperial inputs
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightSt, setWeightSt] = useState("");
  const [weightLbs, setWeightLbs] = useState("");

  const [result, setResult] = useState<BmiResult | null>(null);

  const calculate = () => {
    let heightM: number;
    let weightKgVal: number;

    if (units === "metric") {
      const cm = parseFloat(heightCm);
      const kg = parseFloat(weightKg);
      if (!cm || !kg || cm <= 0 || kg <= 0) return;
      heightM = cm / 100;
      weightKgVal = kg;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const st = parseFloat(weightSt) || 0;
      const lbs = parseFloat(weightLbs) || 0;
      const totalInches = ft * 12 + inches;
      const totalLbs = st * 14 + lbs;
      if (totalInches <= 0 || totalLbs <= 0) return;
      heightM = totalInches * 0.0254;
      weightKgVal = totalLbs * 0.453592;
    }

    const bmi = weightKgVal / (heightM * heightM);
    setResult(getBmiResult(Math.round(bmi * 10) / 10));
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all";

  // BMI scale bar helpers
  const scaleMin = 14;
  const scaleMax = 40;
  const getScalePosition = (bmi: number) => {
    const clamped = Math.max(scaleMin, Math.min(scaleMax, bmi));
    return ((clamped - scaleMin) / (scaleMax - scaleMin)) * 100;
  };

  const faqSchema = [
    { question: "What is a healthy BMI?", answer: "According to the NHS, a healthy BMI is between 18.5 and 24.9. This range is associated with lower risk of weight-related health problems like type 2 diabetes and heart disease. However, BMI doesn't distinguish between muscle and fat, so athletes may have a high BMI while being perfectly healthy." },
    { question: "How accurate is BMI?", answer: "BMI is a useful screening tool but it has limitations. It doesn't account for muscle mass, bone density, age, sex, or where you carry fat. The NHS recommends also checking your waist circumference — carrying weight around your middle increases health risks regardless of BMI. For men, a waist over 94cm is a concern; for women, over 80cm." },
    { question: "What BMI is overweight in the UK?", answer: "The NHS classifies a BMI of 25 to 29.9 as overweight. A BMI of 30 or above is classified as obese. These thresholds apply to most adults, but the NHS notes that people of South Asian, Chinese, and other Asian backgrounds may have higher health risks at a lower BMI, with overweight starting at 23." },
    { question: "Is BMI different for men and women?", answer: "The standard BMI formula and NHS categories are the same for men and women. However, women naturally carry more body fat than men at the same BMI. This is one reason BMI isn't perfect — a man and woman with identical BMIs can have very different body compositions. Waist-to-height ratio is sometimes considered a better indicator for both sexes." },
  ];

  return (
    <>
      <SEO
        title="BMI Calculator UK"
        description="Free BMI calculator using NHS weight categories. Enter height and weight in metric or imperial. Instant body mass index result."
        keywords="BMI calculator, BMI calculator UK, body mass index, NHS BMI, am I overweight, healthy weight calculator"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Age Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorpage.com"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/health" className="hover:text-white transition-colors">Health</Link>
            <span>/</span>
            <span className="text-white/60">BMI Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[18vw] lg:text-[145px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>BMI</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Check your body mass index using NHS weight categories. Works with metric or imperial measurements.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Main BMI result */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Your BMI</p>
                  <p className="font-display text-5xl leading-tight" style={{ color: result.colour }}>
                    {result.bmi.toFixed(1)}
                  </p>
                  <p className="font-heading text-sm uppercase tracking-widest mt-2" style={{ color: result.colour }}>
                    {result.category}
                  </p>
                </div>

                {/* BMI Scale Bar */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-4">BMI Scale</p>
                  <div className="relative h-6 rounded-full overflow-hidden">
                    {/* Gradient segments */}
                    <div className="absolute inset-0 flex">
                      <div className="h-full" style={{ width: `${((18.5 - scaleMin) / (scaleMax - scaleMin)) * 100}%`, background: "#60A5FA" }} />
                      <div className="h-full" style={{ width: `${((25 - 18.5) / (scaleMax - scaleMin)) * 100}%`, background: "#22C55E" }} />
                      <div className="h-full" style={{ width: `${((30 - 25) / (scaleMax - scaleMin)) * 100}%`, background: "#F59E0B" }} />
                      <div className="h-full" style={{ width: `${((scaleMax - 30) / (scaleMax - scaleMin)) * 100}%`, background: "#EF4444" }} />
                    </div>
                    {/* Position marker */}
                    <div
                      className="absolute top-0 h-full w-1 bg-white shadow-lg shadow-white/50 rounded-full"
                      style={{ left: `${getScalePosition(result.bmi)}%`, transform: "translateX(-50%)" }}
                    />
                  </div>
                  {/* Labels */}
                  <div className="flex justify-between mt-2 text-[9px] font-heading uppercase tracking-widest text-white/30">
                    <span>Underweight</span>
                    <span>Healthy</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                  {/* Threshold numbers */}
                  <div className="relative mt-1 text-[9px] text-white/20 font-mono">
                    <span className="absolute" style={{ left: `${getScalePosition(18.5)}%`, transform: "translateX(-50%)" }}>18.5</span>
                    <span className="absolute" style={{ left: `${getScalePosition(25)}%`, transform: "translateX(-50%)" }}>25</span>
                    <span className="absolute" style={{ left: `${getScalePosition(30)}%`, transform: "translateX(-50%)" }}>30</span>
                  </div>
                </div>

                {/* NHS categories grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Underweight", range: "Below 18.5", colour: "#60A5FA" },
                    { label: "Healthy",     range: "18.5 – 24.9", colour: "#22C55E" },
                    { label: "Overweight",  range: "25 – 29.9",   colour: "#F59E0B" },
                    { label: "Obese",       range: "30 or above",  colour: "#EF4444" },
                  ].map(({ label, range, colour }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4" style={{
                      borderColor: result.category.toLowerCase().includes(label.toLowerCase()) ? colour + "60" : undefined,
                    }}>
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg" style={{ color: result.category.toLowerCase().includes(label.toLowerCase()) ? colour : "rgba(255,255,255,0.4)" }}>{range}</p>
                    </div>
                  ))}
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "BMI", value: result.bmi.toFixed(1) },
                  { label: "Category", value: `${result.category} (NHS)` },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">BMI</h3>
                <Activity className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Unit toggle */}
                <div>
                  <label className={labelClass}>Units</label>
                  <div className="flex gap-2">
                    {(["imperial", "metric"] as UnitSystem[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnits(u)}
                        className="flex-1 py-3 rounded-lg font-heading text-xs uppercase tracking-widest transition-all"
                        style={{
                          background: units === u ? ACCENT : "rgba(0,0,0,0.4)",
                          color: units === u ? "#000" : "rgba(255,255,255,0.5)",
                          border: `1px solid ${units === u ? ACCENT : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        {u === "imperial" ? "Stone & Feet" : "Metric"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Height */}
                {units === "metric" ? (
                  <div>
                    <label className={labelClass}>Height (cm)</label>
                    <input
                      type="number"
                      placeholder="e.g. 175"
                      value={heightCm}
                      onChange={e => setHeightCm(e.target.value)}
                      className={inputClass}
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Height</label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          placeholder="5"
                          value={heightFt}
                          onChange={e => setHeightFt(e.target.value)}
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">ft</span>
                      </div>
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          placeholder="10"
                          value={heightIn}
                          onChange={e => setHeightIn(e.target.value)}
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">in</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weight */}
                {units === "metric" ? (
                  <div>
                    <label className={labelClass}>Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="e.g. 72"
                      value={weightKg}
                      onChange={e => setWeightKg(e.target.value)}
                      className={inputClass}
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Weight</label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          placeholder="11"
                          value={weightSt}
                          onChange={e => setWeightSt(e.target.value)}
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">st</span>
                      </div>
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          placeholder="5"
                          value={weightLbs}
                          onChange={e => setWeightLbs(e.target.value)}
                          className={inputClass}
                          onFocus={e => (e.target.style.borderColor = ACCENT)}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">lbs</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Result preview in form */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">BMI</span>
                      <span className="text-2xl font-display" style={{ color: result.colour }}>
                        {result.bmi.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Category</span>
                      <span className="font-heading" style={{ color: result.colour }}>{result.category}</span>
                    </div>
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculate}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate BMI
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content */}
        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "What is BMI?",
              description: "Body mass index is a number calculated from your height and weight. The NHS uses it as a quick way to screen whether your weight might be putting your health at risk. It's not a diagnostic tool — it won't tell you your body fat percentage or how fit you are — but it gives a rough starting point. BMI was designed for population-level statistics in the 1800s, and while it's still widely used, most doctors will consider it alongside other measurements. If your BMI is outside the healthy range, your GP might also check your waist circumference, blood pressure, and cholesterol before drawing any conclusions.",
            }}
            howItWorks={{
              title: "How the calculation works",
              description: "The formula itself is straightforward. You divide your weight in kilograms by your height in metres squared. A person who is 1.75m tall and weighs 72kg has a BMI of 23.5, which falls in the NHS healthy range.",
              steps: [
                { step: 1, title: "Enter your height", description: "Use centimetres if you think metric, or feet and inches if you're used to imperial. Most people in the UK know their height in feet and inches." },
                { step: 2, title: "Enter your weight", description: "Use kilograms or stone and pounds. If you only know your weight in pounds, divide by 14 to get stone — or just use the metric option." },
                { step: 3, title: "Read your result", description: "Your BMI number appears with the NHS category. The colour-coded scale shows where you sit relative to the standard ranges." },
              ],
            }}
            formula={{
              title: "BMI Formula",
              formula: "BMI = weight (kg) / height (m)²",
              explanation: "If using imperial measurements, the calculator converts feet and inches to metres (1 inch = 0.0254m) and stone and pounds to kilograms (1 lb = 0.4536kg) before applying the formula. The NHS uses the same formula for all adults over 18.",
            }}
            tips={[
              "BMI doesn't distinguish between muscle and fat. If you train with weights regularly, your BMI may overstate your health risk.",
              "The NHS says waist circumference matters too. For men, a waist over 94cm increases health risks. For women, it's 80cm.",
              "For people of South Asian, Chinese, or other Asian ethnic backgrounds, the NHS suggests health risks may increase at a lower BMI (23 rather than 25).",
              "BMI categories don't apply to children or teenagers. The NHS has a separate healthy weight calculator for under-18s.",
              "If you're concerned about your weight, your GP can give personalised advice that goes well beyond a single number.",
            ]}
            faqs={faqSchema}
          />
        </div>

        {/* Disclosure + footer */}
        <div className="mt-12">
          <FinancialDisclosure variant="general" />
        </div>

        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BmiCalculator;
