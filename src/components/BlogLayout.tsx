import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu } from "@/components/NavigationMenu";
import { SocialShare } from "@/components/SocialShare";
import { RelatedArticles } from "@/components/RelatedArticles";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home, Lock } from "lucide-react";

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
  author = "Calculator Page",
  relatedArticles = [],
}: BlogLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={title}
        description={subtitle}
        type="article"
        articleSchema={{
          headline: title,
          author: author,
          datePublished: publishDate,
          dateModified: publishDate,
          image: heroImage,
        }}
      />

      <ScrollToTop />

      {/* Navigation Header */}
      <header className="border-b border-neutral-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-normal tracking-tight leading-none text-white">
                Calculator
              </span>
              <span className="text-base md:text-lg tracking-[0.08em] uppercase font-serif font-bold text-white">
                PAGE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/home">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <NavigationMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[450px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60" />
        </div>

        <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <div className="max-w-4xl">
            <Badge
              variant="outline"
              className="mb-4 text-[10px] tracking-[0.2em] uppercase border-neutral-700 bg-black/70 backdrop-blur-sm text-white"
            >
              {category}
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal mb-4 tracking-tight text-white">
              {title}
            </h1>

            <p className="text-lg text-gray-300 mb-6 max-w-3xl leading-relaxed">
              {subtitle}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-400 tracking-wide">
              <span>{publishDate}</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <Card className="p-8 md:p-12 bg-neutral-900 border border-neutral-800">
          <article className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight">
            {children}
          </article>

          {hasPaidSection && (
            <div className="mt-12 pt-12 border-t border-neutral-800">
              <div className="p-8 rounded-lg border border-neutral-800 bg-neutral-950">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-5 w-5 text-white" />
                  <h3 className="font-serif text-xl font-normal text-white">
                    The Cheat Code Secret
                  </h3>
                </div>

                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Discover the hidden factor that can reduce your millionaire timeline by 5–15 years. Used by the top 1%, FIRE super savers, and multi-millionaire early retirees — this rarely-taught principle can accelerate your path to £1M without earning more money, taking more risk, or timing the market.
                </p>

                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() =>
                    (window.location.href =
                      "/blog/cheat-code-01/payment")
                  }
                >
                  Unlock for $20 →
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Social Share */}
        <Card className="p-6 mt-8 bg-neutral-900 border border-neutral-800">
          <SocialShare title={title} description={subtitle} />
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}

        {/* Back to Blog */}
        <div className="mt-10 text-center">
          <Link to="/blog">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              ← Back to All Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
