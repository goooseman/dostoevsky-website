import React from "react";
import PillButton from "./Button";
import { render, fireEvent } from "__utils__/render";

it("should contain passed text", () => {
  const { getByText } = render(<PillButton>Foo</PillButton>);
  expect(getByText("Foo")).toBeInTheDocument();
});

it("should fire onClick handler", () => {
  const onClickSpy = jest.fn();
  const { getByText } = render(
    <PillButton onClick={onClickSpy}>Foo</PillButton>
  );
  fireEvent.click(getByText("Foo"));
  expect(onClickSpy).toBeCalledTimes(1);
});
