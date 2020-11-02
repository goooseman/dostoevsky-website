import React, { useState } from "react";
import classes from "./IndexPage.module.css";
import Container from "src/components/ui-kit/Container";
import Select from "react-select";
import ukRf from "content/ук-рф.json";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Button from "src/components/ui-kit/Button";

interface IndexPageFilterProps {
  yearSelectOptions: { value: number; label: number }[];
}

const ukSelectOptions: { value: number; label: string }[] = ukRf.reduce(
  (a, c) => {
    if (c.children) {
      c.children.forEach((l) => {
        if (l.children) {
          l.children.forEach((ll) => {
            a.push({
              value: ll.id,
              label: `Статья ${ll.id} ${ll.text.ru}`,
            });
          });
        }
      });
    }
    return a;
  },
  [] as { value: number; label: string }[]
);

const IndexPageFilter: React.FC<IndexPageFilterProps> = ({
  yearSelectOptions,
}: IndexPageFilterProps) => {
  const { t } = useLocale();

  const [selectedUk, setSelectedUk] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <Container>
      <div className={classes.filterBlock}>
        <div className={classes.ukSelectWrapper}>
          <Typography className={classes.selectLabel} isUpperCased size="small">
            <b>
              <T message="№ статьи ук рф или вид преступления" />
            </b>
          </Typography>
          <Select
            options={ukSelectOptions}
            classNamePrefix="select"
            placeholder={t("Введите статью...")}
            noOptionsMessage={() => t("Ничего не найдено")}
            value={selectedUk}
            onChange={(option: any) => setSelectedUk(option)}
          />
        </div>
        <div className={classes.yearSelectWrapper}>
          <Typography className={classes.selectLabel} isUpperCased size="small">
            <b>
              <T message="год" />
            </b>
          </Typography>
          <Select
            options={yearSelectOptions}
            classNamePrefix="select"
            placeholder={t("Введите год...")}
            noOptionsMessage={() => t("Ничего не найдено")}
            value={selectedYear}
            onChange={(option: any) => setSelectedYear(option)}
          />
        </div>
        <div className={classes.buttonWrapper}>
          {selectedUk && selectedYear ? (
            <Button
              size="lg"
              color="third"
              withArrow
              /* @ts-ignore */
              to={`/${selectedUk.value}/${selectedYear.value}`}
            >
              <T message="Перейти к данным" />
            </Button>
          ) : null}
        </div>
      </div>
      {/* TODO Подсказка */}
    </Container>
  );
};

export default IndexPageFilter;
