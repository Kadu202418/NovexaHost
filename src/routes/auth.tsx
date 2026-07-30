import { useState } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Server } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Entrar na NovexaHost" },
      {
        name: "description",
        content:
          "Acesse sua conta NovexaHost para gerenciar servidores de Minecraft e CS2, backups e console em tempo real.",
      },
      { property: "og:title", content: "Entrar na NovexaHost" },
      {
        property: "og:description",
        content: "Acesse o painel NovexaHost e gerencie seus servidores de jogos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Informe um e-mail válido").max(255);
const passwordSchema = z.string().min(8, "A senha precisa ter ao menos 8 caracteres").max(72);

function safePath(value?: string) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const destination = safePath(search.redirect);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) return toast.error(parsedEmail.error.issues[0].message);
    if (!password) return toast.error("Informe sua senha");

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsedEmail.data,
      password,
    });
    setLoading(false);

    if (error) return toast.error("Não foi possível entrar: credenciais inválidas");
    toast.success("Bem-vindo de volta!");
    navigate({ to: destination });
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) return toast.error(parsedEmail.error.issues[0].message);
    const parsedPassword = passwordSchema.safeParse(password);
    if (!parsedPassword.success) return toast.error(parsedPassword.error.issues[0].message);

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsedEmail.data,
      password: parsedPassword.data,
      options: {
        emailRedirectTo: `${window.location.origin}${destination}`,
        data: { name: name.trim().slice(0, 80) },
      },
    });
    setLoading(false);

    if (error) return toast.error(error.message);
    if (!data.session) {
      return toast.success("Conta criada! Confirme seu e-mail para ativar o acesso.");
    }
    toast.success("Conta criada com sucesso!");
    navigate({ to: destination });
  }

  async function handleReset() {
    const parsedEmail = emailSchema.safeParse(email);
    if (!parsedEmail.success) return toast.error("Informe seu e-mail para recuperar a senha");

    const { error } = await supabase.auth.resetPasswordForEmail(parsedEmail.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error("Não foi possível enviar o e-mail de recuperação");
    toast.success("Enviamos um link de recuperação para o seu e-mail.");
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(destination)}`,
    });
    if (result.error) {
      setLoading(false);
      return toast.error("Não foi possível entrar com o Google");
    }
    if (result.redirected) return;
    setLoading(false);
    navigate({ to: destination });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar para o site
        </Link>

        <div className="glass-panel rounded-2xl p-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary glow-ring">
              <Server className="size-4.5 text-primary-foreground" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Novexa<span className="text-accent">Host</span>
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight">Acesse seu painel</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Gerencie seus servidores de jogos em um só lugar.
          </p>

          <Tabs defaultValue="login" className="mt-7">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Registrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    maxLength={255}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    maxLength={72}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Esqueci minha senha
                </button>
                <Button type="submit" variant="brand" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome</Label>
                  <Input
                    id="signup-name"
                    value={name}
                    maxLength={80}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como devemos te chamar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-mail</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    maxLength={255}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    maxLength={72}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo de 8 caracteres"
                  />
                </div>
                <Button type="submit" variant="brand" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  Criar conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
            Continuar com Google
          </Button>
        </div>
      </div>
    </main>
  );
}
