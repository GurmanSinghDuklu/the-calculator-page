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

type Direction = "grams-to-tbsp" | "tbsp-to-grams";

interface Ingredient {
  label: string;
  gramsPerTbsp: number;
}

const INGREDIENTS: Record<string, Ingredient> = {
  "plain-flour":       { label: "Plain Flour",         gramsPerTbsp: 8 },
  "self-raising-flour":{ label: "Self-Raising Flour",   gramsPerTbsp: 8 },
  "granulated-sugar":  { label: "Granulated Sugar",     gramsPerTbsp: 12.5 },
  "caster-sugar":      { label: "Caster Sugar",         gramsPerTbsp: 12 },
  "icing-sugar":       { label: "Icing Sugar",          gramsPerTbsp: 8 },
  "butter":            { label: "Butter",               gramsPerTbsp: 14 },
  "cocoa-powder":      { label: "Cocoa Powder",         gramsPerTbsp: 7 },
  "baking-powder":     { label: "Baking Powder",        gramsPerTbsp: 14 },
  "salt":              { label: "Salt",                 gramsPerTbsp: 18 },
  "honey":             { label: "Honey",                gramsPerTbsp: 21 },
  "oil":               { label: "Oil (vegetable/olive)",gramsPerTbsp: 14 },
  "milk":              { label: "Milk",                 gramsPerTbsp: 15 },
  "cream":             { label: "Cream",                gramsPerTbsp: 15 },
};

const COMMON_AMOUNTS = [1, 2, 3, 4, 5];

const labelClass = "block text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2";

const GramsToTablespoons = () => {
  const [direction, setDirection] = useState<Direction>("grams-to-tbsp");
  const [amount, setAmount] = useState("10");
  const [ingredientKey, setIngredientKey] = useState("plain-flour");
  const [result, setResult] = useState<{ tbsp: number; grams: number } | null>(null);

  const ingredient = INGREDIENTS[ingredientKey];

  const convert = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 0) return;

    if (direction === "grams-to-tbsp") {
      const tbsp = Math.round((val / ingredient.gramsPerTbsp) * 100) / 100;
      setResult({ tbsp, grams: val });
    } else {
      const grams = Math.round(val * ingredient.gramsPerTbsp * 100) / 100;
      setResult({ tbsp: val, grams });
    }
  };

  const faqSchema = [
    { question: "How many grams in a tablespoon of flour?", answer: "One level tablespoon of plain flour weighs approximately 8 grams. This is a standard metric tablespoon (15 ml). Self-raising flour is the same weight per tablespoon." },
    { question: "Is a UK tablespoon the same as a US tablespoon?", answer: "Very nearly. A UK/metric tablespoon is exactly 15 ml. A US tablespoon is 14.79 ml — the difference is about 1.4% and is negligible for cooking purposes. You can treat them as the same." },
    { question: "Why do different ingredients weigh different amounts per tablespoon?", answer: "A tablespoon measures volume, not weight. Dense ingredients like honey (21 g per tbsp) weigh far more than light, powdery ones like cocoa (7 g per tbsp). This is why weighing ingredients on a digital scale is always more accurate than using spoon measures." },
    { question: "How do I measure a level tablespoon?", answer: "Scoop the ingredient with the tablespoon, then use the flat edge of a knife to scrape across the top, removing any excess. This gives you a consistent, level measure. A heaped tablespoon can contain 50% more, which is enough to throw off a recipe." },
  ];

  return (
    <>
      <SEO
        title="Grams to Tablespoons Converter"
        description="Convert grams to tablespoons for baking ingredients. Flour, sugar, butter, honey and more with accurate UK metric tablespoon measurements."
        keywords="grams to tablespoons, tablespoons to grams, how many grams in a tablespoon, tbsp to grams, tablespoon converter"
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

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-orange-500/30">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories/everyday" className="hover:text-white transition-colors">Converters</Link>
            <span>/</span>
            <span className="text-white/60">Grams to Tablespoons</span>
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
              }}>GRAMS</span>
              <span className="block text-[8vw] lg:text-[65px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                TO TBSP
              </span>
            </h1>

            <div className="mt-8 max-w-sm pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                Convert grams to tablespoons (and back) for common baking ingredients. Because 10 grams of flour and 10 grams of honey are very different volumes.
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-2">
                    {direction === "grams-to-tbsp" ? "Volume in Tablespoons" : "Weight in Grams"}
                  </p>
                  {direction === "grams-to-tbsp" ? (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.tbsp.toLocaleString()} <span className="text-2xl text-white/40">tbsp</span>
                    </p>
                  ) : (
                    <p className="font-display text-5xl" style={{ color: ACCENT }}>
                      {result.grams.toLocaleString()} <span className="text-2xl text-white/40">g</span>
                    </p>
                  )}
                  <p className="text-sm text-white/40 mt-2 font-heading uppercase tracking-widest">
                    {ingredient.label}
                  </p>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Tablespoons</p>
                    <p className="font-display text-lg text-white">{result.tbsp} tbsp</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">Grams</p>
                    <p className="font-display text-lg text-white">{result.grams.toLocaleString()} g</p>
                  </div>
                </div>

                <CopyButton accentColor={ACCENT} results={[
                  { label: "Ingredient", value: ingredient.label },
                  { label: "Tablespoons", value: `${result.tbsp} tbsp` },
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
                  {([["grams-to-tbsp", "Grams \u2192 Tbsp"], ["tbsp-to-grams", "Tbsp \u2192 Grams"]] as const).map(([d, label]) => (
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
                  <label className={labelClass}>{direction === "grams-to-tbsp" ? "Grams" : "Tablespoons"}</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && convert()}
                    placeholder="10"
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
                        {direction === "grams-to-tbsp"
                          ? `${result.tbsp} tbsp`
                          : `${result.grams.toLocaleString()} g`}
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

            {/* Quick reference table — all ingredients */}
            <div className="mt-6 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Grams per Tablespoon</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">All ingredients — 1 level tbsp (15 ml)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Ingredient</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Grams / tbsp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(INGREDIENTS).map(([key, { label, gramsPerTbsp }]) => (
                      <tr key={key} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{label}</td>
                        <td className="py-2 text-right text-white/70">{gramsPerTbsp} g</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Common amounts for selected ingredient */}
            <div className="mt-4 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-display text-xl uppercase text-white tracking-wide mb-1">Quick Reference</h3>
              <p className="text-xs text-white/30 font-heading uppercase tracking-widest mb-4">{ingredient.label}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Tablespoons</th>
                      <th className="text-right py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">Grams</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMON_AMOUNTS.map((n) => (
                      <tr key={n} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 text-white/70 font-medium">{n} tbsp</td>
                        <td className="py-2 text-right text-white/70">{Math.round(ingredient.gramsPerTbsp * n * 100) / 100} g</td>
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
              title: "Why tablespoon measurements vary by ingredient",
              description: "A tablespoon is a volume measurement — 15 ml in both the UK metric and Australian systems. The US tablespoon is 14.79 ml, which is close enough that the difference never matters in practice. The problem is that different ingredients have vastly different densities. One tablespoon of honey weighs 21 grams, while one tablespoon of cocoa powder weighs just 7 grams — three times less. Recipes that call for tablespoons of dry ingredients are inherently imprecise because how tightly you pack the spoon changes the weight. A heaped tablespoon of flour can contain 50% more than a level one. For consistent results, weigh your ingredients with a digital scale. This converter gives you the standard weight per level tablespoon so you can translate spoon measurements into grams and vice versa."
            }}
            howItWorks={{
              title: "How to convert grams to tablespoons",
              description: "Each ingredient has a known weight per level tablespoon, based on standard density measurements at room temperature.",
              steps: [
                { step: 1, title: "Select your ingredient", description: "Different ingredients have different densities. A tablespoon of salt (18 g) weighs more than twice as much as a tablespoon of cocoa powder (7 g). You need the right conversion factor for each ingredient." },
                { step: 2, title: "Enter the amount", description: "Type in grams to find out how many tablespoons you need, or enter tablespoons to get the weight in grams. The converter does the division or multiplication for you." },
                { step: 3, title: "Use level tablespoons", description: "All values in this converter assume level tablespoons — filled and scraped flat with a knife. Heaped or rounded tablespoons hold significantly more and will give inaccurate results." }
              ]
            }}
            formula={{
              title: "The conversion formula",
              formula: "tablespoons = grams / grams-per-tablespoon for that ingredient",
              explanation: "To convert grams to tablespoons, divide the weight in grams by the grams-per-tablespoon value for that specific ingredient. To go the other way, multiply tablespoons by the same value. For example, 24 grams of plain flour divided by 8 grams per tablespoon equals 3 tablespoons. There is no universal grams-to-tablespoons formula because it depends entirely on what you are measuring. All values here use a standard metric tablespoon of 15 ml, which is the same in the UK and Australia. The US tablespoon of 14.79 ml is close enough that you do not need to adjust."
            }}
            tips={[
              "Always use level tablespoons — scrape off the excess with the flat edge of a knife for consistent measurements",
              "A UK metric tablespoon is exactly 15 ml, the same as the Australian tablespoon and virtually identical to the US tablespoon (14.79 ml)",
              "For sticky ingredients like honey, lightly oil the tablespoon first so the ingredient slides off cleanly",
              "If a recipe calls for a heaped tablespoon, assume roughly 1.5 times the weight of a level tablespoon",
              "For baking where precision matters, invest in a digital scale — they cost under ten pounds and eliminate the guesswork of spoon measurements"
            ]}
            faqs={faqSchema}
          />
        </div>

        <FinancialDisclosure variant="general" />

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GramsToTablespoons;
