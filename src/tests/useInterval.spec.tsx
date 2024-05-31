import React from "react";
import { render } from "@testing-library/react";
import useInterval from "../components/useInterval/useInterval";
// import { act } from "react-dom/test-utils";

describe("useInterval hook", () => {
  jest.useFakeTimers();

  it("calls the callback function after the specified delay", () => {
    const callback = jest.fn();
    const delay = 1000;

    const TestComponent = () => {
      useInterval({ callback, delay });
      return null;
    };

    render(<TestComponent />);

    React.act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call the callback function if delay is null", () => {
    const callback = jest.fn();
    const delay = null;

    const TestComponent = () => {
      useInterval({ callback, delay });
      return null;
    };

    render(<TestComponent />);

    React.act(() => {
      jest.runAllTimers();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("clears the interval on unmount", () => {
    const callback = jest.fn();
    const delay = 1000;

    const TestComponent = () => {
      useInterval({ callback, delay });
      return null;
    };

    const { unmount } = render(<TestComponent />);

    React.act(() => {
      unmount();
    });

    React.act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
