import React from "react";
import ClauseChronologyPage from "./ClauseChronologyPage";

export default {
  title: "pages/clause/ClauseChronologyPage",
  component: ClauseChronologyPage,
};

const defaultProps = {
  clauseNumber: 282,
  view: "page" as const,
  partsCount: 2,
  years: [
    {
      year: "2019",
      totalConvicted: 500,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2018",
      totalConvicted: 432,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2017",
      totalConvicted: 521,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2016",
      totalConvicted: 390,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2015",
      totalConvicted: 321,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2014",
      totalConvicted: 311,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2013",
      totalConvicted: 290,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2012",
      totalConvicted: 280,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2011",
      totalConvicted: 270,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2010",
      totalConvicted: 250,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
    {
      year: "2009",
      totalConvicted: 240,

      primaryImprisonment: 45,
      primarySuspended: 34,
      primaryCommunityService: 56,
      primaryForcedLabour: 65,
      primaryCorrectionalLabour: 34,
      primaryFine: 100,
      coerciveMeasures: 53,
      primaryOther: 21,

      totalAcquittal: 32,
      dismissalAbsenceOfEvent: 54,
      dismissalAmnesty: 12,
      dismissalRepentance: 76,
      dismissalReconciliation: 32,
      dismissalCourtFine: 12,
      dismissalOther: 54,
    },
  ],
};

export const withCharts = (): React.ReactNode => (
  <ClauseChronologyPage {...defaultProps} />
);

export const withTable = (): React.ReactNode => (
  <ClauseChronologyPage {...defaultProps} view="table" />
);
