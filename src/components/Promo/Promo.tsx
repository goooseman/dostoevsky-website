import React from "react";
import classes from "./Promo.module.css";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import Button from "../ui-kit/Button";
import { T, useLocale } from "react-targem";
import { getLinkForLocale } from "src/utils/locales";

const Promo: React.FC = () => {
  const { locale } = useLocale();
  return (
    <Container>
      <div className={classes.promo}>
        <Typography font="serif" variant="h3" component="h3">
          <i>
            <T message="Нужны данные по всем статьям и годам?" />
          </i>
        </Typography>
        <Typography font="serif" variant="h2" component="p">
          <b>
            <T message="Полный доступ к датасету" />
          </b>
        </Typography>
        <Button
          to={getLinkForLocale(locale, "/full")}
          className={classes.button}
        >
          <T message="Перейти" />
        </Button>
      </div>
    </Container>
  );
};

export default Promo;
