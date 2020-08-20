import React from "react";
import { Menu, MenuLink } from "./Menu";

export default { title: "components/Menu", component: Menu };

export const withLinks = (): React.ReactNode => (
  <div style={{ backgroundColor: "black" }}>
    <Menu>
      <MenuLink to="/">Home</MenuLink>
      <MenuLink to="/foo">Foo</MenuLink>
      <MenuLink to="/bar">Bar</MenuLink>
    </Menu>
  </div>
);
