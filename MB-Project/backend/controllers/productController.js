// Fylls på i products-branchen.
// Lägger en enkel placeholder för att allt ska bygga.
export async function getHealth(req, res) {
  res.json({ ok: true, service: "backend", ts: new Date().toISOString() });
}

