import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from './logger.js';

const SITEMAP_PATH = join(process.env.SITE_ROOT_PATH || '../../', 'public/sitemap.xml');

/**
 * Update all lastmod dates in sitemap.xml to today
 */
export function updateSitemapDates(): boolean {
  try {
    if (!existsSync(SITEMAP_PATH)) {
      logger.warn(`Sitemap not found: ${SITEMAP_PATH}`);
      return false;
    }

    let sitemapContent = readFileSync(SITEMAP_PATH, 'utf-8');

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Update all <lastmod> tags to today's date
    sitemapContent = sitemapContent.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      `<lastmod>${today}</lastmod>`
    );

    // If no lastmod exists, add one after each <loc>
    // This handles cases where lastmod was missing
    if (!sitemapContent.includes('<lastmod>')) {
      sitemapContent = sitemapContent.replace(
        /(<loc>.*?<\/loc>)/g,
        `$1\n    <lastmod>${today}</lastmod>`
      );
    }

    writeFileSync(SITEMAP_PATH, sitemapContent);

    logger.info(`Sitemap updated with fresh dates`, { date: today, path: SITEMAP_PATH });
    return true;
  } catch (error) {
    logger.error(`Failed to update sitemap`, { error });
    return false;
  }
}

/**
 * Get all URLs from sitemap for indexing pings
 */
export function getSitemapURLs(): string[] {
  try {
    if (!existsSync(SITEMAP_PATH)) {
      logger.warn(`Sitemap not found: ${SITEMAP_PATH}`);
      return [];
    }

    const sitemapContent = readFileSync(SITEMAP_PATH, 'utf-8');
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];

    return urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
  } catch (error) {
    logger.error(`Failed to parse sitemap`, { error });
    return [];
  }
}
