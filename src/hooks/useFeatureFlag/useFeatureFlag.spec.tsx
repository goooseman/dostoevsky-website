import React from "react";
import { render, screen } from "__utils__/render";
import { unmockWindowLocation, mockWindowLocation } from "__utils__/windowMock";
import useFeatureFlag from "./useFeatureFlag";

afterEach(unmockWindowLocation);
afterEach(() => {
  localStorage.clear();
});

const TestComponent: React.FC = () => {
  const langsFF = useFeatureFlag("langs");

  return <p>{langsFF ? "Langs are enabled" : "Langs are disabled"}</p>;
};

it("should return true for ?langs=1 search", () => {
  mockWindowLocation({
    search: "?langs=1",
  });
  render(<TestComponent />);
  expect(screen.getByText("Langs are enabled")).toBeInTheDocument();
});

it("should return false for ?langs=0 search", () => {
  mockWindowLocation({
    search: "?langs=0",
  });
  render(<TestComponent />);
  expect(screen.queryByText("Langs are enabled")).not.toBeInTheDocument();
});

it("should return false for an empty search", () => {
  mockWindowLocation({
    search: "",
  });
  render(<TestComponent />);
  expect(screen.queryByText("Langs are enabled")).not.toBeInTheDocument();
});

it("should return false for ?foo=1 search", () => {
  mockWindowLocation({
    search: "?foo=1",
  });
  render(<TestComponent />);
  expect(screen.queryByText("Langs are enabled")).not.toBeInTheDocument();
});
