import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, ExternalLink, ShieldCheck, CalendarDays } from "lucide-react";
import SEO from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { NavigationMenu } from "@/components/NavigationMenu";
import { AuthorByline } from "@/components/AuthorByline";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { AnswerComparisonTable } from "./AnswerComparisonTable";
import { AnswerChart } from "./AnswerChart";
import { getBySlug } from "@/data/most-searched";
import type { AnswerPageData } from "@/data/most-searched/types";

const SITE = "https://www.thecalculatorapp.org";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function AnswerPage({ page }: { page: AnswerPageData }) {
  const url = `${SITE}/most-searched/${page.market}/${page.slug}`;
  const related = page.related
    .map((s) => getBySlug(page.market, s))
    .filter((p): p is AnswerPageData => Boolean(p));

  const author = {
    "@type": "Organization",
    name: "The Calculator App Editorial Team",
    url: `${SITE}/about`,
  };

  const qaSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: page.question,
      text: page.question,
      answerCount: 1,
      datePublished: page.datePublished,
      author,
      acceptedAnswer: {
        "@type": "Answer",
        text: page.answer,
        datePublished: page.datePublished,
        url: `${url}#most-searched-answer`,
        upvoteCount: 1,
        author,
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Most Searched", item: `${SITE}/most-searched` },
      { "@type": "ListItem", position: 3, name: page.category, item: `${SITE}/most-searched` },
      { "@type": "ListItem", position: 4, name: page.question, item: url },
    ],
  };

  // Citation schema for official sources
  const citationSchemas = page.officialSources.map((src) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: src.label,
    url: src.url,
  }));

  const locale = page.market === "uk" ? "en_GB" : "en_US";
  const displayDate = formatDate(page.dateModified ?? page.datePublished);

  return (
    <>
      <SEO
        title={`${page.question} | The Calculator App`}
        description={page.metaDescription}
        keywords={page.keywords}
        canonicalUrl={url}
        structuredData={[qaSchema, breadcrumbSchema, ...citationSchemas]}
        faqSchema={page.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        articleSchema={{
          headline: page.question,
          author: "The Calculator App Editorial Team",
          datePublished: page.datePublished,
          dateModified: page.dateModified ?? page.datePublished,
        }}
        speakableSelectors={["#most-searched-answer"]}
      />
      {/* Per-market og:locale override injected via head */}
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <header className="border-b border-dark-border bg-dark-bg/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <Logo size="sm" />
            <NavigationMenu />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
            <Link to="/" className="hover:text-white/70">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/most-searched" className="hover:text-white/70">Most Searched</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{page.category}</span>
          </nav>

          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">{page.question}</h1>

          {/* Trust meta strip */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-green" />
              Verified by The Calculator App Editorial Team
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              Updated {displayDate}
            </span>
            <span className="uppercase tracking-widest font-heading text-accent-blue/70">
              {page.market === "uk" ? "UK 2026/27" : "US 2025"}
            </span>
          </div>

          {/* The answer — first 40 words, speakable */}
          <div
            id="most-searched-answer"
            className="border-l-4 border-accent-green bg-accent-green/5 rounded-r-xl px-6 py-5 mb-8"
          >
            <p className="text-lg text-white leading-relaxed">{page.answer}</p>
          </div>

          {/* How this is calculated */}
          <section className="mb-8">
            <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-3">How this is calculated</h2>
            <div className="bg-black/40 border border-white/10 rounded-lg px-5 py-3 font-mono text-sm text-zinc-200 mb-4">{page.formula}</div>
            <ul className="space-y-1.5">
              {page.assumptions.map((a) => (
                <li key={a} className="text-sm text-zinc-400 flex gap-2"><span className="text-accent-blue">·</span>{a}</li>
              ))}
            </ul>
          </section>

          <div className="mb-8"><AnswerComparisonTable {...page.comparison} /></div>
          {page.chart && <div className="mb-8"><AnswerChart {...page.chart} /></div>}

          {/* Calculator CTA */}
          <Link
            to={page.calculatorPath}
            className="flex items-center justify-between gap-3 px-6 py-5 mb-10 rounded-xl bg-accent-blue text-white font-heading uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-transform"
          >
            {page.calculatorLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {page.faqs.map((f) => (
                <div key={f.question} className="border-b border-white/5 pb-5 last:border-0">
                  <p className="text-white font-medium text-sm mb-2">{f.question}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <AuthorByline />

          {/* Official Sources */}
          {page.officialSources.length > 0 && (
            <section className="mt-10 pt-8 border-t border-white/5">
              <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-4">Official Sources</h2>
              <ul className="space-y-2">
                {page.officialSources.map((src) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-accent-blue hover:text-accent-blue/80 transition-colors group"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading text-sm uppercase tracking-widest text-white/65 mb-4">More Most Searched</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/most-searched/${r.market}/${r.slug}`}
                    className="flex items-center justify-between gap-2 p-4 bg-dark-card border border-dark-border rounded-lg hover:border-accent-blue/40 transition-colors group">
                    <span className="text-sm text-white/80">{r.question}</span>
                    <ArrowRight className="w-3 h-3 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">© 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
