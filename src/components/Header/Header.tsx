import React, { useState } from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Header.module.css";
import { Menu, MenuLink } from "src/components/Menu";
import { T } from "react-targem";
import Typography from "../ui-kit/Typography";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [menuActive, setMenuActive] = useState(false);
  function toggleMenu() {
    setMenuActive(!menuActive);
  }
  return (
    <nav className={cn(classes.container)}>
      <div className={cn(classes.headerWrapper)}>
        <Link to="/" className={cn(classes.logo)}>
          <img src={require("./assets/logo.svg")} alt="Достоевский" />
        </Link>
        <div className={cn(classes.callMenuBar)}>
          <Link to="/">
            <img src={require("./assets/lang.svg")} alt="Lang" />
            <Typography color="inverted" variant="span">
              <T message="RU" />
            </Typography>
          </Link>
          <div className="test" onClick={toggleMenu}>
            <img src={require("./assets/hamburger.svg")} alt="Menu" />
          </div>
        </div>
        <div
          className={cn({
            [cn(classes.mobileMenuHolder)]: true,
            [cn(classes.isActive)]: menuActive,
          })}
        >
          <div className={cn(classes.mobileMenuHolder__header)}>
            <div>
              <Link to="/">
                <img
                  src={require("./assets/logo-mobile.svg")}
                  alt="Достоевский"
                />
              </Link>
            </div>
            <div className={cn(classes.mobileMenu__close)} onClick={toggleMenu}>
              <img src={require("./assets/close.svg")} alt="Menu" />
            </div>
          </div>
          <div className={cn(classes.mobileMenu__listener)}>
            <Menu variant="onBlackBackground">
              <MenuLink activeUrls={[/^\/\d\d\d/]} to="/clauses" size="normal">
                каталог статей ук рф
              </MenuLink>
              <MenuLink partiallyActive to="/articles" size="normal">
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
