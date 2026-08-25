import { Suspense, lazy, useEffect, useState } from "react";
import type { Anomaly, Asset, ForecastStep, Observation } from "@/types/hydrosat";
import { MapLegend } from "./MapLegend";

const MapCanvas = lazy(() => import("./MapCanvas"));

export function MapPanel({
  observation,
  anomaly,
  waterBody,
  assets,
  activeStep,
  selectedAssetId,
  onSelectAsset,
}: {
  observation: Observation;
  anomaly: Anomaly;
  waterBody: [number, number][];
  assets: Asset[];
  activeStep: ForecastStep | undefined;
  selectedAssetId: string | null;
  onSelectAsset: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative size-full border border-border bg-panel">
      {mounted ? (
        <Suspense fallback={<MapFallback />}>
          <MapCanvas
            observation={observation}
            anomaly={anomaly}
            waterBody={waterBody}
            assets={assets}
            activeStep={activeStep}
            selectedAssetId={selectedAssetId}
            onSelectAsset={onSelectAsset}
          />
        </Suspense>
      ) : (
        <MapFallback />
      )}

      <div className="pointer-events-none absolute left-3 top-3 z-[500] border border-border bg-panel/95 px-3 py-2 backdrop-blur-sm">
        <div className="label-caps">Scene</div>
        <div className="mt-0.5 text-xs text-foreground">
          {observation.locationName}, {observation.region}
        </div>
        <div className="numeral mt-0.5 text-[11px] text-muted-foreground">
          {observation.source} · {observation.observedOn}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 z-[500]">
        <MapLegend />
      </div>
    </div>
  );
}

function MapFallback() {
  return (
    <div className="flex size-full items-center justify-center bg-background/60">
      <span className="label-caps">Initialising map surface</span>
    </div>
  );
}
