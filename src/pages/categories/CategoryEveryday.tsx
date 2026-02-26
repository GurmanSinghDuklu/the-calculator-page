import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Percent, Calendar, Tag, Coffee, Clock, Activity } from "lucide-react";

const tools = [
  {
    title: "Percentage",
    description: "Find increases, decreases, and percentage differences instantly.",
    icon: Percent,
    path: "/misc/percentage",
  },
  {
    title: "Age Calc",
    description: "Calculate precise age in years, months, days, and even minutes.",
    icon: Calendar,
    path: "/misc/age",
  },
  {
    title: "Discount",
    description: "Quickly determine the final price after sales and special offers.",
    icon: Tag,
    path: "/misc/discount",
  },
  {
    title: "Tip Calc",
    description: "Split bills easily and calculate gratuity for any service.",
    icon: Coffee,
    path: "/misc/tip",
  },
];

const CategoryEveryday = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tools.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <span
                  key={i}
                  className="hover:-translate-y-4 transition-transform duration-500 block"
                  style={{
                    color: i % 2 === 0 ? "#22c55e" : "#eab308",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-outline hover:text-white transition-colors duration-500 cursor-default mt-2">
              CALCULATORS
            </div>
          </h1>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-16 relative group">
            <input
              type="text"
              placeholder="SEARCH EVERYDAY TOOLS..."
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

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20 w-full min-h-[60vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <Link
              key={tool.title}
              to={tool.path}
              className="group bg-dark-bg border border-dark-border p-8 hover:border-accent-green transition-all duration-300 relative overflow-hidden block hover:-translate-y-1"
            >
              <div className="mb-8 text-accent-green flex justify-between items-start">
                <tool.icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                <ArrowUpRight className="h-5 w-5 text-gray-600 group-hover:text-accent-green transition-colors" />
              </div>
              <h3 className="font-display text-4xl uppercase mb-3 text-white">{tool.title}</h3>
              <p className="text-sm text-gray-400 font-sans leading-relaxed border-t border-dashed border-gray-700 pt-4 mt-4 group-hover:border-accent-green/50 transition-colors">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-10 border-t border-dark-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator Page.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryEveryday;