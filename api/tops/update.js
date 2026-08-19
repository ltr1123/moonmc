// RECETOR DOS TOPS (Vercel Blob)
// URL final: https://www.moonmc.com.br/api/tops/update
import { put } from '@vercel/blob';

export async function POST(request) {
  const texto = await request.text();
  const params = new URLSearchParams(texto);
  const token = params.get('token');
  const dados = params.get('dados');

  if (token !== process.env.TOPS_SEGREDO) {
    return new Response('token invalido', { status: 403 });
  }
  if (!dados) {
    return new Response('sem dados', { status: 400 });
  }

  await put('tops.json', dados, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true
  });
  return new Response('ok', { status: 200 });
}
