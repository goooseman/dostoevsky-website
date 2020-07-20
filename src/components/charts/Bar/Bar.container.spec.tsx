import React from "react";
import BarContainer from "./Bar.container";
import { render, waitFor } from "__utils__/render";

it("should contain 1 bar", async () => {
  const { container } = render(
    <BarContainer
      labels={["foo"]}
      groups={[{ title: "group", values: [1] }]}
      title="Title"
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
      labels={["foo", "bar"]}
      groups={[
        { title: "group 1", values: [1, 0] },
        { title: "group 2", values: [0, 0] },
      ]}
      title="Title"
    />
  );
  await waitFor(() =>
    expect(
      container.querySelectorAll("span.ct-label.ct-vertical")
    ).toHaveLength(1)
  );
});
