import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { logger } from './logger.js';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  improvements?: string[];
  optimizedAt?: string;
}

export interface SEODataStore {
  [pageKey: string]: SEOData;
}

const SEO_DATA_FILE = join(process.env.SITE_ROOT_PATH || '../../', 'src/data/seo-data.json');

/**
 * Read the current SEO data file
 */
export function readSEOData(): SEODataStore {
  if (!existsSync(SEO_DATA_FILE)) {
    logger.info(`SEO data file not found, creating new: ${SEO_DATA_FILE}`);
    return {};
  }

  try {
    const content = readFileSync(SEO_DATA_FILE, 'utf-8');
    return JSON.parse(content) as SEODataStore;
  } catch (error) {
    logger.error(`Failed to read SEO data file`, { error });
    return {};
  }
}

/**
 * Write SEO data to file
 */
export function writeSEOData(data: SEODataStore) {
  try {
    // Ensure directory exists
    const dir = SEO_DATA_FILE.substring(0, SEO_DATA_FILE.lastIndexOf('/'));
    if (!existsSync(dir)) {
      throw new Error(`Directory does not exist: ${dir}`);
    }

    writeFileSync(SEO_DATA_FILE, JSON.stringify(data, null, 2));
    logger.info(`SEO data file updated`, { pages: Object.keys(data).length });
  } catch (error) {
    logger.error(`Failed to write SEO data file`, { error, path: SEO_DATA_FILE });
    throw error;
  }
}

/**
 * Update a single page's SEO data
 */
export function updatePageSEO(pageKey: string, seoData: SEOData) {
  const store = readSEOData();
  store[pageKey] = {
    ...seoData,
    optimizedAt: new Date().toISOString()
  };
  writeSEOData(store);
}

/**
 * Validate SEO data against constraints
 */
export function validateSEOData(data: SEOData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const titleLength = data.title.length;
  if (titleLength < 30 || titleLength > 60) {
    errors.push(`Title length ${titleLength} is outside recommended range (30-60)`);
  }

  const descLength = data.description.length;
  if (descLength < 80 || descLength > 160) {
    errors.push(`Description length ${descLength} is outside recommended range (80-160)`);
  }

  const keywordCount = data.keywords.split(',').filter(k => k.trim()).length;
  if (keywordCount < 3 || keywordCount > 6) {
    errors.push(`Keyword count ${keywordCount} is outside recommended range (3-6)`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get a single page's current SEO data (or undefined if not optimized yet)
 */
export function getPageSEO(pageKey: string): SEOData | undefined {
  const store = readSEOData();
  return store[pageKey];
}

/**
 * Get count of optimized pages
 */
export function getOptimizedPageCount(): number {
  return Object.keys(readSEOData()).length;
}
