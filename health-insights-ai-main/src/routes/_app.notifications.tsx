import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mock";
import { Bell, Calendar, Lightbulb, FileText } from "lucide-react";

const iconMap = {
  report: FileText, reminder: Bell, tip: Lightbulb, appointment: Calendar,
} as const;

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Notifications</h1>
          <p className="text-sm text-muted-foreground">Reminders, tips and updates.</p>
        </div>
        <Button variant="outline" size="sm">Mark all read</Button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <Card key={n.id} className="flex items-start gap-4 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-brand shadow-glow">
                <Icon className="h-4 w-4 text-primary-foreground" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{n.title}</p>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.message}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
