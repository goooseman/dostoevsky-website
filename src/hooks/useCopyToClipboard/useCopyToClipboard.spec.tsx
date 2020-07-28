import React from "react";
import useCopyToClipboard from "./useCopyToClipboard";
import { render, fireEvent, act } from "__utils__/render";
import copy from "copy-to-clipboard";

jest.mock("copy-to-clipboard");

beforeEach(() => {
  (copy as jest.Mock).mockClear();
});

const TestHelper = () => {
  const { isCopied, copy } = useCopyToClipboard(3000);

  return (
    <>
      <button onClick={() => copy("Foo")}>Copy</button>
      {isCopied ? <p>Copied!</p> : null}
    </>
  );
};

it("should copy text", () => {
  const { getByText } = render(<TestHelper />);
  fireEvent.click(getByText("Copy"));
  expect(copy).toBeCalledTimes(1);
  expect(copy).toBeCalledWith("Foo");
});

it("should show Copied", () => {
  const { getByText } = render(<TestHelper />);
  fireEvent.click(getByText("Copy"));
  expect(getByText("Copied!")).toBeInTheDocument();
});

it("should hide Copied after timeout", () => {
  jest.useFakeTimers();
  const { getByText, queryByText } = render(<TestHelper />);
  fireEvent.click(getByText("Copy"));
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#1-when-using-jestusefaketimers
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(queryByText("Copied!")).toBeNull();
});
