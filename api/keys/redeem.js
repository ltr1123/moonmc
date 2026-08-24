// REDEEM KEY - chamado pelo plugin in-game (/key)
// POST /api/keys/redeem  { code, player, token }
import { kvGetDel } from '../_lib/kv.js';
import { json } from '../_lib/keys.js';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.token || body.token !== process.env.KEYS_SEGREDO) {
      return json({ error: 'token invalido' }, 403);
    }
    const code = (body.code || '').toUpperCase().trim();
    const player = (body.player || '').trim();
    if (!code || !player) return json({ error: 'dados incompletos' }, 400);

    // GETDEL atomico: se duas requisicoes chegarem ao mesmo tempo, so uma ganha
    const rec = await kvGetDel(`key:${code}`);
    if (!rec) return json({ error: 'key invalida ou ja usada' }, 404);
    if (rec.expires && Date.now() > rec.expires) {
      return json({ error: 'key expirada' }, 410);
    }
    if (rec.player && rec.player.toLowerCase() !== player.toLowerCase()) {
      return json({ error: 'key de outro jogador' }, 403);
    }

    return json({ ok: true, package: rec.package, player: rec.player, commands: rec.commands || [] });
  } catch (e) {
    return json({ error: 'erro interno' }, 500);
  }
}
