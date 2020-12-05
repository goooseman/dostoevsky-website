import React from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Header.module.css";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography/Typography";
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
          <MenuLink to="/clauses">каталог статей ук рф</MenuLink>
          <MenuLink to="/faq">о датасете</MenuLink>
          <MenuLink to="/about">о проекте</MenuLink>
          <MenuLink to="/full">полный датасет</MenuLink>
        </Menu>
      </div>
    </nav>
  );
};

export default Header;
