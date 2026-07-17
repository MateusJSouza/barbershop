# Barbershop

App de agendamento para barbearias construído com Next.js 15 (App Router), Prisma + PostgreSQL, next-auth (Google) e Tailwind/shadcn UI.

## Funcionalidades

- Busca e listagem de barbearias e serviços
- Detalhe da barbearia com serviços e agendamento por data
- Autenticação via Google (next-auth)
- Área do usuário com suas reservas (criar / cancelar)
- UI escura (dark-only), responsiva

## Stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **Prisma 5** + **PostgreSQL** (Supabase em prod/dev)
- **next-auth 4** (Google provider, Prisma Adapter)
- **Tailwind CSS 3** + **shadcn/ui** (style `new-york`, base `slate`)
- **React Hook Form** + **zod** (validação)
- **sonner** (toasts), **react-day-picker** (calendário)

## Pré-requisitos

- Node.js 20+ e npm
- Um PostgreSQL acessível — local (via `docker compose up -d`) ou Supabase
- Credenciais Google OAuth (Client ID + Secret)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz (gitignored) com:

```env
DATABASE_URL="postgresql://USER:PASS@HOST:5432/DB?schema=public"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_AUTH_SECRET="..."
```

> Para o Postgres local via `docker-compose.yml`:
> `postgresql://postgres:password@localhost:5432/barbershop?schema=public`
>
> Gere um `NEXT_AUTH_SECRET` com: `openssl rand -base64 32`

## Setup

```bash
npm install              # roda `prisma generate` automaticamente (postinstall prepare)
docker compose up -d     # opcional: sobe Postgres local (container fsw-v3-postgres, :5432)
npx prisma migrate dev   # aplica/cria migrations
npx prisma db seed       # popula 10 barbearias + serviços (CommonJS via ts-node)
```

## Scripts

| Script             | Descrição                                                   |
| ------------------ | ----------------------------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento em `:3000`                     |
| `npm run build`    | Build de produção (inclui checagem de tipos)                |
| `npm run start`    | Sobe o build de produção                                    |
| `npm run lint`     | ESLint (config Rocketseat + `simple-import-sort`)           |

Sem script de typecheck dedicado — use `npx tsc --noEmit` quando precisar.

## Estrutura

```
app/
├─ (home)/            # route group: páginas de marketing/busca (não afeta a URL)
├─ barbershops/       # listagem e detalhe [id] com agendamento
├─ bookings/          # reservas do usuário logado
├─ api/auth/[...nextauth]/  # route handler do next-auth
├─ _actions/          # Server Actions (ex: cancel-booking.ts)
├─ _lib/              # prisma.ts (singleton), auth.ts, utils.ts
├─ _providers/        # AuthProvider (client)
├─ _components/       # UI reutilizável + componentes shadcn
└─ layout.tsx         # dark-only, fonte Nunito
prisma/
├─ schema.prisma      # User, Barbershop, Service, Booking + models next-auth
└─ seed.ts            # seed CommonJS (10 barbearias × 6 serviços)
```

Convenções importantes:

- Alias `@/*` aponta para a raiz do repo — prefira `@/app/...` a imports relativos.
- Importe o Prisma como `import { db } from '@/app/_lib/prisma'` — nunca instancie `new PrismaClient()` em outro lugar (singleton cacheado em `globalThis` em dev).
- Server Actions em `app/_actions/` — chame de server components ou boundaries `use server`, não de client components.
- O callback de sessão do next-auth injeta `user.id` em `session.user` — confie nele ao invés de re-consultar.
- Imports devem estar ordenados (`simple-import-sort`) ou `npm run lint` falha.

## Banco de dados e Supabase RLS

O app acessa o banco exclusivamente via Prisma (role `postgres`, que bypassa RLS). As migrations `20260717_enable_rls_*` habilitam Row Level Security nas tabelas do app e em `_prisma_migrations` para proteger o acesso pela API pública do Supabase (anon/authenticated):

- `Barbershop` e `Service`: leitura pública permitida (catálogo).
- `Booking`, `User`, `Account`, `Session`, `VerificationToken`: sem policies -> acesso só via service role (Prisma).

## Licença

Projeto de estudo — sem licença definida.