import React, { useState } from "react";
import classes from "./ClauseMainPage.module.css";
import { T, useLocale } from "react-targem";
import { Counters, Counter } from "src/components/Counters";
import Treemap from "src/components/charts/Treemap";
import Button from "src/components/ui-kit/Button";
import PercentageBar from "src/components/charts/PercentageBar";
import { getClauseLink } from "src/config/routes";

interface ClauseMainPageFocusProps {
  clauseNumber: number;
  year: number;
  totalConvicted: number;
  totalAcquittal: number;
  totalDismissal: number;
  unfinishedOffence: number;
  coerciveMeasures: number;
  dismissalAmnesty: number;
  noCrimeSelfDefence: number;
  addDismissalPersons: number;
  addDismissalOtherOffences: number;
  totalAdd: number;
  primarySuspended: number;
  primaryImprisonment: number;
  primaryFine: number;
  primaryCorrectionalLabour: number;
}

const ClauseMainPageFocus: React.FC<ClauseMainPageFocusProps> = (
  props: ClauseMainPageFocusProps
) => {
  const {
    clauseNumber,
    year,
    totalConvicted,
    totalAcquittal,
    totalDismissal,
    unfinishedOffence,
    coerciveMeasures,
    dismissalAmnesty,
    noCrimeSelfDefence,
    addDismissalPersons,
    addDismissalOtherOffences,
    totalAdd,
    primarySuspended,
    primaryImprisonment,
    primaryFine,
    primaryCorrectionalLabour,
  } = props;

  const { t } = useLocale();

  const [openMoreStats, setOpenMoreStats] = useState(false);

  const statsOnTermination = [
    {
      label: t(
        "Дела прекращены за отсутствием состава, события преступления, непричастностью к преступлению (число лиц)"
      ),
      value: addDismissalPersons,
    },
    {
      label: t("Дела прекращены по иным основаниям (число лиц)"),
      value: addDismissalOtherOffences,
    },
    {
      label: t("Принудительное лечение"),
      value: coerciveMeasures,
    },
  ].sort((a, b) => b.value - a.value);

  return (
    <>
      <Counters className={classes.counter}>
        <Counter
          counter={totalConvicted}
          label={<T message="человек осуждены за год" />}
        />
        <Counter
          counter={totalAcquittal}
          label={<T message="человек оправданы" />}
        />
        <Counter
          counter={totalDismissal}
          label={
            <T message="человек, в отношении которых дело было прекращено" />
          }
        />
        <Counter
          counter={unfinishedOffence}
          label={<T message="преступлений признано неоконченными" />}
          helpText={t(
            "Это может означать как то, что все были оконченными, так и то, что сам состав является формальным и не имеет стадий совершения правонарушения (например, можно готовить покушение убийство, но нельзя готовить покушение на неоднократное участие в несогласованных акциях)."
          )}
        />
      </Counters>

      <div className={classes.moreButtonWrapper}>
        <Button
          color="secondary"
          withArrow
          verticalArrow
          verticalArrowRotate={openMoreStats}
          onClick={() => setOpenMoreStats(!openMoreStats)}
        >
          <T message="Дополнительно" />
        </Button>
      </div>

      {openMoreStats ? (
        <Counters className={classes.counter}>
          <Counter
            counter={dismissalAmnesty}
            label={<T message="дел прекращено по амнистии" />}
          />
          <Counter
            counter={noCrimeSelfDefence}
            label={<T message="дел прекращено как необходимая оборона" />}
          />
        </Counters>
      ) : null}

      <div className={classes.treemapWrapper}>
        <Treemap
          title={t(
            `Чем закончились дела по статье ${clauseNumber}, дошедшие до суда по основному составу в ${year} году`
          )}
          data={[
            {
              value: totalDismissal,
              label: "прекращено дел в отношении человек",
            },
            { value: totalConvicted, label: "осуждены" },
            {
              value: totalAcquittal,
              label: "оправданы",
            },
            {
              value: coerciveMeasures,
              label: "принудительное лечение",
            },
          ]}
          width={625}
          height={392}
          clauseNumber={clauseNumber}
          year={year}
          downloadFilename={`${clauseNumber}-${year}-treemap`}
        />
      </div>

      <PercentageBar
        isSeparateLabels
        centerTitle
        labels={statsOnTermination.map((s) => s.label)}
        downloadFilename={`${clauseNumber}-${year}-parts`}
        title={t(`Статистика прекращения дел по статье в ${year} году`)}
        groups={[
          {
            title: "",
            values: statsOnTermination.map((s) => s.value),
          },
        ]}
        isIframeMode={false}
        tooltipDescription={{
          Состав: `${clauseNumber} основной состав`,
          Меры: "^^",
          "Число человек": "%%",
        }}
        iframePath={getClauseLink(
          clauseNumber.toString(),
          year.toString(),
          "focus"
        )}
      />

      <Counters className={classes.counter}>
        <Counter
          counter={totalAdd}
          label={<T message="дополнительных наказаний назначено по статье" />}
        />
      </Counters>

      <div className={classes.treemapWrapper}>
        <Treemap
          title={t(
            `Наказания для подсудимых по статье ${clauseNumber} в ${year} году`
          )}
          data={[
            {
              value: primarySuspended,
              label: "условное осуждение к лишению свободы",
            },
            { value: primaryImprisonment, label: "лишение свободы" },
            {
              value: primaryFine,
              label: "штраф",
            },
            {
              value: primaryCorrectionalLabour,
              label: "исправительные работы",
            },
          ]}
          width={625}
          height={392}
          clauseNumber={clauseNumber}
          year={year}
          downloadFilename={`${clauseNumber}-${year}-treemap`}
        />
      </div>
    </>
  );
};

export default ClauseMainPageFocus;
