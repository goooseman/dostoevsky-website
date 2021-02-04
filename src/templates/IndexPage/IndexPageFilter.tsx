import React, { useRef, useState } from "react";
import classes from "./IndexPage.module.css";
import Container from "src/components/ui-kit/Container";
import AsyncSelect from "react-select/async";
import Select, { ValueType } from "react-select";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Button from "src/components/ui-kit/Button";
import searchService from "src/services/SearchService";
import PillButton from "src/components/ui-kit/PillButton";
import { SelectOption } from "src/types";
import { getLinkForLocale } from "src/utils/locales";

interface IndexPageFilterProps {
  yearSelectOptions: SelectOption[];
  defaultYearSelectOption: SelectOption;
}

const IndexPageFilter: React.FC<IndexPageFilterProps> = ({
  yearSelectOptions,
  defaultYearSelectOption,
}: IndexPageFilterProps) => {
  const { t, locale } = useLocale();

  const selectRef = useRef<AsyncSelect<SelectOption> | null>(null);
  const selectContainerRef = useRef<HTMLDivElement | null>(null);

  const [selectedUk, setSelectedUk] = useState<SelectOption>();

  const handleHelperClick = (searchQuery: string) => () => {
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    selectRef.current.state.inputValue = searchQuery;
    // @ts-ignore
    selectRef.current.select.state.inputValue = searchQuery;
    // @ts-ignore
    selectRef.current.select.state.menuIsOpen = true;
    // @ts-ignore
    selectRef.current.handleInputChange(searchQuery);
    /* eslint-enable @typescript-eslint/ban-ts-comment */
    if (!selectContainerRef.current) {
      return;
    }
    // yeah, a little bit hacky and I hope another input will never be added in this div
    selectContainerRef.current.querySelector("input")?.focus();
  };

  const [selectedYear, setSelectedYear] = useState<SelectOption>(
    defaultYearSelectOption
  );

  const [ukSelectOptions, setUkSelectOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [, setUkOptionsLoading] = useState(false);

  const helpItems = searchService.getHelpItems("ru");

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
        <div className={classes.ukSelectWrapper} ref={selectContainerRef}>
          <Typography className={classes.selectLabel} isUpperCased size="small">
            <b>
              <T message="№ статьи ук рф или вид преступления" />
            </b>
          </Typography>
          <AsyncSelect
            ref={selectRef}
            isSearchable
            loadOptions={loadUkOptions}
            options={ukSelectOptions}
            classNamePrefix="select"
            placeholder={t("Введите статью...")}
            noOptionsMessage={() => t("Ничего не найдено")}
            value={selectedUk}
            onChange={(option: ValueType<SelectOption>) =>
              option && setSelectedUk(option as SelectOption)
            }
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
            onChange={(option: ValueType<SelectOption>) =>
              option && setSelectedYear(option as SelectOption)
            }
          />
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            size="lg"
            color="third"
            withArrow
            disabled={Boolean(selectedUk && selectedYear)}
            to={
              selectedUk?.value
                ? getLinkForLocale(locale, selectedUk?.value)
                : getLinkForLocale(locale, "/full")
            }
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
          {helpItems.map((o: string) => (
            <PillButton
              key={o}
              onClick={handleHelperClick(o)}
              value={o}
              variant="black"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default IndexPageFilter;
