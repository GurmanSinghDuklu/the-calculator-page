import { useState } from "react";
import SEO from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { NavigationMenu } from "@/components/NavigationMenu";
import { MostSearchedCard } from "@/components/most-searched/MostSearchedCard";
import { getByMarket } from "@/data/most-searched";
import type { Market, Category } from "@/data/most-searched/types";
import { Link } from "react-router-dom";

const CATEGORIES: (Category | "All")[] = ["All", "Mortgage", "Salary", "Savings", "Debt", "Pension"];

export default function MostSearchedHub() {
  const [market, setMarket] = useState<Market>("uk");
  const [cat, setCat] = useState<Category | "All">("All");
  const pages = getByMarket(market).filter((p) => cat === "All" || p.category === cat);

  return (
    <>
      <SEO
        title="The Internet's Most Searched — Financial Edition"
        description="The money questions everyone Googles — answered with the actual numbers. Mortgages, salary after tax, savings growth, debt and pensions for the UK and US."
        keywords="most searched financial questions, money questions answered, salary after tax, mortgage per month"
        canonicalUrl="https://www.thecalculatorapp.org/most-searched"
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <section className="max-w-5xl mx-auto px-6 pt-14 pb-8 text-center">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent-blue mb-3">The Internet's Most Searched</p>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-wide mb-4">Financial Edition</h1>
          <p className="text-white/55 max-w-2xl mx-auto">The money questions everyone Googles — answered with the actual numbers.</p>

          <div className="inline-flex mt-8 rounded-lg border border-dark-border overflow-hidden">
            {(["uk", "us"] as Market[]).map((m) => (
              <button key={m} onClick={() => setMarket(m)}
                className={`px-6 py-2 font-heading text-sm uppercase tracking-widest transition-colors ${market === m ? "bg-accent-blue text-white" : "text-white/50 hover:text-white"}`}>
                {m === "uk" ? "🇬🇧 UK" : "🇺🇸 US"}
              </button>
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider border transition-colors ${cat === c ? "border-accent-blue text-white bg-accent-blue/10" : "border-dark-border text-white/50 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((p) => <MostSearchedCard key={p.slug} page={p} />)}
        </div>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-5">Guides & Deep Dives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/learn/compound-interest-formula" className="p-5 bg-dark-card border border-dark-border rounded-xl hover:border-accent-blue/40 transition-colors">
              <p className="text-white text-sm font-medium">The Compound Interest Formula: Complete Guide</p>
            </Link>
            <Link to="/blog" className="p-5 bg-dark-card border border-dark-border rounded-xl hover:border-accent-blue/40 transition-colors">
              <p className="text-white text-sm font-medium">All Articles & Guides →</p>
            </Link>
          </div>
        </section>

        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
