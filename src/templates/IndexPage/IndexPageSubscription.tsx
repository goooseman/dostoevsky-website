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

const url = "https://dostoevsky.us2.list-manage.com/subscribe/post";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IndexPageSubscription = () => {
  const [value, setValue] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);
  const handleClick = async () => {
    const params = new URLSearchParams();
    params.append("u", "f077fefd24ca7afab1bd50ad9");
    params.append("id", "9cf06a72fd");
    params.append("email", value);
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    await axios({ method: "post", url, headers, params });
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
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder="Ваш E-mail"
          />
          <Button onClick={() => handleClick()} color="secondary" type="submit">
            <img src={require("./assets/button-arrow.svg")} />
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
