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
