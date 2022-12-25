import { act, render } from "@testing-library/react";
import React from "react";
import { useWindowResize } from "./useWindowResize";

describe("useWindowResize", () => {
  it("should return the correct window size", () => {
    let windowSize: {
      width: number | undefined;
      height: number | undefined;
    } | null = null;

    const TestComponent = () => {
      windowSize = useWindowResize();

      return null;
    };

    render(<TestComponent />);

    expect(windowSize).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  it("should update the window size when the window is resized", () => {
    let windowSize: {
      width: number | undefined;
      height: number | undefined;
    } | null = null;

    const TestComponent = () => {
      windowSize = useWindowResize();

      return null;
    };

    render(<TestComponent />);

    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(windowSize).toEqual({
      width: originalWidth,
      height: originalHeight,
    });
  });
});
