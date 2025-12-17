class Model {
  constructor() {
    this.gridState = [];
    this.stripState = [];
    this.startTime = null;
    this.elapsedTime = 0;
    this.timerInterval = null;
  }

  loadGame(gameId) {
    const gameData = games.find((game) => game.id === gameId);
    if (gameData) {
      this.currentGrid = [...gameData.grid];
      this.currentStrip = [...gameData.strip];
      this.initialStrip = [...gameData.strip]; // Save the original state
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

  getInitialStrip() {
    return this.initialStrip;
  }

  getStripState() {
    return this.stripState;
  }

  updateStripNumber(stripIndex, value) {
    this.currentStrip[stripIndex] = value;
  }

  getValidStripNumbers(stripIndex) {
    let min = 1;
    let max = 100;

    // Find left neighbor
    for (let i = stripIndex - 1; i >= 0; i--) {
      if (this.currentStrip[i] !== null) {
        min = this.currentStrip[i];
        break;
      }
    }

    // Find right neighbor
    for (let i = stripIndex + 1; i < this.currentStrip.length; i++) {
      if (this.currentStrip[i] !== null) {
        max = this.currentStrip[i];
        break;
      }
    }

    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    return options;
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
    if (stripIndex === null) return;
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

  getUsedOperandIndices() {
    const usedIndices = new Set();
    this.stripState.forEach((state, index) => {
      if (state.operatorPlus && state.operatorMultiply) {
        usedIndices.add(index);
      }
    });
    return usedIndices;
  }

  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  getElapsedTime() {
    return this.elapsedTime;
  }

  checkWinCondition() {
    // 1. Check if all grid items are valid
    const allGridItemsValid = this.gridState.every((item) => item.isValid);

    if (!allGridItemsValid) {
      return false;
    }

    // 2. Check if all strip numbers are used
    const usedCount = this.stripState.filter(
      (item) => item.operatorPlus && item.operatorMultiply
    ).length;

    const allStripItemsUsed = usedCount === this.stripState.length;

    return allStripItemsUsed;
  }
}
