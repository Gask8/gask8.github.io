class Model {
  constructor() {
    this.currentGrid = [];
    this.currentStrip = [];
    this.gridState = [];
    this.stripState = [];
  }

  loadGame(gameId) {
    const gameData = games.find((game) => game.id === gameId);
    if (gameData) {
      this.currentGrid = [...gameData.grid];
      this.currentStrip = [...gameData.strip];
      this.initializeGridState();
      this.initializeStripState();
      return true;
    }
    console.error(`Game with ID ${gameId} not found.`);
    return false;
  }

  initializeGridState() {
    this.gridState = this.currentGrid.map(() => ({
      operandA: null,
      operandIndexA: null,
      operator: null,
      operandB: null,
      operandIndexB: null,
      isValid: null, // null: incomplete, true: valid, false: invalid
    }));
  }

  initializeStripState() {
    this.stripState = this.currentStrip.map(() => ({
      operatorPlus: false,
      operatorMultiply: false,
    }));
  }

  getGrid() {
    return this.currentGrid;
  }

  getStrip() {
    const returnStrip = this.currentStrip.map((number, index) => ({
      value: number,
      index: index,
    }));
    return returnStrip;
  }

  getStripState() {
    return this.stripState;
  }

  updateGridItemState(gridIndex, columnType, value, operandIndex) {
    const state = this.gridState[gridIndex];
    if (!state) return;
    if (operandIndex === null) {
      value = null;
    }

    if (columnType === "left") {
      if (value === null || operandIndex !== state.operandIndexA) {
        this.updateStripOperatorState(
          state.operandIndexA,
          state.operator,
          false
        );
      }
      state.operandA = value;
      state.operandIndexA = operandIndex;
      this.updateStripOperatorState(operandIndex, state.operator, true);
    } else if (columnType === "op") {
      if (value === null || state.operator !== value) {
        this.updateStripStatesForOperator(state, false);
      }
      state.operator = value;
      this.updateStripStatesForOperator(state, true);
    } else if (columnType === "right") {
      if (value === null || operandIndex !== state.operandIndexA) {
        this.updateStripOperatorState(
          state.operandIndexB,
          state.operator,
          false
        );
      }
      state.operandB = value;
      state.operandIndexB = operandIndex;
      this.updateStripOperatorState(operandIndex, state.operator, true);
    }

    return this.validateGridItem(gridIndex);
  }

  updateStripOperatorState(stripIndex, operator, value) {
    const state = this.stripState[stripIndex];
    if (!state) return;

    if (operator === "+") {
      state.operatorPlus = value;
    } else if (operator === "*") {
      state.operatorMultiply = value;
    }
    return state;
  }

  updateStripStatesForOperator(gridState, bool) {
    const value = gridState.operator;

    const operandAIndex = gridState.operandIndexA;
    const operandBIndex = gridState.operandIndexB;

    if (operandAIndex !== null) {
      this.updateStripOperatorState(operandAIndex, value, bool);
    }
    if (operandBIndex !== null) {
      this.updateStripOperatorState(operandBIndex, value, bool);
    }
  }

  validateGridItem(gridIndex) {
    const state = this.gridState[gridIndex];
    const targetNumber = this.currentGrid[gridIndex];

    // Only validate if all parts are filled
    if (
      state.operandA === null ||
      state.operator === null ||
      state.operandB === null
    ) {
      state.isValid = null;
      return state.isValid;
    }

    let result;
    const numA = Number(state.operandA);
    const numB = Number(state.operandB);

    if (state.operator === "+") {
      result = numA + numB;
    } else if (state.operator === "*") {
      result = numA * numB;
    }

    state.isValid = result === targetNumber;
    return state.isValid;
  }

  getUsedOperands() {
    const used = [];

    this.gridState.forEach((state) => {
      if (state.operandA !== null) {
        used.push(state.operandA);
      }
      if (state.operandB !== null) {
        used.push(state.operandB);
      }
    });
    return used;
  }

  getUsedOperandIndices() {
    const usedIndices = new Set();
    this.gridState.forEach((state) => {
      if (state.operandIndexA !== null) {
        usedIndices.add(state.operandIndexA);
      }
      if (state.operandIndexB !== null) {
        usedIndices.add(state.operandIndexB);
      }
    });
    return usedIndices;
  }
}
