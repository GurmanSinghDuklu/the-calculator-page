import Anthropic from '@anthropic-ai/sdk';
import { ALL_PAGES, SEO_CONSTRAINTS, SITE_URL } from '../config.js';
import { logger } from '../utils/logger.js';
import { SEOData, validateSEOData } from '../utils/seo-data-manager.js';
import { CompetitorAnalysis } from './competitor-analyzer.js';

interface PageToOptimize {
  key: string;
  path: string;
  title: string;
  category: string;
}

/**
 * Generate optimized SEO data for all pages using Claude
 */
export async function optimizeAllPages(
  competitorData: Record<string, CompetitorAnalysis>,
  pageLimit?: number
): Promise<Record<string, SEOData>> {
  const client = new Anthropic();
  const allPages = Object.values(ALL_PAGES).flat();
  const pagesToOptimize = pageLimit ? allPages.slice(0, pageLimit) : allPages;

  const results: Record<string, SEOData> = {};
  const batchSize = 5; // Process in batches to manage API rate limits

  logger.info(`Optimizing ${pagesToOptimize.length} pages for SEO...`);

  for (let i = 0; i < pagesToOptimize.length; i += batchSize) {
    const batch = pagesToOptimize.slice(i, i + batchSize);

    for (const page of batch) {
      try {
        const optimized = await optimizePage(page, competitorData, client);
        if (optimized) {
          results[page.key] = optimized;

          const validation = validateSEOData(optimized);
          if (!validation.valid) {
            logger.warn(`SEO validation warnings for ${page.key}:`, validation.errors);
          } else {
            logger.info(`✓ Optimized: ${page.key}`);
          }
        }
      } catch (error) {
        logger.error(`Failed to optimize ${page.key}`, { error });
      }
    }

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < pagesToOptimize.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  logger.info(`SEO optimization complete`, { optimized: Object.keys(results).length });
  return results;
}

/**
 * Optimize a single page using Claude
 */
async function optimizePage(
  page: PageToOptimize,
  competitorData: Record<string, CompetitorAnalysis>,
  client: Anthropic
): Promise<SEOData | null> {
  const competitorContext = buildCompetitorContext(page.category, competitorData);

  const prompt = `Generate SEO metadata for: ${page.title}
Category: ${page.category}
URL: ${SITE_URL}${page.path}

Rules:
- Title: 30-60 chars, include calculator name
- Description: 80-160 chars, include value prop
- Keywords: 3-6 terms, comma-separated

Return ONLY this JSON structure, nothing else:
{"title":"optimized title here","description":"optimized description here","keywords":"keyword1,keyword2,keyword3"}`;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 500,
      thinking: { type: 'adaptive' },
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract text content (skip thinking blocks)
    const textBlocks = response.content.filter(b => b.type === 'text');
    if (textBlocks.length === 0) {
      logger.debug(`No text response for page ${page.key}`, {
        contentTypes: response.content.map(b => b.type)
      });
      return null;
    }

    const textContent = textBlocks[0];
    if (textContent.type !== 'text') {
      return null;
    }

    // Parse JSON from response - handle whitespace variations
    let jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Try with aggressive whitespace matching
      const cleanedText = textContent.text.replace(/[\n\r\t]/g, ' ');
      jsonMatch = cleanedText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
    }

    if (!jsonMatch) {
      logger.debug(`Could not extract JSON for page ${page.key}`, {
        responseLength: textContent.text.length,
        responsePreview: textContent.text.substring(0, 200)
      });
      return null;
    }

    let data: SEOData;
    try {
      data = JSON.parse(jsonMatch[0]) as SEOData;
    } catch (parseError) {
      logger.debug(`Failed to parse JSON for page ${page.key}`, {
        jsonString: jsonMatch[0].substring(0, 100)
      });
      return null;
    }

    // Validate the data
    const validation = validateSEOData(data);
    if (!validation.valid) {
      logger.warn(`Invalid SEO data for ${page.key}:`, validation.errors);
      // Try to fix if possible
      if (data.title && data.description && data.keywords) {
        data.title = data.title.substring(0, 60);
        data.description = data.description.substring(0, 160);
      } else {
        return null;
      }
    }

    return data;
  } catch (error) {
    logger.error(`Failed to generate SEO for page ${page.key}`, { error });
    return null;
  }
}

/**
 * Build context about competitors for a specific page category
 */
function buildCompetitorContext(category: string, competitorData: Record<string, CompetitorAnalysis>): string {
  let context = '';

  for (const [domain, analysis] of Object.entries(competitorData)) {
    context += `\n${domain}:\n`;
    context += `- Title patterns: ${analysis.titlePatterns.slice(0, 3).join(', ')}\n`;
    context += `- Strong keywords: ${analysis.strongKeywords.slice(0, 5).join(', ')}\n`;
    context += `- Content depth: ${analysis.contentDepth}\n`;
    context += `- Schema types: ${analysis.schemaTypes.join(', ')}\n`;
  }

  return context || 'No competitor data available';
}

/**
 * Generate SEO recommendations for a page without immediately writing to the database
 */
export async function generateSEORecommendations(
  pageKey: string,
  competitorData: Record<string, CompetitorAnalysis>
): Promise<{
  recommendations: string[];
  estimatedImprovement: string;
}> {
  const page = Object.values(ALL_PAGES)
    .flat()
    .find(p => p.key === pageKey);

  if (!page) {
    return { recommendations: [], estimatedImprovement: 'Page not found' };
  }

  return {
    recommendations: [
      `Update title to follow competitor patterns for ${page.category}`,
      'Include primary keyword in first 50 characters',
      'Add unique value proposition in meta description',
      'Include 3-6 long-tail keywords specific to this calculator'
    ],
    estimatedImprovement: 'High - proper SEO structure can improve rankings by 2-3 positions'
  };
}
