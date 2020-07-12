import React, { useState } from "react";
import ClausePageLayout from "./ClausePageLayout";

interface ClausePageLayoutContainerProps {
  clauseNumber: number;
  clauseText: string;
  clauseOutsideLink: string;
  clauseLink: string;
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

  return (
    <ClausePageLayout
      {...props}
      isCatalogueOpened={isCatalogueOpened}
      onCatalogueSwitch={switchIsCatalogueOpened}
    />
  );
};

export default ClausePageLayoutContainer;
