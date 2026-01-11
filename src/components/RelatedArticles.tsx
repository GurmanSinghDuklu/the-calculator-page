import { Card } from "@/components/ui/card";
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
    <div className="mt-12 border-t border-border/50 pt-8">
      <h2 className="font-serif text-2xl font-normal text-foreground mb-6">Related Articles</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Link key={index} to={article.url}>
            <Card className="p-4 hover:shadow-elevated transition-all duration-300 h-full border-border/50">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="font-serif text-lg font-normal text-foreground mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {article.description}
              </p>
              <div className="flex items-center text-foreground text-sm tracking-wide uppercase">
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
