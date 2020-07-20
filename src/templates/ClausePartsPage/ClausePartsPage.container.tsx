import React, { PureComponent } from "react";
import ClausePartsPage from "./ClausePartsPage";

interface ClausePartsPageContainerProps {
  clauseNumber: number;
  year: number;
  parts: {
    part: string;
    name: string;
    totalConvicted: number; // Всего осуждено
    acquittal: number; // Оправдано
    dismissalAbsenceOfEvent: number; // Прекращено за отсутствием события, состава, непричастностью к преступлению
    dismissalAmnesty: number; // Прекращено по амнистии
    dismissalReconciliation: number; // Прекращено за примирением с потерпевшим
    dismissalRepentance: number; // Прекращено в связи с деятельным раскаянием
    dismissalCourtFine: number; // Прекращено судебный штраф
    dismissalOther: number; // Прекращено по другим основаниям
    coerciveMeasures: number;
  }[];
}

class ClausePartsPageContainer extends PureComponent<
  ClausePartsPageContainerProps
> {
  render(): React.ReactNode {
    const { clauseNumber, year } = this.props;
    return (
      <ClausePartsPage
        clauseNumber={clauseNumber}
        year={year}
        parts={this.getParts()}
      ></ClausePartsPage>
    );
  }

  private getParts = (): React.ComponentProps<
    typeof ClausePartsPage
  >["parts"] => {
    const { parts } = this.props;

    return parts.map((p) => {
      const convictedCount = p.totalConvicted;
      const acquittalCount = p.acquittal;
      const dismissalCount =
        p.dismissalAbsenceOfEvent +
        p.dismissalAmnesty +
        p.dismissalReconciliation +
        p.dismissalRepentance +
        p.dismissalCourtFine +
        p.dismissalOther +
        p.coerciveMeasures;
      const compulsoryTreatmentCount = p.coerciveMeasures;
      return {
        part: p.part,
        name: p.name,
        count: convictedCount,
        byResult: {
          convictedCount,
          acquittalCount,
          dismissalCount,
          compulsoryTreatmentCount,
        },
      };
    });
  };
}

export default ClausePartsPageContainer;
