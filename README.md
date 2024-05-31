# 🐍 Snake on the Brain 🧠

> Alright, listen up. This ain't your grandma's Snake game. This is a dark, twisted version straight out of a post-apocalyptic nightmare. I’m Snake Plissken, and I've been through hell and back. But now, I’m half-man, half-snake, and I’m hungry. Real hungry. Your mission, if you’ve got the guts, is to navigate this wasteland and help me devour as many brains as possible. Every move counts, and one wrong turn means game over. Think you’ve got what it takes to control me? Let’s find out. Remember, I've been in tougher spots than this. It's survival of the fittest out here, and I need your help to come out on top. Let's get this done.
> 
> --Snake Plissken

<img src="src/assets/snake.png" alt="Snake Plissken" width="300">

## Play

[Follow this link to play!](https://cbrum.dev/snake-brains/)

## Introduction

Welcome to the Snake game starring Snake Plissken, the legendary anti-hero from the Escape movies! In this unique take on the classic Snake game, you'll control Snake Plissken as he navigates a post-apocalyptic landscape, devouring brains to grow longer and score higher. Each brain consumed not only extends Snake's length but also increases the difficulty of the game, providing a thrilling challenge.

## Rules

1. **Objective**: Control Snake Plissken to eat as many brains as possible and achieve the highest score.
2. **Movement**: Use the arrow keys to navigate Snake Plissken in four directions (up, down, left, right).
3. **Eating Brains**: Each brain consumed increases Snake Plissken's length and add to the score.
4. **Difficulty Level**: The game's difficulty increases as you progress (every 10 brains), making Snake Plissken move faster and the game more challenging.
5. **Game Over**: The game ends if Snake Plissken collides with his own tail.
6. **Score Calculation**: The score for each brain eaten is multiplied by the difficulty level at the time it was consumed, times 10.

## Development Process

### Initial Setup

1. **Project Initialization**: The project was initialized using Vite for fast and optimized development.
2. **Component Design**: The game was structured into modular components including the game board, menu, instructions, and game over modal.
3. **Game Logic**: Core game logic was implemented to handle snake movement, brain consumption, collision detection, and state management.
4. **Styling**: CSS Modules were used for component-specific styles, ensuring a consistent and maintainable design.

### Iterative Development

1. **Feature Implementation**: Additional features such as game options and score calculation were incrementally added and tested.
2. **Refinement**: Game mechanics and user interface were refined based on testing and feedback to enhance the player experience.
3. **Testing**: Unit and integration tests were written to ensure the functionality and stability of the game.

## Technologies

- **React**: Utilized for building the user interface with component-based architecture.
- **TypeScript**: Added for type safety and better developer experience.
- **Vite**: Used for fast development and optimized build tooling.
- **CSS Modules**: Employed for scoped and maintainable CSS styling.
- **Jest**: Used for unit testing the application.
- **React Testing Library**: Implemented for testing React components in a user-centric manner.

## Testing

Testing ensures the reliability and functionality of the Snake game. We use React Testing Library in combination with Jest for this purpose.

