import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClauseChronologyPageProps {
  clauseNumber: number;
  year: number;
  parts: {
    part: string;
  }[];
}

class ClauseChronologyPage extends PureComponent<ClauseChronologyPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts } = this.props;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Хронология"
        pageType="chronology"
        hasParts={parts.length > 1}
      >
        <Typography>Chronology</Typography>
      </ClausePageLayout>
    );
  }
}

export default ClauseChronologyPage;
