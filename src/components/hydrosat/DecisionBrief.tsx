import type { DecisionBrief as DecisionBriefData } from "@/types/hydrosat";
import { Panel, PanelHeader } from "./Panel";
import { ActionList } from "./ActionList";

const STAGES = [
  { key: "observation", label: "Observation", caption: "What the satellite measured" },
  { key: "inference", label: "Inference", caption: "What the analytical engine concluded" },
  { key: "prediction", label: "Prediction", caption: "What the downstream model estimates" },
  {
    key: "recommendation",
    label: "Recommendation",
    caption: "What a human operator should investigate",
  },
] as const;

export function DecisionBrief({ brief }: { brief: DecisionBriefData }) {
  return (
    <Panel>
      <PanelHeader title="Decision brief" meta="Generated from structured evidence" />

      <div className="border-b border-border px-3.5 py-3">
        <div className="text-sm font-medium tracking-[0.06em] text-risk-high">
          {brief.headline}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-foreground/85">{brief.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.09em] text-muted-foreground">
            AI-generated from structured evidence
          </span>
          <span className="border border-risk-medium/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.09em] text-risk-medium">
            Human review required
          </span>
        </div>
      </div>

      <div className="px-3.5 pb-2 pt-3">
        <div className="label-caps mb-2">Recommended checks</div>
      </div>
      <ActionList items={brief.recommendedChecks} />

      <div className="px-3.5 pb-3 pt-3">
        <div className="label-caps mb-2">Decision chain</div>
        <ol className="space-y-2.5">
          {STAGES.map((stage, i) => (
            <li key={stage.key} className="border-l border-border pl-3">
              <div className="flex items-baseline gap-2">
                <span className="numeral text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] uppercase tracking-[0.09em] text-foreground">
                  {stage.label}
                </span>
                <span className="text-[10px] text-muted-foreground">{stage.caption}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-foreground/75">
                {brief[stage.key]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}
