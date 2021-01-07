/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import classes from "./FullDatasetDownloadModal.module.css";
import cn from "clsx";
import Modal from "src/components/ui-kit/Modal";
import { getCsv } from "src/utils/csv";
import { saveAs } from "file-saver";
import iconv from "iconv-lite";
import { T } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Input from "src/components/ui-kit/Input";
import Button from "src/components/ui-kit/Button";
import axios from "axios";
import { MAILCHIMP_ADDRESS, MAILCHIMP_ID, MAILCHIMP_U } from "src/config/vars";

interface FullDatasetDownloadModalProps {
  children?: React.ReactNode;
  isShowing: boolean;
  loadingDataset: boolean;
  tables:
    | {
        rows: {
          key: string;
          values: any[];
        }[];
        columns: any[];
      }[]
    | null;
  toggle(): void;
}

const FullDatasetDownloadModal: React.FC<FullDatasetDownloadModalProps> = ({
  isShowing,
  toggle,
  loadingDataset,
  tables,
}: FullDatasetDownloadModalProps) => {
  const [email, setEmail] = useState("");
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);

  const handleDownload = () => {
    if (loadingDataset || !tables) return false;
    const csvContent = getCsv(tables, 0);
    saveAs(csvContent, `dataset.csv`);
    toggle();
  };

  const handleEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleClickButton = async () => {
    if (email) {
      setIsEmailSending(true);
      // https://mailchimp.com/help/host-your-own-signup-forms/
      try {
        await axios.post(MAILCHIMP_ADDRESS, {
          json: {
            u: MAILCHIMP_U,
            id: MAILCHIMP_ID,
            email: email,
          },
        });
      } catch (e) {
        console.error(e);
      }

      setIsEmailSending(false);
    }
    handleDownload();
  };

  return (
    <Modal
      isShowing={isShowing}
      onHideButtonClick={toggle}
      title={<T message="Скачать данные" />}
      isCentered
    >
      <div className={cn(classes.fullDatasetDownloadModalWrapper)}>
        <Typography font="serif">
          <i>
            <T message="Если вы оставите свой email, мы будем время от времени присылать вам что-нибудь полезное!" />
          </i>
        </Typography>
        <Input
          type="email"
          value={email}
          placeholder="Ваш e-mail"
          onChange={handleEmailChange}
        />
        <Typography>
          <T message="При использовании данных, пожалуйста, указывайте ссылку на Достоевский и делитесь с нами своими материалами." />
        </Typography>
        <Button color="secondary" onClick={handleClickButton}>
          <T
            message={
              isEmailSending || loadingDataset ? "Загрузка..." : "Скачать"
            }
          />
        </Button>
      </div>
    </Modal>
  );
};

export default FullDatasetDownloadModal;
