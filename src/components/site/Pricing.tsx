import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "29",
    tagline: "Para começar com os amigos",
    specs: ["4 GB RAM DDR5", "2 vCPU Ryzen", "40 GB NVMe", "Subdomínio grátis"],
    highlight: false,
  },
  {
    name: "Community",
    price: "79",
    tagline: "Para comunidades em crescimento",
    specs: [
      "12 GB RAM DDR5",
      "4 vCPU Ryzen",
      "120 GB NVMe",
      "Backups diários",
      "IP dedicado opcional",
    ],
    highlight: true,
  },
  {
    name: "Network",
    price: "179",
    tagline: "Para redes com múltiplos nós",
    specs: [
      "32 GB RAM DDR5",
      "8 vCPU Ryzen",
      "300 GB NVMe",
      "Backups horários",
      "Suporte prioritário",
    ],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="precos" className="section-shell py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Planos transparentes</h2>
        <p className="mt-3 text-muted-foreground">
          Sem taxa de instalação. Faça upgrade ou downgrade de recursos quando quiser.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex flex-col rounded-2xl p-7 transition-transform duration-200 hover:-translate-y-1 ${
              plan.highlight
                ? "border border-accent/50 bg-card glow-ring"
                : "glass-panel border border-border"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                Mais popular
              </span>
            )}
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {plan.name}
            </h3>
            <p className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight">R$ {plan.price}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-2.5 text-sm">
                  <Check className="size-4 shrink-0 text-accent" />
                  {spec}
                </li>
              ))}
            </ul>

            <Button variant={plan.highlight ? "brand" : "outline"} className="mt-8 w-full">
              Contratar {plan.name}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
