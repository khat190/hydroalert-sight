import { ArrowDown } from "lucide-react";
import type { Forecast, ForecastStep } from "@/types/hydrosat";
import { Panel, PanelHeader } from "./Panel";
import { TimelineSlider } from "./TimelineSlider";

export function ForecastPanel({
  forecast,
  activeIndex,
  onHorizonChange,
}: {
  forecast: Forecast;
  activeIndex: number;
  onHorizonChange: (index: number) => void;
}) {
  const active: ForecastStep | undefined = forecast.steps[activeIndex];

  return (
    <Panel className="bg-panel/95 backdrop-blur-sm">
      <PanelHeader title="Downstream forecast" meta={forecast.note} />

      <div className="grid grid-cols-1 divide-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:divide-x">
        <div className="grid grid-cols-2 gap-x-4 px-3.5 py-3">
          <div>
            <div className="label-caps">Estimated flow</div>
            <div className="numeral mt-1 text-lg text-foreground">{forecast.flowRange}</div>
          </div>
          <div>
            <div className="label-caps">Arrival window</div>
            <div className="numeral mt-1 text-lg text-foreground">{forecast.arrivalWindow}</div>
          </div>
          <p className="col-span-2 mt-2 text-[10px] text-muted-foreground">
            Values supplied by the forecast service. Not computed in this interface.
          </p>
        </div>

        <div className="px-3.5 py-3">
          <div className="label-caps mb-2">Transport chain</div>
          <ol className="space-y-1">
            {forecast.chain.map((node, i) => (
              <li key={node} className="flex items-center gap-2 text-xs text-foreground/85">
                {i > 0 ? (
                  <ArrowDown className="size-3 text-muted-foreground" />
                ) : (
                  <span className="size-3" />
                )}
                {node}
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Selected horizon:{" "}
            <span className="numeral text-foreground/80">{active?.label ?? "—"}</span>
          </p>
        </div>

        <div className="border-t border-border lg:border-t-0">
          <TimelineSlider
            steps={forecast.steps}
            activeIndex={activeIndex}
            onChange={onHorizonChange}
          />
        </div>
      </div>
    </Panel>
  );
}
