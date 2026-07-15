import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Mail, Phone, Droplets, User2, Calendar } from "lucide-react";
import { currentUser } from "@/data/mock";
import { RiskBadge } from "@/components/common/StatusBadge";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Profile</h1>
        <p className="text-sm text-muted-foreground">Your personal & medical basics.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="gradient-brand text-primary-foreground text-lg">
              {currentUser.photoInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <div className="mt-2"><RiskBadge risk="low" /></div>
          </div>
          <Button variant="outline"><Pencil className="mr-1.5 h-4 w-4" /> Edit</Button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Info icon={User2} label="Age" value={`${currentUser.age} years`} />
        <Info icon={User2} label="Gender" value={currentUser.gender} />
        <Info icon={Droplets} label="Blood group" value={currentUser.bloodGroup} />
        <Info icon={Mail} label="Email" value={currentUser.email} />
        <Info icon={Phone} label="Phone" value={currentUser.phone} />
        <Info icon={Calendar} label="Member since" value="Jan 2026" />
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
      <Button variant="ghost" size="icon"><Pencil className="h-3.5 w-3.5" /></Button>
    </Card>
  );
}
