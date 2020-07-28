import React from "react";
import classes from "./EmbedModal.module.css";
import cn from "clsx";
import Modal, { useModal } from "src/components/ui-kit/Modal";
import { T } from "react-targem";
import Button from "src/components/ui-kit/Button";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import useSiteMetadata from "src/hooks/useSiteMetadata";

// TODO i18n aria

interface EmbedModalProps {
  iframePath: string;
}

const EmbedModal: React.FC<EmbedModalProps> = ({
  iframePath,
}: EmbedModalProps) => {
  const { isShowing, toggle } = useModal();
  const { isCopied, copy } = useCopyToClipboard(3000);
  const { siteUrl } = useSiteMetadata();

  const iframeCode = `<iframe width="750" src="${siteUrl}${iframePath}" frameborder="0" allowfullscreen></iframe>`;

  return (
    <>
      <button title={"Get embed code"} onClick={toggle}>
        <img src={require("./assets/embed.svg")} alt={"Code icon"} />
      </button>
      <Modal
        isShowing={isShowing}
        onHideButtonClick={toggle}
        title={<T>Embed</T>}
        size="sm"
        isCentered
      >
        <p className={cn(classes.embedBlock)}>{iframeCode}</p>
        <div className={cn(classes.buttonContainer)}>
          <Button color="secondary" onClick={() => copy(iframeCode)}>
            {isCopied ? <T>Copied</T> : <T>Copy</T>}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EmbedModal;
