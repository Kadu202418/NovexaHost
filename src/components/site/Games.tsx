import { Blocks, Boxes, Crosshair, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const games = [
  {
    icon: Blocks,
    name: "Minecraft Java",
    description: "Vanilla, Paper, Purpur, Fabric, Forge e Spigot com instalador de 1 clique.",
    available: true,
  },
  {
    icon: Boxes,
    name: "Minecraft Bedrock",
    description: "Crossplay para console, mobile e Windows com addons e mundos personalizados.",
    available: true,
  },
  {
    icon: Crosshair,
    name: "Counter-Strike 2",
    description: "Tickrate elevado, plugins Metamod/SourceMod e mapas da comunidade.",
    available: true,
  },
  {
    icon: Globe,
    name: "Web Hosting",
    description: "Sites, painéis e bots para sua comunidade — em desenvolvimento.",
    available: false,
  },
];

export function Games() {
  return (
    <section id="jogos" className="section-shell py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Escolha o seu jogo</h2>
        <p className="mt-3 text-muted-foreground">
          Infraestrutura dedicada e otimizada para cada motor de jogo, pronta em menos de 60
          segundos.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => (
          <article
            key={game.name}
            className={`group glass-panel flex flex-col rounded-2xl p-6 transition-all duration-200 ${
              game.available
                ? "hover:-translate-y-1 hover:border-accent/50 hover:glow-ring"
                : "opacity-60"
            }`}
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-accent">
              <game.icon className="size-5" />
            </span>
            <h3 className="mt-5 flex items-center gap-2 text-base font-semibold">
              {game.name}
              {!game.available && (
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Em breve
                </span>
              )}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {game.description}
            </p>
            <Button
              variant={game.available ? "brandSoft" : "outline"}
              size="sm"
              className="mt-6 w-full"
              disabled={!game.available}
            >
              {game.available ? "Ver planos" : "Indisponível"}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
