import type { Confidence } from "@/types/hydrosat";
import { Panel, PanelHeader, Meter } from "./Panel";

export function ConfidenceCard({ confidence }: { confidence: Confidence }) {
  return (
    <Panel>
      <PanelHeader title="System confidence" />
      <div className="px-3.5 py-3">
        <div className="flex items-baseline gap-3">
          <span className="numeral text-3xl font-semibold leading-none text-foreground">
            {confidence.score === null ? "—" : `${confidence.score}%`}
          </span>
          <span className="text-sm tracking-wide text-muted-foreground">{confidence.label}</span>
        </div>
        <div className="mt-3">
          <Meter value={confidence.score} />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          System confidence — not a validated probability.
        </p>
      </div>
    </Panel>
  );
}
