import { HeroSection } from "@/app/components/HeroSection";
import { FamilyStatsCard } from "@/app/components/FamilyStatsCard";
import { MemberCard } from "@/app/components/MemberCard";
import { familyReadingYear2025 } from "@/lib/data";
import { computeFamilyStats, getAllMembers } from "@/lib/books";
import { formatNumber } from "@/lib/utils";

export default function Home() {
  const members = getAllMembers();
  const stats = computeFamilyStats();
  const heroDescription =
    "A cozy keepsake celebrating Grace, Alexa, Mom, and Dad as they trade stories, recommend favorites, and cheer each other on.";

  const statCards = [
    {
      label: "Total Books",
      value: stats.totalBooks.toString(),
      description: "Stories finished across the whole family",
    },
    {
      label: "Total Pages",
      value: formatNumber(stats.totalPages),
      description: "Pages turned from January through December",
    },
    {
      label: "Top Reader",
      value: stats.topReader
        ? `${stats.topReader.name} (${stats.topReader.count})`
        : "TBD",
      description: "Most books finished this year",
    },
    {
      label: "Popular Genre",
      value: stats.topGenres[0]?.label ?? "TBD",
      description: "Shared favorite shelf",
    },
    {
      label: "Most Read Author",
      value: stats.topAuthors[0]?.label ?? "TBD",
      description: "The author everyone kept recommending",
    },
  ];

  return (
    <div className="space-y-12 pb-10">
      <HeroSection
        familyName={familyReadingYear2025.familyName}
        year={familyReadingYear2025.year}
        memberNames={members.map((member) => member.name)}
        description={heroDescription}
      />

      <section className="rounded-3xl border border-amber-100 bg-amber-50/60 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Family Snapshot</p>
            <h2 className="font-serif text-3xl text-stone-900">The year at a glance</h2>
          </div>
          <p className="text-sm text-stone-600">
            Pulled directly from the shared reading log for accuracy.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => (
            <FamilyStatsCard
              key={card.label}
              label={card.label}
              value={card.value}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Navigation</p>
            <h2 className="font-serif text-3xl text-stone-900">Meet the readers</h2>
          </div>
          <p className="text-sm text-stone-600">
            Jump into any member&rsquo;s page for their timeline, stats, and book grid.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
