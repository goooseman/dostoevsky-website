import React, { useState } from "react";
import classes from "./IndexPage.module.css";
import Container from "src/components/ui-kit/Container";
import { T } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Button from "src/components/ui-kit/Button";
import Input from "src/components/ui-kit/Input";

const IndexPageSubscription = () => {
  const [value, setValue] = useState<string>("");
  const subscribeMe = () => {
    // TODO: show dialog 'thank you' - ok
    // TODO: implement me
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
          <Button color="secondary" onClick={(_e: unknown) => subscribeMe()}>
            <img src={require("./assets/button-arrow.svg")} />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default IndexPageSubscription;
