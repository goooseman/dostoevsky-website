import React, { PureComponent } from "react";
import classes from "./Menu.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography/Typography";
import { Link } from "gatsby";

interface MenuProps {
  children: React.ReactNode;
}

export class Menu extends PureComponent<MenuProps> {
  render(): React.ReactNode {
    return <ul className={cn(classes.menu)}>{this.props.children}</ul>;
  }
}

interface MenuItemProps {
  children: React.ReactNode;
}

export class MenuItem extends PureComponent<MenuItemProps> {
  render(): React.ReactNode {
    return <li className={cn(classes.menuItem)}>{this.props.children}</li>;
  }
}

interface MenuLinkProps {
  children: React.ReactNode;
  to: string;
}

export class MenuLink extends PureComponent<MenuLinkProps> {
  render(): React.ReactNode {
    const { to, children } = this.props;
    return (
      <MenuItem>
        <Typography variant="span" color="inverted">
          <Link to={to} activeClassName={cn(classes.menuLinkActive)}>
            {children}
          </Link>
        </Typography>
      </MenuItem>
    );
  }
}
