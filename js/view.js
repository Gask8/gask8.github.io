class View {
    constructor() {
        this.gridContainer = document.getElementById('grid-4x4');
        this.stripContainer = document.getElementById('number-strip');
    }

    renderGrid(gridData) {
        this.gridContainer.innerHTML = ''; // Clear existing content
        gridData.forEach(number => {
            // Create the main container for the grid item
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('grid-item-container');

            // Create the top part for the grid number
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('grid-item-number');
            numberDiv.textContent = number;
            itemContainer.appendChild(numberDiv);

            // Create the bottom part for the inputs
            const bottomDiv = document.createElement('div');
            bottomDiv.classList.add('grid-item-bottom');

            const leftInput = document.createElement('div');
            leftInput.classList.add('grid-item-left');
            // leftInput.textContent = 'A'; // Placeholder
            bottomDiv.appendChild(leftInput);

            const opDiv = document.createElement('div');
            opDiv.classList.add('grid-item-op');
            // opDiv.textContent = '+'; // Placeholder
            bottomDiv.appendChild(opDiv);

            const rightInput = document.createElement('div');
            rightInput.classList.add('grid-item-right');
            // rightInput.textContent = 'B'; // Placeholder
            bottomDiv.appendChild(rightInput);
            
            itemContainer.appendChild(bottomDiv);

            this.gridContainer.appendChild(itemContainer);
        });
    }

    renderStrip(stripData) {
        this.stripContainer.innerHTML = ''; // Clear existing content
        stripData.forEach((number, index) => {
            const cell = document.createElement('div');
            cell.classList.add('strip-cell');
            cell.dataset.index = index; // Store original index for potential interaction
            cell.textContent = number !== null ? number : ''; // Display empty for null
            this.stripContainer.appendChild(cell);
        });
    }
}
