import React from "react";
import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { AuthorByline } from "@/components/AuthorByline";

interface ArticleLayoutProps {
  title: string;
  description: string;
  readTime: string;
  category: string;
  categoryColor: string;
  publishDate?: string;
  nextArticle?: {
    title: string;
    path: string;
  };
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  readTime,
  category,
  categoryColor,
  publishDate,
  nextArticle,
  children,
}: ArticleLayoutProps) {
  const [completed, setCompleted] = React.useState(false);

  const articleSchema = publishDate
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: { "@type": "Person", name: "Mandeep Singh", jobTitle: "Financial Coach & Calculator Developer" },
        publisher: { "@type": "Organization", name: "The Calculator Page", url: "https://www.thecalculatorpage.com" },
        datePublished: publishDate,
        dateModified: "2026-03-06",
      }
    : null;

  return (
    <>
      {articleSchema && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        </Head>
      )}
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">

        <Link
          to="/learn/financial-journey"
          className="inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Journey
        </Link>

        <header className="mb-10 pb-10 border-b border-white/8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-[9px] font-heading uppercase tracking-[0.2em] ${categoryColor}`}>
              {category}
            </span>
            <span className="text-white/25 font-heading text-[9px] uppercase tracking-widest">
              ⏱ {readTime}
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl leading-[0.9] tracking-tight text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed font-sans">
            {description}
          </p>

          <AuthorByline />
        </header>

        {/* ── Article body — all text forced white ── */}
        <article
          className="
            mb-12
            prose prose-invert max-w-none

            prose-headings:text-white
            prose-headings:font-display
            prose-headings:tracking-tight
            prose-headings:font-normal

            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl  prose-h3:mt-8  prose-h3:mb-3

            prose-p:text-white prose-p:leading-relaxed prose-p:font-sans

            prose-li:text-white prose-li:font-sans
            prose-ul:text-white
            prose-ol:text-white

            prose-strong:text-white
            prose-em:text-white

            prose-a:text-white prose-a:underline prose-a:underline-offset-2
            hover:prose-a:text-white/70

            prose-blockquote:text-white prose-blockquote:border-white/20

            prose-code:text-white prose-code:bg-white/5
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/8

            prose-hr:border-white/10

            [&_*]:text-white
          "
        >
          {children}
        </article>

        {/* ── Mark complete ── */}
        <div className="flex flex-col gap-4 mb-10">
          <button
            onClick={() => setCompleted(!completed)}
            className="inline-flex items-center gap-3 self-start font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border transition-all"
            style={
              completed
                ? { color: "#34D399", borderColor: "#34D399", background: "#34D39912" }
                : { color: "#ffffff",  borderColor: "#ffffff",  background: "#000000"   }
            }
            onMouseEnter={e => {
              if (!completed) {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }
            }}
            onMouseLeave={e => {
              if (!completed) {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            {completed ? "Completed ✓" : "Mark as Completed"}
          </button>

          {nextArticle && (
            <div className="border border-white/8 bg-white/[0.015] px-6 py-5">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1">
                    Next in your journey
                  </p>
                  <p className="font-display text-xl text-white">{nextArticle.title}</p>
                </div>
                <Link
                  to={nextArticle.path}
                  className="group inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white text-white hover:bg-white hover:text-black transition-all shrink-0"
                >
                  Continue
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/learn/financial-journey"
          className="inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white/20 text-white/40 hover:border-white hover:text-white transition-all"
        >
          <ArrowLeft className="h-3 w-3" />
          Return to Journey Map
        </Link>

      </div>
    </div>
    </>
  );
}