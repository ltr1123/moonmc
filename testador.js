        const API_BASE = 'https://www.moonmc.com.br';
        
        const BOARD_MAP = {
            'statistic_player_kills': 'kills',
            'statistic_deaths': 'mortes',
            'vault_eco_balance': 'money'
        };
        
        async function fetchLeaderboard() {
            const response = await fetch(`${API_BASE}/api/tops/read`);
            if (!response.ok) throw new Error('Falha');
            return await response.json();
        }
        
        function renderLeaderboard(data) {
            const container = document.getElementById('leaderboard-content');
            container.innerHTML = '';
            
            if (!data || !data.boards) {
                container.innerHTML = '<div class="leaderboard-error">Sem dados</div>';
                return;
            }
            
            const playerData = {};
            data.boards.forEach(board => {
                const col = BOARD_MAP[board.board];
                if (!col || !board.entries) return;
                board.entries.forEach(e => {
                    if (!playerData[e.name]) playerData[e.name] = {};
                    playerData[e.name][col] = e.value;
                });
            });
            
            const sorted = Object.entries(playerData)
                .map(([name, s]) => ({ name, ...s }))
                .sort((a, b) => (parseInt(b.kills) || 0) - (parseInt(a.kills) || 0));
            
            const table = document.createElement('table');
            table.className = 'leaderboard-table';
            
            const thead = document.createElement('thead');
            const trH = document.createElement('tr');
            ['Posição', 'Jogador', 'Kills', 'Mortes', 'Dinheiro'].forEach(t => {
                const th = document.createElement('th');
                th.textContent = t;
                trH.appendChild(th);
            });
            thead.appendChild(trH);
            table.appendChild(thead);
            
            const tbody = document.createElement('tbody');
            sorted.forEach((item, i) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td class="leaderboard-rank">${i+1}</td><td class="leaderboard-name">${item.name}</td><td>${(parseInt(item.kills)||0).toLocaleString()}</td><td>${(parseInt(item.mortes)||0).toLocaleString()}</td><td>${(parseInt(item.money)||0).toLocaleString()}</td>`;
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            container.appendChild(table);
        }
        
        function updateLeaderboard() {
            fetchLeaderboard().then(data => {
                renderLeaderboard(data);
                showToast('Dados atualizados!');
            }).catch(() => showToast('Erro ao atualizar'));
        }
        
        fetchLeaderboard().then(data => {
            renderLeaderboard(data);
            setInterval(fetchLeaderboard, 30000).then(d => d && renderLeaderboard(d));
        });
