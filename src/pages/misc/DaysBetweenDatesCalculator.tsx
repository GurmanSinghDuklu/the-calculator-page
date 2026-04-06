import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

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

function toInputValue(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseInputValue(val: string): Date {
  const [y, m, d] = val.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function countWorkingDays(start: Date, end: Date, includeEnd: boolean): number {
  let count = 0;
  const d = new Date(start);
  const limit = new Date(end);
  if (!includeEnd) limit.setDate(limit.getDate() - 1);
  while (d <= limit) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function countWeekendDays(totalDays: number, workingDays: number): number {
  return totalDays - workingDays;
}

function approxMonthsDays(start: Date, end: Date): { months: number; days: number } {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const temp = new Date(start);
  temp.setMonth(temp.getMonth() + months);
  if (temp > end) {
    months--;
    temp.setMonth(temp.getMonth() - 1);
  }
  const days = Math.round((end.getTime() - temp.getTime()) / (1000 * 60 * 60 * 24));
  return { months, days };
}

const DaysBetweenDatesCalculator = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState(toInputValue(today));
  const [endDate, setEndDate] = useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 30);
    return toInputValue(d);
  });
  const [includeEnd, setIncludeEnd] = useState(false);

  const result = useMemo(() => {
    const start = parseInputValue(startDate);
    const end = parseInputValue(endDate);
    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.round(Math.abs(diffMs) / (1000 * 60 * 60 * 24)) + (includeEnd ? 1 : 0);
    const earlier = start <= end ? start : end;
    const later = start <= end ? end : start;
    const workingDays = countWorkingDays(earlier, later, includeEnd);
    const weekendDays = countWeekendDays(totalDays, workingDays);
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const { months, days: monthRemDays } = approxMonthsDays(earlier, later);

    return {
      totalDays,
      workingDays,
      weekendDays,
      weeks,
      remainingDays,
      months,
      monthRemDays: monthRemDays + (includeEnd ? 1 : 0),
      isReversed: start > end,
    };
  }, [startDate, endDate, includeEnd]);

  const presets = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const year = now.getFullYear();

    let christmas = new Date(year, 11, 25);
    if (christmas <= now) christmas = new Date(year + 1, 11, 25);

    let newYear = new Date(year + 1, 0, 1);

    let easter = getEaster(year);
    if (easter <= now) easter = getEaster(year + 1);

    let taxYearEnd = new Date(year, 3, 5); // 5 April
    if (taxYearEnd <= now) taxYearEnd = new Date(year + 1, 3, 5);

    let taxYearStart = new Date(year, 3, 6); // 6 April
    if (taxYearStart <= now) taxYearStart = new Date(year + 1, 3, 6);

    return [
      { label: "Today to Christmas", start: now, end: christmas },
      { label: "Today to New Year", start: now, end: newYear },
      { label: "Today to Easter", start: now, end: easter },
      { label: "Today to Tax Year End", start: now, end: taxYearEnd },
    ];
  }, []);

  const labelClass =
    "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]";

  const faqSchema = [
    {
      question: "How do I calculate the number of days between two dates?",
      answer:
        "Enter your start date and end date in the calculator above. It instantly shows the total calendar days, working days (Monday to Friday), weekend days, and a weeks-and-days breakdown. You can toggle whether to include the end date in the count.",
    },
    {
      question: "Does this calculator count working days or calendar days?",
      answer:
        "It shows both. Calendar days are the total number of days between the two dates. Working days exclude Saturdays and Sundays, which is useful for calculating business deadlines, employment notice periods, and delivery estimates.",
    },
    {
      question: "What are the UK tax year dates?",
      answer:
        "The UK tax year runs from 6 April to 5 April the following year. For example, the 2025/26 tax year runs from 6 April 2025 to 5 April 2026. Use the quick preset to see how many days remain until the next tax year end.",
    },
    {
      question: "How many working days are in a UK notice period?",
      answer:
        "A one-week notice period is 5 working days. A one-month notice is typically around 22 working days, and a three-month notice period is roughly 65 working days. Use this calculator with your exact start and end dates for a precise count.",
    },
  ];

  return (
    <>
      <SEO
        title="Days Between Dates Calculator"
        description="Calculate the exact number of days between two dates. Shows working days, weekends, weeks breakdown and months. Free UK date calculator."
        keywords="days between dates, date difference calculator, how many days between, days between two dates"
        faqSchema={faqSchema}
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
              Calculators
            </Link>
            <span>/</span>
            <span className="text-white/60">Days Between Dates</span>
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
                BETWEEN DATES
              </span>
            </h1>

            <div
              className="mt-8 max-w-sm pl-4 border-l-2"
              style={{ borderColor: `${ACCENT}60` }}
            >
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Find the exact number of days between any two dates — calendar
                days, working days, weekends, and more. Perfect for notice
                periods, project planning, and tax deadlines.
              </p>
            </div>

            {/* Results */}
            <div className="mt-10 space-y-4">
              {/* Main result */}
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                  Total {includeEnd ? "(inclusive)" : "(exclusive)"}
                </p>
                <p
                  className="font-display text-2xl lg:text-3xl leading-tight"
                  style={{ color: ACCENT }}
                >
                  {result.totalDays} day{result.totalDays !== 1 ? "s" : ""}
                </p>
                {result.isReversed && (
                  <p className="text-xs text-amber-400/70 mt-1 font-heading uppercase tracking-widest">
                    Note: start date is after end date
                  </p>
                )}
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                    Working Days
                  </p>
                  <p className="font-display text-lg text-white">
                    {result.workingDays}
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                    Weekend Days
                  </p>
                  <p className="font-display text-lg text-white">
                    {result.weekendDays}
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                    Weeks + Days
                  </p>
                  <p className="font-display text-lg text-white">
                    {result.weeks}w {result.remainingDays}d
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">
                    Months + Days
                  </p>
                  <p className="font-display text-lg text-white">
                    ~{result.months}m {result.monthRemDays}d
                  </p>
                </div>
              </div>

              <CopyButton
                accentColor={ACCENT}
                results={[
                  {
                    label: "Total Days",
                    value: `${result.totalDays} days`,
                  },
                  {
                    label: "Working Days",
                    value: `${result.workingDays} working days`,
                  },
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
                {/* Start date */}
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* End date */}
                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputClass}
                    onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Include end date toggle */}
                <div>
                  <label className={labelClass}>Options</label>
                  <button
                    onClick={() => setIncludeEnd(!includeEnd)}
                    className="w-full py-3 rounded-lg font-heading text-sm uppercase tracking-widest transition-all border"
                    style={{
                      background: includeEnd ? ACCENT : "rgba(0,0,0,0.4)",
                      color: includeEnd ? "#000" : "rgba(255,255,255,0.5)",
                      borderColor: includeEnd ? ACCENT : "rgba(255,255,255,0.1)",
                    }}
                  >
                    {includeEnd ? "Including end date" : "Excluding end date"}
                  </button>
                </div>

                {/* Quick presets */}
                <div>
                  <label className={labelClass}>Quick Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => {
                          setStartDate(toInputValue(p.start));
                          setEndDate(toInputValue(p.end));
                        }}
                        className="px-3 py-2 rounded-lg font-heading text-xs uppercase tracking-widest transition-all border bg-black/40 text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* UK context presets */}
                <div>
                  <label className={labelClass}>UK Notice Periods</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "1 Week", days: 7 },
                      { label: "1 Month", days: 30 },
                      { label: "3 Months", days: 91 },
                    ].map((np) => (
                      <button
                        key={np.label}
                        onClick={() => {
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          const end = new Date(now);
                          end.setDate(end.getDate() + np.days);
                          setStartDate(toInputValue(now));
                          setEndDate(toInputValue(end));
                        }}
                        className="px-3 py-2 rounded-lg font-heading text-xs uppercase tracking-widest transition-all border bg-black/40 text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                      >
                        {np.label}
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
                      {result.totalDays} days
                    </span>
                  </div>
                  {[
                    { label: "Working Days", value: String(result.workingDays) },
                    { label: "Weekends", value: String(result.weekendDays) },
                    {
                      label: "Breakdown",
                      value: `${result.weeks}w ${result.remainingDays}d`,
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
              title: "Why Use a Days Between Dates Calculator?",
              description:
                "Counting days between two dates by hand is error-prone, especially across months with different lengths and leap years. This calculator gives you instant, accurate results for any date range. It is invaluable for UK employment notice periods (statutory minimum is one week per year of service, up to 12 weeks), tracking how many working days remain before a project deadline, calculating tax year durations (the UK tax year runs 6 April to 5 April — exactly 365 or 366 days), and figuring out school term lengths for holiday planning.",
            }}
            howItWorks={{
              title: "How to Use This Calculator",
              description:
                "Three simple steps to get your answer, with multiple breakdowns for different needs.",
              steps: [
                {
                  step: 1,
                  title: "Pick Your Start Date",
                  description:
                    "Select or type the start date. It defaults to today, but you can choose any date in the past or future.",
                },
                {
                  step: 2,
                  title: "Pick Your End Date",
                  description:
                    "Select the end date. Use the quick presets for common targets like Christmas, New Year, Easter, or the UK tax year end.",
                },
                {
                  step: 3,
                  title: "Read the Results",
                  description:
                    "The calculator instantly shows total calendar days, working days (Mon-Fri), weekend days, a weeks-and-days breakdown, and an approximate months-and-days figure. Toggle \"Include end date\" if you need an inclusive count.",
                },
              ],
            }}
            faqs={[
              {
                question: "How do I calculate the number of days between two dates?",
                answer:
                  "Enter your start and end dates in the calculator above. It instantly computes the difference in calendar days, working days, and weekends. Toggle the include/exclude end date option depending on whether you need an inclusive or exclusive count.",
              },
              {
                question: "Does this calculator count working days or calendar days?",
                answer:
                  "Both. Calendar days are the total count including weekends. Working days exclude Saturdays and Sundays, which is essential for employment notice periods, business SLAs, and delivery time estimates in the UK.",
              },
              {
                question: "What are the UK tax year dates?",
                answer:
                  "The UK tax year runs from 6 April to 5 April the following year. For example, the 2025/26 tax year starts 6 April 2025 and ends 5 April 2026. Use the \"Today to Tax Year End\" preset to see how many days remain.",
              },
              {
                question: "How many working days are in a typical UK notice period?",
                answer:
                  "A one-week statutory notice is 5 working days. One calendar month is roughly 22 working days. Three months (common for senior roles) is approximately 65 working days, though the exact count depends on weekends and bank holidays in that period.",
              },
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

export default DaysBetweenDatesCalculator;
