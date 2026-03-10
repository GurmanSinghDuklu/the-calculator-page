import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  image?: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <h2 className="font-display text-2xl font-normal text-white mb-6">Related Articles</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Link key={index} to={article.url}>
            <div className="border border-white/10 bg-white/[0.015] p-6 hover:border-white/30 transition-all duration-300 h-full flex flex-col">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-display text-lg font-normal text-white mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
                {article.description}
              </p>
              <div className="flex items-center font-heading text-[10px] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors">
                Read more <ArrowRight className="ml-2 h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
