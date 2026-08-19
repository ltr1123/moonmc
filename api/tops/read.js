// READ - sem SDK, fetch direto ao blob
// URL: /api/tops/read

export async function GET() {
  const empty = new Response('{}', {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' }
  });
  try {
    const storeId = process.env.BLOB_STORE_ID;
    if (!storeId) return empty;
    // storeId = "store_xxx" -> base = "https://xxx.public.blob.vercel-storage.com"
    const shortId = storeId.replace('store_', '').toLowerCase();
    const base = `https://${shortId}.public.blob.vercel-storage.com`;
    const resp = await fetch(`${base}/tops.json`, { cache: 'no-store' });
    if (!resp.ok) return empty;
    const dados = await resp.text();
    return new Response(dados, {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return empty;
  }
}
