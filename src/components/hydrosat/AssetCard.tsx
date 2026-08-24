import { Droplet, Factory, Sprout, Users, Waves } from "lucide-react";
import type { Asset, AssetKind } from "@/types/hydrosat";
import { cn } from "@/lib/utils";
import { riskTone } from "./Panel";

export const ASSET_ICON: Record<AssetKind, typeof Droplet> = {
  INTAKE: Droplet,
  AGRICULTURE: Sprout,
  INDUSTRIAL: Factory,
  POPULATION: Users,
  RESERVOIR: Waves,
};

export const ASSET_KIND_LABEL: Record<AssetKind, string> = {
  INTAKE: "Water intake",
  AGRICULTURE: "Agricultural",
  INDUSTRIAL: "Industrial",
  POPULATION: "Population centre",
  RESERVOIR: "Reservoir",
};

export function AssetCard({
  asset,
  exposed,
  selected,
  onSelect,
}: {
  asset: Asset;
  exposed?: boolean | undefined;
  selected?: boolean | undefined;
  onSelect?: ((id: string) => void) | undefined;
}) {
  const Icon = ASSET_ICON[asset.kind];
  const tone = riskTone(asset.priority);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(asset.id)}
      className={cn(
        "w-full border-l-2 border-b border-border px-3.5 py-3 text-left transition-colors hover:bg-panel-raised",
        selected ? "bg-panel-raised" : "bg-transparent",
        asset.priority === "HIGH"
          ? "border-l-risk-high"
          : asset.priority === "MEDIUM"
            ? "border-l-risk-medium"
            : "border-l-risk-low",
      )}
    >
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm leading-snug text-foreground">{asset.name}</span>
            <span className={cn("shrink-0 text-[11px] uppercase tracking-[0.09em]", tone.text)}>
              {asset.priority}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span>{ASSET_KIND_LABEL[asset.kind]}</span>
            <span>
              ETA <span className="numeral text-foreground/80">{asset.etaWindow ?? "—"}</span>
            </span>
            {exposed ? (
              <span className="text-risk-high">In projected path at selected horizon</span>
            ) : null}
          </div>
          {asset.note ? (
            <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground/80">
              {asset.note}
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
}
