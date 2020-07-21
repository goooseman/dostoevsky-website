import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import classes from "./ClausePartsPage.module.css";
import cn from "clsx";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import PartsChart from "./charts/PartsChart";
import PartsByResultChart from "./charts/PartsByResultChart";
import PartsByPunishment from "./charts/PartsByPunishment";

export type ClausePartsPageViewMode =
  | "page"
  | "iframe-parts"
  | "iframe-parts-by-result"
  | "iframe-parts-by-punishment";

export interface ClausePartsPageProps {
  clauseNumber: number;
  year: number;
  view: ClausePartsPageViewMode;
  parts: {
    part: string;
    name: string;
    count: number;
    byResult: {
      convictedCount: number;
      acquittalCount: number;
      dismissalCount: number;
      compulsoryTreatmentCount: number;
    };
    byPunishment: {
      primaryLifeSentenceCount: number; // Пожизненное лишение свободы
      primarySuspendedCount: number; // Условное осуждение к лишению свободы
      primaryArrestCount: number; // Арест
      primaryRestrainCount: number; // Ограничение свободы
      primaryRestrain2009Count: number; // Ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части
      primaryCorrectionalLabourCount: number; // Исправительные работы
      primaryCommunityServiceCount: number; // Обязательные работы
      primaryForcedLabourCount: number; // Принудительные работы
      primaryFineCount: number; // Штраф
      primaryDisqualificationCount: number; // Лишение права занимать определенные должности или заниматься определенной деятельностью
      primaryOtherCount: number; // Условное осуждение к иным мерам
      primaryMilitaryDisciplinaryUnitCount: number; // Содержание в дисциплинарной воинской части
      primaryRestrictionsInMilitaryServiceCount: number; // Ограничение по военной службе
      primaryImprisonmentCount: number; // Лишение свободы
    };
  }[];
}

class ClausePartsPage extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, view } = this.props;

    if (view === "iframe-parts") {
      return <PartsChart {...this.props} />;
    }

    if (view === "iframe-parts-by-result") {
      return <PartsByResultChart {...this.props} />;
    }

    if (view === "iframe-parts-by-punishment") {
      return <PartsByPunishment {...this.props} />;
    }

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Части"
        pageType="parts"
        headerChildren={this.renderHeaderChildren()}
      >
        <PartsChart {...this.props} />
        <PartsByResultChart {...this.props} />
        <PartsByPunishment {...this.props} />
      </ClausePageLayout>
    );
  }

  private renderHeaderChildren = () => {
    const { parts } = this.props;
    return (
      <Accordion isOpened={false}>
        {parts.map((p) => (
          <AccordionNode
            className={cn(classes.accordionPartItem)}
            key={p.name}
            title={p.part}
            variant="horizontal"
          >
            {p.name}
          </AccordionNode>
        ))}
      </Accordion>
    );
  };
}

export default ClausePartsPage;
