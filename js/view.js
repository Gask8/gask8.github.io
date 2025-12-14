class View {
  constructor() {
    this.gridContainer = document.getElementById("grid-4x4");
    this.stripContainer = document.getElementById("number-strip");
    this.timerDisplay = document.getElementById("timer-display");
    this.gameSelector = document.getElementById("game-selector");

    // Rules Modal Elements
    this.rulesBtn = document.getElementById("rules-btn");
    this.rulesModal = document.getElementById("rules-modal");
    this.modalCloseBtn = document.getElementById("modal-close-btn");
    this.rulesEnContainer = document.getElementById("rules-en");
    this.rulesEsContainer = document.getElementById("rules-es");
    this.commentsEsContainer = document.getElementById("comments-es");

    this.activeTooltip = null;
  }

  renderGrid(gridData) {
    this.gridContainer.innerHTML = ""; // Clear existing content
    gridData.forEach((number, index) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("grid-item-container");
      itemContainer.dataset.gridIndex = index;

      const numberDiv = document.createElement("div");
      numberDiv.classList.add("grid-item-number");
      numberDiv.textContent = number;
      itemContainer.appendChild(numberDiv);

      const bottomDiv = document.createElement("div");
      bottomDiv.classList.add("grid-item-bottom");

      const leftInput = document.createElement("div");
      leftInput.classList.add("grid-item-left", "grid-hover");
      leftInput.dataset.type = "operand";
      bottomDiv.appendChild(leftInput);

      const opDiv = document.createElement("div");
      opDiv.classList.add("grid-item-op", "grid-hover");
      opDiv.dataset.type = "operator";
      bottomDiv.appendChild(opDiv);

      const rightInput = document.createElement("div");
      rightInput.classList.add("grid-item-right", "grid-hover");
      rightInput.dataset.type = "operand";
      bottomDiv.appendChild(rightInput);

      itemContainer.appendChild(bottomDiv);
      this.gridContainer.appendChild(itemContainer);
    });
  }

  renderStrip(stripData, initialStrip) {
    this.stripContainer.innerHTML = ""; // Clear existing content
    stripData.forEach((item, index) => {
      const cell = document.createElement("div");
      cell.classList.add("strip-cell");
      cell.dataset.index = index;
      cell.textContent = item.value !== null ? item.value : "";

      // Check if the cell was initially null
      if (initialStrip[index] === null) {
        cell.classList.add("user-fillable");
      }

      this.stripContainer.appendChild(cell);
    });
  }

  renderRules(rules_us, rules_es, comments_es) {
    this.rulesEnContainer.textContent = rules_us;
    this.rulesEsContainer.textContent = rules_es;
    this.commentsEsContainer.textContent = comments_es;
  }

  toggleModal(show) {
    if (show) {
      this.rulesModal.classList.remove("hidden");
    } else {
      this.rulesModal.classList.add("hidden");
    }
  }

  bindGridCellClick(handler) {
    this.gridContainer.addEventListener("click", (event) => {
      const target = event.target;
      const type = target.dataset.type;
      if (type === "operand" || type === "operator") {
        handler(target);
      }
    });
  }

  bindStripCellClick(handler) {
    this.stripContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("user-fillable")) {
        handler(target);
      }
    });
  }

  bindGameSelectionClick(handler) {
    this.gameSelector.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (button) {
        const gameId = parseInt(button.dataset.gameId);
        handler(gameId);
      }
    });
  }

  bindRulesButton(handler) {
    this.rulesBtn.addEventListener("click", handler);
  }

  bindCloseModalButton(handler) {
    this.modalCloseBtn.addEventListener("click", handler);
    this.rulesModal.addEventListener("click", (event) => {
      // Close if the overlay is clicked directly
      if (event.target === this.rulesModal) {
        handler();
      }
    });
  }

  createTooltip(items, targetElement, onSelect) {
    this.closeActiveTooltip(); // Ensure only one tooltip is open at a time

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip-selector";

    if (items.length <= 3) {
      tooltip.classList.add("tooltip-selector-small");
    }

    items.forEach((item) => {
      const tooltipItem = document.createElement("div");
      tooltipItem.className = "tooltip-item";

      const isObject = typeof item === "object" && item !== null;
      const text = isObject ? item.value : item;
      const value = isObject ? item.value : item;
      const index = isObject ? item.index : null;

      tooltipItem.textContent = text;

      tooltipItem.addEventListener("click", () => {
        onSelect(value, index);
        this.closeActiveTooltip();
      });
      tooltip.appendChild(tooltipItem);
    });

    document.body.appendChild(tooltip);
    this.activeTooltip = tooltip;

    const rect = targetElement.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;

    setTimeout(() => {
      document.addEventListener("click", this.handleOutsideClick, true);
    }, 0);
  }

  handleOutsideClick = (event) => {
    if (this.activeTooltip && !this.activeTooltip.contains(event.target)) {
      const targetIsCell =
        event.target.dataset.type === "operand" ||
        event.target.dataset.type === "operator" ||
        event.target.classList.contains("user-fillable");
      if (!targetIsCell) {
        this.closeActiveTooltip();
      }
    }
  };

  closeActiveTooltip() {
    if (this.activeTooltip) {
      this.activeTooltip.remove();
      this.activeTooltip = null;
      document.removeEventListener("click", this.handleOutsideClick, true);
    }
  }

  updateGridCellContent(targetElement, value) {
    targetElement.textContent = value;
  }

  updateStripCell(stripIndex, value) {
    const stripCell = this.stripContainer.querySelector(
      `[data-index='${stripIndex}']`
    );
    if (stripCell) {
      stripCell.textContent = value;
    }
  }

  updateGridItemBorder(gridIndex, isValid) {
    const itemContainer = this.gridContainer.querySelector(
      `[data-grid-index='${gridIndex}']`
    );

    if (itemContainer) {
      itemContainer.classList.remove("valid", "invalid");
      if (isValid === true) {
        itemContainer.classList.add("valid");
      } else if (isValid === false) {
        itemContainer.classList.add("invalid");
      }
    }
  }

  updateStripAppearance(stripState) {
    const stripCells = this.stripContainer.querySelectorAll(".strip-cell");
    stripCells.forEach((cell) => {
      const cellIndex = cell.dataset.index;
      if (cell.textContent === "" || cellIndex === null) {
        cell.classList.remove("plusUsed", "multiplyUsed", "used");
        return;
      }

      const state = stripState[cellIndex];
      if (!state) return;

      if (state.operatorPlus || state.operatorMultiply) {
        cell.classList.add("used");
      } else {
        cell.classList.remove("used");
      }

      if (state.operatorPlus) {
        cell.classList.add("plusUsed");
      } else {
        cell.classList.remove("plusUsed");
      }
      if (state.operatorMultiply) {
        cell.classList.add("multiplyUsed");
      } else {
        cell.classList.remove("multiplyUsed");
      }
    });
  }

  renderTimer(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    this.timerDisplay.textContent = `${minutes}:${seconds}`;
  }

  setActiveGameButton(gameId) {
    const buttons = this.gameSelector.querySelectorAll("button");
    buttons.forEach((button) => {
      if (parseInt(button.dataset.gameId) === gameId) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }
}
