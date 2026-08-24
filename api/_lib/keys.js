// Geracao de keys seguras: MOON-XXXX-XXXX

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem caracteres ambiguos (0,O,1,I)

function bloco(tamanho) {
  let s = '';
  const arr = new Uint32Array(tamanho);
  crypto.getRandomValues(arr);
  for (let i = 0; i < tamanho; i++) {
    s += ALFABETO[arr[i] % ALFABETO.length];
  }
  return s;
}

export function gerarKey() {
  return `MOON-${bloco(4)}-${bloco(4)}`;
}

export function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
