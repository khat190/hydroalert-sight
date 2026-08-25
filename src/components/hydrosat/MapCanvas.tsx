import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import type { Anomaly, Asset, ForecastStep, Observation } from "@/types/hydrosat";
import { ASSET_KIND_LABEL } from "./AssetCard";

const RISK_COLOR: Record<Asset["priority"], string> = {
  HIGH: "var(--risk-high)",
  MEDIUM: "var(--risk-medium)",
  LOW: "var(--risk-low)",
};

/** Shape differs per priority so status is never communicated by colour alone. */
function assetIcon(asset: Asset) {
  const color = RISK_COLOR[asset.priority];
  const shape =
    asset.priority === "HIGH"
      ? `transform:rotate(45deg);border-radius:0`
      : asset.priority === "MEDIUM"
        ? `border-radius:0`
        : `border-radius:9999px`;

  return L.divIcon({
    className: "hs-marker-label",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    html: `<span style="display:block;width:12px;height:12px;margin:2px;border:2px solid ${color};background:color-mix(in oklab, ${color} 28%, transparent);${shape}"></span>`,
  });
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length < 2) return;
    map.fitBounds(L.latLngBounds(points), { padding: [80, 80] });
  }, [map, points]);
  return null;
}

export interface MapCanvasProps {
  observation: Observation;
  anomaly: Anomaly;
  waterBody: [number, number][];
  assets: Asset[];
  activeStep: ForecastStep | undefined;
  selectedAssetId: string | null;
  onSelectAsset: (id: string) => void;
}

export default function MapCanvas({
  observation,
  anomaly,
  waterBody,
  assets,
  activeStep,
  selectedAssetId,
  onSelectAsset,
}: MapCanvasProps) {
  const path = activeStep?.path ?? [];
  const bounds: [number, number][] = [...waterBody, ...assets.map((a) => a.position)];

  return (
    <MapContainer
      center={observation.center}
      zoom={11}
      minZoom={8}
      zoomControl
      className="size-full"
      attributionControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <FitBounds points={bounds} />

      {/* Observation footprint */}
      <Polygon
        positions={waterBody}
        pathOptions={{
          color: "var(--foreground)",
          weight: 1,
          opacity: 0.45,
          dashArray: "4 4",
          fillColor: "var(--primary)",
          fillOpacity: 0.08,
        }}
      >
        <Tooltip sticky>Observation area — {observation.locationName}</Tooltip>
      </Polygon>

      {/* Anomaly extent, layered to read as a density surface */}
      {anomaly.detected ? (
        <>
          <Polygon
            positions={anomaly.polygon}
            pathOptions={{
              color: "var(--anomaly)",
              weight: 1,
              fillColor: "var(--anomaly)",
              fillOpacity: 0.18,
            }}
          />
          <CircleMarker
            center={anomaly.centroid}
            radius={34}
            pathOptions={{
              stroke: false,
              fillColor: "var(--anomaly)",
              fillOpacity: 0.16,
            }}
          />
          <CircleMarker
            center={anomaly.centroid}
            radius={18}
            pathOptions={{
              stroke: false,
              fillColor: "var(--anomaly)",
              fillOpacity: 0.3,
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -12]}>
              {anomaly.label}
            </Tooltip>
          </CircleMarker>
        </>
      ) : null}

      {/* Projected downstream movement at the selected horizon */}
      {path.length > 1 ? (
        <>
          <Polyline
            positions={path}
            pathOptions={{ color: "var(--primary)", weight: 3, opacity: 0.85, dashArray: "8 6" }}
          />
          <CircleMarker
            center={path[path.length - 1] as [number, number]}
            radius={5}
            pathOptions={{
              color: "var(--primary)",
              weight: 2,
              fillColor: "var(--background)",
              fillOpacity: 1,
            }}
          >
            <Tooltip direction="right" offset={[8, 0]}>
              Projected leading edge — {activeStep?.label}
            </Tooltip>
          </CircleMarker>
        </>
      ) : null}

      {assets.map((asset) => (
        <Marker
          key={asset.id}
          position={asset.position}
          icon={assetIcon(asset)}
          eventHandlers={{ click: () => onSelectAsset(asset.id) }}
        >
          <Tooltip
            direction="right"
            offset={[10, 0]}
            permanent={selectedAssetId === asset.id}
            opacity={1}
          >
            <span className="text-[11px]">
              {asset.name} — {ASSET_KIND_LABEL[asset.kind]} — {asset.priority}
            </span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
