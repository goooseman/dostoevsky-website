import { render, RenderOptions, RenderResult } from "@testing-library/react";
import React from "react";
import { TargemStatefulProvider } from "react-targem";
import "@testing-library/jest-dom";

const AllTheProviders = ({ children }: { children?: React.ReactNode }) => {
  return (
    <TargemStatefulProvider translations={{}}>
      {/** StrictMode is useful for `this.setState` functions to be called twice and to prevent side-effects */}
      <React.StrictMode>{children}</React.StrictMode>
    </TargemStatefulProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
