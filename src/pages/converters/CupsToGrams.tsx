import { useState } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorStaticContent } from "@/components/CalculatorStaticContent";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, CookingPot } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ─── Accent colour ──────────────────────────────────────────────────────────
const ACCENT = "#F97316";

type Direction = "cups-to-grams" | "grams-to-cups";

interface Ingredient {
  label: string;
  gramsPerCup: number;
}

const INGREDIENTS: Record<string, Ingredient> = {
  "plain-flour":       { label: "Plain Flour",         gramsPerCup: 125 },
  "self-raising-flour":{ label: "Self-Raising Flour",   gramsPerCup: 125 },
  "caster-sugar":      { label: "Caster Sugar",         gramsPerCup: 200 },
  "granulated-sugar":  { label: "Granulated Sugar",     gramsPerCup: 200 },
  "brown-sugar":       { label: "Brown Sugar",          gramsPerCup: 220 },
  "icing-sugar":       { label: "Icing Sugar",          gramsPerCup: 120 },
  "butter":            { label: "Butter",               gramsPerCup: 227 },
  "rice":              { label: "Rice",                 gramsPerCup: 185 },
  "oats":              { label: "Oats",                 gramsPerCup: 90  },
  "cocoa-powder":      { label: "Cocoa Powder",         gramsPerCup: 85  },
  "honey":             { label: "Honey",                gramsPerCup: 340 },
  "milk":              { label: "Milk",                 gramsPerCup: 245 },
  "water":             { label: "Water",                gramsPerCup: 237 },
};

const CUP_FRACTIONS = [
  { label: "\u00BC cup", multiplier: 0.25 },
  { label: "\u2153 cup", multiplier: 1 / 3 },
  { label: "\u00BD cup", multiplier: 0.5 },
  { label: "\u00BE cup", multiplier: 0.75 },
  { label: "1 cup",      multiplier: 1 },
];

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const CupsToGrams = () => {
  const [direction, setDirection] = useState<Direction>("cups-to-grams");
  const [amount, setAmount] = useState("1");
  const [ingredientKey, setIngredientKey] = useState("plain-flour");
  const [result, setResult] = useState<{ cups: number; grams: number } | null>(null);

  const ingredient = INGREDIENTS[ingredientKey];

  const convert = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 0) return;

    if (direction === "cups-to-grams") {
      const grams = Math.round(val * ingredient.gramsPerCup * 100) / 100;
      setResult({ cups: val, grams });
    } else {
      const cups = Math.round((val / ingredient.gramsPerCup) * 1000) / 1000;
      setResult({ cups, grams: val });
    }
  };

  const faqSchema = [
    { question: "How many grams is 1 cup of flour?", answer: "One US cup of plain flour weighs approximately 125 grams. Self-raising flour is the same. But this varies by how tightly you pack the cup, which is exactly why scales are more reliable." },
    { question: "Is a UK cup the same as a US cup?", answer: "No. A US cup is 236.6 ml, while the old imperial UK cup is 284 ml. Most modern UK recipes that use cups follow the US measurement, but always check. If a recipe comes from an American blog, it means US cups." },
    { question: "Why do different ingredients have different cup-to-gram conversions?", answer: "Because a cup is a volume measurement, not a weight measurement. A cup of honey (340 g) is almost four times heavier than a cup of oats (90 g) because honey is much denser. This is why professional bakers weigh everything." },
    { question: "Should I use cups or grams for baking?", answer: "Grams, every time. Baking is chemistry — the ratios matter. A cup of flour can vary by 30 g depending on whether you scoop or spoon it. Digital kitchen scales cost under a tenner and take the guesswork out entirely." },
  ];

  return (
    <>
      <SEO
        title="Cups to Grams Converter"
        description="Convert cups to grams for baking ingredients. Flour, sugar, butter, rice and more. Accurate UK/US cup measurements with quick reference tables."
        keywords="cups to grams, grams to cups, baking converter, flour cups to grams, sugar cups to grams, cooking converter"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Cups to Grams</span>
          </nav>
        </div>

        {/* Split-screen hero */}
        <div className="flex flex-col lg:flex-row min-h-[90vh] max-w-7xl mx-auto px-6 py-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography + results */}
          <div className="flex flex-col z-10 lg:w-1/2 select-none">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none -z-10" style={{ background: ACCENT, top: "10%", left: "0" }} />

            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[13vw] lg:text-[105px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #fb923c 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>CUPS</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO GRAMS
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert cups to grams (and back) for common baking ingredients. Because a cup of flour and a cup of honey are very different things.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "cups-to-grams" ? "Weight in Grams" : "Volume in Cups"}
                  </p>
                  {direction === "cups-to-grams" ? (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.grams.toLocaleString()} <span className="text-2xl text-white/40">g</span>
                    </p>
                  ) : (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.cups} <span className="text-2xl text-white/40">cups</span>
                    </p>
                  )}
                  <p className="text-sm text-white/40 mt-2 font-heading uppercase tracking-widest">
                    {ingredient.label}
                  </p>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Cups</p>
                    <p className="font-display text-lg text-white">{result.cups} cups</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Grams</p>
                    <p className="font-display text-lg text-white">{result.grams.toLocaleString()} g</p>
                  </div>
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Ingredient", value: ingredient.label },
                  { label: "Cups", value: `${result.cups} cups` },
                  { label: "Grams", value: `${result.grams} g` },
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
                <CookingPot className="h-6 w-6" style={{ color: ACCENT }} />
              </div>

              <div className="space-y-5">

                {/* Direction toggle */}
                <div className="flex gap-2">
                  {([["cups-to-grams", "Cups \u2192 Grams"], ["grams-to-cups", "Grams \u2192 Cups"]] as const).map(([d, label]) => (
                    <button
                      key={d}
                      onClick={() => { setDirection(d); setResult(null); }}
                      className="flex-1 py-3 rounded-lg text-xs font-heading uppercase tracking-widest transition-all"
                      style={{
                        background: direction === d ? ACCENT : "rgba(255,255,255,0.05)",
                        color: direction === d ? "#000" : "rgba(255,255,255,0.4)",
                        border: direction === d ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Amount */}
                <div>
                  <label className={labelClass}>{direction === "cups-to-grams" ? "Cups" : "Grams"}</label>
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convert()}
                    placeholder="1"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-xl font-medium placeholder-white/20 focus:outline-none transition-all"
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Ingredient select */}
                <div>
                  <label className={labelClass}>Ingredient</label>
                  <Select value={ingredientKey} onValueChange={v => { setIngredientKey(v); setResult(null); }}>
                    <SelectTrigger className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-4 text-white text-base font-medium focus:outline-none focus:ring-0 focus:border-white/30 hover:border-white/20 transition-all h-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C1A1A] border border-white/10 text-white rounded-xl shadow-2xl">
                      {Object.entries(INGREDIENTS).map(([key, { label }]) => (
                        <SelectItem key={key} value={key} className="text-white/60 hover:text-white focus:text-white focus:bg-white/10 cursor-pointer py-2.5 px-4 rounded-lg">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Result preview */}
                {result && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <span className="text-white/40 text-xs font-heading uppercase tracking-widest">Result</span>
                      <span className="font-display text-2xl" style={{ color: ACCENT }}>
                        {direction === "cups-to-grams"
                          ? `${result.grams.toLocaleString()} g`
                          : `${result.cups} cups`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Convert button */}
                <button
                  onClick={convert}
                  className="w-full group flex items-center justify-center gap-2 text-black font-heading font-bold py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
                  style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 35px -5px ${ACCENT}90`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px -5px ${ACCENT}80`)}
                >
                  Convert <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

            {/* Quick reference table for selected ingredient */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Quick Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">{ingredient.label}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Cups</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Grams</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CUP_FRACTIONS.map(({ label, multiplier }) => (
                      <tr key={label} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{label}</td>
                        <td className="py-2 text-right text-white/70">{Math.round(ingredient.gramsPerCup * multiplier)} g</td>
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
              title: "Why cups are a terrible way to measure baking ingredients",
              description: "A cup is a volume measurement — 236.6 ml in the US standard. The problem is that baking ingredients have wildly different densities. One cup of plain flour weighs about 125 grams, but one cup of honey weighs 340 grams. Even worse, how you fill the cup matters: scooping flour directly from the bag compresses it, giving you up to 30 grams more than if you spoon it in and level it off. That is a big enough difference to ruin a cake. American recipes use cups because measuring cups were cheap and ubiquitous. British and European recipes mostly use grams because digital scales are more precise. If you are following a US recipe in a UK kitchen, this converter bridges the gap."
            }}
            howItWorks={{
              title: "How to convert cups to grams",
              description: "Each ingredient has a known weight per cup, based on standard density measurements.",
              steps: [
                { step: 1, title: "Pick your ingredient", description: "Different ingredients have different densities. A cup of butter (227 g) weighs nearly twice as much as a cup of flour (125 g). You need the right conversion factor for each one." },
                { step: 2, title: "Multiply or divide", description: "To go from cups to grams, multiply the number of cups by the grams-per-cup value. To go from grams to cups, divide the grams by the same value. For example, 2 cups of plain flour = 2 x 125 = 250 g." },
                { step: 3, title: "Check the reference table", description: "The quick reference table below the converter shows common fractional cup amounts for your selected ingredient. Handy when a recipe calls for three-quarters of a cup and you just want the number." }
              ]
            }}
            formula={{
              title: "The conversion formula",
              formula: "grams = cups x grams-per-cup for that ingredient",
              explanation: "There is no single cups-to-grams formula because it depends entirely on what you are measuring. Water is 237 g per cup. Flour is 125 g. Honey is 340 g. The converter stores the correct density for each ingredient and does the maths for you. All values are based on US standard cup measurements (236.6 ml). The old imperial UK cup is 284 ml — about 20% larger — but modern UK recipes that use cups almost always mean the US cup."
            }}
            tips={[
              "If you are serious about baking, buy a digital kitchen scale — they cost under ten pounds and they are more accurate than any cup measurement",
              "When a US recipe says 'cup', it means a US standard cup (236.6 ml), not the mug sitting on your desk",
              "Scooping flour directly from the bag packs it down — spoon it into the cup and level with a knife for a closer match to the standard 125 g",
              "Sticky ingredients like honey are easier to weigh than to measure in cups — you lose a lot stuck to the sides of the measuring cup",
              "The butter conversion (227 g per cup) matches exactly two standard US sticks of butter, which makes US butter recipes easier to follow in the UK"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator Page.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CupsToGrams;
