// KV via Vercel Blob (como o sistema de tops) - sem Redis, sem dependencias extra
// Todas as chaves ficam num unico blob keys.json (le/grava por cima).
// Requer apenas o BLOB_READ_WRITE_TOKEN + BLOB_STORE_ID (fornecidos automaticamente
// pelo Vercel quando um Blob Store esta ligado ao projeto - mesmo que o dos tops).
//
// IMPORTANTE: NAO usar list() aqui - o Vercel Blob guarda versoes antigas ao
// sobrescrever e o list() pode devolver uma versao velha do ficheiro (blobs[0]),
// fazendo as keys novas parecerem "invalidadas". Usamos a URL fixa e deterministica
// (mesmo padrao do api/tops/read.js), que serve sempre a versao mais recente.

import { put } from '@vercel/blob';

const ARQUIVO = 'keys.json';

// storeId = "store_xxx" -> base = "https://xxx.public.blob.vercel-storage.com"
function getBase() {
  const storeId = process.env.BLOB_STORE_ID;
  if (!storeId) return null;
  const shortId = storeId.replace('store_', '').toLowerCase();
  return `https://${shortId}.public.blob.vercel-storage.com`;
}

// Nota: o Blob tem propagacao eventual (CDN) - logo apos um put, um fetch
// imediato pode devolver a versao anterior do ficheiro. As funcoes abaixo
// tentam varias vezes antes de desistir para nao marcar keys como invalidas.

async function lerTudo() {
  const base = getBase();
  if (!base) return {};
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    try {
      const resp = await fetch(`${base}/${ARQUIVO}`, { cache: 'no-store' });
      if (resp.ok) {
        const texto = await resp.text();
        return texto ? JSON.parse(texto) : {};
      }
      // 404 = ficheiro ainda nao existe (ou CDN ainda nao propagou) -> tenta de novo
      if (resp.status !== 404) return {};
    } catch (e) {}
    await new Promise(r => setTimeout(r, 400 * (tentativa + 1)));
  }
  return {};
}

async function gravarTudo(dados) {
  try {
    await put(ARQUIVO, JSON.stringify(dados), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function kvGet(key) {
  const dados = await lerTudo();
  return dados[key] || null;
}

export async function kvSet(key, value, ttlSeconds) {
  const dados = await lerTudo();
  const rec = { ...value };
  if (!rec.expires && ttlSeconds) rec.expires = Date.now() + ttlSeconds * 1000;
  dados[key] = rec;
  return gravarTudo(dados);
}

// get + delete: garante uso unico da key (nunca resgata 2x).
// Nota: Blob nao tem atomicidade real — a janela de corrida e minima e
// irrelevante para o volume da loja (o player ainda tem de bater certo).
export async function kvGetDel(key) {
  // Propagacao eventual: se a key nao aparecer de primeira, o CDN pode estar
  // a servir uma versao antiga do keys.json (criada ha segundos). Re-tenta.
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    const dados = await lerTudo();
    const rec = dados[key] || null;
    if (rec) {
      delete dados[key];
      await gravarTudo(dados);
      return rec;
    }
    await new Promise(r => setTimeout(r, 300 * (tentativa + 1)));
  }
  return null;
}
