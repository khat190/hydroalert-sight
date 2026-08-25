import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({
  stages,
  activeStage,
}: {
  stages: string[];
  activeStage: number;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md border border-border bg-panel">
        <header className="border-b border-border px-5 py-3">
          <h1 className="text-sm font-medium tracking-[0.06em] text-foreground">
            HYDROSAT-EDGE
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Processing satellite observation — Lake Elsinore, 26 Aug 2022
          </p>
        </header>
        <ol className="divide-y divide-border/60">
          {stages.map((stage, i) => {
            const done = i < activeStage;
            const running = i === activeStage;
            return (
              <li key={stage} className="flex items-center gap-3 px-5 py-2.5">
                <span className="flex size-4 items-center justify-center">
                  {done ? (
                    <Check className="size-3.5 text-status-ok" />
                  ) : running ? (
                    <Loader2 className="size-3.5 animate-spin text-primary" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    done || running ? "text-foreground/85" : "text-muted-foreground/60",
                  )}
                >
                  {stage}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="border-t border-border px-5 py-2.5 text-[10px] leading-relaxed text-muted-foreground">
          Batch processing of a periodic Sentinel-2 scene. This is not a live satellite stream.
        </p>
      </div>
    </div>
  );
}
