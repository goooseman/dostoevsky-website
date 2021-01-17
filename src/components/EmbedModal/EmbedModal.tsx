import React from "react";
import classes from "./EmbedModal.module.css";
import cn from "clsx";
import Modal, { useModal } from "src/components/ui-kit/Modal";
import { T, useLocale } from "react-targem";
import Button from "src/components/ui-kit/Button";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import useSiteMetadata from "src/hooks/useSiteMetadata";

interface EmbedModalProps {
  iframePath: string;
}

const EmbedModal: React.FC<EmbedModalProps> = ({
  iframePath,
}: EmbedModalProps) => {
  const { isShowing, toggle } = useModal();
  const { isCopied, copy } = useCopyToClipboard(3000);
  const { embedsUrl } = useSiteMetadata();
  const { t } = useLocale();

  const iframeCode = `<iframe width="750" src="${embedsUrl}${iframePath}" frameborder="0" allowfullscreen></iframe>`;

  return (
    <>
      <button
        className={cn(classes.button)}
        title={t("Получить код для встраивания")}
        onClick={toggle}
      >
        <img src={require("./assets/embed.svg")} alt={t("Иконка код")} />
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
            {isCopied ? <T>Скопировано</T> : <T>Скопировать</T>}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EmbedModal;
