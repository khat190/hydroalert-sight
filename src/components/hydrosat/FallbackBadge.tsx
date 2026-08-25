import { Archive } from "lucide-react";

export function FallbackBadge() {
  return (
    <div className="flex items-center gap-2 border border-risk-medium/40 bg-risk-medium/10 px-2.5 py-1.5">
      <Archive className="size-3.5 text-risk-medium" />
      <span className="text-[10px] uppercase tracking-[0.09em] text-risk-medium">
        Verified fallback observation
      </span>
    </div>
  );
}
