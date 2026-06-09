import { describe, it, expect } from 'vitest';
import { getAllAnswerPages, getByMarket, getBySlug } from './index';

describe('most-searched registry', () => {
  it('has pages', () => {
    expect(getAllAnswerPages().length).toBeGreaterThan(0);
  });
  it('slugs are unique within each market', () => {
    for (const market of ['uk', 'us'] as const) {
      const slugs = getByMarket(market).map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
  it('every related slug resolves within the same market', () => {
    for (const page of getAllAnswerPages()) {
      for (const rel of page.related) {
        expect(getBySlug(page.market, rel), `${page.market}/${page.slug} -> ${rel}`).toBeDefined();
      }
    }
  });
  it('answer is at most 40 words', () => {
    for (const page of getAllAnswerPages()) {
      expect(page.answer.split(/\s+/).length, `${page.market}/${page.slug}`).toBeLessThanOrEqual(40);
    }
  });
});
