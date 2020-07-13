import React from "react";
import ClausePageLayout from "./ClausePageLayout";
import { action } from "@storybook/addon-actions";

export default {
  title: "components/ClausePageLayout",
  component: ClausePageLayout,
};

const defaultProps = {
  year: 2019,
  clauseNumber: 282,
  clauseText: {
    ru:
      "Возбуждение ненависти либо вражды, а равно унижение человеческого достоинства",
  },
  clauseOutsideLink:
    "http://www.consultant.ru/document/cons_doc_LAW_10699/d350878ee36f956a74c2c86830d066eafce20149/",
  clauseLink: "",
  isCatalogueOpened: false,
  onCatalogueSwitch: action("onCatalogueSwitch"),
};

export const byDefault = (): React.ReactNode => (
  <ClausePageLayout {...defaultProps}>
    <div style={{ height: 2000 }}></div>
  </ClausePageLayout>
);

export const withCatalogueOpened = (): React.ReactNode => (
  <ClausePageLayout {...defaultProps} isCatalogueOpened>
    <div style={{ height: 2000 }}></div>
  </ClausePageLayout>
);
