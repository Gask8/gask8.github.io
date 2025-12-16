"use strict";
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.viewUpdateInterval = null;
  }

  init() {
    this.view.renderRules(rules_us, reglas_es, comments_es);
    this.bindEvents();
    this.startGame(1); // Start with game 1 by default
  }

  bindEvents() {
    const handlers = {
      gridCell: this.handleGridCellClick.bind(this),
      stripCell: this.handleStripCellClick.bind(this),
      gameSelection: this.handleGameSelectionClick.bind(this),
      rulesButton: this.handleShowRules.bind(this),
      closeModal: this.handleHideRules.bind(this),
    };
    this.view.init(handlers);
  }

  startGame(gameId = 1) {
    // Stop any existing timers
    this.model.stopTimer();
    if (this.viewUpdateInterval) {
      clearInterval(this.viewUpdateInterval);
    }

    // Load the new game
    if (this.model.loadGame(gameId)) {
      this.view.renderGrid(this.model.getGrid());
      this.view.renderStrip(
        this.model.getStrip(),
        this.model.getInitialStrip()
      );
      this.view.updateStripAppearance(this.model.getStripState());
      this.view.setActiveGameButton(gameId);

      // Start the new game timer
      this.model.startTimer();
      this.viewUpdateInterval = setInterval(() => {
        this.view.renderTimer(this.model.getElapsedTime());
      }, 1000);
    }
  }

  handleShowRules() {
    this.view.toggleModal(true);
  }

  handleHideRules() {
    this.view.toggleModal(false);
  }

  handleGameSelectionClick(gameId) {
    const confirmation = confirm(
      "Are you sure you want to change the game? Your current progress will be lost."
    );
    if (confirmation) {
      this.startGame(gameId);
    }
  }

  handleStripCellClick(targetElement) {
    const stripIndex = parseInt(targetElement.dataset.index);
    if (isNaN(stripIndex)) return;

    const onSelect = (selectedValue) => {
      if (selectedValue === "Clear") {
        selectedValue = null;
      }
      this.model.updateStripNumber(stripIndex, selectedValue);
      this.view.updateStripCell(stripIndex, selectedValue);
    };

    const validNumbers = this.model.getValidStripNumbers(stripIndex);
    const tooltipItems = ["Clear", ...validNumbers];
    this.view.createTooltip(tooltipItems, targetElement, onSelect);
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
      const valueToSet = selectedValue === "Clear" ? null : selectedValue;
      const indexToSet = selectedValue === "Clear" ? null : selectedIndex;

      this.view.updateGridCellContent(targetElement, valueToSet);

      const isValid = this.model.updateGridItemState(
        gridIndex,
        columnType,
        valueToSet,
        indexToSet
      );

      this.view.updateGridItemBorder(gridIndex, isValid);
      this.view.updateStripAppearance(this.model.getStripState());
    };

    if (type === "operand") {
      const allStripItems = this.model
        .getStrip()
        .filter((item) => item.value !== null);

      const usedIndices = this.model.getUsedOperandIndices();
      const availableItems = allStripItems.filter(
        (item) => !usedIndices.has(item.index)
      );

      const gridState = this.model.gridState[gridIndex];
      const indexAlreadyOnCell =
        gridState.operandIndexA || gridState.operandIndexB;
      if (indexAlreadyOnCell !== null) {
        const indexToRemove = availableItems.findIndex(
          (item) => item.index === indexAlreadyOnCell
        );

        if (indexToRemove !== -1) {
          availableItems.splice(indexToRemove, 1); // ✅ mutates array
        }
      }

      availableItems.sort((a, b) => a.value - b.value);
      const tooltipItems = ["Clear", ...availableItems];
      this.view.createTooltip(tooltipItems, targetElement, onSelect);
    } else if (type === "operator") {
      this.view.createTooltip(
        [
          { value: "Clear", index: null },
          { value: "+", index: 0 },
          { value: "*", index: 1 },
        ],
        targetElement,
        onSelect
      );
    }
  }
}
