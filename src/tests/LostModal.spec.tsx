import { render, screen } from "@testing-library/react";
import LostModal from "../components/LostModal/LostModal";
import { ReactNode, MouseEventHandler } from "react";

jest.mock(
  "../components/Button/Button",
  () =>
    ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick: MouseEventHandler;
    }) =>
      <button onClick={onClick}>{children}</button>
);

describe("LostModal component", () => {
  const mockSetGameStart = jest.fn();

  beforeEach(() => {
    mockSetGameStart.mockClear();
  });

  it("renders correctly with given props", () => {
    render(
      <LostModal
        currentLevel={5}
        brainsEaten={20}
        setGameStart={mockSetGameStart}
      />
    );

    expect(screen.getByText("Ssssee you in hell")).toBeInTheDocument();
    expect(screen.getByText("Brains Eaten: 20")).toBeInTheDocument();
  });

	it("calculates and displays the correct final score", () => {
		render(
			<LostModal
				currentLevel={5}
				brainsEaten={20}
				setGameStart={mockSetGameStart}
			/>
		);
	
		expect(screen.getByText(/Final Score:/i)).toBeInTheDocument();
	});
});
