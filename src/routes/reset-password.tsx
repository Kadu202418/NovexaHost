import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Redefinir senha — NovexaHost" },
      { name: "description", content: "Defina uma nova senha para sua conta NovexaHost." },
      { property: "og:title", content: "Redefinir senha — NovexaHost" },
      { property: "og:description", content: "Defina uma nova senha para sua conta NovexaHost." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPassword,
});

const passwordSchema = z.string().min(8, "A senha precisa ter ao menos 8 caracteres").max(72);

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data });
    setLoading(false);
    if (error) return toast.error("Não foi possível atualizar a senha");
    toast.success("Senha atualizada com sucesso!");
    navigate({ to: "/dashboard" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold tracking-tight">Definir nova senha</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {ready
            ? "Escolha uma senha forte com pelo menos 8 caracteres."
            : "Abra esta página pelo link enviado ao seu e-mail para continuar."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              maxLength={72}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={!ready}
            />
          </div>
          <Button type="submit" variant="brand" className="w-full" disabled={!ready || loading}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            Salvar nova senha
          </Button>
        </form>
      </div>
    </main>
  );
}
