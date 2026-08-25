import type { ForecastStep } from "@/types/hydrosat";
import { cn } from "@/lib/utils";

export function TimelineSlider({
  steps,
  activeIndex,
  onChange,
}: {
  steps: ForecastStep[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="px-3.5 py-3">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="label-caps">Projection horizon</span>
        <span className="text-[10px] uppercase tracking-[0.09em] text-muted-foreground">
          Forecast simulation
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={steps.length - 1}
        step={1}
        value={activeIndex}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Projection horizon"
        className="h-1 w-full cursor-pointer appearance-none bg-secondary accent-primary"
      />

      <div className="mt-2 flex justify-between">
        {steps.map((step, i) => (
          <button
            key={step.key}
            type="button"
            onClick={() => onChange(i)}
            className={cn(
              "numeral px-1 text-[11px] transition-colors",
              i === activeIndex
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {step.label}
          </button>
        ))}
      </div>

      <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
        Interface simulation of a projected exposure path. Does not represent live satellite
        movement.
      </p>
    </div>
  );
}
