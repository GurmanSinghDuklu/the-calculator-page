import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E";

type Mode = "add" | "difference" | "fromToday";

const MS_PER_DAY = 86_400_000;
const toUtcMidnight = (d: Date | string) => {
  const dt = d instanceof Date ? d : new Date(d);
  return Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
};
const daysBetween = (d1: string, d2: string, incl: boolean) => {
  const days = Math.round((toUtcMidnight(d2) - toUtcMidnight(d1)) / MS_PER_DAY);
  return incl ? (days >= 0 ? days + 1 : days - 1) : days;
};
const daysFromToday = (target: string, incl: boolean) => {
  const today = new Date();
  const days = Math.round((toUtcMidnight(target) - Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())) / MS_PER_DAY);
  return incl ? (days >= 0 ? days + 1 : days - 1) : days;
};

const DateCalculator = () => {
  const today = new Date().toISOString().split("T")[0];
  const [mode, setMode] = useState<Mode>("add");

  // Add/subtract state
  const [addDate,  setAddDate]  = useState(today);
  const [addValue, setAddValue] = useState("30");
  const [addUnit,  setAddUnit]  = useState("days");
  const [addResult, setAddResult] = useState<string | null>(null);

  // Difference state
  const [date1,     setDate1]     = useState(today);
  const [date2,     setDate2]     = useState(today);
  const [inclusive, setInclusive] = useState(false);
  const [diffResult, setDiffResult] = useState<{ days: number; weeks: number; months: number; years: number } | null>(null);

  // From today state
  const [targetDate,         setTargetDate]         = useState(today);
  const [fromTodayInclusive, setFromTodayInclusive] = useState(false);
  const [fromTodayResult,    setFromTodayResult]    = useState<number | null>(null);

  const calculateAddDate = () => {
    const date  = new Date(addDate);
    const value = parseInt(addValue);
    if (isNaN(value)) return;
    if (addUnit === "days")   date.setDate(date.getDate() + value);
    if (addUnit === "weeks")  date.setDate(date.getDate() + value * 7);
    if (addUnit === "months") date.setMonth(date.getMonth() + value);
    if (addUnit === "years")  date.setFullYear(date.getFullYear() + value);
    setAddResult(date.toISOString().split("T")[0]);
  };

  const calculateDateDifference = () => {
    const days = daysBetween(date1, date2, inclusive);
    setDiffResult({ days: Math.abs(days), weeks: Math.floor(Math.abs(days) / 7), months: Math.floor(Math.abs(days) / 30.44), years: Math.floor(Math.abs(days) / 365.25) });
  };

  const calculateDaysFromToday = () => setFromTodayResult(daysFromToday(targetDate, fromTodayInclusive));

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const dateClass  = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]";
  const selectClass = "w-full bg-black/40 border-white/10 text-white rounded-lg";
  const selectContent = "bg-[#1C1A1A] border-white/10 text-white";

  const modes: { key: Mode; label: string }[] = [
    { key: "add",        label: "Add / Subtract" },
    { key: "difference", label: "Days Between" },
    { key: "fromToday",  label: "From Today" },
  ];

  // Derive left-panel result text
  let heroResult: React.ReactNode = null;
  if (mode === "add" && addResult) {
    heroResult = (
      <div className="mt-10 space-y-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
          <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Result Date</p>
          <p className="font-display text-3xl" style={{ color: ACCENT }}>
            {new Date(addResult).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-xs text-white/25 font-sans mt-2">{addResult}</p>
        </div>
        <CopyButton accentColor={ACCENT} results={[
          { label: "Result Date", value: addResult },
        ]} />
      </div>
    );
  }
  if (mode === "difference" && diffResult) {
    heroResult = (
      <div className="mt-10 space-y-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
          <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Days Between</p>
          <p className="font-display text-5xl" style={{ color: ACCENT }}>{diffResult.days.toLocaleString()}</p>
          <p className="text-xs text-white/25 font-sans mt-1">calendar days</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Weeks",  value: diffResult.weeks.toLocaleString() },
            { label: "Months", value: diffResult.months.toLocaleString() },
            { label: "Years",  value: diffResult.years.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
              <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
              <p className="font-display text-xl text-white">{value}</p>
            </div>
          ))}
        </div>
        <CopyButton accentColor={ACCENT} results={[
          { label: "Days Between", value: diffResult.days.toLocaleString() },
          { label: "Weeks", value: diffResult.weeks.toLocaleString() },
          { label: "Months", value: diffResult.months.toLocaleString() },
          { label: "Years", value: diffResult.years.toLocaleString() },
        ]} />
      </div>
    );
  }
  if (mode === "fromToday" && fromTodayResult !== null) {
    heroResult = (
      <div className="mt-10 space-y-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
          <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
            {fromTodayResult >= 0 ? "Days Until" : "Days Since"}
          </p>
          <p className="font-display text-5xl" style={{ color: ACCENT }}>{Math.abs(fromTodayResult).toLocaleString()}</p>
          <p className="text-xs text-white/25 font-sans mt-1">
            {fromTodayResult >= 0 ? `${Math.abs(fromTodayResult)} days from today` : `${Math.abs(fromTodayResult)} days ago`}
          </p>
        </div>
        <CopyButton accentColor={ACCENT} results={[
          { label: fromTodayResult >= 0 ? "Days Until" : "Days Since", value: `${Math.abs(fromTodayResult)} days` },
        ]} />
      </div>
    );
  }

  const faqSchema = [
    { question: "How do I calculate the number of days between two dates?", answer: "Subtract the earlier date from the later date. Most calculators automatically handle months of different lengths and leap years to give an accurate count." },
    { question: "How many working days are between two dates?", answer: "Subtract weekends and public holidays from the total day count. A date calculator can do this automatically if you specify your country's public holiday schedule." },
    { question: "How do I add or subtract days from a date?", answer: "Start with your date, add or subtract the number of days, and roll over months and years as needed. For example, 30 days after 15 January 2026 is 14 February 2026." },
    { question: "What is the difference between calendar days and business days?", answer: "Calendar days count every day including weekends and holidays. Business days count only Monday to Friday, excluding public holidays. The distinction matters for deadlines and contracts." }
  ];

  return (
    <>
      <SEO
        title="Date Calculator - Add, Subtract & Compare Dates"
        description="Free date calculator to add or subtract days, weeks, months from any date. Calculate the difference between two dates."
        keywords="date calculator, date difference calculator, add days to date, subtract dates"
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
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
            <span>/</span>
            <span className="text-white/60">Date Calculator</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[14vw] lg:text-[115px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #06b6d4 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>DATE</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Add or subtract time from any date, calculate the difference between two dates, or find how many days until any event.
              </p>
            </div>

            {heroResult}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Parameters</h3>
                <CalendarDays className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              {/* Mode toggle */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {modes.map(({ key, label }) => (
                  <button key={key} onClick={() => setMode(key)}
                    className="py-2.5 px-2 rounded-lg font-heading text-[10px] uppercase tracking-widest transition-all border text-center"
                    style={{
                      borderColor: mode === key ? ACCENT : "rgba(255,255,255,0.08)",
                      background:  mode === key ? `${ACCENT}20` : "transparent",
                      color:       mode === key ? ACCENT : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-5">

                {/* ── ADD / SUBTRACT ── */}
                {mode === "add" && (
                  <>
                    <div>
                      <label className={labelClass}>Start Date</label>
                      <input type="date" value={addDate} onChange={e => setAddDate(e.target.value)}
                        className={dateClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Add / Subtract</label>
                        <input type="number" value={addValue} onChange={e => setAddValue(e.target.value)} placeholder="30"
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all"
                          onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                        <p className="text-[9px] text-white/20 font-sans mt-1">Negative to subtract</p>
                      </div>
                      <div>
                        <label className={labelClass}>Unit</label>
                        <Select value={addUnit} onValueChange={setAddUnit}>
                          <SelectTrigger className={selectClass}><SelectValue /></SelectTrigger>
                          <SelectContent className={selectContent}>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {addResult && (
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-end">
                          <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Result</span>
                          <span className="font-display text-xl" style={{ color: ACCENT }}>
                            {new Date(addResult).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                      </div>
                    )}
                    <button onClick={calculateAddDate}
                      className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                      style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}>
                      Calculate Date <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}

                {/* ── DAYS BETWEEN ── */}
                {mode === "difference" && (
                  <>
                    <div>
                      <label className={labelClass}>First Date</label>
                      <input type="date" value={date1} onChange={e => setDate1(e.target.value)}
                        className={dateClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                    <div>
                      <label className={labelClass}>Second Date</label>
                      <input type="date" value={date2} onChange={e => setDate2(e.target.value)}
                        className={dateClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={inclusive} onChange={e => setInclusive(e.target.checked)}
                        className="w-4 h-4 rounded accent-green-500" />
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Inclusive (add 1 day)</span>
                    </label>
                    {diffResult && (
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-end">
                          <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Days Between</span>
                          <span className="font-display text-xl" style={{ color: ACCENT }}>{diffResult.days.toLocaleString()} days</span>
                        </div>
                      </div>
                    )}
                    <button onClick={calculateDateDifference}
                      className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                      style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}>
                      Calculate Difference <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}

                {/* ── FROM TODAY ── */}
                {mode === "fromToday" && (
                  <>
                    <div>
                      <label className={labelClass}>Target Date</label>
                      <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)}
                        className={dateClass}
                        onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={fromTodayInclusive} onChange={e => setFromTodayInclusive(e.target.checked)}
                        className="w-4 h-4 rounded accent-green-500" />
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Inclusive (add 1 day)</span>
                    </label>
                    {fromTodayResult !== null && (
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-end">
                          <span className="text-white/40 text-xs font-heading uppercase tracking-widest">
                            {fromTodayResult >= 0 ? "Days Until" : "Days Since"}
                          </span>
                          <span className="font-display text-xl" style={{ color: ACCENT }}>{Math.abs(fromTodayResult).toLocaleString()} days</span>
                        </div>
                      </div>
                    )}
                    <button onClick={calculateDaysFromToday}
                      className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                      style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}>
                      Calculate Days <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DateCalculator;