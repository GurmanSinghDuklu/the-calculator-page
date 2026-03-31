import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: unknown;
}

export interface DailyReport {
  date: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'success' | 'failed';
  totalPages: number;
  pagesOptimized: number;
  errors: string[];
  warnings: string[];
  competitorAnalysis: {
    fetchedAt: string;
    competitors: string[];
    cachedFromDays: number;
  };
  sitemapUpdated: boolean;
  googlePinged: boolean;
  bingPinged: boolean;
  logs: LogEntry[];
}

class Logger {
  private logs: LogEntry[] = [];
  private report: DailyReport;
  private reportPath: string;

  constructor(reportsDir: string = './reports') {
    mkdirSync(reportsDir, { recursive: true });

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    this.reportPath = join(reportsDir, `${dateStr}.json`);

    this.report = {
      date: dateStr,
      startTime: now.toISOString(),
      status: 'running',
      totalPages: 0,
      pagesOptimized: 0,
      errors: [],
      warnings: [],
      competitorAnalysis: {
        fetchedAt: '',
        competitors: [],
        cachedFromDays: 0
      },
      sitemapUpdated: false,
      googlePinged: false,
      bingPinged: false,
      logs: []
    };
  }

  log(level: 'info' | 'warn' | 'error' | 'debug', message: string, data?: unknown) {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = { timestamp, level, message, data };

    this.logs.push(entry);

    const logStr = `[${timestamp}] [${level.toUpperCase()}] ${message}${data ? ' ' + JSON.stringify(data) : ''}`;

    if (level === 'error') {
      console.error(logStr);
      this.report.errors.push(message);
    } else if (level === 'warn') {
      console.warn(logStr);
      this.report.warnings.push(message);
    } else {
      console.log(logStr);
    }
  }

  info(message: string, data?: unknown) {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown) {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown) {
    this.log('error', message, data);
  }

  debug(message: string, data?: unknown) {
    this.log('debug', message, data);
  }

  setReportMetrics(metrics: Partial<DailyReport>) {
    this.report = { ...this.report, ...metrics };
  }

  saveReport() {
    this.report.endTime = new Date().toISOString();
    this.report.logs = this.logs;

    writeFileSync(this.reportPath, JSON.stringify(this.report, null, 2));
    console.log(`\n✅ Report saved: ${this.reportPath}`);
  }

  setStatus(status: 'success' | 'failed') {
    this.report.status = status;
  }

  getReport(): DailyReport {
    return this.report;
  }
}

export const logger = new Logger(join(__dirname, '../../reports'));
