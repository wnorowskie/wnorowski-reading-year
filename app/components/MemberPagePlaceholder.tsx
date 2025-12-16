import { notFound } from "next/navigation";
import { computeStats, getMemberById } from "@/lib/books";
import { formatNumber } from "@/lib/utils";

interface MemberPagePlaceholderProps {
  memberId: string;
}

export function MemberPagePlaceholder({ memberId }: MemberPagePlaceholderProps) {
  const member = getMemberById(memberId);
  if (!member) {
    notFound();
  }

  const stats = computeStats(member.books);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Preview</p>
        <h1 className="font-serif text-3xl text-stone-900">
          {member.name}&rsquo;s 2025 Reading Year
        </h1>
        <p className="mt-2 text-stone-600">
          Detailed summaries, book grids, and timelines are coming in Phase 3/4. For now,
          enjoy a quick look at {member.name}&rsquo;s cozy reading stats.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Books" value={stats.totalBooks.toString()} />
        <StatCard label="Pages" value={formatNumber(stats.totalPages)} />
        <StatCard
          label="Avg. Rating"
          value={stats.avgRating ? stats.avgRating.toFixed(2) : "—"}
        />
        <StatCard
          label="Top Genre"
          value={stats.topGenres[0]?.label ?? "TBD"}
        />
      </div>
      <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/60 p-6 text-sm text-stone-600">
        We will add the full book grid, monthly timeline, and genre breakdown for {member.name}
        in a later phase. These routes are ready so navigation can be built and tested now.
      </div>
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{label}</p>
      <p className="mt-2 font-serif text-2xl text-stone-900">{value}</p>
    </div>
  );
}
