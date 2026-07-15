import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  component: ResetPage,
});

interface F { password: string; confirm: string; }

function ResetPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<F>();
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Password updated. Please sign in.");
    navigate({ to: "/login" });
  };
  return (
    <AuthShell title="Set a new password" subtitle="Choose something strong you'll remember.">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" {...register("password", { required: "Required", minLength: { value: 8, message: "Min 8 characters" } })} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" {...register("confirm", {
            required: "Required",
            validate: (v) => v === watch("password") || "Passwords do not match",
          })} />
          {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
        </div>
        <Button type="submit" className="gradient-brand shadow-glow" disabled={isSubmitting}>
          Update password
        </Button>
      </form>
    </AuthShell>
  );
}
