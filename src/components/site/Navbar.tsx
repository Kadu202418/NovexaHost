import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/novexahost-logo.png.asset.json";

const links = [
  { label: "Jogos", href: "#jogos" },
  { label: "Recursos", href: "#recursos" },
  { label: "Preços", href: "#precos" },
  { label: "Suporte", href: "#suporte" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();


  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-black glow-ring">
            <img src={logoAsset.url} alt="NovexaHost" className="size-full object-contain" />
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
          {!loading && user ? (
            <Button variant="brand" size="sm" asChild>
              <Link to="/dashboard">
                <LayoutDashboard className="size-4" />
                Meu painel
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button variant="brand" size="sm" asChild>
                <Link to="/auth">Registrar</Link>
              </Button>
            </>
          )}
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
              {!loading && user ? (
                <Button variant="brand" className="flex-1" asChild>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    Meu painel
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button variant="brand" className="flex-1" asChild>
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      Registrar
                    </Link>
                  </Button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
