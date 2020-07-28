import React from "react";
import Modal from "./Modal";
import Typography from "../Typography";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Modal", component: Modal };

const defaultProps = {
  isShowing: true,
  onHideButtonClick: action("onHideButtonClick"),
  title: "Modal",
};

export const sizeSmall = (): React.ReactNode => (
  <Modal {...defaultProps} size="sm">
    <Typography>Hello, world!</Typography>
  </Modal>
);

export const sizeSmallAndCentered = (): React.ReactNode => (
  <Modal {...defaultProps} size="sm" isCentered>
    <Typography>Hello, world!</Typography>
  </Modal>
);

export const sizeMedium = (): React.ReactNode => (
  <Modal {...defaultProps}>
    <Typography>Hello, world!</Typography>
  </Modal>
);

export const isClosed = (): React.ReactNode => (
  <Modal {...defaultProps} isShowing={false}>
    <Typography>Hello, world!</Typography>
  </Modal>
);
