import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";

const ACCENT = "#3B82F6";
const AMBER  = "#F59E0B";

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
          <span className="text-white/30 shrink-0">·</span>
          {typeof item === "string"
            ? <span className="text-white/35">{item}</span>
            : <span><span className="text-white/60">{item.label}:</span> <span className="text-white/35">{item.desc}</span></span>
          }
        </li>
      ))}
    </ul>
  );
}

const Disclaimer = () => {
  return (
    <>
      <SEO
        title="Disclaimer - The Calculator Page"
        description="Important disclaimer about the use of calculators on The Calculator Page. Results are for informational purposes only."
        keywords="disclaimer, financial disclaimer, calculator accuracy, legal notice"
        canonicalUrl="https://thecalculatorpage.lovable.app/disclaimer"
      />

      <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
        <NavigationMenu />

        <main className="max-w-4xl mx-auto px-6 py-12">

          {/* Back */}
          <Link to="/home"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors font-heading text-[10px] uppercase tracking-widest mb-12">
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>

          {/* Hero title */}
          <div className="mb-12 select-none">
            <div className="absolute w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none -z-10"
              style={{ background: ACCENT }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[11vw] md:text-[88px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>DISCLAIMER</span>
            </h1>
            <p className="mt-4 text-white/20 font-heading text-[10px] uppercase tracking-widest">Last updated: January 2025</p>
          </div>

          {/* ── Important Notice banner ── */}
          <div className="mb-12 flex gap-4 p-5 rounded-2xl border"
            style={{ borderColor: `${AMBER}40`, background: `${AMBER}08` }}>
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: AMBER }} />
            <div>
              <p className="font-heading text-xs uppercase tracking-widest mb-2" style={{ color: AMBER }}>Important Notice</p>
              <p className="text-white/40 text-sm font-sans leading-relaxed">
                The results provided by our calculators are for <span className="text-white/70">informational purposes only</span> and do
                not constitute professional financial advice. While we strive for 100% accuracy, we recommend
                consulting with a qualified professional before making significant financial decisions.
              </p>
            </div>
          </div>

          {/* General information */}
          <Section title="General Information Only">
            <Prose>
              The information and calculator tools provided on The Calculator Page are intended for general
              informational and educational purposes only. They are not intended to be, and should not be construed as:
            </Prose>
            <List items={[
              "Financial advice or recommendations",
              "Legal advice",
              "Tax advice or tax return preparation",
              "Investment advice or securities recommendations",
              "Professional advice of any kind",
            ]} />
          </Section>

          {/* Accuracy */}
          <Section title="Accuracy of Calculations">
            <Prose>While we make every effort to ensure the accuracy of our calculators:</Prose>
            <List items={[
              "Results are estimates based on the information you provide",
              "Actual results may differ due to factors not accounted for in the calculations",
              "Tax rates, interest rates, and other financial variables change over time",
              "Regional variations in laws, taxes, and regulations may affect accuracy",
              "Rounding and mathematical approximations may cause minor discrepancies",
            ]} />
          </Section>

          {/* No professional relationship */}
          <Section title="No Professional Relationship">
            <Prose>
              Use of The Calculator Page does not create a professional-client relationship of any kind.
              We do not provide personalised advice, and our tools cannot account for your unique financial
              situation, goals, or circumstances.
            </Prose>
          </Section>

          {/* Consult professionals */}
          <Section title="Consult Qualified Professionals">
            <Prose>Before making any significant financial decisions, we strongly recommend consulting with:</Prose>
            <List items={[
              { label: "Financial Advisors",  desc: "For investment and financial planning decisions" },
              { label: "Mortgage Brokers",    desc: "For home loan and mortgage decisions" },
              { label: "Accountants",         desc: "For tax planning and accounting matters" },
              { label: "Solicitors",          desc: "For legal matters and contracts" },
              { label: "Estate Planners",     desc: "For inheritance and estate planning" },
            ]} />
          </Section>

          {/* No warranty */}
          <Section title="No Warranty">
            <Prose>
              The Calculator Page provides its tools and content "as is" and "as available" without any
              warranties, express or implied. We do not warrant that:
            </Prose>
            <List items={[
              "The calculations will be error-free or uninterrupted",
              "The results will be accurate for your specific situation",
              "The tools will meet your specific requirements",
              "Any errors will be corrected",
            ]} />
          </Section>

          {/* Limitation of liability */}
          <Section title="Limitation of Liability">
            <Prose>
              To the maximum extent permitted by applicable law, The Calculator Page and its operators
              shall not be liable for any direct, indirect, incidental, consequential, special, or
              exemplary damages arising from your use of or reliance on any calculator results or
              content on this website. This includes, but is not limited to, damages for loss of
              profits, savings, or other financial losses.
            </Prose>
          </Section>

          {/* Educational purpose */}
          <Section title="Educational Purpose">
            <Prose>
              Our calculators and educational content are designed to help you understand financial
              concepts and explore different scenarios. They should be used as learning tools and
              starting points for further research, not as the sole basis for financial decisions.
            </Prose>
          </Section>

          {/* Changes */}
          <Section title="Changes to This Disclaimer">
            <Prose>
              We may update this disclaimer from time to time. Any changes will be posted on this page
              with an updated revision date. Your continued use of the website after changes constitutes
              acceptance of the updated disclaimer.
            </Prose>
          </Section>

          {/* Questions */}
          <Section title="Questions">
            <Prose>If you have any questions about this disclaimer, please contact us at:</Prose>
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

export default Disclaimer;