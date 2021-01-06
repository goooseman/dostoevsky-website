import React, { PureComponent } from "react";
import classes from "./Menu.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography/Typography";
import { Link } from "gatsby";

interface MenuProps {
  children: React.ReactNode;
  variant: "activeBorderBottom" | "default" | "onBlackBackground" | "tabs";
  className?: string;
}

export class Menu extends PureComponent<MenuProps> {
  render(): React.ReactNode {
    const { variant, children, className } = this.props;
    return (
      <ul
        className={cn(
          classes.menu,
          {
            [classes.onBlackBackground]: variant === "onBlackBackground",
            [classes.activeBorderBottom]: variant === "activeBorderBottom",
            [classes.tabs]: variant === "tabs",
          },
          className
        )}
      >
        {children}
      </ul>
    );
  }
}

interface MenuItemProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export class MenuItem extends PureComponent<MenuItemProps> {
  static defaultProps = {
    isActive: false,
  };

  render(): React.ReactNode {
    const { children, isActive, onClick } = this.props;
    return (
      <li
        className={cn(classes.menuItem, { [classes.menuItemActive]: isActive })}
      >
        <button onClick={onClick} className={cn(classes.menuLink)}>
          <Typography variant="span">
            <b>{children}</b>
          </Typography>
        </button>
      </li>
    );
  }
}

interface MenuLinkProps {
  children: React.ReactNode;
  to: string;
  size?: "small" | "normal" | undefined;
}

export class MenuLink extends PureComponent<MenuLinkProps> {
  render(): React.ReactNode {
    const { to, children, size } = this.props;
    return (
      <li className={cn(classes.menuItem)}>
        <Typography variant="span" size={size} isUpperCased>
          <Link
            to={to}
            className={cn(classes.menuLink)}
            activeClassName={cn(classes.menuLinkActive)}
          >
            <b>{children}</b>
          </Link>
        </Typography>
      </li>
    );
  }
}
