import React from "react";
import classes from "./EmbedModal.module.css";
import cn from "clsx";
import Modal, { useModal } from "src/components/ui-kit/Modal";
import { T, useLocale } from "react-targem";
import Button from "src/components/ui-kit/Button";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import useSiteMetadata from "src/hooks/useSiteMetadata";
import { sendClickEvent } from "src/utils/analytics";

interface EmbedModalProps {
  iframePath: string;
  title: string;
  type: "chart" | "table";
}

const EmbedModal: React.FC<EmbedModalProps> = ({
  iframePath,
  type,
  title,
}: EmbedModalProps) => {
  const { isShowing, toggle } = useModal();
  const { isCopied, copy } = useCopyToClipboard(3000);
  const { embedsUrl } = useSiteMetadata();
  const { t } = useLocale();

  const handleOpenButtonClick = () => {
    sendClickEvent({
      category: type === "chart" ? "Графики (эмбед)" : "Таблицы (эмбед)",
      label: title,
    });
    toggle();
  };

  const handleDownloadButtonClick = () => {
    sendClickEvent({
      category:
        type === "chart"
          ? "Графики (эмбед скопирован)"
          : "Таблицы (эмбед скопирован)",
      label: title,
    });
    copy(iframeCode);
  };

  const iframeCode = `<iframe width="750" src="${embedsUrl}${iframePath}" frameborder="0" allowfullscreen></iframe>`;

  return (
    <>
      <button
        className={cn(classes.button)}
        title={t("Получить код для встраивания")}
        onClick={handleOpenButtonClick}
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
          <Button color="secondary" onClick={handleDownloadButtonClick}>
            {isCopied ? <T>Скопировано</T> : <T>Скопировать</T>}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(EmbedModal);
