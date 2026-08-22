const express = require('express');
const { Redis } = require('@upstash/redis');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Redis client - Upstash em produção, memória local em dev
let redis;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_AUTH_TOKEN) {
    redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_AUTH_TOKEN
    });
} else {
    // Fallback para memória local em desenvolvimento
    const memoryStore = new Map();
    redis = {
        get: async (key) => memoryStore.get(key),
        set: async (key, value, options) => {
            memoryStore.set(key, value);
            if (options?.ex) {
                setTimeout(() => memoryStore.delete(key), options.ex * 1000);
            }
        }
    };
}

// GET endpoint - Lê tops do Redis
app.get('/api/tops/read', async (req, res) => {
    try {
        const tops = await redis.get('tops');
        const dados = tops || '{}';
        res.json(JSON.parse(dados));
    } catch (error) {
        console.error('Erro ao ler tops:', error);
        res.status(500).json({ error: 'Falha ao carregar dados' });
    }
});

// POST endpoint - Atualiza tops no Redis
app.post('/api/tops/update', async (req, res) => {
    const { token, dados } = req.body;
    const expectedToken = process.env.TOPS_SEGREDO || 'moonmc236';
    
    if (token !== expectedToken) {
        return res.status(403).json({ error: 'Token inválido' });
    }
    if (!dados) {
        return res.status(400).json({ error: 'Dados ausentes' });
    }
    
    try {
        await redis.set('tops', dados, { ex: 7 * 86400 });
        res.json({ success: true, message: 'Dados atualizados' });
    } catch (error) {
        console.error('Erro ao atualizar tops:', error);
        res.status(500).json({ error: 'Falha ao armazenar dados' });
    }
});

// Serve páginas estáticas
app.get('/testador', (req, res) => {
    res.sendFile(path.join(__dirname, 'testador.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

module.exports = app;
