import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
});

function ForgotPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string }>();
  const onSubmit = async (data: { email: string }) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success(`Reset link sent to ${data.email}`);
  };
  return (
    <AuthShell
      title="Forgot password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={{ text: "Remember it?", linkText: "Back to sign in", to: "/login" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email", { required: true })} />
        </div>
        <Button type="submit" className="gradient-brand shadow-glow" disabled={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </AuthShell>
  );
}
