# Project: Tetanor Game

## Project Overview

This project is a web-based, mobile-first logic puzzle game called "Tetanor". The goal is to implement the game described in `js/data.js` using plain HTML, CSS, and JavaScript. The game challenges players to fill in missing numbers and operators in a 4x4 grid based on mathematical relationships with a strip of numbers below.

The game is built following a **Model-View-Controller (MVC)** software design pattern, which now includes:
*   **Game Selection:** Players can choose from 4 different puzzles.
*   **Internal Timer:** Tracks and displays elapsed time during gameplay.
*   **Rules Modal:** A dedicated button to display game rules in English and Spanish.
*   **Interactive Grid:** Users can select numbers and operators to fill in the grid.
*   **Dynamic Strip Input:** Users can fill in initially blank numbers on the strip based on logical constraints.
*   **Visual Validation:** Grid items are highlighted green (correct) or red (incorrect) based on player input.
*   **Operand Usage Tracking:** The number strip visually indicates which numbers have been used in the grid, and prevents reusing the same strip item (by index) multiple times in the grid.

## Building and Running

This is a static web project with no build process.

*   **To Run:** Simply open the `index.html` file in a modern web browser.
*   **To Test:** There is currently no automated test suite. Manual testing should be performed in a browser to verify functionality and responsiveness.

## Development Conventions and File Structure

The project adheres to the MVC pattern for clear separation of concerns, with a strong emphasis on a mobile-first user experience.

*   **`index.html`:**
    *   Main application entry point.
    *   Contains the core game layout: 4x4 grid, number strip, timer display, rules button, and game selection buttons.
    *   The JavaScript initialization logic is embedded directly within a `<script>` tag.
*   **`style.css`:**
    *   Contains all styling for the application.
    *   Includes responsive design for mobile screens.
    *   Defines styles for the game grid, number strip (including 'used' and 'user-fillable' states), tooltips, timer display, game selection buttons, and the rules modal.
*   **`js/` (JavaScript Files):**
    *   `data.js`: Stores the game rules (English and Spanish) and the data for the 4 different game puzzles, including their initial grid and strip configurations.
    *   `model.js`:
        *   Manages the entire game state (current grid, current strip, initial strip).
        *   Tracks user inputs for each grid item (operand values and their original strip indices).
        *   Manages the game timer (start, stop, get elapsed time).
        *   Provides core game logic: validation of grid item equations, and determining valid number ranges for blank strip cells.
        *   Tracks `stripState` to show which operators are applied to which strip numbers.
    *   `view.js`:
        *   Responsible for rendering all visual components of the game.
        *   Renders the main grid and the number strip, differentiating between initial and user-fillable cells.
        *   Manages the display of the timer and the rules modal.
        *   Handles creation, positioning, and closure of interactive tooltips for number and operator selection.
        *   Provides visual feedback: updates grid item borders (green/red for valid/invalid) and updates the appearance of strip cells (marking used or fillable cells).
        *   Binds UI events (grid cell clicks, strip cell clicks, game selection clicks, rules button clicks) and delegates them to the controller.
    *   `controller.js`:
        *   Acts as the central orchestrator, connecting the Model and View.
        *   Initializes the game, loading the default game and setting up event listeners.
        *   Manages game flow: starts/restarts games, handles game selection.
        *   Processes all user interactions:
            *   Handles clicks on grid cells, triggering tooltips for operand/operator selection.
            *   Filters available operands for tooltips based on used strip indices.
            *   Handles clicks on user-fillable strip cells, providing valid number options.
            *   Updates the Model and then the View based on user selections.
        *   Manages the game timer's update loop.
        *   Handles showing and hiding the rules modal.