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
    unfinishedOffence: number;
    addTotalPersons: number;
    addTotalOffences: number;
    addAcquittalPersons: number;
    addAcquittalOffences: number;
    noCrimeSelf_defence: number;
    noCrimeNecessity: number;
    noCrimeOther: number;
    addDisqualification: number;
    addFine: number;
    addTitlesWithdraw: number;
    addRestrain: number;
    dismissalRepentance2: number;
    addDismissalPersons: number;
    addDismissalOffences: number;
    addDismissalOtherPersons: number;
    addDismissalOtherOffences: number;
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
      const totalAcquittal = p.acquittal;
      const totalDismissal =
        p.dismissalAbsenceOfEvent +
        p.dismissalAmnesty +
        p.dismissalReconciliation +
        p.dismissalRepentance +
        p.dismissalCourtFine +
        p.dismissalOther +
        p.coerciveMeasures;
      return {
        totalAcquittal,
        totalDismissal,
        ...p,
        noCrimeSelfDefence: p.noCrimeSelf_defence,
      };
    });
  };
}

export default ClausePartsPageContainer;
