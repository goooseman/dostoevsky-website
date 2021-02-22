import React from "react";
import cn from "clsx";
import classes from "./Footer.module.css";
import { T, useLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Button from "../ui-kit/Button";
import Container from "../ui-kit/Container";
import { Menu, MenuLink } from "../Menu";
import { getLinkForLocale } from "src/utils/locales";
import Modal, { useModal } from "src/components/ui-kit/Modal";
import useFeatureFlag from "src/hooks/useFeatureFlag";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { t, locale } = useLocale();
  const { isShowing, toggle } = useModal();
  const hasAnalytics = useFeatureFlag("analytics");

  const handleModalClose = () => {
    toggle();
  };

  return (
    <div className={cn(classes.container)}>
      <Container>
        <div className={cn(classes.leftContainer)}>
          <a href="https://ovdinfo.org/" target="_blank" rel="noreferrer">
            <img src={require("./assets/oi-logo.png")} alt={t("Логотип OI")} />
          </a>
          <a href="https://d4s.io/" target="_blank" rel="noreferrer">
            <img
              src={require("./assets/d4s-logo.png")}
              alt={t("Логотип D4S")}
            />
          </a>
        </div>
        <div className={cn(classes.middleContainer)}>
          <Menu variant="onBlackBackground" className={cn(classes.footerMenu)}>
            <MenuLink
              to={getLinkForLocale(locale, "/clauses")}
              size="small"
              isNowrap={true}
            >
              <T message="каталог статей ук рф" />
            </MenuLink>
            {locale === "ru" && hasAnalytics ? (
              <MenuLink
                isNowrap={true}
                to={getLinkForLocale(locale, "/articles")}
                size="small"
              >
                <T message="Аналитика" />
              </MenuLink>
            ) : null}
            <MenuLink
              isNowrap={true}
              to={getLinkForLocale(locale, "/faq")}
              size="small"
            >
              <T message="о датасете" />
            </MenuLink>
            <MenuLink
              isNowrap={true}
              to={getLinkForLocale(locale, "/about")}
              size="small"
            >
              <T message="о проекте" />
            </MenuLink>
            <MenuLink
              isNowrap={true}
              to={getLinkForLocale(locale, "/full")}
              size="small"
            >
              <T message="полный датасет" />
            </MenuLink>
          </Menu>
          <Typography size="small" color="inverted">
            <T message="Достоевский" />.{" "}
            <T message="Все материалы сайта доступны по лицензии Creative Commons СС-BY-SA 4.0" />
          </Typography>
        </div>
        <div className={cn(classes.rightContainer)}>
          <Button color="inverted" onClick={toggle}>
            <Typography variant="span" color="inverted">
              <T message="напишите нам" />
            </Typography>
          </Button>
          <div className={classes.socialMediaLinksContainer}>
            <a href="https://telegram.com" target="_blank" rel="noreferrer">
              <img src={require("./assets/telegram.svg")} alt="Telegram" />
            </a>
            <a
              href="https://github.com/goooseman/dostoevsky-website/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={require("./assets/git.svg")} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={require("./assets/twitter.svg")} alt="Twitter " />
            </a>
          </div>
          <div>
            <Typography variant="b" color="inverted">
              <a href="mailto:info@dostoevsky.io" className={cn(classes.email)}>
                info@dostoevsky.io
              </a>
            </Typography>
          </div>
        </div>
      </Container>
      <Modal
        isShowing={isShowing}
        onHideButtonClick={handleModalClose}
        title={<T message="Напишите нам" />}
        size="md"
      >
        <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
        <iframe
          className="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shrmFW7gSavd4XqYI?backgroundColor=green"
          frameBorder="0"
          width="100%"
          height="980"
          style={{ background: "transparent", border: "1px solid #ccc" }}
        ></iframe>
      </Modal>
    </div>
  );
};

export default Footer;
