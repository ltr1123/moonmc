// CREATE KEY - cria uma key manualmente (staff/bot)
// POST /api/keys/create  { token, player, package, validityHours? }
import { PACKAGES } from '../_lib/packages.js';
import { kvSet } from '../_lib/kv.js';
import { gerarKey, json } from '../_lib/keys.js';

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.token || body.token !== process.env.KEYS_SEGREDO) {
      return json({ error: 'token invalido' }, 403);
    }
    const nick = (body.player || '').trim();
    const pkgId = (body.package || '').toLowerCase();
    const pkg = PACKAGES[pkgId];
    if (!pkg) return json({ error: 'pacote invalido' }, 400);
    // nicks Bedrock (Floodgate/Geyser) começam com '.' — aceitar o ponto no início
    if (!/^\.?[A-Za-z0-9_]{1,16}$/.test(nick)) return json({ error: 'nick invalido' }, 400);

    const validadeHoras = Math.max(1, Math.min(168, parseInt(body.validityHours) || 48));
    const key = gerarKey();
    const rec = {
      package: pkgId,
      player: nick,
      commands: pkg.commands,
      created: Date.now(),
      expires: Date.now() + validadeHoras * 3600 * 1000
    };
    await kvSet(`key:${key}`, rec, validadeHoras * 3600);

    return json({ ok: true, key, package: pkgId, player: nick, validadeHoras });
  } catch (e) {
    return json({ error: 'erro interno' }, 500);
  }
}
