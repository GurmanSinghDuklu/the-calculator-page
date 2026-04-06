import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { CopyButton } from "@/components/CopyButton";
import { FinancialDisclosure } from "@/components/FinancialDisclosure";
import { Calendar, ArrowRight } from "lucide-react";

const ACCENT = "#3B82F6";

const RELATED_DAYS = [7, 14, 21, 28, 30, 45, 60, 90, 100, 120, 150, 180, 200, 250, 270, 300, 365];

function formatLong(d: Date): string {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function formatShort(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function DaysFromTodayPage({ dayCount = 30 }: { dayCount?: number }) {
  const days = dayCount;

  const result = useMemo(() => {
    const today = new Date();
    const future = new Date(today);
    future.setDate(future.getDate() + days);
    const weeks = Math.floor(days / 7);
    const remainder = days % 7;
    return { today, future, weeks, remainder };
  }, [days]);

  const title = `What Is ${days} Days From Today?`;
  const answer = formatLong(result.future);
  const description = `${days} days from today is ${answer}. Find exact dates for any number of days in the future.`;

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen font-sans">
      <SEO
        title={title}
        description={description}
        keywords={`${days} days from today, ${days} days from now, what date is ${days} days from today, date ${days} days from now`}
      />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 font-heading text-[10px] uppercase tracking-widest text-white/40">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/misc/days-from-today" className="hover:text-white transition-colors">Days From Today</Link>
          <span>/</span>
          <span className="text-white/70">{days} Days</span>
        </nav>
      </div>

      {/* Hero answer */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-5 w-5" style={{ color: ACCENT }} />
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/50">Date Calculator</p>
        </div>

        <h1 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight text-white mb-6">
          {days} days from today
        </h1>

        <div className="border border-white/10 bg-white/[0.02] p-8 mb-8">
          <p className="text-white/50 text-xs font-heading uppercase tracking-widest mb-2">The answer</p>
          <p className="font-display text-3xl md:text-4xl text-white mb-2">{answer}</p>
          <p className="text-zinc-300 text-sm font-sans">{formatShort(result.future)}</p>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6">
            <div>
              <p className="text-white/40 text-[10px] font-heading uppercase tracking-widest">From</p>
              <p className="text-zinc-300 text-sm">{formatLong(result.today)}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20" />
            <div>
              <p className="text-white/40 text-[10px] font-heading uppercase tracking-widest">Breakdown</p>
              <p className="text-zinc-300 text-sm">
                {result.weeks > 0 && `${result.weeks} week${result.weeks !== 1 ? "s" : ""}`}
                {result.weeks > 0 && result.remainder > 0 && " and "}
                {result.remainder > 0 && `${result.remainder} day${result.remainder !== 1 ? "s" : ""}`}
                {result.weeks === 0 && result.remainder === 0 && `${days} days`}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <CopyButton accentColor={ACCENT} results={[
              { label: `${days} days from today`, value: answer },
              { label: "Short date", value: formatShort(result.future) },
              { label: "Breakdown", value: `${result.weeks} weeks and ${result.remainder} days` },
            ]} />
          </div>
        </div>

        {/* Explanation */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-zinc-300 text-base leading-relaxed">
            If you're counting {days} calendar days starting from today ({formatLong(result.today)}), you land on <strong>{answer}</strong>.
            {days === 30 && " This is a common timeframe for notice periods, cooling-off periods on contracts, and payment terms on invoices."}
            {days === 60 && " Sixty days is typical for longer notice periods, some insurance waiting periods, and many subscription trial extensions."}
            {days === 90 && " Ninety days — roughly three months — is commonly used for probation periods at work, visa validity windows, and quarterly deadlines."}
            {days === 14 && " Two weeks is the standard cooling-off period for most UK consumer contracts and online purchases under the Consumer Contracts Regulations."}
            {days === 7 && " One week is a common notice period for casual employment and the standard timeframe for many delivery estimates."}
            {days === 180 && " Six months is often used for passport renewal lead times, fixed-rate savings account terms, and some tenancy agreement break clauses."}
            {days === 365 && " That's exactly one year from now — useful for annual subscription renewals, fixed-term contracts, and savings maturity dates."}
            {days === 45 && " Forty-five days crops up in property transactions — it's a common completion timeframe after exchange of contracts."}
            {days === 21 && " Three weeks is the standard notice period for many UK employment contracts and the timeframe for some HMRC responses."}
            {days === 100 && " A hundred days is sometimes used as a milestone marker for projects and the traditional benchmark for a new government's first actions."}
            {![7,14,21,30,45,60,90,100,180,365].includes(days) && ` That's ${result.weeks > 0 ? `${result.weeks} weeks and ${result.remainder} days` : `${days} days`} from now.`}
          </p>
        </div>

        {/* Quick links to related pages */}
        <div className="mb-12">
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4">Other popular date calculations</p>
          <div className="flex flex-wrap gap-2">
            {RELATED_DAYS.filter(d => d !== days).map(d => (
              <Link
                key={d}
                to={`/misc/days-from-today/${d}`}
                className="px-4 py-2 border border-white/10 font-heading text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                {d} days
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ for this specific number */}
        <div className="border border-white/10 bg-white/[0.02] p-6 mb-8">
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-white/65 mb-4">Frequently Asked</p>
          <div className="space-y-4">
            <div>
              <p className="text-white/75 text-sm font-heading uppercase tracking-wider mb-1">What is {days} days from today?</p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {days} days from today is {answer}. This calculation counts {days} calendar days starting from {formatLong(result.today)}, including weekends and bank holidays.
              </p>
            </div>
            <div>
              <p className="text-white/75 text-sm font-heading uppercase tracking-wider mb-1">How many weeks is {days} days?</p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {days} days is {result.weeks} week{result.weeks !== 1 ? "s" : ""}{result.remainder > 0 ? ` and ${result.remainder} day${result.remainder !== 1 ? "s" : ""}` : ""}.
                {days > 28 && ` That's roughly ${(days / 30.44).toFixed(1)} months.`}
              </p>
            </div>
          </div>
        </div>

        {/* Use the main calculator link */}
        <div className="text-center mb-8">
          <Link
            to="/misc/days-from-today"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 font-heading text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            Open Full Days Calculator <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <FinancialDisclosure variant="general" />

      <footer className="bg-black border-t border-white/10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="font-display text-2xl tracking-widest text-white uppercase">Calculator Page</span>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">© 2026 The Calculator Page.</p>
        </div>
      </footer>
    </div>
  );
}
