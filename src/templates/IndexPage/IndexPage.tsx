import React, { PureComponent } from "react";
import classes from "./IndexPage.module.css";
import Promo from "src/components/Promo";
import Container from "src/components/ui-kit/Container";
import { T } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import IndexPageFilter from "./IndexPageFilter";
import IndexPageAnalytics from "./IndexPageAnalytics";
import IndexPageCounters from "./IndexPageCounters";
import IndexPageMore from "./IndexPageMore";
import IndexPageSubscription from "./IndexPageSubscription";
import years from "content/years.json";
import { Article } from "../ArticleFullPage/ArticleFullPage";

const yearSelectOptions = years.map((y) => ({ value: y, label: y }));

interface IndexPageProps {
  articles: Array<Partial<Article>>;
  counters: {
    totalConvicted: number;
    totalAcquittal: number;
    totalDismissal: number;
    totalNoCrime: number;
  };
}

export class IndexPage extends PureComponent<IndexPageProps> {
  constructor(props: IndexPageProps) {
    super(props);
  }
  render(): React.ReactNode {
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
        <IndexPageCounters counters={this.props.counters} />
        <IndexPageMore articles={this.props.articles} />
        <IndexPageSubscription />
      </>
    );
  }
}

export default IndexPage;
