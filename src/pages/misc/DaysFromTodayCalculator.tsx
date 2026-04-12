import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

const QUICK_DAYS = [7, 14, 30, 60, 90, 180, 365];

function formatDateLong(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString("en-GB", { weekday: "long" });
}

const DaysFromTodayCalculator = () => {
  const [days, setDays] = useState(30);
  const [direction, setDirection] = useState<"from" | "ago">("from");

  const result = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(today);
    target.setDate(today.getDate() + (direction === "from" ? days : -days));

    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    return {
      target,
      long: formatDateLong(target),
      short: formatDateShort(target),
      dayOfWeek: getDayOfWeek(target),
      weeks,
      remainingDays,
    };
  }, [days, direction]);

  const labelClass =
    "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]";

  const directionLabel =
    direction === "from" ? "days from today" : "days ago";

  const faqSchema = [
    {
      question: "What is 30 days from today?",
      answer: `30 days from today is ${formatDateLong(
        (() => {
          const d = new Date();
          d.setDate(d.getDate() + 30);
          return d;
        })()
      )}. This is a common timeframe for notice periods, cooling-off periods on contracts, and payment terms on invoices.`,
    },
    {
      question: "What is 90 days from today?",
      answer: `90 days from today is ${formatDateLong(
        (() => {
          const d = new Date();
          d.setDate(d.getDate() + 90);
          return d;
        })()
      )}. A 90-day window is frequently used for probation periods at work, visa validity, and passport renewal processing times.`,
    },
    {
      question: "Does this calculator account for leap years?",
      answer:
        "Yes. The calculator uses your device's built-in date system, which correctly handles leap years, month lengths, and daylight saving transitions. If you add 365 days from 1 January in a leap year, you will land on 31 December rather than 1 January of the following year.",
    },
    {
      question: "Can I count days backwards?",
      answer:
        "Absolutely. Toggle to \"Days ago\" and the calculator counts backwards from today. This is useful for checking when something started — for example, working out a 14-day return window or when a 28-day prescription was issued.",
    },
  ];

  return (
    <>
      <SEO
        title="Days From Today Calculator"
        description="Find the exact date that is any number of days from today. Quick buttons for 30, 60, 90 days. Shows day of week and week breakdown."
        keywords="days from today, date calculator, 30 days from today, 90 days from today, days from now, date from today"
        faqSchema={faqSchema}
      
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Age Calculator",
          "alternateName": "The Calculator App",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any (Web App — iOS, Android, Desktop)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
          "url": "https://www.thecalculatorapp.org"
        }}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-blue-500/30">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/categories/everyday"
              className="hover:text-white transition-colors"
            >
              Tools
            </Link>
            <span>/</span>
            <span className="text-white/60">Days From Today</span>
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
                className="block text-[14vw] lg:text-[110px]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                DAYS
              </span>
              <span
                className="block text-[7vw] lg:text-[55px] mt-1"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  color: "transparent",
                }}
              >
                FROM TODAY
              </span>
            </h1>

            <div
              className="mt-8 max-w-sm pl-4 border-l-2"
              style={{ borderColor: `${ACCENT}60` }}
            >
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Find the exact date a given number of days from now — or count
                backwards. Handy for deadlines, notice periods, and planning
                ahead.
              </p>
            </div>

            {/* Results */}
            <div className="mt-10 space-y-4">
              {/* Main result */}
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                  {days} {directionLabel}
                </p>
                <p
                  className="font-display text-2xl lg:text-3xl leading-tight"
                  style={{ color: ACCENT }}
                >
                  {result.long}
                </p>
                <p className="font-heading text-lg text-white/60 mt-1">
                  {result.short}
                </p>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                    Day of Week
                  </p>
                  <p className="font-display text-lg text-white">
                    {result.dayOfWeek}
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                    Breakdown
                  </p>
                  <p className="font-display text-lg text-white">
                    {result.weeks} week{result.weeks !== 1 ? "s" : ""}{" "}
                    {result.remainingDays > 0 &&
                      `and ${result.remainingDays} day${
                        result.remainingDays !== 1 ? "s" : ""
                      }`}
                  </p>
                </div>
              </div>

              <CopyButton
                accentColor={ACCENT}
                results={[
                  {
                    label: `${days} ${directionLabel}`,
                    value: result.long,
                  },
                  { label: "Short Date", value: result.short },
                  {
                    label: "Breakdown",
                    value: `${result.weeks} weeks and ${result.remainingDays} days`,
                  },
                ]}
              />
            </div>
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
                  Calculate
                </h3>
                <Calendar className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">
                {/* Number of days */}
                <div>
                  <label className={labelClass}>Number of Days</label>
                  <input
                    type="number"
                    min={0}
                    value={days}
                    onChange={(e) =>
                      setDays(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className={inputClass}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Direction toggle */}
                <div>
                  <label className={labelClass}>Direction</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { value: "from", label: "Days from today" },
                        { value: "ago", label: "Days ago" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDirection(opt.value)}
                        className="py-3 rounded-lg font-heading text-sm uppercase tracking-widest transition-all border"
                        style={{
                          background:
                            direction === opt.value
                              ? ACCENT
                              : "rgba(0,0,0,0.4)",
                          color:
                            direction === opt.value ? "#000" : "rgba(255,255,255,0.5)",
                          borderColor:
                            direction === opt.value
                              ? ACCENT
                              : "rgba(255,255,255,0.1)",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick buttons */}
                <div>
                  <label className={labelClass}>Quick Select</label>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_DAYS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDays(d)}
                        className="px-4 py-2 rounded-lg font-heading text-sm uppercase tracking-widest transition-all border"
                        style={{
                          background:
                            days === d ? ACCENT : "rgba(0,0,0,0.4)",
                          color:
                            days === d ? "#000" : "rgba(255,255,255,0.5)",
                          borderColor:
                            days === d ? ACCENT : "rgba(255,255,255,0.1)",
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result preview inside form */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-end pb-3 border-b border-white/10">
                    <span className="text-white/40 text-sm font-heading uppercase tracking-widest">
                      Result
                    </span>
                    <span
                      className="text-xl font-display"
                      style={{ color: ACCENT }}
                    >
                      {result.long}
                    </span>
                  </div>
                  {[
                    { label: "Short Date", value: result.short },
                    {
                      label: "Breakdown",
                      value: `${result.weeks} weeks, ${result.remainingDays} days`,
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
                          color: accent
                            ? ACCENT
                            : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational content */}
        <div className="max-w-7xl mx-auto px-6">
          <CalculatorStaticContent
            whatIs={{
              title: "Why Do You Need a Days From Today Calculator?",
              description:
                "Counting days on a calendar sounds simple, but it gets surprisingly fiddly once you cross month boundaries or need to account for February. This calculator takes the guesswork out of date arithmetic. It is useful any time you need to know an exact future or past date — legal deadlines (a 14-day cooling-off period on a new contract), employment notice periods (one month or 90 days), project milestones, or personal planning like passport renewals (allow 10 weeks, i.e. 70 days) and prescription refill windows.",
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description:
                "Three steps and you have your answer. No need to flip through calendar pages or count on your fingers.",
              steps: [
                {
                  step: 1,
                  title: "Enter the Number of Days",
                  description:
                    "Type in how many days you want to count, or tap one of the quick-select buttons for common values like 30, 60, or 90.",
                },
                {
                  step: 2,
                  title: "Choose a Direction",
                  description:
                    "Toggle between \"Days from today\" to look ahead, or \"Days ago\" to look back. Useful for checking when a warranty started or when a return window opened.",
                },
                {
                  step: 3,
                  title: "Read the Result",
                  description:
                    "The target date appears instantly in both long and short formats, along with the day of the week and a weeks-and-days breakdown. Copy it to your clipboard in one click.",
                },
              ],
            }}
            faqs={[
              {
                question: "What is 30 days from today?",
                answer:
                  "30 days from today changes each day, so use the calculator above for an always-accurate answer. A 30-day window is one of the most common timeframes in everyday life — it covers standard invoice payment terms, one-month notice periods, and the cooling-off period on many UK consumer contracts.",
              },
              {
                question: "What is 90 days from today?",
                answer:
                  "90 days (roughly three months) is another high-frequency timeframe. It is the standard probation period for many UK jobs, the processing time quoted by HMPO for passport renewals during busy periods, and the validity window for some visas. Pop 90 into the calculator to see the exact date.",
              },
              {
                question: "Does the calculator handle leap years correctly?",
                answer:
                  "Yes. It uses the JavaScript Date engine built into your browser, which correctly handles leap years, varying month lengths, and daylight saving shifts. You do not need to worry about edge cases.",
              },
              {
                question: "Can I count days backwards from today?",
                answer:
                  "Yes — toggle to \"Days ago\" and the calculator counts backwards. This is handy for checking whether you are still within a 14-day return period, when a 28-day prescription was issued, or when a fixed-term contract began.",
              },
            ]}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">
              Calculator App
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              &copy; 2026 The Calculator App.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DaysFromTodayCalculator;
