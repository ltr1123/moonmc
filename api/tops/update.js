// api/tops/update.js - Função serverless para Vercel
import { kv } from '@vercel/kv';

export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }
    
    const { token, dados } = req.body;
    const expectedToken = process.env.TOPS_SEGREDO || 'moonmc236';
    
    if (token !== expectedToken) {
        return res.status(403).json({ error: 'Token inválido' });
    }
    if (!dados) {
        return res.status(400).json({ error: 'Dados ausentes' });
    }
    
    try {
        await kv.set('tops', dados, { ex: 7 * 86400 });
        res.status(200).json({ success: true, message: 'Atualizado com sucesso' });
    } catch (error) {
        console.error('Erro KV:', error);
        res.status(500).json({ error: 'Falha ao armazenar dados' });
    }
}