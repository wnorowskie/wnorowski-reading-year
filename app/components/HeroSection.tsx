interface HeroSectionProps {
  familyName: string;
  year: number;
  memberNames: string[];
  description: string;
}

export function HeroSection({ familyName, year, memberNames, description }: HeroSectionProps) {
  const highlights = [
    { label: "Year", value: year.toString() },
    { label: "Readers", value: `${memberNames.length} family members` },
    {
      label: "Featured",
      value: memberNames.join(" • "),
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-white p-6 shadow-md sm:p-10">
      <div className="grid gap-8 sm:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-700">Family Keepsake</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            The {familyName} Family Reading Year {year}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-700">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm text-stone-700"
              >
                <span className="font-semibold text-amber-700">{highlight.label}:</span>{" "}
                {highlight.value}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-6 top-6 hidden h-28 w-28 rounded-full bg-amber-200 blur-3xl sm:block" />
          <div className="absolute -left-4 bottom-4 hidden h-20 w-20 rounded-full bg-amber-300/60 blur-3xl sm:block" />
          <div className="relative rounded-2xl border border-amber-100 bg-white/90 p-6 text-sm text-stone-700 shadow-inner">
            <p className="font-serif text-lg text-stone-900">Why this matters</p>
            <p className="mt-3">
              Each page will celebrate a family member&rsquo;s reading journey—stats, timelines,
              favorite genres, and more. This home base keeps the whole story together.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-600">
              Explore each finished section below
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
