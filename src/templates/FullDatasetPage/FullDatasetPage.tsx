import React, { useState } from "react";
import classes from "./FullDatasetPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import SinglePageLayout from "src/components/SinglePageLayout";
import { T } from "react-targem";

const FullDatasetPage: React.FC = () => {
  return (
    <main className={cn(classes.container)}>
      <Container>
        <SinglePageLayout title="Полный датасет">
          <h1>Hello world!</h1>
        </SinglePageLayout>
      </Container>
    </main>
  );
};

export default FullDatasetPage;
