import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Games } from "@/components/site/Games";
import { Features } from "@/components/site/Features";
import { Pricing } from "@/components/site/Pricing";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovexaHost — Hospedagem de servidores de jogos" },
      {
        name: "description",
        content:
          "Servidores de Minecraft Java, Bedrock e CS2 com console em tempo real, backups automáticos, proteção DDoS e uptime de 99,9%.",
      },
      { property: "og:title", content: "NovexaHost — Hospedagem de servidores de jogos" },
      {
        property: "og:description",
        content:
          "Provisione servidores de Minecraft e CS2 em segundos, com painel completo e proteção DDoS incluída.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Games />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
