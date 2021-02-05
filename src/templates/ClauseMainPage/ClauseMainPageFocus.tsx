import React, { useState } from "react";
import classes from "./ClauseMainPage.module.css";
import { T, useLocale } from "react-targem";
import { Counters, Counter } from "src/components/Counters";
import Button from "src/components/ui-kit/Button";
import { Helmet } from "react-helmet";
import ClauseMainPageFocusTerminatedChart from "./components/charts/ClauseMainPageFocusTerminatedChart";
import ClauseMainPageFocusTerminatedTreemap from "./components/charts/ClauseMainPageFocusTerminatedTreemap";
import ClauseMainPageFocusPunishmentsTreemap from "./components/charts/ClauseMainPageFocusPunishmentsTreemap";

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
    totalConvicted,
    totalAcquittal,
    totalDismissal,
    unfinishedOffence,
    dismissalAmnesty,
    noCrimeSelfDefence,
    totalAdd,
  } = props;

  const { t } = useLocale();

  const [openMoreStats, setOpenMoreStats] = useState(false);

  return (
    <>
      <Helmet defer={false}>
        <title>
          {`${t("Статья")} ${clauseNumber} | ${t(
            "Основной состав: в фокусе"
          )} | ${t("Чарты")}`}
        </title>
        <meta
          name="description"
          content={t(
            "Информация по основному и дополнительному составу статьи в виде чартов"
          )}
        />
      </Helmet>
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
          helpText={
            unfinishedOffence === 0
              ? t(
                  "Это может означать как то, что все были оконченными, так и то, что сам состав является формальным и не имеет стадий совершения правонарушения (например, можно готовить покушение убийство, но нельзя готовить покушение на неоднократное участие в несогласованных акциях)."
                )
              : undefined
          }
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
        <ClauseMainPageFocusTerminatedTreemap {...props} />
      </div>

      <ClauseMainPageFocusTerminatedChart {...props} />

      <Counters className={classes.counter}>
        <Counter
          counter={totalAdd}
          label={<T message="дополнительных наказаний назначено по статье" />}
        />
      </Counters>

      <div className={classes.treemapWrapper}>
        <ClauseMainPageFocusPunishmentsTreemap {...props} />
      </div>
    </>
  );
};

export default ClauseMainPageFocus;
