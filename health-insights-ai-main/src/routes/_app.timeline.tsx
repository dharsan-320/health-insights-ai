import { createFileRoute } from "@tanstack/react-router";
import { timelineEvents, hemoglobinTrend, bloodSugarTrend } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { RiskBadge } from "@/components/common/StatusBadge";
import { FileText, TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/timeline")({
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Health timeline</h1>
        <p className="text-sm text-muted-foreground">See how your health evolves over time.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Hemoglobin</p>
              <p className="text-2xl font-semibold">14.5 g/dL</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald">
              <TrendingUp className="h-4 w-4" /> +1.4 in 6mo
            </div>
          </div>
          <div className="mt-3 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hemoglobinTrend}>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="value" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Fasting sugar</p>
              <p className="text-2xl font-semibold">90 mg/dL</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald">
              <TrendingDown className="h-4 w-4" /> -6 in 6mo
            </div>
          </div>
          <div className="mt-3 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodSugarTrend}>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="fasting" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-base font-semibold">Reports over time</h3>
        <div className="relative mt-6 border-l pl-8">
          {timelineEvents.map((e, i) => (
            <div key={e.id} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[42px] top-1 grid h-8 w-8 place-items-center rounded-full gradient-brand shadow-glow">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{e.title}</p>
                <RiskBadge risk={e.risk} />
              </div>
              <p className="text-xs text-muted-foreground">
                {e.date} · {e.type} · Score {e.score}/100
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
