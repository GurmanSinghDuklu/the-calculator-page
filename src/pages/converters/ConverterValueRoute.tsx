import { useParams, Link, Navigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SEO } from "@/components/SEO";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { ArrowRight } from "lucide-react";
import { getConverterValuePage } from "@/data/converter-values";

const ConverterValueRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getConverterValuePage(slug) : undefined;

  if (!page) return <Navigate to="/categories/everyday" replace />;

  const ACCENT = page.accent;

  return (
    <>
      <SEO
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        faqSchema={page.faqs}
        speakableSelectors={["#answer"]}
      />
      <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to={page.parentPath} className="hover:text-white transition-colors">{page.parentLabel}</Link>
            <span>/</span>
            <span className="text-white/60">{page.h1}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-white">{page.h1}</h1>

          <div className="mt-8 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/40 mb-2">Answer</p>
            <p className="font-display text-6xl mb-4" style={{ color: ACCENT }}>{page.bigAnswer}</p>
            <p id="answer" className="text-gray-300 text-base leading-relaxed">{page.answer}</p>
            <p className="mt-4 font-mono text-sm text-white/50 bg-black/40 border border-white/10 rounded-lg px-4 py-3 inline-block">{page.formula}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {page.extraResults.map(({ label, value }) => (
              <div key={label} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                <p className="text-[9px] font-heading uppercase tracking-widest text-white/30 mb-1">{label}</p>
                <p className="font-display text-lg text-white">{value}</p>
              </div>
            ))}
          </div>

          <Link
            to={page.parentPath}
            className="mt-8 group inline-flex items-center gap-2 text-white font-heading font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-widest text-sm"
            style={{ background: ACCENT, boxShadow: `0 0 20px -5px ${ACCENT}80` }}
          >
            Convert any value <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-12 bg-[#252323]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="font-display text-xl uppercase text-white tracking-wide mb-4">{page.table.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {page.table.columns.map((c) => (
                      <th key={c} className="text-left py-2 text-[9px] font-heading uppercase tracking-widest text-white/30">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.table.rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-2 font-medium">
                        {row.slug ? (
                          <Link to={`/converters/${row.slug}`} className="hover:underline" style={{ color: ACCENT }}>{row.label}</Link>
                        ) : (
                          <span className="text-white">{row.label} ←</span>
                        )}
                      </td>
                      <td className="py-2 text-white/70">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl uppercase text-white tracking-wide mb-6">FAQs</h2>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FinancialDisclosure variant="general" />
        <footer className="bg-black border-t border-white/10 py-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Logo size="sm" />
            <p className="text-xs text-gray-500 uppercase tracking-widest">&copy; 2026 The Calculator App.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ConverterValueRoute;
