import React from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Navibar.module.css";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography/Typography";

interface Props {
  title: string;
  location: Location;
}

const Navibar: React.FC<Props> = ({ location }: Props) => {
  return (
    <nav className={cn(classes.container)}>
      <Container>
        <div className={cn(classes.firstRow)}>
          <Typography
            className={cn(classes.logo)}
            variant="span"
            color="inverted"
          >
            <Link to="/">Достоевский</Link>
          </Typography>
        </div>
        <ul className={classes.menu}>
          <li
            className={cn(classes.menuItem, {
              [classes.menuItemActive]: location.pathname === "/clauses",
            })}
          >
            <Typography variant="span" color="inverted">
              <Link to="/clauses">каталог статей ук рф</Link>
            </Typography>
          </li>
          <li
            className={cn(classes.menuItem, {
              [classes.menuItemActive]: location.pathname === "/faq",
            })}
          >
            {" "}
            <Typography variant="span" color="inverted">
              <Link to="/faq">о датасете</Link>
            </Typography>
          </li>
          <li
            className={cn(classes.menuItem, {
              [classes.menuItemActive]: location.pathname === "/about",
            })}
          >
            <Typography variant="span" color="inverted">
              <Link to="/about">о проекте</Link>
            </Typography>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navibar;
