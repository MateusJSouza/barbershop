-- Habilita Row Level Security em todas as tabelas gerenciadas pelo Prisma.
-- O app acessa o banco exclusivamente via Prisma (role `postgres`, que bypassa RLS),
-- portanto o acesso interno continua funcionando. RLS aqui protege o acesso via
-- API pública do Supabase (anon/authenticated).

ALTER TABLE "Barbershop"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Service"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken"   ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública para o catálogo (barbershops e serviços)
CREATE POLICY "barbershop_read_public"
  ON "Barbershop" FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "service_read_public"
  ON "Service" FOR SELECT
  TO anon, authenticated
  USING (true);

-- Demais tabelas (Booking, User, Account, Session, VerificationToken) ficam sem policies:
-- qualquer acesso via API pública do Supabase é negado. Acesso só via Prisma/service_role.