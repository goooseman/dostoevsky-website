import React, { useState } from "react";
import classes from "./IndexPage.module.css";
import Container from "src/components/ui-kit/Container";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Button from "src/components/ui-kit/Button";
import searchService from "src/services/SearchService";
import PillButton from "src/components/ui-kit/PillButton";

interface IndexPageFilterProps {
  yearSelectOptions: { value: number; label: number }[];
}

const IndexPageFilter: React.FC<IndexPageFilterProps> = ({
  yearSelectOptions,
}: IndexPageFilterProps) => {
  const { t } = useLocale();

  const [selectedUk, setSelectedUk] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [selectedYear, setSelectedYear] = useState<{
    value: number;
    label: number;
  } | null>(yearSelectOptions[0]);

  const [ukSelectOptions, setUkSelectOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [, setUkOptionsLoading] = useState(false);

  const helpItems = searchService.getHelpItems("ru");
  helpItems.forEach(async (h) => {
    const o = await searchService.getAutocompleteItems(
      h.label,
      selectedYear ? selectedYear.value : 2019,
      "ru"
    );
    if (o.length > 0) h.value = o[0].link;
  });

  const loadUkOptions = (value: string) => {
    return new Promise(async (resolve) => {
      setUkOptionsLoading(true);
      if (value.length > 1 && selectedYear) {
        const result = await searchService.getAutocompleteItems(
          value,
          selectedYear.value,
          "ru"
        );
        const newUkOptions = result.map((a) => ({
          label: a.text,
          value: a.link,
        }));
        setUkSelectOptions(newUkOptions);
        setUkOptionsLoading(false);
        resolve(newUkOptions);
      } else {
        setUkSelectOptions([]);
        setUkOptionsLoading(false);
        resolve([]);
      }
    });
  };

  return (
    <Container>
      <div className={classes.filterBlock}>
        <div className={classes.ukSelectWrapper}>
          <Typography className={classes.selectLabel} isUpperCased size="small">
            <b>
              <T message="№ статьи ук рф или вид преступления" />
            </b>
          </Typography>
          <AsyncSelect
            isSearchable
            loadOptions={loadUkOptions}
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
          <Button
            size="lg"
            color="third"
            withArrow
            /* @ts-ignore */
            to={selectedUk && selectedYear ? selectedUk.value : "/full"}
          >
            <T message="Перейти к данным" />
          </Button>
        </div>
      </div>
      <div className={classes.hintsWrapper}>
        <Typography isUpperCased size="small">
          <b>
            <T message="Подсказка:" />
          </b>
        </Typography>
        <div className={classes.hintsInner}>
          {helpItems.map((o: { label: string; value: string }, i: number) => (
            <PillButton
              key={i}
              handleClick={() => setSelectedUk(o)}
              value={o.label}
              variant="black"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default IndexPageFilter;
