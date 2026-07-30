import { useEffect } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  validateSearch: z.object({ redirect: z.string().optional() }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth/callback" });

  useEffect(() => {
    const target =
      search.redirect && search.redirect.startsWith("/") && !search.redirect.startsWith("//")
        ? search.redirect
        : "/dashboard";

    let done = false;
    const finish = (path: string) => {
      if (done) return;
      done = true;
      navigate({ to: path, replace: true });
    };

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) finish(target);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) finish(target);
    });

    const timeout = setTimeout(() => finish("/auth"), 6000);
    return () => {
      clearTimeout(timeout);
      sub.subscription.unsubscribe();
    };
  }, [navigate, search.redirect]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="size-5 animate-spin text-accent" />
        Concluindo o login...
      </div>
    </main>
  );
}
