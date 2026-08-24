import type { SystemStatusItem } from "@/types/hydrosat";
import { Panel, PanelHeader, StatusDot } from "./Panel";

const TONE: Record<SystemStatusItem["state"], "ok" | "warn" | "high"> = {
  AVAILABLE: "ok",
  READY: "ok",
  DEGRADED: "warn",
  UNAVAILABLE: "high",
};

export function SystemStatus({ items }: { items: SystemStatusItem[] }) {
  return (
    <Panel>
      <PanelHeader title="System status" meta="Interface state" />
      <ul className="divide-y divide-border/60">
        {items.map((item) => (
          <li key={item.key} className="flex items-center justify-between px-3.5 py-2">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="flex items-center gap-2 text-[11px] tracking-wide text-foreground/85">
              <StatusDot tone={TONE[item.state]} />
              {item.state.charAt(0) + item.state.slice(1).toLowerCase()}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
