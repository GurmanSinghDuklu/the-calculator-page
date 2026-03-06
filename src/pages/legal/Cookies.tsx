import { Link } from "react-router-dom";
import { ArrowLeft, Cookie } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";

const ACCENT = "#3B82F6";

const labelClass = "text-[9px] font-heading uppercase tracking-widest mb-6 block";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <p className={labelClass} style={{ color: ACCENT }}>{title}</p>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-white/40 text-sm font-sans leading-relaxed">{children}</p>;
}

function List({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <ul className="space-y-3 mt-3">
      {items.map(({ label, desc }) => (
        <li key={label} className="flex gap-2 text-sm font-sans">
          <span className="text-white/70 shrink-0">·</span>
          <span><span className="text-white/70">{label}:</span> <span className="text-white/35">{desc}</span></span>
        </li>
      ))}
    </ul>
  );
}

const Cookies = () => {
  return (
    <>
      <SEO
        title="Cookie Policy - The Calculator Page"
        description="Learn about how The Calculator Page uses cookies. We use minimal cookies solely for analytics and improving user experience."
        keywords="cookie policy, cookies, tracking, analytics, privacy"
        canonicalUrl="https://thecalculatorpage.lovable.app/cookies"
      />

      <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
        <NavigationMenu />

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
              <span className="block text-[12vw] md:text-[95px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>COOKIE</span>
              <span className="block text-[7vw] md:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                POLICY
              </span>
            </h1>
            <p className="mt-6 text-white/20 font-heading text-[10px] uppercase tracking-widest">Last updated: January 2025</p>
          </div>

          {/* What are cookies */}
          <Section title="What Are Cookies?">
            <Prose>
              Cookies are small text files stored on your device when you visit a website. They are widely
              used to make websites work more efficiently and to provide information to website owners.
            </Prose>
          </Section>

          {/* Our cookie use */}
          <Section title="Our Cookie Use">
            <Prose>
              The Calculator Page uses minimal cookies. We believe in privacy-first design, so we limit cookie usage
              to only what's necessary for basic analytics and site functionality.
            </Prose>
          </Section>

          {/* Types table */}
          <Section title="Types of Cookies We Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Cookie Type", "Purpose", "Duration"].map(h => (
                      <th key={h} className="text-left pb-3 pr-6 text-[9px] font-heading uppercase tracking-widest text-white/25">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Essential",   purpose: "Required for the website to function properly (e.g., remembering preferences)", duration: "Session" },
                    { type: "Analytics",   purpose: "Help us understand how visitors interact with our website (anonymised)",         duration: "Up to 12 months" },
                    { type: "Preferences", purpose: "Remember your settings like dark mode or currency preferences",                  duration: "Up to 12 months" },
                  ].map(({ type, purpose, duration }) => (
                    <tr key={type} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 pr-6 font-heading text-xs uppercase tracking-widest text-white/60 whitespace-nowrap">{type}</td>
                      <td className="py-4 pr-6 text-white/35 leading-relaxed">{purpose}</td>
                      <td className="py-4 text-white/35 whitespace-nowrap">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* What we don't use */}
          <Section title="What We Don't Use Cookies For">
            <List items={[
              { label: "Advertising",           desc: "We do not use advertising cookies or show personalised ads" },
              { label: "Cross-site tracking",   desc: "We do not track you across other websites" },
              { label: "Personal data",         desc: "Our cookies contain no personal information" },
              { label: "Selling data",          desc: "We never sell cookie data to third parties" },
            ]} />
          </Section>

          {/* Third-party */}
          <Section title="Third-Party Cookies">
            <Prose>
              We may use the following third-party services that set their own cookies:
            </Prose>
            <List items={[
              { label: "Analytics providers", desc: "To help us understand site usage patterns (anonymised data only)" },
            ]} />
            <p className="text-white/30 text-sm font-sans mt-4">
              These third parties have their own privacy policies governing their use of cookies.
            </p>
          </Section>

          {/* Managing cookies */}
          <Section title="Managing Cookies">
            <Prose>You have full control over cookies. You can:</Prose>
            <List items={[
              { label: "Block all cookies",        desc: "Through your browser settings (note: this may affect site functionality)" },
              { label: "Delete existing cookies",  desc: "Clear your browser's cookie storage at any time" },
              { label: "Block third-party cookies",desc: "Most browsers allow you to block cookies from third-party sites" },
            ]} />

            <p className="text-[9px] font-heading uppercase tracking-widest text-white/25 mt-8 mb-4">How to Manage Cookies in Popular Browsers</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { browser: "Chrome",  path: "Settings → Privacy and Security → Cookies" },
                { browser: "Firefox", path: "Settings → Privacy & Security → Cookies and Site Data" },
                { browser: "Safari",  path: "Preferences → Privacy → Manage Website Data" },
                { browser: "Edge",    path: "Settings → Privacy, Search, and Services → Cookies" },
              ].map(({ browser, path }) => (
                <div key={browser} className="bg-[#252323]/80 border border-white/10 rounded-xl p-4">
                  <p className="font-heading text-xs uppercase tracking-widest text-white/60 mb-1">{browser}</p>
                  <p className="text-white/30 text-xs font-sans">{path}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Calculators without cookies */}
          <Section title="Calculator Functionality Without Cookies">
            <Prose>
              All our calculators work fully without cookies. Blocking cookies will not prevent you from using any
              calculator on our site. The only features that may be affected are preference persistence (like
              remembering your preferred currency) and site analytics.
            </Prose>
          </Section>

          {/* Changes */}
          <Section title="Changes to This Policy">
            <Prose>
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an
              updated revision date.
            </Prose>
          </Section>

          {/* Contact */}
          <Section title="Contact Us">
            <Prose>If you have any questions about our use of cookies, please contact us at:</Prose>
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

export default Cookies;