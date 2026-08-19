// DEVOLVE OS TOPS
// URL final: https://moonmc.vercel.app/api/tops/read
import { kv } from '@vercel/kv';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  const dados = await kv.get('tops');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  return res.status(200).send(dados || '{}');
}