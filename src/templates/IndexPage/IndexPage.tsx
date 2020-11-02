import React from "react";
import classes from "./IndexPage.module.css";
import Promo from "src/components/Promo";
import Container from "src/components/ui-kit/Container";
import { T } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import IndexPageFilter from "./IndexPageFilter";
import IndexPageAnalytics from "./IndexPageAnalytics";
import years from "content/years.json";

const yearSelectOptions = years.map((y) => ({ value: y, label: y }));

const IndexPage: React.FC = () => {
  return (
    <>
      <div className={classes.topBlockWrapper}>
        <Container>
          <div className={classes.topBlock}>
            <Typography
              color="inverted"
              variant="h1"
              className={classes.leftText}
            >
              <b>
                <T message="Статистика судебных решений" />{" "}
              </b>
              <T message="по статьям Уголовного кодекса на основе публикаций Судебного департамента при Верховном Суде РФ" />
            </Typography>
            <div className={classes.images}>
              <img
                src={require("./assets/graph-icon.svg")}
                className={classes.graphIcon}
              />
              <img
                src={require("./assets/chart-icon.svg")}
                className={classes.chartIcon}
              />
              <img
                src={require("./assets/table-icon.svg")}
                className={classes.tableIcon}
              />
            </div>
            <Typography color="inverted" className={classes.rightText}>
              <T message="Вы сможете найти информацию по любой статье УК с 2009 по 2019 год: статистика обвинительных и оправдательных приговоров, лишений свободы, амнистий и многое другое." />
            </Typography>
          </div>
        </Container>
      </div>
      <div className={classes.filterBlockWrapper}>
        <IndexPageFilter yearSelectOptions={yearSelectOptions} />
      </div>
      <div className={classes.promoWrapper}>
        <Promo />
      </div>
      <IndexPageAnalytics yearSelectOptions={yearSelectOptions} />
    </>
  );
};

export default IndexPage;
