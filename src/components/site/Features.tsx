import { Terminal, FolderTree, PackagePlus, DatabaseBackup, Network, Gauge } from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Console em tempo real",
    text: "Terminal via WebSocket com auto-scroll, envio de comandos e download de logs.",
  },
  {
    icon: FolderTree,
    title: "Gerenciador de arquivos",
    text: "Upload, compactação .zip e editor de código embutido com syntax highlight.",
  },
  {
    icon: PackagePlus,
    title: "Instalador 1-clique",
    text: "Plugins, mods e modpacks direto do CurseForge e do Modrinth.",
  },
  {
    icon: DatabaseBackup,
    title: "Backups automáticos",
    text: "Agendamento, restauração instantânea e download seguro dos snapshots.",
  },
  {
    icon: Network,
    title: "Rede e segurança",
    text: "Subdomínios grátis, DNS, regras de firewall e mitigação DDoS sempre ativa.",
  },
  {
    icon: Gauge,
    title: "Métricas ao vivo",
    text: "CPU, RAM, disco, TPS e jogadores online em gráficos atualizados em tempo real.",
  },
];

export function Features() {
  return (
    <section id="recursos" className="border-y border-border bg-surface/50 py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Um painel completo, sem complicação
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tudo o que um administrador precisa para operar servidores profissionais em um só lugar.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="glass-panel rounded-2xl p-6 transition-colors duration-200 hover:border-accent/40"
            >
              <f.icon className="size-5 text-accent" />
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
