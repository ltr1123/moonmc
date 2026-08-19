// Lógica principal do testador com cache e polling
const CACHE_KEY = 'moonmc_tops_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
// Usar API local para desenvolvimento, produção usa a URL real
const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8080/api/tops' : 'https://moonmc.vercel.app/api/tops';
const POLLING_INTERVAL = 30000; // 30 segundos

let pollingActive = true;
let lastUpdate = null;
let currentData = null;

function parseTops(data) {
    if (!data || data === '{}') return null;
    try {
        const parsed = JSON.parse(data);
        const result = {};
        if (parsed.kills) {
            result.kills = parsed.kills.split('|').map(item => {
                const [player, kills] = item.split(':');
                return { player, kills: parseInt(kills) };
            }).sort((a, b) => b.kills - a.kills);
        }
        if (parsed.mortes) {
            result.mortes = parsed.mortes.split('|').map(item => {
                const [player, mortes] = item.split(':');
                return { player, mortes: parseInt(mortes) };
            }).sort((a, b) => b.mortes - a.mortes);
        }
        if (parsed.money) {
            result.money = parsed.money.split('|').map(item => {
                const [player, money] = item.split(':');
                return { player, money: parseInt(money) };
            }).sort((a, b) => b.money - a.morte);
        }
        return result;
    } catch (e) {
        console.error('Erro ao parsear dados:', e);
        return null;
    }
}

function renderTable(data, tableId, type) {
    const tbody = document.getElementById(`${type}-table`);
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Sem dados</td></tr>';
        return;
    }
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${index + 1}</td><td>${item.player}</td><td>${item[type]}</td>`;
        tbody.appendChild(tr);
    });
}

function updateDisplay(data) {
    const now = Date.now();
    const age = lastUpdate ? Math.floor((now - lastUpdate) / 1000) : null;
    const statusEl = document.getElementById('status');
    statusEl.className = 'status updated';
    statusEl.textContent = `Atualizado há ${age}s`;

    // Parse data and also prepare full player list for the "Todos os Jogadores" table
const parsed = parseTops(data);
const fullPlayersList = {};
if (parsed && parsed.kills) {
    parsed.kills.forEach(p => {
        fullPlayersList[p.player] = {
            kills: p.kills,
            mortes: parsed.mortes?.find(m => m.player === p.player)?.mortes || '-'
        };
    });
}
if (parsed && parsed.money) {
    Object.entries(parsed.money).forEach(([player, money]) => {
        if (!fullPlayersList[player]) fullPlayersList[player] = {};
        fullPlayersList[player].money = money;
    });
}

// Render all tables
if (parsed) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('hidden'));
    if (parsed.kills) renderTable(parsed.kills, 'kills', 'kills');
    if (parsed.mortes) renderTable(parsed.mortes, 'mortes', 'mortes');
    if (parsed.money) renderTable(parsed.money, 'money', 'money');
    // Render complete player list
    renderPlayersList(fullPlayersList);
} else {
    document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
}
    if (parsed) {
        document.querySelectorAll('.section').forEach(section => section.classList.remove('hidden'));
        if (parsed.kills) renderTable(parsed.kills, 'kills', 'kills');
        if (parsed.mortes) renderTable(parsed.mortes, 'mortes', 'mortes');
        if (parsed.money) renderTable(parsed.money, 'money', 'money');
    }
}

async function fetchData() {
    try {
        const response = await fetch(`${API_BASE}/read`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

async function fetchAndUpdate() {
    if (!pollingActive) return;

    const statusEl = document.getElementById('status');
    statusEl.className = 'status loading';
    statusEl.textContent = 'Atualizando...';

    const freshData = await fetchData();

    if (freshData) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: freshData,
            timestamp: Date.now()
        }));
        lastUpdate = Date.now();
        currentData = freshData;
        updateDisplay(freshData);
    } else {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const parsedCache = JSON.parse(cached);
                const age = Date.now() - parsedCache.timestamp;
                if (age < CACHE_DURATION) {
                    statusEl.className = 'status updated';
                    statusEl.textContent = 'Dados em cache (offline)';
                    updateDisplay(parsedCache.data);
                    return;
                }
            } catch (e) {
                console.error('Cache inválido:', e);
            }
        }
        statusEl.className = 'status error';
        statusEl.textContent = 'Sem conexão com o servidor';
        document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
    }
}

function startPolling() {
    fetchAndUpdate();
    setInterval(fetchAndUpdate, POLLING_INTERVAL);
}

function init() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const parsedCache = JSON.parse(cached);
            const age = Date.now() - parsedCache.timestamp;
            if (age < CACHE_DURATION) {
                const statusEl = document.getElementById('status');
                statusEl.className = 'status updated';
                statusEl.textContent = 'Carregando do cache...';
                updateDisplay(parsedCache.data);
                startPolling();
                return;
            }
        } catch (e) {
            console.error('Cache inválido:', e);
        }
    }
    startPolling();
}

// Exportar funções para uso externo se necessário
// Função para renderizar lista de todos os jogadores
function renderPlayersList(data) {
    const tbody = document.getElementById('players-table');
    if (!data || Object.keys(data).length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Sem jogadores cadastrados</td></tr>';
        return;
    }
    tbody.innerHTML = '';
    Object.entries(data).forEach(([player, stats]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${player}</td><td>${stats.kills || '-'}</td><td>${stats.mortes || '-'}</td><td>${stats.money || '-'}</td>`;
        tbody.appendChild(tr);
    });
}

// Exportar funções para uso externo se necessário
window.MoonMC = { init, fetchAndUpdate, renderPlayersList };