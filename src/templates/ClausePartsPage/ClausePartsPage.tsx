import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import classes from "./ClausePartsPage.module.css";
import cn from "clsx";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import PercentageBar from "src/components/charts/PercentageBar";

interface ClausePartsPageProps {
  clauseNumber: number;
  year: number;
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
  }[];
}

const byResultLabels = [
  "осуждённых",
  "оправданных",
  "прекращённых",
  "принудительное лечение",
];

class ClausePartsPage extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts } = this.props;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Части"
        pageType="parts"
        headerChildren={this.renderHeaderChildren()}
      >
        <div>
          <PercentageBar
            labels={parts.map((p) => p.part)}
            title={`СРАВНЕНИЕ ЧАСТЕЙ МЕЖДУ СОБОЙ: СКОЛЬКО ЧЕЛОВЕК ОСУЖДЕНО ПО КАЖДОЙ ЧАСТИ СТАТЬИ ${clauseNumber} ПО ОСНОВНОМУ СОСТАВУ`}
            groups={[
              {
                title: "",
                values: parts.map((p) => p.count),
              },
            ]}
          />

          <PercentageBar
            title={`Чем закончились дела, дошедшие до суда по каждой части статьи ${clauseNumber}`}
            labels={byResultLabels}
            groups={parts.map((p) => ({
              title: p.part,
              values: [
                p.byResult.convictedCount,
                p.byResult.acquittalCount,
                p.byResult.dismissalCount,
                p.byResult.compulsoryTreatmentCount,
              ],
            }))}
          />
        </div>
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
