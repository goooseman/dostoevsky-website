import React from "react";
import SpoilerText from "./SpoilerText";
import { action } from "@storybook/addon-actions";

export default { title: "components/SpoilerText", component: SpoilerText };

const defaultProps = {
  onArrowButtonClick: action("onArrowButtonClick"),
  text:
    "В 2019 году по части 1 статьи 282 были осуждены по основному составу 14 человек. Из них 7 (50%) были приговорены к лишению свободы условно, еще 4 (28,5%) получили реальные сроки. Оправданы 3 человека. Прекращены дела в отношении 95 человек. По дополнительному составу осуждены 9 человек. По части 2 статьи 282 были осуждены по основному составу 5 человек. Из них 3 (60%) были приговорены к лишению свободы условно, еще 2 (40%) получили реальные сроки. Оправданы 0 человек. Прекращены дела в отношении 5 человек. По дополнительному составу осуждены 8 человек.",
};

export const withTextClosed = (): React.ReactNode => (
  <SpoilerText {...defaultProps} isOpened={false} />
);

export const withTextOpened = (): React.ReactNode => (
  <SpoilerText {...defaultProps} isOpened />
);
