import { put } from '@vercel/blob';

function resposta(texto, status, tipo = 'text/plain') {
  return new Response(texto, {
    status,
    headers: {
      'Content-Type': tipo,
      'Cache-Control': 'no-store'
    }
  });
}

export async function POST(request) {
  try {
    const texto = await request.text();
    const params = new URLSearchParams(texto);

    const token = params.get('token');
    const dados = params.get('dados');

    if (token !== process.env.TOPS_SEGREDO) {
      return resposta('token invalido', 403);
    }

    if (!dados) {
      return resposta('sem dados', 400);
    }

    try {
      JSON.parse(dados);
    } catch {
      return resposta('dados invalidos', 400);
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('[tops/update] BLOB_READ_WRITE_TOKEN nao configurado');
      return resposta('armazenamento nao configurado', 500);
    }

    const blob = await put('tops.json', dados, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    console.log('[tops/update] tops.json salvo:', blob.url);

    return resposta('ok', 200);
  } catch (erro) {
    console.error('[tops/update] erro ao salvar:', erro);

    return resposta(
      `erro ao salvar tops: ${erro?.message || 'erro desconhecido'}`,
      500
    );
  }
}
