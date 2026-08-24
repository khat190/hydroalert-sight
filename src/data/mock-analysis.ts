/**
 * MOCK DATA — VISUAL DEVELOPMENT ONLY.
 *
 * Every value below is a placeholder for a field the FastAPI backend will
 * return. Nothing here is computed by the frontend. Delete this file once the
 * real `/analysis` response is wired in; the components take the same shape.
 */

import type { AnalysisResponse } from "@/types/hydrosat";

export const MOCK_ANALYSIS: AnalysisResponse = {
  observation: {
    locationName: "Lake Elsinore",
    region: "Southern California",
    observedOn: "26 Aug 2022",
    source: "Sentinel-2 L2A",
    quality: "GOOD",
    mode: "LIVE",
    center: [33.6603, -117.3428],
  },
  evidence: {
    indicators: [
      { key: "ndci", label: "NDCI", value: 0.4952, precision: 4 },
      { key: "ndvi", label: "NDVI", value: 0.312, precision: 4 },
      { key: "turbidity", label: "Turbidity ratio", value: 1.28, precision: 2 },
    ],
    deviations: [
      {
        key: "ndci",
        label: "NDCI vs reference",
        current: 0.4952,
        reference: 0.4197,
        deviationPct: 18,
      },
    ],
    pixelCount: 46088,
    cloudCondition: "Clear over water body",
    observationDate: "26 Aug 2022",
    interpretation:
      "Elevated spectral signature consistent with abnormal algal or suspended-material activity. Requires field verification before any operational conclusion.",
  },
  anomaly: {
    detected: true,
    label: "Anomaly detected",
    centroid: [33.6672, -117.3506],
    polygon: [
      [33.6789, -117.3661],
      [33.6741, -117.3399],
      [33.6598, -117.3298],
      [33.6472, -117.3376],
      [33.6501, -117.3603],
      [33.6652, -117.3712],
    ],
  },
  confidence: {
    score: 71,
    label: "MODERATE",
    components: [
      { key: "image_quality", label: "Image quality", score: 84 },
      { key: "spectral_agreement", label: "Spectral agreement", score: 72 },
      { key: "historical_coverage", label: "Historical coverage", score: 58 },
      { key: "flow_data_quality", label: "Flow data quality", score: 64 },
    ],
    disclaimer:
      "This is a transparent system confidence score, not a validated statistical probability.",
  },
  forecast: {
    flowRange: "0.8–1.1 km/h",
    arrivalWindow: "16–22 hours",
    note: "Estimated — not guaranteed",
    chain: ["Anomaly", "River / outflow", "Downstream asset"],
    steps: [
      {
        key: "now",
        label: "NOW",
        hours: 0,
        path: [[33.6672, -117.3506]],
        exposedAssetIds: [],
      },
      {
        key: "h6",
        label: "+6h",
        hours: 6,
        path: [
          [33.6672, -117.3506],
          [33.6795, -117.3684],
        ],
        exposedAssetIds: [],
      },
      {
        key: "h12",
        label: "+12h",
        hours: 12,
        path: [
          [33.6672, -117.3506],
          [33.6795, -117.3684],
          [33.6961, -117.3922],
        ],
        exposedAssetIds: ["temescal-checkpoint"],
      },
      {
        key: "h18",
        label: "+18h",
        hours: 18,
        path: [
          [33.6672, -117.3506],
          [33.6795, -117.3684],
          [33.6961, -117.3922],
          [33.7148, -117.4304],
        ],
        exposedAssetIds: ["temescal-checkpoint", "lee-lake-intake"],
      },
      {
        key: "h24",
        label: "+24h",
        hours: 24,
        path: [
          [33.6672, -117.3506],
          [33.6795, -117.3684],
          [33.6961, -117.3922],
          [33.7148, -117.4304],
          [33.7622, -117.4901],
        ],
        exposedAssetIds: [
          "temescal-checkpoint",
          "lee-lake-intake",
          "temescal-valley-agri",
        ],
      },
      {
        key: "h36",
        label: "+36h",
        hours: 36,
        path: [
          [33.6672, -117.3506],
          [33.6795, -117.3684],
          [33.6961, -117.3922],
          [33.7148, -117.4304],
          [33.7622, -117.4901],
          [33.8351, -117.5688],
          [33.8886, -117.6453],
        ],
        exposedAssetIds: [
          "temescal-checkpoint",
          "lee-lake-intake",
          "temescal-valley-agri",
          "prado-dam",
          "corona-industrial",
        ],
      },
    ],
  },
  risk: { level: "HIGH", label: "Current risk" },
  assets: [
    {
      id: "lee-lake-intake",
      name: "Lee Lake / Dawson Canyon Intake",
      kind: "INTAKE",
      priority: "HIGH",
      etaWindow: "16–22 hours",
      position: [33.7148, -117.4304],
      note: "Prototype demo asset — location and role are demonstration assumptions.",
    },
    {
      id: "prado-dam",
      name: "Prado Dam / Santa Ana River Confluence",
      kind: "RESERVOIR",
      priority: "MEDIUM",
      etaWindow: "29–40 hours",
      position: [33.8886, -117.6453],
      note: "Prototype demo asset — location and role are demonstration assumptions.",
    },
    {
      id: "temescal-valley-agri",
      name: "Temescal Valley Irrigation Offtake",
      kind: "AGRICULTURE",
      priority: "MEDIUM",
      etaWindow: "24–33 hours",
      position: [33.7622, -117.4901],
      note: "Prototype demo asset.",
    },
    {
      id: "corona-industrial",
      name: "Corona Industrial Water Users",
      kind: "INDUSTRIAL",
      priority: "LOW",
      etaWindow: "34–46 hours",
      position: [33.8351, -117.5688],
      note: "Prototype demo asset.",
    },
    {
      id: "temescal-checkpoint",
      name: "Temescal Wash Population Corridor",
      kind: "POPULATION",
      priority: "LOW",
      etaWindow: "10–14 hours",
      position: [33.6961, -117.3922],
      note: "Prototype demo asset.",
    },
  ],
  decisionBrief: {
    headline: "HIGH PRIORITY WATCH",
    summary:
      "An unusual water spectral signature was detected upstream with moderate system confidence. A downstream asset may be exposed within the estimated arrival window.",
    recommendedChecks: [
      "Increase sampling frequency.",
      "Inspect downstream checkpoint conditions.",
      "Review relevant intake contingency procedures.",
    ],
    observation:
      "Sentinel-2 L2A scene over Lake Elsinore, 26 Aug 2022, returned usable water pixels with clear conditions.",
    inference:
      "Spectral indicators deviate from the reference baseline in a pattern associated with abnormal algal or suspended-material activity.",
    prediction:
      "Downstream transport model places the leading edge near the first intake asset inside the estimated arrival window.",
    recommendation:
      "An operator should verify by sampling and confirm intake contingency readiness before any public action.",
  },
  systemStatus: [
    { key: "satellite", label: "Satellite data", state: "AVAILABLE" },
    { key: "analysis", label: "Analysis engine", state: "READY" },
    { key: "forecast", label: "Forecast engine", state: "READY" },
    { key: "decision", label: "Decision engine", state: "READY" },
    { key: "fallback", label: "Fallback dataset", state: "AVAILABLE" },
  ],
};

/** Same observation, flagged as the verified archived fallback scene. */
export const MOCK_FALLBACK_ANALYSIS: AnalysisResponse = {
  ...MOCK_ANALYSIS,
  observation: { ...MOCK_ANALYSIS.observation, mode: "FALLBACK" },
};

/** Approximate shoreline outline used only to make the lake legible on the map. */
export const MOCK_WATER_BODY: [number, number][] = [
  [33.6871, -117.3746],
  [33.6802, -117.3489],
  [33.6688, -117.3311],
  [33.6531, -117.3247],
  [33.6402, -117.3369],
  [33.6389, -117.3574],
  [33.6512, -117.3742],
  [33.6698, -117.3841],
];

export const PROCESSING_STAGES = [
  "Retrieving satellite observation",
  "Extracting spectral bands",
  "Detecting anomaly",
  "Calculating confidence",
  "Estimating downstream exposure",
  "Generating decision brief",
];
