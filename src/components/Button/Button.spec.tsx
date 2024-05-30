import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders with the correct title', () => {
    const title = "Click Me";
    render(<Button title={title} clickHandler={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: title });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls clickHandler when clicked', () => {
    const clickHandler = jest.fn();
    const title = "Click Me";
    render(<Button title={title} clickHandler={clickHandler} />);
    const buttonElement = screen.getByRole('button', { name: title });
    fireEvent.click(buttonElement);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
