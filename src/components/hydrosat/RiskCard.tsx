import type { RiskLevel } from "@/types/hydrosat";
import { Panel, PanelHeader, riskTone } from "./Panel";
import { cn } from "@/lib/utils";

export function RiskCard({
  level,
  anomalyLabel,
}: {
  level: RiskLevel;
  anomalyLabel: string;
}) {
  const tone = riskTone(level);
  return (
    <Panel>
      <PanelHeader title="Current risk" meta="Downstream water risk" />
      <div className={cn("flex items-end justify-between px-3.5 py-4", tone.bg)}>
        <div>
          <div className={cn("text-4xl font-semibold leading-none tracking-tight", tone.text)}>
            {level}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{anomalyLabel}</p>
        </div>
        <div
          className={cn(
            "border px-2 py-1 text-[11px] uppercase tracking-[0.09em]",
            tone.border,
            tone.text,
          )}
        >
          Not validated
        </div>
      </div>
    </Panel>
  );
}
