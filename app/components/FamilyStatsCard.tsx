interface FamilyStatsCardProps {
  label: string;
  value: string;
  description?: string;
}

export function FamilyStatsCard({ label, value, description }: FamilyStatsCardProps) {
  return (
    <div className="rounded-2xl bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{label}</p>
      <p className="mt-3 font-serif text-3xl text-stone-900">{value}</p>
      {description ? <p className="mt-2 text-sm text-stone-600">{description}</p> : null}
    </div>
  );
}
