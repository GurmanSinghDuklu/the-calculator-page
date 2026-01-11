import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface ArticleLayoutProps {
  title: string;
  description: string;
  readTime: string;
  category: string;
  categoryColor: string;
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
  nextArticle,
  children,
}: ArticleLayoutProps) {
  const [completed, setCompleted] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/learn/financial-journey">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journey
          </Button>
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${categoryColor}`}>
              {category}
            </span>
            <span className="text-sm text-muted-foreground">⏱️ {readTime}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
        </header>

        <Card className="p-8 mb-8">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </article>
        </Card>

        <div className="flex flex-col gap-4 mb-8">
          <Button
            onClick={() => setCompleted(!completed)}
            variant={completed ? "default" : "outline"}
            size="lg"
            className="w-full md:w-auto"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            {completed ? "Completed ✓" : "Mark as Completed"}
          </Button>

          {nextArticle && (
            <Card className="p-6 bg-muted/30 border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 tracking-wide uppercase">Next in your journey</p>
                  <p className="font-serif text-lg">{nextArticle.title}</p>
                </div>
                <Link to={nextArticle.path}>
                  <Button>Continue →</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>

        <Link to="/learn/financial-journey">
          <Button variant="outline" className="w-full md:w-auto">
            Return to Journey Map
          </Button>
        </Link>
      </div>
    </div>
  );
}
