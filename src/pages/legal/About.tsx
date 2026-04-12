import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Shield, Zap, Users, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Accent ───────────────────────────────────────────────────────────────────
const ACCENT = "#3B82F6";

const VALUES = [
  {
    icon: Calculator,
    title: "Mathematical Precision",
    body: "Every calculator is built using standardised industry formulas, verified against financial standards used by major institutions.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    body: "Your data never leaves your device. All calculations are performed locally in your browser for maximum privacy and speed.",
  },
  {
    icon: Zap,
    title: "Real-Time Results",
    body: "Reactive state management provides instant results as you type, enabling 'what-if' scenario testing in real-time.",
  },
  {
    icon: Users,
    title: "Free For Everyone",
    body: "No subscriptions, no paywalls, no hidden fees. Our core calculators will always be free to use for everyone.",
  },
];

const PROCESS = [
  {
    label: "Formula Verification",
    body: "Every calculator is vetted against financial standards used by major institutions like Nationwide and leading banks.",
  },
  {
    label: "Client-Side Processing",
    body: "Your data never leaves your device. Calculations are performed locally in your browser for maximum privacy and speed.",
  },
  {
    label: "Real-Time Validation",
    body: "We use reactive state management to provide instant results as you type, allowing for 'what-if' scenario testing in real-time.",
  },
];

const About = () => {
  return (
    <>
      <SEO
        title="About Us - The Calculator App"
        description="Learn about The Calculator App - our mission to provide free, accurate, and privacy-focused financial calculators and tools for everyone."
        keywords="about us, calculator page, financial tools, free calculators, mission"
        canonicalUrl="https://www.thecalculatorapp.org/about"
      />

      <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 py-12">

          {/* Back link */}
          <Link to="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors font-heading text-[10px] uppercase tracking-widest mb-12">
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>

          {/* ── Hero title ── */}
          <div className="mb-16 select-none">
            <div className="absolute w-[500px] h-[400px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none -z-10"
              style={{ background: ACCENT }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[11vw] md:text-[82px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>ABOUT</span>
              <span className="block text-[8vw] md:text-[62px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                THE CALCULATOR APP
              </span>
            </h1>
            <div className="mt-8 max-w-xl pl-4 border-l-2" style={{ borderColor: `${ACCENT}60` }}>
              <p className="text-gray-400 text-base leading-relaxed font-sans font-light">
                We believe everyone deserves access to powerful financial tools without complexity, cost, or compromise on privacy.
                The Calculator App is your trusted companion for making informed financial decisions.
              </p>
            </div>
          </div>

          {/* ── Mission ── */}
          <section className="mb-16">
            <p className="text-[9px] font-heading uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Our Mission</p>
            <p className="text-white/50 text-base font-sans leading-relaxed max-w-2xl">
              To democratise financial literacy by providing free, accurate, and easy-to-use calculators that empower
              individuals to understand and optimise their financial decisions. Whether you're planning a mortgage,
              calculating compound interest, or simply splitting a bill, we're here to help.
            </p>
          </section>

          {/* ── Values grid ── */}
          <section className="mb-16">
            <p className="text-[9px] font-heading uppercase tracking-widest mb-8" style={{ color: ACCENT }}>What We Stand For</p>
            <div className="grid md:grid-cols-2 gap-4">
              {VALUES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-[#252323]/80 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${ACCENT}15` }}>
                    <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                  </div>
                  <p className="font-heading text-sm uppercase tracking-widest text-white mb-2">{title}</p>
                  <p className="text-white/35 text-sm font-sans leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Transparency ── */}
          <section className="mb-16">
            <p className="text-[9px] font-heading uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Transparency in Calculation</p>
            <p className="text-white/50 text-base font-sans leading-relaxed mb-8 max-w-2xl">
              At The Calculator App, we prioritise mathematical precision and financial transparency. Our tools
              are built using standardised industry formulas — including the <span className="text-white/70">Standard Annuity Formula</span> for
              mortgages and <span className="text-white/70">Compound Interest Algorithms</span> — to ensure accuracy down to the sixth decimal place.
            </p>

            <p className="text-[9px] font-heading uppercase tracking-widest mb-6 text-white/30">Our Process</p>
            <div className="space-y-4">
              {PROCESS.map(({ label, body }) => (
                <div key={label} className="flex items-start gap-4 bg-[#252323]/50 border border-white/10 rounded-xl p-5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: ACCENT }} />
                  <div>
                    <span className="font-heading text-xs uppercase tracking-widest text-white">{label}: </span>
                    <span className="text-white/40 text-sm font-sans">{body}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Contact ── */}
          <section className="mb-8">
            <p className="text-[9px] font-heading uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Get in Touch</p>
            <p className="text-white/50 text-base font-sans leading-relaxed mb-3">
              Have a question, suggestion, or found a bug? We'd love to hear from you.
            </p>
            <a href="mailto:thecalculatorpage@gmail.com"
              className="font-heading text-sm uppercase tracking-widest transition-colors hover:opacity-80"
              style={{ color: ACCENT }}>
              thecalculatorpage@gmail.com
            </a>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;