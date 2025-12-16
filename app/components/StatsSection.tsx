import type { Book } from "@/lib/types";
import type { BookStats } from "@/lib/books";
import { formatMonthLabel } from "@/lib/utils";
import { BarChart } from "./BarChart";

interface StatsSectionProps {
  stats: BookStats;
  monthGroups: Record<number, Book[]>;
  books: Book[];
}

export function StatsSection({ stats, monthGroups, books }: StatsSectionProps) {
  const genreData = stats.topGenres.map((genre) => ({
    label: genre.label,
    value: genre.count,
  }));

  const monthlyData = Array.from({ length: 12 }, (_, index) => ({
    label: formatMonthLabel(index).slice(0, 3),
    value: (monthGroups[index] ?? []).length,
  }));

  const longestTitle = stats.longestBook?.title ?? "TBD";
  const shortestTitle = stats.shortestBook?.title ?? "TBD";
  const topAuthor = stats.topAuthors[0]?.label ?? "TBD";
  const fiveStarReads = books.filter((book) => book.rating === 5).length;

  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Stats</p>
        <h2 className="font-serif text-3xl text-stone-900">Deeper reading insights</h2>
        <p className="mt-2 text-sm text-stone-600">
          Genre love, monthly momentum, and a few fun facts drawn straight from the data.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-stone-900">Genre breakdown</h3>
          <p className="text-sm text-stone-600">Top shelves ranked by number of reads.</p>
          <div className="mt-4">
            <BarChart data={genreData} barColorClass="bg-amber-500" />
          </div>
        </div>
        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-stone-900">Books per month</h3>
          <p className="text-sm text-stone-600">A quick glance at when the pages were flying.</p>
          <div className="mt-4">
            <BarChart
              data={monthlyData}
              orientation="vertical"
              barColorClass="bg-stone-900"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FactCard label="Longest Book" value={longestTitle} />
        <FactCard label="Shortest Book" value={shortestTitle} />
        <FactCard label="Most Read Author" value={topAuthor} />
        <FactCard label="5★ Reads" value={fiveStarReads ? fiveStarReads.toString() : "TBD"} />
      </div>
    </section>
  );
}

interface FactCardProps {
  label: string;
  value: string;
}

function FactCard({ label, value }: FactCardProps) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{label}</p>
      <p className="mt-2 font-serif text-xl text-stone-900">{value}</p>
    </div>
  );
}
