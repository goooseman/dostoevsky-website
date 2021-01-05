import { CountersByPunishment } from "src/types";
import { IndexYearQuery } from "types/graphql-types";

export interface IndexCounters {
  totalConvicted: number;
  totalAcquittal: number;
  totalDismissal: number;
  totalNoCrime: number;
  total: number;
  totalByPunishment: CountersByPunishment;
}

export interface IndexTopClause {
  title: string;
  /** Всего осуждено */
  totalConvicted: number;
}

export const getIndexCountersFromData = (
  data: IndexYearQuery
): IndexCounters => {
  let totalConvictedAll = 0;
  let totalDismissal = 0;
  let totalAcquittalAll = 0;
  let totalNoCrime = 0;

  const totalByPunishment: IndexCounters["totalByPunishment"] = {
    primaryCommunityService: 0,
    primaryCorrectionalLabour: 0,
    primaryFine: 0,
    primaryForcedLabour: 0,
    primaryImprisonment: 0,
    primaryOther: 0,
    primarySuspended: 0,
    coerciveMeasures: 0,
  };

  for (const part of data.parts.edges) {
    if (part.node.parameters) {
      const {
        totalConvicted,
        dismissalAbsenceOfEvent,
        dismissalAmnesty,
        dismissalReconciliation,
        dismissalRepentance,
        dismissalCourtFine,
        dismissalOther,
        totalAcquittal,
        noCrimeSelfDefence,
        noCrimeNecessity,
        noCrimeOther,
        primaryCorrectionalLabour,
        primaryCommunityService,
        primaryFine,
        primaryForcedLabour,
        primaryImprisonment,
        primaryOther,
        primarySuspended,
        coerciveMeasures,
      } = part.node.parameters;

      totalConvictedAll += totalConvicted || 0;

      totalAcquittalAll += totalAcquittal || 0;

      totalDismissal +=
        (dismissalAbsenceOfEvent || 0) +
        (dismissalAmnesty || 0) +
        (dismissalReconciliation || 0) +
        (dismissalRepentance || 0) +
        (dismissalCourtFine || 0) +
        (dismissalOther || 0);

      totalNoCrime +=
        (noCrimeSelfDefence || 0) +
        (noCrimeNecessity || 0) +
        (noCrimeOther || 0);

      totalByPunishment.primaryCommunityService += primaryCommunityService || 0;
      totalByPunishment.primaryCorrectionalLabour +=
        primaryCorrectionalLabour || 0;
      totalByPunishment.primaryFine += primaryFine || 0;
      totalByPunishment.primaryForcedLabour += primaryForcedLabour || 0;
      totalByPunishment.primaryImprisonment += primaryImprisonment || 0;
      totalByPunishment.primaryOther += primaryOther || 0;
      totalByPunishment.primarySuspended += primarySuspended || 0;
      totalByPunishment.coerciveMeasures += coerciveMeasures || 0;
    }
  }
  return {
    totalConvicted: totalConvictedAll,
    totalDismissal,
    totalAcquittal: totalAcquittalAll,
    totalNoCrime,
    total:
      totalAcquittalAll + totalConvictedAll + totalDismissal + totalNoCrime,
    totalByPunishment,
  };
};

export const getIndexTopClausesByConvictedFromData = (
  data: IndexYearQuery
): IndexTopClause[] => {
  const topClauses: IndexTopClause[] = data.parts.edges
    .sort(
      (e1, e2) =>
        (e2.node.parameters?.totalConvicted || 0) -
        (e1.node.parameters?.totalConvicted || 0)
    )
    .slice(0, 10)
    .map((e) => ({
      totalConvicted: e.node.parameters?.totalConvicted || 0,
      title: e.node.name || "",
    }));
  return topClauses;
};
