interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  orientation?: "horizontal" | "vertical";
  barColorClass?: string;
}

export function BarChart({
  data,
  maxValue,
  orientation = "horizontal",
  barColorClass = "bg-amber-500",
}: BarChartProps) {
  if (!data.length) {
    return <p className="text-sm text-stone-500">No data yet.</p>;
  }

  const safeMax = Math.max(maxValue ?? Math.max(...data.map((item) => item.value)), 1);

  if (orientation === "vertical") {
    return (
      <div className="flex items-end gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center">
            <div className="flex h-32 w-full items-end rounded-t-2xl bg-amber-100/60">
              <div
                className={`${barColorClass} w-full rounded-t-2xl transition-all`}
                style={{ height: `${(item.value / safeMax) * 100}%` }}
                aria-label={`${item.label} bar with value ${item.value}`}
              />
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-stone-600">
              {item.label}
            </p>
            <p className="text-xs text-stone-500">{item.value}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span className="font-medium text-stone-800">{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-amber-100/70">
            <div
              className={`${barColorClass} h-full rounded-full transition-all`}
              style={{ width: `${(item.value / safeMax) * 100}%` }}
              aria-label={`${item.label} bar with value ${item.value}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
