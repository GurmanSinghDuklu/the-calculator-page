#!/usr/bin/env node
/**
 * SEO Agent Orchestrator
 * Autonomous daily SEO optimization system for The Calculator Page
 * Runs all phases: competitor analysis → SEO optimization → indexing pings
 */

import { config } from 'dotenv';
import { getCompetitorAnalysis, generateKeywordGaps } from './agents/competitor-analyzer.js';
import { optimizeAllPages } from './agents/seo-optimizer.js';
import { pingSearchEngines } from './agents/site-pinger.js';
import { writeSEOData, readSEOData, getOptimizedPageCount } from './utils/seo-data-manager.js';
import { updateSitemapDates } from './utils/sitemap-updater.js';
import { logger } from './utils/logger.js';
import { getPageCount } from './config.js';

// Load environment variables
config();

/**
 * Main orchestrator function
 */
async function runSEOAgent() {
  try {
    logger.info('🚀 Starting SEO Agent...');
    logger.info(`Total pages to optimize: ${getPageCount()}`);

    // Phase 1: Analyze competitors (cached)
    logger.info('📊 Phase 1: Competitor Analysis');
    const competitorData = await getCompetitorAnalysis();
    const keywordGaps = await generateKeywordGaps(competitorData);

    logger.setReportMetrics({
      competitorAnalysis: {
        fetchedAt: new Date().toISOString(),
        competitors: Object.keys(competitorData),
        cachedFromDays: 0
      }
    });

    logger.info(`Found ${keywordGaps.opportunities.length} keyword opportunities`);

    // Phase 2: Generate optimized SEO for all pages
    logger.info('✨ Phase 2: SEO Optimization');
    const optimizedSEO = await optimizeAllPages(competitorData);

    // Merge with existing data (preserve previous optimizations)
    const currentData = readSEOData();
    const mergedData = { ...currentData, ...optimizedSEO };

    logger.info(`Optimized ${Object.keys(optimizedSEO).length} pages`);

    // Write to SEO data file
    writeSEOData(mergedData);

    // Phase 3: Update technical SEO
    logger.info('🔧 Phase 3: Technical SEO Updates');
    const sitemapUpdated = updateSitemapDates();

    // Phase 4: Ping search engines
    logger.info('📡 Phase 4: Notifying Search Engines');
    const pingResults = await pingSearchEngines();

    // Update report metrics
    logger.setReportMetrics({
      totalPages: getPageCount(),
      pagesOptimized: Object.keys(optimizedSEO).length,
      sitemapUpdated,
      googlePinged: pingResults.googleSuccess,
      bingPinged: pingResults.bingSuccess
    });

    // Set status to success
    logger.setStatus('success');

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ SEO Agent Run Complete!');
    console.log('='.repeat(60));
    console.log(`Pages optimized: ${Object.keys(optimizedSEO).length}/${getPageCount()}`);
    console.log(`Total optimized in database: ${getOptimizedPageCount()}`);
    console.log(`Sitemap updated: ${sitemapUpdated ? '✓' : '✗'}`);
    console.log(`Google pinged: ${pingResults.googleSuccess ? '✓' : '✗'}`);
    console.log(`Bing pinged: ${pingResults.bingSuccess ? '✓' : '✗'}`);
    console.log(`Keyword opportunities found: ${keywordGaps.opportunities.length}`);
    console.log('='.repeat(60));

    // Save the report
    logger.saveReport();

  } catch (error) {
    logger.error('Fatal error in SEO Agent', { error });
    logger.setStatus('failed');
    logger.saveReport();
    process.exit(1);
  }
}

// Run the agent
runSEOAgent().catch(error => {
  console.error('Uncaught error:', error);
  process.exit(1);
});
