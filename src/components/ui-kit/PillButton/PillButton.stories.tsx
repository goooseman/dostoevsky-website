import React from "react";
import PillButton from "./PillButton";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/PillButton", component: PillButton };

const handleClick = action("onClick");

export const defaultPill = (): React.ReactNode => (
  <PillButton onClick={handleClick} value="Black pill" />
);

export const primaryPill = (): React.ReactNode => (
  <PillButton variant="primary" onClick={handleClick} value="Primary pill" />
);

export const secondaryPill = (): React.ReactNode => (
  <PillButton
    variant="secondary"
    onClick={handleClick}
    value="Secondary pill"
  />
);

export const transparentPill = (): React.ReactNode => (
  <PillButton
    variant="transparent"
    onClick={handleClick}
    value="Transparent pill"
  />
);
