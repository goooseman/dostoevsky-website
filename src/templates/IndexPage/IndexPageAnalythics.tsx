import React from "react";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import Container from "src/components/ui-kit/Container";

const IndexPageAnalythics = () => {
  return (
    <Container>
      <Typography variant="h2" font="serif">
        <b>
          <T message="Статистика решений суда по всем статьям УК РФ в 2019 году" />
        </b>
      </Typography>
    </Container>
  );
};

export default IndexPageAnalythics;
