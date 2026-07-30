class DragonTigerCounter {
    constructor() {
        // Conteo
        this.runningCount = 0;
        this.cardsDealt = 0;
        this.totalCards = 8 * 52; // 8 mazos
        
        // Historial
        this.handsPlayed = 0;
        this.wins = 0;
        this.losses = 0;
        this.balance = 0;
        
        // Elementos del DOM
        this.elements = {
            runningCount: document.getElementById('runningCount'),
            decksLeft: document.getElementById('decksLeft'),
            trueCount: document.getElementById('trueCount'),
            signal: document.getElementById('signal'),
            dragonBtn: document.getElementById('dragonBtn'),
            tieBtn: document.getElementById('tieBtn'),
            tigerBtn: document.getElementById('tigerBtn'),
            winBtn: document.getElementById('winBtn'),
            loseBtn: document.getElementById('loseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            shuffleBtn: document.getElementById('shuffleBtn'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            handCount: document.getElementById('handCount'),
            winsCount: document.getElementById('winsCount'),
            lossCount: document.getElementById('lossCount'),
            balance: document.getElementById('balance')
        };
        
        this.init();
    }
    
    init() {
        // Cargar datos guardados
        this.loadFromStorage();
        
        // Event listeners
        this.elements.dragonBtn.addEventListener('click', () => this.addCard('D'));
        this.elements.tieBtn.addEventListener('click', () => this.addCard('E'));
        this.elements.tigerBtn.addEventListener('click', () => this.addCard('T'));
        this.elements.winBtn.addEventListener('click', () => this.recordWin());
        this.elements.loseBtn.addEventListener('click', () => this.recordLoss());
        this.elements.resetBtn.addEventListener('click', () => this.resetCounting());
        this.elements.shuffleBtn.addEventListener('click', () => this.shuffleOccurred());
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        this.updateUI();
    }
    
    // Conteo de cartas: sistema Baccarat simplificado
    getCardValue(card) {
        // En Dragon Tiger no importa si es D o T
        // Lo importante es el puntaje de la carta
        // Pero como solo recibimos D/T/E, asumimos cartas normales
        // Usaremos un conteo basado en probabilidades
        
        // Para simplificar: cada carta tiene valor neutral
        // Usaremos un conteo alternativo basado en tendencias
        return 0; // Neutral para Dragon Tiger básico
    }
    
    // Versión mejorada: conteo de tendencias para Dragon Tiger
    addCard(card) {
        // En Dragon Tiger puro, contamos basado en el resultado anterior
        // Si Dragon ganó muchas, TIGRE es más probable (tendencia contraria)
        
        if (card === 'D') {
            this.runningCount -= 1; // Dragón es favorable a Dragón
            this.balance -= 1; // Descuenta como si fuera carta alta
        } else if (card === 'T') {
            this.runningCount += 1; // Tigre es favorable a Tigre
            this.balance += 1;
        } else if (card === 'E') {
            // Empate es neutral
        }
        
        this.cardsDealt += 2; // Dragon Tiger reparte 2 cartas por mano
        this.saveToStorage();
        this.updateUI();
    }
    
    getDecksRemaining() {
        return ((this.totalCards - this.cardsDealt) / 52).toFixed(1);
    }
    
    getTrueCount() {
        const decksLeft = parseFloat(this.getDecksRemaining());
        if (decksLeft <= 0) return 0;
        return (this.runningCount / decksLeft).toFixed(1);
    }
    
    updateSignal() {
        const trueCount = parseFloat(this.getTrueCount());
        const signalEl = this.elements.signal;
        
        // Limpiar clases
        signalEl.className = 'signal';
        
        if (trueCount >= 4) {
            signalEl.textContent = '🐉 DRAGÓN';
            signalEl.classList.add('signal-dragon');
        } else if (trueCount <= -4) {
            signalEl.textContent = '🐅 TIGRE';
            signalEl.classList.add('signal-tiger');
        } else if (trueCount > -3 && trueCount < 3) {
            signalEl.textContent = '⏸️ ESPERA';
            signalEl.classList.add('signal-wait');
        } else {
            signalEl.textContent = '-';
            signalEl.classList.add('signal-neutral');
        }
    }
    
    recordWin() {
        this.handsPlayed++;
        this.wins++;
        this.saveToStorage();
        this.updateUI();
        this.flashMessage('✓ ¡Ganaste!', '#4caf50');
    }
    
    recordLoss() {
        this.handsPlayed++;
        this.losses++;
        this.saveToStorage();
        this.updateUI();
        this.flashMessage('✗ Perdiste', '#f44336');
    }
    
    resetCounting() {
        if (confirm('¿Resetear el conteo? (Sin borrar historial)')) {
            this.runningCount = 0;
            this.cardsDealt = 0;
            this.saveToStorage();
            this.updateUI();
            this.flashMessage('🔄 Conteo reseteado', '#00ff88');
        }
    }
    
    shuffleOccurred() {
        if (confirm('¿Se realizó la mezcla? (Resetear conteo)')) {
            this.resetCounting();
            this.flashMessage('🔁 Nueva mezcla', '#ffaa00');
        }
    }
    
    clearHistory() {
        if (confirm('¿Limpiar TODO el historial? Esta acción no se puede deshacer')) {
            this.handsPlayed = 0;
            this.wins = 0;
            this.losses = 0;
            this.balance = 0;
            this.runningCount = 0;
            this.cardsDealt = 0;
            localStorage.removeItem('dragonTigerData');
            this.updateUI();
            this.flashMessage('🗑️ Historial limpiado', '#00ff88');
        }
    }
    
    updateUI() {
        this.elements.runningCount.textContent = this.runningCount;
        this.elements.decksLeft.textContent = this.getDecksRemaining();
        this.elements.trueCount.textContent = this.getTrueCount();
        
        this.elements.handCount.textContent = this.handsPlayed;
        this.elements.winsCount.textContent = this.wins;
        this.elements.lossCount.textContent = this.losses;
        this.elements.balance.textContent = this.balance > 0 ? '+' + this.balance : this.balance;
        
        this.updateSignal();
    }
    
    saveToStorage() {
        const data = {
            runningCount: this.runningCount,
            cardsDealt: this.cardsDealt,
            handsPlayed: this.handsPlayed,
            wins: this.wins,
            losses: this.losses,
            balance: this.balance,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('dragonTigerData', JSON.stringify(data));
    }
    
    loadFromStorage() {
        const saved = localStorage.getItem('dragonTigerData');
        if (saved) {
            const data = JSON.parse(saved);
            this.runningCount = data.runningCount || 0;
            this.cardsDealt = data.cardsDealt || 0;
            this.handsPlayed = data.handsPlayed || 0;
            this.wins = data.wins || 0;
            this.losses = data.losses || 0;
            this.balance = data.balance || 0;
        }
    }
    
    flashMessage(message, color) {
        // Crear elemento temporal
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${color};
            color: #fff;
            padding: 20px 40px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.2rem;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        flash.textContent = message;
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => flash.remove(), 300);
        }, 1500);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DragonTigerCounter();
});

// Agregar animaciones con CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%);
        }
    }
`;
document.head.appendChild(style);
