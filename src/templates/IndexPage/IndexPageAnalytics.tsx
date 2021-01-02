import React, { useState } from "react";
import classes from "./IndexPage.module.css";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Container from "src/components/ui-kit/Container";
import Select, { components } from "react-select";
import CommentsBar from "src/components/charts/CommentsBar";
import { Link, navigate } from "gatsby";

const getAnalyticsCharts = (
  selectedYear: { value: number; label: number },
  t: (s: string) => string
) => [
  {
    title: t(
      `Статьи УК РФ, по которым осуждали чаще всего в ${selectedYear.value} году`
    ),
    charts: [
      {
        title: t("осудили человек"),
        // color: "b",
        series: [
          [
            {
              value: 59543,
              title: t(
                "Нарушение ПДД лицом, подвергнутым административному наказанию"
              ),
            },
            {
              value: 59018,
              title: t("Незаконное приобретение и хранение наркотиков"),
            },
            { value: 150495, title: t("Кража") },
            { value: 46884, title: t("Неуплата алиментов") },
            { value: 23281, title: t("Грабёж") },
            {
              value: 18830,
              title: t(
                "Угроза убийством или причинением тяжкого вреда здоровью"
              ),
            },
            {
              value: 18775,
              title: t("Умышленное причинение тяжкого вреда здоровью"),
            },
            {
              value: 17044,
              title: t("Незаконное производство и сбыт наркотиков"),
            },
            { value: 16258, title: t("Мошенничество") },
            {
              value: 12044,
              title: t("Умышленное причинение легкого вреда здоровью"),
            },
          ],
        ],
      },
    ],
  },
  {
    title: t(
      `Какие наказания суды чаще всего назначали в ${selectedYear.value} году`
    ),
    charts: [
      {
        title: t("осудили человек"),
        series: [
          [
            { value: 172914, title: t("лишение свободы") },
            { value: 157051, title: t("условное осуждение к лишению свободы") },
            { value: 100807, title: t("обязательные работы") },
            { value: 75200, title: t("штраф") },
            { value: 51684, title: t("исправительные работы") },
          ],
        ],
      },
    ],
  },
];

interface YearOption {
  value: number;
  label: number;
}

interface IndexPageAnalyticsProps {
  yearSelectOptions: YearOption[];
  defaultYearSelectOption: YearOption;
  counters: {
    totalConvicted: number;
    totalAcquittal: number;
    totalDismissal: number;
    total: number;
  };
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
  counters: { total, totalAcquittal, totalConvicted, totalDismissal },
}: IndexPageAnalyticsProps) => {
  const { t } = useLocale();
  const [selectedYear, setSelectedYear] = useState<YearOption>(
    defaultYearSelectOption
  );

  const handleYearChange = (option: YearOption) => {
    setSelectedYear(option);
    if (option.value === yearSelectOptions[0].value) {
      return navigate(`/`);
    }
    navigate(`/${option.value}/`);
  };

  return (
    <Container className={classes.analyticsWrapper}>
      <div>
        <Typography isUpperCased color="secondary">
          <T message="Аналитика" />
        </Typography>
        <Typography variant="h2" font="serif">
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
          <T message="По всем статьям УК РФ прошли через суд дела" />{" "}
          <b>{total}</b>{" "}
          <T messagePlural="человека" message="человек" count={total} />
          {". "}
          <T message="Из них были осуждены" /> <b>{totalConvicted}</b>{" "}
          <T
            messagePlural="человека"
            message="человек"
            count={totalConvicted}
          />
          {". "}
          <b>{totalAcquittal}</b>{" "}
          <T
            messagePlural="обвиняемых оправданы"
            message="обвиняемый оправдан"
            count={totalAcquittal}
          />
          {". "}
          <T message="По различным основаниям прекращено" />{" "}
          <b>{totalDismissal}</b>{" "}
          <T message="дел" messagePlural="дело" count={totalDismissal} />.
        </Typography>
        <div className={classes.analyticsChartsWrapper}>
          {getAnalyticsCharts(selectedYear, t).map((c, i) => (
            <CommentsBar key={i} {...c} />
          ))}
        </div>
      </div>
      <Link
        className={classes.analyticsLinkWrapper}
        to={`/stats-${selectedYear.value}`}
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
