import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#8B5CF6";

type Mode = "between" | "addsubtract" | "convert";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDuration(totalMinutes: number): string {
  const h = Math.floor(Math.abs(totalMinutes) / 60);
  const m = Math.abs(totalMinutes) % 60;
  if (h === 0) return `${m} minute${m !== 1 ? "s" : ""}`;
  if (m === 0) return `${h} hour${h !== 1 ? "s" : ""}`;
  return `${h} hour${h !== 1 ? "s" : ""} ${m} minute${m !== 1 ? "s" : ""}`;
}

const HoursCalculator = () => {
  const [mode, setMode] = useState<Mode>("between");

  // Between mode
  const [startH, setStartH] = useState(9);
  const [startM, setStartM] = useState(0);
  const [endH, setEndH] = useState(17);
  const [endM, setEndM] = useState(30);

  // Add/Subtract mode
  const [baseH, setBaseH] = useState(14);
  const [baseM, setBaseM] = useState(0);
  const [addHours, setAddHours] = useState(3);
  const [addMinutes, setAddMinutes] = useState(30);
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  // Convert mode
  const [convertHours, setConvertHours] = useState(8);

  const betweenResult = useMemo(() => {
    let startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;
    // Handle overnight
    if (endTotal <= startTotal) endTotal += 24 * 60;
    const diff = endTotal - startTotal;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    const overnight = endH * 60 + endM <= startH * 60 + startM;
    return { diff, hours, minutes, overnight, formatted: formatDuration(diff) };
  }, [startH, startM, endH, endM]);

  const addResult = useMemo(() => {
    const baseTotal = baseH * 60 + baseM;
    const delta = addHours * 60 + addMinutes;
    const resultTotal =
      operation === "add" ? baseTotal + delta : baseTotal - delta;
    // Normalise to 0–1439
    const normalised = ((resultTotal % (24 * 60)) + 24 * 60) % (24 * 60);
    const rH = Math.floor(normalised / 60);
    const rM = normalised % 60;
    const adjustedDay = operation === "add"
      ? Math.floor((baseTotal + delta) / (24 * 60))
      : resultTotal < 0
        ? -Math.ceil(Math.abs(resultTotal) / (24 * 60))
        : 0;
    return {
      hours: rH,
      minutes: rM,
      time: `${pad(rH)}:${pad(rM)}`,
      dayShift: adjustedDay,
    };
  }, [baseH, baseM, addHours, addMinutes, operation]);

  const convertResult = useMemo(() => {
    const h = convertHours;
    return {
      minutes: h * 60,
      seconds: h * 3600,
      days: Math.floor(h / 24),
      remainingHours: h % 24,
      weeks: Math.floor(h / (24 * 7)),
      remainingDays: Math.floor((h % (24 * 7)) / 24),
      remainingH: h % 24,
    };
  }, [convertHours]);

  const labelClass =
    "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";
  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-lg font-medium focus:outline-none transition-all [color-scheme:dark]";
  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-heading uppercase tracking-wider transition-all ${
      active
        ? "bg-white/10 text-white border border-white/20"
        : "text-white/40 hover:text-white/60"
    }`;

  const faqSchema = [
    {
      question: "How do I calculate hours between two times?",
      answer:
        "Enter your start time and end time. The calculator automatically handles overnight shifts — for example, 22:00 to 06:00 correctly gives 8 hours, not negative 16 hours.",
    },
    {
      question: "What is the standard UK working week in hours?",
      answer:
        "The typical full-time UK working week is 37.5 hours (7.5 hours per day, Monday to Friday). The Working Time Directive limits average weekly hours to 48, though employees can opt out in writing.",
    },
    {
      question: "How do I convert hours to days?",
      answer:
        "Divide the number of hours by 24. For example, 72 hours = 3 days, 36 hours = 1 day and 12 hours. Use the Convert tab for instant conversions.",
    },
    {
      question: "Can I add hours across midnight?",
      answer:
        "Yes. The Add/Subtract tab handles day rollovers. If you add 6 hours to 22:00, the result shows 04:00 (+1 day), making it clear the result falls on the next day.",
    },
  ];

  return (
    <>
      <SEO
        title="Hours Calculator"
        description="Calculate hours between two times, add or subtract hours, and convert hours to minutes, days and weeks. Handles overnight shifts."
        keywords="hours calculator, hours between times, time duration calculator, how many hours between, add hours to time"
        faqSchema={faqSchema}
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-purple-500/30">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">
              Tools
            </Link>
            <span>/</span>
            <span className="text-white/60">Hours Calculator</span>
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
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #ec4899 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
                }}
              >
                HOURS
              </span>
              <span
                className="block text-[7vw] lg:text-[55px] mt-1"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  color: "transparent",
                }}
              >
                CALCULATOR
              </span>
            </h1>

            <div className="mt-8 space-y-4">
              {mode === "between" && (
                <div className="border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} style={{ color: ACCENT }} />
                    <span className="font-heading text-xs uppercase tracking-widest text-white/50">
                      Time Duration
                    </span>
                  </div>
                  <p className="text-4xl lg:text-5xl font-display tracking-tight text-white">
                    {betweenResult.formatted}
                  </p>
                  {betweenResult.overnight && (
                    <p className="text-sm text-white/40 mt-2 font-heading uppercase tracking-wider">
                      Overnight shift detected
                    </p>
                  )}
                  <div className="mt-4">
                    <CopyButton results={[
                      { label: "Duration", value: betweenResult.formatted },
                      { label: "Total minutes", value: `${betweenResult.diff}` },
                    ]} accentColor={ACCENT} />
                  </div>
                </div>
              )}

              {mode === "addsubtract" && (
                <div className="border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} style={{ color: ACCENT }} />
                    <span className="font-heading text-xs uppercase tracking-widest text-white/50">
                      Result Time
                    </span>
                  </div>
                  <p className="text-4xl lg:text-5xl font-display tracking-tight text-white">
                    {addResult.time}
                    {addResult.dayShift !== 0 && (
                      <span className="text-lg text-white/40 ml-2">
                        ({addResult.dayShift > 0 ? "+" : ""}
                        {addResult.dayShift} day{Math.abs(addResult.dayShift) !== 1 ? "s" : ""})
                      </span>
                    )}
                  </p>
                  <CopyButton results={[{ label: "Result time", value: addResult.time }]} accentColor={ACCENT} />
                </div>
              )}

              {mode === "convert" && (
                <div className="border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} style={{ color: ACCENT }} />
                    <span className="font-heading text-xs uppercase tracking-widest text-white/50">
                      Conversion
                    </span>
                  </div>
                  <div className="space-y-2 text-white/80">
                    <p className="text-2xl font-display text-white">
                      {convertHours.toLocaleString()} hour{convertHours !== 1 ? "s" : ""}
                    </p>
                    <p>= {convertResult.minutes.toLocaleString()} minutes</p>
                    <p>= {convertResult.seconds.toLocaleString()} seconds</p>
                    {convertResult.days > 0 && (
                      <p>
                        = {convertResult.days} day{convertResult.days !== 1 ? "s" : ""}
                        {convertResult.remainingHours > 0 &&
                          ` ${convertResult.remainingHours} hour${convertResult.remainingHours !== 1 ? "s" : ""}`}
                      </p>
                    )}
                    {convertResult.weeks > 0 && (
                      <p>
                        = {convertResult.weeks} week{convertResult.weeks !== 1 ? "s" : ""}
                        {convertResult.remainingDays > 0 &&
                          ` ${convertResult.remainingDays} day${convertResult.remainingDays !== 1 ? "s" : ""}`}
                        {convertResult.remainingH > 0 &&
                          ` ${convertResult.remainingH} hour${convertResult.remainingH !== 1 ? "s" : ""}`}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Calculator */}
          <div className="lg:w-1/2 w-full max-w-md">
            <div className="border border-white/10 rounded-2xl p-8 bg-black/20 backdrop-blur-sm">
              {/* Mode tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button className={tabClass(mode === "between")} onClick={() => setMode("between")}>
                  Between
                </button>
                <button className={tabClass(mode === "addsubtract")} onClick={() => setMode("addsubtract")}>
                  Add / Subtract
                </button>
                <button className={tabClass(mode === "convert")} onClick={() => setMode("convert")}>
                  Convert
                </button>
              </div>

              {mode === "between" && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Start Time</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={23}
                        value={startH}
                        onChange={(e) => setStartH(Math.min(23, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                      <span className="text-white/40 text-2xl font-bold">:</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={startM}
                        onChange={(e) => setStartM(Math.min(59, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight size={20} className="text-white/20" />
                  </div>
                  <div>
                    <label className={labelClass}>End Time</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={23}
                        value={endH}
                        onChange={(e) => setEndH(Math.min(23, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                      <span className="text-white/40 text-2xl font-bold">:</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={endM}
                        onChange={(e) => setEndM(Math.min(59, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                    </div>
                  </div>

                  {/* Quick presets */}
                  <div>
                    <label className={labelClass}>Quick Presets</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "9–5", s: [9, 0], e: [17, 0] },
                        { label: "9–5:30", s: [9, 0], e: [17, 30] },
                        { label: "Night shift", s: [22, 0], e: [6, 0] },
                        { label: "Half day", s: [9, 0], e: [13, 0] },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => {
                            setStartH(preset.s[0]);
                            setStartM(preset.s[1]);
                            setEndH(preset.e[0]);
                            setEndM(preset.e[1]);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {mode === "addsubtract" && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Start Time</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={23}
                        value={baseH}
                        onChange={(e) => setBaseH(Math.min(23, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                      <span className="text-white/40 text-2xl font-bold">:</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={baseM}
                        onChange={(e) => setBaseM(Math.min(59, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Operation</label>
                    <div className="flex gap-2">
                      <button
                        className={tabClass(operation === "add")}
                        onClick={() => setOperation("add")}
                      >
                        + Add
                      </button>
                      <button
                        className={tabClass(operation === "subtract")}
                        onClick={() => setOperation("subtract")}
                      >
                        − Subtract
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Hours &amp; Minutes</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={999}
                        value={addHours}
                        onChange={(e) => setAddHours(Math.max(0, Number(e.target.value)))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                      <span className="text-white/40 text-xs">h</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={addMinutes}
                        onChange={(e) => setAddMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
                        className={inputClass + " text-center"}
                        style={{ width: 80 }}
                      />
                      <span className="text-white/40 text-xs">m</span>
                    </div>
                  </div>
                </div>
              )}

              {mode === "convert" && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Hours</label>
                    <input
                      type="number"
                      min={0}
                      max={99999}
                      value={convertHours}
                      onChange={(e) => setConvertHours(Math.max(0, Number(e.target.value)))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Common Values</label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 8, 24, 37.5, 48, 72, 168, 720].map((h) => (
                        <button
                          key={h}
                          onClick={() => setConvertHours(h)}
                          className="px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/30 hover:text-white/80 transition-all"
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* UK work reference */}
            <div className="mt-6 border border-white/10 rounded-2xl p-6 bg-black/20 backdrop-blur-sm">
              <h3 className="font-heading text-xs uppercase tracking-widest text-white/50 mb-4">
                UK Working Hours Reference
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Full-time week", value: "37.5 hours" },
                  { label: "Working Time Directive", value: "48h max/week" },
                  { label: "Standard day", value: "7.5 hours" },
                  { label: "Part-time threshold", value: "30 hours" },
                  { label: "Night worker limit", value: "8h per 24h" },
                  { label: "Rest break", value: "20 min per 6h" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-white/40 text-xs">{item.label}</span>
                    <span className="text-white/80 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Educational content */}
        <CalculatorStaticContent
          whatIs={{ title: "What Is an Hours Calculator?", description: "An hours calculator helps you work out the duration between two clock times, add or subtract hours from a starting time, and convert hours into other units like minutes, days, and weeks." }}
          howItWorks={{ title: "How It Works", description: "Enter your times in 24-hour format. The calculator handles overnight shifts automatically — if the end time is earlier than the start time, it assumes you've crossed midnight. Results update instantly as you type." }}
          formula={{ title: "Formula", formula: "Duration = End Time − Start Time", explanation: "With midnight rollover: if End < Start, add 24 hours. For example, 22:00 to 06:00 = (06:00 + 24:00) − 22:00 = 8 hours." }}
          tips={[
            "Use the 'Night shift' preset for common overnight patterns like 10pm–6am",
            "The UK Working Time Directive limits average weekly hours to 48 — use Convert mode to check",
            "For payroll, remember that a 37.5-hour week usually means 7.5 hours per day excluding lunch",
            "Part-time workers have the same rights pro rata — use Between mode to track actual hours",
          ]}
          faqs={faqSchema}
        />

        <FinancialDisclosure variant="general" />
      </div>
    </>
  );
};

export default HoursCalculator;
