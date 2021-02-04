/* eslint-disable no-console */
import React, { useState } from "react";
import classes from "./IndexPage.module.css";
import Container from "src/components/ui-kit/Container";
import { T } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Button from "src/components/ui-kit/Button";
import Input from "src/components/ui-kit/Input";
import Modal from "src/components/ui-kit/Modal";
import axios from "axios";
import { subscribeToEmail } from "src/utils/emails-service";

const url = "https://dostoevsky.us2.list-manage.com/subscribe/post";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IndexPageSubscription = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  const handleClick = async () => {
    setIsLoading(true);
    await subscribeToEmail(email);
    setIsLoading(false);
    setFlag(true);
  };
  return (
    <Container>
      <div className={classes.subscription}>
        <Typography
          font="serif"
          variant="h2"
          component="p"
          className={classes.title}
        >
          <b>
            <T message="Хотите первыми получать новости и обновления от команды Достоевского?" />
          </b>
        </Typography>
        <Typography
          font="serif"
          className={classes.subtitle}
          variant="h3"
          component="p"
        >
          <i>Подпишитесь на нашу рассылку:</i>
        </Typography>
        <div className={classes.bottomInput}>
          <Input
            type="text"
            className={classes.subscriptionInput}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Ваш E-mail"
          />
          <Button
            disabled={isLoading}
            onClick={handleClick}
            color="secondary"
            type="submit"
          >
            {isLoading ? (
              <T message="Загрузка..." />
            ) : (
              <img src={require("./assets/button-arrow.svg")} />
            )}
          </Button>
        </div>
      </div>
      <Modal
        title=""
        isShowing={flag}
        onHideButtonClick={() => setFlag(false)}
        size="sm"
        isCentered
      >
        <Typography font="serif" variant="h3" component="p" isCentered>
          <T message="Спасибо, что подписались на нашу рассылку!" />
        </Typography>
      </Modal>
    </Container>
  );
};

export default IndexPageSubscription;
