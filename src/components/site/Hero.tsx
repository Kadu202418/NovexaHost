import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import heroImage from "@/assets/hero-datacenter.jpg";

const stats = [
  { value: "12.480", label: "Servidores online" },
  { value: "99,9%", label: "Uptime garantido" },
  { value: "38 mil", label: "Clientes ativos" },
  { value: "24", label: "Países atendidos" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <img
        src={heroImage}
        alt="Data center da NovexaHost com racks de servidores iluminados"
        width={1600}
        height={1100}
        className="absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />

      <div className="section-shell relative py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <ShieldCheck className="size-3.5 text-accent" />
            Proteção DDoS incluída em todos os planos
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Sua próxima geração de <span className="text-gradient-brand">hospedagem para jogos</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Provisione servidores de Minecraft e CS2 em segundos, com console em tempo real,
            backups automáticos e hardware NVMe de alta frequência.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="brand" size="xl" asChild>
              <Link to="/auth">
                Criar servidor
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#precos">Conhecer planos</a>
            </Button>
          </div>

        </div>

        <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface/90 px-6 py-7 text-center backdrop-blur">
              <dt className="text-2xl font-bold tracking-tight md:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
