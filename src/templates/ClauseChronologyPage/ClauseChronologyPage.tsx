import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClauseChronologyPageProps {
  clauseNumber: number;
  year: number;
  partsCount: number;
}

class ClauseChronologyPage extends PureComponent<ClauseChronologyPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, partsCount } = this.props;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Хронология"
        pageType="chronology"
        hasParts={partsCount > 0}
      >
        <Typography>Chronology</Typography>
      </ClausePageLayout>
    );
  }
}

export default ClauseChronologyPage;
