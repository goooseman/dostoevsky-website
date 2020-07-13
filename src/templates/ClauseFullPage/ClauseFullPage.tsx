import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClauseFullPageProps {
  clauseNumber: number;
  year: number;
}

class ClauseFullPage extends PureComponent<ClauseFullPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year } = this.props;

    return (
      <ClausePageLayout clauseNumber={clauseNumber} year={year}>
        <Typography component="h3" variant="h1">
          Полная статистика
        </Typography>
      </ClausePageLayout>
    );
  }
}

export default ClauseFullPage;
