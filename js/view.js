class View {
  constructor() {
    this.gridContainer = document.getElementById("grid-4x4");
    this.stripContainer = document.getElementById("number-strip");
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
      leftInput.classList.add("grid-item-left");
      leftInput.classList.add("grid-hover");
      leftInput.dataset.type = "operand";
      bottomDiv.appendChild(leftInput);

      const opDiv = document.createElement("div");
      opDiv.classList.add("grid-item-op");
      opDiv.classList.add("grid-hover");
      opDiv.dataset.type = "operator";
      bottomDiv.appendChild(opDiv);

      const rightInput = document.createElement("div");
      rightInput.classList.add("grid-item-right");
      rightInput.classList.add("grid-hover");
      rightInput.dataset.type = "operand";
      bottomDiv.appendChild(rightInput);

      itemContainer.appendChild(bottomDiv);
      this.gridContainer.appendChild(itemContainer);
    });
  }

  renderStrip(stripData) {
    this.stripContainer.innerHTML = ""; // Clear existing content
    stripData.forEach((item, index) => {
      const cell = document.createElement("div");
      cell.classList.add("strip-cell");
      cell.dataset.index = index;
      cell.textContent = item.value !== null ? item.value : "";
      if (item.value !== null) {
        cell.classList.add("initial-number");
      }
      this.stripContainer.appendChild(cell);
    });
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

  createTooltip(items, targetElement, onSelect) {
    this.closeActiveTooltip(); // Ensure only one tooltip is open at a time

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip-selector";

    items.forEach((item) => {
      const tooltipItem = document.createElement("div");
      tooltipItem.className = "tooltip-item";

      // Handle both primitive strings (like 'Clear', '+') and objects ({value, index})
      const isObject = typeof item === 'object' && item !== null;
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

    // Position the tooltip
    const rect = targetElement.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;

    // Close tooltip if clicking outside
    setTimeout(() => {
      // Use timeout to avoid immediate closing due to event bubbling
      document.addEventListener("click", this.handleOutsideClick, true);
    }, 0);
  }

  handleOutsideClick = (event) => {
    if (this.activeTooltip && !this.activeTooltip.contains(event.target)) {
      // Check if the click was on a cell that would open a tooltip
      const targetIsCell =
        event.target.dataset.type === "operand" ||
        event.target.dataset.type === "operator";
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
      if (cell.textContent === "") {
        cell.classList.remove("plusUsed");
        cell.classList.remove("multiplyUsed");
        cell.classList.remove("used");
        return;
      }
      const cellIndex = cell.dataset.index;

      const state = stripState[cellIndex];
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
}
