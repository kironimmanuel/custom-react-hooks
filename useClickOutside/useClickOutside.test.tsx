import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { useClickOutside } from "./useClickOutside";

const TestComponent = () => {
  const domNode = useClickOutside(() => {
    console.log("clicked outside");
  });
  return <div ref={domNode}>Click outside me!</div>;
};

describe("useClickOutside", () => {
  it("calls the callback when clicking outside the element", () => {
    const spy = jest.spyOn(console, "log");
    const { container } = render(<TestComponent />);
    const div = container.firstChild;

    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(spy).toHaveBeenCalledWith("clicked outside");
  });
});
