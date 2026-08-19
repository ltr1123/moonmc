// RECETOR DOS TOPS - recebe os dados do plugin e guarda na KV da Vercel
// URL final: https://moonmc.vercel.app/api/tops/update
import { kv } from '@vercel/kv';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('metodo errado');
  }

  // ler o corpo do POST (formato: token=...&dados=...)
  let corpo = '';
  for await (const chunk of req) corpo += chunk;
  const params = new URLSearchParams(corpo);
  const token = params.get('token');
  const dados = params.get('dados');

  if (token !== process.env.TOPS_SEGREDO) {
    return res.status(403).send('token invalido');
  }
  if (!dados) {
    return res.status(400).send('sem dados');
  }

  // guarda por 7 dias (se o servidor parar de enviar, os tops somem)
  await kv.set('tops', dados, { ex: 7 * 86400 });
  return res.status(200).send('ok');
}