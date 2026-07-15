import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, FileText, Sparkles, ShieldCheck, Lightbulb, Bell, ArrowRight, TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart as RLineChart, Line,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  bloodSugarTrend, cholesterolTrend, dashboardStats, hemoglobinTrend, plateletTrend, reportHistory,
} from "@/data/mock";
import { RiskBadge } from "@/components/common/StatusBadge";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const statCards = [
  { title: "Overall Health Score", value: `${dashboardStats.healthScore}`, suffix: "/100", icon: Activity, hint: "You're doing great!" },
  { title: "Reports Uploaded", value: `${dashboardStats.reportsUploaded}`, icon: FileText, hint: "+2 this month" },
  { title: "Latest Analysis", value: "CBC", icon: Sparkles, hint: "2 days ago" },
  { title: "AI Suggestions", value: `${dashboardStats.suggestions}`, icon: Lightbulb, hint: "Personalized" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, Aarav</h1>
          <p className="text-sm text-muted-foreground">Here's a quick snapshot of your health.</p>
        </div>
        <Button asChild className="gradient-brand shadow-glow">
          <Link to="/upload">Upload new report <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.title}</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {s.value}
                    {"suffix" in s && s.suffix && (
                      <span className="text-sm font-normal text-muted-foreground">{s.suffix}</span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-lg gradient-brand shadow-glow">
                  <s.icon className="h-4 w-4 text-primary-foreground" />
                </span>
              </div>
              {s.title === "Overall Health Score" && (
                <Progress value={dashboardStats.healthScore} className="mt-3 h-2" />
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Risk + Reminder */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Risk assessment</p>
              <h3 className="mt-1 text-lg font-semibold">You are at low risk overall</h3>
            </div>
            <RiskBadge risk={dashboardStats.risk} />
          </div>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bloodSugarTrend}>
                <defs>
                  <linearGradient id="areaFasting" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="fasting" stroke="var(--color-chart-1)" fill="url(#areaFasting)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg gradient-brand shadow-glow">
              <Bell className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Next reminder</p>
              <p className="text-sm font-semibold">{dashboardStats.nextReminder}</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-emerald" /> Data securely stored
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Your reports are encrypted at rest and in transit. Delete anytime.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/notifications">View all reminders</Link>
          </Button>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Blood Sugar Trend" subtitle="Fasting vs post-meal">
          <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={bloodSugarTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="fasting" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="postMeal" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
            </RLineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hemoglobin Trend" subtitle="g/dL">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hemoglobinTrend}>
              <defs>
                <linearGradient id="hbFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-chart-3)" fill="url(#hbFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cholesterol Trend" subtitle="LDL / HDL / Total">
          <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={cholesterolTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="ldl" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="hdl" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="total" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
            </RLineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Platelet Trend" subtitle="x10³/µL">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={plateletTrend}>
              <defs>
                <linearGradient id="pltFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-chart-4)" fill="url(#pltFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent reports */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent reports</h3>
            <p className="text-xs text-muted-foreground">Your latest activity</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/history">See all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </div>
        <div className="mt-4 divide-y">
          {reportHistory.slice(0, 4).map((r) => (
            <Link
              key={r.id}
              to="/analysis"
              className="flex items-center justify-between py-3 transition-colors hover:bg-accent/40 -mx-2 px-2 rounded-md"
            >
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.type} · {r.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1 text-xs text-emerald">
                  <TrendingUp className="h-3.5 w-3.5" /> Score {r.healthScore}
                </div>
                <RiskBadge risk={r.risk} />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="h-56">{children}</div>
    </Card>
  );
}
