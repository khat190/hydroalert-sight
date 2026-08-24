/**
 * API-facing types.
 *
 * These mirror the structured JSON the FastAPI backend will return.
 * Components consume these types only — no calculations happen in the UI.
 */

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";
export type ConfidenceLabel = "HIGH" | "MODERATE" | "LOW";
export type QualityLabel = "GOOD" | "DEGRADED" | "POOR";
export type ObservationMode = "LIVE" | "FALLBACK";

export interface Observation {
  locationName: string;
  region: string;
  observedOn: string;
  source: string;
  quality: QualityLabel;
  mode: ObservationMode;
  center: [number, number];
}

export interface Indicator {
  key: string;
  label: string;
  value: number | null;
  unit?: string;
  precision?: number;
}

export interface Deviation {
  key: string;
  label: string;
  current: number | null;
  reference: number | null;
  deviationPct: number | null;
}

export interface Evidence {
  indicators: Indicator[];
  deviations: Deviation[];
  pixelCount: number | null;
  cloudCondition: string;
  observationDate: string;
  interpretation: string;
}

export interface Anomaly {
  detected: boolean;
  label: string;
  polygon: [number, number][];
  centroid: [number, number];
}

export interface ConfidenceComponent {
  key: string;
  label: string;
  score: number | null; // 0-100, backend supplied
}

export interface Confidence {
  score: number | null;
  label: ConfidenceLabel;
  components: ConfidenceComponent[];
  disclaimer: string;
}

export interface ForecastStep {
  key: string;
  label: string; // NOW, +6h ...
  hours: number;
  path: [number, number][];
  exposedAssetIds: string[];
}

export interface Forecast {
  flowRange: string;
  arrivalWindow: string;
  steps: ForecastStep[];
  chain: string[];
  note: string;
}

export type AssetKind =
  | "INTAKE"
  | "AGRICULTURE"
  | "INDUSTRIAL"
  | "POPULATION"
  | "RESERVOIR";

export interface Asset {
  id: string;
  name: string;
  kind: AssetKind;
  priority: RiskLevel;
  etaWindow: string | null;
  position: [number, number];
  note?: string;
}

export interface DecisionBrief {
  headline: string;
  summary: string;
  recommendedChecks: string[];
  observation: string;
  inference: string;
  prediction: string;
  recommendation: string;
}

export interface SystemStatusItem {
  key: string;
  label: string;
  state: "AVAILABLE" | "READY" | "DEGRADED" | "UNAVAILABLE";
}

export interface AnalysisResponse {
  observation: Observation;
  evidence: Evidence;
  anomaly: Anomaly;
  confidence: Confidence;
  forecast: Forecast;
  risk: { level: RiskLevel; label: string };
  assets: Asset[];
  decisionBrief: DecisionBrief;
  systemStatus: SystemStatusItem[];
}
