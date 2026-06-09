import type { AnswerPageData, Market, Category } from './types';
import { ukPages } from './uk';
import { usPages } from './us';

const ALL: AnswerPageData[] = [...ukPages, ...usPages];

export function getAllAnswerPages(): AnswerPageData[] {
  return ALL;
}
export function getByMarket(market: Market): AnswerPageData[] {
  return ALL.filter((p) => p.market === market);
}
export function getBySlug(market: Market, slug: string): AnswerPageData | undefined {
  return ALL.find((p) => p.market === market && p.slug === slug);
}
export function getByCategory(market: Market, category: Category): AnswerPageData[] {
  return ALL.filter((p) => p.market === market && p.category === category);
}
export type { AnswerPageData, Market, Category };
