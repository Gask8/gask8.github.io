class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  startGame() {
    const gameIdToLoad = 1;
    if (this.model.loadGame(gameIdToLoad)) {
      this.view.renderGrid(this.model.getGrid());
      this.view.renderStrip(this.model.getStrip());
      this.view.bindGridCellClick(this.handleGridCellClick.bind(this));
    }
  }

  handleGridCellClick(targetElement) {
    const type = targetElement.dataset.type;
    const gridItemContainer = targetElement.closest(".grid-item-container");
    const gridIndex = gridItemContainer.dataset.gridIndex;

    let columnType;
    if (targetElement.classList.contains("grid-item-left")) {
      columnType = "left";
    } else if (targetElement.classList.contains("grid-item-op")) {
      columnType = "op";
    } else {
      columnType = "right";
    }

    const onSelect = (selectedValue, selectedIndex) => {
      // If user selects "Clear", value and index should be null
      const valueToSet = selectedValue === "Clear" ? null : selectedValue;
      const indexToSet = selectedValue === "Clear" ? null : selectedIndex;

      // Update the view first
      this.view.updateGridCellContent(targetElement, valueToSet);

      // Then, update the model and validate
      const isValid = this.model.updateGridItemState(
        gridIndex,
        columnType,
        valueToSet,
        indexToSet
      );

      // Finally, update the border based on validation
      this.view.updateGridItemBorder(gridIndex, isValid);

      // Update the strip appearance based on the new strip state
      this.view.updateStripAppearance(this.model.getStripState());
    };

    if (type === "operand") {
      const allStripItems = this.model
        .getStrip()
        .filter((item) => item.value !== null);
      const usedIndices = this.model.getUsedOperandIndices();

      // Find out which index is currently in the clicked cell, if any
      const gridState = this.model.gridState[gridIndex];
      const currentIndexInCell =
        columnType === "left"
          ? gridState.operandIndexA
          : gridState.operandIndexB;

      // An item is available if its index is not in the used set
      const availableItems = allStripItems.filter(
        (item) => !usedIndices.has(item.index)
      );

      // If a value is already in the cell, it should be available in the tooltip to allow re-selection or clearing.
      if (currentIndexInCell !== null) {
        const currentItem = this.model
          .getStrip()
          .find((item) => item.index === currentIndexInCell);
        if (currentItem) {
          availableItems.unshift(currentItem);
        }
      }

      // Add "Clear" option
      const tooltipItems = ["Clear", ...availableItems];
      this.view.createTooltip(tooltipItems, targetElement, onSelect);
    } else if (type === "operator") {
      this.view.createTooltip(
        [
          { value: "", index: null },
          { value: "+", index: 0 },
          { value: "*", index: 2 },
        ],
        targetElement,
        onSelect
      );
    }
  }
}
