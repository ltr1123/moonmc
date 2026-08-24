// KV via Vercel Blob (como o sistema de tops) - sem Redis, sem dependencias extra
// Todas as chaves ficam num unico blob keys.json (le/grava por cima).
// Requer apenas o BLOB_READ_WRITE_TOKEN (fornecido automaticamente pelo Vercel
// quando um Blob Store esta ligado ao projeto - mesmo que o dos tops).

import { put, list } from '@vercel/blob';

const ARQUIVO = 'keys.json';
let urlCache = null; // URL do blob (nao muda enquanto o ficheiro existir)

async function getUrl() {
  if (urlCache) return urlCache;
  try {
    const res = await list({ prefix: ARQUIVO });
    if (res.blobs && res.blobs.length) {
      urlCache = res.blobs[0].url;
      return urlCache;
    }
  } catch (e) {}
  return null;
}

async function lerTudo() {
  const url = await getUrl();
  if (!url) return {};
  try {
    const res = await fetch(url);
    if (!res.ok) return {};
    const texto = await res.text();
    return texto ? JSON.parse(texto) : {};
  } catch (e) {
    return {};
  }
}

async function gravarTudo(dados) {
  try {
    const res = await put(ARQUIVO, JSON.stringify(dados), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true
    });
    urlCache = res.url;
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
  const dados = await lerTudo();
  const rec = dados[key] || null;
  if (rec) {
    delete dados[key];
    await gravarTudo(dados);
  }
  return rec;
}
