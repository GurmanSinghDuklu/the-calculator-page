import { useState } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";

// ─── Accent colour for Health category ───────────────────────────────────────
const ACCENT = "#22C55E";

type Gender = "male" | "female";
type HeightUnit = "cm" | "ft";
type WeightUnit = "kg" | "st";
type Activity = "sedentary" | "light" | "moderate" | "very" | "extra";

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Lightly active (1–3 days/week)",
  moderate: "Moderately active (3–5 days/week)",
  very: "Very active (6–7 days/week)",
  extra: "Extra active (physical job or 2× training)",
};

const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [weightKg, setWeightKg] = useState("");
  const [weightSt, setWeightSt] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [activity, setActivity] = useState<Activity>("sedentary");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    loss: number;
    gain: number;
  } | null>(null);

  const calculate = () => {
    const a = parseInt(age);
    if (!a || a <= 0 || a > 120) return;

    // Resolve height to cm
    let h: number;
    if (heightUnit === "cm") {
      h = parseFloat(heightCm);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      h = ft * 30.48 + inches * 2.54;
    }
    if (!h || h <= 0) return;

    // Resolve weight to kg
    let w: number;
    if (weightUnit === "kg") {
      w = parseFloat(weightKg);
    } else {
      const st = parseFloat(weightSt) || 0;
      const lbs = parseFloat(weightLbs) || 0;
      w = st * 6.35029 + lbs * 0.453592;
    }
    if (!w || w <= 0) return;

    // Mifflin-St Jeor
    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      loss: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
    });
  };

  const labelClass =
    "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all";
  const selectClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all appearance-none cursor-pointer";
  const toggleBtnClass = (active: boolean) =>
    `flex-1 py-2 text-xs font-heading uppercase tracking-widest rounded-md transition-all ${
      active
        ? "text-black font-bold"
        : "text-white/40 hover:text-white/60 bg-transparent"
    }`;

  const faqSchema = [
    {
      question: "How many calories should I eat a day?",
      answer:
        "It depends on your age, sex, height, weight and activity level. Most adults need between 1,600 and 2,400 calories a day. Use our calculator to get a personalised estimate based on the Mifflin-St Jeor equation.",
    },
    {
      question: "What is BMR and how is it different from TDEE?",
      answer:
        "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest — just to keep your heart beating, lungs breathing and organs working. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor. TDEE is the number you actually need to eat to maintain your weight.",
    },
    {
      question: "Is a 500 calorie deficit safe?",
      answer:
        "For most adults, a 500 calorie daily deficit is considered safe and sustainable. It typically leads to about 0.5 kg (roughly 1 lb) of weight loss per week. However, you should not drop below around 1,200 calories per day for women or 1,500 for men without medical supervision.",
    },
    {
      question: "Why do crash diets stop working?",
      answer:
        "When you slash calories dramatically, your body adapts by lowering your metabolic rate — a process called adaptive thermogenesis. You burn fewer calories at rest, weight loss stalls, and when you return to normal eating you regain weight quickly because your metabolism is still suppressed. A moderate deficit avoids this trap.",
    },
  ];

  return (
    <>
      <SEO
        title="Calorie Calculator UK"
        description="Free calorie calculator. Find your daily calorie needs based on age, height, weight and activity level. Uses the Mifflin-St Jeor equation."
        keywords="calorie calculator, TDEE calculator, daily calorie needs, BMR calculator, how many calories do I need, calorie intake calculator"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/categories/health"
              className="hover:text-white transition-colors"
            >
              Health
            </Link>
            <span>/</span>
            <span className="text-white/60">Calorie Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10"
              style={{ background: ACCENT, top: "10%", left: "0" }}
            />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span
                className="block text-[16vw] lg:text-[120px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                CALORIE
              </span>
              <span
                className="block text-[8vw] lg:text-[65px] mt-1"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  color: "transparent",
                }}
              >
                CALCULATOR
              </span>
            </h1>

            <div
              className="mt-8 max-w-sm pl-4 border-l-2"
              style={{ borderColor: `${ACCENT}60` }}
            >
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Work out how many calories you need each day to maintain, lose
                or gain weight — based on your body stats and activity level.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* BMR hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    Basal Metabolic Rate
                  </p>
                  <p
                    className="font-display text-3xl leading-tight"
                    style={{ color: ACCENT }}
                  >
                    {result.bmr.toLocaleString()}{" "}
                    <span className="text-white/40 text-xl">kcal/day</span>
                  </p>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Maintenance (TDEE)",
                      value: result.tdee.toLocaleString() + " kcal",
                    },
                    {
                      label: "Weight Loss (-500)",
                      value: result.loss.toLocaleString() + " kcal",
                    },
                    {
                      label: "Weight Gain (+500)",
                      value: result.gain.toLocaleString() + " kcal",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-white/[0.03] border border-white/10 rounded-lg p-4"
                    >
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                        {label}
                      </p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <CopyButton
                  accentColor={ACCENT}
                  results={[
                    {
                      label: "BMR",
                      value: `${result.bmr.toLocaleString()} kcal/day`,
                    },
                    {
                      label: "Maintenance (TDEE)",
                      value: `${result.tdee.toLocaleString()} kcal/day`,
                    },
                    {
                      label: "Weight Loss (-500)",
                      value: `${result.loss.toLocaleString()} kcal/day`,
                    },
                    {
                      label: "Weight Gain (+500)",
                      value: `${result.gain.toLocaleString()} kcal/day`,
                    },
                  ]}
                />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">
                  Your Details
                </h3>
                <Flame className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">
                {/* Age */}
                <div>
                  <label className={labelClass}>Age (years)</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 30"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={inputClass}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className={labelClass}>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className={selectClass}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Height */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`${labelClass} mb-0`}>Height</label>
                    <div
                      className="flex rounded-md overflow-hidden border border-white/10"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      <button
                        onClick={() => setHeightUnit("cm")}
                        className={toggleBtnClass(heightUnit === "cm")}
                        style={
                          heightUnit === "cm"
                            ? { background: ACCENT }
                            : undefined
                        }
                      >
                        cm
                      </button>
                      <button
                        onClick={() => setHeightUnit("ft")}
                        className={toggleBtnClass(heightUnit === "ft")}
                        style={
                          heightUnit === "ft"
                            ? { background: ACCENT }
                            : undefined
                        }
                      >
                        ft/in
                      </button>
                    </div>
                  </div>
                  {heightUnit === "cm" ? (
                    <input
                      type="number"
                      min="50"
                      max="250"
                      placeholder="e.g. 175"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className={inputClass}
                      onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                      }
                    />
                  ) : (
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="1"
                        max="8"
                        placeholder="ft"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        className={`${inputClass} flex-1`}
                        onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                      <input
                        type="number"
                        min="0"
                        max="11"
                        placeholder="in"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        className={`${inputClass} flex-1`}
                        onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`${labelClass} mb-0`}>Weight</label>
                    <div
                      className="flex rounded-md overflow-hidden border border-white/10"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      <button
                        onClick={() => setWeightUnit("kg")}
                        className={toggleBtnClass(weightUnit === "kg")}
                        style={
                          weightUnit === "kg"
                            ? { background: ACCENT }
                            : undefined
                        }
                      >
                        kg
                      </button>
                      <button
                        onClick={() => setWeightUnit("st")}
                        className={toggleBtnClass(weightUnit === "st")}
                        style={
                          weightUnit === "st"
                            ? { background: ACCENT }
                            : undefined
                        }
                      >
                        st/lbs
                      </button>
                    </div>
                  </div>
                  {weightUnit === "kg" ? (
                    <input
                      type="number"
                      min="20"
                      max="300"
                      placeholder="e.g. 75"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className={inputClass}
                      onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                      }
                    />
                  ) : (
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="1"
                        max="40"
                        placeholder="stone"
                        value={weightSt}
                        onChange={(e) => setWeightSt(e.target.value)}
                        className={`${inputClass} flex-1`}
                        onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                      <input
                        type="number"
                        min="0"
                        max="13"
                        placeholder="lbs"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(e.target.value)}
                        className={`${inputClass} flex-1`}
                        onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Activity level */}
                <div>
                  <label className={labelClass}>Activity Level</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value as Activity)}
                    className={selectClass}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  >
                    {(Object.keys(ACTIVITY_LABELS) as Activity[]).map((key) => (
                      <option key={key} value={key}>
                        {ACTIVITY_LABELS[key]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">
                        TDEE
                      </span>
                      <span
                        className="text-2xl font-display"
                        style={{ color: ACCENT }}
                      >
                        {result.tdee.toLocaleString()} kcal
                      </span>
                    </div>
                    {[
                      {
                        label: "BMR",
                        value: `${result.bmr.toLocaleString()} kcal`,
                      },
                      {
                        label: "Weight Loss",
                        value: `${result.loss.toLocaleString()} kcal`,
                        accent: true,
                      },
                    ].map(({ label, value, accent }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">
                          {label}
                        </span>
                        <span
                          className="font-heading"
                          style={{
                            color: accent ? ACCENT : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculate}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 20px -5px ${ACCENT}80`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)
                  }
                >
                  Calculate Calories
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
              title: "What Is a Calorie Calculator?",
              description:
                "A calorie calculator estimates how many calories your body needs each day. It uses your age, height, weight, sex and activity level to calculate two key numbers: your BMR (Basal Metabolic Rate) — the calories you burn doing absolutely nothing — and your TDEE (Total Daily Energy Expenditure) — the total calories you burn including exercise and daily movement. Once you know your TDEE, you know how much to eat to maintain, lose or gain weight.",
            }}
            howItWorks={{
              title: "How This Calculator Works",
              description:
                "We use the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating BMR in healthy adults. It was published in 2005 and is recommended by the Academy of Nutrition and Dietetics over older formulas like Harris-Benedict.",
              steps: [
                {
                  step: 1,
                  title: "Enter Your Body Stats",
                  description:
                    "Pop in your age, sex, height and weight. You can switch between metric (cm/kg) and imperial (feet-inches/stone-lbs) — the calculator converts everything behind the scenes.",
                },
                {
                  step: 2,
                  title: "Pick Your Activity Level",
                  description:
                    "Be honest here. Most desk workers are 'sedentary' or 'lightly active' even if they exercise a few times a week. Overestimating activity is the most common mistake people make.",
                },
                {
                  step: 3,
                  title: "Get Your Numbers",
                  description:
                    "The calculator shows your BMR, your maintenance calories (TDEE), a weight-loss target (TDEE minus 500 kcal) and a weight-gain target (TDEE plus 500 kcal). A 500 calorie deficit works out to roughly 0.5 kg of fat loss per week.",
                },
              ],
            }}
            formula={{
              title: "Mifflin-St Jeor Equation",
              formula:
                "Male: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5 | Female: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161",
              explanation:
                "The equation estimates BMR from lean body metrics. TDEE is then calculated by multiplying BMR by an activity factor: 1.2 (sedentary), 1.375 (lightly active), 1.55 (moderately active), 1.725 (very active), or 1.9 (extra active). For example, a 30-year-old male who is 180 cm, 80 kg and moderately active: BMR = 10×80 + 6.25×180 − 5×30 + 5 = 1,780 kcal. TDEE = 1,780 × 1.55 = 2,759 kcal.",
            }}
            faqs={faqSchema}
            tips={[
              "If you are not sure about your activity level, pick the lower option — most people overestimate how active they really are",
              "A 500 calorie deficit is sustainable for most people. Going much lower than that tends to backfire within weeks",
              "Weigh yourself at the same time each day (ideally first thing in the morning) and track the weekly average, not individual readings",
              "Your TDEE is not fixed — it changes as you lose or gain weight, so recalculate every 5–10 kg",
              "Protein is the most filling macronutrient. Eating enough protein (around 1.6–2.2 g per kg of body weight) helps preserve muscle during a deficit",
            ]}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">
              Calculator Page
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              &copy; 2026 The Calculator Page.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CalorieCalculator;
