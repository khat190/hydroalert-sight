import type { Confidence } from "@/types/hydrosat";
import { Panel, PanelHeader, Meter } from "./Panel";

export function UncertaintyPanel({ confidence }: { confidence: Confidence }) {
  return (
    <Panel>
      <PanelHeader title="Uncertainty" meta="Confidence components" />
      <div className="space-y-3 px-3.5 py-3">
        {confidence.components.map((c) => (
          <div key={c.key}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">{c.label}</span>
              <span className="numeral text-xs text-foreground/85">
                {c.score === null ? "—" : `${c.score}%`}
              </span>
            </div>
            <Meter value={c.score} />
          </div>
        ))}
      </div>
      <div className="border-t border-border px-3.5 py-2.5">
        <div className="flex items-baseline justify-between">
          <span className="label-caps">Confidence</span>
          <span className="text-xs tracking-wide text-foreground">{confidence.label}</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          {confidence.disclaimer}
        </p>
      </div>
    </Panel>
  );
}
