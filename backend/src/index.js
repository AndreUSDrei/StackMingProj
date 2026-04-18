require("dotenv").config();

const app = require("./app");
const { connectMySQL } = require("./db/mysql");
const { startConsolidationJob } = require("./jobs/consolidation");

const PORT = 8080;
const HOST = '0.0.0.0';

async function main() {
  // 1. Conecta MySQL
  await connectMySQL();
  console.log("[boot] MySQL conectado");

  // 2. Roda migrations na inicialização
  const { runMigrations } = require("./db/migrate");
  await runMigrations();
  console.log("[boot] Migrations OK");

  // 3. Inicia job de consolidação periódica
  startConsolidationJob();
  console.log("[boot] Job de consolidação iniciado");

  // 4. Sobe o servidor HTTP
  app.listen(PORT, HOST, () => {
    console.log(`[boot] API rodando em http://${HOST}:${PORT}`);
    console.log(`[boot] Modo mock: NÃO`);
  });
}

main().catch((err) => {
  console.error("[boot] Falha fatal:", err);
  process.exit(1);
});
