import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sampleReport, bloodSugarTrend, cholesterolTrend } from "@/data/mock";
import { RiskBadge, StatusBadge } from "@/components/common/StatusBadge";
import { Download, Share2, Sparkles } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/analysis")({
  component: AnalysisPage,
});

function AnalysisPage() {
  const r = sampleReport;
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-primary">AI Analysis</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{r.name}</h1>
          <p className="text-sm text-muted-foreground">Analyzed on {r.date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Share2 className="mr-1.5 h-4 w-4" /> Share</Button>
          <Button className="gradient-brand shadow-glow" size="sm">
            <Download className="mr-1.5 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Patient + score */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold">Patient information</h3>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Name", r.patient.name],
              ["Age", `${r.patient.age} yrs`],
              ["Gender", r.patient.gender],
              ["Blood group", r.patient.bloodGroup],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Health score</h3>
            <RiskBadge risk={r.risk} />
          </div>
          <p className="mt-3 text-4xl font-semibold">{r.healthScore}<span className="text-base text-muted-foreground">/100</span></p>
          <Progress value={r.healthScore} className="mt-3 h-2" />
        </Card>
      </div>

      {/* Parameters */}
      <Card className="overflow-hidden">
        <div className="border-b p-5">
          <h3 className="text-base font-semibold">Medical parameters</h3>
          <p className="text-xs text-muted-foreground">Every result explained by AI</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Normal range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-[260px]">AI explanation</TableHead>
                <TableHead className="min-w-[240px]">Lifestyle suggestion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {r.parameters.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.value} <span className="text-xs text-muted-foreground">{p.unit}</span></TableCell>
                  <TableCell className="text-muted-foreground">{p.normalRange}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.explanation}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {p.suggestion}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mini charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-base font-semibold">Blood sugar trend</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodSugarTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="fasting" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="postMeal" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-base font-semibold">Cholesterol trend</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cholesterolTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="ldl" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="hdl" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="total" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
