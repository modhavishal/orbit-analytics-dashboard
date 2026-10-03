import { ArrowUpRight, Sparkles } from "lucide-react";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card p-7 shadow-sm shadow-slate-950/[0.025] sm:p-10">
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Sparkles aria-hidden="true" className="size-5" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-8 flex max-w-xl items-center justify-between rounded-xl border border-dashed border-border bg-muted/30 px-4 py-4">
        <span className="text-sm text-muted-foreground">
          {title} tools are coming soon.
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
      </div>
    </section>
  );
}
