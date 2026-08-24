import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("border border-border bg-panel", className)}>{children}</section>
  );
}

export function PanelHeader({
  title,
  meta,
  action,
  className,
}: {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3 border-b border-border px-3.5 py-2.5",
        className,
      )}
    >
      <div className="flex min-w-0 items-baseline gap-2.5">
        <h2 className="label-caps text-foreground/80">{title}</h2>
        {meta ? <span className="truncate text-xs text-muted-foreground">{meta}</span> : null}
      </div>
      {action}
    </header>
  );
}

export function Row({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn("text-sm text-foreground", mono && "numeral")}>{value}</span>
    </div>
  );
}

export function Meter({ value }: { value: number | null }) {
  const pct = value === null ? 0 : Math.max(0, Math.min(100, value));
  return (
    <div className="h-1 w-full bg-secondary">
      <div className="h-full bg-primary/80" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function StatusDot({
  tone = "ok",
}: {
  tone?: "ok" | "warn" | "high" | "idle";
}) {
  const map: Record<string, string> = {
    ok: "bg-status-ok",
    warn: "bg-risk-medium",
    high: "bg-risk-high",
    idle: "bg-muted-foreground",
  };
  return <span className={cn("inline-block size-1.5 rounded-full", map[tone])} />;
}

export function riskTone(level: "HIGH" | "MEDIUM" | "LOW") {
  return level === "HIGH"
    ? { text: "text-risk-high", border: "border-risk-high/50", bg: "bg-risk-high/10" }
    : level === "MEDIUM"
      ? { text: "text-risk-medium", border: "border-risk-medium/50", bg: "bg-risk-medium/10" }
      : { text: "text-risk-low", border: "border-risk-low/50", bg: "bg-risk-low/10" };
}
