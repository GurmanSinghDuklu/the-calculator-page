import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ACCENT = "#14B8A6";
const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const MonthsBetweenDatesCalculator = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const nextYearStr = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(nextYearStr);

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const start = s < e ? s : e;
    const end = s < e ? e : s;
    const swapped = s > e;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) { years--; months += 12; }
    const totalMonths = years * 12 + months;
    const totalDays = Math.round((end.getTime() - start.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);

    return { years, months, totalMonths, totalDays, totalWeeks, swapped };
  }, [startDate, endDate]);

  const faqSchema = [
    { question: "How do I calculate months between two dates?", answer: "Subtract the start year from the end year, multiply by 12, then add the difference in months. If the end month is earlier than the start month, subtract one year and add 12 to the month difference." },
    { question: "How many months is a 6-month fixed-term tenancy?", answer: "A standard 6-month Assured Shorthold Tenancy (AST) in the UK is exactly 6 calendar months from the start date to the end date." },
    { question: "What is a 3-month notice period?", answer: "A 3-month notice period means 3 calendar months from the date you give notice. For example, notice given on 6 April ends on 6 July. The calculator will show you the exact end date." },
    { question: "How many months in a year?", answer: "There are 12 months in a year. But dates don't always land evenly — a period of 12 months might span parts of two calendar years, which is why a calculator is more reliable than counting." },
  ];

  return (
    <>
      <SEO
        title="Months Between Dates Calculator"
        description="Calculate months between two dates, including years and months breakdown, total weeks, and total days. Useful for contracts and tenancies."
        keywords="months between dates, date difference months, how many months between, months calculator"
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
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-teal-500/30">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-white/60">Months Between Dates</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[10vw] lg:text-[80px]" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #5eead4 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: `drop-shadow(0 0 40px ${ACCENT}40)` }}>MONTHS</span>
              <span className="block text-[7vw] lg:text-[56px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>BETWEEN DATES</span>
            </h1>
            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">Calculate how many months, weeks, and days lie between any two dates.</p>
            </div>
            {result && (
              <div className="mt-10 space-y-4">
                {result.swapped && <p className="text-xs text-white/40 font-heading uppercase tracking-widest">Dates swapped — showing absolute difference</p>}
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">Total Months</p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>{result.totalMonths}<span className="text-2xl text-white/40 ml-2">months</span></p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Years & Months</p><p className="font-display text-lg text-white">{result.years}y {result.months}m</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Days</p><p className="font-display text-lg text-white">{result.totalDays.toLocaleString()}</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Total Weeks</p><p className="font-display text-lg text-white">{result.totalWeeks}</p></div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4"><p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Remaining Days</p><p className="font-display text-lg text-white">{result.totalDays - result.totalWeeks * 7}</p></div>
                </div>
                <CopyButton accentColor={ACCENT} results={[{ label: "Total months", value: `${result.totalMonths} months` }, { label: "Years & months", value: `${result.years} years ${result.months} months` }, { label: "Total days", value: `${result.totalDays} days` }]} />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Calculate</h3>
                <Calendar className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]" onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <div>
                  <label className={labelClass}>UK Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "6 month tenancy", months: 6 },
                      { label: "1 year tenancy", months: 12 },
                      { label: "3 month notice", months: 3 },
                      { label: "2 year fixed", months: 24 },
                    ].map(p => (
                      <button key={p.label} onClick={() => {
                        const s = new Date(); const e = new Date(s); e.setMonth(e.getMonth() + p.months);
                        setStartDate(s.toISOString().split("T")[0]); setEndDate(e.toISOString().split("T")[0]);
                      }} className="px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all">{p.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{ title: "What is a months between dates calculator?", description: "It calculates the exact number of calendar months (and days) between any two dates. Most useful for contract periods: tenancy agreements, fixed-term employment, mortgage terms, and notice periods." }}
            howItWorks={{ title: "How it calculates months", description: "The calculator counts complete calendar months between the start and end date, then shows the remaining days. It also shows total days and weeks.", steps: [{ step: 1, title: "Enter dates", description: "Select a start and end date using the date pickers." }, { step: 2, title: "Read results", description: "The result shows total months, years+months breakdown, total weeks, and total days." }] }}
            formula={{ title: "Calculation method", formula: "months = (years diff × 12) + months diff", explanation: "Calendar months are counted directly. The remaining days after complete months are also shown." }}
            tips={["A 6-month AST tenancy: landlord cannot give notice before month 4 to end at month 6", "3-month notice periods in senior roles often start on the first day of the following month", "A 2-year fixed mortgage: use this to check when your deal ends and when to start remortgaging", "Tax year runs 6 April to 5 April — exactly 12 months"]}
            faqs={faqSchema}
          />
        </div>
        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center"><span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span><p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p></div></footer>
      </div>
    </>
  );
};

export default MonthsBetweenDatesCalculator;
