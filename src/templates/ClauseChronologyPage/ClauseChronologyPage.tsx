import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClauseChronologyPageProps {
  clauseNumber: number;
  year: number;
}

class ClauseChronologyPage extends PureComponent<ClauseChronologyPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year } = this.props;

    return (
      <ClausePageLayout clauseNumber={clauseNumber} year={year}>
        <Typography component="h3" variant="h1" font="serif">
          Хронология
        </Typography>
      </ClausePageLayout>
    );
  }
}

export default ClauseChronologyPage;
