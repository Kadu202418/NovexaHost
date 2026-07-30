import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Server, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — NovexaHost" },
      { name: "description", content: "Gerencie seus servidores de jogos na NovexaHost." },
      { property: "og:title", content: "Painel — NovexaHost" },
      {
        property: "og:description",
        content: "Gerencie seus servidores de jogos na NovexaHost.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  { icon: Cpu, label: "CPU", value: "—" },
  { icon: MemoryStick, label: "RAM", value: "—" },
  { icon: HardDrive, label: "Disco", value: "—" },
];

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/60 backdrop-blur">
        <div className="section-shell flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary">
              <Server className="size-4.5 text-primary-foreground" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Novexa<span className="text-accent">Host</span>
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="section-shell py-12">
        <h1 className="text-3xl font-bold tracking-tight">Visão geral</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Conectado como {user?.email ?? "sua conta"}.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {metrics.map((m) => (
            <article key={m.label} className="glass-panel rounded-2xl p-6">
              <m.icon className="size-5 text-accent" />
              <p className="mt-4 text-sm text-muted-foreground">{m.label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">{m.value}</p>
            </article>
          ))}
        </div>

        <div className="glass-panel mt-6 rounded-2xl p-8 text-center">
          <h2 className="text-lg font-semibold">Nenhum servidor ainda</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            O criador de servidores e o painel de gerenciamento entram na próxima etapa do projeto.
          </p>
        </div>
      </main>
    </div>
  );
}
