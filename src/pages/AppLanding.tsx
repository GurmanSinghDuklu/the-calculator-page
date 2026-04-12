import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowRight, Smartphone, Download, Star, Zap, Globe, Lock } from "lucide-react";

const calculators = [
  { title: "Compound Interest Calculator", path: "/finance/compound-interest", category: "Finance" },
  { title: "Mortgage Calculator", path: "/finance/mortgage", category: "Property" },
  { title: "UK Salary Calculator", path: "/finance/salary", category: "Finance" },
  { title: "Percentage Calculator", path: "/misc/percentage", category: "Everyday" },
  { title: "BMI Calculator", path: "/misc/bmi-calculator", category: "Health" },
  { title: "VAT Calculator", path: "/finance/vat-calculator", category: "Finance" },
  { title: "Savings Calculator", path: "/finance/savings", category: "Finance" },
  { title: "Loan Calculator", path: "/finance/loan", category: "Finance" },
  { title: "ISA Calculator", path: "/finance/isa-calculator", category: "Finance" },
  { title: "Age Calculator", path: "/misc/age", category: "Everyday" },
  { title: "Tip Calculator", path: "/misc/tip", category: "Everyday" },
  { title: "Capital Gains Tax", path: "/finance/capital-gains-tax", category: "Finance" },
];

const features = [
  { icon: Zap, title: "Instant results", description: "Every calculator updates in real time as you type — no submit button needed." },
  { icon: Smartphone, title: "Works like an app", description: "Add to your homescreen on iPhone or Android. Launches fullscreen with no browser bar." },
  { icon: Globe, title: "No download needed", description: "130+ calculators available instantly in your browser. No App Store, no install, no storage used." },
  { icon: Lock, title: "No account required", description: "Fully free. No sign-up, no ads, no data collection. Just calculators." },
  { icon: Star, title: "UK-focused", description: "Built for UK users — PAYE tax, National Insurance, ISAs, Stamp Duty, and more." },
  { icon: Download, title: "Works offline", description: "Once loaded, the app works without an internet connection on supported devices." },
];

const AppLanding = () => {
  return (
    <>
      <SEO
        title="The Calculator App — Free Online Calculator App for iPhone & Android"
        description="The best free calculator app — no download needed. 130+ calculators for finance, mortgage, savings, percentage, BMI, and more. Add to homescreen for a full app experience on iOS and Android."
        keywords="calculator app, free calculator app, online calculator app, calculator app no download, best calculator app, calculator app iphone, calculator app android, calculator app uk, the calculator app"
        canonicalUrl="https://www.thecalculatorapp.org/app"
      />

      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">

        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
          <Link to="/" className="text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
            All Calculators <ArrowRight className="h-3 w-3" />
          </Link>
        </nav>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
          <p className="text-white/40 text-xs font-heading uppercase tracking-[0.3em] mb-6">Free · No Download · Works on Any Device</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-white leading-[0.85] tracking-tight mb-8">
            The Calculator<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>App</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            130+ free calculators for finance, mortgage, savings, everyday maths, and unit conversion. No download. No account. Add to your homescreen for a full app experience on iPhone or Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="px-8 py-4 bg-white text-black font-heading text-sm uppercase tracking-widest hover:bg-white/90 transition-colors">
              Open the App →
            </Link>
            <a href="#how-to-install" className="px-8 py-4 border border-white/20 text-white font-heading text-sm uppercase tracking-widest hover:border-white/50 transition-colors">
              Add to Homescreen
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 text-center mb-12">Why people use The Calculator App</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-dark-bg p-8">
                <Icon className="h-5 w-5 text-white/50 mb-4" />
                <h3 className="text-white font-medium text-sm mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculator Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">Popular calculators in the app</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {calculators.map(({ title, path, category }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center justify-between p-4 border border-white/8 hover:border-white/25 bg-white/[0.015] hover:bg-white/[0.03] transition-all group"
              >
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-white">{title}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{category}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/" className="text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors">
              View all 130+ calculators →
            </Link>
          </div>
        </section>

        {/* How to Install */}
        <section id="how-to-install" className="max-w-5xl mx-auto px-6 py-20 border-t border-white/8">
          <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">How to install</p>
          <h2 className="font-display text-4xl md:text-5xl uppercase text-white mb-12">Add to Homescreen</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-white/8 bg-white/[0.015] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs font-bold"></span>
                </div>
                <h3 className="text-white font-display text-xl uppercase">iPhone / Safari</h3>
              </div>
              <ol className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">01</span>Open <strong className="text-white">thecalculatorapp.org</strong> in Safari</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">02</span>Tap the <strong className="text-white">Share button</strong> (box with arrow at bottom of screen)</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">03</span>Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong></li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">04</span>Tap <strong className="text-white">Add</strong> — the app icon appears on your homescreen</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">05</span>Launch it — it opens fullscreen like a native app</li>
              </ol>
            </div>

            <div className="border border-white/8 bg-white/[0.015] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <h3 className="text-white font-display text-xl uppercase">Android / Chrome</h3>
              </div>
              <ol className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">01</span>Open <strong className="text-white">thecalculatorapp.org</strong> in Chrome</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">02</span>Tap the <strong className="text-white">three-dot menu</strong> (top right)</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">03</span>Tap <strong className="text-white">"Add to Home screen"</strong></li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">04</span>Tap <strong className="text-white">Add</strong> — it installs as a PWA app</li>
                <li className="flex gap-3"><span className="text-white/30 font-mono text-xs mt-0.5">05</span>Launch from your homescreen — runs as a standalone app</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-6 border border-white/8 bg-white/[0.015]">
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong className="text-white">What is a PWA?</strong> A Progressive Web App (PWA) is a website that behaves like a native app. It installs from your browser with no App Store required, launches fullscreen without a URL bar, and can work offline once loaded. The Calculator App is a full PWA — free, instant, and available on every device.
            </p>
          </div>
        </section>

        {/* SEO content block */}
        <section className="max-w-5xl mx-auto px-6 py-20 border-t border-white/8">
          <div className="space-y-0">
            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">The Calculator App vs other calculator apps</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-zinc-300">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["Feature","The Calculator App","Typical app store app"].map(h => (
                        <th key={h} className="text-left py-3 pr-6 text-[10px] font-heading uppercase tracking-widest text-white/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Download required","No — runs in browser","Yes — App Store / Play Store"],
                      ["Number of calculators","130+","Usually 1–10"],
                      ["UK-specific (PAYE, ISA, SDLT)","Yes","Rarely"],
                      ["Cost","Free, always","Often freemium or ad-supported"],
                      ["Works on iPhone & Android","Yes","Usually one platform"],
                      ["Storage used","~0 MB","10–50 MB"],
                      ["Account required","No","Often yes"],
                    ].map(([f,a,b]) => (
                      <tr key={f} className="border-b border-white/5">
                        <td className="py-3 pr-6 text-white">{f}</td>
                        <td className="py-3 pr-6 text-green-400 font-medium">{a}</td>
                        <td className="py-3 text-zinc-500">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-white/8 bg-white/[0.015] px-8 py-8 mb-px">
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Frequently Asked Questions</p>
              <div className="space-y-6 max-w-3xl">
                {[
                  { q: "Is The Calculator App really free?", a: "Yes — completely free. No subscription, no in-app purchases, no ads. Every calculator on the site is free to use with no limits." },
                  { q: "Do I need to download anything?", a: "No. The Calculator App runs entirely in your browser. You can use it on any device without downloading anything from the App Store or Play Store. If you want it on your homescreen, use the 'Add to Home Screen' option in Safari or Chrome — it installs instantly." },
                  { q: "Does it work on iPhone?", a: "Yes. Open the site in Safari, tap the Share button, then 'Add to Home Screen'. It installs as a PWA app and launches fullscreen — it looks and feels identical to a native app." },
                  { q: "Does it work on Android?", a: "Yes. Open in Chrome, tap the three-dot menu, then 'Add to Home screen'. It installs as a PWA and runs standalone." },
                  { q: "Does the calculator app work offline?", a: "Yes — once you've loaded the site, most calculators work without an internet connection. The app uses service worker caching to store pages locally on your device." },
                  { q: "How many calculators does it have?", a: "130+ calculators and converters across finance (mortgage, salary, ISA, compound interest), everyday (percentage, tip, BMI, age), construction (gravel, concrete, mulch), and unit converters (weight, length, temperature, cooking)." },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <p className="text-white font-medium text-sm mb-2">{q}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="font-display text-2xl tracking-widest text-white uppercase">Calculator App</Link>
            <nav className="flex gap-6 text-xs font-heading uppercase tracking-widest text-white/30">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/categories/finance" className="hover:text-white transition-colors">Finance</Link>
              <Link to="/categories/everyday" className="hover:text-white transition-colors">Everyday</Link>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            </nav>
            <p className="text-xs text-white/20 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AppLanding;
