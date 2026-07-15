import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { chatSuggestions } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/chat")({
  component: ChatPage,
});

interface Msg { id: string; role: "user" | "assistant"; text: string; }

const seed: Msg[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Hi Aarav! I'm your MediSense assistant. Ask me anything about your recent reports.",
  },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text:
          "Based on your latest reports, your LDL is trending down and hemoglobin is healthy. Keep up the daily walks and add omega-3 rich foods twice a week. (This is a mock response.)",
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-10rem)] max-w-4xl flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">AI Chat</h1>
        <p className="text-sm text-muted-foreground">Ask questions in plain English.</p>
      </div>

      <Card className="flex min-h-0 flex-1 flex-col p-0">
        <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-3", m.role === "user" && "justify-end")}>
              {m.role === "assistant" && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-brand shadow-glow">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "gradient-brand text-primary-foreground shadow-glow"
                    : "bg-muted",
                )}
              >
                {m.text}
              </div>
              {m.role === "user" && (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted">
                  <User className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-brand">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </span>
              <div className="rounded-2xl bg-muted px-4 py-3">
                <div className="flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          {messages.length <= 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {chatSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent"
                >
                  <Sparkles className="h-3 w-3 text-primary" /> {s}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-end gap-2"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
              }}
              placeholder="Ask about a parameter, trend, or lifestyle tip..."
              rows={1}
              className="min-h-11 resize-none"
            />
            <Button type="submit" className="gradient-brand shadow-glow" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
