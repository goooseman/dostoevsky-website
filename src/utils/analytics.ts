export const sendClickEvent = ({
  category,
  label,
}: {
  /** e.g. "ЧЕМ ЗАКОНЧИЛИСЬ ДЕЛА ПО СТАТЬЕ 275, ДОШЕДШИЕ ДО СУДА (ОСНОВНОЙ СОСТАВ) (275/2019)" */
  label: string;
  /** e.g. "Графики (скачать)" */
  category:
    | "Графики (скачать)"
    | "Графики (эмбед)"
    | "Графики (эмбед скопирован)"
    | "Таблицы (скачать)"
    | "Таблицы (эмбед)"
    | "Таблицы (эмбед скопирован)"
    | "Полный датасет (скачать)";
}): void => {
  typeof window !== "undefined" &&
    window.gtag &&
    window.gtag("event", "click", {
      event_label: label,
      event_category: category,
    });
};
