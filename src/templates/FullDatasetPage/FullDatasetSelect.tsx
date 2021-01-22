import React from "react";
import Select, {
  components,
  ControlProps,
  IndicatorContainerProps,
  IndicatorProps,
  MenuListComponentProps,
  MenuProps,
  OptionProps,
  OptionsType,
  OptionTypeBase,
  SingleValueProps,
  ValueType,
} from "react-select";
import classes from "./FullDatasetPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T, WithLocale, withLocale } from "react-targem";

interface FullDatasetSelectProps extends WithLocale {
  children?: React.ReactNode;
  label: string;
  options: OptionsType<OptionTypeBase>;
  value: OptionTypeBase;
  onChange(value: ValueType<OptionTypeBase>): void;
}

const FullDatasetSelect: React.FC<FullDatasetSelectProps> = ({
  label,
  options,
  value,
  onChange,
  t,
}: FullDatasetSelectProps) => {
  const renderControl = (props: ControlProps<OptionTypeBase>) => {
    return (
      <components.Control
        {...props}
        className={cn(classes.fullDatasetSelectControl)}
      />
    );
  };

  const renderIndicatorsContainer = (
    props: IndicatorContainerProps<OptionTypeBase>
  ) => {
    return (
      <components.IndicatorsContainer
        {...props}
        className={cn(classes.fullDatasetSelectIndicatorsContainer)}
      />
    );
  };

  const renderDropdownIndicator = (props: IndicatorProps<OptionTypeBase>) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={require("./assets/down.svg")} alt={t("Стрелка вниз")} />
      </components.DropdownIndicator>
    );
  };

  const renderSingleValue = (props: SingleValueProps<OptionTypeBase>) => (
    <components.SingleValue
      {...props}
      className={cn(classes.fullDatasetSelectSingleValue)}
    >
      {props.children}
    </components.SingleValue>
  );

  const renderMenu = (props: MenuProps<OptionTypeBase>) => {
    return (
      <components.Menu {...props} className={cn(classes.fullDatasetSelectMenu)}>
        {props.children}
      </components.Menu>
    );
  };

  const renderMenuList = (props: MenuListComponentProps<OptionTypeBase>) => {
    return (
      <components.MenuList
        {...props}
        className={cn(classes.fullDatasetSelectMenuList)}
      >
        {props.children}
      </components.MenuList>
    );
  };

  const renderOption = (props: OptionProps<OptionTypeBase>) => {
    return (
      <components.Option
        {...props}
        className={cn(classes.fullDatasetSelectOption)}
      />
    );
  };

  return (
    <div className={cn(classes.fullDatasetSelectWrapper)}>
      <Typography component="label" isUpperCased size="small">
        <b>
          <T message={label} />
        </b>
      </Typography>
      <Select
        className={cn(classes.fullDatasetSelect)}
        components={{
          Control: (data) => renderControl(data),
          IndicatorsContainer: (data) => renderIndicatorsContainer(data),
          DropdownIndicator: (data) => renderDropdownIndicator(data),
          SingleValue: (data) => renderSingleValue(data),
          Menu: (data) => renderMenu(data),
          MenuList: (data) => renderMenuList(data),
          Option: (data) => renderOption(data),
          IndicatorSeparator: null,
        }}
        placeholder="Выберите..."
        isMulti
        isSearchable={false}
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default withLocale(FullDatasetSelect);
