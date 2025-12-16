import type { Book } from "@/lib/types";
import { BookTile } from "./BookTile";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Book Grid</p>
        <h2 className="font-serif text-3xl text-stone-900">Every cover in one place</h2>
        <p className="mt-2 text-sm text-stone-600">
          Scroll through the full shelf—hover for authors and ratings.
        </p>
      </div>
      {books.length ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((book) => (
            <BookTile key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/60 p-6 text-sm text-stone-600">
          No books recorded yet. Once the data is filled in, covers will appear here automatically.
        </div>
      )}
    </section>
  );
}
