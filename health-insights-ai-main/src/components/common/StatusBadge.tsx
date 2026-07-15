import { cn } from "@/lib/utils";
import type { ParameterStatus, RiskLevel } from "@/data/mock";

const paramStyles: Record<ParameterStatus, string> = {
  normal: "bg-emerald/15 text-emerald border-emerald/30",
  low: "bg-cyan/15 text-cyan border-cyan/30",
  high: "bg-destructive/15 text-destructive border-destructive/30",
  borderline: "bg-warning/20 text-warning border-warning/40",
};

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-emerald/15 text-emerald border-emerald/30",
  moderate: "bg-warning/20 text-warning border-warning/40",
  high: "bg-destructive/15 text-destructive border-destructive/30",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ParameterStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        paramStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        riskStyles[risk],
        className,
      )}
    >
      {risk} risk
    </span>
  );
}
