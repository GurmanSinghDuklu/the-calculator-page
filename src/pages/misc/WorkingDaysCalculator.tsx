import { Logo } from "@/components/Logo";
import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

// ─── UK Bank Holidays 2026 ──────────────────────────────────────────────────
const UK_BANK_HOLIDAYS_2026 = [
  new Date(2026, 0, 1),   // New Year's Day
  new Date(2026, 3, 3),   // Good Friday
  new Date(2026, 3, 6),   // Easter Monday
  new Date(2026, 4, 4),   // Early May bank holiday
  new Date(2026, 4, 25),  // Spring bank holiday
  new Date(2026, 7, 31),  // Summer bank holiday
  new Date(2026, 11, 25), // Christmas Day
  new Date(2026, 11, 28), // Boxing Day (substitute — 26 Dec is Saturday)
];

const isBankHoliday = (date: Date) =>
  UK_BANK_HOLIDAYS_2026.some(
    bh => bh.getFullYear() === date.getFullYear() && bh.getMonth() === date.getMonth() && bh.getDate() === date.getDate()
  );

const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

const toDateStr = (d: Date) => d.toISOString().split("T")[0];

const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
};

type Mode = "between" | "add";

const WorkingDaysCalculator = () => {
  const today = useMemo(() => new Date(), []);
  const [startDate, setStartDate] = useState(toDateStr(today));
  const [endDate, setEndDate] = useState(toDateStr(addDays(today, 30)));
  const [excludeHolidays, setExcludeHolidays] = useState(true);
  const [mode, setMode] = useState<Mode>("between");
  const [addWorkingDays, setAddWorkingDays] = useState("10");
  const [result, setResult] = useState<{
    workingDays: number;
    calendarDays: number;
    weekendsExcluded: number;
    holidaysExcluded: number;
    resultDate?: string;
  } | null>(null);

  const countBetween = (start: Date, end: Date) => {
    let working = 0, weekends = 0, holidays = 0;
    const current = new Date(start);
    while (current <= end) {
      if (isWeekend(current)) {
        weekends++;
      } else if (excludeHolidays && isBankHoliday(current)) {
        holidays++;
      } else {
        working++;
      }
      current.setDate(current.getDate() + 1);
    }
    const calendarDays = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
    return { workingDays: working, calendarDays, weekendsExcluded: weekends, holidaysExcluded: holidays };
  };

  const calculate = () => {
    if (mode === "between") {
      const s = new Date(startDate);
      const e = new Date(endDate);
      if (isNaN(s.getTime()) || isNaN(e.getTime()) || s > e) return;
      setResult(countBetween(s, e));
    } else {
      const s = new Date(startDate);
      if (isNaN(s.getTime())) return;
      const daysToAdd = parseInt(addWorkingDays);
      if (isNaN(daysToAdd) || daysToAdd < 0) return;
      let added = 0;
      const current = new Date(s);
      while (added < daysToAdd) {
        current.setDate(current.getDate() + 1);
        if (!isWeekend(current) && !(excludeHolidays && isBankHoliday(current))) {
          added++;
        }
      }
      const stats = countBetween(s, current);
      setResult({ ...stats, resultDate: toDateStr(current) });
    }
  };

  const handleQuickAdd = (days: number) => {
    setMode("add");
    setAddWorkingDays(String(days));
    // calculate immediately
    const s = new Date(startDate);
    if (isNaN(s.getTime())) return;
    let added = 0;
    const current = new Date(s);
    while (added < days) {
      current.setDate(current.getDate() + 1);
      if (!isWeekend(current) && !(excludeHolidays && isBankHoliday(current))) {
        added++;
      }
    }
    const stats = countBetween(s, current);
    setResult({ ...stats, resultDate: toDateStr(current) });
  };

  const formatDate = (ds: string) => {
    const d = new Date(ds);
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const dateInputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]";

  const faqSchema = [
    { question: "How do you count working days in the UK?", answer: "Working days (also called business days) are Monday to Friday, excluding UK bank holidays. Most legal deadlines, employment notice periods, and delivery estimates use this definition." },
    { question: "How many working days are there in 2026 in the UK?", answer: "There are 253 working days in 2026 in England and Wales, after excluding 8 bank holidays and all weekends. Scotland has a slightly different bank holiday schedule." },
    { question: "Do bank holidays count as working days?", answer: "No. UK bank holidays are not working days. Employers are not legally required to give bank holidays as paid leave, but most contracts include them. For legal deadlines, bank holidays are excluded from working day counts." },
    { question: "What is the difference between working days and business days?", answer: "In the UK, they mean the same thing: Monday to Friday excluding bank holidays. Some industries use 'business days' in contracts, but the legal definition is identical." },
  ];

  return (
    <>
      <SEO
        title="Working Days Calculator UK"
        description="Free UK working days calculator. Count business days between dates excluding weekends and bank holidays. Add working days to find deadline dates."
        keywords="working days calculator, business days calculator UK, working days between dates, bank holidays UK 2026"
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
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Working Days</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[11vw] lg:text-[90px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>WORKING</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                DAYS
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Count business days between two dates, or add working days to find your deadline — with UK bank holidays built in.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Main result */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {mode === "add" ? "Deadline Date" : "Working Days"}
                  </p>
                  {mode === "add" && result.resultDate ? (
                    <>
                      <p className="font-display text-3xl leading-tight" style={{ color: ACCENT }}>
                        {formatDate(result.resultDate)}
                      </p>
                      <p className="font-display text-xl text-white/60 mt-1">
                        {result.workingDays} working days from start
                      </p>
                    </>
                  ) : (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.workingDays}
                    </p>
                  )}
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Calendar Days", value: String(result.calendarDays) },
                    { label: "Weekends Excluded", value: String(result.weekendsExcluded) },
                    { label: "Bank Holidays Excluded", value: String(result.holidaysExcluded) },
                    { label: "Non-Working Days", value: String(result.weekendsExcluded + result.holidaysExcluded) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <CopyButton accentColor={ACCENT} results={[
                  { label: "Working Days", value: String(result.workingDays) },
                  { label: "Calendar Days", value: String(result.calendarDays) },
                  { label: "Weekends Excluded", value: String(result.weekendsExcluded) },
                  { label: "Bank Holidays Excluded", value: String(result.holidaysExcluded) },
                  ...(result.resultDate ? [{ label: "Deadline Date", value: formatDate(result.resultDate) }] : []),
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Calculate</h3>
                <Calendar className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Mode toggle */}
                <div className="flex gap-2">
                  {([["between", "Between Dates"], ["add", "Add Working Days"]] as const).map(([m, label]) => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setResult(null); }}
                      className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                      style={{
                        background: mode === m ? ACCENT : "rgba(255,255,255,0.05)",
                        color: mode === m ? "#000" : "rgba(255,255,255,0.4)",
                        border: mode === m ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Start date */}
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className={dateInputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {mode === "between" ? (
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className={dateInputClass}
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className={labelClass}>Working Days to Add</label>
                      <input
                        type="number"
                        min="0"
                        value={addWorkingDays}
                        onChange={e => setAddWorkingDays(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && calculate()}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                        onFocus={e => (e.target.style.borderColor = ACCENT)}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    {/* Quick buttons */}
                    <div>
                      <label className={labelClass}>Quick Select</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[5, 10, 20, 30].map(d => (
                          <button
                            key={d}
                            onClick={() => handleQuickAdd(d)}
                            className="py-3 rounded-lg text-sm font-heading uppercase tracking-wider transition-all border border-white/10 hover:border-white/30 text-white/60 hover:text-white bg-black/30"
                          >
                            {d} days
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Exclude bank holidays toggle */}
                <div className="flex items-center justify-between py-3 border-t border-white/10">
                  <span className="text-sm text-white/50 font-heading uppercase tracking-widest">Exclude UK Bank Holidays</span>
                  <button
                    onClick={() => setExcludeHolidays(!excludeHolidays)}
                    className="relative w-12 h-6 rounded-full transition-colors"
                    style={{ background: excludeHolidays ? ACCENT : "rgba(255,255,255,0.15)" }}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
                      style={{ transform: excludeHolidays ? "translateX(24px)" : "translateX(0)" }}
                    />
                  </button>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Working Days</span>
                      <span className="text-2xl font-display" style={{ color: ACCENT }}>
                        {result.workingDays}
                      </span>
                    </div>
                    {result.resultDate && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">Deadline</span>
                        <span className="font-heading" style={{ color: ACCENT }}>{formatDate(result.resultDate)}</span>
                      </div>
                    )}
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
                  Calculate
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Static content below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "Why working days matter more than you think",
              description: "If you've ever been told something will take '10 working days' and assumed that meant two weeks, you've already learned this the hard way. Working days exclude weekends and bank holidays, so 10 working days is actually 14 calendar days at minimum — and more if there's a bank holiday in the middle. This matters for legal deadlines, employment notice periods, delivery estimates, and anything involving HMRC. Get the count wrong, and you could miss a tribunal deadline or breach a contract term."
            }}
            howItWorks={{
              title: "How to use this calculator",
              description: "Pick the mode that matches what you need, enter your dates, and the calculator does the rest — including UK bank holidays for 2026.",
              steps: [
                { step: 1, title: "Choose your mode", description: "Use 'Between Dates' to count working days in a range, or 'Add Working Days' to find a deadline date from a start date. Both modes exclude weekends automatically." },
                { step: 2, title: "Set your dates", description: "Enter a start date and either an end date or the number of working days to add. The quick buttons (5, 10, 20, 30 days) are handy for common notice periods." },
                { step: 3, title: "Toggle bank holidays", description: "UK bank holidays are excluded by default. Turn this off if you need a pure weekday count without considering public holidays." },
                { step: 4, title: "Read the breakdown", description: "The results show working days, calendar days, weekends excluded, and bank holidays excluded — so you can see exactly where the time goes." }
              ]
            }}
            tips={[
              "Employment notice periods in the UK are usually calculated in weeks, not working days — but many contracts specify working days, so check yours",
              "HMRC deadlines nearly always mean working days, and they don't count the day the notice is issued",
              "Planning permission responses are measured in 8 weeks (56 calendar days), not working days — a common mix-up",
              "If a bank holiday falls on a weekend, the substitute day is the following Monday (or Tuesday if Monday is already a holiday)",
              "Court deadlines for filing documents are strict — if the last day falls on a weekend or bank holiday, the deadline moves to the next working day"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WorkingDaysCalculator;
