import type { Deviation } from "@/types/hydrosat";
import { Panel, PanelHeader } from "./Panel";

export function HistoricalReference({ deviations }: { deviations: Deviation[] }) {
  const primary = deviations[0];
  const current = primary?.current ?? null;
  const reference = primary?.reference ?? null;
  const max = Math.max(current ?? 0, reference ?? 0, 0.0001);

  return (
    <Panel>
      <PanelHeader title="Historical reference" meta="Limited MVP baseline" />
      <div className="space-y-3 px-3.5 py-3">
        <Bar
          label="Current NDCI"
          value={current}
          pct={current === null ? 0 : (current / max) * 100}
          tone="bg-risk-high/70"
        />
        <Bar
          label="Reference NDCI"
          value={reference}
          pct={reference === null ? 0 : (reference / max) * 100}
          tone="bg-muted-foreground/50"
        />
        <div className="flex items-baseline justify-between border-t border-border/60 pt-2.5">
          <span className="text-xs text-muted-foreground">Deviation</span>
          <span className="numeral text-sm text-risk-high">
            {primary?.deviationPct === null || primary === undefined
              ? "—"
              : `${primary.deviationPct! > 0 ? "+" : ""}${primary.deviationPct}%`}
          </span>
        </div>
      </div>
      <p className="border-t border-border px-3.5 py-2 text-[10px] leading-relaxed text-muted-foreground">
        The MVP compares a single observation against a limited reference baseline. No extended
        time series is available.
      </p>
    </Panel>
  );
}

function Bar({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: number | null;
  pct: number;
  tone: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="numeral text-xs text-foreground/85">
          {value === null ? "—" : value.toFixed(4)}
        </span>
      </div>
      <div className="h-1.5 w-full bg-secondary">
        <div className={`h-full ${tone}`} style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
      </div>
    </div>
  );
}
