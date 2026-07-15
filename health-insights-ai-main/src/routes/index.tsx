import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Sparkles,
  Upload,
  Activity,
  LineChart,
  MessageSquareText,
  Bell,
  HeartPulse,
  CheckCircle2,
  Star,
  Mail,
} from "lucide-react";

import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  {
    icon: Upload,
    title: "One-click upload",
    desc: "Drag & drop any PDF, PNG or JPG lab report — we handle the rest.",
  },
  {
    icon: Sparkles,
    title: "AI explanations",
    desc: "Every parameter explained in plain English with personalized suggestions.",
  },
  {
    icon: LineChart,
    title: "Health trends",
    desc: "Track sugar, hemoglobin, cholesterol and more over time with rich charts.",
  },
  {
    icon: MessageSquareText,
    title: "Chat with your reports",
    desc: "Ask questions and get instant, contextual answers grounded in your data.",
  },
  {
    icon: Bell,
    title: "Smart reminders",
    desc: "Never miss a medicine, follow-up test or specialist appointment.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    desc: "HIPAA-inspired encryption. Your reports are yours — always.",
  },
];

const steps = [
  { title: "Upload your report", desc: "PDF, PNG or JPG from any lab.", icon: Upload },
  { title: "AI reads & explains", desc: "Parameter-by-parameter breakdown.", icon: Sparkles },
  { title: "Track & improve", desc: "Trends, reminders, and lifestyle tips.", icon: HeartPulse },
];

const testimonials = [
  {
    name: "Dr. Meera Iyer",
    role: "General Physician",
    text: "MediSense saves my patients hours of anxiety. The explanations are accurate and empathetic.",
  },
  {
    name: "Rohan K.",
    role: "Product Manager",
    text: "I finally understand my lipid profile. The trend charts made me stick to my morning runs.",
  },
  {
    name: "Priya S.",
    role: "New parent",
    text: "Uploading my baby's reports and getting a simple summary — this is what modern healthcare should feel like.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    tag: "Get started",
    features: ["3 reports / month", "Basic AI explanations", "History for 30 days"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$9",
    tag: "Most popular",
    highlight: true,
    features: [
      "Unlimited reports",
      "Advanced trends & charts",
      "AI chat with memory",
      "Priority processing",
    ],
    cta: "Go Pro",
  },
  {
    name: "Family",
    price: "$19",
    tag: "For loved ones",
    features: ["Up to 5 members", "Shared timeline", "Reminders & alerts", "Care exports (PDF)"],
    cta: "Choose Family",
  },
];

const faqs = [
  {
    q: "Is MediSense AI a substitute for a doctor?",
    a: "No. MediSense helps you understand and track your reports. Always consult a licensed clinician for diagnosis and treatment.",
  },
  {
    q: "Which report types are supported?",
    a: "Blood work, diabetes, thyroid, liver, kidney, lipid profile, urine analysis and most standard laboratory formats.",
  },
  {
    q: "How is my data protected?",
    a: "Reports are encrypted in transit and at rest. You can permanently delete any report from Settings at any time.",
  },
  {
    q: "Can I export or share results?",
    a: "Yes — export a clean PDF summary from any analysis or share a secure link with your doctor.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 glass px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-powered health literacy
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Understand Your <span className="text-gradient-brand">Medical Reports</span> with AI
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Upload blood reports, diabetes reports, thyroid reports, liver function tests,
              kidney function tests, lipid profiles and other laboratory reports. Get simple
              AI-powered explanations and health insights.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gradient-brand shadow-glow">
                <Link to="/upload">
                  Analyze Report <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#how">
                  <Play className="mr-1.5 h-4 w-4" /> Watch Demo
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No credit card. HIPAA-inspired encryption. Free forever tier.
            </p>
          </motion.div>

          {/* Preview card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="glass rounded-3xl p-3 shadow-glow">
              <div className="rounded-2xl border bg-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Latest analysis
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">Complete Blood Count · Oct 2026</h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-emerald/15 px-3 py-1 text-xs font-medium text-emerald border border-emerald/30">
                    <Activity className="h-3.5 w-3.5" /> Low risk · Score 82
                  </div>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    { k: "Hemoglobin", v: "14.5 g/dL", s: "Normal" },
                    { k: "Fasting Glucose", v: "108 mg/dL", s: "Borderline" },
                    { k: "LDL Cholesterol", v: "108 mg/dL", s: "High" },
                  ].map((p) => (
                    <div key={p.k} className="rounded-xl border bg-background/60 p-4">
                      <p className="text-xs text-muted-foreground">{p.k}</p>
                      <p className="mt-1 text-lg font-semibold">{p.v}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{p.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to make sense of your health"
          subtitle="Purpose-built for people who want clarity, not jargon."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl gradient-brand shadow-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to clarity"
            subtitle="From lab paper to actionable insight in under a minute."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border bg-card p-6 shadow-soft">
                <div className="absolute -top-3 left-6 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Step {i + 1}
                </div>
                <s.icon className="mt-4 h-6 w-6 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Loved by patients & doctors" title="Real stories, real relief" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass rounded-2xl p-6">
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted-foreground"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent plans"
            subtitle="Start free — upgrade when you're ready."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border bg-card p-6 shadow-soft ${
                  p.highlight ? "ring-2 ring-primary/60 shadow-glow" : ""
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 right-6 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {p.tag}
                  </div>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-3xl font-semibold">
                  {p.price}
                  <span className="text-base font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-6 w-full ${p.highlight ? "gradient-brand shadow-glow" : ""}`}
                  variant={p.highlight ? "default" : "outline"}
                >
                  <Link to="/register">{p.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t bg-muted/20 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Talk to our care team"
              subtitle="Questions about plans, security, or partnerships? We'll get back within 24 hours."
            />
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" /> hello@medisense.ai
            </div>
          </div>
          <form
            className="glass rounded-2xl p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-3">
              <Input placeholder="Your name" />
              <Input type="email" placeholder="Email address" />
              <Textarea placeholder="How can we help?" rows={4} />
              <Button type="submit" className="gradient-brand shadow-glow">
                Send message
              </Button>
            </div>
          </form>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <div
          className={`text-xs font-semibold uppercase tracking-wider text-primary ${
            align === "center" ? "" : ""
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={`mt-3 text-muted-foreground ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
