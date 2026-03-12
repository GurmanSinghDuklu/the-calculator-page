import Anthropic from '@anthropic-ai/sdk';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { COMPETITORS, CALC_CATEGORIES_FOR_ANALYSIS } from '../config.js';
import { logger } from '../utils/logger.js';

const COMPETITOR_CACHE_PATH = join(process.cwd(), 'data/competitor-cache.json');
const CACHE_TTL_DAYS = 7;

export interface CompetitorAnalysis {
  domain: string;
  keywordPatterns: string[];
  descriptionFormulas: string[];
  strongKeywords: string[];
  schemaTypes: string[];
  contentDepth: 'low' | 'medium' | 'high';
  titlePatterns: string[];
  internalLinking: string[];
  analyzedAt: string;
}

export interface CompetitorCache {
  [domain: string]: CompetitorAnalysis;
}

/**
 * Check if competitor cache is still fresh (within TTL)
 */
function isCacheFresh(): boolean {
  if (!existsSync(COMPETITOR_CACHE_PATH)) {
    return false;
  }

  try {
    const cache: CompetitorCache = JSON.parse(readFileSync(COMPETITOR_CACHE_PATH, 'utf-8'));

    // Check if any entry is older than TTL
    const now = new Date();
    for (const analysis of Object.values(cache)) {
      const analyzedDate = new Date(analysis.analyzedAt);
      const daysSince = (now.getTime() - analyzedDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSince > CACHE_TTL_DAYS) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Get cached competitor analysis or refresh if stale
 */
export async function getCompetitorAnalysis(): Promise<CompetitorCache> {
  if (isCacheFresh()) {
    logger.info('Using cached competitor analysis');
    return JSON.parse(readFileSync(COMPETITOR_CACHE_PATH, 'utf-8'));
  }

  logger.info('Refreshing competitor analysis (cache expired)');
  return await analyzeCompetitors();
}

/**
 * Analyze all competitor sites using Claude with web search
 */
async function analyzeCompetitors(): Promise<CompetitorCache> {
  const client = new Anthropic();
  const cache: CompetitorCache = {};

  for (const competitor of COMPETITORS) {
    logger.info(`Analyzing competitor: ${competitor.domain}`);

    const prompt = `Analyze the SEO strategy of ${competitor.domain} for calculator websites.

Please provide:
1. Common title patterns they use (e.g., "[Calculator Name] - [Benefit] | Free")
2. Description formula patterns they use
3. Strong keywords they target across multiple pages
4. Schema markup types they use (FAQPage, SoftwareApplication, etc.)
5. Average content depth (low/medium/high)
6. Internal linking patterns

Search their site for:
- Financial calculators (compound interest, mortgage, loan, savings, ROI, retirement)
- Everyday calculators (percentage, BMI, age, average)
- Unit converters (length, weight, temperature, volume)

Format your response as valid JSON with these exact keys:
{
  "titlePatterns": [],
  "descriptionFormulas": [],
  "strongKeywords": [],
  "schemaTypes": [],
  "contentDepth": "medium",
  "internalLinking": []
}`;

    try {
      const response = await client.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 2000,
        thinking: { type: 'adaptive' },
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        tools: [
          {
            type: 'web_search_20260209',
            name: 'web_search'
          }
        ]
      });

      // Extract the JSON response
      const textContent = response.content.find(b => b.type === 'text');
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text response from Claude');
      }

      // Parse JSON from response
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not extract JSON from response');
      }

      const analysis = JSON.parse(jsonMatch[0]);

      cache[competitor.domain] = {
        domain: competitor.domain,
        keywordPatterns: analysis.titlePatterns || [],
        descriptionFormulas: analysis.descriptionFormulas || [],
        strongKeywords: analysis.strongKeywords || [],
        schemaTypes: analysis.schemaTypes || [],
        contentDepth: analysis.contentDepth || 'medium',
        titlePatterns: analysis.titlePatterns || [],
        internalLinking: analysis.internalLinking || [],
        analyzedAt: new Date().toISOString()
      };

      logger.info(`✓ Analyzed ${competitor.domain}`, {
        keywords: analysis.strongKeywords?.length || 0,
        patterns: analysis.titlePatterns?.length || 0
      });
    } catch (error) {
      logger.error(`Failed to analyze competitor: ${competitor.domain}`, { error });
    }
  }

  // Save to cache
  writeFileSync(COMPETITOR_CACHE_PATH, JSON.stringify(cache, null, 2));
  logger.info('Competitor analysis cached');

  return cache;
}

/**
 * Generate keyword gap report comparing site against competitors
 */
export async function generateKeywordGaps(
  competitorData: CompetitorCache
): Promise<{
  opportunities: string[];
  competitorStrengths: string[];
  recommendedKeywords: string[];
}> {
  const allCompetitorKeywords = Object.values(competitorData)
    .flatMap(c => c.strongKeywords)
    .filter((v, i, a) => a.indexOf(v) === i);

  logger.info('Generated keyword gap analysis', {
    totalCompetitorKeywords: allCompetitorKeywords.length
  });

  return {
    opportunities: allCompetitorKeywords.slice(0, 10),
    competitorStrengths: Object.keys(competitorData),
    recommendedKeywords: allCompetitorKeywords.slice(0, 20)
  };
}
