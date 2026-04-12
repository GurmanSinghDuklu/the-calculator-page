import { Logo } from "@/components/Logo";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, Route } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#8B5CF6";

const KM_PER_MILE = 1.609344;
const MILES_PER_KM = 0.621371;

type Direction = "km-to-miles" | "miles-to-km";

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const KmToMiles = () => {
  const [direction, setDirection] = useState<Direction>("km-to-miles");
  const [inputValue, setInputValue] = useState("10");
  const [result, setResult] = useState<{
    km: number;
    miles: number;
  } | null>(null);

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) return;

    let km: number;
    let miles: number;

    if (direction === "km-to-miles") {
      km = val;
      miles = Math.round(val * MILES_PER_KM * 1000000) / 1000000;
    } else {
      miles = val;
      km = Math.round(val * KM_PER_MILE * 1000000) / 1000000;
    }

    setResult({
      km: Math.round(km * 100) / 100,
      miles: Math.round(miles * 100) / 100,
    });
  };

  // Quick reference: common distances
  const commonDistances = [1, 5, 10, 25, 50, 100, 200, 500, 1000];
  const referenceTable = commonDistances.map(km => ({
    km,
    miles: Math.round(km * MILES_PER_KM * 100) / 100,
  }));
  const reverseTable = commonDistances.map(miles => ({
    miles,
    km: Math.round(miles * KM_PER_MILE * 100) / 100,
  }));

  // UK speed limits & running distances
  const speedLimits = [
    { mph: 20, kmh: Math.round(20 * KM_PER_MILE), context: "Residential zones" },
    { mph: 30, kmh: Math.round(30 * KM_PER_MILE), context: "Built-up areas" },
    { mph: 40, kmh: Math.round(40 * KM_PER_MILE), context: "Some urban roads" },
    { mph: 60, kmh: Math.round(60 * KM_PER_MILE), context: "Single carriageways" },
    { mph: 70, kmh: Math.round(70 * KM_PER_MILE), context: "Motorways & dual carriageways" },
  ];

  const runningDistances = [
    { name: "5K", km: 5, miles: 3.11 },
    { name: "10K", km: 10, miles: 6.21 },
    { name: "Half Marathon", km: 21.0975, miles: 13.1 },
    { name: "Marathon", km: 42.195, miles: 26.2 },
  ];

  const faqSchema = [
    { question: "How many miles is 1 km?", answer: "One kilometre is 0.621371 miles. To convert km to miles, multiply by 0.621371. So 10 km is about 6.21 miles." },
    { question: "Why does the UK use miles instead of kilometres?", answer: "The UK officially adopted the metric system for most measurements, but road distances and speed limits remain in miles and miles per hour. This dates back to pre-metrication and changing every road sign in the country would cost billions. It is one of the quirks of the UK's halfway-between-two-systems approach." },
    { question: "How far is a marathon in miles and km?", answer: "A marathon is exactly 42.195 kilometres or 26 miles and 385 yards (26.2 miles). The distance was standardised at the 1908 London Olympics so the race could start at Windsor Castle and finish in front of the royal box at the Olympic Stadium." },
    { question: "What is the quick trick for converting km to miles?", answer: "Multiply the kilometres by 0.6 for a rough estimate. For better accuracy, multiply by 5 and then divide by 8 — this gives you a result within 0.5% of the exact figure. For example, 100 km x 5 / 8 = 62.5 miles (actual: 62.14 miles)." },
  ];

  return (
    <>
      <SEO
        title="KM to Miles Converter"
        description="Convert kilometres to miles and back. Includes UK speed limits, marathon and running distances, plus a quick reference table."
        keywords="km to miles, kilometres to miles, miles to km, km to miles converter"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-violet-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">KM to Miles</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>KM</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO MILES
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert between kilometres and miles instantly. Handy for UK drivers, runners, and anyone navigating between metric and imperial distances.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "km-to-miles" ? "In Miles" : "In Kilometres"}
                  </p>
                  <p className="font-display text-5xl" style={{ color: ACCENT }}>
                    {direction === "km-to-miles"
                      ? <>{result.miles} <span className="text-2xl text-white/40">mi</span></>
                      : <>{result.km} <span className="text-2xl text-white/40">km</span></>}
                  </p>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Kilometres</p>
                    <p className="font-display text-lg text-white">{result.km} km</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Miles</p>
                    <p className="font-display text-lg text-white">{result.miles} mi</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Metres</p>
                    <p className="font-display text-lg text-white">{(result.km * 1000).toLocaleString()} m</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Yards</p>
                    <p className="font-display text-lg text-white">{Math.round(result.miles * 1760).toLocaleString()} yd</p>
                  </div>
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Kilometres", value: `${result.km} km` },
                  { label: "Miles", value: `${result.miles} mi` },
                ]} />
              </div>
            )}
          </div>

          {/* RIGHT — Form card */}
          <div className="w-full lg:w-1/2 z-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 pointer-events-none opacity-10" style={{ background: ACCENT }} />

            <div className="bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">Convert</h3>
                <Route className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Direction toggle */}
                <div className="flex gap-2">
                  {([["km-to-miles", "KM \u2192 Miles"], ["miles-to-km", "Miles \u2192 KM"]] as const).map(([d, label]) => (
                    <button
                      key={d}
                      onClick={() => { setDirection(d); setResult(null); }}
                      className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                      style={{
                        background: direction === d ? ACCENT : "rgba(255,255,255,0.05)",
                        color: direction === d ? "#fff" : "rgba(255,255,255,0.4)",
                        border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Value */}
                <div>
                  <label className={labelClass}>{direction === "km-to-miles" ? "Kilometres" : "Miles"}</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convert()}
                    placeholder={direction === "km-to-miles" ? "10" : "6"}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Result</span>
                      <span className="font-display text-2xl" style={{ color: ACCENT }}>
                        {direction === "km-to-miles"
                          ? `${result.miles} mi`
                          : `${result.km} km`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Convert button */}
                <button
                  onClick={convert}
                  className="w-full group flex items-center justify-center gap-2 text-white font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

            {/* Quick reference tables */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Distance Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">KM to Miles</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Kilometres</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Miles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referenceTable.map(({ km, miles }) => (
                      <tr key={km} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{km.toLocaleString()} km</td>
                        <td className="py-2 text-right text-white/70">{miles.toLocaleString()} mi</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Miles to KM table */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Miles to KM</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Miles</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Kilometres</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reverseTable.map(({ miles, km }) => (
                      <tr key={miles} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{miles.toLocaleString()} mi</td>
                        <td className="py-2 text-right text-white/70">{km.toLocaleString()} km</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UK Speed Limits */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">UK Speed Limits</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">MPH to KM/H</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">MPH</th>
                      <th className="text-center py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">KM/H</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Where</th>
                    </tr>
                  </thead>
                  <tbody>
                    {speedLimits.map(({ mph, kmh, context }) => (
                      <tr key={mph} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{mph} mph</td>
                        <td className="py-2 text-center text-white/70">{kmh} km/h</td>
                        <td className="py-2 text-right text-white/40 text-xs">{context}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Running Distances */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Running Distances</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">Common Race Lengths</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Race</th>
                      <th className="text-center py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">KM</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Miles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runningDistances.map(({ name, km, miles }) => (
                      <tr key={name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{name}</td>
                        <td className="py-2 text-center text-white/70">{km} km</td>
                        <td className="py-2 text-right text-white/70">{miles} mi</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Static content below the fold */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <CalculatorStaticContent
            whatIs={{
              title: "Why you need a km-to-miles converter",
              description: "The UK is one of the few countries that measures road distances in miles while most of the world uses kilometres. If you are planning a road trip in Europe, importing a car with a km-only speedometer, or training for a parkrun, you will constantly need to switch between the two. Sat-navs from European manufacturers often default to kilometres, and race distances are always listed in km (5K, 10K, half marathon). This converter saves you from doing the mental arithmetic every time."
            }}
            howItWorks={{
              title: "How to convert km to miles",
              description: "One mile is exactly 1.609344 kilometres. That ratio is all you need.",
              steps: [
                { step: 1, title: "KM to miles", description: "Multiply the kilometre value by 0.621371. For example, 100 km x 0.621371 = 62.14 miles." },
                { step: 2, title: "Miles to km", description: "Multiply the mile value by 1.609344. For example, 60 miles x 1.609344 = 96.56 km." },
                { step: 3, title: "Quick mental trick", description: "Multiply km by 5 then divide by 8 for a fast approximation. It is accurate to within 0.5%. So 80 km x 5 / 8 = 50 miles (actual: 49.71 miles)." }
              ]
            }}
            formula={{
              title: "The conversion formula",
              formula: "miles = km x 0.621371",
              explanation: "The international mile was defined as exactly 1,609.344 metres in 1959 by agreement between the US, UK, Canada, Australia, New Zealand, and South Africa. This makes the conversion exact. One kilometre equals 1,000 metres, so 1 mile = 1.609344 km. The inverse, 1 km = 0.621371 miles, is the same ratio flipped. The Fibonacci-based shortcut (multiply by 5, divide by 8) works because 5/8 = 0.625, which is remarkably close to the exact 0.621371."
            }}
            tips={[
              "For a rough estimate, multiply km by 0.6 — it is close enough for most everyday situations",
              "UK speed limits are in mph: 30 in towns, 60 on single carriageways, 70 on motorways — learn the km/h equivalents if you drive in Europe",
              "A 5K parkrun is 3.1 miles, a 10K is 6.2 miles, and a half marathon is 13.1 miles — useful for tracking pace in either unit",
              "Satnav showing km? The numbers will be roughly 60% higher than what you are used to seeing in miles",
              "The marathon distance (42.195 km) was set at the 1908 London Olympics — the course was extended so it could start at Windsor Castle and finish at the royal box"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default KmToMiles;
