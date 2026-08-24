import type { Evidence, QualityLabel } from "@/types/hydrosat";
import { Panel, PanelHeader, Row } from "./Panel";

function fmt(value: number | null, precision = 4) {
  return value === null ? "—" : value.toFixed(precision);
}

export function EvidenceCard({
  evidence,
  quality,
  onOpen,
}: {
  evidence: Evidence;
  quality: QualityLabel;
  onOpen: () => void;
}) {
  const ndci = evidence.indicators.find((i) => i.key === "ndci");
  const deviation = evidence.deviations[0]?.deviationPct ?? null;

  return (
    <Panel>
      <PanelHeader title="What changed?" meta="Observed evidence" />
      <div className="divide-y divide-border/60 px-3.5 py-1">
        <Row label="NDCI" value={fmt(ndci?.value ?? null, ndci?.precision ?? 4)} />
        <Row
          label="Historical deviation"
          value={deviation === null ? "—" : `${deviation > 0 ? "+" : ""}${deviation}%`}
        />
        <Row
          label="Water pixels"
          value={evidence.pixelCount === null ? "—" : evidence.pixelCount.toLocaleString("en-US")}
        />
        <Row label="Observation quality" value={quality} />
      </div>
      <div className="border-t border-border p-2.5">
        <button
          type="button"
          onClick={onOpen}
          className="w-full border border-border bg-panel-raised px-3 py-2 text-xs tracking-wide text-foreground transition-colors hover:border-ring hover:bg-secondary"
        >
          View evidence
        </button>
      </div>
    </Panel>
  );
}
