import { X } from "lucide-react";
import type { Evidence } from "@/types/hydrosat";
import { Row } from "./Panel";

function fmt(value: number | null, precision = 4) {
  return value === null ? "—" : value.toFixed(precision);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border px-5 py-4 first:border-t-0">
      <h3 className="label-caps mb-2">{title}</h3>
      {children}
    </div>
  );
}

export function EvidencePanel({
  open,
  evidence,
  onClose,
}: {
  open: boolean;
  evidence: Evidence;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-start justify-center bg-background/70 p-6 backdrop-blur-[2px]">
      <div className="mt-10 w-full max-w-2xl border border-border bg-panel shadow-2xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <h2 className="text-sm font-medium tracking-wide text-foreground">Evidence detail</h2>
            <p className="text-xs text-muted-foreground">
              Values supplied by the analysis service — not computed in this interface.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close evidence panel"
            className="border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto">
          <Section title="Spectral indicators">
            <div className="divide-y divide-border/60">
              {evidence.indicators.map((i) => (
                <Row key={i.key} label={i.label} value={fmt(i.value, i.precision ?? 4)} />
              ))}
            </div>
          </Section>

          <Section title="Historical comparison">
            <table className="w-full text-sm">
              <thead>
                <tr className="label-caps text-left">
                  <th className="py-1 font-medium">Indicator</th>
                  <th className="py-1 text-right font-medium">Current</th>
                  <th className="py-1 text-right font-medium">Reference</th>
                  <th className="py-1 text-right font-medium">Deviation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {evidence.deviations.map((d) => (
                  <tr key={d.key}>
                    <td className="py-2 text-xs text-muted-foreground">{d.label}</td>
                    <td className="numeral py-2 text-right">{fmt(d.current)}</td>
                    <td className="numeral py-2 text-right">{fmt(d.reference)}</td>
                    <td className="numeral py-2 text-right text-risk-high">
                      {d.deviationPct === null
                        ? "—"
                        : `${d.deviationPct > 0 ? "+" : ""}${d.deviationPct}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Observation quality">
            <div className="divide-y divide-border/60">
              <Row
                label="Water pixels"
                value={
                  evidence.pixelCount === null
                    ? "—"
                    : evidence.pixelCount.toLocaleString("en-US")
                }
              />
              <Row label="Cloud condition" value={evidence.cloudCondition} mono={false} />
              <Row label="Observation date" value={evidence.observationDate} />
            </div>
          </Section>

          <Section title="Interpretation">
            <p className="text-sm leading-relaxed text-foreground/85">
              {evidence.interpretation}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
