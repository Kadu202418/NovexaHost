import { Server, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="suporte" className="border-t border-border bg-surface/60">
      <div className="section-shell flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary">
              <Server className="size-4.5 text-primary-foreground" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Novexa<span className="text-accent">Host</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Suporte humano 24/7 em português. Tire dúvidas pelo Discord ou abra um ticket — a
            resposta média é de 8 minutos.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="brandSoft">
            <MessageCircle className="size-4" />
            Entrar no Discord
          </Button>
          <Button variant="outline">
            <Mail className="size-4" />
            Abrir ticket
          </Button>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="section-shell py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} NovexaHost. Sua próxima geração de hospedagem para jogos.
        </p>
      </div>
    </footer>
  );
}
