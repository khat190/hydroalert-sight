export function ActionList({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-border/60 border-y border-border/60">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3 px-3.5 py-2">
          <span className="numeral text-[11px] text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-xs leading-relaxed text-foreground/85">{item}</span>
        </li>
      ))}
    </ol>
  );
}
