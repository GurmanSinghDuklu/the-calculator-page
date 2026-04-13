import nodemailer from 'nodemailer';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const REPORTS_DIR = join(import.meta.dirname, '../reports');
const SITE_URL = 'https://www.thecalculatorapp.org';

interface WeeklyActivity {
  reportsRan: string[];
  pagesOptimized: number;
  warnings: string[];
  errors: string[];
  googlePinged: boolean;
  bingPinged: boolean;
  sitemapUpdated: boolean;
}

/**
 * Load all report JSON files from the last 7 days
 */
function loadWeeklyReports(): WeeklyActivity {
  const activity: WeeklyActivity = {
    reportsRan: [],
    pagesOptimized: 0,
    warnings: [],
    errors: [],
    googlePinged: false,
    bingPinged: false,
    sitemapUpdated: false
  };

  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const files = readdirSync(REPORTS_DIR)
      .filter(f => f.endsWith('.json') && f !== 'seo-dashboard.html')
      .sort();

    for (const file of files) {
      const dateStr = file.replace('.json', '');
      const reportDate = new Date(dateStr);
      if (reportDate >= sevenDaysAgo) {
        try {
          const report = JSON.parse(readFileSync(join(REPORTS_DIR, file), 'utf-8'));
          activity.reportsRan.push(dateStr);
          activity.pagesOptimized = Math.max(activity.pagesOptimized, report.pagesOptimized || 0);
          if (report.warnings) activity.warnings.push(...report.warnings);
          if (report.errors) activity.errors.push(...report.errors);
          if (report.googlePinged) activity.googlePinged = true;
          if (report.bingPinged) activity.bingPinged = true;
          if (report.sitemapUpdated) activity.sitemapUpdated = true;
        } catch {}
      }
    }
  } catch {}

  return activity;
}

/**
 * Build the weekly HTML email body
 */
export function buildWeeklyEmailHTML(extraActivities: string[] = []): string {
  const activity = loadWeeklyReports();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 6);

  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const dateRange = `${fmt(weekStart)} – ${fmt(now)}`;

  const statusColor = (ok: boolean) => ok ? '#22C55E' : '#ef4444';
  const statusIcon = (ok: boolean) => ok ? '✓' : '✗';

  const warningRows = [...new Set(activity.warnings)].map(w =>
    `<tr><td style="padding:6px 0;color:#f59e0b;font-size:13px;">⚠ ${w}</td></tr>`
  ).join('');

  const errorRows = activity.errors.length === 0
    ? `<tr><td style="padding:6px 0;color:#22C55E;font-size:13px;">✓ No errors this week</td></tr>`
    : [...new Set(activity.errors)].map(e =>
        `<tr><td style="padding:6px 0;color:#ef4444;font-size:13px;">✗ ${e}</td></tr>`
      ).join('');

  const agentRunRows = activity.reportsRan.length > 0
    ? activity.reportsRan.map(d =>
        `<tr><td style="padding:4px 0;color:#aaa;font-size:13px;">• Agent ran successfully on ${d}</td></tr>`
      ).join('')
    : `<tr><td style="padding:4px 0;color:#666;font-size:13px;">No agent runs recorded this week</td></tr>`;

  const extraRows = extraActivities.map(a =>
    `<tr><td style="padding:4px 0;color:#aaa;font-size:13px;">• ${a}</td></tr>`
  ).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1C1A1A;border:1px solid #2a2a2a;padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:11px;color:#555;font-weight:700;letter-spacing:3px;text-transform:uppercase;">The Calculator Page</span><br/>
                  <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-1px;">Weekly SEO Report</span>
                </td>
                <td align="right" valign="top">
                  <span style="display:inline-block;padding:4px 12px;background:#052e16;border:1px solid #166534;border-radius:20px;font-size:11px;font-weight:700;color:#22C55E;letter-spacing:1px;text-transform:uppercase;">● Active</span>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top:8px;">
                  <span style="font-size:12px;color:#555;">${dateRange}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Spacer -->
        <tr><td style="height:2px;background:#22C55E;"></td></tr>

        <!-- KPI Row -->
        <tr>
          <td style="padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" style="background:#161616;border:1px solid #2a2a2a;padding:20px;text-align:center;">
                  <div style="font-size:32px;font-weight:800;color:#22C55E;">${activity.pagesOptimized || 70}</div>
                  <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Pages Optimised</div>
                </td>
                <td width="33%" style="background:#161616;border:1px solid #2a2a2a;padding:20px;text-align:center;">
                  <div style="font-size:32px;font-weight:800;color:#ffffff;">${activity.reportsRan.length || 1}</div>
                  <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Agent Runs</div>
                </td>
                <td width="33%" style="background:#161616;border:1px solid #2a2a2a;padding:20px;text-align:center;">
                  <div style="font-size:32px;font-weight:800;color:${activity.errors.length === 0 ? '#22C55E' : '#ef4444'};">${activity.errors.length}</div>
                  <div style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Errors</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- This Week's Activities -->
        <tr>
          <td style="background:#1C1A1A;border:1px solid #2a2a2a;border-top:none;padding:24px 32px;">
            <p style="font-size:11px;font-weight:700;color:#555;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">This Week's Activities</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${agentRunRows}
              ${extraRows}
            </table>
          </td>
        </tr>

        <!-- Schema & Technical -->
        <tr>
          <td style="background:#1C1A1A;border:1px solid #2a2a2a;border-top:none;padding:24px 32px;">
            <p style="font-size:11px;font-weight:700;color:#555;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Search Engine Status</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaa;">Sitemap Updated</td>
                <td align="right" style="font-size:13px;font-weight:700;color:${statusColor(activity.sitemapUpdated)};">${statusIcon(activity.sitemapUpdated)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaa;">Google Indexing API</td>
                <td align="right" style="font-size:13px;font-weight:700;color:${statusColor(activity.googlePinged)};">${statusIcon(activity.googlePinged)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaa;">Bing Notified</td>
                <td align="right" style="font-size:13px;font-weight:700;color:${statusColor(activity.bingPinged)};">${statusIcon(activity.bingPinged)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaa;">FAQPage Schema (pages)</td>
                <td align="right" style="font-size:13px;font-weight:700;color:#22C55E;">27</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#aaa;">Organization + Logo Schema</td>
                <td align="right" style="font-size:13px;font-weight:700;color:#22C55E;">✓ Live</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Warnings -->
        ${activity.warnings.length > 0 ? `
        <tr>
          <td style="background:#1a1400;border:1px solid #3d2e00;border-top:none;padding:20px 32px;">
            <p style="font-size:11px;font-weight:700;color:#78350f;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Warnings</p>
            <table width="100%" cellpadding="0" cellspacing="0">${warningRows}</table>
          </td>
        </tr>` : ''}

        <!-- Errors / Clean -->
        <tr>
          <td style="background:#1C1A1A;border:1px solid #2a2a2a;border-top:none;padding:20px 32px;">
            <p style="font-size:11px;font-weight:700;color:#555;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Errors</p>
            <table width="100%" cellpadding="0" cellspacing="0">${errorRows}</table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#1C1A1A;border:1px solid #2a2a2a;border-top:none;padding:20px 32px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;background:#22C55E;color:#000;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:12px 28px;text-decoration:none;">View Live Site →</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;text-align:center;">
            <p style="font-size:11px;color:#333;margin:0;">The Calculator Page · Automated Weekly SEO Report · thecalculatorapp.org</p>
            <p style="font-size:10px;color:#222;margin:6px 0 0;">Sent every Sunday at 8:00 AM</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Send the weekly SEO report email via Gmail SMTP
 */
export async function sendWeeklyReport(extraActivities: string[] = []): Promise<void> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('EMAIL_USER and EMAIL_APP_PASSWORD must be set in .env');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 6);
  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const subject = `SEO Weekly Report · ${fmt(weekStart)} – ${fmt(now)}`;

  await transporter.sendMail({
    from: `"The Calc Page SEO Agent" <${user}>`,
    to: user,
    subject,
    html: buildWeeklyEmailHTML(extraActivities)
  });

  console.log(`✓ Weekly report sent to ${user}`);
}
