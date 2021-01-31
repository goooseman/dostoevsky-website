import React, { PureComponent } from "react";
import classes from "./IndexPage.module.css";
import Promo from "src/components/Promo";
import Container from "src/components/ui-kit/Container";
import { T, withLocale, WithLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import IndexPageFilter from "./IndexPageFilter";
import IndexPageAnalytics from "./IndexPageAnalytics";
import IndexPageCounters from "./IndexPageCounters";
import IndexPageMore from "./IndexPageMore";
import IndexPageSubscription from "./IndexPageSubscription";
import years from "content/years.json";
import { Article } from "../ArticleFullPage/ArticleFullPage";
import { IndexCounters, IndexTopClause } from "src/utils/index-page";
import { IndexPageViews } from "src/config/routes";
import { Helmet } from "react-helmet";

const yearSelectOptions = years.map((y) => ({
  value: y.toString(),
  label: y.toString(),
}));

interface IndexPageProps extends WithLocale {
  articles: Partial<Article>[];
  currentSelectedYear: number;
  counters: IndexCounters;
  topClauses: IndexTopClause[];
  view: IndexPageViews;
}

export class IndexPage extends PureComponent<IndexPageProps> {
  constructor(props: IndexPageProps) {
    super(props);
  }
  render(): React.ReactNode {
    const {
      currentSelectedYear,
      counters,
      articles,
      topClauses,
      view,
      t,
    } = this.props;
    const defaultYearSelectOption = {
      value: currentSelectedYear.toString(),
      label: currentSelectedYear.toString(),
    };
    if (view === "iframe-by-punishment" || view === "iframe-top-clauses") {
      return (
        <IndexPageAnalytics
          topClauses={topClauses}
          yearSelectOptions={yearSelectOptions}
          defaultYearSelectOption={defaultYearSelectOption}
          counters={counters}
          view={view}
        />
      );
    }

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
                <Helmet defer={false}>
                  <title>
                    {`${t(
                      "Статистика судебных решений"
                    )} | ${currentSelectedYear}`}
                  </title>
                  <meta
                    name="description"
                    content={`${t("Статистика судебных решений")} ${t(
                      "по статьям Уголовного кодекса на основе публикаций Судебного департамента при Верховном Суде РФ"
                    )}`}
                  />
                </Helmet>
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
          <IndexPageFilter
            defaultYearSelectOption={defaultYearSelectOption}
            yearSelectOptions={yearSelectOptions}
          />
        </div>
        <div className={classes.promoWrapper}>
          <Promo />
        </div>
        <div id="analitycs"></div>
        <IndexPageAnalytics
          topClauses={topClauses}
          yearSelectOptions={yearSelectOptions}
          defaultYearSelectOption={defaultYearSelectOption}
          counters={counters}
          view={view}
        />
        <IndexPageCounters counters={counters} />
        <IndexPageMore articles={articles} />
        <IndexPageSubscription />
      </>
    );
  }
}

export default withLocale(IndexPage);
