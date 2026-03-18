# 🤖 SEO Agent — Autonomous Daily Optimization

A fully autonomous SEO optimization system for The Calculator Page that uses Claude Opus 4.6 to analyze competitors, identify keyword gaps, and generate optimized SEO metadata for all ~70 pages daily.

## 🎯 What It Does

1. **Competitor Analysis** — Analyzes 3 competitors (thecalculatorsite.com, omnicalculator.com, calculator.net) to extract:
   - Title and description patterns
   - Strong keywords they rank for
   - Schema markup strategies
   - Content depth signals

2. **SEO Optimization** — For each page, generates:
   - Optimized title (30-60 chars, brand-aware)
   - Compelling description (80-160 chars with CTA)
   - High-intent keywords (3-6 terms)
   - Ranking improvement predictions

3. **Technical SEO Updates**:
   - Updates `public/sitemap.xml` with fresh lastmod dates
   - Pings Google Indexing API to request crawling
   - Pings Bing Webmaster API for rapid indexing

4. **Daily Reports** — Generates timestamped JSON reports with:
   - Pages optimized
   - Keyword gaps found
   - Search engine ping status
   - Full change log

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd scripts/seo-agent
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Then edit `.env`:
```env
ANTHROPIC_API_KEY=sk-ant-YOUR_ANTHROPIC_API_KEY_HERE
BING_WEBMASTER_API_KEY=YOUR_BING_API_KEY  # Optional
```

**Get your keys:**
- [Anthropic API Key](https://console.anthropic.com)
- [Bing Webmaster Tools API Key](https://www.bing.com/webmasters/tools) → Settings → API Access

### 3. Run the Agent

```bash
# Manual run (test)
npm start

# Automated daily runs (see below)
```

## 📅 Automated Daily Runs (macOS launchd)

The system can run automatically every day at 3:00 AM using macOS launchd.

### Install the Scheduler

```bash
# Copy the plist file to LaunchAgents
cp com.thecalculatorpage.seo-agent.plist ~/Library/LaunchAgents/

# Load it into launchd
launchctl load ~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist

# Verify it's running
launchctl list | grep thecalculatorpage
```

### Manage the Scheduler

```bash
# View scheduled jobs
launchctl list | grep thecalculatorpage

# Stop the scheduled job
launchctl unload ~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist

# View logs
tail -f /tmp/seo-agent.out
tail -f /tmp/seo-agent.err
```

### Modify the Daily Run Time

Edit `~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist`:

```xml
<key>StartCalendarInterval</key>
<dict>
  <key>Hour</key>
  <integer>3</integer>      <!-- Change this (0-23) -->
  <key>Minute</key>
  <integer>0</integer>      <!-- Change this (0-59) -->
</dict>
```

Then reload:
```bash
launchctl unload ~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist
launchctl load ~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist
```

## 📊 How It Works

### Phase 1: Competitor Analysis
- Uses Claude + web search to fetch competitor pages
- Extracts SEO patterns and keywords
- **Cached for 7 days** to save API costs

```
Competitors analyzed:
- www.thecalculatorsite.com
- omnicalculator.com
- calculator.net
```

### Phase 2: SEO Optimization
- Reads current page titles/descriptions (from source files)
- Compares against competitor data
- Generates optimized SEO metadata using Claude
- Validates against SEO constraints (length, keyword count, etc.)

### Phase 3: Technical Updates
- Updates `public/sitemap.xml` lastmod dates (fresh signal to crawlers)
- Pings Google Indexing API (all URLs)
- Pings Bing Webmaster API (first 10 URLs per batch)

### Phase 4: Reporting
- Saves daily report to `reports/YYYY-MM-DD.json`
- Includes metrics: pages optimized, errors, search engine responses

## 📁 File Structure

```
scripts/seo-agent/
├── index.ts                    # Main orchestrator
├── config.ts                   # All 70 pages + competitors
├── agents/
│   ├── competitor-analyzer.ts  # Analyzes competitors (Phase 1)
│   ├── seo-optimizer.ts        # Generates optimized SEO (Phase 2)
│   └── site-pinger.ts          # Pings search engines (Phase 3)
├── utils/
│   ├── seo-data-manager.ts     # Reads/writes src/data/seo-data.json
│   ├── sitemap-updater.ts      # Updates public/sitemap.xml
│   └── logger.ts               # Logging + report generation
├── data/
│   └── competitor-cache.json   # Cached competitor analysis
├── reports/                    # Daily JSON reports
└── com.thecalculatorpage.seo-agent.plist  # macOS scheduler
```

## 🔄 Data Flow

```
1. Agent reads competitor data (from cache or fetches fresh)
   ↓
2. Agent generates optimized SEO for all pages using Claude
   ↓
3. Optimized data written to src/data/seo-data.json
   ↓
4. SEO.tsx component (in build) reads seo-data.json
   ↓
5. Pages get optimized titles/descriptions in HTML
   ↓
6. Sitemap updated, search engines pinged
   ↓
7. Daily report saved to reports/
```

## 📈 SEO Constraints

The agent enforces these SEO best practices:

| Element | Min | Max | Ideal |
|---------|-----|-----|-------|
| Title | 30 ch | 60 ch | 50 ch |
| Description | 80 ch | 160 ch | 120 ch |
| Keywords | 3 | 6 | 5 |

Any data outside these ranges is logged as a warning and may be adjusted.

## 🎯 Page Coverage

The agent optimizes **70 pages** across categories:

- **Core** (5): Home, Learn Hub, Formulas, Category hubs
- **Finance** (20): Compound Interest, Mortgage, Loan, ROI, Retirement, etc.
- **Misc** (6): Percentage, BMI, Age, Average, etc.
- **Converters** (4): Length, Weight, Temperature, Volume
- **Learn** (25): Articles on finance, budgeting, investing, etc.
- **Blog** (5): Blog posts and case studies
- **Legal** (5): Privacy, Terms, About, Cookies, Disclaimer

## 📊 Viewing Reports

Daily reports are saved as JSON in `reports/`:

```bash
ls -la reports/
cat reports/2026-03-11.json | jq '.'
```

Sample report structure:
```json
{
  "date": "2026-03-11",
  "startTime": "2026-03-11T03:00:00Z",
  "endTime": "2026-03-11T03:15:32Z",
  "status": "success",
  "totalPages": 70,
  "pagesOptimized": 65,
  "errors": [],
  "warnings": ["Title length issue on page X"],
  "competitorAnalysis": {
    "fetchedAt": "2026-03-11T03:00:10Z",
    "competitors": ["omnicalculator.com", ...],
    "cachedFromDays": 0
  },
  "sitemapUpdated": true,
  "googlePinged": true,
  "bingPinged": true,
  "logs": [...]
}
```

## 🐛 Troubleshooting

### Agent fails with "No API key"
→ Check `.env` file has `ANTHROPIC_API_KEY` set

### Competitor analysis returns no data
→ Check internet connection, Claude API status

### Pages not updating after run
→ Rebuild the site: `npm run build` in project root

### Launchd job not running
```bash
# Check if loaded
launchctl list | grep thecalculatorpage

# Check logs
tail /tmp/seo-agent.out
tail /tmp/seo-agent.err

# Reload
launchctl unload ~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist
launchctl load ~/Library/LaunchAgents/com.thecalculatorpage.seo-agent.plist
```

## 💡 Best Practices

1. **Monitor reports** — Check `reports/` daily to ensure optimization is working
2. **Update competitors** — Edit `config.ts` if you want to analyze different sites
3. **Adjust timing** — If 3 AM doesn't work, modify the plist file
4. **API budget** — At ~$0.30/day, ~$10/month. Monitor your Anthropic account usage
5. **Build after updates** — After agent runs, rebuild: `npm run build` to apply changes

## 🔐 Security Notes

- **API keys**: Keep `.env` file secure, never commit to git
- **Service account**: The `service-account.json` for Google API should be in `.gitignore`
- **Data validation**: Agent validates all SEO data before writing (length checks, keyword counts)
- **Rollback**: All changes are in `src/data/seo-data.json` — easy to revert

## 🎓 How It Optimizes for Rankings

The agent targets these ranking factors:

1. **Title optimization** — Matches competitor patterns, includes primary keyword
2. **Meta description** — High CTR signals with clear value prop + CTA
3. **Keyword strategy** — Long-tail keywords, search intent matching, user language
4. **Schema markup** — FAQPage, SoftwareApplication, BreadcrumbList for rich snippets
5. **Content freshness** — Updated sitemap lastmod signals to crawlers
6. **Technical SEO** — Proper canonical URLs, mobile-friendly meta tags
7. **Trust signals** — Brand inclusion, qualifiers ("Free", "Trusted", etc.)

## 📞 Support

For issues or questions:
1. Check the daily report: `cat reports/YYYY-MM-DD.json`
2. Check logs: `tail /tmp/seo-agent.out`
3. Run manually: `npm start` to debug
4. Check Anthropic API status: https://status.anthropic.com

---

**Built with Claude Opus 4.6 + Adaptive Thinking**
Autonomous, zero-approval SEO optimization for The Calculator Page
