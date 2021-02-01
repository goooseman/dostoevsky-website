import React from "react";
import ClauseMainPage from "./ClauseMainPage";

export default {
  title: "pages/clause/ClauseMainPage",
  component: ClauseMainPage,
};

const defaultProps = {
  clauseNumber: 282,
  year: 2019,
  view: "page" as const,
  partsCount: 2,
  total: 36,
  totalCases: 220,
  coerciveMeasures: 1,
  dismissalAmnesty: 10,
  noCrimeSelfDefence: 11,

  totalConvicted: 19,
  totalAcquittal: 9,
  totalDismissal: 142,
  nonRehabilitating: 6,
  primarySuspended: 10,
  primaryRestrain: 6,
  primaryImprisonment: 10,
  primaryFine: 15,
  primaryCorrectionalLabour: 25,

  addTotalPersons: 17,
  addTotalOffences: 38,
  addAcquittalPersons: 6,
  addAcquittalOffences: 6,
  addDismissalPersons: 30,
  addDismissalOffences: 30,
  addDismissalOtherPersons: 11,
  addDismissalOtherOffences: 24,
  addUnfitToPleadPersons: 0,
  addUnfitToPleadOffences: 1,
  unfinishedOffence: 2,

  totalAdd: 100,
  addDisqualification: 150,
  addFine: 175,
  addTitlesWithdraw: 200,
  addRestrain: 250,

  noCrimeNecessity: 200,
  noCrimeOther: 10,

  primaryImprisonmentUnderLowerLimit: 15,
  primaryImprisonment1: 45,
  primaryImprisonment1_2: 10,
  primaryImprisonment1_3: 12,
  primaryImprisonment2_3: 8,
  primaryImprisonment3_5: 6,
  primaryImprisonment5_8: 8,
  primaryImprisonment8_10: 10,
  primaryImprisonment10_15: 15,
  primaryImprisonment15_20: 20,

  primaryLifeSentence: 112,
  primaryArrest: 120,
  primaryRestrain2009: 125,
  primaryCommunityService: 130,
  primaryForcedLabour: 132,
  primaryDisqualification: 65,
  primaryOther: 34,
  primaryMilitaryDisciplinaryUnit: 33,
  primaryRestrictionsInMilitaryService: 20,

  dismissalAbsenceOfEvent: 44,
  dismissalReconciliation: 36,
  dismissalRepentance: 76,
  dismissalCourtFine: 65,
  dismissalOther: 64,
  dismissalRepentance2: 75,
};

export const withGraphs = (): React.ReactNode => (
  <ClauseMainPage {...defaultProps} />
);

export const withTable = (): React.ReactNode => (
  <ClauseMainPage {...defaultProps} view="table" />
);

export const withFocusGraphs = (): React.ReactNode => (
  <ClauseMainPage {...defaultProps} view="focus" />
);
