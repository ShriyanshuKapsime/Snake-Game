# Vanilla JS Snake Game 

A classic, grid-based Snake game built entirely with HTML, CSS, and Vanilla JavaScript. This project focuses heavily on core programming logic, 2D array manipulation, and game loops without the use of any external libraries or canvas.

## Features
* **Dynamic Grid:** The game board scales dynamically using CSS Grid and JavaScript math.
* **Smart Food Spawning:** A `while` loop combined with `.some()` ensures food never spawns on the snake's body.
* **Progressive Difficulty:** The game loop interval automatically speeds up as the player hits specific score milestones.
* **Advanced Collision:** Includes standard wall collision as well as precise self-collision detection (tail-biting).
* **Anti-Reversal Steering:** Logic prevents the snake from doing an instant 180-degree turn into its own neck.
* **Persistent High Score:** Uses the browser's `localStorage` to save and retrieve the highest score across sessions.

##  Tech Stack
* HTML5
* CSS3 (Custom variables, Grid, Flexbox)
* Vanilla JavaScript (ES6+)

##  How to Run Locally
1. Clone the repository.
2. Open `index.html` in your browser (or use the VS Code Live Server extension).
3. Press `Start Game` and use the **Arrow Keys** or **W, A, S, D** to play!
