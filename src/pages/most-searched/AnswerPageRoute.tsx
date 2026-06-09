import { useParams } from "react-router-dom";
import { AnswerPage } from "@/components/most-searched/AnswerPage";
import { getBySlug } from "@/data/most-searched";
import type { Market } from "@/data/most-searched/types";
import NotFound from "@/pages/NotFound";

export default function AnswerPageRoute() {
  const { market, slug } = useParams<{ market: string; slug: string }>();
  const page =
    market && slug && (market === "uk" || market === "us")
      ? getBySlug(market as Market, slug)
      : undefined;
  if (!page) return <NotFound />;
  return <AnswerPage page={page} />;
}
