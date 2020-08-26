import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";

interface ClauseMainPageProps {
  clauseNumber: number;
  year: number;
  partsCount: number;
}

class ClauseMainPage extends PureComponent<ClauseMainPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, partsCount } = this.props;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Основной и дополнительный составы"
        pageType="main"
        hasParts={partsCount > 0}
      >
        <Typography>Main</Typography>
      </ClausePageLayout>
    );
  }
}

export default ClauseMainPage;
