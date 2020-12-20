import React, { useState } from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Header.module.css";
import { Menu, MenuLink } from "src/components/Menu";
import { T } from "react-targem";
import Typography from "../ui-kit/Typography";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // function getInitialState() {
  //   return {
  //     menuHolder: cn(classes.mobileMenuHolder)}
  // }
  // function addClass(){
  //   this.setState({menuHolder: cn(classes.isActive)})
  // }
  // function removeClass(){
  //   this.setState({menuHolder: ''})
  // }
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
          <div>
            <img src={require("./assets/hamburger.svg")} alt="Menu" />
          </div>
        </div>
        <div className={cn(classes.mobileMenuHolder, classes.isActive)}>
          <div className={cn(classes.mobileMenuHolder__header)}>
            <div>
              <Link to="/">
                <img
                  src={require("./assets/logo-mobile.svg")}
                  alt="Достоевский"
                />
              </Link>
            </div>
            <div
              className={cn(classes.mobileMenu__close)}
              onClick={() => {
                this.removeClass();
              }}
            >
              <img src={require("./assets/close.svg")} alt="Menu" />
            </div>
          </div>
          <div className={cn(classes.mobileMenu__listener)}>
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
