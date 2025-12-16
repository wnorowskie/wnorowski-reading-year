import type { FamilyMember } from "@/lib/types";
import type { BookStats } from "@/lib/books";
import { formatNumber } from "@/lib/utils";

interface MemberSummaryProps {
  member: FamilyMember;
  stats: BookStats;
}

export function MemberSummary({ member, stats }: MemberSummaryProps) {
  const highlightStats = [
    { label: "Books Read", value: stats.totalBooks.toString() },
    { label: "Total Pages", value: formatNumber(stats.totalPages) },
    {
      label: "Average Rating",
      value: typeof stats.avgRating === "number" ? stats.avgRating.toFixed(2) : "—",
    },
  ];

  const topGenres = stats.topGenres.slice(0, 3);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-md">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Summary</p>
      <h1 className="mt-2 font-serif text-4xl text-stone-900">
        {member.name}&rsquo;s 2025 Reading Year
      </h1>
      <p className="mt-3 text-stone-600">
        A cozy snapshot of everything {member.name} finished this year—perfect for reminiscing over
        favorite characters and plotting next year&rsquo;s TBR.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {highlightStats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{item.label}</p>
            <p className="mt-2 font-serif text-3xl text-stone-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Top Genres</p>
        {topGenres.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {topGenres.map((genre) => (
              <span
                key={genre.label}
                className="rounded-full bg-stone-900/90 px-4 py-1 text-sm font-medium text-amber-50"
              >
                {genre.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-stone-600">Genre breakdown coming soon.</p>
        )}
      </div>
    </section>
  );
}
