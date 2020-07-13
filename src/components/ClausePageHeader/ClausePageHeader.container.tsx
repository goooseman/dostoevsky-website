import React from "react";
import ClausePageHeader from "./ClausePageHeader";
import years from "content/years.json";

interface ClausePageLayoutContainerProps
  extends Omit<React.ComponentProps<typeof ClausePageHeader>, "years"> {}

const ClausePageLayoutContainer: React.SFC<ClausePageLayoutContainerProps> = (
  props: ClausePageLayoutContainerProps
) => {
  return <ClausePageHeader {...props} years={years} />;
};

export default ClausePageLayoutContainer;
