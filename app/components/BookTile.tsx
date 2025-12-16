import Image from "next/image";
import type { Book } from "@/lib/types";

interface BookTileProps {
  book: Book;
  showDetails?: boolean;
}

export function BookTile({ book, showDetails = true }: BookTileProps) {
  const ratingLabel = typeof book.rating === "number" ? `★ ${book.rating.toFixed(1)}` : null;

  return (
    <div className="flex flex-col"
      aria-label={`${book.title} by ${book.author}${ratingLabel ? `, rated ${ratingLabel}` : ""}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-stone-100 shadow-sm">
        <Image
          src={book.coverImageUrl}
          alt={`${book.title} cover`}
          width={320}
          height={480}
          className="h-auto w-full object-cover"
          sizes="(max-width: 640px) 50vw, 200px"
          unoptimized
        />
      </div>
      {showDetails && (
        <div className="mt-3 space-y-1">
          <p className="font-serif text-lg text-stone-900 line-clamp-2">{book.title}</p>
          <p className="text-sm text-stone-600">{book.author}</p>
          {ratingLabel && <p className="text-sm font-medium text-amber-700">{ratingLabel}</p>}
        </div>
      )}
    </div>
  );
}
