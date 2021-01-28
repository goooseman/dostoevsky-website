import React, { PureComponent } from "react";
import classes from "./Menu.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography/Typography";
import { Link } from "gatsby";
import { Location, WindowLocation } from "@reach/router";

interface MenuProps {
  children: React.ReactNode;
  variant:
    | "activeBorderBottom"
    | "default"
    | "onBlackBackground"
    | "tabs"
    | "buttons";
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
            [classes.buttons]: variant === "buttons",
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
          <Typography variant="span">{children}</Typography>
        </button>
      </li>
    );
  }
}

interface MenuLinkProps {
  children: React.ReactNode;
  to: string;
  size?: "small" | "normal" | undefined;
  partiallyActive?: boolean;
  activeUrls?: (RegExp | string)[];
}

export class MenuLink extends PureComponent<MenuLinkProps> {
  render(): React.ReactNode {
    const { to, children, size, partiallyActive } = this.props;
    return (
      <Location>
        {({ location }) => (
          <li className={cn(classes.menuItem)}>
            <Typography variant="span" size={size} isUpperCased>
              <Link
                partiallyActive={partiallyActive}
                to={to}
                className={cn(classes.menuLink, {
                  [classes.menuLinkActive]: this.isActiveByUrl(location),
                })}
                activeClassName={cn(classes.menuLinkActive)}
              >
                {children}
              </Link>
            </Typography>
          </li>
        )}
      </Location>
    );
  }

  private isActiveByUrl = (location: WindowLocation): boolean => {
    const { activeUrls } = this.props;
    if (!activeUrls) {
      return false;
    }
    for (const url of activeUrls) {
      if (location.pathname.match(url)) {
        return true;
      }
    }
    return false;
  };
}
