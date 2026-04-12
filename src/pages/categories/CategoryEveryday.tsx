import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Percent, Calendar, Tag, Coffee, Clock, Activity, Scale, Thermometer, Ruler, FlaskConical, Square, Construction, Shovel } from "lucide-react";

const sections = [
  {
    heading: "Calculators",
    color: "#22c55e",
    tools: [
      { title: "Percentage", description: "Find increases, decreases, and percentage differences instantly.", icon: Percent, path: "/misc/percentage" },
      { title: "Age Calculator", description: "Calculate precise age in years, months, days, and even minutes.", icon: Calendar, path: "/misc/age" },
      { title: "Discount", description: "Quickly determine the final price after sales and special offers.", icon: Tag, path: "/misc/discount" },
      { title: "Tip Calculator", description: "Split bills easily and calculate gratuity for any service.", icon: Coffee, path: "/misc/tip" },
      { title: "BMI Calculator", description: "Calculate your Body Mass Index with NHS weight category ranges.", icon: Activity, path: "/misc/bmi-calculator" },
      { title: "Calorie Calculator", description: "Calculate your daily calorie needs using the Mifflin-St Jeor formula.", icon: Activity, path: "/misc/calorie-calculator" },
    ],
  },
  {
    heading: "Date & Time",
    color: "#3b82f6",
    tools: [
      { title: "Days From Today", description: "Find the exact date that is any number of days from today.", icon: Calendar, path: "/misc/days-from-today" },
      { title: "Days Between Dates", description: "Calculate calendar days, working days, and weeks between two dates.", icon: Calendar, path: "/misc/days-between-dates" },
      { title: "Months Between Dates", description: "Calculate months between two dates — useful for contracts and tenancies.", icon: Calendar, path: "/misc/months-between-dates" },
      { title: "Working Days", description: "Count business days between dates excluding weekends and bank holidays.", icon: Calendar, path: "/misc/working-days" },
      { title: "Hours Calculator", description: "Calculate hours between times, add/subtract hours, convert to days.", icon: Clock, path: "/misc/hours-calculator" },
    ],
  },
  {
    heading: "Construction & Garden",
    color: "#f59e0b",
    tools: [
      { title: "Square Footage", description: "Calculate room area in sq ft, sq m, and sq yd. Add multiple rooms.", icon: Square, path: "/misc/square-footage" },
      { title: "Gravel Calculator", description: "Calculate tonnes and bags of gravel needed for paths and driveways.", icon: Shovel, path: "/misc/gravel-calculator" },
      { title: "Cubic Yards", description: "Calculate cubic yards for gravel, concrete, topsoil, and mulch.", icon: Square, path: "/misc/cubic-yards" },
      { title: "Mulch Calculator", description: "Calculate bags of mulch for flower beds, trees, and play areas.", icon: Shovel, path: "/misc/mulch-calculator" },
      { title: "Concrete Calculator", description: "Calculate concrete for slabs and columns. Get bag counts and ready-mix volume.", icon: Construction, path: "/misc/concrete-calculator" },
    ],
  },
  {
    heading: "Length & Height",
    color: "#8b5cf6",
    tools: [
      { title: "CM to Inches", description: "Convert centimetres to inches with feet and inches breakdown.", icon: Ruler, path: "/converters/cm-to-inches" },
      { title: "Inches to CM", description: "Convert inches to centimetres. Includes TV screen size reference.", icon: Ruler, path: "/converters/inches-to-cm" },
      { title: "KM to Miles", description: "Convert kilometres to miles with UK speed limit references.", icon: Ruler, path: "/converters/km-to-miles" },
      { title: "Metres to Feet", description: "Convert metres to feet and inches with height reference table.", icon: Ruler, path: "/converters/metres-to-feet" },
    ],
  },
  {
    heading: "Weight",
    color: "#10b981",
    tools: [
      { title: "Stone to KG", description: "Convert stone and pounds to kilograms and back.", icon: Scale, path: "/converters/stone-to-kg" },
      { title: "LBS to KG", description: "Convert pounds to kilograms with stone and lbs breakdown.", icon: Scale, path: "/converters/lbs-to-kg" },
      { title: "Ounces to Grams", description: "Convert ounces to grams for cooking and postal weights.", icon: Scale, path: "/converters/ounces-to-grams" },
    ],
  },
  {
    heading: "Volume & Temperature",
    color: "#ef4444",
    tools: [
      { title: "Gallons to Litres", description: "Convert UK and US gallons to litres with fuel economy context.", icon: FlaskConical, path: "/converters/gallons-to-litres" },
      { title: "ML to Oz", description: "Convert millilitres to fluid ounces — UK and US standards.", icon: FlaskConical, path: "/converters/ml-to-oz" },
      { title: "Fahrenheit to Celsius", description: "Convert °F to °C with oven Gas Mark reference and key temperatures.", icon: Thermometer, path: "/converters/fahrenheit-to-celsius" },
    ],
  },
  {
    heading: "Cooking",
    color: "#a855f7",
    tools: [
      { title: "Cups to Grams", description: "Convert cups to grams for flour, sugar, butter, and other ingredients.", icon: FlaskConical, path: "/converters/cups-to-grams" },
      { title: "Grams to Tablespoons", description: "Convert grams to tablespoons for common baking ingredients.", icon: FlaskConical, path: "/converters/grams-to-tablespoons" },
      { title: "Teaspoons to ML", description: "Convert between teaspoons, tablespoons, millilitres, and cups.", icon: FlaskConical, path: "/converters/teaspoons-to-ml" },
    ],
  },
];

const allTools = sections.flatMap(s => s.tools);

const CategoryEveryday = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery
    ? allTools.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen font-sans selection:bg-accent-yellow selection:text-black">

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent-yellow/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-white/60 text-sm font-sans uppercase tracking-[0.2em] mb-4">Category</p>

          <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter select-none">
            <div className="flex justify-center gap-[0.5vw]">
              {["E","V","E","R","Y","D","A","Y"].map((letter, i) => (
                <span key={i} className="hover:-translate-y-4 transition-transform duration-500 block" style={{ color: i % 2 === 0 ? "#22c55e" : "#eab308", transitionDelay: `${i * 50}ms` }}>
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-outline hover:text-white transition-colors duration-500 cursor-default mt-2">
              CALCULATORS
            </div>
          </h1>

          <div className="max-w-xl mx-auto mt-16 relative group">
            <input
              type="text"
              placeholder="SEARCH ALL TOOLS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b-2 border-white/20 py-4 px-2 text-white placeholder-gray-600 font-heading uppercase tracking-wider focus:outline-none focus:border-accent-green transition-colors text-lg text-center"
            />
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-accent-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-20 w-full">
        {filtered ? (
          /* Search results */
          <div>
            <p className="text-white/40 font-heading text-xs uppercase tracking-widest mb-6">{filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{searchQuery}"</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group bg-dark-bg border border-dark-border p-8 hover:border-accent-green transition-all duration-300 relative overflow-hidden block hover:-translate-y-1">
                  <div className="mb-8 text-accent-green flex justify-between items-start">
                    <tool.icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                    <ArrowUpRight className="h-5 w-5 text-gray-600 group-hover:text-accent-green transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl uppercase mb-3 text-white">{tool.title}</h3>
                  <p className="text-sm text-gray-400 font-sans leading-relaxed border-t border-dashed border-gray-700 pt-4 mt-4">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Sectioned view */
          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.heading}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-display text-3xl uppercase tracking-tight" style={{ color: section.color }}>{section.heading}</h2>
                  <div className="flex-1 h-px" style={{ background: `${section.color}30` }} />
                  <span className="text-white/20 text-xs font-heading uppercase tracking-widest">{section.tools.length} tools</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.tools.map((tool) => (
                    <Link key={tool.path} to={tool.path} className="group bg-dark-bg border border-dark-border p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden block hover:-translate-y-0.5">
                      <div className="mb-6 flex justify-between items-start" style={{ color: section.color }}>
                        <tool.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                        <ArrowUpRight className="h-4 w-4 text-gray-600 group-hover:text-white/60 transition-colors" />
                      </div>
                      <h3 className="font-display text-2xl uppercase mb-2 text-white leading-tight">{tool.title}</h3>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed border-t border-dashed border-gray-800 pt-3 mt-3">{tool.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-black text-white pt-10 border-t border-dark-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryEveryday;
