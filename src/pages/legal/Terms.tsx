import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { NavigationMenu } from "@/components/NavigationMenu";
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

const Terms = () => {
  return (
    <>
      <SEO
        title="Terms of Use - The Calculator Page"
        description="Terms and conditions for using The Calculator Page. Learn about acceptable use, intellectual property, and service availability."
        keywords="terms of use, terms and conditions, legal, acceptable use"
        canonicalUrl="https://thecalculatorpage.lovable.app/terms"
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
          <div className="mb-16 select-none">
            <div className="absolute w-[400px] h-[300px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none -z-10"
              style={{ background: ACCENT }} />
            <h1 className="font-display leading-[0.85] tracking-tighter">
              <span className="block text-[11vw] md:text-[88px]" style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${ACCENT}40)`,
              }}>TERMS</span>
              <span className="block text-[7vw] md:text-[55px] mt-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
                OF USE
              </span>
            </h1>
            <p className="mt-4 text-white/20 font-heading text-[10px] uppercase tracking-widest">Last updated: January 2025</p>
          </div>

          {/* Sections */}
          <Section title="Agreement to Terms">
            <Prose>
              By accessing and using The Calculator Page ("the Website"), you agree to be bound by these Terms of Use.
              If you do not agree to these terms, please do not use our website.
            </Prose>
          </Section>

          <Section title="Acceptable Use">
            <Prose>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree NOT to:</Prose>
            <List items={[
              "Use the Website for any commercial purpose without our prior written consent",
              "Use automated systems, bots, scrapers, or similar tools to access or extract data from the Website",
              "Attempt to interfere with, compromise, or disrupt the Website's security or functionality",
              "Use the Website to transmit any malicious code, viruses, or harmful content",
              "Impersonate or misrepresent your affiliation with any person or entity",
              "Violate any applicable local, national, or international laws or regulations",
            ]} />
          </Section>

          <Section title="Personal Use Only">
            <Prose>
              By using this website, you agree to use our tools for personal, non-commercial use.
              Automated scraping or "botting" of our calculation engines is strictly prohibited to maintain service
              availability for all users.
            </Prose>
          </Section>

          <Section title="Intellectual Property">
            <Prose>All content on The Calculator Page, including but not limited to:</Prose>
            <List items={[
              "Text, graphics, logos, and images",
              "Calculator designs and user interfaces",
              "Software code and algorithms",
              "Educational content and guides",
            ]} />
            <p className="text-white/25 text-xs font-sans mt-4 leading-relaxed">
              …is the property of The Calculator Page or its licensors and is protected by copyright and other
              intellectual property laws. You may not reproduce, distribute, modify, or create derivative works
              without our express written permission.
            </p>
          </Section>

          <Section title="Calculator Results">
            <Prose>The calculators provided on this website are for informational and educational purposes only. While we strive for accuracy:</Prose>
            <List items={[
              "Results should not be considered as professional financial, legal, or tax advice",
              "Actual results may vary based on factors not accounted for in our calculations",
              "We recommend consulting with qualified professionals before making significant financial decisions",
              "We are not liable for any decisions made based on calculator results",
            ]} />
          </Section>

          <Section title="Service Availability">
            <Prose>We aim to maintain high availability of our services, but we cannot guarantee uninterrupted access. We reserve the right to:</Prose>
            <List items={[
              "Modify, suspend, or discontinue any part of the Website at any time",
              "Restrict access to some parts or all of the Website",
              "Perform maintenance that may temporarily affect availability",
            ]} />
          </Section>

          <Section title="Limitation of Liability">
            <Prose>To the fullest extent permitted by law, The Calculator Page and its operators shall not be liable for:</Prose>
            <List items={[
              "Any indirect, incidental, special, consequential, or punitive damages",
              "Any loss of profits, data, use, goodwill, or other intangible losses",
              "Any damages resulting from your use or inability to use the Website",
              "Any errors or inaccuracies in calculator results",
            ]} />
          </Section>

          <Section title="Indemnification">
            <Prose>
              You agree to indemnify and hold harmless The Calculator Page and its operators from any claims,
              damages, losses, liabilities, and expenses (including legal fees) arising from your use of the
              Website or violation of these Terms.
            </Prose>
          </Section>

          <Section title="Third-Party Links">
            <Prose>
              Our Website may contain links to third-party websites. We are not responsible for the content,
              privacy policies, or practices of any third-party websites. Visiting these links is at your own risk.
            </Prose>
          </Section>

          <Section title="Changes to Terms">
            <Prose>
              We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately
              upon posting to the Website. Your continued use of the Website after any changes constitutes acceptance
              of the new Terms.
            </Prose>
          </Section>

          <Section title="Governing Law">
            <Prose>
              These Terms shall be governed by and construed in accordance with the laws of England and Wales,
              without regard to its conflict of law provisions.
            </Prose>
          </Section>

          <Section title="Contact Us">
            <Prose>If you have any questions about these Terms of Use, please contact us at:</Prose>
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

export default Terms;