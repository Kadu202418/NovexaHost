import { useState } from "react";
import { Menu, X, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Jogos", href: "#jogos" },
  { label: "Recursos", href: "#recursos" },
  { label: "Preços", href: "#precos" },
  { label: "Suporte", href: "#suporte" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary glow-ring">
            <Server className="size-4.5 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Novexa<span className="text-accent">Host</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button variant="brand" size="sm">
            Registrar
          </Button>
        </div>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="section-shell flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="outline" className="flex-1">
                Login
              </Button>
              <Button variant="brand" className="flex-1">
                Registrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
