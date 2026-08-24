// CHECK - a pagina da loja pergunta se o pagamento ja foi aprovado e busca a key
// GET /api/payments/check?payment=<id>&nick=<nick>
import { kvGet } from '../_lib/kv.js';
import { json } from '../_lib/keys.js';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const paymentId = (url.searchParams.get('payment') || '').trim();
    const nick = (url.searchParams.get('nick') || '').trim();
    if (!paymentId || !nick) return json({ status: 'error' }, 400);

    const rec = await kvGet(`payment:${paymentId}`);
    if (!rec) return json({ status: 'notfound' });

    if (rec.key && rec.player && rec.player.toLowerCase() === nick.toLowerCase()) {
      return json({ status: 'paid', key: rec.key, package: rec.package });
    }
    return json({ status: 'pending' });
  } catch (e) {
    return json({ status: 'error' }, 500);
  }
}
