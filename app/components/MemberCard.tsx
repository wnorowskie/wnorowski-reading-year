import Image from "next/image";
import Link from "next/link";
import { computeStats } from "@/lib/books";
import type { FamilyMember } from "@/lib/types";

interface MemberCardProps {
  member: FamilyMember;
}

export function MemberCard({ member }: MemberCardProps) {
  const stats = computeStats(member.books);
  const coverImages = member.books.slice(0, 3);
  const topGenre = stats.topGenres[0]?.label ?? "Genre coming soon";

  return (
    <Link
      href={`/${member.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{member.name}</p>
        <h3 className="mt-2 font-serif text-2xl text-stone-900">{stats.totalBooks} books in 2025</h3>
        <p className="mt-1 text-sm text-stone-600">Most reads in {topGenre}</p>
      </div>
      <div className="flex items-end gap-3">
        {coverImages.length ? (
          coverImages.map((book, index) => (
            <div
              key={book.id}
              className="relative h-24 w-16 overflow-hidden rounded-xl border border-amber-100 shadow-sm"
              style={{ marginLeft: index === 0 ? 0 : -12 }}
            >
              <Image
                src={book.coverImageUrl}
                alt={`${book.title} cover`}
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </div>
          ))
        ) : (
          <div className="h-24 flex-1 rounded-xl border border-dashed border-amber-200 bg-amber-50/50" />
        )}
      </div>
      <div className="text-sm text-amber-700">
        Explore {member.name}&rsquo;s reading year →
      </div>
    </Link>
  );
}
