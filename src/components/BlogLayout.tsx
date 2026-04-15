import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu } from "@/components/NavigationMenu";
import { SocialShare } from "@/components/SocialShare";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import Logo from "@/components/Logo";
import { Home, Lock, ArrowLeft, ArrowRight } from "lucide-react";

interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  image?: string;
}

interface BlogLayoutProps {
  title: string;
  subtitle: string;
  readTime: string;
  publishDate: string;
  category: string;
  heroImage: string;
  children: ReactNode;
  hasPaidSection?: boolean;
  author?: string;
  relatedArticles?: RelatedArticle[];
  /** 1–2 sentence direct answer to the post's primary question — AI Mode lifts this verbatim */
  directAnswer?: string;
}

export const BlogLayout = ({
  title,
  subtitle,
  readTime,
  publishDate,
  category,
  heroImage,
  children,
  hasPaidSection = false,
  author = "Calculator App",
  relatedArticles = [],
  directAnswer,
}: BlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={title}
        description={subtitle}
        type="article"
        articleSchema={{
          headline: title,
          author,
          datePublished: publishDate,
          dateModified: publishDate,
          image: heroImage,
        }}
        speakableSelectors={[".speakable-answer", "h1", ".article-summary"]}
      />

      <ScrollToTop />

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="sm" linkTo="/" />
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <NavigationMenu />
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="relative h-[450px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale-[20%] opacity-60"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Badge
            variant="outline"
            className="mb-4 w-fit text-[9px] font-heading tracking-[0.2em] uppercase border-white/20 bg-black/60 text-white/60 rounded-none"
          >
            {category}
          </Badge>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-zinc-400 mb-6 max-w-2xl leading-relaxed font-sans">
            {subtitle}
          </p>

          <div className="flex items-center gap-3 font-heading text-[9px] uppercase tracking-[0.2em] text-white/25">
            <span>{publishDate}</span>
            <span className="w-1 h-1 bg-white/20" />
            <span>{readTime} read</span>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Direct answer block — AI Mode lifts this passage verbatim */}
        {directAnswer && (
          <div className="speakable-answer mb-10 p-5 border-l-2 border-white/30 bg-white/[0.03]">
            <p className="text-[10px] font-heading uppercase tracking-widest text-white/30 mb-2">Quick Answer</p>
            <p className="text-white text-base leading-relaxed font-sans">{directAnswer}</p>
          </div>
        )}
        <article
          className="
            mb-12
            prose prose-lg prose-invert max-w-none

            prose-headings:text-white
            prose-headings:font-display
            prose-headings:font-normal
            prose-headings:tracking-tight

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

        {/* ── Paid section ── */}
        {hasPaidSection && (
          <div className="border border-white/10 bg-white/[0.015] px-7 py-7 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-4 w-4 text-white/30 shrink-0" />
              <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/40">The Cheat Code Secret</p>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed font-sans mb-6">
              Discover the hidden factor that can reduce your millionaire timeline by 5–15 years. Used by the top 1%, FIRE super savers, and multi-millionaire early retirees — this rarely-taught principle can accelerate your path to £1M without earning more money, taking more risk, or timing the market.
            </p>
            <button
              onClick={() => (window.location.href = "/blog/cheat-code-01/payment")}
              className="group inline-flex items-center gap-3 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white text-white hover:bg-white hover:text-black transition-all"
            >
              Unlock for $20
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* ── Social share ── */}
        <div className="border border-white/8 bg-white/[0.015] px-6 py-5 mb-8">
          <SocialShare title={title} description={subtitle} />
        </div>

        {/* ── Related articles ── */}
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}

        {/* ── Back to blog ── */}
        <div className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.18em] py-3 px-5 border border-white/20 text-white/40 hover:border-white hover:text-white transition-all"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};