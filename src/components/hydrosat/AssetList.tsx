import type { Asset } from "@/types/hydrosat";
import { Panel, PanelHeader } from "./Panel";
import { AssetCard } from "./AssetCard";

export function AssetList({
  assets,
  exposedIds,
  selectedId,
  onSelect,
}: {
  assets: Asset[];
  exposedIds: string[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  return (
    <Panel>
      <PanelHeader
        title="Potentially affected assets"
        meta={`${assets.length} in monitored corridor`}
      />
      <div>
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            exposed={exposedIds.includes(asset.id)}
            selected={selectedId === asset.id}
            onSelect={onSelect}
          />
        ))}
      </div>
      <p className="px-3.5 py-2 text-[10px] leading-relaxed text-muted-foreground">
        Asset registry is prototype demonstration data. Operational deployments load the
        authority&apos;s own asset inventory.
      </p>
    </Panel>
  );
}
