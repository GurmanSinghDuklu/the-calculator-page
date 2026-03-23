#!/usr/bin/env node
/**
 * Send the weekly SEO report email immediately.
 * Usage: npx tsx scripts/seo-agent/send-weekly-report.ts
 */

import { config } from 'dotenv';
import { sendWeeklyReport } from './utils/email-reporter.js';

config();

// This week's manual activity summary (used for the first send and ad-hoc runs)
const thisWeeksActivities = [
  'SEO agent deployed — 70 pages optimised with AI-generated titles, descriptions & keywords',
  'FAQPage schema added to all 27 calculator pages (Rich Results eligible)',
  'Organization schema + brand logo added for Google Knowledge Panel',
  'WebSite SearchAction schema added (enables Google sitelinks search box)',
  'Homepage redesigned — featured tools moved above the fold, compact hero',
  'Category cards upgraded to show inline clickable calculator lists',
  'Daily auto git commit + push configured after each agent run',
  'jsonwebtoken installed — Google Indexing API pinging now active',
  'Brand logo (logo.svg) created and set as primary favicon',
  'launchd scheduler active — agent runs nightly at 3:00 AM',
];

console.log('Sending weekly SEO report...');

sendWeeklyReport(thisWeeksActivities)
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Failed to send report:', err.message);
    console.error('\nMake sure EMAIL_USER and EMAIL_APP_PASSWORD are set in your .env file.');
    console.error('Get a Gmail App Password at: https://myaccount.google.com/apppasswords');
    process.exit(1);
  });
