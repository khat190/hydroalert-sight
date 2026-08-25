import type { AnalysisResponse } from "@/types/hydrosat";
import { Panel, PanelHeader, Row, StatusDot } from "./Panel";
import { RiskCard } from "./RiskCard";
import { ConfidenceCard } from "./ConfidenceCard";
import { EvidenceCard } from "./EvidenceCard";
import { UncertaintyPanel } from "./UncertaintyPanel";
import { HistoricalReference } from "./HistoricalReference";
import { SystemStatus } from "./SystemStatus";
import { FallbackBadge } from "./FallbackBadge";

export function Sidebar({
  data,
  onOpenEvidence,
}: {
  data: AnalysisResponse;
  onOpenEvidence: () => void;
}) {
  const { observation } = data;

  return (
    <aside className="flex h-full w-full shrink-0 flex-col overflow-y-auto border-r border-border bg-sidebar lg:w-[340px]">
      <header className="border-b border-border px-3.5 py-3">
        <h1 className="text-sm font-semibold tracking-[0.14em] text-foreground">HYDROSAT-EDGE</h1>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Satellite-to-Decision Water Intelligence
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <StatusDot tone="ok" />
          <span className="text-[11px] uppercase tracking-[0.09em] text-foreground/80">
            Monitoring
          </span>
        </div>
      </header>

      <div className="space-y-3 p-3">
        {observation.mode === "FALLBACK" ? <FallbackBadge /> : null}

        <Panel>
          <PanelHeader title="Monitoring location" />
          <div className="px-3.5 py-3">
            <div className="text-base leading-tight text-foreground">
              {observation.locationName}
            </div>
            <div className="text-xs text-muted-foreground">{observation.region}</div>
            <div className="mt-2 divide-y divide-border/60">
              <Row label="Observation" value={observation.observedOn} />
              <Row label="Source" value={observation.source} mono={false} />
              <Row label="Observation quality" value={observation.quality} />
            </div>
          </div>
        </Panel>

        <RiskCard level={data.risk.level} anomalyLabel={data.anomaly.label} />
        <ConfidenceCard confidence={data.confidence} />
        <EvidenceCard
          evidence={data.evidence}
          quality={observation.quality}
          onOpen={onOpenEvidence}
        />
        <UncertaintyPanel confidence={data.confidence} />
        <HistoricalReference deviations={data.evidence.deviations} />
        <SystemStatus items={data.systemStatus} />
      </div>
    </aside>
  );
}
