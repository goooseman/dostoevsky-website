import React from "react";
import { Link } from "gatsby";
import cn from "clsx";
import classes from "./Navibar.module.css";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography/Typography";

interface NavibarProps {
  title: string;
}

const Navibar: React.FC<NavibarProps> = () => {
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
          <li className={cn(classes.menuItem)}>
            <Typography variant="span" color="inverted">
              <Link to="/clauses" activeClassName={cn(classes.menuLinkActive)}>
                каталог статей ук рф
              </Link>
            </Typography>
          </li>
          <li className={cn(classes.menuItem)}>
            <Typography variant="span" color="inverted">
              <Link to="/faq" activeClassName={cn(classes.menuLinkActive)}>
                о датасете
              </Link>
            </Typography>
          </li>
          <li className={cn(classes.menuItem)}>
            <Typography variant="span" color="inverted">
              <Link to="/about" activeClassName={cn(classes.menuLinkActive)}>
                о проекте
              </Link>
            </Typography>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navibar;
