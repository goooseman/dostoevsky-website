import React, { PureComponent } from "react";
import ClausePartsPage, { ClausePartsPageViewMode } from "./ClausePartsPage";
import { Redirect } from "@reach/router";
import { getClauseLink } from "src/config/routes";

interface ClausePartsPageContainerProps {
  clauseNumber: number;
  year: number;
  view: ClausePartsPageViewMode;
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
    primaryLifeSentence: number;
    primarySuspended: number;
    primaryArrest: number;
    primaryRestrain: number;
    primaryRestrain2009: number;
    primaryCorrectionalLabour: number;
    primaryCommunityService: number;
    primaryForcedLabour: number;
    primaryFine: number;
    primaryDisqualification: number;
    primaryOther: number;
    primaryMilitaryDisciplinaryUnit: number;
    primaryRestrictionsInMilitaryService: number;
    primaryImprisonment: number;
  }[];
}

class ClausePartsPageContainer extends PureComponent<
  ClausePartsPageContainerProps
> {
  render(): React.ReactNode {
    const { clauseNumber, year, view } = this.props;
    if (this.props.parts.length === 0) {
      return (
        <Redirect
          to={getClauseLink(clauseNumber.toString(), year.toString(), "main")}
        />
      );
    }
    return (
      <ClausePartsPage
        clauseNumber={clauseNumber}
        year={year}
        view={view}
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
        byPunishment: {
          primaryLifeSentenceCount: p.primaryLifeSentence,
          primarySuspendedCount: p.primarySuspended,
          primaryArrestCount: p.primaryArrest,
          primaryRestrainCount: p.primaryRestrain,
          primaryRestrain2009Count: p.primaryRestrain2009 || 0,
          primaryCorrectionalLabourCount: p.primaryCorrectionalLabour,
          primaryCommunityServiceCount: p.primaryCommunityService,
          primaryForcedLabourCount: p.primaryForcedLabour,
          primaryFineCount: p.primaryFine,
          primaryDisqualificationCount: p.primaryDisqualification,
          primaryOtherCount: p.primaryOther,
          primaryMilitaryDisciplinaryUnitCount:
            p.primaryMilitaryDisciplinaryUnit,
          primaryRestrictionsInMilitaryServiceCount:
            p.primaryRestrictionsInMilitaryService,
          primaryImprisonmentCount: p.primaryImprisonment,
        },
      };
    });
  };
}

export default ClausePartsPageContainer;
