import { useState } from "react";
import { SEO } from "@/components/SEO";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour for Everyday category ─────────────────────────────────────
const ACCENT = "#22C55E";

const AgeCalculator = () => {
  const [birthDate,   setBirthDate]   = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{
    years: number; months: number; days: number;
    totalDays: number; totalMonths: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth   = new Date(birthDate);
    const current = new Date(currentDate);
    if (birth > current) return;

    let years  = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth()    - birth.getMonth();
    let days   = current.getDate()     - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(current.getFullYear(), current.getMonth(), 0).getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((current.getTime() - birth.getTime()) / 86_400_000);
    setResult({ years, months, days, totalDays, totalMonths: years * 12 + months });
  };

  const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

  // date input dark styling via inline + onFocus trick
  const dateInputClass = "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]";

  const faqSchema = [
    { question: "How do I calculate my exact age?", answer: "Subtract your birth date from today's date. Account for whether the anniversary month and day have passed this year to determine if you have had your birthday yet." },
    { question: "How many days old am I?", answer: "Multiply your age in years by 365 and add the days since your last birthday. Our age calculator accounts for leap years to give you an accurate day count." },
    { question: "What is the difference between chronological age and biological age?", answer: "Chronological age is the number of years since birth. Biological age reflects your body's health and fitness level, which may be younger or older than your chronological age." },
    { question: "How do I calculate age from a date of birth?", answer: "Subtract the birth year from the current year, then adjust by -1 if the birthday has not yet occurred this year. For example, born in 1990, current year 2026: age is 35 if birthday has passed, or 35 if not yet." }
  ];

  return (
    <>
      <SEO
        title="Age Calculator - Calculate Your Exact Age"
        description="Free age calculator to find your exact age in years, months, and days. Calculate age from date of birth."
        keywords="age calculator, calculate age, how old am i, age calculator from date of birth"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-green-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
            <span>/</span>
            <span className="text-white/60">Age Calculator</span>
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
              }}>AGE</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Find your exact age in years, months, and days — plus total days, hours, and minutes you've been alive.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                {/* Main age hero */}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">You Are</p>
                  <p className="font-display text-3xl leading-tight" style={{ color: ACCENT }}>
                    {result.years} <span className="text-white/40 text-xl">years</span>
                  </p>
                  <p className="font-display text-xl text-white/60 mt-1">
                    {result.months} months, {result.days} days
                  </p>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Months",  value: result.totalMonths.toLocaleString() + " mo" },
                    { label: "Total Days",    value: result.totalDays.toLocaleString()   + " days" },
                    { label: "Total Hours",   value: (result.totalDays * 24).toLocaleString() + " hrs" },
                    { label: "Total Minutes", value: (result.totalDays * 24 * 60).toLocaleString() + " min" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                      <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                      <p className="font-display text-lg text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Dates</h3>
                <Calendar className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Date of birth */}
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    className={dateInputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Calculate age on */}
                <div>
                  <label className={labelClass}>Calculate Age On</label>
                  <input
                    type="date"
                    value={currentDate}
                    onChange={e => setCurrentDate(e.target.value)}
                    className={dateInputClass}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-end pb-3 border-b border-white/10">
                      <span className="text-white/40 text-sm font-heading uppercase tracking-widest">Age</span>
                      <span className="text-2xl font-display" style={{ color: ACCENT }}>
                        {result.years} yrs, {result.months} mo, {result.days} days
                      </span>
                    </div>
                    {[
                      { label: "Total Months", value: `${result.totalMonths.toLocaleString()} months` },
                      { label: "Total Days",   value: `${result.totalDays.toLocaleString()} days`, accent: true },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-white/30 text-xs font-heading uppercase tracking-widest">{label}</span>
                        <span className="font-heading" style={{ color: accent ? ACCENT : "rgba(255,255,255,0.7)" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Calculate button */}
                <button
                  onClick={calculateAge}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Calculate Age
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AgeCalculator;