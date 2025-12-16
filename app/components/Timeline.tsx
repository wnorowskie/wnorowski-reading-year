import type { Book } from "@/lib/types";
import { MonthGroup } from "./MonthGroup";

interface TimelineProps {
  monthGroups: Record<number, Book[]>;
  showEmptyMonths?: boolean;
}

export function Timeline({ monthGroups, showEmptyMonths = false }: TimelineProps) {
  const months = Array.from({ length: 12 }, (_, index) => index);
  const hasBooks = months.some((month) => (monthGroups[month] ?? []).length);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Timeline</p>
        <h2 className="font-serif text-3xl text-stone-900">Reading pace across the year</h2>
        <p className="mt-2 text-sm text-stone-600">
          Follow the ebb and flow of reading moods as months speed up or slow down.
        </p>
      </div>
      {hasBooks ? (
        <div className="grid gap-4 md:grid-cols-2">
          {months.map((month) => (
            <MonthGroup
              key={month}
              month={month}
              books={monthGroups[month] ?? []}
              showEmpty={showEmptyMonths}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/60 p-6 text-sm text-stone-600">
          No reading dates yet. Once dates are provided, this section will instantly show when books were finished.
        </div>
      )}
      {!showEmptyMonths && (
        <p className="text-xs text-stone-500">
          Want to see quieter months as well? Toggle the <code>showEmptyMonths</code> prop when invoking the
          component.
        </p>
      )}
    </section>
  );
}
