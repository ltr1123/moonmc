// CRIAR PIX - gera um pagamento Pix no Mercado Pago e devolve o QR code
// POST /api/payments/create  { nick, package }
import { PACKAGES } from '../_lib/packages.js';
import { kvSet } from '../_lib/kv.js';
import { json } from '../_lib/keys.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const nick = (body.nick || '').trim();
    const pkgId = (body.package || '').toLowerCase();
    const pkg = PACKAGES[pkgId];

    if (!pkg) return json({ error: 'pacote invalido' }, 400);
    if (!/^[A-Za-z0-9_]{1,16}$/.test(nick)) return json({ error: 'nick invalido' }, 400);

    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) return json({ error: 'pagamento indisponivel no momento' }, 500);

    const externalReference = `moon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const payerEmail = process.env.MP_PAYER_EMAIL || 'loja@moonmc.com.br';
    const baseUrl = process.env.SITE_URL || 'https://www.moonmc.com.br';

    const mpRes = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mpToken}`
      },
      body: JSON.stringify({
        transaction_amount: pkg.price,
        description: `MoonMC - ${pkg.name}`,
        payment_method_id: 'pix',
        payer: { email: payerEmail },
        external_reference: externalReference,
        notification_url: `${baseUrl}/api/payments/webhook`
      })
    });

    const mp = await mpRes.json();
    const qr = mp.point_of_interaction && mp.point_of_interaction.transaction_data;
    if (mp.status === 'rejected' || !qr) {
      return json({ error: 'erro ao gerar o pix' }, 500);
    }

    // guarda o pagamento pendente (3h de validade do QR)
    await kvSet(`payment:${mp.id}`, {
      player: nick,
      package: pkgId,
      key: null,
      external: externalReference
    }, 3 * 3600);

    return json({
      ok: true,
      payment_id: String(mp.id),
      qr_code: qr.qr_code,
      qr_code_base64: qr.qr_code_base64,
      expires: qr.expiration_date || null
    });
  } catch (e) {
    return json({ error: 'erro interno' }, 500);
  }
}
