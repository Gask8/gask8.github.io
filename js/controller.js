class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    startGame() {
        // Assuming we start with the first game defined in data.js
        const gameIdToLoad = 1; 
        if (this.model.loadGame(gameIdToLoad)) {
            this.view.renderGrid(this.model.getGrid());
            this.view.renderStrip(this.model.getStrip());
        }
    }
}
