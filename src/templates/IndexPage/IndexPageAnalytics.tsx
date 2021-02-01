import React, { useState } from "react";
import classes from "./IndexPage.module.css";
import Typography from "src/components/ui-kit/Typography";
import { useLocale } from "react-targem";
import Container from "src/components/ui-kit/Container";
import Select, { components } from "react-select";
import CommentsBar from "src/components/charts/CommentsBar";
import { Link, navigate } from "gatsby";
import { CountersByPunishment, SelectOption } from "src/types";
import { IndexTopClause } from "src/utils/index-page";
import { getIndexLink, IndexPageViews } from "src/config/routes";
import T from "src/components/T";

const getAnalyticsCharts = (
  selectedYear: string,
  counters: CountersByPunishment,
  topCounters: IndexTopClause[],
  t: (s: string) => string
) => [
  {
    title: t(
      `Статьи УК РФ, по которым осуждали чаще всего в ${selectedYear} году`
    ),
    iframePath: getIndexLink(selectedYear, "iframe-top-clauses"),
    charts: [
      {
        title: t("осудили человек"),
        series: [
          topCounters.map((s) => ({
            title: s.title,
            value: s.totalConvicted,
          })),
        ],
      },
    ],
  },
  {
    title: t(
      `Какие наказания суды чаще всего назначали в ${selectedYear} году`
    ),
    iframePath: getIndexLink(selectedYear, "iframe-by-punishment"),
    charts: [
      {
        title: t("осудили человек"),
        series: [
          [
            {
              value: counters.primaryImprisonment,
              title: t("лишение свободы"),
            },
            {
              value: counters.primarySuspended,
              title: t("условное осуждение к лишению свободы"),
            },
            {
              value: counters.primaryCommunityService,
              title: t("обязательные работы"),
            },
            {
              value: counters.primaryForcedLabour,
              title: t("принудительные работы"),
            },
            {
              value: counters.coerciveMeasures,
              title: t("исправительные работы"),
            },
            { value: counters.primaryFine, title: t("штраф") },
            {
              title: t("принудительные меры к невменяемым"),
              value: counters.coerciveMeasures,
            },
            {
              title: t("Условное осуждение к иным мерам"),
              value: counters.primaryOther,
            },
          ].sort((n1, n2) => n2.value - n1.value),
        ],
      },
    ],
  },
];

interface IndexPageAnalyticsProps {
  yearSelectOptions: SelectOption[];
  defaultYearSelectOption: SelectOption;
  view: IndexPageViews;
  counters: {
    totalConvicted: number;
    totalAcquittal: number;
    totalDismissal: number;
    total: number;
    totalByPunishment: CountersByPunishment;
  };
  topClauses: IndexTopClause[];
}

const DropdownIndicator = (props: object) => {
  return (
    /* @ts-ignore */
    <components.DropdownIndicator {...props}>
      <img src={require("./assets/down.svg")} />
    </components.DropdownIndicator>
  );
};

const IndexPageAnalytics: React.FC<IndexPageAnalyticsProps> = ({
  yearSelectOptions,
  defaultYearSelectOption,
  view,
  counters: {
    total,
    totalAcquittal,
    totalConvicted,
    totalDismissal,
    ...counters
  },
  topClauses,
}: IndexPageAnalyticsProps) => {
  const { t, locale } = useLocale();
  const [selectedYear, setSelectedYear] = useState<SelectOption>(
    defaultYearSelectOption
  );

  const handleYearChange = (option: SelectOption) => {
    setSelectedYear(option);
    navigate(getIndexLink(option.value, "page", "analitycs"));
  };

  const charts = getAnalyticsCharts(
    selectedYear.label,
    counters.totalByPunishment,
    topClauses,
    t
  );

  if (view === "iframe-top-clauses") {
    return <CommentsBar {...charts[0]} />;
  }

  if (view === "iframe-by-punishment") {
    return <CommentsBar {...charts[1]} />;
  }

  return (
    <Container id="analitycs" className={classes.analyticsWrapper}>
      <div>
        <Typography isUpperCased color="secondary">
          <T message="Аналитика" />
        </Typography>
        <Typography
          style={{ maxWidth: 620, marginBottom: 40 }}
          variant="h2"
          font="serif"
        >
          <b className={classes.analyticsTitleWrapper}>
            <T message="Статистика решений суда по всем статьям УК РФ в" />
            <Select
              className="select"
              classNamePrefix="select"
              components={{ DropdownIndicator }}
              options={yearSelectOptions}
              value={selectedYear}
              isSearchable={false}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={handleYearChange}
            />
            <T message="году" />
          </b>
        </Typography>
        <Typography className={classes.analyticsSubtitle}>
          <T
            messagePlural="По всем статьям УК РФ прошли через суд дела <b>{{ count }}</b> человек"
            message="По всем статьям УК РФ прошли через суд дела <b>{{ count }}</b> человека"
            count={total}
          />
          {". "}
          <T
            messagePlural="Из них были осуждены  <b>{{ count }}</b> человека"
            message="Из них были осуждены  <b>{{ count }}</b> человек"
            count={totalConvicted}
          />
          {". "}
          <T
            messagePlural=" <b>{{ count }}</b> обвиняемых оправданы"
            message=" <b>{{ count }}</b> обвиняемый оправдан"
            count={totalAcquittal}
          />
          {". "}
          <T
            message="По различным основаниям прекращено <b>{{ count }}</b> дел"
            messagePlural="По различным основаниям прекращено <b>{{ count }}</b> дело"
            count={totalDismissal}
          />
          .
        </Typography>
        <div className={classes.analyticsChartsWrapper}>
          {charts.map((c) => (
            <CommentsBar key={c.title} {...c} />
          ))}
        </div>
      </div>
      <Link
        className={classes.analyticsLinkWrapper}
        to={`${locale}/articles/stats-${selectedYear.value}`}
      >
        <Typography isUpperCased className={classes.analyticsLink}>
          <b>
            <T message="Перейти к материалу" />
          </b>
        </Typography>
        <img src={require("./assets/analytics-arrow.svg")} />
      </Link>
    </Container>
  );
};

export default IndexPageAnalytics;
