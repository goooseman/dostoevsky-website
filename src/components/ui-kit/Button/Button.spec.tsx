import React from "react";
import Button from "./Button";
import { render, fireEvent } from "__utils__/render";

it("should contain passed text", () => {
  const { getByText } = render(<Button>Foo</Button>);
  expect(getByText("Foo")).toBeInTheDocument();
});

it("should fire onClick handler", () => {
  const onClickSpy = jest.fn();
  const { getByText } = render(<Button onClick={onClickSpy}>Foo</Button>);
  fireEvent.click(getByText("Foo"));
  expect(onClickSpy).toBeCalledTimes(1);
});
