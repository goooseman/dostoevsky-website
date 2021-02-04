import React, { PureComponent } from "react";
import ClausePartsPage, {
  ClausePartsPageViewMode,
  Part,
} from "./ClausePartsPage";
import { Redirect } from "@reach/router";
import { getClauseLink } from "src/config/routes";
import { withLocale, WithLocale } from "react-targem";

interface ClausePartsPageContainerProps extends WithLocale {
  clauseNumber: number;
  year: number;
  view: ClausePartsPageViewMode;
  parts: Part[];
}

class ClausePartsPageContainer extends PureComponent<
  ClausePartsPageContainerProps
> {
  render(): React.ReactNode {
    const { clauseNumber, year, locale } = this.props;
    if (this.props.parts.length === 0) {
      return (
        <Redirect to={getClauseLink(locale, clauseNumber, year, "main")} />
      );
    }
    return <ClausePartsPage {...this.props}></ClausePartsPage>;
  }
}

export default withLocale(ClausePartsPageContainer);
