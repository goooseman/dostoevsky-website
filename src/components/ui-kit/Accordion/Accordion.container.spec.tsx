import React from "react";
import Accordion, { AccordionNode } from "./";
import { render, fireEvent } from "__utils__/render";

const Element = (props: Partial<React.ComponentProps<typeof Accordion>>) => (
  <Accordion {...props}>
    <AccordionNode title="First title" variant="secondary">
      First content
    </AccordionNode>
    <AccordionNode title="Second title" variant="secondary">
      First content
    </AccordionNode>
  </Accordion>
);

it("should be opened by default", () => {
  const { getByText } = render(<Element />);
  expect(getByText("First title").parentNode).toHaveAttribute(
    "aria-expanded",
    "true"
  );
});

it("should be closed by default, if isOpened === false", () => {
  const { getByText } = render(<Element isOpened={false} />);
  expect(getByText("First title").parentNode).toHaveAttribute(
    "aria-expanded",
    "false"
  );
});

it("should open second title when clicked", () => {
  const { getByText } = render(<Element />);
  fireEvent.click(getByText("Second title"));
  expect(getByText("First title").parentNode).toHaveAttribute(
    "aria-expanded",
    "false"
  );
  expect(getByText("Second title").parentNode).toHaveAttribute(
    "aria-expanded",
    "true"
  );
});

it("should close first title after click", () => {
  const { getByText } = render(<Element />);
  fireEvent.click(getByText("First title"));
  expect(getByText("First title").parentNode).toHaveAttribute(
    "aria-expanded",
    "false"
  );
});
