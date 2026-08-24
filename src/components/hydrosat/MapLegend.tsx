const ITEMS: { label: string; swatch: React.ReactNode }[] = [
  {
    label: "Anomaly",
    swatch: <span className="block size-3 border border-anomaly bg-anomaly/40" />,
  },
  {
    label: "Predicted movement",
    swatch: (
      <span className="block h-0 w-3 border-t-2 border-dashed border-primary" aria-hidden />
    ),
  },
  {
    label: "High-risk asset",
    swatch: <span className="block size-3 rotate-45 border-2 border-risk-high" />,
  },
  {
    label: "Medium-risk asset",
    swatch: <span className="block size-3 border-2 border-risk-medium" />,
  },
  {
    label: "Low-risk asset",
    swatch: <span className="block size-3 rounded-full border-2 border-risk-low" />,
  },
  {
    label: "Observation area",
    swatch: <span className="block size-3 border border-dashed border-foreground/50" />,
  },
];

export function MapLegend() {
  return (
    <div className="pointer-events-auto border border-border bg-panel/95 px-3 py-2.5 backdrop-blur-sm">
      <div className="label-caps mb-2">Legend</div>
      <ul className="space-y-1.5">
        {ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-[11px] text-foreground/80">
            <span className="flex w-4 justify-center">{item.swatch}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
