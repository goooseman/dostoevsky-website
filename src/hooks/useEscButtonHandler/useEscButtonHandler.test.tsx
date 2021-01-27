import React, { useReducer } from "react";
import { render, fireEvent } from "__utils__/render";
import userEvent from "@testing-library/user-event";
import useEscButtonHandler from "./useEscButtonHandler";

describe("useBodyOverflowLock", () => {
  const onEscButtonClickSpy = jest.fn();
  afterEach(onEscButtonClickSpy.mockClear);

  const TestComponent: React.FC<{}> = () => {
    const [isHandlerActive, toggleHanderActive] = useReducer(
      (x: boolean) => !x,
      false
    );

    useEscButtonHandler(onEscButtonClickSpy, isHandlerActive);

    return (
      <>
        <button onClick={toggleHanderActive}>Toggle</button>
      </>
    );
  };

  it("should fire handler when escape button is pressed", () => {
    const { getByText } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    fireEvent.keyUp(window, { keyCode: 27 });
    expect(onEscButtonClickSpy).toBeCalledTimes(1);
  });

  it("should not fire handler when tab button is pressed", () => {
    const { getByText } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    fireEvent.keyUp(window, { keyCode: 9 });
    expect(onEscButtonClickSpy).not.toBeCalled();
  });

  it("unregister event handler when is not enabled", () => {
    const { getByText } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    userEvent.click(getByText("Toggle"));
    fireEvent.keyUp(window, { keyCode: 27 });
    expect(onEscButtonClickSpy).not.toBeCalled();
  });

  it("unregister event handler when unmounted", () => {
    const { getByText, unmount } = render(<TestComponent />);
    userEvent.click(getByText("Toggle"));
    unmount();
    fireEvent.keyUp(window, { keyCode: 27 });
    expect(onEscButtonClickSpy).not.toBeCalled();
  });
});
