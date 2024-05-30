# 🐍 Snake on the Brain 🧠

> Alright, listen up. This ain't your grandma's Snake game. This is a dark, twisted version straight out of a post-apocalyptic nightmare. I’m Snake Plissken, and I've been through hell and back. But now, I’m half-man, half-snake, and I’m hungry. Real hungry. Your mission, if you’ve got the guts, is to navigate this wasteland and help me devour as many brains as possible. Every move counts, and one wrong turn means game over. Think you’ve got what it takes to control me? Let’s find out. Remember, I've been in tougher spots than this. It's survival of the fittest out here, and I need your help to come out on top. Let's get this done.
> 
> --Snake Plissken

<img src="src/assets/snake.png" alt="Snake Plissken" width="300">

## Introduction

Welcome to the Snake game starring Snake Plissken, the legendary anti-hero from the Escape movies! In this unique take on the classic Snake game, you'll control Snake Plissken as he navigates a post-apocalyptic landscape, devouring brains to grow longer and score higher. Each brain consumed not only extends Snake's length but also increases the difficulty of the game, providing a thrilling challenge.

## Rules

1. **Objective**: Control Snake Plissken to eat as many brains as possible and achieve the highest score.
2. **Movement**: Use the arrow keys (or swipe on mobile) to navigate Snake Plissken in four directions (up, down, left, right).
3. **Eating Brains**: Each brain consumed increases Snake Plissken's length and adds to the score.
4. **Difficulty Level**: The game's difficulty increases as you progress, making Snake Plissken move faster and the game more challenging.
5. **Game Over**: The game ends if Snake Plissken collides with the walls or his own tail.
6. **Score Calculation**: The score for each brain eaten is multiplied by the difficulty level at the time it was consumed, times 10.

## Development Process

### Initial Setup

1. **Project Initialization**: The project was initialized using Vite for fast and optimized development.
2. **Component Design**: The game was structured into modular components including the game board, Snake Plissken, brains, and controls.
3. **Game Logic**: Core game logic was implemented to handle snake movement, brain consumption, collision detection, and difficulty scaling.
4. **Styling**: CSS Modules were used for component-specific styles, ensuring a consistent and maintainable design.

### Iterative Development

1. **Feature Implementation**: Additional features such as difficulty scaling and score calculation were incrementally added and tested.
2. **Refinement**: Game mechanics and user interface were refined based on testing and feedback to enhance the player experience.
3. **Testing**: Unit and integration tests were written to ensure the functionality and stability of the game.

## Technologies

- **React**: Utilized for building the user interface with component-based architecture.
- **TypeScript**: Added for type safety and better developer experience.
- **Vite**: Used for fast development and optimized build tooling.
- **CSS Modules**: Employed for scoped and maintainable CSS styling.
- **Jest**: Used for unit testing the application.
- **React Testing Library**: Implemented for testing React components in a user-centric manner.

## Deploying to GitHub Pages

To deploy the Snake game to GitHub Pages, follow these steps:

1. **Create a GitHub Repository**: If you haven't already, create a new repository on GitHub.
2. **Install gh-pages**: Add `gh-pages` as a dev dependency in your project.
    ```bash
    npm install --save-dev gh-pages
    ```
3. **Add Deployment Scripts**: Update your `package.json` to include the following scripts:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
4. **Build and Deploy**: Run the deploy script to build the project and push the `dist` folder to the `gh-pages` branch.
    ```bash
    npm run deploy
    ```
5. **Enable GitHub Pages**: Go to your repository's settings on GitHub, find the GitHub Pages section, and set the source to the `gh-pages` branch.

Your Snake game should now be live on GitHub Pages!

## Testing

Testing ensures the reliability and functionality of the Snake game. We use React Testing Library in combination with Jest for this purpose.

### Setting Up Tests

1. **Install Dependencies**: Ensure you have Jest and React Testing Library installed.
    ```bash
    npm install --save-dev @testing-library/react @testing-library/jest-dom jest
    ```
2. **Configure Jest**: Add a Jest configuration file (`jest.config.js`) if not already present:
    ```js
    export default {
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    };
    ```
3. **Write Tests**: Create test files alongside your components or in a `__tests__` directory. For example, `Header.spec.tsx`:
    ```tsx
    import { render, screen } from '@testing-library/react';
    import Header from './Header';

    describe('Header', () => {
      test('renders the header with the correct title and subtitle', () => {
        render(<Header />);
        expect(screen.getByText(/SNAKE/i)).toBeInTheDocument();
        expect(screen.getByText(/on the Brain/i)).toBeInTheDocument();
      });

      test('renders the snake image with the correct alt text', () => {
        render(<Header />);
        const image = screen.getByAltText("Snake Plisskken's head");
        expect(image).toBeInTheDocument();
      });
    });
    ```
4. **Run Tests**: Use the npm test script to run your tests.
    ```bash
    npm test
    ```

By following these steps, you ensure your Snake game is robust, well-tested, and deployable, providing a smooth experience for players and developers alike. Enjoy the game, and may Snake Plissken devour all the brains!