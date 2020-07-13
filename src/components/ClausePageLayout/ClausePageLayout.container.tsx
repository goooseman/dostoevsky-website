import React, { useState } from "react";
import ClausePageLayout from "./ClausePageLayout";
import { getClauseById } from "src/utils/ук-рф";

interface ClausePageLayoutContainerProps {
  clauseNumber: number;
  year: number;
  children: React.ReactNode;
}

const ClausePageLayoutContainer: React.SFC<ClausePageLayoutContainerProps> = (
  props: ClausePageLayoutContainerProps
) => {
  const [isCatalogueOpened, setIsCatalogueOpened] = useState<boolean>(false);

  const switchIsCatalogueOpened = () => {
    setIsCatalogueOpened((prevState: boolean) => !prevState);
  };

  const { clause } = getClauseById(props.clauseNumber);
  if (!clause) {
    throw new Error(`No clause with id ${props.clauseNumber}`);
  }

  return (
    <ClausePageLayout
      {...props}
      clauseText={clause.text}
      clauseOutsideLink={clause.url}
      isCatalogueOpened={isCatalogueOpened}
      onCatalogueSwitch={switchIsCatalogueOpened}
    />
  );
};

export default ClausePageLayoutContainer;
