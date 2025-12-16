import Image from "next/image";
import type { Book } from "@/lib/types";
import { formatMonthLabel } from "@/lib/utils";

interface MonthGroupProps {
  month: number;
  books: Book[];
  showEmpty?: boolean;
}

export function MonthGroup({ month, books, showEmpty = false }: MonthGroupProps) {
  if (!books.length && !showEmpty) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-100 bg-white/80 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{formatMonthLabel(month)}</p>
          <p className="font-serif text-2xl text-stone-900">{books.length || 0} books</p>
        </div>
      </div>
      {books.length ? (
        <div className="mt-4 space-y-3">
          {books.map((book) => (
            <div key={book.id} className="flex gap-3 rounded-2xl bg-amber-50/70 p-3">
              <div className="relative h-16 w-12 overflow-hidden rounded-xl border border-amber-100">
                <Image
                  src={book.coverImageUrl}
                  alt={`${book.title} cover`}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium text-stone-900 line-clamp-1">{book.title}</p>
                <p className="text-stone-600">{book.author}</p>
                {typeof book.rating === "number" && (
                  <p className="text-amber-700">★ {book.rating.toFixed(1)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 p-3 text-sm text-stone-600">
          No books finished this month—maybe a busy season or time spent recommending reads to the family.
        </p>
      )}
    </div>
  );
}
