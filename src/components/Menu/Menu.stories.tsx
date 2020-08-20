import React from "react";
import { Menu, MenuLink, MenuItem } from "./Menu";
import { action } from "@storybook/addon-actions";

export default { title: "components/Menu", component: Menu };

const onClick = action("onClick");

export const inHeader = (): React.ReactNode => (
  <div style={{ backgroundColor: "black" }}>
    <Menu variant="onBlackBackground">
      <MenuLink to="/">Home</MenuLink>
      <MenuLink to="/foo">Foo</MenuLink>
      <MenuLink to="/bar">Bar</MenuLink>
    </Menu>
  </div>
);

export const inPartPage = (): React.ReactNode => (
  <Menu variant="activeBorderBottom">
    <MenuLink to="charts">Чарты</MenuLink>
    <MenuLink to="table">Таблица</MenuLink>
  </Menu>
);

export const inTable = (): React.ReactNode => (
  <Menu variant="default">
    <MenuItem onClick={onClick} isActive>
      Часть 1
    </MenuItem>
    <MenuItem onClick={onClick}>Часть 2</MenuItem>
  </Menu>
);
