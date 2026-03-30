import { google } from 'googleapis';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import { getSitemapURLs } from '../utils/sitemap-updater.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERVICE_ACCOUNT_PATH = join(__dirname, '../../service-account.json');

/**
 * Ping all URLs to Google and Bing indexing APIs
 */
export async function pingSearchEngines(): Promise<{
  googleSuccess: boolean;
  bingSuccess: boolean;
  urlsPinged: number;
}> {
  const urls = getSitemapURLs();

  logger.info(`Preparing to ping ${urls.length} URLs to search engines`);

  const googleSuccess = await pingGoogle(urls);
  const bingSuccess = await pingBing(urls);

  return {
    googleSuccess,
    bingSuccess,
    urlsPinged: urls.length
  };
}

/**
 * Ping Google Indexing API using service account credentials (googleapis)
 */
async function pingGoogle(urls: string[]): Promise<boolean> {
  try {
    if (!existsSync(SERVICE_ACCOUNT_PATH)) {
      logger.warn('service-account.json not found — Google pinging skipped', {
        expectedPath: SERVICE_ACCOUNT_PATH
      });
      return false;
    }

    const keys = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'));

    const jwtClient = new google.auth.JWT({
      email: keys.client_email,
      key: keys.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    await jwtClient.authorize();
    logger.info('✓ Authenticated with Google Indexing API');

    let successCount = 0;
    let errorCount = 0;

    for (const url of urls) {
      try {
        await jwtClient.request({
          url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
          method: 'POST',
          data: { url, type: 'URL_UPDATED' },
        });
        successCount++;
      } catch (err: any) {
        const msg = err?.response?.data?.error?.message ?? err.message;
        logger.warn(`Google ping failed for ${url}: ${msg}`);
        errorCount++;
      }

      // Rate limit: Google Indexing API allows 200 req/day, pace at ~1/sec
      await new Promise(r => setTimeout(r, 1000));
    }

    logger.info(`Google pinging complete`, { successCount, errorCount, total: urls.length });
    return successCount > 0;
  } catch (error: any) {
    logger.error('Failed to ping Google', { error: error.message });
    return false;
  }
}

/**
 * Ping Bing Webmaster API — submits URLs in batches of 500
 */
async function pingBing(urls: string[]): Promise<boolean> {
  const bingApiKey = process.env.BING_WEBMASTER_API_KEY;
  const siteUrl = process.env.SITE_URL ?? 'https://www.thecalculatorpage.com';

  if (!bingApiKey) {
    logger.warn('BING_WEBMASTER_API_KEY not set — Bing pinging skipped');
    return false;
  }

  try {
    const BATCH_SIZE = 500;
    let successCount = 0;

    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);

      const res = await fetch(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${bingApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ siteUrl, urlList: batch }),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        logger.warn(`Bing batch ${Math.floor(i / BATCH_SIZE) + 1} failed: ${res.status} ${body}`);
      } else {
        successCount += batch.length;
        logger.info(`✓ Bing batch submitted`, { count: batch.length });
      }
    }

    logger.info(`Bing pinging complete`, { successCount, total: urls.length });
    return successCount > 0;
  } catch (error: any) {
    logger.error('Failed to ping Bing', { error: error.message });
    return false;
  }
}
