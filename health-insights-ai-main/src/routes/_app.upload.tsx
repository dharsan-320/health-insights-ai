import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/upload")({
  component: UploadPage,
});

interface QueuedFile { id: string; name: string; size: number; progress: number; done: boolean; }

function UploadPage() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

  const enqueue = useCallback((list: FileList | File[]) => {
    const arr = Array.from(list);
    const next: QueuedFile[] = arr.map((f) => ({
      id: `${f.name}-${Date.now()}`, name: f.name, size: f.size, progress: 0, done: false,
    }));
    setFiles((prev) => [...prev, ...next]);
    next.forEach((q) => simulate(q.id));
  }, []);

  const simulate = (id: string) => {
    const tick = () => {
      setFiles((prev) => {
        const upd = prev.map((f) => {
          if (f.id !== id || f.done) return f;
          const p = Math.min(100, f.progress + Math.random() * 18 + 6);
          return { ...f, progress: p, done: p >= 100 };
        });
        if (upd.find((f) => f.id === id && !f.done)) setTimeout(tick, 250);
        return upd;
      });
    };
    setTimeout(tick, 200);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) enqueue(e.dataTransfer.files);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Upload a report</h1>
        <p className="text-sm text-muted-foreground">
          We support PDF, PNG, JPG and JPEG. Files stay private to your account.
        </p>
      </div>

      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative block cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all",
          dragging ? "border-primary bg-primary/5" : "border-border/70 bg-muted/20 hover:bg-muted/30",
        )}
      >
        <input
          type="file" className="sr-only" multiple accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => e.target.files && enqueue(e.target.files)}
        />
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: dragging ? 1.05 : 1 }}
          className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-brand shadow-glow"
        >
          <Upload className="h-6 w-6 text-primary-foreground" />
        </motion.div>
        <h3 className="mt-4 text-base font-semibold">Drag & drop or click to browse</h3>
        <p className="mt-1 text-sm text-muted-foreground">PDF · PNG · JPG · JPEG — up to 20MB</p>
      </label>

      {files.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Queued files</h3>
            <Button variant="ghost" size="sm" onClick={() => setFiles([])}>Clear all</Button>
          </div>
          <div className="mt-3 divide-y">
            {files.map((f) => (
              <div key={f.id} className="flex items-center gap-3 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress value={f.progress} className="h-1.5" />
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {Math.round(f.progress)}%
                    </span>
                  </div>
                </div>
                {f.done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )}
                <button
                  onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                  className="rounded-md p-1 text-muted-foreground hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          {files.every((f) => f.done) && (
            <Button
              className="mt-4 gradient-brand shadow-glow"
              onClick={() => {
                toast.success("Report analyzed — view results now");
                navigate({ to: "/analysis" });
              }}
            >
              View analysis
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
