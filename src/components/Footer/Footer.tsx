import React from "react";
import cn from "clsx";
import classes from "./Footer.module.css";
import { withLocale, WithLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Button from "../ui-kit/Button";
import Input from "../ui-kit/Input";
import TextareaAutosize from "react-textarea-autosize";
import Container from "../ui-kit/Container";
import { Menu, MenuLink } from "../Menu";
import Modal, { useModal } from "src/components/ui-kit/Modal";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface FooterProps extends WithLocale {}

const Footer: React.FC<FooterProps> = ({ t }: FooterProps) => {
  const { isShowing, toggle } = useModal();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendFeedback = () => {
    if (email && message) {
      axios({
        method: "post",
        url: "/feedback/",
        responseType: "text",
        data: { username, email, message },
      })
        // eslint-disable-next-line no-console
        .then((r: AxiosResponse) => console.log(r))
        .catch(console.error);
    }
  };

  return (
    <div className={cn(classes.container)}>
      <Container>
        <div className={cn(classes.leftContainer)}>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <img src={require("./assets/oi-logo.png")} alt={t("OI logo")} />
          </a>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <img src={require("./assets/d4s-logo.png")} alt={t("D4S logo")} />
          </a>
        </div>
        <div className={cn(classes.middleContainer)}>
          <Menu variant="onBlackBackground">
            <MenuLink to="/clauses" size="small">
              каталог статей ук рф
            </MenuLink>
            <MenuLink to="/analytics" size="small">
              Аналитика
            </MenuLink>
            <MenuLink to="/faq" size="small">
              о датасете
            </MenuLink>
            <MenuLink to="/about" size="small">
              о проекте
            </MenuLink>
            <MenuLink to="/full" size="small">
              полный датасет
            </MenuLink>
          </Menu>
          <Typography size="small" color="inverted">
            Достоевский. Все материалы сайта доступны по лицензии Creative
            Commons СС-BY-SA 4.0
          </Typography>
        </div>
        <div className={cn(classes.rightContainer)}>
          {/*<Button color="inverted" onClick={() => toggle()}> */}
          <Typography variant="span" color="inverted">
            напишите нам
          </Typography>
          {/*</Button> */}
          <div className={classes.socialMediaLinksContainer}>
            <a href="https://telegram.com" target="_blank" rel="noreferrer">
              <img
                src={require("./assets/telegram.svg")}
                alt="Our Telegram page"
              />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img
                src={require("./assets/facebook.svg")}
                alt="Our Facebook page"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img
                src={require("./assets/twitter.svg")}
                alt="Our Twitter page"
              />
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
        onHideButtonClick={toggle}
        title={"Напишите нам"}
        size="md"
        isCentered
      >
        <div className="modal-centered">
          <div className="modal-line">
            <Input
              type="text"
              value={username}
              placeholder="Ваше имя"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="modal-line">
            <Input
              type="email"
              value={email}
              placeholder="Ваш e-mail"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="modal-line">
            <TextareaAutosize
              name="message"
              onChange={(e) => setMessage(e.currentTarget.value)}
            />
          </div>
          <div className="modal-line">
            <Button onClick={() => sendFeedback()} color="secondary">
              Отправить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withLocale(Footer);
