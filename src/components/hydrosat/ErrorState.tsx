import { AlertTriangle } from "lucide-react";

export function ErrorState({
  onUseFallback,
  onRetry,
}: {
  onUseFallback: () => void;
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md border border-border bg-panel">
        <header className="flex items-center gap-2.5 border-b border-border px-5 py-3">
          <AlertTriangle className="size-4 text-risk-medium" />
          <h1 className="text-sm font-medium tracking-wide text-foreground">
            Observation unavailable
          </h1>
        </header>
        <div className="px-5 py-4">
          <p className="text-xs leading-relaxed text-foreground/80">
            Live satellite data could not be retrieved. The system can use a verified fallback
            observation.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onUseFallback}
              className="border border-ring bg-panel-raised px-3 py-2 text-xs tracking-wide text-foreground transition-colors hover:bg-secondary"
            >
              Use verified fallback
            </button>
            <button
              type="button"
              onClick={onRetry}
              className="border border-border px-3 py-2 text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Retry retrieval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
