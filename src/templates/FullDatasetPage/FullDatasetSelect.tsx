import React from "react";
import Select, { components, OptionTypeBase } from "react-select";
import classes from "./FullDatasetPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";

interface FullDatasetSelectProps {
  children?: React.ReactNode;
  label: string;
  options: any;
  value: OptionTypeBase;
  onChange(data: any): void;
}

const FullDatasetSelect: React.FC<FullDatasetSelectProps> = ({
  label,
  options,
  value,
  onChange,
}: FullDatasetSelectProps) => {
  const renderControl = (props: object) => {
    return (
      /* @ts-ignore */
      <components.Control
        {...props}
        className={cn(classes.fullDatasetSelectControl)}
      />
    );
  };

  const renderIndicatorsContainer = (props: object) => {
    return (
      /* @ts-ignore */
      <components.IndicatorsContainer
        {...props}
        className={cn(classes.fullDatasetSelectIndicatorsContainer)}
      />
    );
  };

  const renderDropdownIndicator = (props: object) => {
    return (
      /* @ts-ignore */
      <components.DropdownIndicator {...props}>
        <img src={require("./assets/down.svg")} alt="Down arrow" />
      </components.DropdownIndicator>
    );
  };

  const renderSingleValue = (props: { children: React.ReactNode }) => (
    /* @ts-ignore */
    <components.SingleValue
      {...props}
      className={cn(classes.fullDatasetSelectSingleValue)}
    >
      {props.children}
    </components.SingleValue>
  );

  const renderMenu = (props: { children: React.ReactElement }) => {
    return (
      /* @ts-ignore */
      <components.Menu {...props} className={cn(classes.fullDatasetSelectMenu)}>
        {props.children}
      </components.Menu>
    );
  };

  const renderMenuList = (props: { children: React.ReactNode }) => {
    return (
      /* @ts-ignore */
      <components.MenuList
        {...props}
        className={cn(classes.fullDatasetSelectMenuList)}
      >
        {props.children}
      </components.MenuList>
    );
  };

  const renderOption = (props: object) => {
    return (
      /* @ts-ignore */
      <components.Option
        {...props}
        className={cn(classes.fullDatasetSelectOption)}
      />
    );
  };

  return (
    <div className={cn(classes.fullDatasetSelectWrapper)}>
      <Typography component="label" isUpperCased size="small">
        <T message={label} />
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

export default FullDatasetSelect;
