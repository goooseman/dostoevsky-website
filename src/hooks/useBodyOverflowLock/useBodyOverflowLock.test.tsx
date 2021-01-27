import React, { useReducer } from "react";
import { render } from "__utils__/render";
import userEvent from "@testing-library/user-event";
import useBodyOverflowLock from "./useBodyOverflowLock";

describe("useBodyOverflowLock", () => {
  const TestComponent: React.FC<{}> = () => {
    const [isOverflowLocked, toggleOverflowLocked] = useReducer(
      (x: boolean) => !x,
      false
    );

    useBodyOverflowLock(isOverflowLocked);

    return (
      <>
        <button onClick={toggleOverflowLocked}>Toggle</button>
      </>
    );
  };

  it("should restrict body scroll when opened", () => {
    const { getByText } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    expect(document.body).toHaveStyle("overflow: hidden");
  });

  it("should allow body scroll when closed", () => {
    const { getByText } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    userEvent.click(getByText("Toggle"));
    expect(document.body).toHaveStyle("overflow: unset");
  });

  it("should allow body scroll when unmounted", () => {
    const { getByText, unmount } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    unmount();
    expect(document.body).toHaveStyle("overflow: unset");
  });
});
