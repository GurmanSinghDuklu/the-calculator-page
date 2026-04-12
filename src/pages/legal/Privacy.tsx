import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const ACCENT = "#3B82F6";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <p className="text-[9px] font-heading uppercase tracking-widest mb-4 block" style={{ color: ACCENT }}>{title}</p>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-white/40 text-sm font-sans leading-relaxed">{children}</p>;
}

function List({ items }: { items: (string | { label: string; desc: string })[] }) {
  return (
    <ul className="space-y-2.5 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm font-sans">
          <span className="text-white/20 shrink-0">·</span>
          {typeof item === "string"
            ? <span className="text-white/35">{item}</span>
            : <span><span className="text-white/60">{item.label}:</span> <span className="text-white/35">{item.desc}</span></span>
          }
        </li>
      ))}
    </ul>
  );
}

const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - The Calculator App"
        description="Learn how The Calculator App protects your privacy. We don't collect, store, or sell your personal data."
        keywords="privacy policy, data protection, GDPR, CCPA, privacy"
        canonicalUrl="https://www.thecalculatorpage.com/privacy"
      />

      <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 py-12">

          {/* Back */}
          <Link to="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors font-heading text-[10px] uppercase tracking-widest mb-12">
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>

          {/* Hero title */}
          <div className="mb-16 select-none">
            <div className="absolute w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none -z-10"
              style={{ background: ACCENT }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[11vw] md:text-[88px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>PRIVACY</span>
              <span className="block text-[7vw] md:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                POLICY
              </span>
            </h1>
            <p className="mt-4 text-white/20 font-heading text-[10px] uppercase tracking-widest">Last updated: January 2025</p>
          </div>

          {/* Commitment highlight */}
          <div className="mb-12 p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <p className="text-white/60 text-sm font-sans leading-relaxed">
              <span className="text-white/80 font-heading text-xs uppercase tracking-widest">Our commitment: </span>
              The Calculator App does not store, collect, or sell any personal data entered into our calculators.
              All calculations are performed entirely within your browser — your financial information never leaves your device.
            </p>
          </div>

          {/* Sections */}
          <Section title="Information We Don't Collect">
            <List items={[
              "Personal financial data entered into calculators",
              "Names, addresses, or contact information (unless you email us directly)",
              "Bank account or credit card details",
              "Location data beyond general geographic region for analytics",
            ]} />
          </Section>

          <Section title="Information We May Collect">
            <Prose>
              We use minimal, privacy-respecting analytics to understand how our site is used and to improve the user experience:
            </Prose>
            <List items={[
              { label: "Anonymous usage data",  desc: "Page views, calculator usage frequency, and general traffic patterns" },
              { label: "Technical data",         desc: "Browser type, device type, and screen resolution for optimisation" },
              { label: "Geographic region",      desc: "Country-level location for understanding our audience" },
            ]} />
            <p className="text-white/25 text-xs font-sans mt-4">
              This data is aggregated and anonymised — it cannot be used to identify individual users.
            </p>
          </Section>

          <Section title="Cookies">
            <Prose>We use minimal cookies to analyse site traffic and improve user experience. These cookies:</Prose>
            <List items={[
              "Do not track you across other websites",
              "Do not contain any personal information",
              "Can be blocked by your browser without affecting calculator functionality",
            ]} />
            <p className="text-white/30 text-sm font-sans mt-4">
              For more details, see our{" "}
              <Link to="/cookies" className="transition-colors hover:opacity-70" style={{ color: ACCENT }}>
                Cookie Policy
              </Link>.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <Prose>We may use the following third-party services:</Prose>
            <List items={[
              { label: "Analytics", desc: "Anonymous, aggregated traffic data" },
              { label: "Hosting",   desc: "Our hosting provider may collect server logs for security purposes" },
            ]} />
            <p className="text-white/25 text-xs font-sans mt-4">
              We do not share any data with advertisers or sell data to third parties.
            </p>
          </Section>

          <Section title="Your Rights (GDPR / CCPA)">
            <Prose>Depending on your location, you may have the following rights:</Prose>
            <List items={[
              { label: "Right to Access",             desc: "Request information about data we hold (note: we hold no personal data from calculator use)" },
              { label: "Right to Deletion",           desc: "Request deletion of any personal data" },
              { label: "Right to Opt-Out",            desc: "Disable cookies through your browser settings" },
              { label: "Right to Non-Discrimination", desc: "We will not treat you differently for exercising your rights" },
            ]} />
          </Section>

          <Section title="Data Security">
            <Prose>Since calculations happen entirely in your browser:</Prose>
            <List items={[
              "Your financial data is never transmitted to our servers",
              "There is no database of user calculations to breach",
              "Your data exists only in your browser's memory and is cleared when you close the tab",
            ]} />
          </Section>

          <Section title="Children's Privacy">
            <Prose>
              Our service is designed for general audiences and is suitable for educational use. We do not knowingly
              collect any personal information from children under 13. If you believe a child has provided us with
              personal information, please contact us.
            </Prose>
          </Section>

          <Section title="Changes to This Policy">
            <Prose>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an
              updated revision date.
            </Prose>
          </Section>

          <Section title="Contact Us">
            <Prose>If you have any questions about this Privacy Policy, please contact us at:</Prose>
            <a href="mailto:thecalculatorpage@gmail.com"
              className="mt-3 inline-block font-heading text-sm uppercase tracking-widest transition-colors hover:opacity-70"
              style={{ color: ACCENT }}>
              thecalculatorpage@gmail.com
            </a>
          </Section>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;