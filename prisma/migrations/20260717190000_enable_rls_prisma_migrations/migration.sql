-- Habilita RLS na tabela interna de controle do Prisma.
-- Sem policies: só acessível via role de serviço (Prisma), que bypassa RLS.
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;