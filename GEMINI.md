# Project: Tetanor Game

## Project Overview

This project is a web-based, mobile-first logic puzzle game called "Tetanor". The goal is to implement the game described in `js/data.js` using plain HTML, CSS, and JavaScript.

The game follows a **Model-View-Controller (MVC)** software design pattern:
*   **Model (`js/model.js`):** Will contain the core game logic and state management (the grid, the strip, pairs, and validation rules).
*   **View (`js/view.js`):** Will be responsible for rendering the game board and UI elements and capturing user input.
*   **Controller (`js/controller.js`):** Will act as an intermediary, processing user input from the View and updating the Model.
*   **Init (`js/init.js`):** Will initialize the application, creating instances of the MVC components.

The development plan is detailed in `game_plan.md`.

**Note:** The current `index.html` appears to be a template from a different game project and will need to be updated to reflect the structure and elements required for "Tetanor". The JavaScript files (`model.js`, `view.js`, `controller.js`) are placeholders and need to be implemented.

## Building and Running

This is a static web project with no build process.

*   **To Run:** Simply open the `index.html` file in a modern web browser.
*   **To Test:** There is currently no test suite. Manual testing should be performed in a browser.

## Development Conventions

*   **Code Style:** All JavaScript code should adhere to the MVC separation of concerns outlined above.
*   **File Structure:**
    *   `index.html`: Main application entry point.
    *   `style.css`: All styles for the application.
    *   `js/`: All JavaScript files.
        *   `data.js`: Game rules and initial data.
        *   `model.js`: Data and state logic.
        *   `view.js`: DOM manipulation and presentation.
        *   `controller.js`: Application flow and user input handling.
        *   `init.js`: Application startup.
*   **Mobile First:** All UI and interaction design should prioritize the mobile experience.
