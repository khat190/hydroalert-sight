import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components/hydrosat/Dashboard";
import { LoadingState } from "@/components/hydrosat/LoadingState";
import { ErrorState } from "@/components/hydrosat/ErrorState";
import {
  MOCK_ANALYSIS,
  MOCK_FALLBACK_ANALYSIS,
  MOCK_WATER_BODY,
  PROCESSING_STAGES,
} from "@/data/mock-analysis";
import type { AnalysisResponse } from "@/types/hydrosat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HydroSat-Edge — Satellite-to-Decision Water Intelligence" },
      {
        name: "description",
        content:
          "Environmental intelligence command center converting Sentinel-2 observations into evidence, uncertainty, downstream forecast and human-reviewable decisions for Lake Elsinore.",
      },
      { property: "og:title", content: "HydroSat-Edge — Water Risk Command Center" },
      {
        property: "og:description",
        content:
          "Sentinel-2 spectral anomaly evidence, system confidence, downstream exposure forecast and operator decision brief for Lake Elsinore, Southern California.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Phase = "PROCESSING" | "READY" | "ERROR";

function Index() {
  const [phase, setPhase] = useState<Phase>("PROCESSING");
  const [stage, setStage] = useState(0);
  const [data, setData] = useState<AnalysisResponse>(MOCK_ANALYSIS);

  // Interface-only staging of the processing screen. No polling, no live feed.
  useEffect(() => {
    if (phase !== "PROCESSING") return;
    if (stage >= PROCESSING_STAGES.length) {
      const done = window.setTimeout(() => setPhase("READY"), 280);
      return () => window.clearTimeout(done);
    }
    const next = window.setTimeout(() => setStage((s) => s + 1), 420);
    return () => window.clearTimeout(next);
  }, [phase, stage]);

  if (phase === "PROCESSING") {
    return <LoadingState stages={PROCESSING_STAGES} activeStage={stage} />;
  }

  if (phase === "ERROR") {
    return (
      <ErrorState
        onUseFallback={() => {
          setData(MOCK_FALLBACK_ANALYSIS);
          setPhase("READY");
        }}
        onRetry={() => {
          setStage(0);
          setPhase("PROCESSING");
        }}
      />
    );
  }

  return <Dashboard data={data} waterBody={MOCK_WATER_BODY} />;
}
