# Nexa Host

📄 Especificação Técnica do Projeto — NovexaHost

1. Visão Geral e Configurações Globais

Nome Oficial: NovexaHost

Slogan: Sua próxima geração de hospedagem para jogos.

Público-alvo: Gamers, criadores de comunidades e administradores de servidores de jogos.

Proposta de Valor: Plataforma moderna, intuitiva e performática para provisionamento e gestão de servidores de jogos (Minecraft Java/Bedrock, CS2).

Posicionamento Visual: Inspirada nas líderes do mercado de nuvem/hospedagem (Hostinger, Vercel, Cloudflare, Hetzner), focando em elegância, estabilidade e confiança.

2. Identidade Visual & Design System

2.1 Conceito Visual

A interface prioriza uma estética premium e profissional, evitando exageros neon ou visuais infantis. Iluminação sutil aplicada apenas para feedback de status, CTAs primários e interações ativas.

2.2 Paleta de Cores

Fundo Principal (Dark): #0D1117

Fundo Secundário / Container: #161B22

Cards / Módulos: #1E2631

Bordas & Divisores: #2D3748

Destaque Primário (Vermelho Escuro): #A11224 (Hover: #C81E35)

Destaque Alternativo (Vermelho Gamer): #E11D48 (Hover: #FF3B3B)

Texto Primário: #FFFFFF (Branco)

Texto Secundário: #B8C0CC (Cinza Misto)

2.3 Tipografia & Animações

Tipografia: Inter ou Plus Jakarta Sans (pesos 400, 500, 600, 700).

Componentes UI: Cantos arredondados, leve glassmorphism (blur sutil), botões grandes com animações em hover (escala ~1.03x).

Transições: Rápidas e suaves (Fade In, Slide, Skeleton Loading em requisições assíncronas).

3. Arquitetura de Software e Tecnologias

3.1 Stack Tecnológica

Frontend: React (Next.js/Vite), Tailwind CSS / Bootstrap, Lucide Icons, Recharts (Gráficos), Framer Motion (Animações).

Backend Framework: FastAPI (Python) para orquestração da API REST e WebSockets + Node.js (opcional para microsserviços do painel de jogo).

Banco de Dados & Cloud (BaaS): Firebase (exclusivo para autenticação, dados e storage).

3.2 Serviços Firebase Ativos

Firebase Authentication: Login, cadastro, sessão persistente, recuperação de senha e 2FA/OAuth.

Cloud Firestore: Armazenamento NoSQL de usuários, servidores, métricas, logs e suporte.

Firebase Storage: Upload de arquivos, backups, skins, logos e banners de perfil.

Firebase Analytics: Monitoramento de acesso, eventos de conversão e telemetria.

3.3 Código de Inicialização do Firebase

JavaScript

// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9fuL0vPIb78qkNmSJxnNGlXiLFUMvFQg",
  authDomain: "nexlor.firebaseapp.com",
  projectId: "nexlor",
  storageBucket: "nexlor.firebasestorage.app",
  messagingSenderId: "310515477887",
  appId: "1:310515477887:web:7a0cbcac44f6406867fe4a",
  measurementId: "G-78CPY5K054"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;


4. Estrutura de Diretórios do Projeto

Plaintext

src/
├── assets/         # Imagens, logotipos, fontes e ícones locais
├── components/     # Componentes reutilizáveis (Botões, Cards, Modais, Inputs)
├── contexts/       # React Contexts (AuthContext, ThemeContext, ServerContext)
├── firebase/       # Módulos de integração do Firebase
│   ├── firebase.js # Configuração central e inicialização
│   ├── auth.js     # Métodos de login, registro, logout e reset de senha
│   ├── firestore.js# Queries e mutações do Cloud Firestore
│   └── storage.js  # Métodos de upload e gerenciamento de arquivos
├── hooks/          # Custom Hooks (useAuth, useServerStats, useTheme)
├── layouts/        # Layouts padrão (PublicLayout, DashboardLayout, AdminLayout)
├── pages/          # Páginas da aplicação (LandingPage, Dashboard, Console, etc.)
├── services/       # Clientes HTTP (Axios), WebSockets e chamadas FastAPI
├── styles/         # Estilos globais e tokens CSS/Tailwind
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias (Formatadores de data, calculadoras de RAM)


5. Mapeamento do Banco de Dados (Cloud Firestore)

As coleções principais estruturadas no Firestore incluem:

users/: { uid, name, username, email, role, avatarUrl, bannerUrl, themePrefs, createdAt }

servers/: { serverId, ownerId, game, name, status, plan, ram, cpu, ssd, location, ip, port, createdAt }

plans/: { planId, game, name, ram, cpu, ssd, price, active }

tickets/: { ticketId, userId, subject, category, status, priority, messages: [], createdAt }

backups/: { backupId, serverId, size, downloadUrl, createdAt }

statistics/: { serverId, timestamp, cpuUsage, ramUsage, diskUsage, onlinePlayers, tps }

themes/: { userId, primaryColor, secondaryColor, sidebarColor, cardColor, borderRadius }

notifications/: { notificationId, userId, title, message, read, createdAt }

6. Módulos do Sistema e Funcionalidades

6.1 Landing Page & Pública

Navbar: Logotipo NovexaHost, Jogos, Recursos, Preços, Suporte, Login, Registrar.

Hero Section: Título de alto impacto, CTA "Criar Servidor" e "Conhecer Planos", estatísticas em tempo real (Servidores Online, Uptime 99.9%, Clientes, Países).

Seleção de Jogos:

Disponíveis: Minecraft Java, Minecraft Bedrock, Counter-Strike 2.

Em Breve: Web Hosting (botão desativado com badge).

Autenticação: Login e Registro com suporte a e-mail/senha e OAuth social (Google, Discord, GitHub). Recuperação de senha com envio por e-mail via Firebase Auth.

6.2 Painel do Cliente (Dashboard)

Visão Geral: Cards com consumo em tempo real de CPU, RAM, Disco e Tráfego, gráficos dinâmicos de estatísticas e atalhos rápidos.

Criador de Servidores:

Seleção do jogo e motor (Vanilla, Paper, Purpur, Fabric, Forge, Spigot, etc.).

Modos de jogo (Survival, SkyBlock, Pixelmon, OneBlock, RPG, Custom).

Sliders interativos para alocação de RAM, CPU e SSD com recalculo instantâneo de preço.

Escolha da região do nó (Brasil 🇧🇷, EUA 🇺🇸, Alemanha 🇩🇪, Reino Unido 🇬🇧).

Verificação instantânea de disponibilidade de IP personalizado e subdomínios gratuitos.

Gerenciador do Servidor (Painel Estilo Pterodactyl):

Controle: Iniciar, Parar, Reiniciar, Forçar Parada.

Console Live: Terminal em tempo real via WebSocket com auto-scroll, suporte a envio de comandos e download de logs.

Gerenciador de Arquivos: Explorer completo com suporte a criador de pastas/arquivos, upload, download, extração/compactação de .zip e editor de código embutido com syntax highlight.

Instalador 1-Clique: Busca e instalação automática de Plugins, Mods e Modpacks (integração CurseForge e Modrinth).

Gestão de Redes & Segurança: Configuração de subdomínios, DNS, regras de Firewall, proteção DDoS.

Backups: Criação manual, restauração e agendamento automático.

6.3 Painel Administrativo (Admin Master)

Visão Geral: Métricas globais de faturamento, novos usuários, servidores provisionados e carga do cluster.

Gestão:

Usuários (Listagem, edição de permissões, banimento por IP/Conta).

Planos e Jogos (Criação e modificação de especificações e valores).

Notificações Globais e logs do sistema.

6.4 Customização e Aparência

Theme Editor Integrado: Permitindo alterar cor principal, secundária, estilo dos cards, bordas e modo Dark/Light diretamente pelas configurações da conta, com alteração persistida no Firestore.

7. Requisitos de Segurança & Boas Práticas

Regras de Segurança do Firestore & Storage: Apenas o próprio usuário autenticado pode ler e escrever em seus servidores/tickets. Apenas admins têm acesso a leituras globais.

Acesso à API: Proteção das rotas REST via tokens JWT passados via cabeçalho Authorization: Bearer.

Proteções Ativas: Validação de formulários no frontend/backend contra XSS, sanitização de requisições contra Injection, suporte a 2FA (Google Authenticator) e suporte a Rate Limit na API FastAPI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/061a2f10-0729-459d-a990-1758a9307c37).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
