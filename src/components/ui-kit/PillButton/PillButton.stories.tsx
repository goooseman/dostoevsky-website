import React from "react";
import PillButton from "./PillButton";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/PillButton", component: PillButton };

const onClick = action("onClick");

export const defaultPill = (): React.ReactNode => (
  <PillButton onClick={onClick} value="Black pill" />
);

export const primaryPill = (): React.ReactNode => (
  <PillButton variant="primary" onClick={onClick} value="Primary pill" />
);

export const secondaryPill = (): React.ReactNode => (
  <PillButton variant="secondary" onClick={onClick} value="Secondary pill" />
);

export const transparentPill = (): React.ReactNode => (
  <PillButton
    variant="transparent"
    onClick={onClick}
    value="Transparent pill"
  />
);
