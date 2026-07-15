import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

interface F { name: string; email: string; password: string; }

function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>();

  const onSubmit = async (data: F) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Account created for ${data.name}!`);
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever. Upgrade any time."
      footer={{ text: "Already have an account?", linkText: "Sign in", to: "/login" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Aarav Sharma"
            {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com"
            {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 8 characters"
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Use at least 8 characters" } })} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="gradient-brand shadow-glow" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
