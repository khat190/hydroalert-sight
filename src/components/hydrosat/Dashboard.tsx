import { useMemo, useState } from "react";
import type { AnalysisResponse } from "@/types/hydrosat";
import { Sidebar } from "./Sidebar";
import { MapPanel } from "./MapPanel";
import { ForecastPanel } from "./ForecastPanel";
import { AssetList } from "./AssetList";
import { DecisionBrief } from "./DecisionBrief";
import { EvidencePanel } from "./EvidencePanel";

export function Dashboard({
  data,
  waterBody,
}: {
  data: AnalysisResponse;
  waterBody: [number, number][];
}) {
  const [horizon, setHorizon] = useState(3);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const activeStep = data.forecast.steps[horizon];
  const exposedIds = useMemo(() => activeStep?.exposedAssetIds ?? [], [activeStep]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background lg:h-screen lg:flex-row lg:overflow-hidden">
      <Sidebar data={data} onOpenEvidence={() => setEvidenceOpen(true)} />

      <main className="flex min-w-0 flex-1 flex-col gap-3 p-3">
        <div className="h-[60vh] min-h-[380px] flex-1">
          <MapPanel
            observation={data.observation}
            anomaly={data.anomaly}
            waterBody={waterBody}
            assets={data.assets}
            activeStep={activeStep}
            selectedAssetId={selectedAssetId}
            onSelectAsset={setSelectedAssetId}
          />
        </div>

        <ForecastPanel
          forecast={data.forecast}
          activeIndex={horizon}
          onHorizonChange={setHorizon}
        />
      </main>

      <aside className="w-full shrink-0 space-y-3 overflow-y-auto border-l border-border bg-sidebar p-3 lg:w-[360px]">
        <DecisionBrief brief={data.decisionBrief} />
        <AssetList
          assets={data.assets}
          exposedIds={exposedIds}
          selectedId={selectedAssetId}
          onSelect={setSelectedAssetId}
        />
      </aside>

      <EvidencePanel
        open={evidenceOpen}
        evidence={data.evidence}
        onClose={() => setEvidenceOpen(false)}
      />
    </div>
  );
}
