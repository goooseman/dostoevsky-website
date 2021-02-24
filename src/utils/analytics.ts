export const sendClickEvent = ({
  event,
  label,
}: {
  /** e.g. "ЧЕМ ЗАКОНЧИЛИСЬ ДЕЛА ПО СТАТЬЕ 275, ДОШЕДШИЕ ДО СУДА (ОСНОВНОЙ СОСТАВ) (275/2019)" */
  label: string;
  event:
    | "chart_download"
    | "chart_embed_clicked"
    | "chart_embed_copied"
    | "table_download"
    | "table_embed_clicked"
    | "table_embed_copied"
    | "full_dataset_download";
}): void => {
  typeof window !== "undefined" &&
    window.gtag &&
    window.gtag("event", event, {
      event_label: label,
    });
};
