import { Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 font-display font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand shadow-glow">
        <Activity className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
      </span>
      {!compact && (
        <span className="text-lg tracking-tight">
          Medi<span className="text-gradient-brand">Sense</span>
        </span>
      )}
    </Link>
  );
}
