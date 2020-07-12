import React from "react";
import ClausePageLayout from "./ClausePageLayout";

export default {
  title: "components/ClausePageLayout",
  component: ClausePageLayout,
};

export const byDefault = (): React.ReactNode => (
  <ClausePageLayout
    clauseNumber={282}
    clauseText="Возбуждение ненависти либо вражды, а равно унижение человеческого достоинства"
    clauseOutsideLink="http://www.consultant.ru/document/cons_doc_LAW_10699/d350878ee36f956a74c2c86830d066eafce20149/"
    clauseLink=""
  >
    <div style={{ height: 2000 }}></div>
  </ClausePageLayout>
);
