# Game Plan: Tetanor

This document outlines the development plan for creating the logic puzzle game "Tetanor" for mobile web.

## 1. Project Goal

The primary goal is to create a fully functional, mobile-first web application for the logic puzzle game "Tetanor". The game will be built using HTML, CSS, and JavaScript, following a Model-View-Controller (MVC) architectural pattern.

## 2. Core Technologies

*   **HTML:** For the basic structure and layout of the game.
*   **CSS:** For styling the game, ensuring a responsive and mobile-friendly user interface.
*   **JavaScript:** For the game logic, user interaction, and DOM manipulation.

## 3. Architecture: Model-View-Controller (MVC)

The application will be divided into three main components, each in its own file within the `js/` directory.

### Model (`js/model.js`)
*   **Responsibilities:**
    *   Manages the game's data and state.
    *   Contains the core game logic, independent of the user interface.
*   **Specific Tasks:**
    *   Define and store the 4x4 grid of 16 numbers.
    *   Define and store the strip of 16 numbers, including which are initially blank.
    *   Manage the player's proposed pairs.
    *   Implement the core rule validation: check if for a pair (A, B), both (A+B) and (A×B) exist in the main grid.
    *   Track the overall game state (e.g., `in-progress`, `completed`).
    *   (Future) Contain logic for generating new puzzles.

### View (`js/view.js`)
*   **Responsibilities:**
    *   Renders the visual representation of the game based on the model's state.
    *   Handles user input from a presentation standpoint (e.g., detecting clicks).
*   **Specific Tasks:**
    *   Create and update the HTML elements for the 4x4 grid.
    *   Create and update the HTML elements for the number strip below the grid.
    *   Provide interactive elements for the user to select numbers from the strip to form pairs.
    *   Display visual feedback (e.g., highlighting, success/error messages) based on the validity of user actions.
    *   Ensure the layout is responsive and optimized for mobile screens.

### Controller (`js/controller.js`)
*   **Responsibilities:**
    *   Acts as the intermediary between the Model and the View.
    *   Handles the application's flow and user actions.
*   **Specific Tasks:**
    *   Initialize the game.
    *   Listen for user input events from the View (e.g., a "Check Pair" button click).
    *   Process user input and translate it into actions on the Model (e.g., telling the model to check a proposed pair).
    *   Receive updates from the Model and instruct the View to re-render or update as necessary.
    *   Manage the main game loop and flow, such as detecting a win condition.

## 4. Initialization (`js/init.js`)

*   This file will be the entry point for the application.
*   It will be responsible for:
    *   Creating instances of the Model, View, and Controller.
    *   Wiring them up so they can communicate.
    *   Starting the initial game setup.

## 5. Development Steps

1.  **HTML Foundation (`index.html`):**
    *   Create the main container for the game board.
    *   Add placeholder divs for the 4x4 grid, the number strip, and any control buttons.
    *   Link the `style.css` and all `js/*.js` files.

2.  **CSS Styling (`style.css`):**
    *   Develop a clean, mobile-first design.
    *   Use CSS Grid or Flexbox for the main layout and game board.
    *   Style the numbers, input fields, and buttons for a good user experience.

3.  **Model Implementation (`js/model.js`):**
    *   Start with a hardcoded puzzle (grid and strip numbers).
    *   Implement the function to validate a pair against the grid numbers.
    *   Implement logic to track which strip numbers have been used.

4.  **View Implementation (`js/view.js`):**
    *   Write a function to render the initial grid and strip based on data from the model.
    *   Write functions to update the view when data changes (e.g., a number is used).
    *   Set up event listeners for user interaction.

5.  **Controller Implementation (`js/controller.js`):**
    *   Implement the main game initialization logic.
    *   Create handlers that take user input from the View, pass it to the Model for validation, and then update the View with the result.

6.  **Integration and Refinement (`js/init.js`):**
    *   Ensure all three MVC components work together correctly.
    *   Test the full game loop on desktop and mobile browsers.
    *   Refine touch controls and visual feedback.

7.  **Advanced Features (Post-MVP):**
    *   Implement a puzzle generation algorithm in the Model.
    *   Add difficulty levels.
    *   Implement a feature to save and load game progress using `localStorage`.
