import React, { PropsWithChildren } from "react";
import ClausePageHeader from "./ClausePageHeader";
import { action } from "@storybook/addon-actions";

export default {
  title: "components/ClausePageHeader",
  component: ClausePageHeader,
};

const defaultProps = {
  title: "Основной и дополнительный составы",
  year: 2019,
  pageType: "main",
  clauseNumber: 282,
  onYearSelected: action("onYearSelected"),
  years: [
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
  ] as number[],
} as const;

const Container: React.SFC<PropsWithChildren<{}>> = (
  props: PropsWithChildren<{}>
) => <div style={{ height: 1000 }}>{props.children}</div>;

export const withTitle = (): React.ReactNode => (
  <Container>
    <ClausePageHeader {...defaultProps} />
  </Container>
);
