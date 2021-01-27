import React from "react";
import ReactDOM from "react-dom";
import cn from "clsx";
import classes from "./Modal.module.css";
import Typography from "src/components/ui-kit/Typography";

interface ModalProps {
  isShowing: boolean;
  onHideButtonClick: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  size?: "lg" | "md" | "sm";
  isCentered?: boolean;
}

// TODO i18n aria labels

const Modal: React.FC<ModalProps> = ({
  isShowing,
  onHideButtonClick,
  children,
  size = "md",
  isCentered = false,
  title,
}: ModalProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={cn(classes.modalOverlay)} />
          <div
            className={cn(classes.modalWrapper, {
              [classes.modalWrapperCentered]: isCentered,
            })}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div
              className={cn(classes.modal, {
                [classes.modalSizeSm]: size === "sm",
                [classes.modalSizeMd]: size === "md",
                [classes.modalSizeLg]: size === "lg",
              })}
            >
              <div className={cn(classes.modalHeader)}>
                <button
                  type="button"
                  className={cn(classes.modalCloseButton)}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onHideButtonClick}
                >
                  <img src={require("./assets/close.svg")} alt="Close icon" />
                </button>
              </div>
              <Typography
                variant="h1"
                component="h2"
                font="serif"
                className={cn(classes.modalTitle)}
              >
                <b>{title}</b>
              </Typography>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
