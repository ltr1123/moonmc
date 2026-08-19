const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

// Serve static files
app.use(express.static('.'));

// API endpoints
app.get('/api/tops/read', (req, res) => {
    // Lê dados do cache local ou do KV
    let dados = '{}';
    try {
        const cache = fs.readFileSync('tops_cache.json', 'utf8');
        if (cache) dados = cache;
    } catch (e) {
        // ignora se não existe
    }
    res.json(JSON.parse(dados));
});
  res.json({
    kills: 'Player1:150|Player2:120|Player3:95',
    mortes: 'Player1:45|Player2:38|Player3:52',
    money: 'Player1:5000|Player2:3200|Player3:1500'
  });
});

app.post('/api/tops/update', express.text(), (req, res) => {
    // Atualização via plugin (plugin envia dados)
    const token = new URLSearchParams(req.body).get('token');
    const dados = new URLSearchParams(req.body).get('dados');
    
    if (token !== 'moonmc236') {
        return res.status(403).send('token invalido');
    }
    if (!dados) {
        return res.status(400).send('sem dados');
    }
    
    // Atualiza cache local
    fs.writeFileSync('tops_cache.json', dados);
    
    // Notifica clientes via WebSocket (se implementado)
    // Em produção, enviar para Vercel Blob
    
    res.status(200).send('ok');
});
  const token = new URLSearchParams(req.body).get('token');
  const dados = new URLSearchParams(req.body).get('dados');
  
  if (token !== 'moonmc236') {
    return res.status(403).send('token invalido');
  }
  if (!dados) {
    return res.status(400).send('sem dados');
  }
  
  // Simula armazenamento no KV
  fs.writeFileSync('tops_cache.json', dados);
  res.status(200).send('ok');
});

// Serve the testador page
app.get('/testador', (req, res) => {
  res.sendFile(path.join(__dirname, 'testador.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Access testador at: http://localhost:${PORT}/testador`);
});