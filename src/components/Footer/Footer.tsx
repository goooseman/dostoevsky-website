import React from "react";
import cn from "clsx";
import classes from "./Footer.module.css";
import { withLocale, WithLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import { Link } from "gatsby";
import Button from "../ui-kit/Button";
import Container from "../ui-kit/Container";

interface FooterProps extends WithLocale {}

const Footer: React.FC<FooterProps> = ({ t }: FooterProps) => (
  <div className={cn(classes.container)}>
    <Container>
      <div className={cn(classes.leftContainer)}>
        <a href="https://google.com" target="_blank" rel="noreferrer">
          <img src={require("./oi-logo.png")} alt={t("OI logo")} />
        </a>
        <a href="https://google.com" target="_blank" rel="noreferrer">
          <img src={require("./d4s-logo.png")} alt={t("D4S logo")} />
        </a>
      </div>
      <div className={cn(classes.middleContainer)}>
        <div className={classes.linksContainer}>
          <Typography variant="span" color="inverted">
            <Link to="/clauses" activeClassName={cn(classes.menuLinkActive)}>
              Каталог статей УК РФ
            </Link>
          </Typography>
          <Typography variant="span" color="inverted">
            <Link to="/faq" activeClassName={cn(classes.menuLinkActive)}>
              О датасете
            </Link>
          </Typography>
          <Typography variant="span" color="inverted">
            <Link to="/about" activeClassName={cn(classes.menuLinkActive)}>
              О проекте
            </Link>
          </Typography>
        </div>
        <Typography size="small" color="inverted">
          Достоевский {new Date().getFullYear()} All Rights Reserved
        </Typography>
      </div>
      <div className={cn(classes.rightContainer)}>
        <Button color="inverted">
          <Typography variant="span" color="inverted">
            напишите нам
          </Typography>
        </Button>
        <div className={classes.socialMediaLinksContainer}>
          <a href="https://telegram.com" target="_blank" rel="noreferrer">
            <img src={require("./telegram.svg")} alt="Our Telegram page" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={require("./facebook.svg")} alt="Our Facebook page" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src={require("./twitter.svg")} alt="Our Twitter page" />
          </a>
        </div>
      </div>
    </Container>
  </div>
);

export default withLocale(Footer);
