import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currentUser } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="delete">Delete account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile"><Card className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" defaultValue={currentUser.name} />
            <Field label="Email" defaultValue={currentUser.email} />
            <Field label="Phone" defaultValue={currentUser.phone} />
            <Field label="Blood group" defaultValue={currentUser.bloodGroup} />
          </div>
          <Button className="gradient-brand shadow-glow" onClick={() => toast.success("Profile saved")}>Save changes</Button>
        </Card></TabsContent>

        <TabsContent value="appearance"><Card className="p-6 space-y-4">
          <Row label="Dark mode" hint="Use dark theme across the app.">
            <Switch onCheckedChange={(v) => document.documentElement.classList.toggle("dark", v)} />
          </Row>
          <Separator />
          <Row label="Reduced motion" hint="Minimize animations and transitions.">
            <Switch />
          </Row>
        </Card></TabsContent>

        <TabsContent value="language"><Card className="p-6 space-y-4">
          <div className="grid gap-1.5">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card></TabsContent>

        <TabsContent value="password"><Card className="p-6 space-y-4">
          <Field label="Current password" type="password" />
          <Field label="New password" type="password" />
          <Field label="Confirm new password" type="password" />
          <Button className="gradient-brand shadow-glow" onClick={() => toast.success("Password updated")}>Update password</Button>
        </Card></TabsContent>

        <TabsContent value="notifications"><Card className="p-6 space-y-4">
          <Row label="Report analyzed"><Switch defaultChecked /></Row><Separator />
          <Row label="Medicine reminders"><Switch defaultChecked /></Row><Separator />
          <Row label="Health tips"><Switch /></Row><Separator />
          <Row label="Appointment alerts"><Switch defaultChecked /></Row>
        </Card></TabsContent>

        <TabsContent value="privacy"><Card className="p-6 space-y-4">
          <Row label="Share anonymized data to improve AI"><Switch /></Row><Separator />
          <Row label="Allow third-party integrations"><Switch /></Row>
        </Card></TabsContent>

        <TabsContent value="delete"><Card className="p-6 space-y-3 border-destructive/30">
          <h3 className="text-base font-semibold text-destructive">Delete account</h3>
          <p className="text-sm text-muted-foreground">
            This permanently removes your account and all uploaded reports. This action cannot be undone.
          </p>
          <Button variant="destructive" onClick={() => toast.error("Account deletion is disabled in demo")}>
            Delete my account
          </Button>
        </Card></TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input {...rest} />
    </div>
  );
}
function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}
