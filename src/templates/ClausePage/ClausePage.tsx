import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClausePageProps {
  clauseNumber: number;
  year: number;
}

class ClausePage extends PureComponent<ClausePageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year } = this.props;

    return (
      <ClausePageLayout clauseNumber={clauseNumber} year={year}>
        <Typography component="h3" variant="h1">
          Основной и дополнительные составы
        </Typography>
      </ClausePageLayout>
    );
  }
}

export default ClausePage;
