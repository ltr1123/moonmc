// WEBHOOK - o Mercado Pago avisa quando o pagamento foi aprovado -> gera a key
// POST /api/payments/webhook  { type: "payment", data: { id: ... } }
import { PACKAGES } from '../_lib/packages.js';
import { kvGet, kvSet } from '../_lib/kv.js';
import { gerarKey } from '../_lib/keys.js';

const VALIDADE_KEY_HORAS = 48;

export async function POST(request) {
  // Sempre responder 200/ok para o MP nao reenviar infinitamente
  try {
    const body = await request.json();
    const mpId = body && body.data && body.data.id;
    if (!mpId) return new Response('ok');

    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) return new Response('ok');

    // Confirma o status real do pagamento na API do MP (mais seguro que confiar no webhook)
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${mpId}`, {
      headers: { Authorization: `Bearer ${mpToken}` }
    });
    if (!mpRes.ok) return new Response('ok');
    const mp = await mpRes.json();
    if (mp.status !== 'approved') return new Response('ok');

    let rec = await kvGet(`payment:${mp.id}`);
    if (!rec) return new Response('ok');
    if (rec.key) return new Response('ok'); // ja entregue antes (idempotente)

    const pkg = PACKAGES[rec.package];
    if (!pkg) return new Response('ok');

    const key = gerarKey();
    await kvSet(`key:${key}`, {
      package: rec.package,
      player: rec.player,
      commands: pkg.commands,
      created: Date.now(),
      expires: Date.now() + VALIDADE_KEY_HORAS * 3600 * 1000
    }, VALIDADE_KEY_HORAS * 3600);

    rec.key = key;
    await kvSet(`payment:${mp.id}`, rec, 3 * 3600);

    // Aviso opcional no Discord (webhook de canal ou do teu bot)
    const discordUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordUrl) {
      await fetch(discordUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `✅ Pagamento aprovado! **${pkg.name}** para \`${rec.player}\`\nKey: \`${key}\``
        })
      }).catch(() => {});
    }

    return new Response('ok');
  } catch (e) {
    return new Response('ok');
  }
}
