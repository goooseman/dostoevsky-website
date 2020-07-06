import React, { PureComponent } from "react";
import { Api_Server__Data } from "types/graphql-types";
import { T } from "react-targem";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";

interface ClausePageProps {
  parts: Pick<
    Api_Server__Data,
    "part" | "year" | "name" | "exemptionOther" | "totalConvicted"
  >[];
  clause: string;
  year: string;
}

class ClausePage extends PureComponent<ClausePageProps> {
  render(): React.ReactNode {
    const { clause, year, parts } = this.props;
    const firstPart = parts[0];
    if (!firstPart) {
      return (
        <Container>
          <Typography>
            <T
              message="No data for clause {{ clauseNumber }} for year {{ year }}"
              scope={{
                clauseNumber: clause,
                year: year,
              }}
            />
          </Typography>
        </Container>
      );
    }

    const totalConvicted = parts.reduce(
      (curr: number, n) => curr + (n.totalConvicted || 0),
      0
    );

    return (
      <div>
        <p>Статья: {firstPart.name}</p>
        <p>Год: {firstPart.year}</p>
        <T
          message="One man has been convicted."
          messagePlural="{{ count }} men has been convicted."
          count={totalConvicted}
        />
      </div>
    );
  }
}

export default ClausePage;
