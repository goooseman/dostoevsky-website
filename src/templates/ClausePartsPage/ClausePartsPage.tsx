import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClausePartsPageProps {
  clauseNumber: number;
  year: number;
}

class ClausePartsPage extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year } = this.props;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Части"
        pageType="parts"
      >
        <Typography>Parts</Typography>
      </ClausePageLayout>
    );
  }
}

export default ClausePartsPage;
