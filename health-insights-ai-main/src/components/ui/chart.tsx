// Minimal stub. Use Recharts primitives directly for charts in this project.
import * as React from "react";

export type ChartConfig = Record<string, { label?: string; color?: string; icon?: React.ComponentType }>;

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { config?: ChartConfig }>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ),
);
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = (_props: any) => null;
export const ChartTooltipContent = (_props: any) => null;
export const ChartLegend = (_props: any) => null;
export const ChartLegendContent = (_props: any) => null;
export const ChartStyle = (_props: any) => null;
