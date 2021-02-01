import React from "react";
import cn from "clsx";
import classes from "./Footer.module.css";
import { T, useLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Button from "../ui-kit/Button";
import Input from "../ui-kit/Input";
import TextareaAutosize from "react-textarea-autosize";
import Container from "../ui-kit/Container";
import { Menu, MenuLink } from "../Menu";
import { getLinkForCurrentLocale } from "src/utils/locales";
import Modal, { useModal } from "src/components/ui-kit/Modal";
import { useState } from "react";
import { FORMSUBMIT_ID } from "src/config/vars";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { t, locale } = useLocale();
  const { isShowing, toggle } = useModal();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleModalClose = () => {
    toggle();
    setIsSent(false);
    setIsLoading(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("message", message);
    params.append("subject", "Пользователь отпрвил сообщение в форму связи");
    setIsLoading(true);
    try {
      await fetch(`https://formsubmit.io/send/${FORMSUBMIT_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        referrerPolicy: "unsafe-url",
        redirect: "manual",
      });
    } catch (e) {
      alert(
        t(
          "Ваше сообщение не было отправлено. Пожалуйста, отправьте email на info@dostoevsky.io."
        )
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <div className={cn(classes.container)}>
      <Container>
        <div className={cn(classes.leftContainer)}>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <img src={require("./assets/oi-logo.png")} alt={t("Логотип OI")} />
          </a>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <img
              src={require("./assets/d4s-logo.png")}
              alt={t("Логотип D4S")}
            />
          </a>
        </div>
        <div className={cn(classes.middleContainer)}>
          <Menu variant="onBlackBackground" className={cn(classes.footerMenu)}>
            <MenuLink
              to={getLinkForCurrentLocale("/clauses")}
              size="small"
              isNowrap={true}
            >
              <T message="каталог статей ук рф" />
            </MenuLink>
            {locale === "ru" ? (
              <MenuLink
                isNowrap={true}
                to={getLinkForCurrentLocale("/articles")}
                size="small"
              >
                <T message="Аналитика" />
              </MenuLink>
            ) : null}
            <MenuLink
              isNowrap={true}
              to={getLinkForCurrentLocale("/faq")}
              size="small"
            >
              <T message="о датасете" />
            </MenuLink>
            <MenuLink
              isNowrap={true}
              to={getLinkForCurrentLocale("/about")}
              size="small"
            >
              <T message="о проекте" />
            </MenuLink>
            <MenuLink
              isNowrap={true}
              to={getLinkForCurrentLocale("/full")}
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
        isCentered
      >
        {isSent ? (
          <div className={cn(classes.modalSuccess)}>
            <Typography variant="h3" font="serif">
              <i>
                <T message="Спасибо!" />{" "}
                <T message="Ваше сообщение было отправлено!" />
              </i>
            </Typography>
          </div>
        ) : (
          <form className={cn(classes.modalForm)} onSubmit={handleFormSubmit}>
            <div>
              <Input
                type="text"
                value={username}
                required
                placeholder={t("Ваше имя")}
                className={cn(classes.modalInput)}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div>
              <Input
                type="email"
                value={email}
                required
                placeholder={t("Ваш e-mail")}
                className={cn(classes.modalInput)}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div>
              <TextareaAutosize
                name="message"
                minRows={4}
                required
                className={cn(classes.modalTextarea)}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
            </div>
            <div>
              <Button color="secondary" type="submit">
                {isLoading ? (
                  <T message="Загрузка..." />
                ) : (
                  <T message="Отправить" />
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Footer;
