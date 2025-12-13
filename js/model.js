class Model {
    constructor() {
        this.currentGrid = [];
        this.currentStrip = [];
    }

    loadGame(gameId) {
        // Find the game data from the 'games' array in data.js
        const gameData = games.find(game => game.id === gameId);
        if (gameData) {
            this.currentGrid = [...gameData.grid];
            this.currentStrip = [...gameData.strip];
            return true;
        }
        console.error(`Game with ID ${gameId} not found.`);
        return false;
    }

    getGrid() {
        return this.currentGrid;
    }

    getStrip() {
        return this.currentStrip;
    }
}
