import React, { PureComponent } from "react";
import ClausePartsPage, {
  ClausePartsPageViewMode,
  Part,
} from "./ClausePartsPage";
import { Redirect } from "@reach/router";
import { getClauseLink } from "src/config/routes";

interface ClausePartsPageContainerProps {
  clauseNumber: number;
  year: number;
  view: ClausePartsPageViewMode;
  parts: Part[];
}

class ClausePartsPageContainer extends PureComponent<
  ClausePartsPageContainerProps
> {
  render(): React.ReactNode {
    const { clauseNumber, year } = this.props;
    if (this.props.parts.length === 0) {
      return <Redirect to={getClauseLink(clauseNumber, year, "main")} />;
    }
    return <ClausePartsPage {...this.props}></ClausePartsPage>;
  }
}

export default ClausePartsPageContainer;
