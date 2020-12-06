import React from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Header.module.css";
import { Menu, MenuLink } from "src/components/Menu";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className={cn(classes.container)}>
      <div className={cn(classes.headerWrapper)}>
        <Link to="/" className={cn(classes.logo)}>
          <img src={require("./assets/logo.svg")} alt="Достоевский" />
        </Link>
        <Menu variant="onBlackBackground">
          <MenuLink to="/clauses" size="normal">
            каталог статей ук рф
          </MenuLink>
          <MenuLink to="/analytics" size="normal">
            Аналитика
          </MenuLink>
          <MenuLink to="/faq" size="normal">
            о датасете
          </MenuLink>
          <MenuLink to="/about" size="normal">
            о проекте
          </MenuLink>
          <MenuLink to="/full" size="normal">
            полный датасет
          </MenuLink>
        </Menu>
      </div>
    </nav>
  );
};

export default Header;
