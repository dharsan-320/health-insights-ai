import { Link, type LinkOptions } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { type ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: { text: string; linkText: string; to: LinkOptions["to"] };
}) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 gradient-hero" aria-hidden />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="glass rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-6">{children}</div>
          {footer && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {footer.text}{" "}
              <Link to={footer.to} className="font-medium text-primary hover:underline">
                {footer.linkText}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
