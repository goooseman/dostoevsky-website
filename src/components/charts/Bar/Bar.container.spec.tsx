import React from "react";
import BarContainer from "./Bar.container";
import { render, waitFor } from "__utils__/render";

const defaultProps = {
  title: "Title",
  downloadFilename: "test",
  iframePath: "/",
};

const tooltipDescription = {
  Foo: "Bar",
};

it("should contain 1 bar", async () => {
  const { container } = render(
    <BarContainer
      charts={[
        {
          groups: [{ title: "group", values: [1] }],
          tooltipDescription,
          labels: ["foo"],
        },
      ]}
      {...defaultProps}
      chartType="partsByPunishment"
    />
  );
  await waitFor(() =>
    expect(
      container.querySelectorAll("span.ct-label.ct-vertical")
    ).toHaveLength(1)
  );
});

it("should not render empty bar", async () => {
  const { container } = render(
    <BarContainer
      charts={[
        {
          groups: [
            { title: "group 1", values: [1, 0] },
            { title: "group 2", values: [0, 0] },
          ],
          labels: ["foo", "bar"],
          tooltipDescription,
        },
      ]}
      {...defaultProps}
      areLabelsFiltered
      chartType="partsByPunishment"
    />
  );
  await waitFor(() =>
    expect(
      container.querySelectorAll("span.ct-label.ct-vertical")
    ).toHaveLength(1)
  );
});

it("should not render empty chart", async () => {
  const { queryByText } = render(
    <BarContainer
      charts={[
        {
          title: "Foo Chart",
          labels: ["foo", "bar"],
          groups: [
            { title: "group 1", values: [0, 0] },
            { title: "group 2", values: [0, 0] },
          ],
          tooltipDescription,
        },
      ]}
      {...defaultProps}
      chartType="partsByPunishment"
    />
  );

  expect(queryByText("Foo Chart")).not.toBeInTheDocument();
});
