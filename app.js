class DragonTigerCounter {
    constructor() {
        // Datos históricos
        this.histDragons = 0;
        this.histTigers = 0;
        this.histTies = 0;
        
        // Conteo en vivo
        this.liveDragons = 0;
        this.liveTigers = 0;
        this.liveTies = 0;
        
        // Resultados
        this.wins = 0;
        this.losses = 0;
        this.balance = 0;
        
        // Mazos
        this.totalCards = 8 * 52;
        
        // Pantallas
        this.setupModal = document.getElementById('setupModal');
        this.gameScreen = document.getElementById('gameScreen');
        this.statsScreen = document.getElementById('statsScreen');
        
        // Botones
        this.startBtn = document.getElementById('startBtn');
        this.dragonBtn = document.getElementById('dragonBtn');
        this.tieBtn = document.getElementById('tieBtn');
        this.tigerBtn = document.getElementById('tigerBtn');
        this.winBtn = document.getElementById('winBtn');
        this.loseBtn = document.getElementById('loseBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.statsBtn = document.getElementById('statsBtn');
        this.exitBtn = document.getElementById('exitBtn');
        this.backBtn = document.getElementById('backBtn');
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startSession());
        this.dragonBtn.addEventListener('click', () => this.addCard('D'));
        this.tieBtn.addEventListener('click', () => this.addCard('E'));
        this.tigerBtn.addEventListener('click', () => this.addCard('T'));
        this.winBtn.addEventListener('click', () => this.recordWin());
        this.loseBtn.addEventListener('click', () => this.recordLoss());
        this.shuffleBtn.addEventListener('click', () => this.shuffleOccurred());
        this.statsBtn.addEventListener('click', () => this.showStats());
        this.exitBtn.addEventListener('click', () => this.exitSession());
        this.backBtn.addEventListener('click', () => this.hideStats());
    }
    
    startSession() {
        const dragons = parseInt(document.getElementById('histDragons').value) || 0;
        const tigers = parseInt(document.getElementById('histTigers').value) || 0;
        const ties = parseInt(document.getElementById('histTies').value) || 0;
        
        this.histDragons = dragons;
        this.histTigers = tigers;
        this.histTies = ties;
        
        this.setupModal.classList.remove('active');
        this.gameScreen.classList.remove('hidden');
        this.updateUI();
    }
    
    exitSession() {
        if (confirm('¿Terminar sesión?')) {
            this.setupModal.classList.add('active');
            this.gameScreen.classList.add('hidden');
            this.statsScreen.classList.add('hidden');
            this.resetLiveData();
        }
    }
    
    resetLiveData() {
        this.liveDragons = 0;
        this.liveTigers = 0;
        this.liveTies = 0;
        this.wins = 0;
        this.losses = 0;
        this.balance = 0;
    }
    
    addCard(card) {
        if (card === 'D') {
            this.liveDragons++;
        } else if (card === 'T') {
            this.liveTigers++;
        } else if (card === 'E') {
            this.liveTies++;
        }
        this.updateUI();
    }
    
    getTotalDragons() {
        return this.histDragons + this.liveDragons;
    }
    
    getTotalTigers() {
        return this.histTigers + this.liveTigers;
    }
    
    getTotalTies() {
        return this.histTies + this.liveTies;
    }
    
    getTotalHands() {
        return this.getTotalDragons() + this.getTotalTigers() + this.getTotalTies();
    }
    
    getCardsDealt() {
        return this.getTotalHands() * 2; // Dos cartas por mano
    }
    
    getDecksUsed() {
        return this.getCardsDealt() / 52;
    }
    
    getDecksRemaining() {
        return (8 - this.getDecksUsed()).toFixed(1);
    }
    
    getDifferencePercentage() {
        // Calcula diferencia porcentual: Tigres % - Dragones %
        const total = this.getTotalHands();
        if (total === 0) return 0;
        
        const dragPct = (this.getTotalDragons() / total) * 100;
        const tigerPct = (this.getTotalTigers() / total) * 100;
        
        // Resultado: +13 significa 13% más tigres, -13 significa 13% más dragones
        return tigerPct - dragPct;
    }
    
    getTrueCount() {
        // True Count simplificado: diferencia porcentual
        return this.getDifferencePercentage().toFixed(1);
    }
    
    updateSignal() {
        const tc = parseFloat(this.getTrueCount());
        const signal = document.getElementById('signal');
        signal.className = 'signal';
        
        // Si tigres están +10% o más por encima → TIGRE
        // Si dragones están +10% o más por encima → DRAGÓN
        // Si diferencia < 10% → ESPERA
        
        if (tc >= 10) {
            signal.textContent = '🐅 TIGRE';
            signal.classList.add('signal-tiger');
        } else if (tc <= -10) {
            signal.textContent = '🐉 DRAGÓN';
            signal.classList.add('signal-dragon');
        } else {
            signal.textContent = '⏸️ ESPERA';
            signal.classList.add('signal-wait');
        }
    }
    
    recordWin() {
        this.wins++;
        this.balance++;
        this.updateUI();
        this.flashMessage('✓ ¡Ganaste!', '#4caf50');
    }
    
    recordLoss() {
        this.losses++;
        this.balance--;
        this.updateUI();
        this.flashMessage('✗ Perdiste', '#f44336');
    }
    
    shuffleOccurred() {
        this.flashMessage('🔁 Mezcla registrada', '#ffaa00');
    }
    
    showStats() {
        this.statsScreen.classList.remove('hidden');
        this.updateStats();
    }
    
    hideStats() {
        this.statsScreen.classList.add('hidden');
    }
    
    updateStats() {
        const total = this.getTotalHands();
        const dragons = this.getTotalDragons();
        const tigers = this.getTotalTigers();
        const ties = this.getTotalTies();
        
        document.getElementById('statDragons').textContent = dragons;
        document.getElementById('statTigers').textContent = tigers;
        document.getElementById('statTies').textContent = ties;
        document.getElementById('statTotal').textContent = total;
        
        if (total > 0) {
            document.getElementById('statPercDragons').textContent = ((dragons/total)*100).toFixed(1) + '%';
            document.getElementById('statPercTigers').textContent = ((tigers/total)*100).toFixed(1) + '%';
            document.getElementById('statPercTies').textContent = ((ties/total)*100).toFixed(1) + '%';
        }
        
        const totalBets = this.wins + this.losses;
        document.getElementById('statWins').textContent = this.wins;
        document.getElementById('statLosses').textContent = this.losses;
        
        if (totalBets > 0) {
            document.getElementById('statAccuracy').textContent = ((this.wins/totalBets)*100).toFixed(1) + '%';
        }
    }
    
    updateUI() {
        document.getElementById('trueCount').textContent = this.getTrueCount();
        document.getElementById('totalHands').textContent = this.getTotalHands();
        document.getElementById('balance').textContent = this.balance > 0 ? '+' + this.balance : this.balance;
        
        document.getElementById('currentDragons').textContent = this.getTotalDragons();
        document.getElementById('currentTigers').textContent = this.getTotalTigers();
        document.getElementById('currentTies').textContent = this.getTotalTies();
        
        this.updateSignal();
    }
    
    flashMessage(message, color) {
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
